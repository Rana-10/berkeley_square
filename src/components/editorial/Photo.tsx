import Image from "next/image";
import { cn } from "@/lib/utils";
import type { SiteImage } from "@/data/images";

type PhotoProps = {
  image: SiteImage;
  /** Tailwind aspect utility, e.g. "aspect-[3/2]". Same ratio inside any one list. */
  ratio?: string;
  sizes?: string;
  /** Caption sits beneath the image, never over it. */
  showCaption?: boolean;
  caption?: string;
  priority?: boolean;
  position?: string;
  className?: string;
  imgClassName?: string;
  /** slow zoom on hover, only when the photo is inside a `group` */
  zoom?: boolean;
  /** "ink" for photos sitting on the green tone (light caption) */
  tone?: "page" | "ink";
};

export function Photo({
  image,
  ratio = "aspect-[3/2]",
  sizes = "(max-width: 768px) 100vw, 50vw",
  showCaption = true,
  caption,
  priority,
  position = "object-center",
  className,
  imgClassName,
  zoom = true,
  tone = "page"
}: PhotoProps) {
  return (
    <figure className={cn("m-0", className)}>
      <div className={cn("relative w-full overflow-hidden rounded-[10px] bg-[#DDD7CA]", ratio)}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          quality={80}
          priority={priority}
          className={cn(
            "object-cover transition-transform duration-[900ms] ease-out",
            position,
            zoom && "group-hover:scale-[1.03]",
            imgClassName
          )}
        />
      </div>
      {showCaption ? (
        <figcaption className={cn("mt-2.5 flex items-baseline gap-3 border-t pt-2 text-[11px] font-semibold uppercase tracking-[0.16em]", tone === "ink" ? "border-white/25 text-white/60" : "border-[#181818]/20 text-theme-muted")}>
          {caption ?? image.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
