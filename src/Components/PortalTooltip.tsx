"use client";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AnchorRefLike = { current: HTMLElement | null };

export default function PortalTooltip({
  anchorRef,
  open,
  children,
  offsetY = 8, // how far above the anchor
}: {
  anchorRef: AnchorRefLike;          // <— key change
  open: boolean;
  children: React.ReactNode;
  offsetY?: number;
}) {
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!open) return;
    let raf = 0;
    const update = () => {
      const el = anchorRef.current;
      if (el) {
        const r = el.getBoundingClientRect();
        setPos({
          top: r.top + window.scrollY - offsetY,      // above the icon
          left: r.left + window.scrollX + r.width / 2 // centered
        });
      }
      raf = requestAnimationFrame(update); // follow while marquee animates
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [open, anchorRef, offsetY]);

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
  role="tooltip"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.15 }}
  style={{
    position: "absolute",
    top: pos.top,
    left: pos.left,
    transform: "translate(-50%, -100%)", // <-- keeps it centered above the icon
    zIndex: 10000,
    pointerEvents: "none",
  }}
  className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-md text-xs text-white px-2 py-1 whitespace-nowrap"
>
  {children}
</motion.div>

      )}
    </AnimatePresence>,
    document.body
  );
}
