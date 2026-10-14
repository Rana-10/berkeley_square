"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { createContext, type ReactNode, useContext, useMemo, useState } from "react";
import type { galleryImages } from "@/data/gallery";

type GalleryImage = (typeof galleryImages)[number];

type GalleryLightboxContextValue = {
  active: GalleryImage | null;
  openImage: (image: GalleryImage) => void;
  closeImage: () => void;
};

const GalleryLightboxContext = createContext<GalleryLightboxContextValue | null>(null);

function useGalleryLightbox() {
  const context = useContext(GalleryLightboxContext);

  if (!context) {
    throw new Error("Gallery lightbox components must be used inside GalleryLightboxProvider.");
  }

  return context;
}

export function GalleryLightboxProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<GalleryImage | null>(null);
  const value = useMemo(
    () => ({
      active,
      openImage: setActive,
      closeImage: () => setActive(null)
    }),
    [active]
  );

  return (
    <GalleryLightboxContext.Provider value={value}>
      {children}
      <GalleryLightboxModal />
    </GalleryLightboxContext.Provider>
  );
}

export function GalleryLightboxTrigger({ image, children }: { image: GalleryImage; children: ReactNode }) {
  const { openImage } = useGalleryLightbox();

  return (
    <button onClick={() => openImage(image)} className="focus-ring group relative aspect-[4/3] overflow-hidden border border-legacy-border bg-legacy-panel text-left">
      {children}
    </button>
  );
}

function GalleryLightboxModal() {
  const { active, closeImage } = useGalleryLightbox();

  if (!active) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-black/88 p-4" role="dialog" aria-modal="true">
      <button onClick={closeImage} className="focus-ring absolute right-5 top-5 grid h-11 w-11 place-items-center border border-legacy-border bg-white/10" aria-label="Close image">
        <X />
      </button>
      <div className="relative h-[78vh] w-full max-w-5xl">
        <Image src={active.src} alt={active.alt} fill sizes="90vw" className="object-contain" />
      </div>
    </div>
  );
}
