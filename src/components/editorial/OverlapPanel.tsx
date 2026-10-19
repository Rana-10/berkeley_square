import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/animations/Reveal";

/** Outlined pill link: the one rounded control on the site, used on green panels. */
export function PillLink({ href, children, tone = "light" }: { href: string; children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <Link
      href={href}
      className={
        "focus-ring inline-flex items-center justify-center rounded-full border px-8 py-3.5 text-sm font-semibold transition-colors duration-300 " +
        (tone === "light"
          ? "border-white/70 text-white hover:bg-[#FAF7F1] hover:text-[#112A22]"
          : "border-[#112A22] text-[#112A22] hover:bg-[#112A22] hover:text-white")
      }
    >
      {children}
    </Link>
  );
}

/**
 * A large rounded green panel that rides up over the photograph above it and spills onto the page below.
 * Heading on the left, copy and a pill link on the right.
 */
export function OverlapPanel({
  title,
  children,
  action,
  overlap = true
}: {
  title: ReactNode;
  children: ReactNode;
  action?: { href: string; label: string };
  overlap?: boolean;
}) {
  return (
    <section className={"relative z-10 " + (overlap ? "-mt-16 md:-mt-28" : "mt-0")}>
      <div className="container">
        <Reveal>
          <div className="grid gap-8 rounded-[10px] bg-[#1A3A2E] px-7 py-10 text-white md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] md:gap-16 md:px-16 md:py-14">
            <h2 className="display text-3xl font-normal leading-[1.15] md:text-[2.6rem]">{title}</h2>
            <div className="space-y-4 text-base leading-relaxed text-white/90 md:text-lg">
              {children}
              {action ? (
                <div className="pt-6 md:pt-10">
                  <PillLink href={action.href}>{action.label}</PillLink>
                </div>
              ) : null}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
