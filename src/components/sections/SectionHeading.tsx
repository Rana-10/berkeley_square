import { Reveal } from "@/components/animations/Reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, className }: SectionHeadingProps) {
  return (
    <Reveal className={cn("mx-auto mb-10 max-w-3xl text-center", className)}>
      {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
      <h2 className="display text-2xl sm:text-3xl md:text-4xl leading-tight text-white [html.light_&]:text-[#121316]">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-sm leading-relaxed text-legacy-muted md:text-base [html.light_&]:text-[#555d6b]">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
