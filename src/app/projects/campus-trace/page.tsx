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

const StatusLabel = ({ text, className = "" }: { text: string; className?: string }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <div className="w-1.5 h-1.5 bg-[#00B4D8] animate-pulse" />
    <span className="text-[10px] font-black tracking-widest uppercase text-white/40">{text}</span>
  </div>
);

const NarrativePoint = ({ title, desc }: { title: string; desc: string }) => (
  <div className="p-6 bg-white/5 border border-white/10 rounded-sm">
    <span className="block text-[10px] font-black uppercase tracking-widest text-[#00B4D8] mb-2 font-dm-sans">{title}</span>
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
    
    // Defer GSAP initialization to ensure DOM is fully ready
    const rafId = requestAnimationFrame(() => {
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
    });

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <main ref={containerRef} className="relative z-10 bg-black min-h-screen font-helvetica text-white selection:bg-[#00B4D8] selection:text-white pb-32 overflow-x-hidden">
      <CaseStudyNav projectTitle="Campus Trace" category="Geospatial Provenance" />

      <CaseStudyHero
        title="Campus Trace"
        subtitle="Safe Campus Ecosystem"
        description="Bridging the gap between campus safety and student accountability through verified location intelligence."
        meta={{
          "Role": "Product Designer",
          "Timeline": "2024",
          "Impact": "200+ Reports",
          "Repository": "https://github.com/shresthkushwaha/CampusTrace"
        }}
        media={{
          type: "video",
          src: "/projects/campus-trace/camp-finale.mp4"
        }}
        theme="dark"
      />

      {/* 00. THE URBAN FRICTION */}
      <section className="relative z-10 py-24 md:py-64 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto overflow-hidden text-center">
         <div className="flex flex-col items-center justify-center">
               <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 2 }}
                  className="relative w-full max-w-2xl aspect-video flex items-center justify-center mb-20"
               >
               {/* Minimalist Grid SVG representing a campus map */}
               <svg viewBox="0 0 400 200" className="w-full h-full stroke-white/10">
                  <motion.path
                    d="M 0 50 H 400 M 0 100 H 400 M 0 150 H 400 M 50 0 V 200 M 100 0 V 200 M 150 0 V 200 M 200 0 V 200 M 250 0 V 200 M 300 0 V 200 M 350 0 V 200"
                    fill="none"
                    strokeWidth="0.5"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 3 }}
                  />
                  {/* Pulsing "Issue" points */}
                  <motion.circle cx="120" cy="80" r="4" className="fill-red-500" initial={{ scale: 0 }} whileInView={{ scale: 1 }} />
                  <motion.circle cx="280" cy="140" r="4" className="fill-[#00B4D8]" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 0.5 }} />
               </svg>

               <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 className="absolute top-0 left-0 bg-white/5 backdrop-blur-md p-4 border border-white/10 rounded-sm shadow-xl max-w-[240px] text-left"
               >
                 <p className="text-[13px] font-helvetica italic text-white/60 leading-snug">
                    "During rush hour, reporting a hazard feels impossible. You're just trying to get to class."
                 </p>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.3 }}
                 className="absolute bottom-0 right-0 bg-white/5 backdrop-blur-md p-4 border border-white/10 rounded-sm shadow-xl max-w-[240px] text-left"
               >
                 <p className="text-[13px] font-helvetica italic text-white/60 leading-snug">
                    "I reported the broken light last week, but nothing changed. Did they even see it?"
                 </p>
               </motion.div>

               <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
                >
                  <h3 className="font-helvetica font-bold text-[32px] md:text-[64px] tracking-tighter text-white uppercase italic">Silence in the Crowd</h3>
                </motion.div>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               className="max-w-3xl"
            >
               <p className="text-[22px] text-white/40 font-normal italic leading-relaxed">
                 Campus safety often falls through the cracks of busy schedules and fragmented communication. I built Campus Trace to turn passive observations into verified, actionable data—ensuring every student has a voice and every report has an owner.
               </p>
            </motion.div>
         </div>
      </section>

      {/* 01. THE ACCOUNTABILITY GAP */}
      <section className="video-section relative aspect-video md:h-screen w-full flex items-center overflow-hidden border-y border-white/10">
         <video 
            ref={videoRef}
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-30 scale-105"
         >
            <source src="/projects/campus-trace/rush-hour.mp4" type="video/mp4" />
         </video>
         <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
         
         <div className="relative z-10 px-6 md:px-24 lg:px-40 max-w-6xl">
            <div className="video-overlay-text">
               <span className="text-[11px] font-black tracking-[0.5em] text-[#00B4D8] uppercase block mb-8">The Problem</span>
               <h2 className="text-[48px] md:text-[100px] font-bold tracking-tighter leading-[0.85] mb-10 italic uppercase font-helvetica">
                 Urban <br/> Friction.
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                  <div className="space-y-6 text-white/40 text-[20px] leading-relaxed italic border-l border-[#00B4D8] pl-10">
                    <p>
                       VIT Vellore is a micro-city. With thousands of students moving between classes, reporting a broken facility or safety concern is often the last thing on anyone's mind.
                    </p>
                  </div>
                  <div className="p-8 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-sm space-y-6">
                     <span className="text-[10px] font-black uppercase tracking-widest text-[#00B4D8] block">The Observation</span>
                     <p className="text-[15px] text-white/50 italic leading-relaxed">Legacy reporting systems were too slow for a fast-moving campus. We needed a way to report in seconds, not minutes.</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 02. DESIGNING FOR SAFETY */}
      <section className="reveal-section opacity-0 translate-y-10 py-12 md:py-48 px-6 md:px-24 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
           <div className="mb-24 md:mb-40 max-w-4xl">
              <span className="char-reveal text-[11px] font-bold tracking-[0.5em] text-[#00B4D8] uppercase block mb-10">The Mission</span>
              <h2 className="text-[48px] md:text-[100px] font-bold italic tracking-tighter leading-[0.85] uppercase font-helvetica mb-12">
                Actionable <br/> Trust.
              </h2>
              <p className="text-[20px] md:text-[24px] text-white/40 italic max-w-2xl leading-relaxed font-normal">
                 I designed a system where every report is tied to a verified identity and a precise location, removing the anonymity that often leads to data clutter.
              </p>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-24">
              <div className="lg:col-span-2 overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                    <thead>
                       <tr className="border-b border-white/10">
                          <th className="py-6 text-[11px] font-black tracking-widest uppercase text-white/20">The Gap</th>
                          <th className="py-6 text-[11px] font-black tracking-widest uppercase text-[#00B4D8]">The Design Response</th>
                       </tr>
                    </thead>
                    <tbody className="text-[15px] italic text-white/60">
                       <tr className="border-b border-white/5 group hover:bg-white/[0.02] transition-colors">
                          <td className="py-8 font-bold text-white/80">Anonymous Reports</td>
                          <td className="py-8 text-white">Verified Google Identity Sync</td>
                       </tr>
                       <tr className="border-b border-white/5 group hover:bg-white/[0.02] transition-colors">
                          <td className="py-8 font-bold text-white/80">Vague Locations</td>
                          <td className="py-8 text-white">Interactive Pin-Drop Precision</td>
                       </tr>
                       <tr className="border-b border-white/5 group hover:bg-white/[0.02] transition-colors">
                          <td className="py-8 font-bold text-white/80">Disconnected Admin</td>
                          <td className="py-8 text-white">Real-time Resolution Dashboard</td>
                       </tr>
                    </tbody>
                 </table>
              </div>
              <div className="space-y-8">
                 <NarrativePoint title="Verified Access" desc="Every student enters through a secure, verified tunnel." />
                 <NarrativePoint title="Location Context" desc="Reports are automatically tied to the campus geography." />
              </div>
           </div>
        </div>
      </section>

      {/* 03. THE DESIGN ENGINE: LOGIC FLOW */}
      <section className="reveal-section opacity-0 translate-y-10 py-12 md:py-48 px-6 md:px-24 border-y border-white/10">
         <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-20 items-end mb-24 md:mb-40">
               <div className="flex-1">
                  <span className="text-[11px] font-bold tracking-[0.5em] text-[#00B4D8] uppercase block mb-10">Design Logic</span>
                  <h3 className="text-[48px] md:text-[80px] font-bold italic leading-[0.85] tracking-tighter uppercase max-w-4xl font-helvetica">
                    Intent to <br/> Action.
                  </h3>
               </div>
               <div className="w-full md:w-[400px] pb-6 border-b border-[#00B4D8]/20">
                  <p className="text-[18px] text-white/40 italic leading-relaxed font-normal">
                     I mapped the user journey to ensure that reporting a safety concern never felt like a chore.
                  </p>
               </div>
            </div>

            {/* IDENTITY FLOW DIAGRAM */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center mb-16 md:mb-32">
               {[
                 { step: "User Access", icon: "○", desc: "Entry point" },
                 { step: "Verification", icon: "◈", desc: "Identity Check" },
                 { step: "Data Integrity", icon: "⧉", desc: "Secure Storage" },
                 { step: "Shared Views", icon: "◫", desc: "Citizen / Admin" }
               ].map((item, i) => (
                 <div key={i} className="relative p-10 bg-white/[0.02] border border-white/10 flex flex-col items-center text-center group">
                    <span className="text-[40px] text-[#00B4D8] mb-6 font-normal">{item.icon}</span>
                    <h5 className="text-[14px] font-black tracking-widest uppercase mb-4 font-dm-sans">{item.step}</h5>
                    <p className="text-[11px] text-white/30 italic uppercase tracking-wider">{item.desc}</p>
                    {i < 3 && <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 text-[20px] text-white/10">→</div>}
                 </div>
               ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
               <div className="relative aspect-[4/3] bg-white/[0.03] border border-white/10 group overflow-hidden transition-all duration-1000 shadow-2xl">
                  <Image src="/projects/campus-trace/personal-view.png" alt="Mobile Entry Flow" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain p-4 md:p-8 transition-transform duration-[2s] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors pointer-events-none" />
                  <div className="absolute bottom-6 left-6 flex items-center gap-3">
                     <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                     <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/60">Mobile Ingress Stage</span>
                  </div>
               </div>
               <div className="space-y-10 py-10">
                  <h4 className="text-[24px] font-bold italic uppercase tracking-tight">The "Place & Refine" Process.</h4>
                  <p className="text-[16px] text-white/50 italic leading-relaxed border-l-2 border-[#00B4D8] pl-10 font-normal">
                    Accidental reports are avoided through a simple two-step process. After dropping a pin, a user can refine the location with precision before submitting the report through a simple form.
                  </p>
                  <div className="p-8 bg-white/5 border border-white/10">
                     <span className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-4">User Flow</span>
                     <p className="text-[20px] font-bold italic tracking-tighter">3 Simple Steps to Submit.</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 5. PHASE 4: VISUAL CONTRAST - DUAL UI */}
      <section className="reveal-section opacity-0 translate-y-10 py-12 md:py-48 px-6 md:px-24 bg-white text-black">
         <div className="max-w-7xl mx-auto">
            <div className="mb-24 flex flex-col md:flex-row items-baseline justify-between border-b border-black/10 pb-16">
               <h2 className="text-[42px] md:text-[80px] font-bold italic tracking-tighter leading-none uppercase font-helvetica font-bold">
                 Clear <br/> Visibility.
               </h2>
               <div className="max-w-sm space-y-4">
                  <span className="text-[11px] font-black tracking-[0.4em] text-[#00B4D8] uppercase font-dm-sans">Visual Design</span>
                  <p className="text-[18px] text-black/50 font-semibold italic">
                    Establishing a high-contrast custom map design for instant legibility.
                  </p>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-32 mb-20 md:mb-40">
               <div className="space-y-12">
                  <div className="space-y-6">
                     <h4 className="text-[28px] font-bold italic uppercase leading-none">The User Map.</h4>
                     <p className="text-[15px] text-black/60 leading-relaxed italic border-l-2 border-black/10 pl-8 font-normal">
                        Priority: **Ease of Use**. A minimalist design with simple interaction cards. The high-contrast map allows for instant orientation.
                     </p>
                  </div>
                  <div className="relative aspect-[16/10] bg-gray-50 border-[1px] border-black/10 shadow-2xl overflow-hidden group">
                     <Image src="/projects/campus-trace/global-view.png" alt="User Interface" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain p-4 md:p-8 transition-all duration-1000" />
                     <div className="absolute inset-0 border-[1px] border-black/5 pointer-events-none" />
                  </div>
               </div>
               <div className="space-y-12 lg:pt-32">
                  <div className="relative aspect-[16/10] bg-gray-50 border-[1px] border-black/10 shadow-2xl overflow-hidden group">
                     <Image src="/projects/campus-trace/admin-page.png" alt="Admin Dashboard" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain p-4 md:p-8 transition-all duration-1000" />
                     <div className="absolute inset-0 border-[1px] border-black/5 pointer-events-none" />
                  </div>
                  <div className="space-y-6">
                     <h4 className="text-[28px] font-bold italic uppercase leading-none">The Admin Dashboard.</h4>
                     <p className="text-[15px] text-black/60 leading-relaxed italic border-l-2 border-black/10 pl-8 font-normal">
                        Priority: **Information Clarity**. A split-screen design that separates the map from the incident feed. Reliable storage ensures all data is saved in real-time.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 6. AI SYNTHESIS: THEMATIC ANALYST */}
      <section className="reveal-section opacity-0 translate-y-10 py-12 md:py-60 px-6 md:px-24 bg-[#050505] relative">
         <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center relative z-10">
            <div className="space-y-12">
               <span className="text-[11px] font-black tracking-[0.5em] text-[#00B4D8] uppercase block font-dm-sans">Insight Generation</span>
               <h2 className="text-[42px] md:text-[72px] font-bold italic tracking-tighter leading-none uppercase font-helvetica drop-shadow-[0_0_20px_rgba(0,180,216,0.2)]">
                 Identifying <br/> Patterns.
               </h2>
               <div className="space-y-8 text-white/50 leading-relaxed font-normal italic border-l border-[#00B4D8] pl-10">
                  <p className="text-[18px]">
                     Individual reports only tell half the story. I designed the system to turn clustered data into actionable insights.
                  </p>
               </div>
            </div>
            <div className="relative aspect-[4/5] md:aspect-square flex items-center justify-center">
               <div className="parallax-img relative w-[85%] aspect-[4/3] border border-white/10 shadow-[0_0_100px_rgba(0,180,216,0.15)] overflow-hidden z-10 translate-x-[-10%] translate-y-[-10%] bg-white/5">
                  <Image src="/projects/campus-trace/ai-heatmap-1.png" alt="Report Cluster Analysis 01" fill sizes="(max-width: 1024px) 80vw, 40vw" className="object-contain p-4" />
               </div>
               <div className="parallax-img absolute w-[85%] aspect-[4/3] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden z-20 translate-x-[10%] translate-y-[10%] bg-white/5 group">
                  <Image src="/projects/campus-trace/ai-heatmap-2.png" alt="Report Cluster Analysis 02" fill sizes="(max-width: 1024px) 80vw, 40vw" className="object-contain p-4 transition-transform duration-[3s] group-hover:scale-110" />
                  <div className="absolute inset-0 border-[1px] border-[#00B4D8]/30 pointer-events-none" />
               </div>
               
               <div className="absolute top-0 right-0 z-30 flex flex-col items-end gap-2 p-8 text-right">
                  <span className="text-[42px] font-bold italic text-[#00B4D8] leading-none drop-shadow-2xl">87.5%</span>
                  <span className="text-[8px] font-black uppercase tracking-widest text-[#00B4D8] bg-[#00B4D8]/10 px-2 py-1">Analysis Accuracy</span>
               </div>
            </div>
         </div>
      </section>

      {/* 7. PHASE 5: VALIDATION - CLINICAL AUDIT */}
      <section className="reveal-section opacity-0 translate-y-10 py-12 md:py-40 px-6 md:px-24 bg-[#FAFAFA] text-black border-t border-black/10">
         <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-16 md:mb-32 border-b border-black/10 pb-20">
                <div className="max-w-2xl">
                   <h2 className="text-[48px] md:text-[90px] font-bold tracking-tighter mb-8 italic font-helvetica uppercase leading-none">Project <br/> Impact.</h2>
                   <p className="text-black/40 text-[20px] italic leading-relaxed font-semibold">
                      A review of the system's performance against user feedback and administrative goals.
                   </p>
                </div>
                <div className="text-right flex flex-col md:flex-row gap-8 md:gap-20 items-end">
                    <div className="flex flex-col items-end">
                        <span className="text-[70px] md:text-[100px] font-bold leading-[0.7] tracking-tighter text-[#00B4D8]">200+</span>
                        <span className="block text-[9px] md:text-[11px] font-black tracking-[0.4em] md:tracking-[0.6em] uppercase text-black/20 mt-4 italic">Problems Reported</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[70px] md:text-[100px] font-bold leading-[0.7] tracking-tighter text-[#00B4D8]">25+</span>
                        <span className="block text-[9px] md:text-[11px] font-black tracking-[0.4em] md:tracking-[0.6em] uppercase text-black/20 mt-4 italic">Heat Zones Identified</span>
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
               {[
                   { t: "Visibility", s: "5/5", d: "Real-time status updates in the Admin dashboard." },
                   { t: "Security", s: "5/5", d: "Google Auth ensures secure and verified reports." },
                   { t: "Design System", s: "5/5", d: "Clean, consistent design across all views." },
                   { t: "Reliability", s: "4.5/5", d: "Secure and reliable data storage." },
                   { t: "Efficiency", s: "5/5", d: "Three-step flow for quick and easy reporting." }
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
