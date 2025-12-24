"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Container from '@/Components/container';

import TextScramble from "@/Components/TextScramble";

const AtomicDesign: React.FC = () => {
    return (
        <section className="py-24 relative overflow-hidden bg-background">
            <Container>
                <div className="flex flex-col gap-16">
                    {/* Narrative Section */}
                    <div className="relative flex max-w-5xl">
                        {/* Brand Vertical Line */}
                        <div className="w-[4px] bg-[#2BACE0] shrink-0" />

                        <div className="pl-8">
                            <h2 className="text-sm font-mono text-text-accent tracking-widest mb-2 uppercase">
                                <TextScramble>STORY_03 // BRAND_GUIDELINES</TextScramble>
                            </h2>
                            <h3 className="text-3xl md:text-5xl font-bold mb-4 text-white tracking-tight">
                                Brand Guidelines
                            </h3>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                Typography creates hierarchy and trust. We chose two typefaces that balance professionalism with approachability.
                            </p>
                        </div>
                    </div>

                    {/* Two Cards Side by Side */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Typography Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="bg-elevated border border-border-subtle rounded-[2rem] p-10"
                        >
                            <h4 className="text-text-accent font-mono text-[10px] tracking-widest uppercase mb-8">
                                TYPOGRAPHY
                            </h4>

                            {/* Axiforma - Heading Font */}
                            <div className="mb-10 pb-6 border-b border-border-subtle relative">
                                {/* Large Aa Specimen */}
                                <div className="absolute top-4 right-0 text-[120px] font-bold opacity-10" style={{ fontFamily: 'Axiforma, sans-serif' }}>
                                    Aa
                                </div>

                                <p className="text-[32px] font-bold text-white mb-3" style={{ fontFamily: 'Axiforma, sans-serif' }}>
                                    Axiforma
                                </p>
                                <p className="text-slate-500 text-sm font-mono mb-4">
                                    HEADING TYPEFACE
                                </p>
                                <div className="flex items-center gap-4">
                                    <span className="text-slate-400 text-sm" style={{ fontFamily: 'Axiforma, sans-serif', fontWeight: 400 }}>
                                        Regular
                                    </span>
                                    <span className="text-slate-300 text-sm" style={{ fontFamily: 'Axiforma, sans-serif', fontWeight: 600 }}>
                                        Semi-Bold
                                    </span>
                                    <span className="text-white text-sm" style={{ fontFamily: 'Axiforma, sans-serif', fontWeight: 700 }}>
                                        Bold
                                    </span>
                                </div>
                            </div>

                            {/* Plus Jakarta Sans - Body Font */}
                            <div className="relative">
                                {/* Large Aa Specimen */}
                                <div className="absolute top-4 right-0 text-[120px] font-bold opacity-10" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                                    Aa
                                </div>

                                <p className="text-[32px] font-bold text-white mb-3" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                                    Plus Jakarta Sans
                                </p>
                                <p className="text-slate-500 text-sm font-mono mb-4">
                                    BODY TYPEFACE
                                </p>
                                <div className="flex items-center gap-4">
                                    <span className="text-slate-400 text-sm" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 400 }}>
                                        Regular
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Color Palette Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="bg-elevated border border-border-subtle rounded-[2rem] p-10"
                        >
                            <h4 className="text-text-accent font-mono text-[10px] tracking-widest uppercase mb-8">
                                COLOR PALETTE
                            </h4>

                            <div className="grid grid-cols-3 gap-6">
                                {/* Primary Colors */}
                                <div className="space-y-4">
                                    <h5 className="text-slate-500 text-xs font-mono uppercase tracking-wider mb-4">Primary</h5>
                                    <div className="space-y-3">
                                        <div className="flex flex-col gap-2">
                                            <div className="w-full h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#166C8F' }}>
                                                <span className="text-white text-xs font-mono font-semibold">--color-primary</span>
                                            </div>
                                            <span className="text-slate-400 text-xs font-mono">#166C8F</span>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="w-full h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#125B73' }}>
                                                <span className="text-white text-xs font-mono font-semibold">--color-primary-700</span>
                                            </div>
                                            <span className="text-slate-400 text-xs font-mono">#125B73</span>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="w-full h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#6FA9C9' }}>
                                                <span className="text-white text-xs font-mono font-semibold">--color-primary-300</span>
                                            </div>
                                            <span className="text-slate-400 text-xs font-mono">#6FA9C9</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Secondary Colors */}
                                <div className="space-y-4">
                                    <h5 className="text-slate-500 text-xs font-mono uppercase tracking-wider mb-4">Secondary</h5>
                                    <div className="space-y-3">
                                        <div className="flex flex-col gap-2">
                                            <div className="w-full h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#10B981' }}>
                                                <span className="text-white text-xs font-mono font-semibold">--color-success</span>
                                            </div>
                                            <span className="text-slate-400 text-xs font-mono">#10B981</span>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="w-full h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F59E0B' }}>
                                                <span className="text-white text-xs font-mono font-semibold">--color-warning</span>
                                            </div>
                                            <span className="text-slate-400 text-xs font-mono">#F59E0B</span>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="w-full h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#EF4444' }}>
                                                <span className="text-white text-xs font-mono font-semibold">--color-danger</span>
                                            </div>
                                            <span className="text-slate-400 text-xs font-mono">#EF4444</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Neutral Colors */}
                                <div className="space-y-4">
                                    <h5 className="text-slate-500 text-xs font-mono uppercase tracking-wider mb-4">Neutral</h5>
                                    <div className="space-y-3">
                                        <div className="flex flex-col gap-2">
                                            <div className="w-full h-12 rounded-lg border border-border-subtle flex items-center justify-center" style={{ backgroundColor: '#FFFFFF' }}>
                                                <span className="text-slate-900 text-xs font-mono font-semibold">--color-surface</span>
                                            </div>
                                            <span className="text-slate-400 text-xs font-mono">#FFFFFF</span>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="w-full h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#8AA7A5' }}>
                                                <span className="text-white text-xs font-mono font-semibold">--color-text-muted</span>
                                            </div>
                                            <span className="text-slate-400 text-xs font-mono">#8AA7A5</span>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="w-full h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#0F1724' }}>
                                                <span className="text-white text-xs font-mono font-semibold">--color-bg</span>
                                            </div>
                                            <span className="text-slate-400 text-xs font-mono">#0F1724</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default AtomicDesign;
