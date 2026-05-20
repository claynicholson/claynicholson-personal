const { H, SUB, NEST, P } = require("../blocks");

// To add an award: append a new entry to `awards` below.

const awards = [
  { name: "Regeneron ISEF 2026 Finalist", detail: "FPGA-based adaptive network scheduler (ATLAS)" },
  { name: "Chief of Naval Research Scholarship Award", detail: "Awarded at ISEF 2026" },
  { name: "Midwest Microelectronics Consortium Special Award", detail: "Awarded at ISEF 2026" },
  { name: "Regeneron ISEF 2025 Finalist & 3rd Place Grand Award", detail: "First Grand Award winner in Vermont history" },
  { name: "Vermont Presidential Scholars Semifinalist", detail: "Pending Finalist Results" },
  { name: "FIRST Robotics Competition Leadership Award International Finalist", detail: "" },
  { name: "FIRST Tech Challenge Leadership Award International Finalist", detail: "" },
  { name: "Vermont Congressional App Challenge Winner", detail: "U.S. House of Representatives" },
  { name: "Yale Science & Engineering Association Most Outstanding Exhibit Award", detail: "" },
  { name: "Coca-Cola Scholars Program Semifinalist", detail: "" },
  { name: "2026 Vermont Academy of Science and Engineering Best Engineering Project Award", detail: "" },
  { name: "2026 & 2025 Vermont STEM Fair Gold Medalist", detail: "" },
  { name: "The Vermont Biomedical Research Network (VBRN) Silver Medal", detail: "" },
  { name: "FIRST Volunteer Appreciation Award", detail: "" },
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
