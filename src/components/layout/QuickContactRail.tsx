import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { company } from "@/data/company";

const actions = [
  { label: "Mayfair Desk: " + company.phoneDisplay, href: `tel:${company.phone}`, icon: Phone },
  { label: "Email: " + company.email, href: `mailto:${company.email}`, icon: Mail },
  { label: "Direct WhatsApp", href: company.whatsapp, icon: MessageCircle, external: true },
  { label: "Google Maps Location", href: company.mapsLink, icon: MapPin, external: true }
];

export function QuickContactRail() {
  return (
    <aside
      suppressHydrationWarning
      className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 overflow-hidden rounded-l-2xl border border-r-0 border-white/15 bg-black/80 shadow-[0_10px_35px_rgba(0,0,0,0.7)] backdrop-blur-2xl xl:block"
      aria-label="Direct Advisory Channels"
    >
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <a
            key={action.label}
            href={action.href}
            aria-label={action.label}
            target={action.external ? "_blank" : undefined}
            rel={action.external ? "noopener noreferrer" : undefined}
            className="focus-ring group relative flex h-12 w-12 items-center justify-center border-b border-white/10 last:border-b-0 text-white/80 transition-colors hover:bg-legacy-red hover:text-white"
          >
            <Icon size={17} />
            <span className="pointer-events-none absolute right-12 hidden whitespace-nowrap rounded-l-xl bg-legacy-panel border border-r-0 border-white/15 px-3 py-2 text-xs font-semibold text-white shadow-xl group-hover:block font-sans">
              {action.label}
            </span>
          </a>
        );
      })}
    </aside>
  );
}
