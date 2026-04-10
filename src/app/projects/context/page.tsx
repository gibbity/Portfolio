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
        subtitle="Open Source Instrument"
        description="I am a Product Designer who used AI-assisted development for Context to solve a problem for the research community. Bridging the gap between OS-shortcuts and browser session state."
        meta={{
          "Role": "Product Designer",
          "Timeline": "Open Source",
          "Context": "Research Utility",
          "Repository": "https://github.com/shresthkushwaha/Context-extension.git"
        }}
        media={{
          type: "video",
          src: "/projects/context/context.mp4"
        }}
        theme="light"
        fullMedia={true}
      />

      {/* 01 / THE MISSION */}
      <section className="py-24 md:py-64 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto border-t border-gray-50 relative">
        <span className="parallax-index absolute top-40 right-10 text-[120px] md:text-[200px] font-black opacity-5 pointer-events-none select-none text-black/5">01</span>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32">
           <div className="reveal">
              <span className="text-[12px] md:text-[14px] font-bold text-gray-300 uppercase tracking-[0.5em] block mb-8 md:mb-12">01 / THE MISSION</span>
              <h2 className="font-helvetica font-bold text-[42px] md:text-[80px] leading-[0.9] mb-8 md:mb-12 tracking-tight italic">Logical Speed.</h2>
              <p className="text-[18px] md:text-[22px] text-gray-700 leading-relaxed font-light mb-12 italic">
                 As a designer, my frustration wasn't with pixels—it was with <strong className="text-black font-medium semi-bold">Cognitive Latency</strong>. I realized that my research workflows were failing because the browser couldn't keep up with my intent. I used AI to build this bridge and released it to ensure no researcher has to suffer context-collapse.
              </p>
              
              <div className="space-y-16 mt-24">
                 {[
                   { title: "Direct Contribution", desc: "No dev handoff. I leveraged Antigravity to translate my UX intent into production-ready open source code." },
                   { title: "Structural Logic", desc: "I architected a custom .url interceptor to bridge OS files with browser logic—redefining session access." },
                   { title: "Universal Utility", desc: "My focus was on building a tool that exists purely in the background, a silent partner in the research process." }
                 ].map((item, i) => (
                    <div key={i} className="flex gap-10 items-start">
                        <span className="font-mono text-[14px] font-bold text-black/20">0{i+1}</span>
                        <div>
                           <h4 className="text-[14px] font-black uppercase tracking-widest mb-2">{item.title}</h4>
                           <p className="text-[16px] text-gray-500 leading-relaxed font-light italic">"{item.desc}"</p>
                        </div>
                    </div>
                 ))}
              </div>
           </div>
           
           <div className="reveal sticky top-40 h-fit bg-gray-50 border border-gray-100 p-4 md:p-12 overflow-hidden flex items-center justify-center">
              <div className="relative w-full aspect-video rounded overflow-hidden border border-black/5 bg-white scale-105 shadow-2xl">
                 <Image src="/projects/context/Initial page without any shelvedd extension.png" alt="My Open Source Prototype" fill className="object-contain p-4 md:p-8" />
              </div>
           </div>
        </div>
      </section>

      {/* 02 / AI-DRIVEN HEURISTICS */}
      <section className="py-24 md:py-64 bg-[#F9FAFB] border-y border-gray-200/50 relative overflow-hidden text-center lg:text-left">
         <span className="parallax-index absolute top-20 left-10 text-[120px] md:text-[200px] font-black opacity-5 pointer-events-none select-none text-black/5">02</span>
         <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 items-center mb-16 md:mb-40 reveal text-center lg:text-left">
               <div>
                  <span className="text-[12px] md:text-[14px] font-bold text-gray-400 uppercase tracking-[0.5em] block mb-8 md:mb-12">02 / SMART SYSTEMS</span>
                  <h2 className="font-helvetica font-bold text-[42px] md:text-[80px] leading-[0.9] tracking-tight italic">Design-Led <br/> Heuristics.</h2>
               </div>
               <p className="text-[18px] md:text-[22px] text-gray-600 leading-relaxed font-light italic">
                  I didn't just want to save tabs; I wanted to automate the discovery of <strong className="text-black">Design Intent</strong>. I tuned my AI companion to build a semantic extraction engine that understands research context.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
               {[
                 { 
                    t: "WORD FREQUENCY FILTER", 
                    d: "I directed the AI to implement an NLP-lite parser that isolates unique project identifiers from generic browser titles.",
                    code: "words.filter(w => !stopWords.has(w))" 
                 },
                 { 
                    t: "DOMAIN INTENT MAPPING", 
                    d: "I mapped design-led intents directly to URLs: recognizing Figma and GitHub as immediate markers of active session priority.",
                    code: "if (domains.has('github.com'))"
                 },
                 { 
                    t: "ADAPTIVE NAMING", 
                    d: "By analyzing tab resonance across the active window, I automated the folder-naming process to be completely frictionless.",
                    code: "sortedWords.slice(0, 3).map(...)"
                 }
               ].map((item, i) => (
                  <div key={i} className="reveal p-10 bg-white border border-gray-100 transition-all duration-700 shadow-sm hover:shadow-2xl group relative overflow-hidden">
                     <div className="absolute top-0 left-0 w-1 h-0 bg-black group-hover:h-full transition-all duration-1000" />
                     <h4 className="text-[12px] font-black uppercase tracking-widest text-black/20 mb-6 group-hover:text-black transition-colors">AI-assisted Development Rule 0{i+1}</h4>
                     <h3 className="text-[20px] font-black uppercase tracking-tight mb-6">{item.t}</h3>
                     <p className="text-[15px] text-gray-500 font-light leading-relaxed mb-10 italic">"{item.d}"</p>
                     <div className="font-mono text-[10px] p-4 bg-gray-50 border border-gray-100 text-gray-400">
                        {item.code}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 03 / ARCHITECTURE */}
      <section className="py-24 md:py-64 bg-black text-white relative overflow-hidden">
         <span className="parallax-index absolute top-40 right-20 text-[120px] md:text-[200px] font-black opacity-10 pointer-events-none select-none">03</span>
         <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
            <div className="max-w-4xl mb-24 md:mb-40 reveal">
               <span className="text-[12px] md:text-[14px] font-bold text-gray-600 uppercase tracking-[0.5em] block mb-8 md:mb-12">03 / ARCHITECTURE</span>
               <h2 className="font-helvetica font-bold text-[48px] md:text-[100px] leading-[0.85] mb-8 md:mb-12 tracking-tighter italic text-white/90">Shadow <br/> Orchestration.</h2>
               <p className="text-[18px] md:text-[24px] text-gray-400 leading-relaxed font-light italic">
                  I used AI-assisted development to build a production-grade OS-Browser bridge using Manifest V3. I directed the AI to build a self-destructing interceptor protocol that bridges digital assets with the local filesystem.
               </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-40 items-center">
               <div className="reveal relative aspect-video flex items-center justify-center border border-white/5 bg-white/5 rounded-sm p-12 shadow-inner">
                  <div className="space-y-6 text-center w-full max-w-sm">
                     <div className="p-8 border border-white/10 bg-black/50 backdrop-blur-3xl rounded-sm">
                        <p className="text-[10px] font-black tracking-[0.4em] text-[#006D77] uppercase mb-4 italic">Locally Shelved Asset</p>
                        <div className="p-4 bg-white/5 border border-white/10 rounded-sm flex items-center justify-between">
                            <span className="text-[11px] font-mono text-white/40 italic">research_manifest.url</span>
                        </div>
                     </div>
                     <div className="h-10 w-px bg-linear-to-b from-[#006D77] to-transparent mx-auto" />
                     <div className="p-6 border border-white/10 bg-white/5 rounded-sm">
                        <p className="text-[10px] font-black tracking-[0.4em] text-white/50 uppercase mb-2">My V3 Interceptor</p>
                        <span className="text-[12px] font-mono text-white/60">Logic defined via design intent</span>
                     </div>
                  </div>
               </div>

               <div className="space-y-20">
                  {[
                    { t: "I BRIDGED THE OS GAP", d: "I leveraged AI to generate Internet shortcuts that talk directly to Chrome’s background thread, making digital assets feel as physical as documents." },
                    { t: "I PURSUED SYSTEM CLEANLINESS", d: "I tuned the service worker to automatically purge redundant launch tabs, ensuring the workspace remains clinically precise." },
                    { t: "I ORCHESTRATED FLOW", d: "By prioritizing local-first persistence, I ensured that massive contexts are captured and restored with absolute zero-lag." }
                  ].map((item, i) => (
                    <div key={i} className="reveal group border-l border-white/10 pl-10 py-4 hover:border-white transition-all duration-700">
                       <h4 className="text-[16px] font-black uppercase tracking-widest mb-4 flex items-center gap-4 text-white/80 group-hover:text-white">
                          <span className="text-white/20">0{i+1}</span> {item.t}
                       </h4>
                       <p className="text-[15px] text-gray-500 leading-relaxed font-light italic">
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
                  <span className="text-[14px] font-bold text-gray-300 uppercase tracking-[0.5em] block mb-12">04 / DATA PORTABILITY</span>
                  <h2 className="font-helvetica font-bold text-[56px] md:text-[80px] leading-[0.9] tracking-tight italic">Logical <br/> Sharing.</h2>
               </div>
               <p className="text-[22px] text-gray-500 leading-relaxed font-light max-w-lg mb-8">
                  As an open source tool, I ensured that context is completely portable. I architected a serialization layer that turns massive sessions into lightweight JSON and share-codes.
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
                  <h3 className="text-[24px] font-black uppercase tracking-tighter">My Base64 Protocol</h3>
                  <p className="text-[16px] text-gray-500 font-light leading-relaxed italic">
                    I implemented a custom serialization protocol to share 20+ tabs as a single string. It allows context to be pasted into Slack or research documents instantly.
                  </p>
                  <div className="font-mono text-[10px] p-4 bg-gray-50 text-gray-300 border border-gray-100 italic">
                     btoa(unescape(encodeURIComponent(JSON.stringify(session))))
                  </div>
               </div>

               <div className="reveal p-12 bg-white border border-gray-100 shadow-2xl space-y-10 relative group">
                  <div className="h-12 w-12 rounded-full bg-[#006D77] flex items-center justify-center">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M7 10L12 15M12 15L17 10M12 15V3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                     </svg>
                  </div>
                  <h3 className="text-[24px] font-black uppercase tracking-tighter">My JSON Persistence</h3>
                  <p className="text-[16px] text-gray-500 font-light leading-relaxed italic">
                    I architected a file-driven backup system using JSON blobs, bridging the gap between temporary browser states and permanent OS-level assets.
                  </p>
                  <div className="font-mono text-[10px] p-4 bg-gray-50 text-gray-300 border border-gray-100 italic">
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
               <span className="text-[14px] font-bold text-gray-300 uppercase tracking-[0.5em] block mb-12">05 / DESIGN ORCHESTRATION</span>
               <h2 className="font-helvetica font-bold text-[56px] md:text-[80px] leading-[0.9] tracking-tight italic text-black/90 lowercase">High-density <br/> retrieval.</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
               <div className="reveal relative aspect-[4/3] rounded-sm overflow-hidden border border-black/5 shadow-2xl bg-[#f0f0f0] p-4 md:p-10 flex items-center justify-center">
                  <Image src="/projects/context/Shelved extensions page.png" alt="My Library Dashboard" width={1000} height={800} className="object-contain shadow-sm" />
               </div>
               <div className="space-y-12 reveal">
                  {[
                    { t: "I PRIORITIZED FAVICON RECOGNITION", d: "I designed a clustered favicon system that allows me to identify a session visually in under 200ms—no reading required." },
                    { t: "I BUILT AGNOSTIC DASHBOARDS", d: "I implemented Grid vs. List toggles to handle everything from creative mood boards to exhaustive technical documentation audits." },
                    { t: "I ADDED REAL-TIME FILTERING", d: "I architected the tag and domain filter system to ensure I can retrieve any logical research burst in under 2 seconds." }
                  ].map((item, i) => (
                    <div key={i}>
                       <h4 className="text-[13px] font-black uppercase tracking-widest mb-2 flex items-center gap-4 text-black/40">
                          <span className="text-gray-200">0{i+1}</span> {item.t}
                       </h4>
                       <p className="text-[16px] text-gray-700 font-light leading-relaxed italic pr-12">
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
                        <p className="text-[14px] text-gray-400 font-light">Released as Open Source utility.</p>
                     </div>
                     <span className="text-[56px] font-helvetica font-bold tracking-tighter leading-none italic uppercase">MIT</span>
                  </div>
                  <div className="border-b border-gray-100 pb-10 flex justify-between items-end">
                     <div>
                        <p className="text-[12px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 italic">Design Autonomy</p>
                        <p className="text-[14px] text-gray-400 font-light">Engineering handoffs required.</p>
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
                  <h2 className="font-helvetica font-bold text-[48px] md:text-[100px] tracking-tighter mb-8 italic">UI Gallery</h2>
                  <p className="text-[16px] md:text-[20px] text-white/30 font-light leading-relaxed">I am showcasing uncropped, high-fidelity engineering states. Every pixel of the Open Source interface is visible at scale.</p>
                </div>
                <span className="text-[11px] font-black tracking-[0.4em] text-white/10 uppercase border-l border-white/10 pl-12 h-24 flex items-center italic text-right">UNFILTERED <br/> VISUAL RECORD</span>
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
                <h3 className="text-[11px] font-black uppercase tracking-[0.6em] text-white/20 mb-12 italic">End of MY Open Source Narrative</h3>
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
