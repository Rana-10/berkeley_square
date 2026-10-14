"use client";

import { useEffect, useRef, useState } from "react";

export function CountUp({ value }: { value: string }) {
  const target = Number.parseInt(value, 10);
  const suffix = value.replace(/^\d+/, "");
  const ref = useRef<HTMLSpanElement>(null);
  const [number, setNumber] = useState(0);

  useEffect(() => {
    if (!ref.current || Number.isNaN(target)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setNumber(target); return; }
    const start = performance.now();
    let frame = 0;
    const tick = (time: number) => {
      const progress = Math.min((time - start) / 1100, 1);
      setNumber(Math.round(target * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  return <span ref={ref}>{number}{suffix}</span>;
}
