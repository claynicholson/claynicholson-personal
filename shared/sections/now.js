// What I'm focused on right now. Inspired by https://nownownow.com/about
//
// To update this, just edit the strings below. Aim to refresh it every
// month or two — outdated "now" pages are worse than no "now" page.

const { H, P, SPACER, SUB, NEST, BULLET, DIM } = require("../blocks");

const updated = "May 2026";

const focuses = [
  "Wrapping up the FPGA Network Switch ATLAS project for ISEF 2026.",
  "Running Stasis — a 100-person hardware hackathon in Austin, TX this month.",
  "Prepping for the move to Cambridge for MIT in the fall.",
];

const learning = [
  "Advanced IC packaging + chiplet architectures.",
  "More UVM Verilog for the FPGA scheduler work.",
  "Reading: Hennessy & Patterson, Computer Architecture (6th ed).",
];

const lifeStuff = [
  "Living in Vermont. Out skiing or biking on weekends.",
  "Trying to read more fiction this year — currently on Project Hail Mary.",
];

module.exports = {
  id: "now",
  label: "now",
  description: "What I'm focused on right now",
  blocks: [
    H("Now"),
    DIM(`Last updated: ${updated}`),
    SPACER,

    SUB("Focused on"),
    NEST(focuses.map((f) => BULLET(f))),
    SPACER,

    SUB("Learning"),
    NEST(learning.map((l) => BULLET(l))),
    SPACER,

    SUB("Life"),
    NEST(lifeStuff.map((l) => BULLET(l))),
    SPACER,

    P("Inspired by https://nownownow.com — get in touch if you want to swap notes."),
  ],
};
