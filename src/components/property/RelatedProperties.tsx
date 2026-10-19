"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bath, Bed, MapPin, Maximize2 } from "lucide-react";
import type { PropertyItem } from "@/data/properties";
import { cn } from "@/lib/utils";

interface RelatedPropertiesProps {
  currentPropertyId: string;
  allProperties: PropertyItem[];
  category: string;
}

export function RelatedProperties({ currentPropertyId, allProperties, category }: RelatedPropertiesProps) {
  const related = allProperties
    .filter((p) => p.id !== currentPropertyId)
    .sort((a, b) => (a.category === category ? -1 : 1))
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="mt-20 border-t border-white/10 pt-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="eyebrow mb-2">Exclusive Portfolio</p>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
            Similar Prime Opportunities
          </h3>
        </div>

        <Link
          href="/property"
          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-legacy-red hover:text-red-400 transition-colors"
        >
          <span>View All Listings</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((prop) => (
          <Link
            key={prop.id}
            href={`/property/${prop.slug}`}
            className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#0c0c12]/95 shadow-xl transition-all duration-300 hover:border-legacy-red/40 hover:shadow-[0_16px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(196,58,49,0.18)]"
          >
            <div>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                <Image
                  src={prop.featuredImage}
                  alt={prop.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c12] via-transparent to-transparent" />
                <span className="absolute top-3 left-3 rounded-full border border-white/20 bg-black/60 px-2.5 py-0.5 font-mono text-[9px] font-bold text-white/90 uppercase backdrop-blur-md">
                  {prop.referenceCode}
                </span>
              </div>

              <div className="p-5">
                <span className="font-display text-xl font-bold text-white block">
                  {prop.priceDisplay}
                </span>
                <h4 className="font-sans text-sm font-bold text-white mt-2 line-clamp-1 group-hover:text-legacy-red transition-colors">
                  {prop.title}
                </h4>
                <p className="flex items-center gap-1 text-xs text-slate-400 mt-1 font-mono">
                  <MapPin size={11} className="text-legacy-red shrink-0" />
                  <span>{prop.location}</span>
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-[11px] font-mono text-slate-300">
                  <span className="flex items-center gap-1">
                    <Bed size={12} className="text-legacy-red" />
                    <span>{prop.specs.bedrooms} Beds</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath size={12} className="text-legacy-red" />
                    <span>{prop.specs.bathrooms} Baths</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Maximize2 size={11} className="text-legacy-red" />
                    <span>{prop.specs.areaSqFt.toLocaleString()} sq ft</span>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
