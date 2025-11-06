"use client";
import { ReactNode, useRef, useCallback, useState, useEffect } from "react";
import { track } from "@/lib/analytics";

export default function HorizontalRail({
  children,
  itemWidth = 320,
  gap = 16,
  ariaLabel,
}: {
  children: ReactNode;
  itemWidth?: number;
  gap?: number;
  ariaLabel: string;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = useCallback(() => {
    if (!railRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = railRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (rail) {
      const observer = new ResizeObserver(updateScrollButtons);
      observer.observe(rail);
      rail.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
      return () => {
        observer.disconnect();
        rail.removeEventListener("scroll", updateScrollButtons);
      };
    }
  }, [updateScrollButtons]);

  const scroll = useCallback((direction: "prev" | "next") => {
    const rail = railRef.current;
    if (!rail) return;

    const scrollAmount = (itemWidth + gap) * (direction === "next" ? 1 : -1);
    rail.scrollBy({ left: scrollAmount, behavior: "smooth" });
    track("rail_nav", { dir: direction });
  }, [itemWidth, gap]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const rail = railRef.current;
    if (!rail) return;

    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        scroll("prev");
        break;
      case "ArrowRight":
        e.preventDefault();
        scroll("next");
        break;
      case "Home":
        e.preventDefault();
        rail.scrollTo({ left: 0, behavior: "smooth" });
        break;
      case "End":
        e.preventDefault();
        rail.scrollTo({ left: rail.scrollWidth, behavior: "smooth" });
        break;
      case "PageUp":
        e.preventDefault();
        rail.scrollBy({ left: -rail.clientWidth, behavior: "smooth" });
        break;
      case "PageDown":
        e.preventDefault();
        rail.scrollBy({ left: rail.clientWidth, behavior: "smooth" });
        break;
    }
  }, [scroll]);

  return (
    <div className="relative group">
      <div
        ref={railRef}
        className="flex overflow-x-auto gap-4 py-2 snap-x snap-mandatory no-scrollbar"
        aria-label={ariaLabel}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {children}
      </div>

      {/* Scroll buttons */}
      <button
        onClick={() => scroll("prev")}
        aria-label="Previous items"
        aria-disabled={!canScrollLeft}
        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-card shadow-md flex items-center justify-center transition-opacity ${
          canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        ←
      </button>
      <button
        onClick={() => scroll("next")}
        aria-label="Next items"
        aria-disabled={!canScrollRight}
        className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-card shadow-md flex items-center justify-center transition-opacity ${
          canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        →
      </button>
    </div>
  );
}
