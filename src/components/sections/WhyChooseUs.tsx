import { Reveal, RevealGroup, RevealItem } from "@/components/animations/Reveal";
import { Photo } from "@/components/editorial/Photo";
import { Heading, Section } from "@/components/editorial/Section";
import { images } from "@/data/images";
import { keyDifferentiators } from "@/data/company";

// The other differentiators (flexible financing, bespoke engineering, client-centric)
// restate the same "tailored" point, so the home page shows four distinct ones.
const homeDifferentiators = [
  "Fast, Responsive Decision-Making",
  "International Reach",
  "End-to-End Service Model",
  "Client-Centric Philosophy"
];

const detailPhotos = [images.crestDoorway, images.stuccoSash, images.gothicDoorway];

export function WhyChooseUs({ index = "03" }: { index?: string }) {
  const differentiators = keyDifferentiators.filter((diff) => homeDifferentiators.includes(diff.title));

  return (
    <Section index={index} label="The Berkeley Square difference" tone="stone">
      <Heading intro="A full-service property partner, from sourcing and funding to day-to-day asset management.">
        Why clients choose Berkeley Square.
      </Heading>

      <RevealGroup stagger={0.08} className="mt-12 grid gap-x-8 gap-y-10 border-t border-[#181818]/70 pt-8 sm:grid-cols-2 lg:grid-cols-4">
        {differentiators.map((diff, idx) => (
          <RevealItem key={diff.title} className="lg:border-l lg:border-theme-border lg:pl-6 first:lg:border-l-0 first:lg:pl-0">
            <span className="font-mono text-xs font-bold text-theme-muted">0{idx + 1}</span>
            <h3 className="display mt-3 text-xl font-semibold leading-snug text-theme-primary">{diff.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-theme-secondary">{diff.description}</p>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* Three architectural details: the character of the buildings we work around */}
      <Reveal className="mt-16 grid grid-cols-3 gap-3 sm:gap-6">
        {detailPhotos.map((image, idx) => (
          <div key={image.src} className={idx === 1 ? "mt-6 sm:mt-10" : ""}>
            <Photo image={image} ratio="aspect-[4/5]" sizes="(max-width: 768px) 33vw, 260px" zoom={false} />
          </div>
        ))}
      </Reveal>
    </Section>
  );
}
