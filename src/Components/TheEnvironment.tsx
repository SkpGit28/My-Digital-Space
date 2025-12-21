"use client";

import React from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';
import { LogIn, UserPlus, ShieldCheck, Wallet } from 'lucide-react';
import Container from '@/Components/container';

const TheEnvironment: React.FC = () => {
    // Create a multi-step sigmoid curve path using D3
    const lineGenerator = d3.line<[number, number]>().curve(d3.curveBasis);

    // Define points for a 4-step journey
    const points: [number, number][] = [
        [0, 100],    // Step 1: Login
        [100, 100],
        [200, 50],   // Transition to Step 2
        [300, 50],   // Step 2: Onboarding
        [400, 150],  // Transition to Step 3
        [500, 150],  // Step 3: Admin Approval
        [600, 100],  // Transition to Step 4
        [700, 100],  // Step 4: 1st Settle
        [800, 100]
    ];

    const pathData = lineGenerator(points) || "";

    const steps = [
        { id: 'login', label: 'LOGIN', icon: LogIn, x: 0, y: 100, color: '#f43f5e' },
        { id: 'onboarding', label: 'ONBOARDING', icon: UserPlus, x: 300, y: 50, color: '#f59e0b' },
        { id: 'approval', label: 'ADMIN_APPROVAL', icon: ShieldCheck, x: 500, y: 150, color: '#3b82f6' },
        { id: 'settle', label: '1ST_SETTLE', icon: Wallet, x: 800, y: 100, color: '#10b981' }
    ];

    return (
        <section className="py-24 relative overflow-hidden bg-background">
            <Container>
                <div className="flex flex-col gap-16">
                    {/* Narrative Section */}
                    <div className="relative pl-6 max-w-5xl">
                        {/* Vertical Accent Line */}
                        <div className="absolute top-0 left-0 w-1 h-full bg-text-accent/50" />

                        <h2 className="text-sm font-mono text-text-accent tracking-widest mb-2 uppercase">
                            STORY_04 // THE_ENVIRONMENT
                        </h2>
                        <h3 className="text-3xl md:text-5xl font-bold mb-4 text-white tracking-tight">
                            The End-to-End Flow
                        </h3>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            A product is only as strong as its weakest link. We mapped out the entire lifecycle—from the first
                            handshake at Login to the moment of truth: the first successful settlement.
                        </p>
                    </div>

                    {/* Flow Visualization */}
                    <div className="w-full h-[300px] mt-12 relative overflow-visible">
                        <svg
                            className="w-full h-full visible overflow-visible"
                            viewBox="0 0 800 200"
                            preserveAspectRatio="none"
                        >
                            <defs>
                                <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#f43f5e" />
                                    <stop offset="33%" stopColor="#f59e0b" />
                                    <stop offset="66%" stopColor="#3b82f6" />
                                    <stop offset="100%" stopColor="#10b981" />
                                </linearGradient>
                            </defs>

                            {/* Background Trace */}
                            <path
                                d={pathData}
                                fill="none"
                                stroke="#24262E"
                                strokeWidth="2"
                                strokeDasharray="8 8"
                            />

                            {/* Animated Flow Path */}
                            <motion.path
                                d={pathData}
                                fill="none"
                                stroke="url(#flowGradient)"
                                strokeWidth="3"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 1 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 3, ease: "easeInOut" }}
                            />

                            {/* Step Nodes */}
                            {steps.map((step, index) => (
                                <g key={step.id}>
                                    <motion.circle
                                        cx={step.x}
                                        cy={step.y}
                                        r="8"
                                        fill={step.color}
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.8, type: "spring" }}
                                    />

                                    {/* Label */}
                                    <motion.text
                                        x={step.x}
                                        y={step.y - 25}
                                        textAnchor={index === steps.length - 1 ? "end" : index === 0 ? "start" : "middle"}
                                        fill={step.color}
                                        className="font-mono text-[10px] font-bold tracking-widest uppercase"
                                        initial={{ opacity: 0, y: step.y - 15 }}
                                        whileInView={{ opacity: 1, y: step.y - 25 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.8 + 0.2 }}
                                    >
                                        {step.label}
                                    </motion.text>

                                    {/* Icon Placeholder (SVG foreignObject for Lucide icons) */}
                                    <foreignObject x={step.x - 12} y={step.y + 15} width="24" height="24">
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.8 + 0.3 }}
                                            className="flex items-center justify-center text-slate-500 hover:text-white transition-colors"
                                        >
                                            <step.icon size={16} />
                                        </motion.div>
                                    </foreignObject>
                                </g>
                            ))}
                        </svg>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default TheEnvironment;
