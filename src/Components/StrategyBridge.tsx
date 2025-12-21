"use client";

import React from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';
import Container from '@/Components/container';

const StrategyBridge: React.FC = () => {
    // Create a sigmoid-like curve path using D3
    const lineGenerator = d3.line<[number, number]>().curve(d3.curveBasis);
    const points: [number, number][] = [
        [0, 50],
        [100, 50],
        [300, 150],
        [500, 150],
        [700, 50],
        [800, 50]
    ];
    const pathData = lineGenerator(points) || "";

    return (
        <section className="py-32 relative overflow-hidden bg-background">
            <Container>
                <div className="max-w-5xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-sm font-mono text-text-accent tracking-widest mb-2 uppercase">
                            STRATEGY_PROTOCOL // ABSORPTION_LAYER
                        </h2>
                        <h3 className="text-3xl md:text-5xl font-bold mb-8 leading-tight tracking-tight text-white">
                            Reducing friction in high <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
                                Anxiety Moments.
                            </span>
                        </h3>

                        <p className="text-slate-400 text-xl leading-relaxed max-w-5xl mx-auto">
                            When money is involved, patience is zero. If a merchant has to look three different places or click several buttons to find their payout, they start panicking. My logic was simple: Don't make them hunt.
                        </p>
                    </div>

                    {/* Visual Connector (SVG) */}
                    <div className="w-full h-[200px] mt-20 relative overflow-visible">
                        <svg
                            className="w-full h-full visible overflow-visible"
                            viewBox="0 0 800 200"
                            preserveAspectRatio="none"
                        >
                            <defs>
                                <linearGradient id="bridgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#f43f5e" /> {/* Rose 500 */}
                                    <stop offset="50%" stopColor="#166C8F" /> {/* Project Accent */}
                                    <stop offset="100%" stopColor="#10b981" /> {/* Emerald 500 */}
                                </linearGradient>
                            </defs>

                            {/* Background Trace */}
                            <path
                                d={pathData}
                                fill="none"
                                stroke="#24262E" // border-border-subtle
                                strokeWidth="2"
                                strokeDasharray="8 8"
                            />

                            {/* Animated Flow */}
                            <motion.path
                                d={pathData}
                                fill="none"
                                stroke="url(#bridgeGradient)"
                                strokeWidth="3"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 1 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 2.5, ease: "easeInOut" }}
                            />

                            {/* Nodes */}
                            <motion.circle
                                cx="0" cy="50" r="6"
                                fill="#f43f5e"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, type: "spring" }}
                            />
                            <motion.circle
                                cx="800" cy="50" r="6"
                                fill="#10b981"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 2.5, type: "spring" }}
                            />

                            {/* Labels */}
                            <text
                                x="0" y="30"
                                fill="#f43f5e"
                                className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold"
                            >
                                PROBLEM_SPACE
                            </text>
                            <text
                                x="800" y="30"
                                textAnchor="end"
                                fill="#10b981"
                                className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold"
                            >
                                SOLUTION_SPACE
                            </text>
                        </svg>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default StrategyBridge;
