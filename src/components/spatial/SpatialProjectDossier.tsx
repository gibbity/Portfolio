"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { NodeData } from '@/data/nodes';
import Link from 'next/link';

interface SpatialProjectDossierProps {
  node: NodeData;
  x: number;
  y: number;
}

const SpatialProjectDossier: React.FC<SpatialProjectDossierProps> = ({ node, x, y }) => {
  const hasMedia = !!(node.video || node.image);
  
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
            <Link 
              href={node.url}
              style={{ textDecoration: 'none' }}
            >
              <motion.div
                whileHover={{ backgroundColor: '#3A4DAF' }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: '#4A5EBF',
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
                  cursor: 'pointer'
                }}
              >
                {node.type === 'project' ? 'View Case Study' : 'Explore Branch'}
                <span style={{ fontSize: 16 }}>→</span>
              </motion.div>
            </Link>
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
        <div style={{ 
          flex: 1.4, 
          backgroundColor: '#000',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          {node.video ? (
            <video 
              src={node.video} 
              autoPlay 
              loop 
              muted 
              playsInline 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          ) : (
            <img 
              src={node.image} 
              alt={node.label} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          )}

          {/* Cinematic Corner Accents */}
          <div style={{ position: 'absolute', top: 12, right: 12, borderRight: '1px solid rgba(255,255,255,0.3)', borderTop: '1px solid rgba(255,255,255,0.3)', width: 20, height: 20 }} />
          <div style={{ position: 'absolute', bottom: 12, left: 12, borderLeft: '1px solid rgba(255,255,255,0.3)', borderBottom: '1px solid rgba(255,255,255,0.3)', width: 20, height: 20 }} />
        </div>
      )}
    </motion.div>
  );
};

export default SpatialProjectDossier;
