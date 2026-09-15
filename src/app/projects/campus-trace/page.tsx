"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import CaseStudyNav from "@/components/case-study/CaseStudyNav";
import CaseStudyFooter from "@/components/case-study/CaseStudyFooter";
import HoverVideoThumbnail from "@/components/case-study/HoverVideoThumbnail";

const sections = [
  { id: "intro", label: "Overview" },
  { id: "context", label: "Context" },
  { id: "problem", label: "The Real Problem" },
  { id: "decisions", label: "Key Decisions" },
  { id: "friction", label: "What Didn't Work" },
  { id: "outcome", label: "Outcome & Reflections" },
];

export default function CampusTracePage() {
  const [activeSection, setActiveSection] = useState("intro");
  const [showFullProcess, setShowFullProcess] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

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

  return (
    <main className="relative min-h-screen bg-[#050505] font-sans text-white selection:bg-[#00B4D8] selection:text-black pb-20 overflow-x-hidden">

      {/* Scroll Progress Bar */}
      <div
        style={{ width: `${scrollProgress}%` }}
        className="fixed top-0 left-0 h-[2px] bg-[#00B4D8] z-50 transition-all duration-75"
      />

      {/* Case Study Nav (Minimal mix-blend-difference) */}
      <CaseStudyNav projectTitle="Campus Trace" category="Geospatial Intelligence Map" />

      {/* LIVE SECTION LABEL (Wayfinding) */}
      <div className="fixed top-24 left-6 md:left-12 lg:left-16 hidden md:block z-30 pointer-events-none">
        <span className="font-sans font-medium text-[10px] text-white/40 uppercase tracking-[0.25em] block">
          Current Section
        </span>
        <span className="font-serif italic text-[14px] text-white/90 font-medium block mt-0.5 transition-all duration-300">
          {sections.find((s) => s.id === activeSection)?.label || "Overview"}
        </span>
      </div>

      {/* SIDE PROGRESS SPINE RAIL (Wayfinding) */}
      <div className="fixed right-6 md:right-12 lg:right-16 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4 items-center z-30">
        <div className="w-[1.5px] h-44 bg-white/10 relative flex flex-col justify-between items-center py-1">
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => handleJumpToSection(sec.id)}
                title={sec.label}
                className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#00B4D8] border-[#00B4D8] scale-125"
                    : "bg-[#050505] border-white/25 hover:border-white"
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* 1. HERO SECTION (Enlarged Scale, Editorial Serif Typography) */}
      <section id="intro" className="relative w-full pt-36 sm:pt-40 md:pt-48 pb-20 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto text-left">
        
        {/* Title */}
        <h1 className="font-serif text-[44px] sm:text-[60px] md:text-[76px] lg:text-[88px] leading-[1.08] tracking-tight text-white font-normal">
          Campus Trace: <span className="italic font-serif text-white/85">visualizing mobility friction across 35,000 students</span>
        </h1>

        {/* Metadata Pill Chips */}
        <div className="flex flex-wrap items-center gap-3 mt-8">
          <span className="text-[12px] md:text-[13px] font-sans font-medium text-white/70 uppercase tracking-wider">
            Solo Designer &amp; Developer
          </span>
          <span className="text-white/30">•</span>
          <span className="text-[12px] md:text-[13px] font-sans font-medium text-white/70 uppercase tracking-wider">
            VIT Vellore Pilot
          </span>
          <span className="text-white/30">•</span>
          <span className="text-[12px] md:text-[13px] font-sans font-medium text-white/70 uppercase tracking-wider">
            MapLibre &amp; Supabase
          </span>
        </div>

        {/* Hero Visual Thumbnail & Hover Video (Clean, no gutter borders, no mouse reaction) */}
        <div className="w-full rounded-xl overflow-hidden border border-white/10 mt-12 relative shadow-xs">
          <HoverVideoThumbnail 
            thumbnailSrc="/projects/campus-trace/thumbnail.webp"
            videoSrc="/projects/campus-trace/camp-finale.mp4"
            alt="CampusTrace System Overview"
            aspectRatioClass="aspect-[16/9.5]"
            priority
          />
        </div>

        {/* Actions & Read Time */}
        <div className="flex flex-wrap items-center justify-between gap-6 mt-10 pt-8 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-5">
            <a
              href="https://campus-trace-steel.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-7 py-3 bg-white text-black text-[12px] font-sans font-semibold uppercase tracking-wider hover:bg-neutral-200 transition-colors rounded-sm shadow-xs"
            >
              Visit Live App
            </a>
            <button
              onClick={() => handleJumpToSection("outcome")}
              className="font-sans text-[13px] text-white/60 hover:text-white underline underline-offset-4 font-medium transition-colors cursor-pointer"
            >
              Skip to outcome →
            </button>
          </div>
          <span className="font-sans text-[12px] text-white/40">
            3 min read • 45 sec skim
          </span>
        </div>
      </section>

      {/* 2. THE HOOK (2-Column Editorial Structure) */}
      <section id="hook" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto border-t border-white/10 text-left">
        <div className="mb-8">
          <span className="text-[12px] font-sans font-bold uppercase tracking-[0.25em] text-white/40">
            01 / THE HOOK
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-start">
          <div className="md:col-span-5">
            <h2 className="font-serif text-[32px] sm:text-[40px] md:text-[46px] leading-[1.15] text-white tracking-tight font-normal">
              When a broken streetlight or blocked pathway goes unreported, <span className="italic">campus friction compounds daily.</span>
            </h2>
          </div>
          <div className="md:col-span-7 space-y-4 font-sans text-[16px] md:text-[17px] leading-[1.7] text-white/70">
            <p>
              Students complain locally, but campus administration lacks visibility into aggregate spatial patterns to resolve systemic infrastructural problems. CampusTrace was built to bridge this disconnect by enabling students to drop pinpoint issue markers instantly, while using Gemini AI to synthesize hundreds of disparate complaints into prioritized administrative hotspots.
            </p>
          </div>
        </div>

        {/* Flat Video Display without mouse reaction */}
        <div className="w-full mt-12 rounded-xl overflow-hidden border border-white/10 bg-neutral-950">
          <video
            src="/projects/campus-trace/rush-hour.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto"
          />
        </div>
      </section>

      {/* 3. CONTEXT & SPECS BENTO */}
      <section id="context" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto border-t border-white/10 text-left">
        <div className="mb-8">
          <span className="text-[12px] font-sans font-bold uppercase tracking-[0.25em] text-white/40">
            02 / CONTEXT
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-start mb-12">
          <div className="md:col-span-5">
            <p className="font-serif text-[28px] sm:text-[34px] md:text-[40px] leading-[1.18] text-white font-normal">
              A high-density collaborative map built for <span className="italic">real-world university scale.</span>
            </p>
          </div>
          <div className="md:col-span-7 space-y-4 font-sans text-[16px] md:text-[17px] leading-[1.7] text-white/70">
            <p>
              Engineered as a solo build, CampusTrace combined client-side spatial geometry with scalable serverless data persistence to deliver instant 60fps pan/zoom interaction across campus boundary maps.
            </p>
          </div>
        </div>

        {/* Clean Bento Specs Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 font-sans">
          <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
            <span className="text-[11px] font-bold text-white/40 uppercase tracking-wider block mb-1">Role</span>
            <span className="text-[15px] font-medium text-white">Full-Stack Developer &amp; Designer</span>
          </div>
          <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
            <span className="text-[11px] font-bold text-white/40 uppercase tracking-wider block mb-1">Timeline &amp; Scope</span>
            <span className="text-[15px] font-medium text-white">Solo venture / VIT Vellore pilot</span>
          </div>
          <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
            <span className="text-[11px] font-bold text-white/40 uppercase tracking-wider block mb-1">Stack</span>
            <span className="text-[15px] font-medium text-white">React 18 · MapLibre · Supabase · Gemini</span>
          </div>
        </div>
      </section>

      {/* 4. THE REAL PROBLEM */}
      <section id="problem" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto border-t border-white/10 text-left">
        <div className="mb-8">
          <span className="text-[12px] font-sans font-bold uppercase tracking-[0.25em] text-white/40">
            03 / THE REAL PROBLEM
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-start">
          <div className="md:col-span-5">
            <h3 className="font-serif text-[28px] sm:text-[34px] md:text-[40px] leading-[1.18] text-white tracking-tight font-normal">
              Students didn&apos;t lack concern; <span className="italic">traditional form-based reporting felt like shouting into a void.</span>
            </h3>
          </div>
          <div className="md:col-span-7 space-y-4 font-sans text-[16px] md:text-[17px] leading-[1.7] text-white/70">
            <p>
              To get students to engage actively, the reporting mechanism needed to be as effortless as dropping a pin on a spatial map.
            </p>
            <p>
              For administration, the challenge was the inverse: sorting through hundreds of fragmented reports of &quot;broken light&quot; created decision paralysis. They needed an analytical layer capable of identifying systemic root failures rather than individual symptoms.
            </p>
          </div>
        </div>
      </section>

      {/* 5. KEY DECISIONS (Bento Grid & Clean Images) */}
      <section id="decisions" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto border-t border-white/10 text-left">
        <div className="mb-14">
          <span className="text-[12px] font-sans font-bold uppercase tracking-[0.25em] text-white/40">
            04 / KEY DECISIONS
          </span>
        </div>

        <div className="space-y-20">
          {[
            {
              index: "DESIGN 1/3",
              title: "Neo-Brutalist Visual Language",
              subtitle: "approachable, high-contrast clarity for rapid student reporting",
              summary: "Chose a minimal, high-contrast visual style (thick borders, offset drop shadows, vibrant accents) over a sterile corporate dashboard.",
              why: "Rationale: Approachable aesthetics reduced psychological friction for students, drastically improving submission completion rates during rush hours.",
              image: "/projects/campus-trace/key-decision-1.webp"
            },
            {
              index: "DESIGN 2/3",
              title: "Client-Side Clustering with MapLibre",
              subtitle: "zero server bottlenecks during high-concurrency peak hours",
              summary: "Handled geospatial rendering and spatial point clustering directly on the client thread using WebGL and MapLibre GL.",
              why: "Rationale: Provided a responsive, 60fps pan/zoom experience without burdening Supabase with thousands of spatial queries during campus rush hours.",
              image: "/projects/campus-trace/key-decision-2.webp"
            },
            {
              index: "DESIGN 3/3",
              title: "LLM-Driven Semantic Synthesis",
              subtitle: "grouping issues by thematic friction rather than dumb radius proximity",
              summary: "Utilized Google Gemini Flash to evaluate report text semantics and synthesize them into cohesive operational hotspots.",
              why: "Rationale: Standard radius clustering fails to differentiate between an electrical hazard and pedestrian congestion in the same 50m zone. Semantic grouping extracted the actual structural cause.",
              image: "/projects/campus-trace/key-decision-3.webp",
              compactImage: true
            }
          ].map((item, idx) => (
            <div key={idx} className="space-y-8 pt-14 border-t border-white/10 first:border-t-0 first:pt-0">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/40 block font-sans">
                {item.index}
              </span>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-start">
                <div className="md:col-span-5">
                  <h4 className="font-serif text-[26px] sm:text-[32px] md:text-[36px] leading-[1.15] text-white tracking-tight font-normal">
                    {item.title}
                    <span className="block font-serif italic text-white/70 text-[20px] sm:text-[24px] mt-1 font-normal">
                      {item.subtitle}
                    </span>
                  </h4>
                </div>
                
                <div className="md:col-span-7 space-y-4 font-sans">
                  <p className="text-[16px] md:text-[17px] leading-[1.7] text-white/70">
                    {item.summary}
                  </p>
                  <div className="pl-5 border-l-2 border-white/15">
                    <span className="text-[11px] font-bold text-white/40 uppercase tracking-widest block mb-1">
                      Rationale &amp; Trade-off
                    </span>
                    <p className="text-[14px] md:text-[15px] text-white/80 leading-relaxed">
                      {item.why}
                    </p>
                  </div>
                </div>
              </div>

              {/* Flat Image Display without overlay text or mouse reaction */}
              {item.image && (
                <div className={`mt-6 rounded-xl overflow-hidden border border-white/10 bg-neutral-900 shadow-xs ${
                  item.compactImage ? "max-w-xl md:max-w-2xl mx-auto" : "w-full"
                }`}>
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

      {/* 6. WHAT DIDN'T WORK FIRST (Bento Cards) */}
      <section id="friction" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto border-t border-white/10 text-left">
        <div className="mb-8">
          <span className="text-[12px] font-sans font-bold uppercase tracking-[0.25em] text-white/40">
            05 / WHAT DIDN&apos;T WORK
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-start mb-12">
          <div className="md:col-span-5">
            <h3 className="font-serif text-[28px] sm:text-[34px] md:text-[38px] leading-[1.18] text-white font-normal">
              Iterative engineering failures that <span className="italic">reshaped the production pipeline.</span>
            </h3>
          </div>
          <div className="md:col-span-7 font-sans text-[16px] md:text-[17px] leading-[1.7] text-white/70">
            <p>
              Building a responsive real-time spatial app required overcoming significant browser memory bottlenecks, prompt scoping errors, and marketing misalignment.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
          <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-2">
            <span className="text-[11px] font-bold text-[#00B4D8] uppercase tracking-wider block">01 // Tech-Heavy Landing Page</span>
            <h4 className="text-[15px] font-bold text-white">SaaS Marketing Tropes Failed</h4>
            <p className="text-[13px] text-white/60 leading-relaxed">
              Early iterations used generic SaaS gradients that clashed with the tactile neo-brutalist web app. Scrapped the marketing boilerplate and aligned all views to the high-contrast physical design system.
            </p>
          </div>

          <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-2">
            <span className="text-[11px] font-bold text-[#00B4D8] uppercase tracking-wider block">02 // Narrow AI Scoping</span>
            <h4 className="text-[15px] font-bold text-white">Over-Constrained Prompting</h4>
            <p className="text-[13px] text-white/60 leading-relaxed">
              Initially prompted the LLM strictly as a &quot;Mobility Analyst,&quot; causing it to ignore critical infrastructural and safety hazards. Pivoted the system prompt to a comprehensive &quot;Campus Problem Analyst.&quot;
            </p>
          </div>

          <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-2">
            <span className="text-[11px] font-bold text-[#00B4D8] uppercase tracking-wider block">03 // Bundle Chunk Limits</span>
            <h4 className="text-[15px] font-bold text-white">Vercel Deployment Thresholds</h4>
            <p className="text-[13px] text-white/60 leading-relaxed">
              Heavy spatial libraries like MapLibre exceeded serverless chunk thresholds. Implemented route-level lazy loading with React Suspense and manual vendor chunking in Vite.
            </p>
          </div>
        </div>
      </section>

      {/* 7. OUTCOME & REFLECTIONS */}
      <section id="outcome" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto border-t border-white/10 text-left">
        <div className="mb-10">
          <span className="text-[12px] font-sans font-bold uppercase tracking-[0.25em] text-white/40">
            06 / OUTCOME &amp; REFLECTIONS
          </span>
        </div>

        {/* Narrative Outcome */}
        <div className="space-y-6 mb-16">
          <p className="font-serif text-[24px] sm:text-[28px] md:text-[32px] leading-snug text-white font-normal">
            During initial deployment, the platform captured 33 individual friction reports across campus. <span className="italic text-white/80">The AI engine synthesized these into 25 prioritized administrative hotspots.</span>
          </p>
        </div>

        {/* 2 Reconsiderations Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans mb-16">
          <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-2">
            <span className="text-[11px] font-bold text-[#00B4D8] uppercase tracking-wider block">01. High-Density Mobile Overlays (Design)</span>
            <p className="text-[13px] text-white/70 leading-relaxed">
              Layering telemetry, heatmaps, and route cards crowded smaller mobile viewports. I would introduce collapsible bottom-sheet drawers and context-aware legend filters to preserve spatial legibility.
            </p>
          </div>

          <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-2">
            <span className="text-[11px] font-bold text-[#00B4D8] uppercase tracking-wider block">02. Real-Time Telemetry Throttling (Technical)</span>
            <p className="text-[13px] text-white/70 leading-relaxed">
              Continuous WebSocket streams caused unnecessary UI re-renders during high-traffic surges. Implementing client-side spatial indexing and requestAnimationFrame throttling would optimize mobile frame rates.
            </p>
          </div>
        </div>


      </section>

      {/* 8. COLLAPSIBLE PROCESS DRAWER */}
      <section className="py-10 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto flex flex-col items-center">
        <button
          onClick={() => setShowFullProcess(!showFullProcess)}
          className="px-7 py-3 border border-white/25 text-white/80 font-sans text-[12px] uppercase font-semibold tracking-wider hover:border-white hover:text-white transition-colors rounded-sm cursor-pointer"
        >
          {showFullProcess ? "Hide engineering appendix" : "View engineering & architecture appendix"}
        </button>

        {showFullProcess && (
          <div className="w-full mt-12 pt-12 border-t border-white/10 text-left space-y-12 animate-fadeIn font-sans text-white">

            {/* SECTION 1: ARCHITECTURE */}
            <div className="space-y-5">
              <span className="text-[11px] font-bold text-[#00B4D8] uppercase tracking-widest block">01 / TECHNICAL STACK &amp; ARCHITECTURE</span>
              <h3 className="font-serif text-[26px] text-white font-normal">Geospatial Sync &amp; Analytics</h3>
              <p className="text-[14px] md:text-[15px] text-white/70 leading-relaxed max-w-3xl">
                CampusTrace pairs client-side MapLibre GL rendering with Supabase PostgreSQL and Google Gemini 3.1 Flash Lite to process real-time pin clustering.
              </p>

              <div className="p-5 bg-white/5 border border-white/10 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-4 text-center items-center">
                <div className="p-4 bg-neutral-900 border border-white/10 rounded-lg shadow-2xs">
                  <span className="block text-[10px] font-bold text-white/40 uppercase">Student</span>
                  <span className="text-[13px] font-semibold text-white">Places Map Pin</span>
                </div>
                <div className="p-4 bg-neutral-900 border border-white/10 rounded-lg shadow-2xs">
                  <span className="block text-[10px] font-bold text-white/40 uppercase">Database</span>
                  <span className="text-[13px] font-semibold text-white">Supabase Reports</span>
                </div>
                <div className="p-4 bg-neutral-900 border border-white/10 rounded-lg shadow-2xs">
                  <span className="block text-[10px] font-bold text-white/40 uppercase">AI Analyst</span>
                  <span className="text-[13px] font-semibold text-white">Gemini 3.1 Flash</span>
                </div>
              </div>
            </div>

            {/* SECTION 2: CONVEX HULL MATH */}
            <div className="space-y-5 pt-8 border-t border-white/10">
              <span className="text-[11px] font-bold text-[#00B4D8] uppercase tracking-widest block">02 / SPATIAL GEOMETRY</span>
              <h3 className="font-serif text-[26px] text-white font-normal">Convex Hull Algorithmic Boundaries</h3>
              <div className="p-5 bg-neutral-950 rounded-xl text-neutral-300 font-mono text-[12px] space-y-1.5 shadow-inner overflow-x-auto max-w-2xl">
                <div className="text-neutral-500 mb-1">// Graham Scan 2D Convex Hull variation</div>
                <div><span className="text-red-400">const</span> getConvexHull = (points) =&gt; &#123;</div>
                <div className="pl-4">if (points.length &lt;= 2) return points;</div>
                <div className="pl-4">const sorted = points.slice().sort((a, b) =&gt; a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]);</div>
                <div className="pl-4">return sorted;</div>
                <div>&#125;;</div>
              </div>
            </div>

          </div>
        )}
      </section>

      {/* 9. MINIMALIST FOOTER */}
      <CaseStudyFooter nextProject={{ name: "Open Component Studio", href: "/projects/open-component-studio" }} theme="dark" />
    </main>
  );
}
