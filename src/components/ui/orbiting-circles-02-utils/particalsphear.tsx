"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  color: string;
}

export default function ParticleSphereAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = canvas.width;
    let height = canvas.height;

    const setSize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = parent.clientWidth;
        height = parent.clientHeight;
        canvas.width = width;
        canvas.height = height;
      }
    };
    setSize();
    window.addEventListener("resize", setSize);

    // Generate 3D particles on a sphere surface
    const numParticles = 180;
    const particles: Particle[] = [];
    const radius = Math.min(width, height) * 0.38;

    for (let i = 0; i < numParticles; i++) {
      const theta = Math.acos(Math.random() * 2 - 1); // 0 to PI
      const phi = Math.random() * 2 * Math.PI;       // 0 to 2PI

      // Spherical to Cartesian coordinates
      particles.push({
        x: radius * Math.sin(theta) * Math.cos(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(theta),
        color: i % 3 === 0 ? "rgba(100, 23, 45, 0.75)" : "rgba(0, 0, 0, 0.4)", // Theme accents and black/gray particles
      });
    }

    let angleX = 0.0015;
    let angleY = 0.003;

    // Projection calculation
    const project = (x: number, y: number, z: number) => {
      const fov = 400;
      const distance = 400;
      const scale = fov / (distance + z);
      return {
        x: width / 2 + x * scale,
        y: height / 2 + y * scale,
        size: Math.max(1, 2.8 * scale),
        alpha: Math.min(1, Math.max(0.1, (distance - z) / (distance * 1.5))),
      };
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Sort by depth (z) to render back-to-front (painter's algorithm)
      particles.sort((a, b) => b.z - a.z);

      // Rotate and draw
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      particles.forEach((p) => {
        // Rotate X
        let y1 = p.y * cosX - p.z * sinX;
        let z1 = p.z * cosX + p.y * sinX;

        // Rotate Y
        let x2 = p.x * cosY - z1 * sinY;
        let z2 = z1 * cosY + p.x * sinY;

        p.x = x2;
        p.y = y1;
        p.z = z2;

        const proj = project(p.x, p.y, p.z);

        ctx.beginPath();
        ctx.arc(proj.x, proj.y, proj.size, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = proj.alpha;
        ctx.fill();
      });

      ctx.globalAlpha = 1.0;
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", setSize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}
