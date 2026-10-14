"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// Premium property interior & exterior videos
const HERO_VIDEOS = [
  {
    id: "interior-grand-living",
    label: "Grand Estate Living Room (Interior)",
    url: "https://assets.mixkit.co/videos/39177/39177-720.mp4",
    poster: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
  },
  {
    id: "exterior-modern-villa",
    label: "Modern Coastal Villa (Exterior)",
    url: "https://assets.mixkit.co/videos/27543/27543-720.mp4",
    poster: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=85"
  },
  {
    id: "interior-penthouse-suite",
    label: "Luxury Penthouse Suite (Interior)",
    url: "https://assets.mixkit.co/videos/4196/4196-720.mp4",
    poster: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85"
  },
  {
    id: "exterior-aerial-estate",
    label: "Prime Architectural Estates Drone (Exterior)",
    url: "https://assets.mixkit.co/videos/48394/48394-720.mp4",
    poster: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85"
  }
];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Randomly select starting video on page load
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * HERO_VIDEOS.length);
    setActiveVideoIndex(randomIndex);
  }, []);

  // When activeVideoIndex changes, play the active video from the beginning
  useEffect(() => {
    const currentVideo = videoRefs.current[activeVideoIndex];
    if (currentVideo) {
      currentVideo.currentTime = 0;
      const playPromise = currentVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay fallback for strict browser policies
        });
      }
    }
  }, [activeVideoIndex]);

  // When a video completes playing, automatically transition to the next video
  const handleVideoEnded = () => {
    setActiveVideoIndex((prev) => (prev + 1) % HERO_VIDEOS.length);
  };

  // Scroll dynamics inspired by John Taylor
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001
  });

  // Cinematic background video scale on scroll
  const videoScale = useTransform(smoothProgress, [0, 1], [1, 1.08]);

  // Headline parallax shift and soft fade as user scrolls
  const textY = useTransform(smoothProgress, [0, 0.8], ["0px", "-70px"]);
  const textOpacity = useTransform(smoothProgress, [0, 0.6, 1], [1, 0.7, 0.1]);

  return (
    <section ref={containerRef} className="relative bg-background h-[180vh] select-none">
      {/* Sticky Fullscreen Frame - Videos cover the entire screen */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Full-bleed video background container */}
        <motion.div
          style={{ scale: videoScale }}
          className="absolute inset-0 h-full w-full overflow-hidden"
        >
          {HERO_VIDEOS.map((vid, idx) => (
            <div
              key={vid.id}
              className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out ${
                idx === activeVideoIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <video
                ref={(el) => {
                  videoRefs.current[idx] = el;
                }}
                autoPlay={idx === activeVideoIndex}
                muted
                playsInline
                preload="auto"
                poster={vid.poster}
                onEnded={handleVideoEnded}
                className="absolute inset-0 h-full w-full object-cover"
              >
                <source src={vid.url} type="video/mp4" />
              </video>
            </div>
          ))}

          {/* Luxury Vignette & Contrast Overlay */}
          <div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.45) 100%), radial-gradient(ellipse 90% 70% at 50% 50%, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.6) 100%)"
            }}
          />
        </motion.div>

        {/* Headline Layer: Only 'Your Global Partner in Real Estate & Finance.' */}
        <motion.div
          style={{
            y: textY,
            opacity: textOpacity
          }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center select-none pointer-events-none"
        >
          <h1
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white max-w-5xl tracking-tight leading-[1.1] drop-shadow-[0_6px_30px_rgba(0,0,0,0.95)]"
            style={{
              letterSpacing: "-0.03em"
            }}
          >
            Your Global Partner in Real Estate & Finance.
          </h1>

          {/* Minimal John Taylor Scroll Cue & Interactive Video Pagination Dots */}
          <div className="absolute bottom-8 flex flex-col items-center gap-3 text-white/80 pointer-events-auto">
            {/* Interactive Video Switcher Dots */}
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-lg">
              {HERO_VIDEOS.map((vid, idx) => (
                <button
                  key={vid.id}
                  type="button"
                  onClick={() => setActiveVideoIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeVideoIndex
                      ? "w-7 bg-legacy-red shadow-[0_0_10px_#e1122d]"
                      : "w-1.5 bg-white/40 hover:bg-white/80"
                  }`}
                  title={vid.label}
                  aria-label={`Switch to: ${vid.label}`}
                />
              ))}
            </div>

            <span className="text-[10px] tracking-[0.3em] uppercase font-mono text-white/60">
              Scroll to explore
            </span>
            <div className="h-6 w-px bg-gradient-to-b from-white/80 to-transparent animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
