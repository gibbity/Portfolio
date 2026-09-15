"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CaseStudyNav from "@/components/case-study/CaseStudyNav";
import CaseStudyFooter from "@/components/case-study/CaseStudyFooter";
import HoverVideoThumbnail from "@/components/case-study/HoverVideoThumbnail";

const sections = [
  { id: "intro", label: "Overview" },
  { id: "context", label: "Context" },
  { id: "problem", label: "The Problem" },
  { id: "decisions", label: "Key Decisions" },
  { id: "sandbox", label: "Interactive Workbench" },
  { id: "friction", label: "What Didn't Work" },
  { id: "outcome", label: "Outcome & Reflections" },
];

export default function OpenComponentStudioPage() {
  const [activeSection, setActiveSection] = useState("intro");
  const [showFullProcess, setShowFullProcess] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Interactive Sandbox states
  const [cardPadding, setCardPadding] = useState(20);
  const [itemGap, setItemGap] = useState(12);
  const [borderRadius, setBorderRadius] = useState(8);
  const [accentColor, setAccentColor] = useState("#3b82f6");
  const [aspectRatio, setAspectRatio] = useState<"desktop" | "tablet" | "mobile">("desktop");

  useEffect(() => {
    const handleScrollProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScrollProgress);

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -65% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScrollProgress);
      observer.disconnect();
    };
  }, []);

  const handleJumpToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getAspectStyle = () => {
    switch (aspectRatio) {
      case "tablet":
        return "w-full max-w-[480px] aspect-[4/3]";
      case "mobile":
        return "w-full max-w-[280px] aspect-[9/16]";
      default:
        return "w-full max-w-[620px] aspect-[16/10]";
    }
  };

  return (
    <main className="relative min-h-screen bg-[#FCFCFC] font-sans text-neutral-900 selection:bg-neutral-900 selection:text-white pb-20 overflow-x-hidden">

      {/* Scroll Progress Bar */}
      <div
        style={{ width: `${scrollProgress}%` }}
        className="fixed top-0 left-0 h-[2px] bg-neutral-900 z-50 transition-all duration-75"
      />

      {/* Case Study Nav (Minimal mix-blend-difference) */}
      <CaseStudyNav projectTitle="Open Component Studio" category="Local-First AI Design Workspace" />

      {/* LIVE SECTION LABEL (Wayfinding) */}
      <div className="fixed top-24 left-6 md:left-12 lg:left-16 hidden md:block z-30 pointer-events-none">
        <span className="font-sans font-medium text-[10px] text-neutral-400 uppercase tracking-[0.25em] block">
          Current Section
        </span>
        <span className="font-serif italic text-[14px] text-neutral-800 font-medium block mt-0.5 transition-all duration-300">
          {sections.find((s) => s.id === activeSection)?.label || "Overview"}
        </span>
      </div>

      {/* SIDE PROGRESS SPINE RAIL (Wayfinding) */}
      <div className="fixed right-6 md:right-12 lg:right-16 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4 items-center z-30">
        <div className="w-[1.5px] h-44 bg-neutral-200 relative flex flex-col justify-between items-center py-1">
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => handleJumpToSection(sec.id)}
                title={sec.label}
                className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-neutral-900 border-neutral-900 scale-125"
                    : "bg-white border-neutral-300 hover:border-neutral-900"
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* 1. HERO SECTION (Enlarged Scale & Editorial Serif Typography) */}
      <section id="intro" className="relative w-full pt-36 sm:pt-40 md:pt-48 pb-20 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto text-left">
        
        {/* Title */}
        <h1 className="font-serif text-[44px] sm:text-[60px] md:text-[76px] lg:text-[88px] leading-[1.08] tracking-tight text-neutral-900 font-normal">
          Crafting a local-first, component-centric AI workspace{" "}
          <span className="italic font-serif text-neutral-700">without subscription lock-in</span>
        </h1>

        {/* Metadata Pill Chips */}
        <div className="flex flex-wrap items-center gap-3 mt-8">
          <span className="text-[12px] md:text-[13px] font-sans font-medium text-neutral-600 uppercase tracking-wider">
            Solo Developer &amp; Designer
          </span>
          <span className="text-neutral-300">•</span>
          <span className="text-[12px] md:text-[13px] font-sans font-medium text-neutral-600 uppercase tracking-wider">
            Zero Backend Cost
          </span>
          <span className="text-neutral-300">•</span>
          <span className="text-[12px] md:text-[13px] font-sans font-medium text-neutral-600 uppercase tracking-wider">
            React 18 · Vite · TypeScript
          </span>
        </div>

        {/* Hero Visual Thumbnail & Hover Video (Clean, no gutter borders, no mouse reaction) */}
        <div className="w-full rounded-xl overflow-hidden border border-neutral-200 mt-12 relative shadow-xs">
          <HoverVideoThumbnail 
            thumbnailSrc="/projects/open-component-studio/thumbnail.webp"
            videoSrc="/projects/open-component-studio/open-component-main-video-3x4.mp4"
            alt="Open Component Studio Overview"
            aspectRatioClass="aspect-[16/9.5]"
            priority
          />
        </div>

        {/* Actions & Read Time */}
        <div className="flex flex-wrap items-center justify-between gap-6 mt-10 pt-8 border-t border-neutral-200/80">
          <div className="flex flex-wrap items-center gap-5">
            <a
              href="https://open-component.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-7 py-3 bg-neutral-900 text-white text-[12px] font-sans font-semibold uppercase tracking-wider hover:bg-black transition-colors rounded-sm shadow-xs"
            >
              Visit Live App
            </a>
            <button
              onClick={() => handleJumpToSection("outcome")}
              className="font-sans text-[13px] text-neutral-600 hover:text-black underline underline-offset-4 font-medium transition-colors cursor-pointer"
            >
              Skip to outcome →
            </button>
          </div>
          <span className="font-sans text-[12px] text-neutral-400">
            3 min read • 45 sec skim
          </span>
        </div>
      </section>

      {/* 2. THE HOOK (2-Column Editorial Structure) */}
      <section id="hook" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto border-t border-neutral-200/80 text-left">
        <div className="mb-8">
          <span className="text-[12px] font-sans font-bold uppercase tracking-[0.25em] text-neutral-400">
            01 / THE HOOK
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-start">
          <div className="md:col-span-5">
            <h2 className="font-serif text-[32px] sm:text-[40px] md:text-[46px] leading-[1.15] text-neutral-900 tracking-tight font-normal">
              You want to generate a single UI widget—<span className="italic">instead, mainstream AI site builders force whole-app lock-in.</span>
            </h2>
          </div>
          <div className="md:col-span-7 space-y-4 font-sans text-[16px] md:text-[17px] leading-[1.7] text-neutral-600">
            <p>
              When a generated button has the wrong padding or accent color, your only recourse in cloud-hosted site builders is re-prompting the model, burning API tokens, and praying the LLM doesn&apos;t break surrounding layouts.
            </p>
            <p className="border-l-2 border-neutral-200 pl-4 italic text-neutral-700 font-medium">
              Open Component Studio was built to solve this exact friction: a local-first workspace that turns LLMs into modular UI building-block generators without subscription paywalls or cloud lock-in.
            </p>
          </div>
        </div>
      </section>

      {/* 3. CONTEXT & CONSTRAINTS BENTO */}
      <section id="context" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto border-t border-neutral-200/80 text-left">
        <div className="mb-8">
          <span className="text-[12px] font-sans font-bold uppercase tracking-[0.25em] text-neutral-400">
            02 / CONTEXT &amp; CONSTRAINTS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-start mb-12">
          <div className="md:col-span-5">
            <p className="font-serif text-[28px] sm:text-[34px] md:text-[40px] leading-[1.18] text-neutral-900 font-normal">
              A high-precision workbench designed for <span className="italic">frontend developers and UI designers.</span>
            </p>
          </div>
          <div className="md:col-span-7 space-y-4 font-sans text-[16px] md:text-[17px] leading-[1.7] text-neutral-600">
            <p>
              Engineered as a lightweight, zero-maintenance web application, Open Component Studio delegates structural generation to AI while keeping visual tuning 100% deterministic and instantaneous.
            </p>
          </div>
        </div>

        {/* Clean Bento Specs Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 font-sans">
          <div className="p-6 bg-neutral-100/70 border border-neutral-200/80 rounded-xl">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Cost Constraint</span>
            <span className="text-[15px] font-semibold text-neutral-900">$0 Backend Infrastructure</span>
            <p className="text-[12px] text-neutral-500 mt-1">Runs 100% client-side via IndexedDB</p>
          </div>
          <div className="p-6 bg-neutral-100/70 border border-neutral-200/80 rounded-xl">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Data Sovereignty</span>
            <span className="text-[15px] font-semibold text-neutral-900">Zero Data Retention (BYOK)</span>
            <p className="text-[12px] text-neutral-500 mt-1">Keys and prompts stay inside the browser</p>
          </div>
          <div className="p-6 bg-neutral-100/70 border border-neutral-200/80 rounded-xl">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">Iteration Speed</span>
            <span className="text-[15px] font-semibold text-neutral-900">0ms Visual Micro-Tuning</span>
            <p className="text-[12px] text-neutral-500 mt-1">Live DOM CSS custom property patching</p>
          </div>
        </div>
      </section>

      {/* 4. THE REAL PROBLEM */}
      <section id="problem" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto border-t border-neutral-200/80 text-left">
        <div className="mb-8">
          <span className="text-[12px] font-sans font-bold uppercase tracking-[0.25em] text-neutral-400">
            03 / THE REAL PROBLEM
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-start mb-12">
          <div className="md:col-span-5">
            <h3 className="font-serif text-[28px] sm:text-[34px] md:text-[40px] leading-[1.18] text-neutral-900 tracking-tight font-normal">
              An abstraction mismatch in <span className="italic">general-purpose AI web builders.</span>
            </h3>
          </div>
          <div className="md:col-span-7 space-y-4 font-sans text-[16px] md:text-[17px] leading-[1.7] text-neutral-600">
            <p>
              The fundamental flaw with general-purpose AI web generators isn&apos;t just subscription pricing—it is an architectural mismatch in granularity and control:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
          <div className="p-6 bg-neutral-100/70 border border-neutral-200/80 rounded-xl space-y-2">
            <h4 className="text-[14px] font-bold text-neutral-900 uppercase tracking-wider">1. Scope Overreach</h4>
            <p className="text-[13px] text-neutral-600 leading-relaxed">
              Full-app generators trade micro-interaction fidelity for macro structure, producing bloated, generic components lacking tactile polish.
            </p>
          </div>
          <div className="p-6 bg-neutral-100/70 border border-neutral-200/80 rounded-xl space-y-2">
            <h4 className="text-[14px] font-bold text-neutral-900 uppercase tracking-wider">2. Feedback Latency</h4>
            <p className="text-[13px] text-neutral-600 leading-relaxed">
              Tweaking small visual parameters (padding, colors, radius) via natural language prompts introduces non-deterministic layout drift and model wait times.
            </p>
          </div>
          <div className="p-6 bg-neutral-100/70 border border-neutral-200/80 rounded-xl space-y-2">
            <h4 className="text-[14px] font-bold text-neutral-900 uppercase tracking-wider">3. Token &amp; Privacy Leakage</h4>
            <p className="text-[13px] text-neutral-600 leading-relaxed">
              Enterprise developers hesitate to route proprietary design tokens through third-party proxy servers when direct client API connections are possible.
            </p>
          </div>
        </div>
      </section>

      {/* 5. KEY DECISIONS (Bento Grid & Flat Images) */}
      <section id="decisions" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto border-t border-neutral-200/80 text-left">
        <div className="mb-14">
          <span className="text-[12px] font-sans font-bold uppercase tracking-[0.25em] text-neutral-400">
            04 / KEY DECISIONS
          </span>
        </div>

        <div className="space-y-20">
          {[
            {
              index: "DESIGN 1/3",
              title: "Client-Side BYOK & IndexedDB Storage",
              subtitle: "zero backend infrastructure overhead and total data privacy",
              summary: "All API keys, prompt histories, and custom design tokens are stored locally in IndexedDB. API calls to Gemini, Claude, and local Ollama dispatch directly from the browser.",
              why: "Trade-off: Eliminates server costs and guarantees 100% privacy, though users manage their own local key backups.",
              image: "/projects/open-component-studio/decision-1.png"
            },
            {
              index: "DESIGN 2/3",
              title: "Component Scope over Full-App Bloat",
              subtitle: "modular UI building blocks with high visual fidelity",
              summary: "Restricts LLM outputs to self-contained, modular React components with standardized prop interfaces and scoped CSS variables.",
              why: "Trade-off: Sacrifices multi-page routing in exchange for vastly superior micro-interaction polish and GSAP motion presets.",
              image: "/projects/open-component-studio/decision-2.png"
            },
            {
              index: "DESIGN 3/3",
              title: "Magic Tweaks DOM Style Patching",
              subtitle: "instant visual attribute tuning with 0ms model latency",
              summary: "Generated components consume CSS variables for design tokens. A visual control panel patches DOM styles in real-time without re-prompting the LLM.",
              why: "Trade-off: Requires prompts to strictly format styles using CSS variables. In return, visual tweaks execute with zero latency and zero token cost.",
              image: "/projects/open-component-studio/decision-3.png"
            }
          ].map((item, idx) => (
            <div key={idx} className="space-y-8 pt-14 border-t border-neutral-200/80 first:border-t-0 first:pt-0">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-neutral-400 block font-sans">
                {item.index}
              </span>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-start">
                <div className="md:col-span-5">
                  <h4 className="font-serif text-[26px] sm:text-[32px] md:text-[36px] leading-[1.15] text-neutral-900 tracking-tight font-normal">
                    {item.title}
                    <span className="block font-serif italic text-neutral-600 text-[20px] sm:text-[24px] mt-1 font-normal">
                      {item.subtitle}
                    </span>
                  </h4>
                </div>
                
                <div className="md:col-span-7 space-y-4 font-sans">
                  <p className="text-[16px] md:text-[17px] leading-[1.7] text-neutral-600">
                    {item.summary}
                  </p>
                  <div className="pl-5 border-l-2 border-neutral-200">
                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest block mb-1">
                      Rationale &amp; Trade-off
                    </span>
                    <p className="text-[14px] md:text-[15px] text-neutral-700 leading-relaxed">
                      {item.why}
                    </p>
                  </div>
                </div>
              </div>

              {/* Flat Image Display without overlay text or mouse reaction */}
              {item.image && (
                <div className="mt-6 rounded-xl overflow-hidden border border-neutral-200/90 bg-white shadow-xs w-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={1920}
                    height={1080}
                    className="w-full h-auto object-contain"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 5. INTERACTIVE WORKBENCH (Bento Sandbox Demo) */}
      <section id="sandbox" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto border-t border-neutral-200/80 text-left">
        <div className="w-full flex justify-between items-baseline mb-10">
          <span className="text-[12px] font-sans font-bold uppercase tracking-[0.25em] text-neutral-400">
            05 / INTERACTIVE WORKBENCH
          </span>
          <span className="font-sans font-medium text-[11px] text-neutral-400 uppercase tracking-widest">
            MAGIC TWEAKS SANDBOX
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Left Column */}
          <div className="lg:col-span-4 text-left space-y-6 bg-neutral-100/70 p-6 border border-neutral-200/80 rounded-xl">
            <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block border-b border-neutral-200/80 pb-2 font-sans">
              CSS Variable Patching
            </span>

            {/* Aspect Ratio Toggle */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase text-neutral-600 font-sans">Viewport Scale</label>
              <div className="flex gap-2">
                {(["desktop", "tablet", "mobile"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setAspectRatio(mode)}
                    className={`flex-1 py-1.5 text-[10px] uppercase font-bold border rounded-md transition-all font-sans cursor-pointer ${
                      aspectRatio === mode
                        ? "bg-neutral-900 border-neutral-900 text-white"
                        : "bg-white border-neutral-200 hover:border-neutral-300 text-neutral-700"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Padding Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-bold uppercase text-neutral-600 font-sans">
                <span>Padding</span>
                <span>{cardPadding}px</span>
              </div>
              <input
                type="range" min="10" max="40" value={cardPadding}
                onChange={(e) => setCardPadding(Number(e.target.value))}
                className="w-full accent-neutral-900 cursor-pointer"
              />
            </div>

            {/* Gap Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-bold uppercase text-neutral-600 font-sans">
                <span>Vertical Gap</span>
                <span>{itemGap}px</span>
              </div>
              <input
                type="range" min="4" max="24" value={itemGap}
                onChange={(e) => setItemGap(Number(e.target.value))}
                className="w-full accent-neutral-900 cursor-pointer"
              />
            </div>

            {/* Rounded Radius Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-bold uppercase text-neutral-600 font-sans">
                <span>Border Radius</span>
                <span>{borderRadius}px</span>
              </div>
              <input
                type="range" min="0" max="24" value={borderRadius}
                onChange={(e) => setBorderRadius(Number(e.target.value))}
                className="w-full accent-neutral-900 cursor-pointer"
              />
            </div>

            {/* Accent Color Pickers */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase text-neutral-600 block font-sans">Accent Color</label>
              <div className="flex gap-3">
                {["#3b82f6", "#22c55e", "#f97316", "#8b5cf6"].map((color) => (
                  <button
                    key={color}
                    onClick={() => setAccentColor(color)}
                    style={{ backgroundColor: color }}
                    className={`w-6 h-6 rounded-full border-2 transition-all cursor-pointer ${
                      accentColor === color ? "border-neutral-900 scale-110" : "border-transparent"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Screen Right Column */}
          <div className="lg:col-span-8 border border-neutral-200/80 bg-white rounded-xl p-8 flex items-center justify-center min-h-[420px] overflow-hidden shadow-xs relative">
            <div className="absolute top-4 left-4 text-[10px] text-neutral-400 uppercase font-mono tracking-widest">
              Live DOM Patch (0ms API Latency)
            </div>

            <motion.div
              layout
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className={`${getAspectStyle()} border border-neutral-200 rounded-lg bg-neutral-50 shadow-sm p-6 flex flex-col justify-between overflow-y-auto`}
            >
              <div className="flex justify-between items-center border-b border-neutral-200/60 pb-3 mb-2 shrink-0">
                <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase font-sans">Open Component Studio</span>
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accentColor }} />
              </div>

              <div
                style={{
                  padding: `${cardPadding}px`,
                  borderRadius: `${borderRadius}px`
                }}
                className="bg-white border border-neutral-200 flex-1 flex flex-col justify-center shadow-2xs min-h-0"
              >
                <div
                  style={{ gap: `${itemGap}px` }}
                  className="flex flex-col text-left"
                >
                  <div className="w-12 h-2 rounded-xs" style={{ backgroundColor: accentColor }} />
                  <h4 className="text-[16px] font-bold text-neutral-900 uppercase tracking-tight leading-none font-sans">Magic Tweaks Engine</h4>
                  <p className="text-[12px] text-neutral-500 leading-normal font-sans">
                    Visual attributes map directly to CSS custom properties, allowing instant DOM style patching without re-prompting the LLM.
                  </p>
                  <button
                    style={{ borderRadius: `${Math.min(borderRadius, 8)}px` }}
                    className="w-full py-2 bg-neutral-900 text-white text-[10px] uppercase font-bold tracking-wider transition-colors mt-1 font-sans cursor-pointer hover:bg-black"
                  >
                    Export Component
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. WHAT DIDN'T WORK FIRST (Bento Cards) */}
      <section id="friction" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto border-t border-neutral-200/80 text-left">
        <div className="mb-8">
          <span className="text-[12px] font-sans font-bold uppercase tracking-[0.25em] text-neutral-400">
            06 / WHAT DIDN&apos;T WORK FIRST
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-start mb-12">
          <div className="md:col-span-5">
            <h3 className="font-serif text-[28px] sm:text-[34px] md:text-[38px] leading-[1.18] text-neutral-900 font-normal">
              Decoupling visual styling from <span className="italic">code regeneration.</span>
            </h3>
          </div>
          <div className="md:col-span-7 space-y-4 font-sans text-[16px] md:text-[17px] leading-[1.7] text-neutral-600">
            <p>
              Early architectural approaches revealed major failure modes when relying on raw text generation for precise visual tweaks:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
          <div className="p-6 bg-neutral-100/70 border border-neutral-200/80 rounded-xl space-y-2">
            <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider block">Attempt 1 // Unstructured Full-Code Re-prompting</span>
            <h4 className="text-[15px] font-bold text-neutral-900">Logic &amp; Physics Drift</h4>
            <p className="text-[13px] text-neutral-600 leading-relaxed">
              Re-prompting the LLM to tweak padding or colors frequently stripped GSAP motion parameters or broke TypeScript interfaces. Pivoting to CSS custom property patching gave users 0ms deterministic control.
            </p>
          </div>

          <div className="p-6 bg-neutral-100/70 border border-neutral-200/80 rounded-xl space-y-2">
            <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider block">Attempt 2 // Unconstrained Font Spec</span>
            <h4 className="text-[15px] font-bold text-neutral-900">Sandbox Layout Shifts</h4>
            <p className="text-[13px] text-neutral-600 leading-relaxed">
              Allowing arbitrary font strings caused fallback Times New Roman flashes. Constraining generation to a curated Google Font registry with pre-injected stylesheet links eliminated layout shifts.
            </p>
          </div>
        </div>
      </section>

      {/* 7. OUTCOME & REFLECTIONS */}
      <section id="outcome" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto border-t border-neutral-200/80 text-left">
        <div className="mb-10">
          <span className="text-[12px] font-sans font-bold uppercase tracking-[0.25em] text-neutral-400">
            07 / OUTCOME &amp; REFLECTIONS
          </span>
        </div>

        {/* 3 Outcome Stat Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans mb-16">
          <div className="p-6 bg-neutral-100/70 border border-neutral-200/80 rounded-xl space-y-1">
            <span className="font-serif text-[40px] md:text-[52px] font-normal text-neutral-900 block leading-none">$0/mo</span>
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block pt-2">Infrastructure Overhead</span>
            <p className="text-[13px] text-neutral-600 leading-normal">Static PWA bundle with zero server compute fees.</p>
          </div>
          <div className="p-6 bg-neutral-100/70 border border-neutral-200/80 rounded-xl space-y-1">
            <span className="font-serif text-[40px] md:text-[52px] font-normal text-neutral-900 block leading-none">0ms</span>
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block pt-2">Visual Tweaks Latency</span>
            <p className="text-[13px] text-neutral-600 leading-normal">Instant client DOM variable patching.</p>
          </div>
          <div className="p-6 bg-neutral-100/70 border border-neutral-200/80 rounded-xl space-y-1">
            <span className="font-serif text-[40px] md:text-[52px] font-normal text-neutral-900 block leading-none">100%</span>
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block pt-2">Local Privacy</span>
            <p className="text-[13px] text-neutral-600 leading-normal">Prompts and tokens remain inside IndexedDB.</p>
          </div>
        </div>

        {/* Reconsiderations Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans mb-16">
          <div className="p-6 bg-neutral-100/70 border border-neutral-200/80 rounded-xl space-y-2">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">01. Workspace Density vs. Focus Mode (Design)</span>
            <p className="text-[13px] text-neutral-600 leading-relaxed">
              The 4-panel cockpit layout prioritizes power efficiency but can feel busy. I would add an adaptive &quot;Focus Mode&quot; that collapses control rails when editing micro-interactions.
            </p>
          </div>

          <div className="p-6 bg-neutral-100/70 border border-neutral-200/80 rounded-xl space-y-2">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">02. Native File System Access (Technical)</span>
            <p className="text-[13px] text-neutral-600 leading-relaxed">
              Relying strictly on IndexedDB risks cache deletion. I would integrate the File System Access API to sync generated components as real `.tsx` files directly on local disks.
            </p>
          </div>
        </div>


      </section>

      {/* 8. COLLAPSIBLE PROCESS DRAWER */}
      <section className="py-10 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto flex flex-col items-center">
        <button
          onClick={() => setShowFullProcess(!showFullProcess)}
          className="px-7 py-3 border border-neutral-300 text-neutral-700 font-sans text-[12px] uppercase font-semibold tracking-wider hover:border-black hover:text-black transition-colors rounded-sm cursor-pointer"
        >
          {showFullProcess ? "Hide engineering appendix" : "View engineering & architecture appendix"}
        </button>

        {showFullProcess && (
          <div className="w-full mt-12 pt-12 border-t border-neutral-200/80 text-left space-y-12 animate-fadeIn font-sans text-neutral-900">

            {/* ARCHITECTURE */}
            <div className="space-y-5">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest block">01 / ARCHITECTURE &amp; TECH STACK</span>
              <h3 className="font-serif text-[26px] text-neutral-900 font-normal">Technical Stack Summary</h3>
              <ul className="list-disc pl-5 text-[14px] text-neutral-600 space-y-2">
                <li><strong>Core UI:</strong> React 18, Vite, TypeScript, Tailwind CSS</li>
                <li><strong>Animations:</strong> GSAP (GreenSock Physics &amp; Motion Presets)</li>
                <li><strong>AI Orchestration:</strong> Vercel AI SDK (Direct BYOK client streams)</li>
                <li><strong>Local Persistence:</strong> IndexedDB (Zero backend operational cost)</li>
              </ul>
            </div>

            {/* CSS VARIABLE PATCHING */}
            <div className="space-y-5 pt-8 border-t border-neutral-200/60">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest block">02 / DOM VARIABLE PATCHING ENGINE</span>
              <h3 className="font-serif text-[26px] text-neutral-900 font-normal">Magic Tweaks CSS Variable Engine</h3>
              <div className="p-5 bg-neutral-950 rounded-xl text-neutral-300 font-mono text-[12px] space-y-1.5 shadow-inner overflow-x-auto max-w-2xl">
                <div><span className="text-red-400">const</span> applyStylePatch = (propertyName: <span className="text-cyan-400">string</span>, value: <span className="text-cyan-400">string</span>) =&gt; &#123;</div>
                <div className="pl-4">const previewFrame = document.getElementById(&apos;component-sandbox-iframe&apos;);</div>
                <div className="pl-4">if (!previewFrame || !previewFrame.contentDocument) return;</div>
                <div className="pl-4">previewFrame.contentDocument.documentElement.style.setProperty(propertyName, value);</div>
                <div>&#125;;</div>
              </div>
            </div>

          </div>
        )}
      </section>

      {/* 9. MINIMALIST FOOTER */}
      <CaseStudyFooter nextProject={{ name: "Scribe", href: "/projects/scribe" }} />
    </main>
  );
}
