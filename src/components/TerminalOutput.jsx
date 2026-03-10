"use client";

import React from "react";

export default function TerminalOutput({ command, output }) {
  return (
    <div className="mb-4 animate-fadeIn">
      <div className="flex items-center flex-wrap">
        <span className="text-term-blue font-bold">clay</span>
        <span className="text-term-overlay">@</span>
        <span className="text-term-green font-bold">claynicholson.com</span>
        <span className="text-term-overlay">:</span>
        <span className="text-term-yellow">~</span>
        <span className="text-term-overlay">$ </span>
        <span className="text-term-rosewater">{command}</span>
      </div>
      {output && (
        <div className="mt-1 ml-0 sm:ml-2 text-term-text">{output}</div>
      )}
    </div>
  );
}
