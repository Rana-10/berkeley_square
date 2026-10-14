"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bath,
  Bed,
  Building2,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  MapPin,
  Maximize2,
} from "lucide-react";
import { propertyMarketOptions, type PropertyMarketOption } from "@/lib/property-markets";
import { propertyService } from "@/lib/property-service";
import {
  filterPropertyViewModels,
  mapPropertyToViewModel,
  type PropertyViewModel,
} from "@/lib/property-view-model";
import { cn } from "@/lib/utils";
import { PropertyStatus } from "@/schema/property.enums";

const fallbackImage =
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1400&q=80";

type SortMode = "created-desc" | "price-desc" | "price-asc" | "area-desc";

export function PropertyListingsHub() {
  const listingsContainerRef = useRef<HTMLDivElement | null>(null);
  const [properties, setProperties] = useState<PropertyViewModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMarket, setSelectedMarket] = useState<PropertyMarketOption>("All");
  const [sortBy, setSortBy] = useState<SortMode>("created-desc");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    let active = true;

    setLoading(true);
    propertyService
      .getProperties(selectedMarket)
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
  }, [selectedMarket]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedMarket, sortBy, itemsPerPage]);

  const filteredProperties = useMemo(() => {
    const filtered = filterPropertyViewModels(properties, {
      market: selectedMarket,
    });

    return filtered.sort((left, right) => {
      if (sortBy === "price-desc") return right.price - left.price;
      if (sortBy === "price-asc") return left.price - right.price;
      if (sortBy === "area-desc") return right.area - left.area;
      return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
    });
  }, [properties, selectedMarket, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProperties.length / itemsPerPage));
  const paginatedProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProperties.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, filteredProperties, itemsPerPage]);

  const startRecord = filteredProperties.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endRecord = Math.min(currentPage * itemsPerPage, filteredProperties.length);

  function handlePageChange(newPage: number) {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    const topOffset = listingsContainerRef.current
      ? listingsContainerRef.current.getBoundingClientRect().top + window.scrollY - 120
      : 0;
    window.scrollTo({ top: topOffset, behavior: "smooth" });
  }

  function resetFilters() {
    setSelectedMarket("All");
  }

  return (
    <div ref={listingsContainerRef} className="select-none font-sans">
      <div className="flex flex-col justify-between gap-6 border-b border-white/10 [html.light_&]:border-black/10 pb-8 lg:flex-row lg:items-end">
        <div>
          <p className="eyebrow mb-2">Property Portfolio</p>
          <h2 className="display text-4xl text-white [html.light_&]:text-[#121316] md:text-6xl">Available Properties</h2>
          <p className="mt-4 max-w-2xl text-base text-slate-300 [html.light_&]:text-[#555d6b]">
            Browse live property records, compare core specifications, and apply directly from each listing.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1 rounded-xl border border-white/15 bg-black/40 p-1 backdrop-blur-md [html.light_&]:border-black/10 [html.light_&]:bg-black/[0.04] sm:flex">
            <IconButton active={viewMode === "grid"} label="Grid view" onClick={() => setViewMode("grid")}>
              <LayoutGrid size={16} />
            </IconButton>
            <IconButton active={viewMode === "list"} label="List view" onClick={() => setViewMode("list")}>
              <List size={16} />
            </IconButton>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-xs text-slate-300 [html.light_&]:border-black/10 [html.light_&]:bg-black/[0.04] [html.light_&]:text-[#181818]">
            <span className="font-bold text-white [html.light_&]:text-[#121316]">{filteredProperties.length}</span> properties
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-5 rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-2xl [html.light_&]:border-[#E8E5E0] [html.light_&]:bg-white [html.light_&]:shadow-sm">
        <div className="flex flex-wrap gap-2">
          {propertyMarketOptions.map((market) => (
            <FilterChip
              key={market}
              active={selectedMarket === market}
              onClick={() => setSelectedMarket(market)}
            >
              {market === "All" ? "All markets" : market}
            </FilterChip>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as SortMode)}
            className="focus-ring rounded-2xl border border-white/15 bg-black px-4 py-3 text-sm text-white [html.light_&]:border-black/15 [html.light_&]:bg-white [html.light_&]:text-[#181818]"
          >
            <option value="created-desc">Newest first</option>
            <option value="price-desc">Price high to low</option>
            <option value="price-asc">Price low to high</option>
            <option value="area-desc">Largest area</option>
          </select>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:border-legacy-red [html.light_&]:border-black/15 [html.light_&]:bg-black/[0.03] [html.light_&]:text-[#181818]"
          >
            Reset
          </button>
        </div>
      </div>

      {loading ? (
        <StatePanel title="Loading properties" text="Fetching the latest property records." />
      ) : error ? (
        <StatePanel title="Unable to load properties" text={error} />
      ) : paginatedProperties.length === 0 ? (
        <StatePanel title="No properties found" text="No properties match the selected criteria. Please adjust your filters or contact our Mayfair desk for off-market opportunities." />
      ) : viewMode === "grid" ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="mt-10 grid gap-4">
          {paginatedProperties.map((property) => (
            <PropertyListRow key={property.id} property={property} />
          ))}
        </div>
      )}

      {!loading && !error && filteredProperties.length > 0 && (
        <Pagination
          currentPage={currentPage}
          endRecord={endRecord}
          filteredCount={filteredProperties.length}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          startRecord={startRecord}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

function PropertyCard({ property }: { property: PropertyViewModel }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c12]/95 shadow-xl transition hover:border-legacy-red/40 [html.light_&]:bg-white [html.light_&]:border-[#E8E5E0] [html.light_&]:shadow-[0_10px_30px_rgba(0,0,0,0.03)] [html.light_&]:hover:border-legacy-red/40 [html.light_&]:hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)]">
      <PropertyImage property={property} className="aspect-[16/10]" />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-display text-2xl font-bold text-white [html.light_&]:text-[#121316]">{property.priceDisplay}</p>
            <h3 className="mt-2 line-clamp-1 text-base font-bold text-white group-hover:text-legacy-red [html.light_&]:text-[#121316]">
              {property.title}
            </h3>
          </div>
          <StatusBadge status={property.status} />
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-400 [html.light_&]:text-[#555d6b]">
          <MapPin size={13} className="text-legacy-red" />
          <span className="line-clamp-1">{property.addressLabel || "Location available on request"}</span>
        </p>
        <SpecGrid property={property} />
        <div className="mt-5 grid grid-cols-2 gap-2">
          <CardLink href={`/property/${property.id}`}>View</CardLink>
          <CardLink href={`/property/${property.id}#apply`} primary>
            Apply
          </CardLink>
        </div>
      </div>
    </article>
  );
}

function PropertyListRow({ property }: { property: PropertyViewModel }) {
  return (
    <article className="grid gap-4 rounded-2xl border border-white/10 bg-[#0c0c12]/95 p-4 md:grid-cols-[240px_1fr_auto] md:items-center [html.light_&]:bg-white [html.light_&]:border-[#E8E5E0] [html.light_&]:shadow-sm">
      <PropertyImage property={property} className="aspect-[16/10] rounded-xl" />
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={property.status} />
          <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300 [html.light_&]:border-black/10 [html.light_&]:text-[#555d6b]">
            {property.propertyType}
          </span>
        </div>
        <h3 className="mt-3 text-lg font-bold text-white [html.light_&]:text-[#121316]">{property.title}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-400 [html.light_&]:text-[#555d6b]">
          <MapPin size={13} className="text-legacy-red" />
          {property.addressLabel || "Location available on request"}
        </p>
        <SpecGrid property={property} />
      </div>
      <div className="flex items-center justify-between gap-4 md:block md:text-right">
        <p className="font-display text-2xl font-bold text-white [html.light_&]:text-[#121316]">{property.priceDisplay}</p>
        <div className="mt-0 flex gap-2 md:mt-4">
          <CardLink href={`/property/${property.id}`}>View</CardLink>
          <CardLink href={`/property/${property.id}#apply`} primary>
            Apply
          </CardLink>
        </div>
      </div>
    </article>
  );
}

function PropertyImage({ property, className }: { property: PropertyViewModel; className: string }) {
  return (
    <div className={cn("relative w-full overflow-hidden bg-black/60", className)}>
      <Image
        src={property.featuredImage ?? fallbackImage}
        alt={property.title}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition duration-700 group-hover:scale-105"
        unoptimized
      />
      <div className="absolute bottom-3 left-3 rounded-md border border-white/15 bg-black/75 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
        {property.propertyType}
      </div>
    </div>
  );
}

function SpecGrid({ property }: { property: PropertyViewModel }) {
  return (
    <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-center text-xs font-mono [html.light_&]:border-[#E8E5E0] [html.light_&]:bg-[#FAF8F5]">
      <Spec icon={<Bed size={14} />} label="Beds" value={property.bedrooms.toString()} />
      <Spec icon={<Bath size={14} />} label="Baths" value={property.bathrooms.toString()} />
      <Spec icon={<Maximize2 size={13} />} label="Area" value={`${property.area.toLocaleString()} sq ft`} />
    </div>
  );
}

function Spec({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="min-w-0">
      <span className="block text-[10px] font-bold uppercase text-slate-400 [html.light_&]:text-[#7a828e]">{label}</span>
      <span className="mt-1 flex items-center justify-center gap-1 text-xs font-bold text-white [html.light_&]:text-[#121316]">
        <span className="text-legacy-red">{icon}</span>
        <span className="truncate">{value}</span>
      </span>
    </div>
  );
}

function StatusBadge({ status }: { status: PropertyStatus }) {
  const className =
    status === PropertyStatus.AVAILABLE
    || status === PropertyStatus.AVAILABLE_FOR_SALE
    || status === PropertyStatus.AVAILABLE_FOR_RENT
      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300 [html.light_&]:text-emerald-700 [html.light_&]:bg-emerald-50"
      : status === PropertyStatus.SOLD
        ? "border-slate-400/30 bg-slate-500/10 text-slate-300 [html.light_&]:text-slate-600 [html.light_&]:bg-slate-100"
        : "border-amber-500/40 bg-amber-500/10 text-amber-300 [html.light_&]:text-amber-700 [html.light_&]:bg-amber-50";

  return (
    <span className={cn("shrink-0 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider", className)}>
      {status}
    </span>
  );
}

function IconButton({
  active,
  children,
  label,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "grid h-9 w-9 place-items-center rounded-lg transition-all",
        active ? "bg-legacy-red text-white" : "text-slate-400 hover:text-white [html.light_&]:text-slate-600 [html.light_&]:hover:text-slate-950",
      )}
      aria-label={label}
      title={label}
    >
      {children}
    </button>
  );
}

function FilterChip({ active, children, onClick }: { active: boolean; children: ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
        active
          ? "border-legacy-red bg-legacy-red/20 text-white [html.light_&]:bg-legacy-red [html.light_&]:text-white"
          : "border-white/10 bg-white/[0.03] text-slate-300 hover:text-white [html.light_&]:border-black/10 [html.light_&]:bg-black/[0.03] [html.light_&]:text-[#555d6b] [html.light_&]:hover:text-slate-900",
      )}
    >
      {children}
    </button>
  );
}

function CardLink({ children, href, primary = false }: { children: ReactNode; href: string; primary?: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-xl py-2.5 text-center text-xs font-bold uppercase tracking-wider text-white transition",
        primary
          ? "bg-legacy-red hover:bg-legacy-deepRed text-white"
          : "border border-white/15 bg-white/5 hover:border-legacy-red [html.light_&]:border-black/15 [html.light_&]:bg-black/[0.03] [html.light_&]:text-[#121316]",
      )}
    >
      {children}
    </Link>
  );
}

function StatePanel({ title, text }: { title: string; text: string }) {
  return (
    <div className="mt-12 rounded-2xl border border-white/10 bg-black/40 p-12 text-center [html.light_&]:border-[#E8E5E0] [html.light_&]:bg-white">
      <Building2 size={36} className="mx-auto mb-4 text-slate-500 [html.light_&]:text-slate-400" />
      <h3 className="text-lg font-bold text-white [html.light_&]:text-[#121316]">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-slate-400 [html.light_&]:text-[#555d6b]">{text}</p>
    </div>
  );
}

function Pagination({
  currentPage,
  endRecord,
  filteredCount,
  itemsPerPage,
  setItemsPerPage,
  startRecord,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  endRecord: number;
  filteredCount: number;
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
  startRecord: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur-2xl sm:flex-row [html.light_&]:border-[#E8E5E0] [html.light_&]:bg-white">
      <div className="text-xs font-mono text-slate-400 [html.light_&]:text-[#555d6b]">
        Showing <strong className="text-white [html.light_&]:text-[#121316]">{startRecord}</strong>-<strong className="text-white [html.light_&]:text-[#121316]">{endRecord}</strong> of{" "}
        <strong className="text-white [html.light_&]:text-[#121316]">{filteredCount}</strong>
      </div>
      <div className="flex items-center gap-1.5">
        <IconButton active={false} label="Previous page" onClick={() => onPageChange(currentPage - 1)}>
          <ChevronLeft size={16} />
        </IconButton>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={cn(
              "grid h-9 w-9 place-items-center rounded-xl text-xs font-bold",
              currentPage === page
                ? "bg-legacy-red text-white"
                : "border border-white/10 bg-white/5 text-slate-400 hover:text-white [html.light_&]:border-black/10 [html.light_&]:bg-black/[0.03] [html.light_&]:text-[#555d6b]",
            )}
          >
            {page}
          </button>
        ))}
        <IconButton active={false} label="Next page" onClick={() => onPageChange(currentPage + 1)}>
          <ChevronRight size={16} />
        </IconButton>
      </div>
      <div className="hidden items-center gap-2 font-mono text-xs text-slate-400 [html.light_&]:text-[#555d6b] lg:flex">
        <span>Per page</span>
        {[6, 9, 12].map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => setItemsPerPage(size)}
            className={cn(
              "rounded-lg px-2.5 py-1 text-[11px] font-bold",
              itemsPerPage === size
                ? "bg-white/20 text-white [html.light_&]:bg-black/10 [html.light_&]:text-[#121316]"
                : "text-slate-500 hover:text-slate-300 [html.light_&]:text-slate-400 [html.light_&]:hover:text-slate-800",
            )}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
