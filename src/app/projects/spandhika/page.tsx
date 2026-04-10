"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Lottie from "lottie-react";
import animationData from "./spandhika.json";
import CaseStudyNav from "@/components/case-study/CaseStudyNav";
import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import CaseStudyFooter from "@/components/case-study/CaseStudyFooter";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SpandhikaProfessionalUX() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  // Scroll parallax removed in favor of standardized hero structure or keeping if needed
  // For Spandhika, we'll keep the Lottie as a background decorative element but use the standard hero structure

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal for all sections
      gsap.utils.toArray(".reveal-section").forEach((section: any) => {
        gsap.to(section, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        });
      });

      // Parallax for full-page images
      gsap.utils.toArray(".parallax-full").forEach((el: any) => {
        gsap.to(el, {
          yPercent: -15, // Subtle parallax
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });
      });

      gsap.utils.toArray(".parallax-slow").forEach((el: any) => {
        gsap.to(el, {
          y: -40,
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
  }, []);

  return (
    <main ref={containerRef} className="bg-[#050505] min-h-screen font-helvetica text-white selection:bg-[#006D77] selection:text-white pb-32 overflow-x-hidden">
      <CaseStudyNav projectTitle="Spandhika" category="AR-UX Case Study" />

      <div className="relative">
        {/* Background Lottie Layer */}
        <div className="absolute inset-0 z-0 h-screen w-full pointer-events-none opacity-40">
           <Lottie 
              animationData={animationData} 
              loop={true} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/0 via-[#050505]/50 to-[#050505]" />
        </div>

        <CaseStudyHero
          title="Spandhika"
          subtitle="Medical-Grade Telemetry"
          description="Redesigning a clinical diagnostic environment for the next generation of biomechanical researchers."
          layout="stacked"
          meta={{
            "Role": "UI/UX Design Intern",
            "Timeline": "2024",
            "Context": "High-Fidelity Research"
          }}
          media={{
            type: "image",
            src: "/projects/spandhika/Mockup dark- full screen.png"
          }}
          theme="dark"
        />
      </div>

      {/* 2. OVERVIEW */}
      <section className="reveal-section opacity-0 translate-y-10 py-10 md:py-32 px-6 md:px-24 bg-[#080808]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
           <div className="lg:col-span-4 space-y-12">
              <span className="text-[11px] font-bold tracking-[0.5em] text-[#006D77] uppercase block">Diagnostics Context</span>
              <div className="space-y-6 border-l border-white/10 pl-6">
                 <div>
                    <span className="block text-[9px] text-white/30 uppercase tracking-widest mb-1">Position</span>
                    <p className="text-[15px] font-medium">UI/UX Design Intern</p>
                 </div>
                 <div>
                    <span className="block text-[9px] text-white/30 uppercase tracking-widest mb-1">Core Focus</span>
                    <p className="text-[15px] font-medium leading-tight">Architecture & Clinical HUD Systems</p>
                 </div>
              </div>
           </div>
           <div className="lg:col-span-8">
               <div className="mb-10 px-6 py-4 border-l-2 border-[#006D77] bg-[#006D77]/5 inline-block">
                  <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#006D77] mb-1">Administrative Notice</p>
                  <p className="text-[13px] text-white/60 italic">This project is under a non-disclosure agreement (NDA). Detailed systemic logic and internal proprietary workflows have been omitted from this public archival.</p>
               </div>
              <h3 className="text-[28px] md:text-[42px] font-helvetica font-bold italic text-white mb-10 leading-tight">
                Correcting the "Functional Obscurity" of legacy biomechanical telemetry.
              </h3>
              <p className="text-[15px] md:text-[16px] text-white/50 leading-relaxed font-light max-w-2xl italic">
                 The legacy application captured critical medical data, yet the utilitarian interface lacked hierarchical anchoring—rendering the science inaccessible. This case study documents the establishment of a "Medical HUD" system that prioritizes diagnostic clarity under high-stress clinical conditions.
              </p>
           </div>
        </div>
      </section>

      {/* 3. LEGACY AUDIT */}
      <section className="reveal-section opacity-0 translate-y-10 py-10 md:py-32 px-6 md:px-24">
         <div className="max-w-7xl mx-auto">
            <h2 className="text-[32px] md:text-[50px] font-bold mb-16 tracking-tighter">The Systemic Debt.</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-20">
                {[
                  "register-old.png", "foot-old.png", "bluetooth search-old-1.png", 
                  "graph(angle)-old.png", "profile-old.png"
                ].map((img, i) => (
                    <div key={i} className="relative aspect-[9/19] rounded-xl overflow-hidden bg-white/5 border border-white/10 opacity-30">
                        <Image src={`/projects/spandhika/${img}`} alt="Legacy" fill className="object-contain p-2" />
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-[14px] text-white/40">
               <p><span className="text-red-500/60 font-bold block mb-1 uppercase tracking-widest">Cognitive Clutter</span> Dense data presentation without clinical hierarchy.</p>
               <p><span className="text-red-500/60 font-bold block mb-1 uppercase tracking-widest">Static Telemetry</span> Heatmaps lacked interactive diagnostic affordances.</p>
               <p><span className="text-red-500/60 font-bold block mb-1 uppercase tracking-widest">User Friction</span> Mission-critical pairing tools were buried within sub-menus.</p>
            </div>
         </div>
      </section>

      {/* 4. CLINICAL HUD - SHARP REDESIGN */}
      <section id="diagnostic-hub" className="reveal-section opacity-0 translate-y-10 py-10 md:py-32 px-6 md:px-24 bg-white text-black rounded-t-[40px] md:rounded-t-[80px]">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 md:mb-24 max-w-3xl mx-auto">
               <span className="text-[12px] font-black tracking-[0.4em] text-[#006D77] uppercase mb-4 block">The Redesign Strategy</span>
               <h2 className="text-[36px] md:text-[60px] font-bold tracking-tighter leading-none mb-8 italic font-helvetica uppercase">Diagnostic <br/> HUD Mode.</h2>
               <p className="text-[16px] md:text-[18px] text-black/50 font-medium leading-relaxed">
                  Establishing a unified, high-contrast system designed for instantaneous diagnostic interpretation across dual environmental protocols.
               </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32 pb-12">
                <div className="flex flex-col items-center gap-8">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#006D77]">Dark Protocol Index</span>
                    <div className="relative w-[200px] md:w-[240px] aspect-[1/2.1] drop-shadow-2xl">
                        <Image src="/projects/spandhika/Home page dark.png" alt="Home" fill className="object-contain" />
                    </div>
                </div>
                <div className="flex flex-col items-center gap-8">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#006D77]">Light Protocol Index</span>
                    <div className="relative w-[200px] md:w-[240px] aspect-[1/2.1] drop-shadow-2xl md:translate-y-12">
                        <Image src="/projects/spandhika/Home page light.png" alt="Home" fill className="object-contain" />
                    </div>
                </div>
            </div>
         </div>
      </section>

      {/* FULL PAGE SHOWCASE - ADDED AFTER DIAGNOSTIC HUB */}
      <section className="relative w-full space-y-0 overflow-hidden">
         {/* Dark Full Screen */}
         <div className="relative h-[60vh] md:h-screen w-full overflow-hidden">
            <div className="parallax-full absolute inset-0 h-[120%] w-full">
               <Image 
                  src="/projects/spandhika/Mockup dark- full screen.png" 
                  alt="Dark Protocol Showcase" 
                  fill 
                  className="object-cover"
               />
            </div>
            <div className="absolute inset-x-0 bottom-0 py-24 px-6 md:px-24 bg-gradient-to-t from-black via-black/40 to-transparent">
               <span className="text-[10px] font-black tracking-[0.5em] text-[#006D77] uppercase mb-4 block">System Specification</span>
               <h3 className="text-[32px] md:text-[56px] font-bold tracking-tighter text-white uppercase italic font-helvetica">High-Intensity Dark Mode.</h3>
            </div>
         </div>

         {/* Light Full Screen */}
         <div className="relative h-[60vh] md:h-screen w-full overflow-hidden bg-white">
            <div className="parallax-full absolute inset-0 h-[120%] w-full">
               <Image 
                  src="/projects/spandhika/Mockup light- full screen.png" 
                  alt="Light Protocol Showcase" 
                  fill 
                  className="object-cover"
               />
            </div>
            <div className="absolute inset-x-0 bottom-0 py-24 px-6 md:px-24 bg-gradient-to-t from-white via-white/40 to-transparent">
               <span className="text-[10px] font-black tracking-[0.5em] text-[#006D77] uppercase mb-4 block">System Specification</span>
               <h3 className="text-[32px] md:text-[56px] font-bold tracking-tighter text-black uppercase italic font-helvetica">Clinical Daylight Mode.</h3>
            </div>
         </div>
      </section>

      {/* 5. METRICS ANALYSIS */}
      <section className="reveal-section opacity-0 translate-y-10 py-12 md:py-40 px-6 md:px-24 bg-[#FAFAFA] text-black border-t border-black/5">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
               <h2 className="text-[40px] md:text-[60px] font-bold tracking-tighter mb-4 italic font-helvetica uppercase">Biometric <br/> Telemetry.</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-16">
               {[
                  { img: "Plantarflexion dark.png", t: "Plantarflexion" },
                  { img: "Dorsiflexion dark.png", t: "Dorsiflexion" },
                  { img: "Stride length dark.png", t: "Gait Metrics" },
                  { img: "Plantarfleion light.png", t: "Light: Plantar" },
                  { img: "Dorsiflexion light.png", t: "Light: Dorsi" },
                  { img: "Stride lenght light.png", t: "Light: Gait" }
               ].map((metric, i) => (
                  <div key={i} className="flex flex-col items-center gap-4">
                     <div className="relative w-full aspect-[1/2.1] drop-shadow-lg hover:scale-110 transition-transform duration-500">
                        <Image src={`/projects/spandhika/${metric.img}`} alt="Metric" fill className="object-contain" />
                     </div>
                     <p className="text-[9px] font-black tracking-widest uppercase text-black/30 text-center">{metric.t}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 6. TACTICAL FEEDBACK */}
      <section className="reveal-section opacity-0 translate-y-10 py-12 md:py-32 px-6 md:px-24 bg-[#050505]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
             <div className="order-2 md:order-1 flex justify-center gap-8">
                <div className="parallax-slow relative w-[180px] md:w-[240px] aspect-[1/2.1] drop-shadow-[0_20px_40px_rgba(0,109,119,0.3)]">
                   <Image src="/projects/spandhika/Bluetooth dark.jpg" alt="BT" fill className="object-contain" />
                </div>
                <div className="parallax-slow relative w-[180px] md:w-[240px] aspect-[1/2.1] drop-shadow-2xl translate-y-12">
                   <Image src="/projects/spandhika/Bluetooth light.jpg" alt="BT" fill className="object-contain" />
                </div>
             </div>
             <div className="order-1 md:order-2">
                <span className="text-[11px] font-black tracking-[0.5em] text-[#006D77] uppercase block mb-8">Clinical Interactions</span>
                <h2 className="text-[36px] md:text-[50px] font-bold mb-8 tracking-tighter">Tactical Feedback.</h2>
                <p className="text-[16px] text-white/50 leading-relaxed font-light mb-12 italic">
                   To guarantee clinical reliability, pairing processes were transformed into pneumatic, pulsing radar interfaces that immediately communicate sensor status to the practitioner.
                </p>
                <div className="flex flex-col gap-4">
                   {["Bluetooth Mesh Pairing", "Live Heatmap Delta"].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#006D77]">
                         <div className="w-8 h-px bg-[#006D77]" /> {item}
                      </div>
                   ))}
                </div>
             </div>
          </div>
      </section>

      <CaseStudyFooter nextProject={{ name: "Campus Trace", href: "/projects/campus-trace" }} theme="dark" />
    </main>
  );
}
