"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticleSphereAnimation from "@/components/ui/orbiting-circles-02-utils/particalsphear";

// Register GSAP Plugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const orbits = [
  {
    mobileSize: 180,
    desktopSize: 340,
    duration: 18,
    icons: [
      { src: "https://images.shadcnspace.com/assets/svgs/supabase.svg", alt: "Supabase", angle: -60 },
      { src: "https://images.shadcnspace.com/assets/svgs/gemini.svg", alt: "gemini", angle: 0 },
      { src: "https://images.shadcnspace.com/assets/svgs/make.svg", alt: "Make", angle: 60 },
    ],
  },
  {
    mobileSize: 260,
    desktopSize: 490,
    duration: 24,
    icons: [
      { src: "https://images.shadcnspace.com/assets/svgs/figma.svg", alt: "Figma", angle: 0 },
      { src: "https://images.shadcnspace.com/assets/svgs/slack.svg", alt: "Slack", angle: -90 },
    ],
  },
  {
    mobileSize: 340,
    desktopSize: 640,
    duration: 30,
    icons: [
      { src: "https://images.shadcnspace.com/assets/svgs/clude.svg", alt: "Claude", angle: -60 },
      { src: "https://images.shadcnspace.com/assets/svgs/react.svg", alt: "react", angle: 0 },
      { src: "https://images.shadcnspace.com/assets/svgs/python.svg", alt: "python", angle: 60 },
    ],
  },
];

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
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

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                }
            });

            tl.from(".gsap-fade-up", {
                opacity: 0,
                y: 30,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out"
            });

            ScrollTrigger.refresh();
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
      <section 
        id="about" 
        ref={sectionRef}
        className="relative w-full py-24 md:py-36 px-6 md:px-12 lg:px-20 bg-white border-t border-[#EDEDED] overflow-hidden"
      >
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="w-full flex justify-between items-baseline mb-16 md:mb-24 border-b border-[#EDEDED] pb-6 gsap-fade-up">
            <span className="font-sans font-medium text-[13px] text-black/40 uppercase tracking-[0.25em]">
              01 / PROFILE
            </span>
            <span className="font-sans font-medium text-[13px] text-black/40 uppercase tracking-[0.25em]">
              ABOUT ME
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-center">
            {/* Left Column: Big Editorial Intro Statement */}
            <div className="lg:col-span-6 space-y-10 gsap-fade-up text-left">
              <h3 className="font-sans font-normal text-[28px] md:text-[40px] leading-[1.15] text-black tracking-tight max-w-[580px]">
                I build high-fidelity digital products, modular design systems, and interactive tools.
              </h3>
              <p className="font-sans font-normal text-[16px] md:text-[18px] leading-relaxed text-black/60 max-w-[540px]">
                Bridging physical interface paradigms with software code, my process focuses on organizing complex layouts, reducing cognitive friction, and shipping solid utility.
              </p>
            </div>

            {/* Right Column: Dynamic Orbiting Circles Globe (Replacing Career/Resume Section) */}
            <div className="lg:col-span-6 relative w-full h-[380px] md:h-[600px] flex items-center justify-center bg-white gsap-fade-up">
              <style>{`
                @keyframes orbit-cw {
                  from { transform: rotate(var(--start-angle)) }
                  to   { transform: rotate(calc(var(--start-angle) + 360deg)) }
                }
                @keyframes orbit-ccw {
                  from { transform: rotate(var(--start-angle)) }
                  to   { transform: rotate(calc(var(--start-angle) - 360deg)) }
                }
                @keyframes counter-cw {
                  from { transform: rotate(var(--counter-offset, 0deg)) }
                  to   { transform: rotate(calc(var(--counter-offset, 0deg) - 360deg)) }
                }
                @keyframes counter-ccw {
                  from { transform: rotate(var(--counter-offset, 0deg)) }
                  to   { transform: rotate(calc(var(--counter-offset, 0deg) + 360deg)) }
                }
              `}</style>

              {/* Center particle globe */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square pointer-events-none w-[120px] h-[120px] md:w-[200px] md:h-[200px] z-10">
                {mounted && <ParticleSphereAnimation />}
              </div>

              {/* Orbiting rings */}
              {mounted && orbits.map((orbit, index) => {
                const isCW = index % 2 === 0;
                const orbitAnim = isCW ? "orbit-cw" : "orbit-ccw";
                const counterAnim = isCW ? "counter-cw" : "counter-ccw";

                const allIcons = [
                  ...orbit.icons,
                  ...orbit.icons.map((ic) => ({
                    ...ic,
                    angle: ic.angle + 180,
                    alt: `${ic.alt}-mirror`,
                  })),
                ];

                return (
                  <div
                    key={index}
                    style={{
                      width: `var(--size-mobile)`,
                      height: `var(--size-mobile)`,
                      transform: 'translate3d(-50%, -50%, 0)',
                      '--size-mobile': `${orbit.mobileSize}px`,
                      '--size-desktop': `${orbit.desktopSize}px`,
                    } as React.CSSProperties}
                    className="absolute top-1/2 left-1/2 rounded-full border border-black/5 md:[width:var(--size-desktop)] md:[height:var(--size-desktop)]"
                  >
                    {allIcons.map((iconData, iconIndex) => (
                      <div
                        key={iconIndex}
                        className="absolute top-0 left-1/2 h-1/2 -ml-6 md:-ml-8 origin-bottom flex flex-col justify-start items-center"
                        style={
                          {
                            "--start-angle": `${iconData.angle}deg`,
                            animation: `${orbitAnim} ${orbit.duration}s linear infinite`,
                          } as React.CSSProperties
                        }
                      >
                        <div
                          className="p-2 md:p-3 border border-black/5 rounded-full bg-white -mt-6 md:-mt-8 relative z-10 shadow-[0_3px_8px_rgba(0,0,0,0.03)]"
                          style={
                            {
                              "--counter-offset": `${-iconData.angle}deg`,
                              animation: `${counterAnim} ${orbit.duration}s linear infinite`,
                            } as React.CSSProperties
                          }
                        >
                          <img
                            src={iconData.src}
                            alt={iconData.alt}
                            width={32}
                            height={32}
                            className="w-5 h-5 md:w-6 md:h-6 object-contain"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
}
