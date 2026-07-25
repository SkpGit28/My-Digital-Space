"use client";

/**
 * KALAKARI — project posters page.
 *
 * Row 1 — StackAlign, Payfi, ToPay (all LIVE chipped).
 * Row 2 — ToPayApp, RotatoPoster, Cashmate.
 */

import React, { useState, useEffect } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { satoshi, figtree } from "@/styles/fonts";
import { FooterReveal } from "@/Components/SiteFooter";
import { usePageReady } from "@/lib/usePageReady";

import { EASE } from "@/lib/constants";

/* ─────────────────── PROJECT CARDS ─────────────────── */

type ProjectCard = {
  id: string;
  svg: string;
  video?: string;
  title: string;
  sub: string;
  overlaySub?: string;
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
    href: "https://stack-align.vercel.app/",
  },
  {
    id: "payfi",
    svg: "/PayfiWeb.svg",
    title: "Payfi",
    sub: "A complete landing page with docs subpage for a PG company",
    live: true,
    href: "https://payfi-platform.vercel.app/",
  },
  {
    id: "topay",
    svg: "/ToPay.svg",
    title: "ToPay",
    sub: "A landing page for an app facing both enterprise and consumer",
    live: true,
    href: "https://topay-landing-page.vercel.app/",
  },
  {
    id: "topayapp",
    svg: "/ToPayApp.svg",
    title: "ToPayApp",
    sub: "Used Capacitor to transform React codebase into a cross-platform mobile settlement app",
    overlaySub: "A settlement app built for merchants",
    href: "https://topayapp.vercel.app",
  },
  {
    id: "rotatoposter",
    svg: "/RotatoPoster.svg",
    video: "/Rotato-video.mp4",
    title: "RotatoPoster",
    sub: "A self-designed game I am making in GoDot — 2 levels done",
  },
  {
    id: "cashmate",
    svg: "/Cashmate.svg",
    video: "/Cashmate-video.mp4",
    title: "Cashmate",
    sub: "Built and developed using Framer with an auth layer via code components",
    href: "https://cashmate.vercel.app",
  },
];

function ProjectTile({ p, onSelect }: { p: ProjectCard; onSelect: (p: ProjectCard) => void }) {
  return (
    <div
      onClick={() => onSelect(p)}
      className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-border-hairline bg-white text-left no-underline transition-all duration-200 hover:shadow-md hover:border-border-subtle cursor-pointer"
    >
      {/* Poster image — static, hover zoom */}
      <div className="relative w-full overflow-hidden bg-surface-canvas aspect-[4/3]">
        <img
          src={p.svg}
          alt={p.title}
          className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-102"
          draggable={false}
        />

        {/* LIVE chip — top-left */}
        {p.live && (
          <span
            className={`absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-widest bg-badge-green-bg text-badge-green-text ${figtree.className}`}
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-badge-green-text" />
            LIVE
          </span>
        )}

        {/* VIDEO tag if video available */}
        {p.video && (
          <span
            className={`absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.6875rem] font-bold uppercase tracking-widest bg-black/70 text-white backdrop-blur-sm ${figtree.className}`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
            VIDEO
          </span>
        )}
      </div>

      {/* Text footer */}
      <div className="flex flex-1 flex-col justify-between border-t border-border-hairline bg-white px-4 py-3 min-h-[5.75rem]">
        <div className="flex flex-col gap-0.5">
          <p className={`text-[0.9375rem] font-semibold leading-tight text-text-heading ${satoshi.className}`}>
            {p.title}
          </p>
          <p className={`text-xs leading-relaxed text-text-body ${figtree.className}`}>
            {p.sub}
          </p>
        </div>
      </div>
    </div>
  );
}

function ProjectGrid({
  reduce,
  onSelectProject,
}: {
  reduce: boolean;
  onSelectProject: (p: ProjectCard) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
      {PROJECTS.map((p, i) => (
        <motion.div
          key={p.id}
          className="h-full"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: EASE, delay: (i % 3) * 0.08 }}
        >
          <ProjectTile p={p} onSelect={onSelectProject} />
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────────── OVERLAY MODAL ─────────────────── */

function ProjectOverlay({
  project,
  onClose,
}: {
  project: ProjectCard;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/60 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="relative flex flex-col w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-white border border-border-subtle shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-hairline bg-surface/50">
          <div className="flex items-center gap-3">
            <h3 className={`text-xl sm:text-2xl font-bold text-text-primary ${satoshi.className}`}>
              {project.title}
            </h3>
            {project.live && (
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-widest bg-badge-green-bg text-badge-green-text ${figtree.className}`}
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-badge-green-text" />
                LIVE
              </span>
            )}
            {project.video && (
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-widest bg-badge-blue-bg text-badge-blue-text ${figtree.className}`}
              >
                VIDEO DEMO
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="flex items-center justify-center h-8 w-8 rounded-full bg-bg-subtle text-text-body hover:bg-slate-200 transition-colors text-sm font-bold"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {/* Media Player / Image container */}
          <div className="relative w-full overflow-hidden rounded-xl bg-black flex items-center justify-center min-h-[16rem]">
            {project.video ? (
              <video
                src={project.video}
                controls
                autoPlay
                loop
                playsInline
                className="w-full h-full max-h-[58vh] object-contain rounded-xl"
              />
            ) : (
              <img
                src={project.svg}
                alt={project.title}
                className="w-full h-full max-h-[58vh] object-contain bg-surface-canvas p-2 rounded-xl"
              />
            )}
          </div>

          {/* Description + CTA */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <p className={`text-base leading-relaxed text-text-body max-w-xl ${figtree.className}`}>
              {project.overlaySub || project.sub}
            </p>

            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 rounded-full bg-text-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-black active:scale-95 shadow-sm shrink-0 ${figtree.className}`}
              >
                Visit live website
                <span className="text-base">→</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────── PAGE ─────────────────── */

export default function KalakariPage() {
  usePageReady();
  const reduce = !!useReducedMotion();
  const [selectedProject, setSelectedProject] = useState<ProjectCard | null>(null);

  return (
    <FooterReveal id="kalakari" className={`${satoshi.className} min-h-screen bg-[#fafbfc]`} showFooter={false}>
      <div className="pt-[6.5rem]">
        <div className="w-full border-t border-border-subtle relative z-10" />

        {/* ═══════════════  HERO  ═══════════════ */}
        <section className="relative z-10 mx-auto w-full max-w-[62.5rem] px-6 pb-10 pt-16 lg:px-0">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className={`mb-10 text-xs font-semibold uppercase tracking-[0.16em] text-text-body ${figtree.className}`}
          >
            Kalakari · कलाकारी
          </motion.p>

          <h1 className={`max-w-[54rem] text-[2.5rem] font-bold leading-[1.25] tracking-tight text-text-primary sm:text-[3.25rem] ${satoshi.className}`}>
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

        {/* ═══════════════  PROJECT POSTERS  ═══════════════ */}
        <section className="relative z-10 mx-auto w-full max-w-[62.5rem] px-6 pb-16 lg:px-0">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8, ease: EASE }}
            className={`mb-6 text-xs font-semibold uppercase tracking-widest text-text-body ${figtree.className}`}
          >
            Projects
          </motion.p>
          <ProjectGrid reduce={reduce} onSelectProject={setSelectedProject} />
        </section>
      </div>

      {/* Interactive Overlay Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectOverlay
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </FooterReveal>
  );
}
