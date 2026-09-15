import type { Content, SectionKey } from "@/content/types";

export const SECTION_ORDER: SectionKey[] = [
  "hero",
  "quote",
  "about",
  "skills",
  "experience",
  "projects",
  "languages",
  "contact",
];

/** Sections that are switched on in site.ts and have something to show, in page order. */
export function getVisibleSections(content: Content): SectionKey[] {
  const hasContent: Record<SectionKey, boolean> = {
    hero: true,
    quote: content.quote.text.trim().length > 0,
    about: true,
    skills: content.skills.categories.some((category) => category.items.length > 0),
    experience: content.experience.items.length > 0,
    projects: content.projects.items.length > 0,
    languages: content.languages.items.length > 0,
    contact: content.contact.links.length > 0,
  };
  return SECTION_ORDER.filter((key) => content.site.sections[key] && hasContent[key]);
}

/** False for "#section" links whose section is hidden; other links are always kept. */
export function isLinkVisible(href: string, visible: SectionKey[]): boolean {
  if (!href.startsWith("#")) return true;
  return visible.some((key) => key === href.slice(1));
}
