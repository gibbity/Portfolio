"use client";

import { motion } from "framer-motion";

const projects = [
    { name: "Scribe Admin", img: "/images/hero/admin-page.png" },
    { name: "AI Heat Map", img: "/images/hero/ai-heat-map-1.png" },
    { name: "Mockup Full", img: "/images/hero/mockup-dark-full-screen.png" },
    { name: "System State", img: "/images/hero/screenshot-1.png" },
    { name: "Logic Graph", img: "/images/hero/screenshot-2.png" },
    { name: "Interface Probe", img: "/images/hero/screenshot-3.png" },
    { name: "Scribe Graph Dark", img: "/images/hero/scribe-graph-dark.png" },
    { name: "Scribe Graph Light", img: "/images/hero/scribe-graph-light-zoomed.png" },
    { name: "Scribe Home", img: "/images/hero/scribe-home-dark.png" },
    { name: "Shelved Index", img: "/images/hero/shelved-extensions.png" },
];

export default function HorizontalTicker() {
    // Duplicate for seamless scroll (3 sets to match VerticalTicker logic)
    const tickerItems = [...projects, ...projects, ...projects];

    return (
        <div className="w-full overflow-hidden relative pointer-events-none py-10">
            <style jsx>{`
                @keyframes ticker-h {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.33333%); }
                }
                .animate-ticker-h {
                    animation: ticker-h 12s linear infinite;
                    will-change: transform;
                }
            `}</style>
            <div className="flex flex-nowrap min-w-max animate-ticker-h">
                {tickerItems.map((project, i) => (
                    <div
                        key={`h-ticker-${i}`}
                        className="w-[50vw] aspect-video bg-[#CDCDCD] shrink-0 overflow-hidden rounded-xs border border-black/5 mr-4"
                    >
                        {project.img.endsWith(".mp4") ? (
                          <video 
                              src={project.img} 
                              autoPlay 
                              loop 
                              muted 
                              playsInline
                              className="w-full h-full object-cover grayscale opacity-80"
                          />
                        ) : (
                          <img 
                              src={project.img} 
                              alt={project.name}
                              className="w-full h-full object-cover grayscale opacity-80"
                          />
                        )}
                    </div>
                ))}
            </div>
            
            {/* Soft edge masks */}
            <div className="absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-white to-transparent z-10" />
        </div>
    );
}
