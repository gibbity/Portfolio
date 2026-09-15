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
  const [calculatedScale, setCalculatedScale] = useState(2.2);
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const updateDesktop = () => setIsDesktop(mediaQuery.matches);
    updateDesktop();
    mediaQuery.addEventListener("change", updateDesktop);
    return () => mediaQuery.removeEventListener("change", updateDesktop);
  }, []);

  // Scroll Progress tracking for sticky expansion section (only active on desktop)
  const { scrollYProgress } = useScroll({
    target: outerSectionRef,
    offset: ["start start", "end end"]
  });

  // Snappy yet liquid smooth spring response for scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.3,
    restDelta: 0.0001
  });

  // Calculate target scale dynamically on mount/resize to fit full viewport cinema frame (>= 85% of screen)
  useEffect(() => {
    const calculateTargetDimensions = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.height > 50 && rect.width > 50) {
        const isDesk = window.innerWidth >= 1024;
        const videoRatioW = isDesk ? 0.7702 : 0.855;
        
        const initialVideoWidth = rect.width * videoRatioW;
        const initialVideoHeight = initialVideoWidth * (9 / 16);

        // Occupy >= 88% width or 85% height of the screen viewport
        const targetWidth = window.innerWidth * (isDesk ? 0.90 : 0.94);
        const targetHeight = window.innerHeight * (isDesk ? 0.86 : 0.88);

        const scaleX = targetWidth / Math.max(initialVideoWidth, 1);
        const scaleY = targetHeight / Math.max(initialVideoHeight, 1);
        const targetScale = Math.min(scaleX, scaleY);

        // Allow target scale to reach full screen coverage (up to 4.8x)
        setCalculatedScale(Math.max(1.8, Math.min(targetScale, 4.8)));
      }
    };

    calculateTargetDimensions();
    window.addEventListener("resize", calculateTargetDimensions);
    return () => window.removeEventListener("resize", calculateTargetDimensions);
  }, []);

  // 1. Poster background and text slide UP out of visibility smoothly (Desktop Only)
  const posterY = useTransform(smoothProgress, [0, 0.6], ["0%", "-115%"]);
  const posterOpacity = useTransform(smoothProgress, [0, 0.45], [1, 0]);
  const sideLabelsOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);
  
  // 2. Showreel expands smoothly from 1 to calculatedScale and centers perfectly in viewport (Desktop Only)
  const videoScale = useTransform(smoothProgress, [0, 0.65], [1, calculatedScale]);
  const videoY = useTransform(smoothProgress, [0, 0.65], ["0%", "10.74%"]);
  const videoZIndex = useTransform(smoothProgress, [0, 0.02], [10, 80]);
  const videoShadow = useTransform(
    smoothProgress, 
    [0, 0.45], 
    ["0px 0px 0px rgba(0,0,0,0)", "0px 24px 60px -12px rgba(0,0,0,0.35)"]
  );

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

  // Mouse move handler - Desktop only
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop || scrollYProgress.get() > 0.005) return;
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

  // On Mobile: locked static values (0 interaction/expansion). On Desktop: dynamic scroll transforms.
  const activeScale = (mounted && isDesktop) ? videoScale : 1;
  const activeY = (mounted && isDesktop) ? videoY : "0%";
  const activeZIndex = (mounted && isDesktop) ? videoZIndex : 10;
  const activePosterY = (mounted && isDesktop) ? posterY : "0%";
  const activePosterOpacity = (mounted && isDesktop) ? posterOpacity : 1;
  const activeSideLabelsOpacity = (mounted && isDesktop) ? sideLabelsOpacity : 1;
  const activeVideoShadow = (mounted && isDesktop) ? videoShadow : "0px 0px 0px rgba(0,0,0,0)";

  return (
    <section ref={outerSectionRef} className="relative w-full h-[100dvh] min-h-[100dvh] lg:h-[200vh]">
      {/* SVG Displacement Filter Definition */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="wind-waving-filter" x="-10%" y="-10%" width="120%" height="120%">
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
      <div className="relative lg:sticky lg:top-0 w-full h-screen min-h-screen min-h-[100dvh] bg-white flex flex-col justify-between items-center pt-16 pb-8 sm:pt-20 sm:pb-8 px-4 md:px-12 select-none overflow-hidden">
        
        {/* Outer Poster Container */}
        <div 
          ref={containerRef}
          onMouseEnter={() => setHovered(true)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="poster-card relative aspect-[352/450] lg:aspect-[988/1256] h-[75vh] sm:h-[80vh] lg:h-full max-h-[calc(100dvh-135px)] sm:max-h-[calc(100dvh-150px)] lg:max-h-[calc(100vh-140px)] w-auto max-w-[92vw] sm:max-w-[85vw] lg:max-w-[90vw] my-auto flex-shrink-0 cursor-pointer"
          style={{
            containerType: "inline-size",
            transform: `perspective(1000px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg)`,
            transformStyle: "preserve-3d",
          }}
        >

          {/* INNER FILTERED CONTAINER: Slides UP and fades out as user scrolls */}
          <motion.div 
            className="absolute inset-0 w-full h-full pointer-events-auto rounded-[6px] lg:rounded-none"
            style={{
              filter: "url(#wind-waving-filter)",
              y: activePosterY,
              opacity: activePosterOpacity,
              boxShadow: "var(--card-shadow)",
            }}
          >
            {/* Concrete textured background poster */}
            <div className="absolute inset-0 pointer-events-none">
              <Image
                src="/page.webp"
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
              className="absolute font-helvetica font-bold uppercase text-white mix-blend-difference select-none tracking-tight leading-none -translate-x-1/2 z-0 antialiased"
              style={{
                left: "50%",
                top: "var(--shresth-top)",
                fontSize: "14cqw",
                WebkitFontSmoothing: "antialiased",
                textRendering: "optimizeLegibility",
              }}
            >
              SHRESTH
            </motion.h1>

            {/* 3. "KUSHWAHA" Name Text */}
            <motion.h1 
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute font-helvetica font-bold uppercase text-white mix-blend-difference select-none tracking-tight leading-none -translate-x-1/2 z-0 antialiased"
              style={{
                left: "50%",
                top: "var(--kushwaha-top)",
                fontSize: "14cqw",
                WebkitFontSmoothing: "antialiased",
                textRendering: "optimizeLegibility",
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
                transform: mounted && typeof window !== "undefined" && window.innerWidth >= 1024 ? "translateZ(45px)" : "none",
              }}
            >
              <Image
                src="/profile-pic.webp"
                alt="Shresth Kushwaha Cutout"
                fill
                sizes="(max-width: 768px) 50vw, 300px"
                quality={95}
                className="object-contain object-bottom select-none"
                priority
              />
            </motion.div>

            {/* 5. Micro-Copy Description */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="absolute text-left font-sans font-normal text-black leading-normal z-20 antialiased"
              style={{
                left: "var(--desc-left)",
                top: "var(--desc-top)",
                width: "var(--desc-width)",
                fontSize: "var(--desc-font)",
                transform: mounted && typeof window !== "undefined" && window.innerWidth >= 1024 ? "translateZ(15px)" : "none",
                WebkitFontSmoothing: "antialiased",
                textRendering: "optimizeLegibility",
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

            {/* Mobile-only Bottom Labels */}
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

          {/* 2. SHOWREEL VIDEO MOCKUP - Strict 16:9 Cinema Frame (No Letterboxing/Cropping) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute overflow-hidden rounded-[1.2cqw] border border-black/10 origin-center will-change-transform"
            style={{
              left: "var(--video-left)",
              top: "var(--video-top)",
              width: "var(--video-width)",
              aspectRatio: "16 / 9",
              scale: activeScale,
              y: activeY,
              zIndex: activeZIndex,
              boxShadow: activeVideoShadow,
            }}
          >
            <video
              src="/showreel.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-cover rounded-[1.2cqw]"
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
              opacity: activeSideLabelsOpacity,
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
              opacity: activeSideLabelsOpacity,
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
