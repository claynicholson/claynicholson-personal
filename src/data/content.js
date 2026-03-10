export const about = {
  name: "Clay Nicholson",
  school: "MIT",
  course: "6-5 (Electrical Engineering with Computing)",
  year: "'29",
  location: "Vermont",
  bio: "Hello, my name is Clay. I am a part of a bunch of robotics teams, and I work at Hack Club. I am a rising freshman at MIT, hoping to pursue course 6-5 (Electrical Engineering with Computing).",
  links: {
    github: "https://github.com/claynicholson",
    linkedin: "https://www.linkedin.com/in/clay-nicholson/",
    email: "https://mailhide.io/e/fJpjsonX",
  },
};

export const robotics = {
  robohawks: {
    name: "Robohawks",
    type: "FTC",
    role: "Captain, Head of Mechanical & Programming",
    website: "https://www.robohawks5741.com/",
    description:
      "I am proud to be captain of my schools' robotics team, the Robohawks. I have led my team to the world championships for 3 years and counting. On the Robohawks, I am head of Mechanical and Programming.",
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
    type: "FRC",
    role: "Head of Programming",
    website: "https://greenmountainrobotics.org/",
    description:
      "GMR is a FRC team in Burlington, VT. I'm head of programming but I also help with Mechanical, Outreach and Electrical. Member since 2023.",
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
  role: "I run you-ship-we-ship programs (grant programs) to get teens making cool projects.",
  projects: [
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
    {
      name: "Hack Club Blueprint",
      url: "https://blueprint.hackclub.com/",
      github: "https://github.com/hackclub/blueprint/",
      description:
        "Get up to $400 to make any hardware project + flagship hackathon @ AMD HQ.",
    },
  ],
};

export const research = {
  main: {
    title:
      "3D U-Net Model for Pancreatic Tumor Segmentation in CT Scans",
    timeline: "2024 - Present",
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
  next: {
    title: "What's Next?",
    description:
      "Currently looking into advanced IC packaging technologies and using chiplets to improve yield and performance. Also working at the UVM INTERACT lab on creepy crawly robots.",
  },
};
