// Human-facing page served when /mit-mcp is opened in a browser. Plain
// system-font look, short copy, one screen.

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function renderInfoPage({ origin }) {
  const endpoint = `${origin}/mit-mcp`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>MIT Student Info MCP</title>
<meta name="description" content="A free MCP server with MIT student info.">
<style>
  body { font-family: ui-sans-serif, system-ui, sans-serif; max-width: 42rem; margin: 0 auto; padding: 0 1rem 3rem; line-height: 1.6; color: #1a1a1a; }
  .top { margin: 1rem 0 2.5rem; }
  .top a { font-size: 0.9rem; font-weight: 600; color: #1a1a1a; text-decoration: none; }
  .top a:hover { color: #555; }
  code, pre { background: #f3f3f3; border-radius: 4px; padding: 0.1rem 0.35rem; font-size: 0.9em; }
  pre { padding: 0.75rem 1rem; overflow-x: auto; }
  h1 { font-size: 1.6rem; }
  .note { color: #666; font-size: 0.9rem; border-top: 1px solid #ddd; margin-top: 2rem; padding-top: 1rem; }
</style>
</head>
<body>
<div class="top"><a href="/">Clay Nicholson</a></div>
<h1>MIT Student Info MCP</h1>
<p>A free <a href="https://modelcontextprotocol.io">MCP</a> server with MIT student info: GIRs, grading, majors, UROP, housing, dining, IAP, financial aid, campus lingo. All public info, nothing behind Touchstone.</p>
<p>Add it to Claude, Cursor, or any MCP client:</p>
<pre>claude mcp add --transport http mit-info ${esc(endpoint)}</pre>
<p>Tools: <code>search_mit_info</code>, <code>list_mit_topics</code>, <code>read_mit_topic</code>.</p>
<p class="note">Made by <a href="/">a student</a>, not MIT. Check dates and deadlines on the official sites.</p>
</body>
</html>`;
}
