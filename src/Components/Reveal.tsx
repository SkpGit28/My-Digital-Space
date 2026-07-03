"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

export default function Reveal({
  children,
  delay = 0,
  className = "",
  id,
  style,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR, render a standard div for SEO crawlers and layout preservation.
  // This ensures search engines can fully index content immediately.
  if (!mounted) {
    return (
      <div className={className} id={id} style={style}>
        {children}
      </div>
    );
  }

  // If the user has "Reduce Motion" enabled, disable scroll animations.
  if (shouldReduceMotion) {
    return (
      <div className={className} id={id} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      id={id}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.65,
        ease: [0.215, 0.61, 0.355, 1], // easeOutCubic (premium smooth decelerated motion)
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
}
