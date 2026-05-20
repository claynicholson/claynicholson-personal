const {
  H, P, SPACER, SUB, NEST, ROW, LINKED_BULLET, CARD,
} = require("../blocks");

// To add a research project: append a new entry to `projects` below.
// Each project: { title, timeline, award?, tldr, details?, press?, reads? }

const projects = [
  {
    id: "isef2026",
    title: "FPGA Network Switch — ISEF 2026 (in progress)",
    timeline: "2025 - Present",
    tldr:
      "Custom FPGA-based adaptive low-tail-latency network switch for data centers.",
    details:
      "Designed ATLAS (Adaptive Tail-Latency-Aware Scheduler) — a novel packet switching algorithm implemented in FPGA fabric using Verilog, with a queue arbiter that switches the packet distribution algorithm based on server utilization. 55% queuing time reduction compared to the industry baseline and 70% reduction in extra capacity needed in a typical data center.",
  },
  {
    id: "isef2025",
    title: "3D U-Net Model for Pancreatic Tumor Segmentation in CT Scans",
    timeline: "2024 - 2025",
    award: "3rd Place Grand Award at ISEF 2025 — first Grand Award winner in Vermont history",
    tldr:
      "Pancreatic cancer is really bad and usually goes undetected until it's too late. This project automates detection using a U-Net CNN, reducing the time and cost of regular pancreas scans.",
    details:
      "Built a U-Net model (34 layers, 1.9M parameters) trained on 282 3D CT volumes from Memorial Sloan Kettering. Achieved 75% segmentation accuracy compared to the 68% average for professional radiologists — able to accurately segment and diagnose pancreatic cancer months before professionals could.",
    press: [
      { label: "Regeneron ISEF 2025 Awards", url: "https://www.societyforscience.org/press-release/regeneron-isef-2025-full-awards/" },
      { label: "WCAX Coverage", url: "https://www.wcax.com/2025/04/29/cvu-student-takes-cancer-research-science-project-next-level/" },
      { label: "Williston Observer", url: "https://www.willistonobserver.com/news/williston/around_town/around-town-for-april-10-2025/article_faab7df6-7946-4567-8048-d141d215f99b.html" },
      { label: "The Citizen VT", url: "https://www.vtcng.com/thecitizenvt/community/school_news/cvu-student-earns-spot-in-international-stem-competition/article_6942b336-d6d2-49c6-84c2-644101a37d3d.html" },
    ],
    reads: [
      { label: "UCLA Health — Pancreatic Cancer Detection", url: "https://www.uclahealth.org/news/article/pancreatic-cancer-is-almost-impossible-to-detect-early" },
      { label: "PMC — U-Net for Medical Imaging", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5960811/" },
      { label: "Original U-Net Paper (arXiv)", url: "https://arxiv.org/pdf/1505.04597" },
    ],
  },
];

const closing = [
  {
    title: "FPGA / Hardware",
    body:
      "Deep experience with FPGA development and digital design. UVM Electronics coursework (EE 5460) + grad-level microelectronics fabrication.",
  },
  {
    title: "What's Next?",
    body:
      "Currently looking into advanced IC packaging technologies and using chiplets to improve yield and performance. Also working at the UVM INTERACT lab on creepy crawly robots.",
  },
];

function projectBlocks(r) {
  const inner = [];
  if (r.award) inner.push(P(r.award), SPACER);
  inner.push(ROW("TLDR:", r.tldr));
  if (r.details) inner.push(SPACER, P(r.details));
  if (r.press && r.press.length) {
    inner.push(SPACER, P("Press & Awards:"));
    for (const item of r.press) inner.push(LINKED_BULLET(item.url, item.label));
  }
  if (r.reads && r.reads.length) {
    inner.push(SPACER, P("Good Reads:"));
    for (const item of r.reads) inner.push(LINKED_BULLET(item.url, item.label));
  }
  return [CARD({ title: r.title, meta: r.timeline }), NEST(inner), SPACER];
}

const blocks = [
  H("Research"),
  ...projects.flatMap(projectBlocks),
  ...closing.flatMap((c) => [SUB(c.title), NEST([P(c.body)]), SPACER]),
];

module.exports = {
  id: "research",
  label: "research",
  description: "Academic research",
  projects,
  blocks,
};
