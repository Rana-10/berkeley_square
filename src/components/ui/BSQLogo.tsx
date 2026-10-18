"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

export interface BSQLogoProps {
  variant?: "mark" | "horizontal" | "full" | "icon";
  theme?: "dark" | "light";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showTagline?: boolean;
  priority?: boolean;
}

export function BSQLogo({
  variant = "horizontal",
  theme = "dark",
  size = "md",
  className,
  showTagline = true,
  priority = false,
}: BSQLogoProps) {
  // Mark / Icon only variant
  if (variant === "mark" || variant === "icon") {
    const sizeClasses = {
      sm: "h-11 sm:h-12",
      md: "h-[3.25rem] sm:h-14 lg:h-16",
      lg: "h-16 sm:h-20 lg:h-24",
      xl: "h-24 sm:h-28 lg:h-32",
    }[size];

    return (
      <div
        suppressHydrationWarning
        className={cn(
          "group relative flex shrink-0 items-center justify-center transition-all duration-300 hover:scale-105",
          sizeClasses,
          className
        )}
      >
        <Image
          suppressHydrationWarning
          src={theme === "light" ? "/branding/bsq-emblem.png" : "/branding/bsq-emblem-dark.png"}
          alt="Berkeley Square Capital Emblem"
          width={200}
          height={155}
          priority={priority}
          className="h-full w-auto object-contain"
        />
      </div>
    );
  }

  // Full Stacked Logo (Original / Dark variant)
  if (variant === "full") {
    const heightMap = {
      sm: 56,
      md: 80,
      lg: 110,
      xl: 144,
    }[size];

    return (
      <div
        suppressHydrationWarning
        className={cn("inline-flex flex-col items-center select-none", className)}
      >
        <Image
          suppressHydrationWarning
          src={theme === "light" ? "/branding/bsq-logo.png" : "/branding/bsq-logo-dark.png"}
          alt="Berkeley Square Capital"
          width={Math.round(heightMap * 1.05)}
          height={heightMap}
          priority={priority}
          className="h-auto w-auto max-h-[160px] object-contain transition-transform duration-300 hover:scale-105"
          style={{ height: `${heightMap}px` }}
        />
      </div>
    );
  }

  // Horizontal Brand Lockup (Emblem + Precision Typography)
  const emblemSize = {
    sm: "h-11 sm:h-12",
    md: "h-[3.25rem] sm:h-14 lg:h-[3.75rem]",
    lg: "h-16 sm:h-[4.5rem] lg:h-20",
    xl: "h-20 sm:h-24 lg:h-28",
  }[size];

  const titleSize = {
    sm: "text-sm sm:text-base tracking-[0.16em]",
    md: "text-base sm:text-lg lg:text-[1.18rem] tracking-[0.18em]",
    lg: "text-lg sm:text-xl lg:text-2xl tracking-[0.2em]",
    xl: "text-xl sm:text-2xl lg:text-3xl tracking-[0.22em]",
  }[size];

  const subtitleSize = {
    sm: "text-[10px] sm:text-[11px] tracking-[0.28em]",
    md: "text-[11px] sm:text-xs tracking-[0.3em]",
    lg: "text-xs sm:text-sm tracking-[0.32em]",
    xl: "text-sm sm:text-base tracking-[0.34em]",
  }[size];

  return (
    <div
      suppressHydrationWarning
      className={cn("group flex items-center gap-3.5 sm:gap-4 select-none shrink-0", className)}
    >
      <div
        suppressHydrationWarning
        className={cn(
          "relative flex shrink-0 items-center justify-center transition-all duration-300 group-hover:scale-105",
          emblemSize
        )}
      >
        <Image
          suppressHydrationWarning
          src={theme === "light" ? "/branding/bsq-emblem.png" : "/branding/bsq-emblem-dark.png"}
          alt="Berkeley Square Capital"
          width={180}
          height={140}
          priority={priority}
          className="h-full w-auto object-contain"
        />
      </div>

      <div className="text-left" suppressHydrationWarning>
        <span
          suppressHydrationWarning
          className={cn(
            "block font-sans font-black uppercase transition-colors duration-300 leading-tight",
            theme === "light" ? "text-slate-950" : "text-white group-hover:text-white",
            titleSize
          )}
        >
          Berkeley Square
        </span>
        {showTagline ? (
          <span
            suppressHydrationWarning
            className={cn(
              "block font-mono uppercase font-bold text-legacy-muted leading-tight mt-1 flex items-center gap-1.5",
              subtitleSize
            )}
          >
            <span className="inline-block h-1 w-1 rounded-full bg-legacy-red" />
            <span>Capital</span>
          </span>
        ) : null}
      </div>
    </div>
  );
}
