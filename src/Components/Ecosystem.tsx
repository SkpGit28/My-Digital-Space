"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Container from '@/Components/container';

const Ecosystem: React.FC = () => {
    // Placeholder items for each row
    const screens = Array.from({ length: 8 }, (_, i) => i + 1);
    
    // Hover states for each row
    const [hoveredRow, setHoveredRow] = React.useState<number | null>(null);

    return (
        <section className="py-24 relative overflow-hidden bg-background">
            <Container>
                {/* Narrative Section */}
                <div className="relative pl-6 max-w-5xl mb-16">
                    {/* Vertical Accent Line */}
                    <div className="absolute top-0 left-0 w-1 h-full bg-text-accent/50" />

                    <h2 className="text-sm font-mono text-text-accent tracking-widest mb-2 uppercase">
                        ECOSYSTEM // THE REALITY_LAYER
                    </h2>
                    <h3 className="text-3xl md:text-5xl font-bold mb-4 text-white tracking-tight">
                        Scale & Chaos
                    </h3>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        Design that doesn't just look good in Figma, but scales to the messy reality of the real world.
                    </p>
                </div>
            </Container>

            {/* Scrolling Rows */}
            <div className="space-y-6">
                {/* Row 1 - Left to Right (Slow) */}
                <div 
                    className="overflow-hidden"
                    onMouseEnter={() => setHoveredRow(1)}
                    onMouseLeave={() => setHoveredRow(null)}
                >
                    <motion.div
                        className="flex gap-6"
                        animate={{
                            x: hoveredRow === 1 ? undefined : [0, -4000],
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 50,
                                ease: "linear",
                            },
                        }}
                    >
                        {/* Duplicate for seamless loop */}
                        {[...screens, ...screens].map((item, index) => (
                            <div
                                key={`row1-${index}`}
                                className="min-w-[500px] h-[500px] bg-elevated border border-border-subtle rounded-2xl flex items-center justify-center"
                            >
                                <span className="text-slate-500 font-mono text-sm">Screen {item}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Row 2 - Right to Left (Faster) */}
                <div 
                    className="overflow-hidden"
                    onMouseEnter={() => setHoveredRow(2)}
                    onMouseLeave={() => setHoveredRow(null)}
                >
                    <motion.div
                        className="flex gap-6"
                        animate={{
                            x: hoveredRow === 2 ? undefined : [-4000, 0],
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 35,
                                ease: "linear",
                            },
                        }}
                    >
                        {/* Duplicate for seamless loop */}
                        {[...screens, ...screens].map((item, index) => (
                            <div
                                key={`row2-${index}`}
                                className="min-w-[500px] h-[500px] bg-elevated border border-border-subtle rounded-2xl flex items-center justify-center"
                            >
                                <span className="text-slate-500 font-mono text-sm">Screen {item + 8}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Row 3 - Left to Right (Slow - Same as Row 1) */}
                <div 
                    className="overflow-hidden"
                    onMouseEnter={() => setHoveredRow(3)}
                    onMouseLeave={() => setHoveredRow(null)}
                >
                    <motion.div
                        className="flex gap-6"
                        animate={{
                            x: hoveredRow === 3 ? undefined : [0, -4000],
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 50,
                                ease: "linear",
                            },
                        }}
                    >
                        {/* Duplicate for seamless loop */}
                        {[...screens, ...screens].map((item, index) => (
                            <div
                                key={`row3-${index}`}
                                className="min-w-[500px] h-[500px] bg-elevated border border-border-subtle rounded-2xl flex items-center justify-center"
                            >
                                <span className="text-slate-500 font-mono text-sm">Screen {item + 16}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Ecosystem;
