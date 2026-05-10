"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import TerminalOutput from "./TerminalOutput";
import TerminalInput from "./TerminalInput";
import CommandMenu, { filterMenu } from "./CommandMenu";
import { useTerminal } from "@/hooks/useTerminal";
import { BANNER } from "@/data/ascii";

export default function Terminal() {
  const {
    history,
    currentInput,
    setCurrentInput,
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

  // Reset highlight when filter changes (new selection always starts at top).
  const handleInputChange = useCallback((value) => {
    setCurrentInput(value);
    setMenuIndex(0);
  }, [setCurrentInput]);

  // Key handling — fzf model: arrows always navigate the filtered list,
  // Enter runs the highlighted item or, if nothing matches, the literal input.
  const handleKeyDown = useCallback(
    (e) => {
      const filtered = filterMenu(currentInput);

      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (filtered.length > 0) {
          setMenuIndex((prev) =>
            prev > 0 ? prev - 1 : filtered.length - 1
          );
        }
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (filtered.length > 0) {
          setMenuIndex((prev) =>
            prev < filtered.length - 1 ? prev + 1 : 0
          );
        }
        return;
      }

      if (e.key === "Enter") {
        e.preventDefault();
        if (filtered.length > 0) {
          processCommand(filtered[menuIndex]?.command || filtered[0].command);
        } else if (currentInput.trim()) {
          processCommand(currentInput);
        }
        setCurrentInput("");
        setMenuIndex(0);
        return;
      }

      if (e.key === "Escape") {
        e.preventDefault();
        setCurrentInput("");
        setMenuIndex(0);
        return;
      }

      if (e.key === "Tab") {
        e.preventDefault();
        if (filtered.length === 1) {
          setCurrentInput(filtered[0].command);
          setMenuIndex(0);
        } else if (filtered.length > 1) {
          // Common-prefix expansion across filtered ids.
          const ids = filtered.map((f) => f.command);
          let prefix = ids[0];
          for (const id of ids) {
            while (!id.startsWith(prefix)) prefix = prefix.slice(0, -1);
          }
          if (prefix.length > currentInput.length) {
            setCurrentInput(prefix);
            setMenuIndex(0);
          }
        }
        return;
      }

      if (e.key === "l" && e.ctrlKey) {
        e.preventDefault();
        // Clear handled by useTerminal would normally do this; keep it simple.
        processCommand("clear");
        return;
      }
    },
    [currentInput, menuIndex, processCommand, setCurrentInput]
  );

  const handleMenuSelect = useCallback(
    (cmd) => {
      processCommand(cmd);
      setCurrentInput("");
      setMenuIndex(0);
    },
    [processCommand, setCurrentInput]
  );

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
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
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
              <span className="text-term-green">
                Welcome to Clay&apos;s personal server.
              </span>
              <br />
              <span className="text-term-overlay">
                Type &apos;<span className="text-term-teal">help</span>&apos; for
                available commands. Type &apos;
                <span className="text-term-teal">ssh</span>&apos; for real SSH
                access.
              </span>
            </div>
          )}
        </div>

        {/* Filterable, arrow-key navigable menu */}
        {bannerDone && (
          <CommandMenu
            filter={currentInput}
            selectedIndex={menuIndex}
            onSelect={handleMenuSelect}
          />
        )}

        {/* Command history */}
        {history.map((entry, i) => (
          <TerminalOutput
            key={i}
            command={entry.command}
            output={entry.output}
          />
        ))}

        {/* Input line — typing here filters the menu above. */}
        {bannerDone && (
          <TerminalInput
            value={currentInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            inputRef={inputRef}
          />
        )}
      </div>
    </div>
  );
}
