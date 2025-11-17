"use client";

import Image from "next/image";
import Container from "./container";
import PortalTooltip from "./PortalTooltip";
import { useMemo, useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

type Tech = {
  name: string;
  logo: string;
  description: string;
};

const techStack: Tech[] = [
  { name: "Design HQ", logo: "/techstack/Figma.svg", description: "Design HQ" },
  { name: "Instant Publish", logo: "/techstack/Framer.svg", description: "Instant Publish" },
  { name: "My Senior", logo: "/techstack/GPT.svg", description: "My Senior" },
  { name: "Second Brain", logo: "/techstack/Notion.svg", description: "Second Brain" },
  { name: "Ideas", logo: "/techstack/Refero.svg", description: "Ideas" },
  { name: "Focus Mode", logo: "/techstack/Spotify.svg", description: "Focus Mode" },
  { name: "AI Backend", logo: "/techstack/Supabase.svg", description: "AI Backend" },
  { name: "Dev Desk", logo: "/techstack/VS.svg", description: "Dev Desk" },
];

type TechItem = Tech & { uid: string };

export default function TechStack() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Trigger animation when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 } // Trigger when 10% of section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const tiles: TechItem[] = useMemo(
    () => [...techStack, ...techStack].map((t, i) => ({ ...t, uid: `${t.name}-${i}` })),
    []
  );

  function TechTile({ item }: { item: TechItem }) {
    const ref = useRef<HTMLDivElement>(null);
    const isOpen = hoveredId === item.uid;

    return (
      <div
        ref={ref}
        className="relative flex-shrink-0 flex items-center justify-center cursor-pointer outline-none"
        onMouseEnter={() => setHoveredId(item.uid)}
        onMouseLeave={() => setHoveredId(null)}
        onFocus={() => setHoveredId(item.uid)}
        onBlur={() => setHoveredId(null)}
        tabIndex={0}
        aria-label={item.name}
      >
        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
          <Image
            src={item.logo}
            alt={item.name}
            width={48}
            height={48}
            className="w-12 h-12"
            priority={false}
          />
        </motion.div>

        <PortalTooltip anchorRef={ref} open={isOpen} offsetY={12}>
          {item.name}
        </PortalTooltip>
      </div>
    );
  }

  return (
    <motion.section
      ref={sectionRef}
      className="py-12 md:py-16"
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Container>
        <h2 className="mb-10 text-3xl md:text-[18px] font-light text-gray-400 tracking-wider">
          MY TOOLKIT
        </h2>

        <div className="relative h-[88px] flex items-center overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-8 md:gap-12"
            animate={{ x: [0, -800] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {tiles.map((item) => (
              <TechTile key={item.uid} item={item} />
            ))}
          </motion.div>
        </div>
      </Container>
    </motion.section>
  );
}
