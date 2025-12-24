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

  const getItemPadding = (itemId: string, isActive: boolean) => {
    if (!isHoveringNav) {
      return 16;
    }
    if (hoveredId === itemId) {
      return 28; // Larger expansion for the hovered item
    }
    if (isActive) {
      return 16; // Active item stays at default size even if not hovered
    }
    return 10; // Neighbors shrink slightly
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
            gap: isHoveringNav ? '8px' : '6px',
            paddingLeft: isHoveringNav ? '24px' : '12px',
            paddingRight: isHoveringNav ? '24px' : '12px',
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
          }}
          onMouseEnter={() => setIsHoveringNav(true)}
          onMouseLeave={() => {
            setIsHoveringNav(false);
            setHoveredId(null);
          }}
          onMouseMove={handleMouseMove}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            const paddingX = getItemPadding(link.id, isActive);

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
                    paddingLeft: paddingX,
                    paddingRight: paddingX,
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

