import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { SiteImage } from "@/data/images";
import { cn } from "@/lib/utils";

const tileBase = "group relative block min-h-[19rem] overflow-hidden rounded-[10px] md:min-h-[23rem]";

/** Photograph tile. On hover the photograph zooms slowly and a round arrow button slides in. */
export function PhotoTile({
  image,
  href,
  className,
  sizes = "(max-width: 768px) 100vw, 33vw"
}: {
  image: SiteImage;
  href?: string;
  className?: string;
  sizes?: string;
}) {
  const inner = (
    <>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        quality={78}
        className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.06]"
      />
      {href ? (
        <span
          aria-hidden
          className="absolute right-4 top-4 grid h-11 w-11 -translate-y-1 place-items-center rounded-full bg-[#FAF7F1] text-lg text-[#112A22] opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100"
        >
          ↗
        </span>
      ) : null}
      <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#112A22] opacity-0 transition duration-500 group-hover:opacity-100">
        {image.caption}
      </span>
    </>
  );
  return href ? (
    <Link href={href} className={cn(tileBase, "focus-ring", className)} aria-label={image.caption}>
      {inner}
    </Link>
  ) : (
    <div className={cn(tileBase, className)}>{inner}</div>
  );
}

type TintTileProps = {
  title: string;
  children: ReactNode;
  href?: string;
  cta?: string;
  number?: string;
  tone?: "sage" | "green";
  className?: string;
};

/** Tinted tile: title over a thin rule, short copy, and a link pinned to the foot. Fills green on hover. */
export function TintTile({ title, children, href, cta = "Explore", number, tone = "sage", className }: TintTileProps) {
  const body = (
    <>
      {number ? <span className="mb-4 block font-mono text-xs font-bold opacity-60">{number}</span> : null}
      <h3 className="display text-3xl font-normal leading-tight md:text-[2rem]">{title}</h3>
      <span className="mt-5 block h-px w-full bg-current opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="mt-6 text-[15px] leading-relaxed opacity-90">{children}</div>
      {href ? (
        <span className="mt-auto inline-flex items-center gap-2 pt-8 text-xs font-semibold uppercase tracking-[0.18em]">
          {cta}
          <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
        </span>
      ) : null}
    </>
  );
  const classes = cn(
    "group flex min-h-[19rem] flex-col rounded-[10px] p-8 transition-colors duration-500 md:min-h-[23rem] md:p-10",
    tone === "sage" ? "bg-[#EBE5D9] text-[#112A22] hover:bg-[#112A22] hover:text-white" : "bg-[#1A3A2E] text-white hover:bg-[#EBE5D9] hover:text-[#112A22]",
    className
  );
  return href ? (
    <Link href={href} className={cn(classes, "focus-ring")}>
      {body}
    </Link>
  ) : (
    <div className={classes}>{body}</div>
  );
}
