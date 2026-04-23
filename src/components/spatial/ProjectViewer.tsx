"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Lottie from 'lottie-react';
import { NodeData } from '@/data/nodes';

interface ProjectViewerProps {
  node: NodeData | null;
  onClose: () => void;
}

const ProjectViewer: React.FC<ProjectViewerProps> = ({ node, onClose }) => {
  // Use a ref to ensure we can load JSON files if the URL format isn't accepted directly by the component
  const [lottieData, setLottieData] = React.useState<any>(null);

  React.useEffect(() => {
    if (node?.lottie) {
      fetch(node.lottie)
        .then(res => res.json())
        .then(data => setLottieData(data))
        .catch(err => console.error("Failed to load lottie:", err));
    } else {
      setLottieData(null);
    }
  }, [node?.lottie]);

  return (
    <AnimatePresence>
      {node && (
        <motion.div
          key={node.id}
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 180, damping: 26 }}
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '62%', // ── IMMERSIVE "BIG" VIEW ───────────────────────────
            height: '100vh',
            background: 'rgba(20, 18, 28, 0.99)',
            backdropFilter: 'blur(40px)',
            borderLeft: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 200,
            overflow: 'hidden',
            boxShadow: '-20px 0 50px rgba(0,0,0,0.5)',
          }}
        >
          {/* Header Actions */}
          <motion.div
            style={{
              position: 'absolute',
              top: 40,
              right: 40,
              zIndex: 220,
            }}
          >
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1, background: 'rgba(255,255,255,0.12)' }}
              whileTap={{ scale: 0.9 }}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '50%',
                width: 48,
                height: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#fff',
                backdropFilter: 'blur(10px)',
              }}
            >
              <X size={24} />
            </motion.button>
          </motion.div>

          {/* Immersive Media Stage */}
          <div style={{ width: '100%', height: '58%', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
            <AnimatePresence mode="wait">
              {lottieData ? (
                <motion.div
                  key={node.id + '-lottie'}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  style={{ width: '100%', height: '100%' }}
                >
                  <Lottie 
                    animationData={lottieData} 
                    loop={true} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </motion.div>
              ) : node.video ? (
                <motion.video
                  key={node.id + '-vid'}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  src={node.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <motion.img
                  key={node.id + '-img'}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  src={node.image}
                  alt={node.label}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
            </AnimatePresence>
            
            {/* Cinematic Gradient Mask */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(20,18,28,0) 0%, rgba(20,18,28,0.2) 60%, rgba(20,18,28,1) 100%)',
              pointerEvents: 'none',
            }} />
          </div>

          {/* Project Details */}
          <div style={{ 
            flex: 1, 
            padding: '60px 80px', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'flex-start',
            overflowY: 'auto',
            scrollbarWidth: 'none',
          }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: 'easeOut' }}
            >
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.5em',
                textTransform: 'uppercase',
                color: '#e09f8d',
                marginBottom: 20,
              }}>
                Interactive Case Study
              </div>
              <h2 style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 64, // ── MASSIVE HEADLINE ─────────────────────────
                fontWeight: 700,
                color: '#fff',
                marginBottom: 24,
                letterSpacing: '-0.04em',
                lineHeight: 1,
              }}>
                {node.label}
              </h2>
              <div style={{
                width: 80,
                height: 3,
                background: '#e09f8d',
                marginBottom: 40,
                borderRadius: 2,
              }} />
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 20,
                color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.8,
                maxWidth: '85%',
                marginBottom: 60,
                fontWeight: 300,
              }}>
                {node.description}
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05, background: '#fff', color: '#1a1624' }}
                whileTap={{ scale: 0.98 }}
                style={{
                  alignSelf: 'flex-start',
                  padding: '20px 54px',
                  background: '#e09f8d',
                  border: 'none',
                  borderRadius: 4,
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: 16,
                  color: '#fff',
                  cursor: 'pointer',
                  transition: 'background 0.4s, color 0.4s',
                  boxShadow: '0 10px 30px rgba(224,159,141,0.2)',
                }}
              >
                Launch Prototype →
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectViewer;
