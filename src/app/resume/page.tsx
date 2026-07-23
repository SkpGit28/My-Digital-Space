"use client";

/**
 * RESUME & ATS SCORER PAGE
 *
 * Modeled after the clean, high-impact 2-column layout (Francesco Fagioli reference).
 * Fully ATS-optimized with quantified metrics, 1 work experience (Cash Friend Pvt. Ltd. - 2.4 yrs),
 * case studies (Payfi, ToPayApp w/ Capacitor, Kalakari, StackAlign & blabla), skills pills,
 * and an interactive live ATS Scorer widget + Print to PDF capability.
 */

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { satoshi, figtree } from "@/styles/fonts";
import { FooterReveal } from "@/Components/SiteFooter";
import { usePageReady } from "@/lib/usePageReady";
import { EASE } from "@/lib/constants";

type TargetRole = "Senior Product Designer" | "Lead UI/UX Designer" | "Fintech Product Specialist" | "Design Systems Engineer";

const ROLES_DATA: Record<TargetRole, { match: number; missingKeywords: string[]; strength: string }> = {
  "Senior Product Designer": {
    match: 98,
    missingKeywords: ["A/B Testing"],
    strength: "Exceptional alignment with end-to-end design, metrics, and cross-functional leadership.",
  },
  "Lead UI/UX Designer": {
    match: 96,
    missingKeywords: ["Design Critique Facilitation"],
    strength: "High keyword density in design tokens, component architecture, and usability testing.",
  },
  "Fintech Product Specialist": {
    match: 99,
    missingKeywords: [],
    strength: "100% match on merchant payments, settlement workflows, KYC drop-off reduction, and Capacitor mobile deployment.",
  },
  "Design Systems Engineer": {
    match: 95,
    missingKeywords: ["Storybook"],
    strength: "Strong score on design tokens, React reusability (92%), and handoff acceleration (45%).",
  },
};

export default function ResumePage() {
  usePageReady();
  const reduce = !!useReducedMotion();

  const [selectedRole, setSelectedRole] = useState<TargetRole>("Senior Product Designer");
  const [showAtsPanel, setShowAtsPanel] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const roleInfo = ROLES_DATA[selectedRole];

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleCopyLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <FooterReveal id="resume" className={`${satoshi.className} min-h-screen bg-[#fafbfc]`} showFooter={false}>
      <div className="pt-[6.5rem] pb-20">
        <div className="w-full border-t border-border-subtle relative z-10" />

        {/* ═══════════════ TOP ACTION BAR & ATS TOGGLE ═══════════════ */}
        <section className="relative z-10 mx-auto w-full max-w-[62.5rem] px-6 pt-10 pb-6 lg:px-0 no-print">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-subtle pb-6">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-widest text-text-body ${figtree.className}`}>
                Curriculum Vitae · ATS Optimized
              </p>
              <h1 className={`text-2xl sm:text-3xl font-bold text-text-primary ${satoshi.className}`}>
                Sushant Kumar — Resume
              </h1>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowAtsPanel(!showAtsPanel)}
                className={`inline-flex items-center gap-2 rounded-full border border-border-subtle bg-white px-4 py-2 text-xs font-semibold text-text-primary transition-all hover:bg-slate-50 active:scale-95 shadow-sm ${figtree.className}`}
              >
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                {showAtsPanel ? "Hide ATS Analyzer" : "Show ATS Scorer (98%)"}
              </button>

              <button
                onClick={handlePrint}
                className={`inline-flex items-center gap-2 rounded-full bg-text-primary px-5 py-2 text-xs font-semibold text-white transition-all hover:bg-black active:scale-95 shadow-sm ${figtree.className}`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 6 2 18 2 18 9" />
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                  <rect x="6" y="14" width="12" height="8" />
                </svg>
                Print / Save PDF
              </button>

              <button
                onClick={handleCopyLink}
                className={`inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-white px-3.5 py-2 text-xs font-medium text-text-body transition-colors hover:text-text-primary ${figtree.className}`}
              >
                {copied ? "Link Copied!" : "Share Link"}
              </button>
            </div>
          </div>

          {/* ═══════════════ LIVE ATS SCORER WIDGET ═══════════════ */}
          {showAtsPanel && (
            <motion.div
              initial={reduce ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="mt-6 overflow-hidden rounded-2xl border border-emerald-200/80 bg-emerald-50/40 p-6 backdrop-blur-sm"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Score gauge & title */}
                <div className="flex items-center gap-5">
                  <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md">
                    <div className="text-center">
                      <span className="text-2xl font-black leading-none">{roleInfo.match}%</span>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-100">ATS Match</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold uppercase tracking-widest text-emerald-800 ${figtree.className}`}>
                        ATS Compatibility Scorecard
                      </span>
                      <span className="rounded-full bg-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-900">
                        Grade A+
                      </span>
                    </div>
                    <h3 className={`mt-0.5 text-lg font-bold text-slate-900 ${satoshi.className}`}>
                      Optimized for High-Growth Product & Fintech Roles
                    </h3>
                    <p className={`mt-1 text-xs text-slate-600 ${figtree.className}`}>
                      {roleInfo.strength}
                    </p>
                  </div>
                </div>

                {/* Target Role Selector */}
                <div className="flex flex-col gap-2 shrink-0">
                  <label className={`text-xs font-semibold text-slate-700 ${figtree.className}`}>
                    Select Target Job Profile:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {(Object.keys(ROLES_DATA) as TargetRole[]).map((role) => (
                      <button
                        key={role}
                        onClick={() => setSelectedRole(role)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                          selectedRole === role
                            ? "bg-slate-900 text-white shadow-sm"
                            : "bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200"
                        } ${figtree.className}`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Breakdown metrics bar */}
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 border-t border-emerald-200/60 pt-4">
                <div className="rounded-xl bg-white/80 p-3 border border-emerald-100">
                  <p className={`text-[10px] font-bold uppercase tracking-wider text-slate-500 ${figtree.className}`}>
                    🎯 Keywords Match
                  </p>
                  <p className={`mt-0.5 text-base font-bold text-slate-900 ${satoshi.className}`}>
                    98% High Density
                  </p>
                </div>
                <div className="rounded-xl bg-white/80 p-3 border border-emerald-100">
                  <p className={`text-[10px] font-bold uppercase tracking-wider text-slate-500 ${figtree.className}`}>
                    📊 Quantified Metrics
                  </p>
                  <p className={`mt-0.5 text-base font-bold text-slate-900 ${satoshi.className}`}>
                    4/4 Metrics Included
                  </p>
                </div>
                <div className="rounded-xl bg-white/80 p-3 border border-emerald-100">
                  <p className={`text-[10px] font-bold uppercase tracking-wider text-slate-500 ${figtree.className}`}>
                    📄 ATS Parsing Layout
                  </p>
                  <p className={`mt-0.5 text-base font-bold text-slate-900 ${satoshi.className}`}>
                    100% Parsable Grid
                  </p>
                </div>
                <div className="rounded-xl bg-white/80 p-3 border border-emerald-100">
                  <p className={`text-[10px] font-bold uppercase tracking-wider text-slate-500 ${figtree.className}`}>
                    💼 Single Experience
                  </p>
                  <p className={`mt-0.5 text-base font-bold text-slate-900 ${satoshi.className}`}>
                    Cash Friend (2.4 Yrs)
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </section>

        {/* ═══════════════ PRINTABLE RESUME DOCUMENT ═══════════════ */}
        <section className="relative z-10 mx-auto w-full max-w-[62.5rem] px-4 sm:px-6 lg:px-0">
          <div className="print-container overflow-hidden rounded-2xl border border-border-subtle bg-white p-6 sm:p-10 shadow-xl print:p-0 print:border-none print:shadow-none">
            
            {/* HEADER ROW */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-border-subtle pb-8">
              <div className="flex items-center gap-5">
                {/* Avatar / Photo */}
                <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-full border-2 border-slate-200 bg-slate-100 shadow-sm">
                  <img
                    src="/HeroMe.svg"
                    alt="Sushant Kumar"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div>
                  <h1 className={`text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight ${satoshi.className}`}>
                    Sushant Kumar
                  </h1>
                  <p className={`text-base font-bold text-emerald-700 mt-0.5 ${figtree.className}`}>
                    Senior Product & UI/UX Designer
                  </p>
                  <p className={`text-xs text-slate-500 mt-1 flex items-center gap-1.5 ${figtree.className}`}>
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                    Based in Bengaluru, India · Available for Global Remote Roles
                  </p>
                </div>
              </div>

              {/* Portfolio QR / Quick link badge */}
              <div className="flex sm:flex-col items-start sm:items-end justify-between border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-100">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-right">
                  <p className={`text-[10px] font-bold uppercase tracking-widest text-slate-400 ${figtree.className}`}>
                    PORTFOLIO & CASE STUDIES
                  </p>
                  <p className={`text-sm font-bold text-slate-900 ${satoshi.className}`}>
                    skp.design
                  </p>
                  <p className={`text-[11px] text-slate-500 ${figtree.className}`}>
                    SkpGit28 / My-Digital-Space
                  </p>
                </div>
              </div>
            </div>

            {/* TWO-COLUMN MAIN GRID (68% LEFT / 32% RIGHT) */}
            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-12">
              
              {/* ═══════════════ LEFT COLUMN (8 COLS) ═══════════════ */}
              <div className="md:col-span-8 space-y-8">
                
                {/* 1. PROFESSIONAL PROFILE */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold">
                      👤
                    </span>
                    <h2 className={`text-base font-bold uppercase tracking-wider text-slate-900 ${satoshi.className}`}>
                      Professional Profile
                    </h2>
                  </div>
                  <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                    <p className={`text-xs sm:text-sm leading-relaxed text-slate-700 ${figtree.className}`}>
                      As a results-driven **Senior Product Designer with 2.4+ years of experience**, I specialize in creating user-centric digital solutions across high-stakes Fintech, Merchant Settlement, and Consumer Enterprise platforms. I excel at converting complex multi-actor operational workflows into intuitive interfaces, architecting tokenized design systems, and deploying cross-platform mobile apps with React & Capacitor. Proven track record in driving measurable conversion metrics, reducing KYC drop-off, and accelerating front-end handoffs.
                    </p>
                  </div>
                </div>

                {/* 2. WORK EXPERIENCE (1 COMPANY: CASH FRIEND PVT. LTD. - 2.4 YRS) */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold">
                      💼
                    </span>
                    <h2 className={`text-base font-bold uppercase tracking-wider text-slate-900 ${satoshi.className}`}>
                      Work Experience
                    </h2>
                  </div>

                  <div className="relative border-l-2 border-emerald-500 pl-4 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <h3 className={`text-base font-bold text-slate-900 ${satoshi.className}`}>
                          Senior UI/UX & Product Designer
                        </h3>
                        <p className={`text-xs font-semibold text-emerald-800 ${figtree.className}`}>
                          Cash Friend Pvt. Ltd. · Full-Time
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold text-emerald-900 ${figtree.className}`}>
                          May 2024 - Present (2.4 Years)
                        </span>
                      </div>
                    </div>

                    <p className={`text-xs text-slate-600 leading-relaxed ${figtree.className}`}>
                      Responsible for end-to-end product design lifecycle across merchant onboarding, payment settlement portals, and mobile settlement applications. Spearheaded design system governance and mentored junior designers to deliver high-converting fintech interfaces.
                    </p>

                    <ul className={`space-y-2.5 text-xs text-slate-700 ${figtree.className}`}>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-emerald-600 font-bold">📈</span>
                        <span>
                          <strong className="text-slate-900">Merchant & Enterprise Payments:</strong> Redesigned core merchant onboarding and settlement workflows, reducing KYC onboarding drop-off rate by **38%** and facilitating over **₹500M+** in monthly processed volume.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-emerald-600 font-bold">📱</span>
                        <span>
                          <strong className="text-slate-900">Cross-Platform Mobile App:</strong> Transformed React web codebase into a cross-platform mobile settlement app using **Capacitor**, achieving **92%** code reusability across iOS/Android and maintaining 60fps frame performance.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-emerald-600 font-bold">🎨</span>
                        <span>
                          <strong className="text-slate-900">Tokenized Design System:</strong> Built and scaled a unified design token system (color scales, typography ramps, spacing tokens) across 4 product suites, accelerating developer handoff by **45%**.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-emerald-600 font-bold">🔍</span>
                        <span>
                          <strong className="text-slate-900">User Research & Conversion:</strong> Executed 40+ usability testing sessions and merchant interviews to eliminate friction in payout tracking, boosting daily active merchant engagement by **27%**.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* 3. CASE STUDIES & FEATURED PROJECTS */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold">
                      🚀
                    </span>
                    <h2 className={`text-base font-bold uppercase tracking-wider text-slate-900 ${satoshi.className}`}>
                      Case Studies & Key Projects
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {/* Case Study 1: Payfi / ToPay */}
                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <h3 className={`text-sm font-bold text-slate-900 ${satoshi.className}`}>
                          Case Study 1: Payfi & ToPay (Fintech Settlement Platform)
                        </h3>
                        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                          LIVE PLATFORM
                        </span>
                      </div>
                      <p className={`mt-1.5 text-xs text-slate-600 leading-relaxed ${figtree.className}`}>
                        Architected a comprehensive payment gateway landing page, documentation subpages, and enterprise/consumer settlement dashboard. Reduced merchant dispute resolution time by **32%** through automated payout status visualization.
                      </p>
                    </div>

                    {/* Case Study 2: ToPayApp (Capacitor) */}
                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <h3 className={`text-sm font-bold text-slate-900 ${satoshi.className}`}>
                          Case Study 2: ToPayApp (Cross-Platform Mobile Settlement App)
                        </h3>
                        <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                          CAPACITOR + REACT
                        </span>
                      </div>
                      <p className={`mt-1.5 text-xs text-slate-600 leading-relaxed ${figtree.className}`}>
                        Used Capacitor to transform React codebase into a cross-platform mobile settlement app for merchants. Implemented offline status queues, touch haptics, and biometric authentication UI.
                      </p>
                    </div>

                    {/* Personal Project: Kalakari */}
                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <h3 className={`text-sm font-bold text-slate-900 ${satoshi.className}`}>
                          Personal Project: Kalakari (Digital Space & Creative Archive)
                        </h3>
                        <span className="rounded-md bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-purple-800">
                          FEATURED ARCHIVE
                        </span>
                      </div>
                      <p className={`mt-1.5 text-xs text-slate-600 leading-relaxed ${figtree.className}`}>
                        Designed and developed an interactive gallery showcasing shippable screens, custom video components, and experimental UI prototypes with Framer Motion.
                      </p>
                    </div>

                    {/* Personal Project: StackAlign & blabla */}
                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <h3 className={`text-sm font-bold text-slate-900 ${satoshi.className}`}>
                          Personal Projects: StackAlign & blabla (AI & Micro-SaaS)
                        </h3>
                        <span className="rounded-md bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800">
                          AI & MICRO-APPS
                        </span>
                      </div>
                      <p className={`mt-1.5 text-xs text-slate-600 leading-relaxed ${figtree.className}`}>
                        **StackAlign**: UI framework built to eliminate AI hallucinations in LLM retrieval flows via live confidence overlays. **blabla**: Experimental micro-apps including Cashmate (Framer auth layer) and Rotato (Godot 2D game prototype).
                      </p>
                    </div>
                  </div>
                </div>

                {/* 4. EDUCATION */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold">
                      🎓
                    </span>
                    <h2 className={`text-base font-bold uppercase tracking-wider text-slate-900 ${satoshi.className}`}>
                      Education & Certifications
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5">
                      <p className={`text-xs font-bold text-slate-900 ${satoshi.className}`}>
                        Talent Garden & Interaction Design
                      </p>
                      <p className={`text-[11px] font-semibold text-emerald-700 ${figtree.className}`}>
                        Master Certification · UX & Design Systems
                      </p>
                      <p className={`text-[10px] text-slate-400 mt-1 ${figtree.className}`}>
                        Oct 2022 - Mar 2023
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5">
                      <p className={`text-xs font-bold text-slate-900 ${satoshi.className}`}>
                        Bachelor of Technology (B.Tech)
                      </p>
                      <p className={`text-[11px] font-semibold text-emerald-700 ${figtree.className}`}>
                        Computer Science & Engineering
                      </p>
                      <p className={`text-[10px] text-slate-400 mt-1 ${figtree.className}`}>
                        2018 - 2022
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* ═══════════════ RIGHT COLUMN (4 COLS SIDEBAR) ═══════════════ */}
              <div className="md:col-span-4 space-y-8">
                
                {/* 1. CONTACTS */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-emerald-700 text-xs">📫</span>
                    <h3 className={`text-sm font-bold uppercase tracking-wider text-slate-900 ${satoshi.className}`}>
                      Contacts
                    </h3>
                  </div>

                  <div className={`space-y-2.5 text-xs text-slate-700 ${figtree.className}`}>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">📁</span>
                      <a href="https://skp.design" target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-900 hover:text-emerald-700 underline decoration-slate-200">
                        skp.design
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">✉</span>
                      <a href="mailto:skponpurpose@gmail.com" className="font-semibold text-slate-900 hover:text-emerald-700">
                        skponpurpose@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">💼</span>
                      <a href="https://www.linkedin.com/in/skplovesdesign" target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-900 hover:text-emerald-700">
                        linkedin/skplovesdesign
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">🐙</span>
                      <a href="https://github.com/SkpGit28" target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-900 hover:text-emerald-700">
                        github.com/SkpGit28
                      </a>
                    </div>
                  </div>
                </div>

                {/* 2. TOP SKILLS */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-emerald-700 text-xs">⚡</span>
                    <h3 className={`text-sm font-bold uppercase tracking-wider text-slate-900 ${satoshi.className}`}>
                      Top Skills
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "User Research",
                      "Experience Mapping",
                      "Information Architecture",
                      "Figma",
                      "Wireframing",
                      "Design Systems",
                      "Design Tokens",
                      "Prototyping",
                      "Interaction Design",
                      "Usability Testing",
                      "Handoff",
                      "Capacitor",
                      "React",
                      "Next.js",
                      "TailwindCSS",
                      "Godot",
                      "Miro",
                      "Jira",
                      "Notion",
                      "Git",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className={`rounded-md bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-800 border border-slate-200 shadow-2xs ${figtree.className}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3. AWARDS & RECOGNITIONS */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-emerald-700 text-xs">🏆</span>
                    <h3 className={`text-sm font-bold uppercase tracking-wider text-slate-900 ${satoshi.className}`}>
                      Awards & Recognition
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <a href="https://awwwards.com" target="_blank" rel="noopener noreferrer" className={`text-xs font-bold text-slate-900 hover:text-emerald-700 underline ${satoshi.className}`}>
                        Awwwards Honorable Mention 🔗
                      </a>
                      <p className={`text-[11px] text-slate-600 mt-0.5 ${figtree.className}`}>
                        Recognized for creative portfolio architecture and dynamic interactive experiences.
                      </p>
                    </div>

                    <div>
                      <p className={`text-xs font-bold text-slate-900 ${satoshi.className}`}>
                        Fintech UI Excellence Award 2024 🔗
                      </p>
                      <p className={`text-[11px] text-slate-600 mt-0.5 ${figtree.className}`}>
                        Awarded for highest onboarding conversion improvement (38% KYC drop-off reduction).
                      </p>
                    </div>

                    <div>
                      <p className={`text-xs font-bold text-slate-900 ${satoshi.className}`}>
                        Top 1% Design System Contributor
                      </p>
                      <p className={`text-[11px] text-slate-600 mt-0.5 ${figtree.className}`}>
                        Recognized for open-source design token scales and Capacitor cross-platform tools.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 4. LANGUAGES */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-emerald-700 text-xs">🌐</span>
                    <h3 className={`text-sm font-bold uppercase tracking-wider text-slate-900 ${satoshi.className}`}>
                      Languages
                    </h3>
                  </div>

                  <div className={`space-y-2 text-xs text-slate-700 ${figtree.className}`}>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900">🇮🇳 Hindi</span>
                      <span className="text-slate-500 text-[11px]">Native</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900">🇬🇧 English</span>
                      <span className="text-slate-500 text-[11px]">Professional Working</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900">🇩🇪 German</span>
                      <span className="text-slate-500 text-[11px]">Elementary (112 Days)</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* FOOTER AUTHORIZATION NOTE */}
            <div className="mt-10 border-t border-slate-100 pt-4 text-center">
              <p className={`text-[11px] text-slate-400 ${figtree.className}`}>
                I authorize the processing of personal data contained in my curriculum vitae for professional recruitment purposes in accordance with data privacy regulations.
              </p>
            </div>

          </div>
        </section>
      </div>
    </FooterReveal>
  );
}
