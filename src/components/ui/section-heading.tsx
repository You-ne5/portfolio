import type { SectionHeadingContent } from "@/content/types";

export function Eyebrow({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-xs font-semibold uppercase tracking-widest text-accent">{label}</span>
      <span aria-hidden className="h-px w-8 bg-accent/50" />
    </div>
  );
}

export function SectionHeading({ heading, className = "" }: { heading: SectionHeadingContent; className?: string }) {
  return (
    <div className={`flex flex-col gap-4 md:flex-row md:items-end md:justify-between ${className}`}>
      <div>
        <Eyebrow label={heading.eyebrow} className="mb-2" />
        <h2 className="font-display text-5xl leading-none text-balance sm:text-6xl">{heading.title}</h2>
      </div>
      {heading.description && <p className="max-w-sm text-sm text-muted">{heading.description}</p>}
    </div>
  );
}
