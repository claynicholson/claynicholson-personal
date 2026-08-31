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
  body { font-family: ui-sans-serif, system-ui, sans-serif; max-width: 42rem; margin: 3rem auto; padding: 0 1rem 3rem; line-height: 1.6; color: #1a1a1a; }
  code, pre { background: #f3f3f3; border-radius: 4px; padding: 0.1rem 0.35rem; font-size: 0.9em; }
  pre { padding: 0.75rem 1rem; overflow-x: auto; }
  h1 { font-size: 1.6rem; margin-bottom: 0.75rem; }
  b { font-size: 0.95rem; }
  p { margin-bottom: 0.75rem; }
  .note { color: #666; font-size: 0.9rem; border-top: 1px solid #ddd; margin-top: 2rem; padding-top: 1rem; }
</style>
</head>
<body>
<h1>MIT Student Info MCP</h1>
<p>A free MCP server with MIT student info.</p>
<p><b>Claude:</b> Settings &gt; Connectors &gt; Add custom connector, paste <code>${ENDPOINT}</code>. Or in Claude Code:</p>
<pre>claude mcp add --transport http mit-info ${ENDPOINT}</pre>
<p><b>ChatGPT:</b> Settings &gt; Connectors &gt; enable Developer mode, then create a connector with <code>${ENDPOINT}</code>.</p>
<p>Tools: <code>search_mit_info</code>, <code>list_mit_topics</code>, <code>read_mit_topic</code>.</p>
<p class="note">Not an official MIT site. If there is any site which contains useful information that is missing from the MCP, please send it to <a href="mailto:clayn@mit.edu">clayn@mit.edu</a>.</p>
</body>
</html>`;
}
