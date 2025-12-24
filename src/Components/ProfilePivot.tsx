"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { LayoutTemplate, ShieldAlert, CheckCircle, ArrowRight, ChevronDown } from 'lucide-react';
import Container from '@/Components/container';

interface BoringViewProps {
    onSwitch: () => void;
}

const BoringView: React.FC<BoringViewProps> = ({ onSwitch }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        container: containerRef,
        offset: ["start start", "end end"]
    });

    const pillOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
    const pillScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);

    return (
        <motion.div
            key="boring"
            ref={containerRef}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 p-8 flex flex-col items-center justify-start overflow-y-auto custom-scrollbar"
        >
            {/* Floating Hint Pill & Arrows */}
            <motion.div
                style={{ opacity: pillOpacity, scale: pillScale }}
                className="sticky top-1/3 z-20 flex flex-col items-center gap-2 pointer-events-none"
            >
                <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full shadow-2xl flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-300 uppercase tracking-widest flex items-center gap-2">
                        Scroll down to know the pain 😫
                    </span>
                </div>

                {/* Animated Arrows */}
                <div className="flex flex-col -mt-1">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: [0, 1, 0], y: [0, 5, 10] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.2,
                                ease: "easeInOut"
                            }}
                        >
                            <ChevronDown size={16} className="text-slate-500/50 -mb-2" />
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <div className="w-full flex flex-col gap-8 items-center justify-center">
                <img
                    src="/assets/Standardform.svg"
                    alt="Standard Input Form"
                    className="w-full h-auto rounded-2xl shadow-2xl border border-white/5"
                />

                {/* Bottom Prompt Section */}
                <div className="w-full p-6 bg-rose-500/5 border border-rose-500/10 rounded-2xl backdrop-blur-sm mt-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex-1 text-center md:text-left">
                            <h4 className="text-rose-400 font-bold text-sm uppercase tracking-wider mb-2">
                                The Friction is Real
                            </h4>
                            <p className="text-rose-200/60 text-sm leading-relaxed max-w-xl">
                                This form was a major bottleneck. Users were dropping off because they couldn't see the status of their documents.
                            </p>
                        </div>
                        <button
                            onClick={onSwitch}
                            className="flex items-center gap-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 px-6 py-3 rounded-full border border-rose-500/20 transition-all duration-300 group whitespace-nowrap"
                        >
                            <span className="text-xs font-bold uppercase tracking-widest">See the Identity Hub</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

import TextScramble from "@/Components/TextScramble";

const ProfilePivot: React.FC = () => {
    const [view, setView] = useState<'boring' | 'hub'>('hub');

    return (
        <section className="py-24 relative overflow-hidden bg-background">
            {/* Subtle Grid Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <Container>
                <div className="flex flex-col mb-16 gap-8">
                    <div className="relative flex">
                        {/* Brand Vertical Line */}
                        <div className="w-[4px] bg-[#2BACE0] shrink-0" />

                        <div className="pl-8">
                            <h2 className="text-sm font-mono text-text-accent tracking-widest mb-2 uppercase">
                                <TextScramble>STORY_02 // THE OPERATIONS HUB</TextScramble>
                            </h2>
                            <h3 className="text-3xl md:text-5xl font-bold mb-4 text-white tracking-tight">
                                Profile  to Business Continuity
                            </h3>
                            <p className="text-slate-400 max-w-6xl text-lg leading-relaxed">
                                Realistically, the business owner isn't the one logging in to upload documents—their staff is. And they are usually in a rush. I realized a standard "Edit Profile" form was too passive for them; they don't want to browse settings, they want to unblock payments. So, I designed this section to look less like a form and more like a status report. It allows the team to instantly spot what’s broken (like an expired document) and fix it immediately, ensuring the system keeps running without the CEO ever needing to get involved.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Blueprint Comparison */}
                <div className="relative w-full h-[750px] bg-elevated rounded-[2rem] border border-border-subtle shadow-2xl overflow-hidden group flex flex-col">
                    {/* Header / Tabs */}
                    <div className="flex border-b border-border-subtle bg-background/50 backdrop-blur-md shrink-0 z-10">
                        <button
                            onClick={() => setView('boring')}
                            className={`flex-1 py-6 font-mono text-[10px] tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3 relative ${view === 'boring'
                                ? 'text-rose-500'
                                : 'text-slate-500 hover:text-slate-300'
                                }`}
                        >
                            <LayoutTemplate size={14} /> REJECTED FORM
                            {view === 'boring' && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500"
                                />
                            )}
                        </button>
                        <button
                            onClick={() => setView('hub')}
                            className={`flex-1 py-6 font-mono text-[10px] tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3 relative ${view === 'hub'
                                ? 'text-emerald-500'
                                : 'text-slate-500 hover:text-slate-300'
                                }`}
                        >
                            <ShieldAlert size={14} /> IDENTITY HUB
                            {view === 'hub' && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500"
                                />
                            )}
                        </button>
                    </div>

                    <div className="flex-1 relative overflow-hidden">
                        <AnimatePresence mode="wait">
                            {view === 'boring' ? (
                                <BoringView onSwitch={() => setView('hub')} />
                            ) : (
                                <motion.div
                                    key="hub"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    className="absolute inset-0 p-8 flex flex-col items-center justify-start overflow-y-auto custom-scrollbar"
                                >
                                    {/* The Identity Hub UI */}
                                    <div className="w-full flex flex-col gap-6 items-center justify-center">
                                        <img
                                            src="/assets/Profile.svg"
                                            alt="Identity Hub"
                                            className="w-full h-auto rounded-2xl shadow-2xl border border-white/5"
                                        />

                                        {/* Impact Section */}
                                        <div className="w-full p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl backdrop-blur-sm">
                                            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 px-4 py-2 rounded-full mb-3">
                                                <CheckCircle size={16} className="text-emerald-400" />
                                                <h4 className="text-emerald-400 font-bold text-sm uppercase tracking-wider">
                                                    Impact
                                                </h4>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                                                <div className="flex flex-col p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                                                    <span className="text-2xl font-bold text-emerald-400">200+</span>
                                                    <span className="text-[10px] text-emerald-200/40 uppercase tracking-widest font-mono">Merchants Onboarded</span>
                                                </div>
                                                <div className="flex flex-col p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                                                    <span className="text-2xl font-bold text-emerald-400">70%</span>
                                                    <span className="text-[10px] text-emerald-200/40 uppercase tracking-widest font-mono">Enterprise Adoption</span>
                                                </div>
                                                <div className="flex flex-col p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                                                    <span className="text-2xl font-bold text-emerald-400">90%</span>
                                                    <span className="text-[10px] text-emerald-200/40 uppercase tracking-widest font-mono">KYC Completion Rate</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default ProfilePivot;
