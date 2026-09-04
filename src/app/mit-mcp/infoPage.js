// Human-facing page served when /mit-mcp is opened in a browser.

const ENDPOINT = "https://claynicholson.com/mit-mcp";

export function renderInfoPage() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>MIT Student Info MCP</title>
<link rel="icon" href="/mit-mcp-icon.png" type="image/png">
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
<p>A free MCP server with MIT student info. It covers classes, grading, UROP, housing, dining, money, and campus life.</p>
<p><b>Claude:</b> Settings &gt; Connectors &gt; Add custom connector, paste <code>${ENDPOINT}</code>. Or in Claude Code:</p>
<pre>claude mcp add --transport http mit-info ${ENDPOINT}</pre>
<p><b>ChatGPT:</b> Settings &gt; Connectors &gt; enable Developer mode, then create a connector with <code>${ENDPOINT}</code>.</p>
<p>Tools: <code>search_mit_info</code>, <code>list_mit_topics</code>, <code>read_mit_topic</code>, <code>get_mit_calendar</code>.</p>
<p><button id="selftest" type="button">Test the server</button> <span id="selftest-out"></span></p>
<p class="note">Not an official MIT site. If there is any site which contains useful information that is missing from the MCP, please send it to <a href="mailto:clayn@mit.edu">clayn@mit.edu</a>.</p>
<script>
  document.getElementById("selftest").addEventListener("click", async () => {
    const out = document.getElementById("selftest-out");
    out.textContent = "testing...";
    out.style.color = "#666";
    try {
      const res = await fetch("${ENDPOINT}", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json, text/event-stream" },
        body: JSON.stringify({
          jsonrpc: "2.0", id: 1, method: "initialize",
          params: { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "selftest", version: "1" } },
        }),
      });
      const text = await res.text();
      let name = "";
      try { name = JSON.parse(text).result.serverInfo.name; } catch {}
      if (res.ok && name) {
        out.textContent = "OK: " + name + " responded (HTTP " + res.status + ")";
        out.style.color = "#1a7f37";
      } else {
        out.textContent = "FAILED: HTTP " + res.status + " " + text.slice(0, 120);
        out.style.color = "#b3261e";
      }
    } catch (err) {
      out.textContent = "FAILED: " + err;
      out.style.color = "#b3261e";
    }
  });
</script>
</body>
</html>`;
}
