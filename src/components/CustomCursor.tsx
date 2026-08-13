"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const AsyncLottie = ({ path }: { path: string }) => {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    fetch(path)
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, [path]);

  if (!data) return null;
  return <Lottie animationData={data} loop={true} autoPlay={true} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />;
};

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [mediaData, setMediaData] = useState<{video?: string, lottie?: string} | null>(null);
  const [snapPos, setSnapPos] = useState<{x: number, y: number} | null>(null);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // DELAYED AND SMOOTH SPRING PHYSICS
  const cursorX = useSpring(mouseX, { stiffness: 150, damping: 22, mass: 0.5 });
  const cursorY = useSpring(mouseY, { stiffness: 150, damping: 22, mass: 0.5 });

  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const snapPosRef = useRef<{x: number, y: number} | null>(null);
  useEffect(() => { snapPosRef.current = snapPos; }, [snapPos]);

  useEffect(() => {
    setSnapPos(null);
    setMediaData(null);
    setIsHovering(false);
  }, [pathname]);

  useEffect(() => {
    let lastTarget: HTMLElement | null = null;
    const moveCursor = (e: PointerEvent) => {
      const snap = snapPosRef.current;
      if (snap) {
        // Magnetic snap behavior
        const dx = e.clientX - snap.x;
        const dy = e.clientY - snap.y;
        mouseX.set(snap.x + dx * 0.2);
        mouseY.set(snap.y + dy * 0.2);
      } else {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };

    const handleOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (!target || target === lastTarget) return;
      lastTarget = target;

      const interactive = target.closest('button, a, [data-cursor="interaction"], [style*="cursor: pointer"], [style*="cursor: grab"]');
      setIsHovering(!!interactive);
    };

    const handleMediaEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      setMediaData(customEvent.detail);
    };

    const handleSnapEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      const pos = customEvent.detail;
      setSnapPos(pos);
      if (pos) {
        mouseX.set(pos.x);
        mouseY.set(pos.y);
      }
    };

    if (!isMobile) {
      window.addEventListener("pointermove", moveCursor, { passive: true });
      window.addEventListener("pointerover", handleOver, { passive: true });
      window.addEventListener("cursor-media", handleMediaEvent);
      window.addEventListener("cursor-snap", handleSnapEvent);
    }

    return () => {
      window.removeEventListener("pointermove", moveCursor);
      window.removeEventListener("pointerover", handleOver);
      window.removeEventListener("cursor-media", handleMediaEvent);
      window.removeEventListener("cursor-snap", handleSnapEvent);
    };
  }, [mouseX, mouseY, isMobile]);

  const hasMedia = !!mediaData;

  if (isMobile) return null;

  return (
    <>
      {/* 1. CIRCULAR DOT CURSOR CONTAINER (With mix-blend-mode difference on the outer container) */}
      {!hasMedia && (
        <motion.div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            x: cursorX,
            y: cursorY,
            pointerEvents: "none",
            zIndex: 100000,
            translateX: "-50%",
            translateY: "-50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            willChange: "transform",
            mixBlendMode: "difference",
          }}
        >
          <motion.div
            animate={{
              scale: isHovering ? 2.5 : 1,
            }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#FFFFFF",
            }}
          />
        </motion.div>
      )}

      {/* 2. MEDIA PREVIEW CONTAINER (With normal blend mode to preserve original colors) */}
      <AnimatePresence>
        {hasMedia && (
          <motion.div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              x: cursorX,
              y: cursorY,
              pointerEvents: "none",
              zIndex: 99999,
              translateX: "-50%",
              translateY: "-50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              willChange: "transform",
            }}
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{
                position: 'absolute',
                width: 240,
                height: 140,
                overflow: 'hidden',
                borderRadius: '0px',
                border: '1px solid #1A1A1A',
                backgroundColor: '#FBFBFB',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {mediaData.lottie ? (
                <div style={{ width: '80%', height: '80%' }}>
                  <AsyncLottie path={mediaData.lottie} />
                </div>
              ) : mediaData.video ? (
                <video
                  src={mediaData.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : null}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CustomCursor;
