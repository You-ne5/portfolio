import { ArrowRight, Download } from "lucide-react";
import type { HeroContent } from "@/content/types";
import { AsciiPlanet } from "@/components/ascii-planet";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Section, type Tone } from "@/components/ui/section";

export function HeroSection({ hero, tone, showPrimaryCta }: { hero: HeroContent; tone: Tone; showPrimaryCta: boolean }) {
  const cta = showPrimaryCta ? hero.primaryCta : undefined;
  const illustration = hero.illustration?.enabled ? hero.illustration : undefined;
  const [chipTop, chipBottom] = illustration?.chips ?? [];

  return (
    <Section id="hero" tone={tone}>
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[5%] top-[10%] -z-10 size-64 rounded-full bg-accent opacity-(--glow-opacity) blur-[100px] sm:size-96 lg:size-[580px] lg:blur-[150px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[15%] top-[35%] -z-10 size-56 rounded-full bg-accent opacity-[calc(var(--glow-opacity)*0.6)] blur-[110px] sm:size-80 lg:size-[450px] lg:blur-[160px]"
      />

      <Container className="pb-20 pt-24 lg:pb-28 lg:pt-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div
            className={`flex min-w-0 flex-col items-start ${illustration ? "lg:col-span-7" : "max-w-3xl lg:col-span-12"}`}
          >
            {hero.status && (
              <div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-card border border-line bg-surface px-3 py-1">
                <span className="relative flex size-2 shrink-0">
                  {hero.status.pulse && (
                    <span className="absolute inline-flex size-full rounded-full bg-accent opacity-75 motion-safe:animate-ping" />
                  )}
                  <span className="relative inline-flex size-2 rounded-full bg-accent" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted sm:text-xs">
                  {hero.status.label}
                </span>
              </div>
            )}

            <h1 className="font-display text-6xl leading-[0.9] text-balance [overflow-wrap:anywhere] sm:text-7xl lg:text-[84px]">
              {hero.name}
            </h1>
            <p className="mb-5 mt-3 font-display text-3xl leading-none text-accent sm:text-4xl">{hero.role}</p>
            <p className="mb-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{hero.tagline}</p>

            {(cta || hero.cv) && (
              <div className="mb-14 flex w-full flex-col gap-3 min-[420px]:w-auto min-[420px]:flex-row min-[420px]:flex-wrap min-[420px]:gap-4">
                {cta && (
                  <ButtonLink href={cta.href} variant="primary">
                    {cta.label}
                    <ArrowRight aria-hidden className="size-[18px]" />
                  </ButtonLink>
                )}
                {hero.cv && (
                  <ButtonLink href={hero.cv.href} variant="outline" download>
                    <Download aria-hidden className="size-[18px]" />
                    {hero.cv.label ?? "Download CV"}
                  </ButtonLink>
                )}
              </div>
            )}

            {hero.stats.length > 0 && (
              <dl
                className="grid w-full divide-x divide-line border-t border-line pt-6"
                style={{ gridTemplateColumns: `repeat(${hero.stats.length}, minmax(0, 1fr))` }}
              >
                {hero.stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col px-2 first:pl-0 last:pr-0 sm:px-4">
                    <dt className="order-2 mt-1 text-[10px] font-semibold uppercase tracking-wider text-muted sm:text-[11px]">
                      {stat.label}
                    </dt>
                    <dd className="order-1 font-display text-5xl leading-none sm:text-6xl">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          {illustration && (
            <div className="flex justify-center lg:col-span-5">
              <div className="relative w-full max-w-[440px] rounded-[8px] border border-line bg-surface p-2 shadow-[0_0_50px_rgba(230,57,70,0.12)] transition-colors duration-500 hover:border-accent/60">
                <div className="relative aspect-square w-full overflow-hidden rounded-[6px] bg-canvas">
                  <AsciiPlanet
                    speed={illustration.speed ?? 1}
                    stars={illustration.stars ?? true}
                    mouseTilt={illustration.mouseTilt ?? true}
                  />
                  {chipTop && (
                    <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-[6px] border border-line bg-surface/90 px-2.5 py-1">
                      <span className="size-1.5 rounded-full bg-accent" />
                      <span className="font-mono text-[10px] text-fg">{chipTop}</span>
                    </div>
                  )}
                  {chipBottom && (
                    <div className="absolute bottom-3 right-3 rounded-[4px] border border-line bg-surface/80 px-2 py-0.5 font-mono text-[10px] text-muted">
                      {chipBottom}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
