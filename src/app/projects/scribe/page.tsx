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
  { id: "workflow", label: "The Workflow" },
  { id: "decisions", label: "Key Decisions" },
  { id: "design-system", label: "Design System & Architecture" },
  { id: "ui-components", label: "UI Components" },
  { id: "compliance", label: "Components & Compliance" },
  { id: "friction", label: "What Didn't Work" },
  { id: "outcomes", label: "Outcomes" },
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
          Reconciling product roadmaps across 30 user interviews{" "}
          <span className="italic font-serif text-neutral-700">without losing track of hidden dependencies</span>
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
            thumbnailSrc="/projects/scribe/thumbnail-v3.webp"
            videoSrc="/projects/scribe/preview.mp4"
            alt="Scribe System Overview"
            aspectRatioClass="aspect-video"
            objectFit="cover"
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

      {/* 4. THE WORKFLOW */}
      <section id="workflow" className="py-12 md:py-20 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto border-t border-neutral-200/80 text-left">
        <div className="mb-12">
          <span className="text-[12px] font-sans font-bold uppercase tracking-[0.25em] text-neutral-400 block mb-2">
            04 / THE WORKFLOW
          </span>
          <h3 className="font-serif text-[28px] sm:text-[36px] text-neutral-900 font-normal leading-tight">
            See Scribe in Action: <span className="italic">From raw data to spatial synthesis</span>
          </h3>
          <p className="font-sans text-[15px] md:text-[16px] text-neutral-600 leading-relaxed max-w-3xl mt-2">
            A step-by-step walkthrough of how unstructured thoughts are transformed into structured, interactive decision maps.
          </p>
        </div>

        {/* 6-Video Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
          {[
            { id: 1, title: "01. API Setup (BYOK)", src: "/projects/scribe/workflow/1-api-setup.mp4", desc: "Friction by design. Users bring their own API keys to guarantee absolute data privacy and zero vendor lock-in." },
            { id: 2, title: "02. Document Upload", src: "/projects/scribe/workflow/2-upload.mp4", desc: "Ingesting unstructured data, PRDs, and user interviews to prepare for multi-document synthesis." },
            { id: 3, title: "03. Graph Generation", src: "/projects/scribe/workflow/3-select-files.mp4", desc: "Selecting multiple sources to generate a unified graph, surfacing hidden cross-document interdependencies." },
            { id: 4, title: "04. Spatial Workbench", src: "/projects/scribe/workflow/4-workbench.mp4", desc: "Automated spatial arrangement snaps nodes into rigid hierarchical columns, removing manual drag-and-drop fatigue." },
            { id: 5, title: "05. Intelligence Copilot", src: "/projects/scribe/workflow/5-intelligence-chat.mp4", desc: "Conversing with the data logically while maintaining visual context of the entire graph structure." },
            { id: 6, title: "06. Export & Handoff", src: "/projects/scribe/workflow/6-export.mp4", desc: "Packaging insights into portable, linear markdown formats for easy distribution to wider teams." },
          ].map((v) => (
            <div key={v.id} className="flex flex-col gap-3">
              <div className="w-full aspect-video rounded-xl overflow-hidden shadow-xs border border-neutral-200/90 bg-black">
                <video src={v.src} preload="metadata" muted playsInline loop autoPlay className="w-full h-full object-cover"></video>
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-neutral-900">{v.title}</span>
                <p className="text-[13px] text-neutral-500 leading-[1.6] mt-1">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. KEY DECISIONS / DESIGN SHOWCASES (Bento Layouts & Larger Scale) */}
      <section id="decisions" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto border-t border-neutral-200/80 text-left">
        <div className="mb-14">
          <span className="text-[12px] font-sans font-bold uppercase tracking-[0.25em] text-neutral-400">
            05 / KEY DECISIONS
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

      {/* 6. DESIGN SYSTEM & ARCHITECTURE */}
      <section id="design-system" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto border-t border-neutral-200/80 text-left">
        <div className="mb-8">
          <span className="text-[12px] font-sans font-bold uppercase tracking-[0.25em] text-neutral-400">
            06 / DESIGN SYSTEM & ARCHITECTURE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-start mb-16">
          <div className="md:col-span-5">
            <h2 className="font-serif text-[32px] sm:text-[42px] md:text-[48px] leading-[1.15] text-neutral-900 tracking-tight font-normal">
              Engineering-Grade System: <span className="italic">Tactical Noir &amp; 3-Tier Tokens</span>
            </h2>
          </div>
          <div className="md:col-span-7 font-sans text-[16px] md:text-[17px] leading-[1.7] text-neutral-600">
            <p>
              Scribe is powered by a fully documented, standalone Design System. To ensure seamless developer handoff, the UI is built on a strict 3-tier token architecture with a 7-State machine testing protocol (Hover, Active, Disabled, Loading, Error, etc.), moving beyond Figma mockups into production-ready schemas.
            </p>
          </div>
        </div>

        {/* Design System Bento */}
        <div className="flex flex-col gap-12 mt-8">
          
          {/* Color Palette */}
          <div>
            <div className="flex justify-between items-end mb-6 border-b border-neutral-200 pb-3">
              <div>
                <span className="font-mono text-[11px] text-neutral-400 font-bold uppercase tracking-widest block mb-1">FOUNDATIONS</span>
                <h3 className="font-sans text-[18px] font-bold text-neutral-900">Color Palette & Contrast Hierarchy</h3>
              </div>
              <span className="px-3 py-1 bg-green-50 border border-green-200 text-green-700 text-[10px] uppercase font-bold tracking-wider rounded-full">WCAG 2.1 AA / AAA</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="flex flex-col rounded-xl border border-neutral-200 overflow-hidden bg-white hover:border-orange-500 transition-colors cursor-pointer group shadow-sm">
                <div className="h-16 bg-[#ff4d00] flex items-center justify-center font-mono text-[11px] text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">#ff4d00</div>
                <div className="p-3 bg-white border-t border-neutral-100">
                  <div className="text-[12px] font-bold text-neutral-900 mb-0.5">Scribe Flame</div>
                  <div className="text-[10px] text-neutral-500 leading-tight">Primary Action / Focus</div>
                </div>
              </div>
              <div className="flex flex-col rounded-xl border border-neutral-200 overflow-hidden bg-white hover:border-emerald-500 transition-colors cursor-pointer group shadow-sm">
                <div className="h-16 bg-[#32d74b] flex items-center justify-center font-mono text-[11px] text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">#32d74b</div>
                <div className="p-3 bg-white border-t border-neutral-100">
                  <div className="text-[12px] font-bold text-neutral-900 mb-0.5">Bauhaus Mint</div>
                  <div className="text-[10px] text-neutral-500 leading-tight">Verified Flow / Success</div>
                </div>
              </div>
              <div className="flex flex-col rounded-xl border border-neutral-200 overflow-hidden bg-white hover:border-red-500 transition-colors cursor-pointer group shadow-sm">
                <div className="h-16 bg-[#ff453a] flex items-center justify-center font-mono text-[11px] text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">#ff453a</div>
                <div className="p-3 bg-white border-t border-neutral-100">
                  <div className="text-[12px] font-bold text-neutral-900 mb-0.5">Red Team Crimson</div>
                  <div className="text-[10px] text-neutral-500 leading-tight">Adversarial / Error</div>
                </div>
              </div>
              <div className="flex flex-col rounded-xl border border-neutral-200 overflow-hidden bg-white hover:border-blue-500 transition-colors cursor-pointer group shadow-sm">
                <div className="h-16 bg-[#0a84ff] flex items-center justify-center font-mono text-[11px] text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">#0a84ff</div>
                <div className="p-3 bg-white border-t border-neutral-100">
                  <div className="text-[12px] font-bold text-neutral-900 mb-0.5">Market Blue</div>
                  <div className="text-[10px] text-neutral-500 leading-tight">External / Ingest</div>
                </div>
              </div>
              <div className="flex flex-col rounded-xl border border-neutral-200 overflow-hidden bg-white hover:border-purple-500 transition-colors cursor-pointer group shadow-sm">
                <div className="h-16 bg-[#bf5af2] flex items-center justify-center font-mono text-[11px] text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">#bf5af2</div>
                <div className="p-3 bg-white border-t border-neutral-100">
                  <div className="text-[12px] font-bold text-neutral-900 mb-0.5">Deep Violet</div>
                  <div className="text-[10px] text-neutral-500 leading-tight">Neural Lenses / Ethics</div>
                </div>
              </div>
              <div className="flex flex-col rounded-xl border border-neutral-200 overflow-hidden bg-white hover:border-amber-400 transition-colors cursor-pointer group shadow-sm">
                <div className="h-16 bg-[#fbbf24] flex items-center justify-center font-mono text-[11px] text-black font-bold opacity-0 group-hover:opacity-100 transition-opacity">#fbbf24</div>
                <div className="p-3 bg-white border-t border-neutral-100">
                  <div className="text-[12px] font-bold text-neutral-900 mb-0.5">Oracle Amber</div>
                  <div className="text-[10px] text-neutral-500 leading-tight">AI Heuristics / Insights</div>
                </div>
              </div>
            </div>
          </div>

          {/* Typography Ladder */}
          <div>
            <div className="flex justify-between items-end mb-6 border-b border-neutral-200 pb-3">
              <div>
                <span className="font-mono text-[11px] text-neutral-400 font-bold uppercase tracking-widest block mb-1">FOUNDATIONS</span>
                <h3 className="font-sans text-[18px] font-bold text-neutral-900">Typography Ladder</h3>
              </div>
            </div>
            
            <div className="p-8 bg-neutral-50 border border-neutral-200 rounded-xl space-y-8">
              <div className="border-b border-neutral-200 pb-6">
                <span className="font-mono text-[10px] font-bold tracking-widest text-orange-500 uppercase">DISPLAY // PLAYFAIR 32PX / 900</span>
                <h1 className="font-serif text-[32px] font-black tracking-tight text-neutral-900 mt-2">Spatial Intelligence for Complex Systems</h1>
              </div>
              <div className="border-b border-neutral-200 pb-6">
                <span className="font-mono text-[10px] font-bold tracking-widest text-emerald-500 uppercase">HEADING // DM SANS 20PX / 700</span>
                <h2 className="font-sans text-[20px] font-bold text-neutral-900 mt-2">Micro Workbench & D3 Dynamic Cable Routing</h2>
              </div>
              <div className="border-b border-neutral-200 pb-6">
                <span className="font-mono text-[10px] font-bold tracking-widest text-blue-500 uppercase">BODY // DM SANS 14PX / 400</span>
                <p className="font-sans text-[14px] text-neutral-600 mt-2 max-w-2xl">Unhappy paths, logic gaps, and systemic friction revealed spatially. Run adversarial personas across 30 simulated agents.</p>
              </div>
              <div>
                <span className="font-mono text-[10px] font-bold tracking-widest text-purple-500 uppercase">TELEMETRY BADGE // JETBRAINS MONO 10PX / 900</span>
                <div className="mt-4">
                  <span className="font-mono text-[10px] font-black tracking-wider px-2 py-1 bg-neutral-900 text-white rounded">TSOT-COMP-3012 // VERIFIED</span>
                </div>
              </div>
            </div>
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

      {/* 7. UI COMPONENTS */}
      <section id="ui-components" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto border-t border-neutral-200/80 text-left">
        <div className="mb-14">
          <span className="text-[12px] font-sans font-bold uppercase tracking-[0.25em] text-neutral-400">
            07 / UI COMPONENTS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-start mb-16">
          <div className="md:col-span-5">
            <h2 className="font-serif text-[32px] sm:text-[42px] md:text-[48px] leading-[1.15] text-neutral-900 tracking-tight font-normal">
              High-Fidelity Interaction: <span className="italic">Beyond Standard Patterns</span>
            </h2>
          </div>
          <div className="md:col-span-7 font-sans text-[16px] md:text-[17px] leading-[1.7] text-neutral-600 space-y-4">
            <p>
              To support the complexity of algorithmic spatial synthesis, Scribe demanded bespoke UI components. From live telemetry HUDs to interactive docks, the interface merges technical density with tactile, low-latency ergonomics.
            </p>
          </div>
        </div>

        <div className="space-y-24">
          
          {/* Sub-section 1: Cartridge Dock */}
          <div>
            <div className="flex items-center gap-4 mb-6 border-b border-neutral-200 pb-2">
              <span className="font-mono text-[11px] text-neutral-400 font-bold uppercase tracking-widest">07.1 // System Cartridge Dock</span>
            </div>
            <p className="font-sans text-[14px] text-neutral-600 mb-8 max-w-3xl">
              The primary instrument dock for adding lenses, connecting datasets, and managing workspace snapshots. It uses a horizontal sliding model with dynamic active states.
            </p>
            <div className="p-8 bg-neutral-900 rounded-xl border border-neutral-800 flex justify-center overflow-x-auto">
              <div className="flex gap-2 p-1.5 bg-black/60 backdrop-blur-md rounded-[18px] border border-white/10 shadow-2xl items-center">
                {/* Brand Zone */}
                <div className="flex items-center gap-3 pr-4 border-r border-white/10 pl-2">
                  <div className="flex flex-col">
                    <span className="font-mono text-[8px] font-black tracking-[0.2em] text-white/40 uppercase">System</span>
                    <span className="font-mono text-[10px] font-bold tracking-[0.15em] text-orange-500 uppercase">Dock</span>
                  </div>
                  <button className="p-1 hover:bg-white/5 rounded text-white/50 transition-colors">⤓</button>
                </div>
                {/* Cartridges */}
                <div className="flex items-center gap-2 pl-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 cursor-pointer">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                    <span className="text-[12px] font-bold">Oracle Lens</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/5 text-neutral-400 cursor-pointer transition-colors">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M9 10h.01M15 10h.01"/><path d="M9.5 15a3.5 3.5 0 0 0 5 0"/></svg>
                    <span className="text-[12px] font-medium">Swamp Lens</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/5 text-neutral-400 cursor-pointer transition-colors">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><circle cx="8" cy="16" r="1"/><circle cx="16" cy="16" r="1"/></svg>
                    <span className="text-[12px] font-medium">Strategist</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/5 text-neutral-400 cursor-pointer transition-colors">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
                    <span className="text-[12px] font-medium">Local Store</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sub-section 2: Swarm Persona Matrix */}
          <div>
            <div className="flex items-center gap-4 mb-6 border-b border-neutral-200 pb-2">
              <span className="font-mono text-[11px] text-neutral-400 font-bold uppercase tracking-widest">07.2 // Swarm Persona Matrix</span>
            </div>
            <p className="font-sans text-[14px] text-neutral-600 mb-8 max-w-3xl">
              Adversarial simulation packages for stress-testing product ideas. Each package uses a distinct color identity mapped to specific system behaviors.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-white border-2 border-red-500 rounded-xl shadow-[0_4px_20px_rgba(239,68,68,0.15)] relative cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-8 h-8 rounded-full bg-red-500/15 flex items-center justify-center text-red-500">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-500/10 text-red-500">10 AI PERSONAS</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-500">ACTIVE</span>
                  </div>
                </div>
                <h4 className="text-[14px] font-bold text-neutral-900 mb-1">The Red Team</h4>
                <p className="text-[12px] text-neutral-500 leading-relaxed">Critical analysis, edge-case vulnerability discovery, and systemic friction resistance.</p>
              </div>

              <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-xl hover:border-emerald-500 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-500">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.2h7.6l-6.1 4.5 2.3 7.3-6.2-4.6-6.2 4.6 2.3-7.3-6.1-4.5h7.6z"/></svg>
                  </div>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500">8 AI PERSONAS</span>
                </div>
                <h4 className="text-[14px] font-bold text-neutral-900 mb-1">The Bauhaus Council</h4>
                <p className="text-[12px] text-neutral-500 leading-relaxed">Utility, essentialism, and industrial ergonomics without decoration waste.</p>
              </div>

              <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-xl hover:border-blue-500 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/15 flex items-center justify-center text-blue-500">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
                  </div>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-500">6 AI PERSONAS</span>
                </div>
                <h4 className="text-[14px] font-bold text-neutral-900 mb-1">The Market Movers</h4>
                <p className="text-[12px] text-neutral-500 leading-relaxed">Business economics, distribution flywheels, and monetization sovereignty.</p>
              </div>

              <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-xl hover:border-purple-500 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-8 h-8 rounded-full bg-purple-500/15 flex items-center justify-center text-purple-500">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                  </div>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-500">6 AI PERSONAS</span>
                </div>
                <h4 className="text-[14px] font-bold text-neutral-900 mb-1">The Deep Thinkers</h4>
                <p className="text-[12px] text-neutral-500 leading-relaxed">Ethics, epistemic humility, and long-term societal resilience models.</p>
              </div>
            </div>
          </div>

          {/* Sub-section 3: GigaMap HUD & Strategist AI */}
          <div>
            <div className="flex items-center gap-4 mb-6 border-b border-neutral-200 pb-2">
              <span className="font-mono text-[11px] text-neutral-400 font-bold uppercase tracking-widest">07.3 // Spatial Telemetry & Strategist</span>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* GigaMap HUD */}
              <div className="flex flex-col">
                <p className="font-sans text-[13px] text-neutral-600 mb-4">
                  Tactical floating HUD overlays, camera controls, coordinate readouts, and spatial resonance indexes mapped over the infinite canvas.
                </p>
                <div className="relative h-64 bg-[#060709] border border-neutral-800 rounded-xl overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:24px_24px] opacity-60"></div>
                  
                  {/* Nodes */}
                  <div className="absolute flex gap-12 items-center">
                    <div className="px-3.5 py-2 bg-[#141414] border border-white/10 border-l-[3px] border-l-[#ff4d00] rounded-lg shadow-2xl z-10">
                      <div className="font-mono text-[8px] font-black text-[#ff4d00] uppercase">ROOT CONCEPT</div>
                      <div className="text-[11px] font-bold text-white mt-0.5">Market Liquidity Protocol</div>
                    </div>
                    <div className="px-3.5 py-2 bg-[#141414] border border-white/10 border-l-[3px] border-l-[#32d74b] rounded-lg shadow-2xl z-10">
                      <div className="font-mono text-[8px] font-black text-[#32d74b] uppercase">VERIFIED OUTCOME</div>
                      <div className="text-[11px] font-bold text-white mt-0.5">Zero-Knowledge Settlement</div>
                    </div>
                  </div>

                  {/* Telemetry Pill */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-[#121417]/80 backdrop-blur-md border border-white/10 rounded-full z-20">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#32d74b]"></div>
                    <span className="font-mono text-[9px] font-bold text-[#f2f2f7] tracking-wide">1,248 NODES INDEXED</span>
                  </div>

                  {/* Controls */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-1 p-1 bg-[#121417]/80 backdrop-blur-md border border-white/10 rounded-lg z-20">
                    <button className="px-2 py-1 text-[11px] font-bold text-white hover:bg-white/10 rounded">+</button>
                    <button className="px-2 py-1 text-[11px] font-bold text-white hover:bg-white/10 rounded">-</button>
                    <button className="px-2 py-1 text-[9px] font-mono font-bold text-white hover:bg-white/10 rounded">FIT</button>
                  </div>
                </div>
              </div>

              {/* Strategist AI */}
              <div className="flex flex-col">
                <p className="font-sans text-[13px] text-neutral-600 mb-4">
                  Heuristic recommendation feed with expandable empirical rationale and 2-step verified canvas mutation.
                </p>
                <div className="bg-[#0a0a0c] border border-neutral-800 rounded-xl p-5 shadow-2xl h-64 flex flex-col justify-center">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="text-white"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><circle cx="8" cy="16" r="1"/><circle cx="16" cy="16" r="1"/></svg></div>
                      <div>
                        <div className="text-[12px] font-bold text-white">Strategic Recommendation</div>
                        <div className="text-[9px] font-mono text-[#32d74b]">EU Art. 14 // Human-in-the-Loop</div>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold text-[#ff4d00] bg-[#ff4d00]/10 px-1.5 py-0.5 rounded">94% CONFIDENCE</span>
                  </div>

                  <p className="text-[12px] text-white/80 leading-relaxed mb-4">
                    Cluster 4 exhibits high adversarial resistance. Recommend splitting into two decoupled micro-workbenches to isolate failure modes.
                  </p>

                  <div className="bg-black/40 border border-white/10 rounded-lg p-3 mb-4">
                    <div className="text-[10px] font-bold text-yellow-500 flex items-center gap-1.5 mb-1.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                      Empirical Rationale Ledger
                    </div>
                    <p className="text-[10px] text-neutral-400 leading-relaxed">Evaluated against Red Team personas. 4/5 models flagged single-point-of-failure in current node wiring.</p>
                  </div>

                  <button className="w-full py-2 bg-[#ff4d00] hover:bg-[#ff4d00]/90 text-white text-[11px] font-bold rounded-lg transition-colors">
                    Review Mutation Proposal
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 8. COMPONENTS & COMPLIANCE */}
      <section id="compliance" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto border-t border-neutral-200/80 text-left">
        <div className="mb-14">
          <span className="text-[12px] font-sans font-bold uppercase tracking-[0.25em] text-neutral-400">
            08 / COMPONENTS & COMPLIANCE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-start mb-16">
          <div className="md:col-span-5">
            <h2 className="font-serif text-[32px] sm:text-[42px] md:text-[48px] leading-[1.15] text-neutral-900 tracking-tight font-normal">
              Production-Ready UI: <span className="italic">From Atoms to EU Regulation</span>
            </h2>
          </div>
          <div className="md:col-span-7 font-sans text-[16px] md:text-[17px] leading-[1.7] text-neutral-600 space-y-4">
            <p>
              A robust design system isn&apos;t just about aesthetics; it&apos;s about handling unpredictable edge cases and strict legal requirements. Scribe&apos;s UI kit was built to gracefully manage missing data, text overflows, and mandatory statutory metadata required for AI products.
            </p>
          </div>
        </div>

        <div className="space-y-24">
          
          {/* Sub-section 1: Component Atoms */}
          <div>
            <div className="flex items-center gap-4 mb-6 border-b border-neutral-200 pb-2">
              <span className="font-mono text-[11px] text-neutral-400 font-bold uppercase tracking-widest">07.1 // Component Set (Atoms)</span>
            </div>
            <div className="p-8 bg-neutral-50 rounded-xl border border-neutral-200 flex flex-col items-center justify-center">
              <div className="w-full max-w-sm space-y-5">
                <div>
                  <label className="block text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-1.5">Document Title</label>
                  <input type="text" placeholder="e.g. 'Q4 Strategy Analysis'" defaultValue="Enterprise Architecture v2" className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-lg text-[13px] text-neutral-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-1.5">Notes Content</label>
                  <textarea placeholder="Paste your research notes here..." rows={3} className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-lg text-[13px] text-neutral-900 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all resize-none"></textarea>
                </div>
                <div className="flex items-center justify-between p-3.5 bg-white border border-neutral-200 rounded-xl">
                  <div>
                    <div className="text-[13px] font-bold text-neutral-900">Step-Gate Mode</div>
                    <div className="text-[11px] text-neutral-500 mt-0.5">Require human confirmation before mutations</div>
                  </div>
                  <div className="w-11 h-6 rounded-full bg-orange-500 relative cursor-pointer shadow-inner">
                    <div className="absolute top-[3px] right-[3px] w-[18px] h-[18px] rounded-full bg-white shadow-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sub-section 2: Edge Cases */}
          <div>
            <div className="flex items-center gap-4 mb-6 border-b border-neutral-200 pb-2">
              <span className="font-mono text-[11px] text-neutral-400 font-bold uppercase tracking-widest">07.2 // Edge Cases & Resilience</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 bg-neutral-100/50 rounded-xl border border-neutral-200">
                <h4 className="font-sans text-[14px] font-bold text-neutral-900 mb-2">7-State Component Machine</h4>
                <p className="font-sans text-[13px] text-neutral-600 leading-relaxed">
                  Every interactive atom (buttons, nodes, inputs) is mapped across 7 distinct states: Default, Hover, Active, Disabled, Loading, Error, and Success, preventing broken interactions.
                </p>
              </div>
              <div className="p-6 bg-neutral-100/50 rounded-xl border border-neutral-200">
                <h4 className="font-sans text-[14px] font-bold text-neutral-900 mb-2">Unpredictable LLM Outputs</h4>
                <p className="font-sans text-[13px] text-neutral-600 leading-relaxed">
                  Strict multiline truncation (line-clamp) and flex-wrap policies ensure that overly verbose AI-generated titles or missing schemas never break the structural grid.
                </p>
              </div>
              <div className="p-6 bg-neutral-100/50 rounded-xl border border-neutral-200">
                <h4 className="font-sans text-[14px] font-bold text-neutral-900 mb-2">Zero-Data Graceful Fallbacks</h4>
                <p className="font-sans text-[13px] text-neutral-600 leading-relaxed">
                  When the user has no API key or the local IndexedDB is wiped, the UI gracefully downgrades into an empty state providing clear wayfinding instead of fatal errors.
                </p>
              </div>
            </div>
          </div>

          {/* Sub-section 3: EU AI Act */}
          <div>
            <div className="flex items-center gap-4 mb-6 border-b border-neutral-200 pb-2">
              <span className="font-mono text-[11px] text-neutral-400 font-bold uppercase tracking-widest">07.3 // EU AI Act Compliance</span>
            </div>
            <p className="font-sans text-[15px] text-neutral-600 mb-8 max-w-3xl">
              Every AI-generated output is wrapped in statutory transparency metadata. Scribe implements Articles 13, 14, and 50 of the EU AI Act directly at the component level to ensure TSOT compliance.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Art 50 */}
              <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-800">
                <h4 className="font-sans text-[13px] font-bold text-white mb-4">Art. 50 — Algorithmic Transparency Badges</h4>
                <div className="flex flex-col gap-3 items-start">
                  <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-orange-500/10 border border-orange-500/30">
                    <span className="font-mono text-[9px] font-bold text-orange-500 uppercase tracking-[0.15em]">EU AI Act Art. 50 // Algorithmic Spatial Synthesis</span>
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                    <span className="font-mono text-[9px] font-bold text-emerald-500 uppercase tracking-[0.15em]">Art. 14 // Human-in-the-Loop Verified</span>
                  </div>
                </div>
              </div>

              {/* Art 14 */}
              <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-800">
                <h4 className="font-sans text-[13px] font-bold text-white mb-4">Art. 14 — Step-Gate Confirmation</h4>
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                  <p className="text-[12px] text-emerald-100/70 mb-3"><strong className="text-emerald-400">Step 1 of 2:</strong> Review the AI&apos;s proposed action before confirming execution. You retain full override authority.</p>
                  <button className="flex items-center justify-center w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 transition-colors text-black text-[12px] font-bold rounded-lg cursor-pointer">
                    Confirm &amp; Mutate Canvas
                  </button>
                </div>
              </div>
              
              {/* Art 13 */}
              <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-800 sm:col-span-2">
                <h4 className="font-sans text-[13px] font-bold text-white mb-4">Art. 13 — Spatial Epistemic Ledger (Provenance Audit)</h4>
                <div className="p-5 bg-black border border-neutral-800 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[13px] font-bold text-white">Spatial Epistemic Ledger</span>
                    <span className="font-mono text-[9px] px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold">96% Confidence</span>
                  </div>
                  <p className="text-[12px] text-neutral-400 leading-relaxed mb-4">
                    Synthesized via deterministic 2-pass pillar-cluster hierarchy. Zero external telemetry custody. Full BYOK client-side execution.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-3 border-t border-neutral-800 font-mono text-[10px] text-neutral-500">
                    <span>Latency: Damped (90%)</span>
                    <span>&bull;</span>
                    <span>EU Risk Class: Limited</span>
                    <span>&bull;</span>
                    <span>Human Override: VERIFIED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 9. WHAT DIDN'T WORK SECTION (Bento Grid of 8 Prototypes) */}
      <section id="friction" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto border-t border-neutral-200/80 text-left">
        <div className="mb-8">
          <span className="text-[12px] font-sans font-bold uppercase tracking-[0.25em] text-neutral-400">
            09 / WHAT DIDN&apos;T WORK
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

      {/* 10. OUTCOMES */}
      <section id="outcomes" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto border-t border-neutral-200/80 text-left">
        <div className="mb-8">
          <span className="text-[12px] font-sans font-bold uppercase tracking-[0.25em] text-neutral-400">
            10 / OUTCOMES
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-start mb-16">
          <div className="md:col-span-5">
            <h2 className="font-serif text-[32px] sm:text-[42px] md:text-[48px] leading-[1.15] text-neutral-900 tracking-tight font-normal">
              Beta Launch: <span className="italic">Organic traction &amp; adoption</span>
            </h2>
          </div>
          <div className="md:col-span-7 font-sans text-[16px] md:text-[17px] leading-[1.7] text-neutral-600">
            <p>
              Scribe was launched as a private beta to validate the core assumption: that users prefer structural friction over generative fluff when dealing with complex system design. The response validated this hypothesis entirely.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-12">
          <div className="flex flex-col gap-2">
            <span className="font-serif text-[56px] sm:text-[64px] text-neutral-900 leading-none">350+</span>
            <span className="text-[12px] font-bold text-neutral-500 uppercase tracking-[0.15em]">Active Beta Users</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-serif text-[56px] sm:text-[64px] text-neutral-900 leading-none">173</span>
            <span className="text-[12px] font-bold text-neutral-500 uppercase tracking-[0.15em]">Waitlist Signups</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-serif text-[56px] sm:text-[64px] text-neutral-900 leading-none">Daily</span>
            <span className="text-[12px] font-bold text-neutral-500 uppercase tracking-[0.15em]">Personal Usage</span>
          </div>
        </div>
      </section>

      {/* 11. REFLECTIONS (Larger Scale & Bento Style) */}
      <section id="reflections" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto border-t border-neutral-200/80 text-left">
        <div className="mb-10">
          <span className="text-[12px] font-sans font-bold uppercase tracking-[0.25em] text-neutral-400">
            11 / REFLECTIONS
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
