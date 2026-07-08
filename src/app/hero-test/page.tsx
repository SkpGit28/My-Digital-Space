"use client";

import { useEffect, useRef } from "react";
import localFont from "next/font/local";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * HERO TEST — exact build of Figma node 263:445 (ClaudeAuto / "1"), plus:
 *  1. Ambient cursor-following orb — soft tri-color blob behind the headline,
 *     drifts on its own when idle, eases toward the cursor on hover.
 *  2. Word-by-word staggered headline reveal — each word blurs/fades in on
 *     its own beat (35ms apart), no underline, single shared ease curve.
 * Tokens from Figma variables:
 *   color/text/heading #001536 · color/text/body #70768c
 *   color/blue/FigBg #e5f4ff · color/blue/FigMain #0d99ff
 *   color/status/success-bg #e6f9f1 · color/green/500 #1f9d5e
 *   color/purple/50 #f3ecfd · color/purple/500 #a78bfa
 */

const satoshi = localFont({
  src: [
    { path: "../../../public/fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
    { path: "../../../public/fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--hero-satoshi",
});

const T = {
  heading: "#001536",
  body: "#70768c",
  blueBg: "#e5f4ff",
  blueMain: "#0d99ff",
  successBg: "#e6f9f1",
  green500: "#1f9d5e",
  purpleBg: "#f3ecfd",
  purple500: "#a78bfa",
  border: "#e5e7eb",
};

const SEGMENTS = [
  { text: "I help ", emphasis: false },
  { text: "high-stake businesses", emphasis: true },
  { text: " to ", emphasis: false },
  { text: "solve the right problem", emphasis: true },
  { text: " through ", emphasis: false },
  { text: "design", emphasis: true },
  { text: ".", emphasis: false },
];

function AmbientOrb({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const reduceMotion = useReducedMotion();
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const orbX = useSpring(targetX, { damping: 28, stiffness: 55, mass: 1 });
  const orbY = useSpring(targetY, { damping: 28, stiffness: 55, mass: 1 });
  const hovering = useRef(false);
  const raf = useRef(0);

  useEffect(() => {
    if (reduceMotion) return;
    const el = containerRef.current;
    if (!el) return;

    let start = performance.now();
    const idleTick = (now: number) => {
      if (!hovering.current) {
        const r = el.getBoundingClientRect();
        const t = (now - start) / 1000;
        const cx = r.width * 0.5;
        const cy = r.height * 0.42;
        const ax = r.width * 0.28;
        const ay = r.height * 0.22;
        targetX.set(cx + Math.sin(t * 0.18) * ax);
        targetY.set(cy + Math.sin(t * 0.13) * ay + Math.cos(t * 0.09) * ay * 0.4);
      }
      raf.current = requestAnimationFrame(idleTick);
    };
    raf.current = requestAnimationFrame(idleTick);

    const onMove = (e: MouseEvent) => {
      hovering.current = true;
      const r = el.getBoundingClientRect();
      targetX.set(e.clientX - r.left);
      targetY.set(e.clientY - r.top);
    };
    const onLeave = () => {
      hovering.current = false;
      start = performance.now();
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf.current);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  if (reduceMotion) {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[300px] -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(112,183,255,0.16), rgba(167,139,250,0.10) 45%, transparent 72%)",
          filter: "blur(64px)",
        }}
      />
    );
  }

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 -z-10 h-[560px] w-[560px] rounded-full"
      style={{
        x: orbX,
        y: orbY,
        translateX: "-50%",
        translateY: "-50%",
        background:
          "radial-gradient(circle, rgba(112,183,255,0.20) 0%, rgba(167,139,250,0.14) 42%, rgba(255,181,138,0.10) 68%, transparent 78%)",
        filter: "blur(70px)",
      }}
    />
  );
}

type Word = { text: string; color: string; isSpace: boolean };

function buildWords(): Word[] {
  const words: Word[] = [];
  for (const seg of SEGMENTS) {
    const color = seg.emphasis ? T.heading : T.body;
    const tokens = seg.text.split(/(\s+)/).filter((t) => t.length > 0);
    for (const t of tokens) {
      words.push({ text: t, color, isSpace: /^\s+$/.test(t) });
    }
  }
  return words;
}

const WORDS = buildWords();
const EASE = [0.16, 1, 0.3, 1] as const;

function Headline() {
  const reduceMotion = useReducedMotion();

  return (
    <h1 className="relative z-10 text-center text-[48px] font-bold leading-[1.35] tracking-[-0.02em]">
      {WORDS.map((w, i) => (
        <motion.span
          key={i}
          initial={reduceMotion ? false : { opacity: 0, y: 12, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.15 + i * 0.035, ease: EASE }}
          style={{ color: w.color, display: "inline-block", whiteSpace: w.isSpace ? "pre" : "normal" }}
        >
          {w.text}
        </motion.span>
      ))}
    </h1>
  );
}

export default function HeroTestPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`${satoshi.className} min-h-screen bg-white`}>
      <div ref={containerRef} className="relative overflow-hidden">
        <AmbientOrb containerRef={containerRef} />

        <section className="relative z-10 mx-auto flex w-full max-w-[1000px] flex-col items-center px-6 pt-[164px] pb-24 lg:px-0">
          <Headline />

          {/* Identity row — 64px below headline */}
          <div className="mt-16 flex items-center gap-6">
            <div
              className="flex h-16 w-16 items-end justify-center overflow-hidden bg-white"
              style={{ border: `1px solid ${T.border}` }}
            >
              <Image
                src="/HeroMe.svg"
                alt="Sushant Kumar"
                width={64}
                height={60}
                className="h-[59px] w-full object-cover"
              />
            </div>

            <div className="flex flex-col items-start gap-2">
              <span className="text-[24px] leading-8 tracking-[-0.02em]" style={{ color: T.heading, fontWeight: 500 }}>
                Hi, I am Sushant Kumar
              </span>
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex min-w-[76px] items-center justify-center rounded-lg px-2 py-[2.5px] text-[14px] font-bold tracking-[-0.02em]"
                  style={{ background: T.blueBg, color: T.blueMain }}
                >
                  Designer
                </span>
                <span
                  className="inline-flex min-w-[76px] items-center justify-center rounded-lg px-2 py-[2.5px] text-[14px] font-bold tracking-[-0.02em]"
                  style={{ background: T.successBg, color: T.green500 }}
                >
                  Builder
                </span>
                <span
                  className="inline-flex min-w-[76px] items-center justify-center rounded-lg px-2 py-[2.5px] text-[14px] font-bold tracking-[-0.02em]"
                  style={{ background: T.purpleBg, color: T.purple500 }}
                >
                  Tinkerer
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
