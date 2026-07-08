"use client";

/**
 * HERO ANIM COMPARE — five copies of the real headline, shrunk to fit one
 * viewport with no scrolling, each running one of the five premium text-
 * reveal systems discussed. Standalone comparison tool, not the real hero.
 *
 * Effect 5 (scroll-linked reveal) is adapted: the real version ties reveal
 * progress to scroll position, which conflicts with "no scrolling" here, so
 * it's driven by a mount-timer instead, producing the same visual (a curtain
 * lifting) so it can be seen without scrolling. Labelled below its block.
 */

import { useEffect, useState } from "react";
import localFont from "next/font/local";
import { Manrope } from "next/font/google";
import { motion, useReducedMotion } from "framer-motion";

const satoshi = localFont({
  src: [
    { path: "../../../public/fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
    { path: "../../../public/fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
  ],
});
const manropeVar = Manrope({ subsets: ["latin"], weight: "variable" });

const T = { heading: "#001536", body: "#70768c" };
const EASE = [0.16, 1, 0.3, 1] as const;

const SEGMENTS = [
  { text: "I help ", emphasis: false },
  { text: "high-stake businesses", emphasis: true },
  { text: " to ", emphasis: false },
  { text: "solve the right problem", emphasis: true },
  { text: " through ", emphasis: false },
  { text: "design", emphasis: true },
  { text: ".", emphasis: false },
];

type Token = { text: string; color: string; isSpace: boolean };
function buildTokens(): Token[] {
  const out: Token[] = [];
  for (const seg of SEGMENTS) {
    const color = seg.emphasis ? T.heading : T.body;
    for (const t of seg.text.split(/(\s+)/).filter((s) => s.length > 0)) {
      out.push({ text: t, color, isSpace: /^\s+$/.test(t) });
    }
  }
  return out;
}
const WORDS = buildTokens();

const HEADLINE_CLASS =
  "text-center text-[21px] font-bold leading-[1.35] tracking-[-0.02em]";

/* ── 1. Line-mask slide-up ── */
function Effect1LineMask({ replayKey, reduce }: { replayKey: number; reduce: boolean }) {
  return (
    <h2 key={replayKey} className={HEADLINE_CLASS}>
      {WORDS.map((w, i) => (
        <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}>
          <motion.span
            initial={reduce ? false : { y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.032, ease: EASE }}
            style={{ display: "inline-block", color: w.color, whiteSpace: w.isSpace ? "pre" : "normal" }}
          >
            {w.text}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}

/* ── 2. Variable-weight morph (Manrope variable, CSS-transition driven) ── */
function Effect2WeightMorph({ replayKey, reduce }: { replayKey: number; reduce: boolean }) {
  return (
    <h2 key={replayKey} className={`${manropeVar.className} ${HEADLINE_CLASS}`}>
      {WORDS.map((w, i) => (
        <WeightWord key={i} word={w} index={i} reduce={reduce} />
      ))}
    </h2>
  );
}
function WeightWord({ word, index, reduce }: { word: Token; index: number; reduce: boolean }) {
  const [ready, setReady] = useState(reduce);
  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setReady(true), 100 + index * 30);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <span
      style={{
        display: "inline-block",
        color: word.color,
        opacity: ready ? 1 : 0,
        fontVariationSettings: `"wght" ${ready ? 700 : 300}`,
        transition: "font-variation-settings 0.55s ease, opacity 0.5s ease",
        whiteSpace: word.isSpace ? "pre" : "normal",
      }}
    >
      {word.text}
    </span>
  );
}

/* ── 3. Blur-stagger + one-time light sweep ── */
function Effect3Sweep({ replayKey, reduce }: { replayKey: number; reduce: boolean }) {
  return (
    <div key={replayKey} style={{ position: "relative", overflow: "hidden" }}>
      <h2 className={HEADLINE_CLASS}>
        {WORDS.map((w, i) => (
          <motion.span
            key={i}
            initial={reduce ? false : { opacity: 0, y: 8, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay: 0.08 + i * 0.03, ease: EASE }}
            style={{ display: "inline-block", color: w.color, whiteSpace: w.isSpace ? "pre" : "normal" }}
          >
            {w.text}
          </motion.span>
        ))}
      </h2>
      {!reduce && (
        <motion.div
          aria-hidden
          initial={{ x: "-60%" }}
          animate={{ x: "160%" }}
          transition={{ duration: 0.9, delay: 1.1, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: 0,
            width: "60%",
            background:
              "linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.9) 50%, transparent 70%)",
            mixBlendMode: "overlay",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}

/* ── 4. Character-level 3D rotate-in ── */
function Effect4CharRotate({ replayKey, reduce }: { replayKey: number; reduce: boolean }) {
  let charIndex = 0;
  return (
    <h2 key={replayKey} className={HEADLINE_CLASS} style={{ perspective: 500 }}>
      {WORDS.map((w, wi) => (
        <span key={wi} style={{ display: "inline-block", whiteSpace: w.isSpace ? "pre" : "normal" }}>
          {w.isSpace
            ? w.text
            : [...w.text].map((ch, ci) => {
                const idx = charIndex++;
                return (
                  <motion.span
                    key={ci}
                    initial={reduce ? false : { opacity: 0, rotateX: -90, y: 5 }}
                    animate={{ opacity: 1, rotateX: 0, y: 0 }}
                    transition={{ duration: 0.38, delay: 0.08 + idx * 0.014, ease: EASE }}
                    style={{ display: "inline-block", color: w.color, transformStyle: "preserve-3d" }}
                  >
                    {ch}
                  </motion.span>
                );
              })}
        </span>
      ))}
    </h2>
  );
}

/* ── 5. Curtain-lift reveal (scroll-linked in principle, timer-driven here) ── */
function Effect5Curtain({ replayKey, reduce }: { replayKey: number; reduce: boolean }) {
  return (
    <motion.div
      key={replayKey}
      initial={reduce ? false : { clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      transition={{ duration: 1.1, delay: 0.15, ease: EASE }}
    >
      <h2 className={HEADLINE_CLASS} style={{ color: T.body }}>
        {SEGMENTS.map((s, i) => (
          <span key={i} style={{ color: s.emphasis ? T.heading : T.body }}>
            {s.text}
          </span>
        ))}
      </h2>
    </motion.div>
  );
}

const EFFECTS = [
  { id: 1, label: "1 — Line-mask slide-up", Comp: Effect1LineMask, note: null as string | null },
  { id: 2, label: "2 — Variable-weight morph", Comp: Effect2WeightMorph, note: null },
  { id: 3, label: "3 — Blur-stagger + light sweep", Comp: Effect3Sweep, note: null },
  { id: 4, label: "4 — Character 3D rotate-in", Comp: Effect4CharRotate, note: null },
  {
    id: 5,
    label: "5 — Curtain-lift reveal",
    Comp: Effect5Curtain,
    note: "normally tied to scroll position — time-driven here so it's visible without scrolling",
  },
];

export default function HeroAnimComparePage() {
  const reduce = !!useReducedMotion();
  const [replayKey, setReplayKey] = useState(0);

  return (
    <div className={`${satoshi.className} min-h-screen bg-white`}>
      <div className="mx-auto flex min-h-screen w-full max-w-[760px] flex-col justify-center gap-6 px-6 pt-16 pb-16">
        {EFFECTS.map(({ id, label, Comp, note }) => (
          <div key={id} className="flex flex-col items-center gap-1.5">
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.12em]" style={{ color: T.body }}>
              {label}
            </span>
            <Comp replayKey={replayKey} reduce={reduce} />
            {note && (
              <span className="text-[10px] italic" style={{ color: T.body, opacity: 0.75 }}>
                {note}
              </span>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={() => setReplayKey((k) => k + 1)}
        className="fixed bottom-6 right-6 z-50 rounded-full px-5 py-2.5 text-[13px] font-semibold text-white shadow-lg transition-transform hover:scale-105"
        style={{ background: "#111111" }}
      >
        Replay all ↻
      </button>
    </div>
  );
}
