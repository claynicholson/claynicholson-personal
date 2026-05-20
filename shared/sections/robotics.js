const { H, P, SPACER, SUB, NEST, LINK, CARD } = require("../blocks");

// To add a season: append a CARD entry to the appropriate `seasons` array.
// To add a whole new team: copy a team block (SUB + NEST) below.

const teams = [
  {
    name: "Robohawks",
    type: "(FTC)",
    role: "President & Coach/Mentor",
    description:
      "President of my school's robotics club, leading the team to 4 consecutive state championship wins. Now coach/mentor for FTC Robohawks at UVM. Awards: 4x Vermont State Championships, Inspire Award, International Judges' Choice Award.",
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
    role: "Co-Founder, Sole Programmer",
    description:
      "Co-founded FRC Team #9101 across multiple rural Vermont high schools. Raised $50K+, sole programmer, led 20+ members. Awards: Rookie All-Star, World Championship Division Highest Rookie Seed, Engineering Inspiration Award.",
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

const mentoring =
  "Coached FIRST LEGO League and mentored 250+ students across 15 robotics teams.";

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

blocks.push(SUB("Mentoring & Coaching"));
blocks.push(NEST([P(mentoring)]), SPACER);

module.exports = {
  id: "robotics",
  label: "robotics",
  description: "Robotics teams and projects",
  teams,
  blocks,
};
