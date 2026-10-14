"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, CalendarCheck, Menu, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { BSQLogo } from "@/components/ui/BSQLogo";
import { useTheme } from "@/components/theme/ThemeContext";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Financial Services", href: "/loans" },
  { label: "Property", href: "/property" },
  { label: "Asset Management", href: "/construction" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();
  const { scrollY } = useScroll();
  // The backdrop fades in with scroll distance instead of flipping at a fixed threshold.
  const backdropOpacity = useTransform(scrollY, [24, 120], [0, 1]);

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="fixed inset-x-0 top-0 z-50 p-3 sm:p-4" suppressHydrationWarning>
      <nav
        suppressHydrationWarning
        className="relative isolate mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-5 py-2.5"
      >
        {/* Backdrop pill: fades in on scroll so the nav never changes size or position */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: backdropOpacity }}
          className="pointer-events-none absolute inset-0 -z-10 rounded-full border border-white/15 bg-black/90 shadow-[0_16px_40px_rgba(0,0,0,0.7),0_0_30px_rgba(225,18,45,0.12)] backdrop-blur-2xl [html.light_&]:border-[#E4DFD4] [html.light_&]:bg-[#F7F5F2]/95 [html.light_&]:shadow-[0_16px_40px_rgba(24,24,24,0.06),0_0_20px_rgba(225,18,45,0.06)]"
        />
        {/* Brand Logo with BSQ Emblem */}
        <Link
          href="/"
          className="focus-ring group flex items-center shrink-0"
          onClick={() => setOpen(false)}
          suppressHydrationWarning
        >
          <BSQLogo variant="horizontal" theme={theme} size="md" priority />
        </Link>

        {/* Desktop Navigation with Animated Active Pill */}
        <div
          className="hidden items-center gap-0.5 xl:gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] p-1 backdrop-blur-md xl:flex shrink [html.light_&]:border-[#E4DFD4] [html.light_&]:bg-[#ECE7DE]/75"
          suppressHydrationWarning
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                suppressHydrationWarning
                className={cn(
                  "focus-ring relative rounded-full px-2.5 xl:px-3 py-1 text-xs font-semibold tracking-wide transition-colors duration-300 whitespace-nowrap",
                  isActive
                    ? "text-white [html.light_&]:text-[#181818]"
                    : "text-white/70 hover:text-white [html.light_&]:text-[#4A4844] [html.light_&]:hover:text-[#181818]"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavPill"
                    className="absolute inset-0 rounded-full border border-legacy-red/40 bg-legacy-red/20 shadow-[0_0_12px_rgba(225,18,45,0.3)] [html.light_&]:border-legacy-red/35 [html.light_&]:bg-legacy-red/10 [html.light_&]:shadow-[0_0_8px_rgba(225,18,45,0.12)]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Right Action CTA Buttons */}
        <div className="hidden items-center gap-2 shrink-0 xl:flex" suppressHydrationWarning>
          <ButtonLink
            href="/appointment"
            variant="secondary"
            className="min-h-8 px-3 xl:px-3.5 py-1 text-xs font-bold uppercase tracking-wider whitespace-nowrap [html.light_&]:border-[#E4DFD4] [html.light_&]:bg-[#ECE7DE] [html.light_&]:text-[#181818] [html.light_&]:shadow-sm [html.light_&]:hover:bg-[#E4DFD4]"
          >
            APPOINTMENT <CalendarCheck size={12} />
          </ButtonLink>
          <ButtonLink
            href="/loan-application"
            className="min-h-8 px-3.5 xl:px-4 py-1 text-xs font-bold uppercase tracking-wider whitespace-nowrap shadow-[0_0_15px_rgba(225,18,45,0.4)]"
          >
            GET FUNDED <ArrowUpRight size={12} />
          </ButtonLink>
        </div>

        {/* Mobile Menu & Toggle Controls */}
        <div className="flex items-center gap-2 xl:hidden">
          <button
            suppressHydrationWarning
            className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white xl:hidden [html.light_&]:border-[#E4DFD4] [html.light_&]:bg-white [html.light_&]:text-[#181818] [html.light_&]:shadow-sm"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute inset-x-4 top-24 rounded-2xl border border-white/20 bg-black/95 p-5 shadow-2xl backdrop-blur-2xl xl:hidden [html.light_&]:bg-[#FAF8F5]/98 [html.light_&]:border-[#E4DFD4] [html.light_&]:shadow-[0_20px_50px_rgba(24,24,24,0.12)]"
        >
          <div className="grid gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "focus-ring flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-colors",
                    isActive
                      ? "bg-legacy-red/20 text-white [html.light_&]:bg-legacy-red/10 [html.light_&]:text-[#181818]"
                      : "text-white/80 hover:bg-white/5 [html.light_&]:text-[#4A4844] [html.light_&]:hover:bg-[#ECE7DE]/60 [html.light_&]:hover:text-[#181818]"
                  )}
                  onClick={() => setOpen(false)}
                >
                  <span>{item.label}</span>
                  {isActive && <Sparkles size={14} className="text-legacy-red" />}
                </Link>
              );
            })}

            <div className="mt-3 grid gap-2 border-t border-white/10 [html.light_&]:border-[#E4DFD4] pt-3">
              <ButtonLink
                href="/appointment"
                variant="secondary"
                className="w-full justify-center text-xs font-bold uppercase [html.light_&]:border-[#E4DFD4] [html.light_&]:bg-[#ECE7DE] [html.light_&]:text-[#181818] [html.light_&]:hover:bg-[#E4DFD4]"
                onClick={() => setOpen(false)}
              >
                Book Appointment <CalendarCheck size={14} />
              </ButtonLink>
              <ButtonLink
                href="/loan-application"
                className="w-full justify-center text-xs font-bold uppercase shadow-[0_0_15px_rgba(225,18,45,0.4)]"
                onClick={() => setOpen(false)}
              >
                Get Funded <ArrowUpRight size={14} />
              </ButtonLink>
            </div>
          </div>
        </motion.div>
      ) : null}
    </header>
  );
}
