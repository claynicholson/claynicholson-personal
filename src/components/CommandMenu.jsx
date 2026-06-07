"use client";

import React from "react";
import { SECTIONS } from "../../shared/sections";

// Menu items = every registered section + a couple of fun extras.
// To add a new section to the menu, just register it in shared/sections/index.js.
const EXTRAS = [
  { command: "neofetch", label: "neofetch", description: "System info display" },
  { command: "ascii", label: "ascii", description: "ASCII art portrait" },
];

const MENU_ITEMS = [
  ...SECTIONS.map((s) => ({
    command: s.id,
    label: s.label,
    description: s.description,
  })),
  ...EXTRAS,
];

// Substring filter on label / command / description.
function filterMenu(filter) {
  if (!filter) return MENU_ITEMS;
  const f = filter.toLowerCase();
  return MENU_ITEMS.filter(
    (i) =>
      i.label.toLowerCase().includes(f) ||
      i.command.toLowerCase().includes(f) ||
      i.description.toLowerCase().includes(f)
  );
}

export default function CommandMenu({ filter, selectedIndex, onSelect }) {
  const filtered = filterMenu(filter);

  return (
    <div className="mb-4 mt-1">
      <div className="text-term-overlay text-sm mb-2">
        <span className="text-term-yellow">arrows</span> navigate,{" "}
        <span className="text-term-yellow">enter</span> select,{" "}
        <span className="text-term-yellow">type</span> to filter
      </div>
      <div className="space-y-0.5">
        {filtered.length === 0 ? (
          <div className="text-term-overlay px-2 py-0.5">
            (no matches — press{" "}
            <span className="text-term-yellow">Enter</span> to run &quot;
            {filter}&quot; as a command)
          </div>
        ) : (
          filtered.map((item, i) => (
            <div
              key={item.command}
              onClick={() => onSelect(item.command)}
              className={`flex items-center cursor-pointer px-2 py-0.5 rounded transition-colors ${
                i === selectedIndex
                  ? "bg-term-surface text-term-green"
                  : "text-term-text hover:bg-term-surface/50"
              }`}
            >
              <span
                className={`w-5 ${
                  i === selectedIndex ? "text-term-pink" : "text-transparent"
                }`}
              >
                {">"}
              </span>
              <span
                className={`w-24 font-bold ${
                  i === selectedIndex ? "text-term-green" : "text-term-blue"
                }`}
              >
                {item.label}
              </span>
              <span className="text-term-overlay text-sm">
                {item.description}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export { MENU_ITEMS, filterMenu };
