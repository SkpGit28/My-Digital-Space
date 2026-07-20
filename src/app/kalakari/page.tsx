"use client";

/**
 * KALAKARI — project posters page.
 *
 * Row 1 — StackAlign, PayfiWeb, ToPay (all LIVE chipped).
 * Row 2 — ToPayApp, RotatoPoster, Cashmate.
 */

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
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
    sub: "A settlement app built for merchants",
    href: "https://topayapp.vercel.app",
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
    href: "https://cashmate.vercel.app",
  },
];

function ProjectTile({ p }: { p: ProjectCard }) {
  const Tag = p.href ? "a" : "div";
  const extraProps = p.href
    ? { href: p.href, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Tag
      {...extraProps}
      className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-border-hairline bg-white text-left no-underline transition-shadow duration-200 hover:shadow-md cursor-pointer"
    >
      {/* Poster image — static, no hover zoom */}
      <div className="relative w-full overflow-hidden bg-surface-canvas aspect-[4/3]">
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

      {/* Text footer — white bg, aligned height matching tallest card in row */}
      <div className="flex flex-1 flex-col justify-between border-t border-border-hairline bg-white px-4 py-3 min-h-[92px]">
        <div className="flex flex-col gap-0.5">
          <p className={`text-[15px] font-semibold leading-tight text-text-heading ${satoshi.className}`}>
            {p.title}
          </p>
          <p className={`text-[12px] leading-relaxed text-text-body ${figtree.className}`}>
            {p.sub}
          </p>
        </div>
      </div>
    </Tag>
  );
}

function ProjectGrid({ reduce }: { reduce: boolean }) {
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
          <ProjectTile p={p} />
        </motion.div>
      ))}
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
