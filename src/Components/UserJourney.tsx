"use client";

import React from 'react';
import { motion } from 'framer-motion';

const UserJourney: React.FC = () => {
    return (
        <section className="py-24 relative overflow-hidden bg-background">
            {/* FigJam-style dotted background */}
            <div
                className="absolute inset-0 opacity-[0.15]"
                style={{
                    backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}
            />

            <div className="max-w-6xl mx-auto px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-elevated/50 backdrop-blur-sm border border-border-subtle rounded-[2rem] p-12 relative"
                >
                    <h4 className="text-text-accent font-mono text-[10px] tracking-widest uppercase mb-12 text-center">
                        USER JOURNEY FLOW
                    </h4>

                    {/* Flow Diagram */}
                    <div className="relative">
                        {/* Start Node */}
                        <div className="flex justify-center mb-8">
                            <div className="bg-emerald-500/10 border-2 border-emerald-500 rounded-2xl px-8 py-4 text-center">
                                <div className="text-emerald-500 font-mono text-xs uppercase tracking-wider mb-1">Start</div>
                                <div className="text-white font-semibold">Sign Up / Log In</div>
                                <div className="text-slate-400 text-sm">Mobile Number</div>
                            </div>
                        </div>

                        {/* Connector */}
                        <div className="flex justify-center mb-8">
                            <div className="w-0.5 h-12 bg-slate-600" />
                        </div>

                        {/* OTP Node */}
                        <div className="flex justify-center mb-8">
                            <div className="bg-blue-500/10 border-2 border-blue-500 rounded-2xl px-8 py-4">
                                <div className="text-white font-semibold text-center">OTP Verification</div>
                            </div>
                        </div>

                        {/* Connector */}
                        <div className="flex justify-center mb-8">
                            <div className="w-0.5 h-12 bg-slate-600" />
                        </div>

                        {/* Decision Node */}
                        <div className="flex justify-center mb-12">
                            <div className="bg-amber-500/10 border-2 border-amber-500 rounded-2xl px-8 py-4 relative">
                                <div className="text-amber-500 font-mono text-xs uppercase tracking-wider mb-1 text-center">Decision Point</div>
                                <div className="text-white font-semibold text-center">User Status Check</div>

                                {/* Three connectors going down */}
                                <div className="absolute -bottom-12 left-[15%] w-0.5 h-12 bg-slate-600" />
                                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-0.5 h-12 bg-slate-600" />
                                <div className="absolute -bottom-12 right-[15%] w-0.5 h-12 bg-slate-600" />
                            </div>
                        </div>

                        {/* Three Cases Grid */}
                        <div className="grid grid-cols-3 gap-6 mb-12">
                            {/* Case 1 */}
                            <div className="flex flex-col items-center">
                                <div className="bg-rose-500/10 border-2 border-rose-500 rounded-xl px-4 py-3 text-center mb-4">
                                    <div className="text-rose-500 font-mono text-[9px] uppercase tracking-wider mb-1">Case 1</div>
                                    <div className="text-white text-sm font-semibold mb-1">Registered</div>
                                    <div className="text-slate-400 text-xs">KYC Completed</div>
                                </div>
                                <div className="w-0.5 h-8 bg-slate-600 mb-4" />
                                <div className="bg-emerald-500/20 border-2 border-emerald-500 rounded-xl px-4 py-3 w-full">
                                    <div className="text-emerald-400 font-semibold text-sm text-center">✓ Dashboard</div>
                                </div>
                            </div>

                            {/* Case 2 */}
                            <div className="flex flex-col items-center">
                                <div className="bg-orange-500/10 border-2 border-orange-500 rounded-xl px-4 py-3 text-center mb-4">
                                    <div className="text-orange-500 font-mono text-[9px] uppercase tracking-wider mb-1">Case 2</div>
                                    <div className="text-white text-sm font-semibold mb-1">Registered</div>
                                    <div className="text-slate-400 text-xs">KYC Incomplete/Rejected</div>
                                </div>
                                <div className="w-0.5 h-8 bg-slate-600 mb-4" />
                                <div className="bg-orange-500/20 border-2 border-orange-500 rounded-xl px-4 py-3 w-full">
                                    <div className="text-orange-400 font-semibold text-sm text-center">⟳ Upload Documents</div>
                                </div>
                            </div>

                            {/* Case 3 */}
                            <div className="flex flex-col items-center">
                                <div className="bg-purple-500/10 border-2 border-purple-500 rounded-xl px-4 py-3 text-center mb-4">
                                    <div className="text-purple-500 font-mono text-[9px] uppercase tracking-wider mb-1">Case 3</div>
                                    <div className="text-white text-sm font-semibold mb-1">Not Registered</div>
                                    <div className="text-slate-400 text-xs">New User</div>
                                </div>
                                <div className="w-0.5 h-8 bg-slate-600 mb-4" />
                                <div className="bg-purple-500/20 border-2 border-purple-500 rounded-xl px-4 py-3 w-full">
                                    <div className="text-purple-400 font-semibold text-sm text-center">→ Complete KYC</div>
                                </div>
                            </div>
                        </div>

                        {/* KYC Flow Section */}
                        <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-8 mb-12">
                            <div className="text-text-accent font-mono text-xs uppercase tracking-wider mb-6 text-center">
                                KYC Flow Steps
                            </div>

                            <div className="flex items-center justify-between">
                                {/* Step 1 */}
                                <div className="flex-1">
                                    <div className="bg-blue-500/10 border border-blue-500 rounded-xl px-4 py-3 text-center">
                                        <div className="text-blue-400 text-xs font-mono mb-1">Step 1</div>
                                        <div className="text-white text-sm font-semibold">Basic Details</div>
                                    </div>
                                </div>

                                <div className="text-slate-600 px-3">→</div>

                                {/* Step 2 */}
                                <div className="flex-1">
                                    <div className="bg-blue-500/10 border border-blue-500 rounded-xl px-4 py-3 text-center">
                                        <div className="text-blue-400 text-xs font-mono mb-1">Step 2</div>
                                        <div className="text-white text-sm font-semibold">Business Details</div>
                                    </div>
                                </div>

                                <div className="text-slate-600 px-3">→</div>

                                {/* Step 3 */}
                                <div className="flex-1">
                                    <div className="bg-blue-500/10 border border-blue-500 rounded-xl px-4 py-3 text-center">
                                        <div className="text-blue-400 text-xs font-mono mb-1">Step 3</div>
                                        <div className="text-white text-sm font-semibold">Upload Docs</div>
                                    </div>
                                </div>

                                <div className="text-slate-600 px-3">→</div>

                                {/* Step 4 */}
                                <div className="flex-1">
                                    <div className="bg-blue-500/10 border border-blue-500 rounded-xl px-4 py-3 text-center">
                                        <div className="text-blue-400 text-xs font-mono mb-1">Step 4</div>
                                        <div className="text-white text-sm font-semibold">Bank Info</div>
                                    </div>
                                </div>

                                <div className="text-slate-600 px-3">→</div>

                                {/* Step 5 */}
                                <div className="flex-1">
                                    <div className="bg-emerald-500/10 border border-emerald-500 rounded-xl px-4 py-3 text-center">
                                        <div className="text-emerald-400 text-xs font-mono mb-1">Step 5</div>
                                        <div className="text-white text-sm font-semibold">Activate</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Connector */}
                        <div className="flex justify-center mb-8">
                            <div className="w-0.5 h-12 bg-slate-600" />
                        </div>

                        {/* Dashboard Limited */}
                        <div className="flex justify-center mb-8">
                            <div className="bg-slate-700/50 border-2 border-slate-500 rounded-2xl px-8 py-4 text-center">
                                <div className="text-slate-400 font-mono text-xs uppercase tracking-wider mb-1">Dashboard</div>
                                <div className="text-white font-semibold">Accept Payment</div>
                                <div className="text-amber-400 text-sm">Limited: ₹10k/month</div>
                                <div className="text-slate-500 text-xs mt-1">No Settlement</div>
                            </div>
                        </div>

                        {/* Connector */}
                        <div className="flex justify-center mb-8">
                            <div className="w-0.5 h-12 bg-slate-600" />
                        </div>

                        {/* Upgrade Options */}
                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div className="bg-purple-500/10 border-2 border-purple-500 rounded-xl px-6 py-4 text-center">
                                <div className="text-purple-400 font-semibold mb-1">Upgrade to V-KYC</div>
                                <div className="text-slate-400 text-xs">For Higher Limits</div>
                            </div>
                            <div className="bg-cyan-500/10 border-2 border-cyan-500 rounded-xl px-6 py-4 text-center">
                                <div className="text-cyan-400 font-semibold mb-1">Request PG Activation</div>
                                <div className="text-slate-400 text-xs">Payment Gateway</div>
                            </div>
                        </div>

                        {/* Connector */}
                        <div className="flex justify-center mb-8">
                            <div className="w-0.5 h-12 bg-slate-600" />
                        </div>

                        {/* Full Dashboard */}
                        <div className="flex justify-center mb-8">
                            <div className="bg-emerald-500/20 border-2 border-emerald-500 rounded-2xl px-10 py-5 text-center">
                                <div className="text-emerald-400 font-mono text-xs uppercase tracking-wider mb-2">Full Access</div>
                                <div className="text-white font-bold text-lg">Complete Dashboard</div>
                                <div className="text-emerald-300 text-sm mt-1">All Features Unlocked</div>
                            </div>
                        </div>

                        {/* Connector */}
                        <div className="flex justify-center mb-8">
                            <div className="w-0.5 h-12 bg-slate-600" />
                        </div>

                        {/* End Node */}
                        <div className="flex justify-center">
                            <div className="bg-text-accent/10 border-2 border-text-accent rounded-2xl px-10 py-5 text-center">
                                <div className="text-text-accent font-mono text-xs uppercase tracking-wider mb-1">Final Step</div>
                                <div className="text-white font-bold text-lg">Settle Money</div>
                                <div className="text-slate-400 text-sm mt-1">Withdraw to Bank Account</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default UserJourney;
