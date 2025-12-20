"use client";

import Image from "next/image";
import Container from "@/Components/container";
import { motion, useReducedMotion } from "framer-motion";

export default function TrustRevenueCaseStudy() {
    const prefersReducedMotion = useReducedMotion();
    const ease = [0.16, 1, 0.3, 1] as const;
    const dur = prefersReducedMotion ? 0 : 0.6;

    return (
        <main className="relative">
            {/* Hero Section with Gradient Background - Sticky */}
            <section
                className="sticky top-0 min-h-screen -mt-32 pt-32 flex flex-col items-center justify-center overflow-hidden bg-dynamic-gradient z-10"
                style={{
                    "--color-start": "#2BACE0",
                    "--color-end": "#166C8F",
                } as React.CSSProperties}
            >
                <Container className="max-w-none">
                    <div className="relative z-10 text-center">
                        {/* Heading */}
                        <motion.h1
                            className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white mb-8 tracking-tight"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: dur, ease, delay: 0.1 }}
                        >
                            Trust <span className="text-orange-500">&lt;</span> Revenue
                        </motion.h1>

                        {/* Mockup Image */}
                        <motion.div
                            className="relative w-full max-w-5xl mx-auto my-[-40px]"
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: dur, ease, delay: 0.3 }}
                        >
                            <div className="relative aspect-[16/10] w-full">
                                <Image
                                    src="/mockup.svg"
                                    alt="Trust > Revenue Dashboard Mockup"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </motion.div>
                    </div>
                </Container>

                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/5 pointer-events-none" />
            </section>

            {/* Content Section - Scrolls over the hero */}
            <section className="relative z-20 py-20 rounded-t-3xl shadow-2xl bg-background">
                <Container>
                    <div className="max-w-4xl mx-auto space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
                                Overview
                            </h2>
                            <p className="text-lg text-gray-400 leading-relaxed mb-4">
                                This case study explores how we shipped an MVP without writing code,
                                leveraging AI to take the product lifecycle from research to version 1.
                            </p>
                            <p className="text-lg text-gray-400 leading-relaxed">
                                The challenge was to validate a product idea quickly and efficiently,
                                while maintaining a high standard of user experience and design quality.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                                The Problem
                            </h3>
                            <p className="text-lg text-gray-400 leading-relaxed">
                                In early-stage startups, building trust with users is often more critical
                                than generating revenue. We needed to validate this hypothesis through
                                rapid prototyping and user testing.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                                The Approach
                            </h3>
                            <p className="text-lg text-gray-400 leading-relaxed">
                                Using AI-powered tools and no-code platforms, we were able to design,
                                prototype, and test our product idea in a fraction of the time it would
                                have taken with traditional development approaches.
                            </p>
                        </motion.div>

                        {/* Add more content sections as needed */}
                        <div className="h-96"></div>
                    </div>
                </Container>
            </section>
        </main>
    );
}
