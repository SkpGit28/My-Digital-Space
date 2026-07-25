"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { LayoutTemplate, ShieldAlert, CheckCircle, ArrowRight, ChevronDown } from 'lucide-react';

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
                    src="/assets/Standardform.webp"
                    alt="Standard Input Form"
                    className="w-full h-auto rounded-[6px]"
                    style={{ border: "1px solid var(--cs2-border-default)" }}
                />

                {/* Bottom Prompt Section */}
                <div className="w-full p-6 rounded-[6px] backdrop-blur-sm mt-4" style={{ background: "var(--cs2-color-red-100)", border: "1px solid var(--cs2-color-red-200)" }}>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex-1 text-center md:text-left">
                            <h4 className="font-bold text-sm uppercase tracking-wider mb-2" style={{ color: "var(--cs2-color-red-700)" }}>
                                The Friction is Real
                            </h4>
                            <p className="text-sm leading-relaxed max-w-xl" style={{ color: "var(--cs2-color-red-700)", opacity: 0.75 }}>
                                The standard form buried document status. Staff dropped off exactly where the money got stuck.
                            </p>
                        </div>
                        <button
                            onClick={onSwitch}
                            className="flex items-center gap-2 px-6 py-3 rounded-full transition-colors duration-300 group whitespace-nowrap"
                            style={{ background: "var(--cs2-color-red-100)", border: "1px solid var(--cs2-color-red-200)", color: "var(--cs2-color-red-700)" }}
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

// Bare comparison box: the section shell (eyebrow, heading, body) is owned
// by the case-study page in Case Study 2's template grammar. All colour here
// uses the --cs2-* token set (not the site's generic Tailwind rose/emerald
// palette) so it matches the rest of the CS2 template.
const ProfilePivot: React.FC = () => {
    const [view, setView] = useState<'boring' | 'hub'>('hub');

    const tabBase: React.CSSProperties = {
        fontFamily: "var(--cs2-font-figtree), sans-serif",
        borderBottom: "3px solid transparent",
    };
    const boringActive: React.CSSProperties = view === 'boring'
        ? { color: "var(--cs2-color-red-700)", background: "var(--cs2-color-red-100)", borderBottomColor: "var(--cs2-color-red-500)" }
        : { color: "var(--cs2-color-neutral-500)", background: "transparent" };
    const hubActive: React.CSSProperties = view === 'hub'
        ? { color: "var(--cs2-color-green-600)", background: "var(--cs2-color-green-050)", borderBottomColor: "var(--cs2-color-green-500)" }
        : { color: "var(--cs2-color-neutral-500)", background: "transparent" };

    return (
        <div className="relative w-full h-[750px] rounded-[12px] overflow-hidden group flex flex-col" style={{ background: "var(--cs2-bg-page)", border: "1px solid var(--cs2-border-default)" }}>
                    {/* Tab bar: proper tab buttons, active state carries a fill, a bold
                        label, and a thick accent underline, not just a thin text link */}
                    <div className="flex shrink-0" style={{ background: "var(--cs2-bg-surface)", borderBottom: "1px solid var(--cs2-border-default)" }}>
                        <button
                            type="button"
                            onClick={() => setView('boring')}
                            className="flex-1 text-[12px] font-bold tracking-[0.06em] uppercase transition-colors duration-200 flex items-center justify-center gap-2"
                            style={{ ...tabBase, ...boringActive, height: '72px' }}
                        >
                            <LayoutTemplate size={15} /> REJECTED FORM
                        </button>
                        <button
                            type="button"
                            onClick={() => setView('hub')}
                            className="flex-1 text-[12px] font-bold tracking-[0.06em] uppercase transition-colors duration-200 flex items-center justify-center gap-2"
                            style={{ ...tabBase, ...hubActive, borderLeft: "1px solid var(--cs2-border-default)", height: '72px' }}
                        >
                            <ShieldAlert size={15} /> IDENTITY HUB
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
                                            className="w-full h-auto rounded-[6px]"
                                            style={{ border: "1px solid var(--cs2-border-default)" }}
                                        />

                                        {/* Impact Section */}
                                        <div className="w-full p-4 rounded-[6px] backdrop-blur-sm" style={{ background: "var(--cs2-color-green-050)", border: "1px solid var(--cs2-color-green-200)" }}>
                                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-3" style={{ background: "var(--cs2-color-green-100)", border: "1px solid var(--cs2-color-green-200)" }}>
                                                <CheckCircle size={16} style={{ color: "var(--cs2-color-green-600)" }} />
                                                <h4 className="font-bold text-sm uppercase tracking-wider" style={{ color: "var(--cs2-color-green-600)" }}>
                                                    Impact
                                                </h4>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                                                <div className="flex flex-col p-3 rounded-[6px]" style={{ background: "var(--cs2-color-green-050)", border: "1px solid var(--cs2-color-green-200)" }}>
                                                    <span className="text-2xl font-bold" style={{ color: "var(--cs2-color-green-600)" }}>200+</span>
                                                    <span className="text-[10px] uppercase tracking-widest font-mono font-medium" style={{ color: "var(--cs2-color-green-700)" }}>Merchants Onboarded</span>
                                                </div>
                                                <div className="flex flex-col p-3 rounded-[6px]" style={{ background: "var(--cs2-color-green-050)", border: "1px solid var(--cs2-color-green-200)" }}>
                                                    <span className="text-2xl font-bold" style={{ color: "var(--cs2-color-green-600)" }}>70%</span>
                                                    <span className="text-[10px] uppercase tracking-widest font-mono font-medium" style={{ color: "var(--cs2-color-green-700)" }}>Enterprise Adoption</span>
                                                </div>
                                                <div className="flex flex-col p-3 rounded-[6px]" style={{ background: "var(--cs2-color-green-050)", border: "1px solid var(--cs2-color-green-200)" }}>
                                                    <span className="text-2xl font-bold" style={{ color: "var(--cs2-color-green-600)" }}>90%</span>
                                                    <span className="text-[10px] uppercase tracking-widest font-mono font-medium" style={{ color: "var(--cs2-color-green-700)" }}>KYC Completion Rate</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
        </div>
    );
};

export default ProfilePivot;
