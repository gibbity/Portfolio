"use client";

import React, { useState, useCallback, useEffect } from 'react';
import NodeGraph from './NodeGraph';
import DossierSidebar from './DossierSidebar';
import FileSystemNav from './FileSystemNav';
import { useRouter } from 'next/navigation';
import { portfolioData, NodeData } from '@/data/nodes';

const SpatialCanvas: React.FC = () => {
  const router = useRouter();
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['root']));
  const [selectedProject, setSelectedProject] = useState<NodeData | null>(null);
  const [isolatedId, setIsolatedId] = useState<string | null>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [activeAboutTab, setActiveAboutTab] = useState<'about-intro' | 'about-skills' | 'about-work'>('about-intro');
  const isProjectMode = !!selectedProject;

  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
      setIsMobile(window.innerWidth < 768);
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const findNode = useCallback((node: NodeData, id: string): NodeData | null => {
    if (node.id === id) return node;
    for (const child of node.children ?? []) {
      const found = findNode(child, id);
      if (found) return found;
    }
    return null;
  }, []);

  const handleClose = useCallback(() => {
    // Just hide the content panel/sidebar, but keep the current graph state
    setSelectedProject(null);
  }, []);

  const handleToggleNode = useCallback((id: string) => {
    // If root (Shresth Kushwaha) is clicked, go back to INITIAL mode
    if (id === 'root') {
      setSelectedProject(null);
      setIsolatedId(null);
      setExpandedIds(new Set(['root']));
      return;
    }

    const node = findNode(portfolioData, id);
    if (!node) return;

    if (node.type === 'project') {
      if (isMobile && node.url) {
        // Direct navigation on mobile
        setLoadingId(id);
        router.push(node.url);
        return;
      }
      setSelectedProject(node);
      setIsolatedId(id);
      return;
    }

    // Handle About sub-tabs: update sidebar content but keep graph isolated on 'about'
    if (['about-intro', 'about-skills', 'about-work'].includes(id)) {
      setActiveAboutTab(id as any);
      setSelectedProject(node); // Drive sidebar content
      // Don't change isolatedId — graph stays in 'about' isolation mode
      return;
    }

    // Set selected project for major categories to show initial dossier info
    // But skip 'projects' category itself as it's a container and can cause layout shift issues on mobile
    if (['about', 'contact', 'designer', 'cv'].includes(id)) {
      setSelectedProject(node);
    }

    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        // Collapse this node and all its descendants
        next.delete(id);
        const collapse = (n: NodeData) => n.children?.forEach(c => { next.delete(c.id); collapse(c); });
        collapse(node);
        // If node was isolated, return to parent isolation level
        if (isolatedId === id) {
          setIsolatedId(null);
          setSelectedProject(null);
        }
      } else {
        // Collapse any previously-expanded sibling category first
        CATEGORY_IDS.forEach(cid => {
          if (cid !== id && next.has(cid)) {
            next.delete(cid);
            const cat = findNode(portfolioData, cid);
            if (cat) { 
              const collapse = (n: NodeData) => n.children?.forEach(c => { next.delete(c.id); collapse(c); }); 
              collapse(cat); 
            }
          }
        });
        next.add(id);
        setIsolatedId(id); // Set isolation for the expanded category
      }
      return next;
    });
  }, [findNode, isolatedId]);

  // Set up the graph width correctly based on split screen
  const graphWidth = isMobile ? dimensions.width : dimensions.width * 0.65;

  return (
    <div
      style={{
        width: '100vw',
        height: '100dvh', // Handle mobile Safari correctly
        background: '#FBFBFB', // Updated bg
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* ── Floating Index Directory Panel ── */}
      {!isMobile && (
        <div style={{
          position: 'absolute',
          top: 32,
          right: 32,
          width: 260,
          maxHeight: 'calc(100vh - 64px)',
          background: '#FFFFFF',
          border: '1px solid #EEEEEE',
          padding: '12px 16px',
          zIndex: 500,
          overflowY: 'auto',
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
          borderRadius: '8px',
        }} className="hide-scrollbar">
          <FileSystemNav 
            expandedIds={expandedIds} 
            selectedId={isolatedId} 
            onToggle={handleToggleNode} 
            activeAboutTab={activeAboutTab} 
          />
        </div>
      )}

      {/* FULL-SCREEN COMPONENT: The Graph */}
      <div style={{ 
        width: '100%', 
        height: '100%', 
        position: 'relative',
        zIndex: 10,
      }}>
        <NodeGraph
          data={portfolioData}
          expandedIds={expandedIds}
          selectedId={isolatedId}
          activeAboutTab={activeAboutTab}
          isProjectMode={isProjectMode}
          onToggle={handleToggleNode}
          width={dimensions.width}
          height={dimensions.height}
          isMobile={isMobile}
          loadingId={loadingId}
        />

      </div>

      {/* Mobile Drawer remains (optionally can be updated) */}
      {isMobile && (
        <DossierSidebar 
          node={selectedProject} 
          expandedIds={expandedIds} 
          onClose={handleClose} 
          onToggle={handleToggleNode}
          activeAboutTab={activeAboutTab}
        />
      )}

      {/* Project Dossier Panel (for desktop when project selected) */}
      {!isMobile && isProjectMode && !['about', 'contact', 'designer', 'cv', 'projects'].includes(isolatedId || '') && (
        <DossierSidebar 
          node={selectedProject} 
          expandedIds={expandedIds} 
          onClose={handleClose} 
          onToggle={handleToggleNode}
          activeAboutTab={activeAboutTab}
        />
      )}
    </div>
  );
};

// Category IDs for sibling-collapse logic (must match data/nodes.ts)
const CATEGORY_IDS = ['about', 'contact', 'designer', 'cv', 'projects'];

export default SpatialCanvas;
