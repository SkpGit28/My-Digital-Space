"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Container from '@/Components/container';

const AtomicDesign: React.FC = () => {
    return (
        <section className="py-24 relative overflow-hidden bg-background">
            <Container>
                <div className="flex flex-col gap-16">
                    {/* Narrative Section */}
                    <div className="relative pl-6 max-w-3xl">
                        {/* Vertical Accent Line */}
                        <div className="absolute top-0 left-0 w-1 h-full bg-text-accent/50" />

                        <h2 className="text-sm font-mono text-text-accent tracking-widest mb-2 uppercase">
                            STORY_03 // BRAND_GUIDELINES
                        </h2>
                        <h3 className="text-3xl md:text-5xl font-bold mb-4 text-white tracking-tight">
                            Brand Guidelines
                        </h3>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Typography creates hierarchy and trust. We chose two typefaces that balance professionalism with approachability.
                        </p>
                    </div>

                    {/* Grid Layout */}
                    <div className="grid grid-cols-1 gap-6">
                        {/* Typography Block - Full Width */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="bg-elevated border border-border-subtle rounded-[2rem] overflow-hidden"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                {/* Left Half - Axiforma (Heading Font) */}
                                <div className="p-10 border-b md:border-b-0 md:border-r border-border-subtle">
                                    <h4 className="text-text-accent font-mono text-[10px] tracking-widest uppercase mb-6">
                                        HEADING TYPEFACE
                                    </h4>

                                    {/* Font Display */}
                                    <div className="mb-8">
                                        <p className="text-5xl font-bold text-white mb-2" style={{ fontFamily: 'Axiforma, sans-serif' }}>
                                            Axiforma
                                        </p>
                                    </div>

                                    {/* Weight Samples - Just Labels */}
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

                                {/* Right Half - Plus Jakarta Sans (Body Font) */}
                                <div className="p-10">
                                    <h4 className="text-text-accent font-mono text-[10px] tracking-widest uppercase mb-6">
                                        BODY TYPEFACE
                                    </h4>

                                    {/* Font Display */}
                                    <div className="mb-8">
                                        <p className="text-5xl font-bold text-white mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                                            Plus Jakarta Sans
                                        </p>
                                    </div>

                                    {/* Weight Samples - Just Labels */}
                                    <div className="flex items-center gap-4">
                                        <span className="text-slate-400 text-sm" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 400 }}>
                                            Regular
                                        </span>
                                        <span className="text-slate-300 text-sm" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 600 }}>
                                            Semi-Bold
                                        </span>
                                        <span className="text-white text-sm" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700 }}>
                                            Bold
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Bottom Row - 70/30 Split */}
                        <div className="grid grid-cols-1 md:grid-cols-[70%_30%] gap-6">
                            {/* Color Palette Block - 70% */}
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

                                <div className="grid grid-cols-3 gap-8">
                                    {/* Primary Colors */}
                                    <div className="space-y-4">
                                        <h5 className="text-slate-500 text-xs font-mono uppercase tracking-wider mb-4">Primary</h5>
                                        <div className="space-y-3">
                                            <div className="flex flex-col gap-2">
                                                <div className="w-full h-12 rounded-lg" style={{ backgroundColor: '#166C8F' }} />
                                                <span className="text-slate-400 text-xs font-mono">#166C8F</span>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <div className="w-full h-12 rounded-lg" style={{ backgroundColor: '#125B73' }} />
                                                <span className="text-slate-400 text-xs font-mono">#125B73</span>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <div className="w-full h-12 rounded-lg" style={{ backgroundColor: '#6FA9C9' }} />
                                                <span className="text-slate-400 text-xs font-mono">#6FA9C9</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Secondary Colors */}
                                    <div className="space-y-4">
                                        <h5 className="text-slate-500 text-xs font-mono uppercase tracking-wider mb-4">Secondary</h5>
                                        <div className="space-y-3">
                                            <div className="flex flex-col gap-2">
                                                <div className="w-full h-12 rounded-lg" style={{ backgroundColor: '#10B981' }} />
                                                <span className="text-slate-400 text-xs font-mono">#10B981</span>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <div className="w-full h-12 rounded-lg" style={{ backgroundColor: '#F59E0B' }} />
                                                <span className="text-slate-400 text-xs font-mono">#F59E0B</span>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <div className="w-full h-12 rounded-lg" style={{ backgroundColor: '#EF4444' }} />
                                                <span className="text-slate-400 text-xs font-mono">#EF4444</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Neutral Colors */}
                                    <div className="space-y-4">
                                        <h5 className="text-slate-500 text-xs font-mono uppercase tracking-wider mb-4">Neutral</h5>
                                        <div className="space-y-3">
                                            <div className="flex flex-col gap-2">
                                                <div className="w-full h-12 rounded-lg border border-border-subtle" style={{ backgroundColor: '#FFFFFF' }} />
                                                <span className="text-slate-400 text-xs font-mono">#FFFFFF</span>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <div className="w-full h-12 rounded-lg" style={{ backgroundColor: '#8AA7A5' }} />
                                                <span className="text-slate-400 text-xs font-mono">#8AA7A5</span>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <div className="w-full h-12 rounded-lg" style={{ backgroundColor: '#0F1724' }} />
                                                <span className="text-slate-400 text-xs font-mono">#0F1724</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Placeholder Block - 30% */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="bg-elevated border border-border-subtle rounded-[2rem] p-10 flex items-center justify-center"
                            >
                                <div className="text-center">
                                    <h4 className="text-text-accent font-mono text-[10px] tracking-widest uppercase mb-4">
                                        PLACEHOLDER
                                    </h4>
                                    <p className="text-slate-500 text-sm">
                                        Content coming soon
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default AtomicDesign;
