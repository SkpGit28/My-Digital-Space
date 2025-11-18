"use client";

import { motion, useReducedMotion } from "framer-motion";
import Container from "@/Components/container";
import Footer from "@/Components/Footer";

export default function AboutPage() {
  const prefersReducedMotion = useReducedMotion();
  const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
  const SECTION_DUR = prefersReducedMotion ? 0 : 0.8;

  // Heading animation
  const headingVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: SECTION_DUR,
        ease: EASE,
      },
    },
  } as const;

  // Content animation
  const contentVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: SECTION_DUR,
        ease: EASE,
        delay: 0.2,
      },
    },
  } as const;

  return (
    <>
      <main id="main" className="min-h-screen">
        <Container>
          <div className="py-16 md:py-24">
            {/* Hero Heading */}
            <motion.h1
              variants={headingVariants}
              initial="hidden"
              animate="visible"
              className="text-5xl md:text-[64px] font-bold text-gray-900 dark:text-white text-center mb-16 md:mb-20 leading-tight tracking-tight"
            >
              About Me
            </motion.h1>

            {/* About Content */}
            <motion.section
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              className="max-w-3xl mx-auto"
            >
              <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                  Hi! I'm <strong className="text-gray-900 dark:text-white">Sushant Kumar</strong>, a UI/UX Designer passionate about creating 
                  intuitive and delightful digital experiences. I specialize in product design, design systems, 
                  and bringing thoughtful solutions to complex problems.
                </p>

                <p>
                  With a strong focus on user research, interface design, and accessibility, I've worked on 
                  projects spanning fintech, healthcare, e-commerce, and SaaS platforms. My approach combines 
                  strategic thinking with attention to detail, ensuring every pixel serves a purpose.
                </p>

                <p>
                  When I'm not designing, you'll find me exploring new design trends, contributing to open-source 
                  projects, or sharing insights about UX and product design with the community.
                </p>

                <div className="pt-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    What I Do
                  </h2>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 dark:text-blue-400 mt-1">→</span>
                      <span>UI/UX Design & Product Strategy</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 dark:text-blue-400 mt-1">→</span>
                      <span>Design Systems & Component Libraries</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 dark:text-blue-400 mt-1">→</span>
                      <span>User Research & Usability Testing</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 dark:text-blue-400 mt-1">→</span>
                      <span>Prototyping & Interaction Design</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Let's Connect
                  </h2>
                  <p>
                    I'm always open to discussing new projects, creative ideas, or opportunities to be part of 
                    your vision. Feel free to reach out through email or connect with me on LinkedIn.
                  </p>
                </div>
              </div>
            </motion.section>

            <div className="h-20 md:h-24" />
          </div>
        </Container>
      </main>

      <Footer />
    </>
  );
}
