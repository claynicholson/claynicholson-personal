// Web command registry. Most commands are generated from shared/sections —
// to add a new section, drop a file in shared/sections/ and register it in
// shared/sections/index.js. Edit this file only for "special" commands like
// `clear`, `ssh`, `neofetch`, etc.

import React from "react";
import { SECTIONS } from "../../shared/sections";
import { RenderBlocks } from "@/lib/renderJsx";
import { PORTRAIT, NEOFETCH_SMALL } from "./ascii";
import about from "../../shared/sections/about";

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

// ─── Section commands (auto-generated) ───────────────────────────────────────

const sectionCommands = Object.fromEntries(
  SECTIONS.map((s) => [
    s.id,
    {
      description: s.description,
      handler: () => <RenderBlocks blocks={s.blocks} />,
    },
  ])
);

// ─── Special commands ────────────────────────────────────────────────────────

const specialCommands = {
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

  whoami: {
    description: "Quick identity check",
    handler: () => (
      <div>
        <Green>{about.meta.name}</Green> <Dim>—</Dim>{" "}
        <Label>
          {about.meta.school} {about.meta.year}
        </Label>{" "}
        <Dim>|</Dim> <span>{about.meta.course}</span>
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
        [<Label key="l">Host</Label>, ": ", `MIT ${about.meta.year}`],
        [<Label key="l">Kernel</Label>, ": ", about.meta.course],
        [<Label key="l">Uptime</Label>, ": ", "18 years"],
        [<Label key="l">Shell</Label>, ": ", "brain-bash 4.2"],
        [<Label key="l">Location</Label>, ": ", about.meta.location],
        [<Label key="l">Languages</Label>, ": ", "Java, Python, C, JS"],
        [<Label key="l">Interests</Label>, ": ", "Robotics, ML, IC Design"],
        [<Label key="l">Editor</Label>, ": ", "VS Code / Vim"],
        [""],
        [
          ...["term-pink", "term-mauve", "term-blue", "term-teal", "term-green", "term-yellow"].map((c) => (
            <span key={c} className={`bg-${c} text-${c}`}>{"███"}</span>
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
                <span
                  className="text-term-teal inline-block"
                  style={{ width: `${maxAsciiWidth}ch` }}
                >
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
        {SECTIONS.map((s) => (
          <Green key={s.id}>{s.id}.txt</Green>
        ))}
        <Accent>portrait.ascii</Accent>
        <Dim>README.md</Dim>
      </div>
    ),
  },

  clear: { description: "Clear terminal", handler: () => null },

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
          Nice try.
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
        <Dim>Coming soon...</Dim>
      </div>
    ),
  },
};

// `help` first, then sections in registry order, then everything else.
export const commands = {
  help: specialCommands.help,
  ...sectionCommands,
  whoami: specialCommands.whoami,
  ls: specialCommands.ls,
  ascii: specialCommands.ascii,
  neofetch: specialCommands.neofetch,
  ssh: specialCommands.ssh,
  blog: specialCommands.blog,
  sudo: specialCommands.sudo,
  clear: specialCommands.clear,
  exit: specialCommands.exit,
};
