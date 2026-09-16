import type { LucideIcon } from "lucide-react";

export type SectionKey =
  | "hero"
  | "quote"
  | "about"
  | "skills"
  | "experience"
  | "projects"
  | "languages"
  | "contact";
export type ThemeName = "light" | "dark";
export type ThemePreference = ThemeName | "system";

export type HexColor = `#${string}`;
/** A file inside /public, written from the site root: "/images/me.jpg" → public/images/me.jpg */
export type PublicPath = `/${string}`;
export type ExternalUrl = `https://${string}` | `http://${string}` | `mailto:${string}` | `tel:${string}`;
export type Href = ExternalUrl | PublicPath | `#${string}`;

/** Simple Icons slug ("python"), custom SVG in /public ("/icons/linkedin.svg"), or a lucide icon component (Mail). */
export type IconSource = string | LucideIcon;

export interface ImageRef {
  src: PublicPath | `https://${string}`;
  alt: string;
}

export interface SectionHeadingContent {
  eyebrow: string;
  title: string;
  description?: string;
}

export type BackgroundPattern = "none" | "grid" | "lines" | "scanlines" | "dots";
export type PatternIntensity = "subtle" | "medium" | "strong";

/** Animated red texture behind a section's content */
export interface SectionBackground {
  /** "grid" squares · "lines" diagonal stripes · "scanlines" CRT lines · "dots" dot matrix · "none" */
  pattern: BackgroundPattern;
  /** Default "medium" */
  intensity?: PatternIntensity;
  /** Animation speed multiplier: 0.5 = half, 2 = double (default 1) */
  speed?: number;
}

export interface SiteConfig {
  name: string;
  url: `https://${string}`;
  lang?: string;
  meta: {
    title: string;
    /** "%s" is replaced by the page title, e.g. "%s | Younes Mohammedi" */
    titleTemplate?: string;
    description: string;
    /** 1200×630 image in /public */
    ogImage?: PublicPath;
    favicon?: PublicPath;
    keywords?: string[];
  };
  theme: { default: ThemePreference };
  sections: Record<SectionKey, boolean>;
  footer: {
    /** Shown after "© {year} {name}." */
    copyright?: string;
    note?: string;
  };
}

export interface HeroContent {
  status?: { label: string; pulse?: boolean };
  name: string;
  role: string;
  tagline: string;
  primaryCta?: { label: string; href: Href };
  cv?: { href: PublicPath; label?: string };
  /** Small email card at the bottom-right of the hero, just above the quote */
  email?: { address: string; label?: string };
  stats: { value: string; label: string }[];
  /** Animated ASCII planet card on the right of the hero */
  illustration?: {
    /** false hides the card and lets the hero text use the full width */
    enabled: boolean;
    /** Animation speed multiplier: 0.5 = half, 2 = double (default 1) */
    speed?: number;
    /** Twinkling stars behind the planet (default true) */
    stars?: boolean;
    /** Tilt toward the mouse on desktop (default true) */
    mouseTilt?: boolean;
    /** [top-left label, bottom-right label] */
    chips?: string[];
  };
}

export interface AboutContent {
  heading: SectionHeadingContent;
  /** A string, or an array of paragraphs */
  bio: string | string[];
  portrait?: ImageRef;
  focus: { label: string; icon?: IconSource }[];
  background?: SectionBackground;
}

export interface Skill {
  name: string;
  icon?: IconSource;
  /** Overrides the brand color (used as-is, no contrast fallback) */
  color?: HexColor;
}

export interface SkillCategory {
  name: string;
  description?: string;
  items: Skill[];
}

export interface SkillsContent {
  heading: SectionHeadingContent;
  categories: SkillCategory[];
  background?: SectionBackground;
}

export interface ExperienceItem {
  company: string;
  companyUrl?: ExternalUrl;
  role: string;
  period: string;
  location?: string;
  highlights: string[];
}

export interface ExperienceContent {
  heading: SectionHeadingContent;
  items: ExperienceItem[];
  background?: SectionBackground;
}

export interface Project {
  title: string;
  category: string;
  summary: string;
  tags: string[];
  image?: ImageRef;
  /** External link opened by the ↗ arrow */
  link?: ExternalUrl;
  /** Slug of src/content/projects/<slug>.md — makes the card open /projects/<slug> */
  details?: string;
}

export interface ProjectsContent {
  heading: SectionHeadingContent;
  items: Project[];
  background?: SectionBackground;
}

export type LanguageLevel = "native" | "fluent" | "intermediate" | "beginner";

export interface SpokenLanguage {
  name: string;
  nativeName?: string;
  level: LanguageLevel;
  /** Overrides the badge text (defaults to the level name) */
  levelLabel?: string;
}

export interface LanguagesContent {
  heading: SectionHeadingContent;
  items: SpokenLanguage[];
  background?: SectionBackground;
}

export interface ContactLink {
  label: string;
  href: ExternalUrl;
  icon?: IconSource;
}

export interface ContactContent {
  heading: SectionHeadingContent;
  links: ContactLink[];
  background?: SectionBackground;
}

export interface QuoteContent {
  text: string;
  author?: string;
  /** Falling katakana "terminal rain" behind the quote (default true) */
  rain?: boolean;
  /** Rain speed multiplier: 0.5 = half, 2 = double (default 1) */
  rainSpeed?: number;
}

export interface NavContent {
  /** Text at the top-left, rendered as "> logo_" */
  logo: string;
  /** "#section" links scroll to that section; hidden sections are skipped */
  links: { label: string; href: Href }[];
  /** Button on the right, next to the theme toggle */
  cta?: { label: string; href: Href };
  /** Speed of the glitch effect when hovering a link: 0.5 = half, 2 = double (default 1) */
  glitchSpeed?: number;
}

export interface Content {
  site: SiteConfig;
  nav: NavContent;
  hero: HeroContent;
  quote: QuoteContent;
  about: AboutContent;
  skills: SkillsContent;
  experience: ExperienceContent;
  projects: ProjectsContent;
  languages: LanguagesContent;
  contact: ContactContent;
}
