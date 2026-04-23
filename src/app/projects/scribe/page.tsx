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
import dynamic from "next/dynamic";
const MuxVideo = dynamic(() => import("@/components/MuxVideo"), { ssr: false });

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

    // Defer GSAP initialization by one animation frame so the browser
    // has fully painted the page before ScrollTrigger measures positions.
    // Without this, elements behind the preloader or before fonts load
    // get measured as height:0, causing wrong trigger positions.
    const rafId = requestAnimationFrame(() => {
      const ctx = gsap.context(() => {
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
        
        // Force a refresh once everything is set up
        ScrollTrigger.refresh();
      }, containerRef);

      return () => ctx.revert();
    });

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <main ref={containerRef} className="relative min-h-screen bg-white font-helvetica text-gray-900 selection:bg-black selection:text-white">
      <HeroBackground />
      <CaseStudyNav projectTitle="Scribe" category="Strategic Intelligence" />

      <CaseStudyHero
        title="Scribe"
        subtitle="A New Way to Organize Thought"
        description="Solving the problem of information overload through intuitive visual organization. Built from the ground up to help users connect disparate ideas into a cohesive strategy."
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
      
      {/* Section 00: The Creative Challenge (Storytelling) */}
      <section className="relative z-10 py-24 md:py-64 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto overflow-hidden">
         <div className="flex flex-col items-center justify-center text-center">
               <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 2 }}
                  className="relative w-full max-w-2xl aspect-[3/2] md:aspect-square flex items-center justify-center mb-12 md:mb-20"
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
                 className="absolute -top-4 -left-4 md:top-[0%] md:left-[0%] bg-white/90 backdrop-blur-md p-2 md:p-4 border border-black/5 rounded-sm shadow-xl max-w-[140px] md:max-w-[240px] z-20"
               >
                 <p className="text-[10px] md:text-[13px] font-helvetica italic text-gray-600 leading-snug">
                    "50 pages of research, yet the strategy remains invisible behind a wall of noise."
                 </p>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                 className="absolute top-[15%] -right-4 md:top-[25%] md:right-[0%] bg-white/90 backdrop-blur-md p-2 md:p-4 border border-black/5 rounded-sm shadow-xl max-w-[150px] md:max-w-[260px] z-20"
               >
                 <p className="text-[10px] md:text-[13px] font-helvetica italic text-gray-600 leading-snug">
                    "Important logic is buried in Slack threads and scattered docs. I'm losing the plot."
                 </p>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                 className="absolute -bottom-4 left-0 md:bottom-[5%] md:left-[5%] bg-white/90 backdrop-blur-md p-2 md:p-4 border border-black/5 rounded-sm shadow-xl max-w-[130px] md:max-w-[220px] z-20"
               >
                 <p className="text-[10px] md:text-[13px] font-helvetica italic text-gray-600 leading-snug">
                    "Making high-stakes decisions shouldn't feel like guessing. I need a skeleton for my logic."
                 </p>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                 className="absolute bottom-[10%] -right-4 md:bottom-[20%] md:right-[5%] bg-white/90 backdrop-blur-md p-2 md:p-4 border border-black/5 rounded-sm shadow-xl max-w-[140px] md:max-w-[240px] z-20"
               >
                 <p className="text-[10px] md:text-[13px] font-helvetica italic text-gray-600 leading-snug">
                    "Spending more time documenting the work than actually doing it. Context collapse is real."
                 </p>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.0 }}
                 className="absolute top-[5%] left-[15%] md:top-[15%] md:left-[20%] bg-white/90 backdrop-blur-md p-2 md:p-4 border border-black/5 rounded-sm shadow-xl max-w-[140px] md:max-w-[240px] z-20"
               >
                 <p className="text-[10px] md:text-[13px] font-helvetica italic text-gray-600 leading-snug">
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
               <p className="text-[22px] text-gray-400 font-normal italic leading-relaxed">
                 Great ideas require clarity, not just more data. I built Scribe to help people turn scattered fragments into a clear visual map, ensuring that the logic behind every decision is easy to see and impossible to lose.
               </p>
            </motion.div>
         </div>
      </section>

      {/* Section 01: The Discovery (Discovery) */}
      <section className="relative z-10 py-24 md:py-64 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto border-t border-gray-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
           <div>
              <span className="text-[12px] md:text-[14px] font-bold text-gray-300 uppercase tracking-[0.5em] block mb-8 md:mb-12">01 / THE PROBLEM</span>
              <h2 className="font-helvetica font-bold text-[42px] md:text-[80px] leading-[0.9] mb-8 md:mb-12 tracking-tight">The Problem with Lists</h2>
              <p className="text-[22px] text-gray-700 leading-relaxed font-normal mb-12">
                 Modern design and product work is complex, yet our tools (Jira, Linear, Asana) force everything into a simple <strong className="text-black font-semibold">vertical list</strong>. This makes it hard to see how different ideas connect as a project grows.
              </p>
              
              <div className="space-y-16 mt-24">
                 {[
                   { title: "Information Overload", desc: "Notes lose their meaning when they are just buried in a long list." },
                   { title: "Recency Bias", desc: "We tend to focus on the newest data instead of the most important ideas." },
                   { title: "Hidden Risks", desc: "Important details are often lost under layers of task-based design." }
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
                 <h4 className="text-[11px] font-black uppercase tracking-[0.5em] text-gray-400 mb-10">THE CURRENT LANDSCAPE</h4>
                 <div className="space-y-1">
                    {[
                      { tool: "Jira / Linear", feature: "Backlog Lists", defect: "Losing the Big Picture", intensity: "CRITICAL" },
                      { tool: "Notion / Google Docs", feature: "Documents", defect: "Hard to Find Info", intensity: "HIGH" },
                      { tool: "Figma / Miro", feature: "Canvas", defect: "Disorganized Layouts", intensity: "MODERATE" }
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
                       The research showed that as tools become "easier" to use, they often lose the ability to handle complex information. Scribe aims to solve both.
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Section 02: The Design Engine (System) */}
      <section className="relative z-10 py-32 md:py-64 bg-black text-white overflow-hidden">
         <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
            <div className="max-w-4xl mb-24 md:mb-40">
               <span className="text-[12px] md:text-[14px] font-bold text-gray-600 uppercase tracking-[0.5em] block mb-8 md:mb-12">02 / CORE SYSTEM</span>
               <h2 className="font-helvetica font-bold text-[48px] md:text-[100px] leading-[0.85] mb-8 md:mb-12 tracking-tighter">Organizing the Chaos</h2>
               <p className="text-[24px] text-gray-400 leading-relaxed font-normal">
                  To solve for information overload, I developed a <strong className="text-white">Smart Organization System</strong> that decodes unstructured notes into a clear visual structure.
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
                        <span className="text-gray-700">01</span> IDENTIFYING CORE IDEAS
                     </h4>
                     <p className="text-[16px] text-gray-500 leading-relaxed font-medium pl-10 border-l border-gray-800">
                        The system first identifies "Core Pillars"—the centers of your data. This builds the fundamental structure before a single detail is added.
                     </p>
                  </div>
                  <div className="group">
                     <h4 className="text-[18px] font-black uppercase tracking-widest mb-8 flex items-center gap-4">
                        <span className="text-gray-700">02</span> FILLING IN THE DETAILS
                     </h4>
                     <p className="text-[16px] text-gray-500 leading-relaxed font-medium pl-10 border-l border-gray-800">
                        Once the skeleton is set, individual notes and evidence are clustered based on meaningful connections, ensuring no context is lost in the noise.
                     </p>
                  </div>
                  <div className="group">
                     <h4 className="text-[18px] font-black uppercase tracking-widest mb-8 flex items-center gap-4">
                        <span className="text-gray-700">03</span> SMART LAYOUT
                     </h4>
                     <p className="text-[16px] text-gray-500 leading-relaxed font-medium pl-10 border-l border-gray-800">
                        The layout engine intelligently manages space on the screen to ensure large groups of ideas never overlap and remain easy to read.
                     </p>
                  </div>
               </div>
            </div>
         </div>

         {/* Cinematic Full Width Image */}
         <div className="mt-24 md:mt-32 relative w-full min-h-[30vh] md:h-[80vh] bg-neutral-900 border-y border-white/5 overflow-hidden flex items-center">
            <Image 
              src="/projects/scribe/Scribe- graph light theme.png" 
              alt="Graph Interface" 
              className="object-contain w-full h-auto opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
              width={1920}
              height={1080}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none"></div>
            <div className="absolute bottom-20 left-6 md:left-20 pointer-events-none">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 block text-white/50">Visual Interface 01</span>
                <h3 className="text-[24px] md:text-[40px] font-helvetica font-bold tracking-tighter max-w-xl text-white">Mapping thousands of ideas without losing the big picture.</h3>
            </div>
         </div>
      </section>

      {/* Section walkthrough Video Section */}
      <section className="relative z-10 py-12 md:py-64 bg-[#F8F8F8] px-6 md:px-12 lg:px-20 -mx-6 md:-mx-12 lg:-mx-20">
         <div className="max-w-[1400px] mx-auto">
            <div className="max-w-3xl mb-12 md:mb-12">
               <span className="text-[14px] font-bold text-gray-400 uppercase tracking-[0.5em] block mb-12">01 / DISCOVERY</span>
               <h2 className="font-helvetica font-bold text-[56px] md:text-[100px] leading-[0.9] mb-12 tracking-tight italic">Finding the Flow</h2>
               <p className="text-[20px] md:text-[24px] text-gray-700 leading-relaxed font-normal">
                  My research focused on how people naturally map complex ideas. Most users prefer spatial layouts over folders and lists. Scribe mimics the "Mind Map" but with the power of a digital system.
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

      {/* Section 03: Design Framework */}
      <section className="relative z-10 py-24 md:py-40 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto overflow-hidden">
         <div className="mb-24 md:mb-32">
            <span className="text-[12px] md:text-[14px] font-bold text-gray-400 uppercase tracking-[0.5em] block mb-8 md:mb-12">03 / TESTING THE LIMITS</span>
            <h2 className="font-helvetica font-bold text-[42px] md:text-[80px] leading-[0.9] mb-8 md:mb-12 tracking-tight">The Thought Framework</h2>
            <p className="text-[18px] md:text-[22px] text-gray-700 leading-relaxed font-normal max-w-3xl italic">
               Self-validation is often the hardest part of the design process. Scribe includes <strong className="text-black font-semibold">User-Centric Checks</strong> designed to help you spot gaps in your thinking and find better solutions.
            </p>
         </div>

         <div className="space-y-32">
             {/* Red Team Swarm */}
             <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-20">
                <div>
                   <h3 className="text-[28px] font-black uppercase tracking-tight mb-4">The Feedback Loop</h3>
                   <span className="inline-block px-3 py-1 bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-widest mb-6 border border-red-500/20">Testing & Refinement</span>
                   <p className="text-[16px] text-gray-600 leading-relaxed">Leverages specialized AI personas to simulate different user perspectives, helping to identify potential friction points in your project early on.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { name: "The Growth Analyst", role: "Business / Risk", logic: "Queries if the capital burn is justified by the current logic.", color: "#ef4444" },
                    { name: "The User Advocate", role: "Ethical Compliance", logic: "Flags potential systemic friction points in the roadmap.", color: "#06b6d4" },
                    { name: "The Product Strategist", role: "Economic Viability", logic: "Analyzes the scaling efficiency of the proposed trajectory.", color: "#f59e0b" },
                    { name: "The Design Critic", role: "Usability Discovery", logic: "Highlights inconsistencies in user journey assumptions.", color: "#8b5cf6" }
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
                   <h3 className="text-[28px] font-black uppercase tracking-tight mb-4">Finding the Gaps</h3>
                   <span className="inline-block px-3 py-1 bg-amber-500/10 text-amber-600 text-[10px] font-black uppercase tracking-widest mb-6 border border-amber-500/20">Logical Alignment</span>
                   <p className="text-[16px] text-gray-600 leading-relaxed">Acts as a "Design Guide", scanning your project to identify missing steps or potential roadblocks before they happen.</p>
                </div>
                <div className="bg-gray-50 border border-gray-100 p-12">
                   <h4 className="text-[14px] font-black uppercase tracking-widest text-gray-800 mb-6 flex items-center gap-4">
                       <span className="w-2 h-2 rounded-full bg-amber-500"></span> Logic Check Example
                   </h4>
                   <p className="text-[16px] text-gray-500 leading-relaxed font-mono">
                      <span className="text-black font-bold">IF</span> "Aggressive Expansion" exists in graph<br/>
                      <span className="text-black font-bold">THEN</span> search for "Missing Context" AND "Potential Friction"<br/>
                      <span className="text-black font-bold">ELSE</span> flag internal node as "Incomplete Logic"
                   </p>
                </div>
             </div>

             <div className="w-full h-px bg-gray-100"></div>

             {/* Golden Path Synthesis */}
             <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-20">
                <div>
                   <h3 className="text-[28px] font-black uppercase tracking-tight mb-4">Golden Path</h3>
                   <span className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-6 border border-emerald-500/20">Clarity & Focus</span>
                   <p className="text-[16px] text-gray-600 leading-relaxed">A refined summary that distills complex ideas into a simple, actionable path forward.</p>
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
                    <h3 className="text-[18px] font-black uppercase tracking-tight mb-4 group-hover:text-amber-600 transition-colors">Risk Analysis</h3>
                    <p className="text-[14px] text-gray-500 leading-relaxed">Proactively identifying potential issues in the design structure to ensure a robust user experience.</p>
                </div>
                <div className="border border-gray-100 p-10 hover:border-black transition-colors duration-500 group">
                    <h3 className="text-[18px] font-black uppercase tracking-tight mb-4 group-hover:text-blue-500 transition-colors">Market Opportunity</h3>
                    <p className="text-[14px] text-gray-500 leading-relaxed">Helping users find unique ways to stand out by mapping the competitive landscape in a clear, visual way.</p>
                </div>
                <div className="border border-gray-100 p-10 hover:border-black transition-colors duration-500 group">
                    <h3 className="text-[18px] font-black uppercase tracking-tight mb-4 group-hover:text-indigo-500 transition-colors">Core Principles</h3>
                    <p className="text-[14px] text-gray-500 leading-relaxed">Breaking complex problems down into their simplest parts to build better solutions from the ground up.</p>
                </div>
             </div>
         </div>
      </section>

      {/* Section 04: The Interface (Design System) */}
      <section className="relative z-10 py-24 md:py-40 mb-16 md:mb-32 bg-[#fafafa] border-y border-gray-200/50">
         <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-end mb-24 md:mb-40">
               <div>
                  <span className="text-[14px] font-bold text-gray-300 uppercase tracking-[0.5em] block mb-12">04 / DESIGN SYSTEM</span>
                  <h2 className="font-helvetica font-bold text-[56px] md:text-[80px] leading-[0.9] tracking-tight">Modern Glassmorphism</h2>
               </div>
               <p className="text-[20px] text-gray-500 leading-relaxed font-normal max-w-lg mb-4">
                  The design system is built to focus on <strong className="text-black font-semibold">clarity and ease of use</strong>, making it simple to manage large amounts of data without feeling overwhelmed.
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

         </div>
      </section>

      {/* Section 05: Project Results */}
      <section className="relative z-10 py-12 md:py-40 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 border-t border-gray-100">
         <div className="mb-24 md:mb-32">
            <span className="text-[12px] md:text-[14px] font-bold text-gray-300 uppercase tracking-[0.5em] block mb-8 md:mb-12">05 / RESULTS & IMPACT</span>
            <h2 className="font-helvetica font-bold text-[56px] md:text-[80px] leading-[0.9] mb-8 md:mb-12 tracking-tight">The Impact &<br/>Next Steps</h2>
            <p className="text-[18px] md:text-[22px] text-gray-700 leading-relaxed font-normal max-w-3xl italic">
               We tested the system through multiple iterations to ensure it was fast, reliable, and easy to use. The goal was to create a workspace that feels like a natural extension of how you think.
            </p>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 md:gap-24 mb-16 md:mb-32">
            {/* 1. Systemic Impact */}
            <div className="space-y-8">
               <h3 className="text-[18px] md:text-[20px] font-black uppercase tracking-tight flex items-center gap-4">
                  <span className="w-8 h-px bg-black"></span> Key Results
               </h3>
               <div className="space-y-6">
                  <div className="p-6 bg-gray-50 border">
                     <p className="text-[11px] font-black uppercase text-gray-400 mb-2 tracking-widest">Color System</p>
                     <p className="text-[14px] text-gray-600 leading-relaxed font-medium">Deliberate use of color to guide user attention and highlight the most important connections.</p>
                  </div>
                  <div className="p-6 bg-gray-50 border border-gray-100 italic">
                      <p className="text-[11px] font-black uppercase text-gray-400 mb-2 tracking-widest">Efficiency</p>
                      <p className="text-[15px] text-gray-600 leading-relaxed">
                         Users reported finding information faster and feeling less overwhelmed when working with complex projects.
                      </p>
                   </div>
               </div>
            </div>

            {/* 2. Technical Constraints */}
            <div className="space-y-8">
               <h3 className="text-[18px] md:text-[20px] font-black uppercase tracking-tight flex items-center gap-4">
                  <span className="w-8 h-px bg-black"></span> Considerations
               </h3>
               <div className="space-y-6">
                  <div className="p-6 bg-gray-50 border border-gray-100 italic">
                     <p className="text-[11px] font-black uppercase text-gray-400 mb-2 tracking-widest">Experience vs. Performance</p>
                      <p className="text-[15px] text-gray-600 leading-relaxed">
                         Balancing complex visual features with the need for a fast, responsive interface across all devices.
                      </p>
                  </div>
                  <div className="p-6 bg-gray-50 border border-gray-100 italic">
                     <p className="text-[11px] font-black uppercase text-gray-400 mb-2 tracking-widest">Interface Experience</p>
                      <p className="text-[15px] text-gray-600 leading-relaxed">
                         Ensuring the system handles data processing smoothly so the user stays focused on their work.
                      </p>
                  </div>
               </div>
            </div>

            {/* 3. Future Roadmap */}
            <div className="space-y-8">
               <h3 className="text-[18px] md:text-[20px] font-black uppercase tracking-tight flex items-center gap-4">
                  <span className="w-8 h-px bg-black"></span> Future Roadmap
               </h3>
               <div className="space-y-6">
                  <div className="p-6 bg-black text-white italic shadow-xl">
                     <p className="text-[10px] font-black uppercase text-gray-500 mb-2 tracking-widest">Next Phase</p>
                     <p className="text-[14px] leading-relaxed">
                        Refining the layout algorithms to handle even larger data sets while keeping the experience smooth and intuitive.
                     </p>
                  </div>
                  <div className="p-6 bg-gray-50 border border-gray-100 italic">
                     <p className="text-[11px] font-black uppercase text-gray-400 mb-2 tracking-widest">Automated Contextual Linking</p>
                     <p className="text-[15px] text-gray-600 leading-relaxed">
                        Integration of LLM-based semantic analysis to suggest connections between disparate nodes without manual user intervention.
                     </p>
                  </div>
                  <div className="p-6 bg-gray-50 border">
                     <p className="text-[11px] font-black uppercase text-gray-400 mb-2 tracking-widest">Design Details</p>
                     <p className="text-[14px] text-gray-600 leading-relaxed font-medium">Fine-tuned spacing and typography to ensure every element is easy to read and interact with.</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Final UI Collage */}
      <section className="relative z-10 py-32 md:py-64 bg-black text-white px-6 md:px-12 lg:px-20 rounded-t-[4rem]">
         <div className="max-w-[1600px] mx-auto">
            <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end gap-10">
               <div>
                  <h2 className="font-helvetica font-bold text-[36px] md:text-[64px] leading-tight tracking-tight">Product Gallery</h2>
                  <p className="text-[15px] md:text-[16px] text-gray-300 font-normal mt-4">Exploring the different modes and views of the Scribe interface.</p>
               </div>
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 mt-8 md:mt-0">Scribe Design System</span>
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
               <p className="text-[28px] font-helvetica font-bold leading-snug italic text-white/90">
                  "Scribe is about more than just organizing notes—it's about helping you see the connections you didn't know were there."
               </p>
            </div>
         </div>
      </section>

      <CaseStudyFooter nextProject={{ name: "Spandhika", href: "/projects/spandhika" }} theme="dark" />
    </main>
  );
}
