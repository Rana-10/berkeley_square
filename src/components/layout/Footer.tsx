"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BSQLogo } from "@/components/ui/BSQLogo";
import { Photo } from "@/components/editorial/Photo";
import { images } from "@/data/images";
import { company, divisions } from "@/data/company";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Financial Services", href: "/loans" },
  { label: "Property Listings", href: "/property/listings" },
  { label: "Asset & Portfolio Management", href: "/construction" },
  { label: "About us", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Loan application", href: "/loan-application" },
  { label: "Book an appointment", href: "/appointment" },
  { label: "Contact", href: "/contact" }
];

// A different architectural photograph per area so the footer band never repeats the page above it.
function footerImage(pathname: string) {
  if (pathname === "/") return images.thamesTownhouses;
  if (pathname.startsWith("/loans")) return images.etonChapel;
  if (pathname.startsWith("/property/listings")) return images.etonChapel;
  if (pathname.startsWith("/about")) return images.etonHighStreet;
  if (pathname.startsWith("/gallery")) return images.victorianStoneCorner;
  if (pathname.startsWith("/contact")) return images.terracottaCorner;
  return images.etonHighStreet;
}

export function Footer() {
  const pathname = usePathname() ?? "/";
  function handleOpenCookieSettings(e: React.MouseEvent) {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("bsc_open_cookie_preferences"));
    }
  }

  const colTitle = "text-[11px] font-bold uppercase tracking-[0.22em] text-[#E8B7A8]";
  const link = "text-sm text-white/70 transition-colors hover:text-white";

  return (
    <footer className="select-none bg-[#15291F] text-white/75" suppressHydrationWarning>
      {/* Image band: one more look at the architecture before the legal small print */}
      <div className="container pt-16 md:pt-24">
        <div className="grid items-end gap-8 md:grid-cols-[1.6fr_1fr] md:gap-12">
          <div className="group [&_figcaption]:border-white/25 [&_figcaption]:text-white/55">
            <Photo image={footerImage(pathname)} ratio="aspect-[21/9]" sizes="(max-width: 768px) 100vw, 70vw" position="object-[50%_62%]" />
          </div>
          <div>
            <p className={colTitle}>Berkeley Square Capital</p>
            <p className="display mt-4 text-3xl font-semibold leading-tight text-white md:text-4xl">
              Bring your opportunity, and we&rsquo;ll make it happen.
            </p>
            <Link
              href="/contact"
              className="focus-ring mt-6 inline-flex items-center gap-2 border-b border-white pb-1 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-[#E8B7A8] hover:text-[#E8B7A8]"
            >
              Speak with our Mayfair team →
            </Link>
          </div>
        </div>
      </div>

      <div className="container mt-16 grid gap-12 border-t border-white/15 pt-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-block rounded-sm bg-[#EEF2EA] px-3 py-2">
            <BSQLogo variant="horizontal" theme="light" size="md" />
          </Link>
          <address className="mt-6 text-sm not-italic leading-relaxed text-white/70">
            <span className="block font-semibold text-white">Trading office</span>
            <a href={company.mapsLink} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
              {company.tradingAddress}
            </a>
            <span className="mt-4 block font-semibold text-white">Registered office</span>
            {company.registeredAddress}
          </address>
          <p className="mt-6 text-sm leading-relaxed">
            <a href={`tel:${company.phone}`} className="font-semibold text-white transition-colors hover:text-[#E8B7A8]">
              {company.phoneDisplay}
            </a>
            <br />
            <a href={`mailto:${company.email}`} className="transition-colors hover:text-white">
              {company.email}
            </a>
            <br />
            <a href={company.whatsapp} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
              WhatsApp
            </a>
          </p>
        </div>

        <div>
          <p className={colTitle}>Divisions</p>
          <ul className="mt-5 space-y-3">
            {divisions.map((division) => (
              <li key={division.name}>
                <Link href={division.href} className={link}>
                  {division.name}
                </Link>
              </li>
            ))}
          </ul>
          <p className={`${colTitle} mt-8`}>Where we work</p>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            {company.globalHubs.map((hub) => hub.country).join(" · ")}
          </p>
        </div>

        <div>
          <p className={colTitle}>Site</p>
          <ul className="mt-5 space-y-3">
            {quickLinks.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className={link}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className={colTitle}>Governance</p>
          <ul className="mt-5 space-y-3">
            <li>
              <Link href="/privacy" className={link}>
                Privacy notice
              </Link>
            </li>
            <li>
              <Link href="/cookies" className={link}>
                Cookie policy
              </Link>
            </li>
            <li>
              <button type="button" onClick={handleOpenCookieSettings} className={link}>
                Cookie settings
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mt-14 border-t border-white/15 py-8">
        <div className="grid gap-6 text-xs leading-relaxed text-white/55 lg:grid-cols-[1fr_1fr]">
          <p>
            © 2026 {company.legalName}. Registered office: {company.registeredAddress}. Established {company.establishedYear}.
          </p>
          <p>
            Berkeley Square Capital delivers integrated real estate acquisition, bridging finance, investment advisory, and property management solutions across the UK, Middle East, Europe, and South Asia.
            Regulatory status and lending disclosures to be confirmed by the company&rsquo;s compliance adviser before publication.
          </p>
        </div>
      </div>
    </footer>
  );
}
