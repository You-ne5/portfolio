import type { ExperienceContent } from "./types";

// Listed top to bottom in the order written here.
export const experience: ExperienceContent = {
  heading: {
    eyebrow: "Experience",
    title: "My experience",
  },

  items: [
    {
      company: "V-eye",
      role: "Backend Developer - internship",
      period: "Jul 2026 – Sep 2026",
      highlights: [
        "Worked on the backend of a mobile application using nestJs, Prisma and Postgres",
        "Worked on the backend of a dashboard tool using expressJs",
      ],
    },
    {
      company: "Unigo",
      role: "Mobile Developer",
      period: "Sept 2025 – Feb 2026",
      highlights: [
        "Flutter developer at a carpooling startup; integrated Firebase Auth, Firestore, and Storage.",
        "Implemented Bloc state management architecture and core user-facing flows.",
        "Enforced app security: code obfuscation, Firebase security rules, and App Check.",
      ],
    },
    {
      company: "Djezzy",
      role: "Initiation internship",
      period: "June – July 2025",
      highlights: [
        "Explored telecom IT infrastructure across Big Data, web, mobile, and applied AI systems.",
        "Built Flutter side-projects and prototypes under senior engineering supervision.",
      ],
    },
  ],
};
