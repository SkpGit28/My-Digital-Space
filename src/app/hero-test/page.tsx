"use client";

/**
 * HERO TEST — Vijay Verma-style hero, isolated on /hero-test.
 * Content width: 1000px. Uses the existing TopNav from layout.
 *
 * New 3-color combination (anchored on brand blue #70B7FF):
 *   Sky   #70B7FF → text #0284C7  (existing brand / primary)
 *   Iris  #A78BFA → text #7C5CE0  (new — soft violet)
 *   Peach #FFB58A → text #E0764A  (new — warm apricot)
 * Background = whisper-strength radial washes of all three on near-white.
 */

import { Newsreader } from "next/font/google";
import { Linkedin, Github, FileText, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const socials = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/skplovesdesign", Icon: Linkedin },
  { name: "GitHub", href: "https://github.com/SkpGit28", Icon: Github },
  { name: "Resume", href: "/resume.pdf", Icon: FileText },
  { name: "Email", href: "mailto:skponpurpose@gmail.com", Icon: Mail },
];

const wordmarks = ["Figma", "Framer", "Notion", "GitHub", "Payfi"];

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

      <section className="mx-auto w-full max-w-[1000px] px-6 pt-56 pb-16">
        {/* Social row */}
        <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
          {socials.map(({ name, href, Icon }) => (
            <a
              key={name}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group inline-flex items-center gap-2 text-[15px] font-semibold text-text-secondary transition-colors hover:text-foreground"
            >
              <Icon className="h-[18px] w-[18px] opacity-70 transition-opacity group-hover:opacity-100" />
              {name}
            </a>
          ))}
        </div>

        {/* Avatar + headline — one entity, 24px gap */}
        <div className="mt-7 flex items-center gap-6">
          <div
            aria-hidden
            className="h-10 w-10 shrink-0 rounded-full bg-black/[0.08] ring-1 ring-black/10"
          />
          <h1
            className={`${newsreader.className} text-[48px] leading-[1.08] tracking-[-0.01em] text-foreground`}
          >
            Hi, I&apos;m Sushant Kumar.
          </h1>
        </div>

        {/* Intro with tri-color inline accents */}
        <p className="mt-6 max-w-[860px] text-[24px] leading-[1.55] text-text-primary">
          Right now, I&apos;m designing{" "}
          <span className="font-semibold" style={{ color: "#7C5CE0" }}>
            clarity and trust
          </span>{" "}
          in fintech. I love both design and code. Alongside that, I spend time
          on{" "}
          <span className="font-semibold" style={{ color: "#E0764A" }}>
            case studies
          </span>
          , prototyping, and building small tools.
        </p>

        {/* Studio line */}
        <p className="mt-8 text-[19px] text-text-secondary md:text-[22px]">
          Building what I love at{" "}
          <a
            href="https://payfi.co.in"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold"
            style={{
              background:
                "linear-gradient(90deg, #0284C7 0%, #7C5CE0 55%, #E0764A 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            @Payfi
          </a>{" "}
          <span>fintech</span>
        </p>

        {/* Muted wordmark strip */}
        <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4 opacity-45 grayscale">
          {wordmarks.map((w) => (
            <span
              key={w}
              className="select-none text-[19px] font-bold tracking-tight text-text-secondary"
            >
              {w}
            </span>
          ))}
        </div>

        {/* Bottom strip — CURRENT PROJECTS / All Works */}
        <div className="mt-24 flex items-center justify-between border-t border-black/10 pt-6">
          <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-text-secondary">
            Current Projects
          </span>
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-primary transition-opacity hover:opacity-80"
          >
            All Works
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
