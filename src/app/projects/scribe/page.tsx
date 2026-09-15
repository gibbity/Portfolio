"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import CaseStudyNav from "@/components/case-study/CaseStudyNav";
import CaseStudyFooter from "@/components/case-study/CaseStudyFooter";
import HoverVideoThumbnail from "@/components/case-study/HoverVideoThumbnail";

const MuxVideo = dynamic(() => import("@/components/MuxVideo"), { ssr: false });

const sections = [
  { id: "intro", label: "Overview" },
  { id: "origin", label: "Origin & MVPs" },
  { id: "context", label: "Context" },
  { id: "problem", label: "The Problem" },
  { id: "decisions", label: "Key Decisions" },
  { id: "workbench", label: "System Interface" },
  { id: "friction", label: "What Didn't Work" },
  { id: "reflections", label: "Reflections" },
];

export default function ScribePage() {
  const [activeSection, setActiveSection] = useState("intro");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showFullProcess, setShowFullProcess] = useState(false);

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
    <main className="relative min-h-screen bg-[#FCFCFC] font-sans text-neutral-900 selection:bg-neutral-900 selection:text-white pb-20 overflow-x-hidden">
      
      {/* Scroll Progress Bar */}
      <div 
        style={{ width: `${scrollProgress}%` }}
        className="fixed top-0 left-0 h-[2px] bg-neutral-900 z-50 transition-all duration-75"
      />

      {/* Case Study Nav (Restored minimal top bar) */}
      <CaseStudyNav projectTitle="Scribe" category="Strategic Intelligence" />

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

      {/* 1. COVER / HERO BANNER (Larger scale, inspired by PDF Page 1) */}
      <section id="intro" className="relative w-full pt-36 sm:pt-40 md:pt-48 pb-20 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto text-left">
        
        {/* Title */}
        <h1 className="font-serif text-[44px] sm:text-[60px] md:text-[76px] lg:text-[88px] leading-[1.08] tracking-tight text-neutral-900 font-normal">
          Empowering product teams to resolve multi-dimensional complexity{" "}
          <span className="italic font-serif text-neutral-700">without flat document blindspots</span>
        </h1>

        {/* Metadata Pill Chips */}
        <div className="flex flex-wrap items-center gap-3 mt-8">
          <span className="text-[12px] md:text-[13px] font-sans font-medium text-neutral-600 uppercase tracking-wider">
            0 to 1 Product Strategy
          </span>
          <span className="text-neutral-300">•</span>
          <span className="text-[12px] md:text-[13px] font-sans font-medium text-neutral-600 uppercase tracking-wider">
            Spatial Systems
          </span>
          <span className="text-neutral-300">•</span>
          <span className="text-[12px] md:text-[13px] font-sans font-medium text-neutral-600 uppercase tracking-wider">
            Shipped
          </span>
        </div>

        {/* Hero Visual Thumbnail & Hover Video (Clean, no gutter borders, no mouse reaction) */}
        <div className="w-full rounded-xl overflow-hidden border border-neutral-200 mt-12 relative shadow-xs">
          <HoverVideoThumbnail 
            thumbnailSrc="/projects/scribe/thumbnail.webp"
            videoSrc="/projects/scribe/preview.mp4"
            alt="Scribe System Overview"
            aspectRatioClass="aspect-[16/9.5]"
            priority
          />
        </div>

        {/* Actions & Read Time */}
        <div className="flex flex-wrap items-center justify-between gap-6 mt-10 pt-8 border-t border-neutral-200/80">
          <div className="flex flex-wrap items-center gap-5">
            <a 
              href="https://scribe-neon.vercel.app/landing"
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-7 py-3 bg-neutral-900 text-white text-[12px] font-sans font-semibold uppercase tracking-wider hover:bg-black transition-colors rounded-sm shadow-xs"
            >
              Visit Live App
            </a>
            <button 
              onClick={() => handleJumpToSection("reflections")}
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

      {/* 2. ORIGIN & 3 MVP ITERATIONS (Larger Scale & Bento Grid) */}
      <section id="origin" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto border-t border-neutral-200/80 text-left">
        
        {/* Section Header Tag */}
        <div className="mb-8">
          <span className="text-[12px] font-sans font-bold uppercase tracking-[0.25em] text-neutral-400">
            01 / ORIGIN
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-start mb-16">
          <div className="md:col-span-5">
            <h2 className="font-serif text-[32px] sm:text-[42px] md:text-[48px] leading-[1.15] text-neutral-900 tracking-tight font-normal">
              The Evolution of Scribe: <span className="italic">3 MVP iterations before context</span>
            </h2>
          </div>
          <div className="md:col-span-7 font-sans text-[16px] md:text-[17px] leading-[1.7] text-neutral-600">
            <p>
              Before landing on rigid hierarchical columns, Scribe underwent three distinct prototypes. Each iteration tested a different mental model—from unconstrained AI connection graphs to qualitative storytelling, before narrowing into rigid strategic hierarchy for decision-makers.
            </p>
          </div>
        </div>

        {/* ITERATIONS BENTO STACK */}
        <div className="space-y-20">
          
          {/* MVP 1 BENTO */}
          <div className="space-y-8 pt-10 border-t border-neutral-200/80 first:border-t-0 first:pt-0">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-neutral-400 block mb-1.5 font-sans">
                  Iteration 01
                </span>
                <h3 className="font-serif text-[26px] sm:text-[32px] text-neutral-900 font-normal">
                  MVP 1 — AI Connection Map Generator
                </h3>
              </div>
              <span className="text-[12px] font-mono text-neutral-500">
                Unconstrained Force Graph
              </span>
            </div>

            <p className="font-sans text-[16px] md:text-[17px] text-neutral-600 leading-[1.7] max-w-4xl">
              The initial concept allowed users to input raw notes and let an automated AI engine construct a force-directed graph based on word co-occurrences and semantic links.
            </p>

            {/* Flat Images Bento Grid (Zero overlay text, clean borders) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-neutral-200/90 bg-white">
                <Image src="/projects/scribe/origin/mvp1-1.webp" alt="MVP 1 Light Theme Graph" fill className="object-cover" />
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-neutral-200/90 bg-white">
                <Image src="/projects/scribe/origin/mvp1-2.webp" alt="MVP 1 Dark Theme Graph" fill className="object-cover" />
              </div>
            </div>

            {/* User Feedback Quotes (Clean typography, no emojis) */}
            <div className="space-y-3 pt-2 font-sans">
              <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 block">
                User Feedback &amp; Initial Reactions
              </span>
              <div className="flex flex-wrap gap-2.5">
                {["What do I use it for?", "Looks cool, but how do I read it?", "Can I try it?", "Okay... (confusion personifies)"].map((fb, i) => (
                  <span key={i} className="text-[12px] md:text-[13px] font-medium px-4 py-1.5 rounded-full border border-neutral-200 bg-neutral-100 text-neutral-700">
                    &quot;{fb}&quot;
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 font-sans">
              <div className="pl-5 border-l-2 border-red-400">
                <span className="text-[11px] font-bold uppercase tracking-widest text-red-600 block mb-1.5">Conclusion</span>
                <p className="text-[14px] md:text-[15px] text-neutral-600 leading-relaxed">
                  The map looked visually impressive, but failed to serve a practical purpose. The UI provided no direction, turning navigation into an exhausting game of detective.
                </p>
              </div>
              <div className="pl-5 border-l-2 border-emerald-500">
                <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 block mb-1.5">New Direction</span>
                <p className="text-[14px] md:text-[15px] text-neutral-600 leading-relaxed">
                  The tool needed a specific purpose. The UI must drastically reduce cognitive load rather than increase it.
                </p>
              </div>
            </div>
          </div>

          {/* MVP 2 BENTO */}
          <div className="space-y-8 pt-16 border-t border-neutral-200/80">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-neutral-400 block mb-1.5 font-sans">
                  Iteration 02
                </span>
                <h3 className="font-serif text-[26px] sm:text-[32px] text-neutral-900 font-normal">
                  MVP 2 — Storytelling &amp; Qualitative Journey Maps
                </h3>
              </div>
              <span className="text-[12px] font-mono text-neutral-500">
                Story of the Little Match Girl
              </span>
            </div>

            <p className="font-sans text-[16px] md:text-[17px] text-neutral-600 leading-[1.7] max-w-4xl">
              Chose storytelling as the core direction—taking complex qualitative data (like stories, user interview transcripts, and narrative arcs) and representing them as interactive cluster journey maps.
            </p>

            {/* Flat 4-Image Bento Grid (Zero overlay text) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                "/projects/scribe/origin/mvp2-1.webp",
                "/projects/scribe/origin/mvp2-2.webp",
                "/projects/scribe/origin/mvp2-3.webp",
                "/projects/scribe/origin/mvp2-4.webp",
              ].map((src, i) => (
                <div key={i} className="relative aspect-[4/3] rounded-lg overflow-hidden border border-neutral-200/90 bg-white">
                  <Image src={src} alt="MVP 2 Qualitative Storytelling Canvas" fill className="object-cover" />
                </div>
              ))}
            </div>

            {/* User Feedback */}
            <div className="space-y-3 pt-2 font-sans">
              <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 block">
                User Feedback
              </span>
              <div className="flex flex-wrap gap-2.5">
                {["I am putting in more effort...", "Looks cool", "What are you using it for?", "Can I try it?"].map((fb, i) => (
                  <span key={i} className="text-[12px] md:text-[13px] font-medium px-4 py-1.5 rounded-full border border-neutral-200 bg-neutral-100 text-neutral-700">
                    &quot;{fb}&quot;
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 font-sans">
              <div className="pl-5 border-l-2 border-red-400">
                <span className="text-[11px] font-bold uppercase tracking-widest text-red-600 block mb-1.5">Conclusion</span>
                <p className="text-[14px] md:text-[15px] text-neutral-600 leading-relaxed">
                  Slightly more useful than MVP 1, but as a tool it still lacked a clear, indispensable purpose. Users felt they were putting in excessive effort decoding visual layouts.
                </p>
              </div>
              <div className="pl-5 border-l-2 border-emerald-500">
                <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 block mb-1.5">New Direction</span>
                <p className="text-[14px] md:text-[15px] text-neutral-600 leading-relaxed">
                  Scrap visual gimmicks entirely. Focus on a specific niche problem for users who need to make high-stakes decisions from dense data.
                </p>
              </div>
            </div>
          </div>

          {/* MVP 3 BENTO */}
          <div className="space-y-8 pt-16 border-t border-neutral-200/80">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-neutral-400 block mb-1.5 font-sans">
                  Iteration 03
                </span>
                <h3 className="font-serif text-[26px] sm:text-[32px] text-neutral-900 font-normal">
                  MVP 3 — Multi-Data Link &amp; Connection Analyzer
                </h3>
              </div>
              <span className="text-[12px] font-mono text-neutral-500">
                Targeting Thinkers &amp; PMs
              </span>
            </div>

            <p className="font-sans text-[16px] md:text-[17px] text-neutral-600 leading-[1.7] max-w-4xl">
              Pivoted away from creative writers toward thinkers, product managers, and researchers—synthesizing complex data inputs, 50-page research papers, and technical requirements into linked analytical graphs.
            </p>

            {/* Flat Bento Grid (Zero overlay text) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-neutral-200/90 bg-white">
                <Image src="/projects/scribe/origin/mvp3-1.webp" alt="Multi-Cluster Analysis" fill className="object-cover" />
              </div>
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-neutral-200/90 bg-white">
                <Image src="/projects/scribe/origin/mvp3-4.webp" alt="Dense Link Graph" fill className="object-cover" />
              </div>
            </div>

            {/* Stakeholder Bento Cards */}
            <div className="space-y-4 pt-3 font-sans">
              <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 block">
                In-Depth Stakeholder Interview Insights
              </span>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-neutral-100/80 rounded-lg border border-neutral-200/70 space-y-2">
                  <span className="text-[12px] font-bold text-neutral-900 uppercase tracking-wider block">UX Professor</span>
                  <p className="text-[13px] text-neutral-600 italic leading-relaxed">
                    &quot;This looks useful enough but you still need to find a better use case for it. Write a research paper on this...&quot;
                  </p>
                </div>

                <div className="p-4 bg-neutral-100/80 rounded-lg border border-neutral-200/70 space-y-2">
                  <span className="text-[12px] font-bold text-neutral-900 uppercase tracking-wider block">IBM Product Manager</span>
                  <p className="text-[13px] text-neutral-600 italic leading-relaxed">
                    &quot;I will use it if it reduces my effort and saves me time. I don&apos;t understand the specific context... I&apos;d rather use normal AI.&quot;
                  </p>
                </div>

                <div className="p-4 bg-neutral-100/80 rounded-lg border border-neutral-200/70 space-y-2">
                  <span className="text-[12px] font-bold text-neutral-900 uppercase tracking-wider block">Automobile Designer</span>
                  <p className="text-[13px] text-neutral-600 italic leading-relaxed">
                    &quot;I don&apos;t want to read all that and either way I don&apos;t feel like it helped me.&quot;
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 font-sans">
              <div className="pl-5 border-l-2 border-red-400">
                <span className="text-[11px] font-bold uppercase tracking-widest text-red-600 block mb-1.5">Conclusion</span>
                <p className="text-[14px] md:text-[15px] text-neutral-600 leading-relaxed">
                  It was significantly better than previous iterations, but unconstrained graphs still lacked a singular focus to replace traditional AI chat windows in daily workflows.
                </p>
              </div>
              <div className="pl-5 border-l-2 border-emerald-500">
                <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-600 block mb-1.5">Final Breakthrough to Scribe</span>
                <p className="text-[14px] md:text-[15px] text-neutral-600 leading-relaxed">
                  Scrap free-form physics graphs entirely. Constrain D3 to snap nodes into fixed 300px hierarchical columns (Pillars → Clusters → Leaves) tailored specifically for strategic roadmap stress-testing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CONTEXT SECTION (Larger Scale) */}
      <section id="context" className="py-20 md:py-32 border-t border-neutral-200/80 text-left">
        <div className="px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
          <div className="mb-8">
            <span className="text-[12px] font-sans font-bold uppercase tracking-[0.25em] text-neutral-400">
              02 / CONTEXT
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-start">
            <div className="md:col-span-5">
              <p className="font-serif text-[28px] sm:text-[34px] md:text-[40px] leading-[1.18] text-neutral-900 font-normal">
                Scribe is a local-first, visual note-taking environment <span className="italic">designed to solve this specific problem.</span>
              </p>
            </div>
            <div className="md:col-span-7 space-y-4">
              <p className="font-sans text-[16px] md:text-[17px] leading-[1.7] text-neutral-600">
                It was built as a solo project, meaning I needed a stack that allowed for rapid prototyping without heavy backend infrastructure (Next.js, Tailwind, D3.js, and local IndexedDB).
              </p>
            </div>
          </div>
        </div>

        {/* Full Screen Showcase Image (Flat, no frame, edge-to-edge) */}
        <div className="w-screen relative left-1/2 -translate-x-1/2 mt-16">
          <Image 
            src="/projects/scribe/scribe-after-context.webp" 
            alt="Scribe System Overview" 
            width={2400}
            height={1315}
            className="w-full h-auto block"
            sizes="100vw"
            priority
          />
        </div>
      </section>

      {/* 3. THE REAL PROBLEM SECTION */}
      <section id="problem" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto border-t border-neutral-200/80 text-left">
        <div className="mb-8">
          <span className="text-[12px] font-sans font-bold uppercase tracking-[0.25em] text-neutral-400">
            03 / THE REAL PROBLEM
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-start">
          <div className="md:col-span-5">
            <h3 className="font-serif text-[32px] sm:text-[38px] md:text-[44px] leading-[1.15] text-neutral-900 tracking-tight font-normal">
              Linear documents hide <span className="italic">cross-phase interdependencies.</span>
            </h3>
          </div>
          <div className="md:col-span-7 space-y-4 font-sans text-[16px] md:text-[17px] leading-[1.7] text-neutral-600">
            <p>
              I was trying to reconcile a product roadmap across 30 different user interviews, technical constraints, and design requirements. I kept losing track of how a feature in Phase 2 would break a constraint we discovered in Phase 1.
            </p>
            <p>
              Linear documents (like Notion or Google Docs) hide interdependencies. You can link pages, but you cannot <em>see</em> the structural connections. I needed a way to map out complex logic visually without it turning into an unreadable mess.
            </p>
          </div>
        </div>

        {/* Flat Problem Graphic */}
        <div className="w-full mt-12 rounded-xl overflow-hidden border border-neutral-200 bg-white shadow-xs">
          <Image 
            src="/projects/scribe/The problem.webp" 
            alt="The Problem: Linear Docs vs Multi-Dimensional Dependencies" 
            width={1920} 
            height={1080} 
            className="w-full h-auto block" 
          />
        </div>
      </section>

      {/* Interactive Video Showcase (Placed before Key Decisions) */}
      <section className="py-12 md:py-20 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto border-t border-neutral-200/80 text-left">
        <div className="mb-8">
          <span className="text-[12px] font-sans font-bold uppercase tracking-[0.25em] text-neutral-400 block mb-2">
            System Walkthrough
          </span>
          <h3 className="font-serif text-[28px] sm:text-[36px] text-neutral-900 font-normal leading-tight">
            See Scribe in Action: <span className="italic">Spatial note synthesis &amp; graph traversal</span>
          </h3>
          <p className="font-sans text-[15px] md:text-[16px] text-neutral-600 leading-relaxed max-w-3xl mt-2">
            Watch how raw unstructured thoughts transform into structured knowledge pillars, interactive clusters, and linked decision maps in real time.
          </p>
        </div>

        <div className="w-full rounded-xl overflow-hidden shadow-xs border border-neutral-200/90 bg-black">
          <MuxVideo 
            videoSrc="/projects/scribe/preview.mp4"
            poster="/projects/scribe/thumbnail.webp"
            aspectRatio={16 / 9.2}
          />
        </div>
      </section>

      {/* 4. KEY DECISIONS / DESIGN SHOWCASES (Bento Layouts & Larger Scale) */}
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
              title: "Forcing hierarchical columns over free-form graphs",
              subtitle: "eliminating unnavigable graph hairballs",
              summary: "Most note-taking apps with graphs (like Obsidian) use force-directed layouts. They look cool, but they turn into useless 'hairballs' once you have more than 50 notes.",
              why: "Decision: I constrained the D3 physics engine to snap nodes into fixed 300px columns based on their hierarchy (Pillars -> Clusters -> Leaves). Trade-off: Users lose the ability to place notes anywhere they want on an infinite canvas, but the structure remains legible and organized even with hundreds of nodes.",
              image: "/projects/scribe/ai-generated-graph.webp",
              width: 2560,
              height: 996,
            },
            {
              index: "DESIGN 2/3",
              title: "Client-side storage over cloud databases",
              subtitle: "zero-latency storage & complete data privacy across desktop & mobile",
              summary: "Scribe stores all data in the browser using IndexedDB.",
              why: "Trade-off: It prevents easy multi-device syncing out of the box, but it allowed me to bypass complex authentication flows, ship faster, and guarantee 100% privacy for users working with sensitive strategic data.",
              image: "/projects/scribe/mobile-view.webp",
              width: 2560,
              height: 1440,
            },
            {
              index: "DESIGN 3/3",
              title: "Bring-Your-Own-Key (BYOK) for AI features",
              subtitle: "two-pass semantic extraction with zero vendor lock-in",
              summary: "Instead of charging a subscription for AI credits, users paste in their own OpenAI or Claude keys, or connect to a local Ollama instance.",
              why: "Trade-off: It adds friction to the onboarding process, but it keeps the app free to host and ensures user data isn't being silently scraped by a middleman server.",
              image: "/projects/scribe/api-config-settings.webp",
              width: 2560,
              height: 1440,
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

              {/* Flat Uncropped Image Bento Display */}
              {item.image && (
                <div className="w-full mt-6 rounded-xl overflow-hidden border border-neutral-200/90 bg-white shadow-xs">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    width={item.width || 2560} 
                    height={item.height || 1440} 
                    className="w-full h-auto object-contain block" 
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 5. CORE WORKBENCH & INTERFACE (Dedicated High-Resolution Showcase) */}
      <section id="workbench" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto border-t border-neutral-200/80 text-left">
        <div className="mb-8">
          <span className="text-[12px] font-sans font-bold uppercase tracking-[0.25em] text-neutral-400">
            05 / SYSTEM INTERFACE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-start mb-16">
          <div className="md:col-span-5">
            <h2 className="font-serif text-[32px] sm:text-[42px] md:text-[48px] leading-[1.15] text-neutral-900 tracking-tight font-normal">
              The Dual-Pane Environment: <span className="italic">From linear notes to spatial graphs</span>
            </h2>
          </div>
          <div className="md:col-span-7 font-sans text-[16px] md:text-[17px] leading-[1.7] text-neutral-600">
            <p>
              Scribe pairs a distraction-free note editor with an automated graph construction engine and conversational AI copilot. Users write structured thought streams on the left, while the right-hand canvas visualizes emerging dependencies across projects, phases, and entities in real time.
            </p>
          </div>
        </div>

        {/* Big Showcase 1: Notes Editor & Build-a-Graph */}
        <div className="space-y-6 pt-10 border-t border-neutral-200/80">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-neutral-400 block mb-1 font-sans">
                Interface 01
              </span>
              <h3 className="font-serif text-[24px] sm:text-[30px] text-neutral-900 font-normal">
                Hierarchical Note Authoring &amp; Build-a-Graph Engine
              </h3>
            </div>
            <span className="text-[12px] font-mono text-neutral-500">
              Structured Editor &bull; Metadata Extraction
            </span>
          </div>

          <p className="font-sans text-[15px] md:text-[16px] text-neutral-600 leading-relaxed max-w-4xl">
            A minimalist Markdown workspace paired with a tree hierarchy sidebar. The &quot;Build-a-Graph&quot; modal extracts nested entities, pillars, and cross-document links directly from note prose without requiring manual node placement.
          </p>

          <div className="w-full rounded-xl overflow-hidden border border-neutral-200/90 bg-white shadow-xs">
            <Image 
              src="/projects/scribe/notes-sidebar-buildagraph.webp" 
              alt="Scribe Note Editor, Hierarchy Sidebar, and Build-a-Graph Engine" 
              width={2560} 
              height={1440} 
              className="w-full h-auto object-contain block" 
              priority
            />
          </div>
        </div>

        {/* Big Showcase 2: Graph Workbench & AI Chat */}
        <div className="space-y-6 pt-16 border-t border-neutral-200/80 mt-16">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-neutral-400 block mb-1 font-sans">
                Interface 02
              </span>
              <h3 className="font-serif text-[24px] sm:text-[30px] text-neutral-900 font-normal">
                Multi-Dimensional Graph Workbench &amp; AI Copilot
              </h3>
            </div>
            <span className="text-[12px] font-mono text-neutral-500">
              Spatial Canvas &bull; Contextual AI Chat
            </span>
          </div>

          <p className="font-sans text-[15px] md:text-[16px] text-neutral-600 leading-relaxed max-w-4xl">
            The spatial graph canvas lays out structural pillars and clusters in high-legibility columns, allowing teams to zoom into specific nodes while querying the embedded AI assistant with full graph context.
          </p>

          <div className="w-full rounded-xl overflow-hidden border border-neutral-200/90 bg-white shadow-xs">
            <Image 
              src="/projects/scribe/workbench-and-chat.webp" 
              alt="Scribe Graph Workbench & AI Chat Assistant" 
              width={2560} 
              height={1440} 
              className="w-full h-auto object-contain block" 
            />
          </div>
        </div>
      </section>

      {/* Full Screen Banner (Flat, no frame, edge-to-edge) */}
      <section className="w-screen relative left-1/2 -translate-x-1/2 my-14">
        <Image 
          src="/projects/scribe/before-what-didnt-work.webp" 
          alt="Scribe System Iteration" 
          width={5776}
          height={2624}
          className="w-full h-auto block" 
          sizes="100vw"
        />
      </section>

      {/* 6. WHAT DIDN'T WORK SECTION (Bento Grid of 8 Prototypes) */}
      <section id="friction" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto border-t border-neutral-200/80 text-left">
        <div className="mb-8">
          <span className="text-[12px] font-sans font-bold uppercase tracking-[0.25em] text-neutral-400">
            06 / WHAT DIDN&apos;T WORK
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-start">
          <div className="md:col-span-5">
            <h3 className="font-serif text-[28px] sm:text-[34px] md:text-[38px] leading-[1.18] text-neutral-900 font-normal">
              Continuous physics caused distracting canvas jitter. <span className="italic">We replaced live simulation with discrete drop snapping.</span>
            </h3>
          </div>
          <div className="md:col-span-7 space-y-4">
            <p className="font-sans text-[16px] md:text-[17px] leading-[1.7] text-neutral-600">
              My first attempt at the &quot;Oracle&quot; view used a standard physics simulation where notes repelled each other. When users tried to drag notes to group them, the physics engine fought back, causing the entire map to constantly jiggle and re-adjust. It was incredibly distracting.
            </p>
            <p className="font-sans text-[16px] md:text-[17px] leading-[1.7] text-neutral-700 border-l-2 border-neutral-200 pl-4 italic">
              I had to rip out the continuous simulation and write a custom collision-detection script that only calculates physics when a node is actively dropped, snapping it to a strict 40px grid.
            </p>
          </div>
        </div>

        {/* Flat Bento Grid of 8 Iteration Prototypes (Zero overlay text, clean borders) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 w-full">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <div key={num} className="w-full aspect-[16/10] relative rounded-lg overflow-hidden border border-neutral-200 bg-neutral-100 shadow-2xs">
              <Image 
                src={`/projects/scribe/what-didnt-work-${num}.webp`} 
                alt={`Iteration Prototype ${num}`} 
                fill 
                className="object-cover" 
              />
            </div>
          ))}
        </div>
      </section>

      {/* 7. REFLECTIONS (Larger Scale & Bento Style) */}
      <section id="reflections" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto border-t border-neutral-200/80 text-left">
        <div className="mb-10">
          <span className="text-[12px] font-sans font-bold uppercase tracking-[0.25em] text-neutral-400">
            07 / REFLECTIONS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <h4 className="font-sans text-[16px] font-bold text-neutral-900 leading-snug">
              Need for Deep Domain Understanding
            </h4>
            <p className="font-sans text-[14px] md:text-[15px] text-neutral-600 leading-relaxed">
              Designing for strategic thinkers required deep immersion in PRDs, roadmap friction, and non-linear thinking patterns rather than superficial templates.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-sans text-[16px] font-bold text-neutral-900 leading-snug">
              Learning the Art of Prioritization
            </h4>
            <p className="font-sans text-[14px] md:text-[15px] text-neutral-600 leading-relaxed">
              As a solo builder, enforcing rigid columns and local IndexedDB eliminated months of backend complexity while delivering instant performance and complete privacy.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-sans text-[16px] font-bold text-neutral-900 leading-snug">
              Designing to Reduce Cognitive Load
            </h4>
            <p className="font-sans text-[14px] md:text-[15px] text-neutral-600 leading-relaxed">
              &quot;Ease of Use&quot; shouldn&apos;t eliminate constructive friction. Scribe has a learning curve, but that friction acts as a forcing function for clearer architectural thought.
            </p>
          </div>
        </div>

        {/* Future Technical Considerations Bento */}
        <div className="mt-16 pt-10 border-t border-neutral-200/80 space-y-6 font-sans">
          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest block">
            Future Technical Considerations
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-neutral-100/80 rounded-xl border border-neutral-200/70">
              <span className="text-[13px] font-bold text-neutral-900 block mb-1.5">01. Progressive Spatial Disclosure</span>
              <p className="text-[13px] md:text-[14px] text-neutral-600 leading-relaxed">
                Implementing level-of-detail (LOD) zoom to display macro strategy clusters at wide viewports and reveal leaf cards only as the user zooms into specific clusters.
              </p>
            </div>
            <div className="p-5 bg-neutral-100/80 rounded-xl border border-neutral-200/70">
              <span className="text-[13px] font-bold text-neutral-900 block mb-1.5">02. WebGL Canvas Scalability</span>
              <p className="text-[13px] md:text-[14px] text-neutral-600 leading-relaxed">
                Transitioning the D3 DOM rendering pipeline to a WebGL/Pixi.js layer to guarantee silky 60fps interaction during large-scale dataset navigation.
              </p>
            </div>
          </div>
        </div>


      </section>

      {/* 8. COLLAPSIBLE ENGINEERING APPENDIX */}
      <section className="py-10 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto flex flex-col items-center">
        <button
          onClick={() => setShowFullProcess(!showFullProcess)}
          className="px-7 py-3 border border-neutral-300 text-neutral-700 font-sans text-[12px] uppercase font-semibold tracking-wider hover:border-black hover:text-black transition-colors rounded-sm cursor-pointer"
        >
          {showFullProcess ? "Hide engineering appendix" : "View engineering & architecture appendix"}
        </button>

        {showFullProcess && (
          <div className="w-full mt-12 pt-12 border-t border-neutral-200/80 text-left space-y-12 animate-fadeIn font-sans">
            
            {/* ARCHITECTURE */}
            <div className="space-y-5">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest block">01 / ARCHITECTURE</span>
              <h3 className="font-serif text-[26px] text-neutral-900 font-normal">Two-Pass Extraction Engine</h3>
              <p className="text-[14px] md:text-[15px] text-neutral-600 leading-relaxed max-w-3xl">
                Scribe runs entirely client-side. The LLM extraction pipeline is executed in two deterministic passes to preserve layout coordinates before populating leaves.
              </p>
              
              <div className="p-5 bg-neutral-100/80 border border-neutral-200/80 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-4 text-center items-center">
                <div className="p-4 bg-white border border-neutral-200 rounded-lg shadow-2xs">
                  <span className="block text-[10px] font-bold text-neutral-400 uppercase">Input</span>
                  <span className="text-[13px] font-semibold text-neutral-900">Raw PRD Document</span>
                </div>
                <div className="p-4 bg-white border border-neutral-200 rounded-lg shadow-2xs">
                  <span className="block text-[10px] font-bold text-neutral-400 uppercase">Synthesizer</span>
                  <span className="text-[13px] font-semibold text-neutral-900">Two-Pass LLM</span>
                </div>
                <div className="p-4 bg-white border border-neutral-200 rounded-lg shadow-2xs">
                  <span className="block text-[10px] font-bold text-neutral-400 uppercase">Storage</span>
                  <span className="text-[13px] font-semibold text-neutral-900">IndexedDB Client</span>
                </div>
              </div>
            </div>

            {/* LAYOUT MATH */}
            <div className="space-y-5 pt-8 border-t border-neutral-200/60">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest block">02 / SPATIAL MATHEMATICS</span>
              <h3 className="font-serif text-[26px] text-neutral-900 font-normal">Layout Math Constants</h3>
              
              <div className="p-5 bg-neutral-950 rounded-xl text-neutral-300 font-mono text-[12px] space-y-1.5 max-w-xl">
                <div className="text-neutral-500 mb-1">// Layout engine configuration constants</div>
                <div><span className="text-red-400">const</span> PILLAR_COL_WIDTH = <span className="text-cyan-400">300</span>;</div>
                <div><span className="text-red-400">const</span> PILLAR_GAP       = <span className="text-cyan-400">320</span>;</div>
                <div><span className="text-red-400">const</span> CLUSTER_GAP      = <span className="text-cyan-400">32</span>;</div>
                <div><span className="text-red-400">const</span> LEAF_HEIGHT      = <span className="text-cyan-400">68</span>;</div>
                <div><span className="text-red-400">const</span> LEAF_GAP         = <span className="text-cyan-400">10</span>;</div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 9. MINIMALIST FOOTER */}
      <CaseStudyFooter
        nextProject={{
          name: "Campus Trace",
          category: "Spatial Hardware & System Design",
          href: "/projects/campus-trace",
        }}
      />
    </main>
  );
}
