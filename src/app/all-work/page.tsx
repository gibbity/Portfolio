"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AllWorkPage() {
  return (
    <main className="relative w-full min-h-screen bg-black text-white font-sans flex flex-col justify-between p-8 md:p-16 select-none overflow-hidden">
      {/* Background radial accent */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(#4A5EBF 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />

      {/* Top Header */}
      <div className="w-full flex justify-between items-center z-10">
        <Link href="/" className="font-sans font-medium text-[14px] tracking-tight hover:opacity-70 transition-opacity">
          Shresth Kushwaha
        </Link>
        <span className="font-sans font-medium text-[12px] text-white/40 uppercase tracking-[0.2em]">
          All Work / Index
        </span>
      </div>

      {/* Main Content */}
      <div className="my-auto flex flex-col items-center text-center z-10 space-y-8">
        <motion.div
          animate={{ scale: [1, 1.05, 1], rotate: 360 }}
          transition={{ 
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 25, repeat: Infinity, ease: "linear" }
          }}
          className="mb-4"
        >
          <svg width="48" height="48" viewBox="-12 -12 24 24" fill="none">
            <path 
              d="M 0 -10 L 0 10 M -10 0 L 10 0 M -7 -7 L 7 7 M -7 7 L 7 -7"
              stroke="#4A5EBF" 
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>

        <h1 className="font-helvetica font-bold text-[48px] md:text-[88px] leading-none tracking-tighter uppercase italic text-white">
          Work in <br />
          <span className="text-white/20">Progress</span>
        </h1>

        <p className="font-sans font-normal text-[15px] md:text-[17px] text-white/50 max-w-md leading-relaxed">
          I am currently cataloging, writing case studies, and preparing interactive playbooks for my other commercial and conceptual design modules.
        </p>

        <div className="pt-6">
          <Link 
            href="/" 
            className="px-8 py-3.5 border border-white/25 rounded hover:bg-white hover:text-black transition-all duration-300 font-sans font-bold text-[11px] uppercase tracking-widest"
          >
            Return to Space
          </Link>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="w-full flex justify-between items-end z-10 text-[9px] font-black uppercase tracking-[0.4em] text-white/20">
        <p>© 2026 Shresth Kushwaha</p>
        <p>Est. 2026</p>
      </div>
    </main>
  );
}
