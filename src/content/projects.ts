import type { ProjectsContent } from "./types";

// image:   cover in /public, 16:9 — e.g. { src: "/projects/unigo/cover.png", alt: "…" }
// link:    external URL opened by the ↗ arrow (GitHub, Play Store, live site…)
// details: slug of src/content/projects/<slug>.md — the card then opens /projects/<slug>
export const projects: ProjectsContent = {
  heading: {
    eyebrow: "Featured work",
    title: "Featured Projects",
    description: "",
  },

  items: [
    {
      title: "Unigo Carpool",
      category: "Mobile App",
      summary:
        "carpooling application with Google maps integration, Bloc state management, and hardened Firebase security.",
      tags: ["Flutter", "Bloc", "Firebase", "Google maps api"],
      details: "unigo",
    },
    {
      title: "ESI Archive Digitization",
      category: "Desktop App / Image processing",
      summary:
        // "Python/OpenCV pipeline & Flutter desktop app with SQLite to digitize 2,177+ student records with OCR search and automated PDF/CSV export. Led 6-person engineering team.",
        "Digitization of the esi student archive (1978-1984) using python, OpenCv and AI. Total of 2177 student records accessible through the flutter desktop app",
      tags: ["Flutter", "Python", "OpenCV", "SQLite"],
      image: {
        src: "/projects/esi-archive/esi-archive.png",
        alt: "ESI Archives desktop app dashboard showing student counts, programs, and average grades by year",
      },
    },
    
  ],
};
