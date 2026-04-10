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

export default function VerticalTicker() {
    // Duplicate the projects array for seamless looping
    const tickerItems = [...projects, ...projects, ...projects];

    return (
        <div className="h-full w-[26.25vw] overflow-hidden relative pointer-events-none">
            <motion.div
                initial={{ y: 0 }}
                animate={{ y: "-33.33%" }}
                transition={{
                    duration: 20,
                    ease: "linear",
                    repeat: Infinity,
                }}
                className="flex flex-col gap-6"
            >
                {tickerItems.map((project, i) => (
                    <div
                        key={i}
                        className="w-[26.25vw] h-[14.9vw] bg-[#CDCDCD] shrink-0 overflow-hidden"
                    >
                        {project.img.endsWith(".mp4") ? (
                          <video 
                              src={project.img} 
                              autoPlay 
                              loop 
                              muted 
                              playsInline
                              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 opacity-80"
                          />
                        ) : (
                          <img 
                              src={project.img} 
                              alt={project.name}
                              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 opacity-80"
                          />
                        )}
                    </div>
                ))}
            </motion.div>
            
            {/* Soft gradient masks at top and bottom */}
            <div className="absolute top-0 left-0 w-full h-20 bg-linear-to-b from-white to-transparent z-10" />
            <div className="absolute bottom-0 left-0 w-full h-20 bg-linear-to-t from-white to-transparent z-10" />
        </div>
    );
}
