"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, FileX, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import Container from '@/Components/container';

const rejectedDesigns = [
    { src: '/assets/Banner.png', alt: 'Rejected Banner' },
    { src: '/assets/TopLeft.png', alt: 'Rejected Sidebar' }
];

const EvidenceLocker: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'rejected' | 'approved'>('rejected');
    const [currentRejectedIndex, setCurrentRejectedIndex] = useState(0);

    const handlePrevious = () => {
        setCurrentRejectedIndex((prev) => (prev === 0 ? rejectedDesigns.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentRejectedIndex((prev) => (prev === rejectedDesigns.length - 1 ? 0 : prev + 1));
    };

    return (
        <section className="py-24 relative overflow-hidden bg-background">
            <Container>
                <div className="flex flex-col gap-8">

                    {/* Narrative Section */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                        <div className="max-w-6xl relative flex">
                            {/* Brand Vertical Line */}
                            <div className="w-[4px] bg-[#2BACE0] shrink-0" />

                            <div className="pl-8">
                                <h2 className="text-sm font-mono text-text-accent tracking-widest mb-2 uppercase">
                                    STORY_01 // EVIDENCE LOCKER
                                </h2>
                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
                                    The Revenue Generator
                                </h2>
                                <p className="text-slate-400 text-lg leading-relaxed">
                                    During early wireframes, the idea of adding, a strong transactional banner came up from PM. I worried it might add pressure at a moment when users are already unsure. To check I quickly prototyped both directions using AI Tools and reviewed them side by side. Keeping guidance close to the action reduced hesitation without feeling pushy.
                                </p>
                            </div>
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
                                <FileX size={14} /> REJECTED_FILES (2)
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
                                        className="w-full relative flex items-center justify-center"
                                    >
                                        {/* Previous Arrow */}
                                        <button
                                            onClick={handlePrevious}
                                            className="absolute left-4 z-20 p-3 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:border-slate-600 transition-all duration-300 shadow-lg"
                                            aria-label="Previous rejected design"
                                        >
                                            <ChevronLeft size={24} />
                                        </button>

                                        {/* Carousel Content */}
                                        <div className="w-full flex items-center justify-center">
                                            <AnimatePresence mode="wait">
                                                <motion.img
                                                    key={currentRejectedIndex}
                                                    src={rejectedDesigns[currentRejectedIndex].src}
                                                    alt={rejectedDesigns[currentRejectedIndex].alt}
                                                    className="w-full h-auto rounded-2xl shadow-2xl border border-white/5"
                                                    initial={{ opacity: 0, x: 100 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -100 }}
                                                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                                />
                                            </AnimatePresence>
                                        </div>

                                        {/* Next Arrow */}
                                        <button
                                            onClick={handleNext}
                                            className="absolute right-4 z-20 p-3 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:border-slate-600 transition-all duration-300 shadow-lg"
                                            aria-label="Next rejected design"
                                        >
                                            <ChevronRight size={24} />
                                        </button>

                                        {/* Indicator Dots */}
                                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                                            {rejectedDesigns.map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setCurrentRejectedIndex(index)}
                                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentRejectedIndex
                                                        ? 'bg-slate-300 w-8'
                                                        : 'bg-slate-600 hover:bg-slate-500'
                                                        }`}
                                                    aria-label={`Go to rejected design ${index + 1}`}
                                                />
                                            ))}
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="approved"
                                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                        className="w-full flex items-center justify-center"
                                    >
                                        <div className="w-full flex flex-col gap-6 items-center justify-center">
                                            <img
                                                src="/assets/Card.png"
                                                alt="Shipped Solution"
                                                className="w-full h-auto rounded-[2.5rem] shadow-[0_0_50px_rgba(16,185,129,0.1)] border border-emerald-500/20"
                                            />

                                            {/* Impact Section */}
                                            <div className="w-full p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl backdrop-blur-sm">
                                                <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 px-4 py-2 rounded-full mb-3">
                                                    <CheckCircle size={16} className="text-emerald-400" />
                                                    <h4 className="text-emerald-400 font-bold text-sm uppercase tracking-wider">
                                                        Impact
                                                    </h4>
                                                </div>
                                                <p className="text-emerald-200/60 text-sm leading-relaxed">
                                                    ₹1.2 Cr Settled via Widget within 5 weeks of the launch. Zero support tickets regarding "Where is my money?"
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                </div>
            </Container>
        </section>
    );
};

export default EvidenceLocker;
