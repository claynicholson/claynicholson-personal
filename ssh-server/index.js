const { Server } = require("ssh2");
const fs = require("fs");
const path = require("path");
const { commands, BANNER, C, green, dim, accent } = require("./content");

const HOST_KEY_PATH = path.join(__dirname, "host.key");

// Generate host key if it doesn't exist
if (!fs.existsSync(HOST_KEY_PATH)) {
  console.log("No host key found. Generate one with: npm run keygen");
  console.log("Or: ssh-keygen -t ed25519 -f host.key -N \"\"");
  process.exit(1);
}

const prompt = () =>
  `${C.blue}${C.bold}clay${C.reset}${C.overlay}@${C.reset}${C.green}${C.bold}claynicholson.com${C.reset}${C.overlay}:${C.reset}${C.yellow}~${C.reset}${C.overlay}$ ${C.reset}`;

const PORT = parseInt(process.env.PORT || "2222", 10);

const server = new Server(
  { hostKeys: [fs.readFileSync(HOST_KEY_PATH)] },
  (client) => {
    let clientIP = "unknown";

    client.on("authentication", (ctx) => {
      // Accept any authentication
      ctx.accept();
    });

    client.on("ready", () => {
      client.on("session", (accept) => {
        const session = accept();

        session.on("pty", (accept) => {
          accept();
        });

        session.on("shell", (accept) => {
          const stream = accept();
          let inputBuffer = "";
          let commandHistory = [];
          let historyIndex = -1;
          let cursorPos = 0;

          // Send banner
          stream.write(BANNER.replace(/\n/g, "\r\n") + "\r\n");
          stream.write(prompt());

          stream.on("data", (data) => {
            const str = data.toString();

            for (let i = 0; i < str.length; i++) {
              const ch = str[i];
              const code = str.charCodeAt(i);

              // Handle escape sequences (arrow keys)
              if (ch === "\x1b" && str[i + 1] === "[") {
                const arrow = str[i + 2];
                if (arrow === "A") {
                  // Up arrow
                  if (
                    commandHistory.length > 0 &&
                    historyIndex < commandHistory.length - 1
                  ) {
                    historyIndex++;
                    const cmd =
                      commandHistory[commandHistory.length - 1 - historyIndex];
                    // Clear current line
                    stream.write(
                      `\r${prompt()}${" ".repeat(inputBuffer.length)}\r${prompt()}${cmd}`
                    );
                    inputBuffer = cmd;
                    cursorPos = cmd.length;
                  }
                  i += 2;
                  continue;
                } else if (arrow === "B") {
                  // Down arrow
                  if (historyIndex > 0) {
                    historyIndex--;
                    const cmd =
                      commandHistory[commandHistory.length - 1 - historyIndex];
                    stream.write(
                      `\r${prompt()}${" ".repeat(inputBuffer.length)}\r${prompt()}${cmd}`
                    );
                    inputBuffer = cmd;
                    cursorPos = cmd.length;
                  } else if (historyIndex === 0) {
                    historyIndex = -1;
                    stream.write(
                      `\r${prompt()}${" ".repeat(inputBuffer.length)}\r${prompt()}`
                    );
                    inputBuffer = "";
                    cursorPos = 0;
                  }
                  i += 2;
                  continue;
                } else if (arrow === "C") {
                  // Right arrow
                  if (cursorPos < inputBuffer.length) {
                    cursorPos++;
                    stream.write("\x1b[C");
                  }
                  i += 2;
                  continue;
                } else if (arrow === "D") {
                  // Left arrow
                  if (cursorPos > 0) {
                    cursorPos--;
                    stream.write("\x1b[D");
                  }
                  i += 2;
                  continue;
                }
                i += 2;
                continue;
              }

              // Enter
              if (ch === "\r" || ch === "\n") {
                stream.write("\r\n");
                const trimmed = inputBuffer.trim();

                if (trimmed) {
                  commandHistory.push(trimmed);
                  historyIndex = -1;

                  const [cmdName] = trimmed.toLowerCase().split(/\s+/);

                  if (cmdName === "exit" || cmdName === "quit") {
                    stream.write(
                      `${green("Goodbye! Thanks for visiting.")}\r\n`
                    );
                    stream.end();
                    client.end();
                    return;
                  }

                  if (cmdName === "clear") {
                    stream.write("\x1b[2J\x1b[H");
                  } else if (commands[cmdName]) {
                    const output = commands[cmdName]();
                    stream.write(output.replace(/\n/g, "\r\n") + "\r\n");
                  } else {
                    stream.write(
                      `${accent(`command not found: ${cmdName}`)} ${dim("— Type 'help' for available commands.")}\r\n`
                    );
                  }
                }

                inputBuffer = "";
                cursorPos = 0;
                stream.write(prompt());
                continue;
              }

              // Backspace
              if (code === 127 || code === 8) {
                if (cursorPos > 0) {
                  inputBuffer =
                    inputBuffer.slice(0, cursorPos - 1) +
                    inputBuffer.slice(cursorPos);
                  cursorPos--;
                  // Rewrite the line
                  stream.write(
                    `\r${prompt()}${inputBuffer} \r${prompt()}${inputBuffer.slice(0, cursorPos)}`
                  );
                }
                continue;
              }

              // Ctrl+C
              if (code === 3) {
                stream.write("^C\r\n");
                inputBuffer = "";
                cursorPos = 0;
                stream.write(prompt());
                continue;
              }

              // Ctrl+D
              if (code === 4) {
                stream.write(
                  `\r\n${green("Goodbye! Thanks for visiting.")}\r\n`
                );
                stream.end();
                client.end();
                return;
              }

              // Ctrl+L (clear)
              if (code === 12) {
                stream.write("\x1b[2J\x1b[H");
                stream.write(prompt() + inputBuffer);
                continue;
              }

              // Tab completion
              if (code === 9) {
                const partial = inputBuffer.toLowerCase().trim();
                if (partial) {
                  const allCmds = [
                    ...Object.keys(commands),
                    "clear",
                    "exit",
                    "quit",
                  ];
                  const matches = allCmds.filter((c) => c.startsWith(partial));
                  if (matches.length === 1) {
                    stream.write(
                      `\r${prompt()}${" ".repeat(inputBuffer.length)}\r${prompt()}${matches[0]}`
                    );
                    inputBuffer = matches[0];
                    cursorPos = inputBuffer.length;
                  } else if (matches.length > 1) {
                    stream.write(`\r\n${matches.join("  ")}\r\n`);
                    stream.write(prompt() + inputBuffer);
                  }
                }
                continue;
              }

              // Regular character
              if (code >= 32) {
                inputBuffer =
                  inputBuffer.slice(0, cursorPos) +
                  ch +
                  inputBuffer.slice(cursorPos);
                cursorPos++;
                // Rewrite from cursor position
                stream.write(
                  `\r${prompt()}${inputBuffer}\r${prompt()}${inputBuffer.slice(0, cursorPos)}`
                );
              }
            }
          });

          stream.on("close", () => {
            // Client disconnected
          });
        });
      });
    });

    client.on("error", (err) => {
      // Ignore client errors
    });
  }
);

server.listen(PORT, "0.0.0.0", () => {
  console.log(`SSH server listening on port ${PORT}`);
  console.log(`Connect with: ssh -p ${PORT} guest@localhost`);
});

server.on("error", (err) => {
  console.error("Server error:", err.message);
});
