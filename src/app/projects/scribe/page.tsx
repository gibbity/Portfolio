"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import CaseStudyNav from "@/components/case-study/CaseStudyNav";
import CaseStudyFooter from "@/components/case-study/CaseStudyFooter";

const MuxVideo = dynamic(() => import("@/components/MuxVideo"), { ssr: false });

const sections = [
  { id: "intro", label: "Hook" },
  { id: "origin", label: "Origin" },
  { id: "context", label: "Context" },
  { id: "problem", label: "The Real Problem" },
  { id: "decisions", label: "Key Decisions" },
  { id: "friction", label: "What Didn't Work" },
  { id: "outcome", label: "Outcome" }
];

export default function ScribePage() {
  const [activeSection, setActiveSection] = useState("intro");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [expandedDecision, setExpandedDecision] = useState<number | null>(0);
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

  return (
    <main className="relative min-h-screen bg-white font-sans text-black selection:bg-black selection:text-white pb-32 overflow-x-hidden">
      
      {/* Scroll Progress Bar */}
      <div 
        style={{ width: `${scrollProgress}%` }}
        className="fixed top-0 left-0 h-[2px] bg-black z-50 transition-all duration-75"
      />

      {/* Case Study Nav */}
      <CaseStudyNav projectTitle="Scribe" category="Strategic Intelligence" />

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

      {/* LIGHTBOX OVERLAY */}
      {lightboxImage && (
        <div 
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center cursor-zoom-out p-6"
        >
          <div className="relative w-full max-w-5xl h-[85vh]">
            <Image 
              src={lightboxImage} 
              alt="Zoomed Scribe View" 
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
        {/* Title */}
        <h1 className="font-sans font-normal text-[36px] md:text-[54px] lg:text-[72px] leading-[1.05] tracking-tight text-black text-left max-w-4xl font-serif">
          Scribe
        </h1>
        
        {/* Description */}
        <p className="font-sans text-[18px] md:text-[22px] leading-relaxed text-black/60 mt-8 max-w-3xl italic">
          Designed an interactive spatial mapping interface that helps product teams spot critical strategic gaps and stress-test roadmaps without getting lost in flat document systems.
        </p>

        {/* Role */}
        <div className="mt-8 font-sans">
          <p className="text-[10px] font-bold text-black uppercase tracking-[0.3em] mb-3">Role</p>
          <p className="text-[11px] md:text-[12px] text-black/60 font-bold uppercase tracking-widest">
            Solo Designer & Developer
          </p>
        </div>

        {/* Case Study Appendix Redirect Alert Card */}
        <div className="mt-6 p-4 bg-gray-50 border border-gray-150 rounded-sm flex items-start gap-4 text-left max-w-3xl font-sans">
          <div className="w-1.5 h-full min-h-[36px] bg-neutral-900 rounded-sm shrink-0" />
          <div>
            <span className="text-[9px] font-bold text-black/40 uppercase tracking-widest block mb-0.5">Engineering Appendix Link</span>
            <p className="text-[12px] text-black/70 leading-normal font-light">
              A complete, engineering-focused deep dive into the system architecture and implementation details is available in the collapsible process drawer at the bottom or the Scribe Appendix file.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 mt-8">
          <a 
            href="https://scribe-neon.vercel.app/landing"
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-3 bg-black text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:scale-105 transition-transform duration-300 rounded-sm"
          >
            Visit Live Site
          </a>
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

        {/* Hero Visual Video */}
        <div className="w-full aspect-[16/9.5] border border-black/5 rounded-sm overflow-hidden mt-12 relative shadow-sm bg-neutral-950">
          <MuxVideo 
            playbackId="I755xvZ9WF017k4dgPRdKox3UWlwSdfBkxhxwr2aWQu8" 
            className="w-full h-full object-cover"
            metadata={{ video_title: "Scribe Interaction Demo" }}
          />
        </div>
      </section>

      {/* 2.5. ORIGIN SECTION */}
      <section id="origin" className="py-20 md:py-28 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto border-t border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
          <div className="md:col-span-4">
            <span className="font-sans font-semibold text-[11px] text-black/40 uppercase tracking-widest block">
              01 / ORIGIN
            </span>
          </div>
          <div className="md:col-span-8 text-left space-y-4">
            <h2 className="font-serif text-[28px] md:text-[38px] leading-tight text-black tracking-tight">
              The Evolution of Scribe: 3 MVP Iterations Before Context
            </h2>
            <p className="font-sans text-[16px] md:text-[18px] leading-relaxed text-black/60">
              Before landing on rigid hierarchical columns, Scribe underwent three distinct design and product iterations. Each prototype tested a different mental model—from unconstrained AI connection graphs to qualitative storytelling, before focusing on rigid strategic hierarchy for decision-makers.
            </p>
          </div>
        </div>

        {/* ITERATIONS ACCORDION / STACK */}
        <div className="space-y-16">
          {/* MVP 1 */}
          <div className="border border-gray-100 bg-gray-50/50 rounded-sm p-6 md:p-10 text-left space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200/60 pb-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/40 block mb-1">Iteration 01</span>
                <h3 className="font-serif text-[24px] md:text-[30px] text-black">MVP 1 — AI Connection Map Generator</h3>
              </div>
              <span className="text-[11px] font-mono bg-black/5 text-black/60 px-3 py-1 rounded-full self-start md:self-auto">
                Unconstrained Force Graph
              </span>
            </div>

            <p className="font-sans text-[15px] md:text-[16px] text-black/70 leading-relaxed max-w-3xl">
              The initial concept was simple: input raw notes and let an automated AI engine construct a force-directed graph based on word co-occurrences and semantic links using simple logic.
            </p>

            {/* Images Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                onClick={() => setLightboxImage("/projects/scribe/origin/mvp1-1.webp")}
                className="relative aspect-[4/3] rounded-sm overflow-hidden border border-gray-200/80 bg-white cursor-zoom-in group shadow-sm"
              >
                <Image src="/projects/scribe/origin/mvp1-1.webp" alt="MVP 1 Light Theme Graph" fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[9px] font-mono px-2 py-0.5 rounded">Light Graph View</span>
              </div>
              <div 
                onClick={() => setLightboxImage("/projects/scribe/origin/mvp1-2.webp")}
                className="relative aspect-[4/3] rounded-sm overflow-hidden border border-gray-200/80 bg-white cursor-zoom-in group shadow-sm"
              >
                <Image src="/projects/scribe/origin/mvp1-2.webp" alt="MVP 1 Dark Theme Graph" fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[9px] font-mono px-2 py-0.5 rounded">Dark Graph View</span>
              </div>
            </div>

            {/* User Feedback Pills */}
            <div className="bg-white p-6 rounded-sm border border-gray-200/60 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-black/40 block">User Feedbacks & Initial Reactions</span>
              <div className="flex flex-wrap gap-2.5">
                {["What do I use it for?", "Wow, you made this?", "Looks cool", "Can I try it?", "How do I read all this?", "What are you using it for?", "Okay... (confusion personifies)"].map((fb, i) => (
                  <span key={i} className="text-[11px] md:text-[12px] font-medium px-3 py-1.5 rounded-full border border-purple-200 bg-purple-50 text-purple-900 shadow-sm">
                    💬 "{fb}"
                  </span>
                ))}
              </div>
            </div>

            {/* Takeaways & Pivot */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="pl-4 border-l-2 border-red-400/60">
                <span className="text-[10px] font-bold uppercase tracking-widest text-red-600 block mb-1">Conclusion</span>
                <p className="text-[13px] text-black/70 leading-normal">
                  The map looked visually impressive, but failed to serve a practical purpose. The UI provided no direction, turning navigation into an exhausting game of detective.
                </p>
              </div>
              <div className="pl-4 border-l-2 border-emerald-500/60">
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 block mb-1">New Direction</span>
                <p className="text-[13px] text-black/70 leading-normal">
                  The tool needed a specific purpose. The UI must drastically reduce cognitive load rather than increase it.
                </p>
              </div>
            </div>
          </div>

          {/* MVP 2 */}
          <div className="border border-gray-100 bg-gray-50/50 rounded-sm p-6 md:p-10 text-left space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200/60 pb-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/40 block mb-1">Iteration 02</span>
                <h3 className="font-serif text-[24px] md:text-[30px] text-black">MVP 2 — Storytelling & Qualitative Journey Maps</h3>
              </div>
              <span className="text-[11px] font-mono bg-black/5 text-black/60 px-3 py-1 rounded-full self-start md:self-auto">
                Story of the Little Match Girl
              </span>
            </div>

            <p className="font-sans text-[15px] md:text-[16px] text-black/70 leading-relaxed max-w-3xl">
              Chose storytelling as the core direction—taking complex qualitative data (like stories, user interview transcripts, and narrative arcs) and representing them as interactive cluster journey maps.
            </p>

            {/* Images Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { src: "/projects/scribe/origin/mvp2-1.webp", title: "Cluster View" },
                { src: "/projects/scribe/origin/mvp2-2.webp", title: "Node Map" },
                { src: "/projects/scribe/origin/mvp2-3.webp", title: "Document Analysis" },
                { src: "/projects/scribe/origin/mvp2-4.webp", title: "Interview Cards" },
              ].map((img, i) => (
                <div 
                  key={i}
                  onClick={() => setLightboxImage(img.src)}
                  className="relative aspect-[4/3] rounded-sm overflow-hidden border border-gray-200/80 bg-white cursor-zoom-in group shadow-sm"
                >
                  <Image src={img.src} alt={img.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute bottom-1.5 left-1.5 bg-black/70 text-white text-[8px] font-mono px-1.5 py-0.5 rounded">{img.title}</span>
                </div>
              ))}
            </div>

            {/* User Feedback Pills */}
            <div className="bg-neutral-900 text-white p-6 rounded-sm space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 block">User Feedbacks (Dark Mode Test Batch)</span>
              <div className="flex flex-wrap gap-2.5">
                {["I am putting in more effort...", "Looks cool", "What are you using it for?", "Can I try it?"].map((fb, i) => (
                  <span key={i} className="text-[11px] md:text-[12px] font-medium px-3 py-1.5 rounded-full border border-pink-500/40 bg-pink-500/10 text-pink-300 shadow-sm">
                    💬 "{fb}"
                  </span>
                ))}
              </div>
            </div>

            {/* Takeaways & Pivot */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="pl-4 border-l-2 border-red-400/60">
                <span className="text-[10px] font-bold uppercase tracking-widest text-red-600 block mb-1">Conclusion</span>
                <p className="text-[13px] text-black/70 leading-normal">
                  Slightly more useful than MVP 1, but as a tool it still lacked a clear, indispensable purpose. Users felt they were putting in excessive effort decoding visual layouts.
                </p>
              </div>
              <div className="pl-4 border-l-2 border-emerald-500/60">
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 block mb-1">New Direction</span>
                <p className="text-[13px] text-black/70 leading-normal">
                  Scrap visual gimmicks entirely. Focus on a specific niche problem for users who need to make high-stakes decisions from dense data.
                </p>
              </div>
            </div>
          </div>

          {/* MVP 3 */}
          <div className="border border-gray-100 bg-gray-50/50 rounded-sm p-6 md:p-10 text-left space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200/60 pb-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/40 block mb-1">Iteration 03</span>
                <h3 className="font-serif text-[24px] md:text-[30px] text-black">MVP 3 — Multi-Data Link & Connection Analyzer</h3>
              </div>
              <span className="text-[11px] font-mono bg-black/5 text-black/60 px-3 py-1 rounded-full self-start md:self-auto">
                Targeting Thinkers & PMs
              </span>
            </div>

            <p className="font-sans text-[15px] md:text-[16px] text-black/70 leading-relaxed max-w-3xl">
              Pivoted away from creative writers toward thinkers, product managers, and researchers—synthesizing complex data inputs, 50-page research papers, and technical requirements into linked analytical graphs.
            </p>

            {/* Images Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                onClick={() => setLightboxImage("/projects/scribe/origin/mvp3-1.webp")}
                className="relative aspect-[16/9] rounded-sm overflow-hidden border border-gray-200/80 bg-white cursor-zoom-in group shadow-sm"
              >
                <Image src="/projects/scribe/origin/mvp3-1.webp" alt="Analytical Clusters" fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[9px] font-mono px-2 py-0.5 rounded">Multi-Cluster Analysis</span>
              </div>
              <div 
                onClick={() => setLightboxImage("/projects/scribe/origin/mvp3-4.webp")}
                className="relative aspect-[16/9] rounded-sm overflow-hidden border border-gray-200/80 bg-white cursor-zoom-in group shadow-sm"
              >
                <Image src="/projects/scribe/origin/mvp3-4.webp" alt="Dense Link Graph" fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[9px] font-mono px-2 py-0.5 rounded">Dense Link Graph</span>
              </div>
            </div>

            {/* Real User Interview Quotes */}
            <div className="bg-white p-6 rounded-sm border border-gray-200/60 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">In-Depth User Interview Insights</span>
                <span className="text-[10px] font-sans text-black/30 font-medium">(Targeted Stakeholder Testing)</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded border border-gray-150 space-y-2">
                  <span className="text-[11px] font-bold text-black uppercase tracking-wider block">UX Professor</span>
                  <p className="text-[12px] text-black/70 italic leading-relaxed">
                    "This looks useful enough but you still need to find a better use case for it. Write a research paper on this..."
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded border border-gray-150 space-y-2">
                  <span className="text-[11px] font-bold text-black uppercase tracking-wider block">IBM Product Manager</span>
                  <p className="text-[12px] text-black/70 italic leading-relaxed">
                    "I will use it if it reduces my effort and saves me time. I don't understand the specific context... I'd rather use normal AI."
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded border border-gray-150 space-y-2">
                  <span className="text-[11px] font-bold text-black uppercase tracking-wider block">Automobile Designer</span>
                  <span className="text-[9px] font-mono text-purple-600 block">(Tested on 50-page paper)</span>
                  <p className="text-[12px] text-black/70 italic leading-relaxed">
                    "I don't want to read all that and either way I don't feel like it helped me."
                  </p>
                </div>
              </div>
            </div>

            {/* Takeaways & Breakthrough */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="pl-4 border-l-2 border-red-400/60">
                <span className="text-[10px] font-bold uppercase tracking-widest text-red-600 block mb-1">Conclusion</span>
                <p className="text-[13px] text-black/70 leading-normal">
                  It was significantly better than previous iterations, but unconstrained graphs still lacked a singular focus to replace traditional AI chat windows in daily workflows.
                </p>
              </div>
              <div className="pl-4 border-l-2 border-emerald-500/60">
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 block mb-1">Final Breakthrough to Scribe</span>
                <p className="text-[13px] text-black/70 leading-normal">
                  Scrap free-form physics graphs entirely. Constrain D3 to snap nodes into fixed 300px hierarchical columns (Pillars → Clusters → Leaves) tailored specifically for strategic roadmap stress-testing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CONTEXT SECTION */}
      <section id="context" className="py-16 md:pt-24 md:pb-0 border-t border-gray-100">
        <div className="px-6 md:px-12 lg:px-20 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <span className="font-sans font-semibold text-[11px] text-black/40 uppercase tracking-widest block">
                02 / CONTEXT
              </span>
            </div>
            <div className="md:col-span-8 text-left space-y-6">
              <p className="font-sans font-normal text-[17px] md:text-[19px] leading-relaxed text-black/75">
                Scribe is a local-first, visual note-taking environment designed to solve this specific problem.
              </p>
              <p className="font-sans font-normal text-[15px] leading-relaxed text-black/50 border-l border-black/10 pl-6">
                It was built as a solo project, meaning I needed a stack that allowed for rapid prototyping without heavy backend infrastructure (Next.js, Tailwind, D3.js, and local IndexedDB).
              </p>
            </div>
          </div>
        </div>

        {/* EDGE-TO-EDGE FULL BLEED AFTER CONTEXT BANNER (Figma node 218:8636) */}
        <div 
          onClick={() => setLightboxImage("/projects/scribe/scribe-after-context.webp")}
          className="w-full mt-12 md:mt-16 bg-gradient-to-b from-[#33013f] to-[#8402a5] py-8 md:py-16 lg:py-20 px-4 sm:px-8 md:px-12 overflow-hidden relative shadow-2xl flex items-center justify-center cursor-zoom-in group border-y border-purple-900/30"
        >
          <div className="w-full max-w-[1920px] mx-auto aspect-[2400/1315] relative">
            <Image 
              src="/projects/scribe/scribe-after-context.webp" 
              alt="Scribe System Overview (MacBook & iPhone Mockups)" 
              fill 
              className="object-contain group-hover:scale-[1.015] transition-transform duration-500 ease-out"
              sizes="100vw"
              quality={90}
              priority
            />
          </div>
        </div>
      </section>

      {/* 4. THE REAL PROBLEM SECTION */}
      <section id="problem" className="py-16 md:py-24 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto border-t border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <span className="font-sans font-semibold text-[11px] text-black/40 uppercase tracking-widest block">
              03 / THE REAL PROBLEM
            </span>
          </div>
          <div className="md:col-span-8 text-left space-y-6">
            <h3 className="font-sans font-normal text-[26px] md:text-[34px] leading-tight text-black tracking-tight font-serif">
              I was trying to reconcile a product roadmap across 30 different user interviews, technical constraints, and design requirements. I kept losing track of how a feature in Phase 2 would break a constraint we discovered in Phase 1.
            </h3>
            <p className="font-sans font-normal text-[15px] md:text-[16px] leading-relaxed text-black/60">
              Linear documents (like Notion or Google Docs) hide interdependencies. You can link pages, but you can't *see* the connections. I needed a way to map out complex logic visually without it turning into an unreadable mess.
            </p>
            <div className="w-full mt-8 rounded-sm overflow-hidden border border-gray-100 bg-gray-50">
              <Image src="/projects/scribe/The problem.webp" alt="The Problem" width={1920} height={1080} className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. KEY DECISIONS */}
      <section id="decisions" className="py-20 md:py-28 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto border-t border-gray-100">
        <div className="w-full flex justify-between items-baseline mb-12 border-b border-gray-100 pb-4">
          <span className="font-sans font-semibold text-[11px] text-black/40 uppercase tracking-widest">
            04 / KEY DECISIONS
          </span>
        </div>

        <div className="space-y-16">
          {[
            {
              title: "Forcing hierarchical columns over free-form graphs",
              summary: "Most note-taking apps with graphs (like Obsidian) use force-directed layouts. They look cool, but they turn into useless 'hairballs' once you have more than 50 notes.",
              why: "Decision: I constrained the D3 physics engine to snap nodes into fixed 300px columns based on their hierarchy (Pillars -> Clusters -> Leaves). Trade-off: Users lose the ability to place notes anywhere they want on an infinite canvas, but the structure remains legible and organized even with hundreds of nodes.",
              image: "/projects/scribe/Key decision 1.webp"
            },
            {
              title: "Client-side storage over cloud databases",
              summary: "Scribe stores all data in the browser using IndexedDB.",
              why: "Trade-off: It prevents easy multi-device syncing out of the box, but it allowed me to bypass complex authentication flows, ship faster, and guarantee 100% privacy for users working with sensitive strategic data.",
              image: "/projects/scribe/Key decision 2.webp"
            },
            {
              title: "Bring-Your-Own-Key (BYOK) for AI features",
              summary: "Instead of charging a subscription for AI credits, users paste in their own OpenAI or Claude keys, or connect to a local Ollama instance.",
              why: "Trade-off: It adds friction to the onboarding process, but it keeps the app free to host and ensures user data isn't being silently scraped by a middleman server.",
              image: "/projects/scribe/Key decision 3.webp"
            }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col gap-6">
              <div className="text-left">
                <h4 className="font-sans font-normal text-[22px] md:text-[26px] leading-tight text-black tracking-tight font-serif mb-3">
                  {idx + 1}. {item.title}
                </h4>
                <p className="font-sans text-[15px] md:text-[16px] leading-relaxed text-black/60 mb-4">
                  {item.summary}
                </p>
                <div className="pl-6 border-l-2 border-black/10">
                  <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest block mb-2 font-sans">Rationale</span>
                  <p className="font-sans text-[14px] leading-relaxed text-black/70 font-light font-sans">
                    {item.why}
                  </p>
                </div>
              </div>
              
              {item.image && (
                <div className={`w-full rounded-sm overflow-hidden border border-gray-100 bg-gray-50 ${
                  idx === 2 ? "max-w-md md:max-w-lg mx-auto border-gray-200 shadow-sm" : ""
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

      {/* EDGE-TO-EDGE BANNER BEFORE WHAT DIDN'T WORK */}
      <section className="w-full my-12 md:my-20 bg-gray-50 border-y border-gray-100 overflow-hidden relative shadow-sm flex items-center justify-center">
        <div 
          onClick={() => setLightboxImage("/projects/scribe/before-what-didnt-work.webp")}
          className="w-full max-w-[1920px] mx-auto aspect-[5776/2624] relative cursor-zoom-in group"
        >
          <Image 
            src="/projects/scribe/before-what-didnt-work.webp" 
            alt="Scribe System Iteration Pre-Physics" 
            fill 
            className="object-contain group-hover:scale-[1.01] transition-transform duration-500 ease-out"
            sizes="100vw"
            quality={85}
          />
        </div>
      </section>

      {/* 5. WHAT DIDN'T WORK SECTION */}
      <section id="friction" className="py-16 md:py-24 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto border-t border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <span className="font-sans font-semibold text-[11px] text-black/40 uppercase tracking-widest block">
              05 / WHAT DIDN'T WORK
            </span>
          </div>
          <div className="md:col-span-8 text-left space-y-4">
            <p className="font-sans font-normal text-[15px] md:text-[16px] leading-relaxed text-black/60 font-sans">
              My first attempt at the "Oracle" view used a standard physics simulation where notes repelled each other. When users tried to drag notes to group them, the physics engine fought back, causing the entire map to constantly jiggle and re-adjust. It was incredibly distracting.
            </p>
            <p className="font-sans font-normal text-[15px] md:text-[16px] leading-relaxed text-black/60 border-l-2 border-black/10 pl-6 italic font-sans">
              I had to rip out the continuous simulation and write a custom collision-detection script that only calculates physics when a node is actively dropped, snapping it to a strict 40px grid.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 w-full">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <div key={num} className="w-full rounded-sm overflow-hidden border border-gray-100 bg-gray-50">
                  <Image src={`/projects/scribe/what-didnt-work-${num}.webp`} alt={`Iteration ${num}`} width={1920} height={1080} className="w-full h-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. OUTCOME SECTION */}
      <section id="outcome" className="py-20 md:py-28 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto border-t border-gray-100">
        <div className="w-full flex justify-between items-baseline mb-12 border-b border-gray-100 pb-4">
          <span className="font-sans font-semibold text-[11px] text-black/40 uppercase tracking-widest">
            06 / RECONSIDERATIONS & OUTCOME
          </span>
        </div>

        <div className="text-left mb-12">
          <h4 className="font-sans font-bold text-[18px] text-black uppercase tracking-wider font-serif mb-6">What I&apos;d Reconsider</h4>
          <div className="space-y-4 font-sans">
            <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-sm">
              <h5 className="text-[13px] font-bold text-black uppercase tracking-wider mb-1">01. Progressive Spatial Disclosure in Graph Density (Design)</h5>
              <p className="text-[14px] text-black/70 leading-relaxed">
                Presenting complex canvas node graphs all at once can induce cognitive overload during initial research reviews. I would refine the visual onboarding by implementing a progressive zoom-disclosure hierarchy that keeps macro strategy clusters clean at wide viewports and reveals individual leaf cards only as the user zooms into specific decision nodes.
              </p>
            </div>
            <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-sm">
              <h5 className="text-[13px] font-bold text-black uppercase tracking-wider mb-1">02. Canvas Render Engine Scalability (WebGL vs. SVG) (Technical)</h5>
              <p className="text-[14px] text-black/70 leading-relaxed">
                While SVG and D3 render crisply for moderate node counts, panning and zooming heavy graph clusters with over 500 interactive elements can introduce frame rate drops. Migrating the core canvas rendering layer to WebGL/Pixi.js would maintain smooth 60fps interaction during large-scale dataset navigation.
              </p>
            </div>
          </div>
        </div>

        {/* Reflection */}
        <div className="p-6 border-l-2 border-black text-left bg-gray-50">
          <span className="font-sans text-[11px] font-bold text-black/40 uppercase tracking-widest block mb-2 font-serif font-sans">Reflection</span>
          <p className="font-sans text-[14px] leading-relaxed text-black/75 font-sans">
            Building a tool that challenges how people write forced me to realize that "Ease of Use" shouldn't always be the primary goal. Scribe has a steeper learning curve than a blank text document, but for mapping out complex strategies, that friction forces better thinking.
          </p>
        </div>
      </section>

      {/* 9. COLLAPSIBLE DEEP PROCESS DRAWER */}
      <section className="py-12 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto flex flex-col items-center">
        <button
          onClick={() => setShowFullProcess(!showFullProcess)}
          className="px-8 py-4 border border-black text-black font-sans text-[12px] uppercase font-bold tracking-wider hover:bg-black hover:text-white transition-all duration-300 rounded-sm cursor-pointer"
        >
          {showFullProcess ? "Hide detailed process" : "See full process"}
        </button>

        {showFullProcess && (
          <div className="w-full mt-12 pt-12 border-t border-gray-100 text-left space-y-16 animate-fadeIn font-sans">
            
            {/* SECTION 1: TECHNICAL STACK & ARCHITECTURE */}
            <div className="space-y-6">
              <span className="text-[10px] font-bold text-[#ef4444] uppercase tracking-widest block">01 / TECHNICAL STACK & ARCHITECTURE</span>
              <h3 className="text-[20px] font-bold text-black uppercase tracking-tight font-sans">Scribe Strategy Engine</h3>
              <p className="text-[14px] text-black/60 leading-relaxed max-w-3xl font-sans">
                Scribe's visual workbench runs entirely client-side using a high-performance database and visual rendering layer. The backend services are decoupled to avoid vendor lock-in.
              </p>
              
              {/* Architecture flow visual */}
              <div className="p-6 bg-gray-50 border border-gray-100 rounded-sm grid grid-cols-1 md:grid-cols-5 gap-4 text-center items-center font-sans">
                <div className="p-4 bg-white border border-gray-200 rounded-sm shadow-sm">
                  <span className="block text-[10px] font-bold text-black/40 uppercase">Input</span>
                  <span className="text-[12px] font-semibold text-black">Raw PRD Text</span>
                </div>
                <div className="text-black/30 font-bold">→</div>
                <div className="p-4 bg-white border border-gray-200 rounded-sm shadow-sm">
                  <span className="block text-[10px] font-bold text-black/40 uppercase">Synthesizer</span>
                  <span className="text-[12px] font-semibold text-black">Two-Pass LLM</span>
                </div>
                <div className="text-black/30 font-bold">→</div>
                <div className="p-4 bg-white border border-gray-200 rounded-sm shadow-sm col-span-1 md:col-span-1">
                  <span className="block text-[10px] font-bold text-black/40 uppercase">Database</span>
                  <span className="text-[12px] font-semibold text-black">Dexie / IndexedDB</span>
                </div>
              </div>

              <div className="space-y-4 max-w-3xl font-sans">
                <h4 className="text-[13px] font-bold text-black uppercase tracking-wider">Two-Pass Systemic Extraction</h4>
                <p className="text-[13px] text-black/60 leading-relaxed">
                  To prevent token limit bottlenecks and ensure stable layouts, the extraction workflow splits synthesis:
                </p>
                <ul className="list-disc pl-5 text-[13px] text-black/60 space-y-2">
                  <li><strong>Pass 1 (Skeleton):</strong> Extracts structural pillars and sub-categorized clusters, pinning them as the blueprint grid coordinates.</li>
                  <li><strong>Pass 2 (Leaves & Cross-links):</strong> Populates clusters with individual leaf insights (risks, opportunities) and builds inter-cluster dependencies without floating node jitter.</li>
                </ul>
              </div>
            </div>

            {/* SECTION 2: LAYOUT CONSTANTS & MATHEMATICS */}
            <div className="space-y-6 pt-12 border-t border-gray-100">
              <span className="text-[10px] font-bold text-[#ef4444] uppercase tracking-widest block">02 / LAYOUT CONSTANTS & SPATIAL MATH</span>
              <h3 className="text-[20px] font-bold text-black uppercase tracking-tight font-sans">Predictable Column Rhythms</h3>
              <p className="text-[14px] text-black/60 leading-relaxed max-w-3xl font-sans">
                Scribe avoids standard force-directed layout algorithms that let nodes drift. It enforces strict columnar math to keep graphs legible at scale:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start font-sans">
                <div className="p-5 bg-neutral-950 rounded text-neutral-300 font-mono text-[12px] space-y-1 shadow-inner">
                  <div className="text-neutral-500 mb-2">// Layout engine configuration constants</div>
                  <div><span className="text-[#ef4444]">const</span> PILLAR_COL_WIDTH = <span className="text-cyan-400">300</span>; <span className="text-neutral-600">// Column width</span></div>
                  <div><span className="text-[#ef4444]">const</span> PILLAR_GAP       = <span className="text-cyan-400">320</span>; <span className="text-neutral-600">// Col separation</span></div>
                  <div><span className="text-[#ef4444]">const</span> PILLAR_TOP_PAD   = <span className="text-cyan-400">100</span>; <span className="text-neutral-600">// Top offset</span></div>
                  <div><span className="text-[#ef4444]">const</span> CLUSTER_GAP      = <span className="text-cyan-400">32</span>;  <span className="text-neutral-600">// Vertical cluster gap</span></div>
                  <div><span className="text-[#ef4444]">const</span> LEAF_HEIGHT      = <span className="text-cyan-400">68</span>;  <span className="text-neutral-600">// Node card height</span></div>
                  <div><span className="text-[#ef4444]">const</span> LEAF_GAP         = <span className="text-cyan-400">10</span>;  <span className="text-neutral-600">// Card gap</span></div>
                </div>
                <div className="space-y-3 text-[13px] text-black/60 leading-relaxed font-sans">
                  <p>
                    By constraining layouts to 300px columns with 320px separation, the workbench prevents overlapping. Users scan columns vertically to understand hierarchy and look horizontally along connection tracks to see dependencies.
                  </p>
                  <p>
                    <strong>D3 Zoom Configuration:</strong> Viewport transforms scale constraint set strictly to <code>[0.04, 4.0]</code>. Saturation filters are applied at <code>backdrop-filter: blur(12px) saturate(180%)</code> on side drawers to isolate active workspace layers.
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION 3: THE UI COLOR SYSTEM */}
            <div className="space-y-6 pt-12 border-t border-gray-100">
              <span className="text-[10px] font-bold text-[#ef4444] uppercase tracking-widest block font-sans">03 / UI COLOR SYSTEM</span>
              <h3 className="text-[20px] font-bold text-black uppercase tracking-tight font-sans font-bold">Strategic Semantic Archetypes</h3>
              <p className="text-[14px] text-black/60 leading-relaxed max-w-3xl font-sans">
                Every node is color-coded by its archetype, making strategic risks, facts, and opportunities scannable instantly:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-sans">
                {[
                  { name: "RISK", color: "#ef4444", desc: "Structural failure points" },
                  { name: "CRITIQUE", color: "#f97316", desc: "Disagreements or assumptions" },
                  { name: "OPPORTUNITY", color: "#22c55e", desc: "Acceleration pathways" },
                  { name: "INSIGHT", color: "#3b82f6", desc: "General strategic learnings" },
                  { name: "FACT", color: "#8b5cf6", desc: "Verified data points and statements" },
                  { name: "QUESTION", color: "#eab308", desc: "Unresolved assumptions or gaps" },
                  { name: "PATH", color: "#06b6d4", desc: "Critical action directions" },
                  { name: "DATA", color: "#94a3b8", desc: "Supporting metric values" }
                ].map((c, i) => (
                  <div key={i} className="p-4 border border-gray-100 rounded-sm bg-gray-50 flex flex-col justify-between min-h-[90px]">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-black uppercase">{c.name}</span>
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                    </div>
                    <p className="text-[11px] text-black/55 mt-2 leading-tight">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 4: ARCHITECTURAL ITERATION DETAILS */}
            <div className="space-y-6 pt-12 border-t border-gray-100 font-sans">
              <span className="text-[10px] font-bold text-[#ef4444] uppercase tracking-widest block font-sans">04 / ARCHITECTURAL ITERATION DETAILS</span>
              <h3 className="text-[20px] font-bold text-black uppercase tracking-tight font-sans">The Information Spaghetti Trap</h3>
              <p className="text-[14px] text-black/60 leading-relaxed max-w-3xl font-sans">
                Early iterations of Scribe's strategy visual canvas relied on standard dynamic force-directed layouts (<code>d3.forceSimulation</code>). While visually impressive, user testing exposed critical performance and cognitive bottlenecks:
              </p>
              <ul className="list-disc pl-5 text-[13px] text-black/60 space-y-2 max-w-3xl font-sans">
                <li><strong>Node Overlaps:</strong> Nodes clustered on top of each other when strategic graphs scaled past 50 items.</li>
                <li><strong>Jittery Reading:</strong> Text labels rotated or drifted during navigation, making scanning and direct reading impossible.</li>
                <li><strong>Context Collapse:</strong> The lack of structural columns made tracing inheritance and logical strategy paths extremely difficult.</li>
              </ul>
              <p className="text-[13px] text-black/60 leading-relaxed max-w-3xl font-sans">
                To fix this, we replaced dynamic physics simulations with the **Columnar Spatial Engine**, pinning the horizontal (<code>x</code>) coordinates of major pillars and clusters while stacking leaf cards vertically. This stabilized coordinates, locked cards to snap grids, and significantly reduced the cognitive load.
              </p>
            </div>

            {/* SECTION 5: SCREENSHOTS & WORKBENCH */}
            <div className="space-y-6 pt-12 border-t border-gray-100">
              <span className="text-[10px] font-bold text-[#ef4444] uppercase tracking-widest block font-sans">05 / INTERFACE GALLERY</span>
              <h3 className="text-[20px] font-bold text-black uppercase tracking-tight font-sans">Detailed Interface & Screenshots</h3>
              <p className="text-[14px] text-black/60 leading-relaxed max-w-3xl font-sans">
                Exploring the Scribe interface across different layouts, note editor sidebars, and thematic HUD styles designed for deep working focus.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
                <div 
                  onClick={() => setLightboxImage("/projects/scribe/Scribe- graph light theme.webp")}
                  className="relative aspect-video border border-gray-100 rounded overflow-hidden bg-gray-50 cursor-zoom-in group"
                >
                  <Image src="/projects/scribe/Scribe- graph light theme.webp" alt="Light Theme Graph" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[12px] font-semibold text-white uppercase bg-black/60 px-3 py-1 rounded">Click to expand</span>
                  </div>
                </div>

                <div 
                  onClick={() => setLightboxImage("/projects/scribe/Scribe- graph dark theme.webp")}
                  className="relative aspect-video border border-gray-100 rounded overflow-hidden bg-gray-50 cursor-zoom-in group"
                >
                  <Image src="/projects/scribe/Scribe- graph dark theme.webp" alt="Dark Theme Graph" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[12px] font-semibold text-white uppercase bg-black/60 px-3 py-1 rounded">Click to expand</span>
                  </div>
                </div>

                <div 
                  onClick={() => setLightboxImage("/projects/scribe/Scribe- home- dark.webp")}
                  className="relative aspect-video border border-gray-100 rounded overflow-hidden bg-gray-50 cursor-zoom-in group"
                >
                  <Image src="/projects/scribe/Scribe- home- dark.webp" alt="Scribe Home Screen" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[12px] font-semibold text-white uppercase bg-black/60 px-3 py-1 rounded">Click to expand</span>
                  </div>
                </div>

                <div 
                  onClick={() => setLightboxImage("/projects/scribe/Scribe-note editor.webp")}
                  className="relative aspect-video border border-gray-100 rounded overflow-hidden bg-gray-50 cursor-zoom-in group"
                >
                  <Image src="/projects/scribe/Scribe-note editor.webp" alt="Note Editor Workbench" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[12px] font-semibold text-white uppercase bg-black/60 px-3 py-1 rounded">Click to expand</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 10. FOOTER NAVIGATION */}
      <CaseStudyFooter nextProject={{ name: "Campus Trace", href: "/projects/campus-trace" }} />
    </main>
  );
}
