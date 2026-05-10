// Section registry. The order here is the order shown in the fzf menu
// (web + SSH). To add a new section: create a file in this directory and
// add a line below.

const about = require("./about");
const now = require("./now");
const robotics = require("./robotics");
const hackclub = require("./hackclub");
const research = require("./research");
const education = require("./education");
const awards = require("./awards");
const projects = require("./projects");
const contact = require("./contact");

const SECTIONS = [
  about,
  now,
  robotics,
  hackclub,
  research,
  education,
  awards,
  projects,
  contact,
];

const SECTIONS_BY_ID = Object.fromEntries(SECTIONS.map((s) => [s.id, s]));

module.exports = { SECTIONS, SECTIONS_BY_ID };
