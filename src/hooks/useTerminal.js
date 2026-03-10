import { useState, useCallback, useRef } from "react";
import { commands } from "@/data/commands";

export function useTerminal() {
  const [history, setHistory] = useState([]);
  const [currentInput, setCurrentInput] = useState("");
  const [inputHistory, setInputHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);

  const processCommand = useCallback(
    (raw) => {
      const trimmed = raw.trim();
      if (!trimmed) return;

      const [cmdName, ...args] = trimmed.toLowerCase().split(/\s+/);

      if (cmdName === "clear") {
        setHistory([]);
        setInputHistory((prev) => [...prev, trimmed]);
        setHistoryIndex(-1);
        return;
      }

      const cmd = commands[cmdName];
      let output;

      if (cmd) {
        output = cmd.handler(args);
      } else {
        output = (
          <div>
            <span className="text-term-pink">
              command not found: {cmdName}
            </span>
            <span className="text-term-overlay">
              {" "}
              — Type &apos;help&apos; for available commands.
            </span>
          </div>
        );
      }

      setHistory((prev) => [...prev, { command: trimmed, output }]);
      setInputHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(-1);
    },
    []
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        processCommand(currentInput);
        setCurrentInput("");
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHistoryIndex((prev) => {
          const newIndex =
            prev === -1
              ? inputHistory.length - 1
              : Math.max(0, prev - 1);
          if (inputHistory[newIndex] !== undefined) {
            setCurrentInput(inputHistory[newIndex]);
          }
          return newIndex;
        });
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setHistoryIndex((prev) => {
          const newIndex = prev + 1;
          if (newIndex >= inputHistory.length) {
            setCurrentInput("");
            return -1;
          }
          setCurrentInput(inputHistory[newIndex]);
          return newIndex;
        });
      } else if (e.key === "Tab") {
        e.preventDefault();
        const partial = currentInput.toLowerCase().trim();
        if (partial) {
          const match = Object.keys(commands).find((c) =>
            c.startsWith(partial)
          );
          if (match) {
            setCurrentInput(match);
          }
        }
      } else if (e.key === "l" && e.ctrlKey) {
        e.preventDefault();
        setHistory([]);
      }
    },
    [currentInput, inputHistory, processCommand]
  );

  return {
    history,
    currentInput,
    setCurrentInput,
    handleKeyDown,
    inputRef,
    processCommand,
  };
}
