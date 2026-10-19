"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BSQLogo } from "@/components/ui/BSQLogo";
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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  if (pathname.startsWith("/admin")) return null;

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className={"fixed inset-x-0 top-0 z-50 bg-[#F3EEE4]"} suppressHydrationWarning>
      <nav
        className={cn("border-b border-[#112A22]/10 transition-shadow", scrolled && "shadow-[0_1px_0_rgba(24,24,24,0.06)]")}
        aria-label="Primary"
      >
        <div className="container flex items-center justify-between gap-6 py-3">
          <Link href="/" className="focus-ring flex shrink-0 items-center" suppressHydrationWarning>
            <BSQLogo variant="horizontal" theme="light" size="md" priority />
          </Link>

          <div className="hidden items-center gap-7 xl:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "focus-ring border-b-2 py-1 text-[12.5px] transition-colors",
                  isActive(item.href)
                    ? "border-legacy-red text-[#181818]"
                    : "border-transparent text-[#4A4844] hover:border-[#181818]/40 hover:text-[#181818]"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden xl:block">
            <Link
              href="/loan-application"
              className="focus-ring inline-flex items-center gap-3 border border-[#112A22] bg-[#112A22] px-5 py-2.5 text-[12.5px] text-white transition-colors hover:border-[#1A3A2E] hover:bg-[#1A3A2E]"
            >
              Loan enquiry
              <span aria-hidden>→</span>
            </Link>
          </div>

          <button
            type="button"
            suppressHydrationWarning
            className="focus-ring inline-flex h-10 w-10 items-center justify-center text-[#181818] xl:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="max-h-[calc(100vh-5rem)] overflow-y-auto border-b border-[#181818]/15 bg-[#F3EEE4] xl:hidden">
          <div className="container py-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between border-b border-[#181818]/10 py-4 font-[family-name:var(--font-display)] text-2xl",
                  isActive(item.href) ? "text-legacy-red" : "text-[#181818]"
                )}
              >
                {item.label}
                <span className="font-mono text-xs text-[#706D68]">→</span>
              </Link>
            ))}
            <div className="grid gap-3 py-5">
              <Link href="/loan-application" className="border border-[#112A22] bg-[#112A22] px-5 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                Loan enquiry
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
