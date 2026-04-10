"use client";

import HeroBackground from "@/components/HeroBackground";
import { motion, AnimatePresence } from "framer-motion";
import SelectedWork from "@/components/SelectedWork";
import VerticalTicker from "@/components/VerticalTicker";
import HorizontalTicker from "@/components/HorizontalTicker";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import { useState, useEffect } from "react";
import { useScroll, useTransform, useSpring } from "framer-motion";

const capabilities = [
    "Complex Workflow",
    "Human intent",
    "Cognitive load"
];

const annotations = [
    { text: "Design Thinking", delay: 0.1 },
    { text: "Problem Solving", delay: 0.2 },
    { text: "Decision Making", delay: 0.3 },
    { text: "Ideation", delay: 0.4 }
];

export default function Home() {
    const [index, setIndex] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { scrollYProgress } = useScroll();
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [activeSection, setActiveSection] = useState("hero");

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % capabilities.length);
        }, 3000); // Cycle every 3 seconds

        const handleScroll = () => {
          const sections = ["hero", "projects", "about", "contact"];
          const current = sections.find(section => {
            const el = document.getElementById(section);
            if (el) {
              const rect = el.getBoundingClientRect();
              return rect.top <= 200 && rect.bottom >= 200;
            }
            return false;
          });
          if (current) setActiveSection(current);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
          clearInterval(interval);
          window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <main className="relative w-full bg-white font-helvetica text-gray-900 flex flex-col">
            {/* The vertical line grid background */}
            <HeroBackground />

            {/* Mobile Hamburger Button */}
            <div className="md:hidden fixed top-6 right-4 md:right-6 z-[110]">
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="w-12 h-12 flex flex-col items-center justify-center gap-1.5 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-black/5"
                >
                    <span className={`w-5 h-[1.5px] bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                    <span className={`w-5 h-[1.5px] bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                    <span className={`w-5 h-[1.5px] bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
                </button>
            </div>

            {/* Mobile Navigation Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="md:hidden fixed inset-0 z-[105] bg-white flex flex-col justify-center items-center px-6"
                    >
                        <div className="flex flex-col items-center gap-8 text-[32px] font-helvetica font-bold tracking-tight">
                            {[
                                { label: "Home", id: "hero" },
                                { label: "Projects", id: "projects" },
                                { label: "About", id: "about" },
                                { label: "Contact", id: "contact" }
                            ].map((item, i) => (
                                <motion.a
                                    key={item.label}
                                    href={`#${item.id}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="hover:italic hover:text-[#64172d] transition-colors"
                                >
                                    {item.label}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Fixed Navigation Index (Desktop Only) */}
            <div className="hidden md:flex fixed top-[50%] -translate-y-[50%] right-[0.8vw] z-[100] items-center gap-[0.7vw]">
                {/* The Traveling Scroll Line */}
                <div className="relative h-[8vh] md:h-[12vh] w-[1px] bg-black/5 rounded-full overflow-hidden">
                    <motion.div 
                        style={{ scaleY }}
                        className="absolute inset-0 bg-black origin-top"
                    />
                </div>

                <div className="flex flex-col items-end gap-3 md:gap-[0.6vw] text-[10px] md:text-[1.0vw] font-helvetica text-black tracking-tight font-medium">
                    {[
                        { label: "Home", id: "hero" },
                        { label: "Projects", id: "projects" },
                        { label: "About", id: "about" },
                        { label: "Contact", id: "contact" }
                    ].map((item, i) => (
                        <motion.a
                            key={item.label}
                            href={`#${item.id}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ 
                                opacity: activeSection === item.id ? 1 : 0.2,
                                x: 0 
                            }}
                            whileHover={{ opacity: 1, x: -2 }}
                            transition={{ duration: 0.4 }}
                            className="transition-all whitespace-nowrap text-right cursor-pointer"
                        >
                            <span className="hidden md:inline">{item.label}</span>
                            <span className="md:hidden w-1 hit-1 bg-black/20 rounded-full block"></span>
                        </motion.a>
                    ))}
                </div>
            </div>

            {/* Main Hero Section */}
            <div id="hero" className="relative h-screen w-full overflow-hidden z-10 max-w-[1440px] mx-auto">
                {/* Name */}
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute top-[4vh] md:top-[5.8vh] left-6 md:left-[1.2vw] z-20"
                >
                    <h1 className="text-[20px] md:text-[1.66vw] font-helvetica text-black font-medium tracking-tight">
                        Shresth Kushwaha
                    </h1>
                </motion.div>

                {/* Headlines */}
                <div className="absolute top-[28vh] md:top-[35.2vh] left-6 md:left-[1.2vw] z-20 flex flex-col">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-helvetica font-bold text-[13vw] sm:text-[48px] md:text-[6.6vw] leading-[1] text-[#64172d] max-w-[90vw]"
                    >
                        Product Designer
                    </motion.h2>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-4 md:mt-[2.4vw]"
                    >
                        <h3 className="font-helvetica italic text-[16px] md:text-[2.2vw] leading-[1.1] text-black font-normal max-w-[85vw] md:max-w-[42vw]">
                            High-Fidelity Prototyping & <br />AI-Augmented Development
                        </h3>
                    </motion.div>
                </div>

                {/* Bio */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="absolute bottom-[8vh] md:top-[88.2vh] left-6 md:left-[1.2vw] z-20 max-w-[85vw] md:max-w-[39vw] pr-6 md:pr-0"
                >
                    <p className="font-helvetica text-[12px] md:text-[1.1vw] leading-[1.4] text-black opacity-90 tracking-tight">
                        Translating complex logic into restrained, essential interfaces. I utilize AI environments to bypass traditional development bottlenecks, shipping functional, local-first software.
                    </p>
                </motion.div>

                {/* Vertical Ticker (Desktop) */}
                <div className="hidden md:flex absolute left-[65vw] md:left-[60.2vw] top-[-13.1vh] z-10 bottom-0 items-center opacity-30 md:opacity-100">
                    <VerticalTicker />
                </div>

                {/* Horizontal Ticker (Mobile) */}
                <div className="md:hidden absolute top-[54vh] left-0 w-full z-10">
                    <HorizontalTicker />
                </div>

            </div>



            {/* Sub-sections */}
            <div className="relative z-10 bg-white shadow-[0_-50px_100px_rgba(0,0,0,0.03)]">
                <SelectedWork />
            </div>

            <AboutSection />
            <ContactSection />
        </main>
    );
}
