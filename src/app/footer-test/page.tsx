"use client";

/**
 * FOOTER TEST — ideas #1 + #4 combined, isolated on /footer-test.
 * #1 Giant name: Fraunces variable — each letter's weight (and a hint of
 *    brand-blue ink) swells with cursor proximity.
 * #4 Live status bar: pulsing dot + rotating status lines + live Noida clock.
 * Background: whisper-strength tri-color wash (sky/iris/peach) breathing slowly.
 */

import { Fraunces } from "next/font/google";
import { useEffect, useRef, useState } from "react";

const fraunces = Fraunces({ subsets: ["latin"], weight: "variable" });

const NAME = "SUSHANT";
const STATUSES = [
  "Currently: designing at Payfi",
  "Probably: tweaking a Figma variable",
  "Definitely: on my 3rd chai",
  "Always: open to good problems",
];

const LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/skplovesdesign" },
  { label: "GitHub", href: "https://github.com/SkpGit28" },
  { label: "Resume", href: "/resume.pdf" },
  { label: "Email", href: "mailto:skponpurpose@gmail.com" },
];

function useNoidaTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function useRotatingStatus() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % STATUSES.length);
        setVisible(true);
      }, 350);
    }, 4000);
    return () => clearInterval(id);
  }, []);
  return { text: STATUSES[idx], visible };
}

export default function FooterTestPage() {
  const time = useNoidaTime();
  const { text: status, visible } = useRotatingStatus();
  const nameRef = useRef<HTMLDivElement>(null);
  const raf = useRef<number>(0);

  useEffect(() => {
    const el = nameRef.current;
    if (!el) return;
    const letters = [...el.querySelectorAll<HTMLSpanElement>("[data-letter]")];
    const MAX_DIST = 240;

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        for (const l of letters) {
          const r = l.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const d = Math.hypot(e.clientX - cx, e.clientY - cy);
          const t = Math.max(0, 1 - d / MAX_DIST);
          const wght = Math.round(340 + t * 560);
          l.style.fontVariationSettings = `"wght" ${wght}`;
          l.style.color = t > 0.55 ? "#0284C7" : "#16181d";
        }
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf.current);
      for (const l of letters) {
        l.style.fontVariationSettings = `"wght" 340`;
        l.style.color = "#16181d";
      }
    };
    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* stand-in page content so you scroll INTO the footer like on the real site */}
      <div className="flex flex-1 items-center justify-center pt-40 pb-24">
        <p className="text-text-secondary">page content, scroll down to the footer ↓</p>
      </div>

      {/* ══════════════ THE FOOTER ══════════════ */}
      <footer className="relative overflow-hidden border-t border-black/10">
        {/* breathing tri-color wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 animate-[footerBreathe_9s_ease-in-out_infinite_alternate]"
          style={{
            background: [
              "radial-gradient(560px 320px at 8% 100%, rgba(255,181,138,0.14), transparent 62%)",
              "radial-gradient(640px 360px at 92% 100%, rgba(167,139,250,0.12), transparent 62%)",
              "radial-gradient(900px 420px at 50% 120%, rgba(112,183,255,0.16), transparent 65%)",
              "#ffffff",
            ].join(", "),
          }}
        />
        <style>{`@keyframes footerBreathe { from { opacity: .55; } to { opacity: 1; } }`}</style>

        <div className="mx-auto w-full max-w-[1200px] px-6">
          {/* ── #4 live status bar ── */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/[0.07] py-4">
            <span className="flex items-center gap-2.5 text-[14px] font-medium text-text-secondary">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <span
                className="transition-opacity duration-300"
                style={{ opacity: visible ? 1 : 0 }}
              >
                {status}
              </span>
            </span>
            <span className="text-[14px] font-medium tabular-nums text-text-secondary">
              Noida, India · {time || "…"} IST
            </span>
          </div>

          {/* ── #1 giant reactive name ── */}
          <div
            ref={nameRef}
            className={`${fraunces.className} flex select-none justify-between py-6 leading-none`}
            aria-label="Sushant"
          >
            {NAME.split("").map((ch, i) => (
              <span
                key={i}
                data-letter
                className="text-[17.5vw] transition-[font-variation-settings,color] duration-150 ease-out md:text-[11.5rem]"
                style={{ fontVariationSettings: '"wght" 340', color: "#16181d" }}
              >
                {ch}
              </span>
            ))}
          </div>

          {/* ── bottom row ── */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-black/[0.07] py-5">
            <span className="text-[13px] text-text-secondary">
              © 2026 SKP. Designed with clarity, built with trust.
            </span>
            <div className="flex items-center gap-6">
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-[14px] font-medium text-text-secondary transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              ))}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-[14px] font-medium text-primary transition-opacity hover:opacity-75"
              >
                Back to top ↑
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
