// app/components/Projects.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
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
  const prefersReducedMotion = useReducedMotion();

  const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

  const SECTION_DUR = prefersReducedMotion ? 0 : 0.8;
  const ROW_DUR = prefersReducedMotion ? 0 : 0.75;
  const DISTANCE = prefersReducedMotion ? 0 : 48;
  const STAGGER_IN = prefersReducedMotion ? 0 : 0.18;

  // Section (title + list) fade/slide once
  const sectionVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: SECTION_DUR,
        ease: EASE,
      },
    },
  } as const;

  // List: just used to stagger children once
  const listVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: STAGGER_IN,
        when: "beforeChildren",
      },
    },
  } as const;

  // Each row: right → left once
  const rowVariants = {
    hidden: { opacity: 0, x: DISTANCE },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: ROW_DUR, ease: EASE },
    },
  } as const;

  return (
    <motion.section
  id="projects"
  variants={sectionVariants}
  initial="hidden"
  animate="visible"   // 👈 triggers immediately on mount
>

      <Container>
        <div className="py-18">
          <h2 className="mb-10 text-3xl md:text-[18px] font-light text-gray-400 tracking-wider">
            MY RECENT WORK
          </h2>

          {/* top border + between-items divider */}
          <motion.ol
  className="divide-y divide-white/10 border-t border-white/10"
  variants={listVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.35 }}  // 👈 only once when entering view
>

            {projects.map((p) => (
              <motion.li key={p.id} variants={rowVariants}>
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
                        "max-h-0 overflow-hidden opacity-0 mt-0",
                        "group-hover:max-h-[720px] group-hover:opacity-100 group-hover:mt-6",
                        openId === p.id ? "max-h-[720px] opacity-100 mt-6" : "",
                        "transition-[max-height,opacity,margin] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]",
                      ].join(" ")}
                    >
                      {/* Make right image match left text height */}
                      <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] md:items-stretch gap-6 md:gap-10">
                        {/* Left: details */}
                        <div className="text-white/80">
                          {p.kicker && (
                            <p className="mb-2 text-sm uppercase tracking-[0.12em] text-white/50">
                              {p.kicker}
                            </p>
                          )}
                          <p className="max-w-prose leading-relaxed">{p.summary}</p>

                          {p.href && (
                            <a
                              href={p.href}
                              className="mt-4 inline-flex items-center gap-2 text-white/80 hover:text-white underline decoration-white/30 decoration-2 underline-offset-4 transition-colors"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Read case study
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                className="-mr-1"
                              >
                                <path
                                  d="M7 17L17 7M17 7H9M17 7v8"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </a>
                          )}
                        </div>

                        {/* Right: image */}
                        <div
                          className={[
                            "relative h-full min-h-[160px] md:min-h-[200px] rounded-xl overflow-hidden",
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
                            priority={p.id === 1}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </Container>
    </motion.section>
  );
}
