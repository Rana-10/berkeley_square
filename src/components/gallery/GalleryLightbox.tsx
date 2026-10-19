"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { createContext, type ReactNode, useContext, useMemo, useState } from "react";
import type { GalleryImage } from "@/data/gallery";

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
    <button onClick={() => openImage(image)} className="focus-ring group block w-full text-left" aria-label={`View larger: ${image.caption}`}>
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
    <div className="fixed inset-0 z-[80] grid place-items-center bg-[#112A22]/95 p-4" role="dialog" aria-modal="true">
      <button onClick={closeImage} className="focus-ring absolute right-5 top-5 grid h-11 w-11 place-items-center border border-white/40 text-white transition-colors hover:bg-[#FAF7F1] hover:text-[#181818]" aria-label="Close image">
        <X />
      </button>
      <figure className="w-full max-w-5xl">
        <div className="relative h-[74vh] w-full">
          <Image src={active.src} alt={active.alt} fill sizes="90vw" className="object-contain" />
        </div>
        <figcaption className="mt-3 flex justify-between gap-4 border-t border-white/25 pt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
          <span>{active.caption}</span>
          <span>{active.category}</span>
        </figcaption>
      </figure>
    </div>
  );
}
