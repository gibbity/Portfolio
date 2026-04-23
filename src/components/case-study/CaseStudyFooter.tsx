"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface CaseStudyFooterProps {
  nextProject: {
    name: string;
    href: string;
  };
  theme?: "dark" | "light";
}

export default function CaseStudyFooter({ nextProject, theme = "light" }: CaseStudyFooterProps) {
  const isDark = theme === "dark";

  return (
    <footer className={`relative z-10 py-24 md:py-40 px-6 md:px-12 lg:px-24 border-t ${isDark ? 'bg-black border-white/5 text-white' : 'bg-white border-gray-100 text-black'} overflow-hidden`}>
      <div className="flex flex-col md:flex-row justify-between items-end gap-16 md:gap-20">
        <div className="group">
          <span className={`text-[11px] font-black uppercase tracking-[0.5em] block mb-8 md:mb-10 ${isDark ? 'text-white/20' : 'text-black/20'}`}>
            I am moving to...
          </span>
          <Link href={nextProject.href} className="relative block group">
            <h2 className="text-[56px] md:text-[160px] font-helvetica font-bold tracking-tighter hover:italic transition-all duration-700 leading-none uppercase">
              {nextProject.name}
            </h2>
            <div className={`absolute bottom-4 left-0 h-[2px] w-0 transition-all duration-1000 group-hover:w-full ${isDark ? 'bg-white' : 'bg-black'}`} />
          </Link>
        </div>
        
        <div className="text-right max-w-[200px]">

          <p className={`text-[11px] font-medium leading-relaxed italic ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
            Project documentation and design system complete.
          </p>
          <p className={`text-[10px] font-black uppercase mt-6 tracking-widest ${isDark ? 'text-white/20' : 'text-black/20'}`}>
            © 2026 Product Design Portfolio
          </p>
        </div>
      </div>
      
      {/* Visual background number for depth */}
      <div className={`absolute top-[20%] right-[-5%] font-helvetica font-bold text-[300px] md:text-[500px] pointer-events-none select-none -z-10 opacity-[0.03] ${isDark ? 'text-white' : 'text-black'}`}>
        0X
      </div>
    </footer>
  );
}
