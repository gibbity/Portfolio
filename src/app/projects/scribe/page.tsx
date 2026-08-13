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
  { id: "context", label: "Context" },
  { id: "problem", label: "The Real Problem" },
  { id: "decisions", label: "Key Decisions" },
  { id: "simulation", label: "Live Simulation" },
  { id: "friction", label: "What Didn't Work" },
  { id: "outcome", label: "Outcome" }
];

interface SimulationNode {
  id: string;
  label: string;
  type: "pillar" | "cluster" | "leaf";
  x: number;
  y: number;
}

interface SimulationLink {
  source: string;
  target: string;
}

export default function ScribePage() {
  const [activeSection, setActiveSection] = useState("intro");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [expandedDecision, setExpandedDecision] = useState<number | null>(0);
  const [showFullProcess, setShowFullProcess] = useState(false);

  // Interactive Live Node Simulation States
  const [selectedPrompt, setSelectedPrompt] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simNodes, setSimNodes] = useState<SimulationNode[]>([]);
  const [simLinks, setSimLinks] = useState<SimulationLink[]>([]);
  const [simLogs, setSimLogs] = useState<string[]>([]);

  const prompts = [
    {
      text: "Pivot from Enterprise SaaS to Open-Source Dev Tool",
      pillars: ["Licensing Strategy", "Developer Marketing", "Self-Host Infrastructure"],
      nodes: [
        { id: "n1", label: "AGPLv3 License", type: "cluster" as const, x: 280, y: 150 },
        { id: "n2", label: "Contributor Agreement", type: "leaf" as const, x: 200, y: 110 },
        { id: "n3", label: "Enterprise Extensions", type: "leaf" as const, x: 360, y: 120 },
        { id: "n4", label: "Self-Serve Registry", type: "cluster" as const, x: 520, y: 220 },
        { id: "n5", label: "IndexedDB Local Cache", type: "leaf" as const, x: 600, y: 180 },
        { id: "n6", label: "Developer Relations Swarm", type: "cluster" as const, x: 320, y: 320 },
        { id: "n7", label: "Telemetry Opt-out Risk", type: "leaf" as const, x: 240, y: 360 }
      ],
      links: [
        { source: "n1", target: "n2" },
        { source: "n1", target: "n3" },
        { source: "n4", target: "n5" },
        { source: "n6", target: "n7" }
      ],
      logs: [
        "Initializing adversarial PM swarm...",
        "Advocate: Open-sourcing will spike contribution velocity by 40%.",
        "Critic: Telemetry constraints make user-testing loops difficult.",
        "Analyst: Contributor CLA agreement structured to handle scaling.",
        "Golden path synthesized: AGPLv3 + Local IndexedDB caching."
      ]
    },
    {
      text: "Expand Scribe Map Into Medical Diagnostics HUD",
      pillars: ["Rigid Telemetry Feeds", "FDA Compliance", "Clinician Urgency IA"],
      nodes: [
        { id: "m1", label: "ISO 13485 Standards", type: "cluster" as const, x: 300, y: 160 },
        { id: "m2", label: "Patient Data Safety", type: "leaf" as const, x: 220, y: 120 },
        { id: "m3", label: "Audit Log Persistence", type: "leaf" as const, x: 380, y: 130 },
        { id: "m4", label: "HUD Triage Display", type: "cluster" as const, x: 500, y: 240 },
        { id: "m5", label: "120ms Latency Cap", type: "leaf" as const, x: 580, y: 200 },
        { id: "m6", label: "Triage Alert Matrix", type: "cluster" as const, x: 340, y: 340 },
        { id: "m7", label: "Visual Noise Filtering", type: "leaf" as const, x: 260, y: 380 }
      ],
      links: [
        { source: "m1", target: "m2" },
        { source: "m1", target: "m3" },
        { source: "m4", target: "m5" },
        { source: "m6", target: "m7" }
      ],
      logs: [
        "Initializing diagnostic simulation swarm...",
        "Strategist: Clinician IA must prioritize alarm states over baseline logs.",
        "User Advocate: Constant telemetry flashes cause cognitive fatigue.",
        "Analyst: Local IndexedDB caching guarantees zero patient data loss.",
        "Golden path synthesized: HUD Triage + 120ms local rendering engine."
      ]
    }
  ];

  const startSimulation = () => {
    setIsSimulating(true);
    setSimNodes([]);
    setSimLinks([]);
    setSimLogs([]);

    const data = prompts[selectedPrompt];
    let currentLogIndex = 0;
    
    const logInterval = setInterval(() => {
      if (currentLogIndex < data.logs.length) {
        setSimLogs(prev => [...prev, data.logs[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(logInterval);
        setSimNodes(data.nodes);
        setSimLinks(data.links);
        setIsSimulating(false);
      }
    }, 700);
  };

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
        <div className="flex flex-wrap gap-2 mb-6 font-sans">
          <span className="text-[10px] md:text-[11px] px-2.5 py-1 bg-black/5 text-black font-semibold rounded-sm uppercase tracking-wider">Strategic Spatial Mapping</span>
          <span className="text-[10px] md:text-[11px] px-2.5 py-1 bg-black/5 text-black font-semibold rounded-sm uppercase tracking-wider">React / D3 Engine</span>
          <span className="text-[10px] md:text-[11px] px-2.5 py-1 bg-black/5 text-black font-semibold rounded-sm uppercase tracking-wider">IndexedDB Storage</span>
          <span className="text-[10px] md:text-[11px] px-2.5 py-1 bg-black/5 text-black font-semibold rounded-sm uppercase tracking-wider">AI Strategy Audit</span>
        </div>

        {/* Title */}
        <h1 className="font-sans font-normal text-[36px] md:text-[54px] lg:text-[72px] leading-[1.05] tracking-tight text-black text-left max-w-4xl font-serif">
          Scribe — Spatial Strategy Mapping
        </h1>
        
        {/* Subtitle */}
        <p className="font-sans text-[18px] md:text-[22px] leading-relaxed text-black/60 mt-4 max-w-3xl italic">
          Designed an interactive spatial mapping interface that helps product teams spot critical strategic gaps and stress-test roadmaps without getting lost in flat document systems.
        </p>

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

        {/* Hero Visual Video */}
        <div className="w-full aspect-[16/9.5] border border-black/5 rounded-sm overflow-hidden mt-12 relative shadow-sm bg-neutral-950">
          <MuxVideo 
            playbackId="I755xvZ9WF017k4dgPRdKox3UWlwSdfBkxhxwr2aWQu8" 
            className="w-full h-full object-cover"
            metadata={{ video_title: "Scribe Interaction Demo" }}
          />
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
          <div className="md:col-span-8 text-left space-y-6">
            <p className="font-sans font-normal text-[17px] md:text-[19px] leading-relaxed text-black/75">
              Scribe was built for **product executives and strategic leaders** who need to pressure-test critical decisions under intense timeline constraints.
            </p>
            <p className="font-sans font-normal text-[15px] leading-relaxed text-black/50 border-l border-black/10 pl-6">
              <strong>Constraints:</strong> Developed as a solo designer-developer project. The challenge was to create a tool that moves beyond the typical passive folder structure or flat chat threads to expose structural risks early while maintaining real-time client performance.
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
            <h3 className="font-sans font-normal text-[26px] md:text-[34px] leading-tight text-black tracking-tight font-serif">
              Traditional strategy documents create "ghost context"—hidden interdependencies and logic loops impossible to spot until they fail.
            </h3>
            <p className="font-sans font-normal text-[15px] md:text-[16px] leading-relaxed text-black/60">
              While flat chat interfaces generate passive advice, they fail to provide the structural resistance and visual hierarchy required to diagnose real strategic flaws. The challenge is exposing abstract concepts with physical distance, alignment, and color so that structural gaps become immediately apparent.
            </p>
          </div>
        </div>
      </section>

      {/* 5. KEY DECISIONS (PROGRESSIVE DISCLOSURE) */}
      <section id="decisions" className="py-20 md:py-28 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto border-t border-gray-100">
        <div className="w-full flex justify-between items-baseline mb-12 border-b border-gray-100 pb-4">
          <span className="font-sans font-semibold text-[11px] text-black/40 uppercase tracking-widest">
            03 / KEY DECISIONS
          </span>
          <span className="font-sans font-medium text-[11px] text-black/30 uppercase tracking-widest">
            CLICK TO EXPAND
          </span>
        </div>

        <div className="space-y-4">
          {[
            {
              title: "Columnar Spatial Anchoring",
              summary: "Keeps hundreds of strategic insights scannable and organized.",
              why: "Anchored strategic nodes into a predictable column rhythm rather than letting them drift into an unreadable 'spaghetti graph' of floating circles."
            },
            {
              title: "Dynamic Chromatic Warning System",
              why: "Directed the decision-maker's attention instantly to critical structural flaws by color-coding risks in high-contrast red and constructive opportunities in soft green.",
              summary: "Directs attention instantly to critical structural flaws."
            },
            {
              title: "Dual-Depth Navigation Scale",
              why: "Allowed users to move seamlessly between a 10,000-foot view of major strategic pillars and ground-level specific insights without feeling disoriented or losing track of the surrounding context.",
              summary: "Balances visual overview with atomic, granular details."
            },
            {
              title: "Local Persistence Architecture",
              why: "Guaranteed that strategic sessions remain fully intact and editable, preventing data loss during intensive focus sessions or sudden connection drops.",
              summary: "Safeguards long working sessions from connection failures."
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
                  <div>
                    <h4 className="font-sans font-semibold text-[16px] text-black uppercase tracking-tight">
                      → {item.title}
                    </h4>
                    <p className="font-sans text-[13px] text-black/50 mt-1 font-sans">
                      {item.summary}
                    </p>
                  </div>
                  <span className="text-[18px] font-mono font-bold text-black/30">
                    {isExpanded ? "–" : "+"}
                  </span>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-gray-100 text-left bg-white rounded-b">
                    <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest block mb-2 font-sans">Rationale</span>
                    <p className="font-sans text-[14px] leading-relaxed text-black/70 font-light font-sans">
                      {item.why}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. INTERACTIVE LIVE SIMULATION DEMO */}
      <section id="simulation" className="py-20 md:py-28 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto border-t border-gray-100 bg-[#FAFAFA] rounded-sm border border-black/5">
        <div className="w-full flex justify-between items-baseline mb-8">
          <span className="font-sans font-semibold text-[11px] text-black/40 uppercase tracking-widest">
            04 / LIVE WORKSPACE SIMULATOR
          </span>
          <span className="font-sans font-medium text-[11px] text-black/30 uppercase tracking-widest">
            REAL-TIME NODE SYNTHESIS
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Prompts Input Column */}
          <div className="lg:col-span-4 text-left space-y-4">
            <span className="text-[11px] font-bold text-black/40 uppercase tracking-wider block">Select Strategy Prompt</span>
            
            {prompts.map((p, i) => (
              <button
                key={i}
                onClick={() => setSelectedPrompt(i)}
                disabled={isSimulating}
                className={`w-full text-left p-4 rounded text-[13px] border font-sans leading-relaxed transition-all ${
                  selectedPrompt === i 
                    ? "bg-black border-black text-white" 
                    : "bg-white border-gray-200 hover:border-black/20 text-black/75"
                }`}
              >
                {p.text}
              </button>
            ))}

            <button
              onClick={startSimulation}
              disabled={isSimulating}
              className="w-full py-3.5 bg-[#ef4444] text-white font-sans text-[12px] uppercase font-bold tracking-wider hover:bg-[#d93838] disabled:opacity-50 transition-all rounded-[3px] mt-2 cursor-pointer"
            >
              {isSimulating ? "Swarm Simulating..." : "Synthesize Map"}
            </button>
          </div>

          {/* Interactive Dynamic Grid Output Column */}
          <div className="lg:col-span-8 border border-gray-200 bg-white rounded p-4 relative min-h-[360px] flex flex-col justify-between overflow-hidden shadow-inner">
            
            {/* Live SVG Graph Canvas */}
            <div className="absolute inset-0 z-10 select-none pointer-events-none">
              <svg className="w-full h-full">
                {simLinks.map((link, idx) => {
                  const sNode = simNodes.find(n => n.id === link.source);
                  const tNode = simNodes.find(n => n.id === link.target);
                  if (!sNode || !tNode) return null;
                  return (
                    <line
                      key={idx}
                      x1={sNode.x}
                      y1={sNode.y}
                      x2={tNode.x}
                      y2={tNode.y}
                      stroke="black"
                      strokeWidth="0.8"
                      strokeDasharray="3 3"
                    />
                  );
                })}
              </svg>
            </div>

            {/* Simulated Nodes Overlay */}
            <div className="absolute inset-0 z-20 pointer-events-none">
              {simNodes.map((node) => (
                <div
                  key={node.id}
                  style={{ left: `${node.x}px`, top: `${node.y}px` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1.5 border rounded text-[11px] font-sans font-bold shadow-sm pointer-events-auto bg-white hover:scale-105 transition-transform ${
                    node.type === "cluster" ? "border-black bg-black text-white" : "border-black/15 bg-white text-black"
                  }`}
                >
                  {node.label}
                </div>
              ))}
            </div>

            {simNodes.length === 0 && !isSimulating && (
              <div className="absolute inset-0 flex items-center justify-center p-8 text-center text-black/35 font-sans text-[13px] italic z-0">
                Click "Synthesize Map" to run Scribe's Pillar-Cluster-Leaf layout simulation.
              </div>
            )}

            {/* Live Terminal Log Feeds at Bottom */}
            <div className="mt-auto w-full bg-neutral-900 text-green-400 font-mono text-[11px] p-4 rounded text-left z-30 shadow-lg space-y-1">
              <div className="text-white/40 border-b border-white/5 pb-2 mb-2 uppercase text-[9px] tracking-widest font-sans flex justify-between items-center">
                <span>Terminal Log Swarm</span>
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
              </div>
              {simLogs.map((log, idx) => (
                <div key={idx} className="transition-all duration-300">
                  &gt; {log}
                </div>
              ))}
              {isSimulating && <div className="animate-pulse">&gt; Processing...</div>}
            </div>

          </div>
        </div>
      </section>

      {/* 7. WHAT DIDN'T WORK SECTION */}
      <section id="friction" className="py-16 md:py-24 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto border-t border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <span className="font-sans font-semibold text-[11px] text-black/40 uppercase tracking-widest block">
              05 / WHAT DIDN'T WORK
            </span>
          </div>
          <div className="md:col-span-8 text-left space-y-4">
            <h4 className="font-sans font-bold text-[13px] text-black uppercase tracking-wider font-serif">The Information Spaghetti Trap</h4>
            <p className="font-sans font-normal text-[15px] md:text-[16px] leading-relaxed text-black/60 font-sans">
              Early visual designs mapped strategic insights as a flat, uniform web of connected circles. During user testing, this created immediate cognitive overload—users could not tell which nodes were high-level pillars versus atomic details, and the canvas quickly became "information spaghetti."
            </p>
            <p className="font-sans font-normal text-[15px] md:text-[16px] leading-relaxed text-black/60 border-l-2 border-black/10 pl-6 italic font-sans">
              <strong>The Pivot:</strong> The design had to be restructured around a strict hierarchical pillar-to-cluster column system that visually separates core strategic pillars from individual leaf nodes, locking coordinates to a snap grid to prevent drift.
            </p>
          </div>
        </div>
      </section>

      {/* 8. OUTCOME SECTION */}
      <section id="outcome" className="py-20 md:py-28 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto border-t border-gray-100">
        <div className="w-full flex justify-between items-baseline mb-12 border-b border-gray-100 pb-4">
          <span className="font-sans font-semibold text-[11px] text-black/40 uppercase tracking-widest">
            06 / OUTCOME
          </span>
          <span className="font-sans font-medium text-[11px] text-black/30 uppercase tracking-widest">
            QUANTIFIED METRICS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="p-6 bg-[#FAFAFA] border border-black/5 rounded">
            <span className="font-sans text-[36px] md:text-[48px] font-bold text-black block tracking-tight leading-none font-serif font-sans">0ms</span>
            <span className="font-sans text-[10px] text-black/40 uppercase tracking-wider font-semibold block mt-3">Synthesis Latency</span>
            <p className="font-sans text-[12px] text-black/50 mt-1 leading-normal font-sans">Shifted strategy reviews from passive reading to active exploration, exposing gaps on a single screen.</p>
          </div>
          <div className="p-6 bg-[#FAFAFA] border border-black/5 rounded">
            <span className="font-sans text-[36px] md:text-[48px] font-bold text-black block tracking-tight leading-none font-serif font-sans">0</span>
            <span className="font-sans text-[10px] text-black/40 uppercase tracking-wider font-semibold block mt-3">Data Loss</span>
            <p className="font-sans text-[12px] text-black/50 mt-1 leading-normal font-sans">Maintained client-side state across long strategic editing sessions using IndexedDB cache layers.</p>
          </div>
          <div className="p-6 bg-[#FAFAFA] border border-black/5 rounded">
            <span className="font-sans text-[36px] md:text-[48px] font-bold text-black block tracking-tight leading-none font-serif font-sans">Snap Grid</span>
            <span className="font-sans text-[10px] text-black/40 uppercase tracking-wider font-semibold block mt-3">Locked Spacings</span>
            <p className="font-sans text-[12px] text-black/50 mt-1 leading-normal font-sans">Enabled rapid scanning of dozens of strategic nodes simultaneously using strict column intervals.</p>
          </div>
        </div>

        {/* Reflection */}
        <div className="mt-12 p-6 border-l-2 border-black text-left">
          <span className="font-sans text-[11px] font-bold text-black/40 uppercase tracking-widest block mb-2 font-serif font-sans">Reflection</span>
          <p className="font-sans text-[14px] leading-relaxed text-black/75 font-sans">
            Building Scribe reinforced that strategic clarity is a spatial problem. When you give abstract concepts physical distance, alignment, and color, strategic flaws become immediately apparent.
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
                  onClick={() => setLightboxImage("/projects/scribe/Scribe- graph light theme.png")}
                  className="relative aspect-video border border-gray-100 rounded overflow-hidden bg-gray-50 cursor-zoom-in group"
                >
                  <Image src="/projects/scribe/Scribe- graph light theme.png" alt="Light Theme Graph" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[12px] font-semibold text-white uppercase bg-black/60 px-3 py-1 rounded">Click to expand</span>
                  </div>
                </div>

                <div 
                  onClick={() => setLightboxImage("/projects/scribe/Scribe- graph dark theme.png")}
                  className="relative aspect-video border border-gray-100 rounded overflow-hidden bg-gray-50 cursor-zoom-in group"
                >
                  <Image src="/projects/scribe/Scribe- graph dark theme.png" alt="Dark Theme Graph" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[12px] font-semibold text-white uppercase bg-black/60 px-3 py-1 rounded">Click to expand</span>
                  </div>
                </div>

                <div 
                  onClick={() => setLightboxImage("/projects/scribe/Scribe- home- dark.png")}
                  className="relative aspect-video border border-gray-100 rounded overflow-hidden bg-gray-50 cursor-zoom-in group"
                >
                  <Image src="/projects/scribe/Scribe- home- dark.png" alt="Scribe Home Screen" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[12px] font-semibold text-white uppercase bg-black/60 px-3 py-1 rounded">Click to expand</span>
                  </div>
                </div>

                <div 
                  onClick={() => setLightboxImage("/projects/scribe/Scribe-note editor.png")}
                  className="relative aspect-video border border-gray-100 rounded overflow-hidden bg-gray-50 cursor-zoom-in group"
                >
                  <Image src="/projects/scribe/Scribe-note editor.png" alt="Note Editor Workbench" fill className="object-cover" />
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
