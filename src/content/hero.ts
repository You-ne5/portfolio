import type { HeroContent } from "./types";

export const hero: HeroContent = {
  name: "Younes Mh",
  role: "FullStack Developer",
  tagline:
    "Building mobile, desktop, and web solutions. 4+ years across personal and freelance projects.",

  primaryCta: { label: "View My Work", href: "#projects" },

  // Put your CV at public/cv.pdf, then uncomment:
  cv: { href: "/cv_mohammedi_younes.pdf", label: "Download CV" },

  stats: [
    { value: "4+", label: "Years of experience" },
    { value: "10+", label: "Projects built" },
    { value: "3+", label: "Years freelancing" },
  ],

  // Animated ASCII planet card
  illustration: {
    enabled: true, // false hides the card; the hero text then uses the full width
    speed: 0.1, // 0.5 = half speed, 2 = double
    stars: true, // twinkling stars behind the planet
    mouseTilt: true, // tilt toward the mouse on desktop
    chips: ["", "lat: 14ms"], // [top-left, bottom-right] labels; "" hides one
  },
};
