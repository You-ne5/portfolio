import { CodeXml, Database } from "lucide-react";
import type { SkillsContent } from "./types";

// icon: a slug from https://simpleicons.org ("python"), a custom SVG ("/icons/x.svg"),
// a lucide icon (imported above), or leave it out for a letter tile.
export const skills: SkillsContent = {
  heading: {
    eyebrow: "Stack & capabilities",
    title: "Technical Arsenal",
  },

  categories: [
    {
      name: "Languages",
      description: "Core compiled and interpreted programming languages",
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
      description: "Cross-platform UI engines and scientific tooling",
      items: [
        { name: "Flutter", icon: "flutter" },
        { name: "NestJs", icon: "nestjs" },
        { name: "OpenCV", icon: "opencv" },
      ],
    },
    {
      name: "Databases",
      description: "Real-time sync, relational, and ORM storage layers",
      items: [
        { name: "Firebase", icon: "firebase" },
        { name: "SQLite", icon: "sqlite" },
        { name: "Prisma", icon: "prisma" },
      ],
    },
    {
      name: "Tools",
      description: "Operating systems, design tools, and engineering workflows",
      items: [
        { name: "Linux", icon: "linux" },
        { name: "Figma", icon: "figma" },
        { name: "VS Code", icon: CodeXml },
        { name: "Git / GitHub", icon: "git" },
        { name: "Notion", icon: "notion" },
        { name: "Obsidian", icon: "obsidian" },
        { name: "Claude Code", icon: "claudecode" },

      ],
    },
  ],
};
