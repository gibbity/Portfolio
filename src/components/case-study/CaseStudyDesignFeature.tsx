"use client";

import React from "react";

interface CaseStudyDesignFeatureProps {
  index: string; // e.g. "DESIGN 1/3"
  title: string;
  subtitle: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
}

export default function CaseStudyDesignFeature({
  index,
  title,
  subtitle,
  description,
  children,
  className = "",
}: CaseStudyDesignFeatureProps) {
  return (
    <div className={`py-12 sm:py-16 text-left border-t border-neutral-200/80 first:border-t-0 ${className}`}>
      {/* Index Tag */}
      <div className="mb-4">
        <span className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-neutral-400">
          {index}
        </span>
      </div>

      {/* 2-Column Header */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start mb-8 sm:mb-10">
        <div className="md:col-span-5">
          <h3 className="font-serif text-[26px] sm:text-[32px] md:text-[36px] leading-[1.15] text-neutral-900 tracking-tight font-normal">
            {title}
            <span className="block font-serif italic text-neutral-600 text-[22px] sm:text-[26px] mt-1 font-normal">
              {subtitle}
            </span>
          </h3>
        </div>

        <div className="md:col-span-7">
          <p className="font-sans text-[14px] sm:text-[15px] leading-relaxed text-neutral-600">
            {description}
          </p>
        </div>
      </div>

      {/* Main Visual / Interactive Media Container */}
      {children && (
        <div className="w-full rounded-2xl overflow-hidden border border-neutral-200/80 bg-[#FAFAFA] p-2 sm:p-4 shadow-xs">
          {children}
        </div>
      )}
    </div>
  );
}
