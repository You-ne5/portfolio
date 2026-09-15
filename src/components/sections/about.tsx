import type { AboutContent } from "@/content/types";
import { BrandIcon } from "@/components/ui/brand-icon";
import { Container } from "@/components/ui/container";
import { ImageFrame } from "@/components/ui/image-frame";
import { Section, type Tone } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/section-heading";

export function AboutSection({ about, tone }: { about: AboutContent; tone: Tone }) {
  const paragraphs = Array.isArray(about.bio) ? about.bio : [about.bio];

  return (
    <Section id="about" tone={tone} background={about.background}>
      <Container className="py-20 sm:py-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="flex justify-center lg:col-span-4 lg:justify-start">
            <div className="group relative w-56 md:w-64">
              <div
                aria-hidden
                className="absolute -inset-1 rounded-[12px] bg-linear-to-r from-accent/40 to-accent/10 opacity-60 blur-md transition duration-500 group-hover:blur-lg"
              />
              <div className="relative aspect-square overflow-hidden rounded-[8px] border border-line bg-surface shadow-[0_0_30px_rgba(0,0,0,0.25)]">
                <ImageFrame
                  image={about.portrait}
                  hint="add /public/images/portrait.jpg (1:1)"
                  sizes="256px"
                  imgClassName="transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center lg:col-span-8">
            <Eyebrow label={about.heading.eyebrow} className="mb-3" />
            <h2 className="mb-5 font-display text-5xl leading-none text-balance sm:text-6xl">{about.heading.title}</h2>
            <div className="max-w-2xl space-y-4 text-base leading-relaxed text-muted sm:text-lg">
              {paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {about.focus.length > 0 && (
              <ul className="mt-8 flex flex-wrap items-center gap-3">
                {about.focus.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-center gap-2 rounded-card border border-line bg-surface px-3.5 py-2 text-sm transition-colors hover:border-accent/50"
                  >
                    <BrandIcon icon={item.icon} name={item.label} className="size-[18px] text-accent" />
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
