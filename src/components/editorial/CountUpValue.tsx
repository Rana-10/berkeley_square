"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const ROLL_MS = 1500;
const STAGGER_MS = 70;
const DIGITS = Array.from({ length: 20 }, (_, i) => i % 10); // two cycles, so every digit (even a 0) visibly turns over

/** "£100k–£100M" -> ["£100k–", "£100M"]: the figure may only wrap after a dash or a space, never inside a number. */
function words(value: string) {
  return value.split(/(?<=[–—\-\s])/);
}

/**
 * One digit in a fixed slot: a column of numerals that rolls up to its final digit.
 * The invisible digit sizes the slot and supplies the baseline, so the figure never changes width or wraps differently.
 */
function RollingDigit({ digit, rolled, delay }: { digit: number; rolled: boolean; delay: number }) {
  return (
    <span className="relative inline-block [clip-path:inset(0)]">
      <span className="invisible">{digit}</span>
      <span
        className="absolute inset-x-0 top-0 flex flex-col items-center"
        style={{
          transform: `translateY(-${rolled ? 10 + digit : 0}em)`,
          transition: rolled ? `transform ${ROLL_MS}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms` : "none"
        }}
      >
        {DIGITS.map((n, i) => (
          <span key={i} className="block h-[1em]">
            {n}
          </span>
        ))}
      </span>
    </span>
  );
}

/**
 * Rolls every digit of a figure into place when it scrolls into view, odometer style, keeping prefixes and suffixes
 * ("£", "k", "hrs") static. Server render, no-JS and reduced-motion visitors get the final figure with no movement.
 */
export function CountUpValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [state, setState] = useState<"final" | "waiting" | "rolled">("final");
  const parts = useMemo(() => words(value).map((word) => Array.from(word)), [value]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !/\d/.test(value)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || typeof IntersectionObserver === "undefined") return;

    setState("waiting");
    let raf = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        // Two frames: let the reset to 0 paint before the transition to the final digit starts.
        raf = requestAnimationFrame(() => (raf = requestAnimationFrame(() => setState("rolled"))));
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  let digitIndex = 0;
  return (
    <span ref={ref} className="leading-none [font-variant-numeric:lining-nums_tabular-nums]">
      <span aria-hidden="true">
        {parts.map((chars, w) => (
          <span key={w} className="whitespace-nowrap">
            {chars.map((ch, c) =>
              /\d/.test(ch) ? (
                <RollingDigit key={c} digit={Number(ch)} rolled={state !== "waiting"} delay={state === "rolled" ? digitIndex++ * STAGGER_MS : 0} />
              ) : (
                ch
              )
            )}
          </span>
        ))}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
