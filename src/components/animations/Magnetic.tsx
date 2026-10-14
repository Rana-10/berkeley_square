"use client";

import { type ReactNode, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
  enabled?: boolean;
}

export function Magnetic({
  children,
  strength = 0.28,
  className = "",
  enabled = true
}: MagneticProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const [pos, setPos] = useState({ x: 0, y: 0, isHovered: false });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current || reduceMotion || !enabled) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (e.clientX - centerX) * strength;
    const distanceY = (e.clientY - centerY) * strength;

    setPos({ x: distanceX, y: distanceY, isHovered: true });
  }

  function handleMouseLeave() {
    if (reduceMotion || !enabled) return;
    setPos({ x: 0, y: 0, isHovered: false });
  }

  if (reduceMotion || !enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: pos.isHovered ? `translate3d(${pos.x}px, ${pos.y}px, 0)` : undefined,
        transition: pos.isHovered ? "transform 0.1s ease-out" : "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
        willChange: pos.isHovered ? "transform" : "auto"
      }}
      className={`inline-block ${className}`}
    >
      {children}
    </div>
  );
}
