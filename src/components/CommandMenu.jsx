"use client";

import React from "react";

const MENU_ITEMS = [
  { command: "about", label: "about", description: "Who is Clay Nicholson?" },
  { command: "robotics", label: "robotics", description: "Robotics teams and projects" },
  { command: "hackclub", label: "hackclub", description: "Hack Club projects" },
  { command: "research", label: "research", description: "Academic research" },
  { command: "projects", label: "projects", description: "All projects combined" },
  { command: "contact", label: "contact", description: "Get in touch" },
  { command: "neofetch", label: "neofetch", description: "System info display" },
  { command: "ascii", label: "ascii", description: "ASCII art portrait" },
];

export default function CommandMenu({ selectedIndex, onSelect }) {
  return (
    <div className="mb-4 mt-1">
      <div className="text-term-overlay text-sm mb-2">
        Use <span className="text-term-yellow">arrow keys</span> to navigate, <span className="text-term-yellow">Enter</span> to select, or type a command below.
      </div>
      <div className="space-y-0.5">
        {MENU_ITEMS.map((item, i) => (
          <div
            key={item.command}
            onClick={() => onSelect(item.command)}
            className={`flex items-center cursor-pointer px-2 py-0.5 rounded transition-colors ${
              i === selectedIndex
                ? "bg-term-surface text-term-green"
                : "text-term-text hover:bg-term-surface/50"
            }`}
          >
            <span className={`w-5 ${i === selectedIndex ? "text-term-pink" : "text-transparent"}`}>
              {">"}
            </span>
            <span className={`w-24 font-bold ${i === selectedIndex ? "text-term-green" : "text-term-blue"}`}>
              {item.label}
            </span>
            <span className="text-term-overlay text-sm">{item.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export { MENU_ITEMS };
