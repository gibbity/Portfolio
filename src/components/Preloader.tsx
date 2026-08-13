"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

const LOG_MESSAGES = [
  "Initializing spatial engine...",
  "Loading coordinate systems...",
  "Synthesizing nodes...",
  "Rasterizing vector assets...",
  "Establishing neural links...",
  "System ready."
];

const ICONS = [
  { id: "figma", name: "Figma", url: "https://images.shadcnspace.com/assets/svgs/figma.svg", threshold: 15 },
  { id: "supabase", name: "Supabase", url: "https://images.shadcnspace.com/assets/svgs/supabase.svg", threshold: 35 },
  { id: "claude", name: "Claude", url: "https://images.shadcnspace.com/assets/svgs/clude.svg", threshold: 55 },
  { id: "antigravity", name: "Antigravity", isCustom: true, threshold: 75 },
  { id: "gemini", name: "Gemini", url: "https://images.shadcnspace.com/assets/svgs/gemini.svg", threshold: 95 }
];

export default function Preloader() {
  const pathname = usePathname();
  const router = useRouter();
  const isHomepage = pathname === "/";

  const [progress, setProgress] = useState(0);
  const [realProgress, setRealProgress] = useState(0);
  const [reelLoaded, setReelLoaded] = useState(false);
  const [currentLog, setCurrentLog] = useState(0);
  const [phase, setPhase] = useState<"loading" | "curtain" | "done">(isHomepage ? "loading" : "done");
  const [isMounted, setIsMounted] = useState(false);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Real Asset Tracking
  useEffect(() => {
    if (!isHomepage) return;

    const criticalAssets = [
      "/projects/scribe/Scribe- graph light theme.png",
      "/projects/scribe/Scribe- graph dark theme.png",
      "/projects/scribe/Scribe- graph light theme zoomed.png",
      "/projects/scribe/Scribe - graph workbench.png"
    ];

    let loaded = 0;
    const total = criticalAssets.length;

    const updateRealProgress = () => {
      loaded++;
      setRealProgress((loaded / total) * 100);
    };

    criticalAssets.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = updateRealProgress;
      img.onerror = updateRealProgress;
    });

    // Also prefetch routes
    router.prefetch("/projects/scribe");
    router.prefetch("/projects/campus-trace");
    router.prefetch("/projects/open-design-studio");
  }, [isHomepage, router]);

  useEffect(() => {
    if (!isHomepage) return;
    if (typeof window !== "undefined") {
      // @ts-expect-error - showcaseReelLoaded flag attached to window
      if (window.__showcaseReelLoaded) {
        setReelLoaded(true);
      } else {
        const handleReelLoaded = () => setReelLoaded(true);
        window.addEventListener("showcase-reel-loaded", handleReelLoaded);
        
        // 8-second safety fallback
        const fallback = setTimeout(() => {
          setReelLoaded(true);
        }, 8000);

        return () => {
          window.removeEventListener("showcase-reel-loaded", handleReelLoaded);
          clearTimeout(fallback);
        };
      }
    }
  }, [isHomepage]);

  useEffect(() => {
    if (!isHomepage) return;

    // Progress simulation logic
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase("curtain"), 500);
          return 100;
        }

        // Stall at 90% if showcase reel is not loaded yet
        if (prev >= 90 && !reelLoaded) {
          return prev;
        }

        const target = Math.max(realProgress, prev + 1);
        const step = Math.random() * 4 + 1; // Controlled growth
        return Math.min(prev + step, target, 100);
      });
    }, 150);

    // Log message simulation
    const logInterval = setInterval(() => {
      setCurrentLog(prev => (prev + 1) % LOG_MESSAGES.length);
    }, 800);

    return () => {
      clearInterval(interval);
      clearInterval(logInterval);
    };
  }, [isHomepage, realProgress, reelLoaded]);

  useEffect(() => {
    if (phase === "curtain" && pathRef.current) {
      const full = "M 0 100 V 0 Q 50 0 100 0 V 100 z";
      const mid = "M 0 100 V 50 Q 50 100 100 50 V 100 z";
      const empty = "M 0 100 V 100 Q 50 100 100 100 V 100 z";

      const tl = gsap.timeline({
        onComplete: () => {
          setPhase("done");
        }
      });

      tl.set(pathRef.current, { attr: { d: full } })
        .to(pathRef.current, {
          attr: { d: mid },
          duration: 0.5,
          ease: "power3.in"
        })
        .to(pathRef.current, {
          attr: { d: empty },
          duration: 0.4,
          ease: "power3.out"
        });
    }
  }, [phase]);

  if (phase === "done" || !isMounted) return null;

  return (
    <>
      <AnimatePresence>
        {phase === "loading" && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#080808] overflow-hidden"
          >
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            
            <div className="relative flex flex-col items-center">
              {/* Tech Icons Row */}
              <div className="flex items-center gap-6 mb-12 mt-4">
                {ICONS.map((icon) => {
                  const isActive = Math.floor(progress) >= icon.threshold;
                  return (
                    <div 
                      key={icon.id}
                      className="transition-all duration-500 p-3 rounded-lg border flex items-center justify-center"
                      style={{
                        backgroundColor: isActive ? "rgba(74, 94, 191, 0.12)" : "transparent",
                        borderColor: isActive ? "rgba(74, 94, 191, 0.45)" : "rgba(255, 255, 255, 0.05)",
                        opacity: isActive ? 1 : 0.15,
                        filter: isActive ? "none" : "grayscale(100%)",
                        boxShadow: isActive ? "0 0 15px rgba(74, 94, 191, 0.2)" : "none"
                      }}
                      title={icon.name}
                    >
                      {icon.isCustom ? (
                        /* Antigravity Custom SVG */
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4A5EBF" strokeWidth="2" className={isActive ? "animate-pulse" : ""}>
                          <circle cx="12" cy="7" r="3" fill="#4A5EBF" />
                          <path d="M5 17q7 3 14 0" strokeLinecap="round" />
                          <path d="M8 20q4 2 8 0" strokeLinecap="round" opacity="0.5" />
                        </svg>
                      ) : (
                        <img 
                          src={icon.url} 
                          alt={icon.name} 
                          width={24}
                          height={24}
                          className="w-6 h-6 object-contain"
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Counter */}
              <div className="mb-4">
                <span className="font-helvetica text-[48px] font-bold tracking-tighter tabular-nums text-white">
                  {Math.min(100, Math.floor(progress))}
                </span>
                <span className="font-helvetica text-[14px] font-medium text-[#4A5EBF] ml-1">%</span>
              </div>

              {/* Log Messages */}
              <div className="h-4 overflow-hidden flex flex-col items-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentLog}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 0.4 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="font-mono text-[9px] uppercase tracking-[0.2em] text-white"
                  >
                    {LOG_MESSAGES[currentLog]}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Progress Bar */}
              <div className="absolute -bottom-24 w-64 h-[1px] bg-[#E0E0E0]">
                <motion.div 
                  className="h-full bg-[#4A5EBF]" 
                  style={{ width: `${progress}%` }}
                  transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                />
              </div>
            </div>

            {/* Decorative Corner Accents */}
            <div className="absolute top-12 left-12 w-8 h-8 border-t border-l border-[#4A5EBF] opacity-20" />
            <div className="absolute top-12 right-12 w-8 h-8 border-t border-r border-[#4A5EBF] opacity-20" />
            <div className="absolute bottom-12 left-12 w-8 h-8 border-b border-l border-[#4A5EBF] opacity-20" />
            <div className="absolute bottom-12 right-12 w-8 h-8 border-b border-r border-[#4A5EBF] opacity-20" />
            
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <span className="font-mono text-[8px] uppercase tracking-[0.4em] opacity-20">Secure Link Established</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {(phase === "curtain" || phase === "loading") && (
        <div className="transition-wrapper" style={{ opacity: 1, backgroundColor: "transparent" }}>
          <svg className="transition-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path 
              ref={pathRef}
              className="path" 
              fill="#080808" 
              d="M 0 100 V 100 Q 50 100 100 100 V 100 z" 
            />
          </svg>
        </div>
      )}
    </>
  );
}
