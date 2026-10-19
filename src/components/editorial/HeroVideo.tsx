"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type HeroVideoProps = {
  poster: string;
  alt: string;
  desktopSrc: string;
  mobileSrc: string;
  ratio?: string;
  className?: string;
  /** how far the footage drifts inside its frame while scrolling, in px */
  amount?: number;
};

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

/**
 * Looping, muted background footage. The poster frame paints immediately (it is the LCP image); the video is only
 * fetched once the page has finished loading and the browser is idle, then fades in over the poster. It is skipped for
 * visitors on data-saver or slow connections, or who prefer reduced motion, and it pauses when scrolled out of view.
 */
export function HeroVideo({ poster, alt, desktopSrc, mobileSrc, ratio = "aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]", className, amount = 18 }: HeroVideoProps) {
  const frame = useRef<HTMLDivElement | null>(null);
  const layer = useRef<HTMLDivElement | null>(null);
  const video = useRef<HTMLVideoElement | null>(null);
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const userPaused = useRef(false);

  // Decide whether to load the footage at all, and when.
  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    const slow = connection?.saveData || (connection?.effectiveType && /(^|-)2g$|3g/.test(connection.effectiveType));
    if (slow || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let idleId = 0;
    const start = () => {
      const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
      if (ric) idleId = ric(() => setLoad(true), { timeout: 3000 });
      else idleId = window.setTimeout(() => setLoad(true), 1200);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);

  // Drift on scroll, and pause the footage while it is off screen.
  useEffect(() => {
    const el = frame.current;
    const inner = layer.current;
    if (!el || !inner) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let active = false;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.max(-1, Math.min(1, (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2)));
      const reach = Math.min(amount, rect.height * 0.032); // never drift further than the 7% overscan allows
      inner.style.transform = `translate3d(0, ${(-p * reach).toFixed(1)}px, 0) scale(1.07)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const v = video.current;
        if (entry.isIntersecting) {
          if (v && !userPaused.current) v.play().catch(() => undefined);
          if (!reduce && !active) {
            active = true;
            update();
            window.addEventListener("scroll", onScroll, { passive: true });
            window.addEventListener("resize", onScroll, { passive: true });
          }
        } else {
          v?.pause();
          if (active) {
            active = false;
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
          }
        }
      },
      { rootMargin: "80px 0px" }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [amount]);

  function togglePlayback() {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => undefined);
      setPaused(false);
    } else {
      userPaused.current = true;
      v.pause();
      setPaused(true);
    }
  }

  return (
    <div ref={frame} className={cn("relative w-full overflow-hidden bg-[#112A22]", ratio, className)}>
      <div ref={layer} className="absolute inset-0 will-change-transform" style={{ transform: "scale(1.07)" }}>
        <Image src={poster} alt={alt} fill priority sizes="100vw" quality={90} className="object-cover" />
        {load ? (
          <video
            ref={video}
            className={cn("absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-out", ready ? "opacity-100" : "opacity-0")}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            aria-hidden="true"
            tabIndex={-1}
            onCanPlay={() => setReady(true)}
          >
            <source src={mobileSrc} type="video/mp4" media="(max-width: 767px)" />
            <source src={desktopSrc} type="video/mp4" />
          </video>
        ) : null}
      </div>

      {ready ? (
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={paused ? "Play background video" : "Pause background video"}
          className="focus-ring absolute right-4 top-4 z-10 rounded-full bg-white/90 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#112A22] transition-colors hover:bg-[#FAF7F1]"
        >
          {paused ? "Play" : "Pause"}
        </button>
      ) : null}
    </div>
  );
}
