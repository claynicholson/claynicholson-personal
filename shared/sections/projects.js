// Aggregator: flat list of every shippable project across robotics, hackclub,
// and research. This file builds itself from the other sections — you should
// not need to edit it when adding new entries elsewhere.

const { H, P, DIM, SPACER, SUB, NEST, ROW, LINK } = require("../blocks");
const robotics = require("./robotics");
const hackclub = require("./hackclub");
const research = require("./research");

const personal = [
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
  H("All Projects"),
  DIM("Run 'robotics', 'hackclub', or 'research' for details."),
  SPACER,
];

blocks.push(SUB("Robotics"));
const roboticsRows = [];
for (const team of robotics.teams) {
  for (const s of team.seasons) {
    roboticsRows.push(
      ROW(
        s.title.padEnd(24),
        s.repo
          ? LINK(s.repo, s.repo.replace("https://github.com/", ""))
          : "(no repo)"
      )
    );
  }
}
blocks.push(NEST(roboticsRows), SPACER);

blocks.push(SUB("Hack Club"));
blocks.push(
  NEST(
    hackclub.projects.map((p) =>
      p.url
        ? ROW(p.name.padEnd(24), LINK(p.url))
        : ROW(p.name.padEnd(24), "(internal)")
    )
  ),
  SPACER
);

blocks.push(SUB("Research"));
blocks.push(
  NEST(research.projects.map((r) => P(r.title))),
  SPACER
);

blocks.push(SUB("Personal"));
for (const p of personal) {
  const inner = [P(p.description)];
  if (p.url) inner.push(LINK(p.url));
  if (p.github) inner.push(LINK(p.github));
  blocks.push(ROW(p.name.padEnd(24), LINK(p.url)));
}
blocks.push(SPACER);

module.exports = {
  id: "projects",
  label: "projects",
  description: "All projects combined",
  personal,
  blocks,
};
