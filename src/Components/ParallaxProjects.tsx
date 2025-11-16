// components/ParallaxShowcase.tsx
"use client";

import Image from "next/image";
import { useEffect } from "react";
import Container from "./container"; // your shared max-width wrapper

const rows = [
  ["/projects/mob/App-1.png", "/projects/mob/App-2.png", "/projects/mob/App-3.png"],
  ["/projects/dashboard/d-1.png", "/projects/dashboard/d-2.png", "/projects/dashboard/d-3.png", "/projects/dashboard/d-4.png", "/projects/dashboard/d-5.png", "/projects/dashboard/d-6.png", "/projects/dashboard/d-7.png"],
  ["/projects/gocashmate/c-1.png", "/projects/gocashmate/c-2.png", "/projects/gocashmate/c-3.png"],
];

export default function ParallaxShowcase() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const rowsEls = Array.from(document.querySelectorAll<HTMLElement>(".pg-row"));
    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        rowsEls.forEach((el, i) => {
          const dir = i % 2 === 0 ? 1 : -1;
          const speed = 0.05 + i * 0.01; // adjust feel
          el.style.transform = `translateY(${(y * speed * dir) / 100}%)`;
        });
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section aria-label="Project visuals" className="py-12 md:py-16">
      <Container>
        <h2 className="text-2xl md:text-3xl font-semibold mb-8">Gallery</h2>
        <div className="space-y-6 md:space-y-8">
          {rows.map((row, i) => (
            <div
              key={i}
              className={`pg-row flex gap-4 md:gap-6 will-change-transform`}
            >
              {row.map((src, j) => (
                <div key={j} className="relative h-[140px] md:h-[190px] w-[100px] md:w-[130px] flex-shrink-0 rounded-xl overflow-hidden bg-white/5 ring-1 ring-white/10">
                  <Image
                    src={src}
                    alt={`Project ${i + 1} visual ${j + 1}`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 130px, 100px"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
