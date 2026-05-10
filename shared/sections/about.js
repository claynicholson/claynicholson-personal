const { H, P, SPACER, ROW, LINK } = require("../blocks");

// To edit your bio: change the strings below.
// To add a new link row: copy a ROW(...) line.

const links = {
  github: "https://github.com/claynicholson",
  linkedin: "https://www.linkedin.com/in/clay-nicholson/",
  email: "mailto:clay@hackclub.com",
};

module.exports = {
  id: "about",
  label: "about",
  description: "Who is Clay Nicholson?",
  // `meta` is exported so other sections (whoami, neofetch, contact) can reuse it.
  meta: {
    name: "Clay Nicholson",
    school: "MIT",
    year: "'29",
    course: "6-5 (Electrical Engineering with Computing)",
    location: "Vermont",
    email: "clay@hackclub.com",
    links,
  },
  blocks: [
    H("About Me"),
    P(
      "Hello, my name is Clay. I am a part of a bunch of robotics teams, and I work at Hack Club. I am a rising freshman at MIT, hoping to pursue course 6-5 (Electrical Engineering with Computing)."
    ),
    SPACER,
    P("Links:"),
    ROW("GitHub:  ", LINK(links.github, "github.com/claynicholson")),
    ROW("LinkedIn:", LINK(links.linkedin, "linkedin.com/in/clay-nicholson")),
    ROW("Email:   ", LINK(links.email, "clay@hackclub.com")),
  ],
};
