# claynicholson.com

Terminal-style personal site. Same content, two surfaces:

- **Web** — Next.js app, fzf-style filterable menu, click/keyboard navigable.
- **SSH** — `ssh ssh.claynicholson.com`, fzf-style menu in a real terminal.

Both render from the same content tree in `shared/sections/`.

---

## Run it locally

```bash
npm install
npm run dev                 # web on :3000

cd ssh-server
npm install
npm run keygen              # one-time: generate host.key
PORT=2222 npm start         # then: ssh -p 2222 guest@localhost
```

---

## How content is organized

```
shared/
  blocks.js            Block DSL + ANSI renderer (CommonJS)
  ascii.js             BANNER + PORTRAIT (shared art)
  sections/
    index.js           Section registry — order = menu order
    about.js           One file per topic. Edit these.
    now.js
    robotics.js
    hackclub.js
    research.js
    education.js
    awards.js
    projects.js
    contact.js

src/
  data/commands.js     Special commands (help, ls, neofetch, ssh, ...)
  components/          Web UI (Terminal, CommandMenu)
  lib/renderJsx.jsx    JSX renderer for the block DSL

ssh-server/
  index.js             SSH transport + fzf menu state machine
  tui.js               SSH-only helpers (banner wrap, neofetch grid)
```

The web and SSH renderers are both thin — all the writing lives in `shared/sections/`.

---

## Adding content

### Edit an existing section

Open the matching `shared/sections/*.js`. Each file is a list of **blocks** built from a small DSL:

```js
const { H, SUB, P, SPACER, ROW, LINK, BULLET, NEST, CARD } = require("../blocks");

module.exports = {
  id: "about",
  label: "about",
  description: "Who is Clay Nicholson?",
  blocks: [
    H("About Me"),
    P("Hello, my name is Clay..."),
    SPACER,
    ROW("GitHub:", LINK("https://github.com/claynicholson", "github.com/claynicholson")),
  ],
};
```

Save → both web and SSH update on next reload. There is no codegen step.

### Add a new top-level section

1. Create `shared/sections/uses.js` (or whatever):

   ```js
   const { H, SUB, NEST, BULLET } = require("../blocks");

   module.exports = {
     id: "uses",
     label: "uses",
     description: "Hardware and software I use",
     blocks: [
       H("Uses"),
       SUB("Editor"),
       NEST([BULLET("Neovim"), BULLET("VS Code for Verilog")]),
     ],
   };
   ```

2. Register it in `shared/sections/index.js`:

   ```js
   const uses = require("./uses");

   const SECTIONS = [
     about,
     now,
     uses,         // ← here, in the order you want it in the menu
     robotics,
     ...
   ];
   ```

It now appears in the web menu, the SSH menu, the `help` output, and `ls`.

### Block reference

| Block            | Use                                                              |
| ---------------- | ---------------------------------------------------------------- |
| `H(text)`        | Top-level title. One per section, mauve bold.                    |
| `SUB(text, meta)`| Green `>> Subhead` with optional dim meta string.                |
| `P(text)`        | Plain paragraph.                                                 |
| `DIM(text)`      | Dim/overlay-color line for timelines or asides.                  |
| `SPACER`         | Empty line.                                                      |
| `LINK(url, label)` | Inline link. Use directly inside `ROW` or as a standalone block. |
| `ROW(label, value)` | "Label .... value". `value` may be a string or `LINK(...)`. |
| `BULLET(text)`   | "> bullet" line.                                                 |
| `LINKED_BULLET(url, label)` | "> link" — bullet whose body is a link.              |
| `NEST([...])`    | Indent + left-rule a group of blocks. The "section" pattern.     |
| `CARD({ title, body, meta, link })` | Compact card for a project / season / press item. |
| `RAW({ ansi, jsx })` | Escape hatch when the two renderers must diverge (portrait, neofetch grid). |

### Adding non-section commands

Edit `src/data/commands.js` (web) and `ssh-server/index.js` (`specials` map) and `ssh-server/tui.js` (rendering, if it needs hand-tuned ANSI). Examples: `clear`, `ssh`, `neofetch`, `sudo`. Don't put real content here — content goes in `shared/sections/`.

---

## Menu UX

### Web

- Type to filter the section list.
- Arrow keys (↑/↓) navigate the filtered items.
- Enter runs the highlighted item, or — if the filter doesn't match anything — runs the literal input as a command (so `neofetch` works even if you typo it).
- Tab autocompletes to the longest common prefix of the filtered ids.
- Esc clears the filter.

### SSH

Same model, plus:

- `j`/`k` and `gg`/`G` for vim-style nav (only when the filter is empty and the key isn't a prefix of any item).
- `Ctrl-N`/`Ctrl-P` always navigate, even while filtering.
- `Ctrl-C` clears the filter, `Ctrl-L` clears the screen, `Ctrl-D` disconnects.

---

## Deploying

### Web (Vercel)

Standard Next.js deploy. Push to main; Vercel handles it.

### SSH server (Fly)

```bash
# from the project root (NOT inside ssh-server/)
fly deploy
```

`fly.toml` lives at the project root because the Docker build needs both `ssh-server/` and `shared/` in its context. The Dockerfile is at `ssh-server/Dockerfile` and the build is run from the parent.
