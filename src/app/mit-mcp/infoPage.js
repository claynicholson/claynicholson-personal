// Human-facing page served when /mit-mcp is opened in a browser. Raw HTML
// (this route isn't a React page), so the site's look — Newsreader headings,
// Inter body, white/#faf9f6 surfaces — is mirrored here with inline styles and
// a Google Fonts load standing in for next/font.

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const CATEGORY_LABELS = {
  academics: "Academics",
  research: "Research & Programs",
  "campus-life": "Campus Life",
  support: "Health & Support",
  "money-careers": "Money & Careers",
  resources: "Resources",
  culture: "Culture",
};

export function renderInfoPage({ origin, topics }) {
  const endpoint = `${origin}/mit-mcp`;

  const byCategory = new Map();
  for (const t of topics) {
    if (!byCategory.has(t.category)) byCategory.set(t.category, []);
    byCategory.get(t.category).push(t);
  }

  const topicsHtml = [...byCategory.entries()]
    .map(
      ([cat, list]) => `
      <div class="topic-group">
        <h3>${esc(CATEGORY_LABELS[cat] || cat)}</h3>
        <ul>
          ${list.map((t) => `<li><span class="topic-name">${esc(t.title)}</span><span class="topic-sum"> — ${esc(t.summary)}</span></li>`).join("\n")}
        </ul>
      </div>`
    )
    .join("\n");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>MIT Student Info MCP · Clay Nicholson</title>
<meta name="description" content="A free, public MCP server with searchable MIT student knowledge — GIRs, grading, UROP, housing, campus lingo, and more.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Newsreader:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  ::selection { background: rgba(0,0,0,0.08); color: #111; }
  html { scroll-behavior: smooth; }
  body {
    background: #fff;
    color: #2c2c2c;
    font-family: "Inter", system-ui, -apple-system, sans-serif;
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
  }
  h1, h2, h3 { font-family: "Newsreader", Georgia, serif; font-weight: 400; color: #111; }
  a { color: #555; text-decoration-color: rgba(0,0,0,0.15); text-underline-offset: 3px; transition: color .15s ease, text-decoration-color .15s ease; }
  a:hover { color: #111; text-decoration-color: rgba(0,0,0,0.4); }

  .top-bar { background: #fff; border-bottom: 1px solid #f0f0f0; }
  .top-bar-inner { max-width: 1200px; margin: 0 auto; padding: 0 2rem; height: 64px; display: flex; align-items: center; }
  .top-logo {
    font-family: "Newsreader", Georgia, serif;
    font-size: 1.125rem; font-weight: 600; color: #1a1a1a;
    text-decoration: none; letter-spacing: -0.01em;
  }
  .top-logo:hover { color: #cc785c; }

  .wrap { max-width: 760px; margin: 0 auto; padding: 4.5rem 1.5rem 5rem; }
  .page-title { font-size: 2.25rem; letter-spacing: -0.02em; line-height: 1.2; margin-bottom: 0.65rem; }
  .page-tagline { font-size: 0.95rem; color: #888; margin-bottom: 2.75rem; }

  .section { margin-bottom: 2.75rem; }
  .section h2 { font-size: 1.35rem; margin-bottom: 0.7rem; }
  .section p, .section li { font-size: 0.9rem; color: #444; line-height: 1.75; }
  .section p + p { margin-top: 0.5rem; }

  .endpoint {
    display: block; font-family: "SF Mono", "Fira Code", monospace;
    font-size: 0.85rem; color: #333; background: #faf9f6;
    border: 1px solid rgba(0,0,0,0.07); padding: 0.7rem 0.9rem;
    margin: 0.8rem 0 0.4rem; word-break: break-all;
  }
  pre {
    font-family: "SF Mono", "Fira Code", monospace; font-size: 0.8rem;
    color: #444; background: rgba(0,0,0,0.04);
    border: 1px solid rgba(0,0,0,0.06); padding: 0.65rem 0.9rem;
    margin: 0.5rem 0 0.9rem; overflow-x: auto; line-height: 1.6;
  }
  code { font-family: "SF Mono", "Fira Code", monospace; font-size: 0.85em; background: rgba(0,0,0,0.04); padding: 0.1rem 0.35rem; }
  pre code { background: none; padding: 0; }

  .client { margin-top: 1.15rem; }
  .client-name { font-size: 0.9rem; font-weight: 600; color: #222; margin-bottom: 0.15rem; }
  .client p { margin-bottom: 0.2rem; }

  .tool { margin-bottom: 0.8rem; }
  .tool-name { font-family: "SF Mono", "Fira Code", monospace; font-size: 0.85rem; color: #111; }
  .tool p { margin-top: 0.1rem; }

  .topic-group { margin-top: 1.2rem; }
  .topic-group h3 { font-family: "Inter", system-ui, sans-serif; font-size: 0.9rem; font-weight: 600; color: #222; margin-bottom: 0.3rem; }
  .topic-group ul { list-style: none; }
  .topic-group li { position: relative; padding-left: 1rem; margin-bottom: 0.2rem; font-size: 0.875rem; }
  .topic-group li::before { content: "·"; position: absolute; left: 0; color: #ccc; }
  .topic-name { color: #333; font-weight: 500; }
  .topic-sum { color: #888; }

  .divider { border: none; border-top: 1px solid rgba(0,0,0,0.06); margin: 2.75rem 0; }
  .foot-note { font-size: 0.8rem; color: #999; line-height: 1.7; }

  .site-footer { background: #111; color: #888; font-size: 0.8rem; text-align: center; padding: 1.5rem 1rem; }
  .site-footer a { color: #aaa; text-decoration: none; }
  .site-footer a:hover { color: #fff; }

  @media (max-width: 640px) {
    .top-bar-inner { height: 56px; padding: 0 1.25rem; }
    .wrap { padding-top: 3rem; }
    .page-title { font-size: 1.8rem; }
  }
</style>
</head>
<body>
<nav class="top-bar"><div class="top-bar-inner"><a class="top-logo" href="/">Clay Nicholson</a></div></nav>

<main class="wrap">
  <h1 class="page-title">MIT Student Info MCP</h1>
  <p class="page-tagline">A free, public MCP server for MIT student knowledge — for any student's AI assistant to use.</p>

  <div class="section">
    <h2>What this is</h2>
    <p>This URL is a <a href="https://modelcontextprotocol.io">Model Context Protocol</a> server. Connect it to Claude, Cursor, or any MCP-capable assistant and it can search and read a curated knowledge base of MIT student information: GIRs and grading, majors and course numbers, UROP, housing and dining, IAP, financial aid, careers, transportation, campus lingo, traditions, and more.</p>
    <p>It contains public institutional information only — nothing personal, nothing behind Touchstone, no course materials. Every topic cites its official MIT sources.</p>
  </div>

  <div class="section">
    <h2>Connect it</h2>
    <p>The server speaks MCP over streamable HTTP at:</p>
    <code class="endpoint">${esc(endpoint)}</code>

    <div class="client">
      <div class="client-name">Claude Code</div>
      <pre><code>claude mcp add --transport http mit-info ${esc(endpoint)}</code></pre>
    </div>

    <div class="client">
      <div class="client-name">Claude (web &amp; desktop)</div>
      <p>Settings → Connectors → Add custom connector, then paste the URL above.</p>
    </div>

    <div class="client">
      <div class="client-name">Cursor / other MCP clients</div>
      <p>Add a remote server with the URL above, e.g. in <code>mcp.json</code>:</p>
      <pre><code>{
  "mcpServers": {
    "mit-info": { "url": "${esc(endpoint)}" }
  }
}</code></pre>
    </div>
  </div>

  <div class="section">
    <h2>Tools</h2>
    <div class="tool"><span class="tool-name">search_mit_info</span><p>Keyword search across every topic — returns ranked matches with snippets.</p></div>
    <div class="tool"><span class="tool-name">list_mit_topics</span><p>Browse all topics by category.</p></div>
    <div class="tool"><span class="tool-name">read_mit_topic</span><p>Read a full topic, including its official source links.</p></div>
  </div>

  <div class="section">
    <h2>What's inside</h2>
    <p>${topics.length} topics, maintained by hand:</p>
    ${topicsHtml}
  </div>

  <hr class="divider">
  <p class="foot-note">Maintained by <a href="/">Clay Nicholson</a> (MIT '29). Not an official MIT resource and not affiliated with MIT — always verify current dates, deadlines, and policies against the official sources each topic cites. Spotted something wrong or missing? <a href="mailto:clayn@mit.edu">Let me know</a>.</p>
</main>

<footer class="site-footer"><a href="/">claynicholson.com</a></footer>
</body>
</html>`;
}
