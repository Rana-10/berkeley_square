import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/animations/Reveal";
import type { SiteImage } from "@/data/images";
import { cn } from "@/lib/utils";

export type HeroAction = { href: string; label: string };

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  actions?: HeroAction[];
  /** right-hand column beside the intro (e.g. a facts list) */
  side?: ReactNode;
  /** photograph / stats ledger, laid out below the intro */
  children?: ReactNode;
  /** full-bleed content (a photograph) placed flush under the hero, edge to edge */
  bleed?: ReactNode;
  /** opens the page on a full-bleed photograph, like the home page; the intro then sits on the page below it */
  image?: SiteImage;
  /** one short line set under the title on the photograph */
  lede?: ReactNode;
  /** CSS object-position for the photograph */
  position?: string;
};

/** Full-width page header used on every inner page: deep green by default, or a photograph when `image` is given. */
export function PageHero(props: PageHeroProps) {
  if (props.image) return <PhotoHero {...props} image={props.image} />;

  const { eyebrow, title, intro, actions, side, children, bleed } = props;
  return (
    <section className={"select-none bg-[#112A22] pt-36 text-white md:pt-44 " + (bleed ? "pb-0" : "pb-14 md:pb-20")}>
      <div className={"container " + (bleed ? "pb-12 md:pb-16" : "")}>
        <Reveal>
          <p className="eyebrow !text-[#BFCBC3]">{eyebrow}</p>
          <h1 className="display mt-6 max-w-4xl text-4xl font-semibold leading-[1.08] text-white sm:text-5xl md:text-6xl lg:text-7xl">{title}</h1>
        </Reveal>

        {intro || side || actions?.length ? (
          <div className="mt-12 grid gap-10 border-t border-white/25 pt-8 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
            <Reveal delay={0.1}>
              {intro ? <p className="max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">{intro}</p> : null}
              {actions?.length ? (
                <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
                  {actions.map((action) => (
                    <Link
                      key={action.href + action.label}
                      href={action.href}
                      className="focus-ring border-b border-white pb-1 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:border-[#BFCBC3] hover:text-[#BFCBC3]"
                    >
                      {action.label} →
                    </Link>
                  ))}
                </div>
              ) : null}
            </Reveal>
            {side ? <Reveal delay={0.2}>{side}</Reveal> : null}
          </div>
        ) : null}

        {children}
      </div>
      {bleed}
    </section>
  );
}

/**
 * Photographic hero in the home page's language: the photograph under a soft green wash, a serif headline bottom left,
 * off-white and outlined buttons, and the photo credit bottom right where the home slideshow keeps its counter.
 */
function PhotoHero({ eyebrow, title, intro, actions, side, children, image, lede, position }: PageHeroProps & { image: SiteImage }) {
  return (
    <>
      <section className="relative isolate select-none overflow-hidden bg-[#112A22] text-white">
        <div className="absolute inset-0 -z-10">
          <Image src={image.src} alt={image.alt} fill priority sizes="100vw" quality={90} className="object-cover" style={{ objectPosition: position }} />
          <div className="absolute inset-0 bg-[#08201A]/30" />
          <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#08201A]/65 via-[#08201A]/20 to-transparent md:w-3/4" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#08201A]/45 to-transparent" />
        </div>

        <div className="container flex min-h-[32rem] flex-col justify-end pb-20 pt-40 md:min-h-[36rem] md:pb-24 lg:min-h-[40rem]">
          <p className="flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.22em] text-white/90">
            {eyebrow}
            <span aria-hidden className="h-px w-20 bg-white/60" />
          </p>
          <h1 className="display mt-5 max-w-3xl text-[2.6rem] font-normal leading-[1.05] tracking-[-0.02em] sm:text-[3.4rem] lg:text-[4.1rem]">{title}</h1>
          {lede ? <p className="mt-6 max-w-xl text-lg text-white/90 md:text-xl">{lede}</p> : null}
          {actions?.length ? (
            <div className="mt-9 flex flex-wrap gap-3">
              {actions.map((action, i) => (
                <Link
                  key={action.href + action.label}
                  href={action.href}
                  className={cn(
                    "focus-ring inline-flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-colors",
                    i === 0 ? "bg-[#F3EEE4] text-[#112A22] hover:bg-[#FAF7F1]" : "border border-white/80 text-white hover:bg-white/10"
                  )}
                >
                  {action.label} <span aria-hidden>{i === 0 ? "↗" : "→"}</span>
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        <div className="container pointer-events-none absolute inset-x-0 bottom-6 flex justify-end">
          <p className="pointer-events-auto flex items-center gap-4 text-[11px] text-white/75">
            <span aria-hidden className="hidden h-px w-14 bg-white/40 sm:block" />
            <span className={image.credit ? "hidden sm:inline" : undefined}>{image.caption}</span>
            {image.credit ? (
              <a href={image.credit.source} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                Photo: {image.credit.author}, {image.credit.licence}
              </a>
            ) : null}
          </p>
        </div>
      </section>

      {intro || side || children ? (
        <section className="select-none bg-theme-page text-[#112A22]">
          <div className="container py-14 md:py-20">
            {intro || side ? (
              <div className={cn("grid gap-10", side && "lg:grid-cols-[1.3fr_1fr] lg:gap-20")}>
                <Reveal>
                  <span aria-hidden className="block h-[2px] w-12 bg-[#C43A31]" />
                  {intro ? <p className="mt-7 max-w-3xl text-lg leading-relaxed text-[#2A2927] md:text-xl">{intro}</p> : null}
                </Reveal>
                {side ? <Reveal delay={0.1}>{side}</Reveal> : null}
              </div>
            ) : null}
            {children}
          </div>
        </section>
      ) : null}
    </>
  );
}

/** Facts list for the hero's right column: light type on the green hero, dark type on the page under a photo hero. */
export function HeroFacts({ items, tone = "dark" }: { items: [string, string][]; tone?: "dark" | "light" }) {
  const onLight = tone === "light";
  return (
    <dl className={cn("divide-y border-y text-sm", onLight ? "divide-[#112A22]/15 border-[#112A22]/30" : "divide-white/20 border-white/30")}>
      {items.map(([term, value]) => (
        <div key={term} className="flex items-baseline justify-between gap-6 py-3.5">
          <dt className={cn("text-xs font-semibold uppercase tracking-widest", onLight ? "text-[#4A4844]" : "text-white/60")}>{term}</dt>
          <dd className={cn("text-right font-medium", onLight ? "text-[#112A22]" : "text-white")}>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
