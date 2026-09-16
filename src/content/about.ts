import { Pen, Smartphone, Terminal } from "lucide-react";
import type { AboutContent } from "./types";

export const about: AboutContent = {
  heading: {
    eyebrow: ">whoami",
    title: "About me",
  },

  // Animated background (see skills.ts for the options). Uncomment to turn it on:
  // background: { pattern: "grid", intensity: "medium", speed: 1 },

  bio: "Spent 4+ years building across mobile, desktop, web, and automation. Worked on Web, Desktop, mobile, and image processing projects. Detail-oriented, comfortable working solo (3+ years freelancing) or in a team (project lead on a 6-person team).",

  portrait: { src: "/images/portrait.jpg", alt: "Portrait of Younes Mohammedi" }, // 4:5

  focus: [
    { label: "Mobile & Desktop", icon: Smartphone },
    { label: "Backend development", icon: Terminal },
    { label: "Frontend development", icon: Pen},
  ],
};
