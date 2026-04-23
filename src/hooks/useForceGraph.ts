import { useEffect, useMemo, useRef, useCallback } from 'react';
import * as d3 from 'd3-force';
import { NodeData, portfolioData } from '@/data/nodes';

export interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  type: string;
  level: number;
  original: NodeData;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
}

export interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  id: string;
  source: string | GraphNode;
  target: string | GraphNode;
}

const CATEGORY_ORDER = ['about', 'contact', 'designer', 'cv', 'projects'];
const CATEGORY_COUNT = CATEGORY_ORDER.length;

// Global cache to persist node positions across unmounts/remounts
const globalNodeCache = new Map<string, GraphNode>();

// Exported pure function to get where a node *should* be
export function calculateSlotPosition(
  node: GraphNode,
  selectedId: string | null,
  width: number,
  height: number,
  isMobile: boolean = false
): { x: number; y: number } {
  let tx = width / 2;
  let ty = height / 2;

  if (selectedId && selectedId !== 'root') {
    // ISOLATION VIEW
    if (isMobile) {
      const isActuallyIsolated = selectedId && selectedId !== 'root';
      const shiftY = isActuallyIsolated ? -40 : 0; // Less aggressive shift to prevent top cutoff

      // Mobile Isolation: Even tighter top-down vertical stack
      if (node.id === 'root') {
        tx = width / 2;
        ty = 160 + shiftY; 
      } else if (selectedId === 'projects') {
        if (node.id === 'projects') {
          tx = width / 2;
          ty = 180 + shiftY; 
        } else if (node.level === 2) {
          const projOrder = ['scribe', 'spandhika', 'campus-trace', 'context'];
          const idx = projOrder.indexOf(node.id);
          tx = width / 2;
          ty = 300 + idx * 135 + shiftY; 
        }
      } else if (selectedId === 'about') {
        if (node.id === 'about') {
          tx = width / 2;
          ty = 220 + shiftY;
        } else if (['about-intro', 'about-skills', 'about-work'].includes(node.id)) {
          const idx = ['about-intro', 'about-skills', 'about-work'].indexOf(node.id);
          tx = width / 2;
          ty = 300 + idx * 80 + shiftY; 
        }
      } else if (selectedId === 'contact') {
        if (node.id === 'contact') {
          tx = width / 2;
          ty = 220 + shiftY;
        } else if (node.level === 2) {
          const contactOrder = ['contact-mail', 'contact-phone', 'contact-linkedin', 'contact-github'];
          const idx = contactOrder.indexOf(node.id);
          tx = width / 2;
          ty = 300 + idx * 80 + shiftY;
        }
      } else if (selectedId === 'designer') {
        if (node.id === 'designer') {
          tx = width / 2 - 40; // Shifted right (less negative)
          ty = 210 + shiftY;   // Lowered from 130
        } else if (node.id.startsWith('st-')) {
          tx = width / 2 + 50; // Shifted right
          const groups = [
            { id: 'edu', nodes: ['st-vit', 'st-grad'], startY: 260 + shiftY, spacing: 42, isVertical: true },
            { id: 'skill', nodes: ['st-ux', 'st-ds', 'st-motion', 'st-genai', 'st-workflow'], startY: 350 + shiftY, spacing: 42, isVertical: true },
            { id: 'work', nodes: ['st-unifyd', 'st-spandhika'], startY: 560 + shiftY, spacing: 45, isVertical: true },
            { id: 'style', nodes: ['st-simplicity', 'st-bridge'], startY: 660 + shiftY, spacing: 45, isVertical: true }
          ];
          for (const group of groups) {
            const idx = group.nodes.indexOf(node.id);
            if (idx !== -1) {
              ty = group.startY + idx * group.spacing;
              break;
            }
          }
        }
      } else if (selectedId === 'cv') {
        if (node.id === 'cv') {
          tx = width / 2;
          ty = 200 + shiftY;
        } else if (node.id === 'cv-panel') {
          tx = width / 2;
          ty = 450 + shiftY;
        }
      } else if (node.id === selectedId) {
        tx = width / 2;
        ty = 200 + shiftY;
      }
    } else {
      // DESKTOP ISOLATION (Existing logic)
      if (node.id === 'root') {
        tx = Math.round(width * 0.22);
        ty = Math.round(height * 0.45);
      } else if (selectedId === 'about') {
        if (node.id === 'root') {
          tx = Math.round(width * 0.12);
          ty = Math.round(height * 0.22);
        } else if (node.id === 'about') {
          tx = Math.round(width * 0.12);
          ty = Math.round(height * 0.52);
        } else if (node.id === 'about-intro') {
          tx = Math.round(width * 0.48);
          ty = Math.round(height * 0.28);
        } else if (node.id === 'about-skills') {
          tx = Math.round(width * 0.55);
          ty = Math.round(height * 0.52);
        } else if (node.id === 'about-work') {
          tx = Math.round(width * 0.48);
          ty = Math.round(height * 0.76);
        } else if (node.id === 'about-panel') {
          tx = Math.round(width * 0.82);
          ty = Math.round(height * 0.52);
        }
      } else if (selectedId === 'contact') {
        if (node.id === 'root') {
          tx = Math.round(width * 0.15);
          ty = Math.round(height * 0.42);
        } else if (node.id === 'contact') {
          tx = Math.round(width * 0.15);
          ty = Math.round(height * 0.58);
        } else if (node.level === 2) {
          const contactOrder = ['contact-mail', 'contact-phone', 'contact-linkedin', 'contact-github'];
          const idx = contactOrder.indexOf(node.id);
          tx = Math.round(width * 0.6);
          const total = contactOrder.length;
          const startY = height / 2 - ((total - 1) * 160) / 2;
          ty = Math.round(startY + (idx === -1 ? 0 : idx) * 160);
        }
      } else if (selectedId === 'designer') {
        if (node.id === 'root') {
          tx = Math.round(width * 0.15);
          ty = Math.round(height * 0.42);
        } else if (node.id === 'designer') {
          tx = Math.round(width * 0.15);
          ty = Math.round(height * 0.58);
        } else if (node.id.startsWith('st-')) {
          const groups = [
            { id: 'edu', nodes: ['st-vit', 'st-grad'], y: height * 0.22 },
            { id: 'skill', nodes: ['st-ux', 'st-ds', 'st-motion', 'st-genai', 'st-workflow'], y: height * 0.42 },
            { id: 'work', nodes: ['st-unifyd', 'st-spandhika'], y: height * 0.62 },
            { id: 'style', nodes: ['st-simplicity', 'st-bridge'], y: height * 0.82 }
          ];
          let found = false;
          for (const group of groups) {
            const idx = group.nodes.indexOf(node.id);
            if (idx !== -1) {
               const startX = width * 0.22;
               const spacing = 180;
               tx = Math.round(startX + idx * spacing);
               ty = Math.round(group.y);
               found = true;
               break;
            }
          }
        }
      } else if (selectedId === 'cv') {
        if (node.id === 'root') {
          tx = Math.round(width * 0.15);
          ty = Math.round(height * 0.42);
        } else if (node.id === 'cv') {
          tx = Math.round(width * 0.15);
          ty = Math.round(height * 0.58);
        } else if (node.id === 'cv-panel') {
          tx = Math.round(width * 0.65);
          ty = Math.round(height * 0.5);
        }
      } else if (node.id === selectedId) {
        tx = Math.round(width * 0.22);
        ty = Math.round(height * 0.55);
      } else if (node.level === 2) {
        const projOrder = ['scribe', 'spandhika', 'campus-trace', 'context'];
        const idx = projOrder.indexOf(node.id);
        tx = Math.round(width * 0.6);
        const total = projOrder.length;
        const startY = height / 2 - ((total - 1) * 190) / 2;
        ty = Math.round(startY + (idx === -1 ? 0 : idx) * 190);
      }
    }
  } else {
    // HOME VIEW
    if (node.id === 'root') {
      tx = isMobile ? width / 2 : width * 0.44;
      ty = isMobile ? height / 2 : height / 2 - 50;
    } else {
      const idx = CATEGORY_ORDER.indexOf(node.id);
      if (idx !== -1) {
        if (isMobile) {
          // Mobile Home: Symmetrical Schematic Layout
          const cx = width / 2;
          const cy = height / 2 - 40; // Slightly higher to account for bottom sheet peek

          if (node.id === 'about') {
            tx = cx - 85; ty = cy - 140;
          } else if (node.id === 'projects') {
            tx = cx + 85; ty = cy - 140;
          } else if (node.id === 'contact') {
            tx = cx - 85; ty = cy + 140;
          } else if (node.id === 'cv') {
            tx = cx + 85; ty = cy + 140;
          } else if (node.id === 'designer') {
            tx = cx; ty = cy + 290;
          }
        } else {
          // Symmetrical Schematic Layout (Desktop Home)
          const cx = width * 0.44; // Shifted left to compensate for the UI panel on the right
          const cy = height / 2;

          if (node.id === 'about') {
            tx = cx - 350; ty = cy - 180;
          } else if (node.id === 'projects') {
            tx = cx + 350; ty = cy - 180;
          } else if (node.id === 'contact') {
            tx = cx - 350; ty = cy + 110;
          } else if (node.id === 'cv') {
            tx = cx + 350; ty = cy + 110;
          } else if (node.id === 'designer') {
            tx = cx; ty = cy + 290;
          } else {
            const angle = Math.PI - (idx / (CATEGORY_ORDER.length - 1)) * Math.PI;
            const radius = Math.min(width, height) * 0.38;
            tx = Math.round(cx + radius * Math.cos(angle));
            ty = Math.round(cy + radius * Math.sin(angle));
          }
        }
      } else if (node.level === 2) {
        const projOrder = ['scribe', 'spandhika', 'campus-trace', 'context'];
        const pIdx = projOrder.indexOf(node.id);
        const radius = Math.min(width, height) * 0.25;
        const parentX = width / 2 + radius;
        const parentY = height / 2 - 50;
        tx = Math.round(parentX + 50);
        ty = Math.round(parentY + (pIdx - 1.5) * 85);
      }
    }
  }
  return { x: tx, y: ty };
}

export const useForceGraph = (
  data: NodeData,
  expandedIds: Set<string>,
  width: number,
  height: number,
  isProjectMode: boolean,
  selectedId: string | null,
  isMobile: boolean = false
) => {
  const simulationRef = useRef<any>(null);
  const nodesRef = useRef<GraphNode[]>([]);
  const linksRef = useRef<GraphLink[]>([]);
  const nodeRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const linkRefs = useRef<Map<string, SVGLineElement>>(new Map());

  const lastIsMobile = useRef(isMobile);
  if (lastIsMobile.current !== isMobile) {
    globalNodeCache.clear();
    lastIsMobile.current = isMobile;
  }

  const { flatNodes, flatLinks } = useMemo(() => {
    const nodes: GraphNode[] = [];
    const links: GraphLink[] = [];

    const findNodeById = (n: NodeData, id: string): NodeData | null => {
      if (n.id === id) return n;
      for (const child of n.children ?? []) {
        const found = findNodeById(child, id);
        if (found) return found;
      }
      return null;
    };

    // We can use calculateSlotPosition as our initial positioning too
    const getInitialPos = (id: string, level: number, type: string) => {
      // Mock node enough to run calculateSlotPosition
      return calculateSlotPosition({ id, level, type } as any, selectedId, width, height, isMobile);
    };

    const rootPos = getInitialPos(data.id, 0, data.type || 'root');
    const rootNode: GraphNode = {
      id: data.id,
      label: data.label,
      type: data.type || 'root',
      level: 0,
      original: data,
      x: (isMobile && !selectedId) ? rootPos.x : (globalNodeCache.get(data.id)?.x ?? rootPos.x),
      y: (isMobile && !selectedId) ? rootPos.y : (globalNodeCache.get(data.id)?.y ?? rootPos.y),
    };

    if (selectedId && selectedId !== 'root') {
      // ── ISOLATION MODE: Master + Selected + Children ──────────────────
      nodes.push(rootNode);
      const targetData = findNodeById(data, selectedId);

      if (targetData) {
        const targetPos = getInitialPos(selectedId, 1, targetData.type || 'category');
        const targetNode: GraphNode = {
          id: targetData.id,
          label: targetData.label,
          type: targetData.type || 'category',
          level: 1,
          original: targetData,
          x: globalNodeCache.get(selectedId)?.x ?? targetPos.x,
          y: globalNodeCache.get(selectedId)?.y ?? targetPos.y,
        };
        nodes.push(targetNode);
        links.push({ id: `root-${selectedId}`, source: 'root', target: selectedId });

        if (targetData.children && targetData.children.length > 0) {
          targetData.children.forEach((child, index) => {
            const prevChild = globalNodeCache.get(child.id);
            const childPos = getInitialPos(child.id, 2, child.type || 'project');
            const childNode: GraphNode = {
              id: child.id,
              label: child.label,
              type: child.type || 'project',
              level: 2,
              original: child,
              x: prevChild?.x ?? childPos.x,
              y: prevChild?.y ?? childPos.y,
            };
            nodes.push(childNode);
            
            if (selectedId === 'designer' && child.category_type) {
              let prevId = null;
              for (let i = index - 1; i >= 0; i--) {
                if (targetData.children[i].category_type === child.category_type) {
                  prevId = targetData.children[i].id;
                  break;
                }
              }
              if (prevId) {
                links.push({ id: `${prevId}-${child.id}`, source: prevId, target: child.id });
              } else {
                links.push({ id: `${selectedId}-${child.id}`, source: selectedId, target: child.id });
              }
            } else {
              links.push({ id: `${selectedId}-${child.id}`, source: selectedId, target: child.id });
            }
          });

          if (selectedId === 'about') {
            ['about-intro', 'about-skills', 'about-work'].forEach(subId => {
              links.push({ id: `${subId}-about-panel`, source: subId, target: 'about-panel' });
            });
          }
        }
      }
    } else {
      // ── HOME MODE (Now Anchored to Left) ──────────────────────────────
      const traverse = (node: NodeData, level: number, parent?: GraphNode) => {
        const prev = globalNodeCache.get(node.id);
        const pos = getInitialPos(node.id, level, node.type || 'category');
        const gNode: GraphNode = {
          id: node.id,
          label: node.label,
          type: node.type || 'category',
          level,
          original: node,
          x: (isMobile && !selectedId) ? pos.x : (prev?.x ?? pos.x),
          y: (isMobile && !selectedId) ? pos.y : (prev?.y ?? pos.y),
        };
        nodes.push(gNode);
        if (parent) {
          links.push({ id: `${parent.id}-${node.id}`, source: parent.id, target: node.id });
        }
        if (expandedIds.has(node.id) && node.children) {
          node.children.forEach(child => traverse(child, level + 1, gNode));
        }
      };
      traverse(data, 0);
    }

    nodes.forEach(n => globalNodeCache.set(n.id, n));
    return { flatNodes: nodes, flatLinks: links };
  }, [data, expandedIds, width, height, selectedId, isMobile]);

  useEffect(() => {
    if (!simulationRef.current) {
      simulationRef.current = d3
        .forceSimulation<GraphNode, GraphLink>()
        .force('link', d3.forceLink<GraphNode, GraphLink>().id(d => d.id).distance(140).strength(1))
        .force('collision', d3.forceCollide<GraphNode>().radius(d => d.type === 'project' ? 93 : 85).strength(1))
        .velocityDecay(0.48)
        .alphaDecay(0.035);
    }
  }, []);

  useEffect(() => {
    const sim = simulationRef.current;
    if (!sim) return;

    sim.nodes(flatNodes);
    const linkForce = sim.force('link') as d3.ForceLink<GraphNode, GraphLink>;
    linkForce.links(flatLinks);

    linkForce.strength(0.12);
    linkForce.distance(isMobile ? 140 : 280);

    sim.force('slot', () => {
      const alpha = sim.alpha();
      flatNodes.forEach(node => {
        if (node.fx !== undefined) return;

        // If the node is one of the specific sub-panels under isolation, we lock it
        // Check for specific fx/fy assignments like in original implementation
        if (selectedId === 'about' && node.id === 'about-panel') {
          const {x, y} = calculateSlotPosition(node, selectedId, width, height, isMobile);
          node.fx = x; node.fy = y;
          return;
        }
        if (selectedId === 'contact' && node.level === 2) {
          const {x, y} = calculateSlotPosition(node, selectedId, width, height, isMobile);
          node.fx = x; node.fy = y;
          return;
        }
        if (selectedId === 'designer' && node.id.startsWith('st-')) {
          const {x, y} = calculateSlotPosition(node, selectedId, width, height, isMobile);
          node.fx = x; node.fy = y;
          return;
        }
        if (selectedId === 'cv' && node.id === 'cv-panel') {
          const {x, y} = calculateSlotPosition(node, selectedId, width, height, isMobile);
          node.fx = x; node.fy = y;
          return;
        }
        if (selectedId && selectedId !== 'root' && node.level === 2) {
          const {x, y} = calculateSlotPosition(node, selectedId, width, height, isMobile);
          node.fx = x; node.fy = y;
          return;
        }

        const { x: tx, y: ty } = calculateSlotPosition(node, selectedId, width, height, isMobile);
        const pull = (selectedId || isMobile) ? 0.9 : 0.6;
        node.vx! += (tx - node.x!) * pull * alpha;
        node.vy! += (ty - node.y!) * pull * alpha;
      });
    });

    sim.on('tick', () => {
      flatNodes.forEach(node => {
        const el = nodeRefs.current.get(node.id);
        if (el && node.x !== undefined && node.y !== undefined) {
          el.style.transform = `translate(${node.x}px, ${node.y}px)`;
        }
      });
      flatLinks.forEach(link => {
        const el = linkRefs.current.get(link.id);
        const s = link.source as unknown as GraphNode;
        const t = link.target as unknown as GraphNode;
        if (el && s.x !== undefined && t.x !== undefined) {
          el.setAttribute('x1', String(s.x));
          el.setAttribute('y1', String(s.y!));
          el.setAttribute('x2', String(t.x));
          el.setAttribute('y2', String(t.y!));
        }
      });
    });

    sim.alpha(0.7).restart();
  }, [flatNodes, flatLinks, width, height, selectedId]);

  const registerNode = useCallback((id: string, el: HTMLDivElement | null) => {
    if (el) nodeRefs.current.set(id, el);
    else nodeRefs.current.delete(id);
  }, []);

  const registerLink = useCallback((id: string, el: SVGLineElement | null) => {
    if (el) linkRefs.current.set(id, el);
    else linkRefs.current.delete(id);
  }, []);

  return { flatNodes, flatLinks, registerNode, registerLink, simulationRef };
};
