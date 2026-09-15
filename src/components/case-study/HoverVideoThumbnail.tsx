"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface HoverVideoThumbnailProps {
  thumbnailSrc: string;
  videoSrc?: string;
  alt: string;
  aspectRatioClass?: string;
  objectFit?: "cover" | "contain" | "fill";
  priority?: boolean;
  className?: string;
}

export default function HoverVideoThumbnail({
  thumbnailSrc,
  videoSrc,
  alt,
  aspectRatioClass = "aspect-video",
  objectFit = "cover",
  priority = false,
  className = "",
}: HoverVideoThumbnailProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewports to prevent hover requirement
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovered(true);
      if (videoRef.current) {
        videoRef.current.play().then(() => setIsVideoPlaying(true)).catch(() => {});
      }
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsHovered(false);
      if (videoRef.current) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
    }
  };

  const shouldPlayVideo = isMobile || (isHovered && isVideoPlaying);

  const fitClass = objectFit === "contain" 
    ? "object-contain" 
    : objectFit === "cover" 
    ? "object-cover" 
    : "object-fill";

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full ${aspectRatioClass} overflow-hidden bg-neutral-950 select-none group ${className}`}
    >
      {/* 1. WEBP THUMBNAIL IMAGE (Shown on Desktop until hovered) */}
      <Image
        src={thumbnailSrc}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 80vw"
        priority={priority}
        className={`w-full h-full transition-opacity duration-300 ease-out z-10 ${fitClass} ${shouldPlayVideo ? "opacity-0" : "opacity-100"}`}
      />

      {/* 2. VIDEO (Auto-plays on mobile; plays on hover on desktop) */}
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay={isMobile}
          loop
          muted
          playsInline
          preload="auto"
          className={`absolute inset-0 w-full h-full transition-opacity duration-300 ease-out z-20 ${fitClass} ${shouldPlayVideo ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        />
      )}

      {/* 3. SUBTLE HOVER HINT PILL (Hidden on mobile) */}
      {!isMobile && (
        <div
          className={`hidden md:block absolute bottom-3 right-3 z-30 pointer-events-none transition-opacity duration-300 font-sans text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full backdrop-blur-md ${
            isHovered
              ? "bg-black/60 text-white/90 border border-white/20"
              : "bg-black/40 text-white/70 border border-white/10 opacity-70 group-hover:opacity-100"
          }`}
        >
          {isHovered ? "Playing preview" : "Hover to play"}
        </div>
      )}
    </div>
  );
}
