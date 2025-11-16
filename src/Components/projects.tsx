// app/components/Projects.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import Container from "./container";

type Project = {
  id: number;
  title: string;
  kicker?: string;
  summary: string;
  href?: string;
  img: string; // /public path
};

const projects: Project[] = [
  {
    id: 1,
    title: "From zero to launch: building a 100% AI-led platform",
    kicker: "Product • UX • Systems",
    summary:
      "Shipped an MVP without writing code. I explored how far AI could take the product lifecycle—from research to v1.",
    img: "/projects/p1.png",
    href: "#p1",
  },
  {
    id: 2,
    title: "Improving the Design System: Adoption & docs – part 1",
    kicker: "Design System • Docs",
    summary:
      "A pragmatic rollout plan that balanced velocity with governance—clear tokens, usage rules, and migration paths.",
    img: "/projects/p2.png",
    href: "#p2",
  },
  {
    id: 3,
    title: "Challenges of a designer in an early-stage startup",
    kicker: "Process • Collaboration",
    summary:
      "Where process meets speed: patterns that helped us ship fast without losing product quality.",
    img: "/projects/p3.png",
    href: "#p3",
  },
];

export default function Projects() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <section id="projects">
      <Container>
        <div className="py-12">
        <h2 className="mb-10 text-3xl md:text-[18px] font-light text-gray-400 tracking-wider">
          MY RECENT WORK
        </h2>

        <ol className="divide-y divide-white/10">
          {projects.map((p, i) => (
            <li key={p.id}>
              {/* Row wrapper: hover on desktop, click/tap toggle on mobile */}
              <article
                className="group grid grid-cols-[72px_1fr] items-start gap-x-6 py-8 cursor-pointer"
                onMouseEnter={() => setOpenId(p.id)}
                onMouseLeave={() => setOpenId(null)}
                onClick={() => setOpenId((cur) => (cur === p.id ? null : p.id))}
                tabIndex={0}
                onFocus={() => setOpenId(p.id)}
                onBlur={() => setOpenId(null)}
                aria-expanded={openId === p.id}
              >
                {/* Index */}
                <div className="text-4xl md:text-6xl font-light text-white">
                  {String(p.id).padStart(2, "0")}
                </div>

                {/* Content + reveal panel + image */}
                <div className="relative">
                  {/* Title (always visible) */}
                  <div className="pr-0 md:pr-64">
                    <h3 className="text-2xl md:text-4xl font-normal text-white leading-snug">
                      {p.title}
                    </h3>
                  </div>

                  {/* Reveal panel (opens from bottom) */}
                 <div
  className={[
    // collapsed by default
    "max-h-0 overflow-hidden opacity-0 mt-0",
    // open on hover or when selected
    "group-hover:max-h-[360px] group-hover:opacity-100 group-hover:mt-6",
    openId === p.id ? "max-h-[360px] opacity-100 mt-6" : "",
    // animate height + opacity + margin
    "transition-[max-height,opacity,margin] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]",
  ].join(" ")}
>
  <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-6 md:gap-10">
    {/* Left: details */}
    <div className="text-white/80">
      {p.kicker && (
        <p className="mb-2 text-sm uppercase tracking-[0.12em] text-white/50">
          {p.kicker}
        </p>
      )}
      <p className="max-w-prose leading-relaxed">
        {p.summary}
      </p>

      {p.href && (
        <a
          href={p.href}
          className="mt-4 inline-flex items-center gap-2 text-white/80 hover:text-white underline decoration-white/30 decoration-2 underline-offset-4 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read case study
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="-mr-1">
            <path d="M7 17L17 7M17 7H9M17 7v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      )}
    </div>

    {/* Right: image (fade/slide) */}
    <div
      className={[
        "relative h-[160px] md:h-[200px] rounded-xl overflow-hidden",
        "bg-white/5 ring-1 ring-white/10",
        "translate-y-2 opacity-0",
        "group-hover:translate-y-0 group-hover:opacity-100",
        openId === p.id ? "translate-y-0 opacity-100" : "",
        "transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]",
      ].join(" ")}
    >
      <Image
        src={p.img}
        alt={p.title}
        fill
        className="object-cover"
        sizes="(min-width: 768px) 280px, 100vw"
      />
    </div>
  </div>
</div>

                </div>
              </article>
            </li>
          ))}
        </ol>
        </div>
      </Container>
    </section>
  );
}
