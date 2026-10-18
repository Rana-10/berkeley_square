"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Part = { text: string } | { num: number; decimals: number };

/** "To £100m+" -> ["To £", 100, "m+"]; "24–48 hrs" -> [24, "–", 48, " hrs"]; "99.4%" -> [99.4, "%"] */
function parse(value: string): Part[] {
  const parts: Part[] = [];
  let last = 0;
  for (const match of value.matchAll(/\d+(?:\.\d+)?/g)) {
    const index = match.index ?? 0;
    if (index > last) parts.push({ text: value.slice(last, index) });
    const raw = match[0];
    parts.push({ num: parseFloat(raw), decimals: raw.includes(".") ? raw.split(".")[1].length : 0 });
    last = index + raw.length;
  }
  if (last < value.length) parts.push({ text: value.slice(last) });
  return parts;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Counts every number inside a figure up from zero when it scrolls into view, keeping its prefix and suffix.
 * The final text is rendered invisibly underneath, so the column never changes width while it counts.
 */
export function CountUpValue({ value, duration = 1900 }: { value: string; duration?: number }) {
  const parts = useMemo(() => parse(value), [value]);
  const ref = useRef<HTMLSpanElement | null>(null);
  const [progress, setProgress] = useState(1); // 1 = final value (server render, no-JS, reduced motion)

  useEffect(() => {
    const el = ref.current;
    if (!el || !parts.some((p) => "num" in p)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || typeof IntersectionObserver === "undefined") return;

    let raf = 0;
    let started = false;

    const run = () => {
      started = true;
      const t0 = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - t0) / duration, 1);
        setProgress(easeOutCubic(t));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    setProgress(0);
    const observer = new IntersectionObserver(
      (entries) => {
        if (!started && entries.some((e) => e.isIntersecting)) {
          observer.disconnect();
          run();
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [parts, duration]);

  const live = parts
    .map((p) => ("text" in p ? p.text : (p.num * progress).toFixed(p.decimals)))
    .join("");

  return (
    <span ref={ref} className="relative inline-block">
      <span className="invisible" aria-hidden="true">
        {value}
      </span>
      <span className="absolute inset-0" aria-hidden="true">
        {live}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
