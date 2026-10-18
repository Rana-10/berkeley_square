"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
    <div ref={listingsContainerRef} className="select-none">
      <div className="flex flex-col justify-end gap-6 border-b border-theme-border pb-6 lg:flex-row lg:items-end">
        <div className="flex items-center gap-6 text-[11px] font-bold uppercase tracking-[0.18em]">
          <div className="hidden items-center gap-4 sm:flex" role="group" aria-label="View">
            <ViewToggle active={viewMode === "grid"} onClick={() => setViewMode("grid")}>
              Grid
            </ViewToggle>
            <ViewToggle active={viewMode === "list"} onClick={() => setViewMode("list")}>
              List
            </ViewToggle>
          </div>
          <span className="text-theme-muted">
            <span className="display text-2xl font-semibold normal-case tracking-normal text-theme-primary">{filteredProperties.length}</span> properties
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-b border-theme-border py-5 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {propertyMarketOptions.map((market) => (
            <FilterChip key={market} active={selectedMarket === market} onClick={() => setSelectedMarket(market)}>
              {market === "All" ? "All markets" : market}
            </FilterChip>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <label className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-theme-muted">
            Sort
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortMode)}
              className="focus-ring border-0 border-b border-[#181818]/60 bg-transparent py-1 pr-6 text-sm font-medium normal-case tracking-normal text-theme-primary"
            >
              <option value="created-desc">Newest first</option>
              <option value="price-desc">Price high to low</option>
              <option value="price-asc">Price low to high</option>
              <option value="area-desc">Largest area</option>
            </select>
          </label>
          <button
            type="button"
            onClick={resetFilters}
            className="focus-ring text-[11px] font-bold uppercase tracking-[0.18em] text-theme-primary underline decoration-[#181818]/40 underline-offset-4 transition-colors hover:text-legacy-red"
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
        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedProperties.map((property, index) => (
            <PropertyEntry key={property.id} property={property} priority={index < 3} />
          ))}
        </div>
      ) : (
        <div className="mt-4 border-t border-[#181818]/70">
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

/** Image first; price, address and facts are set beneath it as plain type. */
function PropertyEntry({ property, priority = false }: { property: PropertyViewModel; priority?: boolean }) {
  return (
    <article className="group">
      <Link href={`/property/${property.id}`} className="focus-ring block">
        <PropertyImage property={property} className="aspect-[4/3]" priority={priority} />
      </Link>
      <div className="mt-4 border-t border-[#181818]/70 pt-4">
        <div className="flex items-baseline justify-between gap-4">
          <p className="display text-2xl font-semibold text-theme-primary">{property.priceDisplay}</p>
          <StatusLabel status={property.status} />
        </div>
        <h3 className="mt-2 line-clamp-1 text-base font-semibold text-theme-primary transition-colors group-hover:text-legacy-red">
          <Link href={`/property/${property.id}`}>{property.title}</Link>
        </h3>
        <p className="mt-1 line-clamp-1 text-sm text-theme-secondary">{property.addressLabel || "Location available on request"}</p>
        <SpecLine property={property} />
        <div className="mt-4 flex gap-6 text-[11px] font-bold uppercase tracking-[0.18em]">
          <CardLink href={`/property/${property.id}`}>View</CardLink>
          <CardLink href={`/property/${property.id}#apply`}>Apply</CardLink>
        </div>
      </div>
    </article>
  );
}

function PropertyListRow({ property }: { property: PropertyViewModel }) {
  return (
    <article className="group grid gap-5 border-b border-theme-border py-7 md:grid-cols-[260px_1fr_auto] md:items-center md:gap-10">
      <Link href={`/property/${property.id}`} className="focus-ring block">
        <PropertyImage property={property} className="aspect-[4/3]" />
      </Link>
      <div>
        <StatusLabel status={property.status} />
        <h3 className="display mt-2 text-2xl font-semibold text-theme-primary transition-colors group-hover:text-legacy-red">{property.title}</h3>
        <p className="mt-1 text-sm text-theme-secondary">{property.addressLabel || "Location available on request"}</p>
        <SpecLine property={property} />
      </div>
      <div className="flex items-center justify-between gap-6 md:block md:text-right">
        <p className="display text-3xl font-semibold text-theme-primary">{property.priceDisplay}</p>
        <div className="flex gap-6 text-[11px] font-bold uppercase tracking-[0.18em] md:mt-4 md:justify-end">
          <CardLink href={`/property/${property.id}`}>View</CardLink>
          <CardLink href={`/property/${property.id}#apply`}>Apply</CardLink>
        </div>
      </div>
    </article>
  );
}

function PropertyImage({ property, className, priority = false }: { property: PropertyViewModel; className: string; priority?: boolean }) {
  const src = property.featuredImage ?? fallbackImage;
  return (
    <figure className="m-0">
      <div className={cn("relative w-full overflow-hidden bg-[#C6D3C0]", className)}>
        <Image
          src={src}
          alt={property.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
          quality={75}
          priority={priority}
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
          unoptimized={!src.startsWith("/")}
        />
      </div>
      <figcaption className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-theme-muted">{property.propertyType}</figcaption>
    </figure>
  );
}

/** Beds, baths and area as a single ruled line of facts. */
function SpecLine({ property }: { property: PropertyViewModel }) {
  const facts = [
    ["Beds", property.bedrooms.toString()],
    ["Baths", property.bathrooms.toString()],
    ["Area", `${property.area.toLocaleString()} sq ft`]
  ];
  return (
    <dl className="mt-4 grid grid-cols-3 divide-x divide-theme-border border-y border-theme-border text-sm">
      {facts.map(([term, value], idx) => (
        <div key={term} className={cn("py-2.5", idx > 0 && "pl-4")}>
          <dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-theme-muted">{term}</dt>
          <dd className="mt-0.5 font-semibold text-theme-primary">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function StatusLabel({ status }: { status: PropertyStatus }) {
  const available =
    status === PropertyStatus.AVAILABLE ||
    status === PropertyStatus.AVAILABLE_FOR_SALE ||
    status === PropertyStatus.AVAILABLE_FOR_RENT;
  return (
    <span
      className={cn(
        "shrink-0 text-[11px] font-bold uppercase tracking-[0.18em]",
        available ? "text-[#2F5D46]" : status === PropertyStatus.SOLD ? "text-theme-muted" : "text-legacy-red"
      )}
    >
      {status}
    </span>
  );
}

function ViewToggle({ active, children, onClick }: { active: boolean; children: ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "focus-ring border-b-2 pb-0.5 transition-colors",
        active ? "border-legacy-red text-theme-primary" : "border-transparent text-theme-muted hover:text-theme-primary"
      )}
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
        "focus-ring border-b-2 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] transition-colors",
        active ? "border-legacy-red text-theme-primary" : "border-transparent text-theme-muted hover:text-theme-primary"
      )}
    >
      {children}
    </button>
  );
}

function CardLink({ children, href }: { children: ReactNode; href: string }) {
  return (
    <Link
      href={href}
      className="focus-ring border-b border-theme-primary pb-0.5 text-theme-primary transition-colors hover:border-legacy-red hover:text-legacy-red"
    >
      {children} →
    </Link>
  );
}

function StatePanel({ title, text }: { title: string; text: string }) {
  return (
    <div className="mt-12 border-y border-theme-border py-16">
      <h3 className="display text-2xl font-semibold text-theme-primary">{title}</h3>
      <p className="mt-2 max-w-md text-theme-secondary">{text}</p>
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
  const nav = "focus-ring grid h-9 w-9 place-items-center text-theme-primary transition-colors hover:text-legacy-red disabled:opacity-30";
  return (
    <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[#181818]/70 pt-5 sm:flex-row">
      <p className="text-sm text-theme-secondary">
        Showing <strong className="text-theme-primary">{startRecord}</strong>–<strong className="text-theme-primary">{endRecord}</strong> of{" "}
        <strong className="text-theme-primary">{filteredCount}</strong>
      </p>
      <div className="flex items-center gap-1">
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
              "focus-ring grid h-9 w-9 place-items-center border-b-2 text-sm font-semibold transition-colors",
              currentPage === page ? "border-legacy-red text-theme-primary" : "border-transparent text-theme-muted hover:text-theme-primary"
            )}
          >
            {page}
          </button>
        ))}
        <button type="button" className={nav} aria-label="Next page" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="hidden items-center gap-4 text-[11px] font-bold uppercase tracking-[0.18em] text-theme-muted lg:flex">
        <span>Per page</span>
        {[6, 9, 12].map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => setItemsPerPage(size)}
            className={cn(
              "focus-ring border-b-2 pb-0.5 transition-colors",
              itemsPerPage === size ? "border-legacy-red text-theme-primary" : "border-transparent hover:text-theme-primary"
            )}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
