import type { LanguagesContent } from "./types";

// level: "native" | "fluent" | "intermediate" | "beginner"
export const languages: LanguagesContent = {

  // Animated background: pattern "grid" | "lines" | "scanlines" | "dots" | "none",
  // intensity "subtle" | "medium" | "strong", speed 0.5 = half, 2 = double. Remove to turn it off.
  background: { pattern: "grid", intensity: "subtle", speed: 0.6 },

  heading: {
    eyebrow: "Spoken languages",
    title: "Spoken Languages",
    description: "",
  },

  items: [
    { name: "English", nativeName: "English", level: "fluent" },
    { name: "French", nativeName: "Français", level: "fluent" },
    { name: "Arabic", nativeName: "العربية", level: "native" },
    { name: "German", nativeName: "Deutsch", level: "beginner" },
  ],
};
