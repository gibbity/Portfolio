"use client";

import React from 'react';
import { portfolioData, NodeData } from '@/data/nodes';
import { motion, AnimatePresence } from 'framer-motion';

interface FileSystemNavProps {
  expandedIds: Set<string>;
  selectedId: string | null;
  onToggle: (id: string) => void;
  activeSection?: string;
  activeAboutTab?: string;
  renderContent?: (nodeId: string) => React.ReactNode;
}

const FileSystemNav: React.FC<FileSystemNavProps> = ({ expandedIds, selectedId, onToggle, activeAboutTab, renderContent }) => {
  const renderIcon = (node: NodeData, isSelected: boolean) => {
    const color = isSelected ? '#4A5EBF' : '#1A1A1A';
    const shape = node.shape || (node.id === 'root' ? 'asterisk' : 'square');
    
    switch(shape) {
      case 'asterisk': return <div style={{ width: 8, height: 8, background: '#4A5EBF', borderRadius: '50%' }} />;
      case 'square': return <div style={{ width: 7, height: 7, background: color }} />;
      case 'triangle': return <div style={{ width: 0, height: 0, borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderBottom: '7.5px solid ' + color }} />;
      case 'circle': return <div style={{ width: 8, height: 8, background: color, borderRadius: '50%' }} />;
      case 'circle-outline': return <div style={{ width: 8, height: 8, border: `1.5px solid ${color}`, borderRadius: '50%' }} />;
      case 'pentagon': return <div style={{ width: 8, height: 8, background: color, clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }} />;
      case 'hexagon': return <div style={{ width: 8, height: 8, background: color, clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }} />;
      case 'diamond': return <div style={{ width: 7, height: 7, background: color, transform: 'rotate(45deg)' }} />;
      default: return <div style={{ width: 4, height: 4, background: color, borderRadius: '50%', opacity: 0.5 }} />;
    }
  };

  const renderNode = (node: NodeData, depth: number = 0) => {
    const isExpanded = expandedIds.has(node.id) || selectedId === node.id;
    const isSelected = selectedId === node.id || activeAboutTab === node.id;
    const hasChildren = node.children && node.children.length > 0;
    
    const isTopLevel = depth === 0 || (depth === 1 && node.id !== 'about-panel' && node.id !== 'cv-panel');

    return (
      <div key={node.id} style={{ 
        borderBottom: isTopLevel && depth === 1 ? '1px dotted #E0E0E0' : 'none',
        paddingBottom: isTopLevel && depth === 1 ? 8 : 0,
        marginBottom: isTopLevel && depth === 1 ? 8 : 2
      }}>
        <div 
          onClick={() => onToggle(node.id)}
          style={{ 
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: isTopLevel ? '10px' : '12px',
            textTransform: isTopLevel ? 'uppercase' : 'none',
            color: isSelected ? '#4A5EBF' : '#1A1A1A',
            cursor: 'pointer',
            padding: '8px 0',
            fontWeight: isSelected ? 700 : 500,
            display: 'flex',
            alignItems: 'center',
            letterSpacing: isTopLevel ? '0.1em' : 'normal',
            transition: 'color 0.2s ease',
          }}
          data-cursor="interaction"
        >
          {/* Custom Category Icon */}
          <div style={{ width: 24, display: 'flex', justifyContent: 'center', marginRight: 8 }}>
            {renderIcon(node, isSelected)}
          </div>
          
          <span style={{ flex: 1 }}>{node.label}</span>

          {hasChildren && (
            <span style={{ opacity: 0.3, fontSize: '10px' }}>
              {isExpanded ? '−' : '+'}
            </span>
          )}
        </div>

        {/* Inline Content Rendering (Accordion style for mobile) */}
        {isSelected && renderContent && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ 
              paddingLeft: depth === 0 ? 0 : 24, 
              paddingBottom: 24,
              marginTop: -4,
              borderLeft: depth > 1 ? '1px solid #F0F0F0' : 'none',
              marginLeft: depth > 1 ? 12 : 0
            }}
          >
            {renderContent(node.id)}
          </motion.div>
        )}
        
        <AnimatePresence>
          {isExpanded && node.children && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{ overflow: 'visible' }}
            >
              <div style={{ paddingLeft: 32, paddingBottom: 8 }}>
                {node.children.map(child => {
                  if (child.id === 'about-panel' || child.id === 'cv-panel') return null;
                  return renderNode(child, depth + 1);
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div style={{ position: 'relative', padding: '0 24px' }}>
      {renderNode(portfolioData, 0)}
    </div>
  );
};

export default FileSystemNav;
