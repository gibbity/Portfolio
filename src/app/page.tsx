"use client";

import React from "react";
import HeaderNav from "@/components/HeaderNav";
import PosterHero from "@/components/PosterHero";
import SelectedWork from "@/components/SelectedWork";
import Waves from "@/components/Waves";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen bg-white font-helvetica text-black">
      <HeaderNav />
      
      {/* Hero Section */}
      <section id="hero" className="relative w-full">
        <PosterHero />
      </section>

      {/* Selected Work Section */}
      <section id="work" className="relative z-10 bg-white">
        <SelectedWork />
      </section>

      {/* Waves Playground Section */}
      <section className="relative w-full overflow-hidden bg-black z-10">
        <Waves />
      </section>

      {/* About Section */}
      <section id="about" className="relative">
        <AboutSection />
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative">
        <ContactSection />
      </section>
    </main>
  );
}

