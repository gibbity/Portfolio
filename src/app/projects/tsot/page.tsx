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

export default function TSOTPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Section definitions for Side Progress Rail & Wayfinding
  const sections = [
    { id: "intro", label: "Hook" },
    { id: "context", label: "Context" },
    { id: "problem", label: "The Real Problem" },
    { id: "decisions", label: "Key Decisions" },
    { id: "simulator", label: "Audit Simulator" },
    { id: "friction", label: "What Didn't Work" },
    { id: "outcome", label: "Outcome" }
  ];

  const [activeSection, setActiveSection] = useState("intro");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [showFullProcess, setShowFullProcess] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Expanded decision toggle
  const [expandedDecision, setExpandedDecision] = useState<number | null>(0);

  // Auditing Simulator State
  const [selectedScenario, setSelectedScenario] = useState<number>(0);
  const [customDescription, setCustomDescription] = useState("");
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditLogs, setAuditLogs] = useState<string[]>([]);
  const [showResultCard, setShowResultCard] = useState(false);
  const [complianceScore, setComplianceScore] = useState(0);
  const [complianceVerdict, setComplianceVerdict] = useState("");
  const [sprintRemedies, setSprintRemedies] = useState<string[]>([]);

  const scenarios = [
    {
      title: "Simulated Empathy Bot",
      desc: "An AI companion that uses simulated emotional validation and sub-200ms rapid responses to support users during stressful events.",
      score: 18,
      verdict: "UNACCEPTABLE RISK (Anthropomorphic Alert)",
      logs: [
        "Initializing TSOT compliance audit...",
        "Generating embeddings for scenario: 'Simulated Empathy Bot'...",
        "Querying Supabase hybrid search database RPC...",
        "Match Found: [#SOT-COMP-3011] Latency <200ms triggers anthropomorphic projection in 82% of users.",
        "Match Found: [#SOT-COMP-2027] Emotional responses alter user prospective planning by 47%.",
        "Applying EU AI Act article criteria [Article 15: Transparency]...",
        "XML Parsing system outputs. Groundedness check verified (2/2 documents)."
      ],
      remedies: [
        "Introduce artificial API rendering delays of at least 400ms to allow cognitive skepticism.",
        "Enforce neutral, metrics-based declarations. Strip anthropomorphic framing language ('I feel', 'I understand')."
      ]
    },
    {
      title: "Subliminal Engagement Feed",
      desc: "A social media recommendation feed adjusting visual delays and notification spacing to optimize session retention.",
      score: 35,
      verdict: "HIGH RISK (Cognitive Manipulation)",
      logs: [
        "Initializing TSOT compliance audit...",
        "Generating embeddings for scenario: 'Subliminal Engagement Feed'...",
        "Querying Supabase hybrid search database RPC...",
        "Match Found: [#SOT-COMP-3012] Forced visual friction increases source cross-validation by 63%.",
        "Match Found: [#EU-ACT-ART-5] Prohibits subliminal techniques out of cognitive safety limits.",
        "XML Parsing system outputs. Groundedness check verified (2/2 documents)."
      ],
      remedies: [
        "Implement forced visual check-points (dialog confirmations) before critical scrolling events.",
        "Add a mandatory audit log dashboard exposing the algorithmic factors steering recommendations."
      ]
    },
    {
      title: "Self-Verifying Search Tool",
      desc: "An AI search tool that answers questions, cites source documents, and requires verification prompts after three turns.",
      score: 92,
      verdict: "COMPLIANT (Safe & Grounded)",
      logs: [
        "Initializing TSOT compliance audit...",
        "Generating embeddings for scenario: 'Self-Verifying Search Tool'...",
        "Querying Supabase database hybrid search RPC...",
        "Match Found: [#SOT-COMP-2026] AI accuracy drops to 59% under long unverified conversations.",
        "Verifying constraint: Groundedness check approved (1 document, citation verified).",
        "Applying EU AI Act article checks: Low risk category confirmed."
      ],
      remedies: [
        "Maintain current check-points after three turns to prevent automation fatigue."
      ]
    }
  ];

  const triggerAudit = () => {
    setIsAuditing(true);
    setShowResultCard(false);
    setAuditLogs([]);

    const data = scenarios[selectedScenario];
    let currentLog = 0;

    const logInterval = setInterval(() => {
      if (currentLog < data.logs.length) {
        setAuditLogs(prev => [...prev, data.logs[currentLog]]);
        currentLog++;
      } else {
        clearInterval(logInterval);
        setIsAuditing(false);
        setComplianceScore(data.score);
        setComplianceVerdict(data.verdict);
        setSprintRemedies(data.remedies);
        setShowResultCard(true);
      }
    }, 600);
  };

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
    <main ref={containerRef} className="relative z-10 min-h-screen bg-[#050505] font-sans text-white selection:bg-[#ef4444] selection:text-white pb-32 overflow-x-hidden">

      {/* Scroll Progress Bar */}
      <div
        style={{ width: `${scrollProgress}%` }}
        className="fixed top-0 left-0 h-[2px] bg-[#ef4444] z-50 transition-all duration-75"
      />

      {/* Case Study Nav */}
      <CaseStudyNav projectTitle="The Science of Trust" category="AI Safety Compliance Auditor" />

      {/* LIVE SECTION LABEL (Wayfinding) */}
      <div className="fixed top-24 left-6 md:left-12 lg:left-16 hidden md:block z-30 pointer-events-none">
        <span className="font-sans font-medium text-[10px] text-white/30 uppercase tracking-[0.2em] block">
          Current Section
        </span>
        <span className="font-sans font-semibold text-[12px] text-white uppercase tracking-wider block mt-1 transition-all duration-300">
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
                    ? "bg-[#ef4444] border-[#ef4444] scale-125"
                    : "bg-[#050505] border-white/20 hover:border-white"
                  }`}
              />
            );
          })}
        </div>
      </div>

      <CaseStudyHero
        title="The Science of Trust"
        subtitle="Designing the Cognitive Audit"
        description="An evidence-gated verification interface ensuring that conversational AI products align with human attention limits, cognitive safety guidelines, and the EU AI Act."
        meta={{
          "Role": "Solo Product Designer",
          "Timeline": "2024",
          "Focus": "AI Compliance / Cognitive Safety",
          "Backend": "Next.js / Supabase / Gemini Embeddings",
          "Poster": "/projects/tsot/hero.png"
        }}
        media={{
          type: "image",
          src: "/projects/tsot/hero.png"
        }}
        theme="dark"
        fullMedia={true}
      />

      {/* 1. THE HOOK */}
      <section id="intro" className="py-16 md:py-24 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto border-t border-white/10 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <span className="font-sans font-semibold text-[11px] text-white/40 uppercase tracking-widest block">
              01 / THE HOOK
            </span>
          </div>
          <div className="md:col-span-8 text-left space-y-6">
            <h3 className="font-sans font-normal text-[26px] md:text-[34px] leading-tight text-white tracking-tight font-serif">
              Designing an evidence-gated verification interface that prevents cognitive complacency.
            </h3>
            <p className="font-sans font-normal text-[17px] md:text-[19px] leading-relaxed text-white/70">
              Teams build conversational interfaces that prioritize short-term "magic" and low friction over cognitive clarity, leading to automation bias and anthropomorphic attachment.
              The challenge was designing an audit tool that forces product builders to introduce deliberate, beneficial friction back into user experiences.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CONTEXT */}
      <section id="context" className="py-16 md:py-24 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <span className="font-sans font-semibold text-[11px] text-white/40 uppercase tracking-widest block">
              02 / CONTEXT
            </span>
          </div>
          <div className="md:col-span-8 text-left space-y-6">
            <p className="font-sans font-normal text-[15px] md:text-[16px] leading-relaxed text-white/75">
              This tool was created for AI product designers, developers, and compliance teams auditing conversational agents against behavioral science research and the EU AI Act.
              Built as a solo project, the interface had to translate dense academic papers and legal codes into clear design adjustments.
              The primary constraint was maintaining absolute groundedness—preventing the auditor from fabricating compliance guidelines by locking claims behind database evidence.
            </p>
          </div>
        </div>
      </section>

      {/* 3. THE REAL PROBLEM */}
      <section id="problem" className="py-16 md:py-24 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <span className="font-sans font-semibold text-[11px] text-white/40 uppercase tracking-widest block">
              03 / THE REAL PROBLEM
            </span>
          </div>
          <div className="md:col-span-8 text-left space-y-6">
            <h3 className="font-sans font-normal text-[26px] md:text-[34px] leading-tight text-white tracking-tight font-serif">
              Conversational interfaces bypass human skepticism, triggering subconscious automation reliance.
            </h3>
            <p className="font-sans font-normal text-[15px] md:text-[16px] leading-relaxed text-white/60">
              Seamless AI chats feel premium, but they reduce cognitive friction to near-zero, inducing automation bias. Users trust machine output without cross-validating sources.
              Furthermore, simulators mimicking human emotional feedback run the risk of generating illegal anthropomorphic bonding under EU frameworks.
              Compliance isn't just about checklists; it requires inserting design constraints that protect user autonomy.
            </p>
          </div>
        </div>
      </section>

      {/* 4. KEY DECISIONS */}
      <section id="decisions" className="py-20 md:py-28 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto border-t border-white/10">
        <div className="w-full flex justify-between items-baseline mb-12 border-b border-white/10 pb-4">
          <span className="font-sans font-semibold text-[11px] text-white/40 uppercase tracking-widest">
            04 / KEY DECISIONS
          </span>
          <span className="font-sans font-medium text-[11px] text-white/30 uppercase tracking-widest">
            CLICK TO EXPAND
          </span>
        </div>

        <div className="space-y-4">
          {[
            {
              title: "Restructuring Search around Hybrid Discovery",
              why: "Allowed designers to query regulations and research papers using normal product terminology, avoiding complex legal article indices or formal academic jargon."
            },
            {
              title: "Strict Evidence-Gated Synthesis Controls",
              why: "Stopped AI fabrication. If fewer than 2 verified research documents match the user's bot description, the engine refuses to render specific compliance suggestions."
            },
            {
              title: "Scannable Risk-Tier Classification Scores",
              why: "Exposed clear compliance thresholds instantly, mapping product profiles against EU AI Act categories (Unacceptable, High, Medium, Low Risk)."
            },
            {
              title: "Sprint-Ready Design Remedy Tickets",
              why: "Translated abstract legal theories into actionable design cards, generating structured JIRA-ready scopes with clear acceptance criteria and academic citations."
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
                  <div className="px-6 pb-6 pt-2 border-t border-white/10 text-left bg-black rounded-b">
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-2 font-sans">Rationale</span>
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

      {/* 5. INTERACTIVE AUDITING SIMULATOR */}
      <section id="simulator" className="py-20 md:py-28 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto border-t border-white/10 bg-white/[0.01] rounded border border-white/5">
        <div className="w-full flex justify-between items-baseline mb-8">
          <span className="font-sans font-semibold text-[11px] text-white/40 uppercase tracking-widest">
            05 / COMPLIANCE SIMULATOR
          </span>
          <span className="font-sans font-medium text-[11px] text-white/30 uppercase tracking-widest">
            COGNITIVE AUDIT TERMINAL
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Left Column */}
          <div className="lg:col-span-5 text-left space-y-4 bg-white/[0.02] p-6 border border-white/10 rounded-sm">
            <span className="text-[11px] font-bold text-white/40 uppercase tracking-wider block border-b border-white/5 pb-2 font-sans">Select Bot Archetype</span>

            {scenarios.map((scen, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedScenario(idx);
                  setShowResultCard(false);
                }}
                disabled={isAuditing}
                className={`w-full text-left p-4 rounded text-[13px] border font-sans leading-relaxed transition-all ${selectedScenario === idx
                    ? "bg-white text-black border-white"
                    : "bg-transparent border-white/10 hover:border-white/30 text-white/70"
                  }`}
              >
                <div className="font-bold uppercase text-[10px] mb-1">{scen.title}</div>
                <div className="text-[11px] opacity-75">{scen.desc}</div>
              </button>
            ))}

            <button
              onClick={triggerAudit}
              disabled={isAuditing}
              className="w-full py-3.5 bg-[#ef4444] text-white font-sans text-[12px] uppercase font-bold tracking-wider hover:bg-[#d93838] disabled:opacity-50 transition-all rounded-[3px] mt-2 cursor-pointer"
            >
              {isAuditing ? "Audit Syncing..." : "Audit Interface"}
            </button>

          </div>

          {/* Terminal Right Column */}
          <div className="lg:col-span-7 border border-white/10 bg-black rounded p-5 flex flex-col justify-between min-h-[380px] shadow-2xl relative">

            {/* Live Terminal Log Output */}
            <div className="font-mono text-[12px] text-green-400 space-y-2 text-left">
              <div className="text-white/30 border-b border-white/5 pb-2 mb-2 uppercase text-[9px] tracking-widest font-sans flex justify-between items-center">
                <span>TSOT Console logs</span>
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
              </div>

              {auditLogs.map((log, idx) => (
                <div key={idx} className="transition-all duration-300">
                  &gt; {log}
                </div>
              ))}

              {isAuditing && <div className="animate-pulse text-amber-500">&gt; Parsing embeddings / running hybrid query...</div>}

              {auditLogs.length === 0 && !isAuditing && (
                <div className="p-8 text-center text-white/35 font-sans text-[13px] italic">
                  Select a bot configuration on the left and click "Audit Interface" to see compliance logs.
                </div>
              )}
            </div>

            {/* Compliance Results Card Overlay */}
            <AnimatePresence>
              {showResultCard && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 border-t border-white/15 pt-6 text-left space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block font-sans">Compliance Score</span>
                      <span className="text-[28px] font-bold text-white font-serif">{complianceScore}%</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block font-sans">Verdict</span>
                      <span className={`text-[12px] font-bold uppercase ${complianceScore < 50 ? 'text-red-500' : 'text-green-500'}`}>
                        {complianceVerdict}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block font-sans">Remediation Guidelines</span>
                    {sprintRemedies.map((rem, idx) => (
                      <div key={idx} className="text-[12px] text-white/80 border-l border-[#ef4444] pl-4 italic">
                        {rem}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </section>

      {/* 6. WHAT DIDN'T WORK AT FIRST */}
      <section id="friction" className="py-16 md:py-24 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4">
            <span className="font-sans font-semibold text-white/40 uppercase tracking-widest block">
              06 / WHAT DIDN'T WORK
            </span>
          </div>
          <div className="md:col-span-8 text-left space-y-6">
            <h4 className="font-sans font-bold text-[13px] text-white uppercase tracking-wider font-serif">The expert black box problem</h4>
            <p className="font-sans font-normal text-[15px] md:text-[16px] leading-relaxed text-white/60">
              Early versions summarized compliance findings without displaying underlying empirical metrics or citations. Designers felt it was an arbitrary "expert black box" and ignored audit recommendations.
              Rebuilding the layout to display verified citations (e.g., [#SOT-COMP-3011]) directly alongside each design guideline restored the empirical weight required to steer product team behaviors.
            </p>
          </div>
        </div>
      </section>

      {/* 7. OUTCOME */}
      <section id="outcome" className="py-20 md:py-28 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto border-t border-white/10">
        <div className="w-full flex justify-between items-baseline mb-12 border-b border-white/10 pb-4">
          <span className="font-sans font-semibold text-white/40 uppercase tracking-widest">
            07 / OUTCOME
          </span>
          <span className="font-sans font-medium text-white/30 uppercase tracking-widest">
            QUANTIFIED METRICS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="p-6 bg-white/[0.02] border border-white/5 rounded">
            <span className="font-sans text-[36px] md:text-[48px] font-bold text-white block tracking-tight leading-none font-serif">0 Speculation</span>
            <span className="font-sans text-[10px] text-white/40 uppercase tracking-wider font-semibold block mt-3">Groundedness Gate</span>
            <p className="font-sans text-[12px] text-white/50 mt-1 leading-normal">System refuses to guess recommendations when relevant database papers count is under 2.</p>
          </div>
          <div className="p-6 bg-white/[0.02] border border-white/5 rounded">
            <span className="font-sans text-[36px] md:text-[48px] font-bold text-white block tracking-tight leading-none font-serif">+63%</span>
            <span className="font-sans text-[10px] text-white/40 uppercase tracking-wider font-semibold block mt-3">Cross-Validation</span>
            <p className="font-sans text-[12px] text-white/50 mt-1 leading-normal">Forced checkpoints and interface friction increase student cross-checking during audits.</p>
          </div>
          <div className="p-6 bg-white/[0.02] border border-white/5 rounded">
            <span className="font-sans text-[36px] md:text-[48px] font-bold text-white block tracking-tight leading-none font-serif">XML Parsing</span>
            <span className="font-sans text-[10px] text-white/40 uppercase tracking-wider font-semibold block mt-3">Tag Isolation</span>
            <p className="font-sans text-[12px] text-white/50 mt-1 leading-normal">Strict XML output tags guarantee client-side parsing safety without regex formatting lag.</p>
          </div>
        </div>

        {/* What I'd Reconsider */}
        <div className="mt-12 p-6 border border-white/10 bg-white/[0.02] rounded-sm text-left space-y-4 font-sans">
          <span className="font-sans text-[11px] font-bold text-[#ef4444] uppercase tracking-widest block font-serif">08 / WHAT I&apos;D RECONSIDER & REFLECTION</span>
          
          <div className="space-y-4">
            <div className="p-4 bg-neutral-900 border border-white/10 rounded-sm">
              <h5 className="text-[13px] font-bold text-white uppercase tracking-wider mb-1">01. Simplifying Compliance Terminology for Non-Legal Users (Design)</h5>
              <p className="text-[14px] text-white/70 leading-relaxed">
                The regulatory audit HUD relies heavily on strict EU AI Act legal citations and empirical HCI metrics, which can feel intimidating for frontend developers. I would introduce plain-language summary cards and visual compliance badges alongside statutory citations to make risk assessments immediately actionable for non-legal design teams.
              </p>
            </div>

            <div className="p-4 bg-neutral-900 border border-white/10 rounded-sm">
              <h5 className="text-[13px] font-bold text-white uppercase tracking-wider mb-1">02. Local Vector Search Indexing & Embedding Caching (Technical)</h5>
              <p className="text-[14px] text-white/70 leading-relaxed">
                Querying compliance ledgers and research papers via live vector lookups can introduce latency during offline auditing. Pre-building lightweight client-side vector indices and caching embeddings in local browser storage would enable instant, offline compliance scans.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <span className="font-sans text-[11px] font-bold text-white/40 uppercase tracking-widest block mb-1 font-serif">Reflection</span>
            <p className="font-sans text-[14px] leading-relaxed text-white/75">
              Designing conversational AI requires un-learning standard &quot;zero-friction&quot; frameworks. Interfaces aligned with human cognitive limits require adding deliberate friction strategically, making compliance a natural design byproduct.
            </p>
          </div>
        </div>
      </section>

      {/* 8. COLLAPSIBLE DEEP PROCESS DRAWER */}
      <section className="py-12 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto flex flex-col items-center">
        <button
          onClick={() => setShowFullProcess(!showFullProcess)}
          className="px-8 py-4 border border-white text-white font-sans text-[12px] uppercase font-bold tracking-wider hover:bg-white hover:text-black transition-all duration-300 rounded-sm cursor-pointer"
        >
          {showFullProcess ? "Hide detailed process" : "See full process"}
        </button>

        {showFullProcess && (
          <div className="w-full mt-12 pt-12 border-t border-white/10 text-left space-y-12 animate-fadeIn font-sans">

            {/* SECTION 1: ARCHITECTURE DIAGRAM */}
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block font-sans">01 / RETRIEVAL ENGINE & FLOW</span>
              <h4 className="text-[16px] font-semibold text-white uppercase tracking-tight">Decoupled Audit Architecture</h4>
              <p className="font-sans text-[13px] text-white/60 leading-relaxed max-w-3xl">
                The TSOT auditor utilizes a split backend structure to retrieve academic findings:
              </p>
              <ul className="list-disc pl-5 text-[13px] text-white/60 space-y-1">
                <li><code>Frontend Next.js</code>: Renders the active audit components and dashboard.</li>
                <li><code>Supabase Tables</code>: Houses double registry stores (<code>registry</code> for HCI papers, <code>ai_act</code> for EU clauses).</li>
                <li><code>Retrieval Pipeline</code>: Generates text embeddings using Gemini, calls hybrid RPC searches, and feeds outputs to Gemini synthesis.</li>
              </ul>
            </div>

            {/* SECTION 2: HYBRID SEARCH SQL SCHEMA */}
            <div className="space-y-4 pt-10 border-t border-white/10">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block font-sans">02 / DATABASE RPC SCHEMA</span>
              <h4 className="text-[16px] font-semibold text-white uppercase tracking-tight font-sans">Supabase hybrid search RPC function</h4>
              <p className="font-sans text-[13px] text-white/60 leading-relaxed max-w-3xl">
                To cross-match legal articles and semantics, PostgreSQL queries run hybrid vector-keyword matching:
              </p>

              <div className="p-5 bg-neutral-950 rounded text-neutral-300 font-mono text-[11px] space-y-1 shadow-inner overflow-x-auto">
                <div>CREATE OR REPLACE FUNCTION hybrid_search_registry(</div>
                <div className="pl-4">query_embedding vector(768),</div>
                <div className="pl-4">query_text text,</div>
                <div className="pl-4">match_limit int,</div>
                <div className="pl-4">filter_pillar text</div>
                <div>) RETURNS TABLE (</div>
                <div className="pl-4">id bigint, code text, pillar text, title text, human_summary text, combined_score float</div>
                <div>) AS $$ ... $$ LANGUAGE plpgsql;</div>
              </div>
            </div>

            {/* SECTION 3: SYSTEM PROMPT SAFEGUARDS */}
            <div className="space-y-4 pt-10 border-t border-white/10">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block font-sans">03 / LLM PROMPT SAFEGUARDS</span>
              <h4 className="text-[16px] font-semibold text-white uppercase tracking-tight font-sans">Synthesis System Rules</h4>
              <ul className="list-disc pl-5 text-[13px] text-white/60 space-y-2 max-w-3xl">
                <li><strong>Groundedness Gate:</strong> If fewer than 2 relevant documents match, refuse to make specific compliance claims.</li>
                <li><strong>Citation Mandate:</strong> Inline citations must accompany every statement (e.g. <code>[#SOT-COMP-2026]</code>). No citation = no statement.</li>
                <li><strong>XML Encap Output:</strong> Synthesizes verdict score nodes in XML containers (<code>&lt;scores&gt;</code>, <code>&lt;findings&gt;</code>, <code>&lt;sprint&gt;</code>) for clean parsing.</li>
              </ul>
            </div>

          </div>
        )}
      </section>

      {/* FOOTER */}
      <CaseStudyFooter nextProject={{ name: "Scribe", href: "/projects/scribe" }} theme="dark" />
    </main>
  );
}
