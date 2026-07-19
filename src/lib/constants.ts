/**
 * Shared motion + brand constants — single source of truth.
 *
 * EASE is the site-wide "premium" cubic-bezier used by every entrance and
 * reveal. The four brand colors are the ramp used across Kalakari, the
 * evidence board, and the labs. Values must never drift from the tokens in
 * src/app/globals.css (--badge-blue-text, --badge-green-text,
 * --badge-purple-text, --amber).
 */

export const EASE = [0.16, 1, 0.3, 1] as const;

export const BLUE = "#0d99ff";
export const GREEN = "#1f9d5e";
export const PURPLE = "#a78bfa";
export const AMBER = "#f59e0b";
