"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ArchetypeCardProps {
    title: string;
    archetype: string;
    description: string;
    quote: string;
    driver: string;
    themeColor: "orange" | "blue";
    icon: ReactNode;
}

export default function ArchetypeCard({
    title,
    archetype,
    description,
    quote,
    driver,
    themeColor,
    icon,
}: ArchetypeCardProps) {
    const isOrange = themeColor === "orange";
    const accentClass = isOrange ? "border-orange-500" : "border-blue-500";
    const textAccentClass = isOrange ? "text-orange-400" : "text-blue-400";
    const bgAccentClass = isOrange ? "bg-orange-500/10" : "bg-blue-500/10";
    const pillClass = isOrange ? "bg-orange-500/20 text-orange-400" : "bg-blue-500/20 text-blue-400";

    return (
        <motion.div
            className={`relative flex flex-col h-full p-8 rounded-2xl bg-elevated overflow-hidden`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <div className={`w-10 h-10 rounded-xl ${bgAccentClass} flex items-center justify-center ${textAccentClass}`}>
                    {icon}
                </div>
                <div>
                    <h4 className="text-lg font-bold text-white leading-tight">{title}</h4>
                    <p className={`text-xs font-mono uppercase tracking-widest mt-0.5 ${textAccentClass}`}>
                        {archetype}
                    </p>
                </div>
            </div>

            {/* Body */}
            <div className="flex-grow space-y-4">
                <p className="text-sm text-slate-300 leading-relaxed">
                    {description}
                </p>

                <div className="relative pl-5 py-0.5">
                    <div className={`absolute left-0 top-0 w-[1.5px] h-full ${bgAccentClass.replace('/10', '/40')}`} />
                    <p className="text-sm text-slate-400 italic leading-relaxed">
                        "{quote}"
                    </p>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-5 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    PRIMARY DRIVER
                </span>
                <div className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-tight ${pillClass}`}>
                    {driver}
                </div>
            </div>
        </motion.div>
    );
}
