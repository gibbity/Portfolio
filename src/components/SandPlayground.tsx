"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface RGBColor {
  r: number;
  g: number;
  b: number;
  hex: string;
}

interface Palette {
  id: string;
  name: string;
  colors: RGBColor[];
}

function hexToRgb(hex: string): RGBColor {
  let c = hex.replace("#", "");
  if (c.length === 3) {
    c = c.split("").map((x) => x + x).join("");
  }
  const num = parseInt(c, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
    hex: `#${c}`,
  };
}

// Harmonious color gradients designed for natural sand stratum
const PALETTES: Palette[] = [
  {
    id: "dunes",
    name: "Desert Dunes",
    colors: [
      "#C85A32", // Terracotta
      "#D9822B", // Warm Ochre
      "#E5A93C", // Golden Sand
      "#EBDCB9", // Pale Dune Dust
      "#C67B5C", // Warm Adobe Clay
      "#873E23", // Deep Canyon Rust
    ].map(hexToRgb),
  },
  {
    id: "ocean",
    name: "Coastal Breeze",
    colors: [
      "#1B4965", // Deep Indigo Marine
      "#2E7599", // Cerulean Tide
      "#62B6CB", // Seafoam Aqua
      "#BEE9E8", // Pale Lagoon Foam
      "#8ECAE6", // Coastal Sky
      "#3D8DAE", // Reef Blue
    ].map(hexToRgb),
  },
  {
    id: "sunset",
    name: "Pastel Sunset",
    colors: [
      "#584B53", // Smoky Dusk
      "#9D5C63", // Dusty Mulberry
      "#D67262", // Sunset Coral
      "#E89978", // Warm Apricot
      "#F4D35E", // Golden Glow
      "#E08D79", // Blush Peach
    ].map(hexToRgb),
  },
  {
    id: "earth",
    name: "Forest Moss",
    colors: [
      "#284B3E", // Deep Evergreen
      "#437A5C", // Forest Moss
      "#78A17A", // Eucalyptus Sage
      "#B7CE95", // Pale Sprout
      "#CBB382", // Lichen Gold
      "#85694A", // Wet Earth
    ].map(hexToRgb),
  },
  {
    id: "monochrome",
    name: "Ink & Slate",
    colors: [
      "#1F2421", // Carbon Black
      "#3D405B", // Slate Navy
      "#6B705C", // Smoky Olive
      "#A5A58D", // Warm Limestone
      "#DDBEA9", // Parchment Stone
      "#7F7F7F", // Graphite
    ].map(hexToRgb),
  },
];

function rgbToUint32(r: number, g: number, b: number, a = 255): number {
  return (a << 24) | (b << 16) | (g << 8) | r;
}

export default function SandPlayground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // UI States
  const [isDark, setIsDark] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activePalette, setActivePalette] = useState<string>("dunes");
  const [autoHue, setAutoHue] = useState<boolean>(false);
  const [brushSize, setBrushSize] = useState<"fine" | "medium" | "thick">("medium");
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  // References so physics loop always has live values without remounting canvas or losing sand
  const activePaletteRef = useRef<string>(activePalette);
  const autoHueRef = useRef<boolean>(autoHue);
  const brushSizeRef = useRef<"fine" | "medium" | "thick">(brushSize);
  const isDarkRef = useRef<boolean>(isDark);

  activePaletteRef.current = activePalette;
  autoHueRef.current = autoHue;
  brushSizeRef.current = brushSize;
  isDarkRef.current = isDark;

  const clearCanvasRef = useRef<() => void>(() => {});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = false;

    // Ultra-Fine Grain Scale (1.0 = true pixel-level fine sand grains)
    const CELL_SCALE = 1.0;
    let gridW = 0;
    let gridH = 0;
    let grid: Uint32Array = new Uint32Array(0);
    let imgData: ImageData | null = null;
    let buf32: Uint32Array = new Uint32Array(0);

    // Pointer state
    let isPouring = false;
    let pointerX = 0;
    let pointerY = 0;

    // Time-based color progression
    const HOLD_TIME_MS = 1200; // 1.2s solid color hold
    const TRANSITION_TIME_MS = 1000; // 1.0s gradual smooth blending
    const STEP_DURATION_MS = HOLD_TIME_MS + TRANSITION_TIME_MS; // 2.2s per stage

    let accumulatedPourMs = 0;
    let lastFrameTime = performance.now();
    let prismHue = 0;

    const initGrid = () => {
      if (!canvas || !canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      const displayW = Math.max(Math.floor(rect.width), 100);
      const displayH = Math.max(Math.floor(rect.height), 100);

      canvas.style.width = `${displayW}px`;
      canvas.style.height = `${displayH}px`;

      gridW = Math.floor(displayW / CELL_SCALE);
      gridH = Math.floor(displayH / CELL_SCALE);

      canvas.width = gridW;
      canvas.height = gridH;

      grid = new Uint32Array(gridW * gridH);
      imgData = ctx.createImageData(gridW, gridH);
      buf32 = new Uint32Array(imgData.data.buffer);
    };

    initGrid();

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      const newDisplayW = Math.max(Math.floor(rect.width), 100);
      const newDisplayH = Math.max(Math.floor(rect.height), 100);

      const oldGrid = grid;
      const oldW = gridW;
      const oldH = gridH;

      const newGridW = Math.floor(newDisplayW / CELL_SCALE);
      const newGridH = Math.floor(newDisplayH / CELL_SCALE);

      if (newGridW === oldW && newGridH === oldH) return;

      canvas.style.width = `${newDisplayW}px`;
      canvas.style.height = `${newDisplayH}px`;
      canvas.width = newGridW;
      canvas.height = newGridH;

      gridW = newGridW;
      gridH = newGridH;
      grid = new Uint32Array(gridW * gridH);
      imgData = ctx.createImageData(gridW, gridH);
      buf32 = new Uint32Array(imgData.data.buffer);

      // Bottom-anchor sand preservation: copy sand aligning with the bottom floor
      if (oldGrid && oldGrid.length > 0 && grid.length > 0) {
        const copyW = Math.min(oldW, gridW);
        const copyH = Math.min(oldH, gridH);

        const oldYStart = oldH - copyH;
        const newYStart = gridH - copyH;

        for (let dy = 0; dy < copyH; dy++) {
          const oldY = oldYStart + dy;
          const newY = newYStart + dy;
          for (let x = 0; x < copyW; x++) {
            const oldIdx = oldY * oldW + x;
            const newIdx = newY * gridW + x;
            if (oldGrid[oldIdx]) {
              grid[newIdx] = oldGrid[oldIdx];
            }
          }
        }
      }
    };

    window.addEventListener("resize", handleResize);

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    clearCanvasRef.current = () => {
      grid.fill(0);
      if (buf32) buf32.fill(0);
      accumulatedPourMs = 0;
    };

    const getHarmoniousColor = (): number => {
      if (autoHueRef.current) {
        prismHue = (prismHue + 0.3) % 360;
        const h = prismHue;
        const s = 0.68;
        const l = isDarkRef.current ? 0.62 : 0.54;
        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
        const m = l - c / 2;
        let rP = 0, gP = 0, bP = 0;
        if (h < 60) { rP = c; gP = x; bP = 0; }
        else if (h < 120) { rP = x; gP = c; bP = 0; }
        else if (h < 180) { rP = 0; gP = c; bP = x; }
        else if (h < 240) { rP = 0; gP = x; bP = c; }
        else if (h < 300) { rP = x; gP = 0; bP = c; }
        else { rP = c; gP = 0; bP = x; }

        const r = Math.round((rP + m) * 255);
        const g = Math.round((gP + m) * 255);
        const b = Math.round((bP + m) * 255);
        return rgbToUint32(r, g, b);
      }

      const currentPaletteObj =
        PALETTES.find((p) => p.id === activePaletteRef.current) || PALETTES[0];
      const colors = currentPaletteObj.colors;
      const numColors = colors.length;
      const totalCycleMs = numColors * STEP_DURATION_MS;
      const cyclePosMs = accumulatedPourMs % totalCycleMs;

      const stepIndex = Math.floor(cyclePosMs / STEP_DURATION_MS);
      const timeInStep = cyclePosMs % STEP_DURATION_MS;

      const c1 = colors[stepIndex % numColors];
      const c2 = colors[(stepIndex + 1) % numColors];

      let r = c1.r;
      let g = c1.g;
      let b = c1.b;

      if (timeInStep >= HOLD_TIME_MS) {
        const t = (timeInStep - HOLD_TIME_MS) / TRANSITION_TIME_MS;
        const smoothT = 0.5 - 0.5 * Math.cos(Math.PI * t);

        r = Math.round(c1.r + (c2.r - c1.r) * smoothT);
        g = Math.round(c1.g + (c2.g - c1.g) * smoothT);
        b = Math.round(c1.b + (c2.b - c1.b) * smoothT);
      }

      // Silky-soft natural mineral micro-shimmer (±1.5 range)
      const noise = (Math.random() - 0.5) * 3.0;
      const finalR = Math.max(0, Math.min(255, Math.round(r + noise)));
      const finalG = Math.max(0, Math.min(255, Math.round(g + noise)));
      const finalB = Math.max(0, Math.min(255, Math.round(b + noise)));

      return rgbToUint32(finalR, finalG, finalB);
    };

    const pourSand = (deltaMs: number) => {
      if (!isPouring || gridW === 0 || gridH === 0) return;

      accumulatedPourMs += deltaMs;

      const gx = Math.floor(pointerX / CELL_SCALE);
      const gy = Math.floor(pointerY / CELL_SCALE);

      const size = brushSizeRef.current;
      const radius = size === "fine" ? 3.5 : size === "medium" ? 8.5 : 15.0;
      const count = size === "fine" ? 22 : size === "medium" ? 56 : 115;

      const grainColor = getHarmoniousColor();

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        // Soft gaussian density falloff towards stream edges
        const dist = Math.pow(Math.random(), 1.4) * radius;
        const px = Math.floor(gx + Math.cos(angle) * dist);
        const py = Math.floor(gy + Math.sin(angle) * dist);

        if (px >= 0 && px < gridW && py >= 0 && py < gridH) {
          const idx = py * gridW + px;
          if (grid[idx] === 0) {
            grid[idx] = grainColor;
          }
        }
      }
    };

    const updatePhysics = () => {
      if (gridW === 0 || gridH === 0) return;

      for (let y = gridH - 2; y >= 0; y--) {
        const sweepLeft = Math.random() > 0.5;
        const startX = sweepLeft ? gridW - 1 : 0;
        const endX = sweepLeft ? -1 : gridW;
        const stepX = sweepLeft ? -1 : 1;

        for (let x = startX; x !== endX; x += stepX) {
          const idx = y * gridW + x;
          const color = grid[idx];

          if (color !== 0) {
            const belowIdx = (y + 1) * gridW + x;

            if (grid[belowIdx] === 0) {
              grid[belowIdx] = color;
              grid[idx] = 0;
            } else {
              const leftOpen = x > 0 && grid[(y + 1) * gridW + (x - 1)] === 0;
              const rightOpen = x < gridW - 1 && grid[(y + 1) * gridW + (x + 1)] === 0;

              if (leftOpen && rightOpen) {
                const dir = Math.random() > 0.5 ? -1 : 1;
                grid[(y + 1) * gridW + (x + dir)] = color;
                grid[idx] = 0;
              } else if (leftOpen) {
                grid[(y + 1) * gridW + (x - 1)] = color;
                grid[idx] = 0;
              } else if (rightOpen) {
                grid[(y + 1) * gridW + (x + 1)] = color;
                grid[idx] = 0;
              }
            }
          }
        }
      }
    };

    const render = (now: number) => {
      if (!isVisible) {
        lastFrameTime = now;
        animationFrameId = 0;
        return;
      }

      const deltaMs = Math.min(now - lastFrameTime, 100);
      lastFrameTime = now;

      if (isPouring) {
        pourSand(deltaMs);
      }

      // 3 physics iterations for fluid, velvety cascading dune physics
      updatePhysics();
      updatePhysics();
      updatePhysics();

      if (imgData && buf32) {
        buf32.set(grid);
        ctx.putImageData(imgData, 0, 0);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const updatePointerCoords = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      pointerY = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
    };

    const onPointerDown = (e: PointerEvent) => {
      isPouring = true;
      setHasInteracted(true);
      updatePointerCoords(e);
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch {}
    };

    const onPointerMove = (e: PointerEvent) => {
      if (isPouring) {
        updatePointerCoords(e);
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      isPouring = false;
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {}
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId) {
          lastFrameTime = performance.now();
          animationFrameId = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    if (isVisible) {
      lastFrameTime = performance.now();
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  const handlePaletteSelect = useCallback((id: string) => {
    setActivePalette(id);
    setAutoHue(false);
  }, []);

  const handleClear = () => {
    if (clearCanvasRef.current) {
      clearCanvasRef.current();
    }
  };

  const currentPalObj = PALETTES.find((p) => p.id === activePalette) || PALETTES[0];

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden select-none transition-colors duration-300 ${
        isDark ? "bg-[#090A0B] text-white" : "bg-[#FAF8F5] text-[#1A1A1A]"
      }`}
    >
      {/* Top Floating Controls Bar */}
      <div className="absolute top-6 left-6 right-6 z-30 flex items-center justify-between pointer-events-none">
        {/* Top Left: Dark / Light Mode Toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          className={`pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono font-medium backdrop-blur-md border shadow-xs transition-all active:scale-95 cursor-pointer ${
            isDark
              ? "bg-white/10 hover:bg-white/15 text-white/90 border-white/15"
              : "bg-white/80 hover:bg-white text-[#1A1A1A] border-[#EAE6E1]"
          }`}
          title="Toggle Canvas Theme"
        >
          <span>{isDark ? "☀️" : "🌙"}</span>
          <span className="hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
        </button>

        {/* Top Right: Minimal Palette & Grain Size Menu */}
        <div className="relative pointer-events-auto">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-mono font-medium backdrop-blur-md border shadow-xs transition-all active:scale-95 cursor-pointer ${
              isDark
                ? "bg-white/10 hover:bg-white/15 text-white/90 border-white/15"
                : "bg-white/80 hover:bg-white text-[#1A1A1A] border-[#EAE6E1]"
            }`}
          >
            <span className="flex items-center -space-x-1">
              {autoHue ? (
                <span className="w-2.5 h-2.5 rounded-full bg-linear-to-r from-pink-500 via-amber-400 to-cyan-500" />
              ) : (
                currentPalObj.colors.slice(0, 3).map((col, i) => (
                  <span
                    key={i}
                    className="w-2.5 h-2.5 rounded-full border border-white/40"
                    style={{ backgroundColor: col.hex }}
                  />
                ))
              )}
            </span>
            <span className="font-semibold">{autoHue ? "Prism" : currentPalObj.name}</span>
            <span className="text-[9px] opacity-60">▾</span>
          </button>

          {/* Minimal Popover Menu */}
          {isMenuOpen && (
            <div
              className={`absolute right-0 top-10 mt-1 w-64 p-3.5 rounded-2xl backdrop-blur-xl border shadow-xl z-40 flex flex-col gap-3.5 transition-all animate-in fade-in zoom-in-95 duration-150 ${
                isDark
                  ? "bg-[#141618]/95 border-white/15 text-white"
                  : "bg-white/95 border-[#EAE6E1] text-[#1A1A1A]"
              }`}
            >
              {/* Palette Selection */}
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-2 font-semibold">
                  Palettes
                </div>
                <div className="flex flex-col gap-1">
                  {PALETTES.map((pal) => (
                    <button
                      key={pal.id}
                      onClick={() => handlePaletteSelect(pal.id)}
                      className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl text-[11px] font-mono transition-all cursor-pointer ${
                        activePalette === pal.id && !autoHue
                          ? isDark
                            ? "bg-white/15 font-bold text-white"
                            : "bg-[#1A1A1A] font-bold text-white"
                          : isDark
                          ? "hover:bg-white/10 text-neutral-300"
                          : "hover:bg-[#F4F1EC] text-neutral-600"
                      }`}
                    >
                      <span>{pal.name}</span>
                      <span className="flex items-center -space-x-1">
                        {pal.colors.slice(0, 4).map((col, i) => (
                          <span
                            key={i}
                            className="w-2.5 h-2.5 rounded-full border border-black/20"
                            style={{ backgroundColor: col.hex }}
                          />
                        ))}
                      </span>
                    </button>
                  ))}

                  {/* Prism spectrum */}
                  <button
                    onClick={() => {
                      setAutoHue(true);
                    }}
                    className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl text-[11px] font-mono transition-all cursor-pointer ${
                      autoHue
                        ? "bg-linear-to-r from-pink-500 via-amber-400 to-cyan-500 text-white font-bold"
                        : isDark
                        ? "hover:bg-white/10 text-neutral-300"
                        : "hover:bg-[#F4F1EC] text-neutral-600"
                    }`}
                  >
                    <span>🌈 Prism Shift</span>
                    <span className="text-[10px] opacity-80">Auto</span>
                  </button>
                </div>
              </div>

              {/* Grain Flow Size */}
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5 font-semibold">
                  Grain Size
                </div>
                <div className="flex items-center gap-1.5">
                  {(["fine", "medium", "thick"] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => setBrushSize(size)}
                      className={`flex-1 py-1 rounded-lg text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                        brushSize === size
                          ? isDark
                            ? "bg-white text-black font-bold"
                            : "bg-[#1A1A1A] text-white font-bold"
                          : isDark
                          ? "bg-white/5 hover:bg-white/10 text-neutral-400"
                          : "bg-[#F4F1EC] hover:bg-[#EAE6E1] text-neutral-600"
                      }`}
                    >
                      {size === "fine" ? "S" : size === "medium" ? "M" : "L"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Canvas */}
              <button
                onClick={() => {
                  handleClear();
                  setIsMenuOpen(false);
                }}
                className={`w-full py-1.5 rounded-xl text-[11px] font-mono transition-all active:scale-95 cursor-pointer border ${
                  isDark
                    ? "border-white/10 hover:bg-red-500/20 text-red-400 hover:border-red-500/30"
                    : "border-[#EAE6E1] hover:bg-red-50 text-red-600 hover:border-red-200"
                }`}
              >
                ↺ Clear Canvas
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Full-bleed Canvas Container: Sand falls all the way down to bottom baseline */}
      <div className="relative w-full h-[85vh] min-h-[480px] max-h-[860px] cursor-crosshair overflow-hidden touch-none">
        <canvas
          ref={canvasRef}
          className="block w-full h-full"
          style={{ imageRendering: "pixelated" }}
        />

        {/* First Interaction Prompt */}
        {!hasInteracted && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className={`px-5 py-2.5 rounded-full backdrop-blur-md border shadow-lg animate-bounce text-[12px] font-mono font-medium tracking-wider uppercase ${
                isDark
                  ? "bg-black/60 border-white/15 text-white/90"
                  : "bg-white/80 border-[#EAE6E1] text-[#1A1A1A]"
              }`}
            >
              Click &amp; Drag To Pour Sand
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
