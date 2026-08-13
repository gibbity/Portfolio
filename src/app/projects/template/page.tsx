"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import CaseStudyNav from "@/components/case-study/CaseStudyNav";
import CaseStudyFooter from "@/components/case-study/CaseStudyFooter";

// Section definitions for Side Progress Rail & Wayfinding
const sections = [
  { id: "intro", label: "Hook" },
  { id: "context", label: "Context & Constraint" },
  { id: "problem", label: "The Real Problem" },
  { id: "timeline", label: "Key Decisions" },
  { id: "comparison", label: "Before & After" },
  { id: "friction", label: "Friction & Pivot" },
  { id: "outcome", label: "Outcome" }
];

export default function CaseStudyTemplatePage() {
  const [activeSection, setActiveSection] = useState("intro");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  
  // Interactive Before/After Slider state
  const sliderRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)
  const [isDragging, setIsDragging] = useState(false);

  // Progressive disclosure state for decisions timeline
  const [activeDecision, setActiveDecision] = useState<number | null>(0);

  // Annotated screenshot tooltips
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  // Collapsible full process toggle
  const [showFullProcess, setShowFullProcess] = useState(false);

  // Scroll Progress Bar state
  const [scrollProgress, setScrollProgress] = useState(0);

  // IntersectionObserver to update active section in Side Rail and Header
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

  // Before/After Slider Drag Handling
  const handleSliderMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      handleSliderMove(e.clientX);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      handleSliderMove(e.touches[0].clientX);
    };

    const onMouseUpGlobal = () => setIsDragging(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUpGlobal);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onMouseUpGlobal);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUpGlobal);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onMouseUpGlobal);
    };
  }, [isDragging]);

  const handleJumpToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="relative min-h-screen bg-white font-sans text-black selection:bg-black selection:text-white pb-32 overflow-x-hidden">
      
      {/* Scroll Progress Bar */}
      <div 
        style={{ width: `${scrollProgress}%` }}
        className="fixed top-0 left-0 h-[2px] bg-black z-50 transition-all duration-75"
      />

      {/* Case Study Nav */}
      <CaseStudyNav projectTitle="Template" category="System Architecture" />

      {/* LIVE SECTION LABEL (Wayfinding) */}
      <div className="fixed top-24 left-6 md:left-12 lg:left-16 hidden md:block z-30 pointer-events-none">
        <span className="font-sans font-medium text-[10px] text-black/30 uppercase tracking-[0.2em] block">
          Current Stage
        </span>
        <span className="font-sans font-semibold text-[12px] text-black uppercase tracking-wider block mt-1 transition-all duration-300">
          {sections.find(s => s.id === activeSection)?.label || "Hook"}
        </span>
      </div>

      {/* SIDE PROGRESS SPINE RAIL (Wayfinding) */}
      <div className="fixed right-6 md:right-12 lg:right-16 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-5 items-center z-30">
        <div className="w-[1.5px] h-32 bg-gray-100 relative flex flex-col justify-between items-center py-2">
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => handleJumpToSection(sec.id)}
                title={sec.label}
                className={`w-2 h-2 rounded-full border transition-all duration-300 ${
                  isActive 
                    ? "bg-black border-black scale-125" 
                    : "bg-white border-gray-300 hover:border-black"
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* LIGHTBOX / ZOOM OVERLAY */}
      {lightboxImage && (
        <div 
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center cursor-zoom-out p-6"
        >
          <div className="relative w-full max-w-5xl h-[80vh]">
            <Image 
              src={lightboxImage} 
              alt="Zoomed Screenshot" 
              fill 
              className="object-contain" 
            />
          </div>
          <span className="absolute top-8 right-8 font-sans text-white/50 text-[12px] uppercase tracking-widest">
            Click anywhere to close
          </span>
        </div>
      )}

      {/* 2. COVER / HERO BANNER */}
      <section id="intro" className="relative w-full pt-32 pb-16 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-[10px] md:text-[11px] px-2.5 py-1 bg-black/5 text-black font-semibold rounded-sm uppercase tracking-wider">Patented hardware</span>
          <span className="text-[10px] md:text-[11px] px-2.5 py-1 bg-black/5 text-black font-semibold rounded-sm uppercase tracking-wider">Clinical staff</span>
          <span className="text-[10px] md:text-[11px] px-2.5 py-1 bg-black/5 text-black font-semibold rounded-sm uppercase tracking-wider">3-week sprint</span>
        </div>

        {/* The Hook (5-second version) */}
        <h1 className="font-sans font-normal text-[36px] md:text-[54px] lg:text-[68px] leading-[1.05] tracking-tight text-black text-left max-w-4xl">
          Reduced diagnostic-screen visual noise by half for a live patient-monitoring tool.
        </h1>

        <div className="flex gap-6 mt-8">
          <button 
            onClick={() => handleJumpToSection("outcome")}
            className="font-sans font-semibold text-[12px] text-black/50 hover:text-black underline underline-offset-4 uppercase tracking-wider"
          >
            Skip to outcome →
          </button>
          <span className="font-sans text-[12px] text-black/30 font-medium uppercase tracking-wider">
            3 min read / 45 sec skim
          </span>
        </div>

        {/* Hero Visual Mockup */}
        <div className="w-full aspect-[16/9.5] bg-[#FAFAFA] border border-black/5 rounded-sm overflow-hidden flex items-center justify-center my-12 relative">
          <svg viewBox="0 0 800 480" className="w-full h-full stroke-black/5 select-none pointer-events-none">
            <rect x="20" y="20" width="760" height="440" rx="2" fill="none" strokeWidth="0.5" />
            <line x1="160" y1="20" x2="160" y2="460" strokeWidth="0.5" />
            <circle cx="480" cy="240" r="100" fill="none" strokeWidth="0.5" strokeDasharray="4 4" />
            <path d="M 160 240 Q 320 120 480 240 T 800 240" fill="none" strokeWidth="0.5" />
          </svg>
          <div className="absolute bottom-6 right-6 bg-white/95 border border-black/5 px-4 py-2 rounded">
            <span className="font-sans text-[11px] text-black/40 uppercase tracking-wider">Hero System Mockup</span>
          </div>
        </div>
      </section>

      {/* 3. CONTEXT SECTION */}
      <section id="context" className="py-16 md:py-24 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto border-t border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <span className="font-sans font-semibold text-[11px] text-black/40 uppercase tracking-widest block">
              01 / CONTEXT
            </span>
          </div>
          <div className="md:col-span-8 text-left">
            <p className="font-sans font-normal text-[17px] md:text-[19px] leading-relaxed text-black/70">
              Built under contract for VIT Vellore, the objective was to deploy a live diagnostic dashboard for clinical laboratories. The interface was bound to rigid, legacy telemetry feeds and high stakeholder requirements.
            </p>
          </div>
        </div>
      </section>

      {/* 4. THE REAL PROBLEM SECTION */}
      <section id="problem" className="py-16 md:py-24 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto border-t border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <span className="font-sans font-semibold text-[11px] text-black/40 uppercase tracking-widest block">
              02 / THE REAL PROBLEM
            </span>
          </div>
          <div className="md:col-span-8 text-left space-y-6">
            <h3 className="font-sans font-normal text-[24px] md:text-[30px] leading-tight text-black tracking-tight">
              Clinicians were losing 4+ seconds locating critical vitals during high-stress moments.
            </h3>
            <p className="font-sans font-normal text-[15px] md:text-[16px] leading-relaxed text-black/60">
              The brief asked us to "modernize the visual style of the dashboard." However, research revealed that the true point of failure lay in the information architecture. The old layouts prioritized completeness over urgency, grouping minor indicators right next to vital status alerts.
            </p>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE TIMELINE / DECISION TRACK */}
      <section id="timeline" className="py-20 md:py-28 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto border-t border-gray-100">
        <div className="w-full flex justify-between items-baseline mb-12 border-b border-gray-100 pb-4">
          <span className="font-sans font-semibold text-[11px] text-black/40 uppercase tracking-widest">
            03 / DECISIONS
          </span>
          <span className="font-sans font-medium text-[11px] text-black/30 uppercase tracking-widest">
            PROGRESSIVE DISCLOSURE
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Timeline Spine motif on Left */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col gap-4 border-b lg:border-b-0 lg:border-r border-gray-100 pb-6 lg:pb-0 lg:pr-6">
            {[
              { num: "01", title: "Urgency-First IA", desc: "Hierarchy restructuring" },
              { num: "02", title: "Flat Tag Schema", desc: "No nested navigation" },
              { num: "03", title: "High-Contrast HUD", desc: "Telemetry coloring" }
            ].map((node, i) => (
              <button
                key={i}
                onClick={() => setActiveDecision(i)}
                className={`flex-1 text-left p-4 rounded transition-all duration-300 border ${
                  activeDecision === i 
                    ? "bg-black border-black text-white" 
                    : "bg-[#FAFAFA] border-transparent hover:border-black/10 text-black"
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-sans font-bold text-[10px] tracking-widest uppercase">Decision {node.num}</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${activeDecision === i ? 'bg-white' : 'bg-black/20'}`} />
                </div>
                <h4 className="font-sans font-semibold text-[14px] uppercase tracking-tight">{node.title}</h4>
                <p className={`font-sans text-[11px] mt-1 ${activeDecision === i ? 'text-white/60' : 'text-black/40'}`}>
                  {node.desc}
                </p>
              </button>
            ))}
          </div>

          {/* Inline Expanded Detail Panel on Right */}
          <div className="lg:col-span-8 min-h-[220px] flex flex-col justify-between">
            {activeDecision === 0 && (
              <div className="space-y-6 text-left">
                <div>
                  <span className="text-[10px] font-bold text-black/40 uppercase tracking-wider block mb-1">Concept</span>
                  <h4 className="font-sans font-semibold text-[18px] text-black">URGENCY-DRIVEN LAYOUT ARCHITECTURE</h4>
                </div>
                <p className="font-sans text-[14px] md:text-[15px] leading-relaxed text-black/60">
                  We restructured the screen coordinate prioritizations. Vital signs were centered dynamically on the canvas, while baseline indices were relegated to bottom drawer compartments.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-[11px] font-bold text-black/40 uppercase block">Trade-Off / Selected</span>
                    <p className="text-[12px] text-black/60 mt-1">Urgency grouping: alert triggers automatically scale viewport focus.</p>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-black/40 uppercase block">Rejected Alternatives</span>
                    <p className="text-[12px] text-black/60 mt-1">Grid complete layout: left indicator columns caused grid visual fatigue.</p>
                  </div>
                </div>
              </div>
            )}

            {activeDecision === 1 && (
              <div className="space-y-6 text-left">
                <div>
                  <span className="text-[10px] font-bold text-black/40 uppercase tracking-wider block mb-1">Concept</span>
                  <h4 className="font-sans font-semibold text-[18px] text-black">FLAT TAG METRIC SCHEMA</h4>
                </div>
                <p className="font-sans text-[14px] md:text-[15px] leading-relaxed text-black/60">
                  Replaced standard nested dropdown folders with dynamic tag attributes. This eliminated navigational seek latency, allowing users to aggregate custom lists with one click.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-[11px] font-bold text-black/40 uppercase block">Trade-Off / Selected</span>
                    <p className="text-[12px] text-black/60 mt-1">Flat list tagging: faster queries, less visual hierarchy layers.</p>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-black/40 uppercase block">Rejected Alternatives</span>
                    <p className="text-[12px] text-black/60 mt-1">Hierarchical directories: caused 2.5s navigation seeking delays.</p>
                  </div>
                </div>
              </div>
            )}

            {activeDecision === 2 && (
              <div className="space-y-6 text-left">
                <div>
                  <span className="text-[10px] font-bold text-black/40 uppercase tracking-wider block mb-1">Concept</span>
                  <h4 className="font-sans font-semibold text-[18px] text-black">HIGH-CONTRAST TELEMETRY HUD</h4>
                </div>
                <p className="font-sans text-[14px] md:text-[15px] leading-relaxed text-black/60">
                  Designed a strict color telemetry strategy based on user safety profiles. Standard indexes render in soft slate, warning thresholds in high-contrast icons, and alarm levels in pure red.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-[11px] font-bold text-black/40 uppercase block">Trade-Off / Selected</span>
                    <p className="text-[12px] text-black/60 mt-1">Strict color logic mapping to warning levels.</p>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-black/40 uppercase block">Rejected Alternatives</span>
                    <p className="text-[12px] text-black/60 mt-1">Vibrant multi-color: decorative gradients caused visual clutter.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE BEFORE/AFTER SLIDER */}
      <section id="comparison" className="py-20 md:py-28 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto border-t border-gray-100">
        <div className="w-full flex justify-between items-baseline mb-12">
          <span className="font-sans font-semibold text-[11px] text-black/40 uppercase tracking-widest">
            04 / SCREEN REACTION
          </span>
          <span className="font-sans font-medium text-[11px] text-black/30 uppercase tracking-widest">
            BEFORE / AFTER DRAG SLIDER
          </span>
        </div>

        {/* Interactive Comparison Slider */}
        <div 
          ref={sliderRef}
          className="relative w-full aspect-[16/9] border border-gray-200 rounded-sm overflow-hidden select-none bg-gray-50"
        >
          {/* BEFORE STATE (Underneath / Background) */}
          <div className="absolute inset-0 flex items-center justify-center p-8 bg-[#FBFBFB]">
            <div className="w-full h-full border border-red-500/10 rounded flex flex-col justify-between p-6 bg-red-500/[0.01]">
              <span className="text-[11px] font-mono text-red-500 font-bold uppercase">Before / Legacy System Noise</span>
              <div className="grid grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="p-4 border border-red-500/10 bg-white rounded flex flex-col gap-2 opacity-60">
                    <span className="h-2 w-1/2 bg-red-500/20 rounded" />
                    <span className="h-4 w-3/4 bg-red-500/30 rounded" />
                  </div>
                ))}
              </div>
              <div className="h-10 w-full bg-red-500/10 rounded" />
            </div>
          </div>

          {/* AFTER STATE (Foreground clipped based on sliderPosition) */}
          <div 
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            className="absolute inset-0 flex items-center justify-center p-8 bg-white"
          >
            <div className="w-full h-full border border-black/5 rounded flex flex-col justify-between p-6 bg-[#FAFAFA] shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
              <span className="text-[11px] font-mono text-black font-bold uppercase">After / Streamlined Urgency Focus</span>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 border border-black rounded bg-black text-white flex flex-col gap-2 col-span-3">
                  <span className="text-[10px] uppercase font-bold tracking-widest opacity-60">Active Indicator Alert</span>
                  <span className="text-xl font-bold font-sans">CRITICAL ALARM SIGNAL</span>
                </div>
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="p-4 border border-black/5 bg-white rounded flex flex-col gap-2">
                    <span className="h-2 w-1/2 bg-black/10 rounded" />
                    <span className="h-4 w-3/4 bg-black/20 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Slider Line handle */}
          <div 
            style={{ left: `${sliderPosition}%` }}
            className="absolute top-0 bottom-0 w-[2px] bg-black z-20 cursor-ew-resize"
          >
            <div 
              onMouseDown={handleMouseDown}
              onTouchStart={handleMouseDown}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-black bg-white flex items-center justify-center shadow-lg z-30 cursor-ew-resize active:scale-95 transition-transform"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
              </svg>
            </div>
          </div>
        </div>
        <p className="text-center font-sans text-[12px] text-black/40 mt-4">
          Drag the center handle to slide between the legacy layout and optimized system.
        </p>
      </section>

      {/* 7. ANNOTATED BLUEPRINT SECTION */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto border-t border-gray-100">
        <div className="w-full flex justify-between items-baseline mb-12">
          <span className="font-sans font-semibold text-[11px] text-black/40 uppercase tracking-widest">
            05 / BLUEPRINT INTERFACE
          </span>
          <span className="font-sans font-medium text-[11px] text-black/30 uppercase tracking-widest">
            ANNOTATED HOTSPOTS
          </span>
        </div>

        <div className="relative w-full aspect-[16/9.5] border border-gray-200 rounded-sm overflow-hidden bg-white flex items-center justify-center p-8">
          <svg viewBox="0 0 800 480" className="w-full h-full stroke-black/5 select-none pointer-events-none">
            <rect x="40" y="40" width="720" height="400" rx="4" fill="none" strokeWidth="0.5" />
            <line x1="200" y1="40" x2="200" y2="440" strokeWidth="0.5" />
            <line x1="200" y1="120" x2="760" y2="120" strokeWidth="0.5" />
            <circle cx="120" cy="120" r="35" fill="none" strokeWidth="0.5" />
          </svg>

          {/* Hotspot 1 */}
          <div className="absolute top-[25%] left-[15%] z-20">
            <button 
              onMouseEnter={() => setActiveTooltip(1)}
              onMouseLeave={() => setActiveTooltip(null)}
              onClick={() => setActiveTooltip(activeTooltip === 1 ? null : 1)}
              className="w-7 h-7 rounded-full bg-black text-white font-sans text-[11px] font-bold flex items-center justify-center border-2 border-white shadow-lg cursor-pointer hover:scale-115 transition-transform"
            >
              1
            </button>
            {activeTooltip === 1 && (
              <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-black text-white p-3 rounded border border-white/10 shadow-xl w-48 text-left z-30">
                <span className="text-[10px] font-mono text-white/40 block mb-1">01 / Profile Indicator</span>
                <p className="text-[12px] leading-snug font-sans font-light">Static avatar coordinates placed at top left for consistent brand anchoring.</p>
              </div>
            )}
          </div>

          {/* Hotspot 2 */}
          <div className="absolute top-[45%] left-[45%] z-20">
            <button 
              onMouseEnter={() => setActiveTooltip(2)}
              onMouseLeave={() => setActiveTooltip(null)}
              onClick={() => setActiveTooltip(activeTooltip === 2 ? null : 2)}
              className="w-7 h-7 rounded-full bg-black text-white font-sans text-[11px] font-bold flex items-center justify-center border-2 border-white shadow-lg cursor-pointer hover:scale-115 transition-transform"
            >
              2
            </button>
            {activeTooltip === 2 && (
              <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-black text-white p-3 rounded border border-white/10 shadow-xl w-48 text-left z-30">
                <span className="text-[10px] font-mono text-white/40 block mb-1">02 / Telemetry Graph</span>
                <p className="text-[12px] leading-snug font-sans font-light">Radial center waves project status indexes, removing standard stacked charts.</p>
              </div>
            )}
          </div>

          {/* Hotspot 3 */}
          <div className="absolute bottom-[25%] right-[25%] z-20">
            <button 
              onMouseEnter={() => setActiveTooltip(3)}
              onMouseLeave={() => setActiveTooltip(null)}
              onClick={() => setActiveTooltip(activeTooltip === 3 ? null : 3)}
              className="w-7 h-7 rounded-full bg-black text-white font-sans text-[11px] font-bold flex items-center justify-center border-2 border-white shadow-lg cursor-pointer hover:scale-115 transition-transform"
            >
              3
            </button>
            {activeTooltip === 3 && (
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black text-white p-3 rounded border border-white/10 shadow-xl w-48 text-left z-30">
                <span className="text-[10px] font-mono text-white/40 block mb-1">03 / Bottom Drawer</span>
                <p className="text-[12px] leading-snug font-sans font-light">Collapsible drawer storing historical telemetry, hiding logs from skimmers.</p>
              </div>
            )}
          </div>
        </div>
        <p className="text-center font-sans text-[12px] text-black/40 mt-4">
          Hover or tap on the numbered tags to inspect structural details.
        </p>
      </section>

      {/* 8. FRICTION & PIVOT SECTION */}
      <section id="friction" className="py-16 md:py-24 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto border-t border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <span className="font-sans font-semibold text-[11px] text-black/40 uppercase tracking-widest block">
              06 / FRICTION & PIVOT
            </span>
          </div>
          <div className="md:col-span-8 text-left space-y-4">
            <h4 className="font-sans font-bold text-[13px] text-black uppercase tracking-wider">What Went Wrong</h4>
            <p className="font-sans font-normal text-[15px] md:text-[16px] leading-relaxed text-black/60">
              Initially, we designed a circular dial mapping alerts directly around the cursor dot. In testing, clinicians hated it: the UI constant updates next to the cursor caused cognitive fatigue and jitter.
            </p>
            <p className="font-sans font-normal text-[15px] md:text-[16px] leading-relaxed text-black/60 border-l-2 border-black/10 pl-6 italic">
              <strong>The Pivot:</strong> We decoupled the alerts completely, moving them to a fixed HUD sidebar while retaining only a subtle, muted circle trace near the custom cursor.
            </p>
          </div>
        </div>
      </section>

      {/* 9. OUTCOME SECTION */}
      <section id="outcome" className="py-20 md:py-28 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto border-t border-gray-100">
        <div className="w-full flex justify-between items-baseline mb-12 border-b border-gray-100 pb-4">
          <span className="font-sans font-semibold text-[11px] text-black/40 uppercase tracking-widest">
            07 / OUTCOME
          </span>
          <span className="font-sans font-medium text-[11px] text-black/30 uppercase tracking-widest">
            MEASURED RETENTION
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="p-6 bg-[#FAFAFA] border border-black/5 rounded">
            <span className="font-sans text-[36px] md:text-[48px] font-bold text-black block tracking-tight leading-none">-50%</span>
            <span className="font-sans text-[10px] text-black/40 uppercase tracking-wider font-semibold block mt-3">Visual Screen Noise</span>
            <p className="font-sans text-[12px] text-black/50 mt-1 leading-normal">Evaluated using structural density and color variance analyzers.</p>
          </div>
          <div className="p-6 bg-[#FAFAFA] border border-black/5 rounded">
            <span className="font-sans text-[36px] md:text-[48px] font-bold text-black block tracking-tight leading-none">120ms</span>
            <span className="font-sans text-[10px] text-black/40 uppercase tracking-wider font-semibold block mt-3">Render Latency Limit</span>
            <p className="font-sans text-[12px] text-black/50 mt-1 leading-normal">Optimized canvas drawing commands to handle complex live data streams.</p>
          </div>
          <div className="p-6 bg-[#FAFAFA] border border-black/5 rounded">
            <span className="font-sans text-[36px] md:text-[48px] font-bold text-black block tracking-tight leading-none">100%</span>
            <span className="font-sans text-[10px] text-black/40 uppercase tracking-wider font-semibold block mt-3">System Consistency</span>
            <p className="font-sans text-[12px] text-black/50 mt-1 leading-normal">Visual design tokens exported directly to CSS classes via strict Figma MCP tools.</p>
          </div>
        </div>

        <div className="mt-12 p-6 border-l-2 border-black text-left">
          <span className="font-sans text-[11px] font-bold text-black/40 uppercase tracking-widest block mb-2">Reflection</span>
          <p className="font-sans text-[14px] leading-relaxed text-black/75">
            If I designed this again today, I would prioritize touch tablet viewport scales earlier. Standard telemetry HUD systems frequently transition between fixed desktop displays and hand-held tablets during triage.
          </p>
        </div>
      </section>

      {/* 10. COLLAPSIBLE DEEP PROCESS DRAWER */}
      <section className="py-12 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto flex flex-col items-center">
        <button
          onClick={() => setShowFullProcess(!showFullProcess)}
          className="px-8 py-4 border border-black text-black font-sans text-[12px] uppercase font-bold tracking-wider hover:bg-black hover:text-white transition-all duration-300 rounded-sm cursor-pointer"
        >
          {showFullProcess ? "Hide detailed process" : "See full process"}
        </button>

        {showFullProcess && (
          <div className="w-full mt-12 pt-12 border-t border-gray-100 text-left space-y-12">
            <div>
              <h4 className="font-sans font-semibold text-[16px] text-black uppercase tracking-wider mb-4">Detailed Methodology & Analysis</h4>
              <p className="font-sans text-[14px] text-black/60 leading-relaxed max-w-3xl">
                Here we document the user research logs, journey mapping matrices, and iterative prototypes. We interviewed 8 laboratory technicians over a 2-week observation window, documenting exactly where cognitive friction spikes occurred.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div 
                onClick={() => setLightboxImage("/projects/context/Extension active.png")}
                className="relative aspect-video border border-gray-100 rounded overflow-hidden bg-gray-50 cursor-zoom-in"
              >
                <Image src="/projects/context/Extension active.png" alt="Research Log" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-[12px] font-semibold text-white uppercase bg-black/60 px-3 py-1 rounded">Click to expand</span>
                </div>
              </div>

              <div 
                onClick={() => setLightboxImage("/projects/context/Import context.png")}
                className="relative aspect-video border border-gray-100 rounded overflow-hidden bg-gray-50 cursor-zoom-in"
              >
                <Image src="/projects/context/Import context.png" alt="Wireframe flow" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-[12px] font-semibold text-white uppercase bg-black/60 px-3 py-1 rounded">Click to expand</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 11. FOOTER NAVIGATION */}
      <CaseStudyFooter nextProject={{ name: "Scribe", href: "/projects/scribe" }} />
    </main>
  );
}
