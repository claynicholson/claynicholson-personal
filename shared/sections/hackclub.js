const { H, P, SPACER, SUB, NEST, LINK } = require("../blocks");

// To add a Hack Club project: append a new entry to `projects` below.
// Each project: { name, description, url?, github? }

const intro =
  "I joined Hack Club in the summer of 2024. Hack Club has changed my life. Growing up in Vermont, I never really had a close technical community. Ironically, Hack Club is based just 20 minutes from my house. I decided to take my senior year to gap year there.";

const role = "Staff member (paid) — I run major hardware/grant programs for teens.";

const projects = [
  {
    name: "Blueprint",
    description: "PCB/hardware grants for 25k+ teens. AMD partnership, ~$120k+ in grants distributed.",
    url: "https://blueprint.hackclub.com/",
    github: "https://github.com/hackclub/blueprint/",
  },
  {
    name: "Stasis",
    description: "100-person hardware hackathon in Austin, TX — May 2026.",
  },
  {
    name: "Prototype",
    description: "AMD-sponsored hackathon in San Jose, 2025.",
  },
  {
    name: "Congressional App Challenge",
    description: "Certification program — worked with Rep. Becca Balint's office.",
  },
  {
    name: "The Bin",
    description: "Design electrical circuits, and get shipped the parts to build them.",
    url: "https://hackclub.com/bin/",
  },
  {
    name: "Hack Club Grounded",
    description: "Design any PCB circuit board, get the funding to make it!",
    url: "https://grounded.hackclub.com/",
    github: "https://github.com/hackclub/grounded",
  },
];

const blocks = [
  H("Hack Club"),
  P(intro),
  SPACER,
  P(role),
  SPACER,
  P("Projects:"),
];

for (const proj of projects) {
  blocks.push(SUB(proj.name));
  const inner = [P(proj.description)];
  if (proj.url) inner.push(LINK(proj.url));
  if (proj.github)
    inner.push(LINK(proj.github, `src: ${proj.github.replace("https://github.com/", "")}`));
  blocks.push(NEST(inner));
}

module.exports = {
  id: "hackclub",
  label: "hackclub",
  description: "Hack Club projects",
  projects,
  blocks,
};
