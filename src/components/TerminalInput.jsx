"use client";

import React from "react";
import Prompt from "./Prompt";

export default function TerminalInput({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) {
  return (
    <div className="flex items-center flex-wrap">
      <Prompt />
      <div className="relative flex-1 min-w-[100px]">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          className="bg-transparent outline-none text-term-rosewater w-full caret-transparent"
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          inputMode="text"
          aria-label="Terminal command input"
        />
        <span
          className="absolute top-0 left-0 pointer-events-none text-term-rosewater whitespace-pre"
          aria-hidden="true"
        >
          {value}
          <span className="inline-block w-[0.55em] h-[1.1em] bg-term-blue animate-blink align-text-bottom ml-px" />
        </span>
      </div>
    </div>
  );
}
