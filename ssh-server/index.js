// SSH server. The "content" lives in ../shared/sections — this file only
// handles transport, the fzf-style menu (filter + nav), and the few special
// commands that aren't generated from sections.

const { Server } = require("ssh2");
const fs = require("fs");
const path = require("path");

const { COLORS: C, renderAnsi } = require("../shared/blocks");
const { SECTIONS, SECTIONS_BY_ID } = require("../shared/sections");
const { BANNER, PORTRAIT, neofetchAnsi, helpAnsi, lsAnsi, whoamiAnsi } =
  require("./tui");

const HOST_KEY_PATH = path.join(__dirname, "host.key");
if (!fs.existsSync(HOST_KEY_PATH)) {
  console.log("No host key found. Generate one with: npm run keygen");
  console.log('Or: ssh-keygen -t ed25519 -f host.key -N ""');
  process.exit(1);
}

const PORT = parseInt(process.env.PORT || "2222", 10);

// Menu items mirror the web menu (sections + a couple of extras).
const MENU_EXTRAS = [
  { id: "neofetch", label: "neofetch", description: "System info display" },
  { id: "ascii", label: "ascii", description: "ASCII art portrait" },
];

const MENU_ITEMS = [
  ...SECTIONS.map((s) => ({
    id: s.id,
    label: s.label,
    description: s.description,
  })),
  ...MENU_EXTRAS,
];

// Special (non-section) commands.
const specials = {
  help: () => helpAnsi(MENU_ITEMS),
  whoami: () => whoamiAnsi(),
  ls: () => lsAnsi(SECTIONS),
  ascii: () => `${C.mauve}${PORTRAIT}${C.reset}`,
  neofetch: () => neofetchAnsi(),
  sudo: () =>
    `${C.pink}[sudo] password for clay: ********${C.reset}\n${C.pink}Nice try.${C.reset}`,
  blog: () =>
    `${C.mauve}${C.bold}Blog${C.reset}\n${C.overlay}  Coming soon...${C.reset}`,
};

function runCommand(name) {
  if (specials[name]) return specials[name]();
  if (SECTIONS_BY_ID[name]) return renderAnsi(SECTIONS_BY_ID[name].blocks);
  return null;
}

const ALL_COMMAND_NAMES = [
  ...SECTIONS.map((s) => s.id),
  ...Object.keys(specials),
  "clear",
  "menu",
  "exit",
  "quit",
];

// Vim navigation keys are active only when their letter isn't a starting
// character of some menu item — that way new sections automatically reclaim
// the letter for filtering.
const VIM_NAV_KEYS = (() => {
  const candidates = ["j", "k", "g", "G"];
  const set = new Set();
  for (const k of candidates) {
    const conflict = MENU_ITEMS.some((i) =>
      i.label.toLowerCase().startsWith(k.toLowerCase())
    );
    if (!conflict) set.add(k);
  }
  return set;
})();

const prompt = () =>
  `${C.blue}${C.bold}clay${C.reset}${C.overlay}@${C.reset}${C.green}${C.bold}claynicholson.com${C.reset}${C.overlay}:${C.reset}${C.yellow}~${C.reset}${C.overlay}$ ${C.reset}`;

// ─── Filter + render ─────────────────────────────────────────────────────────

function filterItems(filter) {
  if (!filter) return MENU_ITEMS;
  const f = filter.toLowerCase();
  return MENU_ITEMS.filter(
    (i) =>
      i.label.toLowerCase().includes(f) ||
      i.id.toLowerCase().includes(f) ||
      i.description.toLowerCase().includes(f)
  );
}

function renderMenu({ filter, selectedIndex, filtered }) {
  const lines = [];
  lines.push(`${C.overlay}─── Sections ${"─".repeat(60)}${C.reset}`);
  if (filtered.length === 0) {
    lines.push(
      `  ${C.overlay}(no matches — press ${C.yellow}Enter${C.overlay} to run "${filter}" as a command)${C.reset}`
    );
    // Pad so the box doesn't shrink/jump when filter resolves to no matches.
    lines.push("");
  } else {
    const labelWidth = Math.max(...filtered.map((i) => i.label.length)) + 2;
    for (let i = 0; i < filtered.length; i++) {
      const item = filtered[i];
      if (i === selectedIndex) {
        lines.push(
          `${C.pink}>${C.reset} ${C.green}${C.bold}${item.label.padEnd(labelWidth)}${C.reset}${C.overlay}${item.description}${C.reset}`
        );
      } else {
        lines.push(
          `  ${C.blue}${item.label.padEnd(labelWidth)}${C.reset}${C.overlay}${item.description}${C.reset}`
        );
      }
    }
  }
  const vimHint = VIM_NAV_KEYS.size > 0 ? `/${C.yellow}j/k${C.overlay}` : "";
  lines.push(
    `${C.overlay}─── ${C.yellow}↑/↓${C.overlay}${vimHint} navigate  ${C.yellow}Enter${C.overlay} select  ${C.yellow}Esc${C.overlay} clear  type to filter ─${"─".repeat(8)}${C.reset}`
  );
  return { lines, lineCount: lines.length };
}

// ─── SSH server ──────────────────────────────────────────────────────────────

const server = new Server(
  { hostKeys: [fs.readFileSync(HOST_KEY_PATH)] },
  (client) => {
    client.on("authentication", (ctx) => ctx.accept());

    client.on("ready", () => {
      client.on("session", (accept) => {
        const session = accept();
        session.on("pty", (accept) => accept());

        session.on("shell", (accept) => {
          const stream = accept();

          // Per-connection state.
          // The screen layout is, from top to bottom:
          //   [output of prior commands]
          //   [menu block ─ menuLineCount lines]
          //   [blank]
          //   [prompt + filter text]   ← cursor here
          const state = {
            filter: "",
            selectedIndex: 0,
            commandHistory: [],
            historyIndex: -1,
            menuShown: false,
            menuLineCount: 0,
            // Used to detect 'gg' (vim "go to top") within a short window.
            lastGAt: 0,
          };

          // ── Output helpers ──────────────────────────────────────────────

          const w = (s) => stream.write(s.replace(/\n/g, "\r\n"));

          const eraseArea = () => {
            if (state.menuShown) {
              stream.write(`\r\x1b[${state.menuLineCount + 1}A\x1b[J`);
              state.menuShown = false;
            } else {
              stream.write("\r\x1b[2K");
            }
          };

          const drawArea = () => {
            const filtered = filterItems(state.filter);
            // Keep selectedIndex within bounds of the filtered set.
            if (state.selectedIndex >= filtered.length) {
              state.selectedIndex = Math.max(0, filtered.length - 1);
            }
            const { lines, lineCount } = renderMenu({
              filter: state.filter,
              selectedIndex: state.selectedIndex,
              filtered,
            });
            for (const line of lines) stream.write(line + "\r\n");
            stream.write("\r\n");
            state.menuShown = true;
            state.menuLineCount = lineCount;
            stream.write(prompt() + state.filter);
          };

          const redraw = () => {
            eraseArea();
            drawArea();
          };

          // Run a command name: erase area, echo command, print output, redraw.
          const executeCommand = (cmdName) => {
            eraseArea();
            stream.write(prompt() + cmdName + "\r\n");

            if (cmdName === "clear") {
              stream.write("\x1b[2J\x1b[H");
            } else if (cmdName === "menu") {
              // no-op
            } else if (cmdName === "exit" || cmdName === "quit") {
              stream.write(
                `${C.green}Goodbye! Thanks for visiting.${C.reset}\r\n`
              );
              stream.end();
              client.end();
              return false;
            } else {
              const out = runCommand(cmdName);
              if (out != null) {
                w(out + "\n");
              } else {
                stream.write(
                  `${C.pink}command not found: ${cmdName}${C.reset} ${C.overlay}— Type 'help' or use the menu.${C.reset}\r\n`
                );
              }
            }

            // Reset filter + selection and re-show menu.
            state.filter = "";
            state.selectedIndex = 0;
            state.historyIndex = -1;
            drawArea();
            return true;
          };

          // Try to run the highlighted item; fall back to literal filter as
          // command (lets you type things like "neofetch" or your own
          // typo-fixes and hit Enter).
          const handleEnter = () => {
            const filtered = filterItems(state.filter);
            const target =
              filtered.length > 0
                ? filtered[state.selectedIndex].id
                : state.filter.trim();
            if (!target) return true; // empty Enter on empty filter — no-op
            state.commandHistory.push(target);
            return executeCommand(target);
          };

          // ── Initial render ──────────────────────────────────────────────

          w(BANNER + "\r\n");
          drawArea();

          // ── Input handling ──────────────────────────────────────────────

          stream.on("data", (data) => {
            const str = data.toString();

            for (let i = 0; i < str.length; i++) {
              const ch = str[i];
              const code = str.charCodeAt(i);

              // Arrow keys
              if (ch === "\x1b" && str[i + 1] === "[") {
                const arrow = str[i + 2];
                i += 2;
                const filtered = filterItems(state.filter);

                if (arrow === "A") {
                  // Up: nav menu (with command-history fallback when filter empty + Ctrl)
                  if (filtered.length > 0) {
                    state.selectedIndex =
                      (state.selectedIndex - 1 + filtered.length) %
                      filtered.length;
                    redraw();
                  }
                } else if (arrow === "B") {
                  if (filtered.length > 0) {
                    state.selectedIndex =
                      (state.selectedIndex + 1) % filtered.length;
                    redraw();
                  }
                }
                // Left/Right ignored — filter has no inline cursor in this UI.
                continue;
              }

              // Esc — clear filter, or no-op if already clear.
              if (code === 27) {
                if (state.filter !== "") {
                  state.filter = "";
                  state.selectedIndex = 0;
                  redraw();
                }
                continue;
              }

              // Enter
              if (ch === "\r" || ch === "\n") {
                if (!handleEnter()) return;
                continue;
              }

              // Backspace — delete from filter
              if (code === 127 || code === 8) {
                if (state.filter.length > 0) {
                  state.filter = state.filter.slice(0, -1);
                  state.selectedIndex = 0;
                  redraw();
                }
                continue;
              }

              // Ctrl+C — clear filter (or beep silently)
              if (code === 3) {
                if (state.filter !== "") {
                  state.filter = "";
                  state.selectedIndex = 0;
                  redraw();
                }
                continue;
              }

              // Ctrl+D — disconnect
              if (code === 4) {
                stream.write(
                  `\r\n${C.green}Goodbye! Thanks for visiting.${C.reset}\r\n`
                );
                stream.end();
                client.end();
                return;
              }

              // Ctrl+L — clear screen + redraw
              if (code === 12) {
                stream.write("\x1b[2J\x1b[H");
                state.menuShown = false;
                drawArea();
                continue;
              }

              // Ctrl+N / Ctrl+P — fzf-style nav while typing
              if (code === 14 || code === 16) {
                const filtered = filterItems(state.filter);
                if (filtered.length > 0) {
                  if (code === 14) {
                    state.selectedIndex =
                      (state.selectedIndex + 1) % filtered.length;
                  } else {
                    state.selectedIndex =
                      (state.selectedIndex - 1 + filtered.length) %
                      filtered.length;
                  }
                  redraw();
                }
                continue;
              }

              // Tab — autocomplete to first filtered item's id
              if (code === 9) {
                const filtered = filterItems(state.filter);
                if (filtered.length === 1) {
                  state.filter = filtered[0].id;
                  state.selectedIndex = 0;
                  redraw();
                } else if (filtered.length > 1) {
                  // Common prefix expansion
                  const ids = filtered.map((f) => f.id);
                  let prefix = ids[0];
                  for (const id of ids) {
                    while (!id.startsWith(prefix)) prefix = prefix.slice(0, -1);
                  }
                  if (prefix.length > state.filter.length) {
                    state.filter = prefix;
                    state.selectedIndex = 0;
                    redraw();
                  }
                }
                continue;
              }

              // Printable
              if (code >= 32) {
                // Vim nav (only when filter is empty AND key doesn't conflict
                // with any menu item's first letter)
                if (state.filter === "" && VIM_NAV_KEYS.has(ch)) {
                  const filtered = filterItems("");
                  if (ch === "j") {
                    state.selectedIndex =
                      (state.selectedIndex + 1) % filtered.length;
                    state.lastGAt = 0;
                    redraw();
                  } else if (ch === "k") {
                    state.selectedIndex =
                      (state.selectedIndex - 1 + filtered.length) %
                      filtered.length;
                    state.lastGAt = 0;
                    redraw();
                  } else if (ch === "G") {
                    state.selectedIndex = filtered.length - 1;
                    state.lastGAt = 0;
                    redraw();
                  } else if (ch === "g") {
                    const now = Date.now();
                    if (now - state.lastGAt < 600) {
                      // gg — jump to top
                      state.selectedIndex = 0;
                      state.lastGAt = 0;
                      redraw();
                    } else {
                      state.lastGAt = now;
                    }
                  }
                  continue;
                }

                // Otherwise: append to filter
                state.filter += ch;
                state.selectedIndex = 0;
                state.lastGAt = 0;
                redraw();
              }
            }
          });

          stream.on("close", () => {});
        });
      });
    });

    client.on("error", () => {});
  }
);

server.listen(PORT, "0.0.0.0", () => {
  console.log(`SSH server listening on port ${PORT}`);
  console.log(`Connect with: ssh -p ${PORT} guest@localhost`);
});

server.on("error", (err) => {
  console.error("Server error:", err.message);
});
