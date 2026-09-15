import type { LanguagesContent } from "./types";

// level: "native" | "fluent" | "intermediate" | "beginner"
export const languages: LanguagesContent = {
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
