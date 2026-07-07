"use client";

/**
 * FOOTER TEST 2 — idea #2: gravity playground, isolated on /footer-test-2.
 * Skill chips drop into the footer with real physics (matter.js) when it
 * scrolls into view. Grab and throw them — they collide, tumble, settle.
 * Chip colors reuse the hero badge tokens (blue/green/purple + amber/neutral).
 */

import Matter from "matter-js";
import { useEffect, useRef, useState } from "react";

type ChipDef = { label: string; bg: string; fg: string };

const CHIPS: ChipDef[] = [
  { label: "Designer", bg: "#e5f4ff", fg: "#0d99ff" },
  { label: "Builder", bg: "#e6f9f1", fg: "#1f9d5e" },
  { label: "Tinkerer", bg: "#f3ecfd", fg: "#a78bfa" },
  { label: "Figma", bg: "#f1f5f9", fg: "#334155" },
  { label: "Design Systems", bg: "#e5f4ff", fg: "#0d99ff" },
  { label: "Prototyping", bg: "#f3ecfd", fg: "#a78bfa" },
  { label: "Fintech UX", bg: "#e6f9f1", fg: "#1f9d5e" },
  { label: "Behavioral Design", bg: "#fff7e6", fg: "#b05c00" },
  { label: "Framer", bg: "#f1f5f9", fg: "#334155" },
  { label: "Notion", bg: "#fff7e6", fg: "#b05c00" },
  { label: "Clarity", bg: "#e5f4ff", fg: "#0d99ff" },
  { label: "Trust", bg: "#e6f9f1", fg: "#1f9d5e" },
];

const LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/skplovesdesign" },
  { label: "GitHub", href: "https://github.com/SkpGit28" },
  { label: "Resume", href: "/resume.pdf" },
  { label: "Email", href: "mailto:skponpurpose@gmail.com" },
];

export default function FooterTest2Page() {
  const arenaRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);
  const engineRef = useRef<Matter.Engine | null>(null);
  const bodiesRef = useRef<Matter.Body[]>([]);
  const [dropped, setDropped] = useState(false);

  const dropAll = () => {
    const arena = arenaRef.current;
    if (!arena || !engineRef.current) return;
    const W = arena.clientWidth;
    bodiesRef.current.forEach((b, i) => {
      Matter.Body.setPosition(b, {
        x: 60 + Math.random() * (W - 120),
        y: -80 - i * 55 - Math.random() * 40,
      });
      Matter.Body.setVelocity(b, { x: 0, y: 0 });
      Matter.Body.setAngularVelocity(b, (Math.random() - 0.5) * 0.15);
      Matter.Body.setAngle(b, (Math.random() - 0.5) * 0.5);
    });
  };

  useEffect(() => {
    const arena = arenaRef.current;
    if (!arena) return;

    const W = arena.clientWidth;
    const H = arena.clientHeight;

    const engine = Matter.Engine.create({ gravity: { x: 0, y: 1 } });
    engine.positionIterations = 10;
    engine.velocityIterations = 8;
    engineRef.current = engine;

    // walls: thick floor + sides (ceiling far above so chips can drop in)
    const opts = { isStatic: true, render: { visible: false } };
    Matter.Composite.add(engine.world, [
      Matter.Bodies.rectangle(W / 2, H + 100, W + 400, 200, opts),
      Matter.Bodies.rectangle(-100, H / 2 - 300, 200, H + 900, opts),
      Matter.Bodies.rectangle(W + 100, H / 2 - 300, 200, H + 900, opts),
    ]);

    // chip bodies from measured DOM sizes
    const bodies: Matter.Body[] = [];
    chipRefs.current.forEach((el, i) => {
      if (!el) return;
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const body = Matter.Bodies.rectangle(
        60 + Math.random() * (W - 120),
        -60 - i * 46,
        w,
        h,
        {
          chamfer: { radius: Math.min(16, h / 2 - 1) },
          restitution: 0.35,
          friction: 0.28,
          frictionAir: 0.012,
          density: 0.0022,
        }
      );
      Matter.Body.setAngle(body, (Math.random() - 0.5) * 0.5);
      bodies.push(body);
    });
    bodiesRef.current = bodies;
    Matter.Composite.add(engine.world, bodies);

    // grab & throw
    const mouse = Matter.Mouse.create(arena);
    const mc = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.18, render: { visible: false } },
    });
    // don't hijack page scroll
    const m = mouse as unknown as {
      element: HTMLElement;
      mousewheel: EventListener;
    };
    m.element.removeEventListener("wheel", m.mousewheel);
    Matter.Composite.add(engine.world, mc);

    // run only once footer is visible → the "drop-in" moment
    const runner = Matter.Runner.create();
    let raf = 0;
    const sync = () => {
      bodies.forEach((b, i) => {
        const el = chipRefs.current[i];
        if (!el) return;
        // rescue net: if a chip ever escapes, re-drop it from above
        if (b.position.y > H + 160 || b.position.x < -160 || b.position.x > W + 160) {
          Matter.Body.setPosition(b, { x: 60 + Math.random() * (W - 120), y: -80 });
          Matter.Body.setVelocity(b, { x: 0, y: 0 });
        }
        el.style.transform = `translate(${b.position.x - el.offsetWidth / 2}px, ${
          b.position.y - el.offsetHeight / 2
        }px) rotate(${b.angle}rad)`;
      });
      raf = requestAnimationFrame(sync);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          Matter.Runner.run(runner, engine);
          raf = requestAnimationFrame(sync);
          setDropped(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(arena);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="flex flex-1 items-center justify-center pt-40 pb-24">
        <p className="text-text-secondary">page content — scroll down to the footer ↓</p>
      </div>

      {/* ══════════════ THE FOOTER ══════════════ */}
      <footer className="border-t border-black/10">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          {/* header row */}
          <div className="flex items-center justify-between py-5">
            <span className="text-[14px] font-medium text-text-secondary">
              My toolkit — go ahead, toss it around
            </span>
            <button
              onClick={dropAll}
              disabled={!dropped}
              className="rounded-full border border-black/10 px-4 py-1.5 text-[13px] font-medium text-text-secondary transition-colors hover:border-black/25 hover:text-foreground disabled:opacity-40"
            >
              Drop again ↻
            </button>
          </div>

          {/* physics arena */}
          <div
            ref={arenaRef}
            className="relative h-[380px] cursor-grab select-none overflow-hidden rounded-2xl border border-black/[0.07] bg-[#fafbfc] active:cursor-grabbing"
            style={{ touchAction: "none" }}
          >
            {CHIPS.map((c, i) => (
              <div
                key={c.label}
                ref={(el) => {
                  chipRefs.current[i] = el;
                }}
                className="absolute top-0 left-0 inline-flex items-center rounded-full px-5 py-2.5 text-[15px] font-bold tracking-[-0.01em] will-change-transform"
                style={{
                  background: c.bg,
                  color: c.fg,
                  transform: "translate(-9999px,-9999px)",
                  boxShadow: "0 1px 2px rgba(16,24,40,.08)",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>

          {/* bottom row */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-5">
            <span className="text-[13px] text-text-secondary">
              © 2026 SKP — designed with clarity, built with trust.
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
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
