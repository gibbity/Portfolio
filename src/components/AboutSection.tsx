"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP Plugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const experiences = [
    {
        company: "Unifyd BI",
        role: "UI/UX Design Intern",
        period: "Oct 2025 – Dec 2025",
        achievements: [
            "Architected a scalable design system with 40+ atomic components to ensure production-wide brand coherence.",
            "Engineered high-density interface redesigns for complex business intelligence workflows, prioritizing data clarity.",
            "Facilitated seamless designer-to-developer hand-offs through rigorous documentation and specification."
        ]
    },
    {
        company: "Spandhika",
        role: "UI/UX Design Intern",
        period: "Jun 2025 – Aug 2025",
        achievements: [
            "Synthesized 15+ specialized screens for medical diagnostic instrumentation and real-time data visualization.",
            "Restructured navigation hierarchy, resulting in a documented 20% increase in operator efficiency.",
            "Validated interface reliability through iterative clinical usability testing and edge-case modeling."
        ]
    }
];

const technicalStack = [
    {
        category: "Strategic Design",
        skills: ["UX Research & Discovery", "Product Design", "Rapid-Prototyping", "Design systems", "AI-assisted Design Workflow"]
    },
    {
        category: "Technical Logic",
        skills: ["Problem Identification", "AI assisted development", "Interaction Design & Motion", "Design thinking", "User Testing"]
    },
    {
        category: "System Stack",
        skills: ["Figma", "Antigravity", "Claude Code", "Adobe Photoshop", "Adobe Illustrator", "Sketchbook", "Notebook LLM", "Notion", "Jira", "Fusion 360"]
    }
];

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const missionRef = useRef<HTMLDivElement>(null);
    const experienceRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Main Timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    // markers: true, // Uncomment for debugging
                }
            });

            // 1. Header & ID Animation
            tl.from(".gsap-reveal-id", {
                opacity: 0,
                x: -20,
                duration: 0.6,
                ease: "power2.out"
            })
            .from(".gsap-reveal-title", {
                opacity: 0,
                y: 40,
                duration: 0.8,
                stagger: 0.1,
                ease: "power4.out"
            }, "-=0.4")
            .from(".gsap-reveal-edu", {
                opacity: 0,
                x: 20,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.6");

            // 2. Mission Statement Reveal
            tl.from(".gsap-mission-line", {
                width: 0,
                duration: 1,
                ease: "power2.inOut"
            }, "-=0.8")
            .from(".gsap-mission-text", {
                opacity: 0,
                y: 20,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.6");

            // 3. Operational History (Sequential Experience Cards)
            tl.from(".gsap-reveal-exp-header", {
                opacity: 0,
                duration: 0.6
            }, "-=0.4")
            .from(".gsap-exp-card", {
                opacity: 0,
                y: 30,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out"
            }, "-=0.4");

            // 4. Tech Specifications Reveal
            gsap.from(".gsap-tech-card", {
                scrollTrigger: {
                    trigger: statsRef.current,
                    start: "top 80%",
                    onUpdate: () => {
                        ScrollTrigger.update();
                    }
                },
                opacity: 0,
                scale: 0.98,
                duration: 0.8,
                ease: "power2.out"
            });

            gsap.from(".gsap-skill-tag", {
                scrollTrigger: {
                    trigger: statsRef.current,
                    start: "top 75%",
                },
                opacity: 0,
                y: 10,
                stagger: 0.01,
                duration: 0.4,
                ease: "power1.out"
            });

            // Final refresh to ensure markers are correct
            ScrollTrigger.refresh();
        }, sectionRef);

        return () => ctx.revert(); // Cleanup
    }, []);

    return (
      <section 
        id="about" 
        ref={sectionRef}
        className="relative w-full py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-white border-t border-black/5"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
            <div className="max-w-3xl" ref={headerRef}>
              <span className="gsap-reveal-id text-[11px] font-black uppercase tracking-[0.4em] text-black/30 block mb-6">
                Operational Profile / 01
              </span>
              <h2 className="text-[42px] md:text-[72px] font-helvetica font-bold leading-[0.9] tracking-tighter text-[#222]">
                <span className="gsap-reveal-title block text-[#64172d] italic font-light">Product Designer</span>
              </h2>
            </div>
            <div className="gsap-reveal-edu text-left md:text-right mt-2 md:mt-0">
              <p className="text-[12px] font-bold text-black/40 uppercase tracking-widest mb-1">Education</p>
              <p className="text-[16px] text-black font-medium">VIT Vellore</p>
              <p className="text-[14px] text-gray-400 font-light italic">B.Des Industrial Design (2023–2027)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
            {/* Left Column: Mission & Experience */}
            <div className="lg:col-span-7 space-y-16 md:space-y-24">
              {/* Mission Statement */}
              <div className="relative pl-0 md:pl-0" ref={missionRef}>
                <div className="gsap-mission-line absolute left-0 md:-left-12 top-0 bottom-0 w-[1.5px] bg-[#64172d]/10" />
                <p className="gsap-mission-text text-[22px] md:text-[28px] text-gray-800 leading-tight font-light tracking-tight max-w-2xl pl-6 md:pl-0">
                  I specialize in high-fidelity, functional prototyping and AI-augmented software engineering. By bridging physical design principles with digital utility, I build tools that organize complexity and reduce cognitive friction.
                </p>
              </div>

              {/* Experience Log */}
              <div className="space-y-16" ref={experienceRef}>
                <span className="gsap-reveal-exp-header text-[11px] font-black uppercase tracking-[0.3em] text-black/30 block mb-8">
                  Operational History
                </span>
                
                <div className="space-y-12">
                  {experiences.map((exp, i) => (
                    <div 
                      key={i}
                      className="gsap-exp-card group"
                    >
                      <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4 gap-2">
                        <div>
                          <h4 className="text-[20px] font-bold text-black uppercase tracking-tighter group-hover:text-[#64172d] transition-colors">
                            {exp.company}
                          </h4>
                          <p className="text-[14px] text-gray-500 font-medium italic">{exp.role}</p>
                        </div>
                        <span className="text-[11px] font-bold text-black/40 font-mono tracking-widest bg-gray-50 px-2 py-1 rounded">
                          {exp.period}
                        </span>
                      </div>
                      <ul className="space-y-3 mt-4 border-l-2 border-black/5 pl-6">
                        {exp.achievements.map((item, idx) => (
                          <li key={idx} className="text-[15px] text-gray-600 leading-relaxed font-light">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Skills & Stack */}
            <div className="lg:col-span-5" ref={statsRef}>
              <div 
                className="gsap-tech-card p-8 md:p-12 bg-[#fafafa] rounded-xs border border-black/[0.03] sticky top-32"
              >
                <div className="space-y-16">
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-[0.3em] text-black/30 block mb-10">Technical Specifications</span>
                    <div className="space-y-12">
                      {technicalStack.map((group, i) => (
                        <div key={i}>
                          <h5 className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#64172d] mb-4">
                            {group.category}
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {group.skills.map((skill, si) => (
                              <span 
                                key={si}
                                className="gsap-skill-tag text-[13px] px-3 py-1 bg-white border border-black/5 text-gray-600 font-light hover:border-black/20 hover:text-black cursor-default transition-colors"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recognition */}
                  <div className="pt-12 border-t border-black/5">
                    <span className="text-[11px] font-black uppercase tracking-[0.3em] text-black/30 block mb-6">Recognition</span>
                    <div className="flex gap-4 items-start">
                       <div className="w-8 h-8 rounded-full bg-[#64172d]/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-[12px] font-bold text-[#64172d]">02</span>
                       </div>
                       <div>
                          <p className="text-[14px] font-bold text-black uppercase tracking-tight">IRA – Designathon Winner</p>
                          <p className="text-[13px] text-gray-500 font-light">2nd Place · AI-Powered Women's Safety System</p>
                       </div>
                    </div>
                  </div>

                  <div className="pt-8 space-y-4">
                     <a 
                       href="https://drive.google.com/file/d/12yxubV9TZUaNdU9fbIsAK6GM5n7r_E2c/view?usp=sharing"
                       target="_blank"
                       rel="noopener noreferrer"
                       className="group w-full py-5 bg-black text-white text-[12px] font-black uppercase tracking-[0.4em] hover:bg-[#64172d] transition-all flex items-center justify-center gap-4"
                     >
                        View Resume
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                          <path d="M7 17l10-10M7 7h10v10" />
                        </svg>
                     </a>
                     
                     <div className="grid grid-cols-2 gap-4">
                        <a 
                          href="https://linkedin.com/in/shresth-kushwaha-b67660277"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-4 border border-black/10 text-[10px] font-black uppercase tracking-[0.3em] hover:border-black hover:bg-black hover:text-white transition-all text-center flex items-center justify-center gap-2"
                        >
                           LinkedIn
                        </a>
                        <a 
                          href="https://github.com/shresthkushwaha"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-4 border border-black/10 text-[10px] font-black uppercase tracking-[0.3em] hover:border-black hover:bg-black hover:text-white transition-all text-center flex items-center justify-center gap-2"
                        >
                           GitHub
                        </a>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}
