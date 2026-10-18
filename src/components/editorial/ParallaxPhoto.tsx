"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { SiteImage } from "@/data/images";
import { cn } from "@/lib/utils";

type ParallaxPhotoProps = {
  image: SiteImage;
  /** Tailwind aspect utilities for the frame */
  ratio?: string;
  sizes?: string;
  position?: string;
  priority?: boolean;
  /** how far the photograph drifts inside its frame, in px */
  amount?: number;
  rounded?: boolean;
  className?: string;
};

/**
 * A photograph that drifts slowly inside its frame as the page scrolls. One rAF-throttled listener,
 * active only while the frame is on screen, writing a single transform (compositor only).
 */
export function ParallaxPhoto({
  image,
  ratio = "aspect-[4/3] md:aspect-[21/9]",
  sizes = "100vw",
  position = "object-center",
  priority,
  amount = 48,
  rounded = false,
  className
}: ParallaxPhotoProps) {
  const frame = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = frame.current;
    const img = el?.querySelector("img") as HTMLImageElement | null;
    if (!el || !img || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let active = false;

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.max(-1, Math.min(1, (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2)));
      img.style.transform = `translate3d(0, ${(-p * amount).toFixed(1)}px, 0) scale(1.14)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !active) {
          active = true;
          update();
          window.addEventListener("scroll", onScroll, { passive: true });
          window.addEventListener("resize", onScroll, { passive: true });
        } else if (!entry.isIntersecting && active) {
          active = false;
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onScroll);
        }
      },
      { rootMargin: "120px 0px" }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [amount]);

  return (
    <div ref={frame} className={cn("relative w-full overflow-hidden bg-[#C6D3C0]", ratio, rounded && "rounded-[10px]", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        quality={80}
        priority={priority}
        className={cn("object-cover will-change-transform", position)}
        style={{ transform: "scale(1.14)" }}
      />
    </div>
  );
}
