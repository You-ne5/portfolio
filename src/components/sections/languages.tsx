import type { LanguageLevel, LanguagesContent } from "@/content/types";
import { Badge } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { Section, type Tone } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

const LEVEL: Record<LanguageLevel, { label: string; className: string }> = {
  native: {
    label: "Native",
    className: "border-accent bg-accent font-semibold text-on-accent shadow-[0_0_10px_rgba(230,57,70,0.4)]",
  },
  fluent: { label: "Fluent", className: "border-accent/20 bg-accent/10 font-medium text-accent" },
  intermediate: { label: "Intermediate", className: "border-line bg-canvas font-medium text-fg" },
  beginner: { label: "Beginner", className: "border-line bg-canvas font-medium text-muted" },
};

export function LanguagesSection({ languages, tone }: { languages: LanguagesContent; tone: Tone }) {
  return (
    <Section id="languages" tone={tone} background={languages.background}>
      <Container className="py-20 sm:py-28">
        <SectionHeading heading={languages.heading} className="mb-12 sm:mb-16" />
        <ul className="grid grid-cols-1 gap-4 min-[400px]:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {languages.items.map((language) => {
            const level = LEVEL[language.level];
            return (
              <li
                key={language.name}
                className="flex items-center justify-between gap-3 rounded-card border border-line bg-surface p-5 transition-all duration-300 hover:border-accent hover:shadow-[0_0_15px_rgba(230,57,70,0.2)]"
              >
                <div className="flex min-w-0 flex-col">
                  <span className="text-base font-bold">{language.name}</span>
                  {language.nativeName && (
                    <span className="mt-0.5 font-mono text-xs text-muted">{language.nativeName}</span>
                  )}
                </div>
                <Badge className={`shrink-0 py-1 ${level.className}`}>{language.levelLabel ?? level.label}</Badge>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
