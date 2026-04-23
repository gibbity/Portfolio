"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NodeItem from './NodeItem';
import { useForceGraph, GraphNode, calculateSlotPosition } from '@/hooks/useForceGraph';
import { NodeData } from '@/data/nodes';
import AboutSpatialPanel from './AboutSpatialPanel';
import ResumeSpatialPanel from './ResumeSpatialPanel';
import { StoryAnnotation, STORY_NODE_COLOR } from './StoryAnnotation';

interface NodeGraphProps {
  data: NodeData;
  expandedIds: Set<string>;
  selectedId: string | null;
  activeAboutTab: string;
  isProjectMode: boolean;
  onToggle: (id: string) => void;
  width: number;
  height: number;
  isMobile?: boolean;
}

// Draws a straight line from source → target
function linePath(sx: number, sy: number, tx: number, ty: number): string {
  return `M ${sx} ${sy} L ${tx} ${ty}`;
}

// Draws a smooth bezier path that fans from a focal point
function fannedPath(sx: number, sy: number, tx: number, ty: number): string {
  return `M ${sx} ${sy} C ${sx + (tx - sx) * 0.5} ${sy} ${sx + (tx - sx) * 0.5} ${ty} ${tx} ${ty}`;
}

// Returns the visual edge radius for a node shape so connectors terminate at the shape boundary
function getNodeRadius(node: GraphNode): number {
  const shape = node.original?.shape || (node.type === 'root' ? 'asterisk' : 'square');
  switch (shape) {
    case 'circle':   return 12;
    case 'hexagon':  return 12;
    case 'triangle': return 12;
    case 'asterisk': return 12;
    case 'square':   return 12;
    case 'pentagon': return 12;
    default:         return 12;
  }
}

// Draws an orthogonal "elbow" path, offset from source/target centers by their node radii
// The path exits source horizontally and enters target horizontally.
function elbowPath(
  sx: number, sy: number,
  tx: number, ty: number,
  srcR = 0, tgtR = 0
): string {
  const dx = tx - sx;
  const dy = ty - sy;

  if (Math.abs(dx) < 10) {
    // Nearly vertical
    const signY = dy >= 0 ? 1 : -1;
    const osy = sy + signY * srcR;
    const oty = ty - signY * tgtR;
    return `M ${sx} ${osy} L ${tx} ${oty}`;
  }

  const signX = dx >= 0 ? 1 : -1;
  const osx = sx + signX * srcR;  
  const otx = tx - signX * tgtR; 
  
  // Use a fixed horizontal pivot factor for the schematic look
  const pivotX = sx + dx * 0.35; 
  
  return `M ${osx} ${sy} L ${pivotX} ${sy} L ${pivotX} ${ty} L ${otx} ${ty}`;
}

const NodeGraph: React.FC<NodeGraphProps> = ({
  data, expandedIds, selectedId, activeAboutTab, isProjectMode, onToggle, width, height, isMobile
}) => {
  const { flatNodes, flatLinks, registerNode, registerLink, simulationRef } =
    useForceGraph(data, expandedIds, width, height, isProjectMode, selectedId, isMobile);

  // Tick counter drives SVG path re-renders
  const [tick, setTick] = useState(0);
  const pathData = useRef<Map<string, string>>(new Map());

  // Track live node positions for path drawing
  const livePos = useRef<Map<string, { x: number; y: number }>>(new Map());

  // Track active dragging for ghost slot rendering
  const [draggingId, setDraggingId] = useState<string | null>(null);

  // Track which story nodes have open annotations (toggleable)
  const [activeStoryNodes, setActiveStoryNodes] = useState<Set<string>>(new Set());

  const handleStoryNodeClick = useCallback((id: string) => {
    if (!id.startsWith('st-')) return;
    setActiveStoryNodes(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  // Clear annotations when leaving the designer section
  useEffect(() => {
    if (selectedId !== 'designer') {
      setActiveStoryNodes(new Set());
    }
  }, [selectedId]);

  useEffect(() => {
    const sim = simulationRef.current;
    if (!sim) return;
    const handler = () => {
      flatNodes.forEach(n => {
        if (n.x !== undefined && n.y !== undefined) {
          livePos.current.set(n.id, { x: n.x, y: n.y });
        }
      });
      setTick(t => t + 1);
    };
    sim.on('tick.paths', handler);
    return () => { sim.on('tick.paths', null as any); };
  }, [flatNodes, simulationRef]);

  const handleDragStart = (id: string, x: number, y: number) => {
    setDraggingId(id);
    const node = flatNodes.find(n => n.id === id);
    if (node && simulationRef.current) {
      simulationRef.current.alphaTarget(0.1).restart();
      node.fx = x; node.fy = y;
    }
  };

  const handleDragMove = (id: string, x: number, y: number) => {
    const node = flatNodes.find(n => n.id === id);
    if (node) { node.fx = x; node.fy = y; }
  };

  const handleDragEnd = (id: string) => {
    setDraggingId(null);
    const node = flatNodes.find(n => n.id === id);
    if (node && simulationRef.current) {
      simulationRef.current.alphaTarget(0);
      node.fx = undefined;
      node.fy = undefined;
      // Strong snap-back pulse ensures it reaches its slot target
      simulationRef.current.alpha(0.5).restart();
    }
  };

  return (
    <motion.div 
      initial={false}
      // Cinematic Camera Panning: Disabled on mobile for perfect centering
      animate={{ 
        x: (isProjectMode && !isMobile) ? -width * 0.03 : 0, 
        scale: (isProjectMode && !isMobile) ? 1.01 : 1 
      }}
      transition={{ type: 'spring', stiffness: 50, damping: 20, mass: 1 }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <svg
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          overflow: 'visible', pointerEvents: 'none',
        }}
      >
        <defs>
          {/* Removed glow filter to match Figma's flat design */}
        </defs>

        {/* ── Connector paths ───────────────────────────────────────────── */}
        <AnimatePresence>
          {flatLinks.map(link => {
            const srcId = typeof link.source === 'string' ? link.source : (link.source as GraphNode).id;
            const tgtId = typeof link.target === 'string' ? link.target : (link.target as GraphNode).id;

            // Skip about-panel graph links — we draw the connector manually
            if (tgtId === 'about-panel') return null;
            if (srcId === 'about-panel') return null;

            const sp = livePos.current.get(srcId);
            const tp = livePos.current.get(tgtId);

            const srcNode = flatNodes.find(n => n.id === srcId);
            const targetNode = flatNodes.find(n => n.id === tgtId);
            const pathStyle = targetNode?.original?.pathStyle;
            const lineStyle = targetNode?.original?.lineStyle;

            const isProjectTgt = ['scribe', 'spandhika', 'campus-trace', 'context', 'cv-panel'].includes(tgtId);
            const isContactTgt = ['contact-linkedin', 'contact-github', 'contact-mail', 'contact-phone'].includes(tgtId);
            const isAboutPanelTgt = tgtId === 'about-panel';
            const isStoryNodeTgt = tgtId.startsWith('st-');

            const tx = tp ? tp.x : 0;
            const ty = tp ? tp.y : 0;

            // Get visual radii to offset connector endpoints to node edges
            const srcR = srcNode ? getNodeRadius(srcNode) : 0;
            const tgtR = targetNode ? getNodeRadius(targetNode) : 0;

            let d = '';
            if (sp && tp) {
              d = elbowPath(sp.x, sp.y, tx, ty, srcR, tgtR);
            }

            // Story nodes are always colored by category in designer mode
            const isInDesignerMode = selectedId === 'designer' && isStoryNodeTgt;
            const isPathActive = expandedIds.has(tgtId) || selectedId === tgtId;
            const storyColor = STORY_NODE_COLOR[targetNode?.original?.category_type ?? ''];
            const isSymmetrical = !selectedId || selectedId === 'root';
            let strokeColor = isSymmetrical ? '#1A1A1A' : '#E0E0E0';
            if (isPathActive || isInDesignerMode) {
              strokeColor = storyColor ?? '#4A5EBF';
            }

            return (
              <motion.path
                key={link.id}
                d={d}
                fill="none"
                stroke={strokeColor}
                strokeWidth={isInDesignerMode || isPathActive ? "1.5" : "1"}
                strokeOpacity={isInDesignerMode ? 0.6 : 1}
                strokeDasharray={lineStyle === 'dashed' ? "4,4" : "none"}
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 1, pathLength: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            );
          })}
        </AnimatePresence>

        <AnimatePresence>
          {draggingId && (
            (() => {
              const draggingNode = flatNodes.find(n => n.id === draggingId);
              if (draggingNode) {
                // Calculate where it *should* be
                const { x, y } = calculateSlotPosition(draggingNode, selectedId, width, height, isMobile);
                return (
                  <motion.g
                    key={`ghost-${draggingId}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.4, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Ghost Anchor square */}
                    <rect x={x - 4} y={y - 4} width="8" height="8" fill="none" stroke="#4A5EBF" strokeWidth="1" strokeDasharray="2,1" />
                    {/* Crosshairs */}
                    <line x1={x - 16} y1={y} x2={x + 16} y2={y} stroke="#4A5EBF" strokeWidth="0.5" strokeDasharray="1,2" />
                    <line x1={x} y1={y - 16} x2={x} y2={y + 16} stroke="#4A5EBF" strokeWidth="0.5" strokeDasharray="1,2" />
                  </motion.g>
                );
              }
              return null;
            })()
          )}
        </AnimatePresence>

      </svg>

      {/* Nodes */}
      {flatNodes.map(node => (
        <NodeItem
          key={node.id}
          node={node}
          isExpanded={expandedIds.has(node.id)}
          isSelected={node.type === 'project' ? selectedId === node.id : expandedIds.has(node.id)}
          activeAboutTab={activeAboutTab}
          onToggle={(id) => {
            if (id.startsWith('st-')) {
              // Story nodes: only show annotation, don't expand
              handleStoryNodeClick(id);
            } else {
              onToggle(id);
            }
          }}
          width={width}
          height={height}
          registerNode={el => registerNode(node.id, el)}
          onLiveDragStart={(x, y) => handleDragStart(node.id, x, y)}
          onLiveDragMove={(x, y) => handleDragMove(node.id, x, y)}
          onLiveDragEnd={() => handleDragEnd(node.id)}
          isMobile={!!isMobile}
          selectedId={selectedId}
        />
      ))}

      {/* ── Resume: Fixed Panel + Animated Connector ── */}
      {(selectedId === 'cv' || selectedId === 'cv-panel') && (() => {
        const targetNodeId = selectedId === 'cv' ? 'cv' : 'cv-panel';
        const PANEL_W = isMobile ? width - 48 : 420; // Responsive width on mobile
        const PANEL_H = isMobile ? Math.min(500, height * 0.6) : 600; 
        
        // Positioned to the left of the floating nav panel (width 260 + 32 right margin + 32 gap)
        const panelX = isMobile ? (width - PANEL_W) / 2 : width - 260 - 32 - 32 - PANEL_W;
        const panelY = isMobile ? height - PANEL_H - 120 : Math.round(height * 0.5 - PANEL_H * 0.5);
        
        const nodePos = livePos.current.get(targetNodeId);
        const targetX = panelX;
        const targetY = panelY + 40; // Connect to the top-left area instead of middle

        return (
          <React.Fragment key="resume-panel-container">
            {!isMobile && nodePos && (
              <svg style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 390 }}>
                <motion.path
                  key={`resume-connector-${targetNodeId}`}
                  d={`M ${nodePos.x} ${nodePos.y} C ${nodePos.x + (targetX - nodePos.x) * 0.4} ${nodePos.y} ${nodePos.x + (targetX - nodePos.x) * 0.6} ${targetY} ${targetX} ${targetY}`}
                  fill="none"
                  stroke="#4A5EBF"
                  strokeWidth="1.5"
                  strokeDasharray="4,4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
                <circle cx={targetX} cy={targetY} r="3" fill="#4A5EBF" />
              </svg>
            )}
            <ResumeSpatialPanel 
              panelX={panelX} 
              panelY={panelY} 
              panelWidth={PANEL_W} 
            />
          </React.Fragment>
        );
      })()}

      {/* ── About: Fixed Panel + Animated Connector ── */}
      {!isMobile && selectedId === 'about' && activeAboutTab.startsWith('about-') && (() => {
        // Fixed panel position — right zone of the graph canvas
        // Fixed panel position — to the left of the floating nav panel (width 260 + 32 right margin + 32 gap)
        const PANEL_W = 276;
        const PANEL_H = 480;
        const panelX = width - 260 - 32 - 32 - PANEL_W;
        const panelY = Math.round(height * 0.5 - PANEL_H * 0.5);
        // Connector: from active node → left-center of fixed panel
        const nodePos = livePos.current.get(activeAboutTab);
        const targetX = panelX;
        const targetY = panelY + PANEL_H / 2;
        return (
          <>
            {/* SVG connector — drawn on top of everything */}
            {nodePos && (
              <svg
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 350 }}
              >
                <AnimatePresence mode="wait">
                  <motion.path
                    key={`connector-${activeAboutTab}`}
                    d={`M ${nodePos.x} ${nodePos.y} C ${nodePos.x + (targetX - nodePos.x) * 0.5} ${nodePos.y} ${nodePos.x + (targetX - nodePos.x) * 0.5} ${targetY} ${targetX} ${targetY}`}
                    fill="none"
                    stroke="#4A5EBF"
                    strokeWidth="1.5"
                    strokeDasharray="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    exit={{ pathLength: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                  />
                  {/* Dot at the node end */}
                  <motion.circle
                    key={`dot-${activeAboutTab}`}
                    cx={nodePos.x}
                    cy={nodePos.y}
                    r={3}
                    fill="#4A5EBF"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </AnimatePresence>
              </svg>
            )}
            {/* Fixed info panel */}
            <AnimatePresence>
              <AboutSpatialPanel
                key="about-panel-fixed"
                tabId={activeAboutTab}
                panelX={panelX}
                panelY={panelY}
                panelWidth={PANEL_W}
              />
            </AnimatePresence>
          </>
        );
      })()}

      {/* ── Story Node Annotations (Product Designer section) ── */}
      <AnimatePresence>
        {Array.from(activeStoryNodes).map(nodeId => {
          const pos = livePos.current.get(nodeId);
          if (!pos) return null;
          return (
            <StoryAnnotation
              key={nodeId}
              nodeId={nodeId}
              x={pos.x}
              y={pos.y}
              canvasWidth={width}
            />
          );
        })}
      </AnimatePresence>

    </motion.div>
  );
};

export default NodeGraph;
