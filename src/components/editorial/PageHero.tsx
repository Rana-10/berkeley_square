import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/animations/Reveal";

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
};

/** Full-width deep green page header used on every inner page. Type sits on the green, never on a photo. */
export function PageHero({ eyebrow, title, intro, actions, side, children, bleed }: PageHeroProps) {
  return (
    <section className={"select-none bg-[#1F4030] pt-36 text-white md:pt-44 " + (bleed ? "pb-0" : "pb-14 md:pb-20")}>
      <div className={"container " + (bleed ? "pb-12 md:pb-16" : "")}>
        <Reveal>
          <p className="eyebrow !text-[#E8B7A8]">{eyebrow}</p>
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
                      className="focus-ring border-b border-white pb-1 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:border-[#E8B7A8] hover:text-[#E8B7A8]"
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

/** Facts list for the green hero's right column. */
export function HeroFacts({ items }: { items: [string, string][] }) {
  return (
    <dl className="divide-y divide-white/20 border-y border-white/30 text-sm">
      {items.map(([term, value]) => (
        <div key={term} className="flex items-baseline justify-between gap-6 py-3.5">
          <dt className="text-xs font-semibold uppercase tracking-widest text-white/60">{term}</dt>
          <dd className="text-right font-medium text-white">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
