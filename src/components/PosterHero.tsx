"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

export default function PosterHero() {
  const outerSectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const turbRef = useRef<SVGFETurbulenceElement | null>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement | null>(null);
  const feImageRef = useRef<SVGFEImageElement | null>(null);

  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [calculatedScale, setCalculatedScale] = useState(2.35);

  // Scroll Progress tracking for sticky expansion section
  const { scrollYProgress } = useScroll({
    target: outerSectionRef,
    offset: ["start start", "end end"]
  });

  // Lerp scroll progress for smooth, liquid-like scroll response
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    mass: 0.5,
    restDelta: 0.001
  });

  // Calculate target scale dynamically on mount/resize to cover exactly 90% of screen height
  useEffect(() => {
    const calculateTargetDimensions = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const initialVideoHeight = rect.height * 0.3408;
      const targetHeight = window.innerHeight * 0.90; // Exactly 90% of viewport height
      setCalculatedScale(targetHeight / initialVideoHeight);
    };

    calculateTargetDimensions();
    window.addEventListener("resize", calculateTargetDimensions);
    return () => window.removeEventListener("resize", calculateTargetDimensions);
  }, []);

  // 1. Poster background and text slide UP out of visibility (using smoothed progress)
  const posterY = useTransform(smoothProgress, [0, 0.45], ["0%", "-120%"]);
  const posterOpacity = useTransform(smoothProgress, [0, 0.35], [1, 0]);
  const sideLabelsOpacity = useTransform(smoothProgress, [0, 0.25], [1, 0]);
  
  // 3. Showreel starts at scale: 1 (small size) and grows smoothly to calculated scale (exactly 90% of screen height)
  const videoScale = useTransform(smoothProgress, [0, 0.5], [1, calculatedScale]);
  const videoY = useTransform(smoothProgress, [0, 0.5], ["0%", "14%"]);
  const videoZIndex = useTransform(smoothProgress, [0, 0.05], [10, 100]);
  const videoShadow = "none";

  // Apply the wind waving cloth filter to the showreel only when scroll has not started
  const videoFilter = useTransform(smoothProgress, (pos) => 
    pos > 0.005 ? "none" : "url(#wind-waving-filter)"
  );

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let active = true;
    requestAnimationFrame(() => {
      if (active) setMounted(true);
    });

    return () => {
      active = false;
    };
  }, []);

  const scaleVal = useRef(0);
  const phase = useRef(0);

  // Generate high-resolution base64 SVG radial mask to bypass browser data-URI parsing bugs
  const maskDataUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    const cx = mousePos.x.toFixed(1);
    const cy = mousePos.y.toFixed(1);
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800"><defs><radialGradient id="g" cx="${cx}%" cy="${cy}%" r="35%"><stop offset="0%" stop-color="#ffffff"/><stop offset="50%" stop-color="#888888"/><stop offset="100%" stop-color="#000000"/></radialGradient></defs><rect width="800" height="800" fill="url(#g)"/></svg>`;
    return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgString)))}`;
  }, [mousePos.x, mousePos.y]);

  // Reactive listener to immediately clear 3D tilt when scrolling starts
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest > 0.005) {
        setTilt({ x: 0, y: 0 });
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // physics loop - checks scroll position on every single frame tick
  useEffect(() => {
    let animId: number;

    const updateFilter = () => {
      const isScrolling = scrollYProgress.get() > 0.005;
      const targetScale = (hovered && !isScrolling) ? 22 : 0;
      scaleVal.current += (targetScale - scaleVal.current) * 0.15;

      if (dispRef.current) {
        dispRef.current.setAttribute("scale", scaleVal.current.toFixed(2));
      }

      if (scaleVal.current > 0.05) {
        phase.current += 0.025;
        if (turbRef.current) {
          const freqX = 0.004 + Math.sin(phase.current) * 0.001;
          const freqY = 0.007 + Math.cos(phase.current * 0.7) * 0.0015;
          turbRef.current.setAttribute("baseFrequency", `${freqX} ${freqY}`);
        }
      }

      animId = requestAnimationFrame(updateFilter);
    };

    updateFilter();
    return () => cancelAnimationFrame(animId);
  }, [hovered, scrollYProgress]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (scrollYProgress.get() > 0.005) return;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const px = Math.min(100, Math.max(0, (x / rect.width) * 100));
    const py = Math.min(100, Math.max(0, (y / rect.height) * 100));

    setMousePos({ x: px, y: py });
    
    const rotateX = -((y - rect.height / 2) / rect.height) * 8;
    const rotateY = ((x - rect.width / 2) / rect.width) * 8;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const activeScale = mounted ? (typeof window !== "undefined" && window.innerWidth >= 1024 ? videoScale : 1.1) : 1.1;
  const activeY = mounted ? (typeof window !== "undefined" && window.innerWidth >= 1024 ? videoY : "0%") : "0%";
  const activeZIndex = mounted ? (typeof window !== "undefined" && window.innerWidth >= 1024 ? videoZIndex : 10) : 10;
  const activeFilter = mounted ? (typeof window !== "undefined" && window.innerWidth >= 1024 ? videoFilter : "none") : "none";
  const activeOpacity = 1;
  const activePosterY = mounted ? (typeof window !== "undefined" && window.innerWidth >= 1024 ? posterY : "0%") : "0%";
  const activePosterOpacity = mounted ? (typeof window !== "undefined" && window.innerWidth >= 1024 ? posterOpacity : 1) : 1;
  const activeCardFilter = mounted ? (typeof window !== "undefined" && window.innerWidth >= 1024 ? "url(#wind-waving-filter)" : "none") : "none";

  return (
    <section ref={outerSectionRef} className="relative w-full h-screen min-h-screen lg:h-[150vh]">
      {/* SVG Displacement Filter Definition with Localized Mask Composite */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="wind-waving-filter" x="-10%" y="-10%" width="120%" height="120%">
            {/* numOctaves set to 1 removes all pixelated grain, leaving perfectly smooth silk-like ripples */}
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0.004 0.007"
              numOctaves="1"
              result="noise"
              seed="2"
            />
            <feImage
              ref={feImageRef}
              href={mounted ? maskDataUrl : undefined}
              result="mask"
              preserveAspectRatio="none"
            />
            <feComposite
              in="noise"
              in2="mask"
              operator="arithmetic"
              k1="1"
              k2="0"
              k3="0"
              k4="0"
              result="maskedNoise"
            />
            <feDisplacementMap
              ref={dispRef}
              in="SourceGraphic"
              in2="maskedNoise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Sticky Viewport Frame */}
      <div className="relative lg:sticky lg:top-0 w-full h-screen min-h-screen bg-white flex flex-col justify-between items-center pt-20 pb-8 px-4 md:px-12 select-none overflow-hidden">
        
        {/* Outer Poster Container - Constrained by height & Aspect Ratio 988/1256 */}
        <div 
          ref={containerRef}
          onMouseEnter={() => setHovered(true)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="poster-card relative h-full max-h-[calc(100vh-140px)] w-auto max-w-[90vw] my-auto flex-shrink-0 transition-transform duration-300 ease-out cursor-pointer"
          style={{
            containerType: "inline-size",
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transformStyle: "preserve-3d",
            aspectRatio: mounted && typeof window !== "undefined" && window.innerWidth >= 1024 ? "988/1256" : "352/450",
            ...((mounted && typeof window !== "undefined" && window.innerWidth >= 1024 ? {
              "--video-left": "11.44%",
              "--video-top": "29.30%",
              "--video-width": "77.02%",
              "--video-height": "34.08%",
              "--shresth-top": "21.5%",
              "--kushwaha-top": "61.3%",
              "--profile-left": "3.44%",
              "--profile-top": "78.03%",
              "--profile-width": "30.26%",
              "--profile-height": "21.97%",
              "--desc-left": "43.62%",
              "--desc-top": "89.65%",
              "--desc-width": "44.84%",
              "--desc-font": "2.43cqw",
              "--label-font": "2.43cqw",
              "--card-shadow": "-3.5px -3.5px 13.93px rgba(0,0,0,0.46), 2.45px 2.45px 11.305px rgba(0,0,0,0.38)",
            } : {
              "--video-left": "7.10%",
              "--video-top": "29.42%",
              "--video-width": "85.5%",
              "--video-height": "37.62%",
              "--shresth-top": "27.23%",
              "--kushwaha-top": "61.5%",
              "--profile-left": "74.15%",
              "--profile-top": "83.3%",
              "--profile-width": "25.85%",
              "--profile-height": "16.7%",
              "--desc-left": "10.22%",
              "--desc-top": "77.5%",
              "--desc-width": "41.76%",
              "--desc-font": "11px",
              "--label-font": "11px",
              "--card-shadow": "none",
            }) as React.CSSProperties)
          }}
        >

          {/* INNER FILTERED CONTAINER: Slides UP (-120%) and fades out as user scrolls */}
          <motion.div 
            className="absolute inset-0 w-full h-full pointer-events-auto rounded-[6px] lg:rounded-none"
            style={{
              filter: activeCardFilter,
              y: activePosterY,
              opacity: activePosterOpacity,
              boxShadow: "var(--card-shadow)",
            }}
          >
            {/* Concrete textured background poster */}
            <div className="absolute inset-0 pointer-events-none">
              <Image
                src="/page.png"
                alt="Textured Background"
                fill
                className="object-fill"
                priority
                sizes="100vw"
              />
            </div>

            {/* 1. "SHRESTH" Name Text */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute font-helvetica font-bold uppercase text-white mix-blend-difference select-none tracking-tight leading-none -translate-x-1/2 z-0"
              style={{
                left: "50%",
                top: "var(--shresth-top)",
                fontSize: "14cqw",
              }}
            >
              SHRESTH
            </motion.h1>

            {/* 3. "KUSHWAHA" Name Text */}
            <motion.h1 
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute font-helvetica font-bold uppercase text-white mix-blend-difference select-none tracking-tight leading-none -translate-x-1/2 z-0"
              style={{
                left: "50%",
                top: "var(--kushwaha-top)",
                fontSize: "14cqw",
              }}
            >
              KUSHWAHA
            </motion.h1>

            {/* 4. Profile Picture Overlay */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
              className="absolute z-20 pointer-events-none"
              style={{
                left: "var(--profile-left)",
                top: "var(--profile-top)",
                width: "var(--profile-width)",
                height: "var(--profile-height)",
                transform: "translateZ(45px)",
              }}
            >
              <Image
                src="/profile-pic.png"
                alt="Shresth Kushwaha Cutout"
                fill
                sizes="(max-width: 768px) 30vw, 20vw"
                className="object-contain object-bottom"
                priority
              />
            </motion.div>

            {/* 5. Micro-Copy Description */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="absolute text-left font-sans font-normal text-black leading-normal z-20"
              style={{
                left: "var(--desc-left)",
                top: "var(--desc-top)",
                width: "var(--desc-width)",
                fontSize: "var(--desc-font)",
                transform: "translateZ(15px)",
              }}
            >
              <p className="leading-[1.3] font-sans font-normal text-black select-none">
                Building complex web applications, UI systems, and functional digital tools.
              </p>
            </motion.div>

            {/* 6. "Scroll" Text */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute text-center font-sans font-normal text-black -translate-x-1/2 z-20 hidden lg:block"
              style={{
                left: "50%",
                top: "102.5%",
                fontSize: "2.43cqw",
              }}
            >
              Scroll
            </motion.p>

            {/* 7. Vertical Scroll Indicator Line */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 w-[1.5px] bg-black z-20 hidden lg:block"
              style={{
                top: "106.2%",
                height: "3.5%",
              }}
            />

            {/* Mobile-only Bottom Labels (Dynamic alignment with card left/right margins) */}
            <div 
              className="absolute w-[99%] left-[0.5%] flex justify-between items-center z-20 lg:hidden text-black font-sans font-normal select-none"
              style={{
                top: "102.5%",
                fontSize: "2.62cqw",
              }}
            >
              <div>AI Product Designer</div>
              <div>Available for 2026/2027 Roles</div>
            </div>
          </motion.div>

          {/* 2. EXPANDING SHOWREEL VIDEO MOCKUP */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
            className="absolute overflow-hidden rounded-[1.2cqw] border border-black/10 origin-center"
            style={{
              left: "var(--video-left)",
              top: "var(--video-top)",
              width: "var(--video-width)",
              height: "var(--video-height)",
              scale: activeScale,
              y: activeY,
              zIndex: activeZIndex,
              boxShadow: videoShadow,
              filter: activeFilter,
              opacity: activeOpacity,
            }}
          >
            <video
              src="/showreel.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              // @ts-expect-error fetchpriority might not be typed
              fetchPriority="high"
              poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
              onLoadedData={() => {
                if (typeof window !== "undefined") {
                  // @ts-expect-error - showcaseReelLoaded flag attached to window
                  window.__showcaseReelLoaded = true;
                  window.dispatchEvent(new CustomEvent("showcase-reel-loaded"));
                }
              }}
              className="w-full h-full object-contain rounded-[1.2cqw]"
            />
          </motion.div>

          {/* UNFILTERED SIDE LABELS: Fades out cleanly on scroll */}
          
          {/* 8. Left Side Label ("AI Product Designer") */}
          <motion.div 
            className="absolute hidden lg:block text-left font-sans font-normal text-black leading-normal z-30 pointer-events-none"
            style={{
              left: "-18%",
              top: "43.39%",
              width: "15%",
              fontSize: "2.43cqw",
              opacity: sideLabelsOpacity,
            }}
          >
            <motion.p
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              AI Product <br />
              Designer
            </motion.p>
          </motion.div>

          {/* 9. Right Side Label ("Available for 2026/2027 Roles") */}
          <motion.div 
            className="absolute hidden lg:block text-left font-sans font-normal text-black leading-normal z-30 pointer-events-none"
            style={{
              left: "103%",
              top: "42.11%",
              width: "25%",
              fontSize: "2.43cqw",
              opacity: sideLabelsOpacity,
            }}
          >
            <motion.p
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Available for <br />
              2026/2027 Roles
            </motion.p>
          </motion.div>

        </div>


      </div>
    </section>
  );
}
