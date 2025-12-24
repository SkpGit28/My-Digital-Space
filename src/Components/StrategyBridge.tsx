"use client";

import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import Container from '@/Components/container';

import TextScramble from "@/Components/TextScramble";

const StrategyBridge: React.FC = () => {
    const pathRef = useRef<SVGPathElement>(null);
    const [pathLength, setPathLength] = useState(0);
    const progress = useMotionValue(0);

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

    // Get path length on mount
    useEffect(() => {
        if (pathRef.current) {
            const length = pathRef.current.getTotalLength();
            setPathLength(length);
        }
    }, []);

    // Calculate position along the path
    const x = useTransform(progress, (latest) => {
        if (!pathRef.current || pathLength === 0) return 0;
        const point = pathRef.current.getPointAtLength(latest * pathLength);
        return point.x;
    });

    const y = useTransform(progress, (latest) => {
        if (!pathRef.current || pathLength === 0) return 50;
        const point = pathRef.current.getPointAtLength(latest * pathLength);
        return point.y;
    });

    return (
        <section className="py-32 relative overflow-hidden bg-background">
            <Container>
                <div className="max-w-5xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-sm font-mono text-text-accent tracking-widest mb-2 uppercase">
                            <TextScramble>STRATEGY_PROTOCOL // ABSORPTION_LAYER</TextScramble>
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
                    <div className="w-full h-[250px] mt-12 relative overflow-visible">
                        <svg
                            className="w-full h-full visible overflow-visible"
                            viewBox="-100 0 1000 250"
                            preserveAspectRatio="xMidYMid meet"
                        >
                            <defs>
                                <linearGradient id="bridgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#f43f5e" /> {/* Rose 500 */}
                                    <stop offset="50%" stopColor="#3b82f6" /> {/* Blue 500 */}
                                    <stop offset="100%" stopColor="#10b981" /> {/* Emerald 500 */}
                                </linearGradient>
                                <radialGradient id="dotGradient">
                                    <stop offset="0%" stopColor="#ffffff" />
                                    <stop offset="100%" stopColor="#3b82f6" />
                                </radialGradient>
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
                                ref={pathRef}
                                d={pathData}
                                fill="none"
                                stroke="url(#bridgeGradient)"
                                strokeWidth="4"
                                strokeLinecap="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 1 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 3, ease: [0.4, 0, 0.2, 1] }}
                                onUpdate={(latest) => {
                                    if (typeof latest.pathLength === 'number') {
                                        progress.set(latest.pathLength);
                                    }
                                }}
                            />

                            {/* Moving "Good Design" Dot */}
                            <motion.g
                                style={{ x, y }}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ opacity: { duration: 0.5 } }}
                            >
                                <circle r="20" fill="#0E0F12" stroke="url(#bridgeGradient)" strokeWidth="2" />
                                <circle r="16" fill="url(#bridgeGradient)" opacity="0.15" />
                                <text
                                    x="0"
                                    y="-40"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fill="white"
                                    className="font-mono text-[14px] uppercase tracking-tight font-bold"
                                >
                                    My Design
                                </text>
                            </motion.g>

                            {/* Nodes */}
                            <motion.circle
                                cx="0" cy="50" r="8"
                                fill="#f43f5e"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, type: "spring" }}
                            />
                            <motion.circle
                                cx="800" cy="50" r="8"
                                fill="#10b981"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 3.2, type: "spring" }}
                            />

                            {/* Labels */}
                            <text
                                x="-30" y="50"
                                textAnchor="end"
                                dominantBaseline="middle"
                                fill="#f43f5e"
                                className="font-mono text-[11px] uppercase tracking-[0.2em] font-bold"
                            >
                                PROBLEM_SPACE
                            </text>
                            <text
                                x="830" y="50"
                                textAnchor="start"
                                dominantBaseline="middle"
                                fill="#10b981"
                                className="font-mono text-[11px] uppercase tracking-[0.2em] font-bold"
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
