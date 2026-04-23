"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import CaseStudyNav from "@/components/case-study/CaseStudyNav";
import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import CaseStudyFooter from "@/components/case-study/CaseStudyFooter";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContextPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. STAGGERED REVEALS - TEXT & BLOCKS
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

      // 2. BACKGROUND NUMBERS PARALLAX
      gsap.utils.toArray(".parallax-index").forEach((el: any) => {
        gsap.to(el, {
          y: -100,
          opacity: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });
      });

    // Hero Parallax removed or adjusted in standardized component

      // 4. UI GALLERY STAGE SCALING (SCRUBBED)
      gsap.utils.toArray(".gallery-stage").forEach((el: any) => {
        gsap.fromTo(el,
          { scale: 0.9, opacity: 0 },
          { 
            scale: 1, opacity: 1, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 95%",
              end: "top 60%",
              scrub: 1
            }
          }
        );
      });

      // 5. CINEMATIC TEXT SLIDE-UP
      gsap.utils.toArray(".text-reveal").forEach((el: any) => {
        gsap.from(el, {
          y: "100%",
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 95%"
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="relative min-h-screen bg-white font-helvetica text-gray-900 selection:bg-black selection:text-white pb-32 overflow-x-hidden">
      <CaseStudyNav projectTitle="Context" category="Open Source Utility" />

      <CaseStudyHero
        title="Context"
        subtitle="Speed of Intent"
        description="A lightweight bridge between research and execution. Designed to reduce context switching and reclaim mental focus."
        meta={{
          "Role": "Product Designer",
          "Timeline": "2024",
          "Impact": "Open Source",
          "Repository": "https://github.com/shresthkushwaha/Context-extension.git"
        }}
        media={{
          type: "video",
          src: "/projects/context/context.mp4"
        }}
        theme="light"
        fullMedia={true}
      />

      {/* 00. CONTEXT COLLAPSE */}
      <section className="relative z-10 py-24 md:py-64 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto overflow-hidden">
         <div className="flex flex-col items-center justify-center text-center">
               <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 2 }}
                  className="relative w-full max-w-2xl aspect-square flex items-center justify-center mb-20"
               >
               {/* Minimalist "Bridge" SVG */}
               <svg viewBox="0 0 400 400" className="w-full h-full stroke-black/10">
                  <motion.path
                    d="M 100 200 H 300"
                    fill="none"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1.5 }}
                  />
                  <motion.circle 
                    cx="200" cy="200" r="40" 
                    className="fill-none stroke-black/5"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                  />
                  {/* Floating particles representing "fragments" of thought */}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.circle 
                      key={i}
                      cx={150 + Math.random() * 100}
                      cy={150 + Math.random() * 100}
                      r="2"
                      className="fill-black/20"
                      animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
                      transition={{ duration: 3 + i, repeat: Infinity }}
                    />
                  ))}
               </svg>

               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 className="absolute top-[15%] left-[5%] bg-black/5 backdrop-blur-md p-4 border border-black/5 rounded-sm shadow-xl max-w-[240px] text-left"
               >
                 <p className="text-[13px] font-helvetica italic text-black/60 leading-snug">
                    "I had the perfect reference ten minutes ago. Now it's lost in a sea of forty open tabs."
                 </p>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.3 }}
                 className="absolute bottom-[15%] right-[5%] bg-black/5 backdrop-blur-md p-4 border border-black/5 rounded-sm shadow-xl max-w-[240px] text-left"
               >
                 <p className="text-[13px] font-helvetica italic text-black/60 leading-snug">
                    "Switching between my design file and the browser feels like a constant mental tax."
                 </p>
               </motion.div>

               <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
                >
                  <h3 className="font-helvetica font-bold text-[32px] md:text-[64px] tracking-tighter text-black uppercase italic">The Intent Gap</h3>
                </motion.div>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               className="max-w-3xl"
            >
               <p className="text-[22px] text-black/40 font-normal italic leading-relaxed">
                 Research is a fragile process. Every time we hunt for a tab or lose a reference, we pay a cognitive price. I built Context as a seamless bridge—a tool that understands your workflow and keeps your research exactly where you left it.
               </p>
            </motion.div>
         </div>
      </section>

      {/* 01. THE FRICTION */}
      <section className="py-24 md:py-64 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto border-t border-gray-50 relative">
        <span className="parallax-index absolute top-40 right-10 text-[120px] md:text-[200px] font-black opacity-5 pointer-events-none select-none text-black/5">01</span>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32">
           <div className="reveal">
              <span className="text-[11px] font-bold text-gray-300 uppercase tracking-[0.5em] block mb-12">The Problem</span>
              <h2 className="font-helvetica font-bold text-[42px] md:text-[80px] leading-[0.85] mb-12 tracking-tight italic uppercase">Mental <br/> Overhead.</h2>
              <p className="text-[18px] md:text-[22px] text-gray-700 leading-relaxed font-normal mb-12 italic">
                 As a designer, my frustration wasn't with the tools themselves, but with the **mental tax** of switching contexts. I realized that my research workflows were failing because the browser couldn't keep up with my intent.
              </p>
              
              <div className="space-y-16 mt-24">
                 {[
                   { title: "Bridge the Gap", desc: "Connecting local project files directly to browser research sessions." },
                   { title: "Reduce Noise", desc: "Automatically filtering out the clutter of generic search results." },
                   { title: "Reclaim Focus", desc: "Ensuring that the 'Why' behind a research session is never lost." }
                 ].map((item, i) => (
                    <div key={i} className="flex gap-10 items-start">
                        <span className="font-mono text-[14px] font-bold text-black/20">0{i+1}</span>
                        <div>
                           <h4 className="text-[14px] font-black uppercase tracking-widest mb-2">{item.title}</h4>
                           <p className="text-[16px] text-gray-500 leading-relaxed font-normal italic">"{item.desc}"</p>
                        </div>
                    </div>
                 ))}
              </div>
           </div>
           
           <div className="reveal sticky top-40 h-fit bg-gray-50 border border-gray-100 p-4 md:p-12 overflow-hidden flex items-center justify-center">
              <div className="relative w-full aspect-video rounded overflow-hidden border border-black/5 bg-white scale-105 shadow-2xl">
                 <Image src="/projects/context/Initial page without any shelvedd extension.png" alt="Context Prototype" fill className="object-contain p-4 md:p-8" />
              </div>
           </div>
        </div>
      </section>

      {/* 02. THE DESIGN ENGINE */}
      <section className="py-24 md:py-64 bg-[#F9FAFB] border-y border-gray-200/50 relative overflow-hidden">
         <span className="parallax-index absolute top-20 left-10 text-[120px] md:text-[200px] font-black opacity-5 pointer-events-none select-none text-black/5">02</span>
         <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center mb-24 md:mb-40 reveal">
               <div>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.5em] block mb-12">The Logic</span>
                  <h2 className="font-helvetica font-bold text-[48px] md:text-[100px] leading-[0.85] tracking-tight italic uppercase">Design-First <br/> Systems.</h2>
               </div>
               <p className="text-[20px] md:text-[24px] text-gray-600 leading-relaxed font-normal italic">
                  I didn't just want to save tabs; I wanted the system to understand my **design intent**.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {[
                 { 
                    t: "Heuristic Filtering", 
                    d: "Automatically identifying unique project names from cluttered browser tab titles.",
                    code: "words.filter(w => !stopWords.has(w))" 
                 },
                 { 
                    t: "Priority Platforms", 
                    d: "Recognizing design platforms like Figma and GitHub as priority work nodes.",
                    code: "if (domains.has('github.com'))"
                 },
                 { 
                    t: "Semantic Naming", 
                    d: "Suggesting contextually relevant folder names based on active tab clusters.",
                    code: "sortedWords.slice(0, 3).map(...)"
                 }
               ].map((item, i) => (
                  <div key={i} className="reveal p-10 bg-white border border-gray-100 shadow-sm hover:shadow-2xl group relative overflow-hidden transition-all duration-700">
                     <div className="absolute top-0 left-0 w-1 h-0 bg-black group-hover:h-full transition-all duration-1000" />
                     <h4 className="text-[10px] font-black uppercase tracking-widest text-black/20 mb-8 group-hover:text-black font-dm-sans">Refinement 0{i+1}</h4>
                     <h3 className="text-[20px] font-black uppercase tracking-tight mb-6">{item.t}</h3>
                     <p className="text-[15px] text-gray-500 font-normal leading-relaxed mb-10 italic">"{item.d}"</p>
                     <div className="font-dm-sans text-[10px] p-4 bg-gray-50 border border-gray-100 text-gray-400">
                        {item.code}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 03. THE ARCHITECTURE OF FOCUS */}
      <section className="py-24 md:py-64 bg-black text-white relative overflow-hidden">
         <span className="parallax-index absolute top-40 right-20 text-[120px] md:text-[200px] font-black opacity-10 pointer-events-none select-none">03</span>
         <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
            <div className="max-w-4xl mb-24 md:mb-40 reveal">
               <span className="text-[11px] font-bold text-gray-600 uppercase tracking-[0.5em] block mb-12 font-dm-sans">Design System</span>
               <h2 className="font-helvetica font-bold text-[48px] md:text-[100px] leading-[0.85] mb-8 md:mb-12 tracking-tighter italic text-white/90 uppercase">Behind the <br/> Scenes.</h2>
               <p className="text-[20px] md:text-[24px] text-gray-400 leading-relaxed font-normal italic">
                  I built a reliable bridge between your computer and browser—ensuring your research is always saved and ready when you need it.
               </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-40 items-center">
               <div className="reveal relative aspect-video flex items-center justify-center border border-white/5 bg-white/5 rounded-sm p-12 shadow-inner">
                  <div className="space-y-6 text-center w-full max-w-sm">
                     <div className="p-8 border border-white/10 bg-black/50 backdrop-blur-3xl rounded-sm">
                        <p className="text-[10px] font-black tracking-[0.4em] text-[#006D77] uppercase mb-4 italic font-dm-sans">Local Asset</p>
                        <div className="p-4 bg-white/5 border border-white/10 rounded-sm flex items-center justify-between">
                            <span className="text-[11px] font-dm-sans text-white/40 italic">research_manifest.url</span>
                        </div>
                     </div>
                     <div className="h-10 w-px bg-linear-to-b from-[#006D77] to-transparent mx-auto" />
                     <div className="p-6 border border-white/10 bg-white/5 rounded-sm">
                        <p className="text-[10px] font-black tracking-[0.4em] text-white/50 uppercase mb-2 font-dm-sans">The Interceptor</p>
                        <span className="text-[12px] font-dm-sans text-white/60">Logic defined by intent</span>
                     </div>
                  </div>
               </div>

               <div className="space-y-20">
                  {[
                    { t: "Connecting the browser to your computer", d: "I leveraged AI to create shortcuts that communicate directly with the browser, making your digital research feel as organized as physical documents." },
                    { t: "Keeping things organized", d: "The system automatically cleans up redundant tabs, ensuring your workspace remains clean and easy to navigate." },
                    { t: "Smooth Workflow", d: "By prioritizing reliable data saving, I ensured that even large research sessions are captured and restored instantly." }
                  ].map((item, i) => (
                    <div key={i} className="reveal group border-l border-white/10 pl-10 py-4 hover:border-white transition-all duration-700">
                       <h4 className="text-[16px] font-black uppercase tracking-widest mb-4 flex items-center gap-4 text-white/80 group-hover:text-white">
                          <span className="text-white/20">0{i+1}</span> {item.t}
                       </h4>
                       <p className="text-[15px] text-gray-500 leading-relaxed font-normal italic">
                          "{item.d}"
                       </p>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* 04 / DATA PORTABILITY */}
      <section className="py-24 md:py-64 px-6 md:px-24 border-b border-gray-100 bg-[#fafafa] relative overflow-hidden">
         <span className="parallax-index absolute top-40 left-20 text-[200px] font-black opacity-5 pointer-events-none select-none">04</span>
         <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-end mb-24 md:mb-40 reveal">
               <div>
                  <span className="text-[11px] font-bold text-gray-300 uppercase tracking-[0.5em] block mb-12 font-dm-sans">Collaboration</span>
                  <h2 className="font-helvetica font-bold text-[56px] md:text-[80px] leading-[0.85] tracking-tight italic uppercase">Global <br/> Sharing.</h2>
               </div>
               <p className="text-[20px] md:text-[24px] text-gray-500 leading-relaxed font-normal max-w-lg mb-8 italic">
                  I designed a system that turns complex research sessions into portable, shareable links.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
               <div className="reveal p-12 bg-white border border-gray-100 shadow-2xl space-y-10 relative group">
                  <div className="h-12 w-12 rounded-full bg-black flex items-center justify-center">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 16V4M7 4L4 7M7 4L10 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4 20H20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                     </svg>
                  </div>
                  <h3 className="text-[24px] font-black uppercase tracking-tighter">Simple Sharing Protocol</h3>
                  <p className="text-[16px] text-gray-500 font-normal leading-relaxed italic">
                    I implemented a way to share multiple tabs as a single string, making it easy to paste sessions into any communication tool.
                  </p>
                  <div className="font-dm-sans text-[10px] p-4 bg-gray-50 text-gray-300 border border-gray-100 italic">
                     btoa(unescape(encodeURIComponent(JSON.stringify(session))))
                  </div>
               </div>

               <div className="reveal p-12 bg-white border border-gray-100 shadow-2xl space-y-10 relative group">
                  <div className="h-12 w-12 rounded-full bg-[#006D77] flex items-center justify-center">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M7 10L12 15M12 15L17 10M12 15V3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     </svg>
                  </div>
                  <h3 className="text-[24px] font-black uppercase tracking-tighter">Reliable Saving</h3>
                  <p className="text-[16px] text-gray-500 font-normal leading-relaxed italic">
                    I built a backup system that saves your browser state as a permanent file, so you never lose your train of thought.
                  </p>
                  <div className="font-dm-sans text-[10px] p-4 bg-gray-50 text-gray-300 border border-gray-100 italic">
                     JSON.stringify(session, null, 2)
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 05 / DESIGN ORCHESTRATION */}
      <section className="py-24 md:py-64 px-6 md:px-24 relative overflow-hidden">
         <span className="parallax-index absolute top-40 right-20 text-[200px] font-black opacity-5 pointer-events-none select-none">05</span>
         <div className="max-w-[1400px] mx-auto">
            <div className="max-w-3xl mb-24 md:mb-40 reveal">
               <span className="text-[11px] font-bold text-gray-300 uppercase tracking-[0.5em] block mb-12 font-dm-sans">Interface Design</span>
               <h2 className="font-helvetica font-bold text-[56px] md:text-[100px] leading-[0.85] tracking-tighter italic text-black/90 uppercase">Finding <br/> Flow.</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
               <div className="reveal relative aspect-[4/3] rounded-sm overflow-hidden border border-black/5 shadow-2xl bg-[#f0f0f0] p-4 md:p-10 flex items-center justify-center">
                  <Image src="/projects/context/Shelved extensions page.png" alt="My Library Dashboard" width={1000} height={800} className="object-contain shadow-sm" />
               </div>
               <div className="space-y-12 reveal">
                  {[
                    { t: "Visual recognition", d: "I used a system of clear icons that helps you identify your research sessions at a glance—no reading required." },
                    { t: "Flexible Views", d: "I designed a dashboard that can toggle between different views, whether you're looking at visual mood boards or technical documents." },
                    { t: "Fast search", d: "I built a fast filtering system that lets you find any research session in under 2 seconds." }
                  ].map((item, i) => (
                    <div key={i}>
                       <h4 className="text-[13px] font-black uppercase tracking-widest mb-2 flex items-center gap-4 text-black/40">
                          <span className="text-gray-200">0{i+1}</span> {item.t}
                       </h4>
                       <p className="text-[16px] text-gray-700 font-normal leading-relaxed italic pr-12">
                         "{item.d}"
                       </p>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* 06 / THE VERDICT */}
      <section className="py-24 md:py-64 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 border-t border-gray-50 relative overflow-hidden">
         <span className="parallax-index absolute top-40 left-10 text-[200px] font-black opacity-5 pointer-events-none select-none">06</span>
         <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-32 items-center">
            <div className="reveal relative aspect-video rounded-sm overflow-hidden border border-gray-100 p-6 md:p-12 bg-[#F9FAFB] flex items-center justify-center shadow-[0_40px_80px_rgba(0,0,0,0.1)]">
               <Image 
                 src="/projects/context/selecting a context and looking at the webpages.png" 
                 alt="Final Open Source Instrument" 
                 width={1200} 
                 height={800} 
                 className="w-full h-full object-contain drop-shadow-2xl"
               />
            </div>
            <div className="reveal">
               <span className="text-[14px] font-bold text-gray-300 uppercase tracking-[0.5em] block mb-12">06 / THE VERDICT</span>
               <h2 className="font-helvetica font-bold text-[56px] md:text-[80px] leading-[0.85] mb-12 tracking-tighter italic">High-Agency Design.</h2>
               <div className="space-y-12">
                  <div className="border-b border-gray-100 pb-10 flex justify-between items-end">
                     <div>
                        <p className="text-[12px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 italic">Community Impact</p>
                        <p className="text-[14px] text-gray-400 font-normal">Released as an open source tool for the community.</p>
                     </div>
                     <span className="text-[56px] font-helvetica font-bold tracking-tighter leading-none italic uppercase">MIT</span>
                  </div>
                  <div className="border-b border-gray-100 pb-10 flex justify-between items-end">
                     <div>
                        <p className="text-[12px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 italic">Design Autonomy</p>
                        <p className="text-[14px] text-gray-400 font-normal">No engineering handoffs required.</p>
                     </div>
                     <span className="text-[56px] font-helvetica font-bold tracking-tighter leading-none italic">0<span className="text-[18px] text-gray-300">%</span></span>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* UI Gallery - CINEMATIC VERTICAL STACK WITH GSAP */}
      <section className="py-24 md:py-64 bg-[#0a0a0a] text-white rounded-t-[3rem] md:rounded-t-[5rem]">
          <div className="max-w-7xl mx-auto px-6 md:px-24">
             <div className="mb-24 md:mb-48 flex justify-between items-end flex-wrap gap-12 reveal">
                <div className="max-w-xl">
                  <h2 className="font-helvetica font-bold text-[48px] md:text-[100px] tracking-tighter mb-8 italic">Visual Gallery</h2>
                  <p className="text-[16px] md:text-[20px] text-white/30 font-normal leading-relaxed">I am showcasing full-quality screenshots of the tool in action. Every part of the interface is visible at scale.</p>
                </div>
                <span className="text-[11px] font-black tracking-[0.4em] text-white/10 uppercase border-l border-white/10 pl-12 h-24 flex items-center italic text-right">PROJECT <br/> GALLERY</span>
             </div>

             <div className="space-y-20 md:space-y-40">
                {/* LARGE FEATURE SHOT */}
                <div className="gallery-stage relative w-full aspect-video md:aspect-auto md:min-h-[85vh] bg-white/5 border border-white/10 rounded-sm overflow-hidden flex items-center justify-center p-4 md:p-24 shadow-2xl group">
                   <div className="absolute inset-0 bg-[#E8EFFF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-[2s]" />
                   <div className="relative w-full h-full min-h-[30vh] md:min-h-[400px]">
                      <Image src="/projects/context/Extension active.png" alt="My Open Source Creation" fill className="object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)]" />
                   </div>
                </div>

                {/* TWO COLUMN GRID FOR SECONDARY */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                   <div className="gallery-stage relative aspect-video md:aspect-square bg-white/5 border border-white/10 rounded-sm overflow-hidden flex items-center justify-center p-4 md:p-12 group shadow-inner">
                      <Image src="/projects/context/Extension- first time.png" alt="My User Journey" fill className="object-contain p-4 transition-transform duration-[3s]" />
                   </div>
                   <div className="gallery-stage relative aspect-video md:aspect-square bg-white/5 border border-white/10 rounded-sm overflow-hidden flex items-center justify-center p-4 md:p-12 group shadow-inner">
                      <Image src="/projects/context/Import context.png" alt="My Logic Stack" fill className="object-contain p-4 transition-transform duration-[3s]" />
                   </div>
                </div>

                {/* ULTRAWIDE FULL WIDTH SHOT */}
                <div className="gallery-stage relative w-full aspect-video md:aspect-[21/9] bg-white/5 border border-white/10 rounded-sm overflow-hidden flex items-center justify-center p-4 md:p-32 group shadow-inner">
                   <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.02] transition-opacity duration-[2s]" />
                   <div className="relative w-full h-full">
                      <Image src="/projects/context/Shelved extensions page.png" alt="My Interface Index" fill className="object-contain transition-all duration-[3s]" />
                   </div>
                </div>
             </div>
             
             <div className="mt-24 md:mt-48 text-center max-w-3xl mx-auto border-t border-white/5 pt-16 md:pt-32 reveal">
                <h3 className="text-[11px] font-black uppercase tracking-[0.6em] text-white/20 mb-12 italic">End of Project</h3>
                <p className="text-[24px] md:text-[40px] font-helvetica font-bold leading-[1.1] italic text-white/80">
                   "AI-assisted development isn't about laziness; it's about the speed of intent. Released as an Open Source utility, Context is my commitment to bridging the gap between imagination and execution."
                </p>
             </div>
          </div>
      </section>

      <CaseStudyFooter nextProject={{ name: "Scribe", href: "/projects/scribe" }} theme="dark" />
    </main>
  );
}
