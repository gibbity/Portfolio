"use client";

import React from "react";

export interface DetailItem {
  value: string;
  label: string;
}

export interface ImpactStat {
  metric: string;
  title: string;
  subtitle: string;
}

interface CaseStudyOverviewProps {
  productName: string;
  productSummary: string;
  details: DetailItem[];
  problemTitle?: string;
  problemSummary: string;
  solutionTitle?: string;
  solutionSummary: string;
  resultTitle?: string;
  resultSummary: string;
  impactStats?: ImpactStat[];
}

export default function CaseStudyOverview({
  productName,
  productSummary,
  details,
  problemTitle = "Digital Chaos",
  problemSummary,
  solutionTitle = "A Centralized IDE",
  solutionSummary,
  resultTitle = "Productivity Gains",
  resultSummary,
  impactStats = [],
}: CaseStudyOverviewProps) {
  return (
    <section className="py-12 sm:py-16 px-5 sm:px-8 md:px-12 lg:px-16 max-w-6xl mx-auto">
      
      {/* 2-Card Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        
        {/* Left Card: Product & Scope Details */}
        <div className="rounded-2xl border border-neutral-200/80 bg-[#FAFAFA] p-6 sm:p-8 md:p-10 flex flex-col justify-between shadow-xs">
          <div>
            <div className="mb-4">
              <span className="text-[12px] font-sans font-bold uppercase tracking-widest text-neutral-400 block mb-1">
                Product
              </span>
              <h2 className="font-serif text-[24px] sm:text-[28px] text-neutral-900 font-medium italic">
                {productName}
              </h2>
            </div>
            <p className="font-sans text-[14px] sm:text-[15px] leading-relaxed text-neutral-600 mb-8">
              {productSummary}
            </p>
          </div>

          {/* Structured Details Matrix */}
          <div className="pt-6 border-t border-neutral-200/60 space-y-4">
            <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-neutral-400 block mb-3">
              Details
            </span>
            <div className="space-y-3.5">
              {details.map((item, i) => (
                <div key={i} className="flex flex-col">
                  <span className="font-sans text-[13px] sm:text-[14px] font-medium text-neutral-900 leading-snug">
                    {item.value}
                  </span>
                  <span className="font-sans text-[11px] text-neutral-400 uppercase tracking-wider mt-0.5">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Card: Problem, Solution, Result Triad */}
        <div className="rounded-2xl border border-neutral-200/80 bg-[#FAFAFA] p-6 sm:p-8 md:p-10 flex flex-col justify-between space-y-6 sm:space-y-8 shadow-xs">
          {/* Problem */}
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[12px] font-sans font-bold uppercase tracking-widest text-neutral-400">
                Problem
              </span>
              <span className="text-[13px] font-serif italic text-neutral-800 font-medium">
                {problemTitle}
              </span>
            </div>
            <p className="font-sans text-[13px] sm:text-[14px] leading-relaxed text-neutral-600">
              {problemSummary}
            </p>
          </div>

          {/* Solution */}
          <div className="pt-5 border-t border-neutral-200/60">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[12px] font-sans font-bold uppercase tracking-widest text-neutral-400">
                Solution
              </span>
              <span className="text-[13px] font-serif italic text-neutral-800 font-medium">
                {solutionTitle}
              </span>
            </div>
            <p className="font-sans text-[13px] sm:text-[14px] leading-relaxed text-neutral-600">
              {solutionSummary}
            </p>
          </div>

          {/* Result */}
          <div className="pt-5 border-t border-neutral-200/60">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[12px] font-sans font-bold uppercase tracking-widest text-neutral-400">
                Result
              </span>
              <span className="text-[13px] font-serif italic text-neutral-800 font-medium">
                {resultTitle}
              </span>
            </div>
            <p className="font-sans text-[13px] sm:text-[14px] leading-relaxed text-neutral-600">
              {resultSummary}
            </p>
          </div>
        </div>
      </div>

      {/* Impact Stats Banner (Bottom of Overview) */}
      {impactStats.length > 0 && (
        <div className="mt-12 sm:mt-16 pt-10 sm:pt-12 border-t border-neutral-200/80">
          <span className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-neutral-400 block mb-6 text-left">
            Impact
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 text-left">
            {impactStats.map((stat, i) => (
              <div key={i} className="space-y-1.5">
                <div className="font-serif text-[38px] sm:text-[46px] md:text-[54px] font-normal leading-none text-neutral-900 tracking-tight">
                  {stat.metric}
                </div>
                <div className="font-sans text-[14px] sm:text-[15px] font-semibold text-neutral-900">
                  {stat.title}
                </div>
                <div className="font-sans text-[12px] text-neutral-500 leading-snug">
                  {stat.subtitle}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
