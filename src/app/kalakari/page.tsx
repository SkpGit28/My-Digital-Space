"use client";

/**
 * KALAKARI — project posters page.
 *
 * Row 1 — StackAlign, PayfiWeb, ToPay (all LIVE chipped).
 * Row 2 — ToPayApp, RotatoPoster, Cashmate.
 */

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { satoshi, figtree } from "@/styles/fonts";
import { FooterReveal } from "@/Components/SiteFooter";
import { usePageReady } from "@/lib/usePageReady";

import { EASE } from "@/lib/constants";

/* ─────────────────── PROJECT CARDS (top two rows) ─────────────────── */

type ProjectCard = {
  id: string;
  svg: string;
  title: string;
  sub: string;
  live?: boolean;
  href?: string;
};

const PROJECTS: ProjectCard[] = [
  {
    id: "stackalign",
    svg: "/StackAlign.svg",
    title: "StackAlign",
    sub: "A little solution to fix the hallucination problem of AI",
    live: true,
  },
  {
    id: "payfiweb",
    svg: "/PayfiWeb.svg",
    title: "PayfiWeb",
    sub: "A complete landing page with docs subpage for a PG company",
    live: true,
  },
  {
    id: "topay",
    svg: "/ToPay.svg",
    title: "ToPay",
    sub: "A landing page for an app facing both enterprise and consumer",
    live: true,
  },
  {
    id: "topayapp",
    svg: "/ToPayApp.svg",
    title: "ToPayApp",
    sub: "A settlement app built for merchants",
  },
  {
    id: "rotatoposter",
    svg: "/RotatoPoster.svg",
    title: "RotatoPoster",
    sub: "A self-designed game I am making in GoDot — 2 levels done",
  },
  {
    id: "cashmate",
    svg: "/Cashmate.svg",
    title: "Cashmate",
    sub: "Built and developed using Framer with an auth layer via code components",
  },
];

function ProjectTile({ p, onOpen }: { p: ProjectCard; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-border-hairline bg-white text-left"
    >
      {/* Poster image — static, no hover zoom */}
      <div className="relative w-full overflow-hidden bg-surface-canvas" style={{ aspectRatio: "4/3" }}>
        <img
          src={p.svg}
          alt={p.title}
          className="h-full w-full object-cover object-top"
          draggable={false}
        />

        {/* LIVE chip — top-left, green from design token */}
        {p.live && (
          <span
            className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest bg-badge-green-bg text-badge-green-text ${figtree.className}`}
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-badge-green-text" />
            LIVE
          </span>
        )}
      </div>

      {/* Text footer — white bg, always readable */}
      <div className="flex flex-col gap-0.5 border-t border-border-hairline bg-white px-4 py-3">
        <p className={`text-[15px] font-semibold leading-tight text-text-heading ${satoshi.className}`}>
          {p.title}
        </p>
        <p className={`text-[12px] leading-relaxed text-text-body ${figtree.className}`}>
          {p.sub}
        </p>
      </div>
    </button>
  );
}

function ProjectGrid({ reduce }: { reduce: boolean }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = PROJECTS.find((p) => p.id === openId);

  return (
    <div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
        {PROJECTS.map((p, i) => (
          <motion.div
            key={p.id}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: EASE, delay: (i % 3) * 0.08 }}
          >
            <ProjectTile p={p} onOpen={() => setOpenId(p.id)} />
          </motion.div>
        ))}
      </div>

      {/* Click-to-overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] grid place-items-center bg-text-heading/50 p-6 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenId(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.3, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[600px] overflow-hidden rounded-2xl border border-border-hairline bg-white shadow-2xl"
            >
              {/* Enlarged poster */}
              <div className="relative w-full overflow-hidden bg-surface-canvas" style={{ aspectRatio: "16/9" }}>
                <img
                  src={open.svg}
                  alt={open.title}
                  className="h-full w-full object-cover object-top"
                  draggable={false}
                />
                {open.live && (
                  <span
                    className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-bold uppercase tracking-widest ${figtree.className}`}
                    style={{ background: "var(--color-badge-green-bg)", color: "var(--color-badge-green-text)" }}
                  >
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-badge-green-text" />
                    LIVE
                  </span>
                )}
                {/* Close button */}
                <button
                  type="button"
                  onClick={() => setOpenId(null)}
                  className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[14px] text-text-heading shadow-sm backdrop-blur-sm hover:bg-white"
                >
                  ✕
                </button>
              </div>

              {/* Text layer */}
              <div className="px-6 py-5">
                <h3 className={`text-[22px] font-semibold tracking-tight text-text-heading ${satoshi.className}`}>
                  {open.title}
                </h3>
                <p className={`mt-1.5 text-[14px] leading-relaxed text-text-body ${figtree.className}`}>
                  {open.sub}
                </p>
                {open.href && (
                  <a
                    href={open.href}
                    className={`mt-3 inline-block text-[14px] font-semibold text-badge-green-text ${figtree.className}`}
                  >
                    open it →
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}



/* ─────────────────── PAGE ─────────────────── */

export default function KalakariPage() {
  usePageReady();
  const reduce = !!useReducedMotion();

  return (
    <FooterReveal id="kalakari" className={`${satoshi.className} min-h-screen bg-[#fafbfc]`} showFooter={false}>
      <div className="pt-[104px]">
        <div className="w-full border-t border-border-subtle relative z-10" />

        {/* ═══════════════  HERO  ═══════════════ */}
        <section className="relative z-10 mx-auto w-full max-w-[62.5rem] px-6 pb-10 pt-16 lg:px-0">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className={`mb-10 text-[12px] font-semibold uppercase tracking-[0.16em] text-text-body ${figtree.className}`}
          >
            Kalakari · कलाकारी
          </motion.p>

          <h1 className={`max-w-[54rem] text-[2.5rem] font-bold leading-[1.2] tracking-[-0.02em] text-text-primary sm:text-[3.25rem] ${satoshi.className}`}>
            <motion.span
              initial={reduce ? false : { y: "110%", display: "inline-block" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
              style={{ display: "inline-block", overflow: "hidden" }}
            >
              Everything I design, build,
            </motion.span>
            <br />
            <motion.span
              initial={reduce ? false : { y: "110%", display: "inline-block" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
              style={{ display: "inline-block", overflow: "hidden" }}
            >
              break, and dream about.
            </motion.span>
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
            className={`mt-6 max-w-[36rem] text-[1.125rem] leading-relaxed text-text-body ${figtree.className}`}
          >
            A living archive of shipped screens, side quests, dead ends, and ideas
            that refuse to sit still.
          </motion.p>
        </section>

        {/* ═══════════════  PROJECT POSTERS (2 rows of 3)  ═══════════════ */}
        <section className="relative z-10 mx-auto w-full max-w-[62.5rem] px-6 pb-16 lg:px-0">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8, ease: EASE }}
            className={`mb-6 text-[12px] font-semibold uppercase tracking-widest text-text-body ${figtree.className}`}
          >
            Projects
          </motion.p>
          <ProjectGrid reduce={reduce} />
        </section>


      </div>
    </FooterReveal>
  );
}
