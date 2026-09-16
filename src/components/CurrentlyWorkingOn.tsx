"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CurrentlyWorkingOn() {
  return (
    <section className="relative w-full bg-[#0663FF] py-24 sm:py-32 md:py-40 px-6 flex flex-col items-center justify-center text-center select-none overflow-hidden z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center justify-center max-w-4xl mx-auto"
      >
        <h2 className="font-[family-name:var(--font-averia)] text-white text-[36px] sm:text-[52px] md:text-[66px] lg:text-[76px] font-normal leading-tight tracking-tight mb-7 sm:mb-9 text-center">
          Currently working on
        </h2>

        <a
          href="https://sourceoftruth-three.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center justify-center px-9 sm:px-14 md:px-16 py-3 sm:py-4.5 md:py-5.5 bg-white rounded-xl sm:rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.18)] hover:shadow-[0_20px_48px_rgba(0,0,0,0.25)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          <span className="font-serif font-bold text-[#0663FF] text-[30px] sm:text-[42px] md:text-[54px] leading-none tracking-tight">
            TSOT
          </span>
        </a>
      </motion.div>
    </section>
  );
}
