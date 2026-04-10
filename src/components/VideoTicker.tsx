"use client";

import { motion } from "framer-motion";

const boxes = Array.from({ length: 6 }); // Number of boxes to fill the width and loop

export default function VideoTicker() {
  return (
    <div className="w-full overflow-hidden bg-white py-12">
      <div className="relative flex whitespace-nowrap">
        <motion.div
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 25,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex gap-6 pr-6"
        >
          {/* Main sequence */}
          {boxes.map((_, i) => (
            <div
              key={`box-1-${i}`}
              className="w-[616px] h-[337px] bg-[#696969] shrink-0 flex items-center justify-center"
            >
              <span className="text-white/20 font-cabinet text-sm tracking-widest uppercase">
                Video Placeholder
              </span>
            </div>
          ))}
          {/* Duplicate sequence for seamless loop */}
          {boxes.map((_, i) => (
            <div
              key={`box-2-${i}`}
              className="w-[616px] h-[337px] bg-[#696969] shrink-0 flex items-center justify-center"
            >
               <span className="text-white/20 font-helvetica text-sm tracking-widest uppercase">
                Video Placeholder
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
