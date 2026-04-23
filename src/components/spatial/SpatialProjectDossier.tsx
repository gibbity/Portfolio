"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NodeData } from '@/data/nodes';
import { useRouter } from 'next/navigation';
import Lottie from "lottie-react";

interface SpatialProjectDossierProps {
  node: NodeData;
  x: number;
  y: number;
}

const LottieAnimation = ({ url }: { url: string }) => {
  const [animationData, setAnimationData] = React.useState<any>(null);

  React.useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Lottie load error:", err));
  }, [url]);

  if (!animationData) return null;

  return <Lottie animationData={animationData} loop={true} />;
};

const SpatialProjectDossier: React.FC<SpatialProjectDossierProps> = ({ node, x, y }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const hasMedia = !!(node.video || node.image);
  
  const handleNavigate = () => {
    if (node.url) {
      setIsLoading(true);
      router.push(node.url);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: 0,
        left: x + (hasMedia ? 60 : -180), // Center better if no media
        top: y - (hasMedia ? 160 : 120)
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      style={{
        position: 'absolute',
        width: hasMedia ? 720 : 400, 
        backgroundColor: 'rgba(251, 251, 251, 0.98)',
        backdropFilter: 'blur(30px)',
        border: '1px solid #E0E0E0',
        zIndex: 500,
        pointerEvents: 'auto',
        display: 'flex',
        boxShadow: '0 40px 100px rgba(0,0,0,0.1)',
        overflow: 'hidden',
      }}
    >
      {/* ── LEFT COLUMN: Information ── */}
      <div style={{ 
        flex: 1, 
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRight: hasMedia ? '1px solid #EAEAEA' : 'none',
        textAlign: hasMedia ? 'left' : 'center',
        alignItems: hasMedia ? 'flex-start' : 'center'
      }}>
        <div>
          {/* Tag Line */}
          <div style={{ 
            fontFamily: "'Courier New', Courier, monospace", 
            fontSize: 9, 
            color: '#4A5EBF', 
            textTransform: 'uppercase', 
            letterSpacing: '0.2em',
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: hasMedia ? 'flex-start' : 'center',
            gap: 8
          }}>
            <span style={{ width: 6, height: 6, background: '#4A5EBF' }} />
            {(node.type || 'CATEGORY').toUpperCase()} // {node.id.toUpperCase()}
          </div>

          <h2 style={{ 
            fontFamily: "'Playfair Display', serif", 
            fontSize: 36, 
            fontWeight: 700, 
            color: '#1A1A1A',
            marginBottom: 16,
            lineHeight: 1.1,
            letterSpacing: '-0.02em'
          }}>
            {node.label}
          </h2>

          <p style={{ 
            fontFamily: "'Inter', sans-serif", 
            fontSize: 14, 
            color: '#4A4A4A', 
            lineHeight: 1.65,
            fontWeight: 400,
            maxWidth: hasMedia ? '100%' : '320px'
          }}>
            {node.description || "No further operational data available for this sector."}
          </p>
        </div>

        {/* Action Button */}
        <div style={{ marginTop: 32 }}>
          {node.url ? (
            <motion.div
              whileHover={{ backgroundColor: isLoading ? '#2A3A8F' : '#3A4DAF' }}
              whileTap={{ scale: 0.98 }}
              onClick={handleNavigate}
              style={{
                background: isLoading ? '#2A3A8F' : '#4A5EBF',
                color: '#FFF',
                padding: '16px 28px',
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                cursor: isLoading ? 'wait' : 'pointer',
                minWidth: '180px',
                justifyContent: 'center'
              }}
            >
              {isLoading ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid #FFF', borderRadius: '50%' }}
                  />
                  <span>Loading</span>
                </div>
              ) : (
                <>
                  {node.type === 'project' ? 'View Case Study' : 'Explore Branch'}
                  <span style={{ fontSize: 16 }}>→</span>
                </>
              )}
            </motion.div>
          ) : !hasMedia ? (
             <div style={{ height: 1, width: 40, background: '#E0E0E0' }} />
          ) : (
            <div style={{ 
              fontFamily: "'Inter', sans-serif", 
              fontSize: 10, 
              color: '#AAA', 
              textTransform: 'uppercase',
              letterSpacing: '0.1em'
            }}>
              Operational Profile Locked
            </div>
          )}
        </div>
      </div>

      {/* ── RIGHT COLUMN: Video/Media (Only if present) ── */}
      {hasMedia && (
        <div 
          onClick={handleNavigate}
          style={{ 
            flex: 1.4, 
            backgroundColor: '#000',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            cursor: isLoading ? 'wait' : 'pointer'
          }}
        >
          {node.lottie ? (
             <div style={{ width: '100%', height: '100%', padding: '40px', opacity: isLoading ? 0.3 : 1, transition: 'opacity 0.5s ease' }}>
                <LottieAnimation url={node.lottie} />
             </div>
          ) : node.video ? (
            <video 
              src={node.video} 
              poster={node.image}
              autoPlay 
              loop 
              muted 
              playsInline 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                opacity: isLoading ? 0.3 : 1,
                transition: 'opacity 0.5s ease'
              }} 
            />
          ) : node.image ? (
            <img 
              src={node.image} 
              alt={node.label} 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                opacity: isLoading ? 0.3 : 1,
                transition: 'opacity 0.5s ease'
              }} 
            />
          ) : null}

          {/* Darken Overlay with Loading Circle */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0,0,0,0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10
                }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  style={{
                    width: 40,
                    height: 40,
                    border: '3px solid rgba(255,255,255,0.1)',
                    borderTop: '3px solid #FFF',
                    borderRadius: '50%'
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Cinematic Corner Accents */}
          <div style={{ position: 'absolute', top: 12, right: 12, borderRight: '1px solid rgba(255,255,255,0.3)', borderTop: '1px solid rgba(255,255,255,0.3)', width: 20, height: 20 }} />
          <div style={{ position: 'absolute', bottom: 12, left: 12, borderLeft: '1px solid rgba(255,255,255,0.3)', borderBottom: '1px solid rgba(255,255,255,0.3)', width: 20, height: 20 }} />
        </div>
      )}
    </motion.div>
  );
};

export default SpatialProjectDossier;
