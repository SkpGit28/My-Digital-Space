"use client";

/**
 * OTHER TABS OPEN — a personal workspace accidentally exposed to visitors.
 *
 * Not cards, not a dashboard. An evidence board: screenshots, ink, a goals
 * page, a real Spotify player, a biryani polaroid, a browser tab someone
 * forgot to close, a version history that is all the same change. Below it,
 * the not-so-linear journey on notebook paper.
 *
 * Deliberate rules:
 * - most things do NOT animate in. they were already here.
 * - hover never scales. it reveals a hidden note instead.
 * - nothing matches: different borders, backgrounds, ages, angles.
 * - each drifting cursor lives INSIDE its component, so it moves with it
 *   when dragged and can never wander off its territory.
 */

import React, { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { figtree } from "@/styles/fonts";
import { EASE } from "@/lib/constants";

/* ── a loose item on the board. drag it around. most never animate in. ── */
function Loose({
  x,
  y,
  w,
  rot,
  z = 10,
  entry = "none",
  stageRef,
  reduce,
  draggable = true,
  children,
}: {
  x: number;
  y: number;
  w?: number;
  rot: number;
  z?: number;
  entry?: "none" | "slide" | "bounce";
  stageRef: React.RefObject<HTMLDivElement | null>;
  reduce: boolean;
  draggable?: boolean;
  children: React.ReactNode;
}) {
  const animated = entry !== "none" && !reduce;
  return (
    <motion.div
      className={`group absolute ${draggable ? "cursor-grab active:cursor-grabbing" : ""}`}
      style={{ left: x, top: y, width: w, zIndex: z, rotate: rot }}
      initial={animated ? (entry === "slide" ? { opacity: 0, x: -16 } : { opacity: 0, y: 14 }) : false}
      whileInView={animated ? { opacity: 1, x: 0, y: 0 } : undefined}
      viewport={{ once: true, margin: "-80px" }}
      transition={
        entry === "bounce"
          ? { type: "spring", stiffness: 320, damping: 13, mass: 0.9 }
          : { duration: 0.55, ease: EASE }
      }
      drag={draggable && !reduce}
      dragConstraints={stageRef}
      dragMomentum={false}
      dragElastic={0.08}
    >
      {children}
    </motion.div>
  );
}

/* ── the cursor glyph itself: figma-style triangle + label pill.
   exported so other sections (e.g. the homepage case study cards)
   reuse the exact same cursor instead of redrawing their own. ── */
export function CursorGlyph({ name, color }: { name: string; color: string }) {
  return (
    <>
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
        <path d="M2 1 L14 8.5 L8.5 9.5 L6 15 Z" fill={color} stroke="#fff" strokeWidth="1" />
      </svg>
      <span className="ml-3 block w-max rounded px-1.5 py-0.5 text-[12px] font-semibold text-white" style={{ background: color }}>
        {name}
      </span>
    </>
  );
}

/* ── drifting cursor. render it INSIDE a Loose item; coordinates are local,
   so it rides along when the item is dragged and never leaves it. ── */
function Cursor({
  name,
  color,
  xs,
  ys,
  duration,
  reduce,
}: {
  name: string;
  color: string;
  xs: number[];
  ys: number[];
  duration: number;
  reduce: boolean;
}) {
  if (reduce) return null;
  return (
    <motion.div
      className="pointer-events-none absolute left-0 top-0 z-40"
      animate={{ x: xs, y: ys }}
      transition={{ duration, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
    >
      <CursorGlyph name={name} color={color} />
    </motion.div>
  );
}

/* ── the not-so-linear journey: milestones on the hand-drawn wavy line ── */
const JOURNEY: { title: string; lines: string[]; year: string; x: number; y: number; dot: [number, number]; color: string }[] = [
  { title: "Born", lines: ["Someone's dream"], year: "1999", x: 56, y: 178, dot: [80, 245], color: "star" },
  { title: "IPS Plan", lines: ["The plan", "was set"], year: "2012", x: 150, y: 136, dot: [192, 242], color: "#e0447c" },
  { title: "JEE Mains", lines: ["Tried.", "Failed.", "Learned."], year: "2016", x: 296, y: 122, dot: [338, 248], color: "#f59e0b" },
  { title: "Direct Selling", lines: ["3-4 years.", "No success.", "Big lessons."], year: "2019", x: 424, y: 118, dot: [478, 242], color: "#a78bfa" },
  { title: "BPO / KPO", lines: ["Covid time.", "Started", "somewhere."], year: "2022", x: 574, y: 122, dot: [618, 246], color: "#0d99ff" },
  { title: "Design", lines: ["Found my", "direction."], year: "2023", x: 722, y: 136, dot: [762, 242], color: "#1f9d5e" },
  { title: "Design + Code", lines: ["Building.", "Learning.", "Shipping."], year: "2026", x: 846, y: 122, dot: [905, 246], color: "end" },
];

export default function DesignCanvas() {
  const reduce = !!useReducedMotion();
  const stageRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="flex w-full select-none flex-col items-center">
      <div className="flex w-full justify-center overflow-visible pb-8">
        {/* the board */}
        <div
          ref={stageRef}
          className="relative h-[680px] w-[1000px] shrink-0 overflow-hidden rounded-2xl border border-border-hairline"
          style={{
            background: "#f4f5f7",
            backgroundImage: "radial-gradient(circle, #dde1e8 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        >
          {/* file bar */}
          <div className="absolute inset-x-0 top-0 z-50 flex items-center justify-between border-b border-border-hairline bg-white/85 px-4 py-1.5 font-mono text-[12px] text-text-body backdrop-blur-sm">
            <span>
              <span className="font-semibold text-text-heading">skp_life.fig</span> · work in progress
            </span>
            <span>63%</span>
          </div>

          {/* ── GERMAN. owl peeking top-left, paperclip top-right, slides in. ── */}
          <Loose x={64} y={82} w={256} rot={-1} entry="slide" stageRef={stageRef} reduce={reduce} z={12}>
            {/* the owl, peeking */}
            <img src="/duolingo.svg" alt="Duolingo owl" className="absolute -top-9 left-5 z-10 h-14 w-auto rotate-[-5deg]" draggable={false} />
            {/* the clip, away from the owl */}
            <svg aria-hidden className="absolute -top-7 right-6 z-20 h-12 w-6" viewBox="0 0 24 48" fill="none">
              <path
                d="M8 14 v22 a6 6 0 0 0 12 0 V10 a4 4 0 0 0 -8 0 v24 a2 2 0 0 0 4 0 V14"
                stroke="#8a92a3"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
            <div className="rounded-lg border border-[#d8dde6] bg-white px-3.5 py-3" style={{ boxShadow: "0 10px 24px -14px rgba(0,21,54,0.3)" }}>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[12px] font-bold text-[#58cc02]">deutsch</span>
                <span aria-hidden className="ml-auto flex h-3 w-5 flex-col overflow-hidden rounded-[2px]">
                  <span className="h-1/3 bg-[#1a1a1a]" />
                  <span className="h-1/3 bg-[#dd0000]" />
                  <span className="h-1/3 bg-[#ffce00]" />
                </span>
              </div>
              <p className="mt-2 flex items-baseline gap-1.5 text-[30px] font-bold leading-none tracking-tight text-text-heading">
                112 days.
                <svg viewBox="0 0 24 24" className="h-5 w-5 self-center" fill="#ff9600" aria-hidden>
                  <path d="M12 2c.7 3.2-.9 4.9-2.4 6.5C8 10.2 6.5 11.9 6.5 15a5.5 5.5 0 0 0 11 0c0-1.8-.7-3.1-1.6-4.3-.3 1-.9 1.8-1.9 2.3.5-3-.6-6.3-2-9z" />
                </svg>
              </p>
              <p className="mt-1 font-mono text-[12px] text-text-muted">longest streak. current: don&apos;t ask.</p>
              <p className="mt-0.5 font-mono text-[12px] text-text-muted">score: 15. the owl is generous.</p>
              <p className="mt-2 text-[14px] leading-snug text-text-body">can order food in german. but where, in India?</p>
            </div>
            <Cursor name="someday i&apos;ll use it" color="#58cc02" xs={[12, 175, 90]} ys={[8, 128, 66]} duration={23} reduce={reduce} />
          </Loose>

          {/* ── GOALS. the clean book page, checklist written on it. ── */}
          <Loose x={352} y={58} w={240} rot={-1.5} stageRef={stageRef} reduce={reduce} draggable={false}>
            <img src="/Goals.svg" alt="My goals page" className="h-auto w-full" draggable={false} />
            <div className={`${figtree.className} absolute inset-0 flex flex-col justify-center gap-2.5 pl-14 pr-6`}>
              <p className="text-[19px] font-bold text-[#1f2430]">goals</p>
              <div className="flex items-center gap-2.5">
                <span className="relative grid h-4 w-4 shrink-0 place-items-center border-[1.5px] border-[#2b2f3a]">
                  <svg viewBox="0 0 14 12" className="h-3 w-3" aria-hidden>
                    <path d="M1 6 l4 4 L13 1" stroke="#1f9d5e" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="text-[17px] font-semibold text-[#2b2f3a]">create content</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="h-4 w-4 shrink-0 border-[1.5px] border-[#2b2f3a]" />
                <span className="text-[17px] font-semibold text-[#2b2f3a]">reduce 20 kgs</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="h-4 w-4 shrink-0 border-[1.5px] border-dashed border-[#2b2f3a]" />
                <span className="text-[17px] font-semibold text-[#2b2f3a]">build a new home</span>
              </div>
            </div>
          </Loose>

          {/* ── TYPING. a screenshot, annotated by hand. never animates. ── */}
          <Loose x={618} y={72} w={296} rot={0.5} stageRef={stageRef} reduce={reduce}>
            <div className="overflow-hidden rounded-[6px]" style={{ boxShadow: "0 14px 30px -16px rgba(0,0,0,0.45)" }}>
              <div className="bg-[#323437] px-4 pb-4 pt-3 font-mono">
                <div className="flex items-center justify-between">
                  <img src="/monkeytype.svg" alt="Monkeytype" className="h-4 w-auto opacity-80" />
                  <span className="text-[12px] text-[#646669]">15s · english</span>
                </div>
                <p className="mt-2 leading-none">
                  <span className="text-[46px] font-bold text-[#e2b714]">94</span>
                  <span className="ml-1.5 text-[14px] text-[#646669]">wpm</span>
                </p>
                <p className="mt-1.5 text-[12px] text-[#646669]">acc 97% · consistency 81%</p>
                <p className="text-[12px] text-[#646669]">120s: 83 wpm · 98%</p>
              </div>
            </div>
            <Cursor name="faster than my thoughts" color="#0d99ff" xs={[15, 200, 100]} ys={[12, 130, 70]} duration={20} reduce={reduce} />
          </Loose>

          {/* ── CURRENT VIBE. a real player. press play. ── */}
          <Loose x={370} y={330} w={300} rot={1} stageRef={stageRef} reduce={reduce}>
            <div className="overflow-hidden rounded-xl" style={{ boxShadow: "0 14px 30px -16px rgba(0,0,0,0.4)" }}>
              <iframe
                src="https://open.spotify.com/embed/track/7lQ8MOhq6IN2w8EYcFNSUk?utm_source=generator&theme=0"
                width="100%"
                height={152}
                frameBorder="0"
                scrolling="no"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Not Afraid - Eminem on Spotify"
                style={{ display: "block", border: 0, overflow: "hidden" }}
              />
            </div>
          </Loose>

          {/* ── FOOD. a polaroid from the foodie part. tiny bounce. ── */}
          <Loose x={700} y={318} w={232} rot={2} entry="bounce" stageRef={stageRef} reduce={reduce}>
            {/* tape label */}
            <div
              className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 rotate-[-2deg] px-3 py-1"
              style={{ background: "#e8d9b0", boxShadow: "0 1px 3px rgba(0,0,0,0.18)" }}
            >
              <span className={`${figtree.className} text-[16px] font-bold text-[#6b5a33]`}>foodie part</span>
            </div>
            <div className="rounded-[6px] bg-white p-2.5 pb-3" style={{ boxShadow: "0 14px 30px -16px rgba(0,21,54,0.35)" }}>
              <div className="grid h-[150px] place-items-center overflow-hidden rounded-[3px] bg-[#f3ede2]">
                <img src="/biryani.svg" alt="Chicken biryani bowl" className="h-full w-full object-contain p-1" draggable={false} />
              </div>
              <div className="mt-2.5 px-1 font-mono text-[12px] leading-[1.8] text-[#3b3629]">
                <p>I travel for food.</p>
                <p>I design for people.</p>
                <p className="flex items-center justify-between">
                  Both make me happy.
                  <span aria-hidden className="text-[14px]">☺</span>
                </p>
              </div>
              <p className="mt-1.5 px-1 font-mono text-[12px] text-[#b08350]">record: 1.2 kg biryani · one sitting</p>
            </div>
            <Cursor name="hunger" color="#f59e0b" xs={[12, 150, 78]} ys={[18, 225, 118]} duration={26} reduce={reduce} />
          </Loose>

          {/* ── MONSTER. wide black card, the real can inside, neon fuel log. ── */}
          <Loose x={58} y={478} w={430} rot={0} stageRef={stageRef} reduce={reduce}>
            <div
              className="relative flex items-center gap-6 overflow-hidden rounded-xl px-6 py-5"
              style={{
                background: "radial-gradient(120% 100% at 20% 0%, #161a12 0%, #0a0a0a 55%)",
                boxShadow: "0 18px 36px -16px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(149,214,0,0.22)",
              }}
            >
              {/* the actual can, fully inside the frame with air around it */}
              <img
                src="/Monster.svg"
                alt="Monster energy can"
                className="h-28 w-auto shrink-0 rotate-[-3deg]"
                draggable={false}
                style={{ filter: "drop-shadow(0 10px 16px rgba(0,0,0,0.55)) drop-shadow(0 0 14px rgba(149,214,0,0.25))" }}
              />
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[12px] font-bold uppercase tracking-[0.22em] text-[#95d600]">fuel log</p>
                <p className="mt-1.5 text-[32px] font-bold leading-none tracking-tight text-white">
                  22 days<span className="text-[#95d600]">.</span>
                </p>
                <p className="mt-1 font-mono text-[12px] text-white/50">in a row. one month.</p>
                {/* the tally, counted by hand */}
                <div className="mt-2.5 flex items-center">
                  {[0, 1, 2, 3].map((g) => (
                    <span key={g} className="relative mr-3 inline-flex gap-[3px]">
                      {[0, 1, 2, 3].map((b) => (
                        <span
                          key={b}
                          className="h-4 w-[2px] rounded-full bg-[#95d600]"
                          style={{ transform: `rotate(${b % 2 ? 2.5 : -2.5}deg)` }}
                        />
                      ))}
                      <span
                        aria-hidden
                        className="absolute -left-[4px] top-1/2 h-[2px] w-[24px] -translate-y-1/2 rotate-[-22deg] rounded-full bg-[#95d600]"
                      />
                    </span>
                  ))}
                  <span className="inline-flex gap-[3px]">
                    <span className="h-4 w-[2px] rotate-[-2.5deg] rounded-full bg-[#95d600]" />
                    <span className="h-4 w-[2px] rotate-[2.5deg] rounded-full bg-[#95d600]" />
                  </span>
                </div>
                <p className="mt-2.5 font-mono text-[12px] text-white/40">source: zepto + blinkit. rider knows the flat.</p>
              </div>
            </div>
            <Cursor name="doctor would disagree" color="#d92d20" xs={[18, 300, 150]} ys={[14, 118, 66]} duration={24} reduce={reduce} />
          </Loose>

          {/* ── strays. every real file has them. ── */}
          <span className="absolute left-[692px] top-[624px] rotate-[0.5deg] font-mono text-[12px] text-[#b6bcc9]">
            idea_47_final_final_v2_real_final.fig
          </span>
          <div aria-hidden className="absolute -left-9 top-[308px] h-14 w-32 border border-dashed border-[#c9cfdb]">
            <span className="absolute -top-5 left-10 whitespace-nowrap font-mono text-[12px] text-[#b6bcc9]">Rectangle 12 copy copy</span>
          </div>
        </div>
      </div>

      {/* ── THE NOT-SO-LINEAR JOURNEY. the paper texture IS the component. ── */}
      <motion.div
        className="flex w-full justify-center overflow-visible pb-4"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div
          className="relative h-[340px] w-[1000px] shrink-0"
          style={{
            backgroundImage: "url('/JourneyBg.svg')",
            backgroundSize: "100% 421px",
            backgroundPosition: "top left",
            backgroundRepeat: "no-repeat",
          }}
        >
          <p className={`${figtree.className} absolute left-11 top-7 text-[22px] font-bold text-[#1f2430]`}>
            the not-so-linear journey
          </p>

          {/* the wavy dashed line, dots, years, and little arrows — swept in left to right */}
          <motion.div
            className="absolute inset-0"
            initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 2.4, delay: 0.3, ease: "easeInOut" }}
          >
          <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 1000 340" fill="none" preserveAspectRatio="none">
            <path
              d="M80 245 C 120 230, 155 255, 192 242 C 240 228, 295 262, 338 248 C 385 232, 435 256, 478 242 C 525 228, 575 260, 618 246 C 665 230, 720 254, 762 242 C 810 230, 862 258, 905 246"
              stroke="#2b2b2b"
              strokeWidth="2"
              strokeDasharray="7 6"
              strokeLinecap="round"
            />
            {JOURNEY.map((m) => {
              const [dx, dy] = m.dot;
              if (m.color === "star") {
                return (
                  <text key={m.title} x={dx} y={dy + 7} textAnchor="middle" fontSize="22" fill="#1f2430">
                    ✶
                  </text>
                );
              }
              if (m.color === "end") {
                return (
                  <g key={m.title}>
                    <circle cx={dx} cy={dy} r="9" stroke="#1f2430" strokeWidth="1.5" />
                    <circle cx={dx} cy={dy} r="5" fill="#1f2430" />
                  </g>
                );
              }
              return <circle key={m.title} cx={dx} cy={dy} r="5.5" fill={m.color} />;
            })}
            {/* years under each dot */}
            {JOURNEY.map((m) => (
              <text
                key={`${m.title}-year`}
                x={m.dot[0]}
                y={m.dot[1] + 30}
                textAnchor="middle"
                fontSize="16"
                fontWeight="700"
                fill="#4b5563"
                className={figtree.className}
              >
                {m.year}
              </text>
            ))}
            {/* little hand arrows from label to dot */}
            {JOURNEY.slice(1).map((m) => {
              const [dx, dy] = m.dot;
              return (
                <path
                  key={m.title}
                  d={`M${dx + 16} ${dy - 46} C ${dx + 20} ${dy - 30}, ${dx + 12} ${dy - 18}, ${dx + 4} ${dy - 10} M${dx + 4} ${dy - 10} l1 -7 M${dx + 4} ${dy - 10} l7 -1`}
                  stroke="#6b7280"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              );
            })}
          </svg>
          </motion.div>

          {/* milestone labels — each appears as the line sweep reaches its dot */}
          {JOURNEY.map((m) => (
            <motion.div
              key={m.title}
              className={`${figtree.className} absolute leading-[1.2]`}
              style={{ left: m.x, top: m.y }}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: 0.3 + (m.dot[0] / 1000) * 2.2, ease: EASE }}
            >
              <p className="text-[18px] font-bold text-[#1f2430]">{m.title}</p>
              {m.lines.map((l) => (
                <p key={l} className="text-[16px] font-semibold text-[#6b7280]">
                  {l}
                </p>
              ))}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
