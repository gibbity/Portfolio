"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

export default function Preloader() {
  const [phase, setPhase] = useState<"watermelon" | "curtain" | "done">("watermelon");
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const handleLoad = () => {
      // Transition from watermelon to curtain after a minimum delay
      setTimeout(() => {
        setPhase("curtain");
      }, 2000);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      const timeout = setTimeout(handleLoad, 5000);
      return () => {
        window.removeEventListener("load", handleLoad);
        clearTimeout(timeout);
      };
    }
  }, []);

  useEffect(() => {
    if (phase === "curtain" && pathRef.current) {
      const full = "M 0 100 V 0 Q 50 0 100 0 V 100 z";
      const mid = "M 0 100 V 50 Q 50 100 100 50 V 100 z";
      const empty = "M 0 100 V 100 Q 50 100 100 100 V 100 z";

      const tl = gsap.timeline({
        onComplete: () => {
          setPhase("done");
        }
      });

      // Start full, morph down
      tl.set(pathRef.current, { attr: { d: full } })
        .to(pathRef.current, {
          attr: { d: mid },
          duration: 0.8,
          ease: "power2.in"
        })
        .to(pathRef.current, {
          attr: { d: empty },
          duration: 0.6,
          ease: "power2.out"
        });
    }
  }, [phase]);

  if (phase === "done") return null;

  return (
    <>
      <AnimatePresence>
        {phase === "watermelon" && (
          <motion.div
            key="watermelon"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            className="loader-wrapper"
            style={{ zIndex: 9999, backgroundColor: "black" }}
          >
            <div className="loader"></div>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.4, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 font-helvetica text-[10px] uppercase tracking-[0.5em] text-white"
            >
              what even is a watermelon?
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {(phase === "curtain" || phase === "watermelon") && (
        <div className="transition-wrapper" style={{ opacity: 1, backgroundColor: phase === "watermelon" ? "black" : "transparent" }}>
          <svg className="transition-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path 
              ref={pathRef}
              className="path" 
              fill="black" 
              d="M 0 100 V 100 Q 50 100 100 100 V 100 z" 
            />
          </svg>
        </div>
      )}
    </>
  );
}
