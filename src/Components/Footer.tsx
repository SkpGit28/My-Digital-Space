"use client";
import Container from "./container";
import { motion } from "framer-motion"; // 1. Import motion

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // 2. Define the animation properties
  const fadeAnimation = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  };

  const baseTransition = {
    duration: 0.5,
    ease: "easeInOut",
  };

  return (
    <footer className="border-t border-white/10 py-12 md:py-16 bg-gray-950 dark:bg-black">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          {/* 3. Animate the "open to work" block */}
          <motion.div
            className="space-y-2"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <p className="text-sm font-medium text-white/90">
                Starting December, I’m open to new design opportunities.
              </p>
            </div>
            <p className="text-sm text-white/60">Full-time roles only</p>
          </motion.div>

          {/* 4. Animate the "Let's build" button */}
         <a
  href="mailto:skponpurpose@gmail.com"
  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#70B7FF] to-[#4D9EFF] text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:opacity-90"
>
            Let&apos;s build
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </div>

        {/* 5. Animate the bottom links/copyright section */}

          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6">
              <a
                href="https://www.linkedin.com/in/skplovesdesign"
                className="text-sm text-white/60 hover:text-white"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/SkpGit28"
                className="text-sm text-white/60 hover:text-white"
              >
                GitHub
              </a>
              <a
                href="/resume.pdf"
                download
                className="text-sm text-white/60 hover:text-white"
              >
                Resume
              </a>
            </div>
            <div className="text-sm text-white/50">
              © {currentYear} Sushant Kumar. Crafted with GitHub Copilot 😁
            </div>
          </div>
       
      </Container>
    </footer>
  );
}