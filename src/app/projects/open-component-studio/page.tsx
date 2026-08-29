"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import CaseStudyNav from "@/components/case-study/CaseStudyNav";
import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import CaseStudyFooter from "@/components/case-study/CaseStudyFooter";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function OpenComponentStudioPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Section definitions for Side Progress Rail & Wayfinding
  const sections = [
    { id: "intro", label: "Hook" },
    { id: "context", label: "Context" },
    { id: "problem", label: "The Real Problem" },
    { id: "decisions", label: "Key Decisions" },
    { id: "sandbox", label: "Visual Sandbox" },
    { id: "friction", label: "What Didn't Work" },
    { id: "outcome", label: "Outcome" },
    { id: "reconsider", label: "Reconsideration" }
  ];

  const [activeSection, setActiveSection] = useState("intro");
  const [showFullProcess, setShowFullProcess] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Interactive Sandbox states
  const [cardPadding, setCardPadding] = useState(20); // 10px to 40px
  const [itemGap, setItemGap] = useState(12); // 4px to 24px
  const [borderRadius, setBorderRadius] = useState(8); // 0px to 24px
  const [accentColor, setAccentColor] = useState("#3b82f6"); // blue, green, amber, violet
  const [aspectRatio, setAspectRatio] = useState<"desktop" | "tablet" | "mobile">("desktop");

  useEffect(() => {
    if (!containerRef.current) return;

    const rafId = requestAnimationFrame(() => {
      const ctx = gsap.context(() => {
        (gsap.utils.toArray(".reveal") as HTMLElement[]).forEach((el) => {
          gsap.fromTo(el,
            { opacity: 0, y: 30 },
            {
              opacity: 1, y: 0, duration: 1.2, ease: "power4.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });

        // Parallax numbers
        (gsap.utils.toArray(".parallax-index") as HTMLElement[]).forEach((el) => {
          gsap.to(el, {
            y: -80,
            opacity: 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          });
        });
      }, containerRef);

      return () => ctx.revert();
    });

    return () => cancelAnimationFrame(rafId);
  }, []);

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
      rootMargin: "-25% 0px -70% 0px",
      threshold: 0
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
    <main ref={containerRef} className="relative z-10 min-h-screen bg-white font-sans text-gray-900 selection:bg-black selection:text-white pb-32 overflow-x-hidden">

      {/* Scroll Progress Bar */}
      <div
        style={{ width: `${scrollProgress}%` }}
        className="fixed top-0 left-0 h-[2px] bg-black z-50 transition-all duration-75"
      />

      {/* Case Study Nav */}
      <CaseStudyNav projectTitle="Open Component Studio" category="Local-First AI Design Workspace" />

      {/* LIVE SECTION LABEL (Wayfinding) */}
      <div className="fixed top-24 left-6 md:left-12 lg:left-16 hidden md:block z-30 pointer-events-none">
        <span className="font-sans font-medium text-[10px] text-black/30 uppercase tracking-[0.2em] block">
          Current Section
        </span>
        <span className="font-sans font-semibold text-[12px] text-black uppercase tracking-wider block mt-1 transition-all duration-300">
          {sections.find(s => s.id === activeSection)?.label || "Hook"}
        </span>
      </div>

      {/* SIDE PROGRESS SPINE RAIL (Wayfinding) */}
      <div className="fixed right-6 md:right-12 lg:right-16 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-5 items-center z-30">
        <div className="w-[1.5px] h-36 bg-gray-100 relative flex flex-col justify-between items-center py-2">
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => handleJumpToSection(sec.id)}
                title={sec.label}
                className={`w-2 h-2 rounded-full border transition-all duration-300 ${isActive
                    ? "bg-black border-black scale-125"
                    : "bg-white border-gray-300 hover:border-black"
                  }`}
              />
            );
          })}
        </div>
      </div>

      <CaseStudyHero
        title="Open Component Studio"
        subtitle="Crafting a Local-First, Component-Centric AI Workspace"
        description="A local-first, component-focused workspace that turns LLMs into precise UI building-block generators without subscription paywalls or cloud lock-in."
        meta={{
          "Role": "Solo Developer / Designer",
          "Audience": "Frontend Devs & UI/UX Designers",
          "Constraints": "$0 Budget / Privacy & BYOK",
          "Stack": "React 18 / Vite / TS / Tailwind / GSAP",
          "Poster": "/projects/open-component-studio/hero.png"
        }}
        media={{
          type: "video",
          src: "/projects/open-component-studio/open-component-main-video-3x4.mp4"
        }}
        theme="light"
        fullMedia={true}
        liveUrl="https://open-component.vercel.app/"
      />

      {/* 1. THE HOOK */}
      <section id="intro" className="py-16 md:py-24 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto border-t border-gray-100 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <span className="font-sans font-semibold text-[11px] text-black/40 uppercase tracking-widest block">
              01 / THE HOOK
            </span>
          </div>
          <div className="md:col-span-8 text-left space-y-6">
            <h3 className="font-sans font-normal text-[26px] md:text-[34px] leading-tight text-black tracking-tight font-serif">
              You want to generate a single, highly-refined UI widget—instead, mainstream AI site builders force a whole app lock-in.
            </h3>
            <p className="font-sans font-normal text-[17px] md:text-[19px] leading-relaxed text-black/70">
              When a generated button has the wrong padding or accent color, your only recourse in cloud-hosted site builders is re-prompting the model, spending API tokens, and hoping the LLM doesn&apos;t break surrounding layouts.
            </p>
            <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-sm">
              <p className="font-sans font-semibold text-[15px] md:text-[16px] leading-relaxed text-black">
                <strong>Open Component Studio</strong> was built to solve this exact frustration: a local-first, component-focused workspace that turns LLMs into precise UI building-block generators without subscription paywalls or cloud lock-in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONTEXT & CONSTRAINTS */}
      <section id="context" className="py-16 md:py-24 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto border-t border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <span className="font-sans font-semibold text-[11px] text-black/40 uppercase tracking-widest block">
              02 / CONTEXT & CONSTRAINTS
            </span>
          </div>
          <div className="md:col-span-8 text-left space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-[#FAFAFA] border border-gray-150 rounded-sm">
                <span className="text-[10px] font-bold text-black/40 uppercase tracking-wider block font-sans">Role</span>
                <span className="text-[14px] font-medium text-black font-sans">Solo Developer / Designer</span>
              </div>
              <div className="p-4 bg-[#FAFAFA] border border-gray-150 rounded-sm">
                <span className="text-[10px] font-bold text-black/40 uppercase tracking-wider block font-sans">Target Audience</span>
                <span className="text-[14px] font-medium text-black font-sans">Frontend Devs & UI Designers</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <span className="text-[11px] font-bold text-black/40 uppercase tracking-wider block font-sans">Core Constraints</span>
              <ul className="list-disc pl-5 space-y-2 text-[15px] leading-relaxed text-black/75">
                <li><strong>$0 Backend Budget:</strong> Must run entirely client-side without recurring infrastructure fees.</li>
                <li><strong>Zero Data Retention (Privacy & BYOK):</strong> No third-party proxy servers; API keys and prompts stay inside the browser.</li>
                <li><strong>Fast Visual Iteration:</strong> Instant micro-adjustments without continuous LLM round-trips.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE REAL PROBLEM */}
      <section id="problem" className="py-16 md:py-24 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto border-t border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <span className="font-sans font-semibold text-[11px] text-black/40 uppercase tracking-widest block">
              03 / THE REAL PROBLEM
            </span>
          </div>
          <div className="md:col-span-8 text-left space-y-6">
            <h3 className="font-sans font-normal text-[26px] md:text-[34px] leading-tight text-black tracking-tight font-serif">
              An Abstraction Mismatch in General-Purpose AI Builders
            </h3>
            <p className="font-sans font-normal text-[15px] md:text-[16px] leading-relaxed text-black/60">
              The primary issue with general-purpose AI web generators isn&apos;t just pricing—it&apos;s a fundamental mismatch in granularity and control:
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-5 border border-gray-200 rounded-sm bg-gray-50/50">
                <h4 className="text-[14px] font-bold text-black uppercase tracking-wide mb-1 font-sans">1. Scope Overreach</h4>
                <p className="text-[14px] text-black/70 leading-relaxed font-sans">Full-app generators trade micro-interaction fidelity for macro structure. The resulting UIs often feel generic, bloated, and lack tactile polish.</p>
              </div>
              <div className="p-5 border border-gray-200 rounded-sm bg-gray-50/50">
                <h4 className="text-[14px] font-bold text-black uppercase tracking-wide mb-1 font-sans">2. Feedback Latency</h4>
                <p className="text-[14px] text-black/70 leading-relaxed font-sans">Tweaking small visual parameters (spacing, colors, border radii) via natural language re-prompts introduces non-deterministic layout drift and unnecessary latency.</p>
              </div>
              <div className="p-5 border border-gray-200 rounded-sm bg-gray-50/50">
                <h4 className="text-[14px] font-bold text-black uppercase tracking-wide mb-1 font-sans">3. Data & Key Ownership</h4>
                <p className="text-[14px] text-black/70 leading-relaxed font-sans">Developers are hesitant to send proprietary design tokens or credentials through third-party proxy servers when they possess direct API access to Gemini, Claude, or local Ollama instances.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. KEY ENGINEERING & DESIGN DECISIONS */}
      <section id="decisions" className="py-20 md:py-28 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto border-t border-gray-100">
        <div className="w-full flex justify-between items-baseline mb-12 border-b border-gray-100 pb-4">
          <span className="font-sans font-semibold text-[11px] text-black/40 uppercase tracking-widest">
            04 / KEY ENGINEERING & DESIGN DECISIONS
          </span>
        </div>

        <div className="space-y-12">
          {[
            {
              title: "Client-Side BYOK & IndexedDB Storage",
              mechanism: "All API keys, prompt histories, and custom design system configurations are stored locally in IndexedDB. Requests to AI providers (Gemini, Claude, OpenAI, Ollama) are dispatched directly from the client browser.",
              tradeoff: "Eliminates backend infrastructure costs and guarantees privacy. However, users are responsible for managing their API keys and component backups.",
              image: "/projects/open-component-studio/decision-1.png"
            },
            {
              title: "Component-First Scope over Full-App Generation",
              mechanism: "Restricts LLM generation outputs to self-contained, modular React components with standardized prop interfaces and scoped CSS variables.",
              tradeoff: "The workspace cannot automatically generate complex multi-page routing out-of-the-box. In exchange, it achieves significantly higher visual fidelity and micro-animation control.",
              image: "/projects/open-component-studio/decision-2.png"
            },
            {
              title: "Client-Side \"Magic Tweaks\" (DOM Style Patching)",
              mechanism: "Generated components consume CSS variables for design tokens. A visual control panel lets users modify accent colors, spacing, and typography tokens by directly patching DOM CSS variables without triggering an LLM re-prompt.",
              tradeoff: "Requires generation prompts to strictly format styles using CSS variables. In return, visual tweaks execute with 0ms API latency and zero token consumption.",
              image: "/projects/open-component-studio/decision-3.png"
            },
            {
              title: "Upfront Design System Token Orchestration",
              mechanism: "Before generating individual components, users specify or auto-generate a global design system token set (color palettes, typography pairs, GSAP motion presets). These tokens are injected as system context into subsequent prompts.",
              tradeoff: "Adds an explicit setup step before generating the first UI element, but guarantees visual coherence across an entire generated component library."
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="border border-[#EDEDED] rounded bg-[#FAFAFA] flex flex-col gap-6 p-6 md:p-10"
            >
              <div className="w-full text-left space-y-3">
                <h4 className="font-sans font-semibold text-[18px] md:text-[20px] text-black uppercase tracking-tight">
                  Decision 0{idx + 1}: {item.title}
                </h4>
                <div className="space-y-2">
                  <p className="font-sans text-[15px] leading-relaxed text-black/80 font-normal">
                    <strong>Mechanism:</strong> {item.mechanism}
                  </p>
                  <p className="font-sans text-[14px] leading-relaxed text-black/60 font-light">
                    <strong>Trade-off:</strong> {item.tradeoff}
                  </p>
                </div>
              </div>
              {item.image && (
                <div className="w-full relative aspect-[4/3] md:aspect-[16/9] bg-[#E8E8E8] border border-black/5 rounded-sm overflow-hidden shadow-sm mt-2">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-2 md:p-4"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 5. INTERACTIVE WORKBENCH / VISUAL SANDBOX DEMO */}
      <section id="sandbox" className="py-20 md:py-28 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto border-t border-gray-100 bg-[#FAFAFA] rounded border border-black/5">
        <div className="w-full flex justify-between items-baseline mb-8">
          <span className="font-sans font-semibold text-[11px] text-black/40 uppercase tracking-widest">
            05 / INTERACTIVE WORKBENCH
          </span>
          <span className="font-sans font-medium text-[11px] text-black/30 uppercase tracking-widest">
            MAGIC TWEAKS SANDBOX
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Left Column */}
          <div className="lg:col-span-4 text-left space-y-6 bg-white p-6 border border-gray-200 rounded-sm">
            <span className="text-[11px] font-bold text-black/40 uppercase tracking-wider block border-b pb-2 font-sans">CSS Variable Patching</span>

            {/* Aspect Ratio Toggle */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase text-black/60 font-sans">Viewport Scale</label>
              <div className="flex gap-2">
                {(["desktop", "tablet", "mobile"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setAspectRatio(mode)}
                    className={`flex-1 py-1.5 text-[10px] uppercase font-bold border rounded-sm transition-all font-sans ${aspectRatio === mode
                        ? "bg-black border-black text-white"
                        : "bg-gray-50 border-gray-200 hover:border-gray-300 text-black/70"
                      }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Padding Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-bold uppercase text-black/60 font-sans">
                <span>Padding (`--card-padding`)</span>
                <span>{cardPadding}px</span>
              </div>
              <input
                type="range" min="10" max="40" value={cardPadding}
                onChange={(e) => setCardPadding(Number(e.target.value))}
                className="w-full accent-black cursor-pointer"
              />
            </div>

            {/* Gap Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-bold uppercase text-black/60 font-sans">
                <span>Vertical Gap (`--item-gap`)</span>
                <span>{itemGap}px</span>
              </div>
              <input
                type="range" min="4" max="24" value={itemGap}
                onChange={(e) => setItemGap(Number(e.target.value))}
                className="w-full accent-black cursor-pointer"
              />
            </div>

            {/* Rounded Radius Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-bold uppercase text-black/60 font-sans">
                <span>Border Radius (`--radius`)</span>
                <span>{borderRadius}px</span>
              </div>
              <input
                type="range" min="0" max="24" value={borderRadius}
                onChange={(e) => setBorderRadius(Number(e.target.value))}
                className="w-full accent-black cursor-pointer"
              />
            </div>

            {/* Accent Color Pickers */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase text-black/60 block font-sans">Accent Color (`--accent`)</label>
              <div className="flex gap-3">
                {["#3b82f6", "#22c55e", "#f97316", "#8b5cf6"].map((color) => (
                  <button
                    key={color}
                    onClick={() => setAccentColor(color)}
                    style={{ backgroundColor: color }}
                    className={`w-6 h-6 rounded-full border-2 transition-all ${accentColor === color ? "border-black scale-110" : "border-transparent hover:scale-105"
                      }`}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Interactive Screen Right Column */}
          <div className="lg:col-span-8 border border-gray-200 bg-white rounded p-8 flex items-center justify-center min-h-[420px] overflow-hidden shadow-inner relative">
            <div className="absolute top-4 left-4 text-[10px] text-black/25 uppercase font-mono tracking-widest">
              Live DOM Patch (0ms API Latency)
            </div>

            {/* The reflowing viewport */}
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className={`${getAspectStyle()} border border-gray-200 rounded-sm bg-neutral-50 shadow-md p-6 flex flex-col justify-between overflow-y-auto`}
            >
              {/* Mock Header */}
              <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-2 shrink-0">
                <span className="text-[10px] font-black tracking-widest text-black/30 uppercase font-sans">Open Component Studio</span>
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accentColor }} />
              </div>

              {/* Render dynamic mockup card */}
              <div
                style={{
                  padding: `${cardPadding}px`,
                  borderRadius: `${borderRadius}px`
                }}
                className="bg-white border border-gray-150 flex-1 flex flex-col justify-center shadow-sm min-h-0"
              >
                <div
                  style={{ gap: `${itemGap}px` }}
                  className="flex flex-col text-left"
                >
                  <div className="w-12 h-2 rounded-sm animate-pulse" style={{ backgroundColor: accentColor }} />
                  <h4 className="text-[16px] font-bold text-black uppercase tracking-tight leading-none font-sans">Magic Tweaks Panel</h4>
                  <p className="text-[11px] text-black/45 leading-normal font-sans">
                    Visual attributes map directly to standard CSS custom properties, allowing instant DOM variable patching without re-prompting the LLM.
                  </p>
                  <button
                    style={{ borderRadius: `${Math.min(borderRadius, 8)}px` }}
                    className="w-full py-2 bg-neutral-900 hover:bg-black text-white text-[10px] uppercase font-bold tracking-wider transition-all mt-1 font-sans cursor-pointer"
                  >
                    Export Component
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. WHAT DIDN'T WORK FIRST (Iterative Failures) */}
      <section id="friction" className="py-16 md:py-24 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto border-t border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <span className="font-sans font-semibold text-[11px] text-black/40 uppercase tracking-widest block">
              06 / WHAT DIDN&apos;T WORK FIRST
            </span>
          </div>
          <div className="md:col-span-8 text-left space-y-8">
            {/* Attempt 1 */}
            <div className="p-6 border border-gray-200 rounded-sm bg-neutral-50/50 space-y-3">
              <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider block font-sans">Attempt 1 // Unstructured Full-Code Re-prompting</span>
              <p className="text-[14px] text-black/80 font-normal leading-relaxed font-sans">
                <strong>The Approach:</strong> Visual adjustments were handled by sending full component code back to the LLM with instructions like <em>&quot;increase border radius to 12px and change primary accent to violet&quot;</em>.
              </p>
              <p className="text-[14px] text-black/60 font-light leading-relaxed font-sans">
                <strong>Why it Failed:</strong> The LLM frequently refactored unrelated component logic, stripped GSAP spring physics parameters, or introduced TypeScript type discrepancies.
              </p>
              <p className="text-[14px] text-black/90 font-medium leading-relaxed font-sans">
                <strong>The Pivot:</strong> Decoupled visual styling from code regeneration. Visual properties were mapped to standard CSS custom properties (`--accent`, `--radius`, `--font-main`), enabling client-side DOM patching while reserving LLM re-prompts for structural changes.
              </p>
            </div>

            {/* Attempt 2 */}
            <div className="p-6 border border-gray-200 rounded-sm bg-neutral-50/50 space-y-3">
              <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider block font-sans">Attempt 2 // Unconstrained Typography Generation</span>
              <p className="text-[14px] text-black/80 font-normal leading-relaxed font-sans">
                <strong>The Approach:</strong> Allowed the LLM to specify any font-family string in generated inline styles or CSS classes.
              </p>
              <p className="text-[14px] text-black/60 font-light leading-relaxed font-sans">
                <strong>Why it Failed:</strong> Previews rendered fallback system fonts (Times New Roman) or suffered layout shifts when custom fonts failed to load inside the preview sandbox.
              </p>
              <p className="text-[14px] text-black/90 font-medium leading-relaxed font-sans">
                <strong>The Pivot:</strong> Constrained typography generation to a curated font registry (Syne, Inter, Outfit, Space Grotesk). The preview sandbox automatically injects Google Fonts link tags prior to rendering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. REALIZED OUTCOMES & OPERATIONAL REALITY */}
      <section id="outcome" className="py-20 md:py-28 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto border-t border-gray-100">
        <div className="w-full flex justify-between items-baseline mb-12 border-b border-gray-100 pb-4">
          <span className="font-sans font-semibold text-[11px] text-black/40 uppercase tracking-widest">
            07 / REALIZED OUTCOMES & OPERATIONAL REALITY
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="p-6 bg-[#FAFAFA] border border-black/5 rounded">
            <span className="font-sans text-[36px] md:text-[48px] font-bold text-black block tracking-tight leading-none font-serif">$0/mo</span>
            <span className="font-sans text-[10px] text-black/40 uppercase tracking-wider font-semibold block mt-3">Infrastructure Overhead</span>
            <p className="font-sans text-[12px] text-black/50 mt-1 leading-normal">Deploys as a static PWA bundle on Vercel/GitHub Pages with zero server compute or database costs.</p>
          </div>
          <div className="p-6 bg-[#FAFAFA] border border-black/5 rounded">
            <span className="font-sans text-[36px] md:text-[48px] font-bold text-black block tracking-tight leading-none font-serif">0ms</span>
            <span className="font-sans text-[10px] text-black/40 uppercase tracking-wider font-semibold block mt-3">Visual Tweaks Latency</span>
            <p className="font-sans text-[12px] text-black/50 mt-1 leading-normal">Attribute tweaks execute instantly via client-side CSS variable manipulation, bypassing model inference waits.</p>
          </div>
          <div className="p-6 bg-[#FAFAFA] border border-black/5 rounded">
            <span className="font-sans text-[36px] md:text-[48px] font-bold text-black block tracking-tight leading-none font-serif">100%</span>
            <span className="font-sans text-[10px] text-black/40 uppercase tracking-wider font-semibold block mt-3">Local Privacy</span>
            <p className="font-sans text-[12px] text-black/50 mt-1 leading-normal">User prompts, design tokens, and generated React code remain strictly inside local IndexedDB.</p>
          </div>
        </div>
      </section>

      {/* 8. WHAT I'D RECONSIDER & REFLECTION */}
      <section id="reconsider" className="py-16 md:py-24 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto border-t border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <span className="font-sans font-semibold text-[11px] text-black/40 uppercase tracking-widest block">
              08 / WHAT I&apos;D RECONSIDER & REFLECTION
            </span>
          </div>
          <div className="md:col-span-8 text-left space-y-6">
            <div className="space-y-4">
              <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-sm">
                <h4 className="text-[13px] font-bold text-black uppercase tracking-wider font-sans mb-1">01. Workspace Density vs. Focus Mode (Design)</h4>
                <p className="text-[14px] text-black/70 font-sans leading-relaxed">
                  The high-density 4-panel cockpit layout prioritizes power-user efficiency, but can introduce visual noise when fine-tuning a single UI element. I would redesign the workspace layout to offer an adaptive &quot;Focus Mode&quot; that automatically collapses control rails when editing micro-interactions, providing an uncluttered, distraction-free stage for visual refinement.
                </p>
              </div>

              <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-sm">
                <h4 className="text-[13px] font-bold text-black uppercase tracking-wider font-sans mb-1">02. IndexedDB Durability & Native File System Access (Technical)</h4>
                <p className="text-[14px] text-black/70 font-sans leading-relaxed">
                  Relying strictly on browser IndexedDB means clearing site data or browser caches risks deleting local component libraries unless manually exported. I would integrate the native File System Access API to enable automatic, direct local directory syncing so generated components persist as real `.tsx` files directly on the user&apos;s local filesystem.
                </p>
              </div>
            </div>

            {/* Reflection quote */}
            <div className="mt-8 p-6 border-l-2 border-black text-left bg-neutral-50/50">
              <span className="font-sans text-[11px] font-bold text-black/40 uppercase tracking-widest block mb-2">Reflection</span>
              <p className="font-sans text-[15px] leading-relaxed text-black/85 font-medium">
                Focusing on component-level craft rather than trying to build a generic full-app generator transformed Open Component Studio into a precise tool for developers. The primary takeaway: AI UI utilities are most effective when they respect developer control—delegating initial high-entropy layout creation to the model, while providing deterministic, instant levers for visual refinement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED PROCESS DRAWER */}
      <section className="py-12 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto flex flex-col items-center">
        <button
          onClick={() => setShowFullProcess(!showFullProcess)}
          className="px-8 py-4 border border-black text-black font-sans text-[12px] uppercase font-bold tracking-wider hover:bg-black hover:text-white transition-all duration-300 rounded-sm cursor-pointer"
        >
          {showFullProcess ? "Hide detailed process" : "See full process"}
        </button>

        {showFullProcess && (
          <div className="w-full mt-12 pt-12 border-t border-gray-100 text-left space-y-12 animate-fadeIn font-sans text-black">

            {/* SECTION 1: ARCHITECTURE */}
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest block font-sans">01 / ARCHITECTURE & TECH STACK</span>
              <h4 className="text-[16px] font-semibold text-black uppercase tracking-tight">Technical Stack Summary</h4>
              <ul className="list-disc pl-5 text-[13px] text-black/70 space-y-1.5">
                <li><strong>Core UI:</strong> React 18, Vite, TypeScript, Tailwind CSS</li>
                <li><strong>Animations:</strong> GSAP (GreenSock Physics & Motion Presets)</li>
                <li><strong>AI Orchestration:</strong> Vercel AI SDK (Direct BYOK client streams)</li>
                <li><strong>Local Persistence:</strong> IndexedDB (Zero backend operational cost)</li>
              </ul>
            </div>

            {/* SECTION 2: CSS VARIABLE PATCHING MECHANISM */}
            <div className="space-y-4 pt-10 border-t border-gray-100">
              <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest block font-sans">02 / DOM VARIABLE PATCHING CODE</span>
              <h4 className="text-[16px] font-semibold text-black uppercase tracking-tight font-sans">Magic Tweaks CSS Variable Engine</h4>
              <p className="font-sans text-[13px] text-black/60 leading-relaxed max-w-3xl">
                Visual style adjustments update CSS variables directly on the preview sandbox wrapper without re-rendering component ASTs or dispatching LLM API calls:
              </p>

              <div className="p-5 bg-neutral-950 rounded text-neutral-300 font-mono text-[12px] space-y-1 shadow-inner overflow-x-auto">
                <div>const applyStylePatch = (propertyName: string, value: string) =&#123;</div>
                <div className="pl-4">{"const previewFrame = document.getElementById('component-sandbox-iframe');"}</div>
                <div className="pl-4">if (!previewFrame || !previewFrame.contentDocument) return;</div>
                <div className="pl-4">{"previewFrame.contentDocument.documentElement.style.setProperty(propertyName, value);"}</div>
                <div>&#125;;</div>
              </div>
            </div>

          </div>
        )}
      </section>

      {/* FOOTER */}
      <CaseStudyFooter nextProject={{ name: "Scribe", href: "/projects/scribe" }} />
    </main>
  );
}
