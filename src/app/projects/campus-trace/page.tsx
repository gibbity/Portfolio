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

export default function CampusTracePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Section definitions for Side Progress Rail & Wayfinding
  const sections = [
    { id: "intro", label: "Hook" },
    { id: "context", label: "Context" },
    { id: "problem", label: "The Real Problem" },
    { id: "decisions", label: "Key Decisions" },
    { id: "friction", label: "What Didn't Work" },
    { id: "outcome", label: "Outcome" }
  ];

  const [activeSection, setActiveSection] = useState("intro");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [showFullProcess, setShowFullProcess] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [expandedDecision, setExpandedDecision] = useState<number | null>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const rafId = requestAnimationFrame(() => {
      const ctx = gsap.context(() => {
        // Staggered reveals
        gsap.utils.toArray(".reveal").forEach((el: any) => {
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
        gsap.utils.toArray(".parallax-index").forEach((el: any) => {
          gsap.to(el, {
            y: -80,
            opacity: 0.05,
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

  return (
    <main ref={containerRef} className="relative z-10 min-h-screen bg-[#050505] font-sans text-white selection:bg-[#00B4D8] selection:text-white pb-32 overflow-x-hidden">

      {/* Scroll Progress Bar */}
      <div
        style={{ width: `${scrollProgress}%` }}
        className="fixed top-0 left-0 h-[2px] bg-[#00B4D8] z-50 transition-all duration-75"
      />

      {/* Case Study Nav */}
      <CaseStudyNav projectTitle="Campus Trace" category="Geospatial Intelligence Map" />

      {/* LIVE SECTION LABEL (Wayfinding) */}
      <div className="fixed top-24 left-6 md:left-12 lg:left-16 hidden md:block z-30 pointer-events-none">
        <span className="font-sans font-medium text-[10px] text-white/30 uppercase tracking-[0.2em] block font-sans">
          Current Section
        </span>
        <span className="font-sans font-semibold text-[12px] text-white uppercase tracking-wider block mt-1 transition-all duration-300 font-sans">
          {sections.find(s => s.id === activeSection)?.label || "Hook"}
        </span>
      </div>

      {/* SIDE PROGRESS SPINE RAIL (Wayfinding) */}
      <div className="fixed right-6 md:right-12 lg:right-16 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-5 items-center z-30">
        <div className="w-[1.5px] h-36 bg-white/10 relative flex flex-col justify-between items-center py-2">
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => handleJumpToSection(sec.id)}
                title={sec.label}
                className={`w-2 h-2 rounded-full border transition-all duration-300 ${isActive
                    ? "bg-[#00B4D8] border-[#00B4D8] scale-125"
                    : "bg-[#050505] border-white/20 hover:border-white"
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
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center cursor-zoom-out p-6"
        >
          <div className="relative w-full max-w-5xl h-[85vh]">
            <Image
              src={lightboxImage}
              alt="Zoomed Graphic View"
              fill
              className="object-contain"
            />
          </div>
          <span className="absolute top-8 right-8 font-sans text-white/50 text-[12px] uppercase tracking-widest">
            Click anywhere to close
          </span>
        </div>
      )}

      <CaseStudyHero
        title="Campus Trace"
        subtitle="Visualizing Mobility Friction"
        description="A high-density collaborative map clustering hundreds of scattered reports into structured, high-severity mobility hotspots for campus planners."
        meta={{
          "Role": "Solo Designer & Developer",
          "Timeline": "2024",
          "Impact": "VIT Vellore Pilot",
          "Backend": "React / MapLibre / Supabase",
          "Poster": "/projects/campus-trace/hero.png"
        }}
        media={{
          type: "video",
          src: "/projects/campus-trace/camp-finale.mp4"
        }}
        theme="dark"
        fullMedia={true}
      />

      {/* 1. THE HOOK */}
      <section id="intro" className="py-16 md:py-24 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto border-t border-white/10 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <span className="font-sans font-semibold text-[11px] text-white/40 uppercase tracking-widest block font-sans">
              01 / THE HOOK
            </span>
          </div>
          <div className="md:col-span-8 text-left space-y-6">
            <h3 className="font-sans font-normal text-[26px] md:text-[34px] leading-tight text-white tracking-tight font-serif">
              Designing a collaborative map that clusters campus infrastructure reports into mobility hotspots.
            </h3>
            <p className="font-sans font-normal text-[17px] md:text-[19px] leading-relaxed text-white/70 font-sans">
              Planners are overwhelmed by unstructured complaints, while students lack visibility into active issues. By clustering location reports dynamically within organic boundaries, CampusTrace converts raw coordinate point-clouds into clear, actionable spatial bottlenecks.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CONTEXT */}
      <section id="context" className="py-16 md:py-24 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <span className="font-sans font-semibold text-[11px] text-white/40 uppercase tracking-widest block font-sans">
              02 / CONTEXT
            </span>
          </div>
          <div className="md:col-span-8 text-left space-y-6">
            <p className="font-sans font-normal text-[15px] md:text-[16px] leading-relaxed text-white/75 font-sans">
              CampusTrace was created for the students and administrative staff of a high-density university campus (VIT Vellore) to report and analyze structural infrastructure issues. Before this system, students lacked a direct way to pinpoint physical barriers (like broken pathways or safety hazards), resulting in disconnected complaints that administrators couldn't locate or prioritize. As a solo designer and developer, I had to build a secure, lightweight, and clutter-free spatial reporting tool within a short production cycle.
            </p>
          </div>
        </div>
      </section>

      {/* 3. THE REAL PROBLEM */}
      <section id="problem" className="py-16 md:py-24 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <span className="font-sans font-semibold text-[11px] text-white/40 uppercase tracking-widest block font-sans">
              03 / THE REAL PROBLEM
            </span>
          </div>
          <div className="md:col-span-8 text-left space-y-6">
            <h3 className="font-sans font-normal text-[26px] md:text-[34px] leading-tight text-white tracking-tight font-serif">
              Raw coordinates and chaotic point clouds on a map create immediate decision fatigue.
            </h3>
            <p className="font-sans font-normal text-[15px] md:text-[16px] leading-relaxed text-white/60 font-sans">
              Planners do not have time to trace a list of 100 scattered coordinates of "pavement damage" or "poor lighting". The challenge was not just letting users drop pins, but translating messy, unstructured student reports into distinct, high-severity "mobility hotspots" that represent systemic design flaws.
            </p>
          </div>
        </div>
      </section>

      {/* 4. KEY DECISIONS */}
      <section id="decisions" className="py-20 md:py-28 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto border-t border-white/10">
        <div className="w-full flex justify-between items-baseline mb-12 border-b border-white/10 pb-4">
          <span className="font-sans font-semibold text-[11px] text-white/40 uppercase tracking-widest font-sans">
            04 / KEY DECISIONS
          </span>
          <span className="font-sans font-medium text-[11px] text-white/30 uppercase tracking-widest font-sans">
            CLICK TO EXPAND
          </span>
        </div>

        <div className="space-y-4">
          {[
            {
              title: "Two-Step Drag-and-Confirm Pinning",
              why: "First-generation mapping tools often submit reports instantly upon tapping the screen, causing high error rates and misplaced pins. By letting users drop a temporary marker and drag it to adjust coordinates before tapping a second time to confirm, we eliminated accidental submissions."
            },
            {
              title: "Defaulting to a Personal 'Private' Map View",
              why: "Opening a map flooded with hundreds of community reports creates visual noise. Defaulting the home map view to show only the user's own reports creates a clean, focused starting state, while offering an explicit toggle to view 'Global Data'."
            },
            {
              title: "High-Contrast Swiss-Toon Cartography",
              why: "Standard street maps are cluttered with commercial names and busy styles that distract from user reports. We stripped the style down to a custom high-contrast, monochrome palette (white roads, pastel grey land, thick outlines) to let status-coded pins stand out instantly."
            },
            {
              title: "Dynamic Organic Boundaries (Convex Hulls)",
              why: "Traditional clustering represents density using arbitrary circular rings, which obscure the physical geometry of the issue. By drawing organic boundaries directly enclosing the exact footprint of the reported pins, planners see the precise shape and flow of the bottleneck."
            }
          ].map((item, idx) => {
            const isExpanded = expandedDecision === idx;
            return (
              <div
                key={idx}
                className="border border-white/10 rounded bg-white/[0.02] transition-all"
              >
                <button
                  onClick={() => setExpandedDecision(isExpanded ? null : idx)}
                  className="w-full text-left p-6 flex justify-between items-center"
                >
                  <h4 className="font-sans font-semibold text-[15px] text-white uppercase tracking-tight font-sans">
                    → {item.title}
                  </h4>
                  <span className="text-[18px] font-mono font-bold text-white/30">
                    {isExpanded ? "–" : "+"}
                  </span>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-white/10 text-left bg-black rounded-b font-sans">
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-2">Rationale</span>
                    <p className="font-sans text-[14px] leading-relaxed text-white/70 font-light">
                      {item.why}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. WHAT DIDN'T WORK AT FIRST */}
      <section id="friction" className="py-16 md:py-24 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <span className="font-sans font-semibold text-[11px] text-white/40 uppercase tracking-widest block font-sans">
              05 / WHAT DIDN'T WORK
            </span>
          </div>
          <div className="md:col-span-8 text-left space-y-6">
            <h4 className="font-sans font-bold text-[13px] text-white uppercase tracking-wider font-serif">The Global Clutter Overload</h4>
            <p className="font-sans font-normal text-[15px] md:text-[16px] leading-relaxed text-white/60 font-sans">
              Early designs displayed every reported issue globally to all users on load. Testing showed this caused immediate confusion: users couldn't distinguish their own active reports from others, and the high concentration of pins in central campus areas made the map unreadable.
              I resolved this by introducing the "Switch to Global Data" toggle, keeping the default state clean and personal, and utilizing severity-colored badges and status filters in the side drawer.
            </p>
          </div>
        </div>
      </section>

      {/* 6. OUTCOME */}
      <section id="outcome" className="py-20 md:py-28 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto border-t border-white/10">
        <div className="w-full flex justify-between items-baseline mb-12 border-b border-white/10 pb-4">
          <span className="font-sans font-semibold text-white/40 uppercase tracking-widest font-sans">
            06 / OUTCOME
          </span>
          <span className="font-sans font-medium text-white/30 uppercase tracking-widest font-sans">
            QUANTIFIED METRICS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left font-sans">
          <div className="p-6 bg-white/[0.02] border border-white/5 rounded">
            <span className="font-sans text-[36px] md:text-[48px] font-bold text-white block tracking-tight leading-none font-serif">25 Hotspots</span>
            <span className="font-sans text-[10px] text-white/40 uppercase tracking-wider font-semibold block mt-3">Thematic Clusters</span>
            <p className="font-sans text-[12px] text-white/50 mt-1 leading-normal">Clustered 100+ raw reports into 25 high-priority mobility hotspots, turning chaotic point data into actionable design themes.</p>
          </div>
          <div className="p-6 bg-white/[0.02] border border-white/5 rounded">
            <span className="font-sans text-[36px] md:text-[48px] font-bold text-white block tracking-tight leading-none font-serif">0 Errors</span>
            <span className="font-sans text-[10px] text-white/40 uppercase tracking-wider font-semibold block mt-3">Accidental Inputs</span>
            <p className="font-sans text-[12px] text-white/50 mt-1 leading-normal">Prevented input errors by implementing the two-step drag-and-adjust placement, resulting in zero accidental submissions.</p>
          </div>
          <div className="p-6 bg-white/[0.02] border border-white/5 rounded">
            <span className="font-sans text-[36px] md:text-[48px] font-bold text-white block tracking-tight leading-none font-serif">Swiss-Toon</span>
            <span className="font-sans text-[10px] text-white/40 uppercase tracking-wider font-semibold block mt-3">Map Readability</span>
            <p className="font-sans text-[12px] text-white/50 mt-1 leading-normal">Custom Swiss-inspired high-contrast cartography where status-coded pins (open, resolved, personal) stand out immediately.</p>
          </div>
        </div>

        {/* Reflection */}
        <div className="mt-12 p-6 border-l-2 border-[#00B4D8] text-left">
          <span className="font-sans text-[11px] font-bold text-white/40 uppercase tracking-widest block mb-2 font-serif font-sans">Reflection</span>
          <p className="font-sans text-[14px] leading-relaxed text-white/75 font-sans">
            Building this project showed me that the value of spatial data isn't the data itself, but how it is synthesized. Translating individual, low-context submissions into unified thematic areas bridges the gap between raw student feedback and administrative action.
          </p>
        </div>
      </section>

      {/* 7. COLLAPSIBLE PROCESS DRAWERS */}
      <section className="py-12 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto flex flex-col items-center">
        <button
          onClick={() => setShowFullProcess(!showFullProcess)}
          className="px-8 py-4 border border-white text-white font-sans text-[12px] uppercase font-bold tracking-wider hover:bg-white hover:text-black transition-all duration-300 rounded-sm cursor-pointer"
        >
          {showFullProcess ? "Hide detailed process" : "See full process"}
        </button>

        {showFullProcess && (
          <div className="w-full mt-12 pt-12 border-t border-white/10 text-left space-y-16 animate-fadeIn font-sans text-white">

            {/* SECTION 1: STACK & FLOW */}
            <div className="space-y-6">
              <span className="text-[10px] font-bold text-[#00B4D8] uppercase tracking-widest block">01 / TECHNICAL STACK & INFORMATION FLOW</span>
              <h3 className="text-[20px] font-bold text-white uppercase tracking-tight">Geospatial Sync & Analytics</h3>
              <p className="text-[14px] text-white/60 leading-relaxed max-w-3xl">
                CampusTrace is built using React 18 and Vite. It couples MapLibre GL rendering with Supabase PostgreSQL and Google Generative AI (Gemini 3.1 Flash Lite API) to coordinate student reports and AI-driven clustering.
              </p>

              {/* System Architecture flowchart */}
              <div className="p-6 bg-white/5 border border-white/10 rounded-sm grid grid-cols-1 md:grid-cols-5 gap-4 text-center items-center">
                <div className="p-4 bg-neutral-900 border border-white/10 rounded shadow-sm">
                  <span className="block text-[9px] font-bold text-white/40 uppercase">Student</span>
                  <span className="text-[11px] font-semibold text-white">Places Pin / Marker</span>
                </div>
                <div className="text-white/30 font-bold">→</div>
                <div className="p-4 bg-neutral-900 border border-white/10 rounded shadow-sm">
                  <span className="block text-[9px] font-bold text-white/40 uppercase">Database</span>
                  <span className="text-[11px] font-semibold text-white">Supabase Reports</span>
                </div>
                <div className="text-white/30 font-bold">→</div>
                <div className="p-4 bg-neutral-900 border border-white/10 rounded shadow-sm">
                  <span className="block text-[9px] font-bold text-white/40 uppercase">AI Analyst</span>
                  <span className="text-[11px] font-semibold text-white">Gemini 3.1 Flash</span>
                </div>
              </div>
            </div>

            {/* SECTION 2: DATABASE SCHEMA & SECURITY */}
            <div className="space-y-6 pt-12 border-t border-white/10">
              <span className="text-[10px] font-bold text-[#00B4D8] uppercase tracking-widest block">02 / DATABASE SCHEMA & RLS POLICIES</span>
              <h3 className="text-[20px] font-bold text-white uppercase tracking-tight">Row Level Security (RLS) Rules</h3>
              <p className="text-[14px] text-white/60 leading-relaxed max-w-3xl">
                The database enforces strict privacy boundaries. The <code>reports</code> table columns include: <code>id</code>, <code>lat</code>, <code>lng</code>, <code>category</code>, <code>description</code>, <code>status</code>, <code>user_id</code>, and <code>user_email</code>.
              </p>

              <div className="p-5 bg-neutral-900 rounded text-neutral-300 font-mono text-[12px] space-y-3 shadow-inner">
                <div>
                  <span className="text-cyan-400">CREATE POLICY</span> "Insert Policy" <span className="text-cyan-400">ON</span> reports <span className="text-cyan-400">FOR INSERT WITH CHECK</span> (auth.uid() = user_id);
                </div>
                <div>
                  <span className="text-cyan-400">CREATE POLICY</span> "Select Policy (Private)" <span className="text-cyan-400">ON</span> reports <span className="text-cyan-400">FOR SELECT USING</span> (auth.uid() = user_id OR is_admin(auth.email()));
                </div>
              </div>
              <p className="text-[13px] text-white/60 leading-relaxed max-w-3xl">
                Row Level Security ensures students can only insert and read their own reports in default private view, while authorized administration accounts bypass user filters via whitelisted email checks to manage global analytics.
              </p>
            </div>

            {/* SECTION 3: GRAHAM SCAN CONVEX HULL */}
            <div className="space-y-6 pt-12 border-t border-white/10">
              <span className="text-[10px] font-bold text-[#00B4D8] uppercase tracking-widest block">03 / CONVEX HULL SPATIAL BOUNDARIES</span>
              <h3 className="text-[20px] font-bold text-white uppercase tracking-tight">Algorithmic Geometry</h3>
              <p className="text-[14px] text-white/60 leading-relaxed max-w-3xl">
                Rather than drawing rigid circular rings, organic polygons are calculated dynamically using a 2D Convex Hull algorithm (Graham Scan variation) to enclose clusters of points:
              </p>

              <div className="p-5 bg-neutral-950 rounded text-neutral-300 font-mono text-[12px] space-y-1 shadow-inner overflow-x-auto">
                <div><span className="text-[#ef4444]">const</span> getConvexHull = (points) =&gt; &#123;</div>
                <div className="pl-4">if (points.length &lt;= 2) return points;</div>
                <div className="pl-4">const sorted = points.slice().sort((a, b) =&gt; a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]);</div>
                <div className="pl-4">const crossProduct = (o, a, b) =&gt; (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);</div>
                <div className="pl-4">const lower = [];</div>
                <div className="pl-4">for (let p of sorted) &#123;</div>
                <div className="pl-8">while (lower.length &gt;= 2 && crossProduct(lower[lower.length - 2], lower[lower.length - 1], p) &lt;= 0) lower.pop();</div>
                <div className="pl-8">lower.push(p);</div>
                <div className="pl-4">&#125;</div>
                <div className="pl-4">const upper = [];</div>
                <div className="pl-4">for (let i = sorted.length - 1; i &gt;= 0; i--) &#123;</div>
                <div className="pl-8">let p = sorted[i];</div>
                <div className="pl-8">while (upper.length &gt;= 2 && crossProduct(upper[upper.length - 2], upper[upper.length - 1], p) &lt;= 0) upper.pop();</div>
                <div className="pl-8">upper.push(p);</div>
                <div className="pl-4">&#125;</div>
                <div className="pl-4">lower.pop(); upper.pop();</div>
                <div className="pl-4">return lower.concat(upper);</div>
                <div>&#125;;</div>
              </div>

              <div className="space-y-2 text-[13px] text-white/60 leading-relaxed max-w-3xl">
                <p>
                  <strong>3 or more reports:</strong> Renders a closed organic polygon representing the exact convex hull boundaries.
                </p>
                <p>
                  <strong>2 reports:</strong> Renders a line capsule extending 40 meters around the reports' midpoint.
                </p>
                <p>
                  <strong>1 report:</strong> Renders a circular polygon with a 30-meter radius around the point.
                </p>
              </div>
            </div>

            {/* SECTION 4: AI CLUSTERING ENGINE CONFIGURATION */}
            <div className="space-y-6 pt-12 border-t border-white/10">
              <span className="text-[10px] font-bold text-[#00B4D8] uppercase tracking-widest block">04 / AI CLUSTERING & PROMPT CONSTRAINTS</span>
              <h3 className="text-[20px] font-bold text-white uppercase tracking-tight">Structured Analysis Output</h3>
              <p className="text-[14px] text-white/60 leading-relaxed max-w-3xl font-sans">
                Gemini 3.1 Flash Lite functions as our Mobility Design Analyst. The system structures the analysis using the following API rules:
              </p>
              <ul className="list-disc pl-5 text-[13px] text-white/60 space-y-2 max-w-3xl">
                <li><strong>Quantity Target:</strong> Programmatically requested to output exactly 25 granular bottlenecks to prevent the model from over-consolidating reports.</li>
                <li><strong>Problem-Only Rule:</strong> Strictly forbids proposing solutions (such as placing cameras or bike lanes). This forces the AI to analyze only physical and spatial friction.</li>
                <li><strong>JSON Schema Coercion:</strong> Maps specific thematic issues directly back to database report ID arrays for client mapping.</li>
              </ul>
            </div>

            {/* SECTION 5: SCREENSHOTS & GALLERY */}
            <div className="space-y-6 pt-12 border-t border-white/10">
              <span className="text-[10px] font-bold text-[#00B4D8] uppercase tracking-widest block">05 / GALLERY & VISUALS</span>
              <h3 className="text-[20px] font-bold text-white uppercase tracking-tight font-sans font-bold">Heatmap Analysis & Screenshots</h3>
              <p className="text-[14px] text-white/60 leading-relaxed max-w-3xl font-sans">
                Visualizing student reports and heat zones on the custom Swiss-Toon map layouts:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
                <div
                  onClick={() => setLightboxImage("/projects/campus-trace/ai-heatmap-1.png")}
                  className="relative aspect-video border border-white/10 rounded overflow-hidden bg-white/5 cursor-zoom-in group"
                >
                  <Image src="/projects/campus-trace/ai-heatmap-1.png" alt="Report Cluster Analysis 01" fill className="object-contain p-4" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[12px] font-semibold text-white uppercase bg-black/60 px-3 py-1 rounded">Click to expand</span>
                  </div>
                </div>

                <div
                  onClick={() => setLightboxImage("/projects/campus-trace/ai-heatmap-2.png")}
                  className="relative aspect-video border border-white/10 rounded overflow-hidden bg-white/5 cursor-zoom-in group"
                >
                  <Image src="/projects/campus-trace/ai-heatmap-2.png" alt="Report Cluster Analysis 02" fill className="object-contain p-4" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[12px] font-semibold text-white uppercase bg-black/60 px-3 py-1 rounded">Click to expand</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 6: STAGING DEPLOY CHECKLIST */}
            <div className="space-y-6 pt-12 border-t border-white/10">
              <span className="text-[10px] font-bold text-[#00B4D8] uppercase tracking-widest block font-sans">06 / VERIFICATION CHECKLIST</span>
              <h3 className="text-[20px] font-bold text-white uppercase tracking-tight font-sans">Production Readiness Checklist</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
                <div className="p-4 border border-white/10 rounded-sm bg-white/5">
                  <span className="font-bold text-[11px] text-[#00B4D8] block">STAGING DEPLOY</span>
                  <p className="text-[12px] text-white/50 mt-1">Verify that Supabase RLS policies are fully active on production databases.</p>
                </div>
                <div className="p-4 border border-white/10 rounded-sm bg-white/5">
                  <span className="font-bold text-[11px] text-[#00B4D8] block">GOOGLE OAUTH</span>
                  <p className="text-[12px] text-white/50 mt-1">Ensure Google OAuth Client IDs are correctly configured in production.</p>
                </div>
                <div className="p-4 border border-white/10 rounded-sm bg-white/5">
                  <span className="font-bold text-[11px] text-[#00B4D8] block">AI QUOTAS</span>
                  <p className="text-[12px] text-white/50 mt-1">Confirm that Google Generative AI API keys have quotas to handle peak loads.</p>
                </div>
              </div>
            </div>

          </div>
        )}
      </section>

      {/* FOOTER */}
      <CaseStudyFooter nextProject={{ name: "Open Design Studio", href: "/projects/open-design-studio" }} theme="dark" />
    </main>
  );
}
