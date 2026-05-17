"use client";

import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 130;
const MAX_DISTANCE   = 160;
const SPEED          = 0.45;

export default function NeuralBackground({ opacity = 0.18, fixed = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    /* ── Particles ── */
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x:    Math.random() * canvas.width,
      y:    Math.random() * canvas.height,
      vx:   (Math.random() - 0.5) * SPEED,
      vy:   (Math.random() - 0.5) * SPEED,
      size: Math.random() * 1.8 + 0.8,
    }));

    let raf;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* update positions */
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height)  p.vy *= -1;
      }

      /* draw connections */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > MAX_DISTANCE) continue;

          const alpha = (1 - dist / MAX_DISTANCE) * 0.45;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 153, 255, ${alpha})`;
          ctx.lineWidth   = 0.6;
          ctx.stroke();
        }
      }

      /* draw nodes */
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(72, 202, 228, 0.75)";
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position:      fixed ? "fixed" : "absolute",
        inset:         0,
        width:         "100%",
        height:        "100%",
        opacity,
        zIndex:        fixed ? 0 : undefined,
        pointerEvents: "none",
      }}
    />
  );
}
