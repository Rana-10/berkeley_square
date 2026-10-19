"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PropertyApplicationForm } from "@/components/property/PropertyApplicationForm";
import { propertyService } from "@/lib/property-service";
import { mapPropertyToViewModel, type PropertyViewModel } from "@/lib/property-view-model";
import { cn } from "@/lib/utils";

const fallbackImage = "/images/uk/victorian-terracotta-corner.webp";

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

  if (error || !property) {
    return (
      <main className="container min-h-screen select-none bg-theme-page pt-36 md:pt-44">
        <BackLink />
        <div className="mt-8 border-y border-theme-border py-16">
          <h1 className="display text-3xl font-semibold text-theme-primary">{error ? "Property unavailable" : "Loading property"}</h1>
          <p className="mt-2 text-theme-secondary">{error ?? "Loading property details."}</p>
        </div>
      </main>
    );
  }

  const facts: [string, string][] = [
    ["Bedrooms", property.bedrooms.toString()],
    ["Bathrooms", property.bathrooms.toString()],
    ["Area", `${property.area.toLocaleString()} sq ft`],
    ["Type", property.propertyType]
  ];

  return (
    <main className="select-none bg-theme-page pb-24 pt-36 md:pt-44">
      <div className="container">
        <BackLink />

        {/* Photograph first, then price and address as plain type */}
        <section className="mt-8">
          <figure className="m-0">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#DDD7CA] md:aspect-[16/9]">
              <Image
                src={gallery[activeImage]}
                alt={property.title}
                fill
                sizes="(max-width: 1240px) 100vw, 1180px"
                className="object-cover"
                priority
                unoptimized={!gallery[activeImage].startsWith("/")}
              />
            </div>
            <figcaption className="mt-2.5 flex items-baseline justify-between border-t border-[#181818]/20 pt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-theme-muted">
              <span>{property.title}</span>
              <span>
                {activeImage + 1} / {gallery.length}
              </span>
            </figcaption>
          </figure>

          {gallery.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
              {gallery.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-label={`Show photograph ${index + 1}`}
                  aria-current={index === activeImage}
                  className={cn(
                    "focus-ring relative h-20 w-28 shrink-0 overflow-hidden border-b-2 transition-opacity",
                    index === activeImage ? "border-legacy-red opacity-100" : "border-transparent opacity-60 hover:opacity-100"
                  )}
                >
                  <Image src={image} alt="" fill sizes="112px" className="object-cover" unoptimized={!image.startsWith("/")} />
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="mt-14 grid gap-10 border-t border-theme-border pt-10 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <div>
            <p className="eyebrow">{property.status}</p>
            <h1 className="display mt-4 text-4xl font-semibold leading-tight text-theme-primary md:text-6xl">{property.title}</h1>
            <p className="mt-3 text-lg text-theme-secondary">{property.addressLabel || "Location available on request"}</p>
          </div>
          <div className="lg:text-right">
            <p className="display text-4xl font-semibold text-theme-primary md:text-5xl">{property.priceDisplay}</p>
          </div>
        </section>

        <dl className="mt-10 grid border-y border-[#181818]/70 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map(([term, value], idx) => (
            <div key={term} className={cn("py-6", idx > 0 && "border-t border-theme-border sm:border-t-0 sm:pl-6 lg:border-l", idx % 2 === 0 && "sm:pl-0 lg:pl-6", idx === 0 && "lg:pl-0")}>
              <dt className="text-[11px] font-bold uppercase tracking-[0.18em] text-legacy-red">{term}</dt>
              <dd className="display mt-2 text-3xl font-semibold text-theme-primary">{value}</dd>
            </div>
          ))}
        </dl>

        <section className="mt-14 grid gap-12 lg:grid-cols-[1fr_380px] lg:gap-20">
          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-legacy-red">Description</h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-theme-secondary">{property.description}</p>

            <h2 className="mt-14 text-[11px] font-bold uppercase tracking-[0.2em] text-legacy-red">Amenities</h2>
            {property.amenities.length > 0 ? (
              <ul className="mt-4 grid gap-x-10 border-t border-[#181818]/70 sm:grid-cols-2">
                {property.amenities.map((amenity) => (
                  <li key={amenity} className="border-b border-theme-border py-3 text-sm text-theme-secondary">
                    {amenity}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-theme-muted">Amenities have not been added yet.</p>
            )}
          </div>

          <aside>
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
      className="focus-ring inline-block border-b border-theme-primary pb-0.5 text-[11px] font-bold uppercase tracking-[0.18em] text-theme-primary transition-colors hover:border-legacy-red hover:text-legacy-red"
    >
      ← Back to listings
    </Link>
  );
}
