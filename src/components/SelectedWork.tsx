"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

import HeroBackground from "./HeroBackground";
import Lottie from "lottie-react";
import spandhikaData from "../app/projects/spandhika/spandhika.json";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

const projects = [
  {
    id: "scribe",
    name: "Scribe",
    utility: "STRATEGIC COCKPIT FOR NON-LINEAR ROADMAP SYNTHESIS",
    tags: ["Figma", "Local AI"],
    description: "Node-based knowledge management tool designed to move away from folder hierarchies.",
    color: "#D9D9D9",
    thumbnail: "/projects/scribe/scribe.mp4"
  },
  {
    id: "spandhika",
    name: "Spandhika",
    utility: "MEDICAL-GRADE HUD FOR BIOMECHANICAL TELEMETRY ANALYSIS.",
    tags: ["Bionics", "Sensor Fusion"],
    description: "Multi-modal gait analysis system integrating pressure-mapping insoles with 6-axis IMU sensors.",
    color: "#D1D1D1",
    thumbnail: "lottie" // Identifier for Lottie rendering
  },
  {
    id: "campus-trace",
    name: "CampusTrace",
    utility: "FORENSIC-GRADE DIGITAL PROVENANCE INSTRUMENT",
    tags: ["React", "MapLibre", "Supabase"],
    description: "A modern campus issue reporting system for VIT Vellore with real-time geospatial archival.",
    color: "#000000",
    thumbnail: "/projects/campus-trace/campus-trace.mp4"
  },
  {
    id: "context",
    name: "Context",
    utility: "LOCAL-FIRST PERSISTENCE ENGINE FOR MANIFEST V3 BROWSING SESSIONS.",
    tags: ["Chrome API", "LocalPersistence"],
    description: "Eliminating context-collapse through intentional capture and logical session offloading.",
    color: "#E5E5E5",
    thumbnail: "/projects/context/context.mp4"
  },
];

export default function SelectedWork() {
  const [activeProject, setActiveProject] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const activeProjectRef = useRef(0);
  const scrollTriggerRef = useRef<any>(null);
  const touchStartX = useRef<number | null>(null);
  const swipeRotationRef = useRef(0);

  const navigateTo = useCallback((direction: "prev" | "next") => {
    const numProjects = projects.length;
    let nextIndex = activeProjectRef.current + (direction === "next" ? 1 : -1);
    
    // Clamp or loop? User said "change the case", looping might be better but linear scroll is easier to sync.
    // I will clamp it to match existing scroll behavior.
    nextIndex = Math.min(Math.max(nextIndex, 0), numProjects - 1);
    
    if (nextIndex === activeProjectRef.current || !scrollTriggerRef.current) return;

    const st = scrollTriggerRef.current;
    const progress = nextIndex / (numProjects - 1);
    const scrollPos = st.start + (st.end - st.start) * progress;

    gsap.to(window, {
      scrollTo: scrollPos,
      duration: 1,
      ease: "power3.inOut"
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") navigateTo("prev");
      if (e.key === "ArrowRight") navigateTo("next");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigateTo]);

  useEffect(() => {
    if (!sectionRef.current || !carouselRef.current) return;

    const numProjects = projects.length;
    const angleStep = 360 / numProjects;
    
    const update3D = () => {
      if (!carouselRef.current) return;
      const width = carouselRef.current.offsetWidth;
      const tz = Math.round((width / 2) / Math.tan(Math.PI / numProjects));

      // 1. Rig the Cards
      const cards = carouselRef.current.querySelectorAll(".project-card-3d");
      cards.forEach((card, i) => {
        gsap.set(card, {
          transform: `rotateY(${i * angleStep}deg) translateZ(${tz}px)`
        });
      });

      // 2. Set the initial Carousel state
      carouselRef.current.style.setProperty("--tz", `${tz}px`);
    };

    update3D();
    
    // Scroll Rig
    const scrollInstance = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${numProjects * 200}%`,
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        if (!carouselRef.current) return;
        
        // Exact rotation logic to match project count
        const rotation = -self.progress * (angleStep * (numProjects - 1));
        carouselRef.current.style.setProperty("--rotation", `${rotation}deg`);

        // Synchronize title change precisely with front-facing card
        const currentIndex = Math.min(Math.round(self.progress * (numProjects - 1)), numProjects - 1);
        
        if (currentIndex !== activeProjectRef.current) {
            activeProjectRef.current = currentIndex;
            setActiveProject(currentIndex);
        }
      }
    });

    scrollTriggerRef.current = scrollInstance;

    const resizeObserver = new ResizeObserver(update3D);
    resizeObserver.observe(sectionRef.current);

    return () => {
      resizeObserver.disconnect();
      scrollInstance.kill();
    };
  }, []);

  // Mobile swipe handler — drives the same --rotation var as ScrollTrigger
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = touchStartX.current - e.changedTouches[0].clientX;
    touchStartX.current = null;
    if (Math.abs(deltaX) < 40) return; // ignore micro-swipes

    const numProjects = projects.length;
    const angleStep = 360 / numProjects;
    const direction = deltaX > 0 ? 1 : -1; // swipe left = next, swipe right = prev
    const nextIndex = Math.min(Math.max(activeProjectRef.current + direction, 0), numProjects - 1);

    if (nextIndex === activeProjectRef.current) return;
    activeProjectRef.current = nextIndex;
    setActiveProject(nextIndex);

    // Match exactly what ScrollTrigger sets
    swipeRotationRef.current = -(nextIndex * angleStep);
    if (carouselRef.current) {
      carouselRef.current.style.setProperty("--rotation", `${swipeRotationRef.current}deg`);
    }
  }, []);

  return (
    <section 
      id="projects"
      ref={sectionRef} 
      className="relative w-full h-screen bg-white overflow-hidden flex flex-col border-t border-[#EDEDED] select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >


      {/* 1. HEADER SECTION (Instrument Serif Corrected) */}
      <div className="relative z-20 pt-12 md:pt-16 flex justify-center items-center flex-none">
        <h2 className="font-helvetica font-light text-[14px] md:text-[16px] tracking-tight text-black/40">
          Selected Cases / 2024—2026
        </h2>
      </div>

      {/* 3D STAGE (Centred) */}
      <div className="flex-1 relative z-10 flex items-center justify-center overflow-visible perspective-[1200px] md:perspective-[2800px]">
        
        {/* Navigation Arrows (Desktop) */}
        <div className="absolute inset-x-4 md:inset-x-[208px] top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-30">
          <motion.button 
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigateTo("prev")}
            className={`hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-black/5 shadow-sm transition-all duration-300 pointer-events-auto hover:bg-white hover:border-black/10 group ${activeProject === 0 ? "opacity-20 cursor-not-allowed" : "opacity-100"}`}
            disabled={activeProject === 0}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="stroke-black/30 group-hover:stroke-black transition-colors">
               <path d="M15 18l-6-6 6-6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigateTo("next")}
            className={`hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-black/5 shadow-sm transition-all duration-300 pointer-events-auto hover:bg-white hover:border-black/10 group ${activeProject === projects.length - 1 ? "opacity-20 cursor-not-allowed" : "opacity-100"}`}
            disabled={activeProject === projects.length - 1}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="stroke-black/30 group-hover:stroke-black transition-colors">
               <path d="M9 18l6-6-6-6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        </div>

        <div 
          ref={carouselRef} 
          className="carousel-frame relative w-[85vw] md:w-[45vw] max-w-[760px] aspect-video preserve-3d will-change-transform"
        >
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="project-card-3d absolute inset-0 w-full h-full backface-hidden preserve-3d"
            >
              <div
                className={`block w-full h-full relative group overflow-hidden bg-white border border-[#EDEDED] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] rounded-sm ${project.id === "empty" ? "pointer-events-none" : ""}`}
              >
                {project.id !== "empty" ? (
                  <Link 
                    href={`/projects/${project.id}`}
                    className="block w-full h-full"
                  >
                    <div className="absolute inset-0 transition-transform duration-[1.5s]">
                        {project.thumbnail === "lottie" ? (
                          <div className="w-full h-full opacity-100">
                            <Lottie 
                              animationData={spandhikaData} 
                              loop={true} 
                              className="w-full h-full"
                              rendererSettings={{
                                preserveAspectRatio: 'xMidYMid slice'
                              }}
                            />
                          </div>
                        ) : project.thumbnail.endsWith(".mp4") ? (
                          <video 
                            src={project.thumbnail} 
                            autoPlay 
                            loop 
                            muted 
                            playsInline 
                            className="w-full h-full object-cover opacity-100 transition-opacity duration-1000"
                          />
                        ) : (
                          <Image 
                              src={project.thumbnail} 
                              alt={project.name} 
                              fill 
                              sizes="(max-width: 768px) 85vw, 45vw"
                              unoptimized={project.thumbnail.endsWith(".gif")}
                              className="object-contain opacity-100 transition-opacity duration-1000" 
                          />
                        )}
                    </div>
                    <div className="absolute inset-0 border border-white/20 pointer-events-none" />
                    <div className="absolute inset-0 flex items-center justify-center bg-white/0 group-hover:bg-white/5 transition-all duration-1000">
                        <div className="px-5 py-2 bg-white/95 backdrop-blur-md rounded shadow-lg opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 font-helvetica font-bold text-[8px] tracking-[0.4em]">
                            VIEW CASE
                        </div>
                    </div>
                    <div className="absolute bottom-5 left-5 text-[7.5px] font-black text-black/15 tracking-[0.4em]">
                        0{i + 1}
                    </div>
                  </Link>
                ) : (
                  <div className="w-full h-full bg-[#FAFAFA]" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="relative z-20 w-full px-6 md:px-12 lg:px-24 pb-8 md:pb-12 flex-none">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-10 border-t border-[#EDEDED] pt-8">
          <div className="relative overflow-hidden h-[36px] md:h-[60px] flex items-center">
            <AnimatePresence mode="wait">
              {projects[activeProject].id !== "empty" && (
                <motion.div
                  key={`title-${projects[activeProject].id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8, ease: "circOut" }}
                  className="flex items-baseline gap-4"
                >
                  <h3 className="font-helvetica italic text-[32px] md:text-[52px] leading-none tracking-tight text-[#222] pr-4">
                    {projects[activeProject].name}
                  </h3>
                  <span className="font-helvetica font-bold text-[8px] text-black/20 uppercase tracking-[0.4em] hidden md:block mb-1">
                    CASE STUDY REF / {activeProject + 1}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-col items-start md:items-end gap-4 max-w-[380px]">
             <div className="flex gap-4">
                {projects[activeProject].tags.map((tag, i) => (
                    <span key={i} className="text-[6px] md:text-[7px] font-black uppercase tracking-[0.3em] text-black/25">
                        {tag}
                    </span>
                ))}
             </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={`utility-${projects[activeProject].id}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.6 }}
                className="text-[8px] md:text-[10px] text-gray-400 font-medium leading-relaxed text-left md:text-right uppercase tracking-[0.3em] font-helvetica"
              >
                {projects[activeProject].utility}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style jsx>{`
        .carousel-frame {
          --rotation: 0deg;
          --tz: 288px;
          transform-style: preserve-3d;
          transform: translateZ(calc(-1 * var(--tz))) rotateY(var(--rotation));
          /* Smooth transition for swipe-driven rotation on mobile */
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </section>
  );
}
