"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import CaseStudyNav from "@/components/case-study/CaseStudyNav";
import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import CaseStudyFooter from "@/components/case-study/CaseStudyFooter";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ForensicDataLabel = ({ text, className = "" }: { text: string; className?: string }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <div className="w-1.5 h-1.5 bg-[#00B4D8] animate-pulse" />
    <span className="text-[10px] font-black tracking-widest uppercase text-white/40">{text}</span>
  </div>
);

const TechnicalPoint = ({ title, desc }: { title: string; desc: string }) => (
  <div className="p-6 bg-white/5 border border-white/10 rounded-sm">
    <span className="block text-[10px] font-black uppercase tracking-widest text-[#00B4D8] mb-2">{title}</span>
    <p className="text-[13px] text-white/40 italic leading-snug">{desc}</p>
  </div>
);

export default function CampusTraceOverhaul() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Hero Parallax removed or adjusted in standardized component

  useEffect(() => {
    setIsLoaded(true);
    const ctx = gsap.context(() => {
      // Staggered reveal for all sections
      gsap.utils.toArray(".reveal-section").forEach((section: any) => {
        gsap.to(section, {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        });
      });

      // Special reveal for the video problem section
      gsap.fromTo(".video-overlay-text", 
        { opacity: 0, x: -50 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 2, 
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".video-section",
            start: "top 60%"
          }
        }
      );

      // Parallax for images
      gsap.utils.toArray(".parallax-img").forEach((el: any) => {
        gsap.to(el, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });
      });

      // Character reveal for technical titles
      gsap.utils.toArray(".char-reveal").forEach((el: any) => {
        gsap.fromTo(el, 
          { opacity: 0, letterSpacing: "1em", filter: "blur(10px)" },
          { 
            opacity: 1, 
            letterSpacing: "0.5em", 
            filter: "blur(0px)", 
            duration: 1.5, 
            ease: "power4.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%"
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-black min-h-screen font-helvetica text-white selection:bg-[#00B4D8] selection:text-white pb-32 overflow-x-hidden relative">
      <CaseStudyNav projectTitle="Campus Trace" category="Geospatial Provenance" />

      <CaseStudyHero
        title="Campus Trace"
        subtitle="Geospatial Provenance"
        description="Essential technology for real-time incident archival. Eliminating systemic anonymity through forensic coordinate verification."
        meta={{
          "Role": "Product Designer",
          "Timeline": "6 Months",
          "Context": "Forensic Interaction Unit",
          "Repository": "https://github.com/shresthkushwaha/CampusTrace",
          "Live Site": "https://campus-trace-steel.vercel.app/"
        }}
        media={{
          type: "video",
          src: "/projects/campus-trace/camp-finale.mp4"
        }}
        theme="dark"
      />

      {/* 2. THE PROBLEM (KEPT AS IS) */}
      <section className="video-section relative h-[100vh] w-full flex items-center overflow-hidden border-y border-white/10">
         <video 
            ref={videoRef}
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105"
         >
            <source src="/projects/campus-trace/rush-hour.mp4" type="video/mp4" />
         </video>
         <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_90%)]" />
         
         <div className="relative z-10 px-6 md:px-24 lg:px-40 max-w-6xl">
            <div className="video-overlay-text">
               <span className="text-[12px] font-black tracking-[0.6em] text-red-500 uppercase block mb-8">Interaction Friction Alpha</span>
               <h2 className="text-[48px] md:text-[90px] font-bold tracking-tighter leading-none mb-10 italic uppercase font-helvetica drop-shadow-2xl">
                 Peak Hour <br/><span className="text-red-500">Chaos.</span>
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                  <div className="space-y-6 text-white/60 text-[18px] leading-relaxed italic border-l border-red-500/30 pl-8">
                    <p>
                       VIT Vellore serves as a high-density node where thousands of actors navigate simultaneously. During rush hour, reporting a safety issue becomes a secondary priority to survival.
                    </p>
                  </div>
                  <div className="p-8 bg-black/80 backdrop-blur-2xl border border-white/5 rounded-sm space-y-4">
                     <span className="text-[10px] font-black uppercase tracking-widest text-red-500 block">The Anonymity Gap</span>
                     <p className="text-[14px] text-white/40 italic">Legacy tools allow untraceable, anonymous reports with zero geospatial audit-trail. This leads to data noise and administrative paralysis.</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 3. PHASE 1: DISCOVERY - CLINICAL TABLE */}
      <section className="reveal-section opacity-0 translate-y-10 py-32 md:py-48 px-6 md:px-24 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
           <div className="mb-24">
              <span className="char-reveal text-[12px] font-black tracking-[0.5em] text-[#00B4D8] uppercase block mb-10">01. Discovery Phase</span>
              <h2 className="text-[42px] md:text-[80px] font-bold italic tracking-tighter leading-none uppercase max-w-4xl font-helvetica mb-12">
                Bridging the <br/> Logical Gap.
              </h2>
              <p className="text-[18px] text-white/40 italic max-w-2xl leading-relaxed">
                 Engineering a clinical record of campus state transitions, moving away from fragmented emergency calls and unauthenticated web forms.
              </p>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-32">
              <div className="lg:col-span-2 overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                    <thead>
                       <tr className="border-b border-white/20">
                          <th className="py-6 text-[11px] font-black tracking-widest uppercase text-white/30">Competitor Audit</th>
                          <th className="py-6 text-[11px] font-black tracking-widest uppercase text-white/30">Defect</th>
                          <th className="py-6 text-[11px] font-black tracking-widest uppercase text-[#00B4D8]">CT Solution</th>
                       </tr>
                    </thead>
                    <tbody className="text-[14px] italic text-white/70">
                       <tr className="border-b border-white/5 group hover:bg-white/[0.02] transition-colors">
                          <td className="py-8 font-bold">Standard Emergency Apps</td>
                          <td className="py-8 text-red-500/60">Proprietary "Black Box" silos.</td>
                          <td className="py-8 text-white font-medium">Open Cloud Sync (Supabase)</td>
                       </tr>
                       <tr className="border-b border-white/5 group hover:bg-white/[0.02] transition-colors">
                          <td className="py-8 font-bold">Static Web Forms</td>
                          <td className="py-8 text-red-500/60">Zero geospatial context.</td>
                          <td className="py-8 text-white font-medium">Geospatial HUD (MapLibre)</td>
                       </tr>
                       <tr className="border-b border-white/5 group hover:bg-white/[0.02] transition-colors">
                          <td className="py-8 font-bold">Email Reporting</td>
                          <td className="py-8 text-red-500/60">No RBAC or tracking.</td>
                          <td className="py-8 text-white font-medium">Admin Resolution Engine</td>
                       </tr>
                    </tbody>
                 </table>
              </div>
              <div className="space-y-6">
                 <TechnicalPoint title="Low Latency" desc="Reports durable within < 200ms of submission via clinical SQL triggers." />
                 <TechnicalPoint title="Identity Anchor" desc="Deterministic linkage to verified campus IDs using Google OAuth." />
                 <TechnicalPoint title="Precision" desc="Semantic Lucide iconography overlaid on high-density vector maps." />
              </div>
           </div>
        </div>
      </section>

      {/* 4. PHASE 3: LOGIC & FLOW - VISUAL COMPONENT */}
      <section className="reveal-section opacity-0 translate-y-10 py-32 md:py-48 px-6 md:px-24 border-y border-white/10">
         <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-20 items-end mb-32">
               <div className="flex-1">
                  <span className="text-[12px] font-black tracking-[0.5em] text-[#00B4D8] uppercase block mb-10">03. Logic & Flow</span>
                  <h3 className="text-[36px] md:text-[64px] font-bold italic leading-none tracking-tighter uppercase max-w-4xl font-helvetica">
                    Identity Anchor <br/> System Flow.
                  </h3>
               </div>
               <div className="w-full md:w-[320px] pb-6 border-b border-[#00B4D8]/20">
                  <p className="text-[14px] text-white/40 italic leading-snug">
                     A partitioned React application separating clinical logic from UI presentation for role-based immersion.
                  </p>
               </div>
            </div>

            {/* IDENTITY FLOW DIAGRAM */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center mb-32">
               {[
                 { step: "Public Access", icon: "○", desc: "Unauthenticated entry point" },
                 { step: "Identity Anchor", icon: "◈", desc: "Google OAuth Verification" },
                 { step: "RLS Audit", icon: "⧉", desc: "Supabase Row-Level Security" },
                 { step: "Dual-HUD", icon: "◫", desc: "User HUD / Admin Command Center" }
               ].map((item, i) => (
                 <div key={i} className="relative p-10 bg-white/[0.02] border border-white/10 flex flex-col items-center text-center group">
                    <span className="text-[40px] text-[#00B4D8] mb-6 font-light">{item.icon}</span>
                    <h5 className="text-[14px] font-black tracking-widest uppercase mb-4">{item.step}</h5>
                    <p className="text-[11px] text-white/30 italic uppercase tracking-wider">{item.desc}</p>
                    {i < 3 && <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 text-[20px] text-white/10">→</div>}
                 </div>
               ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
               <div className="relative aspect-[4/3] bg-white/[0.03] border border-white/10 group overflow-hidden transition-all duration-1000 shadow-2xl">
                  <Image src="/projects/campus-trace/personal-view.png" alt="Mobile Entry Flow" fill className="object-contain p-4 md:p-8 transition-transform duration-[2s] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors pointer-events-none" />
                  <div className="absolute bottom-6 left-6 flex items-center gap-3">
                     <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                     <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/60">Mobile Ingress Stage</span>
                  </div>
               </div>
               <div className="space-y-10 py-10">
                  <h4 className="text-[24px] font-bold italic uppercase tracking-tight">The "Place & Refine" Protocol.</h4>
                  <p className="text-[16px] text-white/50 italic leading-relaxed border-l-2 border-[#00B4D8] pl-10">
                    Accidental mis-clicks are eliminated through a two-step ingress path. A user drops a pin, surgical dragging allows for meter-precision refinement, and a terminal-style modal anchors the report to reality.
                  </p>
                  <div className="p-8 bg-white/5 border border-white/10">
                     <span className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-4">Submission Depth</span>
                     <p className="text-[20px] font-bold italic tracking-tighter">3 Interactions to Persistence.</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 5. PHASE 4: VISUAL CONTRAST - DUAL UI */}
      <section className="reveal-section opacity-0 translate-y-10 py-32 md:py-48 px-6 md:px-24 bg-white text-black">
         <div className="max-w-7xl mx-auto">
            <div className="mb-24 flex flex-col md:flex-row items-baseline justify-between border-b border-black/10 pb-16">
               <h2 className="text-[42px] md:text-[80px] font-bold italic tracking-tighter leading-none uppercase font-helvetica font-bold">
                 Clinical <br/> Visibility.
               </h2>
               <div className="max-w-sm space-y-4">
                  <span className="text-[11px] font-black tracking-[0.4em] text-[#00B4D8] uppercase">Phase 04: Visual Contrast</span>
                  <p className="text-[18px] text-black/50 font-medium italic">
                    Establishing a high-contrast 'Swiss Toon' map skin for instant legibility in high-glare environments.
                  </p>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 mb-40">
               <div className="space-y-12">
                  <div className="space-y-6">
                     <h4 className="text-[28px] font-bold italic uppercase leading-none">The User HUD.</h4>
                     <p className="text-[15px] text-black/60 leading-relaxed italic border-l-2 border-black/10 pl-8">
                        Priority: **Rapid Engagement**. A minimalist canvas with floating interaction cards. The high-contrast 'Global View' allows for instant geospatial orientation.
                     </p>
                  </div>
                  <div className="relative aspect-[16/10] bg-gray-50 border-[1px] border-black/10 shadow-2xl overflow-hidden group">
                     <Image src="/projects/campus-trace/global-view.png" alt="User Interface" fill className="object-contain p-4 md:p-8 transition-all duration-1000" />
                     <div className="absolute inset-0 border-[1px] border-black/5 pointer-events-none" />
                  </div>
               </div>
               <div className="space-y-12 lg:pt-32">
                  <div className="relative aspect-[16/10] bg-gray-50 border-[1px] border-black/10 shadow-2xl overflow-hidden group">
                     <Image src="/projects/campus-trace/admin-page.png" alt="Admin Dashboard" fill className="object-contain p-4 md:p-8 transition-all duration-1000" />
                     <div className="absolute inset-0 border-[1px] border-black/5 pointer-events-none" />
                  </div>
                  <div className="space-y-6">
                     <h4 className="text-[28px] font-bold italic uppercase leading-none">The Admin Command Center.</h4>
                     <p className="text-[15px] text-black/60 leading-relaxed italic border-l-2 border-black/10 pl-8">
                        Priority: **Data Density**. A bifurcated HUD design that separates the spatial map from the forensic record feed. High-fidelity archival is ensured through real-time sync.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 6. AI SYNTHESIS: THEMATIC ANALYST */}
      <section className="reveal-section opacity-0 translate-y-10 py-32 md:py-60 px-6 md:px-24 bg-[#050505] relative">
         <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
         
         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center relative z-10">
            <div className="space-y-12">
               <span className="text-[11px] font-black tracking-[0.5em] text-[#00B4D8] uppercase block">AI-Driven Synthesis</span>
               <h2 className="text-[42px] md:text-[72px] font-bold italic tracking-tighter leading-none uppercase font-helvetica drop-shadow-[0_0_20px_rgba(0,180,216,0.2)]">
                 Thematic <br/> Clusters.
               </h2>
               <div className="space-y-8 text-white/50 leading-relaxed font-light italic border-l border-[#00B4D8] pl-10">
                  <p className="text-[18px]">
                     Individual pins only tell half the story. I implemented **Thematic Analyst** logic using Gemini 3.1 Flash Lite to convert granular data node clusters into systemic insights.
                  </p>
                  <p className="text-[14px]">
                     The AI calculates mathematical centroids and dynamic radii, identifying share physical bottlenecks like "Vertical Accessibility Gaps" or "Temporal Congestion Nodes."
                  </p>
               </div>
            </div>
            <div className="relative aspect-[4/5] md:aspect-square flex items-center justify-center">
               <div className="parallax-img relative w-[85%] aspect-[4/3] border border-white/10 shadow-[0_0_100px_rgba(0,180,216,0.15)] overflow-hidden z-10 translate-x-[-10%] translate-y-[-10%] bg-white/5">
                  <Image src="/projects/campus-trace/ai-heatmap-1.png" alt="Report Cluster Analysis 01" fill className="object-contain p-4" />
               </div>
               <div className="parallax-img absolute w-[85%] aspect-[4/3] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden z-20 translate-x-[10%] translate-y-[10%] bg-white/5 group">
                  <Image src="/projects/campus-trace/ai-heatmap-2.png" alt="Report Cluster Analysis 02" fill className="object-contain p-4 transition-transform duration-[3s] group-hover:scale-110" />
                  <div className="absolute inset-0 border-[1px] border-[#00B4D8]/30 pointer-events-none" />
               </div>
               
               <div className="absolute top-0 right-0 z-30 flex flex-col items-end gap-2 p-8 text-right">
                  <span className="text-[42px] font-bold italic text-[#00B4D8] leading-none drop-shadow-2xl">87.5%</span>
                  <span className="text-[8px] font-black uppercase tracking-widest text-[#00B4D8] bg-[#00B4D8]/10 px-2 py-1">Synthesis Accuracy</span>
               </div>
            </div>
         </div>
      </section>

      {/* 7. PHASE 5: VALIDATION - CLINICAL AUDIT */}
      <section className="reveal-section opacity-0 translate-y-10 py-40 px-6 md:px-24 bg-[#FAFAFA] text-black border-t border-black/10">
         <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-32 border-b border-black/10 pb-20">
                <div className="max-w-2xl">
                   <h2 className="text-[48px] md:text-[90px] font-bold tracking-tighter mb-8 italic font-helvetica uppercase leading-none">Diagnostic <br/> Validation.</h2>
                   <p className="text-black/40 text-[20px] italic leading-relaxed font-medium">
                      A rigorous audit of interaction performance against administrative credibility and the SUS Projection.
                   </p>
                </div>
                <div className="text-right">
                    <span className="text-[100px] md:text-[160px] font-bold leading-[0.7] tracking-tighter text-[#00B4D8]">87<span className="text-[60px] md:text-[80px]">.5</span></span>
                    <span className="block text-[11px] font-black tracking-[0.6em] uppercase text-black/20 mt-4 italic">UX SUS SCORE (FORENSIC)</span>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
               {[
                   { t: "Visibility", s: "5/5", d: "Real-time status badges in Admin panel." },
                   { t: "Error Prevention", s: "5/5", d: "Google Auth prevents identity spoofing." },
                   { t: "Constraint Logic", s: "5/5", d: "Unified 2px Swiss design system." },
                   { t: "Persistence", s: "4.5/5", d: "Durable RLS-governed data archival." },
                   { t: "Efficiency", s: "5/5", d: "3-interaction flow to persistent storage." }
               ].map((audit, i) => (
                   <div key={i} className="space-y-6">
                       <span className="text-[11px] font-black tracking-[0.3em] uppercase text-[#00B4D8] block mb-2">{audit.t}</span>
                       <div className="h-[2px] w-full bg-black/5 overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            transition={{ duration: 1.5, delay: i * 0.2 }}
                            className="h-full bg-black/20" 
                          />
                       </div>
                       <p className="text-[28px] font-bold tracking-tighter italic leading-none">{audit.s}</p>
                       <p className="text-[13px] text-black/40 italic leading-snug">{audit.d}</p>
                   </div>
               ))}
            </div>
         </div>
      </section>

      <CaseStudyFooter nextProject={{ name: "Context", href: "/projects/context" }} theme="dark" />

    </main>
  );
}
