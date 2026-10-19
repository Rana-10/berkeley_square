import { Reveal } from "@/components/animations/Reveal";
import { CountUpValue } from "@/components/editorial/CountUpValue";
import { cn } from "@/lib/utils";

export type LedgerItem = { value: string; label: string; note?: string };

/**
 * Large-numeral ledger: columns divided by hairlines, no boxes.
 * `tone="ink"` is for use on the deep green section tone.
 */
export function StatsLedger({ items, tone = "page", className }: { items: LedgerItem[]; tone?: "page" | "ink"; className?: string }) {
  const ink = tone === "ink";
  return (
    <Reveal className={className}>
      <dl
        className={cn(
          "grid border-y sm:grid-cols-2 lg:grid-cols-4",
          ink ? "border-white/20" : "border-[#181818]/70"
        )}
      >
        {items.map((item, idx) => (
          <div
            key={item.label}
            className={cn(
              "px-0 py-7 sm:px-6 lg:py-9",
              idx > 0 && (ink ? "border-t border-white/15 sm:border-t-0 sm:border-l" : "border-t border-[#181818]/15 sm:border-t-0 sm:border-l"),
              idx === 0 && "sm:pl-0",
              idx === 2 && "max-lg:sm:border-l-0 max-lg:sm:border-t",
              idx === 3 && "max-lg:sm:border-t"
            )}
          >
            <dd className={cn("display text-4xl font-semibold leading-none md:text-5xl", ink ? "text-white" : "text-theme-primary")}>
              <CountUpValue value={item.value} />
            </dd>
            <dt className={cn("mt-4 text-[11px] font-bold uppercase tracking-[0.18em]", ink ? "text-[#BFCBC3]" : "text-legacy-red")}>{item.label}</dt>
            {item.note ? <p className={cn("mt-1.5 text-sm leading-snug", ink ? "text-white/65" : "text-theme-secondary")}>{item.note}</p> : null}
          </div>
        ))}
      </dl>
    </Reveal>
  );
}
