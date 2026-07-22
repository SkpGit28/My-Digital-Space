"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { satoshi, figtree, caveat } from "@/styles/fonts";
import { FooterReveal } from "@/Components/SiteFooter";
import { usePageReady } from "@/lib/usePageReady";
import DesignCanvas from "@/Components/DesignCanvas";

import { EASE } from "@/lib/constants";

const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.006,
    }
  }
};

const wordVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE }
  }
};

const THUMBNAILS = [
  { rotation: 7 },
  { rotation: 10 },
  { rotation: 6 },
  { rotation: 9 },
];

const GALLERY_IMAGES = [
  "/FirstImage.webp",
  "/SecondImage.webp",
  "/ThirdImg.webp",
  "/FourthImg.webp",
];

/* Hand-written notes pinned to each gallery photo, shown top-right of the main
   image with a curved arrow into the shot. `over` marks a struck-then-corrected
   word (Parent → Brother). */
type PhotoNote = { text?: string; pre?: string; struck?: string; over?: string };
const PHOTO_NOTES: PhotoNote[] = [
  { text: "Promoted the Startup at National Level @ Global Fintech Festival" },
  { pre: "Pet ", struck: "Parent", over: "Brother" },
  { text: "Goa Done" },
  { text: "AI Gen Model" },
];

function NoteBody({ note }: { note: PhotoNote }) {
  if (note.over) {
    return (
      <span className="whitespace-nowrap">
        {note.pre}
        <span className="relative inline-block">
          <span className="relative inline-block">
            {note.struck}
            <span aria-hidden className="absolute left-[-2px] right-[-2px] top-1/2 h-[2.5px] -rotate-3 rounded-full bg-[#d92d20]" />
          </span>
          <span className="absolute -top-[0.9em] left-1/2 -translate-x-1/2 -rotate-[7deg] whitespace-nowrap text-[#d92d20]">
            {note.over}
          </span>
        </span>
      </span>
    );
  }
  return <>{note.text}</>;
}

export default function SkpPage() {
  usePageReady();
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredThumb, setHoveredThumb] = useState<number | null>(null);
  const reduce = !!useReducedMotion();

  return (
    <FooterReveal id="skp" className={`${satoshi.className} min-h-screen bg-background`} showFooter={false}>
      {/* Punch hole circles — 1.5rem from left vertical line */}
      <div className="absolute left-[calc(50%-40.75rem+1.5rem)] top-[8.125rem] bottom-0 flex flex-col items-center justify-start gap-[3.5rem] pointer-events-none hidden min-[1340px]:flex z-[1]">
        {Array.from({ length: 22 }).map((_, i) => (
          <div
            key={i}
            className="w-6 h-6 rounded-full border-[2px] border-slate-300 bg-white"
          />
        ))}
      </div>

      {/* Horizontal line at the top of the SKP section, 1.5rem below the menu bar; texture starts here */}
      <div className="pt-[6.5rem]">
        <div className="w-full border-t border-border-subtle relative z-10" />

        {/* Paper texture between vertical lines, from the first section onward */}
        <div className="relative">
          <div
            className="absolute inset-0 bg-repeat bg-center z-0"
            style={{
              backgroundImage: "url('/paperbg.png')",
              left: "calc(50% - 40.75rem)",
              right: "calc(50% - 40.75rem)",
            }}
          />

      {/* ═══════════════  HERO  ═══════════════ */}
      <section className="relative z-10 mx-auto w-full max-w-[62.5rem] px-6 pb-16 pt-16 lg:px-0">
        <div className="mb-6">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className={`text-xs font-semibold uppercase tracking-widest text-text-body ${figtree.className}`}
          >
            SKP
          </motion.p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left — Main photo with thumbnails overlapping bottom */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="relative w-full md:w-[30.25rem] shrink-0"
          >
            <div className="bg-white p-3 rounded-[2rem] border border-slate-200/50 shadow-md">
              <div className="relative h-[26.25rem] rounded-[1.5rem] overflow-hidden bg-slate-100 group">
                <img
                  src={GALLERY_IMAGES[activeIndex] || GALLERY_IMAGES[0]}
                  alt="SKP Gallery"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                />
              </div>
            </div>

            {/* Hand-written note for the active photo — lives in the empty space
                to the RIGHT of the photo's top (over the intro column's blank
                upper area on md+), with a curved arrow pointing back down-left
                into the shot. On mobile it tucks against the photo's top-right. */}
            <div className="pointer-events-none absolute right-2 top-2 z-30 flex w-[15rem] flex-col items-start md:right-auto md:left-full md:ml-11 md:top-[-4.25rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={reduce ? false : { opacity: 0, y: -6, rotate: -7 }}
                  animate={{ opacity: 1, y: 0, rotate: -4 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: 4, transition: { duration: 0.18 } }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className={`${caveat.className} flex flex-col items-start`}
                  style={{ textShadow: "0 1px 2px rgba(255,255,255,0.95), 0 0 10px rgba(255,255,255,0.8)" }}
                >
                  <p className="text-left text-[21px] font-bold leading-[1.1] text-[#1f2430]">
                    <NoteBody note={PHOTO_NOTES[activeIndex]} />
                  </p>
                  {/* short arrow angling down-left into the empty gap toward the
                      photo's top-right corner — lands on neither image nor text */}
                  <svg
                    width="118"
                    height="46"
                    viewBox="0 0 118 46"
                    fill="none"
                    className="-ml-8 mt-1"
                    style={{ filter: "drop-shadow(0 1px 1px rgba(255,255,255,0.85))" }}
                    aria-hidden
                  >
                    <path d="M110 5 C 92 22, 56 32, 14 35" stroke="#1f2430" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14 35 l 14 -5 M14 35 l 6 12" stroke="#1f2430" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Thumbnails overlapping bottom edge */}
            <div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-end justify-center w-[90%] z-20"
              onMouseLeave={() => setHoveredThumb(null)}
            >
              {THUMBNAILS.map((thumb, i) => {
                const spread = hoveredThumb !== null;
                const isHovered = hoveredThumb === i;

                return (
                  <motion.div
                    key={i}
                    onMouseEnter={() => { setHoveredThumb(i); setActiveIndex(i); }}
                    initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: isHovered ? -10 : 0,
                      scale: isHovered ? 0.92 : 1,
                      rotate: spread ? 0 : thumb.rotation,
                      marginLeft: i === 0 ? "0rem" : spread ? "0.75rem" : "-1.875rem",
                    }}
                    transition={{ type: "spring", stiffness: 420, damping: 28, mass: 0.7 }}
                    className="relative shrink-0 w-[4.5rem] h-[4.5rem] rounded-2xl overflow-hidden border-[2.5px] border-white cursor-pointer"
                    style={{
                      zIndex: isHovered ? 50 : i + 10,
                      boxShadow: isHovered
                        ? "0 12px 24px -6px rgba(0, 0, 0, 0.18)"
                        : "0 4px 6px -1px rgba(0, 0, 0, 0.08)",
                    }}
                  >
                    <img
                      src={GALLERY_IMAGES[i]}
                      alt={`SKP Thumbnail ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right — Intro text */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            className="flex-1 flex flex-col justify-center"
          >
            <motion.div
              variants={textContainerVariants}
              initial="hidden"
              animate="visible"
              className={`text-[1.125rem] leading-relaxed text-text-body max-w-lg space-y-4 ${figtree.className}`}
            >
              <p>
                {"Hi, SKP here. UI/UX Designer, professional overthinker, and part-time perfectionist. I enjoy making confusing things feel obvious. My design decisions are driven by curiosity and constantly challenged by my own perfectionism.".split(" ").map((word, idx) => (
                  <motion.span key={idx} variants={wordVariants} className="inline-block mr-1">
                    {word}
                  </motion.span>
                ))}
              </p>
              <p>
                {"I've been carrying around the same idea diary since 2021, still adding to it, still chasing a few concepts written on the very first pages. Outside of design work, I enjoy acting (especially playing drunk character roles) and trying to go to the gym more than I talk about going.".split(" ").map((word, idx) => (
                  <motion.span key={idx} variants={wordVariants} className="inline-block mr-1">
                    {word}
                  </motion.span>
                ))}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

          {/* Other than Design: the evidence board — same section, no second eyebrow */}
          <div className="relative z-10 w-full pb-20">
            <DesignCanvas />
          </div>
        </div>
      </div>
    </FooterReveal>
  );
}
