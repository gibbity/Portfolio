"use client";

import React from "react";

export interface ReflectionCard {
  title: string;
  description: string;
}

interface CaseStudyReflectionsProps {
  reflections: ReflectionCard[];
  tag?: string;
}

export default function CaseStudyReflections({
  reflections,
  tag = "REFLECTIONS",
}: CaseStudyReflectionsProps) {
  return (
    <section className="py-16 sm:py-20 md:py-24 px-5 sm:px-8 md:px-12 lg:px-16 max-w-6xl mx-auto border-t border-neutral-200/80 text-left">
      
      {/* Top Header Tag */}
      <div className="mb-8 sm:mb-12">
        <span className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-neutral-400">
          {tag}
        </span>
      </div>

      {/* 3-Column Reflections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {reflections.map((card, idx) => (
          <div
            key={idx}
            className="space-y-3"
          >
            <h4 className="font-sans text-[14px] sm:text-[15px] font-bold text-neutral-900 leading-snug">
              {card.title}
            </h4>
            <p className="font-sans text-[13px] text-neutral-600 leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
