"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Bath,
  Bed,
  CheckCircle2,
  MapPin,
  Maximize2,
} from "lucide-react";
import { PropertyApplicationForm } from "@/components/property/PropertyApplicationForm";
import { propertyService } from "@/lib/property-service";
import { mapPropertyToViewModel, type PropertyViewModel } from "@/lib/property-view-model";

const fallbackImage =
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=80";

export function PropertyDetailView({ propertyId }: { propertyId: number }) {
  const [property, setProperty] = useState<PropertyViewModel | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!Number.isInteger(propertyId) || propertyId < 1) {
      setError("Invalid property id.");
      return;
    }

    propertyService
      .getProperty(propertyId)
      .then((item) => {
        setProperty(mapPropertyToViewModel(item));
        setError(null);
      })
      .catch((loadError: unknown) => {
        setError(loadError instanceof Error ? loadError.message : "Unable to load property.");
      });
  }, [propertyId]);

  const gallery = useMemo(() => {
    if (!property) return [fallbackImage];
    return property.images.length > 0 ? property.images : [fallbackImage];
  }, [property]);

  if (error) {
    return (
      <main className="container min-h-screen pt-32 text-white [html.light_&]:text-[#121316] [html.light_&]:bg-[#F7F5F2]">
        <BackLink />
        <div className="mt-8 rounded-2xl border border-white/10 [html.light_&]:border-[#E4DFD4] bg-black/40 [html.light_&]:bg-white [html.light_&]:shadow-[0_10px_30px_rgba(24,24,24,0.04)] p-10">
          <h1 className="text-2xl font-bold text-white [html.light_&]:text-[#121316]">Property unavailable</h1>
          <p className="mt-2 text-slate-400 [html.light_&]:text-[#706D68]">{error}</p>
        </div>
      </main>
    );
  }

  if (!property) {
    return (
      <main className="container min-h-screen pt-32 text-white [html.light_&]:text-[#121316] [html.light_&]:bg-[#F7F5F2]">
        <BackLink />
        <div className="mt-8 rounded-2xl border border-white/10 [html.light_&]:border-[#E4DFD4] bg-black/40 [html.light_&]:bg-white [html.light_&]:shadow-[0_10px_30px_rgba(24,24,24,0.04)] p-10 text-slate-300 [html.light_&]:text-[#555d6b]">
          Loading property details.
        </div>
      </main>
    );
  }

  return (
    <main className="pt-32 pb-24 [html.light_&]:bg-[#F7F5F2]">
      <div className="container">
        <BackLink />
        <section className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 [html.light_&]:border-[#E4DFD4] bg-black">
              <Image
                src={gallery[activeImage]}
                alt={property.title}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
                priority
                unoptimized
              />
            </div>
            {gallery.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {gallery.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border border-white/15 [html.light_&]:border-[#E4DFD4] opacity-70 transition hover:opacity-100"
                  >
                    <Image src={image} alt="" fill sizes="112px" className="object-cover" unoptimized />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <span className="rounded-full border border-legacy-red/40 bg-legacy-red/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white [html.light_&]:bg-legacy-red/10 [html.light_&]:border-legacy-red/30 [html.light_&]:text-legacy-red">
              {property.status}
            </span>
            <h1 className="display mt-4 text-4xl text-white [html.light_&]:text-[#121316] font-bold md:text-5xl">{property.title}</h1>
            <p className="mt-3 flex items-start gap-2 text-sm text-slate-300 [html.light_&]:text-[#555d6b]">
              <MapPin size={16} className="mt-0.5 shrink-0 text-legacy-red" />
              {property.addressLabel || "Location available on request"}
            </p>
            <p className="mt-6 font-display text-4xl font-bold text-white [html.light_&]:text-[#121316]">{property.priceDisplay}</p>

            <div className="mt-6 grid grid-cols-3 gap-3 rounded-2xl border border-white/10 [html.light_&]:border-[#E4DFD4] bg-white/[0.03] [html.light_&]:bg-white [html.light_&]:shadow-[0_10px_30px_rgba(24,24,24,0.04)] p-4 text-center">
              <Spec icon={<Bed size={16} />} label="Bedrooms" value={property.bedrooms.toString()} />
              <Spec icon={<Bath size={16} />} label="Bathrooms" value={property.bathrooms.toString()} />
              <Spec icon={<Maximize2 size={15} />} label="Area" value={`${property.area.toLocaleString()} sq ft`} />
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-8">
            <Panel title="Description">
              <p className="text-sm leading-7 text-slate-300 [html.light_&]:text-[#555d6b]">{property.description}</p>
            </Panel>

            <Panel title="Amenities">
              {property.amenities.length > 0 ? (
                <ul className="grid gap-2 sm:grid-cols-2">
                  {property.amenities.map((amenity) => (
                    <li key={amenity} className="flex items-start gap-2 text-sm text-slate-300 [html.light_&]:text-[#555d6b]">
                      <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-legacy-red" />
                      {amenity}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-400 [html.light_&]:text-[#706D68]">Amenities have not been added yet.</p>
              )}
            </Panel>
          </div>

          <aside className="space-y-6">
            <PropertyApplicationForm propertyId={property.id} />
          </aside>
        </section>
      </div>
    </main>
  );
}

function BackLink() {
  return (
    <Link
      href="/property/listings"
      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 [html.light_&]:text-[#706D68] hover:text-white [html.light_&]:hover:text-[#121316]"
    >
      <ArrowLeft size={14} />
      Back to listings
    </Link>
  );
}

function Panel({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <section className="rounded-2xl border border-white/10 [html.light_&]:border-[#E4DFD4] bg-black/40 [html.light_&]:bg-white [html.light_&]:shadow-[0_10px_30px_rgba(24,24,24,0.04)] p-6">
      <h2 className="mb-4 text-lg font-bold text-white [html.light_&]:text-[#121316]">{title}</h2>
      {children}
    </section>
  );
}

function Spec({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <span className="mx-auto flex justify-center text-legacy-red">{icon}</span>
      <span className="mt-1 block text-[10px] font-bold uppercase text-slate-400 [html.light_&]:text-[#706D68]">{label}</span>
      <strong className="mt-1 block text-sm text-white [html.light_&]:text-[#121316] font-bold">{value}</strong>
    </div>
  );
}
