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

export default function Preloader() {
  const pathname = usePathname();
  const router = useRouter();
  const isHomepage = pathname === "/";

  const [progress, setProgress] = useState(0);
  const [realProgress, setRealProgress] = useState(0);
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
    router.prefetch("/projects/spandhika");
    router.prefetch("/projects/campus-trace");
    router.prefetch("/projects/context");
  }, [isHomepage, router]);

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

        // Stall at 90% if real assets aren't done
        if (prev >= 90 && realProgress < 100) {
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
  }, [isHomepage, realProgress]);

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
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FBFBFB] overflow-hidden"
          >
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(#4A5EBF 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            
            <div className="relative flex flex-col items-center">
              {/* Central Asterisk Pulse */}
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ rotate: { duration: 10, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
                className="mb-12"
              >
                <svg width="40" height="40" viewBox="-12 -12 24 24" fill="none">
                  <path 
                    d="M 0 -10 L 0 10 M -10 0 L 10 0 M -7 -7 L 7 7 M -7 7 L 7 -7 M -4 -9 L 4 9 M -9 -4 L 9 4 M -4 9 L 4 -9 M -9 4 L 9 -4"
                    stroke="#4A5EBF" 
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.div>

              {/* Counter */}
              <div className="mb-4">
                <span className="font-helvetica text-[48px] font-bold tracking-tighter tabular-nums text-[#1A1A1A]">
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
                    className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#1A1A1A]"
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
              fill="#FBFBFB" 
              d="M 0 100 V 100 Q 50 100 100 100 V 100 z" 
            />
          </svg>
        </div>
      )}
    </>
  );
}
