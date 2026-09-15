"use client";

import React from "react";
import Link from "next/link";

export interface CaseStudyFooterProps {
  nextProject?: {
    name: string;
    href: string;
    category?: string;
  };
  theme?: "dark" | "light";
}

export default function CaseStudyFooter({ nextProject, theme = "light" }: CaseStudyFooterProps) {
  const isDark = theme === "dark";

  if (!nextProject) return null;

  return (
    <footer className={`relative z-10 py-16 sm:py-24 px-5 sm:px-8 md:px-12 lg:px-16 border-t ${
      isDark 
        ? "bg-neutral-950 border-white/10 text-white" 
        : "bg-white border-neutral-200/80 text-black"
    } overflow-hidden`}>
      <div className="max-w-6xl mx-auto">
        {/* Next Project CTA */}
        <div className="text-left">
          <span className={`text-[11px] font-sans font-bold uppercase tracking-[0.3em] block mb-4 ${isDark ? "text-white/40" : "text-neutral-400"}`}>
            Next Case Study
          </span>
          <Link href={nextProject.href} className="group inline-block">
            <h2 className={`font-serif text-[38px] sm:text-[56px] md:text-[72px] font-normal leading-[1.05] tracking-tight group-hover:italic group-hover:underline decoration-1 underline-offset-8 transition-all ${
              isDark ? "text-white" : "text-neutral-900"
            }`}>
              {nextProject.name} →
            </h2>
            {nextProject.category && (
              <span className={`font-sans text-[12px] sm:text-[13px] uppercase tracking-widest block mt-2 ${
                isDark ? "text-white/40" : "text-neutral-400"
              }`}>
                {nextProject.category}
              </span>
            )}
          </Link>
        </div>
      </div>
    </footer>
  );
}
