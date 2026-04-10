"use client";

import { motion } from "framer-motion";

export default function ContactSection() {
    return (
      <footer id="contact" className="relative w-full py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-[#080808] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-16 md:gap-24 mb-32">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="max-w-2xl"
            >
              <h2 className="text-[42px] md:text-[80px] font-helvetica font-bold leading-[0.9] tracking-tighter mb-8 italic uppercase">
                Direct <br /><span className="text-white/20">Instrumentation</span>
              </h2>
              <p className="text-[16px] md:text-[18px] text-white/40 font-light max-w-md leading-relaxed">
                Building high-fidelity bridges between logic and experience. Currently looking for opportunities to deploy high-performance design systems.
              </p>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="flex flex-col items-start md:items-end gap-6 md:gap-6"
            >
              <a href="mailto:kshresth2151@gmail.com" className="py-2 md:py-0 block text-[20px] md:text-[24px] font-bold tracking-tight hover:italic transition-all">kshresth2151@gmail.com</a>
              <div className="flex gap-8">
                <a href="https://linkedin.com/in/shresth-kushwaha-b67660277" target="_blank" rel="noopener noreferrer" className="py-2 md:py-0 block text-[11px] font-black uppercase tracking-[0.4em] text-white/30 hover:text-white transition-colors">LinkedIn</a>
                <a href="https://github.com/shresthkushwaha" target="_blank" rel="noopener noreferrer" className="py-2 md:py-0 block text-[11px] font-black uppercase tracking-[0.4em] text-white/30 hover:text-white transition-colors">GitHub</a>
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 text-[9px] font-black uppercase tracking-[0.5em] text-white/10 gap-8 md:gap-0">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12">
               <p>© 2026 Shresth Kushwaha</p>
               <p>All Rights Reserved</p>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12 text-center md:text-right">
               <p>Built with AI-Augmented Development</p>
               <p>V1.0.4</p>
            </div>
          </div>
        </div>
      </footer>
    );
}
