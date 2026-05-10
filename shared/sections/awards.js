const { H, SUB, NEST, P } = require("../blocks");

// To add an award: append a new entry to `awards` below.

const awards = [
  { name: "ISEF 2025 Grand Award", detail: "3rd Place — first Grand Award winner in Vermont history" },
  { name: "Georgia Tech Stamps President's Scholar", detail: "Semifinalist" },
  { name: "US Presidential Scholars", detail: "Nominated" },
  { name: "Coca-Cola Scholars", detail: "Nominated" },
];

const blocks = [
  H("Awards & Recognition"),
  ...awards.flatMap((a) => [SUB(a.name), NEST([P(a.detail)])]),
];

module.exports = {
  id: "awards",
  label: "awards",
  description: "Awards and recognition",
  awards,
  blocks,
};
