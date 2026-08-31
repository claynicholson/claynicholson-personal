// Human-facing page served when /mit-mcp is opened in a browser. Kept to a
// single dark viewport with almost no copy; Space Mono for the heading so it
// reads as its own thing rather than the main site's branding.

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function renderInfoPage({ origin, topics }) {
  const endpoint = `${origin}/mit-mcp`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>MIT Student Info MCP</title>
<meta name="description" content="A public MCP server with MIT student info.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  ::selection { background: rgba(255,255,255,0.15); }
  html, body { height: 100%; }
  body {
    background: #111;
    color: #cfcfcf;
    font-family: "Inter", system-ui, sans-serif;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    display: flex;
    flex-direction: column;
  }
  a { color: #aaa; text-decoration: none; transition: color .15s ease; }
  a:hover { color: #fff; }

  .top { padding: 1.1rem 1.5rem; }
  .top a { font-family: "Space Mono", monospace; font-size: 0.85rem; color: #888; }
  .top a:hover { color: #fff; }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 640px;
    width: 100%;
    margin: 0 auto;
    padding: 0 1.5rem 4rem;
  }
  h1 {
    font-family: "Space Mono", monospace;
    font-weight: 700;
    font-size: 1.7rem;
    color: #fff;
    letter-spacing: -0.02em;
    margin-bottom: 0.4rem;
  }
  .sub { font-size: 0.9rem; color: #888; margin-bottom: 2rem; }
  .box {
    font-family: "Space Mono", monospace;
    font-size: 0.8rem;
    color: #ddd;
    background: #1a1a1a;
    border: 1px solid #2a2a2a;
    padding: 0.7rem 0.9rem;
    margin-bottom: 0.75rem;
    overflow-x: auto;
    white-space: nowrap;
  }
  .box span { color: #666; user-select: none; }
  .note { font-size: 0.8rem; color: #666; margin-top: 1.6rem; }
  .note a { text-decoration: underline; text-underline-offset: 3px; text-decoration-color: #444; }

  @media (max-width: 640px) {
    h1 { font-size: 1.3rem; }
    .box { font-size: 0.72rem; }
  }
</style>
</head>
<body>
<nav class="top"><a href="/">Clay Nicholson</a></nav>

<main>
  <h1>MIT Student Info MCP</h1>
  <p class="sub">${topics.length} topics on classes, money, housing, and campus life. Free for any MCP client.</p>

  <div class="box"><span>endpoint&nbsp;&nbsp;</span>${esc(endpoint)}</div>
  <div class="box"><span>$&nbsp;</span>claude mcp add --transport http mit-info ${esc(endpoint)}</div>

  <p class="note">In Claude or Cursor, add it as a custom connector with the endpoint URL. Made by <a href="/">Clay Nicholson</a>, MIT '29. Not an official MIT site.</p>
</main>
</body>
</html>`;
}
