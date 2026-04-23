"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { NodeData } from '@/data/nodes';
import FileSystemNav from './FileSystemNav';

interface DossierSidebarProps {
  node: NodeData | null;
  expandedIds: Set<string>;
  onClose: () => void;
  onToggle: (id: string) => void;
  activeAboutTab?: string;
}

const DossierSidebar: React.FC<DossierSidebarProps> = ({ node, expandedIds, onClose, onToggle, activeAboutTab }) => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('Overview');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const dragControls = useDragControls();
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Intersection Observer for Adaptive Context
  useEffect(() => {
    if (!node) return;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      // Find the deeply intersecting entry (most visible)
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section-name');
          if (sectionId) {
            setActiveSection(sectionId);
          }
        }
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // Trigger when section hits upper middle of viewport
      threshold: 0.1
    });

    const elements = document.querySelectorAll('.dossier-section');
    elements.forEach(el => observerRef.current?.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [node]); // Re-run when node changes to re-bind to new sections

  const isDossierOpen = !!node;

  // HIDE DOSSIER FOR PROJECTS SECTION ON MOBILE
  const isProjectSection = isMobile && (node?.id === 'projects' || node?.type === 'project');
  if (isProjectSection) return null;

  const renderAboutContent = () => {
    if (!node) return null;

    const mono: React.CSSProperties = { fontFamily: "'Courier New', Courier, monospace" };
    const sans: React.CSSProperties = { fontFamily: "'Inter', sans-serif" };
    const serif: React.CSSProperties = { fontFamily: "'Playfair Display', serif" };

    const Tag = ({ children }: { children: React.ReactNode }) => (
      <span style={{
        ...mono, fontSize: 10, color: '#777', border: '1px solid #E0E0E0',
        padding: '3px 8px', display: 'inline-block', marginRight: 8, marginBottom: 6,
        letterSpacing: '0.1em', textTransform: 'uppercase' as const
      }}>{children}</span>
    );

    const SectionLabel = ({ children }: { children: React.ReactNode }) => (
      <div style={{ ...mono, fontSize: 10, color: '#A4A4A4', textTransform: 'uppercase' as const, letterSpacing: '0.15em', marginBottom: 12, marginTop: 32 }}>
        {children}
      </div>
    );

    if (node.id === 'about-intro') {
      return (
        <motion.div key="about-intro" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
          <div style={{ ...mono, fontSize: 10, color: '#4A5EBF', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>
            ■ PROFILE // INTRO
          </div>
          <div style={{ ...serif, fontSize: isMobile ? 28 : 36, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 20 }}>
            Shresth<br />Kushwaha
          </div>
          <div style={{ ...mono, fontSize: isMobile ? 10 : 11, color: '#A4A4A4', letterSpacing: '0.1em', marginBottom: 28 }}>
            B. 2004 &nbsp;·&nbsp; VIT Vellore &nbsp;·&nbsp; Ind. Design
          </div>
          <p style={{ ...sans, fontSize: isMobile ? 13 : 14, color: '#4A4A4A', lineHeight: 1.75, marginBottom: 24 }}>
            Product designer operating at the intersection of human cognition and interactive systems. I build things that feel precise — interfaces that think spatially, tools that dissolve friction.
          </p>
          <p style={{ ...sans, fontSize: isMobile ? 13 : 14, color: '#4A4A4A', lineHeight: 1.75 }}>
            Currently pursuing Industrial Design at VIT with a specialization in UX and AI-integrated design workflows. Available for freelance and internship engagements.
          </p>
          <SectionLabel>Currently focused on</SectionLabel>
          <div>
            {['Spatial UI / Graph Interfaces', 'AI Workflow Design', 'Generative UI Systems'].map(t => <Tag key={t}>{t}</Tag>)}
          </div>
        </motion.div>
      );
    }

    if (node.id === 'about-skills') {
      const skillGroups = [
        { label: 'Design', items: ['Figma', 'Prototyping', 'UX Research', 'Design Systems', 'Interaction Design', 'Motion Design'] },
        { label: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Framer Motion', 'D3.js', 'CSS / Animations'] },
        { label: 'Tools & AI', items: ['Three.js', 'Generative UI', 'AI Workflows', 'Prompt Engineering', 'Blender'] },
      ];
      return (
        <motion.div key="about-skills" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
          <div style={{ ...mono, fontSize: 10, color: '#4A5EBF', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>
            ■ PROFILE // SKILLS
          </div>
          <div style={{ ...serif, fontSize: 36, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 28 }}>
            Technical<br />Stack
          </div>
          {skillGroups.map(group => (
            <div key={group.label} style={{ marginBottom: 24 }}>
              <div style={{ ...mono, fontSize: 10, color: '#A4A4A4', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>{group.label}</div>
              <div>{group.items.map(item => <Tag key={item}>{item}</Tag>)}</div>
            </div>
          ))}
          <div style={{ marginTop: 12, paddingTop: 24, borderTop: '1px solid #E8E8E8' }}>
            <div style={{ ...mono, fontSize: 10, color: '#A4A4A4', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>Proficiency</div>
            {[['Design', 95], ['Frontend', 82], ['3D / Motion', 70]].map(([label, pct]) => (
              <div key={label} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', ...sans, fontSize: 12, color: '#555', marginBottom: 6 }}>
                  <span>{label}</span><span style={{ ...mono, color: '#A4A4A4' }}>{pct}%</span>
                </div>
                <div style={{ height: 2, background: '#F0F0F0', position: 'relative' }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }} style={{ height: '100%', background: '#1A1A1A', position: 'absolute', top: 0, left: 0 }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      );
    }

    if (node.id === 'about-work') {
      const entries = [
        { year: '2024 →', role: 'Design Lead', org: 'Spandhika', desc: 'Medical health data tracking redesign for researchers. Built the full interaction model for real-time health dashboards.' },
        { year: '2024', role: 'Product Designer', org: 'Unifyd BI', desc: 'End-to-end UX for a business intelligence platform. Established the core design system and data visualization language.' },
        { year: '2023', role: 'Independent', org: 'Scribe', desc: 'Smart organization and search platform. Solo design and front-end build using React, D3, and Framer Motion.' },
      ];
      return (
        <motion.div key="about-work" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
          <div style={{ ...mono, fontSize: 10, color: '#4A5EBF', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>
            ■ PROFILE // WORK HISTORY
          </div>
          <div style={{ ...serif, fontSize: 36, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 32 }}>
            Experience<br />Log
          </div>
          {entries.map((e, i) => (
            <div key={i} style={{ display: 'flex', gap: 20, marginBottom: 32, paddingBottom: 32, borderBottom: i < entries.length - 1 ? '1px solid #F0F0F0' : 'none' }}>
              <div style={{ flexShrink: 0, width: 48 }}>
                <div style={{ ...mono, fontSize: 10, color: '#A4A4A4', letterSpacing: '0.05em', lineHeight: 1.6 }}>{e.year}</div>
              </div>
              <div>
                <div style={{ ...sans, fontSize: 15, fontWeight: 600, color: '#1A1A1A', marginBottom: 2 }}>{e.role}</div>
                <div style={{ ...mono, fontSize: 11, color: '#4A5EBF', letterSpacing: '0.05em', marginBottom: 10 }}>{e.org}</div>
                <p style={{ ...sans, fontSize: 13, color: '#666', lineHeight: 1.65 }}>{e.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      );
    }

    // Default: root 'about' node
    return (
      <motion.div key="about-root" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
        <div style={{ ...mono, fontSize: 10, color: '#4A5EBF', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>
          ■ PROFILE // OVERVIEW
        </div>
        <div style={{ ...serif, fontSize: 36, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 24 }}>
          About
        </div>
        <p style={{ ...sans, fontSize: 14, color: '#4A4A4A', lineHeight: 1.75 }}>
          Product Designer specializing in high-fidelity interaction design and spatial user interfaces. Select a branch to explore further.
        </p>
        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column' as const, gap: 8 }}>
          {['→ Intro', '→ Skills', '→ Work history'].map(t => (
            <div key={t} style={{ ...mono, fontSize: 11, color: '#A4A4A4', letterSpacing: '0.05em' }}>{t}</div>
          ))}
        </div>
      </motion.div>
    );
  };

  // Render logic for the actual dossier text content
  const renderDossierContent = () => {
    if (!node) return null;
    
    // On Mobile, we render EVERYTHING in the sidebar
    // On Desktop, "real" project nodes render spatially in the graph.
    if (isMobile && node.type === 'project') {
      return (
        <motion.div 
          key={node.id} 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0 }}
          style={{ width: '100%' }}
        >
          {/* Mobile Media Hero */}
          {(node.video || node.image) && (
            <div style={{ 
              width: '100%', 
              aspectRatio: '16/9', 
              backgroundColor: '#EEE', 
              marginBottom: 20, 
              overflow: 'hidden',
              borderRadius: '8px',
              border: '1px solid #E0E0E0'
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
            </div>
          )}

          <div style={{ padding: '0 0 24px 0' }}>
            <h2 style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: 32, 
              fontWeight: 700, 
              color: '#1A1A1A',
              marginBottom: 16,
              lineHeight: 1.1
            }}>
              {node.label}
            </h2>
            <p style={{ 
              fontFamily: "'Inter', sans-serif", 
              fontSize: 14, 
              color: '#666', 
              lineHeight: 1.6, 
              marginBottom: 32,
              fontWeight: 400
            }}>
              {node.description}
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              onClick={() => {
                if (node.url) {
                  setIsLoading(true);
                  router.push(node.url);
                }
              }}
              style={{
                width: '100%',
                padding: '20px',
                background: isLoading ? '#2A3A8F' : '#4A5EBF',
                color: '#FFF',
                border: 'none',
                fontFamily: "'Inter', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                borderRadius: '4px',
                boxShadow: '0 10px 20px rgba(74, 94, 191, 0.2)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                cursor: isLoading ? 'wait' : 'pointer'
              }}
            >
              {isLoading ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    style={{
                      width: 16,
                      height: 16,
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTop: '2px solid #FFF',
                      borderRadius: '50%'
                    }}
                  />
                  <span>Loading Case...</span>
                </div>
              ) : (
                "READ CASE STUDY →"
              )}
            </motion.button>
          </div>
        </motion.div>
      );
    }

    const isRealProject = node.type === 'project' && node.id !== 'about-panel' && node.id !== 'cv-panel';
    
    if (node.id === 'about' || node.id.startsWith('about-')) {
      return renderAboutContent();
    }

    if (node.id === 'cv' || node.id === 'cv-panel') {
      return (
        <motion.div key="cv-content" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: '#4A5EBF', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>
            ■ DOCUMENT // RESUME
          </div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 28 }}>
            Curriculum<br />Vitae
          </div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#4A4A4A', lineHeight: 1.75, marginBottom: 32 }}>
            A condensed view of my professional trajectory, academic background, and technical expertise.
          </p>
          <div style={{ 
            width: '100%', 
            marginBottom: 32, 
            border: '1px solid #EEEEEE',
            borderRadius: '4px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
          }}>
            <img 
              src="/resume.jpg" 
              alt="Shresth Kushwaha Resume" 
              style={{ width: '100%', height: 'auto', display: 'block' }} 
            />
          </div>

          <a 
            href="https://drive.google.com/file/d/1M-Vv8jiUz4WKqM2yksYqWPbD6Lb_2Br4/view?usp=sharing" 
            target="_blank"
            style={{
              display: 'inline-block',
              padding: '16px 32px',
              background: '#1A1A1A',
              color: '#FFF',
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            Open Full PDF ↗
          </a>
        </motion.div>
      );
    }

    if (!isMobile && isRealProject) {
      return null;
    }

    return (
      <motion.div
        key={node.id}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ 
          fontFamily: "'Courier New', Courier, monospace", 
          fontSize: 10, 
          color: '#4A5EBF', 
          textTransform: 'uppercase', 
          letterSpacing: '0.15em', 
          marginBottom: 16 
        }}>
          Dossier [{node.id.toUpperCase()}]
        </div>

        {/* Project Video / Media Hero */}
        {node.type === 'project' && (node.video || node.image) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ 
              width: '100%', 
              aspectRatio: '16/9', 
              backgroundColor: '#EEE', 
              marginBottom: 32, 
              overflow: 'hidden',
              border: '1px solid #E0E0E0',
              position: 'relative'
            }}
          >
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
          </motion.div>
        )}
        
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 48,
          fontWeight: 700,
          color: '#1A1A1A',
          marginBottom: 24,
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
        }}>
          {node.label}
        </h2>

        {node.description && (
          <div className="dossier-section" data-section-name="Abstract" style={{ marginBottom: 40 }}>
            <h3 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: 12, fontWeight: 600, color: '#A4A4A4', borderBottom: '1px solid #E0E0E0', paddingBottom: 8, marginBottom: 16 }}>ABSTRACT</h3>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: isMobile ? 13 : 15,
              color: '#333',
              lineHeight: 1.7,
              fontWeight: 400,
            }}>
              {node.description}
            </p>
          </div>
        )}

        {/* Dummy Content to demonstrate Adaptive Context Scrolling */}
        {node.type === 'project' && (
          <>
            <div className="dossier-section" data-section-name="Methodology" style={{ marginBottom: 40 }}>
              <h3 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: 12, fontWeight: 600, color: '#A4A4A4', borderBottom: '1px solid #E0E0E0', paddingBottom: 8, marginBottom: 16 }}>METHODOLOGY</h3>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: isMobile ? 13 : 15,
                color: '#333',
                lineHeight: 1.7,
                fontWeight: 400,
              }}>
                This initiative required a ground-up reconstruction of the interaction patterns. By stripping away extraneous decorative elements, the core structural integrity of the application was exposed, leading to a massive increase in navigational efficiency and user retention.
              </p>
            </div>

            <div className="dossier-section" data-section-name="Technical Specs" style={{ marginBottom: 40 }}>
              <h3 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: 12, fontWeight: 600, color: '#A4A4A4', borderBottom: '1px solid #E0E0E0', paddingBottom: 8, marginBottom: 16 }}>TECHNICAL SPECS</h3>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                color: '#333',
                lineHeight: 1.7,
                fontWeight: 400,
                marginBottom: 16
              }}>
                Implementation relied on a modern, decoupled architecture.
              </p>
              <ul style={{ 
                fontFamily: "'Courier New', Courier, monospace", 
                fontSize: 13, 
                color: '#666',
                paddingLeft: 20,
                lineHeight: 1.8
              }}>
                <li>React 18 / Next.js Framework</li>
                <li>D3.js Interactive Graph Systems</li>
                <li>Framer Motion Animations</li>
                <li>Custom Visual Effects</li>
              </ul>
            </div>
            
            <div className="dossier-section" data-section-name="Outcomes" style={{ marginBottom: 80 }}>
              <h3 style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: 12, fontWeight: 600, color: '#A4A4A4', borderBottom: '1px solid #E0E0E0', paddingBottom: 8, marginBottom: 16 }}>OUTCOMES</h3>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 15,
                color: '#333',
                lineHeight: 1.7,
                fontWeight: 400,
              }}>
                Deployment to production yielded a 40% reduction in interaction latency, passing all accessibility audits with a flawless score.
              </p>
            </div>
          </>
        )}

        {/* CTA */}
        {node.type === 'project' && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              if (node.url) router.push(node.url);
            }}
            style={{
              padding: '16px 32px',
              background: '#4A5EBF',
              border: 'none',
              borderRadius: 0, // strict brutalist
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: 13,
              color: '#fff',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: 40
            }}
          >
            View Case Study →
          </motion.button>
        )}
      </motion.div>
    );
  };

  if (isMobile) {
    // ── MOBILE BOTTOM SHEET DRAWER ──────────────────────────────────────────
    return (
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 600 }}
        dragElastic={0.15}
        dragListener={false}
        dragControls={dragControls}
        onDragEnd={(e, info) => {
          if (info.offset.y > 60 || info.velocity.y > 200) {
            onClose(); 
          }
        }}
        initial={{ y: '100%' }}
        animate={{ y: isDossierOpen ? '50%' : '92%' }} 
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100vw',
          height: '90vh',
          background: '#FBFBFB',
          borderTop: '1px solid #E0E0E0',
          boxShadow: '0 -10px 40px rgba(0,0,0,0.05)',
          zIndex: 200,
          display: 'flex',
          flexDirection: 'column',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
          touchAction: 'none' // Essential for drag to work reliably
        }}
      >
        {/* Drag Handle */}
        <div 
          onPointerDown={(e) => dragControls.start(e)}
          style={{ 
          width: '100%', 
          height: 32, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          cursor: 'grab',
          touchAction: 'none'
        }}>
          <div style={{ width: 40, height: 4, background: '#D9D9D9', borderRadius: 2 }} />
        </div>
        
        <div 
          style={{ flex: 1, overflowY: 'auto', padding: '0 0 40px 0', touchAction: 'pan-y', overflowX: 'hidden' }} 
          className="custom-scrollbar"
        >
          <FileSystemNav 
            expandedIds={expandedIds} 
            selectedId={node?.id || null} 
            onToggle={onToggle} 
            activeSection={activeSection} 
            activeAboutTab={activeAboutTab}
            renderContent={(id) => id === node?.id ? renderDossierContent() : null}
          />
        </div>
      </motion.div>
    );
  }

  // ── DESKTOP FLOATING DOSSIER PANEL ──────────────────────────────────────────
  return (
    <AnimatePresence>
      {isDossierOpen && (
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 40, scale: 0.98 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          style={{
            position: 'absolute',
            top: 32,
            right: 324, // 32 (margin) + 260 (nav width) + 32 (gap)
            width: 480, // Slightly wider for content
            height: 'calc(100vh - 64px)',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(24px)',
            border: '1px solid #E0E0E0',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 600,
            boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}
        >
          {/* Schematic header */}
          <div style={{ 
            padding: '16px 24px', 
            borderBottom: '1px solid #F0F0F0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.5)'
          }}>
            <div style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: '#A4A4A4', letterSpacing: '0.15em' }}>
              DOSSIER // PROJECT.VIEWER
            </div>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#A4A4A4' }}>
              <X size={18} />
            </button>
          </div>

          <div style={{ flex: 1, padding: '40px 48px', overflowY: 'auto' }} className="custom-scrollbar">
            {renderDossierContent()}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DossierSidebar;
