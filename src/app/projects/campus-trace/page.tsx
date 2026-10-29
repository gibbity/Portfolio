"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import CaseStudyNav from "@/components/case-study/CaseStudyNav";
import CaseStudyFooter from "@/components/case-study/CaseStudyFooter";
import HoverVideoThumbnail from "@/components/case-study/HoverVideoThumbnail";

const sections = [
  { id: "intro", label: "Overview" },
  { id: "origin", label: "The Origin" },
  { id: "hook", label: "The Core Tension" },
  { id: "context", label: "Context & Scope" },
  { id: "decisions", label: "Key Decisions" },
  { id: "admin-system", label: "Admin Experience" },
  { id: "friction", label: "Design Failures" },
  { id: "outcome", label: "Outcome & Learnings" },
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

      {/* Case Study Nav */}
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
        <div className="w-[1.5px] h-52 bg-white/10 relative flex flex-col justify-between items-center py-1">
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

      {/* 1. HERO SECTION */}
      <section id="intro" className="relative w-full pt-36 sm:pt-40 md:pt-48 pb-20 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto text-left">
        
        {/* Title */}
        <h1 className="font-serif text-[42px] sm:text-[56px] md:text-[72px] lg:text-[84px] leading-[1.08] tracking-tight text-white font-normal">
          Campus Trace: <span className="italic font-serif text-white/85">a live map to report broken things on campus</span>
        </h1>

        {/* Metadata Pill Chips */}
        <div className="flex flex-wrap items-center gap-3 mt-8">
          <span className="text-[12px] md:text-[13px] font-sans font-medium text-white/70 uppercase tracking-wider">
            Product Designer &amp; Full-Stack Developer
          </span>
          <span className="text-white/30">•</span>
          <span className="text-[12px] md:text-[13px] font-sans font-medium text-white/70 uppercase tracking-wider">
            VIT Vellore Pilot (48-Hr Run)
          </span>
          <span className="text-white/30">•</span>
          <span className="text-[12px] md:text-[13px] font-sans font-medium text-white/70 uppercase tracking-wider">
            MapLibre · Supabase · Gemini
          </span>
        </div>

        {/* Framing Sentence */}
        <p className="mt-6 text-[17px] md:text-[19px] font-sans text-white/75 leading-relaxed max-w-3xl">
          A lightweight geospatial tool piloted with 40 students to test whether low-friction map pins and AI clustering could turn disjointed campus complaints into actionable maintenance hotspots.
        </p>

        {/* Hero Visual Thumbnail & Hover Video */}
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
              Skip to pilot outcome →
            </button>
          </div>
          <span className="font-sans text-[12px] text-white/40">
            4 min read • 60 sec skim
          </span>
        </div>
      </section>

      {/* 2. THE ORIGIN STORY */}
      <section id="origin" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto border-t border-white/10 text-left">
        <div className="mb-8">
          <span className="text-[12px] font-sans font-bold uppercase tracking-[0.25em] text-white/40">
            01 / THE ORIGIN
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-start mb-12">
          <div className="md:col-span-5">
            <h2 className="font-serif text-[32px] sm:text-[40px] md:text-[46px] leading-[1.15] text-white tracking-tight font-normal">
              Born in Mobility Design class: <span className="italic">when interviews and shadowing weren&apos;t enough.</span>
            </h2>
          </div>
          <div className="md:col-span-7 space-y-4 font-sans text-[16px] md:text-[17px] leading-[1.7] text-white/70">
            <p>
              During a Mobility Design studio at VIT Vellore, our brief was straightforward: identify pedestrian and transit friction across campus to propose a new mobility solution. Like any standard design project, we began with traditional user research—conducting structured 1-on-1 student interviews and shadowing classmates on their daily walks.
            </p>
            <p>
              Very quickly, I felt something fundamental was missing from that methodology:
            </p>
          </div>
        </div>

        {/* Two Breakdowns of Why Traditional UX Research Failed Here */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
          <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-2">
            <span className="text-[11px] font-bold text-[#00B4D8] uppercase tracking-wider block">01 · Recall Bias in Interviews</span>
            <h4 className="text-[16px] font-semibold text-white">Students Forget Friction Once They Arrive</h4>
            <p className="text-[13px] text-white/60 leading-relaxed">
              When sitting comfortably in a classroom answering interview questions, students overlook the cracked pavement curb, the unlit stairwell, or the flooded pathway they navigated two days earlier. Friction is felt acutely in the moment, but fades from memory within minutes of reaching your destination.
            </p>
          </div>

          <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-2">
            <span className="text-[11px] font-bold text-[#00B4D8] uppercase tracking-wider block">02 · Scale Limits of Shadowing</span>
            <h4 className="text-[16px] font-semibold text-white">One Shadow Misses 30,000 Students Moving</h4>
            <p className="text-[13px] text-white/60 leading-relaxed">
              Shadowing gave rich empathy for two specific student commutes, but zero visibility into emergent systemic bottlenecks. On a massive 350-acre campus with 10-minute passing bells, bottlenecks form dynamically across dozens of corridors simultaneously. A single researcher with a notepad cannot observe a campus.
            </p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-neutral-900/60 border-l-2 border-[#00B4D8] rounded-r-xl font-sans text-[15px] md:text-[16px] text-white/80 leading-relaxed">
          <strong className="text-white">The Realization:</strong> Research had to be situated, continuous, and spatial. Instead of asking students to recall problems after the fact, what if we gave them a tool to drop a pin the exact second they encountered a barrier? That gap in design methodology is what sparked CampusTrace.
        </div>
      </section>

      {/* 3. THE CORE TENSION (HOOK & PROBLEM) */}
      <section id="hook" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto border-t border-white/10 text-left">
        <div className="mb-8">
          <span className="text-[12px] font-sans font-bold uppercase tracking-[0.25em] text-white/40">
            02 / THE CORE TENSION
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-start">
          <div className="md:col-span-5">
            <h2 className="font-serif text-[32px] sm:text-[40px] md:text-[46px] leading-[1.15] text-white tracking-tight font-normal">
              Students didn&apos;t lack concern; <span className="italic">multi-field ticketing forms created instant abandonment.</span>
            </h2>
          </div>
          <div className="md:col-span-7 space-y-4 font-sans text-[16px] md:text-[17px] leading-[1.7] text-white/70">
            <p>
              Standard university portals require students to navigate deep classification trees (e.g., <code className="text-white/90 bg-white/10 px-1.5 py-0.5 rounded text-[13px]">Facilities &gt; Exterior &gt; Electrical &gt; Fixture ID</code>) before reporting an issue. In hallway testing with 6 students on the existing portal, 5 abandoned the form midway. To capture friction during 5-minute passing breaks, reporting had to drop to seconds: tap the map, drag to verify, and type one sentence.
            </p>
            <p>
              For administration, the problem was the inverse: receiving 100 isolated points of &quot;broken light&quot; produces triage fatigue. Naive geometric radius clustering groups unrelated issues (e.g., an exposed wire and an overflowing bin within 20 meters) into meaningless circular blobs. Coordinators needed semantic grouping: identifying which complaints reflect the same underlying structural failure and which require urgent dispatch.
            </p>
          </div>
        </div>

        {/* Looping Campus Context Video */}
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

      {/* 4. CONTEXT & SPECS BENTO */}
      <section id="context" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto border-t border-white/10 text-left">
        <div className="mb-8">
          <span className="text-[12px] font-sans font-bold uppercase tracking-[0.25em] text-white/40">
            03 / CONTEXT &amp; SCOPE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-start mb-12">
          <div className="md:col-span-5">
            <p className="font-serif text-[28px] sm:text-[34px] md:text-[40px] leading-[1.18] text-white font-normal">
              A focused campus pilot testing <span className="italic">submission speed versus administrative triage quality.</span>
            </p>
          </div>
          <div className="md:col-span-7 space-y-4 font-sans text-[16px] md:text-[17px] leading-[1.7] text-white/70">
            <p>
              As the solo product designer and developer, I owned the problem end-to-end: student field interviews, interaction and cartographic design, full-stack implementation, and LLM prompt engineering.
            </p>
            <p>
              The pilot was deliberately scoped: run over a 48-hour window across an engineering academic quad and primary pedestrian corridor at VIT Vellore with ~40 student participants to test the real-world reporting loop before proposing institutional integration.
            </p>
          </div>
        </div>

        {/* Clean Bento Specs Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 font-sans">
          <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
            <span className="text-[11px] font-bold text-white/40 uppercase tracking-wider block mb-1">My Role</span>
            <span className="text-[15px] font-medium text-white block">Product Designer &amp; Developer</span>
            <span className="text-[12px] text-white/50 mt-1 block">Full design ownership &amp; full-stack code</span>
          </div>
          <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
            <span className="text-[11px] font-bold text-white/40 uppercase tracking-wider block mb-1">Pilot Scope</span>
            <span className="text-[15px] font-medium text-white block">48-Hour Controlled Run</span>
            <span className="text-[12px] text-white/50 mt-1 block">~40 students · Engineering block corridor</span>
          </div>
          <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
            <span className="text-[11px] font-bold text-white/40 uppercase tracking-wider block mb-1">Tech Stack</span>
            <span className="text-[15px] font-medium text-white block">React 18 · MapLibre · Supabase</span>
            <span className="text-[12px] text-white/50 mt-1 block">Google Gemini 3.1 Flash Lite API</span>
          </div>
        </div>
      </section>

      {/* 5. KEY DECISIONS */}
      <section id="decisions" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto border-t border-white/10 text-left">
        <div className="mb-14">
          <span className="text-[12px] font-sans font-bold uppercase tracking-[0.25em] text-white/40">
            04 / KEY DECISIONS
          </span>
        </div>

        <div className="space-y-20">
          {[
            {
              index: "DECISION 1/4 — INTERACTION DESIGN",
              title: "Two-Step Drag-and-Confirm Pinning",
              subtitle: "eliminating accidental submissions while cutting reporting time from 90s to under 15s",
              summary: "Replaced instant-tap submissions with a two-step gesture: dropping a provisional marker, dragging fluidly to calibrate exact spatial placement, and tapping to confirm with a single optional description. Paired with high-contrast tactile styling to make the interface feel approachable on mobile.",
              why: "Observed Impact: In timed hallway testing with 6 students, average completion dropped from ~90 seconds on the university's 8-field form to under 15 seconds on CampusTrace, with zero misplaced submissions from errant finger taps.",
              tradeoff: "Trade-off: The two-step confirmation adds an intentional extra click, and neo-brutalist custom styling required custom SVG offsets and heavier CSS classes compared to off-the-shelf component libraries.",
              image: "/projects/campus-trace/key-decision-1.webp"
            },
            {
              index: "DECISION 2/4 — SPATIAL ARCHITECTURE",
              title: "Client-Side Vector Cartography via MapLibre",
              subtitle: "preserving 60fps pan/zoom interaction without database bottlenecks",
              summary: "Stripped complex commercial map tiles down to a custom high-contrast monochrome canvas (white pedestrian ways, muted building outlines, zero commercial clutter) rendered entirely in client-side WebGL.",
              why: "Rationale: Handled pin clustering and viewport transformations on the client GPU, ensuring buttery 60fps exploration without querying Supabase on every pan or zoom during campus rush hours.",
              tradeoff: "Trade-off: Offloading geometry calculations to the client increased the initial JavaScript bundle and raised GPU memory consumption on budget student Android devices.",
              image: "/projects/campus-trace/key-decision-2.webp"
            },
            {
              index: "DECISION 3/4 — GEOSPATIAL GEOMETRY",
              title: "Organic Enclosures via 2D Convex Hull",
              subtitle: "tracing physical walkway geometry instead of artificial circular buffers",
              summary: "Implemented a 2D Graham Scan Convex Hull algorithm to wrap clustered reports in organic bounding polygons matching actual campus pathways.",
              why: "Rationale: University infrastructure is linear and irregular—covered corridors, paved ramps, and courtyards follow physical architectural contours. Circular buffers spill into adjacent lawns and unrelated buildings; organic hulls show coordinators the true spatial footprint of the issue.",
              tradeoff: "Trade-off: Requires at least 3 spatial points to calculate an organic polygon; fallback geometry (circles for 1 report, line capsules for 2 reports) still had to be maintained for sparse data.",
              image: "/projects/campus-trace/key-decision-3.webp",
              compactImage: true
            },
            {
              index: "DECISION 4/4 — AI & TRUST UX",
              title: "Auditable AI: The Ground-Truth Verification Layer",
              subtitle: "giving coordinators transparent drill-downs and manual override authority",
              summary: "Designed an administrative verification bridge where AI-synthesized hotspots are never treated as unassailable facts. Every synthesized hotspot card displays the exact underlying report count and direct backlinks to raw student submissions.",
              why: "Rationale: Facilities coordinators cannot dispatch maintenance crews on generative prose alone. If the LLM groups reports inaccurately or hallucinates an urgent hazard, the coordinator must have the tools to audit raw student text, adjust boundaries, merge clusters, or dismiss erroneous reports before signing off on work orders.",
              tradeoff: "Trade-off: Human-in-the-loop verification introduces review friction—coordinators must actively validate synthesis before action—and LLM inference introduces a 2–3 second latency when generating synthesized hotspots.",
              image: "/projects/campus-trace/campus-trace-ui.webp"
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
                  <div className="pl-5 border-l-2 border-white/15 space-y-2">
                    <div>
                      <span className="text-[11px] font-bold text-white/40 uppercase tracking-widest block mb-1">
                        Rationale &amp; Evidence
                      </span>
                      <p className="text-[14px] md:text-[15px] text-white/80 leading-relaxed">
                        {item.why}
                      </p>
                    </div>
                    {item.tradeoff && (
                      <div className="pt-2">
                        <span className="text-[11px] font-bold text-[#00B4D8] uppercase tracking-widest block mb-1">
                          Real-World Trade-Off
                        </span>
                        <p className="text-[14px] md:text-[15px] text-white/70 leading-relaxed">
                          {item.tradeoff}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Image Display */}
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

      {/* 6. ADMIN EXPERIENCE & VISUAL DUALITY */}
      <section id="admin-system" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto border-t border-white/10 text-left">
        <div className="mb-8">
          <span className="text-[12px] font-sans font-bold uppercase tracking-[0.25em] text-white/40">
            05 / ADMIN EXPERIENCE &amp; DUAL VISUAL LANGUAGE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-start mb-12">
          <div className="md:col-span-5">
            <h3 className="font-serif text-[28px] sm:text-[34px] md:text-[40px] leading-[1.18] text-white font-normal">
              Designing for two opposite mentalities: <span className="italic">student agility versus administrative accountability.</span>
            </h3>
          </div>
          <div className="md:col-span-7 space-y-4 font-sans text-[16px] md:text-[17px] leading-[1.7] text-white/70">
            <p>
              The product required two completely different design languages for its two user groups:
            </p>
            <p>
              <strong className="text-white">Student Experience (Tactile Neo-Brutalism):</strong> Uses soft pastel category chips, thick offset borders, and friendly microcopy. Students are reporting between classes; any hint of a corporate form creates friction. The aesthetic lowers perceived stakes and invites quick participation.
            </p>
            <p>
              <strong className="text-white">Administrative Cockpit (High-Density Monospace Dashboard):</strong> Shifted to a disciplined dark-mode operations console with monospace coordinate tags, severity rank badges, and structured audit tables. Coordinators manage physical labor, budget allocation, and safety liabilities; a playful aesthetic here would undermine credibility and slow down rapid data scanning.
            </p>
          </div>
        </div>

        {/* Annotated Admin Dashboard Visual */}
        <div className="mt-8 rounded-xl overflow-hidden border border-white/10 bg-neutral-900 shadow-md">
          <Image
            src="/projects/campus-trace/admin-page.webp"
            alt="CampusTrace Administrative Triage Cockpit"
            width={1920}
            height={1080}
            className="w-full h-auto object-contain"
          />
        </div>

        {/* 4 Feature Pillars of the Admin Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8 font-sans">
          <div className="p-5 bg-white/5 border border-white/10 rounded-xl space-y-1.5">
            <span className="text-[10px] font-bold text-[#00B4D8] uppercase tracking-wider block">01 · Prioritized Queue</span>
            <h5 className="text-[14px] font-semibold text-white">Severity-Weighted Hotspots</h5>
            <p className="text-[12px] text-white/60 leading-relaxed">
              Synthesized clusters ranked by hazard urgency and report volume rather than chronological order.
            </p>
          </div>

          <div className="p-5 bg-white/5 border border-white/10 rounded-xl space-y-1.5">
            <span className="text-[10px] font-bold text-[#00B4D8] uppercase tracking-wider block">02 · Spatial Isolation</span>
            <h5 className="text-[14px] font-semibold text-white">Dynamic Hull Focus</h5>
            <p className="text-[12px] text-white/60 leading-relaxed">
              Clicking any hotspot snaps the camera and isolates its organic perimeter on the campus map canvas.
            </p>
          </div>

          <div className="p-5 bg-white/5 border border-white/10 rounded-xl space-y-1.5">
            <span className="text-[10px] font-bold text-[#00B4D8] uppercase tracking-wider block">03 · Evidence Inspector</span>
            <h5 className="text-[14px] font-semibold text-white">Raw Report Audit Trail</h5>
            <p className="text-[12px] text-white/60 leading-relaxed">
              Inspect student quotes, exact pin coordinates, and submission timestamps bundled inside each AI cluster.
            </p>
          </div>

          <div className="p-5 bg-white/5 border border-white/10 rounded-xl space-y-1.5">
            <span className="text-[10px] font-bold text-[#00B4D8] uppercase tracking-wider block">04 · Human Override</span>
            <h5 className="text-[14px] font-semibold text-white">Manual Merge &amp; Dismiss</h5>
            <p className="text-[12px] text-white/60 leading-relaxed">
              Coordinators can detach misclassified pins, merge adjacent clusters, or dismiss erroneous hallucinated flags.
            </p>
          </div>
        </div>
      </section>

      {/* 7. WHAT DIDN'T WORK: DESIGN FAILURES & PIVOTS */}
      <section id="friction" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto border-t border-white/10 text-left">
        <div className="mb-8">
          <span className="text-[12px] font-sans font-bold uppercase tracking-[0.25em] text-white/40">
            06 / WHAT DIDN&apos;T WORK: DESIGN FAILURES &amp; PIVOTS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-start mb-12">
          <div className="md:col-span-5">
            <h3 className="font-serif text-[28px] sm:text-[34px] md:text-[38px] leading-[1.18] text-white font-normal">
              Three critical design assumptions that <span className="italic">collapsed in user testing.</span>
            </h3>
          </div>
          <div className="md:col-span-7 font-sans text-[16px] md:text-[17px] leading-[1.7] text-white/70">
            <p>
              The final product look emerged from abandoning initial designs that either created excessive cognitive friction for students or left administrators with un-actionable noise.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
          <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-2">
            <span className="text-[11px] font-bold text-[#00B4D8] uppercase tracking-wider block">01 // The Cascading Dropdown Trap</span>
            <h4 className="text-[15px] font-bold text-white">Flow Iteration &amp; Step Elimination</h4>
            <p className="text-[13px] text-white/60 leading-relaxed">
              Initial prototypes forced students to pick Category &gt; Subcategory &gt; Urgency before unlocking the map pin. Testers frequently miscategorized ambiguous issues (e.g., is a broken curb &quot;Pavement&quot; or &quot;Accessibility&quot;?) and dropped off. I eliminated the upfront form entirely, cutting the flow down to a single map-drop and letting backend AI extract categories from freeform text.
            </p>
          </div>

          <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-2">
            <span className="text-[11px] font-bold text-[#00B4D8] uppercase tracking-wider block">02 // The &quot;Global Confetti&quot; Overload</span>
            <h4 className="text-[15px] font-bold text-white">Defaulting to Private Map State</h4>
            <p className="text-[13px] text-white/60 leading-relaxed">
              The first build rendered all active campus pins immediately upon loading. With even 20 pins, the central pedestrian walkway turned into visual confetti; students couldn&apos;t distinguish their own pending submissions from existing issues. I inverted the default state to a clean personal view showing only the user&apos;s reports, adding an explicit &quot;Global View&quot; toggle.
            </p>
          </div>

          <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-2">
            <span className="text-[11px] font-bold text-[#00B4D8] uppercase tracking-wider block">03 // The Flat Admin Map</span>
            <h4 className="text-[15px] font-bold text-white">Rebuilding Triage Hierarchy</h4>
            <p className="text-[13px] text-white/60 leading-relaxed">
              The initial coordinator interface was an unfiltered map with colored dots. Facilities coordinators found it unusable because it lacked a clear starting point—they had to click individual pins across campus to guess severity. I redesigned the admin experience into a split cockpit: prioritized list of clusters on the left, synchronized spatial hull focus on the right.
            </p>
          </div>
        </div>
      </section>

      {/* 8. OUTCOME & HONEST REFLECTIONS */}
      <section id="outcome" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto border-t border-white/10 text-left">
        <div className="mb-10">
          <span className="text-[12px] font-sans font-bold uppercase tracking-[0.25em] text-white/40">
            07 / OUTCOME &amp; HONEST REFLECTIONS
          </span>
        </div>

        {/* Narrative Outcome */}
        <div className="space-y-6 mb-12">
          <p className="font-serif text-[24px] sm:text-[28px] md:text-[34px] leading-snug text-white font-normal">
            During the 48-hour pilot, the app captured 33 individual friction reports, which Gemini synthesized into 25 hotspots. <span className="italic text-white/80">Here is the candid reality of what the data revealed.</span>
          </p>
        </div>

        {/* Honest Breakdown Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans mb-16">
          <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-2">
            <span className="text-[11px] font-bold text-[#00B4D8] uppercase tracking-wider block">The Clustering Reality</span>
            <h4 className="text-[15px] font-bold text-white">Too Sparse For Heavy Compression</h4>
            <p className="text-[13px] text-white/60 leading-relaxed">
              33 reports becoming 25 hotspots means the AI achieved near 1:1 grouping (~1.3:1 ratio). In a small 48-hour pilot distributed across a 400m quad, issues were largely isolated. The AI accurately merged directly overlapping reports (e.g., broken path lighting at the pedestrian underpass), but high data density is a prerequisite for clustering to provide transformative value.
            </p>
          </div>

          <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-2">
            <span className="text-[11px] font-bold text-[#00B4D8] uppercase tracking-wider block">Prompting Trade-Off</span>
            <h4 className="text-[15px] font-bold text-white">Artificial Output Quotas</h4>
            <p className="text-[13px] text-white/60 leading-relaxed">
              To prevent Gemini from over-consolidating all campus issues into 2 or 3 generic buckets, the system prompt programmatically targeted 25 granular bottlenecks. While effective at forcing specificity, this artificial quota inflated the hotspot count when total report volume was low.
            </p>
          </div>

          <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-2">
            <span className="text-[11px] font-bold text-[#00B4D8] uppercase tracking-wider block">Administrative Reality</span>
            <h4 className="text-[15px] font-bold text-white">The Digital-to-SLA Disconnect</h4>
            <p className="text-[13px] text-white/60 leading-relaxed">
              While the pilot proved students would report issues when forms were eliminated, zero reports were officially actioned by university facilities during the trial. Campus maintenance operates on paper work orders and central registrar sign-offs; without direct SLA integration into their existing maintenance workflow, a digital dashboard remains an isolated silo.
            </p>
          </div>
        </div>

        {/* 2 Deep UX Reflections with Mobile UI Image */}
        <div className="space-y-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-8 border-t border-white/10">
            <div className="md:col-span-6 space-y-3 font-sans">
              <span className="text-[11px] font-bold text-[#00B4D8] uppercase tracking-wider block">UX REFLECTION 01</span>
              <h4 className="font-serif text-[24px] text-white font-normal">Mobile Viewport Gesture Collisions</h4>
              <p className="text-[14px] text-white/70 leading-relaxed">
                Testing on sub-6-inch mobile screens revealed severe gesture conflict: simultaneous overlays of floating telemetry cards, bottom issue sheets, and map controls caused user gestures to collide. Attempting to drag the map frequently dragged open the report bottom sheet instead.
              </p>
              <p className="text-[13px] text-white/60 leading-relaxed">
                <strong className="text-white">Design Lesson:</strong> Spatial mobile experiences cannot stack persistent exploration and detailed inspection simultaneously. They require strict modal separation—a pure &quot;Map Navigation&quot; mode that collapses all chrome, transitioning into an &quot;Inspect Details&quot; drawer only upon explicit pin selection.
              </p>
            </div>
            <div className="md:col-span-6 rounded-xl overflow-hidden border border-white/10 bg-neutral-900 shadow-md">
              <Image
                src="/projects/campus-trace/campus-trace-mobileui.webp"
                alt="CampusTrace Mobile UI Hierarchy"
                width={2560}
                height={1533}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-2 font-sans pt-6">
            <span className="text-[11px] font-bold text-[#00B4D8] uppercase tracking-wider block">PRODUCT REFLECTION 02</span>
            <h4 className="text-[16px] font-bold text-white">The Institution Is the Real Design Problem</h4>
            <p className="text-[13px] text-white/70 leading-relaxed">
              Building a responsive WebGL map and hooking up an LLM was the straightforward half of the challenge. The real design problem is organizational: university facilities teams do not sit in front of interactive web dashboards. In any future deployment, the highest-leverage design decision would not be a better map, but an automated dispatch bot that converts approved hotspots into WhatsApp or SMS work orders directly sent to on-duty ground maintenance crews.
            </p>
          </div>
        </div>

      </section>

      {/* 9. COLLAPSIBLE PROCESS & ARCHITECTURE APPENDIX */}
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
              <span className="text-[11px] font-bold text-[#00B4D8] uppercase tracking-widest block">01 / TECHNICAL STACK &amp; DATA FLOW</span>
              <h3 className="font-serif text-[26px] text-white font-normal">Geospatial Sync &amp; Synthesized Output</h3>
              <p className="text-[14px] md:text-[15px] text-white/70 leading-relaxed max-w-3xl">
                CampusTrace pairs client-side MapLibre GL rendering with Supabase PostgreSQL and Google Gemini 3.1 Flash Lite. Data flow enforces strict Row Level Security (RLS) policies so students only view their own reports by default.
              </p>

              <div className="p-5 bg-white/5 border border-white/10 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-4 text-center items-center">
                <div className="p-4 bg-neutral-900 border border-white/10 rounded-lg shadow-2xs">
                  <span className="block text-[10px] font-bold text-white/40 uppercase">Student</span>
                  <span className="text-[13px] font-semibold text-white">Tap-Drag-Confirm Pin</span>
                </div>
                <div className="p-4 bg-neutral-900 border border-white/10 rounded-lg shadow-2xs">
                  <span className="block text-[10px] font-bold text-white/40 uppercase">Database</span>
                  <span className="text-[13px] font-semibold text-white">Supabase Reports Table (RLS)</span>
                </div>
                <div className="p-4 bg-neutral-900 border border-white/10 rounded-lg shadow-2xs">
                  <span className="block text-[10px] font-bold text-white/40 uppercase">AI Analyst</span>
                  <span className="text-[13px] font-semibold text-white">Gemini 3.1 Structured Hotspots</span>
                </div>
              </div>
            </div>

            {/* SECTION 2: CONVEX HULL MATH */}
            <div className="space-y-5 pt-8 border-t border-white/10">
              <span className="text-[11px] font-bold text-[#00B4D8] uppercase tracking-widest block">02 / SPATIAL GEOMETRY</span>
              <h3 className="font-serif text-[26px] text-white font-normal">Convex Hull Algorithmic Boundaries</h3>
              <div className="p-5 bg-neutral-950 rounded-xl text-neutral-300 font-mono text-[12px] space-y-1.5 shadow-inner overflow-x-auto max-w-2xl">
                <div className="text-neutral-500 mb-1">// Graham Scan 2D Convex Hull implementation</div>
                <div><span className="text-red-400">const</span> getConvexHull = (points) =&gt; &#123;</div>
                <div className="pl-4">if (points.length &lt;= 2) return points;</div>
                <div className="pl-4">const sorted = points.slice().sort((a, b) =&gt; a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]);</div>
                <div className="pl-4">const crossProduct = (o, a, b) =&gt; (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);</div>
                <div className="pl-4">const lower = [];</div>
                <div className="pl-4">for (let p of sorted) &#123;</div>
                <div className="pl-8">while (lower.length &gt;= 2 &amp;&amp; crossProduct(lower[lower.length - 2], lower[lower.length - 1], p) &lt;= 0) lower.pop();</div>
                <div className="pl-8">lower.push(p);</div>
                <div className="pl-4">&#125;</div>
                <div className="pl-4">return lower;</div>
                <div>&#125;;</div>
              </div>
            </div>

            {/* SECTION 3: STRUCTURED OUTPUT SCHEMA */}
            <div className="space-y-5 pt-8 border-t border-white/10">
              <span className="text-[11px] font-bold text-[#00B4D8] uppercase tracking-widest block">03 / AI OUTPUT VALIDATION</span>
              <h3 className="font-serif text-[26px] text-white font-normal">Auditable Structured JSON Schema</h3>
              <p className="text-[13px] text-white/70 leading-relaxed max-w-2xl">
                Gemini was coerced via structured system prompting to bind every synthesized issue back to individual database IDs, enabling one-click auditability by coordinators:
              </p>
              <div className="p-5 bg-neutral-950 rounded-xl text-neutral-300 font-mono text-[12px] space-y-1 shadow-inner overflow-x-auto max-w-2xl">
                <div>&#123;</div>
                <div className="pl-4 text-[#00B4D8]">&quot;hotspots&quot;: [</div>
                <div className="pl-8">&#123;</div>
                <div className="pl-12">&quot;title&quot;: &quot;Pedestrian Crossing Lighting Hazard&quot;,</div>
                <div className="pl-12">&quot;summary&quot;: &quot;Unlit pathway adjacent to Technology Tower creates collision risk.&quot;,</div>
                <div className="pl-12">&quot;severity&quot;: 4,</div>
                <div className="pl-12 text-yellow-400">&quot;reportIds&quot;: [&quot;rep_102&quot;, &quot;rep_108&quot;, &quot;rep_114&quot;]</div>
                <div className="pl-8">&#125;</div>
                <div className="pl-4">]</div>
                <div>&#125;</div>
              </div>
            </div>

          </div>
        )}
      </section>

      {/* 10. MINIMALIST FOOTER */}
      <CaseStudyFooter nextProject={{ name: "Open Component Studio", href: "/projects/open-component-studio" }} theme="dark" />
    </main>
  );
}
