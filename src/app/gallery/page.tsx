import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { PageHero } from "@/components/editorial/PageHero";

export const metadata: Metadata = {
  title: "Gallery",
  description: "British architecture and streetscapes: the buildings, towns and details Berkeley Square Capital works around."
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen select-none bg-theme-page">
      <PageHero
        eyebrow="Gallery"
        title="The buildings behind the business."
        intro="Victorian stone, Georgian stucco, Thames-side brick and collegiate Gothic: a record of the British streetscape we finance, acquire and manage. Select any photograph to view it at full size."
      />
      <section className="container py-16 md:py-20">
        <GalleryGrid />
      </section>
    </main>
  );
}
