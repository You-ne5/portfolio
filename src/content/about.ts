import { Pen, Smartphone, Terminal } from "lucide-react";
import type { AboutContent } from "./types";

export const about: AboutContent = {
  heading: {
    eyebrow: ">whoami",
    title: "About me",
  },

  bio: "Spent 4+ years building across mobile, desktop, web, and automation. Worked on Web, Desktop, mobile, and image processing projects. Detail-oriented, comfortable working solo (3+ years freelancing) or in a team (project lead on a 6-person team).",

  portrait: { src: "/images/portrait.jpg", alt: "Portrait of Younes Mohammedi" }, // 4:5

  focus: [
    { label: "Mobile & Desktop (Flutter)", icon: Smartphone },
    { label: "Backend development", icon: Terminal },
    { label: "Frontend", icon: Pen},
  ],
};
