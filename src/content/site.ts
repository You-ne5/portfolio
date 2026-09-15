import type { SiteConfig } from "./types";

export const site: SiteConfig = {
  name: "Younes Mohammedi",
  // TODO: replace with your real Vercel URL or custom domain (used for social preview links)
  url: "https://younes-mohammedi.vercel.app",
  lang: "en",

  meta: {
    title: "Younes Mohammedi — Junior Software Developer",
    titleTemplate: "%s | Younes Mohammedi",
    description:
      "Junior software developer building mobile, desktop, and automation solutions with Flutter and Python.",
    // ogImage: "/og.png", // 1200×630 image placed at public/og.png
    favicon: "/favicon.ico",
    keywords: ["Younes Mohammedi", "Flutter developer", "Python", "portfolio", "ESI Alger"],
  },

  // "dark" | "light" | "system" — what first-time visitors see
  theme: { default: "dark" },

  // Set any section to false to hide it
  sections: {
    hero: true,
    quote: true,
    about: true,
    skills: true,
    experience: true,
    projects: true,
    languages: true,
    contact: true,
  },

  footer: {
    copyright: "All rights reserved. Built with precision.",
    note: "UTC+1 • Let's build something",
  },
};
