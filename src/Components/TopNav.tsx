"use client";
import { motion, LayoutGroup, useMotionValue, useMotionTemplate } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import type { ReactNode } from "react";

const navLinks = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'work', label: 'Work', href: '/work' },
  { id: 'skp', label: 'SKP', href: '/about' },
  { id: 'contact', label: 'Contact', href: '#contact' }
];

export default function TopNav(): ReactNode {
  const pathname = usePathname();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isHoveringNav, setIsHoveringNav] = useState(false);

  // Motion Values for the spotlight (viewport coordinates)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    // We use client coordinates for fixed background attachment
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const activeLink = navLinks.find(
    (link) => pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
  );
  const activeId = activeLink?.id || null;

  const getItemWidth = (itemId: string) => {
    const activeWidth = 96; // Fixed uniform base width for the selected state
    let baseWidth = 66;

    if (itemId === activeId) {
      baseWidth = activeWidth;
    } else {
      switch (itemId) {
        case "home":
          baseWidth = 66;
          break;
        case "work":
          baseWidth = 66;
          break;
        case "skp":
          baseWidth = 58;
          break;
        case "contact":
          baseWidth = 80;
          break;
        default:
          baseWidth = 66;
      }
    }

    // If not hovering the navigation bar, return the base width
    if (!isHoveringNav || !hoveredId) {
      return baseWidth;
    }

    // Restore the fluid fisheye texture:
    // Hovered item expands by 24px. All other items contract by 8px.
    // This keeps the sum of all item widths constant (+24 - 8*3 = 0),
    // preventing any layout shifting or jitter in the outer navbar container.
    if (hoveredId === itemId) {
      return baseWidth + 24;
    }
    return baseWidth - 8;
  };

  // Fluid Spring Config
  const navSpring = {
    type: 'spring' as const,
    stiffness: 200, // Slightly faster response
    damping: 25,    // Increased damping to reduce oscillation/swing
    mass: 1,        // Standard mass for more predictable movement
  };

  // Gradient for the spotlight
  const gradient = useMotionTemplate`radial-gradient(100px circle at ${mouseX}px ${mouseY}px, #FFFFFF 0%, #888888 50%, #888888 100%)`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-6 pointer-events-none flex justify-center">
      <LayoutGroup>
        <motion.nav
          layout
          className="pointer-events-auto relative flex items-center justify-center overflow-hidden border bg-black/50 backdrop-blur-lg py-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            ...navSpring,
            opacity: { duration: 0.8 },
            scale: { duration: 0.8 },
          }}
          style={{
            height: '58px',
            borderRadius: '9999px',
            borderColor: 'rgba(255, 255, 255, 0.08)',
            gap: '8px',
            paddingLeft: '16px',
            paddingRight: '16px',
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
                onClick={() => track("nav_click", { label: link.label, href: link.href })}
                className="relative h-full"
              >
                <motion.div
                  layout
                  onMouseEnter={() => setHoveredId(link.id)}
                  className="relative flex h-full cursor-pointer items-center justify-center bg-transparent outline-none"
                  animate={{
                    width: itemWidth,
                  }}
                  transition={navSpring}
                  style={{
                    WebkitTapHighlightColor: 'transparent',
                  }}
                >
                  {/* Active Pill Background */}
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 bg-white/10 rounded-full z-0"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30
                      }}
                    />
                  )}

                  <motion.span
                    className="relative z-10 transition-colors duration-200"
                    style={{
                      fontSize: '14px',
                      fontWeight: 500,

                      // Default text color (dim grey) vs Transparent (for gradient reveal)
                      color: isHoveringNav ? (isActive ? '#FFFFFF' : 'transparent') : (isActive ? '#FFFFFF' : '#888888'),

                      // The Magic: Spotlight Gradient
                      backgroundImage: (isHoveringNav && !isActive) ? gradient : 'none',
                      backgroundSize: '100% 100%',

                      backgroundAttachment: 'fixed',

                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',

                      WebkitTextFillColor: isHoveringNav ? (isActive ? '#FFFFFF' : 'transparent') : (isActive ? '#FFFFFF' : '#888888'),
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

