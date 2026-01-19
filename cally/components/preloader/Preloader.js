"use strict";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Preloader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [showCards, setShowCards] = useState({
        info: false,
        shaders: false,
        location: false,
    });

    useEffect(() => {
        if (progress >= 100) {
            setTimeout(() => {
                setIsLoaded(true);
                if (onComplete) onComplete();
            }, 200);
            return;
        }

        const delays = [200, 150, 250, 150, 200, 300, 150, 200, 150, 200];
        const currentStep = Math.floor(progress / 10);

        const timer = setTimeout(() => {
            setProgress((prev) => Math.min(prev + 10, 100));
        }, delays[currentStep] || 250);

        return () => clearTimeout(timer);
    }, [progress, onComplete]);


    useEffect(() => {
        if (progress >= 25) setShowCards(prev => ({ ...prev, info: true }));
        if (progress >= 55) setShowCards(prev => ({ ...prev, shaders: true }));
        if (progress >= 85) setShowCards(prev => ({ ...prev, location: true }));
    }, [progress]);

    return (
        <AnimatePresence>
            {!isLoaded && (
                <motion.div
                    initial={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505] overflow-hidden select-none"
                >
                    {/* Awwwards Mesh Gradient Background */}
                    {/* <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
                        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-[#222] rounded-full blur-[120px] animate-pulse" />
                        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-[#1a1a1a] rounded-full blur-[100px]" />
                    </div> */}

                    {/* Main Loader Card - Modern Browser Shell (Compact) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="relative z-10 w-[420px] rounded-2xl border border-white/8 bg-[#0D0D0D] shadow-[0_40px_100px_rgba(0,0,0,0.9)] overflow-hidden backdrop-blur-3xl"
                    >
                        {/* Safari Browser Top Bar */}
                        <div className="grid grid-cols-3 items-center px-4 py-2 bg-[#141414] border-b border-white/5">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1.5 px-1">
                                    <span className="w-2.5 h-2.5 bg-[#FF5F56] rounded-full shadow-[0_0_8px_rgba(255,95,86,0.1)]" />
                                    <span className="w-2.5 h-2.5 bg-[#FFBD2E] rounded-full shadow-[0_0_8px_rgba(255,189,46,0.1)]" />
                                    <span className="w-2.5 h-2.5 bg-[#27C93F] rounded-full shadow-[0_0_8px_rgba(39,201,63,0.1)]" />
                                </div>
                                <div className="flex items-center space-x-3 opacity-20">
                                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 1L1 5L5 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 1L5 5L1 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>

                            <div className="bg-black/30 border border-white/5 rounded-md h-6 flex items-center px-3 w-full max-w-[200px] group justify-self-center hover:bg-black/50 transition-colors cursor-default">
                                <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-30">
                                    <rect x="1" y="4" width="6" height="5" rx="1" stroke="white" strokeWidth="1.2" />
                                    <path d="M2.5 4V2.5C2.5 1.67157 3.17157 1 4 1C4.82843 1 5.5 1.67157 5.5 2.5V4" stroke="white" strokeWidth="1.2" />
                                </svg>
                                <span className="ml-2 text-[10px] text-white/40 font-medium tracking-tight overflow-hidden text-ellipsis whitespace-nowrap font-urbanist">getcally.vercel.app</span>
                            </div>

                            <div className="flex items-center justify-end space-x-3 opacity-20 pr-1">
                                <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 9V1M6 1L3.5 3.5M6 1L8.5 3.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M1 5.5V12C1 12.5523 1.44772 13 2 13H10C10.5523 13 11 12.5523 11 12V5.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                                </svg>
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 1V11M1 6H11" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                                </svg>
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3" y="1" width="8" height="8" rx="1.5" stroke="white" strokeWidth="1.2" />
                                    <rect x="1" y="3" width="8" height="8" rx="1.5" fill="#141414" stroke="white" strokeWidth="1.2" />
                                </svg>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="p-8">

                            {/* Modern Progress Grid - Compact */}
                            <div className="flex justify-between gap-2 p-1.5 bg-black/50 rounded-xl border border-white/[0.05] shadow-inner">
                                {[...Array(10)].map((_, i) => {
                                    const isActive = progress >= (i + 1) * 10;
                                    return (
                                        <motion.div
                                            key={i}
                                            animate={{
                                                backgroundColor: isActive ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.03)",
                                                scale: isActive ? 1 : 0.96,
                                                boxShadow: isActive
                                                    ? "0 0 20px rgba(255,255,255,0.2), 0 0 40px rgba(255,255,255,0.1)"
                                                    : "none"
                                            }}
                                            transition={{ duration: 0.3, ease: "easeOut" }}
                                            className="h-7 w-full rounded-lg"
                                        />
                                    );
                                })}
                            </div>

                            {/* Percentage and Data Info */}
                            <div className="mt-8 flex items-end justify-end">
                                <div className="flex flex-col items-end">
                                    <div className="flex items-baseline gap-1">
                                        <motion.span
                                            className="text-4xl font-black tracking-tighter text-white font-urbanist leading-none"
                                        >
                                            {progress}
                                        </motion.span>
                                        <span className="text-sm font-black text-white/20 font-urbanist">%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Floating High-End Cards */}
                    <AnimatePresence>
                        {showCards.info && (
                            <motion.div
                                key="info-card"
                                drag
                                dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
                                initial={{ opacity: 0, scale: 0.8, x: 120, y: 120, rotate: 10 }}
                                animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: -2 }}
                                whileHover={{ scale: 1.02, rotate: 0 }}
                                className="absolute bottom-20 right-20 p-5 bg-[#0D0D0D] backdrop-blur-3xl rounded-2xl shadow-[0_22px_70px_rgba(0,0,0,0.8)] cursor-grab active:cursor-grabbing border border-white/5 max-w-[260px]"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 1V13M1 7H13" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-bold text-white tracking-tight font-urbanist">Availability Sync</p>
                                        <p className="text-[9px] font-medium text-white/30 uppercase tracking-widest font-urbanist"> Always On</p>
                                    </div>
                                </div>
                                <p className="text-[13px] font-medium leading-[1.4] text-white/70 tracking-tight font-urbanist">
                                    Smart scheduling infrastructure built for seamless bookings, real-time availability, and frictionless meetings.
                                </p>
                            </motion.div>
                        )}

                        {showCards.shaders && (
                            <motion.div
                                key="shaders-card"
                                drag
                                initial={{ opacity: 0, scale: 0.8, x: -150, y: 150, rotate: -15 }}
                                animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 4 }}
                                whileHover={{ scale: 1.05, rotate: 2 }}
                                className="absolute bottom-40 left-20 p-8 bg-[#0D0D0D] backdrop-blur-3xl rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.9)] cursor-grab active:cursor-grabbing border border-white/5"
                            >
                                <div className="flex flex-col gap-1">
                                    <p className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.4em] mb-3">Booking System</p>
                                    <h3 className="text-4xl font-extrabold tracking-tighter text-white leading-[0.9] font-urbanist">
                                        SMART<br />
                                        <span className="text-white/40">TIME</span><br />
                                        SLOTS
                                    </h3>
                                    <div className="mt-6 flex items-center gap-2">
                                        <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
                                            <Avatar>
                                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                            <Avatar>
                                                <AvatarImage
                                                    src="https://github.com/maxleiter.png"
                                                    alt="@maxleiter"
                                                />
                                                <AvatarFallback>LR</AvatarFallback>
                                            </Avatar>
                                            <Avatar>
                                                <AvatarImage
                                                    src="https://github.com/evilrabbit.png"
                                                    alt="@evilrabbit"
                                                />
                                                <AvatarFallback>ER</AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <p className="text-[10px] font-medium text-white/30 font-urbanist">Live Bookings</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {showCards.location && (
                            <motion.div
                                key="location-card"
                                drag
                                initial={{ opacity: 0, scale: 0.8, x: 80, y: -150, rotate: 12 }}
                                animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: -4 }}
                                className="absolute top-24 right-40 py-3 px-6 bg-[#0D0D0D] backdrop-blur-2xl rounded-full shadow-2xl cursor-grab active:cursor-grabbing border border-white/5 flex items-center gap-3"
                            >
                                <div className="relative">
                                    <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
                                    <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-500 animate-ping opacity-40" />
                                </div>
                                <p className="text-[11px] font-bold text-white tracking-tight flex items-center gap-2 font-urbanist">
                                    MEETINGS LIVE
                                    <span className="text-white/20">|</span>
                                    <span className="text-white/40 font-mono">2026</span>
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Background Micro-Details */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:32px_32px]" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
