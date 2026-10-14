"use client";

import {
  Airplay,
  Bath,
  Bed,
  Car,
  CheckCircle2,
  Compass,
  Dumbbell,
  Flame,
  KeyRound,
  Lock,
  Maximize2,
  Shield,
  ShieldCheck,
  Sparkles,
  Sun,
  Tv,
  Waves,
  Wifi,
  Wine
} from "lucide-react";
import type { AmenityCategory } from "@/data/properties";
import { cn } from "@/lib/utils";

interface PropertyAmenitiesProps {
  amenities: string[];
  amenityCategories?: AmenityCategory[];
}

function getAmenityIcon(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes("pool") || lower.includes("water") || lower.includes("hydro")) return Waves;
  if (lower.includes("gym") || lower.includes("fitness") || lower.includes("exercise")) return Dumbbell;
  if (lower.includes("concierge") || lower.includes("security") || lower.includes("porter") || lower.includes("cctv")) return ShieldCheck;
  if (lower.includes("garage") || lower.includes("parking") || lower.includes("car")) return Car;
  if (lower.includes("wine") || lower.includes("cellar") || lower.includes("tasting")) return Wine;
  if (lower.includes("terrace") || lower.includes("garden") || lower.includes("balcony") || lower.includes("lawn")) return Sun;
  if (lower.includes("lift") || lower.includes("elevator") || lower.includes("key") || lower.includes("biometric")) return KeyRound;
  if (lower.includes("cinema") || lower.includes("screening") || lower.includes("bowling") || lower.includes("tv")) return Tv;
  if (lower.includes("smart") || lower.includes("wifi") || lower.includes("crestron") || lower.includes("fiber")) return Wifi;
  if (lower.includes("heating") || lower.includes("cooling") || lower.includes("air condition") || lower.includes("fireplace")) return Flame;
  return Sparkles;
}

export function PropertyAmenities({ amenities, amenityCategories = [] }: PropertyAmenitiesProps) {
  return (
    <section className="space-y-8">
      {/* Overview Grid with Sleek Icons */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={16} className="text-legacy-red" />
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
            Comprehensive Amenities &amp; Facilities
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 mb-6">
          Every facet of this estate has been designed and engineered to the highest international luxury standards.
        </p>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {amenities.map((amenity) => {
            const Icon = getAmenityIcon(amenity);
            return (
              <div
                key={amenity}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 backdrop-blur-md transition-all hover:border-legacy-red/40 hover:bg-white/[0.05]"
              >
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-legacy-red/10 border border-legacy-red/30 text-legacy-red">
                  <Icon size={16} />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-slate-200">{amenity}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Categorized Specifications Breakdown */}
      {amenityCategories.length > 0 && (
        <div className="mt-8 space-y-6 pt-6 border-t border-white/10">
          <h4 className="font-display text-lg font-bold text-white">
            Categorized Specifications
          </h4>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {amenityCategories.map((cat) => (
              <div
                key={cat.category}
                className="rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="h-2 w-2 rounded-full bg-legacy-red shadow-[0_0_8px_#e1122d]" />
                  <h5 className="font-sans text-xs font-bold uppercase tracking-wider text-white">
                    {cat.category}
                  </h5>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-300">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 size={13} className="text-legacy-red shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
