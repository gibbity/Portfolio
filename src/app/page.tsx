"use client";

import dynamic from "next/dynamic";
import HeaderNav from "@/components/HeaderNav";
import PosterHero from "@/components/PosterHero";

// Code-split below-the-fold sections for instant initial paint
const SelectedWork = dynamic(() => import("@/components/SelectedWork"), {
  ssr: true,
  loading: () => <div className="min-h-[600px] w-full bg-white" />
});

const Waves = dynamic(() => import("@/components/Waves"), {
  ssr: false,
  loading: () => <div className="min-h-[400px] w-full bg-black" />
});

const AboutSection = dynamic(() => import("@/components/AboutSection"), {
  ssr: true,
  loading: () => <div className="min-h-[400px] w-full bg-white" />
});

const ContactSection = dynamic(() => import("@/components/ContactSection"), {
  ssr: true,
  loading: () => <div className="min-h-[400px] w-full bg-black" />
});

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

