const { H, P, SPACER, SUB, NEST, LINK, CARD } = require("../blocks");

// To add a season: append a CARD entry to the appropriate `seasons` array.
// To add a whole new team: copy a team block (SUB + NEST) below.

const teams = [
  {
    name: "Robohawks",
    type: "(FTC)",
    role: "Coach/Mentor at UVM",
    description:
      "4 years on FTC Robohawks with multiple state/national championships. Now serve as coach/mentor for FTC Robohawks at UVM. Mentored 150+ students across FTC and FRC programs.",
    website: "https://www.robohawks5741.com/",
    seasons: [
      {
        title: "Robohawks 2024-2025",
        body:
          "Won state championships. FIRST Dean's List finalist. Code used at World Championships in Houston, TX.",
        repo:
          "https://github.com/robohawks5741/FtcRobotController-IntoTheDeep",
      },
      {
        title: "Robohawks 2023-2024",
        body:
          "Won robot competition + Inspire award for Vermont. Built a custom vision pipeline used by most teams in Vermont.",
        repo:
          "https://github.com/robohawks5741/FtcRobotController-CenterStage",
      },
      {
        title: "Robohawks 2022-2023",
        body: "Won state championships. World Championships in Houston, TX.",
        repo: "https://github.com/claynicholson/JV-Worlds-Main-New",
      },
    ],
  },
  {
    name: "Green Mountain Robotics #9101",
    type: "(FRC)",
    role: "Founder, Head of Programming",
    description:
      "Founded FRC Team #9101 in Vermont. Head of programming, also help with mechanical, outreach, and electrical. 4 years FRC experience with multiple state/national championships.",
    website: "https://greenmountainrobotics.org/",
    seasons: [
      {
        title: "GMR — Toast (2023)",
        body: "Rookie year. Made it to World Championships in Houston, TX.",
        repo: "https://github.com/greenmountainrobotics/2023-Robot",
      },
      {
        title: "GMR — Toaster (2024)",
        body: "The 2023-2024 GMR season.",
        repo: "https://github.com/greenmountainrobotics/2024-Robot",
      },
    ],
  },
];

const blocks = [H("Robotics")];

for (const t of teams) {
  blocks.push(SUB(t.name, `${t.type} — ${t.role}`));
  blocks.push(
    NEST([
      P(t.description),
      LINK(t.website),
      SPACER,
      ...t.seasons.flatMap((s) => [
        CARD({
          title: s.title,
          body: s.body,
          link: s.repo
            ? LINK(s.repo, s.repo.replace("https://github.com/", ""))
            : null,
        }),
      ]),
    ])
  );
  blocks.push(SPACER);
}

module.exports = {
  id: "robotics",
  label: "robotics",
  description: "Robotics teams and projects",
  // Exposed so the `projects` section can build a flat combined list.
  teams,
  blocks,
};
