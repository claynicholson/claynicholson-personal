"use client";

function Link({ href, children }) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function SocialLink({ href, icon, label }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="content-card-social" aria-label={label}>
      {icon}
    </a>
  );
}

/* ── Hero ── */

export function HeroCard() {
  return (
    <div className="content-card">
      <h1 className="content-card-name">Clay Nicholson</h1>
      <p className="content-card-tagline">MIT &apos;30 · EECS (Course 6-5) · Vermont</p>
      <div className="content-card-socials">
        <SocialLink href="https://github.com/claynicholson" icon={<GitHubIcon />} label="GitHub" />
        <SocialLink href="https://www.linkedin.com/in/claynicholson/" icon={<LinkedInIcon />} label="LinkedIn" />
        <SocialLink href="https://x.com/claynicholsonvt" icon={<TwitterIcon />} label="Twitter" />
        <SocialLink href="https://www.instagram.com/clayanicholson/" icon={<InstagramIcon />} label="Instagram" />
        <SocialLink href="https://www.youtube.com/@Clay_Nicholson" icon={<YouTubeIcon />} label="YouTube" />
      </div>
      <div className="content-card-ssh">$ ssh ssh.claynicholson.com</div>
      <p style={{ marginTop: "0.4rem", fontSize: "0.85rem" }}>
        <Link href="mailto:clayn@mit.edu">clayn@mit.edu</Link>
      </p>
    </div>
  );
}

/* ── About ── */

export function AboutCard() {
  return (
    <div className="content-card">
      <h2 className="content-card-title">About</h2>
      <p>
        Full-time gap year engineer at <Link href="https://hackclub.com">Hack Club</Link>,
        creating open-source programs for teenagers to get into building around the world.
        Incoming freshman at MIT pursuing EECS (Course 6-5). I work across FPGA design,
        open-source hardware platforms, robotics, and medical imaging research.
      </p>
    </div>
  );
}

/* ── Timeline ── */

export function PastCard() {
  return (
    <div className="content-card">
      <h2 className="content-card-title">Past</h2>
      <p>
        Founded <Link href="https://greenmountainrobotics.org/">Green Mountain Robotics</Link> across
        rural Vermont high schools. Won 3rd Place Grand Award at ISEF 2025 for pancreatic tumor
        segmentation research,first Grand Award winner in Vermont history. Led Robohawks to 4
        consecutive state championships. Founded CVU Computer Science Club, teaching 25+ students weekly.
      </p>
    </div>
  );
}

export function PresentCard() {
  return (
    <div className="content-card">
      <h2 className="content-card-title">Present</h2>
      <p>
        ISEF 2026 Finalist with ATLAS, an FPGA-based adaptive network scheduler.
        Running <Link href="https://outpost.hackclub.com/">Outpost</Link>, a
        150-person hardware hackathon. Building <Link href="https://asicify.com/">ASICify</Link> and{" "}
        <Link href="https://coppereda.com/">Copper</Link>. Prepping for the move to Cambridge.
      </p>
    </div>
  );
}

export function FutureCard() {
  return (
    <div className="content-card">
      <h2 className="content-card-title">Future</h2>
      <p>
        Starting at <Link href="https://mit.edu">MIT</Link> fall 2026, pursuing
        EECS (Course 6-5). Exploring open-source silicon, ASIC design tooling,
        and the intersection of hardware and AI.
      </p>
    </div>
  );
}

/* ── Experience ── */

export function ExperienceCard() {
  return (
    <div className="content-card">
      <h2 className="content-card-title">Experience</h2>

      <h3 className="content-card-sub">Hack Club <span>Software Engineer, Summer 2023 - Present</span></h3>
      <p>
        Built open-source platforms for national hardware programs. Ran hackathons in
        San Jose, Austin, Vienna, Singapore, and Shenzhen. Programs include Blueprint (25K students),
        Stasis (10K students), and Outpost (100K students).
      </p>

      <h3 className="content-card-sub">MIT Lincoln Lab <span>LLRISE Scholar</span></h3>
      <p>Selected research program.</p>

      <h3 className="content-card-sub">BETA Technologies <span>Intern, 2024</span></h3>
      <p>Internship at electric aviation startup.</p>

      <h3 className="content-card-sub">GlobalFoundries <span>Job Shadow, 2024</span></h3>
      <p>Semiconductor fabrication facility shadowing.</p>
    </div>
  );
}

/* ── Projects ── */

export function ProjectsCard() {
  return (
    <div className="content-card">
      <h2 className="content-card-title">Projects</h2>

      <h3 className="content-card-sub">Blueprint <span>Hack Club</span></h3>
      <p>
        Open-source Rails platform funding teen hardware projects. 25K+ users, 9.3K projects,
        $200K+ distributed. Partnered with AMD as part of their White House AI pledge.
        Lisa Su presented scholarship winners onstage at CES 2026.
      </p>
      <div className="content-card-links">
        <Link href="https://blueprint.hackclub.com/">Site</Link>
        <Link href="https://blueprint.hackclub.com/stats">Stats</Link>
        <Link href="https://github.com/hackclub/blueprint/">GitHub</Link>
        <Link href="https://youtu.be/TvBNWbFK2lY?t=7043">CES Video</Link>
      </div>

      <h3 className="content-card-sub">Stasis <span>Hack Club</span></h3>
      <p>
        Next.js/TypeScript platform for a 4-day hardware hackathon. 100+ Hack Clubbers
        from around the world in Austin, TX. Participants design 3 projects, get them
        funded, then build in-person.
      </p>
      <div className="content-card-links">
        <Link href="https://stasis.hackclub.com/">Site</Link>
        <Link href="https://github.com/hackclub/stasis">GitHub</Link>
      </div>

      <h3 className="content-card-sub">Congressional Showcase <span>Hack Club</span></h3>
      <p>Platform where student-built projects are presented to members of Congress.</p>
      <div className="content-card-links">
        <Link href="https://congressional-showcase.hackclub.com/">Site</Link>
        <Link href="https://github.com/hackclub/Congressional-Showcase">GitHub</Link>
      </div>

      <h3 className="content-card-sub">Copper (KiCad Fork)</h3>
      <p>
        AI copilot for circuit design: a KiCad fork + engine that turns a plain-English
        board spec into a placed, wired schematic.
      </p>
      <div className="content-card-links">
        <Link href="https://coppereda.com/">Site</Link>
        <Link href="https://github.com/claynicholson/kicad-copper">GitHub</Link>
      </div>

      <h3 className="content-card-sub">ASICify</h3>
      <p>
        Open compiler turning PyTorch models into synthesizable Verilog RTL, testbench,
        FPGA bitstream, and cost estimates across 11 hardware targets.
      </p>
      <div className="content-card-links">
        <Link href="https://asicify.com/">Site</Link>
        <Link href="https://github.com/claynicholson/asicify">GitHub</Link>
      </div>

      <h3 className="content-card-sub">ATLAS <span>Closed Source</span></h3>
      <p>
        FPGA-based adaptive packet scheduler written in Verilog for the Lattice iCE40UP5K.
        Reduces data center p99 tail latency by 55% and excess capacity by 70%.
      </p>
    </div>
  );
}

/* ── Research ── */

export function ResearchCard() {
  return (
    <div className="content-card">
      <h2 className="content-card-title">Research</h2>

      <h3 className="content-card-sub">ATLAS: FPGA Adaptive Tail Latency Aware Scheduler <span>2025 - Present</span></h3>
      <p>
        Verilog data-center scheduler (Lattice iCE40) with a queue arbiter that adapts packet
        distribution based on server utilization. 55% queuing time reduction vs. industry baseline,
        70% reduction in extra capacity needed.
      </p>
      <div className="content-card-links">
        <Link href="https://isef.net/project/225006">ISEF Project</Link>
      </div>

      <h3 className="content-card-sub">U-Net for Pancreatic Tumor Segmentation <span>2024 - 2025</span></h3>
      <p>
        34-layer 3D CNN (TensorFlow/OpenVINO) trained on 282 MSKCC CT volumes.
        75% segmentation accuracy vs. 68% for radiologists. Diagnoses months before
        professionals could.
      </p>
      <div className="content-card-links">
        <Link href="https://isef.net/project/197922">ISEF Project</Link>
        <Link href="https://www.societyforscience.org/press-release/regeneron-isef-2025-full-awards/">ISEF Awards</Link>
        <Link href="https://www.wcax.com/2025/04/29/cvu-student-takes-cancer-research-science-project-next-level/">Press</Link>
      </div>
    </div>
  );
}

/* ── Awards ── */

export function AwardsCard() {
  return (
    <div className="content-card">
      <h2 className="content-card-title">Awards</h2>

      <h3 className="content-card-sub">Science Fair</h3>
      <p>Regeneron ISEF 2025 3rd Place Grand Award,first in Vermont history</p>
      <p>Regeneron ISEF 2026 Finalist</p>
      <p>ISEF 2026 Chief of Naval Research Scholarship Award</p>
      <p>ISEF 2026 Midwest Microelectronics Consortium Special Award</p>
      <p>Yale Science &amp; Engineering Association Most Outstanding Exhibit</p>

      <h3 className="content-card-sub">National</h3>
      <p>Presidential Scholars Semifinalist 2026</p>
      <p>Coca-Cola Scholars Program Semifinalist</p>
      <p>Vermont Congressional App Challenge Winner (U.S. House)</p>

      <h3 className="content-card-sub">Robotics</h3>
      <p>FIRST Robotics Competition Dean&apos;s List International Finalist</p>
      <p>FIRST Tech Challenge Dean&apos;s List International Finalist</p>
      <p>FRC Rookie All-Star &amp; World Championship Division Highest Rookie Seed</p>
      <p>FRC Engineering Inspiration Award</p>
      <p>FTC: 4x Vermont State Championships, Inspire Award, International Judges&apos; Choice</p>
    </div>
  );
}

/* ── Robotics ── */

export function RoboticsCard() {
  return (
    <div className="content-card">
      <h2 className="content-card-title">Robotics</h2>

      <h3 className="content-card-sub">RoboHawks #5741 <span>FTC, Captain &amp; Lead Programmer</span></h3>
      <p>
        4x Vermont State Champions. Coached FIRST LEGO League and mentored 250+
        students across 15 robotics teams.
      </p>
      <div className="content-card-links">
        <Link href="https://www.robohawks5741.com/">Site</Link>
        <Link href="https://github.com/robohawks5741/FtcRobotController-IntoTheDeep">2024-25</Link>
      </div>

      <h3 className="content-card-sub">Green Mountain Robotics #9101 <span>FRC, Founding Member</span></h3>
      <p>
        Founded across 6 rural Vermont high schools after our school denied funding.
        Raised $50K+, sole programmer, 20+ members. Rookie All-Star, World Championship.
      </p>
      <div className="content-card-links">
        <Link href="https://greenmountainrobotics.org/">Site</Link>
        <Link href="https://github.com/greenmountainrobotics/2023-Robot">2023</Link>
        <Link href="https://github.com/greenmountainrobotics/2024-Robot">2024</Link>
      </div>
    </div>
  );
}

/* ── Leadership ── */

export function LeadershipCard() {
  return (
    <div className="content-card">
      <h2 className="content-card-title">Leadership</h2>

      <h3 className="content-card-sub">CVU Computer Science Club <span>Founder &amp; President</span></h3>
      <p>
        Grew from 0 to 30 members. Taught 25+ students weekly. Organized{" "}
        <Link href="https://snowbound.hackclub.com/">Snowbound</Link>, Vermont&apos;s
        largest high school hackathon.
      </p>

      <h3 className="content-card-sub">STEM Advocacy</h3>
      <p>
        Briefed Rep. Balint &amp; Sen. Welch. Helped launch 3 FRC teams and Vermont&apos;s
        first FRC/FTC qualifiers.
      </p>
    </div>
  );
}

/* ── Education ── */

export function EducationCard() {
  return (
    <div className="content-card">
      <h2 className="content-card-title">Education</h2>

      <h3 className="content-card-sub">MIT <span>Class of 2030, Early Action</span></h3>
      <p>B.S. EECS (Course 6-5). Starting fall 2026.</p>

      <h3 className="content-card-sub">University of Vermont <span>Dual Enrollment, 4.0</span></h3>
      <p>
        Grad-level EE 5460 Microfabrication, Differential Equations, Linear Algebra,
        Electronics, Physics E&amp;M.
      </p>

      <h3 className="content-card-sub">Champlain Valley Union HS <span>Class of 2026</span></h3>
      <p>4.25/4.33 UW GPA. SAT 1540.</p>
    </div>
  );
}

/* ── Hackathons ── */

export function HackathonsCard() {
  return (
    <div className="content-card">
      <h2 className="content-card-title">Hackathons</h2>

      <h3 className="content-card-sub">Staffed At</h3>
      <p>Hackathons I&apos;ve helped run/staff at Hack Club, organized by my friends.</p>
      <div className="content-card-links">
        <Link href="https://shipwrecked.hackclub.com/">Shipwrecked</Link>
        <Link href="https://midnight.hackclub.com/">Midnight</Link>
        <Link href="https://overglade.hackclub.com/">Overglade</Link>
      </div>

      <h3 className="content-card-sub">Personally Organized</h3>
      <p>Hackathons I&apos;ve personally organized and ran.</p>
      <div className="content-card-links">
        <Link href="https://blueprint.hackclub.com/">Blueprint / Prototype</Link>
        <Link href="https://stasis.hackclub.com/">Stasis</Link>
        <Link href="https://outpost.hackclub.com/">Outpost</Link>
      </div>
    </div>
  );
}

/* ── Writing ── */

export function BlogCard() {
  return (
    <div className="content-card">
      <h2 className="content-card-title">Writing</h2>

      <h3 className="content-card-sub"><Link href="/blog/khlawde-code">I Reverse-Engineered Claude Code</Link> <span>Jun 2026</span></h3>
      <p>Made it 100x better to use and built 11 systems that make it 40% more efficient.</p>

      <h3 className="content-card-sub"><Link href="/blog/pancreatic-segmentation">Pancreatic Tumor Segmentation with CNNs</Link> <span>Apr 2026</span></h3>
      <p>A U-Net that segments pancreatic tumors better than radiologists, in under a second.</p>
    </div>
  );
}

/* ── Outro ── */

export function OutroCard() {
  return (
    <div className="content-card">
      <p>
        Feel free to reach out to me if you have any questions about my projects
        or just want to chat. I&apos;d love to meet you.
      </p>
    </div>
  );
}

/* ── Contact ── */

export function ContactCard() {
  return (
    <div className="content-card">
      <h2 className="content-card-title">Contact</h2>
      <p>
        <Link href="mailto:clayn@mit.edu">clayn@mit.edu</Link>
        {" · "}
        <Link href="https://github.com/claynicholson">GitHub</Link>
        {" · "}
        <Link href="https://www.linkedin.com/in/claynicholson/">LinkedIn</Link>
        {" · "}
        <Link href="/blog">Blog</Link>
      </p>
    </div>
  );
}
