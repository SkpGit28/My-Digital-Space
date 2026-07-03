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
import Ecosystem from "@/Components/Ecosystem";
import Outcome from "@/Components/Outcome";
import Footer from "@/Components/Footer";
import TextScramble from "@/Components/TextScramble";
import Reveal from "@/Components/Reveal";

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
                            Trust <span className="text-text-accent">&</span> Revenue
                        </motion.h1>
                        <motion.p
                            className="text-lg md:text-2xl text-white max-w-2xl mx-auto mb-12"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: dur, ease, delay: 0.2 }}
                        >
                            Processing ₹1.5Cr in Month 1st by prioritizing both business and user needs.
                        </motion.p>

                        {/* Mockup Image */}
                        <motion.div
                            className="relative w-full max-w-8xl mx-auto my-[-100px]"
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
                <div className="py-24">
                    <Reveal>
                        <Container>
                            <Receipt
                                id="8821-X9-FIN"
                                role="Product Designer"
                                roleSub="1 PM, 2 Devs"
                                duration="12 Weeks"
                                tools="Figma, ChatGPT, Lottie"
                                objective="Establish clear operational surfaces for payments, compliance, and monetization in a system used by both owners and delegated operators"
                            />
                        </Container>
                    </Reveal>
                </div>

                {/* Founder Intelligence Section */}
                <Reveal>
                    <section className="relative pt-24 pb-0 overflow-hidden">
                        <Container>
                            <div>
                                <div className="mb-12 relative flex">
                                    {/* Brand Vertical Line */}
                                    <div className="w-[4px] bg-brand-primary shrink-0" />

                                    <div className="pl-8">
                                        <h2 className="text-sm font-mono text-text-accent tracking-widest mb-2 uppercase">
                                            <TextScramble>SOURCE: CEO_INTEL_LOG_V4</TextScramble>
                                        </h2>
                                        <h3 className="text-3xl md:text-5xl font-bold mb-8 leading-tight tracking-tight">
                                            <span className="text-white">Leveraging Founder Intelligence</span><br />
                                            <span className="text-slate-500">over Generic Personas.</span>
                                        </h3>

                                        <div className="relative bg-elevated/80 p-8 rounded-xl border border-border-subtle max-w-6xl">
                                            {/* SVG Quote Icon */}
                                            <svg
                                                className="absolute top-6 left-6 text-slate-700 w-8 h-8 opacity-50"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                            >
                                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                            </svg>

                                            <p className="font-mono text-slate-300 pl-10 leading-relaxed italic text-lg">
                                                "This merchant network has tried multiple payment platforms over the last decade. What{' '}
                                                <span className="text-white bg-text-accent/20 px-2 py-0.5 rounded">
                                                    slows adoption isn't features, it's uncertainty around money and approvals.  Ten Years in this space makes a few things obvious—
                                                    merchants either care about when money lands or they care that nothing breaks.
                                                </span>{' '} Everything else is secondary."
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </section>
                </Reveal>

                {/* Archetypes Section */}
                <Reveal>
                    <section className="relative pt-12 pb-24">
                        <Container >
                            <div className="max-w-6xl mx-auto">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <ArchetypeCard
                                        title="The Daily Operator"
                                        archetype="STALL_OWNER"
                                        description="Runs a small business with tight cash cycles. Relies on predictable settlements to manage inventory, staff, and daily expenses. Decisions are practical and time-bound, with little margin for delay."
                                        quote="“I plan my next day based on when my money settles, not on reports or forecasts.”"
                                        driver="Cash Flow Certainty"
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
                                        description="The accountant or operations manager runs payments on behalf of the business owner. Their focus is not growth or experimentation, but keeping transactions, compliance, and settlements running smoothly without errors."
                                        quote="“I need to be confident everything is in order so payments don’t get delayed or questioned.”"
                                        driver="Operational Reliability"
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
                </Reveal>

                <Reveal><StrategyBridge /></Reveal>

                <Reveal><EvidenceLocker /></Reveal>

                <Reveal><ProfilePivot /></Reveal>

                <Reveal><AtomicDesign /></Reveal>
                <Reveal><TheEnvironment /></Reveal>
                
                {/* Figma Board Embed */}
                <Reveal>
                    <section className="py-24 max-w-6xl mx-auto relative overflow-hidden bg-background">
                        <Container>
                            <div className="flex justify-center">
                                <iframe
                                    style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
                                    width="1156"
                                    height="450"
                                    src="https://embed.figma.com/board/ORiTOi4B8WngVloxuRNs1K/FlowsOnly?node-id=0-1&embed-host=share"
                                    allowFullScreen
                                    className="rounded-2xl shadow-2xl"
                                />
                            </div>
                        </Container>
                    </section>
                </Reveal>
                
                <Reveal><Ecosystem /></Reveal>

                <Reveal><Outcome /></Reveal>
                <Footer />
            </div>

        </main>
    );
}
