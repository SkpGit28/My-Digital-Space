"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Container from "./container";

/* One-time underline that runs on mount, but keeps your hover underline class.
   It draws a small line under the word and retracts, once per page load. */
function UnderlineOnce({
  children,
  color,
  delay = 0,
  onEnter,
  onLeave,
}: {
  children: React.ReactNode;
  color: string;
  delay?: number;
  onEnter?: () => void;
  onLeave?: () => void;
}) {
  return (
    <span
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="relative inline-block u-underline cursor-pointer"
      style={{ ["--uclr" as any]: color }}
    >
      {children}
      
      {/* One-time sweep underline */}
     <motion.span
  aria-hidden
  className="pointer-events-none absolute left-0 bottom-0 w-full origin-left"
  style={{ 
    backgroundColor: color,
    height: "10%",
  }}
  initial={{ scaleX: 0, opacity: 1 }}
  animate={{ scaleX: [0, 1, 1, 0], opacity: [1, 1, 1, 1] }}
  transition={{
    delay,
    duration: 0.8,
    times: [0, 0.2, 0.7, 1],
    ease: "easeInOut",
  }}
/>






    </span>
  );
}



export default function Hero() {
  const [slide, setSlide] = useState(0); // 0=base, 1=design, 2=build, 3=act
  const prefersReducedMotion = useReducedMotion();

  // Shared easing + durations
  const ease = [0.16, 1, 0.3, 1] as const;
  const dur = prefersReducedMotion ? 0 : 0.6;

  return (
    <section
      id="top"
      className="min-h-[72vh] flex flex-col items-center justify-center text-center"
    >
      <Container>
        {/* AVATAR (first to appear) */}
        <motion.div
          className="relative w-[152px] h-[152px] mx-auto rounded-full overflow-hidden shadow-lg bg-[#70B7FF]"
          initial={{ opacity: 0, y: 8, filter: prefersReducedMotion ? "none" : "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: dur, ease, delay: 0.05 }}
        >
          <Image
            src="/avatars/hey-me.svg"
            alt="Base pose"
            width={152}
            height={152}
            className={`absolute inset-0 transition-opacity duration-500 ${slide === 0 ? "opacity-100" : "opacity-0"}`}
            priority
          />
          <Image
            src="/avatars/design.svg"
            alt="Design pose"
            width={152}
            height={152}
            className={`absolute inset-0 transition-opacity duration-500 ${slide === 1 ? "opacity-100" : "opacity-0"}`}
          />
          <Image
            src="/avatars/build.svg"
            alt="Build pose"
            width={152}
            height={152}
            className={`absolute inset-0 transition-opacity duration-500 ${slide === 2 ? "opacity-100" : "opacity-0"}`}
          />
          <Image
            src="/avatars/act.svg"
            alt="Act pose"
            width={152}
            height={152}
            className={`absolute inset-0 transition-opacity duration-500 ${slide === 3 ? "opacity-100" : "opacity-0"}`}
          />
        </motion.div>

        {/* H1 (second) */}
        <motion.h1
          className="mt-5 text-gray-400 text-2xl md:text-[56px] font-light leading-tight tracking-tight"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur, ease, delay: prefersReducedMotion ? 0 : 0.65 }}
        >
          Hi, I’m <span className="text-white/90 font-semibold">Sushant</span>
        </motion.h1>

        {/* H2 (third) */}
        <motion.h2
          className="mt-2 text-white text-xl md:text-[56px] font-semibold leading-tight tracking-tight"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur, ease, delay: prefersReducedMotion ? 0 : 0.95 }}
        >
          <span className="text-gray-400 font-light">I like{" "}</span>

        <UnderlineOnce
          color="#10B981"
          delay={prefersReducedMotion ? 0 : 1.10}  // one-time sweep shortly after H2 appears
          onEnter={() => setSlide(1)}
          onLeave={() => setSlide(0)}
        >
          designing
        </UnderlineOnce>


          ,{" "}

          <UnderlineOnce
            color="#FACC15"
            delay={prefersReducedMotion ? 0 : 1.28}
            onEnter={() => setSlide(2)}
            onLeave={() => setSlide(0)}
          >
            building
          </UnderlineOnce>

          <span className="text-gray-400 font-light">, &{" "}</span>

          <UnderlineOnce
            color="#3B82F6"
            delay={prefersReducedMotion ? 0 : 1.46}
            onEnter={() => setSlide(3)}
            onLeave={() => setSlide(0)}
          >
            acting
          </UnderlineOnce>
        </motion.h2>

        {/* Body (last) */}
        <motion.p
          className="mt-4 text-lg md:text-[20px] font-semibold text-gray-400"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur, ease, delay: prefersReducedMotion ? 0 : 1.25 }}
        >
          Product Designer with 2+ years of experience in designing clarity and trust in fintech. Based in Noida. Currently @{" "}
          <a
            href="https://payfi.co.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline"
          >
            Payfi
          </a>
        </motion.p>
      </Container>
    </section>
  );
}
