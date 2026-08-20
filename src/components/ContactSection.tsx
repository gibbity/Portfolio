"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactSection() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText("kshresth2151@gmail.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
      <footer id="contact" className="relative w-full py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-[#080808] text-white overflow-hidden select-none">
        {/* Abstract background grid */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-16 md:gap-24 mb-24 md:mb-36">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="max-w-2xl text-left"
            >
              <h2 className="text-[48px] md:text-[96px] font-helvetica font-bold leading-[0.85] tracking-tighter mb-8 uppercase">
                Let&apos;s build <br />
                <span className="text-white/20 italic">Something</span>
              </h2>
              <p className="text-[15px] md:text-[17px] text-white/45 font-light max-w-md leading-relaxed">
                Building high-fidelity bridges between logic and experience. Currently looking for opportunities to deploy high-performance user interfaces.
              </p>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.1 }}
               className="flex flex-col items-start md:items-end gap-8"
            >
              <div className="relative group flex flex-col items-start md:items-end gap-2">
                <a 
                  href="tel:6290168861"
                  className="py-2 md:py-0 block text-[24px] md:text-[36px] font-bold tracking-tight hover:text-white/80 active:scale-[0.98] transition-all cursor-pointer text-left md:text-right leading-none"
                >
                  +91 6290168861
                </a>
                <button 
                  onClick={handleCopy}
                  className="py-2 md:py-0 block text-[24px] md:text-[36px] font-bold tracking-tight hover:text-white/80 active:scale-[0.98] transition-all cursor-pointer text-left md:text-right leading-none"
                >
                  kshresth2151@gmail.com
                </button>
                <div className="h-6 mt-1 relative">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 transition-opacity duration-300">
                    {copied ? "✓ Copied to clipboard!" : "Click to copy email"}
                  </span>
                </div>
              </div>

              <div className="flex gap-8">
                <a href="https://www.linkedin.com/in/shresth-kushwaha-706060420/" target="_blank" rel="noopener noreferrer" className="py-2 md:py-0 block text-[11px] font-black uppercase tracking-[0.4em] text-white/30 hover:text-white transition-colors">LinkedIn</a>
                <a href="https://github.com/shresthkushwaha" target="_blank" rel="noopener noreferrer" className="py-2 md:py-0 block text-[11px] font-black uppercase tracking-[0.4em] text-white/30 hover:text-white transition-colors">GitHub</a>
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 text-[9px] font-black uppercase tracking-[0.5em] text-white/20 gap-8 md:gap-0">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12">
               <p>© 2026 Shresth Kushwaha</p>
               <p>All Rights Reserved</p>
            </div>
          </div>
        </div>
      </footer>
    );
}
