"use client";

/**
 * SiteFooter — the shared site footer used across the home page and every case
 * study. Single source of truth: import it and drop <SiteFooter /> at the
 * bottom of any page. Includes the brand-ramp ordered-dither backdrop and the
 * quiet "unbeatable tic-tac-toe" corner piece.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { satoshi, figtree } from "@/styles/fonts";
import { slotText, type SlotTextController } from "slot-text";
import { SlotText } from "slot-text/react";

const ROLES = ["Product Designer", "Design Engineer", "UX Engineer"];
const FOCUSES = ["Visual Polish & Craft", "User Experience & Research", "Frontend Engineering"];

function getBrandGradientColor(index: number, total: number): string {
  if (total <= 1) return "#0d99ff";
  const t = index / (total - 1);
  
  const c0 = [13, 153, 255]; // #0d99ff
  const c1 = [31, 157, 94];  // #1f9d5e
  const c2 = [167, 139, 250]; // #a78bfa
  
  let r, g, b;
  if (t < 0.5) {
    const localT = t * 2;
    r = Math.round(c0[0] + (c1[0] - c0[0]) * localT);
    g = Math.round(c0[1] + (c1[1] - c0[1]) * localT);
    b = Math.round(c0[2] + (c1[2] - c0[2]) * localT);
  } else {
    const localT = (t - 0.5) * 2;
    r = Math.round(c1[0] + (c2[0] - c1[0]) * localT);
    g = Math.round(c1[1] + (c2[1] - c1[1]) * localT);
    b = Math.round(c1[2] + (c2[2] - c1[2]) * localT);
  }
  return `rgb(${r}, ${g}, ${b})`;
}

function AutoSlotText({
  values,
  interval = 4000,
}: {
  values: string[];
  interval?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % values.length);
    }, interval);
    return () => clearInterval(timer);
  }, [values.length, interval]);

  return (
    <span className="inline-block border-b border-dotted border-text-body/60 pb-0.5 font-bold text-text-body select-none">
      <SlotText
        text={values[index]}
        options={{
          direction: "up",
          duration: 350,
          stagger: 25,
          bounce: 0.2,
        }}
      />
    </span>
  );
}

function CopyButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("skponpurpose@gmail.com");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1400);
  };

  return (
    <button
      onClick={handleCopy}
      className={`group cursor-pointer inline-flex items-center gap-2 rounded-full bg-surface px-5 py-2.5 text-[14px] font-semibold active:scale-95 transition-all duration-200 shadow-sm border border-border-subtle ${figtree.className}`}
    >
      {/* Slot animated icon container */}
      <span className="relative w-4 h-4 overflow-hidden flex-shrink-0">
        <span
          className="absolute inset-0 flex flex-col transition-transform duration-280"
          style={{
            transform: copied ? "translateY(-100%)" : "translateY(0%)",
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {/* Top slot: copy icon */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-text-body w-4 h-4 flex-shrink-0"
          >
            <defs>
              <linearGradient id="btnBrandGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0d99ff" />
                <stop offset="50%" stopColor="#1f9d5e" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
            </defs>
            <path
              d="M16.875 2.5H6.875C6.70924 2.5 6.55027 2.56585 6.43306 2.68306C6.31585 2.80027 6.25 2.95924 6.25 3.125V6.25H3.125C2.95924 6.25 2.80027 6.31585 2.68306 6.43306C2.56585 6.55027 2.5 6.70924 2.5 6.875V16.875C2.5 17.0408 2.56585 17.1997 2.68306 17.3169C2.80027 17.4342 2.95924 17.5 3.125 17.5H13.125C13.2908 17.5 13.4497 17.4342 13.5669 17.3169C13.6842 17.1997 13.75 17.0408 13.75 16.875V13.75H16.875C17.0408 13.75 17.1997 13.6842 17.3169 13.5669C17.4342 13.4497 17.5 13.2908 17.5 13.125V3.125C17.5 2.95924 17.4342 2.80027 17.3169 2.68306C17.1997 2.56585 17.0408 2.5 16.875 2.5ZM12.5 16.25H3.75V7.5H12.5V16.25ZM16.25 12.5H13.75V6.875C13.75 6.70924 13.6842 6.55027 13.125 6.25H7.5V3.75H16.25V12.5Z"
              fill="currentColor"
            />
          </svg>
          
          {/* Bottom slot: Green Checkmark Icon SVG filled in brand gradient */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 flex-shrink-0"
          >
            <path
              d="M13.5672 7.68281C13.6253 7.74086 13.6714 7.80979 13.7029 7.88566C13.7343 7.96154 13.75 8.04287 13.75 8.125C13.75 8.20713 13.7343 8.28846 13.7029 8.36434C13.6714 8.44021 13.6253 8.50914 13.5672 8.56719L9.19219 12.9422C9.13415 13.0003 9.06522 13.0464 8.98934 13.0779C8.91347 13.1093 8.83214 13.1255 8.75 13.1255C8.66787 13.1255 8.58654 13.1093 8.51067 13.0779C8.43479 13.0464 8.36586 13.0003 8.30782 12.9422L6.43282 11.0672C6.31554 10.9499 6.24966 10.7909 6.24966 10.625C6.24966 10.4591 6.31554 10.3001 6.43282 10.1828C6.55009 10.0655 6.70915 9.99965 6.875 9.99965C7.04086 9.99965 7.19992 10.0655 7.31719 10.1828L8.75 11.6164L12.6828 7.68281C12.7409 7.6247 12.8098 7.5786 12.8857 7.54715C12.9615 7.5157 13.0429 7.49951 13.125 7.49951C13.2071 7.49951 13.2885 7.5157 13.3643 7.54715C13.4402 7.5786 13.5091 7.6247 13.5672 7.68281ZM18.125 10C18.125 11.607 17.6485 13.1779 16.7557 14.514C15.8629 15.8502 14.594 16.8916 13.1093 17.5065C11.6247 18.1215 9.99099 18.2824 8.41489 17.9689C6.8388 17.6554 5.39106 16.8815 4.25476 15.7452C3.11846 14.6089 2.34463 13.1612 2.03112 11.5851C1.71762 10.009 1.87852 8.37535 2.49348 6.8907C3.10844 5.40605 4.14985 4.1371 5.486 3.24431C6.82214 2.35152 8.39303 1.875 10 1.875C12.1542 1.87727 14.2195 2.73403 15.7427 4.25727C17.266 5.78051 18.1227 7.84581 18.125 10ZM16.875 10C16.875 8.64025 16.4718 7.31104 15.7164 6.18045C14.9609 5.04987 13.8872 4.16868 12.631 3.64833C11.3747 3.12798 9.99238 2.99183 8.65876 3.2571C7.32514 3.52237 6.10013 4.17715 5.13864 5.13864C4.17716 6.10013 3.52238 7.32513 3.2571 8.65875C2.99183 9.99237 3.12798 11.3747 3.64833 12.6309C4.16868 13.8872 5.04987 14.9609 6.18046 15.7164C7.31105 16.4718 8.64026 16.875 10 16.875C11.8227 16.8729 13.5702 16.1479 14.8591 14.8591C16.1479 13.5702 16.8729 11.8227 16.875 10Z"
              fill="url(#btnBrandGradient)"
            />
          </svg>
        </span>
      </span>

      <span className="select-none text-text-body">
        <SlotText
          text={copied ? "Copied!" : "Copy Email"}
          options={{
            direction: "up",
            duration: 280,
            stagger: 20,
            bounce: 0.3,
            skipUnchanged: false,
            color: copied ? (i, total) => getBrandGradientColor(i, total) : undefined,
          }}
        />
      </span>
    </button>
  );
}

type Cell = "X" | "O" | null;

const TTT_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function winnerOf(b: Cell[]): { who: Cell; line: number[] } {
  for (const l of TTT_LINES) {
    if (b[l[0]] && b[l[0]] === b[l[1]] && b[l[1]] === b[l[2]])
      return { who: b[l[0]], line: l };
  }
  return { who: null, line: [] };
}

function minimax(b: Cell[], isAI: boolean): { score: number; move: number } {
  const { who } = winnerOf(b);
  if (who === "O") return { score: 10, move: -1 };
  if (who === "X") return { score: -10, move: -1 };
  if (b.every(Boolean)) return { score: 0, move: -1 };
  let best = isAI ? -Infinity : Infinity;
  let move = -1;
  for (let i = 0; i < 9; i++) {
    if (b[i]) continue;
    b[i] = isAI ? "O" : "X";
    const { score } = minimax(b, !isAI);
    b[i] = null;
    if (isAI ? score > best : score < best) { best = score; move = i; }
  }
  return { score: best, move };
}

const FOOTER_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/skplovesdesign" },
  { label: "GitHub", href: "https://github.com/SkpGit28" },
  { label: "Resume", href: "/resume.pdf" },
];

const BAYER_8 = [
   0, 32,  8, 40,  2, 34, 10, 42,
  48, 16, 56, 24, 50, 18, 58, 26,
  12, 44,  4, 36, 14, 46,  6, 38,
  60, 28, 52, 20, 62, 30, 54, 22,
   3, 35, 11, 43,  1, 33,  9, 41,
  51, 19, 59, 27, 49, 17, 57, 25,
  15, 47,  7, 39, 13, 45,  5, 37,
  63, 31, 55, 23, 61, 29, 53, 21,
].map(v => v / 64);

const COLORS = [
  [13,  153, 255],
  [31,  157,  94],
  [167, 139, 250],
];

function lerpColor(a: number[], b: number[], t: number) {
  return a.map((v, i) => v + (b[i] - v) * t);
}

/** Writes the brand-ramp ordered-dither field into an ImageData buffer. */
function paintDitherField(img: ImageData, W: number, H: number) {
  const data = img.data;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const grad = (x / W) * 0.6 + (y / H) * 0.4;
      const seg = grad * 2;
      const col = seg < 1
        ? lerpColor(COLORS[0], COLORS[1], seg)
        : lerpColor(COLORS[1], COLORS[2], seg - 1);
      const threshold = BAYER_8[(y % 8) * 8 + (x % 8)];
      const quantize = (v: number) => {
        const norm = v / 255;
        const lo = Math.floor(norm * 4) / 4;
        const hi = Math.min(lo + 0.25, 1);
        return Math.round(((norm - lo) / 0.25 > threshold ? hi : lo) * 255);
      };
      const idx = (y * W + x) * 4;
      data[idx]     = quantize(col[0]);
      data[idx + 1] = quantize(col[1]);
      data[idx + 2] = quantize(col[2]);
      data[idx + 3] = 255;
    }
  }
}

/**
 * Renders the footer's exact dither field to a data-URL PNG (chunky pixels
 * baked in at `scale`×), for use as e.g. a background-clip:text fill so other
 * elements can wear the same material. Client-side only.
 */
export function ditherDataUrl(width: number, height: number, scale = 4): string {
  const w = Math.max(1, Math.floor(width / scale));
  const h = Math.max(1, Math.floor(height / scale));
  const small = document.createElement("canvas");
  small.width = w;
  small.height = h;
  const sctx = small.getContext("2d")!;
  const img = sctx.createImageData(w, h);
  paintDitherField(img, w, h);
  sctx.putImageData(img, 0, 0);

  const out = document.createElement("canvas");
  out.width = width;
  out.height = height;
  const octx = out.getContext("2d")!;
  octx.imageSmoothingEnabled = false;
  octx.drawImage(small, 0, 0, width, height);
  return out.toDataURL();
}

/**
 * SiteFooter is `position: sticky; bottom: 0`, so it pins to the viewport
 * floor and stays put behind the page (it's z-0; the page layer above is
 * z-10 with an opaque background). The document is taller than the page
 * content by exactly the footer's height, so the final stretch of scroll
 * slides the page layer up past the viewport bottom — the "shutter" opens
 * and uncovers the footer that was sitting still underneath the whole time.
 */
export function SiteFooterContent() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [thinking, setThinking] = useState(false);
  const [score, setScore] = useState({ you: 0, draws: 0, skp: 0 });
  const [time, setTime] = useState("");
  // Actual scrolled height of the page this footer sits on. `null` until measured
  // on the client; the headline falls back to 4,200 for SSR / first paint.
  const [pageHeight, setPageHeight] = useState<number | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrating the score from localStorage on mount is intentional
    try { const s = localStorage.getItem("skp-ttt-score"); if (s) setScore(JSON.parse(s)); } catch {}
  }, []);

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata" }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Measure the real page height and keep it in sync with layout changes
  // (lazy images, font swaps, viewport resize) so the headline stays exact.
  useEffect(() => {
    const measure = () =>
      setPageHeight(Math.round(document.documentElement.scrollHeight));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("load", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("load", measure);
    };
  }, []);

  const saveScore = (s: typeof score) => { setScore(s); try { localStorage.setItem("skp-ttt-score", JSON.stringify(s)); } catch {} };

  const { who: winner, line } = useMemo(() => winnerOf(board), [board]);
  const isDraw = !winner && board.every(Boolean);
  const gameOver = !!winner || isDraw;

  useEffect(() => {
    if (gameOver) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- recording the finished game's result exactly once is intentional
      if (winner === "X") saveScore({ ...score, you: score.you + 1 });
      else if (winner === "O") saveScore({ ...score, skp: score.skp + 1 });
      else saveScore({ ...score, draws: score.draws + 1 });
    }
  }, [gameOver]);

  const play = (i: number) => {
    if (board[i] || gameOver || thinking) return;
    const next = [...board]; next[i] = "X"; setBoard(next);
    const { who } = winnerOf(next);
    if (who || next.every(Boolean)) return;
    setThinking(true);
    setTimeout(() => { const { move } = minimax([...next], true); const after = [...next]; if (move >= 0) after[move] = "O"; setBoard(after); setThinking(false); }, 420);
  };

  const reset = () => { setBoard(Array(9).fill(null)); setThinking(false); };

  // Wager copy adapts to the visitor's record (localStorage remembers them):
  // fresh visitors get the challenge, losers get needled, winners get respect.
  const gamesPlayed = score.you + score.draws + score.skp;
  const wager =
    score.you > 0
      ? { head: `Fine, you've beaten me ${score.you === 1 ? "once" : `${score.you} times`}. The no-negotiation clause stands.` }
      : gamesPlayed > 0
        ? { head: `Still unbeaten. You're 0–${score.draws}–${score.skp} against me, care to change that?` }
        : { head: "Beat me at tic-tac-toe and we skip the salary negotiation." };

  const handleMailTo = () => {
    const subject = encodeURIComponent("Let's talk");
    const body = encodeURIComponent(
      "Hey Sushant,\n\nI was browsing your portfolio and would love to chat about potential opportunities to work together.\n\nLet's connect!\n\nBest regards,"
    );
    window.location.href = `mailto:skponpurpose@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="w-full border-t border-border-subtle relative">
      {/* Background only between vertical lines */}
      <div
        className="absolute inset-0 bg-bg-subtle"
        style={{
          left: "calc(50% - 40.75rem)",
          right: "calc(50% - 40.75rem)",
        }}
      />
      <div className="relative mx-auto w-full max-w-[62.5rem] px-6 pt-16 pb-9 lg:px-0">

        {/* ── Headline + TicTacToe side by side ── */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-8">
          <div className="max-w-[30.625rem] flex flex-col md:self-stretch">
            <h2 className={`text-[1.75rem] sm:text-[2rem] md:text-[2.25rem] font-semibold leading-[1.25] tracking-[-0.03em] text-text-primary mb-4 ${satoshi.className}`}>
              You just scrolled through{" "}
              <span className="relative mx-0.5 inline-block whitespace-nowrap rounded-md bg-text-primary px-2 py-0.5 text-white">
                {(pageHeight ?? 4200).toLocaleString()}px
                {/* needle cursor — top-right corner, pointing down-left into the number */}
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 16 16"
                  aria-hidden
                  className="pointer-events-none absolute -right-2.5 -top-2.5 -rotate-90"
                >
                  <path d="M2 1 L14 8.5 L8.5 9.5 L6 15 Z" fill="#0d99ff" stroke="#fff" strokeWidth="1" />
                </svg>
                {/* needle cursor — bottom-left corner, pointing up-right into the number */}
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 16 16"
                  aria-hidden
                  className="pointer-events-none absolute -bottom-2.5 -left-2.5 rotate-90"
                >
                  <path d="M2 1 L14 8.5 L8.5 9.5 L6 15 Z" fill="#a78bfa" stroke="#fff" strokeWidth="1" />
                </svg>
              </span>{" "}
              of design.
            </h2>
            <div className={`text-[1.125rem] sm:text-[1.25rem] md:text-[1.375rem] font-normal leading-[1.6] tracking-tight text-text-body mb-6 ${figtree.className}`}>
              Clearly, you care about detail. That’s exactly how I build products. If you value craft, polish, and execution, let&apos;s build together.
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-6 md:mt-auto">
              <button
                onClick={handleMailTo}
                className={`group relative overflow-hidden inline-flex items-center justify-center rounded-full bg-text-primary px-6 py-2.5 text-sm font-semibold text-white active:scale-95 transition-all shadow-sm ${figtree.className}`}
              >
                <span className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-badge-blue-text via-badge-green-text to-badge-purple-text transition-all duration-500 ease-out group-hover:h-[18.75rem] group-hover:w-[18.75rem]"></span>
                <span className="relative z-10 flex items-center gap-2">
                  Let&apos;s talk
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </span>
              </button>
              
              <CopyButton />
            </div>
          </div>

          <div className="flex w-full flex-col md:w-[21.25rem] md:shrink-0 md:self-stretch">
            <div className="flex h-full w-full flex-col rounded-2xl border border-border-subtle bg-surface shadow-sm p-6">
              <p className={`mb-3 text-xs leading-[1.5] font-semibold uppercase tracking-[0.16em] text-text-body ${figtree.className}`}>
                a friendly wager
              </p>
              <p className={`text-[1.125rem] font-semibold leading-snug tracking-[-0.01em] text-text-primary ${satoshi.className}`}>
                {wager.head}
              </p>
              {/* the board takes the leftover middle space */}
              <div className="flex flex-1 items-center justify-center py-4">
                <div className="grid w-fit grid-cols-3 gap-1.5">
                  {board.map((cell, i) => {
                    const isWin = line.includes(i);
                    return (
                      <button key={i} onClick={() => play(i)} aria-label={`cell ${i + 1}`}
                        className="flex h-12 w-12 items-center justify-center rounded-lg transition-colors duration-200 hover:bg-bg-subtle shadow-sm"
                        style={{ border: `1.5px solid ${isWin ? "var(--primary)" : "var(--border-subtle)"}`, background: isWin ? "var(--bg-subtle)" : "var(--surface)", cursor: cell || gameOver ? "default" : "pointer" }}>
                        {cell === "X" && <svg width="16" height="16" viewBox="0 0 30 30" aria-hidden><path d="M6 6 L24 24 M24 6 L6 24" stroke="var(--text-heading)" strokeWidth="3" strokeLinecap="round" style={{ strokeDasharray: 52, strokeDashoffset: 0, animation: "ttt-draw .28s ease-out" }} /></svg>}
                        {cell === "O" && <svg width="16" height="16" viewBox="0 0 30 30" aria-hidden><circle cx="15" cy="15" r="9.5" fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" style={{ strokeDasharray: 60, strokeDashoffset: 0, animation: "ttt-draw .32s ease-out" }} /></svg>}
                      </button>
                    );
                  })}
                </div>
              </div>
              <style>{`@keyframes ttt-draw { from { stroke-dashoffset: 60; } to { stroke-dashoffset: 0; } }`}</style>
              <p className={`text-center text-sm text-text-body font-medium ${figtree.className}`}>
                {gameOver ? (
                  <>{winner === "X" ? "You won. No negotiations." : winner === "O" ? "Called it." : "Fine, we'll call it even."}{" "}<button onClick={reset} className="underline decoration-black/15 underline-offset-2 hover:text-text-primary transition-colors">Run it back</button>{" "}<span className="opacity-50 tabular-nums">{score.you}–{score.draws}–{score.skp}</span></>
                ) : (
                  <>{"You're X. Win and there's no negotiations."}</>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* ── Bottom: links + micro-details ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-border-subtle">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {FOOTER_LINKS.map((l) => (
              <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`group text-sm text-text-body font-medium hover:text-text-primary transition-colors ${figtree.className}`}>
                {l.label}<span className="inline-block ml-0.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" style={{ transform: "rotate(0deg)" }} onMouseEnter={(e) => (e.currentTarget.style.transform = "rotate(45deg) translateX(0.25rem)")} onMouseLeave={(e) => (e.currentTarget.style.transform = "rotate(0deg) translateX(0)")}>→</span>
              </a>
            ))}
          </div>
          <p className={`text-xs text-text-body font-medium ${figtree.className}`}>© {new Date().getFullYear()} Sushant · designed & caffeinated in Noida</p>
        </div>
      </div>
    </section>
  );
}

export function SiteFooterBackground() {
  // The footer sits behind the page, so IntersectionObserver would call it
  // "visible" from the start. Instead, fire the letters once the scroll has
  // uncovered about half of the 230px shutter.
  const [revealed, setRevealed] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading a media query on mount is intentional
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const onScroll = () => {
      const uncovered =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 140;
      if (uncovered) {
        setRevealed(true);
      } else {
        setRevealed(false);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer
      className="sticky bottom-0 z-0 overflow-hidden w-full h-[20.125rem] border-t border-border-subtle"
      style={{
        backgroundImage: "url('/FinalFooter.png')",
        // "cover" crops whatever the viewport's aspect ratio doesn't match;
        // pinning to the top edge (instead of centering) keeps that crop on
        // the bottom only, so the mosaic squares baked into the image start
        // clean and whole at the footer's top edge instead of being cut
        // through the middle by a symmetric center-crop.
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* Subtle Digital Grid Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-60"
        style={{
          backgroundImage: "url('/DigitalMosaicFrame.svg?v=2')",
          backgroundSize: "90rem 20.75rem",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "top right",
        }}
      />
      {/* EHIPASSIKO (Pali: "come and see for yourself") — character-by-character
          line-mask reveal, spread across the 1000px content width, flush with
          the bottom edge like it's die-cut from the footer. Once revealed, a
          slow ripple breathes through the letters; hovering a letter lifts it
          and fills it with the brand gradient. */}
      <style>{`
        .ehip-ink { color: #fff; -webkit-text-stroke: 0.032em #fff; }
        .ehip-lift { transition: transform .35s cubic-bezier(.16, 1, .3, 1); }
        .ehip-lift:hover { transform: translateY(-0.5rem); }
        @keyframes ehip-wave { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-0.3125rem); } }
        .ehip-dash { background: #fff; }
      `}</style>
      <div className="absolute top-16 right-8 z-10 pointer-events-none -translate-y-full">
        <p
          className={`inline-block text-xs leading-none font-semibold uppercase tracking-widest text-white ${figtree.className}`}
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(0.5rem)",
            transition: reduceMotion ? "none" : "opacity .6s ease .9s, transform .6s cubic-bezier(0.16, 1, 0.3, 1) .9s",
          }}
        >
          pali · come and see for yourself
        </p>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-[-1.25rem] sm:bottom-[-2.5rem] md:bottom-[-3.125rem] flex justify-center">
        <div className="w-full max-w-[62.5rem] px-6 lg:px-0 relative">
          <p aria-label="Ehipassiko" className="flex select-none justify-center gap-x-0.5 sm:gap-x-1 md:gap-x-1.5 w-full">
            {"EHIPASSIKO".split("").map((ch, i) => (
              <span
                key={i}
                aria-hidden
                className="pointer-events-auto inline-block overflow-hidden shrink-0 text-[7.5rem] sm:text-[14rem] md:text-[18rem] leading-none"
                style={{ padding: "0 0.07em", margin: "0 -0.07em" }}
              >
                {/* the mask carries the font-size so its em-based side slack
                    scales with the letters: negative tracking pulls each box
                    0.04em narrower than the glyph paints, and the stroke adds
                    more, so without the padding the mask crops P/S bowls. The
                    negative margin cancels the padding, keeping pitch intact. */}
                <span
                  className="inline-block"
                  style={{
                    transform: revealed ? "translateY(0%)" : "translateY(115%)",
                    transition: reduceMotion
                      ? "none"
                      : `transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 35}ms`,
                  }}
                >
                  <span className="ehip-lift inline-block">
                    <span
                      className={`ehip-ink relative inline-block font-bold leading-none tracking-[-0.04em] ${satoshi.className}`}
                      style={
                        reduceMotion || !revealed
                          ? undefined
                          : { animation: "ehip-wave 5s ease-in-out infinite", animationDelay: `${i * 0.18 - 5}s` }
                      }
                    >
                      {/* macron over the long ē — exactly the E's own width */}
                      {i === 0 && (
                        <span
                          aria-hidden
                          className="ehip-dash absolute inset-x-0"
                          style={{ top: 0, height: "0.055em", borderRadius: "2px" }}
                        />
                      )}
                      {ch}
                    </span>
                  </span>
                </span>
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}

export function FooterReveal({
  children,
  className = "",
  id,
  heroHeight = "0rem",
  showFooter = true,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  heroHeight?: string;
  showFooter?: boolean;
}) {
  return (
    <>
      <div id={id} className={`relative z-10 flex flex-col ${className}`}>
        <div
          className="absolute bottom-0 left-[calc(50%-40.75rem)] w-[1px] bg-border-subtle pointer-events-none hidden min-[1340px]:block z-10"
          style={{ top: heroHeight }}
        />
        <div
          className="absolute bottom-0 right-[calc(50%-40.75rem)] w-[1px] bg-border-subtle pointer-events-none hidden min-[1340px]:block z-10"
          style={{ top: heroHeight }}
        />
        {children}
        {showFooter && <SiteFooterContent />}
      </div>
      <SiteFooterBackground />
    </>
  );
}
