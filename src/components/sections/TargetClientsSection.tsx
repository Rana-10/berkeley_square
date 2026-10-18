import Link from "next/link";
import { Reveal, RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { Heading, Section } from "@/components/editorial/Section";
import { targetClients } from "@/data/company";

export function TargetClientsSection({ index = "02" }: { index?: string }) {
  return (
    <Section index={index} label="Who we serve">
      <Heading>Tailored solutions for every property investor.</Heading>

      <RevealGroup stagger={0.06} className="mt-12 grid gap-x-14 border-t border-[#181818]/70 md:grid-cols-2">
        {targetClients.map((client) => (
          <RevealItem key={client.title} className="border-b border-theme-border py-7">
            <h3 className="display text-2xl font-semibold text-theme-primary">{client.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-theme-secondary">{client.description}</p>
          </RevealItem>
        ))}
        <RevealItem className="border-b border-theme-border py-7">
          <h3 className="display text-2xl font-semibold text-theme-primary">Not sure where you fit?</h3>
          <p className="mt-2 text-sm leading-relaxed text-theme-secondary">
            Tell us what you&rsquo;re trying to achieve and we&rsquo;ll point you in the right direction.
          </p>
          <Link
            href="/contact"
            className="focus-ring mt-4 inline-block border-b border-theme-primary pb-0.5 text-xs font-semibold uppercase tracking-widest text-theme-primary transition-colors hover:border-legacy-red hover:text-legacy-red"
          >
            Speak with our team →
          </Link>
        </RevealItem>
      </RevealGroup>
    </Section>
  );
}
