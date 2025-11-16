"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll percentage
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const scrollPercent = windowHeight > 0 ? (scrolled / windowHeight) * 100 : 0;
      setProgress(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Modern minimal circular progress at bottom right */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        title="Scroll to top"
        className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/15 hover:border-white/30 flex items-center justify-center pointer-events-auto cursor-pointer transition-all duration-300 hover:from-white/10 hover:to-white/15 group shadow-xl"
      >
        {/* SVG circular progress */}
        <svg className="absolute w-full h-full" viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
          {/* Background circle - minimal */}
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1.5"
          />
          
          {/* Progress circle - animated */}
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="url(#modernGradient)"
            strokeWidth="2"
            strokeDasharray={`${(Math.PI * 84 * progress) / 100} ${Math.PI * 84}`}
            strokeLinecap="round"
            className="transition-all duration-500"
            style={{ filter: "drop-shadow(0 0 8px rgba(112, 183, 255, 0.4))" }}
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
          className="w-7 h-7 text-white/80 relative z-10 group-hover:text-white transition-colors duration-300"
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
