"use client";

import Image from "next/image";
import Container from "./container";
import { useState } from "react";

const techStack = [
  { name: "Figma", logo: "/techstack/Figma.svg", description: "Design HQ" },
  { name: "Framer", logo: "/techstack/Framer.svg", description: "Instant Publish" },
  { name: "ChatGPT", logo: "/techstack/GPT.svg", description: "My Senior" },
  { name: "Notion", logo: "/techstack/Notion.svg", description: "Second Brain" },
  { name: "Refero", logo: "/techstack/Refero.svg", description: "Ideas" },
  { name: "Spotify", logo: "/techstack/Spotify.svg", description: "Focus Mode" },
  { name: "Supabase", logo: "/techstack/Supabase.svg", description: "AI Backend" },
  { name: "VS Code", logo: "/techstack/VS.svg", description: "Dev Desk" },
];

export default function TechStack() {
  // Split into 2 rows of 4
  const row1 = techStack.slice(0, 4);
  const row2 = techStack.slice(4, 8);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const TechTile = ({ tech }: { tech: typeof techStack[0] }) => (
    <div
      key={tech.name}
      className="relative group"
      onMouseEnter={() => setHoveredTech(tech.name)}
      onMouseLeave={() => setHoveredTech(null)}
    >
      <div className="flex items-center justify-center p-4 rounded-lg bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 transition-all duration-200 cursor-pointer">
        <Image
          src={tech.logo}
          alt={tech.name}
          width={48}
          height={48}
          className="w-12 h-12"
        />
      </div>

      {/* Tooltip - Description Only */}
      {hoveredTech === tech.name && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-md text-xs md:text-sm whitespace-nowrap text-white/90 pointer-events-none animate-fade-in">
          {tech.description}
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white/10" />
        </div>
      )}
    </div>
  );

  return (
    <section className="py-12 md:py-16">
      <Container>
        <h2 className="mb-10 text-3xl md:text-[18px] font-light text-gray-400 tracking-wider">
          MY TOOLKIT
        </h2>
        
        {/* Row 1 */}
        <div className="grid grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
          {row1.map((tech) => (
            <TechTile key={tech.name} tech={tech} />
          ))}
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-4 gap-6 md:gap-8">
          {row2.map((tech) => (
            <TechTile key={tech.name} tech={tech} />
          ))}
        </div>
      </Container>
    </section>
  );
}
