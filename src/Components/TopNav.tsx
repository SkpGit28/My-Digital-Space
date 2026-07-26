"use client";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import "slot-text/style.css";
import { slotText, type SlotTextController } from "slot-text";

const navLinks = [
  { id: "work",     label: "Work",     href: "/",         icon: "work" },
  { id: "skp",      label: "SKP",      href: "/skp",      icon: "skp" },
  { id: "kalakari", label: "Kalakari", href: "/kalakari", icon: "kalakari" },
  { id: "resume",   label: "Resume",   href: "/CV_SKP.pdf", icon: "resume" },
];

/** Imperative hook — gives us a ref callback + a trigger fn for slot-text rolls. */
function useSlotRoll(label: string) {
  const controllerRef = useRef<SlotTextController | null>(null);
  const elRef = useRef<HTMLSpanElement | null>(null);

  const setRef = useCallback(
    (node: HTMLSpanElement | null) => {
      // Teardown previous controller
      if (controllerRef.current) {
        controllerRef.current.destroy();
        controllerRef.current = null;
      }
      elRef.current = node;
      if (node) {
        controllerRef.current = slotText(node, label, {
          duration: 280,
          stagger: 35,
          bounce: 0.45,
          skipUnchanged: false,
        });
      }
    },
    [label],
  );

  const roll = useCallback((direction: "up" | "down" = "up") => {
    controllerRef.current?.set(label, {
      direction,
      duration: 280,
      stagger: 35,
      bounce: 0.45,
      skipUnchanged: false,
    });
  }, [label]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      controllerRef.current?.destroy();
      controllerRef.current = null;
    };
  }, []);

  return { setRef, roll };
}

export default function TopNav(): ReactNode {
  const pathname = usePathname();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("work");
  const [isReady, setIsReady] = useState(false);

  // One slot-roll hook per nav item
  const work     = useSlotRoll("Work");
  const skp      = useSlotRoll("SKP");
  const kalakari = useSlotRoll("Kalakari");
  const resume   = useSlotRoll("Resume");
  const slotMap: Record<string, ReturnType<typeof useSlotRoll>> = {
    work, skp, kalakari, resume,
  };

  // Scroll section tracking for homepage
  useEffect(() => {
    if (pathname !== "/") {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing nav highlight to the route on mount is intentional
      if (pathname === "/kalakari") setActiveSection("kalakari");
      setIsReady(true);
      return;
    }

    // Default to work section on main page mount
    setActiveSection("work");
    setIsReady(true);

    const sectionIds = ["hero", "work", "contact"];
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // Keep work highlighted throughout the home/work viewport
            if (id === "hero" || id === "work") setActiveSection("work");
          }
        },
        {
          rootMargin: "-25% 0px -55% 0px", // Trigger when section occupies the upper-mid viewport
          threshold: 0.05,
        }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((o) => {
        if (o) o.observer.unobserve(o.el);
      });
    };
  }, [pathname]);

  const activeId = pathname === "/skp" ? "skp" : pathname === "/kalakari" ? "kalakari" : activeSection;

  // Colour tokens mapped to design system variables
  const COLOR_ACTIVE   = "var(--text-heading)"; // heading color for active / hovered
  const COLOR_INACTIVE = "var(--text-body)";    // body color for inactive / resting

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none flex justify-center" style={{ transform: "translateZ(0)", paddingTop: 'max(1.5rem, env(safe-area-inset-top))' }}>
      <LayoutGroup>
        <nav
          className="pointer-events-auto relative flex items-center justify-center overflow-hidden py-1.5 px-2"
          style={{
            height: "46px",
            borderRadius: "9999px",
            gap: "4px",
            // Liquid-glass shell: strong blur + saturation boost is what reads
            // as "glass bending the light behind it" rather than flat frosting.
            backdropFilter: "blur(24px) saturate(1.9) brightness(1.06)",
            WebkitBackdropFilter: "blur(24px) saturate(1.9) brightness(1.06)",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.30) 55%, rgba(255,255,255,0.42) 100%)",
            border: "1px solid rgba(255,255,255,0.45)",
            boxShadow: [
              "inset 0 1px 1px rgba(255,255,255,0.95)", // top rim — the specular edge light bends into
              "inset 0 -1px 1.5px rgba(0,0,0,0.06)",     // bottom inner shadow — gives the glass visible thickness
              "inset 0 0 0 1px rgba(255,255,255,0.12)",  // faint secondary inner edge
              "0 14px 34px -10px rgba(0,0,0,0.20)",      // soft elevation shadow, lifts it off the page
              "0 2px 8px rgba(0,0,0,0.07)",               // tight contact shadow
            ].join(", "),
          }}
        >
          {/* Specular sheen — bright arc hugging the top inner edge, fading to
              nothing by mid-height. This is the single biggest "glass" cue. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 100%)",
              mixBlendMode: "overlay",
            }}
          />

          {navLinks.map((link) => {
            const isActive = link.id === activeId;
            const isHovered = link.id === hoveredId;
            const slot = slotMap[link.id];
            const isResume = link.id === "resume";

            return (
              <Link
                key={link.id}
                href={link.href}
                aria-label={link.label}
                target={isResume ? "_blank" : undefined}
                rel={isResume ? "noopener noreferrer" : undefined}
                download={isResume ? "CV_SKP.pdf" : undefined}
                onClick={(e) => {
                  track("nav_click", { label: link.label, href: link.href });
                  if (link.id === "work" && pathname === "/") {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                onMouseEnter={() => {
                  setHoveredId(link.id);
                  slot.roll("up");
                }}
                onMouseLeave={() => {
                  setHoveredId(null);
                  slot.roll("down");
                }}
                className="relative h-full flex items-center justify-center"
              >
                <div className="relative flex h-8 w-auto px-3 md:w-[112px] md:px-0 items-center justify-center rounded-full outline-none [-webkit-tap-highlight-color:transparent]">
                  {/* Sliding active background pill */}
                  {isReady && isActive && (
                    <motion.div
                      layoutId="active-nav-pill"
                      className="absolute inset-0 rounded-full bg-bg-subtle z-0"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}

                  <span
                    className="relative z-10 flex items-center gap-[6px] font-sans text-[14px] font-medium transition-colors duration-150"
                    style={{ color: isActive || isHovered ? COLOR_ACTIVE : COLOR_INACTIVE }}
                  >
                    {/* Icon — slot-roll in opposite direction of text */}
                    <span className="relative h-4 w-4 flex-shrink-0 overflow-hidden">
                      <span
                        className="absolute inset-x-0 top-0 flex flex-col transition-transform duration-[280ms]"
                        style={{
                          transform: isHovered ? "translateY(0%)" : "translateY(-50%)",
                          transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1.15)", // Subtle bounce to match text slot
                        }}
                      >
                        {/* Top slot (Hovered): Always Active (Fill) icon */}
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                          <Image src={`/menu-icons/${link.icon}-fill.svg`} alt="" width={16} height={16} aria-hidden />
                        </span>
                        {/* Bottom slot (Resting): Fill if active, else Stroke */}
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                          <Image src={`/menu-icons/${link.icon}-${isActive ? "fill" : "stroke"}.svg`} alt="" width={16} height={16} aria-hidden />
                        </span>
                      </span>
                    </span>
                    <span className="hidden md:block" ref={slot.setRef} />
                  </span>
                </div>
              </Link>
            );
          })}
        </nav>
      </LayoutGroup>
    </header>
  );
}
