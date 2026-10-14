"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  z: number;
  radius: number;
  baseAlpha: number;
  phase: number;
  pulseSpeed: number;
  dispX: number;
  dispY: number;
  projX: number;
  projY: number;
  alpha: number;
}

interface Trail {
  startX: number;
  startY: number;
  controlX1: number;
  controlY1: number;
  controlX2: number;
  controlY2: number;
  endX: number;
  endY: number;
  progress: number;
  speed: number;
  length: number;
  width: number;
  color: string;
  glowColor: string;
  opacity: number;
  trailHistory: { x: number; y: number }[];
  maxHistory: number;
  delay: number;
}

interface CursorPoint {
  x: number;
  y: number;
  age: number;
  width: number;
}

export function UnifiedAmbientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let lastTime = performance.now();
    let isRunning = true;

    // Reduced motion check
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const lowPowerMode = isCoarsePointer || window.innerWidth < 768;

    // Mouse & Parallax State
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 140,
      active: false,
      idleTime: 0
    };

    // Pre-allocated ring buffer / point array for cursor trail
    const maxCursorPoints = 25;
    const cursorTrail: CursorPoint[] = [];

    const parallax = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0
    };

    function resize() {
      if (!canvas || !ctx) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Hardware Pointer Move
    function handlePointerMove(e: PointerEvent) {
      if (mouse.x > -500) {
        const dx = e.clientX - mouse.x;
        const dy = e.clientY - mouse.y;
        const speed = Math.hypot(dx, dy);

        if (speed > 1.2) {
          cursorTrail.unshift({
            x: e.clientX,
            y: e.clientY,
            age: 0,
            width: Math.min(Math.max(speed * 0.1, 1.8), 3.8)
          });
          if (cursorTrail.length > maxCursorPoints) {
            cursorTrail.pop();
          }
        }
      }

      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
      mouse.idleTime = 0;

      parallax.targetX = (e.clientX / width - 0.5) * 35;
      parallax.targetY = (e.clientY / height - 0.5) * 35;
    }

    function handlePointerLeave() {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
      parallax.targetX = 0;
      parallax.targetY = 0;
    }

    if (!isCoarsePointer) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
    }
    document.addEventListener("mouseleave", handlePointerLeave);

    // --- 1. PARTICLE NETWORK INITIALIZATION (Fixed Pool) ---
    const nodeCount = lowPowerMode
      ? Math.max(14, Math.min(Math.floor((width * height) / 60000), 22))
      : Math.max(20, Math.min(Math.floor((width * height) / 40000), 36));

    const nodes: Node[] = new Array(nodeCount);

    for (let i = 0; i < nodeCount; i++) {
      const z = Math.random() * 0.8 + 0.35;
      nodes[i] = {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3 * z,
        vy: (Math.random() - 0.5) * 0.3 * z,
        z,
        radius: (Math.random() * 1.6 + 0.9) * z,
        baseAlpha: Math.random() * 0.3 + 0.18,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.012,
        dispX: 0,
        dispY: 0,
        projX: 0,
        projY: 0,
        alpha: 0
      };
    }

    // --- 2. LIGHT TRAILS INITIALIZATION ---
    function getBezierPoint(
      t: number,
      p0: { x: number; y: number },
      p1: { x: number; y: number },
      p2: { x: number; y: number },
      p3: { x: number; y: number }
    ) {
      const u = 1 - t;
      const tt = t * t;
      const uu = u * u;
      const uuu = uu * u;
      const ttt = tt * t;

      return {
        x: uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x,
        y: uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y
      };
    }

    function createTrail(initialDelay = 0): Trail {
      const angleMode = Math.random();
      let startX: number, startY: number, endX: number, endY: number;
      let controlX1: number, controlY1: number, controlX2: number, controlY2: number;

      if (angleMode < 0.5) {
        startX = -120 - Math.random() * 150;
        startY = Math.random() * height * 0.55;
        endX = width + 140 + Math.random() * 150;
        endY = height * 0.35 + Math.random() * height * 0.65;

        controlX1 = width * (0.25 + Math.random() * 0.15);
        controlY1 = startY - 60 + Math.random() * 140;
        controlX2 = width * (0.65 + Math.random() * 0.15);
        controlY2 = endY - 80 + Math.random() * 180;
      } else {
        startX = -140 - Math.random() * 100;
        startY = height * (0.15 + Math.random() * 0.4);
        endX = width + 160;
        endY = height * (0.15 + Math.random() * 0.5);

        controlX1 = width * 0.35;
        controlY1 = startY - 40 + Math.random() * 100;
        controlX2 = width * 0.7;
        controlY2 = endY + 40 + Math.random() * 80;
      }

      const speed = 0.0022 + Math.random() * 0.0024;
      const isHeroTrail = Math.random() > 0.55;

      return {
        startX,
        startY,
        controlX1,
        controlY1,
        controlX2,
        controlY2,
        endX,
        endY,
        progress: -initialDelay,
        speed,
        length: isHeroTrail ? 0.34 + Math.random() * 0.12 : 0.22 + Math.random() * 0.1,
        width: isHeroTrail ? 2.4 + Math.random() * 1.4 : 1.3 + Math.random() * 1.2,
        color: isHeroTrail ? "rgba(255, 95, 115, 0.95)" : "rgba(225, 18, 45, 0.85)",
        glowColor: isHeroTrail ? "rgba(225, 18, 45, 0.5)" : "rgba(180, 10, 30, 0.3)",
        opacity: isHeroTrail ? 0.85 : 0.5,
        trailHistory: [],
        maxHistory: 30,
        delay: initialDelay
      };
    }

    const trailCount = lowPowerMode ? 2 : 3;
    const trails: Trail[] = Array.from({ length: trailCount }, (_, index) => createTrail(index * 0.45));

    // --- 3. MAIN HARDWARE-ACCELERATED RENDER LOOP ---
    function render(currentTime: number) {
      if (!isRunning || !ctx) return;

      const delta = Math.min((currentTime - lastTime) / 1000, 0.05);
      lastTime = currentTime;

      parallax.x += (parallax.targetX - parallax.x) * 0.08;
      parallax.y += (parallax.targetY - parallax.y) * 0.08;

      mouse.idleTime += delta;
      const idleSwayX = Math.sin(currentTime * 0.0008) * 8;
      const idleSwayY = Math.cos(currentTime * 0.0006) * 6;
      const effectiveParallaxX = parallax.x + idleSwayX;
      const effectiveParallaxY = parallax.y + idleSwayY;

      ctx.clearRect(0, 0, width, height);

      // ==========================================
      // SECTION A: MOUSE LIGHT TRAIL (BATCHED & SMOOTH)
      // ==========================================
      ctx.globalCompositeOperation = "lighter";

      // Age cursor points
      for (let i = cursorTrail.length - 1; i >= 0; i--) {
        cursorTrail[i].age += delta * 3.4;
        if (cursorTrail[i].age >= 1) {
          cursorTrail.splice(i, 1);
        }
      }

      if (cursorTrail.length > 1) {
        for (let i = 0; i < cursorTrail.length - 1; i++) {
          const pA = cursorTrail[i];
          const pB = cursorTrail[i + 1];
          const alpha = Math.max(0, 1 - pA.age);

          // Outer soft glow
          ctx.beginPath();
          ctx.moveTo(pA.x, pA.y);
          ctx.lineTo(pB.x, pB.y);
          ctx.strokeStyle = `rgba(225, 18, 45, ${alpha * 0.4})`;
          ctx.lineWidth = Math.max(1, pA.width * alpha);
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.stroke();

          // Inner laser core
          ctx.beginPath();
          ctx.moveTo(pA.x, pA.y);
          ctx.lineTo(pB.x, pB.y);
          ctx.strokeStyle = `rgba(255, 210, 220, ${alpha * 0.8})`;
          ctx.lineWidth = Math.max(0.7, pA.width * 0.35 * alpha);
          ctx.stroke();
        }
      }

      // ==========================================
      // SECTION B: PARTICLE NETWORK MESH (BATCHED)
      // ==========================================
      for (let i = 0; i < nodeCount; i++) {
        const node = nodes[i];

        node.x += node.vx;
        node.y += node.vy;
        node.phase += node.pulseSpeed;

        if (node.x < -30) node.x = width + 30;
        if (node.x > width + 30) node.x = -30;
        if (node.y < -30) node.y = height + 30;
        if (node.y > height + 30) node.y = -30;

        if (mouse.x > -200) {
          const mdx = node.x - mouse.x;
          const mdy = node.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < mouse.radius && mdist > 0) {
            const force = (1 - mdist / mouse.radius) * 10 * node.z;
            node.dispX += (mdx / mdist) * force * 0.1;
            node.dispY += (mdy / mdist) * force * 0.1;
          }
        }

        node.dispX *= 0.92;
        node.dispY *= 0.92;

        node.projX = node.x + node.dispX + effectiveParallaxX * node.z;
        node.projY = node.y + node.dispY + effectiveParallaxY * node.z;

        const pulse = 0.75 + 0.25 * Math.sin(node.phase);
        let alpha = node.baseAlpha * pulse;

        if (mouse.x > -200) {
          const mDist = Math.hypot(node.projX - mouse.x, node.projY - mouse.y);
          if (mDist < mouse.radius) {
            alpha += (1 - mDist / mouse.radius) * 0.4;
          }
        }

        node.alpha = Math.min(alpha, 0.85);
      }

      // Batched Constellation Lines
      const maxConnectDist = lowPowerMode ? 85 : 115;
      ctx.beginPath();
      for (let i = 0; i < nodeCount; i++) {
        const nA = nodes[i];
        for (let j = i + 1; j < nodeCount; j++) {
          const nB = nodes[j];
          const dx = nA.projX - nB.projX;
          const dy = nA.projY - nB.projY;
          const distSq = dx * dx + dy * dy;
          const scaledMaxDist = maxConnectDist * ((nA.z + nB.z) * 0.5);

          if (distSq < scaledMaxDist * scaledMaxDist) {
            ctx.moveTo(nA.projX, nA.projY);
            ctx.lineTo(nB.projX, nB.projY);
          }
        }
      }
      ctx.strokeStyle = "rgba(225, 18, 45, 0.14)";
      ctx.lineWidth = 0.75;
      ctx.stroke();

      // Batched Particle Nodes Drawing
      ctx.beginPath();
      for (let i = 0; i < nodeCount; i++) {
        const pn = nodes[i];
        ctx.moveTo(pn.projX + pn.radius, pn.projY);
        ctx.arc(pn.projX, pn.projY, pn.radius, 0, Math.PI * 2);
      }
      ctx.fillStyle = "rgba(255, 150, 170, 0.75)";
      ctx.fill();

      // ==========================================
      // SECTION C: ANIMATED SWEEPING RED LIGHT TRAILS
      // ==========================================
      for (let i = 0; i < trails.length; i++) {
        const trail = trails[i];
        trail.progress += trail.speed * (delta * 60);

        if (trail.progress > 1 + trail.length) {
          trails[i] = createTrail(Math.random() * 0.35);
          continue;
        }

        if (trail.progress < 0) continue;

        const p0 = { x: trail.startX, y: trail.startY };
        const p1 = { x: trail.controlX1, y: trail.controlY1 };
        const p2 = { x: trail.controlX2, y: trail.controlY2 };
        const p3 = { x: trail.endX, y: trail.endY };

        const headT = Math.min(Math.max(trail.progress, 0), 1);
        const headBase = getBezierPoint(headT, p0, p1, p2, p3);

        const headPos = {
          x: headBase.x + effectiveParallaxX * 0.45,
          y: headBase.y + effectiveParallaxY * 0.45
        };

        trail.trailHistory.unshift({ x: headPos.x, y: headPos.y });
        if (trail.trailHistory.length > trail.maxHistory) {
          trail.trailHistory.pop();
        }

        const tailT = Math.max(0, trail.progress - trail.length);
        const segments = 14;

        ctx.beginPath();
        for (let j = 0; j <= segments; j++) {
          const t = tailT + (headT - tailT) * (j / segments);
          if (t < 0 || t > 1) continue;
          const pt = getBezierPoint(t, p0, p1, p2, p3);
          const px = pt.x + effectiveParallaxX * 0.45;
          const py = pt.y + effectiveParallaxY * 0.45;

          if (j === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }

        if (trail.trailHistory.length > 2) {
          ctx.strokeStyle = trail.color;
          ctx.lineWidth = trail.width;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.stroke();

          // Intense core filament pass
          ctx.beginPath();
          for (let j = 0; j <= segments; j++) {
            const t = tailT + (headT - tailT) * (j / segments);
            if (t < 0 || t > 1) continue;
            const pt = getBezierPoint(t, p0, p1, p2, p3);
            const px = pt.x + effectiveParallaxX * 0.45;
            const py = pt.y + effectiveParallaxY * 0.45;
            if (j === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.strokeStyle = "rgba(255, 240, 245, 0.9)";
          ctx.lineWidth = Math.max(1, trail.width * 0.4);
          ctx.stroke();
        }
      }

      ctx.globalCompositeOperation = "source-over";
      animationFrameId = requestAnimationFrame(render);
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        isRunning = true;
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(render);
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div
      suppressHydrationWarning
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ opacity: 0.95 }}
    >
      <canvas suppressHydrationWarning ref={canvasRef} className="absolute inset-0 block h-full w-full" />
    </div>
  );
}
