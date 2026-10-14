import Image from "next/image";
import { galleryImages } from "@/data/gallery";
import { GalleryLightboxProvider, GalleryLightboxTrigger } from "./GalleryLightbox";

export function GalleryGrid() {
  return (
    <GalleryLightboxProvider>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {galleryImages.map((image) => (
          <GalleryLightboxTrigger key={image.src} image={image}>
            <Image src={image.src} alt={image.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover saturate-[.8] transition duration-700 group-hover:scale-105 group-hover:saturate-100" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs text-white">{image.category}</span>
          </GalleryLightboxTrigger>
        ))}
      </div>
    </GalleryLightboxProvider>
  );
}
