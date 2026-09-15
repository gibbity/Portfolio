"use client";

import React, { useState } from "react";
import Image from "next/image";

interface CaseStudyComparisonProps {
  beforeImage?: string;
  beforeTitle?: string;
  beforeDescription?: string;
  afterImage?: string;
  afterTitle?: string;
  afterDescription?: string;
  onImageClick?: (src: string) => void;
}

export default function CaseStudyComparison({
  beforeImage,
  beforeTitle = "Legacy Fragmented Workflow",
  beforeDescription = "Multiple disjointed tools, manual spreadsheet exports, and high cognitive overhead.",
  afterImage,
  afterTitle = "Unified High-Throughput Canvas",
  afterDescription = "A singular cohesive workbench with synchronized real-time visualization and zero context switching.",
  onImageClick,
}: CaseStudyComparisonProps) {
  const [activeTab, setActiveTab] = useState<"side-by-side" | "before" | "after">("side-by-side");

  return (
    <div className="w-full rounded-2xl border border-neutral-200/90 bg-[#FAFAFA] p-4 sm:p-6 md:p-8 shadow-xs">
      
      {/* Top Header & Tab Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-neutral-200/70">
        <div>
          <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-neutral-400 block mb-1">
            System Transformation
          </span>
          <h4 className="font-serif text-[18px] sm:text-[20px] text-neutral-900 italic">
            Before & After Comparison
          </h4>
        </div>

        {/* View Toggle */}
        <div className="inline-flex p-1 rounded-full bg-neutral-200/70 text-[11px] font-sans font-medium self-start sm:self-auto">
          <button
            onClick={() => setActiveTab("side-by-side")}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              activeTab === "side-by-side"
                ? "bg-white text-black shadow-xs font-semibold"
                : "text-neutral-600 hover:text-black"
            }`}
          >
            Split View
          </button>
          <button
            onClick={() => setActiveTab("before")}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              activeTab === "before"
                ? "bg-white text-black shadow-xs font-semibold"
                : "text-neutral-600 hover:text-black"
            }`}
          >
            Before
          </button>
          <button
            onClick={() => setActiveTab("after")}
            className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
              activeTab === "after"
                ? "bg-white text-black shadow-xs font-semibold"
                : "text-neutral-600 hover:text-black"
            }`}
          >
            After
          </button>
        </div>
      </div>

      {/* Media & Content Display */}
      <div className={`grid gap-6 ${activeTab === "side-by-side" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
        
        {/* BEFORE CARD */}
        {(activeTab === "side-by-side" || activeTab === "before") && (
          <div className="flex flex-col space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-neutral-200 text-neutral-700 text-[10px] font-mono font-bold uppercase tracking-wider">
                Before
              </span>
              <span className="font-sans text-[13px] font-semibold text-neutral-900">
                {beforeTitle}
              </span>
            </div>
            {beforeImage && (
              <div
                onClick={() => onImageClick && onImageClick(beforeImage)}
                className={`relative aspect-[16/10] rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 ${
                  onImageClick ? "cursor-zoom-in group" : ""
                }`}
              >
                <Image
                  src={beforeImage}
                  alt={beforeTitle}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
            )}
            <p className="font-sans text-[12px] sm:text-[13px] text-neutral-500 leading-normal">
              {beforeDescription}
            </p>
          </div>
        )}

        {/* AFTER CARD */}
        {(activeTab === "side-by-side" || activeTab === "after") && (
          <div className="flex flex-col space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-black text-white text-[10px] font-mono font-bold uppercase tracking-wider">
                After
              </span>
              <span className="font-sans text-[13px] font-semibold text-neutral-900">
                {afterTitle}
              </span>
            </div>
            {afterImage && (
              <div
                onClick={() => onImageClick && onImageClick(afterImage)}
                className={`relative aspect-[16/10] rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 ${
                  onImageClick ? "cursor-zoom-in group" : ""
                }`}
              >
                <Image
                  src={afterImage}
                  alt={afterTitle}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
            )}
            <p className="font-sans text-[12px] sm:text-[13px] text-neutral-500 leading-normal">
              {afterDescription}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
