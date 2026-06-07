"use client";

import React from "react";
import Prompt from "./Prompt";

export default function TerminalOutput({ command, output }) {
  return (
    <div className="mb-4 animate-fadeIn">
      <div className="flex items-center flex-wrap">
        <Prompt />
        <span className="text-term-rosewater">{command}</span>
      </div>
      {output && (
        <div className="mt-1 ml-0 sm:ml-2 text-term-text">{output}</div>
      )}
    </div>
  );
}
