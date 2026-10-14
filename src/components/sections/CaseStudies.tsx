import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/animations/Reveal";

const studies = [
  { image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80", sector: "Commercial finance", title: "Acquisition funding with a defined exit route", result: "Structured around a time-critical opportunity", note: "Representative scenario — replace with approved client case study." },
  { image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80", sector: "Residential property", title: "Positioning a premium home for the right buyer", result: "Focused campaign, considered presentation", note: "Representative scenario — replace with approved client case study." },
  { image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=80", sector: "Construction delivery", title: "Bringing an ambitious refurbishment to completion", result: "Programme-led delivery with clear coordination", note: "Representative scenario — replace with approved client case study." }
];

export function CaseStudies() {
  return <RevealGroup className="grid gap-5 lg:grid-cols-3">{studies.map((study) => (
    <RevealItem key={study.sector}>
    <article className="group overflow-hidden rounded-2xl border border-legacy-border bg-legacy-panel">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={study.image}
          alt="Representative project"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 420px"
          quality={80}
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <p className="absolute bottom-4 left-5 text-xs font-bold uppercase tracking-[.18em] text-white/80">{study.sector}</p>
      </div>
      <div className="p-6"><h3 className="display text-3xl leading-tight">{study.title}</h3><p className="mt-4 flex items-center gap-2 text-sm font-semibold text-legacy-red"><ArrowUpRight size={16} /> {study.result}</p><p className="mt-5 text-xs leading-5 text-white/45">{study.note}</p></div>
    </article>
    </RevealItem>
  ))}</RevealGroup>;
}
