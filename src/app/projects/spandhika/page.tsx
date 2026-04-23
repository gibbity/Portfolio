"use client";

import { motion } from "framer-motion";
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
          subtitle="Redesigning for Precision"
          description="Transforming a fragmented medical dashboard into a high-performance tool for health researchers."
          layout="stacked"
          meta={{
            "Role": "Product Designer",
            "Timeline": "2024",
            "Focus": "Information Architecture"
          }}
          media={{
            type: "image",
            src: "/projects/spandhika/Mockup dark- full screen.png"
          }}
          theme="dark"
        />
      </div>

      {/* 00. THE HUMAN CONTEXT */}
      <section className="relative z-10 py-24 md:py-64 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto overflow-hidden">
         <div className="flex flex-col items-center justify-center text-center">
               <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 2 }}
                  className="relative w-full max-w-2xl aspect-square flex items-center justify-center mb-20"
               >
               {/* Minimalist Medical Data SVG: Pulse and Nodes */}
               <svg viewBox="0 0 400 400" className="w-full h-full stroke-[#006D77]/20">
                  <motion.path
                    d="M 50 200 Q 100 150 150 200 T 250 200 T 350 200"
                    fill="none"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                  <motion.circle 
                    cx="200" cy="200" r="100" 
                    className="fill-none stroke-[#006D77]/10"
                    strokeDasharray="4 4"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.circle 
                    cx="200" cy="200" r="4" 
                    className="fill-[#006D77]"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 1 }}
                  />
               </svg>

               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.5 }}
                 className="absolute top-[10%] left-0 bg-white/5 backdrop-blur-md p-4 border border-white/10 rounded-sm shadow-xl max-w-[240px] z-20 text-left"
               >
                 <p className="text-[13px] font-helvetica italic text-white/60 leading-snug">
                    "When data is life-critical, a confusing interface isn't just a nuisance—it's a barrier to insight."
                 </p>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.8 }}
                 className="absolute bottom-[20%] right-0 bg-white/5 backdrop-blur-md p-4 border border-white/10 rounded-sm shadow-xl max-w-[260px] z-20 text-left"
               >
                 <p className="text-[13px] font-helvetica italic text-white/60 leading-snug">
                    "I spend more time finding the right chart than actually analyzing the patient's recovery."
                 </p>
               </motion.div>

               <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
                >
                  <h3 className="font-helvetica font-bold text-[32px] md:text-[64px] tracking-tighter text-white uppercase italic">The Barrier to Care</h3>
                </motion.div>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: 1.5 }}
               className="max-w-3xl"
            >
               <p className="text-[22px] text-white/40 font-normal italic leading-relaxed">
                 Medical dashboards often suffer from "feature creep," burying vital health metrics under layers of technical complexity. I redesigned Spandhika to strip away the noise, ensuring that researchers can focus on what matters most: the human data.
               </p>
            </motion.div>
         </div>
      </section>

      {/* 01. THE DIGITAL WALL */}
      <section className="reveal-section opacity-0 translate-y-10 py-12 md:py-48 px-6 md:px-24 bg-[#080808]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
           <div className="lg:col-span-4 space-y-12">
               <span className="text-[11px] font-bold tracking-[0.5em] text-[#006D77] uppercase block">The Challenge</span>
              <div className="space-y-6 border-l border-white/10 pl-6">
                 <div>
                    <span className="block text-[9px] text-white/30 uppercase tracking-widest mb-1">Observation</span>
                    <p className="text-[15px] font-medium">Cognitive Overload</p>
                 </div>
                  <div>
                     <span className="block text-[9px] text-white/30 uppercase tracking-widest mb-1">Objective</span>
                     <p className="text-[15px] font-medium leading-tight">Clarity over Complexity</p>
                  </div>
              </div>
           </div>
           <div className="lg:col-span-8">
               <h3 className="text-[28px] md:text-[56px] font-helvetica font-bold italic text-white mb-10 leading-[0.9] tracking-tighter uppercase">
                 Breaking the <br/> Legacy Loop.
               </h3>
               <p className="text-[18px] md:text-[22px] text-white/40 leading-relaxed font-normal max-w-2xl italic">
                  The original interface was built for engineers, not practitioners. My goal was to translate that technical power into a design that felt intuitive, fast, and human.
               </p>
           </div>
        </div>
      </section>


      {/* 02. FRAGMENTED ROOTS */}
      <section className="reveal-section opacity-0 translate-y-10 py-12 md:py-48 px-6 md:px-24">
         <div className="max-w-7xl mx-auto">
            <h2 className="text-[42px] md:text-[80px] font-bold mb-16 tracking-tighter font-helvetica uppercase italic leading-none">Scattered <br/> Logic.</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-24">
                {[
                  "register-old.png", "foot-old.png", "bluetooth search-old-1.png", 
                  "graph(angle)-old.png", "profile-old.png"
                ].map((img, i) => (
                    <div key={i} className="relative aspect-[9/19] rounded-xl overflow-hidden bg-white/5 border border-white/10 opacity-40 hover:opacity-100 transition-opacity">
                        <Image src={`/projects/spandhika/${img}`} alt="Legacy" fill className="object-contain p-2" />
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-[18px] text-white/40 italic leading-relaxed">
                <p><span className="text-[#006D77] font-bold block mb-4 uppercase tracking-[0.3em] text-[11px] not-italic">Cognitive Friction</span> Dense layers of data with no visual hierarchy made it impossible to scan quickly.</p>
                <p><span className="text-[#006D77] font-bold block mb-4 uppercase tracking-[0.3em] text-[11px] not-italic">Static Feedback</span> The interface felt disconnected from the real-time nature of medical research.</p>
                <p><span className="text-[#006D77] font-bold block mb-4 uppercase tracking-[0.3em] text-[11px] not-italic">Hidden Utilities</span> Essential connection tools were buried, causing delays during critical data capture.</p>
            </div>
         </div>
      </section>

      {/* 03. THE REDESIGN: CLINICAL HUD */}
      <section id="diagnostic-hub" className="reveal-section opacity-0 translate-y-10 py-12 md:py-48 px-6 md:px-24 bg-white text-black rounded-t-[40px] md:rounded-t-[80px]">
         <div className="max-w-7xl mx-auto">
            <div className="mb-24 md:mb-40 max-w-4xl">
               <span className="text-[11px] font-black tracking-[0.4em] text-[#006D77] uppercase mb-12 block">The Solution</span>
                <h2 className="text-[48px] md:text-[100px] font-bold tracking-tighter leading-[0.85] mb-12 italic font-helvetica uppercase">Precision <br/> Redefined.</h2>
                <p className="text-[20px] md:text-[24px] text-black/50 font-normal leading-relaxed italic max-w-2xl">
                   I developed a unified, high-contrast interface system that adapts to the high-pressure environment of medical clinics.
                </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32 pb-12">
                <div className="flex flex-col items-center gap-8">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#006D77]">Dark Mode</span>
                    <div className="relative w-[200px] md:w-[240px] aspect-[1/2.1] drop-shadow-2xl">
                        <Image src="/projects/spandhika/Home page dark.png" alt="Home" fill className="object-contain" />
                    </div>
                </div>
                <div className="flex flex-col items-center gap-8">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#006D77]">Light Mode</span>
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
                <span className="text-[10px] font-black tracking-[0.5em] text-[#006D77] uppercase mb-4 block">Design Detail</span>
                <h3 className="text-[32px] md:text-[56px] font-bold tracking-tighter text-white uppercase italic font-helvetica">High-Contrast Dark Mode.</h3>
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
                <span className="text-[10px] font-black tracking-[0.5em] text-[#006D77] uppercase mb-4 block">Adaptive UI</span>
                <h3 className="text-[32px] md:text-[56px] font-bold tracking-tighter text-black uppercase italic font-helvetica">Daylight Efficiency.</h3>
            </div>
         </div>
      </section>

      {/* 04. THE DESIGN ENGINE */}
      <section className="reveal-section opacity-0 translate-y-10 py-24 md:py-64 px-6 md:px-24 bg-[#050505] text-white">
          <div className="max-w-7xl mx-auto">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                <div className="space-y-12">
                   <span className="text-[11px] font-bold tracking-[0.5em] text-[#006D77] uppercase block">Design Logic</span>
                   <h2 className="text-[42px] md:text-[72px] font-bold italic tracking-tighter leading-none uppercase font-helvetica">The Logic of <br/> Care.</h2>
                   <div className="space-y-8 text-white/40 leading-relaxed font-normal italic border-l border-[#006D77] pl-10">
                      <p className="text-[18px]">
                         Health data is noisy. My approach focused on **Information Heirarchy**—surfacing the most critical patient metrics first, while keeping deeper diagnostic tools just a tap away.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 not-italic">
                         <div className="p-6 bg-white/5 border border-white/10">
                            <span className="text-[10px] font-black uppercase text-[#006D77] mb-2 block">01. Signal</span>
                            <p className="text-[13px] text-white/60">Prioritizing gait metrics and real-time pulse.</p>
                         </div>
                         <div className="p-6 bg-white/5 border border-white/10">
                            <span className="text-[10px] font-black uppercase text-[#006D77] mb-2 block">02. Noise</span>
                            <p className="text-[13px] text-white/60">Secondary settings and logs tucked into side drawers.</p>
                         </div>
                      </div>
                   </div>
                </div>
                <div className="relative aspect-square flex items-center justify-center">
                   <div className="w-full h-full border border-white/5 rounded-full flex items-center justify-center relative overflow-hidden">
                      <motion.div 
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="w-[60%] h-[60%] bg-[#006D77]/10 rounded-full blur-3xl absolute"
                      />
                      <div className="relative z-10 text-center">
                         <span className="text-[64px] font-bold italic text-white/10">80/20</span>
                         <p className="text-[10px] font-black uppercase tracking-widest text-[#006D77] mt-2">Design Ratio</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
      </section>

      {/* 05. PRECISION METRICS */}
      <section className="reveal-section opacity-0 translate-y-10 py-12 md:py-48 px-6 md:px-24 bg-[#FAFAFA] text-black border-t border-black/5">
         <div className="max-w-7xl mx-auto">
            <div className="mb-24 max-w-3xl">
                <h2 className="text-[40px] md:text-[80px] font-bold tracking-tighter mb-4 italic font-helvetica uppercase leading-none">Health <br/> Granularity.</h2>
                <p className="text-[18px] text-black/40 italic font-medium">Individual data modules designed for instant legibility.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-12 gap-y-20">
               {[
                  { img: "Plantarflexion dark.png", t: "Plantarflexion" },
                  { img: "Dorsiflexion dark.png", t: "Dorsiflexion" },
                  { img: "Stride length dark.png", t: "Gait Metrics" },
                  { img: "Plantarfleion light.png", t: "Light: Plantar" },
                  { img: "Dorsiflexion light.png", t: "Light: Dorsi" },
                  { img: "Stride lenght light.png", t: "Light: Gait" }
               ].map((metric, i) => (
                  <div key={i} className="flex flex-col items-center gap-6">
                     <div className="relative w-full aspect-[1/2.1] drop-shadow-xl hover:scale-105 transition-transform duration-500">
                        <Image src={`/projects/spandhika/${metric.img}`} alt="Metric" fill className="object-contain" />
                     </div>
                     <p className="text-[10px] font-black tracking-widest uppercase text-black/20 text-center">{metric.t}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* 06. TACTICAL FEEDBACK */}
      <section className="reveal-section opacity-0 translate-y-10 py-12 md:py-48 px-6 md:px-24 bg-[#050505]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-32 items-center">
             <div className="order-2 md:order-1 flex justify-center gap-12">
                <div className="parallax-slow relative w-[180px] md:w-[240px] aspect-[1/2.1] drop-shadow-[0_20px_40px_rgba(0,109,119,0.3)]">
                   <Image src="/projects/spandhika/Bluetooth dark.jpg" alt="BT" fill className="object-contain" />
                </div>
                <div className="parallax-slow relative w-[180px] md:w-[240px] aspect-[1/2.1] drop-shadow-2xl translate-y-12">
                   <Image src="/projects/spandhika/Bluetooth light.jpg" alt="BT" fill className="object-contain" />
                </div>
             </div>
             <div className="order-1 md:order-2">
                 <span className="text-[11px] font-black tracking-[0.5em] text-[#006D77] uppercase block mb-12">The Interaction</span>
                 <h2 className="text-[42px] md:text-[64px] font-bold mb-8 tracking-tighter italic font-helvetica uppercase leading-none">Seamless <br/> Connections.</h2>
                 <p className="text-[18px] text-white/40 leading-relaxed font-normal mb-12 italic">
                    I transformed technical device pairing into a "radar" experience—giving practitioners instant visual confirmation without digging through menus.
                 </p>
                <div className="flex flex-col gap-6">
                    {["Rapid Device Pairing", "Contextual Feedback"].map((item, i) => (
                      <div key={i} className="flex items-center gap-6 text-[11px] font-bold uppercase tracking-[0.4em] text-[#006D77]">
                         <div className="w-12 h-px bg-[#006D77]" /> {item}
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
