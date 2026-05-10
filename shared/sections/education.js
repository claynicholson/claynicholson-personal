const { H, P, SPACER, SUB, NEST, ROW, BULLET, DIM } = require("../blocks");

// To add a course: append to dualEnrollment.courses below.
// To add a program: copy one of the SUB(...) blocks under "Programs".

const dualEnrollmentCourses = [
  "Differential Equations",
  "Electronics",
  "Linear Algebra",
  "Physics E&M",
  "Microelectronics Fabrication (grad-level, EE 5460)",
];

const programs = [
  { name: "MIT LLRISE", date: "July 2025" },
];

module.exports = {
  id: "education",
  label: "education",
  description: "Education and coursework",
  blocks: [
    H("Education"),

    SUB("MIT"),
    NEST([
      P("Admitted Early Action, attending fall 2026"),
      ROW("Course:", "6-5 (Electrical Engineering with Computing)"),
    ]),
    SPACER,

    SUB("CVU High School"),
    NEST([
      P("Senior, graduating spring 2026"),
      ROW("GPA:", "4.25/4.33    SAT: 1540"),
    ]),
    SPACER,

    SUB("University of Vermont (dual enrollment)"),
    NEST([
      ROW("Grades:", "All A+'s"),
      ...dualEnrollmentCourses.map((c) => BULLET(c)),
    ]),
    SPACER,

    P("Programs:"),
    ...programs.map((p) => BULLET(`${p.name}  —  ${p.date}`)),
  ],
};
