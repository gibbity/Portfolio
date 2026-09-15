"use client";

import React from "react";
import Image from "next/image";

export interface CaseStudyHeroProps {
  title: string;
  subtitle?: string;
  titleAccent?: string;
  metaBadges?: string[];
  meta?: Record<string, string>;
  description?: string;
  media?: {
    type: "image" | "video" | "gif" | string;
    src: string;
  };
  theme?: "dark" | "light";
  className?: string;
  isItalic?: boolean;
  fullMedia?: boolean;
  layout?: "grid" | "stacked";
  liveUrl?: string;
  readTime?: string;
  children?: React.ReactNode;
}

export default function CaseStudyHero({
  title,
  subtitle,
  titleAccent,
  metaBadges,
  meta,
  description,
  media,
  theme = "light",
  className = "",
  fullMedia = false,
  liveUrl,
  readTime = "3 min read • 45 sec skim",
  children,
}: CaseStudyHeroProps) {
  const isDark = theme === "dark";

  const textColor = isDark ? "text-white" : "text-neutral-900";
  const mutedColor = isDark ? "text-white/70" : "text-neutral-600";
  const fadedColor = isDark ? "text-white/40" : "text-neutral-400";
  const badgeBg = isDark ? "bg-white/10 border-white/15 text-white/80" : "bg-neutral-100/90 border-neutral-200/80 text-neutral-700";
  const btnBg = isDark ? "bg-white text-black hover:bg-neutral-200" : "bg-black text-white hover:bg-neutral-800";
  const mediaBorder = isDark ? "border-white/10 bg-neutral-950" : "border-neutral-200/80 bg-neutral-100";

  // Derive badges from meta if metaBadges is not provided
  const computedBadges: string[] = metaBadges || (
    meta ? Object.entries(meta).filter(([k]) => k !== "Poster").map(([k, v]) => `${k}: ${v}`) : ["0 to 1 Product Design", "Design Systems", "Strategy", "Shipped"]
  );

  const displayAccent = titleAccent || subtitle;

  return (
    <section className={`hero-section relative z-10 pt-32 sm:pt-36 md:pt-40 pb-12 px-5 sm:px-8 md:px-12 lg:px-16 max-w-6xl mx-auto text-center ${className}`}>
      
      {/* Editorial Headline */}
      <h1 className={`font-serif text-[34px] sm:text-[46px] md:text-[58px] lg:text-[68px] leading-[1.12] ${textColor} tracking-tight max-w-5xl mx-auto font-normal`}>
        {title}{" "}
        {displayAccent && (
          <span className={`italic font-serif ${isDark ? "text-white/90 decoration-white/30" : "text-neutral-800 decoration-neutral-300"} underline decoration-1 underline-offset-4`}>
            {displayAccent}
          </span>
        )}
      </h1>

      {/* Metadata Pill Badges */}
      {computedBadges && computedBadges.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
          <div className={`inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full border text-[11px] sm:text-[12px] font-sans font-medium shadow-xs ${badgeBg}`}>
            {computedBadges.map((badge, idx) => (
              <React.Fragment key={idx}>
                <span>{badge}</span>
                {idx < computedBadges.length - 1 && (
                  <span className={`${fadedColor} select-none`}>•</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Optional Description */}
      {description && (
        <p className={`font-sans text-[16px] sm:text-[18px] md:text-[20px] leading-relaxed ${mutedColor} max-w-3xl mx-auto mt-6`}>
          {description}
        </p>
      )}

      {/* Action / Skim Buttons */}
      {(liveUrl || readTime) && (
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-8">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center px-6 py-2.5 rounded-full ${btnBg} text-[11px] sm:text-[12px] font-sans font-medium uppercase tracking-wider hover:scale-[1.02] transition-all shadow-sm`}
            >
              Visit Live App ↗
            </a>
          )}
          <button
            onClick={() => {
              const el = document.getElementById("outcome");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className={`font-sans text-[12px] sm:text-[13px] ${mutedColor} hover:${textColor} underline underline-offset-4 font-medium transition-colors cursor-pointer`}
          >
            Skip to outcome →
          </button>
          {readTime && (
            <span className={`font-sans text-[11px] sm:text-[12px] ${fadedColor} font-normal`}>
              {readTime}
            </span>
          )}
        </div>
      )}

      {/* Hero Visual Container without bulky nested frames */}
      {(children || media) && (
        <div className={`mt-12 sm:mt-16 w-full rounded-xl overflow-hidden border ${mediaBorder} shadow-sm relative`}>
          {children ? (
            children
          ) : media?.type === "video" ? (
            <video
              src={media.src}
              autoPlay
              muted
              loop
              playsInline
              poster={meta?.["Poster"] || ""}
              className={`w-full h-full ${fullMedia ? "object-contain" : "object-cover"}`}
            />
          ) : media?.src ? (
            <div className="relative w-full aspect-[16/9.5]">
              <Image
                src={media.src}
                alt={title}
                fill
                sizes="(max-width: 1024px) 100vw, 80vw"
                unoptimized={media.src.endsWith(".gif")}
                className={`${fullMedia ? "object-contain" : "object-cover"} opacity-95 transition-all duration-700`}
                priority
              />
            </div>
          ) : null}
        </div>
      )}
    </section>
  );
}
