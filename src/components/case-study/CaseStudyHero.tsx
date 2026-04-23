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
}: CaseStudyHeroProps) {
  const isDark = theme === "dark";

  return (
    <section className={`hero-section relative z-10 pt-32 md:pt-44 pb-20 md:pb-32 px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto min-h-[80vh] md:min-h-screen flex flex-col justify-center ${className} ${isDark ? 'text-white' : 'text-gray-900'}`}>
      {layout === "stacked" ? (
        <div className="flex flex-col gap-16 md:gap-24 mb-16 md:mb-24">
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className={`font-helvetica font-bold text-[52px] md:text-[140px] lg:text-[160px] leading-[0.85] tracking-tighter mb-8 md:mb-12 ${isItalic ? 'italic' : ''} break-words`}>
              {title}
            </h1>
            <div className="flex gap-4 items-center">
              <span className={`w-12 h-px ${isDark ? 'bg-white/20' : 'bg-black/20'}`}></span>
              <p className={`text-[18px] md:text-[24px] font-normal tracking-wide uppercase ${isDark ? 'text-white/40' : 'text-gray-400'}`}>
                {subtitle}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="grid grid-cols-1 lg:grid-cols-[1.5fr,1fr] gap-12 md:gap-24 items-start border-t border-white/5 pt-12 md:pt-16"
          >
            <p className={`text-[18px] md:text-[28px] leading-tight font-normal ${isItalic ? 'italic' : ''} ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
              {description}
            </p>
            <div className={`flex flex-wrap gap-12 md:gap-16 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] ${isDark ? 'text-white/40' : 'text-black/40'}`}>
              {Object.entries(meta).map(([key, value]) => (
                <div key={key} className="space-y-4">
                  <p className={`font-bold ${isDark ? 'text-white' : 'text-black'}`}>{key}</p>
                  <p className="break-all opacity-60">
                    {value.startsWith("http") ? (
                      <a href={value} target="_blank" rel="noopener noreferrer" className="underline hover:opacity-100 transition-opacity">
                        {value.replace("https://", "").replace("www.", "")}
                      </a>
                    ) : (
                      value
                    )}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr,0.9fr] gap-12 md:gap-24 items-start mb-16 md:mb-24">
          <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className={`font-helvetica font-bold text-[48px] md:text-[110px] lg:text-[140px] leading-[0.85] tracking-tighter mb-8 md:mb-12 ${isItalic ? 'italic' : ''} break-words`}>
              {title}
            </h1>
            <div className="flex gap-4 items-center">
              <span className={`w-12 h-px ${isDark ? 'bg-white/20' : 'bg-black/20'}`}></span>
              <p className={`text-[16px] md:text-[20px] font-normal tracking-wide uppercase ${isDark ? 'text-white/50' : 'text-gray-400'}`}>
                {subtitle}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex flex-col gap-8 md:gap-12 pt-4 md:pt-12"
          >
            <p className={`text-[18px] md:text-[22px] leading-relaxed font-normal ${isItalic ? 'italic' : ''} ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
              {description}
            </p>
            <div className={`flex flex-wrap gap-8 md:gap-16 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] ${isDark ? 'text-white/40' : 'text-black/40'}`}>
              {Object.entries(meta).map(([key, value]) => (
                <div key={key}>
                  <p className={`mb-3 font-bold ${isDark ? 'text-white' : 'text-black'}`}>{key}</p>
                  <p className="break-all opacity-70">
                    {value.startsWith("http") ? (
                      <a href={value} target="_blank" rel="noopener noreferrer" className="underline hover:opacity-100 transition-opacity">
                        {value.replace("https://", "").replace("www.", "")}
                      </a>
                    ) : (
                      value
                    )}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className={`hero-image-container relative w-full ${fullMedia ? 'aspect-auto md:min-h-[70vh]' : 'aspect-video md:aspect-[21/9] lg:aspect-[21/8]'} overflow-hidden rounded-sm shadow-2xl border ${isDark ? 'bg-neutral-900 border-white/5' : 'bg-[#E8E8E8] border-gray-100'}`}
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
            className={`${fullMedia ? 'object-contain p-0' : 'object-contain p-4 md:p-12'} opacity-95 transition-all duration-700`}
            priority
          />
        )}
      </motion.div>
    </section>
  );
}
