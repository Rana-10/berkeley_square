"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll reveals without a JS animation library: a single IntersectionObserver per block and
 * compositor-only CSS transitions (opacity + transform). Content is fully visible until the page
 * hydrates, and anything already on screen at that moment is shown without animating, so above-the-fold
 * content never flashes or waits on JavaScript.
 */

type RevealDirection = "up" | "down" | "left" | "right" | "none";
type RevealState = "idle" | "hidden" | "shown";

function useRevealState(amount: number) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<RevealState>("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || typeof IntersectionObserver === "undefined") {
      setState("shown");
      return;
    }

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      setState("shown");
      return;
    }

    setState("hidden");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setState("shown");
          observer.disconnect();
        }
      },
      { threshold: amount, rootMargin: "0px 0px -6% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [amount]);

  return [ref, state] as const;
}

const hiddenClass: Record<RevealDirection, string> = {
  up: "opacity-0 translate-y-5",
  down: "opacity-0 -translate-y-5",
  left: "opacity-0 translate-x-5",
  right: "opacity-0 -translate-x-5",
  none: "opacity-0"
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: RevealDirection;
  amount?: number;
  /** kept for API compatibility */
  blur?: boolean;
};

export function Reveal({ children, className, delay = 0, direction = "up", amount = 0.1 }: RevealProps) {
  const [ref, state] = useRevealState(amount);

  return (
    <div
      ref={ref}
      className={cn(
        state === "hidden" && hiddenClass[direction],
        state === "shown" && "opacity-100 translate-x-0 translate-y-0 transition duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
        className
      )}
      style={state === "shown" && delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  /** kept for API compatibility; stagger is fixed in CSS */
  stagger?: number;
  amount?: number;
};

export function RevealGroup({ children, className, amount = 0.08 }: RevealGroupProps) {
  const [ref, state] = useRevealState(amount);

  return (
    <div ref={ref} data-reveal={state} className={className}>
      {children}
    </div>
  );
}

type RevealItemProps = {
  children: ReactNode;
  className?: string;
  direction?: RevealDirection;
};

/** Must be a descendant of RevealGroup; its visibility follows the group's data-reveal state. */
export function RevealItem({ children, className }: RevealItemProps) {
  return <div className={cn("reveal-item", className)}>{children}</div>;
}
