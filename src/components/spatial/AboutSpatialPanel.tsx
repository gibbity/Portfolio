"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AboutSpatialPanelProps {
  tabId: string;
  panelX: number;  // left edge, absolute on canvas
  panelY: number;  // top edge, absolute on canvas
  panelWidth: number;
}

const MONO: React.CSSProperties = { fontFamily: "'Courier New', Courier, monospace" };
const SANS: React.CSSProperties = { fontFamily: "'Inter', sans-serif" };
const SERIF: React.CSSProperties = { fontFamily: "'Playfair Display', serif" };

const Tag = ({ label }: { label: string }) => (
  <span style={{
    ...MONO, fontSize: 9, color: '#666', border: '1px solid #E0E0E0',
    padding: '2px 7px', display: 'inline-block', marginRight: 5, marginBottom: 5,
    letterSpacing: '0.1em', textTransform: 'uppercase'
  }}>{label}</span>
);

const Divider = () => (
  <div style={{ height: 1, background: '#F0F0F0', margin: '16px 0' }} />
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <div style={{ ...MONO, fontSize: 9, color: '#A4A4A4', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 9 }}>
    {children}
  </div>
);

function IntroPanel() {
  return (
    <motion.div key="intro" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.25 }}>
      <div style={{ ...MONO, fontSize: 9, color: '#4A5EBF', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>■ PROFILE // INTRO</div>
      <div style={{ ...SERIF, fontSize: 28, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 8 }}>
        Shresth<br />Kushwaha
      </div>
      <div style={{ ...MONO, fontSize: 9, color: '#A4A4A4', letterSpacing: '0.1em', marginBottom: 16 }}>B.Des · VIT · Industrial Design (2023-27)</div>
      <Divider />
      <p style={{ ...SANS, fontSize: 12, color: '#4A4A4A', lineHeight: 1.65, marginBottom: 12, margin: '0 0 12px 0' }}>
        Product Designer specializing in transforming complex data into intuitive, user-centered experiences. 
        I use AI-assisted development to bridge the gap between technical requirements and functional UI.
      </p>
      <p style={{ ...SANS, fontSize: 12, color: '#4A4A4A', lineHeight: 1.65, margin: '0 0 16px 0' }}>
        Passionate about simplifying the "complex" through iterative testing and collaborative storytelling. 
        Currently pursuing Industrial Design at VIT.
      </p>
      <Divider />
      <Label>Recent Accolades</Label>
      <div style={{ ...SANS, fontSize: 11, color: '#1A1A1A', fontWeight: 500, marginBottom: 4 }}>ICADBSL 2025 Design-a-thon</div>
      <div style={{ ...MONO, fontSize: 9, color: '#4A5EBF', letterSpacing: '0.05em' }}>2nd Place · IRA Concept</div>
    </motion.div>
  );
}

function SkillsPanel() {
  const groups = [
    { label: 'Design', items: ['UX Research', 'Interaction', 'Design Systems', 'Prototyping', 'WCAG 2.2'] },
    { label: 'AI Approach', items: ['Model-Aware Proto', 'Generative UI', 'Token Governance', 'AI Workflows'] },
    { label: 'Tools', items: ['Figma MCP', 'Antigravity', 'Claude Code', 'Stitch', 'Supabase', 'Vercel'] },
  ];

  return (
    <motion.div key="skills" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.25 }}>
      <div style={{ ...MONO, fontSize: 9, color: '#4A5EBF', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>■ PROFILE // SKILLS</div>
      <div style={{ ...SERIF, fontSize: 26, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 14 }}>
        Technical<br />Stack
      </div>
      {groups.map(g => (
        <div key={g.label} style={{ marginBottom: 10 }}>
          <Label>{g.label}</Label>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>{g.items.map(i => <Tag key={i} label={i} />)}</div>
        </div>
      ))}
    </motion.div>
  );
}

function WorkPanel() {
  const entries = [
    { year: '2025', role: 'UI/UX Design Intern', org: 'Unifyd BI', desc: 'Orchestrated web redesign with a system of 40 reusable components. Engineered high-fidelity prototypes with complex micro-interactions.' },
    { year: '2025', role: 'UI/UX Design Intern', org: 'Spandhika', desc: 'Overhauled IA for real-time medical data screens. Optimized cognitive load for healthcare providers in high-stress scenarios.' },
  ];

  return (
    <motion.div key="work" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.25 }}>
      <div style={{ ...MONO, fontSize: 9, color: '#4A5EBF', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>■ PROFILE // WORK EXPERIENCE</div>
      <div style={{ ...SERIF, fontSize: 28, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 20 }}>
        Experience<br />Log
      </div>
      {entries.map((e, i) => (
        <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 18, paddingBottom: 18, borderBottom: i < entries.length - 1 ? '1px solid #F4F4F4' : 'none' }}>
          <div style={{ flexShrink: 0, width: 40 }}>
            <div style={{ ...MONO, fontSize: 8, color: '#A4A4A4', letterSpacing: '0.05em', lineHeight: 1.6 }}>{e.year}</div>
          </div>
          <div>
            <div style={{ ...SANS, fontSize: 12, fontWeight: 600, color: '#1A1A1A', marginBottom: 1 }}>{e.role}</div>
            <div style={{ ...MONO, fontSize: 9, color: '#4A5EBF', letterSpacing: '0.08em', marginBottom: 5 }}>{e.org}</div>
            <p style={{ ...SANS, fontSize: 11, color: '#666', lineHeight: 1.5, margin: 0 }}>{e.desc}</p>
          </div>
        </div>
      ))}
      <Divider />
      <Label>Key Projects</Label>
      <div style={{ ...SANS, fontSize: 11, color: '#1A1A1A', fontWeight: 500, marginBottom: 2 }}>Campus Trace</div>
      <div style={{ ...SANS, fontSize: 10, color: '#666', marginBottom: 8 }}>AI spatial analysis tool for institutional decision-making.</div>
      <div style={{ ...SANS, fontSize: 11, color: '#1A1A1A', fontWeight: 500, marginBottom: 2 }}>Scribe</div>
      <div style={{ ...SANS, fontSize: 10, color: '#666' }}>Spatial reasoning engine using local AI for graph generation.</div>
    </motion.div>
  );
}

const AboutSpatialPanel: React.FC<AboutSpatialPanelProps> = ({ tabId, panelX, panelY, panelWidth }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'absolute',
        left: panelX,
        top: panelY,
        width: panelWidth,
        height: 480,
        background: 'rgba(252, 252, 252, 0.98)',
        backdropFilter: 'blur(24px)',
        border: '1px solid #E2E2E2',
        padding: '24px 22px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.07), 0 4px 12px rgba(0,0,0,0.04)',
        zIndex: 400,
        overflowY: 'auto',
        pointerEvents: 'auto', // Allow scrolling/interaction
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
      className="hide-scrollbar"
    >
      {/* Corner accents — schematic style */}
      <div style={{ position: 'absolute', top: 7, right: 7, width: 11, height: 11, borderTop: '1px solid #CACACA', borderRight: '1px solid #CACACA' }} />
      <div style={{ position: 'absolute', bottom: 7, left: 7, width: 11, height: 11, borderBottom: '1px solid #CACACA', borderLeft: '1px solid #CACACA' }} />

      {/* Content — cross-fades on tab switch */}
      <AnimatePresence mode="wait">
        {tabId === 'about-intro' && <IntroPanel />}
        {tabId === 'about-skills' && <SkillsPanel />}
        {tabId === 'about-work' && <WorkPanel />}
      </AnimatePresence>
    </motion.div>
  );
};

export default AboutSpatialPanel;
