"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Container from '@/Components/container';

const Ecosystem: React.FC = () => {
    // Define screens for each row (6 screens per row = 18 total)
    const row1Screens = [1, 2, 3, 4, 5, 6];
    const row2Screens: (number | string)[] = [7, 8, 9, 'mobile-combo', 10, 11, 12];
    const row3Screens = [13, 14, 15, 16, 17, 18];

    // Hover states for each row
    const [hoveredRow, setHoveredRow] = React.useState<number | null>(null);

    // Bare gallery rows: section shell and background come from the case-study
    // page (Case Study 2's template), not from this component.
    return (
        <div className="relative overflow-hidden z-20" style={{ width: "100vw", position: "relative", left: "50%", right: "50%", marginLeft: "-50vw", marginRight: "-50vw" }}>
            <div className="w-full">
                {/* Scrolling Rows */}
                <div className="flex flex-col gap-[24px]">
                    {/* Row 1 - Left to Right (Slow) */}
                    <div
                        className="overflow-hidden"
                        onMouseEnter={() => setHoveredRow(1)}
                        onMouseLeave={() => setHoveredRow(null)}
                    >
                        <motion.div
                            className="flex gap-[24px]"
                            animate={{
                                x: hoveredRow === 1 ? undefined : [0, -3100],
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
                            {[...row1Screens, ...row1Screens].map((item, index) => (
                                <div
                                    key={`row1-${index}`}
                                    className="min-w-[500px] h-[300px] bg-elevated border border-border-subtle rounded-[12px] overflow-hidden shrink-0"
                                >
                                    <img
                                        src={`/Ecosystem/${item}.svg`}
                                        alt={`Screen ${item}`}
                                        className="w-full h-full object-cover"
                                    />
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
                            className="flex gap-[24px]"
                            animate={{
                                x: hoveredRow === 2 ? undefined : [-3600, 0], // Increased distance for extra item
                            }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 40, // Slightly adjusted duration
                                    ease: "linear",
                                },
                            }}
                        >
                            {/* Duplicate for seamless loop */}
                            {[...row2Screens, ...row2Screens].map((item, index) => {
                                if (item === 'mobile-combo') {
                                    return (
                                        <div
                                            key={`row2-${index}`}
                                            className="min-w-[500px] h-[300px] bg-elevated border border-border-subtle rounded-[12px] overflow-hidden shrink-0 flex items-center justify-center gap-4 p-6"
                                        >
                                            {/* Mobile Screen 1 - Raw Image, Bigger */}
                                            <img
                                                src="/Ecosystem/Mob1.png"
                                                className="w-[130px] h-auto object-contain hover:scale-105 transition-transform duration-300"
                                                alt="Mobile 1"
                                            />
                                            {/* Mobile Screen 2 (Center) - Largest */}
                                            <img
                                                src="/Ecosystem/Mob2.png"
                                                className="w-[150px] h-auto object-contain z-10 hover:scale-105 transition-transform duration-300"
                                                alt="Mobile 2"
                                            />

                                            {/* Mobile Screen 3 - Raw Image, Bigger */}
                                            <img
                                                src="/Ecosystem/Mob3.png"
                                                className="w-[130px] h-auto object-contain hover:scale-105 transition-transform duration-300"
                                                alt="Mobile 3"
                                            />
                                        </div>
                                    );
                                }
                                return (
                                    <div
                                        key={`row2-${index}`}
                                        className="min-w-[500px] h-[300px] bg-elevated border border-border-subtle rounded-[12px] overflow-hidden shrink-0"
                                    >
                                        <img
                                            src={`/Ecosystem/${item}.svg`}
                                            alt={`Screen ${item}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                );
                            })}
                        </motion.div>
                    </div>

                    {/* Row 3 - Left to Right (Slow - Same as Row 1) */}
                    <div
                        className="overflow-hidden"
                        onMouseEnter={() => setHoveredRow(3)}
                        onMouseLeave={() => setHoveredRow(null)}
                    >
                        <motion.div
                            className="flex gap-[24px]"
                            animate={{
                                x: hoveredRow === 3 ? undefined : [0, -3100],
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
                            {[...row3Screens, ...row3Screens].map((item, index) => (
                                <div
                                    key={`row3-${index}`}
                                    className="min-w-[500px] h-[300px] bg-elevated border border-border-subtle rounded-[12px] overflow-hidden shrink-0"
                                >
                                    <img
                                        src={`/Ecosystem/${item}.svg`}
                                        alt={`Screen ${item}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ecosystem;
