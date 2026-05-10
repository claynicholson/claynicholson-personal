// SSH-only TUI bits: banner, ASCII portrait, neofetch grid, and the help/ls/
// whoami commands that have a hand-tuned ANSI layout. Section content lives
// in ../shared/sections — do not duplicate it here.

const { COLORS: C } = require("../shared/blocks");
const about = require("../shared/sections/about");
const { BANNER: BANNER_RAW, PORTRAIT: PORTRAIT_RAW } = require("../shared/ascii");

const BANNER = `
${C.mauve}${BANNER_RAW}${C.reset}

${C.green}Welcome to Clay's personal server.${C.reset}
${C.overlay}Use ${C.yellow}↑/↓${C.overlay} + ${C.yellow}Enter${C.overlay} to navigate the menu, or just type a command. Type ${C.yellow}exit${C.overlay} to disconnect.${C.reset}
`;

const PORTRAIT = PORTRAIT_RAW;

function header(text) {
  return `${C.mauve}${C.bold}${text}${C.reset}`;
}

function helpAnsi(menuItems) {
  let out = header("Available Commands") + "\n\n";
  const extras = [
    ["help", "Show this list"],
    ["whoami", "Quick identity check"],
    ["ls", "List sections as files"],
    ["menu", "Show the menu again"],
    ["clear", "Clear the screen"],
    ["exit", "Disconnect"],
  ];
  for (const item of menuItems) {
    out += `  ${C.green}${item.id.padEnd(14)}${C.reset} ${C.overlay}${item.description}${C.reset}\n`;
  }
  out += "\n";
  for (const [name, desc] of extras) {
    out += `  ${C.green}${name.padEnd(14)}${C.reset} ${C.overlay}${desc}${C.reset}\n`;
  }
  return out;
}

function whoamiAnsi() {
  const m = about.meta;
  return `${C.green}${m.name}${C.reset} ${C.overlay}—${C.reset} ${C.yellow}${m.school} ${m.year}${C.reset} ${C.overlay}|${C.reset} ${m.course}`;
}

function lsAnsi(sections) {
  return sections
    .map((s) => `${C.green}${s.id}.txt${C.reset}`)
    .join("  ") + `  ${C.pink}portrait.ascii${C.reset}  ${C.overlay}README.md${C.reset}`;
}

function neofetchAnsi() {
  const m = about.meta;
  const face = [
    "    ___    ",
    "   /   \\   ",
    "  | o o |  ",
    "  |  >  |  ",
    "  | \\_/ |  ",
    "   \\___/   ",
    "           ",
  ];
  const info = [
    `${C.green}clay${C.reset}@${C.pink}claynicholson.com${C.reset}`,
    "─".repeat(20),
    `${C.yellow}OS${C.reset}:         Clay Nicholson v1.0`,
    `${C.yellow}Host${C.reset}:       ${m.school} ${m.year}`,
    `${C.yellow}Kernel${C.reset}:     ${m.course}`,
    `${C.yellow}Uptime${C.reset}:     18 years`,
    `${C.yellow}Shell${C.reset}:      brain-bash 4.2`,
    `${C.yellow}Location${C.reset}:   ${m.location}`,
    `${C.yellow}Languages${C.reset}: Java, Python, C, JS`,
    `${C.yellow}Interests${C.reset}: Robotics, ML, IC Design`,
    `${C.yellow}Editor${C.reset}:     VS Code / Vim`,
    "",
    `${C.pink}███${C.mauve}███${C.blue}███${C.teal}███${C.green}███${C.yellow}███${C.reset}`,
  ];
  let out = "";
  const maxLines = Math.max(face.length, info.length);
  for (let i = 0; i < maxLines; i++) {
    const left = `${C.teal}${face[i] || "           "}${C.reset}`;
    const right = info[i] || "";
    out += `  ${left}  ${right}\n`;
  }
  return out;
}

module.exports = { BANNER, PORTRAIT, helpAnsi, whoamiAnsi, lsAnsi, neofetchAnsi };
