import React from "react";
import { about, education, robotics, hackclub, research, awards } from "./content";
import { BANNER, WELCOME_TEXT, PORTRAIT, NEOFETCH_SMALL } from "./ascii";

const Link = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-term-teal underline hover:text-term-blue transition-colors"
  >
    {children}
  </a>
);

const Header = ({ children }) => (
  <span className="text-term-mauve font-bold">{children}</span>
);

const Label = ({ children }) => (
  <span className="text-term-yellow">{children}</span>
);

const Dim = ({ children }) => (
  <span className="text-term-overlay">{children}</span>
);

const Accent = ({ children }) => (
  <span className="text-term-pink">{children}</span>
);

const Green = ({ children }) => (
  <span className="text-term-green">{children}</span>
);

const Section = ({ children }) => (
  <div className="ml-2 mt-1 pl-3 border-l-2 border-term-surface">
    {children}
  </div>
);

export const commands = {
  help: {
    description: "List available commands",
    handler: () => (
      <div>
        <Header>Available Commands</Header>
        <div className="mt-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
          {Object.entries(commands).map(([name, cmd]) => (
            <React.Fragment key={name}>
              <Green>{name}</Green>
              <Dim>{cmd.description}</Dim>
            </React.Fragment>
          ))}
        </div>
      </div>
    ),
  },

  about: {
    description: "Who is Clay Nicholson?",
    handler: () => (
      <div>
        <Header>About Me</Header>
        <div className="mt-2">
          <p>{about.bio}</p>
          <div className="mt-3">
            <Label>Links:</Label>
            <div className="ml-2 mt-1">
              <div>
                <Dim>{">"}</Dim> GitHub:{" "}
                <Link href={about.links.github}>github.com/claynicholson</Link>
              </div>
              <div>
                <Dim>{">"}</Dim> LinkedIn:{" "}
                <Link href={about.links.linkedin}>
                  linkedin.com/in/clay-nicholson
                </Link>
              </div>
              <div>
                <Dim>{">"}</Dim> Email:{" "}
                <Link href={about.links.email}>{about.email}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  education: {
    description: "Education and coursework",
    handler: () => (
      <div>
        <Header>Education</Header>

        <div className="mt-3">
          <Green>{">> "}{education.college.name}</Green>
          <Section>
            <p>{education.college.status}</p>
            <p>
              <Label>Course:</Label> {education.college.course}
            </p>
          </Section>
        </div>

        <div className="mt-3">
          <Green>{">> "}{education.highSchool.name}</Green>
          <Section>
            <p>{education.highSchool.status}</p>
            <p>
              <Label>GPA:</Label> {education.highSchool.gpa}{" "}
              <Dim>|</Dim> <Label>SAT:</Label> {education.highSchool.sat}
            </p>
          </Section>
        </div>

        <div className="mt-3">
          <Green>{">> "}{education.dualEnrollment.school}</Green>
          <Section>
            <p><Label>Grades:</Label> {education.dualEnrollment.grades}</p>
            <div className="mt-1">
              {education.dualEnrollment.courses.map((c, i) => (
                <div key={i} className="ml-2">
                  <Dim>{">"}</Dim> {c}
                </div>
              ))}
            </div>
          </Section>
        </div>

        {education.programs.length > 0 && (
          <div className="mt-3">
            <Label>Programs:</Label>
            {education.programs.map((p, i) => (
              <div key={i} className="ml-2">
                <Dim>{">"}</Dim> <Accent>{p.name}</Accent> <Dim>({p.date})</Dim>
              </div>
            ))}
          </div>
        )}
      </div>
    ),
  },

  awards: {
    description: "Awards and recognition",
    handler: () => (
      <div>
        <Header>Awards & Recognition</Header>
        <div className="mt-2">
          {awards.map((a, i) => (
            <div key={i} className="mt-1 ml-2">
              <Green>{a.name}</Green>
              <div className="ml-4">
                <Dim>{a.detail}</Dim>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  whoami: {
    description: "Quick identity check",
    handler: () => (
      <div>
        <Green>Clay Nicholson</Green> <Dim>—</Dim>{" "}
        <Label>MIT {about.year}</Label> <Dim>|</Dim>{" "}
        <span>{about.course}</span>
      </div>
    ),
  },

  robotics: {
    description: "Robotics teams and projects",
    handler: () => (
      <div>
        <Header>Robotics</Header>

        <div className="mt-3">
          <div>
            <Green>
              {">> "}
              {robotics.robohawks.name}
            </Green>{" "}
            <Dim>({robotics.robohawks.type})</Dim> <Dim>—</Dim>{" "}
            <Label>{robotics.robohawks.role}</Label>
          </div>
          <Section>
            <p>{robotics.robohawks.description}</p>
            <div className="mt-1">
              <Link href={robotics.robohawks.website}>
                {robotics.robohawks.website}
              </Link>
            </div>
            <div className="mt-2">
              {robotics.robohawks.seasons.map((s, i) => (
                <div key={i} className="mt-1">
                  <Accent>{s.name}</Accent>
                  <div className="ml-2">
                    <Dim>{s.description}</Dim>
                    <div>
                      <Link href={s.repo}>
                        {s.repo.replace("https://github.com/", "")}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>

        <div className="mt-4">
          <div>
            <Green>
              {">> "}
              {robotics.gmr.name}
            </Green>{" "}
            <Dim>({robotics.gmr.type})</Dim> <Dim>—</Dim>{" "}
            <Label>{robotics.gmr.role}</Label>
          </div>
          <Section>
            <p>{robotics.gmr.description}</p>
            <div className="mt-1">
              <Link href={robotics.gmr.website}>{robotics.gmr.website}</Link>
            </div>
            <div className="mt-2">
              {robotics.gmr.seasons.map((s, i) => (
                <div key={i} className="mt-1">
                  <Accent>{s.name}</Accent>
                  <div className="ml-2">
                    <Dim>{s.description}</Dim>
                    <div>
                      <Link href={s.repo}>
                        {s.repo.replace("https://github.com/", "")}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>
    ),
  },

  hackclub: {
    description: "Hack Club projects and involvement",
    handler: () => (
      <div>
        <Header>Hack Club</Header>
        <Section>
          <p className="mt-1">{hackclub.description}</p>
          <p className="mt-2">
            <Label>{hackclub.role}</Label>
          </p>
        </Section>

        <div className="mt-3">
          <Label>Projects:</Label>
          {hackclub.projects.map((p, i) => (
            <div key={i} className="mt-2 ml-2">
              <Green>
                {">> "}
                {p.name}
              </Green>
              <div className="ml-4">
                <p>{p.description}</p>
                {p.url && (
                  <div>
                    <Link href={p.url}>{p.url}</Link>
                  </div>
                )}
                {p.github && (
                  <div>
                    <Dim>src:</Dim> <Link href={p.github}>{p.github.replace("https://github.com/", "")}</Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  research: {
    description: "Academic research projects",
    handler: () => (
      <div>
        <Header>Research</Header>

        <div className="mt-3">
          <Accent>{research.isef2026.title}</Accent>
          <div className="ml-2 mt-1">
            <Dim>{research.isef2026.timeline}</Dim>
          </div>
          <Section>
            <p className="mt-1">
              <Label>TLDR:</Label> {research.isef2026.tldr}
            </p>
            <p className="mt-2">{research.isef2026.details}</p>
          </Section>
        </div>

        <div className="mt-4">
          <Accent>{research.isef2025.title}</Accent>
          <div className="ml-2 mt-1">
            <Dim>{research.isef2025.timeline}</Dim>
          </div>
          <Section>
            <p className="mt-1">
              <Green>{research.isef2025.award}</Green>
            </p>
            <p className="mt-1">
              <Label>TLDR:</Label> {research.isef2025.tldr}
            </p>
            <p className="mt-2">{research.isef2025.details}</p>

            <div className="mt-3">
              <Label>Press & Awards:</Label>
              {research.isef2025.press.map((p, i) => (
                <div key={i} className="ml-2">
                  <Dim>{">"}</Dim> <Link href={p.url}>{p.label}</Link>
                </div>
              ))}
            </div>

            <div className="mt-3">
              <Label>Good Reads:</Label>
              {research.isef2025.reads.map((r, i) => (
                <div key={i} className="ml-2">
                  <Dim>{">"}</Dim> <Link href={r.url}>{r.label}</Link>
                </div>
              ))}
            </div>
          </Section>
        </div>

        <div className="mt-4">
          <Green>{">> "}{research.fpga.title}</Green>
          <Section>
            <p>{research.fpga.description}</p>
          </Section>
        </div>

        <div className="mt-4">
          <Green>{">> "}{research.next.title}</Green>
          <Section>
            <p>{research.next.description}</p>
          </Section>
        </div>
      </div>
    ),
  },

  projects: {
    description: "All projects combined",
    handler: () => (
      <div>
        <Header>All Projects</Header>
        <Dim className="block mt-1">
          Run &apos;robotics&apos;, &apos;hackclub&apos;, or &apos;research&apos; for details.
        </Dim>

        <div className="mt-3">
          <Label>Robotics:</Label>
          {[...robotics.robohawks.seasons, ...robotics.gmr.seasons].map(
            (s, i) => (
              <div key={i} className="ml-2">
                <Green>{s.name}</Green> <Dim>—</Dim>{" "}
                <Link href={s.repo}>
                  {s.repo.replace("https://github.com/", "")}
                </Link>
              </div>
            )
          )}
        </div>

        <div className="mt-3">
          <Label>Hack Club:</Label>
          {hackclub.projects.map((p, i) => (
            <div key={i} className="ml-2">
              <Green>{p.name}</Green>
              {p.url && (
                <span> <Dim>—</Dim> <Link href={p.url}>{p.url}</Link></span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-3">
          <Label>Research:</Label>
          <div className="ml-2">
            <Green>{research.isef2026.title}</Green>
          </div>
          <div className="ml-2">
            <Green>{research.isef2025.title}</Green>
          </div>
        </div>
      </div>
    ),
  },

  contact: {
    description: "Get in touch",
    handler: () => (
      <div>
        <Header>Contact</Header>
        <div className="mt-2 ml-2">
          <div>
            <Label>GitHub</Label>{" "}
            <Dim>........</Dim>{" "}
            <Link href={about.links.github}>github.com/claynicholson</Link>
          </div>
          <div>
            <Label>LinkedIn</Label>{" "}
            <Dim>......</Dim>{" "}
            <Link href={about.links.linkedin}>
              linkedin.com/in/clay-nicholson
            </Link>
          </div>
          <div>
            <Label>Email</Label>{" "}
            <Dim>.........</Dim>{" "}
            <Link href={about.links.email}>{about.email}</Link>
          </div>
        </div>
      </div>
    ),
  },

  ascii: {
    description: "Display ASCII art portrait",
    handler: () => (
      <div className="overflow-x-auto">
        <pre className="text-[0.5rem] sm:text-[0.6rem] leading-[0.55rem] sm:leading-[0.65rem] text-term-mauve">
          {PORTRAIT}
        </pre>
      </div>
    ),
  },

  neofetch: {
    description: "System info display",
    handler: () => {
      const lines = [
        [<Green key="h">clay</Green>, "@", <Accent key="h2">claynicholson.com</Accent>],
        ["─".repeat(20)],
        [<Label key="l">OS</Label>, ": ", "Clay Nicholson v1.0"],
        [<Label key="l">Host</Label>, ": ", "MIT '29"],
        [<Label key="l">Kernel</Label>, ": ", about.course],
        [<Label key="l">Uptime</Label>, ": ", "18 years"],
        [<Label key="l">Shell</Label>, ": ", "brain-bash 4.2"],
        [<Label key="l">Location</Label>, ": ", about.location],
        [<Label key="l">Languages</Label>, ": ", "Java, Python, C, JS"],
        [<Label key="l">Interests</Label>, ": ", "Robotics, ML, IC Design"],
        [<Label key="l">Editor</Label>, ": ", "VS Code / Vim"],
        [""],
        [
          ...[
            "term-pink",
            "term-mauve",
            "term-blue",
            "term-teal",
            "term-green",
            "term-yellow",
          ].map((c) => (
            <span key={c} className={`bg-${c} text-${c}`}>
              {"███"}
            </span>
          )),
        ],
      ];

      const asciiLines = NEOFETCH_SMALL.split("\n");
      const maxAsciiWidth = 12;

      return (
        <div>
          <pre className="text-sm">
            {lines.map((line, i) => (
              <div key={i} className="flex">
                <span className="text-term-teal inline-block" style={{ width: `${maxAsciiWidth}ch` }}>
                  {asciiLines[i] || ""}
                </span>
                <span className="ml-4">
                  {line.map((part, j) => (
                    <React.Fragment key={j}>{part}</React.Fragment>
                  ))}
                </span>
              </div>
            ))}
          </pre>
        </div>
      );
    },
  },

  ls: {
    description: "List available files",
    handler: () => (
      <div className="flex flex-wrap gap-x-6 gap-y-1">
        <Green>about.txt</Green>
        <Label>education/</Label>
        <Label>robotics/</Label>
        <Label>hackclub/</Label>
        <Label>research/</Label>
        <Green>awards.txt</Green>
        <Green>projects.txt</Green>
        <Green>contact.txt</Green>
        <Accent>portrait.ascii</Accent>
        <Dim>README.md</Dim>
      </div>
    ),
  },

  clear: {
    description: "Clear terminal",
    handler: () => null,
  },

  ssh: {
    description: "SSH connection info",
    handler: () => (
      <div>
        <Header>SSH Access</Header>
        <div className="mt-2">
          <p>Connect to this portfolio via real SSH:</p>
          <div className="mt-2 p-3 bg-term-surface rounded border border-term-overlay/20">
            <Green>$ ssh guest@claynicholson.com</Green>
          </div>
          <p className="mt-2">
            <Dim>No password required. Read-only access.</Dim>
          </p>
        </div>
      </div>
    ),
  },

  sudo: {
    description: "Elevate privileges",
    handler: () => (
      <div>
        <Accent>
          [sudo] password for clay: ********
          <br />
          Nice try. 😏
        </Accent>
      </div>
    ),
  },

  exit: {
    description: "Exit the terminal",
    handler: () => {
      if (typeof window !== "undefined") {
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_self");
      }
      return (
        <div>
          <Accent>There is no escape.</Accent>
        </div>
      );
    },
  },

  blog: {
    description: "Blog posts",
    handler: () => (
      <div>
        <Header>Blog</Header>
        <Dim className="block mt-1">Coming soon...</Dim>
      </div>
    ),
  },
};
