"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const archiveProjects = [
  { 
    id: "trace",
    title: "Trace", 
    thumbnailSrc: "/archives/Trace-timelapse.png",
    showcaseSrc: "/archives/trace-showcase.png",
    description: "An automated, cross-platform timelapse screen recording tool built to document creative workflows. Designed with a focus on precision and user intent, the interface relies on a manual control trigger to capture progress rather than automated expansion windows.",
    titleColor: "#f97316",
    githubUrl: "https://github.com/shresthkushwaha/Trace-Timelapse"
  },
  { 
    id: "spandhika",
    title: "Spandhika UI", 
    thumbnailSrc: "/archives/Spandhika.png",
    showcaseSrc: "/archives/spandhika-showcase.png",
    description: "A comprehensive UX/UI overhaul for a patented data visualization dashboard. This professional internship project involved restructuring 15 complex medical diagnostic screens to enhance usability and data comprehension for healthcare professionals.",
    titleColor: "#8b5cf6" 
  },
  { 
    id: "lattice",
    title: "Lattice", 
    thumbnailSrc: "/archives/Lattice.png",
    showcaseSrc: "/archives/lattice-showcase.png",
    description: "A calendar application engineered to streamline scheduling and time management. Originally developed using a cross-platform desktop framework, its architecture is currently being adapted to scale into a fully-fledged web product.",
    titleColor: "#000000",
    githubUrl: "https://github.com/shresthkushwaha/Lattice"
  },
  { 
    id: "csea",
    title: "Csea", 
    thumbnailSrc: "/archives/CSEA.png",
    showcaseSrc: "/archives/csea-showcase.png",
    description: "A desktop utility engineered to visually organize, store, and retrieve custom UI components. Built to streamline front-end development workflows, it features a robust categorization system utilizing custom tags and folders, alongside a split-view detail environment that pairs a live visual preview with its underlying HTML and React code.",
    titleColor: "#115e59"
  },
  { 
    id: "context",
    title: "Context", 
    thumbnailSrc: "/archives/Context-Extension.png",
    showcaseSrc: "/archives/context-showcase.png",
    description: "A productivity-focused browser extension that visually maps open tabs to help users organize their digital workspace. The project encompasses complete functional specifications and a tailored interface design for seamless web navigation.",
    titleColor: "#4d7c0f",
    githubUrl: "https://github.com/shresthkushwaha/Context-extension"
  },
  { 
    id: "ira",
    title: "IRA UI", 
    thumbnailSrc: "/archives/IRA.png",
    showcaseSrc: "/archives/ira-showcase.png",
    description: "An award-winning, intelligence-driven safety application concept. The interface prioritizes rapid response, intuitive navigation, and user-centric protection, serving as a successful competition entry and a core case study in adaptive design.",
    titleColor: "#7155e8"
  }
];

export default function ArchivesPage() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  return (
    <main className="relative w-full h-[100dvh] bg-white text-black font-sans flex flex-col overflow-hidden">
      
      {/* Top Header Navigation - Absolute positioned to maximize content area */}
      <div className="absolute top-0 left-0 right-0 w-full p-6 md:p-10 flex justify-between items-center z-20 pointer-events-none">
        <div className="flex gap-4 items-center pointer-events-auto">
          <Link href="/" className="font-sans font-medium text-[14px] text-black/50 hover:text-black transition-colors">
            ← Back
          </Link>
          {selectedProject !== null && (
            <button 
              onClick={() => setSelectedProject(null)}
              className="font-sans font-medium text-[14px] text-black/50 hover:text-black transition-colors"
            >
              / Grid View
            </button>
          )}
        </div>
        <span className="font-sans font-medium text-[16px] text-black pointer-events-auto">
          Archives
        </span>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full h-full min-h-0 flex flex-col items-center justify-center p-6 md:p-8 pt-20 md:pt-24 pb-8 z-10">
        <AnimatePresence mode="wait">
          {selectedProject === null ? (
            /* Grid of Images */
            <motion.div 
              key="grid"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full max-w-5xl mx-auto flex flex-col justify-center overflow-y-auto md:overflow-visible"
            >
              <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                {archiveProjects.map((proj, idx) => (
                  <motion.button
                    key={proj.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.5, ease: "easeOut" }}
                    onClick={() => setSelectedProject(idx)}
                    className="relative w-full aspect-[4/3] rounded-[8px] md:rounded-[12px] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group"
                  >
                    <Image 
                      src={proj.thumbnailSrc} 
                      alt={proj.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700" 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            /* Detail View */
            <motion.div 
              key="detail"
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full max-w-5xl flex flex-col min-h-0 justify-center"
            >
              {/* Main Featured Card - flexes to fill available height on desktop, tightly wraps on mobile */}
              <div className="w-full md:flex-1 min-h-0 border border-gray-300 rounded-[12px] p-4 md:p-6 shadow-sm flex flex-col bg-white">
                <div className="w-full aspect-[16/9] md:aspect-auto md:flex-1 min-h-0 relative rounded-md overflow-hidden bg-white">
                  <Image 
                    src={archiveProjects[selectedProject].showcaseSrc} 
                    alt={archiveProjects[selectedProject].title} 
                    fill 
                    className="object-contain" 
                    priority
                  />
                </div>
                {/* Text Info - Fixed Height Bottom */}
                <div className="flex-shrink-0 mt-4 md:mt-8 flex flex-col md:flex-row gap-4 md:gap-12 items-center justify-between px-2 md:px-6">
                  <h2 
                    className="font-sans font-medium text-[28px] md:text-[42px] leading-none shrink-0 text-center md:text-left"
                    style={{ color: archiveProjects[selectedProject].titleColor }}
                  >
                    {archiveProjects[selectedProject].title}
                  </h2>
                  <div className="flex flex-col gap-3 items-center md:items-start">
                    <p className="font-sans text-[12px] md:text-[14px] leading-relaxed text-black/80 max-w-2xl font-medium m-0 text-center md:text-left">
                      {archiveProjects[selectedProject].description}
                    </p>
                    {archiveProjects[selectedProject].githubUrl && (
                      <a 
                        href={archiveProjects[selectedProject].githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center font-sans font-bold text-[10px] md:text-[11px] uppercase tracking-wider text-black border border-black/10 hover:bg-black hover:text-white px-3 py-1.5 rounded transition-all duration-300"
                      >
                        View Source
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Thumbnails Row - 3x2 grid on mobile, row on desktop */}
              <div className="flex-shrink-0 mt-4 md:mt-6 grid grid-cols-3 gap-2 md:flex md:justify-center md:gap-6 w-full max-w-[240px] md:max-w-none mx-auto">
                {archiveProjects.map((proj, idx) => (
                  <button
                    key={proj.id}
                    onClick={() => setSelectedProject(idx)}
                    className={`relative w-full aspect-[3/2] md:aspect-auto md:w-24 md:h-16 flex-shrink-0 rounded-[6px] md:rounded-[8px] overflow-hidden border-[1.5px] md:border-2 transition-all duration-300 ${
                      selectedProject === idx 
                        ? 'border-black scale-[1.02] shadow-md' 
                        : 'border-transparent hover:border-black/20 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={proj.thumbnailSrc} alt={proj.title} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </main>
  );
}
