import { DivisionCards } from "@/components/cards/DivisionCard";
import { TenDayCompletionTimeline } from "@/components/sections/TenDayCompletionTimeline";
import { HeroSection } from "@/components/sections/HeroSection";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { TargetClientsSection } from "@/components/sections/TargetClientsSection";

export default function HomePage() {
  return (
    <main>
      {/* 1. Cinematic Scroll-Driven Architectural Hero (Works in Dark & Light modes) */}
      <HeroSection />

      {/* 2. Three Integrated Divisions (Off-White in Light Mode) */}
      <section className="pt-6 pb-14 [html.light_&]:bg-[#F7F5F2]">
        <div className="container">
          <SectionHeading
            eyebrow="Divisions"
            title="Finance, property and asset management under one roof."
          />
          <DivisionCards />
        </div>
      </section>

      {/* 3. Primary Target Client Profiles (Off-White in Light Mode) */}
      <TargetClientsSection />

      {/* 4. Why Choose Us (Warm Stone / Greige in Light Mode) */}
      <WhyChooseUs />

      {/* 5. Client Journey Timeline (Authority Dark High-Contrast) */}
      <TenDayCompletionTimeline />
    </main>
  );
}
