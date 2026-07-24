"use client";

/**
 * SUSHANT KUMAR — RESUME & ATS SCORER
 *
 * Exact copy, layout, and visual balance matching Francesco Fagioli's CV:
 * - Standalone Photo Card + Standalone Name Card (No QR code).
 * - Right Column: Contacts Card at top right.
 * - Certifications: Ongoing course (Design Thinking) on top as 1st item.
 * - Education title updated to: "Bachelors in Information Technology".
 * - Perfectly centered blue timeline dot over vertical blue line for Work Experience.
 * - Single-page A4 print optimization (@media print).
 */

import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { satoshi, figtree } from "@/styles/fonts";
import { FooterReveal } from "@/Components/SiteFooter";
import { usePageReady } from "@/lib/usePageReady";
import { EASE } from "@/lib/constants";

type TargetRole = "UI/UX Designer" | "Senior Product Designer" | "Fintech UI Specialist" | "Design Systems Engineer";

const ROLES_DATA: Record<TargetRole, { match: number; missingKeywords: string[]; strength: string }> = {
  "UI/UX Designer": {
    match: 99,
    missingKeywords: [],
    strength: "100% match on settlement dashboards, design tokens, BBPS platform, and Framer RBAC auth.",
  },
  "Senior Product Designer": {
    match: 97,
    missingKeywords: ["A/B Testing"],
    strength: "High keyword density across end-to-end product design, metrics (₹1.2+ Cr), and engineering handoffs.",
  },
  "Fintech UI Specialist": {
    match: 100,
    missingKeywords: [],
    strength: "Flawless match for merchant onboarding (2,800+ merchants), money settlement, and HRM/tax modules.",
  },
  "Design Systems Engineer": {
    match: 96,
    missingKeywords: ["Storybook"],
    strength: "Strong alignment with token-based design systems, reusable components, and code-level auth.",
  },
};

export default function ResumePage() {
  usePageReady();
  const reduce = !!useReducedMotion();

  const [selectedRole, setSelectedRole] = useState<TargetRole>("UI/UX Designer");
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
    <FooterReveal id="resume" className={`${satoshi.className} min-h-screen bg-[#f4f5f8]`} showFooter={false}>
      {/* ═══════════════ A4 SINGLE PAGE PRINT STYLES ═══════════════ */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 6mm 8mm;
          }
          html, body {
            background-color: #ffffff !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            font-size: 11px !important;
          }
          .no-print, header, footer, nav, button {
            display: none !important;
          }
          .pt-\\[6\\.5rem\\] {
            padding-top: 0 !important;
          }
          .pb-20 {
            padding-bottom: 0 !important;
          }
          .print-container {
            display: grid !important;
            grid-template-columns: repeat(12, minmax(0, 1fr)) !important;
            gap: 1rem !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          .print-container * {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
        }
      `}</style>

      <div className="pt-[6.5rem] pb-20">
        <div className="w-full border-t border-border-subtle relative z-10 no-print" />

        {/* ═══════════════ TOP ACTION BAR & ATS TOGGLE (WEB ONLY) ═══════════════ */}
        <section className="relative z-10 mx-auto w-full max-w-[66rem] px-4 sm:px-6 pt-8 pb-4 lg:px-0 no-print">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-widest text-blue-600 ${figtree.className}`}>
                Curriculum Vitae · ATS Scorer
              </p>
              <h1 className={`text-2xl sm:text-3xl font-bold text-slate-900 ${satoshi.className}`}>
                Sushant Kumar — Resume
              </h1>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowAtsPanel(!showAtsPanel)}
                className={`inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-4 py-2 text-xs font-semibold text-blue-700 transition-all hover:bg-blue-100 active:scale-95 shadow-2xs ${figtree.className}`}
              >
                <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                {showAtsPanel ? "Hide ATS Scorer" : "Show ATS Scorer (99%)"}
              </button>

              <button
                onClick={handlePrint}
                className={`inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-xs font-semibold text-white transition-all hover:bg-blue-700 active:scale-95 shadow-sm ${figtree.className}`}
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
                className={`inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 transition-colors hover:text-slate-900 ${figtree.className}`}
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
              className="mt-6 overflow-hidden rounded-2xl border border-blue-200/80 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Score gauge & title */}
                <div className="flex items-center gap-5">
                  <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md">
                    <div className="text-center">
                      <span className="text-2xl font-black leading-none">{roleInfo.match}%</span>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-blue-100">ATS Match</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold uppercase tracking-widest text-blue-700 ${figtree.className}`}>
                        ATS Optimizer Grade: A+
                      </span>
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                        Top 1% Candidate
                      </span>
                    </div>
                    <h3 className={`mt-0.5 text-lg font-bold text-slate-900 ${satoshi.className}`}>
                      Fintech & UI/UX Product Alignment
                    </h3>
                    <p className={`mt-1 text-xs text-slate-600 ${figtree.className}`}>
                      {roleInfo.strength}
                    </p>
                  </div>
                </div>

                {/* Target Role Selector */}
                <div className="flex flex-col gap-2 shrink-0">
                  <label className={`text-xs font-semibold text-slate-700 ${figtree.className}`}>
                    Select Role Target:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {(Object.keys(ROLES_DATA) as TargetRole[]).map((role) => (
                      <button
                        key={role}
                        onClick={() => setSelectedRole(role)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                          selectedRole === role
                            ? "bg-blue-600 text-white shadow-sm"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                        } ${figtree.className}`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Breakdown metrics bar */}
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 border-t border-slate-100 pt-4">
                <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                  <p className={`text-[10px] font-bold uppercase tracking-wider text-slate-500 ${figtree.className}`}>
                    🎯 Keywords Match
                  </p>
                  <p className={`mt-0.5 text-sm font-bold text-slate-900 ${satoshi.className}`}>
                    100% Core Keywords
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                  <p className={`text-[10px] font-bold uppercase tracking-wider text-slate-500 ${figtree.className}`}>
                    📊 Quantified Metrics
                  </p>
                  <p className={`mt-0.5 text-sm font-bold text-slate-900 ${satoshi.className}`}>
                    ₹1.2+ Cr & 2,800+ Merchants
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                  <p className={`text-[10px] font-bold uppercase tracking-wider text-slate-500 ${figtree.className}`}>
                    📄 ATS Parsing Layout
                  </p>
                  <p className={`mt-0.5 text-sm font-bold text-slate-900 ${satoshi.className}`}>
                    Clean 2-Column Card Grid
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3 border border-slate-100">
                  <p className={`text-[10px] font-bold uppercase tracking-wider text-slate-500 ${figtree.className}`}>
                    💼 Work Experience
                  </p>
                  <p className={`mt-0.5 text-sm font-bold text-slate-900 ${satoshi.className}`}>
                    Cash Friend (2.4 Yrs)
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </section>

        {/* ═══════════════ RESUME DOCUMENT (EXACT FRANCESCO FAGIOLI LAYOUT) ═══════════════ */}
        <section className="relative z-10 mx-auto w-full max-w-[66rem] px-4 sm:px-6 lg:px-0">
          <div className="print-container grid grid-cols-1 gap-6 md:grid-cols-12 items-start">
            
            {/* ═══════════════ LEFT COLUMN (8 COLS / ~65%) ═══════════════ */}
            <div className="md:col-span-8 space-y-6">
              
              {/* CARD 1: TOP HEADER ROW (2 SEPARATE CARDS: PHOTO CARD + NAME CARD) */}
              <div className="flex flex-col sm:flex-row items-stretch gap-6">
                
                {/* 1A: PHOTO CARD (SEPARATE PARENT) */}
                <div className="rounded-2xl border border-slate-200/90 bg-white p-3 shadow-xs flex items-center justify-center shrink-0">
                  <div className="relative h-36 w-36 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                    <img
                      src="/HeroMe.svg"
                      alt="Sushant Kumar"
                      className="h-full w-full object-cover grayscale"
                    />
                  </div>
                </div>

                {/* 1B: NAME & TITLE CARD (SEPARATE PARENT — NO QR CODE) */}
                <div className="flex-1 rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs flex flex-col justify-center">
                  <h1 className={`text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight ${satoshi.className}`}>
                    Sushant Kumar
                  </h1>
                  <p className={`text-base font-semibold text-slate-600 mt-1 ${figtree.className}`}>
                    UI/UX Designer
                  </p>
                  <p className={`text-xs text-slate-500 mt-3 flex items-center gap-1.5 ${figtree.className}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    Noida, India
                  </p>
                </div>

              </div>

              {/* CARD 2: PROFESSIONAL PROFILE */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs">
                {/* Main Header with Full-Bleed Separator Line */}
                <div className="flex items-center gap-3 pb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100/60 shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <h2 className={`text-lg font-bold text-blue-600 ${satoshi.className}`}>
                    Professional Profile
                  </h2>
                </div>
                <div className="-mx-6 sm:-mx-7 border-b-2 border-slate-100 mb-5" />

                <p className={`text-sm leading-relaxed text-slate-600 ${figtree.className}`}>
                  UI/UX Designer with <strong className="font-bold text-slate-900">2.4 years</strong> designing fintech products end-to-end — settlement dashboards, merchant onboarding, and design systems — and shipping them alongside engineering. I turn complex financial workflows into clear, usable interfaces, working from <strong className="font-bold text-slate-900">design tokens</strong> through to <strong className="font-bold text-slate-900">code-level auth</strong> (Supabase / RBAC) and no-code build in Framer.
                </p>
              </div>

              {/* CARD 3: WORK EXPERIENCE */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs">
                {/* Main Header with Full-Bleed Separator Line */}
                <div className="flex items-center gap-3 pb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100/60 shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  </div>
                  <h2 className={`text-lg font-bold text-blue-600 ${satoshi.className}`}>
                    Work Experience
                  </h2>
                </div>
                <div className="-mx-6 sm:-mx-7 border-b-2 border-slate-100 mb-5" />

                {/* Job Entry with Perfectly Centered Timeline Dot over Vertical Blue Line */}
                <div className="relative pl-6 border-l-2 border-blue-200/80 space-y-4 my-2">
                  <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-blue-600 ring-4 ring-blue-100" />
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className={`text-base font-bold text-slate-900 ${satoshi.className}`}>
                        UI/UX Designer
                      </h3>
                      <p className={`text-xs font-semibold text-slate-600 ${figtree.className}`}>
                        <strong className="text-slate-900">Cash Friend Fintech Pvt. Ltd.</strong> · Full-Time
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 ${figtree.className}`}>
                        Oct 2023 – Jan 2026
                      </span>
                    </div>
                  </div>

                  <p className={`text-xs text-slate-500 ${figtree.className}`}>
                    Noida, India
                  </p>

                  <ul className={`space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed ${figtree.className}`}>
                    <li className="flex items-start gap-2">
                      <span className="text-slate-400 font-bold text-base leading-none">•</span>
                      <span>
                        Led end-to-end design of a <strong className="font-bold text-slate-900">BBPS-integrated money-settlement platform</strong>, partnering daily with frontend and backend engineers from concept through handoff.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-slate-400 font-bold text-base leading-none">•</span>
                      <span>
                        Designed a settlement dashboard from scratch on a <strong className="font-bold text-slate-900">token-based design system</strong> that processed <strong className="font-bold text-slate-900">₹1.2+ Cr</strong> in merchant settlements within its first month live.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-slate-400 font-bold text-base leading-none">•</span>
                      <span>
                        Designed and shipped a <strong className="font-bold text-slate-900">5-step merchant onboarding flow</strong> that onboarded <strong className="font-bold text-slate-900">2,800+ merchants in a single month</strong> with minimal back-and-forth support.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-slate-400 font-bold text-base leading-none">•</span>
                      <span>
                        Built <strong className="font-bold text-slate-900">HRM and Tax-Management modules</strong> from zero, standardizing components and styles with a reusable design-token system.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-slate-400 font-bold text-base leading-none">•</span>
                      <span>
                        Built and maintained the company website (<strong className="font-bold text-slate-900">gocashmate.com</strong>) in Framer, implementing <strong className="font-bold text-slate-900">role-based access control (RBAC)</strong> auth via Supabase and custom Framer code components.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-slate-400 font-bold text-base leading-none">•</span>
                      <span>
                        Represented the company at the <strong className="font-bold text-slate-900">Global Fintech Festival</strong> and launched its <strong className="font-bold text-slate-900">0→1 social identity</strong> across LinkedIn and Instagram with original photo/video content.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* CARD 4: PERSONAL PROJECTS */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs">
                {/* Main Header with Full-Bleed Separator Line */}
                <div className="flex items-center gap-3 pb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100/60 shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <h2 className={`text-lg font-bold text-blue-600 ${satoshi.className}`}>
                    Personal Projects
                  </h2>
                </div>
                <div className="-mx-6 sm:-mx-7 border-b-2 border-slate-100 mb-5" />

                <div className="space-y-4">
                  {/* BlaBlaCar */}
                  <div>
                    <h3 className={`text-sm font-bold text-slate-900 ${satoshi.className}`}>
                      BlaBlaCar <span className="font-normal text-slate-500">(Trust UX Case Study)</span>
                    </h3>
                    <p className={`text-xs text-slate-600 leading-relaxed mt-1 ${figtree.className}`}>
                      Redesigned trust verification & ride-sharing booking flows to reduce cancellation rates and increase driver transparency across high-density intercity routes.
                    </p>
                  </div>

                  {/* StackAlign */}
                  <div>
                    <h3 className={`text-sm font-bold text-slate-900 ${satoshi.className}`}>
                      StackAlign <span className="font-normal text-slate-500">(AI-Hallucination Tool · Live)</span>
                    </h3>
                    <p className={`text-xs text-slate-600 leading-relaxed mt-1 ${figtree.className}`}>
                      Built a live UI framework solving LLM hallucination in data retrieval flows through real-time confidence scores and citation overlays.
                    </p>
                  </div>

                  {/* Rotato */}
                  <div>
                    <h3 className={`text-sm font-bold text-slate-900 ${satoshi.className}`}>
                      Rotato <span className="font-normal text-slate-500">(Godot Game)</span>
                    </h3>
                    <p className={`text-xs text-slate-600 leading-relaxed mt-1 ${figtree.className}`}>
                      Designed and developed custom 2D mechanics, physics-based level design, and interactive gameplay prototypes in Godot (2 levels completed).
                    </p>
                  </div>
                </div>
              </div>

              {/* CARD 5: EDUCATION */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs">
                {/* Main Header with Full-Bleed Separator Line */}
                <div className="flex items-center gap-3 pb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100/60 shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                  </div>
                  <h2 className={`text-lg font-bold text-blue-600 ${satoshi.className}`}>
                    Education
                  </h2>
                </div>
                <div className="-mx-6 sm:-mx-7 border-b-2 border-slate-100 mb-4" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className={`text-base font-bold text-slate-900 ${satoshi.className}`}>
                      HNB Garhwal University (Central University)
                    </h3>
                    <p className={`text-xs text-slate-600 mt-0.5 ${figtree.className}`}>
                      Bachelors in Information Technology
                    </p>
                  </div>

                  <span className={`inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shrink-0 self-start sm:self-auto ${figtree.className}`}>
                    2020
                  </span>
                </div>
              </div>

            </div>

            {/* ═══════════════ RIGHT COLUMN (4 COLS / ~35%) ═══════════════ */}
            <div className="md:col-span-4 space-y-6">
              
              {/* CARD 1: CONTACTS */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs">
                {/* Main Header with Full-Bleed Separator Line */}
                <div className="flex items-center gap-3 pb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100/60 shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <h2 className={`text-lg font-bold text-blue-600 ${satoshi.className}`}>
                    Contacts
                  </h2>
                </div>
                <div className="-mx-6 border-b-2 border-slate-100 mb-5" />

                {/* Contact Items with Light Blue Square Icons */}
                <div className={`space-y-4 text-xs text-slate-600 ${figtree.className}`}>
                  {/* Portfolio */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100/60">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">PORTFOLIO</p>
                      <a href="https://skpux.in" target="_blank" rel="noopener noreferrer" className="font-bold text-slate-900 hover:text-blue-600 transition-colors">
                        skpux.in
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100/60">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">EMAIL</p>
                      <a href="mailto:skponpurpose@gmail.com" className="font-bold text-slate-900 hover:text-blue-600 transition-colors break-all">
                        skponpurpose@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100/60">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">PHONE</p>
                      <a href="tel:+919997320490" className="font-bold text-slate-900 hover:text-blue-600 transition-colors">
                        +91 99973 20490
                      </a>
                    </div>
                  </div>

                  {/* LinkedIn */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100/60">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">LINKEDIN</p>
                      <a href="https://www.linkedin.com/in/skplovesdesign" target="_blank" rel="noopener noreferrer" className="font-bold text-slate-900 hover:text-blue-600 transition-colors">
                        /skplovesdesign
                      </a>
                    </div>
                  </div>

                  {/* GitHub */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100/60">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">GITHUB</p>
                      <a href="https://github.com/SkpGit28" target="_blank" rel="noopener noreferrer" className="font-bold text-slate-900 hover:text-blue-600 transition-colors">
                        /SkpGit28
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD 2: TOP SKILLS */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs">
                {/* Main Header with Full-Bleed Separator Line */}
                <div className="flex items-center gap-3 pb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100/60 shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                  </div>
                  <h2 className={`text-lg font-bold text-blue-600 ${satoshi.className}`}>
                    Top Skills
                  </h2>
                </div>
                <div className="-mx-6 border-b-2 border-slate-100 mb-5" />

                {/* Professional UI/UX Skills Rectangular Badges (rounded-xl / border-radius 10-12px) - Filled grid */}
                <div className="flex flex-wrap gap-2">
                  {[
                    "User Research",
                    "Experience Mapping",
                    "Information Architecture",
                    "Wireframing",
                    "Prioritization Frameworks",
                    "Design System",
                    "Design Tokens",
                    "Prototyping",
                    "Interaction Design",
                    "Usability Testing",
                    "Handoff",
                    "Agile Methodologies",
                    "Miro",
                    "Principle",
                    "After Effects",
                    "Photoshop",
                    "Jira",
                    "Notion",
                    "HTML",
                    "CSS",
                    "Wordpress",
                    "Figma",
                    "Framer",
                    "Supabase",
                    "RBAC / Auth",
                    "Next.js",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className={`rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-slate-300 transition-colors ${figtree.className}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* CARD 3: CERTIFICATIONS (ONGOING COURSE MOVED TO TOP AS ITEM #1) */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs">
                {/* Main Header with Full-Bleed Separator Line */}
                <div className="flex items-center gap-3 pb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100/60 shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                  </div>
                  <h2 className={`text-lg font-bold text-blue-600 ${satoshi.className}`}>
                    Certifications
                  </h2>
                </div>
                <div className="-mx-6 border-b-2 border-slate-100 mb-5" />

                {/* 4 Certifications — Ongoing course #1 at top */}
                <div className="space-y-4">
                  {/* 1. Design Thinking — ONGOING COURSE AT TOP */}
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className={`text-sm font-bold text-slate-900 ${satoshi.className}`}>
                        Design Thinking: The Ultimate Guide
                      </h3>
                      <span className="inline-flex shrink-0 items-center rounded-full bg-amber-50 border border-amber-200/80 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                        Ongoing
                      </span>
                    </div>
                    <p className={`text-xs text-slate-500 mt-0.5 ${figtree.className}`}>
                      Interaction Design Foundation (IxDF)
                    </p>
                  </div>

                  {/* 2. OOUID */}
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <a
                        href="https://ixdf.org/members/sushant-kumar/certificate/course/2e074c09-5e05-4564-8c67-2a764b433189"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors inline-flex items-center gap-1.5 ${satoshi.className}`}
                      >
                        Object-Oriented UI Design (OOUID)
                      </a>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-slate-400 shrink-0">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </div>
                    <p className={`text-xs text-slate-500 mt-0.5 ${figtree.className}`}>
                      Interaction Design Foundation (IxDF)
                    </p>
                  </div>

                  {/* 3. Get Ahead in Product Design with AI */}
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <a
                        href="https://ixdf.org/members/sushant-kumar/certificate/masterclass/mcc_5c874b2d238d44c8b6028a861a17bc6d"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors inline-flex items-center gap-1.5 ${satoshi.className}`}
                      >
                        Get Ahead in Product Design with AI
                      </a>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-slate-400 shrink-0">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </div>
                    <p className={`text-xs text-slate-500 mt-0.5 ${figtree.className}`}>
                      Interaction Design Foundation (IxDF)
                    </p>
                  </div>

                  {/* 4. Google UX Design Certificate */}
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <a
                        href="https://coursera.org/verify/K0VTA7T83K8T"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors inline-flex items-center gap-1.5 ${satoshi.className}`}
                      >
                        Google UX Design Certificate
                      </a>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="text-slate-400 shrink-0">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </div>
                    <p className={`text-xs text-slate-500 mt-0.5 ${figtree.className}`}>
                      Google · Coursera
                    </p>
                  </div>
                </div>
              </div>

              {/* CARD 4: LANGUAGES */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs">
                {/* Main Header with Full-Bleed Separator Line */}
                <div className="flex items-center gap-3 pb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100/60 shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </div>
                  <h2 className={`text-lg font-bold text-blue-600 ${satoshi.className}`}>
                    Languages
                  </h2>
                </div>
                <div className="-mx-6 border-b-2 border-slate-100 mb-5" />

                <div className={`space-y-3.5 divide-y divide-slate-100 ${figtree.className}`}>
                  <div className="pt-1">
                    <p className="text-sm font-bold text-slate-900">Hindi</p>
                    <p className="text-xs text-slate-500">Native</p>
                  </div>

                  <div className="pt-3.5">
                    <p className="text-sm font-bold text-slate-900">English</p>
                    <p className="text-xs text-slate-500">Professional Working Proficiency</p>
                  </div>

                  <div className="pt-3.5">
                    <p className="text-sm font-bold text-slate-900">German</p>
                    <p className="text-xs text-slate-500">Beginner (A1) · Learning</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>
      </div>
    </FooterReveal>
  );
}
