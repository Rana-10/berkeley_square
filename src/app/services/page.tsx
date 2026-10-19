import type { Metadata } from "next";
import { ServiceGroupSection } from "@/components/cards/ServiceCard";
import { PageHero } from "@/components/editorial/PageHero";
import { images } from "@/data/images";
import { serviceGroups } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description: "Loan, property, and construction services from Berkeley Square Capital."
};

const groupImages = [images.gothicDoorway, images.terracottaCorner, images.stuccoSash];

export default function ServicesPage() {
  return (
    <main className="min-h-screen select-none bg-theme-page">
      <PageHero
        eyebrow="Services"
        title="Specialist services across every BSQ division."
        intro="Finance, property transactions and asset management, each led by dedicated specialists and delivered from our Mayfair office."
      />
      <section className="container pb-24">
        {serviceGroups.map((group, idx) => (
          <ServiceGroupSection key={group.division} group={group} image={groupImages[idx % groupImages.length]} />
        ))}
      </section>
    </main>
  );
}
