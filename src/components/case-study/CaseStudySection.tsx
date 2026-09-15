"use client";

import React from "react";

interface CaseStudySectionProps {
  id?: string;
  tag: string;
  headline: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  bottomMedia?: React.ReactNode;
}

export default function CaseStudySection({
  id,
  tag,
  headline,
  children,
  className = "",
  bottomMedia,
}: CaseStudySectionProps) {
  return (
    <section
      id={id}
      className={`py-16 sm:py-20 md:py-24 px-5 sm:px-8 md:px-12 lg:px-16 max-w-6xl mx-auto border-t border-neutral-200/80 ${className}`}
    >
      {/* Top Tag */}
      <div className="mb-6 sm:mb-8 text-left">
        <span className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-neutral-400">
          {tag}
        </span>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start text-left">
        {/* Left: Serif Headline / Bold Statement */}
        <div className="md:col-span-6 lg:col-span-5">
          <div className="font-serif text-[24px] sm:text-[28px] md:text-[34px] leading-[1.2] text-neutral-900 tracking-tight">
            {headline}
          </div>
        </div>

        {/* Right: Narrative / Bullets / Subheaders */}
        <div className="md:col-span-6 lg:col-span-7 space-y-5 font-sans text-[14px] sm:text-[15px] leading-relaxed text-neutral-600">
          {children}
        </div>
      </div>

      {/* Optional Media Container */}
      {bottomMedia && (
        <div className="mt-12 sm:mt-16 w-full">
          {bottomMedia}
        </div>
      )}
    </section>
  );
}
