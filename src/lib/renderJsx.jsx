// JSX renderer for the shared `blocks` DSL. Mirror of the ANSI renderer in
// shared/blocks.js — keep them in sync when adding a new block type.

import React from "react";

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

function inlineJsx(node) {
  if (node == null) return null;
  if (typeof node === "string") return node;
  if (node.type === "link") return <Link href={node.url}>{node.label}</Link>;
  return null;
}

function indentStyle(level) {
  return level > 0 ? { marginLeft: `${level * 0.75}rem` } : undefined;
}

function Block({ block, level = 0 }) {
  switch (block.type) {
    case "header":
      return <div className="text-term-mauve font-bold">{block.text}</div>;
    case "subhead":
      return (
        <div className="mt-2" style={indentStyle(level)}>
          <span className="text-term-green">{">> "}{block.text}</span>
          {block.meta && (
            <span className="text-term-overlay"> {block.meta}</span>
          )}
        </div>
      );
    case "paragraph":
      return (
        <p style={indentStyle(level)} className="whitespace-pre-wrap">
          {block.text}
        </p>
      );
    case "dim":
      return (
        <div className="text-term-overlay" style={indentStyle(level)}>
          {block.text}
        </div>
      );
    case "spacer":
      return <div className="h-2" />;
    case "link":
      return (
        <div style={indentStyle(level)}>
          <Link href={block.url}>{block.label}</Link>
        </div>
      );
    case "row":
      return (
        <div style={indentStyle(level)}>
          <span className="text-term-yellow">{block.label}</span>{" "}
          {inlineJsx(block.value)}
        </div>
      );
    case "bullet":
      return (
        <div style={indentStyle(level)}>
          <span className="text-term-overlay">{">"}</span> {block.text}
        </div>
      );
    case "linked_bullet":
      return (
        <div style={indentStyle(level)}>
          <span className="text-term-overlay">{">"}</span>{" "}
          {inlineJsx(block.link)}
        </div>
      );
    case "nest":
      return (
        <div className="ml-2 mt-1 pl-3 border-l-2 border-term-surface">
          {block.children.map((c, i) => (
            <Block key={i} block={c} level={level + 1} />
          ))}
        </div>
      );
    case "card":
      return (
        <div className="mt-2" style={indentStyle(level)}>
          <div>
            <span className="text-term-pink">{block.title}</span>
            {block.meta && (
              <span className="text-term-overlay"> {block.meta}</span>
            )}
          </div>
          {block.body && (
            <div className="ml-2 text-term-overlay">{block.body}</div>
          )}
          {block.link && <div className="ml-2">{inlineJsx(block.link)}</div>}
        </div>
      );
    case "raw":
      return block.jsx || null;
    default:
      return null;
  }
}

export function RenderBlocks({ blocks }) {
  return (
    <div>
      {blocks.map((b, i) => (
        <Block key={i} block={b} />
      ))}
    </div>
  );
}
