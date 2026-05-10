// Re-export the shared ASCII art so existing web imports keep working.
// Source of truth: ../../shared/ascii.js — edit there.

import shared from "../../shared/ascii";

export const BANNER = shared.BANNER;
export const PORTRAIT = shared.PORTRAIT;
export const NEOFETCH_SMALL = shared.NEOFETCH_FACE;

export const WELCOME_TEXT = `Welcome to Clay's personal server.
Type 'help' for available commands. Type 'ssh' for real SSH access.
`;
