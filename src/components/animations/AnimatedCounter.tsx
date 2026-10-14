"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: string | number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export function AnimatedCounter({
  value,
  duration = 1800,
  className = "",
  prefix = "",
  suffix = ""
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const reduceMotion = useReducedMotion();

  // Parse numeric component and any embedded prefix/suffix if passed as a string
  const rawString = String(value);
  const match = rawString.match(/^([^0-9.]*)([0-9.]+)(.*)$/);
  
  const parsedPrefix = prefix || (match ? match[1] : "");
  const targetNumber = match ? parseFloat(match[2]) : parseFloat(rawString) || 0;
  const parsedSuffix = suffix || (match ? match[3] : "");
  const isDecimal = rawString.includes(".");

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!isInView || reduceMotion) {
      if (reduceMotion) setCurrent(targetNumber);
      return;
    }

    let start = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const nextVal = targetNumber * easeOut;

      setCurrent(nextVal);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setCurrent(targetNumber);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, targetNumber, duration, reduceMotion]);

  const formattedNumber = isDecimal
    ? current.toFixed(1)
    : Math.round(current).toLocaleString("en-GB");

  return (
    <span ref={ref} className={`inline-flex items-baseline font-bold tracking-tight ${className}`}>
      {parsedPrefix ? <span className="mr-0.5 text-legacy-red">{parsedPrefix}</span> : null}
      <span>{formattedNumber}</span>
      {parsedSuffix ? <span className="text-legacy-red">{parsedSuffix}</span> : null}
    </span>
  );
}
