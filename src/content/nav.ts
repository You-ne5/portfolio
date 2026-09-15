import type { NavContent } from "./types";

// Top navigation bar. Links to sections that are hidden in site.ts are removed automatically.
export const nav: NavContent = {
  logo: "youn", // shown as "> younes_"
  links: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
  ],
  cta: { label: "Contact", href: "#contact" }, // remove to hide the button
};
