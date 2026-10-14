"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function ScrollEnergyProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const [mounted, setMounted] = useState(false);

  // Smooth spring physics for fluid interpolation
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.2,
    restDelta: 0.002
  });

  // Keep the flare on the compositor instead of changing layout with `left`.
  const leadingX = useTransform(scaleX, (value) => `${Math.min(Math.max(value * 100, 0), 100)}vw`);
  const opacity = useTransform(scaleX, (value) => (value > 0.005 ? 1 : 0));

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || reduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[3px] overflow-visible"
    >
      {/* Background track line */}
      <div className="absolute inset-0 bg-white/[0.04]" />

      {/* Glowing Energy Beam Fill */}
      <motion.div
        className="relative h-full origin-left bg-gradient-to-r from-legacy-deepRed via-legacy-red to-[#ff385c]"
        style={{
          scaleX,
          willChange: "transform",
          boxShadow: "0 0 14px rgba(225, 18, 45, 0.9), 0 0 28px rgba(225, 18, 45, 0.45)"
        }}
      />

      {/* Leading Edge Hot-Plasma Flare / Photon Head */}
      <motion.div
        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          x: leadingX,
          opacity
        }}
      >
        {/* Outer Radiant Flare */}
        <div className="h-4 w-4 rounded-full bg-legacy-red/40 blur-[3px]" />
        
        {/* Core Hot-White Light Point */}
        <div className="absolute inset-0 m-auto h-2 w-2 rounded-full border border-white/80 bg-white shadow-[0_0_10px_#ffffff,0_0_20px_#e1122d]" />
      </motion.div>
    </div>
  );
}
