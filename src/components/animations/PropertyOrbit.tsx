"use client";

import { Building2, Compass, Landmark, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const satellites = [
  {
    icon: Compass,
    label: "Prime London & Mayfair",
    sub: "W1K, SW1, EC2",
    angle: 0,
    orbitRadius: 195,
    speed: 34
  },
  {
    icon: TrendingUp,
    label: "Target Yield 8.2%",
    sub: "Strategic Growth",
    angle: 90,
    orbitRadius: 210,
    speed: 28
  },
  {
    icon: Landmark,
    label: "£500k – £35M+",
    sub: "Portfolio Transactions",
    angle: 180,
    orbitRadius: 185,
    speed: 32
  },
  {
    icon: ShieldCheck,
    label: "Private Advisory",
    sub: "Discreet Execution",
    angle: 270,
    orbitRadius: 220,
    speed: 36
  }
];

export function PropertyOrbit() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div
      className="relative mx-auto flex aspect-square w-full max-w-[540px] items-center justify-center p-6 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 1. Deep Ambient Aura Glow */}
      <div className="absolute inset-0 m-auto h-72 w-72 rounded-full bg-radial-red opacity-80 blur-3xl" />

      {/* 2. Outer Orbital Ring 3 (Clockwise with Dashes) */}
      <div
        className={`absolute inset-4 rounded-full border border-dashed border-white/[0.08] transition-all duration-700 ${
          isPaused ? "scale-[1.02] border-legacy-red/30" : ""
        }`}
        style={{
          animation: `spin 52s linear infinite ${isPaused ? "paused" : "running"}`
        }}
      >
        <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-legacy-red/80 shadow-[0_0_12px_#e1122d]" />
      </div>

      {/* 3. Middle Orbital Ring 2 (Counter-Clockwise) */}
      <div
        className="absolute inset-12 rounded-full border border-white/[0.12]"
        style={{
          animation: `spin-reverse 40s linear infinite ${isPaused ? "paused" : "running"}`
        }}
      >
        <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border border-white bg-white shadow-[0_0_10px_#ffffff]" />
      </div>

      {/* 4. Inner Orbital Ring 1 (Tilted Gyroscope Feel) */}
      <div
        className="absolute inset-20 rounded-full border border-legacy-red/25"
        style={{
          animation: `spin 26s linear infinite ${isPaused ? "paused" : "running"}`
        }}
      />

      {/* 5. Central Luxury Property Core Hub */}
      <div className="group relative z-10 h-52 w-52 overflow-hidden rounded-full border-2 border-white/20 bg-legacy-panel shadow-[0_0_50px_rgba(225,18,45,0.3)] transition-all duration-500 hover:scale-105 hover:border-legacy-red/60">
        <Image
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
          alt="Luxury property showcase core"
          fill
          sizes="220px"
          quality={80}
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-end p-4 text-center">
          <span className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
            <Sparkles size={11} className="text-legacy-red" /> BSQ Property
          </span>
          <p className="display mt-1 text-base text-white">Prime Advisory</p>
        </div>
      </div>

      {/* 6. Rotating Orbiting Satellites with Badges */}
      <div
        className="absolute inset-0"
        style={{
          animation: `spin 32s linear infinite ${isPaused ? "paused" : "running"}`
        }}
      >
        {satellites.map((sat, idx) => {
          const Icon = sat.icon;
          // Calculate positions along the circle
          const rad = (sat.angle * Math.PI) / 180;
          const x = 50 + Math.cos(rad) * 38;
          const y = 50 + Math.sin(rad) * 38;

          return (
            <div
              key={sat.label}
              className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-300"
              style={{
                left: `${x}%`,
                top: `${y}%`
              }}
            >
              {/* Counter-rotate badge content so text and icons remain upright and readable */}
              <div
                className="group/badge cursor-pointer"
                style={{
                  animation: `spin-reverse 32s linear infinite ${isPaused ? "paused" : "running"}`
                }}
              >
                <div className="glass flex items-center gap-2.5 rounded-2xl border border-white/15 bg-black/80 px-3.5 py-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-110 hover:border-legacy-red/60 hover:bg-black/95 hover:shadow-[0_0_25px_rgba(225,18,45,0.4)]">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl border border-legacy-red/40 bg-legacy-red/15 text-legacy-red transition-colors group-hover/badge:bg-legacy-red group-hover/badge:text-white">
                    <Icon size={16} />
                  </div>
                  <div className="text-left">
                    <p className="whitespace-nowrap text-xs font-semibold text-white">
                      {sat.label}
                    </p>
                    <p className="whitespace-nowrap text-[10px] text-white/55">
                      {sat.sub}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
