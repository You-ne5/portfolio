import { CodeXml, Database } from "lucide-react";
import type { SkillsContent } from "./types";

// icon: a slug from https://simpleicons.org ("python"), a custom SVG ("/icons/x.svg"),
// a lucide icon (imported above), or leave it out for a letter tile.
export const skills: SkillsContent = {
  heading: {
    eyebrow: "Stack & capabilities",
    title: "Technical Arsenal",
  },

  // Animated background: pattern "grid" | "lines" | "scanlines" | "dots" | "none",
  // intensity "subtle" | "medium" | "strong", speed 0.5 = half, 2 = double. Remove to turn it off.
  background: { pattern: "dots", intensity: "subtle", speed: 1 },

  categories: [
    {
      name: "Languages",
      description: "Programming languages I know",
      items: [
        { name: "Dart", icon: "dart" },
        { name: "Typescript", icon: "typescript" },
        { name: "Python", icon: "python" },
        { name: "C", icon: "c" },
        { name: "Java", icon: "openjdk" },
        { name: "SQL", icon: Database },
        { name: "Bash", icon: "gnubash" },
      ],
    },
    {
      name: "Frameworks & Libraries",
      description: "Frontend, Backend, Mobile and more",
      items: [
        { name: "Flutter", icon: "flutter" },
        { name: "NextJs", icon: "nextdotjs" },
        { name: "NestJs", icon: "nestjs" },
        { name: "OpenCV", icon: "opencv" },
      ],
    },
    {
      name: "Databases",
      description: "Real-time sync, relational, and ORM storage layers",
      items: [
        { name: "Firebase", icon: "firebase" },
        { name: "Prisma", icon: "prisma" },
        { name: "SQLite", icon: "sqlite" },
        { name: "postgresql", icon: "postgresql" },
      ],
    },
    {
      name: "Tools",
      description: "Operating systems, design tools, AI tools, and project management",
      items: [
        { name: "Linux", icon: "linux" },
        { name: "Claude Code", icon: "claudecode" },
        { name: "Figma", icon: "figma" },
        { name: "VS Code", icon: CodeXml },
        { name: "Git / GitHub", icon: "git" },
        { name: "Notion", icon: "notion" },
        { name: "Obsidian", icon: "obsidian" },

      ],
    },
  ],
};
