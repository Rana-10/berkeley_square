"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, Grid, Images, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyGalleryProps {
  title: string;
  images: string[];
  referenceCode: string;
}

export function PropertyGallery({ title, images, referenceCode }: PropertyGalleryProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const displayImages = images.length > 0 ? images : [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85"
  ];

  function openLightbox(index: number) {
    setCurrentIndex(index);
    setIsLightboxOpen(true);
  }

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  }, [displayImages.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  }, [displayImages.length]);

  // Keyboard navigation
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (!isLightboxOpen) return;
      if (e.key === "Escape") setIsLightboxOpen(false);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isLightboxOpen, handleNext, handlePrev]);

  return (
    <section className="relative">
      {/* 5-Photo Luxury Grid Layout */}
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-2 h-[420px] sm:h-[500px] md:h-[560px] rounded-3xl overflow-hidden border border-white/15 bg-black/60 shadow-2xl">
        {/* Main Featured Photo (Spans 2 columns & 2 rows on medium+) */}
        <div
          onClick={() => openLightbox(0)}
          className="group relative cursor-pointer sm:col-span-2 sm:row-span-2 overflow-hidden bg-black/80"
        >
          <Image
            src={displayImages[0]}
            alt={`${title} - Main View`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 group-hover:opacity-80 transition-opacity" />
          
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="rounded-full border border-white/20 bg-black/60 px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-wider text-white backdrop-blur-md">
              Primary View
            </span>
          </div>

          <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-xs font-semibold text-white bg-black/70 px-3 py-1.5 rounded-full backdrop-blur-md">
            <Expand size={13} className="text-legacy-red" />
            <span>Click to Expand Lightbox</span>
          </div>
        </div>

        {/* Secondary Photos (Up to 4) */}
        {displayImages.slice(1, 5).map((img, idx) => {
          const actualIndex = idx + 1;
          const isLastVisible = idx === 3 || actualIndex === displayImages.length - 1;
          const remainingCount = displayImages.length - 5;

          return (
            <div
              key={img + idx}
              onClick={() => openLightbox(actualIndex)}
              className="group relative hidden sm:block overflow-hidden cursor-pointer bg-black/80"
            >
              <Image
                src={img}
                alt={`${title} - View ${actualIndex + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                quality={85}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />

              {/* Show "+X More Photos" overlay on the 4th thumbnail if there are more */}
              {isLastVisible && remainingCount > 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 backdrop-blur-sm transition-all group-hover:bg-black/65">
                  <Images size={24} className="text-legacy-red mb-1" />
                  <span className="font-display text-xl font-bold text-white">+{remainingCount} Photos</span>
                  <span className="text-[10px] font-mono text-slate-300 uppercase tracking-widest mt-0.5">View Full Gallery</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* View All Photos Floating Trigger */}
      <button
        type="button"
        onClick={() => openLightbox(0)}
        className="absolute bottom-5 right-5 flex items-center gap-2 rounded-2xl border border-white/20 bg-black/80 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-xl backdrop-blur-md transition-all hover:bg-legacy-red hover:border-legacy-red"
      >
        <Grid size={15} />
        <span>Show all {displayImages.length} photos</span>
      </button>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-2xl p-4 sm:p-6"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Top Bar */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-between border-b border-white/10 pb-4 z-10"
            >
              <div className="flex items-center gap-3">
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 font-mono text-xs font-bold text-white">
                  {referenceCode}
                </span>
                <h3 className="font-display text-sm sm:text-base font-bold text-white truncate max-w-md">
                  {title}
                </h3>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-slate-300">
                  <strong className="text-white">{currentIndex + 1}</strong> / {displayImages.length}
                </span>

                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-legacy-red transition-colors"
                  aria-label="Close gallery"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Main Lightbox Display */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative flex-1 my-4 flex items-center justify-center overflow-hidden"
            >
              <div className="relative w-full h-full max-w-6xl max-h-[75vh]">
                <Image
                  src={displayImages[currentIndex]}
                  alt={`${title} - Photo ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                  quality={95}
                  priority
                />
              </div>

              {/* Prev / Next Arrows */}
              {displayImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-black/70 text-white hover:bg-legacy-red hover:border-legacy-red transition-all shadow-2xl"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft size={22} />
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-black/70 text-white hover:bg-legacy-red hover:border-legacy-red transition-all shadow-2xl"
                    aria-label="Next photo"
                  >
                    <ChevronRight size={22} />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Thumbnail Strip */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex justify-center gap-2 overflow-x-auto py-2 z-10"
            >
              {displayImages.map((img, idx) => (
                <button
                  key={img + idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={cn(
                    "relative aspect-[16/10] w-20 sm:w-24 shrink-0 overflow-hidden rounded-xl border-2 transition-all",
                    currentIndex === idx
                      ? "border-legacy-red ring-2 ring-legacy-red/50 scale-105"
                      : "border-white/20 opacity-50 hover:opacity-100"
                  )}
                >
                  <Image src={img} alt="Thumbnail" fill className="object-cover" sizes="96px" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
