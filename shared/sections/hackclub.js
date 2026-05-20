const { H, P, SPACER, SUB, NEST, LINK } = require("../blocks");

// To add a Hack Club project: append a new entry to `projects` below.
// Each project: { name, description, url?, github? }

const intro =
  "I joined Hack Club in the summer of 2024. Hack Club has changed my life. Growing up in Vermont, I never really had a close technical community. Ironically, Hack Club is based just 20 minutes from my house. I decided to take my senior year to gap year there.";

const role =
  "Full-time gap year engineer, creating open-source programs for teenagers to get into building around the world, partnering with companies such as AMD and GitHub.";

const projects = [
  {
    name: "Blueprint",
    description:
      "Open-source Rails platform I built and lead that funds teenager hardware projects. 25,000 students participated globally. Partnered with AMD as part of their White House AI pledge — AMD funded the program, sponsored $20K scholarships for three winners, and Lisa Su presented them onstage during her CES keynote.",
    url: "https://blueprint.hackclub.com/",
    github: "https://github.com/hackclub/blueprint/",
    extras: [
      { label: "Stats", url: "https://blueprint.hackclub.com/stats" },
      { label: "CES Video", url: "https://youtu.be/TvBNWbFK2lY?t=7043" },
    ],
  },
  {
    name: "Stasis",
    description:
      "Next.js/TypeScript platform I built for Stasis, a 4-day hardware hackathon bringing 100+ Hack Clubbers from around the world to Austin, TX. Participants design 3 projects, get them funded, then build other cool projects in-person.",
    url: "https://stasis.hackclub.com/",
    github: "https://github.com/hackclub/stasis",
  },
  {
    name: "Congressional Showcase",
    description:
      "Built the platform for Hack Club's Congressional Showcase, where student-built projects are presented to members of Congress.",
    url: "https://congressional-showcase.hackclub.com/",
    github: "https://github.com/hackclub/Congressional-Showcase",
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
  {
    name: "KiCad-Copper",
    description:
      "Fork of KiCad (open-source PCB design tool) with schematic APIs for integration with AI models and MCPs.",
    url: "https://copper.claynicholson.com/",
    github: "https://github.com/claynicholson/kicad-copper",
  },
  {
    name: "ASICify",
    description:
      "Open-source tool to turn any AI model into a custom ASIC. Automates the pipeline from trained model to silicon-ready hardware design.",
    url: "http://asicify.com/",
    github: "https://github.com/claynicholson/asicify",
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
  if (proj.github) inner.push(LINK(proj.github));
  if (proj.extras) {
    for (const e of proj.extras) inner.push(LINK(e.url));
  }
  blocks.push(NEST(inner));
}

module.exports = {
  id: "hackclub",
  label: "hackclub",
  description: "Hack Club projects",
  projects,
  blocks,
};
