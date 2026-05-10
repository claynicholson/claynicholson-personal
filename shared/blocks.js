// Shared content DSL — consumed by both the web (JSX renderer) and the
// SSH server (ANSI renderer). Adding a new section means dropping a new file
// in shared/sections/ and registering it in shared/sections/index.js.
//
// Blocks are plain data objects so both renderers can walk the same tree.
// Construct them with the helpers below; never hand-write the type tags.

const COLORS = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  underline: "\x1b[4m",
  invert: "\x1b[7m",
  blue: "\x1b[38;2;137;180;250m",
  green: "\x1b[38;2;166;227;161m",
  mauve: "\x1b[38;2;203;166;247m",
  pink: "\x1b[38;2;243;139;168m",
  teal: "\x1b[38;2;137;220;235m",
  yellow: "\x1b[38;2;249;226;175m",
  rosewater: "\x1b[38;2;245;224;220m",
  overlay: "\x1b[38;2;108;112;134m",
  text: "\x1b[38;2;205;214;244m",
};

// ─── Block constructors ──────────────────────────────────────────────────────

// Top-level title (mauve bold). One per section, at the top.
const H = (text) => ({ type: "header", text });

// Subhead "(>> Foo)" with optional dim meta beside it.
const SUB = (text, meta) => ({ type: "subhead", text, meta });

// Paragraph of body text.
const P = (text) => ({ type: "paragraph", text });

// Dim line (overlay color) — for timelines, captions, asides.
const DIM = (text) => ({ type: "dim", text });

// Empty line.
const SPACER = { type: "spacer" };

// Inline link. Use directly inside ROW or pass as a block for a standalone line.
const LINK = (url, label) => ({ type: "link", url, label: label || url });

// "Label .... value" row (yellow label + value). value may be string or LINK.
const ROW = (label, value) => ({ type: "row", label, value });

// "> bullet" line.
const BULLET = (text) => ({ type: "bullet", text });

// "> Label" with the label rendered as a clickable link.
const LINKED_BULLET = (url, label) => ({
  type: "linked_bullet",
  link: { type: "link", url, label: label || url },
});

// Indent + left-rule a group of children (the "Section" pattern from the old web UI).
const NEST = (children) => ({ type: "nest", children });

// Compact card for a sub-project / season / press item.
//   { title, body?, meta?, link? }
const CARD = ({ title, body, meta, link }) => ({
  type: "card",
  title,
  body,
  meta,
  link,
});

// Escape hatch for content that genuinely diverges between renderers (e.g.
// the ASCII portrait, the neofetch grid). Provide both forms; the renderer
// picks the right one.
const RAW = ({ ansi, jsx }) => ({ type: "raw", ansi, jsx });

// ─── ANSI renderer ───────────────────────────────────────────────────────────
//
// Used by the SSH server. Returns a single string with \n line separators —
// the SSH transport layer converts to \r\n on the way out.

function renderAnsi(blocks) {
  const out = [];
  for (const b of blocks) out.push(...renderBlockAnsi(b, 0));
  return out.join("\n");
}

function pad(level) {
  return "  ".repeat(level + 1); // every block gets a 2-space gutter from the prompt
}

function inlineAnsi(node) {
  if (node == null) return "";
  if (typeof node === "string") return node;
  if (node.type === "link") {
    return `${COLORS.teal}${COLORS.underline}${node.label}${COLORS.reset}`;
  }
  return "";
}

function renderBlockAnsi(b, level) {
  const p = pad(level);
  switch (b.type) {
    case "header":
      return [`${COLORS.mauve}${COLORS.bold}${b.text}${COLORS.reset}`, ""];
    case "subhead":
      return [
        `${p}${COLORS.green}>> ${b.text}${COLORS.reset}` +
          (b.meta ? ` ${COLORS.overlay}${b.meta}${COLORS.reset}` : ""),
      ];
    case "paragraph":
      return [`${p}${b.text}`];
    case "dim":
      return [`${p}${COLORS.overlay}${b.text}${COLORS.reset}`];
    case "spacer":
      return [""];
    case "link":
      return [`${p}${inlineAnsi(b)}`];
    case "row":
      return [
        `${p}${COLORS.yellow}${b.label}${COLORS.reset} ${inlineAnsi(b.value)}`,
      ];
    case "bullet":
      return [`${p}${COLORS.overlay}>${COLORS.reset} ${b.text}`];
    case "linked_bullet":
      return [`${p}${COLORS.overlay}>${COLORS.reset} ${inlineAnsi(b.link)}`];
    case "nest":
      return b.children.flatMap((c) => renderBlockAnsi(c, level + 1));
    case "card": {
      const lines = [];
      const titleLine =
        `${p}${COLORS.pink}${b.title}${COLORS.reset}` +
        (b.meta ? ` ${COLORS.overlay}${b.meta}${COLORS.reset}` : "");
      lines.push(titleLine);
      if (b.body) lines.push(`${p}  ${COLORS.overlay}${b.body}${COLORS.reset}`);
      if (b.link) lines.push(`${p}  ${inlineAnsi(b.link)}`);
      return lines;
    }
    case "raw":
      return [b.ansi != null ? b.ansi : ""];
    default:
      return [];
  }
}

module.exports = {
  COLORS,
  H,
  SUB,
  P,
  DIM,
  SPACER,
  LINK,
  ROW,
  BULLET,
  LINKED_BULLET,
  NEST,
  CARD,
  RAW,
  renderAnsi,
};
