export const about = {
  name: "Clay Nicholson",
  school: "MIT",
  course: "6-5 (Electrical Engineering with Computing)",
  year: "'29",
  location: "Vermont",
  email: "clay@hackclub.com",
  bio: "Hello, my name is Clay. I am a part of a bunch of robotics teams, and I work at Hack Club. I am a rising freshman at MIT, hoping to pursue course 6-5 (Electrical Engineering with Computing).",
  links: {
    github: "https://github.com/claynicholson",
    linkedin: "https://www.linkedin.com/in/clay-nicholson/",
    email: "mailto:clay@hackclub.com",
  },
};

export const education = {
  highSchool: {
    name: "CVU High School",
    status: "Senior, graduating spring 2026",
    gpa: "4.25/4.33",
    sat: "1540",
  },
  dualEnrollment: {
    school: "University of Vermont (dual enrollment)",
    courses: [
      "Differential Equations",
      "Electronics",
      "Linear Algebra",
      "Physics E&M",
      "Microelectronics Fabrication (grad-level, EE 5460)",
    ],
    grades: "All A+'s",
  },
  college: {
    name: "MIT",
    status: "Admitted Early Action, attending fall 2026",
    course: "6-5 (Electrical Engineering with Computing)",
  },
  programs: [
    {
      name: "MIT LLRISE",
      date: "July 2025",
    },
  ],
};

export const robotics = {
  robohawks: {
    name: "Robohawks",
    type: "FTC",
    role: "Coach/Mentor at UVM",
    website: "https://www.robohawks5741.com/",
    description:
      "4 years on FTC Robohawks with multiple state/national championships. Now serve as coach/mentor for FTC Robohawks at UVM. Mentored 150+ students across FTC and FRC programs.",
    seasons: [
      {
        name: "Robohawks 2024-2025",
        repo: "https://github.com/robohawks5741/FtcRobotController-IntoTheDeep",
        description:
          "Won state championships. I was a finalist for FIRST Dean's List. Code used at World Championships in Houston, TX.",
      },
      {
        name: "Robohawks 2023-2024",
        repo: "https://github.com/robohawks5741/FtcRobotController-CenterStage",
        description:
          "Won the robot competition AND the Inspire award for Vermont. Created a custom vision pipeline used by the majority of teams in Vermont.",
      },
      {
        name: "Robohawks 2022-2023",
        repo: "https://github.com/claynicholson/JV-Worlds-Main-New",
        description:
          "Won state championships. Code used at World Championships in Houston, TX.",
      },
    ],
  },
  gmr: {
    name: "Green Mountain Robotics",
    number: "#9101",
    type: "FRC",
    role: "Founder, Head of Programming",
    website: "https://greenmountainrobotics.org/",
    description:
      "Founded FRC Team #9101 — Green Mountain Robotics in Vermont. Head of programming, also help with Mechanical, Outreach and Electrical. 4 years FRC experience with multiple state/national championships.",
    seasons: [
      {
        name: "GMR - Toast (2023)",
        repo: "https://github.com/greenmountainrobotics/2023-Robot",
        description:
          "Our team's rookie year. Made it to World Championships in Houston, TX.",
      },
      {
        name: "GMR - Toaster (2024)",
        repo: "https://github.com/greenmountainrobotics/2024-Robot",
        description: "The 2023-2024 GMR season.",
      },
    ],
  },
};

export const hackclub = {
  description:
    "I joined Hack Club in the summer of 2024. Hack Club has changed my life. Growing up in Vermont, I never really had a close technical community. Ironically, Hack Club is based just 20 minutes from my house. I decided to take my senior year to gap year there.",
  role: "Staff member (paid) — I run major hardware/grant programs for teens.",
  projects: [
    {
      name: "Blueprint",
      url: "https://blueprint.hackclub.com/",
      github: "https://github.com/hackclub/blueprint/",
      description:
        "PCB/hardware grants for 25k+ teens. AMD partnership, ~$120k+ in grants distributed.",
    },
    {
      name: "Stasis",
      url: null,
      description:
        "100-person hardware hackathon in Austin, TX — May 2026.",
    },
    {
      name: "Prototype",
      url: null,
      description:
        "AMD-sponsored hackathon in San Jose, 2025.",
    },
    {
      name: "Congressional App Challenge",
      url: null,
      description:
        "Certification program — worked with Rep. Becca Balint's office.",
    },
    {
      name: "The Bin",
      url: "https://hackclub.com/bin/",
      description:
        "Design electrical circuits, and get shipped the parts to build them.",
    },
    {
      name: "Hack Club Grounded",
      url: "https://grounded.hackclub.com/",
      github: "https://github.com/hackclub/grounded",
      description: "Design any PCB circuit board, get the funding to make it!",
    },
  ],
};

export const research = {
  isef2026: {
    title: "FPGA Network Switch — ISEF 2026 (in progress)",
    timeline: "2025 - Present",
    tldr: "Custom FPGA-based adaptive low-tail-latency network switch for data centers.",
    details:
      "Designed ATLAS (Adaptive Tail-Latency-Aware Scheduler) — the first hardware-native adaptive scheduler with zero CPU in the forwarding path. Targets p99/p999 tail latency convergence to the M/D/1 queuing theory bound.",
  },
  isef2025: {
    title:
      "3D U-Net Model for Pancreatic Tumor Segmentation in CT Scans",
    timeline: "2024 - 2025",
    award: "3rd Place Grand Award at ISEF 2025 — First Grand Award winner in Vermont history",
    tldr: "Pancreatic cancer is really bad and usually goes undetected until it's too late. This project automates detection using a U-Net CNN, reducing the time and cost of regular pancreas scans.",
    details:
      "Built a U-Net model (34 layers, 1.9M parameters) trained on 282 3D CT volumes from Memorial Sloan Kettering. Achieved a DICE score of 0.7451 -- better than most radiologists.",
    press: [
      {
        label: "Regeneron ISEF 2025 Awards",
        url: "https://www.societyforscience.org/press-release/regeneron-isef-2025-full-awards/",
      },
      {
        label: "WCAX Coverage",
        url: "https://www.wcax.com/2025/04/29/cvu-student-takes-cancer-research-science-project-next-level/",
      },
      {
        label: "Williston Observer",
        url: "https://www.willistonobserver.com/news/williston/around_town/around-town-for-april-10-2025/article_faab7df6-7946-4567-8048-d141d215f99b.html",
      },
      {
        label: "The Citizen VT",
        url: "https://www.vtcng.com/thecitizenvt/community/school_news/cvu-student-earns-spot-in-international-stem-competition/article_6942b336-d6d2-49c6-84c2-644101a37d3d.html",
      },
    ],
    reads: [
      {
        label: "UCLA Health - Pancreatic Cancer Detection",
        url: "https://www.uclahealth.org/news/article/pancreatic-cancer-is-almost-impossible-to-detect-early",
      },
      {
        label: "PMC - U-Net for Medical Imaging",
        url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5960811/",
      },
      {
        label: "Original U-Net Paper (arXiv)",
        url: "https://arxiv.org/pdf/1505.04597",
      },
    ],
  },
  fpga: {
    title: "FPGA / Hardware",
    description:
      "Deep experience with FPGA development and digital design. UVM Electronics coursework (EE 5460) + grad-level microelectronics fabrication.",
  },
  next: {
    title: "What's Next?",
    description:
      "Currently looking into advanced IC packaging technologies and using chiplets to improve yield and performance. Also working at the UVM INTERACT lab on creepy crawly robots.",
  },
};

export const awards = [
  {
    name: "ISEF 2025 Grand Award",
    detail: "3rd Place — First Grand Award winner in Vermont history",
  },
  {
    name: "Georgia Tech Stamps President's Scholar",
    detail: "Semifinalist",
  },
  {
    name: "US Presidential Scholars",
    detail: "Nominated",
  },
  {
    name: "Coca-Cola Scholars",
    detail: "Nominated",
  },
];
