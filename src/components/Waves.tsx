"use client";

import { useRef, useEffect, useCallback, useState } from 'react';
import Link from 'next/link';

/**
 * Perlin Noise Generator
 */
class Noise {
    p: Uint8Array;
    seed: number;
    grad3: number[][];

    constructor(seed: number) {
        this.p = new Uint8Array(512);
        this.seed = seed > 0 && seed < 1 ? seed : Math.random();
        this.grad3 = [
            [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
            [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
            [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]
        ];
        this.init(this.seed);
    }

    init(seed: number) {
        let i, j, k;
        const p = new Uint8Array(256);
        for (i = 0; i < 256; i++) {
            p[i] = i;
        }
        for (i = 0; i < 256; i++) {
            j = Math.floor(seed * (i + 1)) % 256;
            k = p[i];
            p[i] = p[j];
            p[j] = k;
        }
        for (i = 0; i < 512; i++) {
            this.p[i] = p[i & 255];
        }
    }

    dot(g: number[], x: number, y: number) {
        return g[0] * x + g[1] * y;
    }

    perlin2(x: number, y: number) {
        const X = Math.floor(x) & 255;
        const Y = Math.floor(y) & 255;
        x -= Math.floor(x);
        y -= Math.floor(y);
        const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
        const u = fade(x);
        const v = fade(y);
        const p = this.p;
        const grad3 = this.grad3;
        const n00 = this.dot(grad3[p[X + p[Y]] % 12], x, y);
        const n01 = this.dot(grad3[p[X + p[Y + 1]] % 12], x, y - 1);
        const n10 = this.dot(grad3[p[X + 1 + p[Y]] % 12], x - 1, y);
        const n11 = this.dot(grad3[p[X + 1 + p[Y + 1]] % 12], x - 1, y - 1);
        const lerp = (a: number, b: number, x: number) => a + x * (b - a);
        return lerp(lerp(n00, n10, u), lerp(n01, n11, u), v);
    }
}

interface Point {
    angle: number;
    r: number;
    wave: { x: number; y: number };
    cursor: { x: number; y: number; vx: number; vy: number };
}

interface MouseState {
    x: number;
    y: number;
    lx: number;
    ly: number;
    sx: number;
    sy: number;
    v: number;
    vs: number;
    a: number;
    set: boolean;
}

interface AnimationState {
    ctx: CanvasRenderingContext2D | null;
    mouse: MouseState;
    lines: Point[][];
    noise: Noise;
    bounding: DOMRect | null;
    animationFrameId: number | null;
    lineColor: string;
}

/**
 * Configuration for the polar wave animation.
 */
const animationConfig = {
    // Polar Grid settings
    NUM_RADIAL_LINES: 80,       // Number of lines radiating from the circle
    POINTS_PER_LINE: 16,        // Spacing detail along each ray
    CIRCLE_BASE_RADIUS: 80,     // Stays exactly at circle boundary

    // Perlin noise wave settings
    WAVE_TIME_X_FACTOR: 0.015,
    WAVE_NOISE_X_FACTOR: 0.003,
    WAVE_TIME_Y_FACTOR: 0.008,
    WAVE_NOISE_Y_FACTOR: 0.002,
    WAVE_NOISE_MAGNITUDE: 15,
    WAVE_AMPLITUDE_X: 18,
    WAVE_AMPLITUDE_Y: 18,

    // Mouse interaction settings
    MOUSE_INFLUENCE_RADIUS: 160,
    MOUSE_FALLOFF_FACTOR: 0.0012,
    MOUSE_FORCE_FACTOR: 0.0007,
    MOUSE_SMOOTHING_FACTOR: 0.1,
    MAX_MOUSE_VELOCITY: 80,

    // Point physics settings
    TENSION_STRENGTH: 0.006,
    FRICTION: 0.91,
    CURSOR_DISPLACEMENT_STRENGTH: 2.2,
    MAX_CURSOR_DISPLACEMENT: 90,
};

const Waves = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const circleRef = useRef<HTMLAnchorElement>(null);

    const [circleOffset, setCircleOffset] = useState({ x: 0, y: 0 });
    const [circleHovered, setCircleHovered] = useState(false);

    const animationState = useRef<AnimationState>({
        ctx: null,
        mouse: { x: -10, y: 0, lx: 0, ly: 0, sx: 0, sy: 0, v: 0, vs: 0, a: 0, set: false },
        lines: [],
        noise: new Noise(0.5),
        bounding: null,
        animationFrameId: null,
        lineColor: 'rgba(255, 255, 255, 0.35)',
    });

    const circleOffsetRef = useRef({ x: 0, y: 0 });
    useEffect(() => {
        circleOffsetRef.current = circleOffset;
    }, [circleOffset]);

    // Calculate dynamic coordinates of a point based on polar data, wave, and cursor forces
    const moved = useCallback((point: Point, centerX: number, centerY: number, withCursorForce = true) => {
        // Base polar coordinates centered on the dynamic circle position
        const baseX = centerX + Math.cos(point.angle) * point.r;
        const baseY = centerY + Math.sin(point.angle) * point.r;

        const coords = {
            x: baseX + point.wave.x + (withCursorForce ? point.cursor.x : 0),
            y: baseY + point.wave.y + (withCursorForce ? point.cursor.y : 0)
        };
        coords.x = Math.round(coords.x * 10) / 10;
        coords.y = Math.round(coords.y * 10) / 10;
        return coords;
    }, []);

    useEffect(() => {
        const state = animationState.current;
        const canvas = canvasRef.current;
        if (!canvas) return;
        state.ctx = canvas.getContext('2d');
        const container = containerRef.current;
        if (!container) return;

        const setSize = () => {
            state.bounding = container.getBoundingClientRect();
            canvas.width = state.bounding.width;
            canvas.height = state.bounding.height;
        };

        const setLines = () => {
            if (!state.bounding) return;
            const { width, height } = state.bounding;
            state.lines = [];

            const { NUM_RADIAL_LINES, POINTS_PER_LINE, CIRCLE_BASE_RADIUS } = animationConfig;

            // Outer bounding radius of canvas
            const maxRadius = Math.max(width, height) * 0.85;
            const radiusGap = (maxRadius - CIRCLE_BASE_RADIUS) / POINTS_PER_LINE;

            for (let i = 0; i < NUM_RADIAL_LINES; i++) {
                const points: Point[] = [];
                const angle = (i / NUM_RADIAL_LINES) * 2 * Math.PI;

                for (let j = 0; j <= POINTS_PER_LINE; j++) {
                    const r = CIRCLE_BASE_RADIUS + j * radiusGap;
                    points.push({
                        angle,
                        r,
                        wave: { x: 0, y: 0 },
                        cursor: { x: 0, y: 0, vx: 0, vy: 0 }
                    });
                }
                state.lines.push(points);
            }
        };

        const movePoints = (time: number) => {
            const { lines, mouse, noise, bounding } = state;
            const {
                WAVE_TIME_X_FACTOR, WAVE_NOISE_X_FACTOR, WAVE_TIME_Y_FACTOR, WAVE_NOISE_Y_FACTOR,
                WAVE_NOISE_MAGNITUDE, WAVE_AMPLITUDE_X, WAVE_AMPLITUDE_Y, MOUSE_INFLUENCE_RADIUS,
                MOUSE_FALLOFF_FACTOR, MOUSE_FORCE_FACTOR, TENSION_STRENGTH, FRICTION,
                CURSOR_DISPLACEMENT_STRENGTH, MAX_CURSOR_DISPLACEMENT
            } = animationConfig;

            const centerX = bounding ? bounding.width / 2 + circleOffsetRef.current.x : 0;
            const centerY = bounding ? bounding.height / 2 + circleOffsetRef.current.y : 0;

            lines.forEach((points) => {
                points.forEach((p, idx) => {
                    const baseX = centerX + Math.cos(p.angle) * p.r;
                    const baseY = centerY + Math.sin(p.angle) * p.r;

                    // 1. Calculate wave noise displacement
                    const noiseInputX = (baseX + time * WAVE_TIME_X_FACTOR) * WAVE_NOISE_X_FACTOR;
                    const noiseInputY = (baseY + time * WAVE_TIME_Y_FACTOR) * WAVE_NOISE_Y_FACTOR;
                    const move = noise.perlin2(noiseInputX, noiseInputY) * WAVE_NOISE_MAGNITUDE;

                    // Anchor wave effect: first points at circle boundary have minimal waving to remain attached
                    const anchorFactor = Math.min(1, idx / 3);
                    p.wave.x = Math.cos(move) * WAVE_AMPLITUDE_X * anchorFactor;
                    p.wave.y = Math.sin(move) * WAVE_AMPLITUDE_Y * anchorFactor;

                    // 2. Mouse interaction physics
                    const dx = baseX - mouse.sx;
                    const dy = baseY - mouse.sy;
                    const d = Math.hypot(dx, dy);
                    const influenceRadius = Math.max(MOUSE_INFLUENCE_RADIUS, mouse.vs);

                    if (d < influenceRadius) {
                        const falloff = 1 - d / influenceRadius;
                        const force = Math.cos(d * MOUSE_FALLOFF_FACTOR) * falloff;
                        const forceFactor = force * influenceRadius * mouse.vs * MOUSE_FORCE_FACTOR * anchorFactor;
                        p.cursor.vx += Math.cos(mouse.a) * forceFactor;
                        p.cursor.vy += Math.sin(mouse.a) * forceFactor;
                    }

                    // 3. Velocity and displacement calculations
                    p.cursor.vx += (0 - p.cursor.x) * TENSION_STRENGTH;
                    p.cursor.vy += (0 - p.cursor.y) * TENSION_STRENGTH;
                    p.cursor.vx *= FRICTION;
                    p.cursor.vy *= FRICTION;
                    p.cursor.x += p.cursor.vx * CURSOR_DISPLACEMENT_STRENGTH;
                    p.cursor.y += p.cursor.vy * CURSOR_DISPLACEMENT_STRENGTH;
                    p.cursor.x = Math.min(MAX_CURSOR_DISPLACEMENT, Math.max(-MAX_CURSOR_DISPLACEMENT, p.cursor.x));
                    p.cursor.y = Math.min(MAX_CURSOR_DISPLACEMENT, Math.max(-MAX_CURSOR_DISPLACEMENT, p.cursor.y));
                });
            });
        };

        const drawLines = () => {
            const { ctx, bounding, lines } = state;
            if (!bounding || !ctx) return;

            const centerX = bounding.width / 2 + circleOffsetRef.current.x;
            const centerY = bounding.height / 2 + circleOffsetRef.current.y;

            ctx.clearRect(0, 0, bounding.width, bounding.height);
            ctx.beginPath();
            ctx.strokeStyle = state.lineColor;
            ctx.lineWidth = 0.5;

            lines.forEach((points) => {
                // Lines originate exactly from the boundary of the floating circle (first point)
                const p1 = moved(points[0], centerX, centerY, false);
                ctx.moveTo(p1.x, p1.y);

                for (let i = 0; i < points.length - 1; i++) {
                    const currentPoint = moved(points[i], centerX, centerY, true);
                    const nextPoint = moved(points[i + 1], centerX, centerY, true);
                    const xc = (currentPoint.x + nextPoint.x) / 2;
                    const yc = (currentPoint.y + nextPoint.y) / 2;
                    ctx.quadraticCurveTo(currentPoint.x, currentPoint.y, xc, yc);
                }
            });
            ctx.stroke();
        };

        const tick = (time: number) => {
            const { mouse } = state;
            const { MOUSE_SMOOTHING_FACTOR, MAX_MOUSE_VELOCITY } = animationConfig;

            mouse.sx += (mouse.x - mouse.sx) * MOUSE_SMOOTHING_FACTOR;
            mouse.sy += (mouse.y - mouse.sy) * MOUSE_SMOOTHING_FACTOR;

            const dx = mouse.sx - mouse.lx;
            const dy = mouse.sy - mouse.ly;
            const d = Math.hypot(dx, dy);

            mouse.v = d;
            mouse.vs += (d - mouse.vs) * MOUSE_SMOOTHING_FACTOR;
            mouse.vs = Math.min(MAX_MOUSE_VELOCITY, mouse.vs);
            mouse.a = Math.atan2(dy, dx);

            mouse.lx = mouse.sx;
            mouse.ly = mouse.sy;

            container.style.setProperty("--x", `${mouse.sx}px`);
            container.style.setProperty("--y", `${mouse.sy}px`);

            movePoints(time);
            drawLines();

            state.animationFrameId = requestAnimationFrame(tick);
        };

        const updateMousePosition = (clientX: number, clientY: number) => {
            if (!container) return;
            const rect = container.getBoundingClientRect();
            const { mouse } = state;
            mouse.x = clientX - rect.left;
            mouse.y = clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const dx = mouse.x - centerX;
            const dy = mouse.y - centerY;
            const dist = Math.hypot(dx, dy);

            if (dist < 180) {
                setCircleOffset({ x: dx * 0.18, y: dy * 0.18 });
                setCircleHovered(true);

                if (circleRef.current && dist < 70) {
                    const circleRect = circleRef.current.getBoundingClientRect();
                    window.dispatchEvent(new CustomEvent("cursor-snap", {
                        detail: {
                            x: circleRect.left + circleRect.width / 2,
                            y: circleRect.top + circleRect.height / 2
                        }
                    }));
                }
            } else {
                setCircleOffset({ x: 0, y: 0 });
                setCircleHovered(false);
                window.dispatchEvent(new CustomEvent("cursor-snap", { detail: null }));
            }

            if (!mouse.set) {
                mouse.sx = mouse.x;
                mouse.sy = mouse.y;
                mouse.lx = mouse.x;
                mouse.ly = mouse.y;
                mouse.set = true;
            }
        };

        const onResize = () => { setSize(); setLines(); };
        const onMouseMove = (e: MouseEvent) => { updateMousePosition(e.clientX, e.clientY); };
        const onTouchMove = (e: TouchEvent) => {
            updateMousePosition(e.touches[0].clientX, e.touches[0].clientY);
        };

        const onMouseLeave = () => {
            setCircleOffset({ x: 0, y: 0 });
            setCircleHovered(false);
            window.dispatchEvent(new CustomEvent("cursor-snap", { detail: null }));
        };

        setSize();
        setLines();

        window.addEventListener("resize", onResize);
        window.addEventListener("mousemove", onMouseMove);
        container.addEventListener("touchmove", onTouchMove, { passive: false });
        container.addEventListener("mouseleave", onMouseLeave);

        state.animationFrameId = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener("resize", onResize);
            window.removeEventListener("mousemove", onMouseMove);
            container.removeEventListener("touchmove", onTouchMove);
            container.removeEventListener("mouseleave", onMouseLeave);
            if (state.animationFrameId) {
                cancelAnimationFrame(state.animationFrameId);
            }
        };
    }, [moved]);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[60vh] md:h-[70vh] bg-black overflow-hidden flex items-center justify-center select-none"
        >
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

            {/* Center All Work Badge */}
            <Link
                href="/all-work"
                ref={circleRef}
                className="relative z-10 w-36 h-36 md:w-40 md:h-40 rounded-full border border-white/20 bg-black flex items-center justify-center cursor-pointer select-none transition-all duration-300 ease-out shadow-[0_0_50px_rgba(0,0,0,0.8)] pointer-events-auto"
                style={{
                    transform: `translate3d(${circleOffset.x}px, ${circleOffset.y}px, 0) scale(${circleHovered ? 1.1 : 1})`,
                    borderColor: circleHovered ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.2)'
                }}
            >
                <span className="font-sans text-white text-[11px] md:text-[12px] font-semibold tracking-[0.25em] uppercase text-center pl-[0.25em]">
                    All Work
                </span>
            </Link>
        </div>
    );
};

export default Waves;
