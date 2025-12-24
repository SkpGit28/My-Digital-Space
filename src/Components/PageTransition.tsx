"use client";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(true); // Start true for initial load
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    // Check if pathname actually changed (not just a re-render)
    if (prevPathnameRef.current !== pathname) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 500);
      prevPathnameRef.current = pathname;
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // Scroll to top on route change and initial load
  useEffect(() => {
    // Disable browser's automatic scroll restoration
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Force scroll to top
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {/* Blue screen overlay that descends from top - ON EVERY PAGE CHANGE */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            key={`overlay-${pathname}`}
            className="fixed inset-0 z-9999 origin-top pointer-events-none"
            style={{ backgroundColor: "#4D9EFF" }}
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: 0 }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        )}
      </AnimatePresence>

      {/* Page content - no animation wrapper, just render */}
      {children}
    </>
  );
}