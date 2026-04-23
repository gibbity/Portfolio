"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ResumeSpatialPanelProps {
  panelX: number;
  panelY: number;
  panelWidth: number;
}

const ResumeSpatialPanel: React.FC<ResumeSpatialPanelProps> = ({ panelX, panelY, panelWidth }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, x: 20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.97, x: 20 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      onClick={() => window.open('https://drive.google.com/file/d/1M-Vv8jiUz4WKqM2yksYqWPbD6Lb_2Br4/view?usp=sharing', '_blank')}
      style={{
        position: 'absolute',
        left: panelX,
        top: panelY,
        width: panelWidth,
        maxHeight: 'calc(100vh - 200px)', // Cap height on small screens
        height: 600, 
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(24px)',
        border: '1px solid #E2E2E2',
        padding: '8px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.08)',
        zIndex: 400,
        overflow: 'hidden',
        pointerEvents: 'auto',
        cursor: 'pointer',
      }}
    >
      {/* Schematic Accents */}
      <div style={{ position: 'absolute', top: 12, left: 12, fontSize: 9, fontFamily: 'monospace', color: '#4A5EBF', opacity: 0.8, letterSpacing: '0.1em' }}>
        ■ DOC_VIEW // CV.RESUME.PNG
      </div>
      
      {/* Corner accents */}
      <div style={{ position: 'absolute', top: 7, right: 7, width: 11, height: 11, borderTop: '1px solid #4A5EBF', borderRight: '1px solid #4A5EBF' }} />
      <div style={{ position: 'absolute', bottom: 7, left: 7, width: 11, height: 11, borderBottom: '1px solid #4A5EBF', borderLeft: '1px solid #4A5EBF' }} />

      <div style={{ 
        width: '100%', 
        height: '100%', 
        marginTop: '24px', 
        overflowY: 'auto',
        overflowX: 'hidden',
        borderRadius: '2px',
        border: '1px solid #F0F0F0'
      }} className="hide-scrollbar">
        <img 
          src="/resume.jpg" 
          alt="Shresth Kushwaha Resume" 
          style={{ width: '100%', height: 'auto', display: 'block' }} 
        />
      </div>

      {/* Hover Overlay Hint */}
      <motion.div 
        whileHover={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.03)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <div style={{ 
          background: '#1A1A1A', 
          color: '#FFF', 
          padding: '8px 16px', 
          fontFamily: 'monospace', 
          fontSize: 10,
          letterSpacing: '0.1em',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        }}>
          CLICK TO OPEN PDF
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResumeSpatialPanel;
