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
  const [showFullProcess, setShowFullProcess] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

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
        liveUrl="https://campus-trace-steel.vercel.app/"
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
              When a broken streetlight or a blocked pathway goes unreported on a massive campus like VIT Vellore, the friction compounds daily.
            </h3>
            <p className="font-sans font-normal text-[17px] md:text-[19px] leading-relaxed text-white/70 font-sans">
              Students complain locally, but administration lacks visibility into the aggregate data to fix systemic problems. CampusTrace was built to bridge this gap by allowing students to drop location-based pins for immediate issues, while using AI to synthesize hundreds of individual complaints into actionable administrative hotspots.
            </p>
          </div>
        </div>
        
        <div className="w-full mt-12 rounded-sm overflow-hidden border border-white/10 relative">
          <video src="/projects/campus-trace/rush-hour.mp4" autoPlay loop muted playsInline className="w-full h-auto" />
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
            <div className="space-y-4">
              <div className="flex gap-4">
                <span className="font-sans font-bold text-white/60 w-24">Role:</span>
                <span className="font-sans text-white/90">Full-stack Developer / Designer</span>
              </div>
              <div className="flex gap-4">
                <span className="font-sans font-bold text-white/60 w-24">Timeline:</span>
                <span className="font-sans text-white/90">Solo build</span>
              </div>
              <div className="flex gap-4">
                <span className="font-sans font-bold text-white/60 w-24">Stack:</span>
                <span className="font-sans text-white/90">React, Vite, Tailwind CSS, MapLibre GL, Supabase, Google Gemini 3.1 Flash Lite</span>
              </div>
            </div>
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
              The underlying issue wasn't that students didn't care about reporting problems; it was that standard reporting forms felt like screaming into a void.
            </h3>
            <p className="font-sans font-normal text-[15px] md:text-[16px] leading-relaxed text-white/60 font-sans">
              To get students to engage, the reporting mechanism needed to be as frictionless as dropping a pin on a map. For administration, the problem was the opposite: sorting through a hundred individual reports of "broken light" is overwhelming. They needed a way to see the systemic failure, not just the symptoms.
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
        </div>

        <div className="space-y-16">
          {[
            {
              title: "Neo-brutalist \"Toon\" Aesthetic",
              why: "Chose a minimal, high-contrast visual style (thick borders, offset shadows, pastel accents) over a standard corporate dashboard. Why: It makes the platform feel approachable and less intimidating for students, encouraging faster reporting.",
              image: "/projects/campus-trace/key-decision-1.png"
            },
            {
              title: "Client-Side Clustering with MapLibre",
              why: "Handled the heavy lifting of map rendering and pin clustering directly on the client. Why: Allowed for a snappy, interactive map experience without constantly querying the database for every pan and zoom, reducing backend load on Supabase.",
              image: "/projects/campus-trace/key-decision-2.png"
            },
            {
              title: "LLM-Driven Synthesis over Simple Aggregation",
              why: "Used Gemini 3.1 Flash Lite to process raw reports into thematic \"Hotspots\" instead of just grouping pins by radius. Why: A simple radius cluster can't tell the difference between a broken pipe and a security concern occurring in the same 50-meter area. The LLM extracts the actual friction from the text and groups logically.",
              image: "/projects/campus-trace/key-decision-3.png",
              smallImage: true
            }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col gap-6">
              <div className="text-left">
                <h4 className="font-sans font-normal text-[22px] md:text-[26px] leading-tight text-white tracking-tight font-serif mb-3">
                  {idx + 1}. {item.title}
                </h4>
                <div className="pl-6 border-l-2 border-white/10">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-2 font-sans">Rationale</span>
                  <p className="font-sans text-[14px] leading-relaxed text-white/70 font-light font-sans">
                    {item.why}
                  </p>
                </div>
              </div>
              
              {item.image && (
                <div className={`rounded-sm overflow-hidden border border-white/10 bg-white/5 ${item.smallImage ? 'w-full max-w-xl' : 'w-full'}`}>
                  <Image src={item.image} alt={item.title} width={1920} height={1080} className="w-full h-auto" />
                </div>
              )}
            </div>
          ))}
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
          <div className="md:col-span-8 text-left space-y-8">
            <div>
              <h4 className="font-sans font-bold text-[13px] text-white uppercase tracking-wider font-serif mb-2">Tech-Heavy Landing Page</h4>
              <p className="font-sans font-normal text-[15px] md:text-[16px] leading-relaxed text-white/60 font-sans">
                The first iteration of the landing page relied heavily on standard SaaS marketing tropes (gradients, complex feature grids). It felt completely disconnected from the minimal, playful aesthetic of the actual web app. I had to scrap the design and rewrite it to match the app's neo-brutalist style, which immediately made the brand feel cohesive.
              </p>
            </div>
            <div>
              <h4 className="font-sans font-bold text-[13px] text-white uppercase tracking-wider font-serif mb-2">Narrow AI Scoping</h4>
              <p className="font-sans font-normal text-[15px] md:text-[16px] leading-relaxed text-white/60 font-sans">
                Initially, the AI analysis was strictly prompted to act as a "Mobility Design" analyst, looking only for transportation and mobility friction. This resulted in the AI ignoring critical infrastructure or maintenance reports that didn't fit the mobility constraint. I had to pivot the prompt to a general "Campus Problem" analyst to ensure all systemic issues were captured.
              </p>
            </div>
            <div>
              <h4 className="font-sans font-bold text-[13px] text-white uppercase tracking-wider font-serif mb-2">Vercel Build Limits</h4>
              <p className="font-sans font-normal text-[15px] md:text-[16px] leading-relaxed text-white/60 font-sans">
                During deployment, the application hit Vercel's chunk size limits due to heavy dependencies like MapLibre and Supabase. I had to introduce route-level lazy loading with React <code>Suspense</code> and configure manual chunking in Vite to split vendor libraries, stabilizing the build process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. OUTCOME */}
      <section id="outcome" className="py-20 md:py-28 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto border-t border-white/10">
        <div className="w-full flex justify-between items-baseline mb-12 border-b border-white/10 pb-4">
          <span className="font-sans font-semibold text-white/40 uppercase tracking-widest font-sans">
            06 / OUTCOME & RECONSIDERATIONS
          </span>
        </div>

        <div className="text-left space-y-6 mb-12">
          <p className="font-sans font-normal text-[15px] md:text-[16px] leading-relaxed text-white/70 font-sans">
            The platform successfully provides a dual experience: a highly tactile, frictionless reporting interface for students, and an AI-synthesized dashboard for administrators that groups individual noise into actionable maintenance targets. During the initial data run, the platform captured 33 individual friction reports—ranging from broken lighting to unsafe pedestrian crossings. The AI engine successfully synthesized these into 25 discrete administrative hotspots, proving its ability to identify complex, overlapping systemic issues (like shared tunnel congestion) that simple radius clustering would have missed.
          </p>
        </div>

        {/* Reflection */}
        <div className="p-6 border-l-2 border-[#00B4D8] text-left">
          <span className="font-sans text-[11px] font-bold text-white/40 uppercase tracking-widest block mb-2 font-serif font-sans">What I'd Reconsider</span>
          <p className="font-sans text-[14px] leading-relaxed text-white/75 font-sans">
            If I were to build this again, I would reconsider relying entirely on the LLM for spatial bounding. Currently, the AI groups the reports, and the app calculates a rough radius based on the grouped coordinates. This works for simple clusters but fails to accurately represent linear issues (like a long stretch of unlit pathway). A more robust geospatial clustering algorithm (like DBSCAN) applied *before* feeding the clusters to the LLM might yield more accurate physical boundaries.
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

            {/* SECTION 5: STAGING DEPLOY CHECKLIST */}
            <div className="space-y-6 pt-12 border-t border-white/10">
              <span className="text-[10px] font-bold text-[#00B4D8] uppercase tracking-widest block font-sans">05 / VERIFICATION CHECKLIST</span>
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
