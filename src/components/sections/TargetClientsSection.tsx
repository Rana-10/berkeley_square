"use client";

import { TiltCard } from "@/components/animations/TiltCard";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { targetClients } from "@/data/company";

export function TargetClientsSection() {
  return (
    <section className="py-16 select-none [html.light_&]:bg-[#F7F5F2]">
      <div className="container">
        <SectionHeading
          eyebrow="Who we serve"
          title="Tailored solutions for every property investor."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {targetClients.map((client) => {
            const Icon = client.icon;
            return (
              <TiltCard 
                key={client.title} 
                className="flex h-full flex-col justify-between p-6 [html.light_&]:bg-white [html.light_&]:bg-none [html.light_&]:border-[#E4DFD4] [html.light_&]:shadow-[0_10px_30px_rgba(24,24,24,0.04)]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="grid h-10 w-10 place-items-center rounded-xl border border-legacy-red/40 bg-legacy-red/10 text-legacy-red transition-all duration-300 group-hover:bg-legacy-red group-hover:text-white group-hover:shadow-[0_0_15px_rgba(225,18,45,0.4)]">
                      <Icon size={18} />
                    </div>
                    <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-slate-300 [html.light_&]:border-black/10 [html.light_&]:bg-black/[0.04] [html.light_&]:text-[#555d6b]">
                      {client.badge}
                    </span>
                  </div>

                  <h3 className="display mt-4 text-lg md:text-xl text-white font-bold leading-tight [html.light_&]:text-[#121316]">
                    {client.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-slate-300 md:text-sm [html.light_&]:text-[#555d6b]">
                    {client.description}
                  </p>

                </div>
              </TiltCard>
            );
          })}

          {/* 6th Callout Card */}
          <TiltCard className="flex h-full flex-col justify-between p-6 border-legacy-red/40 [html.dark_&]:bg-gradient-to-br [html.dark_&]:from-[#1c080b]/90 [html.dark_&]:via-[#12080a]/90 [html.dark_&]:to-[#080808]/90 [html.light_&]:bg-white [html.light_&]:bg-none [html.light_&]:border-legacy-red/35 [html.light_&]:shadow-[0_10px_30px_rgba(225,18,45,0.06)]">
            <div>
              <h3 className="display text-lg md:text-xl text-white font-bold [html.light_&]:text-[#121316]">
                Not sure where you fit?
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-300 md:text-sm [html.light_&]:text-[#555d6b]">
                Tell us what you&apos;re trying to achieve and we&apos;ll point you in the right direction.
              </p>
            </div>

            <div className="mt-6">
              <ButtonLink href="/contact" className="w-full justify-center text-xs font-bold uppercase py-2.5">
                Speak with Our Team
              </ButtonLink>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
