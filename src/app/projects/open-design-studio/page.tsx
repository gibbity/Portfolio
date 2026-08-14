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

export default function OpenDesignStudioPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Section definitions for Side Progress Rail & Wayfinding
  const sections = [
    { id: "intro", label: "Hook" },
    { id: "context", label: "Context" },
    { id: "problem", label: "The Real Problem" },
    { id: "decisions", label: "Key Decisions" },
    { id: "sandbox", label: "Visual Sandbox" },
    { id: "friction", label: "What Didn't Work" },
    { id: "outcome", label: "Outcome" }
  ];

  const [activeSection, setActiveSection] = useState("intro");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [showFullProcess, setShowFullProcess] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Expanded decision toggle
  const [expandedDecision, setExpandedDecision] = useState<number | null>(0);

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
      <CaseStudyNav projectTitle="Open Design Studio" category="Local Prototyping Environment" />

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
        title="Open Design Studio"
        subtitle="Local-First Prototyping"
        description="A web-native, client-side AI prototyping workspace allowing creators to generate, refine, and export interactive prototypes with complete data privacy."
        meta={{
          "Role": "Solo Designer & Developer",
          "Timeline": "2024",
          "Focus": "Local-First UX / Browser DB",
          "Engine": "Electron / Dexie.js / React 19",
          "Poster": "/projects/open-design-studio/hero.png"
        }}
        media={{
          type: "video",
          src: "/projects/open-design-studio/open-component-main-video-3x4.mp4"
        }}
        theme="light"
        fullMedia={true}
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
              Designers generate, refine, and export interactive prototypes entirely within their own web browser.
            </h3>
            <p className="font-sans font-normal text-[17px] md:text-[19px] leading-relaxed text-black/70">
              By leveraging client-side databases and sandboxed execution, Open Design Studio resolves the corporate tension between leveraging modern AI code generation and protecting sensitive internal design system source code.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CONTEXT */}
      <section id="context" className="py-16 md:py-24 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto border-t border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <span className="font-sans font-semibold text-[11px] text-black/40 uppercase tracking-widest block">
              02 / CONTEXT
            </span>
          </div>
          <div className="md:col-span-8 text-left space-y-6">
            <p className="font-sans font-normal text-[15px] md:text-[16px] leading-relaxed text-black/75">
              Open Design Studio was designed for designers and developers who want the speed of AI instrumentation without being locked into subscription silos or leaking client data.
              The application started as a native desktop application but pivoted to run fully inside standard browsers. The primary design constraint was guaranteeing absolute client-side data privacy while maintaining instant preview capabilities.
            </p>
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
              Cloud AI builders require pasting sensitive intellectual property, violating compliance guidelines.
            </h3>
            <p className="font-sans font-normal text-[15px] md:text-[16px] leading-relaxed text-black/60">
              Existing systems lock creators into proprietary clouds, requiring data to leak to third-party servers. While desktop clients solved this, installing binaries and libraries introduced setup friction, platform incompatibilities, and high crash rates on enterprise machines. The design challenge was establishing a zero-install browser workstation that provides sandboxed local code execution.
            </p>
          </div>
        </div>
      </section>

      {/* 4. KEY DECISIONS */}
      <section id="decisions" className="py-20 md:py-28 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto border-t border-gray-100">
        <div className="w-full flex justify-between items-baseline mb-12 border-b border-gray-100 pb-4">
          <span className="font-sans font-semibold text-[11px] text-black/40 uppercase tracking-widest">
            04 / KEY DECISIONS
          </span>
          <span className="font-sans font-medium text-[11px] text-black/30 uppercase tracking-widest">
            CLICK TO EXPAND
          </span>
        </div>

        <div className="space-y-4">
          {[
            {
              title: "Storage Shift to Browser Database (Dexie.js)",
              why: "Removed the need for installing local binaries and resolved driver setup errors by pivoting standard SQLite files into the browser's native IndexedDB layer."
            },
            {
              title: "Unified Multi-Model Bring-Your-Own-Key Integration",
              why: "Created client-side API configuration nodes, allowing designers to hook up their own Anthropic, OpenAI, or Ollama endpoints, preserving privacy and custom tuning."
            },
            {
              title: "High-Density 4-Panel Cockpit Workspace",
              why: "Minimonized layout-switching latency. Placed structural outlines, agent console feedback, active preview, and visual adjustments inside a single dense screen."
            },
            {
              title: "Direct Visual Editing Control Sliders",
              why: "Eliminated the friction of typing repetitive prompts like 'increase padding by 4px'. Designed interactive sliders mapping custom properties directly into components."
            }
          ].map((item, idx) => {
            const isExpanded = expandedDecision === idx;
            return (
              <div
                key={idx}
                className="border border-[#EDEDED] rounded bg-[#FAFAFA] transition-all"
              >
                <button
                  onClick={() => setExpandedDecision(isExpanded ? null : idx)}
                  className="w-full text-left p-6 flex justify-between items-center"
                >
                  <h4 className="font-sans font-semibold text-[15px] text-black uppercase tracking-tight font-sans">
                    → {item.title}
                  </h4>
                  <span className="text-[18px] font-mono font-bold text-black/30">
                    {isExpanded ? "–" : "+"}
                  </span>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-gray-100 text-left bg-white rounded-b">
                    <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest block mb-2 font-sans">Rationale</span>
                    <p className="font-sans text-[14px] leading-relaxed text-black/70 font-light">
                      {item.why}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. INTERACTIVE VISUAL SANDBOX DEMO */}
      <section id="sandbox" className="py-20 md:py-28 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto border-t border-gray-100 bg-[#FAFAFA] rounded border border-black/5">
        <div className="w-full flex justify-between items-baseline mb-8">
          <span className="font-sans font-semibold text-[11px] text-black/40 uppercase tracking-widest">
            05 / INTERACTIVE WORKBENCH
          </span>
          <span className="font-sans font-medium text-[11px] text-black/30 uppercase tracking-widest">
            LIVE SANDBOX REFLEX
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Left Column */}
          <div className="lg:col-span-4 text-left space-y-6 bg-white p-6 border border-gray-200 rounded-sm">
            <span className="text-[11px] font-bold text-black/40 uppercase tracking-wider block border-b pb-2 font-sans">Visual Parameters</span>

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
                <span>Padding</span>
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
                <span>Vertical Gap</span>
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
                <span>Border Radius</span>
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
              <label className="text-[11px] font-bold uppercase text-black/60 block font-sans">Accent Color</label>
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
              Preview Sandbox (Fluid Reflow)
            </div>

            {/* The reflowing viewport */}
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className={`${getAspectStyle()} border border-gray-200 rounded-sm bg-neutral-50 shadow-md p-6 flex flex-col justify-between overflow-y-auto`}
            >
              {/* Mock Header */}
              <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-2 shrink-0">
                <span className="text-[10px] font-black tracking-widest text-black/30 uppercase font-sans">Open Design Workspace</span>
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
                  <h4 className="text-[16px] font-bold text-black uppercase tracking-tight leading-none font-sans">Interactive Sandbox</h4>
                  <p className="text-[11px] text-black/45 leading-normal font-sans">
                    This component reflows dynamically as you adjust spacing sliders and viewport constraints, demonstrating our direct visual adjustments sandbox.
                  </p>
                  <button
                    style={{ borderRadius: `${Math.min(borderRadius, 8)}px` }}
                    className="w-full py-2 bg-neutral-900 hover:bg-black text-white text-[10px] uppercase font-bold tracking-wider transition-all mt-1 font-sans cursor-pointer"
                  >
                    Action Trigger
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. WHAT DIDN'T WORK AT FIRST */}
      <section id="friction" className="py-16 md:py-24 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto border-t border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <span className="font-sans font-semibold text-[11px] text-black/40 uppercase tracking-widest block">
              06 / WHAT DIDN&apos;T WORK
            </span>
          </div>
          <div className="md:col-span-8 text-left space-y-6">
            <h4 className="font-sans font-bold text-[13px] text-black uppercase tracking-wider font-serif">The Local Database Installation Friction</h4>
            <p className="font-sans font-normal text-[15px] md:text-[16px] leading-relaxed text-black/60">
              The initial version stored user history using a native desktop database. However, this required platforms-specific desktop compilers, causing failures during corporate updates and locking users out of designs.
              We pivoted the storage to browser IndexedDB (Dexie.js). To prevent legacy users from losing historical sessions, we engineered an automatic background migration utility that silently extracts SQLite files and puts them into IndexedDB on first launch.
            </p>
          </div>
        </div>
      </section>

      {/* 7. OUTCOME */}
      <section id="outcome" className="py-20 md:py-28 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto border-t border-gray-100">
        <div className="w-full flex justify-between items-baseline mb-12 border-b border-gray-100 pb-4">
          <span className="font-sans font-semibold text-[11px] text-black/40 uppercase tracking-widest">
            07 / OUTCOME
          </span>
          <span className="font-sans font-medium text-[11px] text-black/30 uppercase tracking-widest">
            QUANTIFIED METRICS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="p-6 bg-[#FAFAFA] border border-black/5 rounded">
            <span className="font-sans text-[36px] md:text-[48px] font-bold text-black block tracking-tight leading-none font-serif">0 Setup</span>
            <span className="font-sans text-[10px] text-black/40 uppercase tracking-wider font-semibold block mt-3">Local Execution</span>
            <p className="font-sans text-[12px] text-black/50 mt-1 leading-normal">Start generating component code instantly in the browser with zero installers.</p>
          </div>
          <div className="p-6 bg-[#FAFAFA] border border-black/5 rounded">
            <span className="font-sans text-[36px] md:text-[48px] font-bold text-black block tracking-tight leading-none font-serif">Sub-100ms</span>
            <span className="font-sans text-[10px] text-black/40 uppercase tracking-wider font-semibold block mt-3">Sandbox Render</span>
            <p className="font-sans text-[12px] text-black/50 mt-1 leading-normal">Safe iframe-based execution renders UI modules instantly without bundler lag.</p>
          </div>
          <div className="p-6 bg-[#FAFAFA] border border-black/5 rounded">
            <span className="font-sans text-[36px] md:text-[48px] font-bold text-black block tracking-tight leading-none font-serif">IndexedDB</span>
            <span className="font-sans text-[10px] text-black/40 uppercase tracking-wider font-semibold block mt-3">Version Restore</span>
            <p className="font-sans text-[12px] text-black/50 mt-1 leading-normal">Fast local snapshots allow infinite history rollback without page reloads.</p>
          </div>
        </div>

        {/* Reflection */}
        <div className="mt-12 p-6 border-l-2 border-black text-left">
          <span className="font-sans text-[11px] font-bold text-black/40 uppercase tracking-widest block mb-2 font-serif">Reflection</span>
          <p className="font-sans text-[14px] leading-relaxed text-black/75">
            Pivoting storage to IndexedDB demonstrated that web-native tools can match native file accessibility and safety, proving that the best user setup experience is often the one you completely eliminate.
          </p>
        </div>
      </section>

      {/* 8. COLLAPSIBLE DEEP PROCESS DRAWER */}
      <section className="py-12 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto flex flex-col items-center">
        <button
          onClick={() => setShowFullProcess(!showFullProcess)}
          className="px-8 py-4 border border-black text-black font-sans text-[12px] uppercase font-bold tracking-wider hover:bg-black hover:text-white transition-all duration-300 rounded-sm cursor-pointer"
        >
          {showFullProcess ? "Hide detailed process" : "See full process"}
        </button>

        {showFullProcess && (
          <div className="w-full mt-12 pt-12 border-t border-gray-100 text-left space-y-12 animate-fadeIn font-sans text-black">

            {/* SECTION 1: ARCHITECTURE DIAGRAM */}
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest block font-sans">01 / REPO STRUCTURE & FLOW</span>
              <h4 className="text-[16px] font-semibold text-black uppercase tracking-tight">Monorepo Modules</h4>
              <p className="font-sans text-[13px] text-black/60 leading-relaxed max-w-3xl">
                The Open Design Studio codebase is configured as a monorepo structured via pnpm and Turborepo:
              </p>
              <ul className="list-disc pl-5 text-[13px] text-black/60 space-y-1">
                <li><code>apps/desktop</code>: Electron-based wrapper acting as a shell.</li>
                <li><code>packages/core</code>: Generation orchestrator calling the adapter layer.</li>
                <li><code>packages/runtime</code>: Sandboxed execution iframe runtime.</li>
                <li><code>packages/ui</code>: React 19 visual design layout and customization components.</li>
              </ul>
            </div>

            {/* SECTION 2: STORAGE MIGRATION SCRIPT */}
            <div className="space-y-4 pt-10 border-t border-gray-100">
              <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest block font-sans">02 / DATABASE MIGRATION MECHANICS</span>
              <h4 className="text-[16px] font-semibold text-black uppercase tracking-tight font-sans">SQLite-to-Dexie.js Transition Utility</h4>
              <p className="font-sans text-[13px] text-black/60 leading-relaxed max-w-3xl">
                To run fully in the browser, version <code>v0.2.0</code> migrates data from the Electron SQLite layer to IndexedDB via this utility:
              </p>

              <div className="p-5 bg-neutral-950 rounded text-neutral-300 font-mono text-[12px] space-y-1 shadow-inner overflow-x-auto">
                <div>async function migrateFromSqlite(electronStudio: any) &#123;</div>
                <div className="pl-4">{"const isMigrated = await db.preferences.get('migration_done');"}</div>
                <div className="pl-4">if (isMigrated?.value) return;</div>
                <div className="pl-4">try &#123;</div>
                <div className="pl-8">const sqliteDesigns = await electronStudio.snapshots.listDesigns();</div>
                <div className="pl-8">if (sqliteDesigns && sqliteDesigns.length &gt; 0) &#123;</div>
                <div className="pl-12">await db.designs.bulkPut(sqliteDesigns);</div>
                <div className="pl-12">for (const d of sqliteDesigns) &#123;</div>
                <div className="pl-16">const sqliteSnaps = await electronStudio.snapshots.list(d.id);</div>
                <div className="pl-16">if (sqliteSnaps &amp;&amp; sqliteSnaps.length &gt; 0) await db.snapshots.bulkPut(sqliteSnaps);</div>
                <div className="pl-12">&#125;</div>
                <div className="pl-8">&#125;</div>
                <div className="pl-8">{"await db.preferences.put({ key: 'migration_done', value: true });"}</div>
                <div className="pl-4">&#125; catch (err) &#123; console.error(err); &#125;</div>
                <div>&#125;</div>
              </div>
            </div>

            {/* SECTION 3: PERFORMANCE AND BENCHMARKS */}
            <div className="space-y-4 pt-10 border-t border-gray-100">
              <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest block font-sans">03 / PERF & OPTIMIZATIONS</span>
              <h4 className="text-[16px] font-semibold text-black uppercase tracking-tight font-sans">Lazy loading & Sub-second Painting</h4>
              <p className="font-sans text-[13px] text-black/60 leading-relaxed max-w-3xl">
                To guarantee lightning fast startup times, heavy export components (such as PDF and PPTX generators) are partitioned into lazy-loaded chunks. This allows initial paint latency to stay below 100ms.
              </p>
            </div>

          </div>
        )}
      </section>

      {/* FOOTER */}
      <CaseStudyFooter nextProject={{ name: "Scribe", href: "/projects/scribe" }} />
    </main>
  );
}
