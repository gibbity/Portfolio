"use client";

import React, { useEffect, useRef, useState } from "react";
import HeaderNav from "./HeaderNav";

declare global {
  interface Window {
    THREE: any;
    VANTA: any;
  }
}

export default function VantaCloudsHero() {
  const underlayRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [underlayEffect, setUnderlayEffect] = useState<any>(null);
  const [overlayEffect, setOverlayEffect] = useState<any>(null);

  // Liquid blob positions
  const [m1, setM1] = useState({ x: -200, y: -200 });
  const [m2, setM2] = useState({ x: -200, y: -200 });
  const [m3, setM3] = useState({ x: -200, y: -200 });
  const [m4, setM4] = useState({ x: -200, y: -200 });

  const mousePosRef = useRef({ x: -200, y: -200 });

  useEffect(() => {
    let threeScript: HTMLScriptElement | null = null;
    let vantaScript: HTMLScriptElement | null = null;

    const loadVantaEffects = () => {
      // Underlay default vanta clouds
      if (
        window.VANTA &&
        window.VANTA.CLOUDS &&
        underlayRef.current &&
        !underlayEffect
      ) {
        try {
          const uEffect = window.VANTA.CLOUDS({
            el: underlayRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
          });
          setUnderlayEffect(uEffect);
        } catch (e) {
          console.error("Underlay Vanta error:", e);
        }
      }

      // Overlay custom dark vanta clouds
      if (
        window.VANTA &&
        window.VANTA.CLOUDS &&
        overlayRef.current &&
        !overlayEffect
      ) {
        try {
          const oEffect = window.VANTA.CLOUDS({
            el: overlayRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            backgroundColor: 0xbdbdbd,
            skyColor: 0x0,
            cloudColor: 0x1f1f1f,
            cloudShadowColor: 0x151515,
            sunColor: 0x474747,
            sunGlareColor: 0x636363,
            sunlightColor: 0x959595,
            speed: 0.5,
          });
          setOverlayEffect(oEffect);
        } catch (e) {
          console.error("Overlay Vanta error:", e);
        }
      }
    };

    if (!window.THREE) {
      threeScript = document.createElement("script");
      threeScript.src =
        "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
      threeScript.async = true;
      threeScript.onload = () => {
        vantaScript = document.createElement("script");
        vantaScript.src =
          "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.clouds.min.js";
        vantaScript.async = true;
        vantaScript.onload = () => {
          loadVantaEffects();
        };
        document.body.appendChild(vantaScript);
      };
      document.body.appendChild(threeScript);
    } else if (!window.VANTA || !window.VANTA.CLOUDS) {
      vantaScript = document.createElement("script");
      vantaScript.src =
        "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.clouds.min.js";
      vantaScript.async = true;
      vantaScript.onload = () => {
        loadVantaEffects();
      };
      document.body.appendChild(vantaScript);
    } else {
      loadVantaEffects();
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Spring/lerp animation loop for fluid metaball blobs
    let animationFrameId: number;
    let currentM1 = { x: -200, y: -200 };
    let currentM2 = { x: -200, y: -200 };
    let currentM3 = { x: -200, y: -200 };
    let currentM4 = { x: -200, y: -200 };

    const updatePositions = () => {
      const target = mousePosRef.current;

      // Lerp main and trailing circles
      currentM1.x += (target.x - currentM1.x) * 0.22;
      currentM1.y += (target.y - currentM1.y) * 0.22;

      currentM2.x += (currentM1.x - currentM2.x) * 0.16;
      currentM2.y += (currentM1.y - currentM2.y) * 0.16;

      currentM3.x += (currentM2.x - currentM3.x) * 0.12;
      currentM3.y += (currentM2.y - currentM3.y) * 0.12;

      currentM4.x += (currentM3.x - currentM4.x) * 0.08;
      currentM4.y += (currentM3.y - currentM4.y) * 0.08;

      setM1({ ...currentM1 });
      setM2({ ...currentM2 });
      setM3({ ...currentM3 });
      setM4({ ...currentM4 });

      animationFrameId = requestAnimationFrame(updatePositions);
    };

    updatePositions();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (underlayEffect) underlayEffect.destroy();
      if (overlayEffect) overlayEffect.destroy();
    };
  }, [underlayEffect, overlayEffect]);

  return (
    <div className="relative w-full h-screen min-h-screen overflow-hidden bg-black flex flex-col justify-between items-center select-none">
      {/* SVG Liquid Gooey Filter & Mask Definition - w-full h-full with userSpaceOnUse to prevent 0px clipping */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-30"
        aria-hidden="true"
        style={{ mixBlendMode: "normal" }}
      >
        <defs>
          <filter id="gooey-liquid">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -14"
              result="gooey"
            />
          </filter>
          <mask id="vanta-liquid-mask" maskUnits="userSpaceOnUse">
            {/* Opaque white background shows all overlay */}
            <rect width="100%" height="100%" fill="white" />
            {/* Black gooey circles cut liquid holes revealing underlay */}
            <g filter="url(#gooey-liquid)">
              <circle cx={m1.x} cy={m1.y} r="85" fill="black" />
              <circle cx={m2.x} cy={m2.y} r="70" fill="black" />
              <circle cx={m3.x} cy={m3.y} r="55" fill="black" />
              <circle cx={m4.x} cy={m4.y} r="40" fill="black" />
            </g>
          </mask>
        </defs>
      </svg>

      {/* 1. Underlay Layer (Default Vanta Clouds) */}
      <div
        ref={underlayRef}
        id="vanta-underlay"
        className="absolute inset-0 w-full h-full z-0"
      />

      {/* 2. Overlay Layer (Custom Dark Vanta Clouds masked by SVG liquid filter) */}
      <div
        ref={overlayRef}
        id="vanta-overlay"
        className="absolute inset-0 w-full h-full z-10"
        style={{
          mask: "url(#vanta-liquid-mask)",
          WebkitMask: "url(#vanta-liquid-mask)",
        }}
      />

      {/* Top Center Icons Row */}
      <div className="relative z-30 pt-10 sm:pt-14 flex items-center justify-center gap-6 sm:gap-7">
        <a
          href="#work"
          title="Selected Work"
          className="group transition-transform duration-300 hover:scale-110 focus:outline-none"
        >
          <img
            src="/hero-assets/Selectod work heart icon.png"
            alt="Selected Work"
            className="h-5 sm:h-5.5 w-auto object-contain opacity-90 group-hover:opacity-100"
          />
        </a>

        <a
          href="#about"
          title="About / Fun"
          className="group transition-transform duration-300 hover:scale-110 focus:outline-none"
        >
          <img
            src="/hero-assets/Fun smily icon.png"
            alt="Fun / About"
            className="h-5 sm:h-5.5 w-auto object-contain opacity-90 group-hover:opacity-100"
          />
        </a>

        <a
          href="mailto:kshresth2151@gmail.com"
          title="Contact Email"
          className="group transition-transform duration-300 hover:scale-110 focus:outline-none"
        >
          <img
            src="/hero-assets/Contact envelop icon.png"
            alt="Contact"
            className="h-5 sm:h-5.5 w-auto object-contain opacity-90 group-hover:opacity-100"
          />
        </a>
      </div>

      {/* Main Center Content Stack */}
      <div className="relative z-20 w-full max-w-2xl mx-auto px-6 flex-1 flex flex-col items-center justify-center text-center -mt-2">
        {/* Raw Profile Portrait Cutout Image */}
        <div className="relative mb-3 sm:mb-4 flex justify-center">
          <img
            src="/hero-assets/profile face icon.png"
            alt="Shresth Kushwaha"
            className="w-11 sm:w-13 md:w-16 h-auto object-contain max-h-[90px] drop-shadow-[0_6px_16px_rgba(0,0,0,0.85)]"
          />
        </div>

        {/* Liquid Chrome "Shresth Kushwaha" Hero Text Graphic */}
        <div className="relative mb-4 sm:mb-5 w-full flex justify-center">
          <img
            src="/hero-assets/Shresth kushwaha hero text.png"
            alt="Shresth Kushwaha"
            className="w-full max-w-[240px] sm:max-w-[330px] md:max-w-[390px] lg:max-w-[420px] h-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.9)]"
          />
        </div>

        {/* Subtitle Statement */}
        <p className="font-google-sans text-[13px] sm:text-[14px] md:text-[16px] font-normal text-[#afafaf] max-w-[350px] md:max-w-[400px] leading-relaxed tracking-wide text-center drop-shadow-md">
          AI Product Designer focused on stripping noise and shipping features and usable products
        </p>
      </div>

      {/* Bottom Spacer */}
      <div className="relative z-20 pb-6 pointer-events-none" />
    </div>
  );
}
