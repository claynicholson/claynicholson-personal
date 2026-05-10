const { H, SPACER, ROW, LINK } = require("../blocks");
const about = require("./about");

const links = about.meta.links;

module.exports = {
  id: "contact",
  label: "contact",
  description: "Get in touch",
  blocks: [
    H("Contact"),
    SPACER,
    ROW("GitHub  ", LINK(links.github, "github.com/claynicholson")),
    ROW("LinkedIn", LINK(links.linkedin, "linkedin.com/in/clay-nicholson")),
    ROW("Email   ", LINK(links.email, about.meta.email)),
  ],
};
