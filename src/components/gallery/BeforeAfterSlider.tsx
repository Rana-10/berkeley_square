"use client";

import { GripVertical } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/animations/Reveal";

const before = "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=85";
const after = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85";

export function BeforeAfterSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(52);
  const [dragging, setDragging] = useState(false);
  const demoRan = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, next)));
  }, []);

  useEffect(() => {
    if (demoRan.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    demoRan.current = true;

    let frame = 0;
    const start = performance.now();
    const duration = 2200;

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const wave = Math.sin(progress * Math.PI);
      setPosition(52 - wave * 18);
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!dragging) return;

    const onMove = (event: PointerEvent) => updatePosition(event.clientX);
    const onUp = () => setDragging(false);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [dragging, updatePosition]);

  return (
    <Reveal className="surface overflow-hidden">
      <div className="p-6 md:p-8">
        <p className="eyebrow">Strategic Refurbishment</p>
        <h2 className="display mt-3 text-2xl md:text-3xl font-bold text-white [html.light_&]:text-[#121316]">From potential to completed detail.</h2>
        <p className="mt-3 text-sm text-legacy-muted [html.light_&]:text-[#555d6b]">
          Drag the slider to compare structural refurbishment and high-specification architectural delivery across our managed assets.
        </p>
      </div>

      <div
        ref={containerRef}
        className="compare-slider relative aspect-[16/9] select-none overflow-hidden touch-none"
        onPointerDown={(event) => {
          setDragging(true);
          updatePosition(event.clientX);
        }}
      >
        <Image src={after} alt="Illustrative completed interior" fill className="object-cover" priority={false} />

        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${position}%`, transition: dragging ? "none" : "width 0.25s ease-out" }}
        >
          <div className="relative h-full w-[100vw] min-w-[900px]">
            <Image src={before} alt="Illustrative construction work" fill className="object-cover object-left" />
          </div>
        </div>

        <div
          className="compare-handle"
          style={{ left: `${position}%`, transition: dragging ? "none" : "left 0.25s ease-out" }}
          aria-hidden="true"
        >
          <span className="compare-handle-ring">
            <GripVertical size={18} className="text-white" />
          </span>
        </div>

        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/70 px-3 py-1 text-xs font-mono font-bold text-white backdrop-blur-md">
          Before
        </span>
        <span className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/70 px-3 py-1 text-xs font-mono font-bold text-white backdrop-blur-md">
          After
        </span>

        <input
          aria-label="Compare before and after"
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
    </Reveal>
  );
}
