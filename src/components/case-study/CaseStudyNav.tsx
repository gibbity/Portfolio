"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface CaseStudyNavProps {
  projectTitle: string;
  category?: string;
}

export default function CaseStudyNav({ projectTitle, category = "Professional Case Study" }: CaseStudyNavProps) {
  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center p-6 md:p-10 lg:px-20 z-50 mix-blend-difference pointer-events-none">
      <Link href="/" className="group flex items-center gap-2 pointer-events-auto">
        <motion.div
          initial={{ x: 0 }}
          whileHover={{ x: -4 }}
          className="text-white font-medium text-[12px] md:text-[14px] tracking-widest uppercase"
        >
          ← Home
        </motion.div>
      </Link>
      <div className="text-white font-medium text-[9px] md:text-[11px] tracking-[0.4em] uppercase opacity-30 text-right pointer-events-auto">
        {projectTitle}
      </div>
    </nav>
  );
}
