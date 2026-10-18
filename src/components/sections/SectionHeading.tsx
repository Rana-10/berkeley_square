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
    <Reveal className={cn("mb-12 max-w-3xl border-b border-theme-border pb-10", className)}>
      {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
      <h1 className="display text-4xl font-semibold leading-[1.08] text-theme-primary md:text-6xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-theme-secondary">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
