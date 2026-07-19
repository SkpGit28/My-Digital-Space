"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { satoshi, figtree } from "@/styles/fonts";
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
  "/FirstImage.svg",
  "/SecondImage.svg",
  "/ThirdImg.svg",
  "/FourthImg.svg",
];

export default function SkpPage() {
  usePageReady();
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredThumb, setHoveredThumb] = useState<number | null>(null);
  const reduce = !!useReducedMotion();

  return (
    <FooterReveal id="skp" className={`${satoshi.className} min-h-screen bg-background`} showFooter={false}>
      {/* Vertical lines from top — full height */}
      <div className="absolute bottom-0 left-[calc(50%-652px)] w-[1px] bg-border-subtle pointer-events-none hidden min-[1340px]:block z-0" />
      <div className="absolute bottom-0 right-[calc(50%-652px)] w-[1px] bg-border-subtle pointer-events-none hidden min-[1340px]:block z-0" />

      {/* Punch hole circles — 24px from left vertical line */}
      <div className="absolute left-[calc(50%-652px+24px)] top-[130px] bottom-0 flex flex-col items-center justify-start gap-[56px] pointer-events-none hidden min-[1340px]:flex z-[1]">
        {Array.from({ length: 22 }).map((_, i) => (
          <div
            key={i}
            className="w-[24px] h-[24px] rounded-full border-[2px] border-slate-300 bg-white"
          />
        ))}
      </div>

      {/* Horizontal line at the top of the SKP section, 24px below the menu bar; texture starts here */}
      <div className="pt-[104px]">
        <div className="w-full border-t border-border-subtle relative z-10" />

        {/* Paper texture between vertical lines, from the first section onward */}
        <div className="relative">
          <div
            className="absolute inset-0 bg-repeat bg-center z-0"
            style={{
              backgroundImage: "url('/paperbg.png')",
              left: "calc(50% - 652px)",
              right: "calc(50% - 652px)",
            }}
          />

      {/* ═══════════════  HERO  ═══════════════ */}
      <section className="relative z-10 mx-auto w-full max-w-[62.5rem] px-6 pb-10 pt-16 lg:px-0">
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
            className="relative w-full md:w-[484px] shrink-0"
          >
            <div className="bg-white p-3 rounded-[32px] border border-slate-200/50 shadow-md">
              <div className="relative h-[420px] rounded-[24px] overflow-hidden bg-slate-100 group">
                <img
                  src={GALLERY_IMAGES[activeIndex] || GALLERY_IMAGES[0]}
                  alt="SKP Gallery"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                />
              </div>
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
                      marginLeft: i === 0 ? "0px" : spread ? "12px" : "-30px",
                    }}
                    transition={{ type: "spring", stiffness: 420, damping: 28, mass: 0.7 }}
                    className="relative shrink-0 w-[72px] h-[72px] rounded-2xl overflow-hidden border-[2.5px] border-white cursor-pointer"
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
              className={`text-[18px] leading-relaxed text-text-primary max-w-lg space-y-4 ${satoshi.className}`}
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
