"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Annotations keyed by node ID — what each node says about Shresth
export const STORY_ANNOTATIONS: Record<string, { headline: string; body: string; color: string }> = {
  'st-vit': {
    headline: 'Vellore Institute of Technology',
    body: 'B.Des — Industrial Design. Where systems thinking and aesthetic discipline converged.',
    color: '#6B7FD4',
  },
  'st-grad': {
    headline: 'Class of 2027',
    body: 'Mid-journey. Building in public while the degree catches up to the work.',
    color: '#6B7FD4',
  },
  'st-ux': {
    headline: 'UX Research & Discovery',
    body: 'Wireframes, user flows, accessibility audits, user testing. Precision before pixels.',
    color: '#48A999',
  },
  'st-ds': {
    headline: 'Design Systems',
    body: 'Component tokens, spacing systems, responsive layouts — built at scale for Unifyd BI.',
    color: '#48A999',
  },
  'st-motion': {
    headline: 'Interaction & Motion',
    body: 'Micro-animations, state transitions, and smooth navigation flows.',
    color: '#48A999',
  },
  'st-genai': {
    headline: 'Generative UI',
    body: 'Designing interfaces that adapt to AI output — model-aware prototyping and design tokens.',
    color: '#48A999',
  },
  'st-workflow': {
    headline: 'AI-Assisted Development',
    body: 'Figma MCP, Antigravity, Claude Code, AI Studio. Concept-to-product without the handoff friction.',
    color: '#48A999',
  },
  'st-unifyd': {
    headline: 'Unifyd BI',
    body: 'UI/UX Intern — Oct–Dec 2025. Corporate web redesign, 40-component system, responsive design system.',
    color: '#D4884A',
  },
  'st-spandhika': {
    headline: 'Spandhika',
    body: 'UI/UX Intern — Jun–Aug 2025. Medical diagnostic tool overhaul, improving clarity and ease of use for staff.',
    color: '#D4884A',
  },
  'st-simplicity': {
    headline: 'Simplifying Complexity',
    body: 'The core belief — every complex system has a simpler expression waiting to be found.',
    color: '#9B6FD4',
  },
  'st-bridge': {
    headline: 'Bridging Tech & UI',
    body: 'Comfortable in both Figma and code. The bridge is the product.',
    color: '#9B6FD4',
  },
};

// Category group labels to be rendered as SVG text overlays
export const STORY_GROUPS = [
  { label: 'EDUCATION', ids: ['st-vit', 'st-grad'], color: '#6B7FD4' },
  { label: 'CAPABILITIES', ids: ['st-ux', 'st-ds', 'st-motion', 'st-genai', 'st-workflow'], color: '#48A999' },
  { label: 'EXPERIENCE', ids: ['st-unifyd', 'st-spandhika'], color: '#D4884A' },
  { label: 'APPROACH', ids: ['st-simplicity', 'st-bridge'], color: '#9B6FD4' },
];

// Color map by category_type for node stroke tinting
export const STORY_NODE_COLOR: Record<string, string> = {
  edu: '#6B7FD4',
  skill: '#48A999',
  work: '#D4884A',
  style: '#9B6FD4',
};

interface StoryAnnotationProps {
  nodeId: string;
  x: number;
  y: number;
  canvasWidth: number;
}

export const StoryAnnotation: React.FC<StoryAnnotationProps> = ({ nodeId, x, y, canvasWidth }) => {
  const annotation = STORY_ANNOTATIONS[nodeId];
  if (!annotation) return null;

  const PANEL_W = 220;
  const isMobile = canvasWidth < 768;
  const navWidth = isMobile ? 12 : 260 + 32 + 20;
  
  let panelX = x + 20;
  // If it overflows right side, move to left of node
  if (panelX + PANEL_W > canvasWidth - navWidth) {
    panelX = x - PANEL_W - 14;
  }
  // Always clamp to screen boundaries
  const padding = 12;
  if (panelX < padding) panelX = padding;
  if (panelX + PANEL_W > canvasWidth - padding) panelX = canvasWidth - PANEL_W - padding;

  const panelY = y - 40;

  return (
    <motion.div
      key={nodeId}
      initial={{ opacity: 0, scale: 0.95, y: 4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      style={{
        position: 'absolute',
        left: panelX,
        top: panelY,
        width: PANEL_W,
        background: 'rgba(253, 253, 253, 0.97)',
        border: `1px solid ${annotation.color}30`,
        borderLeft: `2px solid ${annotation.color}`,
        padding: '10px 13px',
        zIndex: 500,
        pointerEvents: 'none',
        boxShadow: '0 8px 32px rgba(0,0,0,0.07)',
      }}
    >
      <div style={{
        fontFamily: "'Courier New', monospace",
        fontSize: 8,
        color: annotation.color,
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        marginBottom: 5,
      }}>
        {annotation.headline}
      </div>
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 11,
        color: '#4A4A4A',
        lineHeight: 1.55,
        margin: 0,
      }}>
        {annotation.body}
      </p>
    </motion.div>
  );
};
