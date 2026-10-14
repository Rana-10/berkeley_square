"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { divisions } from "@/data/company";

function ShimmerDivisionCard({
  division
}: {
  division: (typeof divisions)[0];
}) {
  const cardRef = useRef<HTMLAnchorElement | null>(null);
  const Icon = division.icon;

  function handlePointerMove(e: React.PointerEvent<HTMLAnchorElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--card-x", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--card-y", `${e.clientY - rect.top}px`);
  }

  return (
    <Link
      ref={cardRef}
      href={division.href}
      onPointerMove={handlePointerMove}
      className="group relative block h-full overflow-hidden rounded-2xl border border-white/[0.1] bg-legacy-panel/85 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-white/30 hover:shadow-[0_16px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(225,18,45,0.15)] [html.light_&]:bg-white [html.light_&]:border-[#E8E5E0] [html.light_&]:shadow-[0_10px_30px_rgba(0,0,0,0.03)] [html.light_&]:hover:border-legacy-red/40 [html.light_&]:hover:shadow-[0_20px_40px_rgba(0,0,0,0.08),0_0_20px_rgba(225,18,45,0.08)]"
    >
      {/* 1. Dynamic Cursor Light Spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(350px circle at var(--card-x, 50%) var(--card-y, 50%), rgba(225, 18, 45, 0.16), transparent 65%)"
        }}
      />

      {/* 2. Shimmering Diagonal Light Beam Sweep */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[150%] rotate-45 transform-gpu bg-gradient-to-r from-transparent via-white/[0.06] to-transparent opacity-0 transition-opacity duration-700 group-hover:animate-shimmer-sweep group-hover:opacity-100 [html.light_&]:via-black/[0.02]"
      />

      {/* 3. Hairline Top Glass Highlight Border */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100 [html.light_&]:via-black/10"
      />

      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={division.image}
          alt={`${division.name} service image`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 380px"
          quality={80}
          className="object-cover opacity-70 saturate-[.85] transition duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:saturate-100 [html.light_&]:opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-legacy-panel via-black/30 to-transparent [html.light_&]:from-white/20 [html.light_&]:via-transparent" />
      </div>

      <div className="relative z-10 p-5 md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="grid h-10 w-10 place-items-center rounded-xl border border-legacy-red/40 bg-legacy-red/10 text-legacy-red transition-all duration-300 group-hover:border-legacy-red group-hover:bg-legacy-red group-hover:text-white group-hover:shadow-[0_0_15px_rgba(225,18,45,0.5)]">
            <Icon size={20} />
          </div>
        </div>
        <h3 className="display text-xl md:text-2xl text-white transition-colors duration-300 group-hover:text-white [html.light_&]:text-[#121316] [html.light_&]:group-hover:text-legacy-red">
          {division.name}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-legacy-muted md:text-sm [html.light_&]:text-[#555d6b]">
          {division.summary}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-white transition-all duration-300 group-hover:text-legacy-red [html.light_&]:text-[#121316]">
          Explore <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function DivisionCards() {
  return (
    <RevealGroup className="grid gap-5 lg:grid-cols-3">
      {divisions.map((division) => (
        <RevealItem key={division.name}>
          <ShimmerDivisionCard division={division} />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
