import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { SectionHeading } from "@/components/sections/SectionHeading";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Responsive gallery of premium property and construction imagery."
};

export default function GalleryPage() {
  return (
    <main className="pt-32">
      <section className="container pb-20">
        <SectionHeading eyebrow="Gallery" title="Selected visual references." description="Static placeholder imagery can be replaced with verified project photography." />
        <GalleryGrid />
      </section>
      
    </main>
  );
}
