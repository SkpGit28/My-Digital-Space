"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileX, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

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

    // Bare evidence box: the section shell (eyebrow, heading, body) is owned
    // by the case-study page in Case Study 2's template grammar. All colour
    // here uses the --cs2-* token set (not the site's generic Tailwind
    // rose/emerald palette) so it matches the rest of the CS2 template.
    const tabBase: React.CSSProperties = {
        fontFamily: "var(--cs2-font-figtree), sans-serif",
        borderBottom: "3px solid transparent",
    };
    const rejectedActive: React.CSSProperties = activeTab === 'rejected'
        ? { color: "var(--cs2-color-red-700)", background: "var(--cs2-color-red-100)", borderBottomColor: "var(--cs2-color-red-500)" }
        : { color: "var(--cs2-color-neutral-500)", background: "transparent" };
    const approvedActive: React.CSSProperties = activeTab === 'approved'
        ? { color: "var(--cs2-color-green-600)", background: "var(--cs2-color-green-050)", borderBottomColor: "var(--cs2-color-green-500)" }
        : { color: "var(--cs2-color-neutral-500)", background: "transparent" };

    return (
        <div className="w-full rounded-[12px] overflow-hidden relative group" style={{ background: "var(--cs2-bg-page)", border: "1px solid var(--cs2-border-default)" }}>
                        {/* Tab bar: proper tab buttons, active state carries a fill, a bold
                            label, and a thick accent underline, not just a thin text link */}
                        <div className="flex" style={{ background: "var(--cs2-bg-surface)", borderBottom: "1px solid var(--cs2-border-default)" }}>
                            <button
                                type="button"
                                onClick={() => setActiveTab('rejected')}
                                className="flex-1 text-[12px] font-bold tracking-[0.06em] uppercase transition-colors duration-200 flex items-center justify-center gap-2"
                                style={{ ...tabBase, ...rejectedActive, height: '72px' }}
                            >
                                <FileX size={15} /> REJECTED_FILES (2)
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('approved')}
                                className="flex-1 text-[12px] font-bold tracking-[0.06em] uppercase transition-colors duration-200 flex items-center justify-center gap-2"
                                style={{ ...tabBase, ...approvedActive, borderLeft: "1px solid var(--cs2-border-default)", height: '72px' }}
                            >
                                <CheckCircle size={15} /> SHIPPED_SOLUTION
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="pt-6 md:pt-8 px-4 md:px-6 pb-16 md:pb-20 min-h-[360px] flex items-center justify-center relative overflow-hidden">
                            {/* Subtle Grid Background */}
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                                style={{ backgroundImage: 'radial-gradient(var(--cs2-text-heading) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

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
                                            className="absolute left-4 z-20 p-3 rounded-full transition-colors duration-300"
                                            style={{ background: "var(--cs2-bg-surface)", border: "1px solid var(--cs2-border-default)", color: "var(--cs2-text-body)" }}
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
                                                    className="w-full h-auto rounded-[6px] border border-border-subtle"
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
                                            className="absolute right-4 z-20 p-3 rounded-full transition-colors duration-300"
                                            style={{ background: "var(--cs2-bg-surface)", border: "1px solid var(--cs2-border-default)", color: "var(--cs2-text-body)" }}
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
                                                    className="h-2 rounded-full transition-all duration-300"
                                                    style={{
                                                        width: index === currentRejectedIndex ? 32 : 8,
                                                        background: index === currentRejectedIndex ? "var(--cs2-text-heading)" : "var(--cs2-border-strong)",
                                                    }}
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
                                                className="w-full h-auto rounded-[12px]"
                                                style={{ border: "1px solid var(--cs2-color-green-200)" }}
                                            />

                                            {/* Impact Section */}
                                            <div className="w-full p-4 rounded-[6px] backdrop-blur-sm" style={{ background: "var(--cs2-color-green-050)", border: "1px solid var(--cs2-color-green-200)" }}>
                                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-3" style={{ background: "var(--cs2-color-green-100)", border: "1px solid var(--cs2-color-green-200)" }}>
                                                    <CheckCircle size={16} style={{ color: "var(--cs2-color-green-600)" }} />
                                                    <h4 className="font-bold text-sm uppercase tracking-wider" style={{ color: "var(--cs2-color-green-600)" }}>
                                                        Impact
                                                    </h4>
                                                </div>
                                                <p className="text-sm leading-relaxed font-medium" style={{ color: "var(--cs2-color-green-700)" }}>
                                                    ₹1.2Cr settled through the widget within 5 weeks of launch. Zero &quot;where is my money?&quot; tickets.
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                    </div>
        </div>
    );
};

export default EvidenceLocker;
