"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroBackground({ scrollProgress = 0 }: { scrollProgress?: number }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [lineCount, setLineCount] = useState(0);
    
    // Dim the grid as the user focuses on projects (morphProgress logic)
    const morphProgress = Math.min(1, scrollProgress * 5);
    const gridOpacity = Math.max(0.3, 1 - morphProgress * 0.7);

    useEffect(() => {
        // Calculate lines based on width to maintain ~80px spacing
        const updateLayout = () => {
            if (typeof window !== "undefined") {
                const width = window.innerWidth;
                const count = Math.ceil(width / 40); // Restore original density
                setLineCount(count);
            }
        };

        updateLayout();
        window.addEventListener("resize", updateLayout);
        return () => window.removeEventListener("resize", updateLayout);
    }, []);

    useEffect(() => {
        if (!containerRef.current || lineCount === 0) return;

        const ctx = gsap.context(() => {
            // 1. Parallax Effect (Vertical movement)
            gsap.to(containerRef.current, {
                yPercent: -20,
                ease: "none",
                scrollTrigger: {
                    trigger: document.body,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });

            // 2. Interactive Magnetic Effect (Horizontal distortion)
            const lines = gsap.utils.toArray(".grid-line") as HTMLDivElement[];

            const onMouseMove = (e: MouseEvent) => {
                const mouseX = e.clientX;
                const mouseY = e.clientY;

                // Optimization: Only animate if mouse is moving (throttling handled by GSAP ticker implicitly usually, but direct math is fast here)
                lines.forEach((line) => {
                    const rect = line.getBoundingClientRect();
                    const lineX = rect.left + rect.width / 2;

                    const distX = mouseX - lineX;
                    const distY = mouseY - (rect.top + rect.height / 2); // Not strictly needed for X distortion but good for radius check

                    // We mainly care about X distance for the "string" effect, 
                    // but let's use a radius from cursor to affect lines nearby.
                    // Simple X distance check is often cleaner for vertical lines.

                    const distance = Math.abs(distX);
                    const maxDist = 150; // Radius of influence

                    if (distance < maxDist) {
                        // Power easing for natural feel
                        const intensity = Math.pow(1 - distance / maxDist, 2);
                        const moveX = (distX > 0 ? -1 : 1) * intensity * 30; // Move away from cursor

                        gsap.to(line, {
                            x: moveX,
                            duration: 0.4,
                            ease: "power2.out",
                            overwrite: "auto"
                        });
                    } else {
                        // Return to origin
                        gsap.to(line, {
                            x: 0,
                            duration: 0.6,
                            ease: "elastic.out(1, 0.4)",
                            overwrite: "auto"
                        });
                    }
                });
            };

            window.addEventListener("mousemove", onMouseMove);

            return () => {
                window.removeEventListener("mousemove", onMouseMove);
            };
        }, containerRef);

        return () => ctx.revert();
    }, [lineCount]);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-white">
            <div
                ref={containerRef}
                className="absolute inset-0 -top-[10vh] h-[120vh] w-full flex justify-between px-4"
            >
                {Array.from({ length: lineCount }).map((_, i) => (
                    <div
                        key={i}
                        className="grid-line w-[1px] h-full bg-[#EDEDED]"
                    />
                ))}
            </div>
        </div>
    );
}
