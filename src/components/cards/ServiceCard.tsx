import Link from "next/link";
import { Reveal } from "@/components/animations/Reveal";
import { Photo } from "@/components/editorial/Photo";
import type { SiteImage } from "@/data/images";
import type { ServiceGroup } from "@/data/services";

const pad = (n: number) => String(n).padStart(2, "0");

/** One division's services as a ruled schedule: intro and photograph on the left, services listed on the right. */
export function ServiceGroupSection({ group, image, index }: { group: ServiceGroup; image: SiteImage; index: number }) {
  return (
    <section className="border-t border-[#181818]/70 py-14 md:py-20">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <p className="font-mono text-xs font-bold tracking-widest text-theme-muted">{pad(index + 1)}</p>
          <h2 className="display mt-2 text-3xl font-semibold leading-tight text-theme-primary md:text-4xl">{group.division}</h2>
          <p className="mt-4 leading-relaxed text-theme-secondary">{group.intro}</p>
          <Link
            href={group.href}
            className="focus-ring mt-6 inline-block border-b border-theme-primary pb-0.5 text-xs font-semibold uppercase tracking-[0.18em] text-theme-primary transition-colors hover:border-legacy-red hover:text-legacy-red"
          >
            Division overview →
          </Link>
          <div className="mt-8 hidden lg:block">
            <Photo image={image} ratio="aspect-[4/5]" sizes="320px" zoom={false} />
          </div>
        </Reveal>

        <div>
          {group.services.map((service, idx) => (
            <Reveal key={service.title}>
              <article className="grid gap-5 border-b border-theme-border py-8 first:pt-0 md:grid-cols-[3rem_1fr] md:gap-8">
                <span className="font-mono text-xs font-bold text-theme-muted">{pad(idx + 1)}</span>
                <div>
                  <h3 className="display text-2xl font-semibold text-theme-primary">{service.title}</h3>
                  <p className="mt-3 max-w-2xl leading-relaxed text-theme-secondary">{service.description}</p>
                  <ul className="mt-5 divide-y divide-theme-border border-y border-theme-border text-sm text-theme-secondary">
                    {service.highlights.map((highlight) => (
                      <li key={highlight} className="py-2.5 leading-snug">
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
