"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface CaseStudyHeroProps {
  title: string;
  subtitle: string;
  description: string;
  meta: Record<string, string>;
  media: {
    type: "image" | "video" | "gif";
    src: string;
  };
  theme?: "dark" | "light";
  className?: string;
  isItalic?: boolean;
  fullMedia?: boolean;
  layout?: "grid" | "stacked";
  liveUrl?: string;
}

export default function CaseStudyHero({
  title,
  subtitle,
  description,
  meta,
  media,
  theme = "light",
  className = "",
  isItalic = true,
  fullMedia = false,
  layout = "grid",
  liveUrl,
}: CaseStudyHeroProps) {
  const isDark = theme === "dark";

  const textColor = isDark ? "text-white" : "text-black";
  const mutedColor = isDark ? "text-white/60" : "text-black/60";
  const fadedColor = isDark ? "text-white/30" : "text-black/30";
  const borderColor = isDark ? "border-white/10" : "border-black/5";
  const btnBg = isDark ? "bg-white" : "bg-black";
  const btnText = isDark ? "text-black" : "text-white";

  return (
    <section className={`hero-section relative z-10 pt-32 pb-16 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto ${className}`}>
      {/* Title */}
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`font-sans font-normal text-[36px] md:text-[54px] lg:text-[72px] leading-[1.05] tracking-tight ${textColor} text-left max-w-4xl font-serif`}
      >
        {title}
      </motion.h1>
      
      {/* Description */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className={`font-sans text-[18px] md:text-[22px] leading-relaxed ${mutedColor} mt-8 max-w-3xl ${isItalic ? 'italic' : ''}`}
      >
        {description}
      </motion.p>

      {/* Role */}
      {meta["Role"] && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-8 font-sans"
        >
          <p className={`text-[10px] font-bold ${textColor} uppercase tracking-[0.3em] mb-3`}>Role</p>
          <p className={`text-[11px] md:text-[12px] ${mutedColor} font-bold uppercase tracking-widest`}>
            {meta["Role"]}
          </p>
        </motion.div>
      )}

      {/* Actions */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="flex flex-wrap items-center gap-6 mt-12"
      >
        {liveUrl && (
          <a 
            href={liveUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center px-8 py-3 ${btnBg} ${btnText} text-[11px] font-bold uppercase tracking-[0.2em] hover:scale-105 transition-transform duration-300 rounded-sm`}
          >
            Visit Live Site
          </a>
        )}
        <button 
          onClick={() => {
            const el = document.getElementById("outcome");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className={`font-sans font-semibold text-[12px] ${mutedColor} hover:${textColor} underline underline-offset-4 uppercase tracking-wider`}
        >
          Skip to outcome →
        </button>
        <span className={`font-sans text-[12px] ${fadedColor} font-medium uppercase tracking-wider`}>
          3 min read / 45 sec skim
        </span>
      </motion.div>

      {/* Hero Visual Video / Image */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={`hero-image-container relative w-full ${fullMedia ? 'aspect-auto md:min-h-[70vh]' : 'aspect-[16/9.5]'} border ${borderColor} rounded-sm overflow-hidden mt-12 shadow-sm ${isDark ? 'bg-neutral-950' : 'bg-[#E8E8E8]'}`}
      >
        {media.type === "video" ? (
          <video
            src={media.src}
            autoPlay
            muted
            loop
            playsInline
            poster={meta["Poster"] || ""}
            className={`w-full h-full ${fullMedia ? 'object-contain' : 'object-cover'}`}
          />
        ) : (
          <Image
            src={media.src}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 80vw"
            unoptimized={media.src.endsWith(".gif")}
            className={`${fullMedia ? 'object-contain p-0' : 'object-cover'} opacity-95 transition-all duration-700`}
            priority
          />
        )}
      </motion.div>
    </section>
  );
}
