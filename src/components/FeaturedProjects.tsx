"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    { name: "Scribe", id: "scribe" },
    { name: "Spandhika", id: "spandhika" },
    { name: "CampusTrace", id: "campus-trace" },
    { name: "Context", id: "context" },
];

interface ProjectItemProps {
    name: string;
    index: number;
}

function ProjectItem({ name, index }: ProjectItemProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!containerRef.current || !imageRef.current || !lineRef.current || !textRef.current) return;

            // 1. Parallax Image
            gsap.to(imageRef.current, {
                yPercent: 10,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });

            // 2. Connector Line Animation
            gsap.fromTo(
                lineRef.current,
                { width: "0%" },
                {
                    width: "100%",
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 70%",
                    },
                }
            );

            // 3. Text Reveal
            gsap.fromTo(
                textRef.current,
                { opacity: 0, x: -10 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    delay: 0.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 70%",
                    },
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="group relative w-full flex items-center gap-8 py-24"
        >
            {/* Left Column: Image Card (Approx 45-50% width) */}
            <div className="relative w-[45%] md:w-[50%] aspect-[4/3] bg-gray-200 overflow-hidden">
                <div
                    ref={imageRef}
                    className="absolute inset-0 w-full h-[120%] bg-gray-300 origin-top transform transition-transform duration-700 ease-out group-hover:scale-105"
                />
            </div>

            {/* Middle: Connecting Line (Fills remaining space up to text) */}
            <div className="flex-1 h-[1px] flex items-center">
                <div
                    ref={lineRef}
                    className="h-[1px] bg-gray-300 transition-colors duration-300 group-hover:bg-black w-full"
                />
            </div>

            {/* Right Column: Project Name (Auto width) */}
            <div className="flex-none">
                <p
                    ref={textRef}
                    className="text-lg md:text-xl font-helvetica font-bold text-black transition-transform duration-500 ease-out group-hover:translate-x-2"
                >
                    {name}
                </p>
            </div>
        </div>
    );
}

export default function FeaturedProjects() {
    return (
        <section className="w-full bg-white px-6 md:px-12 pt-64 pb-32 mt-[100px] flex flex-col items-start min-h-screen relative z-20">
            <h2 className="text-6xl font-helvetica font-bold text-gray-900 mb-24 uppercase tracking-tight">
                Featured projects
            </h2>

            <div className="w-full flex flex-col gap-y-8">
                {projects.map((project, index) => (
                    <ProjectItem key={project.id} name={project.name} index={index} />
                ))}
            </div>
        </section>
    );
}
