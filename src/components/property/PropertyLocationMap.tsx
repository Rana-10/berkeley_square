"use client";

import { ArrowUpRight, Compass, MapPin, Navigation, Plane, ShoppingBag, Train } from "lucide-react";
import type { NearbyPoint } from "@/data/properties";
import { cn } from "@/lib/utils";

interface PropertyLocationMapProps {
  title: string;
  addressLine: string;
  location: string;
  city: string;
  postcode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  mapEmbedUrl: string;
  nearbyPoints?: NearbyPoint[];
}

function getPointIcon(type: NearbyPoint["type"]) {
  switch (type) {
    case "transport":
      return Train;
    case "airport":
      return Plane;
    case "shopping":
      return ShoppingBag;
    case "landmark":
    default:
      return Compass;
  }
}

export function PropertyLocationMap({
  title,
  addressLine,
  location,
  city,
  postcode,
  coordinates,
  mapEmbedUrl,
  nearbyPoints = []
}: PropertyLocationMapProps) {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${addressLine}, ${city}, ${postcode}`
  )}`;

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={16} className="text-legacy-red" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
              Neighborhood &amp; Connectivity
            </span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
            Prime Situation &amp; Location Map
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {addressLine} · <span className="font-mono text-legacy-red">{postcode}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[11px] text-slate-400">
            GPS: <span className="text-white">{coordinates.lat.toFixed(4)}° N, {Math.abs(coordinates.lng).toFixed(4)}° {coordinates.lng >= 0 ? "E" : "W"}</span>
          </div>

          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl bg-legacy-red px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_15px_rgba(196,58,49,0.4)] transition-all hover:scale-105"
          >
            <Navigation size={13} />
            <span>Get Directions</span>
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>

      {/* Map Embed Container */}
      <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden rounded-3xl border border-white/15 bg-black shadow-2xl">
        <iframe
          src={mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Location Map for ${title}`}
          className="h-full w-full opacity-90 contrast-[1.05] invert-[0.9] hue-rotate-180"
        />

        {/* Location Pin Overlay Card */}
        <div className="absolute bottom-4 left-4 max-w-xs rounded-2xl border border-white/20 bg-black/85 p-3.5 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-2">
            <div className="grid h-7 w-7 place-items-center rounded-lg bg-legacy-red text-white">
              <MapPin size={14} />
            </div>
            <div>
              <p className="text-xs font-bold text-white truncate">{location}</p>
              <p className="text-[10px] font-mono text-slate-400">{postcode}, {city}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Nearby Points of Interest & Transit Connections */}
      {nearbyPoints.length > 0 && (
        <div className="rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl">
          <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Key Local Distances &amp; Travel Times
          </h4>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {nearbyPoints.map((point) => {
              const Icon = getPointIcon(point.type);
              return (
                <div
                  key={point.name}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-3.5 transition-all hover:border-white/20"
                >
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white/5 text-slate-300">
                    <Icon size={15} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white leading-snug">{point.name}</p>
                    <p className="text-[11px] font-mono text-legacy-red font-bold mt-0.5">{point.distance}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
