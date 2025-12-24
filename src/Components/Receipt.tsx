"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ReceiptProps {
    id?: string;
    role?: string;
    roleSub?: string;
    duration?: string;
    durationSub?: string;
    tools?: string;
    objective?: string;
}

const Receipt: React.FC<ReceiptProps> = ({
    id = "8821-X9-FIN",
    role = "Lead Product Designer",
    roleSub = "1 PM, 2 Devs",
    duration = "12 Weeks",
    durationSub = "Sprint 1-6",
    tools = "Figma, React, Linear",
    objective = '"Balance Revenue vs. API Limits vs. User Trust"',
}) => {
    return (
        <section className="py-12 w-full flex justify-center relative z-20 overflow-hidden">
            <motion.div
                initial={{ scaleX: 0.9, opacity: 0, y: 20 }}
                whileInView={{ scaleX: 1, opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="relative w-full text-slate-900 drop-shadow-[0_0_40px_rgba(255,255,255,0.1)] flex group"
            >
                {/* Scalloped Left Edge Pattern */}
                <div
                    className="relative w-12 shrink-0 border-r border-dashed border-slate-300 overflow-hidden"
                    style={{
                        background: `
                            radial-gradient(circle at 0 50%, transparent 6px, #ffffff 6.5px) 0 0 / 14px 20px repeat-y,
                            linear-gradient(#ffffff, #ffffff) 14px 0 / calc(100% - 14px) 100% no-repeat
                        `
                    }}
                >
                    {/* Vertical Accent Line Overlay */}
                    <div className="absolute right-[6px] top-0 bottom-0 w-[3px] bg-slate-900 group-hover:bg-[#166C8F] transition-colors duration-300" />
                </div>

                <div className="flex-1 bg-[#f8fafc] flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-dashed divide-slate-300 border-y-4 border-double border-slate-300">

                    {/* Header Block */}
                    <div className="p-4 lg:w-40 bg-slate-100 flex flex-col justify-center shrink-0">
                        <div className="mb-3 self-start inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-100/50 border border-emerald-200/50">
                            <span className="font-mono text-[8px] font-bold text-emerald-700 uppercase tracking-wider">Status: Live</span>
                        </div>
                        <h3 className="font-bold text-lg leading-none mb-2 tracking-tight uppercase">PROJECT<br />LOG_v1.2</h3>
                        <p className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">Ref: {id}</p>
                    </div>

                    {/* Data Grid - 4 Columns */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 divide-x divide-dashed divide-slate-300">
                        {/* Role */}
                        <div className="p-4 flex flex-col justify-start hover:bg-white transition-colors">
                            <span className="font-mono text-[9px] text-slate-400 font-bold mb-2 uppercase tracking-wider">Role</span>
                            <span className="font-mono text-xs font-bold text-slate-800 leading-snug uppercase">
                                {role}
                            </span>
                            <span className="font-mono text-[10px] text-slate-500 font-medium uppercase mt-1">{roleSub}</span>
                        </div>

                        {/* Duration */}
                        <div className="p-4 flex flex-col justify-start hover:bg-white transition-colors">
                            <span className="font-mono text-[9px] text-slate-400 font-bold mb-2 uppercase tracking-wider">Duration</span>
                            <span className="font-mono text-xs font-bold text-slate-800 leading-snug uppercase">
                                {duration}
                            </span>
                            <span className="font-mono text-[10px] text-slate-500 font-medium uppercase mt-1">{durationSub}</span>
                        </div>

                        {/* Tools Used */}
                        <div className="p-4 flex flex-col justify-start hover:bg-white transition-colors">
                            <span className="font-mono text-[9px] text-slate-400 font-bold mb-2 uppercase tracking-wider">Tools Used</span>
                            <span className="font-mono text-xs font-bold text-slate-800 leading-snug uppercase">
                                {tools}
                            </span>
                        </div>

                        {/* Objective */}
                        <div className="p-4 flex flex-col justify-start hover:bg-white transition-colors">
                            <span className="font-mono text-[9px] text-slate-400 font-bold mb-2 uppercase tracking-wider">Objective</span>
                            <span className="font-mono text-xs font-bold text-slate-800 leading-snug uppercase">
                                {objective}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Edge Decoration (Notches) */}
                <div className="absolute -right-1 top-0 bottom-0 w-2 h-full" style={{
                    background: 'radial-gradient(circle at right, transparent 5px, #f8fafc 5px)',
                    backgroundSize: '10px 20px',
                    backgroundRepeat: 'repeat-y'
                }} />
            </motion.div>
        </section>
    );
};

export default Receipt;
