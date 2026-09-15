"use client";

import React from "react";

export interface NextStepItem {
  title: string;
  description: string;
  media?: React.ReactNode;
}

interface CaseStudyNextStepsProps {
  tag?: string;
  items: NextStepItem[];
  closingTagline?: string;
}

export default function CaseStudyNextSteps({
  tag = "WHAT I WOULD DO NEXT...",
  items,
  closingTagline = "Designed with rigor for high-stakes thinkers. — fin.",
}: CaseStudyNextStepsProps) {
  return (
    <section className="py-16 sm:py-20 md:py-24 px-5 sm:px-8 md:px-12 lg:px-16 max-w-6xl mx-auto border-t border-neutral-200/80 text-left">
      {/* Section Tag */}
      <div className="mb-10 sm:mb-12">
        <span className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-neutral-400">
          {tag}
        </span>
      </div>

      {/* Items */}
      <div className="space-y-16">
        {items.map((item, idx) => (
          <div key={idx} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start">
              <div className="md:col-span-5">
                <h4 className="font-serif text-[24px] sm:text-[28px] text-neutral-900 font-normal leading-snug">
                  {item.title}
                </h4>
              </div>
              <div className="md:col-span-7">
                <p className="font-sans text-[14px] sm:text-[15px] leading-relaxed text-neutral-600">
                  {item.description}
                </p>
              </div>
            </div>

            {item.media && (
              <div className="w-full rounded-2xl overflow-hidden border border-neutral-200/80 bg-[#FAFAFA] p-2 sm:p-4 shadow-xs">
                {item.media}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Closing Tagline / Fin */}
      {closingTagline && (
        <div className="mt-20 sm:mt-24 pt-12 border-t border-neutral-200/60 text-center">
          <p className="font-serif italic text-[22px] sm:text-[26px] md:text-[30px] text-neutral-800 tracking-tight">
            {closingTagline}
          </p>
        </div>
      )}
    </section>
  );
}
