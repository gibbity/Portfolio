"use client";

import { motion } from "framer-motion";
import VideoTicker from "./VideoTicker";

export default function GallerySection() {
  return (
    <section className="relative h-screen w-full bg-white flex flex-col justify-center overflow-hidden border-t border-[#EDEDED] snap-start">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-[868px] mb-24 md:mb-32"
        >
          <h2 className="font-sans text-[24px] md:text-[32px] leading-[1.2] text-black tracking-[-0.02em]">
            I <span className="font-bold">develop solutions</span> for systemic digital friction. 
            I specialize in <span className="font-bold">high-fidelity, functional prototyping.</span> 
            I leverage <span className="font-bold">AI assisted development</span> and AI augmented workflows 
            and move rapidly from UI concepts to applications
          </h2>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <VideoTicker />
      </motion.div>
    </section>
  );
}
