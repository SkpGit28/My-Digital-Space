"use client";

import React from 'react';
import * as d3 from 'd3';
import { motion } from 'framer-motion';
import { LogIn, UserPlus, ShieldCheck, Wallet } from 'lucide-react';
import Container from '@/Components/container';
import TextScramble from "@/Components/TextScramble";

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
        { id: 'login', label: 'LOGIN', icon: LogIn, x: 0, y: 100, textY: 80, color: '#f43f5e' },
        { id: 'onboarding', label: 'ONBOARDING', icon: UserPlus, x: 300, y: 50, textY: 55, color: '#f59e0b' },
        { id: 'approval', label: 'ADMIN_APPROVAL', icon: ShieldCheck, x: 500, y: 150, textY: 103, color: '#3b82f6' },
        { id: 'settle', label: '1ST_SETTLE', icon: Wallet, x: 800, y: 100, textY: 80, color: '#10b981' }
    ];

    return (
        <section className="py-24 relative overflow-hidden bg-background">
            <Container>
                <div className="flex flex-col gap-16">
                    {/* Narrative Section */}
                    <div className="relative flex max-w-5xl">
                        {/* Brand Vertical Line */}
                        <div className="w-[4px] bg-[#2BACE0] shrink-0" />

                        <div className="pl-8">
                            <h2 className="text-sm font-mono text-text-accent tracking-widest mb-2 uppercase">
                                <TextScramble>STORY_04 // THE_ENVIRONMENT</TextScramble>
                            </h2>
                            <h3 className="text-3xl md:text-5xl font-bold mb-4 text-white tracking-tight">
                                The End-to-End Flow
                            </h3>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                A product is only as strong as its weakest link. We mapped out the entire lifecycle—from the first
                                handshake at Login to the moment of truth: the first successful settlement.
                            </p>
                        </div>
                    </div>

                    {/* Flow Visualization */}
                    <div className="w-full h-[350px] mt-12 relative overflow-visible">
                        <svg
                            className="w-full h-full visible overflow-visible"
                            viewBox="-50 -20 900 240"
                            preserveAspectRatio="xMidYMid meet"
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
                                    {/* 1. Dot */}
                                    <motion.circle
                                        cx={step.x}
                                        cy={step.y}
                                        r="10"
                                        fill={step.color}
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.8, type: "spring" }}
                                    />

                                    {/* 2. Icon - 8px below dot (10px radius + 8px gap = 18px offset) */}
                                    <foreignObject
                                        x={step.x - 12}
                                        y={step.y + 18}
                                        width="24"
                                        height="24"
                                        className="overflow-visible"
                                    >
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.8 + 0.2 }}
                                            className="flex items-center justify-center w-full h-full"
                                            style={{ color: step.color }}
                                        >
                                            <step.icon size={20} strokeWidth={2.5} />
                                        </motion.div>
                                    </foreignObject>

                                    {/* 3. Heading - Custom Y Position */}
                                    <motion.text
                                        x={step.x}
                                        y={step.textY}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        fill={step.color}
                                        className="font-mono text-[11px] font-bold tracking-widest uppercase"
                                        initial={{ opacity: 0, y: step.textY - 10 }}
                                        whileInView={{ opacity: 1, y: step.textY }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.8 + 0.3 }}
                                    >
                                        {step.label}
                                    </motion.text>
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
