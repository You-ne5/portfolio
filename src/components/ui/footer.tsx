import type { SiteConfig } from "@/content/types";
import { Container } from "./container";
import { TONE_BG, type Tone } from "./section";

export function Footer({ site, tone }: { site: SiteConfig; tone: Tone }) {
  const noteParts = site.footer.note?.split("•").map((part) => part.trim()) ?? [];
  return (
    <footer className={`border-t border-line ${TONE_BG[tone]}`}>
      <Container className="flex flex-col items-center justify-between gap-3 py-8 sm:flex-row">
        <p className="text-center font-mono text-xs text-muted sm:text-left">
          © {new Date().getFullYear()} {site.name}.{site.footer.copyright && ` ${site.footer.copyright}`}
        </p>
        {noteParts.length > 0 && (
          <p className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs text-muted">
            {noteParts.map((part, i) => (
              <span key={i} className="contents">
                {i > 0 && <span aria-hidden>•</span>}
                <span className={i === noteParts.length - 1 && noteParts.length > 1 ? "text-accent" : ""}>{part}</span>
              </span>
            ))}
          </p>
        )}
      </Container>
    </footer>
  );
}
