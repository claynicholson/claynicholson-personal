// ANSI color codes
const C = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  underline: "\x1b[4m",
  blue: "\x1b[38;2;137;180;250m",
  green: "\x1b[38;2;166;227;161m",
  mauve: "\x1b[38;2;203;166;247m",
  pink: "\x1b[38;2;243;139;168m",
  teal: "\x1b[38;2;137;220;235m",
  yellow: "\x1b[38;2;249;226;175m",
  rosewater: "\x1b[38;2;245;224;220m",
  overlay: "\x1b[38;2;108;112;134m",
  text: "\x1b[38;2;205;214;244m",
};

const link = (url, label) =>
  `${C.teal}${C.underline}${label || url}${C.reset}`;

const header = (text) => `${C.mauve}${C.bold}${text}${C.reset}`;
const label = (text) => `${C.yellow}${text}${C.reset}`;
const accent = (text) => `${C.pink}${text}${C.reset}`;
const green = (text) => `${C.green}${text}${C.reset}`;
const dim = (text) => `${C.overlay}${text}${C.reset}`;

const BANNER = `
${C.mauve} ██████╗██╗      █████╗ ██╗   ██╗    ███╗   ██╗██╗ ██████╗██╗  ██╗ ██████╗ ██╗     ███████╗ ██████╗ ███╗   ██╗
██╔════╝██║     ██╔══██╗╚██╗ ██╔╝    ████╗  ██║██║██╔════╝██║  ██║██╔═══██╗██║     ██╔════╝██╔═══██╗████╗  ██║
██║     ██║     ███████║ ╚████╔╝     ██╔██╗ ██║██║██║     ███████║██║   ██║██║     ███████╗██║   ██║██╔██╗ ██║
██║     ██║     ██╔══██║  ╚██╔╝      ██║╚██╗██║██║██║     ██╔══██║██║   ██║██║     ╚════██║██║   ██║██║╚██╗██║
╚██████╗███████╗██║  ██║   ██║       ██║ ╚████║██║╚██████╗██║  ██║╚██████╔╝███████╗███████║╚██████╔╝██║ ╚████║
 ╚═════╝╚══════╝╚═╝  ╚═╝   ╚═╝       ╚═╝  ╚═══╝╚═╝ ╚═════╝╚═╝  ╚═╝ ╚═════╝╚══════╝╚══════╝ ╚═════╝╚═╝  ╚═══╝${C.reset}

${green("Welcome to Clay's personal server.")}
${dim("Type 'help' for available commands. Type 'exit' to disconnect.")}
`;

const PORTRAIT = `-*+#.         ..-+######.    .........*@@@@-.... .@@...............    ................. .. .............
%@@@@@@@@@@@@@#-.       .+**+++====-:..@@@@@....*@@:.-=:::--=---======++++++++*****#########**+++=--:::.
           .:*@@@@@@@@@@%:------::---:.+@@@@%..+@@-.:++=++++***#*#####%%%#****+==-:::...................
#@@@@@@@@@@@*:.         ..:::.:::---:-..@@@@@-=@@+:+*#%########*+---:::.............................:.=+.
          .:*@@@@@@@@@@@#-==+****#*##%#-%@@@@@@@=.:::--.:.....::.............::::.:--=-=-#%%#%%%@@@@@@@@#
#@@@@@@@@@%+:..      ..*#+#**++++==--::..@@@@@@.......:....:::::--=--:*#**#*@%@%@@@@@@@@@@%%%@@%*%*=+=..*
      ...=#@@@@@@@@@@@@@*............... .@@@@@...--++*+##%%%%@@@@@@@@@@@@@@%%#***-=*=-=..#%**#+=@@@@@@@@
@@@@@@@@@@@*-...        ..........:+*+##%#@@@%@@#%@%%%%@@%%%%@%###=-=.:%*=+==@@%%@%@@@@@@@@######=.+#=-:
 ...      ......--+**#%%@%%@@@@@@@@@@@@@%#@@@@@@@@@@%@@@@@@@@@@@@@#%%@%%######=+#+-:....    .:::-+*+==+*
.%@@%#%%%%@@@@@@@@%%%@%####@####%###*#%###%@@@@@@@@%*++==-... .........:::::--====+*#**#########**+*+*+*`;

const commands = {
  help: () => {
    const cmds = [
      ["help", "List available commands"],
      ["about", "Who is Clay Nicholson?"],
      ["whoami", "Quick identity check"],
      ["robotics", "Robotics teams and projects"],
      ["hackclub", "Hack Club projects and involvement"],
      ["research", "Academic research projects"],
      ["projects", "All projects combined"],
      ["contact", "Get in touch"],
      ["ascii", "Display ASCII art portrait"],
      ["neofetch", "System info display"],
      ["ls", "List available files"],
      ["clear", "Clear terminal"],
      ["exit", "Disconnect"],
    ];
    let out = header("Available Commands") + "\n\n";
    for (const [name, desc] of cmds) {
      out += `  ${green(name.padEnd(14))} ${dim(desc)}\n`;
    }
    return out;
  },

  about: () => {
    let out = header("About Me") + "\n\n";
    out += `  Hello, my name is Clay. I am a part of a bunch of robotics teams,\n`;
    out += `  and I work at Hack Club. I am a rising freshman at MIT, hoping to\n`;
    out += `  pursue course 6-5 (Electrical Engineering with Computing).\n\n`;
    out += `  ${label("Links:")}\n`;
    out += `    ${dim(">")} GitHub:   ${link("https://github.com/claynicholson", "github.com/claynicholson")}\n`;
    out += `    ${dim(">")} LinkedIn: ${link("https://www.linkedin.com/in/clay-nicholson/", "linkedin.com/in/clay-nicholson")}\n`;
    out += `    ${dim(">")} Email:    ${link("https://mailhide.io/e/fJpjsonX", "Click to reveal")}\n`;
    return out;
  },

  whoami: () => {
    return `${green("Clay Nicholson")} ${dim("—")} ${label("MIT '29")} ${dim("|")} 6-5 (Electrical Engineering with Computing)`;
  },

  robotics: () => {
    let out = header("Robotics") + "\n\n";

    out += `  ${green(">> Robohawks")} ${dim("(FTC)")} ${dim("—")} ${label("Captain, Head of Mechanical & Programming")}\n`;
    out += `  ${dim("│")} I have led my team to world championships for 3 years and counting.\n`;
    out += `  ${dim("│")} ${link("https://www.robohawks5741.com/")}\n`;
    out += `  ${dim("│")}\n`;
    out += `  ${dim("│")} ${accent("Robohawks 2024-2025")}\n`;
    out += `  ${dim("│")}   Won state championships. FIRST Dean's List finalist.\n`;
    out += `  ${dim("│")}   ${link("https://github.com/robohawks5741/FtcRobotController-IntoTheDeep")}\n`;
    out += `  ${dim("│")}\n`;
    out += `  ${dim("│")} ${accent("Robohawks 2023-2024")}\n`;
    out += `  ${dim("│")}   Won robot competition + Inspire award for Vermont.\n`;
    out += `  ${dim("│")}   ${link("https://github.com/robohawks5741/FtcRobotController-CenterStage")}\n`;
    out += `  ${dim("│")}\n`;
    out += `  ${dim("│")} ${accent("Robohawks 2022-2023")}\n`;
    out += `  ${dim("│")}   Won state championships. World Championships in Houston, TX.\n`;
    out += `  ${dim("│")}   ${link("https://github.com/claynicholson/JV-Worlds-Main-New")}\n\n`;

    out += `  ${green(">> Green Mountain Robotics")} ${dim("(FRC)")} ${dim("—")} ${label("Head of Programming")}\n`;
    out += `  ${dim("│")} FRC team in Burlington, VT. Member since 2023.\n`;
    out += `  ${dim("│")} ${link("https://greenmountainrobotics.org/")}\n`;
    out += `  ${dim("│")}\n`;
    out += `  ${dim("│")} ${accent("GMR - Toast (2023)")}\n`;
    out += `  ${dim("│")}   Rookie year. Made it to World Championships in Houston, TX.\n`;
    out += `  ${dim("│")}   ${link("https://github.com/greenmountainrobotics/2023-Robot")}\n`;
    out += `  ${dim("│")}\n`;
    out += `  ${dim("│")} ${accent("GMR - Toaster (2024)")}\n`;
    out += `  ${dim("│")}   2023-2024 GMR season.\n`;
    out += `  ${dim("│")}   ${link("https://github.com/greenmountainrobotics/2024-Robot")}\n`;

    return out;
  },

  hackclub: () => {
    let out = header("Hack Club") + "\n\n";
    out += `  I joined Hack Club in the summer of 2024. Hack Club has changed my life.\n`;
    out += `  Growing up in Vermont, I never really had a close technical community.\n`;
    out += `  I decided to take my senior year to gap year there.\n\n`;
    out += `  ${label("I run you-ship-we-ship programs (grant programs) to get teens making cool projects.")}\n\n`;
    out += `  ${label("Projects:")}\n\n`;
    out += `  ${green(">> The Bin")}\n`;
    out += `     Design electrical circuits, and get shipped the parts to build them.\n`;
    out += `     ${link("https://hackclub.com/bin/")}\n\n`;
    out += `  ${green(">> Hack Club Grounded")}\n`;
    out += `     Design any PCB circuit board, get the funding to make it!\n`;
    out += `     ${link("https://grounded.hackclub.com/")}\n`;
    out += `     ${dim("src:")} ${link("https://github.com/hackclub/grounded")}\n\n`;
    out += `  ${green(">> Hack Club Blueprint")}\n`;
    out += `     Get up to $400 to make any hardware project + flagship hackathon @ AMD HQ.\n`;
    out += `     ${link("https://blueprint.hackclub.com/")}\n`;
    out += `     ${dim("src:")} ${link("https://github.com/hackclub/blueprint/")}\n`;
    return out;
  },

  research: () => {
    let out = header("Research") + "\n\n";
    out += `  ${accent("3D U-Net Model for Pancreatic Tumor Segmentation in CT Scans")}\n`;
    out += `  ${dim("2024 - Present")}\n\n`;
    out += `  ${label("TLDR:")} Pancreatic cancer is really bad and usually goes undetected\n`;
    out += `  until it's too late. This project automates detection using a U-Net CNN,\n`;
    out += `  reducing the time and cost of regular pancreas scans.\n\n`;
    out += `  Built a U-Net model (34 layers, 1.9M parameters) trained on 282 3D CT\n`;
    out += `  volumes from Memorial Sloan Kettering. Achieved a DICE score of 0.7451\n`;
    out += `  -- better than most radiologists.\n\n`;
    out += `  ${label("Press & Awards:")}\n`;
    out += `    ${dim(">")} ${link("https://www.societyforscience.org/press-release/regeneron-isef-2025-full-awards/", "Regeneron ISEF 2025 Awards")}\n`;
    out += `    ${dim(">")} ${link("https://www.wcax.com/2025/04/29/cvu-student-takes-cancer-research-science-project-next-level/", "WCAX Coverage")}\n`;
    out += `    ${dim(">")} ${link("https://www.willistonobserver.com/news/williston/around_town/around-town-for-april-10-2025/article_faab7df6-7946-4567-8048-d141d215f99b.html", "Williston Observer")}\n\n`;
    out += `  ${green(">> What's Next?")}\n`;
    out += `  Currently looking into advanced IC packaging technologies and using\n`;
    out += `  chiplets. Also working at the UVM INTERACT lab on robots.\n`;
    return out;
  },

  projects: () => {
    let out = header("All Projects") + "\n";
    out += dim("  Run 'robotics', 'hackclub', or 'research' for details.") + "\n\n";

    out += `  ${label("Robotics:")}\n`;
    out += `    ${green("Robohawks 2024-2025")}  ${link("https://github.com/robohawks5741/FtcRobotController-IntoTheDeep")}\n`;
    out += `    ${green("Robohawks 2023-2024")}  ${link("https://github.com/robohawks5741/FtcRobotController-CenterStage")}\n`;
    out += `    ${green("Robohawks 2022-2023")}  ${link("https://github.com/claynicholson/JV-Worlds-Main-New")}\n`;
    out += `    ${green("GMR - Toast (2023)")}   ${link("https://github.com/greenmountainrobotics/2023-Robot")}\n`;
    out += `    ${green("GMR - Toaster (2024)")} ${link("https://github.com/greenmountainrobotics/2024-Robot")}\n\n`;
    out += `  ${label("Hack Club:")}\n`;
    out += `    ${green("The Bin")}              ${link("https://hackclub.com/bin/")}\n`;
    out += `    ${green("Grounded")}             ${link("https://grounded.hackclub.com/")}\n`;
    out += `    ${green("Blueprint")}            ${link("https://blueprint.hackclub.com/")}\n\n`;
    out += `  ${label("Research:")}\n`;
    out += `    ${green("3D U-Net for Pancreatic Tumor Segmentation")}\n`;
    return out;
  },

  contact: () => {
    let out = header("Contact") + "\n\n";
    out += `  ${label("GitHub")}    ${dim("........")} ${link("https://github.com/claynicholson", "github.com/claynicholson")}\n`;
    out += `  ${label("LinkedIn")}  ${dim("......")} ${link("https://www.linkedin.com/in/clay-nicholson/", "linkedin.com/in/clay-nicholson")}\n`;
    out += `  ${label("Email")}     ${dim(".........")} ${link("https://mailhide.io/e/fJpjsonX", "Click to reveal")}\n`;
    return out;
  },

  ascii: () => {
    return `${C.mauve}${PORTRAIT}${C.reset}`;
  },

  neofetch: () => {
    const face = [
      "    ___    ",
      "   /   \\   ",
      "  | o o |  ",
      "  |  >  |  ",
      "  | \\_/ |  ",
      "   \\___/   ",
      "           ",
    ];
    const info = [
      `${green("clay")}@${accent("claynicholson.com")}`,
      "─".repeat(20),
      `${label("OS")}:         Clay Nicholson v1.0`,
      `${label("Host")}:       MIT '29`,
      `${label("Kernel")}:     6-5 (EE with Computing)`,
      `${label("Uptime")}:     18 years`,
      `${label("Shell")}:      brain-bash 4.2`,
      `${label("Location")}:   Vermont`,
      `${label("Languages")}: Java, Python, C, JS`,
      `${label("Interests")}: Robotics, ML, IC Design`,
      `${label("Editor")}:     VS Code / Vim`,
      "",
      `${C.pink}███${C.mauve}███${C.blue}███${C.teal}███${C.green}███${C.yellow}███${C.reset}`,
    ];

    let out = "";
    const maxLines = Math.max(face.length, info.length);
    for (let i = 0; i < maxLines; i++) {
      const left = `${C.teal}${face[i] || "           "}${C.reset}`;
      const right = info[i] || "";
      out += `  ${left}  ${right}\n`;
    }
    return out;
  },

  ls: () => {
    return `${green("about.txt")}  ${label("robotics/")}  ${label("hackclub/")}  ${label("research/")}  ${green("projects.txt")}  ${green("contact.txt")}  ${accent("portrait.ascii")}  ${dim("README.md")}`;
  },

  sudo: () => {
    return `${accent("[sudo] password for clay: ********\nNice try.")}`;
  },

  blog: () => {
    return `${header("Blog")}\n${dim("  Coming soon...")}`;
  },
};

module.exports = { commands, BANNER, C, green, dim, header, label, accent, link };
