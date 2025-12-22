"use client";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import Container from "./container";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "SKP", href: "/about" },
  { label: "Contact", href: "#contact" },
];

export default function TopNav(): ReactNode {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-6 pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex justify-center w-full"
      >
        <nav
          aria-label="Main navigation"
          className={cn(
            "pointer-events-auto transition-all duration-300",
            "bg-black/80 backdrop-blur-xl p-1.5 rounded-full border border-white/10 shadow-2xl inline-block",
            isScrolled ? "translate-y-0" : "translate-y-0"
          )}
        >
          <ul className="flex items-center gap-4 relative z-0 px-2 py-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

              return (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
                      isActive ? "text-white" : "text-neutral-500 hover:text-neutral-300"
                    )}
                    onClick={() => track("nav_click", { label: link.label, href: link.href })}
                    style={{ WebkitTapHighlightColor: "transparent" }}
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

                    {/* Text Content */}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </motion.div>
    </header>
  );
}

