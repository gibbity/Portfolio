"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Lottie from 'lottie-react';
import { GraphNode } from '@/hooks/useForceGraph';
import { STORY_NODE_COLOR } from './StoryAnnotation';

const LottiePlayer = ({ url, style }: { url: string, style?: any }) => {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    fetch(url).then(res => res.json()).then(setData);
  }, [url]);
  if (!data) return <div style={{ ...style, background: '#f5f5f5' }} />;
  return <Lottie animationData={data} loop={true} style={style} />;
};

interface NodeItemProps {
  node: GraphNode;
  isExpanded: boolean;
  isSelected: boolean;
  onToggle: (id: string) => void;
  activeAboutTab?: string;
  width: number;
  height: number;
  registerNode: (el: HTMLDivElement | null) => void;
  onLiveDragStart: (x: number, y: number) => void;
  onLiveDragMove: (x: number, y: number) => void;
  onLiveDragEnd: () => void;
  isMobile: boolean;
  selectedId: string | null;
}

const PROJECT_STAGGER: Record<string, number> = {
  'scribe': 0, 'spandhika': 1, 'campus-trace': 2, 'context': 3,
};

// SVG Paths for geometric shapes (centered around 0,0 internally for easy scaling)
const SHAPE_PATHS = {
  hexagon: "M 0 -10 L 8.66 -5 L 8.66 5 L 0 10 L -8.66 5 L -8.66 -5 Z",
  square: "M -8 -8 L 8 -8 L 8 8 L -8 8 Z",
  triangle: "M 0 -10 L 10 8 L -10 8 Z",
  circle: "M 0 0 m -9, 0 a 9,9 0 1,0 18,0 a 9,9 0 1,0 -18,0",
  pentagon: "M 0 -10 L 9.51 -3.09 L 5.88 8.09 L -5.88 8.09 L -9.51 -3.09 Z",
  diamond: "M 0 -10 L 10 0 L 0 10 L -10 0 Z",
  asterisk: "M 0 -10 L 0 10 M -10 0 L 10 0 M -7 -7 L 7 7 M -7 7 L 7 -7 M -4 -9 L 4 9 M -9 -4 L 9 4 M -4 9 L 4 -9 M -9 4 L 9 -4" // Detailed star/flower
};

const NodeItem: React.FC<NodeItemProps> = ({
  node, isExpanded, isSelected, activeAboutTab, onToggle,
  width: windowWidth, height: windowHeight,
  registerNode, onLiveDragStart, onLiveDragMove, onLiveDragEnd,
  isMobile,
  selectedId
}) => {
  const router = useRouter();
  const isRoot = node.type === 'root';
  const isProject = node.type === 'project';
  const isStoryNode = node.id.startsWith('st-');

  const isSymmetrical = !selectedId || selectedId === 'root';
  const bgColor = isRoot 
    ? 'transparent' 
    : (node.original?.color || '#FFFFFF');

  const strokeColor = isSelected ? '#4A5EBF' : (isSymmetrical ? '#000000' : '#E0E0E0');

  // Filter out the old panel nodes
  if (node.id === 'about-panel' || node.id === 'cv-panel') return null;

  const nodeRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDraggingActive, setIsDraggingActive] = useState(false);

  const { shape, innerContent, subtitle } = node.original;

  useEffect(() => {
    if (isHovered && node.type === 'project') {
      window.dispatchEvent(new CustomEvent('cursor-media', { detail: { video: node.original.video, lottie: node.original.lottie } }));
    } else if (!isHovered && node.type === 'project') {
      window.dispatchEvent(new CustomEvent('cursor-media', { detail: null }));
    }
  }, [isHovered, node.type, node.original]);

  const storyIdx = node.id.startsWith('st-') ? [
    'st-vit', 'st-grad', 'st-ux', 'st-ds', 'st-motion',
    'st-genai', 'st-workflow', 'st-unifyd', 'st-spandhika',
    'st-simplicity', 'st-bridge'
  ].indexOf(node.id) : -1;
  
  const staggerDelay = node.type === 'project' ? 0.35 + (PROJECT_STAGGER[node.id] ?? 0) * 0.08 : (node.id.startsWith('st-') ? 0.2 + storyIdx * 0.05 : 0);

  const onToggleRef = useRef(onToggle);
  const onLiveDragStartRef = useRef(onLiveDragStart);
  const onLiveDragMoveRef = useRef(onLiveDragMove);
  const onLiveDragEndRef = useRef(onLiveDragEnd);
  const isSelectedRef = useRef(isSelected);
  const isMobileRef = useRef(isMobile);
  const selectedIdRef = useRef(selectedId);
  
  onToggleRef.current = onToggle;
  onLiveDragStartRef.current = onLiveDragStart;
  onLiveDragMoveRef.current = onLiveDragMove;
  onLiveDragEndRef.current = onLiveDragEnd;
  isSelectedRef.current = isSelected;
  isMobileRef.current = isMobile;
  selectedIdRef.current = selectedId;

  useEffect(() => {
    const el = nodeRef.current;
    if (!el) return;

    let capturedPointerId = -1;
    let targetX = 0;
    let targetY = 0;
    let startX = 0;
    let startY = 0;
    let isDragging = false;

    const onPointerMove = (e: PointerEvent) => {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (!isDragging && (Math.abs(dx) > 4 || Math.abs(dy) > 4)) {
        isDragging = true;
        setIsDraggingActive(true);
        onLiveDragStartRef.current(targetX, targetY);
      }

      if (isDragging) {
        onLiveDragMoveRef.current(targetX + dx, targetY + dy);
      }
    };

    const onPointerUp = () => {
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', onPointerUp);

      if (capturedPointerId !== -1) {
        try { el.releasePointerCapture(capturedPointerId); } catch (_) { /* ignore */ }
        capturedPointerId = -1;
      }

      setIsDraggingActive(false);
      onLiveDragEndRef.current();

      if (!isDragging) {
        // Use refs to get current state within the closure
        const currentIsMobile = isMobileRef.current;
        const currentIsSelected = isSelectedRef.current;
        const currentSelectedId = selectedIdRef.current;
        
        const isProjectNode = node.type === 'project';
        const isContactNode = node.id.startsWith('contact-');
        
        // If we are looking at the Projects list (selectedId === 'projects'), 
        // clicking any project should navigate immediately on desktop too.
        const isInProjectGallery = isProjectNode && currentSelectedId === 'projects';
        
        // On mobile, navigate on first click if it's a project or contact with a URL.
        // On desktop, we allow direct navigation for project cards or selected nodes.
        const canOpenUrl = !!node.original.url && (
          isContactNode || 
          (isProjectNode && (currentIsMobile || currentIsSelected || isInProjectGallery))
        );
        
        if (canOpenUrl) {
          if (node.original.url.startsWith('http') || node.original.url.startsWith('mailto:') || node.original.url.startsWith('tel:')) {
            if (node.original.url.startsWith('mailto:') || node.original.url.startsWith('tel:')) {
              window.location.href = node.original.url;
            } else {
              window.open(node.original.url, '_blank');
            }
          } else {
            router.push(node.original.url);
          }
        } else {
          onToggleRef.current(node.id);
        }
      }
      isDragging = false;
    };

    const onPointerDown = (e: PointerEvent) => {
      e.stopPropagation();
      capturedPointerId = e.pointerId;
      el.setPointerCapture(e.pointerId);

      const transform = el.style.transform;
      const match = transform.match(/translate\(([^p]+)px,\s*([^p]+)px\)/);
      if (match) {
        targetX = parseFloat(match[1]);
        targetY = parseFloat(match[2]);
      } else {
        targetX = window.innerWidth / 2;
        targetY = window.innerHeight / 2;
      }

      startX = e.clientX;
      startY = e.clientY;
      isDragging = false;

      el.addEventListener('pointermove', onPointerMove);
      el.addEventListener('pointerup', onPointerUp);
    };

    el.addEventListener('pointerdown', onPointerDown);
    return () => {
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', onPointerUp);
    };
  }, [node.id]);

  const isActiveAboutNode = activeAboutTab === node.id;
  const shapeType = shape || (node.type === 'root' ? 'asterisk' : 'square');
  const pathKey = shapeType === 'circle-outline' ? 'circle' : shapeType;
  const path = SHAPE_PATHS[pathKey as keyof typeof SHAPE_PATHS];

  // Story nodes get their category color at rest; others use standard logic
  const categoryColor = STORY_NODE_COLOR[node.original?.category_type ?? ''];
  const dotColor = isSelected ? '#4A5EBF' : (isSymmetrical ? '#000000' : '#000000');
  const isHighlighted = isSelected;
  const nodeColor = isRoot ? '#4A5EBF'
    : (isHovered || isSelected) ? '#1A1A1A'
    : (isSymmetrical ? '#000000' : (categoryColor ?? '#A4A4A4'));
  const shapeScale = 1;

  // Nodes on the left side of the graph get their label on the left
  const LEFT_SIDE_NODES = ['about', 'contact', 'about-intro', 'about-skills', 'about-work',
    'contact-linkedin', 'contact-github', 'contact-mail', 'contact-phone'];
  // Nodes whose label appears below the shape
  const BOTTOM_NODES = ['designer'];
  const labelSide = !isRoot && BOTTOM_NODES.includes(node.id) ? 'bottom'
    : !isRoot && LEFT_SIDE_NODES.includes(node.id) ? 'left'
    : 'right';
  const isProjectCard = node.level === 2 && (
    isMobile 
      ? (selectedId === 'projects' || selectedId === 'root' || ['scribe', 'spandhika', 'campus-trace', 'context'].includes(selectedId || ''))
      : (selectedId === 'projects' || ['scribe', 'spandhika', 'campus-trace', 'context'].includes(selectedId || ''))
  );
  const shapeSize = isProjectCard ? 330 : (isMobile ? (isRoot ? 24 : 14) : (isRoot ? 46 : 24));
  const fontSize = isMobile ? (isRoot ? 14 : 11) : (isRoot ? 18 : 13);
  const secondaryFontSize = isMobile ? 8 : 10;
  // In card mode, we don't use the separate label div below
  const shapeOffset = isMobile 
    ? (isProject ? 0 : (shapeType === 'circle' ? 14 : 16)) 
    : (shapeType === 'circle' ? 24 : 28);

  const isSnappedRef = useRef(false);

  const isIsolated = selectedId !== null && selectedId !== 'root';

  if (isProjectCard) {
    return (
      <div
        ref={(el) => { nodeRef.current = el; registerNode(el); }}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          pointerEvents: 'none',
          zIndex: isHighlighted ? 100 : 50
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: '-50%', y: '-30%' }}
          animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          style={{
            position: 'absolute', // Important for centering relative to parent
            width: isMobile ? '300px' : '400px',
            height: isMobile ? '120px' : '150px',
            background: '#FFFFFF',
            border: isHighlighted ? '1.5px solid #4A5EBF' : '0.5px solid rgba(0,0,0,0.08)',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'row',
            overflow: 'hidden',
            boxShadow: isHighlighted 
              ? '0 12px 32px rgba(255, 77, 0, 0.15)' 
              : '0 4px 20px rgba(0,0,0,0.06)',
            pointerEvents: 'auto',
          }}
          onClick={() => {
            if (node.original.url) {
              if (node.original.url.startsWith('http') || node.original.url.startsWith('mailto:') || node.original.url.startsWith('tel:')) {
                if (node.original.url.startsWith('mailto:') || node.original.url.startsWith('tel:')) {
                  window.location.href = node.original.url;
                } else {
                  window.open(node.original.url, '_blank');
                }
              } else {
                router.push(node.original.url);
              }
            } else {
              onToggle(node.id);
            }
          }}
        >
          {/* Left Side: Media Preview (Bigger) */}
          <div style={{ width: isMobile ? '140px' : '180px', height: '100%', background: '#F9F9F9', position: 'relative', overflow: 'hidden', borderRight: '0.5px solid #F0F0F0' }}>
            {node.original.lottie ? (
              <LottiePlayer url={node.original.lottie} style={{ width: '100%', height: '100%', objectFit: isMobile ? 'cover' : 'contain' }} />
            ) : node.original.video ? (
              <video 
                autoPlay loop muted playsInline 
                style={{ width: '100%', height: '100%', objectFit: isMobile ? 'cover' : 'contain' }}
              >
                <source src={node.original.video} type="video/mp4" />
              </video>
            ) : null}
          </div>

          {/* Right Side: Information */}
          <div style={{ flex: 1, padding: '12px 14px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '4px' }}>
            <div style={{ 
              fontFamily: "'Inter', sans-serif", 
              fontSize: isMobile ? 14 : 18, 
              fontWeight: 700, 
              color: '#000',
              lineHeight: 1.1,
              letterSpacing: '-0.02em'
            }}>
              {node.label}
            </div>
            <div style={{ 
              fontFamily: "'Inter', sans-serif", 
              fontSize: isMobile ? 10 : 12, 
              fontWeight: 400, 
              color: '#666',
              lineHeight: 1.4,
              whiteSpace: 'normal',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {node.original.description}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  const showLabel = isRoot ? !(isMobile && isIsolated) : true;

  if (!showLabel) return (
    <motion.div
      ref={(el) => { nodeRef.current = el; registerNode(el); }}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 50,
        pointerEvents: 'auto',
      }}
    >
      <div style={{ position: 'relative' }}>
        <motion.div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: `${shapeSize}px`,
            height: isMobile && isProject ? 'auto' : `${shapeSize}px`,
          }}
        >
          {isMobile && isProject && (node.original.video || node.original.lottie) ? (
            node.original.lottie ? (
              <LottiePlayer 
                url={node.original.lottie} 
                style={{ 
                  width: '100%', 
                  borderRadius: '4px',
                  border: isHighlighted ? '1.5px solid #4A5EBF' : '1px solid #E0E0E0',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  overflow: 'hidden'
                }} 
              />
            ) : (
              <video 
                autoPlay loop muted playsInline 
                style={{ 
                  width: '100%', 
                  borderRadius: '4px',
                  border: isHighlighted ? '1.5px solid #4A5EBF' : '1px solid #E0E0E0',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              >
                <source src={node.original.video} type="video/mp4" />
              </video>
            )
          ) : (
            <motion.svg
              width={shapeSize} height={shapeSize} viewBox="-12 -12 24 24"
              animate={{ scale: shapeScale }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              style={{ overflow: 'visible' }}
            >
              <motion.path
                d={path}
                fill={(isHighlighted && !isRoot && shapeType !== 'circle-outline') ? nodeColor : 'none'}
                stroke={nodeColor}
                strokeWidth="1.5"
                transition={{ duration: 0.2 }}
              />
            </motion.svg>
          )}
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      ref={(el) => { nodeRef.current = el; registerNode(el); }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        if (isSnappedRef.current) {
          window.dispatchEvent(new CustomEvent('cursor-snap', { detail: null }));
          isSnappedRef.current = false;
        }
      }}
      onMouseMove={(e) => {
        e.stopPropagation();
      }}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        cursor: isDraggingActive ? 'grabbing' : 'grab',
        zIndex: isDraggingActive ? 100 : isHovered ? 80 : 50,
        touchAction: 'none',
        pointerEvents: 'auto',
        userSelect: 'none',
      }}
      data-cursor="interaction"
    >
      <div style={{ position: 'relative' }}>
        {/* Geometric Anchor Node */}
        <motion.div
          onMouseEnter={(e) => {
            if (isSnappedRef.current) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            window.dispatchEvent(new CustomEvent('cursor-snap', { detail: { x: cx, y: cy } }));
            isSnappedRef.current = true;
          }}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: `${shapeSize}px`,
            height: isMobile && isProject ? 'auto' : `${shapeSize}px`,
          }}
        >
          {isMobile && isProject && (node.original.video || node.original.lottie) ? (
            node.original.lottie ? (
              <LottiePlayer 
                url={node.original.lottie} 
                style={{ 
                  width: '100%', 
                  borderRadius: '4px',
                  border: isHighlighted ? '1.5px solid #4A5EBF' : '1px solid #E0E0E0',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  overflow: 'hidden'
                }} 
              />
            ) : (
              <video 
                autoPlay loop muted playsInline 
                style={{ 
                  width: '100%', 
                  borderRadius: '4px',
                  border: isHighlighted ? '1.5px solid #4A5EBF' : '1px solid #E0E0E0',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              >
                <source src={node.original.video} type="video/mp4" />
              </video>
            )
          ) : (
            <motion.svg
              width={shapeSize} height={shapeSize} viewBox="-12 -12 24 24"
              animate={{ scale: shapeScale }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              style={{ overflow: 'visible' }}
            >
              <motion.path
                d={path}
                fill={(isHighlighted && !isRoot && shapeType !== 'circle-outline') ? nodeColor : 'none'}
                stroke={nodeColor}
                strokeWidth="1.5"
                transition={{ duration: 0.2 }}
              />
              {innerContent === 'dot' && (
                <circle cx="0" cy="0" r="1.5" fill={isHighlighted ? '#FFF' : nodeColor} />
              )}
              {innerContent && innerContent !== 'dot' && (
                <text
                  x="0" y="3.5"
                  textAnchor="middle"
                  style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: isMobile ? 6 : 8,
                    fontWeight: 'bold',
                    fill: isHighlighted ? '#FFF' : nodeColor,
                    pointerEvents: 'none',
                  }}
                >
                  {innerContent}
                </text>
              )}
            </motion.svg>
          )}
        </motion.div>
        
        {/* Typographic Label & Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: staggerDelay }}
          style={{
            position: 'absolute',
            ...(labelSide === 'bottom' ? {
              // Centered below the shape
              left: 0,
              top: shapeOffset,
              transform: 'translate(-50%, 0)',
              alignItems: 'center',
            } : labelSide === 'left' ? {
              left: -(shapeOffset - 4),
              transform: 'translate(-100%, -50%)',
              alignItems: 'flex-end',
            } : {
              left: isRoot ? 0 : shapeOffset - 4,
              transform: isRoot ? 'translate(-50%, -100%)' : 'translateY(-50%)',
              alignItems: isRoot ? 'center' : 'flex-start',
            }),
            top: isRoot ? (isMobile ? -60 : -24) : (labelSide === 'bottom' ? shapeOffset : 0),
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            pointerEvents: 'auto',
            cursor: 'pointer',
            background: '#FBFBFB',
            padding: 0,
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{
            color: isActiveAboutNode ? '#4A5EBF' : (isSymmetrical ? '#000000' : (isHovered || isHighlighted ? '#1A1A1A' : categoryColor ?? '#777')),
            fontFamily: "'Inter', sans-serif",
            fontSize: `${fontSize}px`,
            fontWeight: isRoot ? 600 : isActiveAboutNode ? 600 : isProject ? 500 : 400,
            whiteSpace: 'nowrap',
            letterSpacing: '-0.02em',
            transition: 'color 0.2s'
          }}>
            {node.label}
          </span>
          {subtitle && (
            <span style={{
              color: '#A4A4A4',
              fontFamily: "'Inter', sans-serif",
              fontSize: `${secondaryFontSize}px`,
              fontWeight: 400,
              whiteSpace: 'nowrap',
              letterSpacing: '0.02em',
            }}>
              {subtitle}
            </span>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NodeItem;
