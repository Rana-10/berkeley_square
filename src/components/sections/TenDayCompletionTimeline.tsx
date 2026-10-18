import Link from "next/link";
import { RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { clientJourney } from "@/data/company";

/** One-row process strip on the deep green tone: step, title and timing only. */
export function TenDayCompletionTimeline() {
  return (
    <section className="bg-[#1F4030] text-[#F2EEE6]">
      <div className="container py-14 md:py-20">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="eyebrow !text-[#E8B7A8]">How it works</p>
            <h2 className="display mt-3 text-3xl font-semibold leading-tight md:text-4xl">From first enquiry to ongoing partnership.</h2>
          </div>
          <Link
            href="/loan-application"
            className="focus-ring inline-flex shrink-0 items-center gap-2 border-b border-white pb-1 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-[#E8B7A8] hover:text-[#E8B7A8]"
          >
            Start your journey →
          </Link>
        </div>

        <RevealGroup stagger={0.06} className="mt-10 grid border-t border-white/30 sm:grid-cols-2 lg:grid-cols-5">
          {clientJourney.map((stage) => (
            <RevealItem key={stage.title} className="border-b border-white/15 py-6 sm:pr-6 lg:border-b-0 lg:border-l lg:px-5 first:lg:border-l-0 first:lg:pl-0">
              <span className="display text-3xl font-semibold leading-none text-[#E8B7A8]">0{stage.step}</span>
              <h3 className="display mt-3 text-lg font-semibold leading-snug text-white">{stage.title}</h3>
              <p className="mt-1.5 font-mono text-[11px] font-bold uppercase tracking-widest text-white/55">{stage.timeframe}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
