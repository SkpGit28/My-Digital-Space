"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutTemplate, ShieldAlert } from 'lucide-react';
import Container from '@/Components/container';

const ProfilePivot: React.FC = () => {
    const [view, setView] = useState<'boring' | 'hub'>('hub');

    return (
        <section className="py-24 relative overflow-hidden bg-background">
            {/* Subtle Grid Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <Container>
                <div className="flex flex-col mb-16 gap-8">
                    <div className="relative pl-6">
                        {/* Vertical Accent Line */}
                        <div className="absolute top-0 left-0 w-1 h-full bg-text-accent/50" />

                        <h2 className="text-sm font-mono text-text-accent tracking-widest mb-2 uppercase">
                            STORY_02 // THE BLUEPRINT
                        </h2>
                        <h3 className="text-3xl md:text-5xl font-bold mb-4 text-white tracking-tight">
                            The Profile Pivot
                        </h3>
                        <p className="text-slate-400 max-w-xl text-lg leading-relaxed">
                            "Safety over Aesthetics. The yellow banner is ugly, but it saves the user from blocked payouts."
                        </p>
                    </div>
                </div>

                {/* Blueprint Comparison */}
                <div className="relative w-full h-[750px] bg-elevated rounded-[2rem] border border-border-subtle shadow-2xl overflow-hidden group">
                    {/* Centered toggle block */}
                    <div className="absolute top-8 left-0 right-0 flex justify-center z-30">
                        <div className="bg-background/50 backdrop-blur-md p-1 rounded-full border border-border-subtle flex relative shadow-2xl">
                            <motion.div
                                className="absolute top-1 bottom-1 w-[140px] bg-text-accent rounded-full z-0"
                                animate={{ left: view === 'boring' ? 4 : 148 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                            <button
                                onClick={() => setView('boring')}
                                className={`relative z-10 w-[140px] py-2 text-[10px] font-mono uppercase tracking-widest transition-colors duration-300 ${view === 'boring' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
                            >
                                Rejected Form
                            </button>
                            <button
                                onClick={() => setView('hub')}
                                className={`relative z-10 w-[140px] py-2 text-[10px] font-mono uppercase tracking-widest transition-colors duration-300 ${view === 'hub' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
                            >
                                Identity Hub
                            </button>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {view === 'boring' ? (
                            <motion.div
                                key="boring"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute inset-0 p-12 flex flex-col items-center justify-start pt-48 opacity-40 grayscale"
                            >
                                <LayoutTemplate size={48} className="mb-6 text-slate-600" />
                                <h4 className="text-xl font-bold text-slate-500 mb-8 font-mono uppercase tracking-widest">Standard Input Form</h4>
                                <div className="w-full max-w-md space-y-4">
                                    <div className="h-12 bg-background/50 rounded-xl w-full border border-border-subtle/50" />
                                    <div className="h-12 bg-background/50 rounded-xl w-full border border-border-subtle/50" />
                                    <div className="h-12 bg-background/50 rounded-xl w-full border border-border-subtle/50" />
                                    <div className="h-32 bg-background/50 rounded-xl w-full border border-border-subtle/50" />
                                    <div className="h-12 bg-slate-800/50 rounded-xl w-full mt-4 border border-border-subtle/50" />
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="hub"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute inset-0 px-6 md:px-12 pb-12 flex flex-col items-center justify-start pt-[80px]"
                            >
                                {/* The Identity Hub UI */}
                                <div className="w-full max-w-3xl border border-text-accent/20 bg-background rounded-[2.5rem] p-8 md:p-10 shadow-[0_0_50px_rgba(22,108,143,0.1)] relative overflow-hidden mt-10">
                                    {/* Background glow */}
                                    <div className="absolute -top-24 -right-24 w-80 h-80 bg-text-accent/5 rounded-full blur-[100px] pointer-events-none" />

                                    <div className="flex items-center justify-between mb-8 border-b border-border-subtle pb-8">
                                        <div>
                                            <h4 className="text-2xl font-bold text-white tracking-tight">Merchant Identity</h4>
                                            <p className="text-slate-500 text-xs font-mono mt-1 tracking-widest uppercase">ID: 8821-X9 // VERIFIED_ENTITY</p>
                                        </div>
                                        <div className="px-4 py-1.5 bg-emerald-500/10 text-emerald-500 text-[10px] font-black rounded-full border border-emerald-500/20 tracking-tighter uppercase">
                                            LEVEL 2 TRUST
                                        </div>
                                    </div>

                                    {/* Warning Banner */}
                                    <div className="bg-amber-500/5 border-l-4 border-amber-500 p-6 mb-10 flex items-start gap-5 rounded-r-2xl backdrop-blur-sm">
                                        <div className="p-2 bg-amber-500/10 rounded-lg shrink-0">
                                            <ShieldAlert className="text-amber-500" size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <h5 className="text-amber-500 font-bold text-sm mb-1 uppercase tracking-wider">Critical Action Required</h5>
                                            <p className="text-amber-200/60 text-xs leading-relaxed">Payouts have been paused. Your PAN Card document has expired. Update immediately to resume settlements.</p>
                                        </div>
                                        <button className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-[10px] font-black px-5 py-2.5 rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/20 uppercase tracking-widest shrink-0">
                                            Fix Now
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="p-6 bg-elevated/50 rounded-2xl border border-border-subtle group/item hover:border-text-accent/40 transition-all duration-500">
                                            <div className="text-slate-500 text-[10px] uppercase mb-3 tracking-widest font-mono">Business Name</div>
                                            <div className="text-white font-bold tracking-tight">Alpha Corp Ltd.</div>
                                        </div>
                                        <div className="p-6 bg-elevated/50 rounded-2xl border border-border-subtle group/item hover:border-text-accent/40 transition-all duration-500">
                                            <div className="text-slate-500 text-[10px] uppercase mb-3 tracking-widest font-mono">Operating Status</div>
                                            <div className="text-emerald-500 font-mono text-sm flex items-center gap-2 font-bold">
                                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                                ACTIVE_NODE
                                            </div>
                                        </div>
                                        <div className="p-6 bg-elevated/50 rounded-2xl border border-border-subtle group/item hover:border-text-accent/40 transition-all duration-500">
                                            <div className="text-slate-500 text-[10px] uppercase mb-3 tracking-widest font-mono">Risk Score</div>
                                            <div className="text-text-accent font-mono text-sm font-bold">
                                                LOW (4/100)
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </Container>
        </section>
    );
};

export default ProfilePivot;
