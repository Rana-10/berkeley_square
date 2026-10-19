"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { propertyMarketOptions, type PropertyMarketOption } from "@/lib/property-markets";
import { propertyService } from "@/lib/property-service";
import {
  filterPropertyViewModels,
  mapPropertyToViewModel,
  type PropertyViewModel,
} from "@/lib/property-view-model";
import { cn } from "@/lib/utils";
import { PropertyStatus } from "@/schema/property.enums";

const fallbackImage = "/images/uk/victorian-terracotta-corner.webp";
const PAGE_SIZE = 6;

const priceBands = [
  { value: "any", label: "Any price", test: () => true },
  { value: "under-20", label: "Up to 20 million", test: (price: number) => price <= 20_000_000 },
  { value: "20-30", label: "20 – 30 million", test: (price: number) => price > 20_000_000 && price <= 30_000_000 },
  { value: "over-30", label: "Over 30 million", test: (price: number) => price > 30_000_000 },
];

const green = "bg-[#143F2E] text-white hover:bg-[#0F3226]";

export function PropertyListingsHub() {
  const resultsRef = useRef<HTMLDivElement | null>(null);
  const [properties, setProperties] = useState<PropertyViewModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // What the visitor has picked, and what has been applied by "Find a property".
  const [draft, setDraft] = useState({ market: "All" as PropertyMarketOption, type: "all", price: "any" });
  const [applied, setApplied] = useState(draft);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let active = true;
    // Never leave the visitor on "Fetching" indefinitely: give up after 15 seconds with a clear message.
    const timeout = new Promise<never>((_, reject) =>
      window.setTimeout(() => reject(new Error("The property list is taking too long to load. Please refresh the page, or contact us if it continues.")), 15000)
    );
    Promise.race([propertyService.getProperties("All"), timeout])
      .then((items) => {
        if (!active) return;
        setProperties(items.map(mapPropertyToViewModel));
        setError(null);
      })
      .catch((loadError: unknown) => {
        if (!active) return;
        setError(loadError instanceof Error ? loadError.message : "Unable to load properties.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const propertyTypes = useMemo(() => Array.from(new Set(properties.map((p) => p.propertyType).filter(Boolean))).sort(), [properties]);

  const results = useMemo(() => {
    const band = priceBands.find((b) => b.value === applied.price) ?? priceBands[0];
    return filterPropertyViewModels(properties, { market: applied.market })
      .filter((p) => applied.type === "all" || p.propertyType === applied.type)
      .filter((p) => band.test(p.price))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [properties, applied]);

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const visible = results.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function applyFilters() {
    setApplied(draft);
    setCurrentPage(1);
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function goToPage(page: number) {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="select-none">
      {/* Search row */}
      <form
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end lg:gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          applyFilters();
        }}
      >
        <SelectField label="Location" value={draft.market} onChange={(value) => setDraft({ ...draft, market: value as PropertyMarketOption })}>
          {propertyMarketOptions.map((market) => (
            <option key={market} value={market}>
              {market === "All" ? "All markets" : market === "UK" ? "United Kingdom" : market}
            </option>
          ))}
        </SelectField>
        <SelectField label="Property type" value={draft.type} onChange={(value) => setDraft({ ...draft, type: value })}>
          <option value="all">All property types</option>
          {propertyTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </SelectField>
        <SelectField label="Price" value={draft.price} onChange={(value) => setDraft({ ...draft, price: value })}>
          {priceBands.map((band) => (
            <option key={band.value} value={band.value}>
              {band.label}
            </option>
          ))}
        </SelectField>
        <button
          type="submit"
          className={cn("focus-ring inline-flex h-11 items-center justify-center gap-3 px-8 text-[15px] font-medium transition-colors sm:col-span-2 lg:col-span-1", green)}
        >
          Find a property <ArrowRight size={16} />
        </button>
      </form>

      <div ref={resultsRef} className="mt-12 scroll-mt-28 border-t border-[#181818]/15 pt-10 md:mt-14">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="display text-[2rem] font-normal leading-none md:text-[2.6rem]">Selected properties</h2>
            <span aria-hidden className="mt-4 block h-[2px] w-10 bg-[#C43A31]" />
          </div>
          <div className="hidden overflow-hidden border border-[#143F2E] text-sm sm:flex" role="group" aria-label="View">
            <ViewToggle active={viewMode === "grid"} onClick={() => setViewMode("grid")}>
              Grid
            </ViewToggle>
            <ViewToggle active={viewMode === "list"} onClick={() => setViewMode("list")}>
              List
            </ViewToggle>
          </div>
        </div>

        {loading ? (
          <StatePanel title="Loading properties" text="Fetching the latest property records." />
        ) : error ? (
          <StatePanel title="Unable to load properties" text={error} />
        ) : visible.length === 0 ? (
          <StatePanel title="No properties found" text="Nothing matches those criteria. Try widening your search, or speak to our Mayfair desk about off-market opportunities." />
        ) : viewMode === "grid" ? (
          <div className="mt-8 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((property, index) => (
              <PropertyEntry key={property.id} property={property} priority={index < 3} />
            ))}
          </div>
        ) : (
          <div className="mt-8 border-t border-[#181818]/15">
            {visible.map((property) => (
              <PropertyListRow key={property.id} property={property} />
            ))}
          </div>
        )}

        {!loading && !error && results.length > PAGE_SIZE && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />}
      </div>
    </div>
  );
}

function SelectField({ label, value, onChange, children }: { label: string; value: string; onChange: (value: string) => void; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] text-[#4A4844]">{label}</span>
      <span className="relative block">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="focus-ring h-11 w-full appearance-none border border-[#181818]/30 bg-[#F6F2EA] px-4 pr-10 text-[15px] text-[#181818]"
        >
          {children}
        </select>
        <ChevronDown size={16} aria-hidden className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#181818]" />
      </span>
    </label>
  );
}

function PropertyEntry({ property, priority = false }: { property: PropertyViewModel; priority?: boolean }) {
  return (
    <article className="group flex flex-col">
      <Link href={`/property/${property.id}`} className="focus-ring block" tabIndex={-1} aria-hidden>
        <PropertyImage property={property} className="aspect-[3/2]" priority={priority} />
      </Link>
      <div className="mt-5 flex-1">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#4A4844]">{locationLabel(property)}</p>
        <h3 className="display mt-2 text-[1.6rem] font-normal leading-tight">
          <Link href={`/property/${property.id}`} className="focus-ring">
            {property.title}
          </Link>
        </h3>
        <p className="mt-2 text-[15px] text-[#4A4844]">{specLine(property)}</p>
        <p className="mt-3 text-[15px] text-[#181818]">{property.priceDisplay}</p>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2.5 border-t border-[#181818]/15 pt-5">
        <Link href={`/property/${property.id}`} className={cn("focus-ring inline-flex h-11 items-center justify-center gap-2.5 text-sm font-medium transition-colors", green)}>
          View property <ArrowRight size={15} />
        </Link>
        <Link
          href={`/property/${property.id}#apply`}
          className="focus-ring inline-flex h-11 items-center justify-center border border-[#181818]/30 text-sm font-medium text-[#181818] transition-colors hover:border-[#143F2E] hover:bg-[#143F2E] hover:text-white"
        >
          Enquire
        </Link>
      </div>
    </article>
  );
}

function PropertyListRow({ property }: { property: PropertyViewModel }) {
  return (
    <article className="group grid gap-5 border-b border-[#181818]/15 py-7 md:grid-cols-[280px_1fr_auto] md:items-center md:gap-10">
      <Link href={`/property/${property.id}`} className="focus-ring block" tabIndex={-1} aria-hidden>
        <PropertyImage property={property} className="aspect-[3/2]" />
      </Link>
      <div>
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#4A4844]">{locationLabel(property)}</p>
        <h3 className="display mt-2 text-2xl font-normal leading-tight">
          <Link href={`/property/${property.id}`} className="focus-ring">
            {property.title}
          </Link>
        </h3>
        <p className="mt-2 text-[15px] text-[#4A4844]">{specLine(property)}</p>
        <p className="mt-3 text-[15px] text-[#181818]">{property.priceDisplay}</p>
      </div>
      <div className="grid grid-cols-2 gap-2.5 md:w-[19rem]">
        <Link href={`/property/${property.id}`} className={cn("focus-ring inline-flex h-11 items-center justify-center gap-2.5 text-sm font-medium transition-colors", green)}>
          View property <ArrowRight size={15} />
        </Link>
        <Link
          href={`/property/${property.id}#apply`}
          className="focus-ring inline-flex h-11 items-center justify-center border border-[#181818]/30 text-sm font-medium text-[#181818] transition-colors hover:border-[#143F2E] hover:bg-[#143F2E] hover:text-white"
        >
          Enquire
        </Link>
      </div>
    </article>
  );
}

function PropertyImage({ property, className, priority = false }: { property: PropertyViewModel; className: string; priority?: boolean }) {
  const src = property.featuredImage ?? fallbackImage;
  return (
    <div className={cn("relative w-full overflow-hidden bg-[#E3DED2]", className)}>
      <Image
        src={src}
        alt={property.title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
        quality={78}
        priority={priority}
        className="object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.03]"
        unoptimized={!src.startsWith("/")}
      />
      <StatusTag status={property.status} />
    </div>
  );
}

function StatusTag({ status }: { status: PropertyStatus }) {
  return <span className="absolute left-2.5 top-2.5 border border-[#181818]/10 bg-[#F6F2EA]/95 px-2.5 py-1 text-[11px] text-[#181818]">{status}</span>;
}

function locationLabel(property: PropertyViewModel) {
  return property.city || "Location on request";
}

function specLine(property: PropertyViewModel) {
  return [
    property.bedrooms ? `${property.bedrooms} bedrooms` : null,
    property.bathrooms ? `${property.bathrooms} bathrooms` : null,
    property.area ? `${property.area.toLocaleString()} sq ft` : null,
  ]
    .filter(Boolean)
    .join("  ·  ");
}

function ViewToggle({ active, children, onClick }: { active: boolean; children: ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn("focus-ring px-5 py-2 transition-colors", active ? "bg-[#143F2E] text-white" : "bg-transparent text-[#181818] hover:bg-[#143F2E]/10")}
    >
      {children}
    </button>
  );
}

function StatePanel({ title, text }: { title: string; text: string }) {
  return (
    <div className="mt-8 border-y border-[#181818]/15 py-16">
      <h3 className="display text-2xl font-normal">{title}</h3>
      <p className="mt-2 max-w-md text-[#4A4844]">{text}</p>
    </div>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (page: number) => void }) {
  const nav = "focus-ring grid h-9 w-9 place-items-center text-[#181818] transition-colors hover:text-[#C43A31] disabled:opacity-30";
  return (
    <div className="mt-14 flex items-center justify-center gap-1 border-t border-[#181818]/15 pt-6">
      <button type="button" className={nav} aria-label="Previous page" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        <ChevronLeft size={16} />
      </button>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          aria-current={currentPage === page ? "page" : undefined}
          className={cn(
            "focus-ring grid h-9 w-9 place-items-center border-b-2 text-sm transition-colors",
            currentPage === page ? "border-[#C43A31] text-[#181818]" : "border-transparent text-[#4A4844] hover:text-[#181818]"
          )}
        >
          {page}
        </button>
      ))}
      <button type="button" className={nav} aria-label="Next page" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
