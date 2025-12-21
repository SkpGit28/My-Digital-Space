"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, FileX, CheckCircle, Wallet } from 'lucide-react';
import Container from '@/Components/container';

const EvidenceLocker: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'rejected' | 'approved'>('rejected');

    return (
        <section className="py-24 relative overflow-hidden bg-background">
            <Container>
                <div className="flex flex-col gap-8">

                    {/* Narrative Section */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                        <div className="max-w-6xl relative pl-6">
                            {/* Vertical Accent Line */}
                            <div className="absolute top-0 left-0 w-1 h-full bg-text-accent/50" />

                            <div className="flex items-center gap-2 mb-6 text-slate-500 font-mono text-[10px] tracking-[0.2em] uppercase">
                                <Lock size={12} className="text-text-accent" />
                                <span>EVIDENCE_LOCKER // STORY_01</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
                                The Settle Button
                            </h2>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                "During early wireframes, the idea of adding, a strong transactional banner came up from PM. I worried it might add pressure at a moment when users are already unsure. To check I quickly prototyped both directions using AI Tools and reviewed them side by side. Keeping guidance close to the action reduced hesitation without feeling pushy."
                            </p>
                        </div>
                    </div>

                    {/* Interactive Evidence Display (Full Width) */}
                    <div className="w-full bg-elevated border border-border-subtle rounded-[2rem] overflow-hidden relative group">
                        {/* Header / Tabs */}
                        <div className="flex border-b border-border-subtle bg-background/50 backdrop-blur-md">
                            <button
                                onClick={() => setActiveTab('rejected')}
                                className={`flex-1 py-6 font-mono text-[10px] tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3 relative ${activeTab === 'rejected'
                                    ? 'text-rose-500'
                                    : 'text-slate-500 hover:text-slate-300'
                                    }`}
                            >
                                <FileX size={14} /> REJECTED_FILES (3)
                                {activeTab === 'rejected' && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500"
                                    />
                                )}
                            </button>
                            <button
                                onClick={() => setActiveTab('approved')}
                                className={`flex-1 py-6 font-mono text-[10px] tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3 relative ${activeTab === 'approved'
                                    ? 'text-emerald-500'
                                    : 'text-slate-500 hover:text-slate-300'
                                    }`}
                            >
                                <CheckCircle size={14} /> SHIPPED_SOLUTION
                                {activeTab === 'approved' && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500"
                                    />
                                )}
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="p-8 md:p-12 min-h-[500px] flex items-center justify-center relative overflow-hidden">
                            {/* Subtle Grid Background */}
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                                style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                            <AnimatePresence mode="wait">
                                {activeTab === 'rejected' ? (
                                    <motion.div
                                        key="rejected"
                                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl"
                                    >
                                        <div className="bg-background/40 p-8 rounded-2xl border border-rose-500/10 opacity-60 hover:opacity-100 transition-all duration-500 hover:border-rose-500/30 hover:shadow-[0_0_30px_rgba(244,63,94,0.05)] group/card">
                                            <div className="h-1 w-12 bg-rose-500/20 mb-6 rounded-full group-hover/card:bg-rose-500/40 transition-colors" />
                                            <div className="h-24 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center justify-center text-rose-500 font-bold text-xs tracking-widest uppercase">
                                                AGGRESSIVE BANNER
                                            </div>
                                            <p className="text-[10px] text-rose-500/50 mt-4 font-mono tracking-tighter uppercase">
                                                {">"} ERR_TOO_INTRUSIVE
                                            </p>
                                        </div>
                                        <div className="bg-background/40 p-8 rounded-2xl border border-rose-500/10 opacity-60 hover:opacity-100 transition-all duration-500 hover:border-rose-500/30 hover:shadow-[0_0_30px_rgba(244,63,94,0.05)] group/card">
                                            <div className="h-1 w-12 bg-rose-500/20 mb-6 rounded-full group-hover/card:bg-rose-500/40 transition-colors" />
                                            <div className="h-24 border border-dashed border-rose-500/30 rounded-xl flex items-center justify-center text-rose-500/60 font-bold text-xs tracking-widest uppercase">
                                                SIDEBAR LINK
                                            </div>
                                            <p className="text-[10px] text-rose-500/50 mt-4 font-mono tracking-tighter uppercase">
                                                {">"} ERR_POOR_VISIBILITY
                                            </p>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="approved"
                                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                        className="w-full max-w-md"
                                    >
                                        <div className="bg-background border border-emerald-500/20 rounded-[2.5rem] p-10 shadow-[0_0_50px_rgba(16,185,129,0.1)] relative overflow-hidden group/winner">
                                            {/* Animated Glow */}
                                            <div className="absolute -inset-24 bg-emerald-500/5 blur-[100px] rounded-full group-hover/winner:bg-emerald-500/10 transition-colors duration-700" />

                                            <div className="absolute top-6 right-6 bg-emerald-500 text-slate-950 text-[10px] font-black px-4 py-1.5 rounded-full tracking-tighter uppercase shadow-lg shadow-emerald-500/20">
                                                SHIPPED
                                            </div>

                                            <div className="relative z-10">
                                                <div className="flex justify-between items-center mb-8">
                                                    <span className="text-slate-500 text-xs font-mono tracking-widest uppercase">Available Balance</span>
                                                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                                                        <Wallet size={18} className="text-emerald-500" />
                                                    </div>
                                                </div>

                                                <div className="text-4xl font-mono text-white mb-10 tracking-tighter flex items-baseline gap-2">
                                                    <span className="text-emerald-500/50 text-xl">₹</span>
                                                    82,450.00
                                                </div>

                                                <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-5 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0">
                                                    Settle Now
                                                    <span className="text-[9px] bg-slate-950/20 px-2.5 py-1 rounded-full font-black tracking-widest">INSTANT</span>
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-center text-emerald-500/40 font-mono text-[10px] mt-8 tracking-[0.3em] uppercase">
                                            The "Wallet Widget" Strategy
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                    <div className="w-full md:w-full p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl backdrop-blur-sm shrink-0">
                        <h4 className="text-emerald-400 font-bold mb-2 flex items-center gap-2 text-sm uppercase tracking-wider">
                            <CheckCircle size={16} /> Impact
                        </h4>
                        <p className="text-emerald-200/60 text-sm leading-relaxed">
                            ₹1.2 Cr Settled via Widget within 5 weeks of the launch. Zero support tickets regarding "Where is my money?"
                        </p>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default EvidenceLocker;
