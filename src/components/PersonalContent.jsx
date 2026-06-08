"use client";

/* ── Social SVG Icons ── */

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

/* ── Components ── */

function SocialLink({ href, icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="social-icon"
      aria-label={label}
    >
      {icon}
    </a>
  );
}

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

function Section({ title, children }) {
  return (
    <section className="section">
      <h2 className="section-title">{title}</h2>
      {children}
    </section>
  );
}

function Sub({ title, meta }) {
  return (
    <h3 className="subsection-title">
      {title}
      {meta && <span className="subsection-meta">{meta}</span>}
    </h3>
  );
}

function P({ children }) {
  return <p>{children}</p>;
}

export default function PersonalContent() {
  return (
    <div className="content-wrapper">
      {/* Header */}
      <h1 className="site-name">Clay Nicholson</h1>
      <p className="site-tagline">
        MIT &apos;29 &middot; Electrical Engineering with Computing &middot; Vermont
      </p>

      {/* Social Icons */}
      <div className="social-row">
        <SocialLink href="https://github.com/claynicholson" icon={<GitHubIcon />} label="GitHub" />
        <SocialLink href="https://www.linkedin.com/in/claynicholson/" icon={<LinkedInIcon />} label="LinkedIn" />
        <SocialLink href="https://x.com/claynicholsonvt" icon={<TwitterIcon />} label="Twitter" />
        <SocialLink href="https://www.instagram.com/clayanicholson/" icon={<InstagramIcon />} label="Instagram" />
        <SocialLink href="https://www.youtube.com/@Clay_Nicholson" icon={<YouTubeIcon />} label="YouTube" />
      </div>

      {/* SSH */}
      <div className="ssh-block">
        $ ssh ssh.claynicholson.com
      </div>

      {/* About */}
      <Section title="About">
        <P>
          Hello, my name is Clay. I work at{" "}
          <Link href="https://hackclub.com">Hack Club</Link> and am a rising freshman
          at MIT, hoping to pursue course 6-5 (Electrical Engineering with Computing).
          I am involved in a bunch of things: FPGA design, open-source
          hardware platforms, robotics, and medical imaging research. I love to
        </P>
      </Section>

      <hr className="section-divider" />

      {/* Now */}
      <Section title="Now">
        <p className="dim" style={{ marginBottom: "0.75rem" }}>Last updated May 2026</p>
        <P>
          Wrapping up the FPGA Network Switch ATLAS project for ISEF 2026. Running{" "}
          <Link href="https://stasis.hackclub.com/">Stasis</Link>, a 100-person
          hardware hackathon in Austin, TX. Prepping for the move to Cambridge for
          MIT in the fall.
        </P>
        <Sub title="Learning" />
        <ul className="bullet-list">
          <li>Advanced IC packaging + chiplet architectures</li>
          <li>UVM Verilog for the FPGA scheduler work</li>
          <li>Hennessy &amp; Patterson, <em>Computer Architecture</em> (6th ed)</li>
        </ul>
        <Sub title="Life" />
        <ul className="bullet-list">
          <li>Living in Vermont. Skiing or biking on weekends</li>
        </ul>
      </Section>

      <hr className="section-divider" />

      {/* Projects */}
      <Section title="Projects">
        <Sub title="Blueprint" meta="Hack Club" />
        <div className="subsection-body">
          <P>
            Open-source Rails platform I built and lead that funds teenager hardware
            projects. 25,000 students participated globally. Partnered with AMD as
            part of their White House pledge. Lisa Su presented the scholarship
            winners onstage during her CES keynote.
          </P>
          <div className="link-row">
            <Link href="https://blueprint.hackclub.com/">Site</Link>
            <Link href="https://github.com/hackclub/blueprint/">GitHub</Link>
            <Link href="https://youtu.be/TvBNWbFK2lY?t=7043">CES Video</Link>
          </div>
        </div>

        <Sub title="Stasis" meta="Hack Club" />
        <div className="subsection-body">
          <P>
            Next.js platform for a 4-day hardware hackathon bringing 100+ Hack
            Clubbers from around the world to Austin, TX.
          </P>
          <div className="link-row">
            <Link href="https://stasis.hackclub.com/">Site</Link>
            <Link href="https://github.com/hackclub/stasis">GitHub</Link>
          </div>
        </div>

        <Sub title="KiCad-Copper" meta="Personal" />
        <div className="subsection-body">
          <P>
            Fork of KiCad with schematic APIs for programmatic circuit design and integration.
          </P>
          <div className="link-row">
            <Link href="https://copper.claynicholson.com/">Site</Link>
            <Link href="https://github.com/claynicholson/kicad-copper">GitHub</Link>
          </div>
        </div>

        <Sub title="ASICify" meta="Personal" />
        <div className="subsection-body">
          <P>
            Open-source tool to turn any trained model into a custom ASIC. Automates the
            pipeline from model weights to silicon-ready hardware design.
          </P>
          <div className="link-row">
            <Link href="http://asicify.com/">Site</Link>
            <Link href="https://github.com/claynicholson/asicify">GitHub</Link>
          </div>
        </div>

        <Sub title="Congressional Showcase" meta="Hack Club" />
        <div className="subsection-body">
          <P>
            Platform for Hack Club&apos;s Congressional Showcase, where student projects
            are presented to members of Congress.
          </P>
          <div className="link-row">
            <Link href="https://congressional-showcase.hackclub.com/">Site</Link>
            <Link href="https://github.com/hackclub/Congressional-Showcase">GitHub</Link>
          </div>
        </div>

        <Sub title="The Bin &amp; Grounded" meta="Hack Club" />
        <div className="subsection-body">
          <P>
            <Link href="https://hackclub.com/bin/">The Bin</Link>: design electrical
            circuits, get shipped the parts.{" "}
            <Link href="https://grounded.hackclub.com/">Grounded</Link>: design any
            PCB, get funded to make it.
          </P>
        </div>
      </Section>

      <hr className="section-divider" />

      {/* Research */}
      <Section title="Research">
        <Sub title="FPGA Network Switch, ISEF 2026" meta="2025–Present" />
        <div className="subsection-body">
          <P>
            Designed ATLAS, an adaptive tail-latency-aware packet scheduler
            implemented in FPGA fabric using Verilog. 55% queuing time reduction
            vs. industry baseline, 70% reduction in extra capacity needed.
          </P>
        </div>

        <Sub title="3D U-Net for Pancreatic Tumor Segmentation" meta="2024–2025" />
        <div className="subsection-body">
          <P>
            3rd Place Grand Award at ISEF 2025, first in Vermont history. U-Net model
            (34 layers, 1.9M params) trained on 282 CT volumes from Memorial Sloan
            Kettering. 75% segmentation accuracy vs. 68% for radiologists.
          </P>
          <div className="link-row">
            <Link href="https://www.societyforscience.org/press-release/regeneron-isef-2025-full-awards/">ISEF Awards</Link>
            <Link href="https://www.wcax.com/2025/04/29/cvu-student-takes-cancer-research-science-project-next-level/">Press</Link>
          </div>
        </div>
      </Section>

      <hr className="section-divider" />

      {/* Robotics */}
      <Section title="Robotics">
        <Sub title="Robohawks" meta="FTC, President &amp; Coach" />
        <div className="subsection-body">
          <P>
            Led the team to 4 consecutive Vermont state championships. Now
            coach/mentor at UVM. Awards include Inspire Award and International
            Judges&apos; Choice.
          </P>
          <div className="link-row">
            <Link href="https://www.robohawks5741.com/">Site</Link>
            <Link href="https://github.com/robohawks5741/FtcRobotController-IntoTheDeep">2024-25</Link>
            <Link href="https://github.com/robohawks5741/FtcRobotController-CenterStage">2023-24</Link>
          </div>
        </div>

        <Sub title="Green Mountain Robotics #9101" meta="FRC, Co-Founder" />
        <div className="subsection-body">
          <P>
            Co-founded across multiple rural Vermont high schools. Raised $50K+,
            sole programmer, 20+ members. Rookie All-Star, World Championship.
          </P>
          <div className="link-row">
            <Link href="https://greenmountainrobotics.org/">Site</Link>
            <Link href="https://github.com/greenmountainrobotics/2023-Robot">2023</Link>
            <Link href="https://github.com/greenmountainrobotics/2024-Robot">2024</Link>
          </div>
        </div>

        <p className="dim" style={{ marginTop: "1rem" }}>
          Coached FIRST LEGO League and mentored 250+ students across 15 teams.
        </p>
      </Section>

      <hr className="section-divider" />

      {/* Education */}
      <Section title="Education">
        <Sub title="MIT" />
        <div className="subsection-body">
          <P>Admitted Early Action, attending fall 2026. Course 6-5.</P>
        </div>

        <Sub title="CVU High School" />
        <div className="subsection-body">
          <P>GPA 4.25/4.33 &middot; SAT 1540</P>
        </div>

        <Sub title="University of Vermont" meta="Dual Enrollment, All A+'s" />
        <div className="subsection-body">
          <ul className="bullet-list">
            <li>Differential Equations</li>
            <li>Electronics</li>
            <li>Linear Algebra</li>
            <li>Physics E&amp;M</li>
            <li>Microelectronics Fabrication (grad-level, EE 5460)</li>
          </ul>
        </div>

        <Sub title="CS Club" meta="Founder" />
        <div className="subsection-body">
          <P>
            Founded and led. Taught 25+ students weekly. Organized Snowbound,
            Vermont&apos;s largest high school hackathon.
          </P>
        </div>
      </Section>

      <hr className="section-divider" />

      {/* Contact */}
      <Section title="Contact">
        <P>
          <Link href="mailto:clayn@mit.edu">clayn@mit.edu</Link>
          {" · "}
          <Link href="https://github.com/claynicholson">GitHub</Link>
          {" · "}
          <Link href="https://www.linkedin.com/in/claynicholson/">LinkedIn</Link>
          {" · "}
          <Link href="/blog">Blog</Link>
        </P>
      </Section>
    </div>
  );
}
