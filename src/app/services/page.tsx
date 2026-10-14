import type { Metadata } from "next";
import { ServiceGroupSection } from "@/components/cards/ServiceCard";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { serviceGroups } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description: "Loan, property, and construction services from Berkeley Square Capital."
};

export default function ServicesPage() {
  return (
    <main className="pt-32 [html.light_&]:bg-[#F7F5F2] min-h-screen">
      <section className="container pb-20">
        <SectionHeading eyebrow="Services" title="Specialist services across every BSQ division." description="Structured content keeps services simple to maintain while preserving a premium public presence." />
        <div className="grid gap-6">
          {serviceGroups.map((group) => (
            <ServiceGroupSection key={group.division} group={group} />
          ))}
        </div>
      </section>
    </main>
  );
}
