// Human-facing page served when /mit-mcp is opened in a browser.

const ENDPOINT = "https://claynicholson.com/mit-mcp";

export function renderInfoPage() {
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
  pre { background: #f3f3f3; border-radius: 4px; padding: 0.75rem 1rem; font-size: 0.9em; overflow-x: auto; }
  h1 { font-size: 1.6rem; }
  .note { color: #666; font-size: 0.9rem; border-top: 1px solid #ddd; margin-top: 2rem; padding-top: 1rem; }
</style>
</head>
<body>
<div class="top"><a href="/">Clay Nicholson</a></div>
<h1>MIT Student Info MCP</h1>
<p>A free MCP server with MIT student info. Add it to Claude, Cursor, or any MCP client:</p>
<pre>claude mcp add --transport http mit-info ${ENDPOINT}</pre>
<p class="note">Not an official MIT site. If there is any site which contains useful information that is missing from the MCP, please send it to <a href="mailto:clayn@mit.edu">clayn@mit.edu</a>.</p>
</body>
</html>`;
}
