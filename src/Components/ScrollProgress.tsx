"use client";

import { useEffect, useState } from "react";
import { useLenis } from "./SmoothScrollProvider";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) {
      // Fallback for native scroll when Lenis is disabled (e.g. reduced motion)
      const handleScroll = () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        const scrollPercent = windowHeight > 0 ? (scrolled / windowHeight) * 100 : 0;
        setProgress(scrollPercent);
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      // Set initial progress
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }

    // Connect directly to Lenis scroll callback for real-time synchronization
    const handleLenisScroll = (e: { progress?: number; scroll: number; limit: number }) => {
      const progressVal = e.progress !== undefined ? e.progress * 100 : (e.scroll / e.limit) * 100;
      setProgress(progressVal);
    };

    lenis.on("scroll", handleLenisScroll);

    // Initial state
    const initialProgress = lenis.progress !== undefined ? lenis.progress * 100 : (lenis.scroll / lenis.limit) * 100;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- seeding from external scroll state on mount is intentional
    setProgress(initialProgress);

    return () => {
      lenis.off("scroll", handleLenisScroll);
    };
  }, [lenis]);

  return (
    <>
      {/* Modern minimal circular progress at bottom right */}
      <button
        onClick={() => {
          if (lenis) {
            lenis.scrollTo(0, { duration: 1.2 });
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
        title="Scroll to top"
        className={`fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-gradient-to-br from-black/5 to-black/10 backdrop-blur-xl border border-black/15 hover:border-black/30 flex items-center justify-center cursor-pointer transition-all duration-300 hover:from-black/10 hover:to-black/15 group shadow-xl ${
          progress > 2
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none translate-y-2"
        }`}
      >
        {/* SVG circular progress */}
        <svg className="absolute w-full h-full" viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
          {/* Background circle - minimal */}
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="rgba(0, 0, 0, 0.08)"
            strokeWidth="1.5"
          />
          
          {/* Progress circle - animated in real-time (no lag transition on stroke-dasharray) */}
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="url(#modernGradient)"
            strokeWidth="2"
            strokeDasharray={`${(Math.PI * 84 * progress) / 100} ${Math.PI * 84}`}
            strokeLinecap="round"
            style={{ 
              filter: "drop-shadow(0 0 8px rgba(112, 183, 255, 0.4))",
              transition: "none"
            }}
          />
          
          <defs>
            <linearGradient id="modernGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="1" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="1" />
            </linearGradient>
          </defs>
        </svg>
 
        {/* Up chevron icon - centered */}
        <svg
          className="w-7 h-7 text-text-primary relative z-10 group-hover:text-foreground transition-colors duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 14l-7-7m0 0l-7 7"
          />
        </svg>
      </button>
    </>
  );
}
