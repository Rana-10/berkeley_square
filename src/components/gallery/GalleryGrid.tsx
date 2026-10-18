import { galleryImages } from "@/data/gallery";
import { Photo } from "@/components/editorial/Photo";
import { GalleryLightboxProvider, GalleryLightboxTrigger } from "./GalleryLightbox";

/**
 * Photographs keep their natural proportions in a column flow, captions beneath.
 * No overlays, no badges: the category is set as small caps in the caption line.
 */
export function GalleryGrid() {
  return (
    <GalleryLightboxProvider>
      <div className="columns-1 gap-8 sm:columns-2 lg:columns-3 [&>*]:mb-10">
        {galleryImages.map((image, index) => (
          <div key={image.src} className="break-inside-avoid">
            <GalleryLightboxTrigger image={image}>
              <Photo
                image={image}
                ratio={image.orientation === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]"}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                caption={`${image.category} — ${image.caption}`}
                priority={index < 3}
              />
            </GalleryLightboxTrigger>
          </div>
        ))}
      </div>
    </GalleryLightboxProvider>
  );
}
