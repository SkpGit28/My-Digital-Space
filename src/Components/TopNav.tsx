"use client";
import { motion, LayoutGroup, useMotionValue, useMotionTemplate } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { useState } from "react";
import type { ReactNode } from "react";

const navLinks = [
  { id: "home",    label: "Home",    href: "/" },
  { id: "work",    label: "Work",    href: "/work" },
  { id: "skp",     label: "SKP",     href: "/about" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export default function TopNav(): ReactNode {
  const pathname = usePathname();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isHoveringNav, setIsHoveringNav] = useState(false);

  // Motion values for the spotlight (viewport / fixed coordinates)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const activeLink = navLinks.find(
    (link) =>
      pathname === link.href ||
      (link.href !== "/" && pathname.startsWith(link.href))
  );
  const activeId = activeLink?.id || null;

  const getItemWidth = (itemId: string) => {
    const activeWidth = 96;
    let baseWidth = 66;

    if (itemId === activeId) {
      baseWidth = activeWidth;
    } else {
      switch (itemId) {
        case "home":    baseWidth = 66; break;
        case "work":    baseWidth = 66; break;
        case "skp":     baseWidth = 58; break;
        case "contact": baseWidth = 80; break;
        default:        baseWidth = 66;
      }
    }

    if (!isHoveringNav || !hoveredId) return baseWidth;

    // Fisheye: hovered item +24, others -8 (sum stays constant → no layout jitter)
    if (hoveredId === itemId) return baseWidth + 24;
    return baseWidth - 8;
  };

  const navSpring = {
    type: "spring" as const,
    stiffness: 200,
    damping: 25,
    mass: 1,
  };

  // Light-mode spotlight: dark ink cursor reveal across inactive labels
  const gradient = useMotionTemplate`radial-gradient(100px circle at ${mouseX}px ${mouseY}px, #111111 0%, #aaaaaa 50%, #aaaaaa 100%)`;

  // Colour tokens
  const COLOR_ACTIVE   = "#111111"; // near-black for active / focused label
  const COLOR_INACTIVE = "#999999"; // medium grey for resting inactive labels

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-6 pointer-events-none flex justify-center">
      <LayoutGroup>
        <motion.nav
          layout
          className="pointer-events-auto relative flex items-center justify-center overflow-hidden border backdrop-blur-lg py-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            ...navSpring,
            opacity: { duration: 0.8 },
            scale: { duration: 0.8 },
          }}
          style={{
            height: "58px",
            borderRadius: "9999px",
            // ── Light frosted-glass pill ──────────────────────────────────
            backgroundColor: "rgba(255, 255, 255, 0.72)",
            borderColor: "rgba(0, 0, 0, 0.09)",
            // ─────────────────────────────────────────────────────────────
            gap: "8px",
            paddingLeft: "8px",
            paddingRight: "8px",
          }}
          onMouseEnter={() => setIsHoveringNav(true)}
          onMouseLeave={() => {
            setIsHoveringNav(false);
            setHoveredId(null);
          }}
          onMouseMove={handleMouseMove}
        >
          {navLinks.map((link) => {
            const isActive = link.id === activeId;
            const itemWidth = getItemWidth(link.id);

            return (
              <Link
                key={link.id}
                href={link.href}
                onClick={() =>
                  track("nav_click", { label: link.label, href: link.href })
                }
                className="relative h-full"
              >
                <motion.div
                  layout
                  onMouseEnter={() => setHoveredId(link.id)}
                  className="relative flex h-full cursor-pointer items-center justify-center bg-transparent outline-none"
                  animate={{ width: itemWidth }}
                  transition={navSpring}
                  style={{ WebkitTapHighlightColor: "transparent" }}
                >
                  {/* Active pill — subtle dark tint on the light background */}
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-full z-0"
                      style={{ backgroundColor: "rgba(0, 0, 0, 0.07)" }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}

                  <motion.span
                    className="relative z-10"
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,

                      // Active: always dark.
                      // Inactive at rest: medium grey.
                      // While hovering nav: inactive labels go transparent so
                      // the dark-ink spotlight gradient shows through.
                      color: isHoveringNav
                        ? isActive
                          ? COLOR_ACTIVE
                          : "transparent"
                        : isActive
                        ? COLOR_ACTIVE
                        : COLOR_INACTIVE,

                      // Dark spotlight for inactive labels while cursor is on nav
                      backgroundImage:
                        isHoveringNav && !isActive ? gradient : "none",
                      backgroundSize: "100% 100%",
                      backgroundAttachment: "fixed",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",

                      WebkitTextFillColor: isHoveringNav
                        ? isActive
                          ? COLOR_ACTIVE
                          : "transparent"
                        : isActive
                        ? COLOR_ACTIVE
                        : COLOR_INACTIVE,
                    }}
                  >
                    {link.label}
                  </motion.span>
                </motion.div>
              </Link>
            );
          })}
        </motion.nav>
      </LayoutGroup>
    </header>
  );
}
