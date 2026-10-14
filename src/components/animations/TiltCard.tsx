"use client";

import { useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
  scale?: number;
  onClick?: () => void;
}

export function TiltCard({
  children,
  className,
  maxTilt = 10,
  glare = true,
  scale = 1.02,
  onClick
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();

  const [tilt, setTilt] = useState({ x: 0, y: 0, scaleVal: 1, isHovered: false });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current || reduceMotion) return;

    const rect = cardRef.current.getBoundingClientRect();
    const currentMouseX = e.clientX - rect.left;
    const currentMouseY = e.clientY - rect.top;

    const normX = currentMouseX / rect.width - 0.5;
    const normY = currentMouseY / rect.height - 0.5;

    setTilt({
      x: -normY * maxTilt,
      y: normX * maxTilt,
      scaleVal: scale,
      isHovered: true
    });

    if (glare) {
      setGlarePos({
        x: (normX + 0.5) * 100,
        y: (normY + 0.5) * 100,
        opacity: 1
      });
    }
  }

  function handleMouseLeave() {
    if (reduceMotion) return;
    setTilt({ x: 0, y: 0, scaleVal: 1, isHovered: false });
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  }

  return (
    <div className="perspective-1000 h-full w-full" suppressHydrationWarning>
      <div
        ref={cardRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        suppressHydrationWarning
        style={{
          transform: tilt.isHovered
            ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${tilt.scaleVal})`
            : undefined,
          transition: tilt.isHovered ? "transform 0.1s ease-out" : "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
          willChange: tilt.isHovered ? "transform" : "auto",
          transformStyle: "preserve-3d"
        }}
        className={cn(
          "group relative h-full overflow-hidden rounded-2xl border border-white/[0.09] bg-gradient-to-br from-[#15151c]/90 via-[#0e0e13]/90 to-[#08080b]/90 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_18px_45px_rgba(0,0,0,0.7)] backdrop-blur-2xl transition-colors duration-300 hover:border-slate-300/35 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_25px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(225,18,45,0.15)] [html.light_&]:bg-white [html.light_&]:bg-none [html.light_&]:border-[#E4DFD4] [html.light_&]:shadow-[0_10px_30px_rgba(24,24,24,0.04)] [html.light_&]:hover:border-slate-400/40 [html.light_&]:hover:shadow-[0_20px_45px_rgba(24,24,24,0.07),0_0_20px_rgba(225,18,45,0.06)]",
          className
        )}
      >
        {/* Dynamic Specular Glare Layer - only rendered when hovered */}
        {glare && glarePos.opacity > 0 && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300"
            style={{
              opacity: glarePos.opacity,
              background: `radial-gradient(400px circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.16), rgba(226, 232, 240, 0.06) 35%, rgba(225, 18, 45, 0.05) 65%, transparent 85%)`
            }}
          />
        )}

        {/* Ambient Top Hairline Metallic Silver Highlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100 [html.light_&]:via-black/10"
        />

        {/* 3D Elevated Content Layer */}
        <div style={{ transform: "translateZ(20px)" }} className="relative z-10 h-full">
          {children}
        </div>
      </div>
    </div>
  );
}
