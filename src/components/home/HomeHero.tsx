"use client";

import { Pause, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const slides = [
  { src: "/images/uk/portland-stone-portico.webp", alt: "A Portland stone portico in a London square" },
  { src: "/images/uk/eton-college-chapel.webp", alt: "Stone chapel pinnacles above a brick range under a clear sky" },
  { src: "/images/uk/stone-gable-tower.webp", alt: "A stone gable with mullioned windows and a stepped buttress" }
];

const INTERVAL = 6500;

/** Full-bleed photographic hero: serif headline on the left, three slides, counter and pause control bottom right. */
export function HomeHero() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  // Only the visible slide and the next one are fetched, so the first paint is not competing with three large photos.
  const [reached, setReached] = useState<number[]>([0]);

  useEffect(() => {
    setReached((r) => Array.from(new Set([...r, index, (index + 1) % slides.length])));
  }, [index]);

  useEffect(() => {
    if (!playing || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), INTERVAL);
    return () => window.clearInterval(id);
  }, [playing]);

  return (
    <section className="relative isolate overflow-hidden bg-[#112A22] text-white" aria-roledescription="carousel" aria-label="Featured">
      <div className="absolute inset-0 -z-10">
        {slides.map((slide, i) => (reached.includes(i) ? (
          <Image
            key={slide.src}
            src={slide.src}
            alt={i === index ? slide.alt : ""}
            fill
            priority={i === 0}
            sizes="100vw"
            quality={90}
            className={cn("object-cover transition-opacity duration-[1400ms] ease-out", i === index ? "opacity-100" : "opacity-0")}
          />
        ) : null))}
        <div className="absolute inset-0 bg-[#08201A]/25" />
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#08201A]/60 via-[#08201A]/15 to-transparent md:w-3/4" />
      </div>

      <div className="container flex min-h-[34rem] flex-col justify-end pb-20 pt-40 md:min-h-[38rem] md:pb-24 lg:min-h-[42rem]">
        <h1 className="display max-w-2xl text-[2.9rem] font-normal leading-[1.04] tracking-[-0.02em] sm:text-6xl lg:text-[4.4rem]">
          Your next move, expertly supported.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-white/90 md:text-xl">Property finance, acquisitions and asset management.</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="focus-ring inline-flex items-center gap-3 bg-[#F3EEE4] px-6 py-3.5 text-sm font-medium text-[#112A22] transition-colors hover:bg-[#FAF7F1]"
          >
            Discuss your requirements <span aria-hidden>↗</span>
          </Link>
          <Link
            href="/property"
            className="focus-ring inline-flex items-center gap-3 border border-white/80 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            Explore property <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      <div className="container pointer-events-none absolute inset-x-0 bottom-6 flex justify-end">
        <div className="pointer-events-auto flex items-center gap-4 text-xs tabular-nums text-white/85">
          <span aria-hidden className="hidden h-px w-14 bg-white/40 sm:block" />
          <span>
            {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
          <span aria-hidden className="hidden h-px w-14 bg-white/40 sm:block" />
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause slideshow" : "Play slideshow"}
            className="focus-ring grid h-7 w-7 place-items-center rounded-full border border-white/70 transition-colors hover:bg-white/15"
          >
            {playing ? <Pause size={11} fill="currentColor" /> : <Play size={11} fill="currentColor" />}
          </button>
        </div>
      </div>
    </section>
  );
}
