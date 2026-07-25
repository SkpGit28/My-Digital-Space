"use client";

import { useEffect, useRef, useState } from "react";
import { satoshi, figtree } from "@/styles/fonts";
import Image from "next/image";
import { FooterReveal } from "@/Components/SiteFooter";
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
  useReducedMotion,
  useInView,
  type MotionValue,
} from "framer-motion";
import { usePageReady } from "@/lib/usePageReady";
import { EASE } from "@/lib/constants";
import { CursorGlyph } from "@/Components/DesignCanvas";

/* ═══════════════════════════════════════════════════════════════════
   CASE STUDY CARD — custom cursor, hover zoom, cropped mockup
   ═══════════════════════════════════════════════════════════════════ */

interface CaseStudyCardProps {
  href: string;
  delay: number;
  bgClass: string;
  brandColor: string;
  title: string;
  description: string;
  tags: string[];
  tagBg: string;
  tagText: string;
  mockupSrc?: string;
  mockupAlt?: string;
  isMeta?: boolean;
}

function CaseStudyCard({
  href,
  delay,
  bgClass,
  brandColor,
  title,
  description,
  tags,
  tagBg,
  tagText,
  mockupSrc,
  mockupAlt,
  isMeta = false,
}: CaseStudyCardProps) {
  const reduce = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20, mass: 0.5 });
  const cursorY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20, mass: 0.5 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
  };

  return (
    <motion.a
      href={isMeta ? undefined : href}
      ref={cardRef as unknown as React.RefObject<HTMLAnchorElement>}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      onClick={isMeta ? (e) => e.preventDefault() : undefined}
      aria-label={isMeta ? "Case study coming soon" : undefined}
      className={`relative md:col-span-2 flex flex-col md:flex-row md:h-[18.75rem] rounded-xl overflow-hidden border border-border-subtle ${bgClass} ${reduce ? (isMeta ? "cursor-default" : "cursor-pointer") : "cursor-none"}`}
    >
      {/* Custom cursor — the same glyph as the SKP evidence board.
          The OS cursor is hidden (cursor-none) and this appears instantly:
          no fade, no scale, the triangle tip sits exactly on the pointer. */}
      {isHovered && !reduce && (
        <motion.div
          className="pointer-events-none absolute z-[60]"
          style={{ left: cursorX, top: cursorY }}
        >
          <CursorGlyph name={isMeta ? "Coming Soon" : "View Case Study"} color={brandColor} />
        </motion.div>
      )}

      {/* Left — heading + body */}
      <div className="relative flex w-full md:w-[46%] shrink-0 flex-col justify-center gap-3 p-7">
        <h3 className={`text-[1.75rem] font-semibold leading-tight tracking-tight text-text-primary ${satoshi.className}`}>
          {title}
        </h3>
        <p className={`text-base leading-relaxed text-text-body ${figtree.className}`}>
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mt-1">
          {tags.map((tag) => (
            <span key={tag} className={`inline-flex items-center rounded-full ${tagBg} px-3 py-1 text-xs font-bold tracking-wide ${tagText} ${figtree.className}`}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Right — mockup with hover zoom and cropped right edge */}
      {isMeta ? (
        <>
          <span className="absolute right-7 top-7 z-20 inline-flex items-center gap-2 rounded-full border border-badge-purple-text/40 bg-white/80 px-3 py-1 backdrop-blur-sm">
            <span aria-hidden className="h-1.5 w-1.5 animate-pulse rounded-full bg-badge-purple-text" />
            <span className={`text-xs font-bold tracking-wide text-[#7c5cd6] ${figtree.className}`}>coming soon</span>
          </span>
          <div className="relative ml-7 mr-0 mt-8 h-[13.75rem] flex-1 pointer-events-none md:ml-0 md:h-auto">
            <motion.div
              className="absolute inset-0 overflow-hidden rounded-tl-xl border-l border-t border-border-subtle bg-white origin-top"
              animate={reduce ? undefined : { scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <div className="flex items-center gap-1.5 border-b border-border-subtle bg-background px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                <span className="h-2 w-2 rounded-full bg-[#28c840]" />
                <span className={`ml-2 rounded-full bg-white px-2.5 py-0.5 text-xs text-text-body/60 border border-border-subtle ${figtree.className}`}>
                  skpux.in
                </span>
              </div>
              <div className="relative h-full">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: "url('/PortfolioHome.svg')",
                    backgroundSize: "cover",
                    backgroundPosition: "top left",
                    filter: "blur(2px)",
                  }}
                />

              </div>
            </motion.div>
          </div>
        </>
      ) : (
        <div className="relative ml-7 mr-0 mt-8 h-[220px] flex-1 pointer-events-none md:ml-0 md:h-auto">
          {/* the image box overhangs the card's right edge, so the card's
              overflow-hidden crops the mockup's rounded corners clean off */}
          <motion.div
            className="absolute inset-y-0 left-0 -right-12 origin-top"
            animate={reduce ? undefined : { scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {/* cover + left-TOP: the mockup starts right at the top gap with its
                full top visible, spans flush from the container's left line, and
                whatever exceeds the card height crops at the BOTTOM — like the
                browser frame in card 3. The 48px overhang keeps the right edge
                cropped flat. */}
            <Image
              src={mockupSrc || ""}
              alt={mockupAlt || ""}
              fill
              className="object-cover object-left-top"
            />
          </motion.div>
        </div>
      )}
    </motion.a>
  );
}

/**
 * HERO — Figma node 263:445 (ClaudeAuto / "1").
 *
 * The headline + identity row (photo, name, badges) and the ambient orb use
 * the line-mask reveal shipped previously.
 *
 * The tool stack (Figma · Claude Code · Antigravity · Framer · ChatGPT · Notion)
 * is seeded into the periphery as metallic "constellation" chips: faint and
 * softly blurred at rest, resolving to full presence as the cursor nears, each
 * with a small frosted-glass tooltip. They enter with the SAME line-mask clip
 * reveal + EASE as the headline, so it reads as one continuous entrance.
 *
 * The top toggle only compares the two finished treatments — icons with the
 * soft blur vs. crisp — and is not part of the hero itself.
 */

// Redundant local font configs removed. Using global `@/styles/fonts`.

const T = {
  heading: "var(--text-heading)",
  body: "var(--text-body)",
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

type Token = { text: string; color: string; isSpace: boolean; isBreak?: boolean };

/** Word stream for the headline, with a forced line break right after "right". */
function buildTokens(): Token[] {
  const out: Token[] = [];
  for (const seg of SEGMENTS) {
    const color = seg.emphasis ? T.heading : T.body;
    const tokens = seg.text.split(/(\s+)/).filter((s) => s.length > 0);
    for (const t of tokens) {
      const isSpace = /^\s+$/.test(t);
      const prev = out[out.length - 1];
      if (isSpace && prev && prev.text === "right") {
        out.push({ text: "", color, isSpace: false, isBreak: true });
        continue;
      }
      out.push({ text: t, color, isSpace });
    }
  }
  return out;
}
const WORDS = buildTokens();

/**
 * Choreography — introduce myself first, then show what I do:
 *  1. the intro card rises in; its photo, name, and badges mask-reveal in turn
 *  2. a ~1s beat to let the introduction land
 *  3. the headline line-mask plays, word by word, above the card
 */
const CARD_DELAY = 0.1;
const PHOTO_DELAY = 0.22;
const NAME_DELAY = 0.3;
const BADGE_START = 0.4;
const BADGE_STAGGER = 0.06;
const INTRO_END = BADGE_START + BADGE_STAGGER * 2 + 0.4; // last badge finishes settling
const HEADLINE_BASE = INTRO_END + 0.15; // hold, then the headline arrives

// Headline reveal tuning:
//  · WORD_DURATION is long relative to the stagger, so words overlap in flight
//    and the reveal reads as one wave sweeping left-to-right, not a word-by-word tick.
//  · The stagger is eased (i^0.82 rather than linear i), so the gaps between
//    words compress as it goes — an organic cascade that resolves rather than
//    ticking at a fixed metronome rate.
const WORD_DURATION = 0.8;
const WORD_STAGGER = 0.05;
const wordDelay = (i: number) => HEADLINE_BASE + Math.pow(i, 0.82) * WORD_STAGGER;



/* ─────────────────────────  Brand marks  ───────────────────────── */
// Monochrome single-path SVGs used as CSS masks, so each treatment fills the
// same shape differently (frosted, chrome, dithered, brand color…).
// label + role feed the hover tooltip in the Constellation layer.
const BRANDS: Record<string, { file: string; color: string; label: string; role: string; iconScale?: number }> = {
  figma: { file: "/brand/figma.svg", color: "#F24E1E", label: "Figma", role: "Design finishing and motion" },
  claude: { file: "/brand/claude.svg", color: "#D97757", label: "Claude Code", role: "Serious builds only, you know why" },
  antigravity: {
    file: "/brand/antigravity.svg",
    color: "#4285F4",
    label: "Antigravity",
    role: "Where every idea starts, a quick prototype",
    // real logo is a raster with ~13% padding baked in; scale up to match the others
    iconScale: 1.32,
  },
  framer: { file: "/brand/framer.svg", color: "#0055FF", label: "Framer", role: "Instant product showcase" },
  chatgpt: { file: "/brand/chatgpt.svg", color: "#10A37F", label: "ChatGPT", role: "Mostly for dope images" },
  supabase: { file: "/brand/supabase.svg", color: "#3ECF8E", label: "Supabase", role: "Easy auth & backend" },
};

/** Fills an icon-shaped mask with any paint (solid, gradient, or pattern). */
function MaskShape({
  file,
  size,
  fill,
  style,
}: {
  file: string;
  size: number;
  fill: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      aria-hidden
      style={{
        display: "block",
        width: size,
        height: size,
        background: fill,
        WebkitMaskImage: `url(${file})`,
        maskImage: `url(${file})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        ...style,
      }}
    />
  );
}

/* ── Headline: line-mask word reveal (long glide + eased stagger → one wave) ── */
function Headline({ reduce }: { reduce: boolean }) {
  return (
    <h1 className="relative z-10 text-center text-5xl font-bold leading-[1.35] tracking-tight">
      {WORDS.map((w, i) =>
        w.isBreak ? (
          <br key={i} />
        ) : (
          <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}>
            <motion.span
              initial={reduce ? false : { y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: WORD_DURATION, delay: wordDelay(i), ease: EASE }}
              style={{ display: "inline-block", color: w.color, whiteSpace: w.isSpace ? "pre" : "normal" }}
            >
              {w.text}
            </motion.span>
          </span>
        )
      )}
    </h1>
  );
}

/**
 * The line-mask primitive: content rises from behind a clipped edge. Shared by
 * the identity row AND every icon treatment so the whole hero moves as one.
 */
function MaskReveal({
  children,
  delay,
  duration = 0.55,
  reduce,
  className,
  style,
}: {
  children: React.ReactNode;
  delay: number;
  duration?: number;
  reduce: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={className} style={{ overflow: "hidden", ...style }}>
      <motion.div
        initial={reduce ? false : { y: "115%" }}
        animate={{ y: "0%" }}
        transition={{ duration, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/** Three identity badges that slot-roll through synonyms after the intro lands. */
const BADGE_STYLES = [
  "bg-badge-blue-bg text-badge-blue-text",
  "bg-badge-green-bg text-badge-green-text",
  "bg-badge-purple-bg text-badge-purple-text",
] as const;

function BadgeRow({ reduce }: { reduce: boolean }) {
  const labels = ["Designer", "Builder", "Tinkerer"];

  return (
    <div className="flex items-center gap-2">
      {labels.map((label, i) => (
        <MaskReveal key={i} delay={BADGE_START + BADGE_STAGGER * i} duration={0.4} reduce={reduce}>
          <span className={`inline-flex min-w-[76px] h-6 items-center justify-center rounded-md px-2 text-sm font-bold tracking-tight font-heading ${BADGE_STYLES[i]}`}>
            {label}
          </span>
        </MaskReveal>
      ))}
    </div>
  );
}

/* ═══════════════════  Constellation icon layer  ═══════════════════ */

// Two mirrored wings, pushed to the outer edges so they never crowd the
// headline: each row is a left/right pair sharing the same y, size, depth and
// float phase, with x mirrored (x ↔ 1 - x). They fan outward at the middle,
// like spread wings. `order` sequences the one-by-one intro reveal + blur-out.
const SCATTER = [
  // top wings
  { key: "figma", x: 0.13, y: 0.14, depth: 1.15, size: 46, order: 0, floatPhase: 0 },
  { key: "claude", x: 0.87, y: 0.14, depth: 1.15, size: 46, order: 1, floatPhase: 0 },
  // mid wings (widest — the wing's peak)
  { key: "supabase", x: 0.09, y: 0.34, depth: 0.9, size: 42, order: 2, floatPhase: -1.6 },
  { key: "chatgpt", x: 0.91, y: 0.34, depth: 0.9, size: 42, order: 3, floatPhase: -1.6 },
  // lower wings
  { key: "framer", x: 0.12, y: 0.54, depth: 0.75, size: 44, order: 4, floatPhase: -3.0 },
  { key: "antigravity", x: 0.88, y: 0.54, depth: 0.75, size: 44, order: 5, floatPhase: -3.0 },
];

// Intro "glance": each icon reveals crisp + prominent one by one, holds a beat
// so the eye can register the tool, then blurs back to its resting whisper in
// the same order. `order` (0..5) drives the stagger for both phases.
const ICON_REVEAL = (order: number) => 0.15 + order * 0.11;
const ICON_BLUR_OUT = (order: number) => 1.85 + order * 0.13; // after all revealed + a hold

/* 1 ─ Constellation: chrome/liquid-metal discs drifting in the periphery.
 *     "Felt, not seen" — each chip rests as a faint, softly-blurred whisper and
 *     only resolves to full presence (opacity up, blur out, a touch larger) as
 *     the cursor approaches it. Plus the depth-based parallax drift. */
function ConstellationChip({
  brand,
  x,
  y,
  depth,
  size,
  order,
  floatPhase,
  reduce,
  px,
  py,
  pnx,
  pny,
  containerRef,
}: {
  brand: { file: string; color: string; label: string; role: string; iconScale?: number };
  x: number;
  y: number;
  depth: number;
  size: number;
  order: number;
  floatPhase: number;
  reduce: boolean;
  px: MotionValue<number>;
  py: MotionValue<number>;
  pnx: MotionValue<number>;
  pny: MotionValue<number>;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const tx = useTransform(px, (v) => v * depth * 16);
  const ty = useTransform(py, (v) => v * depth * 16);

  // Proximity: 0 when the cursor is far (rest/whisper), 1 when it's on the chip.
  // Distance is measured in normalized-by-height units so the wake radius is a
  // true circle regardless of the container's aspect ratio.
  const proximity = useTransform([pnx, pny], ([nx, ny]: number[]) => {
    const el = containerRef.current;
    const aspect = el && el.clientHeight ? el.clientWidth / el.clientHeight : 1.6;
    const dist = Math.hypot((nx - x) * aspect, ny - y);
    return Math.max(0, Math.min(1, 1 - dist / 0.34));
  });
  const wake = useSpring(proximity, { damping: 28, stiffness: 120, mass: 0.6 });

  // Intro glance: `settle` runs 0 → 1 (crisp/prominent → hand off to rest) after
  // the reveal + a hold, staggered by `order`. `present` blends it with `wake`
  // so hovering still brings the chip fully forward at any time.
  const settle = useMotionValue(reduce ? 1 : 0);
  useEffect(() => {
    if (reduce) {
      settle.set(1);
      return;
    }
    const controls = animate(settle, 1, { delay: ICON_BLUR_OUT(order), duration: 0.6, ease: EASE });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);
  const present = useTransform([settle, wake], ([s, w]: number[]) => 1 - s * (1 - w));

  // Whisper (0.3) → full (1) opacity and blur.
  const opacity = useTransform(present, (v) => 0.3 + v * 0.7);
  const scale = useTransform(present, (v) => 0.94 + v * 0.1);
  const blurPx = useTransform(present, (v) => (1 - v) * 3);
  const filter = useMotionTemplate`blur(${blurPx}px)`;

  // Tooltip appears only when directly hovering the icon disc
  const [tipOn, setTipOn] = useState(false);

  const iconSize = Math.round(size * 0.52 * (brand.iconScale ?? 1));

  return (
    <div
      className="absolute pointer-events-auto"
      style={{ left: `${x * 100}%`, top: `${y * 100}%`, transform: "translate(-50%,-50%)" }}
      onMouseEnter={() => setTipOn(true)}
      onMouseLeave={() => setTipOn(false)}
    >
      {/* Float pauses while the tooltip is up, so the icon holds perfectly still */}
      <div
        className="cnst-float"
        style={{
          position: "relative",
          animationDelay: `${floatPhase}s`,
          animationPlayState: tipOn ? "paused" : "running",
        }}
      >
        <motion.div style={reduce ? { opacity: 0.5 } : { x: tx, y: ty, opacity, scale, filter }}>
          <MaskReveal delay={ICON_REVEAL(order)} duration={0.6} reduce={reduce} style={{ borderRadius: 9999 }}>
            <div
              className="flex items-center justify-center rounded-full"
              style={{
                width: size,
                height: size,
                background: "linear-gradient(135deg,#f6f8fb,#c9d2de 45%,#eef2f7 60%,#aab4c2)",
                border: "0.0625rem solid rgba(2,21,54,0.08)",
                boxShadow: "0 0.625rem 1.875rem rgba(2,21,54,0.08), inset 0 0.0625rem 0.125rem rgba(255,255,255,0.7)",
              }}
            >
              <MaskShape file={brand.file} size={iconSize} fill="#2b3240" style={{ opacity: 0.75 }} />
            </div>
          </MaskReveal>
        </motion.div>

        {/* Tooltip — outside the blurred/scaled disc wrapper so it stays crisp.
            Small frosted-glass chip; eases in, snaps out. */}
        <AnimatePresence>
          {tipOn && !reduce && (
            <motion.div
              key="tip"
              aria-hidden
              initial={{ opacity: 0, y: 5, scale: 0.96, x: "-50%" }}
              animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
              exit={{ opacity: 0, y: 3, scale: 0.98, x: "-50%", transition: { duration: 0.09, ease: "easeOut" } }}
              transition={{ duration: 0.2, ease: EASE }}
              className={`${figtree.className} pointer-events-none absolute bottom-full left-1/2 mb-2 w-max max-w-[9.375rem] rounded-[6px] px-2.5 py-1 text-center`}
              style={{
                transformOrigin: "bottom center",
                background: "rgba(255,255,255,0.72)",
                backdropFilter: "blur(0.625rem)",
                WebkitBackdropFilter: "blur(0.625rem)",
                border: "0.0625rem solid rgba(2,21,54,0.06)",
                boxShadow: "0 0.25rem 0.875rem rgba(2,21,54,0.08)",
              }}
            >
              <span className="block text-xs leading-snug text-text-body">
                {brand.role}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ConstellationLayer({
  containerRef,
  reduce,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  reduce: boolean;
}) {
  const pxRaw = useMotionValue(0);
  const pyRaw = useMotionValue(0);
  const px = useSpring(pxRaw, { damping: 40, stiffness: 90, mass: 0.8 });
  const py = useSpring(pyRaw, { damping: 40, stiffness: 90, mass: 0.8 });
  // Normalized (0..1) pointer for per-chip proximity; -1 parks it "away" so
  // everything settles back to the whisper rest state when the cursor leaves.
  const pnx = useMotionValue(-1);
  const pny = useMotionValue(-1);

  useEffect(() => {
    if (reduce) return;
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width;
      const ny = (e.clientY - r.top) / r.height;
      pxRaw.set((nx - 0.5) * 2);
      pyRaw.set((ny - 0.5) * 2);
      pnx.set(nx);
      pny.set(ny);
    };
    const onLeave = () => {
      pxRaw.set(0);
      pyRaw.set(0);
      pnx.set(-1);
      pny.set(-1);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <style>{`@keyframes cnstFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-0.625rem)}}.cnst-float{animation:cnstFloat 7s ease-in-out infinite}`}</style>
      {SCATTER.map((s) => (
        <ConstellationChip
          key={s.key}
          brand={BRANDS[s.key]}
          x={s.x}
          y={s.y}
          depth={s.depth}
          size={s.size}
          order={s.order}
          floatPhase={s.floatPhase}
          reduce={reduce}
          px={px}
          py={py}
          pnx={pnx}
          pny={pny}
          containerRef={containerRef}
        />
      ))}
    </div>
  );
}

/* ═══════════════════  Testimonials  ═══════════════════ */
/**
 * 1:1 port of Figma node 377:823 ("Testimonials", 1000×512): four white cards
 * (262×372, r12, #e5e7eb border) scattered at the exact Figma rotations and
 * positions. Each photo strip is the Figma export itself (noise baked in,
 * un-rotated back to 262×120 — see /public/testimonials/strip-*.png).
 *
 * Interaction, from the reference recording: the hovered card straightens to
 * 0°, lifts slightly, and stacks above every neighbour; the last-touched card
 * keeps the top spot while it settles back.
 */

type Testimonial = {
  quote: string; // exact Figma text, quotation marks included
  role: string;
  name: string;
  strip: string; // baked 262×120 header strip (3x export)
  logo: string; // tight-cropped company logo (see /public/brand)
  logoW: number; // intrinsic asset size — aspect-ratio source
  logoH: number;
  logoSquare?: boolean; // EY-style square lockup: needs a small optical lift
  rotate: number; // Figma rotation in degrees (CSS clockwise-positive)
  left: number; // unrotated card offset inside the 1000px stage
  top: number;
  isStatement?: boolean;
};

// left/top derive from the Figma bounding boxes: card centre = bbox centre,
// minus 131×186 (half the 262×372 card), stage origin shifted up 64px so the
// scatter hugs the section.
const TESTIMONIALS: Testimonial[] = [
  {
    quote: "“Loved by people who hate friction.”",
    role: "",
    name: "",
    strip: "",
    logo: "",
    logoW: 0,
    logoH: 0,
    rotate: -4.5,
    left: -41,
    top: 24,
    isStatement: true,
  },
  {
    quote: `"This was a side project of mine and he jumped in like it was his own. I'd send over a rough idea and get back clean screens I could build straight away. Genuinely one of the easiest people I've worked with.”`,
    role: "Android Developer",
    name: "Nikhil Rana",
    strip: "/testimonials/strip-nikhil.png",
    logo: "/brand/chetu.png",
    logoW: 485,
    logoH: 186,
    rotate: -2,
    left: 164,
    top: 16,
  },
  {
    quote: `"Every file he provided was ready to go, so we shipped directly from his designs with minimal revisions. It really reduced our back and forth."`,
    role: "Technical Consultant",
    name: "Shashank Tripathi",
    strip: "/testimonials/strip-shashank.png",
    logo: "/brand/ey.png",
    logoW: 223,
    logoH: 226,
    logoSquare: true,
    rotate: 0,
    left: 369,
    top: 18,
  },
  {
    quote: `"He turned our messy discussions into UI we could actually ship the same sprint. The specs were clear and the handoff was clean, so engineering never got stuck waiting on design.”`,
    role: "SDE 2",
    name: "Pushkar Kumar",
    strip: "/testimonials/strip-pushkar.png",
    logo: "/brand/paisabazaar.png",
    logoW: 206,
    logoH: 36,
    rotate: 2,
    left: 574,
    top: 16,
  },
  {
    quote: `"I hardly needed to explain anything. He transformed our rough product ideas into actual screens, and his practical use of AI tools helped us move from concept to design much faster than I thought."`,
    role: "C.E.O.",
    name: "Aditya Jain",
    strip: "/testimonials/strip-aditya.png",
    logo: "/brand/payfi.png",
    logoW: 770,
    logoH: 362,
    rotate: 4.5,
    left: 779,
    top: 24,
  }
];

function TestimonialsSection() {
  const reduce = !!useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.8 });
  const [isInitialReveal, setIsInitialReveal] = useState(true);

  // Spring physics constants
  const deckStiffness = 80;
  const deckDamping = 20;
  const deckMass = 1.0;

  const hoverEnterStiffness = 250;
  const hoverEnterDamping = 25;
  const hoverEnterMass = 0.9;

  const returnStiffness = 250;
  const returnDamping = 25;

  // `hovered` drives the fan-out; `topCard` keeps the last-touched card on
  // top of the pile while it settles back.
  const [hovered, setHovered] = useState<number | null>(null);
  const [topCard, setTopCard] = useState<number | null>(null);

  useEffect(() => {
    if (isInView) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- stacking order must react to viewport visibility
      setTopCard(null); // Reset topCard focus so natural right-to-left stacking takes over when fanning out
      const timer = setTimeout(() => setIsInitialReveal(false), 1200);
      return () => clearTimeout(timer);
    } else {
      setIsInitialReveal(true);
      setTopCard(0); // Force the statement card (index 0) on top of the pile when out of view
    }
  }, [isInView]);

  // From the reference recording: every non-hovered card slides this far away
  // from the hovered one (uniform, whichever side of it the card sits on).
  const SHIFT = 40;

  return (
    <section className="w-full pt-16 pb-10" ref={containerRef}>
      {/* Eyebrow — 1000px constraint, left aligned + Physics Controls */}
      <div className="mx-auto mb-2 w-full max-w-[62.5rem] px-6 lg:px-0 flex items-center justify-between relative">
        <p className={`text-xs font-semibold uppercase tracking-widest text-text-body ${figtree.className}`}>
          MY FEEDBACK
        </p>
      </div>

      {/* Fixed 1000px (62.5rem) Figma stage; scrolls sideways on narrower screens */}
      <div className="w-full overflow-x-auto pt-8 pb-8 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none" }}>
        <div className="relative mx-auto h-[25.5rem] w-[62.5rem]">
          {TESTIMONIALS.map((t, i) => (
            <motion.article
              key={t.name || t.quote}
              onHoverStart={() => { setHovered(i); setTopCard(i); }}
              onHoverEnd={() => {
                setHovered((cur) => (cur === i ? null : cur));
                setTopCard((cur) => (cur === i ? null : cur)); // Reset top card focus so natural right-to-left stacking is restored immediately
              }}
              onTapStart={() => { setHovered(i); setTopCard(i); }}
              initial={false}
              animate={
                reduce
                  ? { x: 0, y: 0, rotate: t.rotate }
                  : !isInView
                  ? {
                      x: 369 - t.left,
                      y: 18 - t.top,
                      rotate: t.isStatement ? 0 : t.rotate,
                    }
                  : {
                      x: hovered === null || hovered === i ? 0 : i < hovered ? -SHIFT : SHIFT,
                      y: hovered === i ? -20 : 0,
                      rotate: hovered === i ? 0 : t.rotate,
                    }
              }
              transition={{
                type: "spring",
                stiffness: hovered === i ? hoverEnterStiffness : isInitialReveal ? deckStiffness : returnStiffness,
                damping: hovered === i ? hoverEnterDamping : isInitialReveal ? deckDamping : returnDamping,
                mass: hovered === i ? hoverEnterMass : isInitialReveal ? deckMass : 1.0,
              }}
              className="absolute cursor-pointer overflow-hidden rounded-xl border border-border-subtle bg-surface flex flex-col"
              style={{ left: t.left, top: t.top, width: 280, height: 400, zIndex: topCard === i ? 30 : (!isInView && t.isStatement) ? 20 : i + 1 }}
            >
              {t.isStatement ? (
                // Clean typography-first statement card (Concept 5 layout)
                <Image src="/StatementCard.svg" alt="Statement" width={280} height={400} unoptimized className="w-full h-full object-cover select-none" draggable={false} />
              ) : (
                <>
                  {/* Photo strip — the exact Figma export, noise effect included */}
                  <Image
                    src={t.strip}
                    alt={t.name}
                    width={786}
                    height={360}
                    unoptimized
                    draggable={false}
                    className="h-[7.5rem] w-full select-none object-cover"
                  />
                  {/* Punch holes — 12×12, pure white shows through the strip */}
                  <div aria-hidden className="absolute left-[0.875rem] top-[0.875rem] h-3 w-3 rounded-full bg-white" />
                  <div aria-hidden className="absolute right-[0.875rem] top-[0.875rem] h-3 w-3 rounded-full bg-white" />
                  {/* Quote — Symmetrical padding and text-pretty to ensure even wrapping across all cards */}
                  <div className="mt-[0.375rem] py-[0.625rem] px-6">
                    <p className={`w-full text-base font-medium leading-normal tracking-tight text-text-primary text-pretty ${satoshi.className}`}>
                      {t.quote}
                    </p>
                  </div>
                  {/* Byline — pinned at top 21.375rem (342px), adjusted for 400px height */}
                  <div className="absolute left-0 top-[21.375rem] flex w-full flex-col gap-1 px-6">
                    <p className={`text-xs font-bold leading-normal tracking-tight text-text-primary ${figtree.className}`}>
                      {t.name}
                    </p>
                    <div className="flex items-center gap-[0.375rem] whitespace-nowrap">
                      <p className={`text-xs font-normal leading-normal tracking-tight text-text-body ${figtree.className}`}>
                        {t.role}
                      </p>
                      <span className="select-none text-[0.625rem] leading-none text-text-body/50">•</span>
                      {t.logoSquare ? (
                        // EY: square lockup with the letters in the bottom half —
                        // a small lift centers them optically on the text line.
                        <Image
                          src={t.logo}
                          alt=""
                          width={t.logoW}
                          height={t.logoH}
                          className="h-4 w-4 object-contain"
                          style={{ transform: "translateY(-0.1875rem)" }}
                        />
                      ) : (
                        // Wide wordmarks, tight-cropped, sized to sit level with
                        // the text.
                        <Image
                          src={t.logo}
                          alt=""
                          width={t.logoW}
                          height={t.logoH}
                          className="h-[0.875rem] w-auto object-contain"
                        />
                      )}
                    </div>
                  </div>
                </>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HeroTestPage() {
  usePageReady();
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = !!useReducedMotion();

  // The side vertical lines must start exactly where SELECTED WORK starts,
  // not partway through the hero — measure it instead of hardcoding.
  const [workTop, setWorkTop] = useState("100vh");
  useEffect(() => {
    const measure = () => {
      const topEl = document.getElementById("top");
      const workEl = document.getElementById("work");
      if (!topEl || !workEl) return;
      const delta = workEl.getBoundingClientRect().top - topEl.getBoundingClientRect().top;
      setWorkTop(`${Math.round(delta)}px`);
    };
    measure();
    const settle = setTimeout(measure, 700); // re-measure after fonts/entrance settle
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(settle);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <FooterReveal id="top" className={`${satoshi.className} min-h-screen bg-background`} heroHeight={workTop}>
      <div ref={containerRef} className="relative overflow-hidden">
        <ConstellationLayer
          containerRef={containerRef}
          reduce={reduce}
        />

        <section id="hero" className="relative z-10 mx-auto flex w-full max-w-[62.5rem] flex-col items-center px-6 pt-52 pb-10 lg:px-0">
          <Headline reduce={reduce} />

          {/* Intro card */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: CARD_DELAY, duration: 0.6, ease: EASE }}
            className="relative mt-16 flex items-center gap-6 overflow-hidden rounded-xl border border-border-subtle bg-surface px-6 py-4"
          >
            <MaskReveal delay={PHOTO_DELAY} duration={0.6} reduce={reduce}>
              <div className="flex h-16 w-16 items-end justify-center overflow-hidden bg-surface">
                <Image
                  src="/HeroMe.svg"
                  alt="Sushant Kumar"
                  width={64}
                  height={60}
                  className="h-[3.75rem] w-full object-cover"
                />
              </div>
            </MaskReveal>

            <div className="flex flex-col items-start gap-2">
              <MaskReveal delay={NAME_DELAY} duration={0.55} reduce={reduce}>
                <span className={`text-2xl leading-8 tracking-tight font-medium text-text-primary ${satoshi.className}`}>
                  Hi, I am Sushant Kumar
                </span>
              </MaskReveal>

              <BadgeRow reduce={reduce} />
            </div>
          </motion.div>

          {/* Sub-line */}
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: CARD_DELAY + 0.15, duration: 0.6, ease: EASE }}
            className={`mt-6 text-base text-center text-text-body ${figtree.className}`}
          >
            <span className="text-text-primary font-heading">Previously:</span>{" "}
            Founding Designer @{" "}
            <Image
              src="/PayfiLogo.png"
              alt="Payfi"
              width={120}
              height={32}
              className="inline-block h-[1.4em] w-auto align-text-bottom mb-[-0.15em]"
            />
          </motion.p>

          {/* Scroll cue */}
          <div className="mt-32 flex flex-col items-center gap-2.5 pointer-events-none">
            <div className="flex items-center justify-center w-[2rem] h-[3rem] rounded-full border border-scroll-cue-border bg-scroll-cue-bg backdrop-blur-[0.5rem]">
              <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
                <rect x="1" y="1" width="12" height="20" rx="6" stroke="var(--scroll-cue-icon)" strokeWidth="1.5" />
                <motion.circle
                  cx="7"
                  cy="7"
                  r="2"
                  fill="var(--scroll-cue-dot)"
                  animate={{ cy: [6, 13, 6] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                />
              </svg>
            </div>
            <span className={`text-xs font-medium tracking-widest uppercase text-scroll-cue-text ${figtree.className}`}>
              scroll to work
            </span>
          </div>
        </section>
      </div>

      {/* Continuous Layout Container */}
      <div className="relative w-full">
        {/* Horizontal Line separating Hero and Work */}
        <div className="w-full border-t border-border-subtle relative z-10" />

        {/* ═══════════════  SELECTED WORK  ═══════════════ */}
        <section id="work" className="w-full max-w-[62.5rem] mx-auto px-6 pt-16 pb-10 scroll-mt-24 lg:px-0">
          <div className="mb-10">
            <p className={`text-xs font-semibold uppercase tracking-widest text-text-body ${figtree.className}`}>
              SELECTED WORK
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Card 1 — Trust > Revenue, full-width strip */}
            <CaseStudyCard
              href="/case-studies/case-study-one"
              delay={0}
              bgClass="bg-cs2-hero"
              brandColor="var(--cs2-brand)"
              title="Designing Trust Between Two Complete Strangers"
              description="Fixing BlaBlaCar's P2P cancellation problem meant looking past penalties and payments, toward the psychology of who cancels, when, and why."
              tags={["Behavioral UX", "Trust Design", "Concept Work"]}
              tagBg="bg-cs2-brand/8"
              tagText="text-cs2-brand"
              mockupSrc="/mockups/CardMockup.webp"
              mockupAlt="BlaBlaCar Mockup"
            />

            {/* Card 2 — Trust Over Revenue, full-width strip */}
            <CaseStudyCard
              href="/case-studies/case-study-two"
              delay={0.1}
              bgClass="bg-cs2-card"
              brandColor="var(--cs1-brand)"
              title="Navigating Product Conflicts Without Losing the Room"
              description="Resolving friction in a high-stakes fintech build not by arguing taste, but by communicating through prototypes and evidence until the room agreed."
              tags={["Fintech", "Shipped", "UX Strategy", "Communication"]}
              tagBg="bg-cs1-brand/8"
              tagText="text-cs1-brand"
              mockupSrc="/Card2mockup.svg"
              mockupAlt="Designing for Non-Tech Users Mockup"
            />

            {/* Card 3 — The meta case study, full-width strip */}
            <CaseStudyCard
              href="#"
              delay={0.15}
              bgClass="bg-[#f5f1ff]"
              brandColor="#7c5cd6"
              title="How I Used AI to Build This 5-Page Portfolio"
              description="The meta case study: designing, building, and shipping every page you are browsing right now, with an AI pair in the loop."
              tags={["AI Workflow", "Build Log", "Meta"]}
              tagBg="bg-[#7c5cd6]/8"
              tagText="text-[#7c5cd6]"
              isMeta
            />
          </div>
        </section>

        {/* Horizontal Line separating Work and Testimonials */}
        <div className="w-full border-t border-border-subtle relative z-10" />

        <TestimonialsSection />
      </div>
    </FooterReveal>
  );
}
