import Link from "next/link";
import type { CSSProperties } from "react";
import type { NavContent, SectionKey, ThemePreference } from "@/content/types";
import { ThemeToggle } from "@/components/theme-toggle";
import { isLinkVisible } from "@/lib/sections";

// "#about" → "/#about" so section links also work from project pages.
const toHref = (href: string) => (href.startsWith("#") ? `/${href}` : href);

export function Navbar({
  nav,
  visibleSections,
  themePreference,
}: {
  nav: NavContent;
  visibleSections: SectionKey[];
  themePreference: ThemePreference;
}) {
  const links = nav.links.filter((link) => isLinkVisible(link.href, visibleSections));
  const cta = nav.cta && isLinkVisible(nav.cta.href, visibleSections) ? nav.cta : undefined;
  const glitchSpeed = { "--glitch-speed": nav.glitchSpeed ?? 1 } as CSSProperties;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-canvas/70 backdrop-blur-md">
      <nav aria-label="Main" className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-8">
          <Link
            href="/"
            className="shrink-0 font-display text-3xl leading-none text-fg transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <span className="text-accent">&gt;</span> {nav.logo}
            <span aria-hidden className="text-accent motion-safe:animate-blink">
              _
            </span>
          </Link>
          {links.length > 0 && (
            <ul className="hidden items-center gap-6 md:flex" style={glitchSpeed}>
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={toHref(link.href)}
                    data-text={link.label}
                    className="glitch font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-none"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-3">
          {cta && (
            <a
              href={toHref(cta.href)}
              className="rounded-card border border-accent/60 px-3.5 py-1.5 font-mono text-xs uppercase tracking-widest text-fg transition-colors hover:border-accent hover:bg-accent/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {cta.label}
            </a>
          )}
          <ThemeToggle preference={themePreference} />
        </div>
      </nav>
    </header>
  );
}
