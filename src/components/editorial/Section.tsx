import type { ReactNode } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { cn } from "@/lib/utils";

type SectionProps = {
  index?: string;
  label: string;
  children: ReactNode;
  tone?: "page" | "stone" | "ink";
  /** drop the hairline above the section (e.g. directly under a hero) */
  noRule?: boolean;
  className?: string;
};

const tones = {
  page: "bg-theme-page text-theme-primary",
  stone: "bg-[#EBE5D9] text-theme-primary",
  ink: "bg-[#112A22] text-[#F2EEE6]"
} as const;

/**
 * Left label column + right content column, divided from the section above by a hairline.
 * The label column is sticky on desktop, like a margin note.
 */
export function Section({ index, label, children, tone = "page", noRule, className }: SectionProps) {
  return (
    <section className={cn(tones[tone], className)}>
      <div className={cn("container py-16 md:py-24", !noRule && (tone === "ink" ? "border-t border-white/15" : "border-t border-theme-border"))}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-16">
          <Reveal direction="none" className="lg:sticky lg:top-32 lg:self-start">
            {index ? <p className={cn("font-mono text-xs font-bold tracking-widest", tone === "ink" ? "text-white/50" : "text-theme-muted")}>{index}</p> : null}
            <p className={cn("eyebrow", index && "mt-2", tone === "ink" && "!text-[#BFCBC3]")}>{label}</p>
          </Reveal>
          <div>{children}</div>
        </div>
      </div>
    </section>
  );
}

export function Heading({
  children,
  intro,
  tone = "page",
  className
}: {
  children: ReactNode;
  intro?: ReactNode;
  tone?: "page" | "stone" | "ink";
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <h2 className={cn("display max-w-2xl text-3xl font-semibold leading-tight md:text-4xl", tone === "ink" ? "text-[#F2EEE6]" : "text-theme-primary")}>
        {children}
      </h2>
      {intro ? (
        <p className={cn("mt-4 max-w-xl leading-relaxed", tone === "ink" ? "text-white/70" : "text-theme-secondary")}>{intro}</p>
      ) : null}
    </Reveal>
  );
}

/** Text link with a hairline underline, the site's only link style outside body copy. */
export function TextLink({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border-b border-current pb-0.5 text-sm font-semibold uppercase tracking-widest transition-colors group-hover:text-legacy-red",
        className
      )}
    >
      {children}
    </span>
  );
}
