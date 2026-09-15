import type { ExperienceContent } from "@/content/types";
import { Container } from "@/components/ui/container";
import { Section, type Tone } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

const RING: Record<Tone, string> = { base: "ring-canvas", alt: "ring-canvas-alt" };

export function ExperienceSection({ experience, tone }: { experience: ExperienceContent; tone: Tone }) {
  return (
    <Section id="experience" tone={tone}>
      <Container className="py-20 sm:py-28">
        <SectionHeading heading={experience.heading} className="mb-12 sm:mb-16" />

        <ol className="relative max-w-4xl space-y-8 border-l border-accent/60 pl-6 sm:space-y-12 sm:pl-8">
          {experience.items.map((item) => (
            <li key={`${item.company}-${item.period}`} className="relative">
              <span
                aria-hidden
                className={`absolute -left-[31px] top-7 size-3.5 rounded-full bg-accent shadow-[0_0_12px_var(--accent)] ring-4 sm:-left-[39px] ${RING[tone]}`}
              />
              <div className="rounded-card border border-line bg-surface p-5 transition-all duration-300 hover:border-accent hover:shadow-[0_0_20px_rgba(230,57,70,0.2)] sm:p-7">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div className="min-w-0">
                    <h3 className="font-display text-3xl leading-none sm:text-4xl">
                      {item.companyUrl ? (
                        <a
                          href={item.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent underline-offset-4 hover:underline"
                        >
                          {item.company}
                        </a>
                      ) : (
                        <span className="text-accent">{item.company}</span>
                      )}{" "}
                      — {item.role}
                    </h3>
                    {item.location && <p className="mt-1 text-xs text-muted">{item.location}</p>}
                  </div>
                  <span className="self-start whitespace-nowrap rounded-[5px] border border-line bg-canvas px-2.5 py-1 font-mono text-xs text-muted sm:self-center">
                    {item.period}
                  </span>
                </div>

                {item.highlights.length > 0 && (
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2">
                        <span aria-hidden className="font-bold text-accent">
                          •
                        </span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
