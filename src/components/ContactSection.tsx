"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("kshresth2151@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Float 4 social icons around portrait
      gsap.to(".social-float-1", { y: "-=6", duration: 2.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".social-float-2", { y: "+=6", duration: 2.9, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.3 });
      gsap.to(".social-float-3", { y: "-=7", duration: 2.7, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.2 });
      gsap.to(".social-float-4", { y: "+=6", duration: 3.1, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5 });

      // Scroll entrance
      gsap.from(".contact-scroll-in", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 35,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-white text-black overflow-hidden select-none flex flex-col justify-between items-center pt-16 md:pt-24 pb-0 px-4 sm:px-6 md:px-12"
    >
      {/* Header & Main Call to Action */}
      <div className="contact-scroll-in max-w-2xl w-full mx-auto flex flex-col items-center text-center">
        <h2 className="font-[family-name:var(--font-averia)] text-[#0663FF] text-[32px] sm:text-[42px] md:text-[52px] font-normal leading-tight tracking-tight mb-3">
          Let&apos;s Connect
        </h2>
        
        <p className="font-sans text-[13px] sm:text-[15px] md:text-[16px] text-black/60 max-w-md mb-6 leading-relaxed">
          Always open to forward-thinking product design opportunities, AI workflows, and great conversations.
        </p>

        {/* Quick Email Pill */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F5] border border-black/10 shadow-xs">
          <a
            href="mailto:kshresth2151@gmail.com"
            className="font-mono text-[12px] sm:text-[14px] font-bold text-[#0663FF] hover:underline"
          >
            kshresth2151@gmail.com
          </a>
          <button
            type="button"
            onClick={handleCopy}
            className="px-2 py-0.5 rounded-md bg-black/5 hover:bg-black/10 text-[10px] font-mono text-black/70 transition-all active:scale-95 cursor-pointer"
            title="Copy Email"
          >
            {copied ? "Copied! ✓" : "Copy"}
          </button>
        </div>
      </div>

      {/* Portrait Cutout + Orbiting Social Arc (Smaller & refined, sitting flush on baseline) */}
      <div className="contact-scroll-in relative w-full max-w-[440px] h-[250px] sm:h-[290px] md:h-[330px] mx-auto flex items-end justify-center mt-8 md:mt-12 shrink-0">
        {/* Arc of 4 Social Icons around head */}
        <div className="absolute inset-0 z-20 pointer-events-auto">
          {/* 1. Gmail (Middle-Left) */}
          <div className="absolute top-[44%] left-[12%] sm:left-[14%] -translate-x-1/2 -translate-y-1/2">
            <a
              href="mailto:kshresth2151@gmail.com"
              className="social-float-1 block w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 transform hover:scale-125 active:scale-95 transition-transform duration-200 filter drop-shadow-[0_6px_14px_rgba(0,0,0,0.15)] cursor-pointer"
              title="Email: kshresth2151@gmail.com"
            >
              <img
                src="/assets/about/social_mail.webp"
                alt="Gmail"
                className="w-full h-full object-contain"
              />
            </a>
          </div>

          {/* 2. LinkedIn (Top-Left) */}
          <div className="absolute top-[10%] left-[30%] sm:left-[32%] -translate-x-1/2 -translate-y-1/2">
            <a
              href="https://www.linkedin.com/in/shresth-kushwaha-706060420/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-float-2 block w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 transform hover:scale-125 active:scale-95 transition-transform duration-200 filter drop-shadow-[0_6px_14px_rgba(0,0,0,0.15)] cursor-pointer"
              title="LinkedIn Profile"
            >
              <img
                src="/assets/about/social_linkedin.webp"
                alt="LinkedIn"
                className="w-full h-full object-contain"
              />
            </a>
          </div>

          {/* 3. GitHub (Top-Right) */}
          <div className="absolute top-[10%] left-[70%] sm:left-[68%] -translate-x-1/2 -translate-y-1/2">
            <a
              href="https://github.com/shresthkushwaha"
              target="_blank"
              rel="noopener noreferrer"
              className="social-float-3 block w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 transform hover:scale-125 active:scale-95 transition-transform duration-200 filter drop-shadow-[0_6px_14px_rgba(0,0,0,0.15)] cursor-pointer"
              title="GitHub Profile"
            >
              <img
                src="/assets/about/social_github.webp"
                alt="GitHub"
                className="w-full h-full object-contain"
              />
            </a>
          </div>

          {/* 4. Phone / WhatsApp (Middle-Right) */}
          <div className="absolute top-[44%] left-[88%] sm:left-[86%] -translate-x-1/2 -translate-y-1/2">
            <a
              href="tel:6290168861"
              className="social-float-4 block w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 transform hover:scale-125 active:scale-95 transition-transform duration-200 filter drop-shadow-[0_6px_14px_rgba(0,0,0,0.15)] cursor-pointer"
              title="Call / WhatsApp: +91 6290168861"
            >
              <img
                src="/assets/about/social_phone.webp"
                alt="Phone"
                className="w-full h-full object-contain"
              />
            </a>
          </div>
        </div>

        {/* Portrait Image Cutout at Bottom Center sitting flush on baseline */}
        <div className="relative w-[180px] sm:w-[220px] md:w-[260px] z-10 pointer-events-none flex items-end justify-center">
          <img
            src="/assets/about/about_below_pic.webp"
            alt="Shresth Kushwaha"
            className="w-full h-auto object-contain block align-bottom -mb-[1px]"
          />
        </div>
      </div>
    </footer>
  );
}
