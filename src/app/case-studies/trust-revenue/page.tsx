"use client";

import Image from "next/image";
import Container from "@/Components/container";
import { motion, useReducedMotion } from "framer-motion";
import Receipt from "@/Components/Receipt";
import ArchetypeCard from "@/Components/ArchetypeCard";
import StrategyBridge from "@/Components/StrategyBridge";
import EvidenceLocker from "@/Components/EvidenceLocker";
import ProfilePivot from "@/Components/ProfilePivot";
import AtomicDesign from "@/Components/AtomicDesign";
import TheEnvironment from "@/Components/TheEnvironment";

export default function TrustRevenueCaseStudy() {
    const prefersReducedMotion = useReducedMotion();
    const ease = [0.16, 1, 0.3, 1] as const;
    const dur = prefersReducedMotion ? 0 : 0.6;

    return (
        <main
            className="relative min-h-screen z-0 bg-background"
            style={{
                "--project-accent": "#166C8F", // Global accent for this project
            } as React.CSSProperties}
        >

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
                            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: dur, ease, delay: 0.1 }}
                        >
                            Trust <span className="text-text-accent">Over</span> Revenue
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

            {/* Content Area - Starts after Hero */}
            <div className="relative z-20 bg-background">

                {/* Role & Collaboration Section (Horizontal Receipt) */}
                <div className="pt-24">
                    <Container>
                        <Receipt
                            id="8821-X9-FIN"
                            role="Product Designer"
                            roleSub="1 PM, 2 Devs"
                            duration="12 Weeks"
                            objective='"How do we make money without making users feel restricted or cheated?"'
                        />
                    </Container>
                </div>

                {/* Founder Intelligence Section */}
                <section className="relative pt-24 pb-12 overflow-hidden">
                    <Container>
                        <div>
                            <div className="mb-12 relative">
                                {/* Vertical Accent Line */}
                                <div className="absolute top-0 left-0 w-1 h-full bg-text-accent/50" />

                                <div className="pl-6">
                                    <h2 className="text-sm font-mono text-text-accent tracking-widest mb-2 uppercase">
                                        SOURCE: CEO_INTEL_LOG_V4
                                    </h2>
                                    <h3 className="text-3xl md:text-5xl font-bold mb-8 leading-tight tracking-tight">
                                        Leveraging <span className="text-white">Founder Intelligence</span><br />
                                        <span className="text-slate-500">over Generic Personas.</span>
                                    </h3>

                                    <div className="relative bg-elevated/80 p-8 rounded-xl border border-border-subtle max-w-4xl">
                                        {/* SVG Quote Icon */}
                                        <svg
                                            className="absolute top-6 left-6 text-slate-700 w-8 h-8 opacity-50"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                        </svg>

                                        <p className="font-mono text-slate-300 pl-10 leading-relaxed italic text-lg">
                                            "The CEO has 10+ years of relationships with these merchants. He told me,{' '}
                                            <span className="text-white bg-text-accent/20 px-2 py-0.5 rounded">
                                                'Don't design for the Owner. Owners don't log in.'
                                            </span>{' '}
                                            This insight split our user base into two extreme archetypes."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>
                </section>

                {/* Archetypes Section */}
                <section className="relative pt-0 pb-24">
                    <Container>
                        <div className="max-w-5xl mx-auto">
                            <div className="grid md:grid-cols-2 gap-8">
                                <ArchetypeCard
                                    title="The Daily Wager"
                                    archetype="STALL_OWNER"
                                    description="Lives day-to-day. Needs today's sales to buy tomorrow's stock."
                                    quote="If the money isn't in my bank by 6 PM, my shop doesn't open tomorrow."
                                    driver="HIGH URGENCY"
                                    themeColor="orange"
                                    icon={
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                        </svg>
                                    }
                                />
                                <ArchetypeCard
                                    title="The Proxy User"
                                    archetype="STAFF_MGR"
                                    description="The accountant uses the app, not the owner. They don't care about 'Growth'."
                                    quote="I just want to avoid getting fired for messing up Compliance."
                                    driver="RISK AVERSE"
                                    themeColor="blue"
                                    icon={
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                            <line x1="12" y1="8" x2="12" y2="12" />
                                            <line x1="12" y1="16" x2="12.01" y2="16" />
                                        </svg>
                                    }
                                />
                            </div>
                        </div>
                    </Container>
                </section>

                <StrategyBridge />

                <EvidenceLocker />

                <ProfilePivot />

                <AtomicDesign />

                <TheEnvironment />

                {/* Content Section */}
                <section className="relative py-20">
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
            </div>
        </main>
    );
}
