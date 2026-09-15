"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface HoverVideoThumbnailProps {
  thumbnailSrc: string;
  videoSrc?: string;
  alt: string;
  className?: string;
  priority?: boolean;
  aspectRatioClass?: string;
  objectFit?: "cover" | "contain";
}

export default function HoverVideoThumbnail({
  thumbnailSrc,
  videoSrc,
  alt,
  className = "",
  priority = false,
  aspectRatioClass = "aspect-[16/9.2]",
  objectFit = "cover",
}: HoverVideoThumbnailProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileScreen = window.matchMedia("(max-width: 768px), (pointer: coarse)").matches;
      setIsMobile(isMobileScreen);
      if (isMobileScreen && videoRef.current) {
        videoRef.current.play().then(() => setIsVideoPlaying(true)).catch(() => {});
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return; // Mobile always plays

    const video = videoRef.current;
    if (!video) return;

    if (isHovered) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsVideoPlaying(true);
          })
          .catch(() => {
            // Autoplay prevention catch
          });
      }
    } else {
      video.pause();
      setIsVideoPlaying(false);
    }
  }, [isHovered, isMobile]);

  const handleMouseEnter = () => {
    if (!isMobile) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isMobile) setIsHovered(false);
  };

  const shouldPlayVideo = isMobile || (isHovered && isVideoPlaying);

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
        className={`w-full h-full transition-opacity duration-300 ease-out z-10 ${
          objectFit === "contain" ? "object-contain" : "object-cover"
        } ${shouldPlayVideo ? "opacity-0" : "opacity-100"}`}
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
          className={`absolute inset-0 w-full h-full transition-opacity duration-300 ease-out z-20 ${
            objectFit === "contain" ? "object-contain" : "object-cover"
          } ${shouldPlayVideo ? "opacity-100" : "opacity-0 pointer-events-none"}`}
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
