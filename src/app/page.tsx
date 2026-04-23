"use client";

import SpatialCanvas from "@/components/spatial/SpatialCanvas";
import { motion, AnimatePresence } from "framer-motion";
import SelectedWork from "@/components/SelectedWork";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import { useState, useEffect } from "react";
import { useScroll, useSpring } from "framer-motion";

export default function Home() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { scrollYProgress } = useScroll();
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [activeSection, setActiveSection] = useState("hero");

    useEffect(() => {
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
          window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <main className="relative w-full h-screen overflow-hidden bg-background font-helvetica text-white flex flex-col">
            {/* Main Hero Section - Replaced with SpatialCanvas */}
            <div id="hero" className="relative h-screen w-full overflow-hidden z-20">
                <SpatialCanvas />
            </div>

            {/* Sub-sections (Commented out as requested - site is now a non-scrollable spatial experience)
            <div className="relative z-10 bg-white shadow-[0_-50px_100px_rgba(0,0,0,0.03)]">
                <SelectedWork />
            </div>

            <AboutSection />
            <ContactSection />
            */}
        </main>
    );
}
