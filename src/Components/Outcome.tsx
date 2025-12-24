"use client";

import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Container from '@/Components/container';

const Outcome: React.FC = () => {
    const [count, setCount] = useState(0);
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });
    const targetAmount = 15000000; // ₹1,50,00,000

    useEffect(() => {
        if (isInView) {
            let startTime: number | null = null;
            const duration = 2000; // 2 seconds animation

            const animate = (currentTime: number) => {
                if (!startTime) startTime = currentTime;
                const progress = Math.min((currentTime - startTime) / duration, 1);

                // Easing function for smooth animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                setCount(Math.floor(easeOutQuart * targetAmount));

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            requestAnimationFrame(animate);
        }
    }, [isInView, targetAmount]);

    const formatIndianCurrency = (num: number) => {
        return new Intl.NumberFormat('en-IN').format(num);
    };

    return (
        <section className="py-24 relative overflow-hidden bg-background">
            <Container>
                <div className="flex flex-col gap-16">
                    

                    {/* Big Number Section with Gradient */}
                    <motion.div
                        ref={ref}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <p className="text-xs font-mono text-slate-500 tracking-widest uppercase mb-6">
                            TOTAL PROCESSED VOLUME
                        </p>
                        <h2
                            className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-2 tabular-nums"
                            style={{
                                background: 'linear-gradient(135deg, #E5ECF5 0%, #8AA7A5 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            ₹{formatIndianCurrency(count)}
                        </h2>
                        <p className="text-slate-400 text-lg">Processed</p>
                    </motion.div>

                    {/* Three Content Sections - Receipt Style Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Outcome */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="bg-elevated border border-border-subtle rounded-2xl p-8"
                        >
                            <h4 className="text-text-accent font-mono text-xs tracking-widest uppercase mb-4">
                                Outcome
                            </h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Within five weeks of implementation, the platform processed ₹1.2 Cr in transactions—indicating early merchant trust and stability in the core payment and settlement flows.
                            </p>
                        </motion.div>

                        {/* What This Work Unlocked */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-elevated border border-border-subtle rounded-2xl p-8"
                        >
                            <h4 className="text-text-accent font-mono text-xs tracking-widest uppercase mb-4">
                                What This Work Unlocked
                            </h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                The decisions made here established a reliable foundation for expanding into refunds, disputes, analytics, and compliance workflows without introducing cognitive overhead into high-stakes interactions.
                            </p>
                        </motion.div>

                        {/* Tradeoffs & Open Decisions */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="bg-elevated border border-border-subtle rounded-2xl p-8"
                        >
                            <h4 className="text-text-accent font-mono text-xs tracking-widest uppercase mb-4">
                                Tradeoffs & Open Decisions
                            </h4>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                To prioritize clarity and speed, some advanced capabilities were intentionally simplified in the first phase. These remain open design questions as the platform scales and merchant behavior evolves.
                            </p>
                        </motion.div>
                    </div>

                    {/* Ghost Button - Bottom Right */}
                    <div className="flex justify-end">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <Link href="/work">
                                <button className="group px-6 py-3 border border-border-subtle rounded-full text-slate-300 hover:text-white hover:border-text-accent transition-all duration-300 flex items-center gap-2">
                                    <span className="text-sm font-medium">View All Case Studies?</span>
                                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                                </button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Outcome;
