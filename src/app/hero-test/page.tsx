"use client";

/**
 * HERO TEST — Sudeep-style centered hero, isolated on /hero-test.
 * Headline: Fraunces serif, 48px, three lines with inline avatar + icon chips.
 * Palette (anchored on brand blue #70B7FF):
 *   Sky #70B7FF · Iris #A78BFA · Peach #FFB58A — whisper-strength corner washes.
 */

import { Fraunces } from "next/font/google";
import Link from "next/link";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function HeroTestPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* ── Tri-color wash: Peach (top-left) · Iris (top-right) · Sky (bottom) ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: [
            "radial-gradient(640px 480px at 10% 12%, rgba(255,181,138,0.16), transparent 62%)",
            "radial-gradient(720px 520px at 92% 10%, rgba(167,139,250,0.14), transparent 62%)",
            "radial-gradient(900px 640px at 50% 105%, rgba(112,183,255,0.18), transparent 65%)",
            "#FCFCFD",
          ].join(", "),
        }}
      />

      <section className="mx-auto flex w-full max-w-[1000px] flex-col items-center px-6 pt-56 pb-24 text-center">
        {/* ── Headline — Fraunces 48px, inline avatar + chips ── */}
        <h1
          className={`${fraunces.className} text-[48px] font-medium leading-[1.22] tracking-[-0.01em] text-foreground`}
        >
          {/* Line 1 */}
          <span className="block">
            <span className="text-text-secondary">Hello, this is</span>{" "}
            Sushant Kumar{" "}
            <span
              aria-hidden
              className="mx-1 inline-block h-[52px] w-[52px] translate-y-2 rounded-2xl bg-black/[0.08] ring-1 ring-black/10"
            />
          </span>

          {/* Line 2 */}
          <span className="block">
            A product designer{" "}
            <span className="mx-1 inline-flex translate-y-2 items-center gap-1.5 align-baseline">
              <span
                aria-hidden
                className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-[#1E1E1E] shadow-md"
              >
                {/* Figma-style mark */}
                <svg width="20" height="30" viewBox="0 0 20 30" fill="none" aria-hidden>
                  <path d="M5 0h5v10H5a5 5 0 1 1 0-10Z" fill="#F24E1E" />
                  <path d="M10 0h5a5 5 0 1 1 0 10h-5V0Z" fill="#FF7262" />
                  <path d="M10 10h5a5 5 0 1 1-5 5v-5Z" fill="#1ABCFE" />
                  <path d="M5 10h5v10H5a5 5 0 1 1 0-10Z" fill="#A259FF" />
                  <path d="M5 20h5v5a5 5 0 1 1-5-5Z" fill="#0ACF83" />
                </svg>
              </span>
              <span
                aria-hidden
                className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-[#7C5CE0] shadow-md"
              >
                <span className="font-sans text-[15px] font-extrabold text-white">2y+</span>
              </span>
            </span>{" "}
            builder,
          </span>

          {/* Line 3 */}
          <span className="block">
            prototyper <span className="text-text-secondary">&amp;</span> problem
            solver.
          </span>
        </h1>

        {/* ── Currently line ── */}
        <p className="mt-10 flex items-center gap-2 text-[19px] text-text-secondary">
          Currently designing at
          <a
            href="https://payfi.co.in"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-foreground transition-opacity hover:opacity-75"
          >
            @Payfi
          </a>
        </p>

        {/* ── View Resume — black pill ── */}
        <Link
          href="/resume.pdf"
          target="_blank"
          className="mt-14 inline-flex items-center rounded-full bg-[#111111] px-8 py-4 text-[17px] font-semibold text-white shadow-[0_10px_24px_rgba(0,0,0,0.25)] transition-transform hover:scale-[1.03]"
        >
          View Resume
        </Link>
      </section>
    </div>
  );
}
