"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ReceiptProps {
    id?: string;
    role?: string;
    roleSub?: string;
    duration?: string;
    durationSub?: string;
    objective?: string;
}

const Receipt: React.FC<ReceiptProps> = ({
    id = "8821-X9-FIN",
    role = "Lead Product Designer",
    roleSub = "1 PM, 2 Devs",
    duration = "12 Weeks",
    durationSub = "Sprint 1-6",
    objective = '"Balance Revenue vs. API Limits vs. User Trust"',
}) => {
    return (
        <section className="py-12 w-full flex justify-center relative z-20 overflow-hidden">
            <motion.div
                initial={{ scaleX: 0.9, opacity: 0, y: 20 }}
                whileInView={{ scaleX: 1, opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="relative w-full bg-[#f8fafc] text-slate-900 shadow-[0_0_40px_rgba(255,255,255,0.1)] flex group"
            >
                {/* Perforated Left Edge Pattern */}
                <div className="relative w-6 flex-shrink-0 bg-white flex flex-col items-center py-1 gap-1">
                    {[...Array(12)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-background rounded-sm" />
                    ))}
                    {/* Thick Vertical Accent Line */}
                    <div className="absolute right-0 top-0 w-[6px] h-full bg-slate-900 group-hover:bg-[#166C8F] transition-colors duration-300" />
                </div>

                <div className="flex-1 flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-dashed divide-slate-300 border-y-4 border-double border-slate-300">

                    {/* Header Block */}
                    <div className="p-4 lg:w-40 bg-slate-100 flex flex-col justify-center shrink-0">
                        <h3 className="font-bold text-lg leading-none mb-2 tracking-tight uppercase">PROJECT<br />LOG_v1.2</h3>
                        <p className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">Ref: {id}</p>
                    </div>

                    {/* Data Grid */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 divide-x divide-dashed divide-slate-300">
                        {/* Role */}
                        <div className="p-4 flex flex-col justify-center hover:bg-white transition-colors">
                            <span className="font-mono text-[9px] text-slate-400 font-bold mb-2 uppercase tracking-wider">Role</span>
                            <span className="font-mono text-xs font-semibold text-slate-800 leading-snug uppercase">
                                {role}
                            </span>
                            <span className="text-slate-400 font-normal text-[10px] uppercase mt-1">{roleSub}</span>
                        </div>

                        {/* Timeline */}
                        <div className="p-4 flex flex-col justify-center hover:bg-white transition-colors">
                            <span className="font-mono text-[9px] text-slate-400 font-bold mb-2 uppercase tracking-wider">Duration</span>
                            <span className="font-mono text-xs font-semibold text-slate-800 uppercase">
                                {duration}<br />
                                <span className="text-slate-400 font-normal text-[10px] uppercase">{durationSub}</span>
                            </span>
                        </div>

                        {/* Mission */}
                        <div className="p-4 flex flex-col justify-center hover:bg-white transition-colors">
                            <span className="font-mono text-[9px] text-slate-400 font-bold mb-2 uppercase tracking-wider">Objective</span>
                            <span className="font-mono text-[11px] font-medium leading-tight text-slate-700 uppercase italic">
                                {objective}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Edge Decoration (Notches) */}
                <div className="absolute -right-1 top-0 bottom-0 w-2 h-full bg-[radial-gradient(circle_at_right,transparent_5px,#f8fafc_5px)] bg-[size:10px_20px] bg-repeat-y" />
            </motion.div>
        </section>
    );
};

export default Receipt;