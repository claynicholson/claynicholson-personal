"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import TerminalOutput from "./TerminalOutput";
import TerminalInput from "./TerminalInput";
import CommandMenu, { MENU_ITEMS } from "./CommandMenu";
import { useTerminal } from "@/hooks/useTerminal";
import { BANNER } from "@/data/ascii";

export default function Terminal() {
  const {
    history,
    currentInput,
    setCurrentInput,
    handleKeyDown: handleTerminalKeyDown,
    inputRef,
    processCommand,
  } = useTerminal();

  const scrollRef = useRef(null);
  const bannerRef = useRef(null);
  const [bannerDone, setBannerDone] = useState(false);
  const [menuIndex, setMenuIndex] = useState(0);

  // Line-by-line typing animation for banner
  useEffect(() => {
    const bannerLines = BANNER.split("\n");
    const el = bannerRef.current;
    if (!el) return;

    const skipAnimation = sessionStorage.getItem("banner-shown");
    if (skipAnimation) {
      el.textContent = BANNER;
      setBannerDone(true);
      return;
    }

    let lineIndex = 0;
    const interval = setInterval(() => {
      if (lineIndex >= bannerLines.length) {
        sessionStorage.setItem("banner-shown", "true");
        setBannerDone(true);
        clearInterval(interval);
        return;
      }
      el.textContent += (lineIndex > 0 ? "\n" : "") + bannerLines[lineIndex];
      lineIndex++;
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, currentInput]);

  // Handle key events — menu navigation when input is empty, otherwise terminal input
  const handleKeyDown = useCallback((e) => {
    if (!currentInput) {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setMenuIndex((prev) => (prev > 0 ? prev - 1 : MENU_ITEMS.length - 1));
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setMenuIndex((prev) => (prev < MENU_ITEMS.length - 1 ? prev + 1 : 0));
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const cmd = MENU_ITEMS[menuIndex].command;
        processCommand(cmd);
        return;
      }
    }
    handleTerminalKeyDown(e);
  }, [currentInput, menuIndex, processCommand, handleTerminalKeyDown]);

  const handleMenuSelect = useCallback((cmd) => {
    processCommand(cmd);
  }, [processCommand]);

  // Focus input on click anywhere
  const handleClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      ref={scrollRef}
      onClick={handleClick}
      className="h-screen w-full bg-term-base p-4 sm:p-6 md:p-8 overflow-y-auto font-mono text-sm sm:text-base cursor-text select-text"
    >
      {/* CRT scanline overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
        }}
      />

      <div className="max-w-5xl mx-auto">
        {/* ASCII Banner */}
        <div className="mb-6">
          <pre
            ref={bannerRef}
            className="text-[0.35rem] sm:text-[0.5rem] md:text-[0.6rem] lg:text-xs leading-[0.4rem] sm:leading-[0.55rem] md:leading-[0.65rem] lg:leading-[0.85rem] text-term-mauve banner-glow overflow-x-auto"
          />
          {bannerDone && (
            <div className="mt-3 text-term-text">
              <span className="text-term-green">Welcome to Clay&apos;s personal server.</span>
              <br />
              <span className="text-term-overlay">
                Type &apos;<span className="text-term-teal">help</span>&apos; for available commands.
                Type &apos;<span className="text-term-teal">ssh</span>&apos; for real SSH access.
              </span>
            </div>
          )}
        </div>

        {/* Arrow-key navigable menu */}
        {bannerDone && (
          <CommandMenu
            selectedIndex={menuIndex}
            onSelect={handleMenuSelect}
          />
        )}

        {/* Command history */}
        {history.map((entry, i) => (
          <TerminalOutput key={i} command={entry.command} output={entry.output} />
        ))}

        {/* Input line */}
        {bannerDone && (
          <TerminalInput
            value={currentInput}
            onChange={setCurrentInput}
            onKeyDown={handleKeyDown}
            inputRef={inputRef}
          />
        )}
      </div>
    </div>
  );
}
