import Link from "next/link";
import { Reveal } from "@/components/animations/Reveal";
import { Photo } from "@/components/editorial/Photo";
import { TextLink } from "@/components/editorial/Section";
import { divisions } from "@/data/company";

const pad = (n: number) => String(n).padStart(2, "0");

/** Compact ruled index of the three divisions: photograph, title, one-line summary. */
export function DivisionCards() {
  return (
    <div className="border-t border-[#181818]/70">
      {divisions.map((division, idx) => (
        <Reveal key={division.name}>
          <Link
            href={division.href}
            className="focus-ring group grid items-center gap-5 border-b border-theme-border py-6 md:grid-cols-[minmax(0,15rem)_1fr_auto] md:gap-10"
          >
            <Photo
              image={{ src: division.image, alt: `${division.name}: architectural reference photograph`, caption: division.shortName, orientation: "landscape" }}
              ratio="aspect-[3/2]"
              showCaption={false}
              sizes="(max-width: 768px) 100vw, 240px"
            />

            <div>
              <span className="font-mono text-xs font-bold text-theme-muted">{pad(idx + 1)}</span>
              <h3 className="display mt-1 text-3xl font-semibold text-theme-primary transition-colors group-hover:text-legacy-red md:text-4xl">
                {division.name}
              </h3>
              <p className="mt-3 max-w-xl leading-relaxed text-theme-secondary">{division.summary}</p>
            </div>

            <TextLink className="text-theme-primary md:self-end">Explore</TextLink>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
