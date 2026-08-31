// Public MIT student-info MCP server (streamable HTTP, stateless).
// Serves only public institutional info from content/mit/ — no personal data,
// no Touchstone-gated material. Implemented as plain JSON-RPC so the endpoint
// has no runtime dependencies beyond what the site already ships.

import { NextResponse } from "next/server";
import { getDoc, listCategories, listTopics, searchDocs } from "@/lib/mitKnowledge";
import { renderInfoPage } from "./infoPage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SERVER_INFO = { name: "mit-student-info", version: "1.0.0" };
const SUPPORTED_PROTOCOLS = ["2025-06-18", "2025-03-26", "2024-11-05"];

const INSTRUCTIONS = [
  "Public MIT student information: calendars, GIRs, grading, housing, dining, UROP,",
  "IAP, rush, benefits, campus resources, lingo, and more. Everything here is public",
  "institutional knowledge. Dates, prices, and deadlines drift every term — verify",
  "against the official sources cited in each topic. If you have web access, the",
  "'mit-websites-directory' topic lists every official MIT site worth fetching for",
  "current or missing information.",
].join(" ");

// CORS is wide open on purpose: this is a public read-only endpoint and
// browser-based MCP clients need it.
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, Authorization, Mcp-Session-Id, Mcp-Protocol-Version",
  "Access-Control-Expose-Headers": "Mcp-Session-Id",
};

const TOOLS = [
  {
    name: "search_mit_info",
    description:
      "Search public MIT student information (academics, GIRs, grading, housing, dining, UROP, IAP, financial aid, careers, transportation, campus lingo, traditions, and more). Returns ranked topics with snippets; use read_mit_topic for the full text.",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "What to look for, e.g. 'pass no record', 'swim test', 'UROP funding deadline'" },
        category: { type: "string", description: "Optional category filter; see list_mit_topics for categories" },
        max_results: { type: "integer", minimum: 1, maximum: 10, description: "Max results to return (default 5)" },
      },
      required: ["query"],
    },
  },
  {
    name: "list_mit_topics",
    description: "List every available MIT info topic (id, title, category, summary), optionally filtered by category. Good starting point for browsing.",
    inputSchema: {
      type: "object",
      properties: {
        category: { type: "string", description: "Optional category filter" },
      },
    },
  },
  {
    name: "read_mit_topic",
    description: "Read the full text of one MIT info topic by id (ids come from list_mit_topics or search_mit_info). Includes official source links for verification.",
    inputSchema: {
      type: "object",
      properties: {
        topic: { type: "string", description: "Topic id, e.g. 'gir-requirements'" },
      },
      required: ["topic"],
    },
  },
];

const VERIFY_NOTE =
  "\n\n---\nThis is public institutional info maintained by a student, not an official MIT resource. Verify current dates, deadlines, and policies at the official sources above.";

function renderDoc(doc) {
  const sources = doc.sources.length ? `\n\nOfficial sources:\n${doc.sources.map((s) => `- ${s}`).join("\n")}` : "";
  const reviewed = doc.lastReviewed ? `\nLast reviewed: ${doc.lastReviewed}` : "";
  return `# ${doc.title}\n(category: ${doc.category}, id: ${doc.id})\n\n${doc.content}${sources}${reviewed}${VERIFY_NOTE}`;
}

function callTool(name, args = {}) {
  switch (name) {
    case "search_mit_info": {
      if (!args.query || typeof args.query !== "string") {
        return { error: "Missing required 'query' string." };
      }
      const results = searchDocs(args.query, {
        category: args.category,
        maxResults: args.max_results || 5,
      });
      if (results.length === 0) {
        return {
          text: `No topics matched "${args.query}". Try broader terms, or list_mit_topics to browse everything (categories: ${listCategories().join(", ")}).`,
        };
      }
      const lines = results.map(
        (r) => `## ${r.title} (id: ${r.id}, category: ${r.category})\n${r.summary}\n> ${r.snippet.replace(/\n/g, "\n> ")}`
      );
      return {
        text: `${results.length} result(s) for "${args.query}". Use read_mit_topic with an id for full details.\n\n${lines.join("\n\n")}`,
      };
    }
    case "list_mit_topics": {
      const topics = listTopics(args.category);
      if (topics.length === 0) {
        return { text: `No topics in category "${args.category}". Categories: ${listCategories().join(", ")}.` };
      }
      let out = `${topics.length} topic(s). Categories: ${listCategories().join(", ")}.\n`;
      let current = null;
      for (const t of topics) {
        if (t.category !== current) {
          current = t.category;
          out += `\n### ${current}\n`;
        }
        out += `- ${t.id}: ${t.title} — ${t.summary}\n`;
      }
      return { text: out };
    }
    case "read_mit_topic": {
      if (!args.topic || typeof args.topic !== "string") {
        return { error: "Missing required 'topic' string." };
      }
      const doc = getDoc(args.topic);
      if (!doc) {
        return { error: `No topic "${args.topic}". Use list_mit_topics to see valid ids.` };
      }
      return { text: renderDoc(doc) };
    }
    default:
      return { unknown: true };
  }
}

function rpcResult(id, result) {
  return { jsonrpc: "2.0", id, result };
}

function rpcError(id, code, message) {
  return { jsonrpc: "2.0", id: id ?? null, error: { code, message } };
}

function handleMessage(msg) {
  if (!msg || typeof msg !== "object" || msg.jsonrpc !== "2.0") {
    return rpcError(msg?.id, -32600, "Invalid JSON-RPC 2.0 message");
  }

  // Notifications get no response.
  if (msg.id === undefined || msg.id === null) return null;

  switch (msg.method) {
    case "initialize": {
      const requested = msg.params?.protocolVersion;
      const protocolVersion = SUPPORTED_PROTOCOLS.includes(requested) ? requested : SUPPORTED_PROTOCOLS[0];
      return rpcResult(msg.id, {
        protocolVersion,
        capabilities: { tools: { listChanged: false } },
        serverInfo: SERVER_INFO,
        instructions: INSTRUCTIONS,
      });
    }
    case "ping":
      return rpcResult(msg.id, {});
    case "tools/list":
      return rpcResult(msg.id, { tools: TOOLS });
    case "tools/call": {
      const { name, arguments: args } = msg.params || {};
      const out = callTool(name, args);
      if (out.unknown) return rpcError(msg.id, -32602, `Unknown tool: ${name}`);
      if (out.error) {
        return rpcResult(msg.id, { content: [{ type: "text", text: out.error }], isError: true });
      }
      return rpcResult(msg.id, { content: [{ type: "text", text: out.text }], isError: false });
    }
    case "resources/list":
      return rpcResult(msg.id, { resources: [] });
    case "prompts/list":
      return rpcResult(msg.id, { prompts: [] });
    default:
      return rpcError(msg.id, -32601, `Method not found: ${msg.method}`);
  }
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(rpcError(null, -32700, "Parse error"), { status: 400, headers: CORS_HEADERS });
  }

  // Older protocol revisions allow batches; answer them in kind.
  if (Array.isArray(body)) {
    const responses = body.map(handleMessage).filter((r) => r !== null);
    if (responses.length === 0) return new NextResponse(null, { status: 202, headers: CORS_HEADERS });
    return NextResponse.json(responses, { headers: CORS_HEADERS });
  }

  const response = handleMessage(body);
  if (response === null) return new NextResponse(null, { status: 202, headers: CORS_HEADERS });
  return NextResponse.json(response, { headers: CORS_HEADERS });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET(request) {
  const accept = request.headers.get("accept") || "";
  if (accept.includes("text/html")) {
    return new NextResponse(renderInfoPage(), { headers: { "Content-Type": "text/html; charset=utf-8", ...CORS_HEADERS } });
  }
  // Stateless server: no server-initiated SSE stream to offer.
  return new NextResponse(null, { status: 405, headers: { Allow: "POST, OPTIONS", ...CORS_HEADERS } });
}
