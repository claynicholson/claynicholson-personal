import fs from "fs";
import path from "path";
import matter from "gray-matter";

const MIT_DIR = path.join(process.cwd(), "content", "mit");

// Docs are static for the life of the process; parse once and reuse.
let cache = null;

function tokenize(text) {
  return (text.toLowerCase().match(/[a-z0-9]+/g) || []).filter((t) => t.length > 1);
}

export function getAllDocs() {
  if (cache) return cache;
  if (!fs.existsSync(MIT_DIR)) return [];

  const files = fs.readdirSync(MIT_DIR).filter((f) => f.endsWith(".md"));

  cache = files.map((filename) => {
    const id = filename.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(MIT_DIR, filename), "utf8");
    const { data, content } = matter(raw);
    return {
      id,
      title: data.title || id,
      category: data.category || "general",
      summary: data.summary || "",
      sources: data.sources || [],
      lastReviewed: data.last_reviewed || null,
      content: content.trim(),
      searchTokens: tokenize(`${data.title || ""} ${data.summary || ""} ${content}`),
      titleTokens: new Set(tokenize(`${data.title || ""} ${data.summary || ""}`)),
    };
  });

  return cache;
}

export function listTopics(category) {
  const docs = getAllDocs().filter((d) => !category || d.category === category);
  return docs
    .map(({ id, title, category: cat, summary }) => ({ id, title, category: cat, summary }))
    .sort((a, b) => (a.category === b.category ? a.id.localeCompare(b.id) : a.category.localeCompare(b.category)));
}

export function listCategories() {
  return [...new Set(getAllDocs().map((d) => d.category))].sort();
}

export function getDoc(id) {
  return getAllDocs().find((d) => d.id === id) || null;
}

// Pull a readable window of text around the first line matching any query token.
function makeSnippet(content, queryTokens) {
  const lines = content.split("\n");
  let hit = -1;
  for (let i = 0; i < lines.length; i++) {
    const lower = lines[i].toLowerCase();
    if (queryTokens.some((t) => lower.includes(t))) {
      hit = i;
      break;
    }
  }
  if (hit === -1) return lines.slice(0, 3).join("\n").slice(0, 400);
  return lines
    .slice(Math.max(0, hit - 1), hit + 3)
    .join("\n")
    .slice(0, 400);
}

export function searchDocs(query, { category, maxResults = 5 } = {}) {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return [];

  const scored = getAllDocs()
    .filter((d) => !category || d.category === category)
    .map((doc) => {
      let score = 0;
      for (const t of queryTokens) {
        if (doc.titleTokens.has(t)) score += 10;
        for (const dt of doc.searchTokens) {
          if (dt === t) score += 2;
          else if (dt.startsWith(t) || t.startsWith(dt)) score += 0.25;
        }
      }
      return { doc, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.min(Math.max(1, maxResults), 10));

  return scored.map(({ doc, score }) => ({
    id: doc.id,
    title: doc.title,
    category: doc.category,
    summary: doc.summary,
    score: Math.round(score * 10) / 10,
    snippet: makeSnippet(doc.content, queryTokens),
  }));
}

// ── Calendar (content/mit/calendar.json) ──

let calendarCache = null;

export function getCalendarEvents() {
  if (calendarCache) return calendarCache;
  const file = path.join(MIT_DIR, "calendar.json");
  if (!fs.existsSync(file)) return [];
  calendarCache = JSON.parse(fs.readFileSync(file, "utf8"))
    .events.slice()
    .sort((a, b) => a.start.localeCompare(b.start));
  return calendarCache;
}

export const CALENDAR_CATEGORIES = ["academic", "orientation", "rush", "deadline", "event", "athletics"];
