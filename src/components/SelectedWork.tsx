"use client";

import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const projects = [
  {
    id: "scribe",
    name: "Scribe",
    description: "Non-linear strategic intelligence platform for dissolving context-collapse through hierarchical spatialization.",
    thumbnail: "/projects/scribe/preview.mp4",
    liveUrl: "https://scribe-neon.vercel.app/landing"
  },
  {
    id: "campus-trace",
    name: "CampusTrace",
    description: "A modern campus issue reporting system for VIT Vellore with real-time geospatial archival.",
    thumbnail: "/projects/campus-trace/preview.mp4",
    liveUrl: "https://campus-trace-steel.vercel.app/"
  },
  {
    id: "open-component-studio",
    name: "Open Component Studio",
    description: "Web-native, local-first AI prototyping environment for enterprise design privacy and speed.",
    thumbnail: "/projects/open-component-studio/open-component-main-video-3x4.mp4",
    liveUrl: "https://open-component.vercel.app/"
  }
];

export default function SelectedWork() {
  const outerSectionRef = useRef<HTMLDivElement>(null);
  const [virtualIndex, setVirtualIndex] = useState(0);

  // 1. Track Scroll Progress over a sticky track (260vh for smooth scroll speed)
  const { scrollYProgress } = useScroll({
    target: outerSectionRef,
    offset: ["start start", "end end"]
  });

  // 2. Lerp scroll progress with useSpring for fluid, liquid-like scroll response
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    mass: 0.5,
    restDelta: 0.0001
  });

  // Map progress to floating point index (0.0 -> 3.0)
  const floatIndex = useTransform(smoothProgress, [0, 1], [0, projects.length - 1]);

  useEffect(() => {
    const unsubscribe = floatIndex.on("change", (latest) => {
      setVirtualIndex(latest);
    });
    return () => unsubscribe();
  }, [floatIndex]);

  // Discrete index for text updates
  const activeIndex = Math.min(
    Math.max(Math.round(virtualIndex), 0),
    projects.length - 1
  );

  const handleSelectProject = (idx: number) => {
    if (!outerSectionRef.current) return;
    const rect = outerSectionRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const startY = rect.top + scrollTop;
    const scrollDistance = rect.height - window.innerHeight;
    const targetY = startY + (idx / (projects.length - 1)) * scrollDistance;
    
    window.scrollTo({
      top: targetY,
      behavior: "smooth"
    });
  };

  return (
    <section 
      id="projects"
      ref={outerSectionRef} 
      className="relative w-full h-[340vh] bg-white border-t border-[#EDEDED] select-none"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 w-full h-screen min-h-screen bg-white overflow-hidden flex flex-col justify-between pt-8 pb-8 px-6 md:px-12 lg:px-16">
        
        {/* 1. TOP HEADER NAVIGATION */}
        <div className="w-full flex justify-between items-center z-20 pt-4">
          <h3 className="font-sans font-normal text-[15px] md:text-[17px] text-black tracking-tight">
            Shresth Kushwaha
          </h3>
          <h3 className="font-sans font-normal text-[15px] md:text-[17px] text-black/60 tracking-tight">
            Selected Work
          </h3>
        </div>

        {/* 2. MAIN CENTER STAGE */}
        <div className="flex-1 w-full relative flex items-center justify-center my-auto overflow-hidden">
          
          {/* LEFT PANEL: Vertical Project Name List */}
          <div className="absolute left-6 md:left-12 lg:left-16 w-[22%] text-left z-30 pointer-events-auto hidden md:flex flex-col gap-3">
            {projects.map((project, idx) => {
              const isActive = idx === activeIndex;
              return (
                <motion.div
                  key={project.id}
                  onClick={() => handleSelectProject(idx)}
                  animate={{
                    scale: isActive ? 1.0 : 0.95,
                    opacity: isActive ? 1.0 : 0.35,
                    x: isActive ? 0 : -4
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="origin-left cursor-pointer"
                >
                  <h2 
                    className={`font-sans tracking-tight transition-colors duration-300 ${
                      isActive 
                        ? "font-medium text-[28px] md:text-[36px] text-black" 
                        : "font-normal text-[20px] md:text-[26px] text-[#A0A0A0] hover:text-black/70"
                    }`}
                  >
                    {project.name}
                  </h2>
                </motion.div>
              );
            })}
          </div>

          {/* CENTER COLUMN: Vertical Ribbon Cards */}
          <div className="relative w-[85vw] md:w-[40vw] max-w-[660px] aspect-[16/9] flex items-center justify-center overflow-visible">
            {projects.map((project, i) => {
              const offset = i - virtualIndex;
              const distance = Math.abs(offset);
              const isActive = i === activeIndex;

              // Spacing ensures cards never bleed into adjacent sections
              const yPercentage = offset * 102;
              const scale = Math.max(0.68, 1 - distance * 0.32);
              const opacity = Math.max(0.2, 1 - distance * 0.8);
              const isVisible = distance < 1.6;

              return (
                <div
                  key={project.id}
                  className="absolute inset-0 w-full h-full"
                  style={{
                    transform: `translate3d(0, ${yPercentage}%, 0) scale(${scale})`,
                    opacity: opacity,
                    zIndex: isActive ? 10 : 5 - Math.round(distance),
                    pointerEvents: isActive ? "auto" : "none",
                    display: isVisible ? "block" : "none",
                    willChange: "transform, opacity"
                  }}
                >
                  {/* SOLID WHITE CONTAINER: Eliminates background video bleed-through */}
                  <div className="w-full h-full relative overflow-hidden bg-white border border-[#E5E5E5] rounded-[6px] shadow-sm">
                    <Link 
                      href={`/projects/${project.id}`}
                      className="block w-full h-full relative group bg-white"
                    >
                      {project.thumbnail.endsWith(".mp4") ? (
                        <video 
                          src={project.thumbnail} 
                          autoPlay 
                          loop 
                          muted 
                          playsInline 
                          preload="none"
                          className="w-full h-full object-contain opacity-100 bg-white"
                        />
                      ) : (
                        <Image 
                          src={project.thumbnail} 
                          alt={project.name} 
                          fill 
                          sizes="(max-width: 768px) 85vw, 40vw"
                          className="object-contain opacity-100 bg-white" 
                        />
                      )}

                      {/* Minimal View Case Study Hover Badge */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/5 transition-all duration-500">
                        <div className="px-5 py-2.5 bg-white/95 backdrop-blur-md rounded shadow-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 font-sans font-medium text-[10px] tracking-[0.2em] text-black">
                          VIEW CASE
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT PANEL: Active Project Description (Placed at z-30 in outer margin so it NEVER overlaps carousel) */}
          <div className="absolute right-6 md:right-10 lg:right-14 w-[220px] md:w-[250px] text-left z-30 pointer-events-auto hidden md:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={`desc-${activeIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex flex-col gap-4 items-start"
              >
                <p className="font-sans font-normal text-[14px] md:text-[15px] leading-relaxed text-black/80">
                  {projects[activeIndex].description}
                </p>
                {projects[activeIndex].liveUrl && (
                  <a 
                    href={projects[activeIndex].liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center justify-center px-4 py-2 bg-black text-white text-[9px] font-bold uppercase tracking-[0.2em] hover:scale-105 transition-transform duration-300 rounded-sm"
                  >
                    Visit Live Site
                  </a>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* 3. BOTTOM FOOTER COUNTER (Decreased font size to text-[18px] md:text-[22px]) */}
        <div className="w-full flex justify-between items-end z-20 pb-2">
          {/* Mobile fallback title and description */}
          <div className="md:hidden block text-left pointer-events-auto">
            <h4 className="font-sans font-medium text-[18px] text-black">
              {projects[activeIndex].name}
            </h4>
            <p className="font-sans text-[12px] text-black/70 max-w-[220px] mt-1 mb-3 leading-snug">
              {projects[activeIndex].description}
            </p>
            {projects[activeIndex].liveUrl && (
              <a 
                href={projects[activeIndex].liveUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center px-4 py-2 bg-black text-white text-[9px] font-bold uppercase tracking-[0.2em] hover:scale-105 transition-transform duration-300 rounded-sm"
              >
                Visit Live Site
              </a>
            )}
          </div>

          <div className="ml-auto font-sans font-normal text-[18px] md:text-[22px] text-black/70 tracking-tight leading-none">
            {activeIndex + 1}/{projects.length}
          </div>
        </div>

      </div>
    </section>
  );
}
