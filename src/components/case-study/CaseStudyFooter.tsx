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

  return (
    <footer className={`relative z-10 py-16 sm:py-24 px-5 sm:px-8 md:px-12 lg:px-16 border-t ${
      isDark 
        ? "bg-neutral-950 border-white/10 text-white" 
        : "bg-white border-neutral-200/80 text-black"
    } overflow-hidden`}>
      <div className="max-w-6xl mx-auto space-y-16 sm:space-y-20">
        
        {/* Next Project CTA (if provided) */}
        {nextProject && (
          <div className={`text-left pb-12 sm:pb-16 border-b ${isDark ? "border-white/10" : "border-neutral-200/60"}`}>
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
        )}

        {/* Minimal Social & Contact Links Row (Page 7 style) */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[13px] sm:text-[14px] font-sans font-medium">
          <a
            href="mailto:kushwaha.shresth@gmail.com"
            className={`inline-flex items-center hover:underline underline-offset-4 transition-colors ${
              isDark ? "text-white/80 hover:text-white" : "text-neutral-700 hover:text-black"
            }`}
          >
            email
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center hover:underline underline-offset-4 transition-colors ${
              isDark ? "text-white/80 hover:text-white" : "text-neutral-700 hover:text-black"
            }`}
          >
            résumé
          </a>
          <a
            href="https://linkedin.com/in/shresthkushwaha"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center hover:underline underline-offset-4 transition-colors ${
              isDark ? "text-white/80 hover:text-white" : "text-neutral-700 hover:text-black"
            }`}
          >
            linkedin
          </a>
          <a
            href="https://x.com/kushwaha_shresh"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center hover:underline underline-offset-4 transition-colors ${
              isDark ? "text-white/80 hover:text-white" : "text-neutral-700 hover:text-black"
            }`}
          >
            twitter
          </a>
        </div>

        {/* Copyright & Meta Note */}
        <div className={`text-center pt-8 border-t space-y-2 ${isDark ? "border-white/5" : "border-neutral-100"}`}>
          <p className={`font-sans text-[11px] sm:text-[12px] tracking-wide ${isDark ? "text-white/30" : "text-neutral-400"}`}>
            © Shresth Kushwaha 2026. All rights reserved • Human-crafted design & engineering
          </p>
        </div>
      </div>
    </footer>
  );
}
