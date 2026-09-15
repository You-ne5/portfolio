import type { ContactContent } from "@/content/types";
import { BrandIcon } from "@/components/ui/brand-icon";
import { Container } from "@/components/ui/container";
import { Section, type Tone } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/section-heading";

export function ContactSection({ contact, tone }: { contact: ContactContent; tone: Tone }) {
  return (
    <Section id="contact" tone={tone} background={contact.background}>
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-[350px] w-[min(600px,100%)] -translate-x-1/2 rounded-full bg-accent opacity-[calc(var(--glow-opacity)*0.6)] blur-[140px]"
      />
      <Container className="flex flex-col items-center py-20 sm:py-28">
        <Eyebrow label={contact.heading.eyebrow} className="mb-3" />
        <h2 className="mb-4 text-center font-display text-5xl leading-none text-balance sm:text-7xl">
          {contact.heading.title}
        </h2>
        {contact.heading.description && (
          <p className="mx-auto mb-10 max-w-xl text-center text-base leading-relaxed text-muted sm:mb-12 sm:text-lg">
            {contact.heading.description}
          </p>
        )}

        <ul className="flex max-w-3xl flex-wrap items-center justify-center gap-3 sm:gap-4">
          {contact.links.map((link) => {
            const external = /^https?:/.test(link.href);
            return (
              <li key={link.href} className="max-w-full">
                <a
                  href={link.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="flex max-w-full items-center gap-2.5 rounded-card border border-line bg-surface px-5 py-3 text-sm font-medium transition-all hover:border-accent hover:text-accent hover:shadow-[0_0_15px_rgba(230,57,70,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <BrandIcon icon={link.icon} name={link.label} mono className="size-4" />
                  <span className="min-w-0 [overflow-wrap:anywhere]">{link.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
