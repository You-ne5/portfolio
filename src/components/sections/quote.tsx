import type { QuoteContent } from "@/content/types";
import { KatakanaRain } from "@/components/katakana-rain";
import { Container } from "@/components/ui/container";
import { Section, type Tone } from "@/components/ui/section";

export function QuoteSection({ quote, tone }: { quote: QuoteContent; tone: Tone }) {
  return (
    <Section id="quote" tone={tone}>
      <div className="relative">
        {/* {quote.rain !== false && <KatakanaRain speed={quote.rainSpeed ?? 1} />} */}
        <Container className="py-7 sm:py-9 short:py-6">
          <figure data-rain-avoid className="mx-auto flex w-fit max-w-full flex-col items-center gap-2 text-center">
            <blockquote className="font-display text-xl leading-tight text-balance text-muted sm:whitespace-nowrap sm:text-[26px] md:text-3xl lg:text-[40px] xl:text-5xl">
              <p>
                <span aria-hidden className="text-accent">
                  &quot;
                </span>
                {quote.text}
                <span aria-hidden className="text-accent">
                  &quot;
                </span>
              </p>
            </blockquote>
            {quote.author && (
              <figcaption className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted/70 sm:text-xs">
                <span aria-hidden className="h-px w-6 bg-accent/40" />
                {quote.author}
                <span aria-hidden className="h-px w-6 bg-accent/40" />
              </figcaption>
            )}
          </figure>
        </Container>
      </div>
    </Section>
  );
}
