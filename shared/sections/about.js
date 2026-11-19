const { H, P, SPACER, ROW, LINK } = require("../blocks");

// To edit your bio: change the strings below.
// To add a new link row: copy a ROW(...) line.

const links = {
  github: "https://github.com/claynicholson",
  linkedin: "https://www.linkedin.com/in/claynicholson/",
  email: "mailto:clayn@mit.edu",
};

module.exports = {
  id: "about",
  label: "about",
  description: "Who is Clay Nicholson?",
  // `meta` is exported so other sections (whoami, neofetch, contact) can reuse it.
  meta: {
    name: "Clay Nicholson",
    school: "MIT",
    year: "'30",
    course: "6-5 (Electrical Engineering with Computing)",
    location: "Burlington(ish) Vermont",
    email: "clayn@mit.edu",
    links,
  },
  blocks: [
    H("About Me"),
    P(
      "Hello, my name is Clay. I am involved in a bunch of disparate things, and I am a software engineer at Hack Club. I am a first-year student at MIT (Class of 2030), studying course 6-5 (Electrical Engineering with Computing)."
    ),
    SPACER,
    P("Links:"),
    ROW("GitHub:  ", LINK(links.github, "github.com/claynicholson")),
    ROW("LinkedIn:", LINK(links.linkedin, "linkedin.com/in/claynicholson")),
    ROW("Email:   ", LINK(links.email, "clay@hackclub.com")),
  ],
};
