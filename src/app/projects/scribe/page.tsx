"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import HeroBackground from "@/components/HeroBackground";
import CaseStudyNav from "@/components/case-study/CaseStudyNav";
import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import CaseStudyFooter from "@/components/case-study/CaseStudyFooter";
import MuxVideo from "@/components/MuxVideo";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const riskColors = {
  risk: "#ef4444",
  critique: "#f97316",
  opportunity: "#22c55e",
  redTeam: "#ef4444",
  bauhaus: "#06b6d4",
  market: "#f59e0b",
  deep: "#8b5cf6",
};

export default function ScribePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sunflowerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Hero Parallax removed or adjusted in standardized component

    // Sunflower Animation Simulation
    const nodes = gsap.utils.toArray(".sun-node");
    nodes.forEach((node: any, i) => {
        const angle = i * 137.5;
        const radius = Math.sqrt(i) * 30;
        gsap.fromTo(node, 
            { opacity: 0, scale: 0, x: 0, y: 0 },
            { 
                opacity: 0.8, scale: 1, 
                x: Math.cos(angle * (Math.PI / 180)) * radius, 
                y: Math.sin(angle * (Math.PI / 180)) * radius,
                duration: 1.5,
                delay: i * 0.05,
                scrollTrigger: {
                    trigger: sunflowerRef.current,
                    start: "top 80%",
                }
            }
        );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <main ref={containerRef} className="relative min-h-screen bg-white font-helvetica text-gray-900 selection:bg-black selection:text-white">
      <HeroBackground />
      <CaseStudyNav projectTitle="Scribe" category="Strategic Intelligence" />

      <CaseStudyHero
        title="Scribe"
        subtitle="Non-Linear Strategic Intelligence"
        description="Dissolving the context-collapse of modern productivity through hierarchical spatialization. Built entirely from scratch using AI-assisted development, I will be launching Scribe by the end of this year."
        meta={{
          "Role": "Complete Product Development",
          "Timeline": "6 Months and Going On",
          "Type": "Personal Project",
          "Repository": "https://github.com/shresthkushwaha/Scribe"
        }}
        media={{
          type: "video",
          src: "/projects/scribe/scribe.mp4"
        }}
        theme="light"
        fullMedia={true}
      />
      
      {/* Section 00: Systemic Friction (Storytelling) */}
      <section className="relative z-10 py-24 md:py-64 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto overflow-hidden">
         <div className="flex flex-col items-center justify-center text-center">
            <motion.div
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               transition={{ duration: 2 }}
               className="relative w-full max-w-2xl aspect-square flex items-center justify-center mb-20"
            >
               {/* Minimalist Chaos Illustration: Tangled Nodes with Central Decision Point */}
               <svg viewBox="0 0 400 400" className="w-full h-full stroke-black">
                  <motion.path
                    d="M 100 100 C 150 150 50 250 200 200 C 350 150 250 350 300 300 C 350 250 150 150 100 250 C 50 350 250 350 200 100"
                    fill="none"
                    strokeWidth="1"
                    className="opacity-10"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                  <motion.path
                    d="M 200 100 C 100 200 300 300 100 300 C 0 300 100 100 300 100 C 400 100 300 400 100 350"
                    fill="none"
                    strokeWidth="0.5"
                    className="opacity-5"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
                  />
                  {/* Central "Decision" point pulling things in */}
                  <motion.circle 
                    cx="200" cy="200" r="4" 
                    className="fill-black"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 0.8 }}
                    transition={{ delay: 1.5, duration: 1 }}
                  />
                  <motion.circle 
                    cx="200" cy="200" r="30" 
                    className="fill-none stroke-black/10"
                    strokeDasharray="4 4"
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                  />
               </svg>
               {/* Expanded Dialogues - 5 Bubbles in Close Proximity */}
               <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                 className="absolute top-[0%] left-[0%] bg-white/90 backdrop-blur-md p-4 border border-black/5 rounded-sm shadow-xl max-w-[240px] z-20"
               >
                 <p className="text-[13px] font-helvetica italic text-gray-600 leading-snug">
                    "50 pages of research, yet the strategy remains invisible behind a wall of noise."
                 </p>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                 className="absolute top-[25%] right-[0%] bg-white/90 backdrop-blur-md p-4 border border-black/5 rounded-sm shadow-xl max-w-[260px] z-20"
               >
                 <p className="text-[13px] font-helvetica italic text-gray-600 leading-snug">
                    "Important logic is buried in Slack threads and scattered docs. I'm losing the plot."
                 </p>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                 className="absolute bottom-[5%] left-[5%] bg-white/90 backdrop-blur-md p-4 border border-black/5 rounded-sm shadow-xl max-w-[220px] z-20"
               >
                 <p className="text-[13px] font-helvetica italic text-gray-600 leading-snug">
                    "Making high-stakes decisions shouldn't feel like guessing. I need a skeleton for my logic."
                 </p>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                 className="absolute bottom-[20%] right-[5%] bg-white/90 backdrop-blur-md p-4 border border-black/5 rounded-sm shadow-xl max-w-[240px] z-20"
               >
                 <p className="text-[13px] font-helvetica italic text-gray-600 leading-snug">
                    "Spending more time documenting the work than actually doing it. Context collapse is real."
                 </p>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.0 }}
                 className="absolute top-[15%] left-[20%] bg-white/90 backdrop-blur-md p-4 border border-black/5 rounded-sm shadow-xl max-w-[240px] z-20"
               >
                 <p className="text-[13px] font-helvetica italic text-gray-600 leading-snug">
                    "I can't find the 'Why' behind this feature anymore. It was here yesterday. Now it's buried."
                 </p>
               </motion.div>

               <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                  className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
                >
                  <h3 className="font-helvetica font-bold text-[32px] md:text-[64px] tracking-tighter text-black">The Cost of Noise</h3>
                </motion.div>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 1.8 }}
               className="max-w-3xl"
            >
               <p className="text-[22px] text-gray-400 font-light italic leading-relaxed">
                 High-stakes decisions require clarity, not just more data. I built Scribe to transform scattered fragments into a structural map, ensuring that the logic behind every move is visible, auditable, and impossible to lose.
               </p>
            </motion.div>
         </div>
      </section>

      {/* Section 01: The Strategic Defect (Discovery) */}
      <section className="relative z-10 py-24 md:py-64 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto border-t border-gray-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
           <div>
              <span className="text-[12px] md:text-[14px] font-bold text-gray-200 uppercase tracking-[0.5em] block mb-8 md:mb-12">01 / DISCOVERY</span>
              <h2 className="font-helvetica font-bold text-[42px] md:text-[80px] leading-[0.9] mb-8 md:mb-12 tracking-tight">The Linearity Trap</h2>
              <p className="text-[22px] text-gray-700 leading-relaxed font-light mb-12">
                 Product strategy is inherently non-linear, yet our tools (Jira, Linear, Asana) enforce a <strong className="text-black font-medium semi-bold">chronological debt</strong>. This mismatch creates "Strategic Entropy"—the loss of institutional context as projects scale.
              </p>
              
              <div className="space-y-16 mt-24">
                 {[
                   { title: "Context Collapse", desc: "Notes lose their spatial relationship within 48 hours of creation." },
                   { title: "Bias Reinforcement", desc: "Sequential lists favor recent data over foundational strategy." },
                   { title: "Information Siloing", desc: "Critical risks are buried under layers of task-based UI." }
                 ].map((item, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex gap-10 items-start"
                    >
                        <span className="font-mono text-[14px] font-bold text-black/20">0{i+1}</span>
                        <div>
                           <h4 className="text-[14px] font-black uppercase tracking-widest mb-2">{item.title}</h4>
                           <p className="text-[16px] text-gray-500 leading-relaxed font-medium">{item.desc}</p>
                        </div>
                    </motion.div>
                 ))}
              </div>
           </div>
           
           <div className="relative">
              <div className="sticky top-40 bg-gray-50 p-12 overflow-hidden border border-gray-100">
                 <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-gray-400 mb-10">Comparative Defect Audit</h4>
                 <div className="space-y-1">
                    {[
                      { tool: "Jira / Linear", feature: "Backlog Lists", defect: "Context Flattening", intensity: "CRITICAL" },
                      { tool: "Notion / Google Docs", feature: "Documents", defect: "Retrieval Latency", intensity: "HIGH" },
                      { tool: "Figma / Miro", feature: "Canvas", defect: "Structural Decay", intensity: "MODERATE" }
                    ].map((row, i) => (
                       <div key={i} className="grid grid-cols-2 py-8 border-b border-gray-200/50 group hover:bg-white transition-colors px-4 -mx-4">
                          <div>
                             <p className="text-[13px] font-bold uppercase">{row.tool}</p>
                             <p className="text-[11px] text-gray-400 font-mono mt-1">{row.feature}</p>
                          </div>
                          <div className="text-right">
                             <p className="text-[13px] font-black text-gray-500">{row.defect}</p>
                             <span className="text-[9px] font-mono bg-black text-white px-2 py-0.5 mt-2 inline-block tracking-widest">{row.intensity}</span>
                          </div>
                       </div>
                    ))}
                 </div>
                 <div className="mt-20 pt-10 border-t border-gray-200/50">
                    <p className="text-[12px] text-gray-400 leading-relaxed italic">
                       The audit revealed that "Strategic Rigor" is inversely proportional to "UI Ease-of-Use" in modern tools. Scribe aims to bridge this void.
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Section 02: The Logic Engine (Oatsen Lens) */}
      <section className="relative z-10 py-64 bg-black text-white overflow-hidden">
         <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
            <div className="max-w-4xl mb-24 md:mb-40">
               <span className="text-[12px] md:text-[14px] font-bold text-gray-600 uppercase tracking-[0.5em] block mb-8 md:mb-12">02 / LOGIC ENGINE</span>
               <h2 className="font-helvetica font-bold text-[48px] md:text-[100px] leading-[0.85] mb-8 md:mb-12 tracking-tighter">The Dual-Pass Extraction</h2>
               <p className="text-[24px] text-gray-400 leading-relaxed font-light">
                  To solve for Context Flattening, I developed a <strong className="text-white">Systemic Extraction Engine</strong> that decodes unstructured notes into a hierarchical spatial skeleton.
               </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-40 items-center">
               <div ref={sunflowerRef} className="relative aspect-square flex items-center justify-center">
                  {/* Sunflower Simulation Visual */}
                  <div className="absolute inset-0 bg-white/5 rounded-full border border-white/10 scale-90 animate-pulse"></div>
                  <div className="absolute w-2 h-2 bg-white rounded-full"></div>
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div 
                        key={i} 
                        className="sun-node absolute w-3 h-3 rounded-full bg-white transition-all duration-300 hover:scale-150 hover:bg-amber-400 cursor-pointer"
                        style={{ border: '2px solid rgba(0,0,0,0.5)' }}
                    ></div>
                  ))}
                  <div className="absolute bottom-[-60px] text-center w-full">
                     <p className="text-[10px] font-black uppercase tracking-[0.6em] text-gray-600">Sunflower Node Distribution (137.5°)</p>
                  </div>
               </div>

               <div className="space-y-24">
                  <div className="group">
                     <h4 className="text-[18px] font-black uppercase tracking-widest mb-8 flex items-center gap-4">
                        <span className="text-gray-700">01</span> SKELETONIZING PASS
                     </h4>
                     <p className="text-[16px] text-gray-500 leading-relaxed font-medium pl-10 border-l border-gray-800">
                        The AI first identifies "Strategic Anchors"—the gravity centers of the data. This builds the fundamental architecture before a single detail is mapped.
                     </p>
                  </div>
                  <div className="group">
                     <h4 className="text-[18px] font-black uppercase tracking-widest mb-8 flex items-center gap-4">
                        <span className="text-gray-700">02</span> ATOMIC POPULATION
                     </h4>
                     <p className="text-[16px] text-gray-500 leading-relaxed font-medium pl-10 border-l border-gray-800">
                        Once the skeleton is set, the "Leaves" (sentences/evidence) are extracted and clustered based on semantic resonance, ensuring no context is lost in the noise.
                     </p>
                  </div>
                  <div className="group">
                     <h4 className="text-[18px] font-black uppercase tracking-widest mb-8 flex items-center gap-4">
                        <span className="text-gray-700">03</span> VOID FINDING
                     </h4>
                     <p className="text-[16px] text-gray-500 leading-relaxed font-medium pl-10 border-l border-gray-800">
                        The layout engine searches for unoccupied X/Y space within the viewport coordinates to ensure large-scale clusters never overlap.
                     </p>
                  </div>
               </div>
            </div>
         </div>

         {/* Cinematic Full Width Image */}
         <div className="mt-64 relative w-full h-[80vh] bg-neutral-900 border-y border-white/5 overflow-hidden flex items-center">
            <Image 
              src="/projects/scribe/Scribe- graph light theme.png" 
              alt="GigaMap Interface" 
              className="object-contain w-full h-full opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
              width={1920}
              height={1080}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none"></div>
            <div className="absolute bottom-20 left-6 md:left-20 pointer-events-none">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 block text-white/50">Visual Interface 01</span>
                <h3 className="text-[24px] md:text-[40px] font-helvetica font-bold tracking-tighter max-w-xl text-white">Mapping 4,000+ logical nodes without information decay.</h3>
            </div>
         </div>
      </section>

      {/* NEW: Walkthrough Video Section */}
      <section className="relative z-10 py-32 md:py-64 bg-[#F8F8F8] px-6 md:px-12 lg:px-20 -mx-6 md:-mx-12 lg:-mx-20">
         <div className="max-w-[1400px] mx-auto">
            <div className="max-w-3xl mb-16 md:mb-24">
               <span className="text-[14px] font-bold text-gray-400 uppercase tracking-[0.5em] block mb-8 md:mb-12">DYNAMICS / WALKTHROUGH</span>
               <h2 className="font-helvetica font-bold text-[56px] md:text-[80px] leading-[0.9] mb-8 md:mb-12 tracking-tight">System Dynamics in Motion</h2>
               <p className="text-[20px] md:text-[22px] text-gray-700 leading-relaxed font-light">
                  A deep dive into the Scribe operating environment—witnessing the dual-pass extraction, the sunflower redistribution, and live adversarial swarming.
               </p>
            </div>

            <div className="flex flex-col gap-12 md:gap-24">
                <MuxVideo 
                    playbackId="I755xvZ9WF017k4dgPRdKox3UWlwSdfBkxhxwr2aWQu8" 
                    className="rounded-sm shadow-2xl"
                    metadata={{ video_title: "Scribe Interaction Logic 02" }}
                />
            </div>
         </div>
      </section>

      {/* Section 03: Strategic Protocols */}
      <section className="relative z-10 py-40 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto overflow-hidden">
         <div className="mb-24 md:mb-32">
            <span className="text-[12px] md:text-[14px] font-bold text-gray-400 uppercase tracking-[0.5em] block mb-8 md:mb-12">03 / ADVERSARIAL RIGOR & PROTOCOLS</span>
            <h2 className="font-helvetica font-bold text-[42px] md:text-[80px] leading-[0.9] mb-8 md:mb-12 tracking-tight">The Strategist Blueprint</h2>
            <p className="text-[18px] md:text-[22px] text-gray-700 leading-relaxed font-light max-w-3xl italic">
               Self-validation is a strategist's greatest blind spot. Scribe operates on a suite of <strong className="text-black">Strategic Protocols</strong> designed to ruthlessly pressure-test assumptions and enforce industrial logic.
            </p>
         </div>

         <div className="space-y-32">
             {/* Red Team Swarm */}
             <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-20">
                <div>
                   <h3 className="text-[28px] font-black uppercase tracking-tight mb-4">Red Team Swarm</h3>
                   <span className="inline-block px-3 py-1 bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-widest mb-6 border border-red-500/20">Protocol / Pressure Test</span>
                   <p className="text-[16px] text-gray-600 leading-relaxed">Spawns specialized 30+ AI personas to identify 'Suicide Points' in logic. Focuses on brutally adversarial critiques rather than helpful suggestions.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { name: "The Mercenary Auditor", role: "Margin Analysis / Risk", logic: "Queries if the capital burn is justified by the current logic.", color: "#ef4444" },
                    { name: "The Ethics Whistleblower", role: "Regulatory Compliance", logic: "Flags potential systemic friction points in the roadmap.", color: "#06b6d4" },
                    { name: "The Margin Hawk", role: "Economic Viability", logic: "Analyzes the scaling efficiency of the proposed trajectory.", color: "#f59e0b" },
                    { name: "The UX Executioner", role: "Friction Discovery", logic: "Highlights inconsistencies in user journey assumptions.", color: "#8b5cf6" }
                  ].map((persona, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-10 border border-gray-100 bg-white shadow-sm hover:shadow-xl hover:border-black transition-all duration-700 relative overflow-hidden group"
                    >
                       <div className="absolute top-0 right-0 w-12 h-12 flex items-center justify-center opacity-10 group-hover:opacity-100 transition-opacity">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: persona.color }}></div>
                       </div>
                       <h5 className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-6">{persona.role}</h5>
                       <h4 className="text-[18px] font-black uppercase tracking-tight mb-4">{persona.name}</h4>
                       <p className="text-[14px] text-gray-500 leading-relaxed font-medium italic">"{persona.logic}"</p>
                    </motion.div>
                  ))}
                </div>
             </div>

             <div className="w-full h-px bg-gray-100"></div>

             {/* Gaps Audit */}
             <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-20">
                <div>
                   <h3 className="text-[28px] font-black uppercase tracking-tight mb-4">Gaps Audit</h3>
                   <span className="inline-block px-3 py-1 bg-amber-500/10 text-amber-600 text-[10px] font-black uppercase tracking-widest mb-6 border border-amber-500/20">Protocol / Logic Verification</span>
                   <p className="text-[16px] text-gray-600 leading-relaxed">Acts as a "Hollow Space Architect". Scans the topology of the current roadmap and identifies unmapped risks and logical dead-ends.</p>
                </div>
                <div className="bg-gray-50 border border-gray-100 p-12">
                   <h4 className="text-[14px] font-black uppercase tracking-widest text-gray-800 mb-6 flex items-center gap-4">
                       <span className="w-2 h-2 rounded-full bg-amber-500"></span> Execution Example
                   </h4>
                   <p className="text-[16px] text-gray-500 leading-relaxed font-mono">
                      <span className="text-black font-bold">IF</span> "Aggressive Expansion" exists in graph<br/>
                      <span className="text-black font-bold">THEN</span> search for "Capital Burn" AND "Regulatory Friction"<br/>
                      <span className="text-black font-bold">ELSE</span> flag internal node as "Hollow Logic"
                   </p>
                </div>
             </div>

             <div className="w-full h-px bg-gray-100"></div>

             {/* Golden Path Synthesis */}
             <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-20">
                <div>
                   <h3 className="text-[28px] font-black uppercase tracking-tight mb-4">Golden Path</h3>
                   <span className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-6 border border-emerald-500/20">Protocol / Convergence</span>
                   <p className="text-[16px] text-gray-600 leading-relaxed">Convergent synthesis that distills scattered chaos into the single optimal alignment of actions necessary for success.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="border border-gray-200 p-8">
                       <span className="text-[10px] font-black text-gray-400 mb-4 block uppercase tracking-widest">Step 01</span>
                       <h4 className="font-bold mb-2">The Source</h4>
                       <p className="text-[13px] text-gray-500">Identify current bottleneck.</p>
                   </div>
                   <div className="border border-gray-200 p-8 border-l-4 border-l-black">
                       <span className="text-[10px] font-black text-gray-400 mb-4 block uppercase tracking-widest">Step 02</span>
                       <h4 className="font-bold mb-2">The Pivot</h4>
                       <p className="text-[13px] text-gray-500">Find the structural shift.</p>
                   </div>
                   <div className="border border-gray-200 p-8">
                       <span className="text-[10px] font-black text-gray-400 mb-4 block uppercase tracking-widest">Step 03</span>
                       <h4 className="font-bold mb-2">The Outcome</h4>
                       <p className="text-[13px] text-gray-500">High-fidelity end state.</p>
                   </div>
                </div>
             </div>

             <div className="w-full h-px bg-gray-100"></div>

             {/* FMEA & Blue Ocean & First Principles Grouped */}
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="border border-gray-100 p-10 hover:border-black transition-colors duration-500 group">
                    <h3 className="text-[18px] font-black uppercase tracking-tight mb-4 group-hover:text-amber-600 transition-colors">FMEA Analysis</h3>
                    <p className="text-[14px] text-gray-500 leading-relaxed">A rigorous high-tech stress test that proactively calculates Severity, Occurrence, and Detection limits for potential systemic failures in the graph structure.</p>
                </div>
                <div className="border border-gray-100 p-10 hover:border-black transition-colors duration-500 group">
                    <h3 className="text-[18px] font-black uppercase tracking-tight mb-4 group-hover:text-blue-500 transition-colors">Blue Ocean</h3>
                    <p className="text-[14px] text-gray-500 leading-relaxed">Value innovation pivot identification. Eliminates 'Red Ocean' traps mapping bloody competition boundaries to carve out uncontested strategic space.</p>
                </div>
                <div className="border border-gray-100 p-10 hover:border-black transition-colors duration-500 group">
                    <h3 className="text-[18px] font-black uppercase tracking-tight mb-4 group-hover:text-indigo-500 transition-colors">First Principles</h3>
                    <p className="text-[14px] text-gray-500 leading-relaxed">Deconstructs assumptions down to their absolutely undeniable basic truths. Challenges any node derived purely through analogical reasoning.</p>
                </div>
             </div>
         </div>
      </section>

      {/* Section 04: The Tactical HUD (Design System) */}
      <section className="relative z-10 py-40 mb-32 bg-[#fafafa] border-y border-gray-200/50">
         <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-end mb-40">
               <div>
                  <span className="text-[14px] font-bold text-gray-300 uppercase tracking-[0.5em] block mb-12">04 / DESIGN SYSTEM</span>
                  <h2 className="font-helvetica font-bold text-[56px] md:text-[80px] leading-[0.9] tracking-tight">Tactical Glassmorphism</h2>
               </div>
               <p className="text-[20px] text-gray-500 leading-relaxed font-light max-w-lg mb-4">
                  The design system is built to minimize <strong className="text-black">visual cognitive load</strong> while conveying high-intensity data through subtle atmospheric shifts and deliberate lack of cropping.
               </p>
            </div>

            <div className="grid grid-cols-1 gap-12">
               {/* Full uncropped Graph Image */}
               <div className="w-full relative shadow-2xl rounded-sm border border-black/5 bg-white p-2">
                  <Image 
                     src="/projects/scribe/Scribe- graph dark theme.png" 
                     alt="Tactical Side Bar & Graph Uncropped" 
                     width={3000} 
                     height={1600} 
                     className="w-full h-auto object-contain rounded-md"
                  />
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mt-32">
               <div>
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-8">Typography</h4>
                  <div className="space-y-6">
                     <div className="border-b border-gray-200 pb-4">
                        <p className="font-helvetica font-bold text-[32px] tracking-tighter">Helvetica Bold</p>
                        <p className="text-[10px] uppercase font-bold text-gray-400 mt-1">Foundational Anchors</p>
                     </div>
                     <div className="border-b border-gray-200 pb-4">
                        <p className="font-dm-sans text-[18px] font-black uppercase">DM SANS</p>
                        <p className="text-[10px] uppercase font-bold text-gray-400 mt-1">Technical HUD / Action</p>
                     </div>
                  </div>
               </div>
               
               <div>
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-8">Chromatic Rigor</h4>
                  <div className="flex flex-wrap gap-4">
                     {[riskColors.risk, riskColors.critique, riskColors.opportunity, "#000000", "#FFFFFF"].map((c, i) => (
                        <div key={i} className="w-10 h-10 shadow-sm border border-black/10" style={{ backgroundColor: c }}></div>
                     ))}
                  </div>
                  <p className="text-[11px] text-gray-400 mt-6 leading-relaxed font-medium">Mapped to strategic intensity levels from "Clinical" to "Adversarial".</p>
               </div>

               <div className="lg:col-span-2">
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-8">Optical Constants</h4>
                  <div className="grid grid-cols-2 gap-8">
                     <div className="p-8 bg-white border border-gray-200 shadow-sm">
                        <p className="text-[24px] font-mono font-black mb-1 text-black">12px</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Backdrop Blur</p>
                     </div>
                     <div className="p-8 bg-white border border-gray-200 shadow-sm">
                        <p className="text-[24px] font-mono font-black mb-1 text-black">180%</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Saturation Boost</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Section 05: Validation & Verdict */}
      <section className="relative z-10 py-40 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
         <div className="grid grid-cols-1 gap-32">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-32 items-center">
                <div>
                   <span className="text-[14px] font-bold text-gray-300 uppercase tracking-[0.5em] block mb-12">05 / VALIDATION</span>
                   <h2 className="font-helvetica font-bold text-[56px] md:text-[80px] leading-[0.9] mb-12 tracking-tight">The Clinical Verdict</h2>
                   <p className="text-[22px] text-gray-700 leading-relaxed font-light mb-12">
                      Validation was performed through a 12-week longitudinal study with academic design and engineering student, proffessors and proffesionals.
                   </p>
                   
                   <div className="space-y-12 mt-20">
                      <div className="flex items-end gap-6 border-b border-gray-100 pb-8">
                         <span className="text-[64px] font-helvetica font-bold leading-none tracking-tighter">78.5</span>
                         <p className="text-[11px] font-black uppercase tracking-widest text-gray-400 pb-2">SUS Score (Top 10%)</p>
                      </div>
                      <div className="flex items-end gap-6 border-b border-gray-100 pb-8">
                         <span className="text-[64px] font-helvetica font-bold leading-none tracking-tighter">92%</span>
                         <p className="text-[11px] font-black uppercase tracking-widest text-gray-400 pb-2">Context Retention</p>
                      </div>
                   </div>
                </div>

                <div className="relative shadow-2xl border border-gray-100 overflow-hidden bg-white p-2">
                    <Image 
                      src="/projects/scribe/Scribe - Graph dark theme node selectedd.png" 
                      alt="Final Product Visual" 
                      width={2400} 
                      height={1400} 
                      className="w-full h-auto object-contain rounded-md"
                    />
                </div>
            </div>
         </div>
      </section>

      {/* Final UI Collage */}
      <section className="relative z-10 py-64 bg-black text-white px-6 md:px-12 lg:px-20 rounded-t-[4rem]">
         <div className="max-w-[1600px] mx-auto">
            <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end gap-10">
               <div>
                  <h2 className="font-helvetica font-bold text-[36px] md:text-[64px] leading-tight tracking-tight">System Gallery</h2>
                  <p className="text-[15px] md:text-[16px] text-gray-400 font-light mt-4">Uncropped views of the Scribe interface states, dark modes, and tactical overlays.</p>
               </div>
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 mt-8 md:mt-0">Oatsen Operating Environment</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
               {/* Hero Detail: Full Width */}
               <div className="col-span-1 md:col-span-2 lg:col-span-3">
                   <Image src="/projects/scribe/Scribe- graph light theme zoomed.png" alt="Light Theme Zoomed" width={1920} height={1080} className="w-full h-auto object-contain rounded border border-white/10 bg-neutral-900 shadow-2xl"/>
               </div>
               
               {/* Left Column: Focused Detail */}
               <div className="flex flex-col gap-12">
                   <Image src="/projects/scribe/Scribe - graph workbench.png" alt="Graph Workbench" width={800} height={800} className="w-full h-auto object-contain rounded border border-white/10 bg-neutral-900"/>
                   <Image src="/projects/scribe/Screenshot 2026-04-08 090023.png" alt="System Detail" width={800} height={800} className="w-full h-auto object-contain rounded border border-white/10 bg-neutral-900"/>
               </div>

               {/* Middle Column: Strategist Logic (Made Bigger) */}
               <div className="col-span-1 md:col-span-1 lg:col-span-2 flex flex-col gap-12">
                   <Image src="/projects/scribe/Scribe - Graph ligh theme node selectedd.png" alt="Light Theme Node Selected" width={1600} height={1200} className="w-full h-auto object-contain rounded border border-white/10 bg-neutral-900 shadow-xl"/>
                   <div className="grid grid-cols-2 gap-12">
                      <Image src="/projects/scribe/Scribe- home- dark.png" alt="Home Dark Mode" width={800} height={1200} className="w-full h-auto object-contain rounded border border-white/10 bg-neutral-900"/>
                      <Image src="/projects/scribe/Scribe-note editor.png" alt="Note Editor" width={800} height={400} className="w-full h-auto object-contain rounded border border-white/10 bg-neutral-900"/>
                   </div>
               </div>
            </div>

            <div className="mt-40 text-center max-w-3xl mx-auto">
               <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-500 mb-10">End of Technical Audit</h3>
               <p className="text-[28px] font-helvetica font-bold leading-snug italic text-white/90">
                  "Scribe doesn't just manage knowledge; it spatializes thought. By decoupling time from strategy, I've created a platform for universal strategic clarity."
               </p>
            </div>
         </div>
      </section>

      <CaseStudyFooter nextProject={{ name: "Spandhika", href: "/projects/spandhika" }} theme="dark" />
    </main>
  );
}
