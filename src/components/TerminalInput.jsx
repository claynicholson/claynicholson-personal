"use client";

import React from "react";

export default function TerminalInput({
  value,
  onChange,
  onKeyDown,
  inputRef,
}) {
  return (
    <div className="flex items-center flex-wrap">
      <span className="text-term-blue font-bold">clay</span>
      <span className="text-term-overlay">@</span>
      <span className="text-term-green font-bold">claynicholson.com</span>
      <span className="text-term-overlay">:</span>
      <span className="text-term-yellow">~</span>
      <span className="text-term-overlay">$ </span>
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
        />
        <span
          className="absolute top-0 left-0 pointer-events-none text-term-rosewater"
          aria-hidden="true"
        >
          {value}
          <span className="inline-block w-[0.6em] h-[1.15em] bg-term-blue animate-blink align-middle ml-[1px] -mb-[2px]" />
        </span>
      </div>
    </div>
  );
}
