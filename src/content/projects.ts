import type { ProjectsContent } from "./types";

// image:   cover in /public, 16:9 — e.g. { src: "/projects/unigo/cover.png", alt: "…" }
// link:    external URL opened by the ↗ arrow (GitHub, Play Store, live site…)
// details: slug of src/content/projects/<slug>.md — the card then opens /projects/<slug>
export const projects: ProjectsContent = {

  // Animated background: pattern "grid" | "lines" | "scanlines" | "dots" | "none",
  // intensity "subtle" | "medium" | "strong", speed 0.5 = half, 2 = double. Remove to turn it off.
  background: { pattern: "scanlines", intensity: "subtle", speed: 0.6 },

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
        "carpooling application with Google maps integration, Bloc state management, and Firebase security.",
      tags: ["Flutter", "Bloc", "Firebase", "Google maps api"],
      image: {
        src: "/projects/unigo/iphone-multiple-screens-mockup.png",
        alt: "Unigo app on three phones: welcome screen, sign-up form, and the blue Unigo logo",
      },
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
        src: "/projects/esi-archive/notebook-mockup-on-desk.png",
        alt: "ESI Archives desktop app dashboard showing student counts, programs, and average grades by year",
      },
      details: "esi-archive",
    },
    {
      title: "Twitch Clipper",
      category: "Script / REST API",
      summary:
        "Turns any Twitch stream link into a ranked list of its clips, most viewed first, with timecodes and jump links. Editors skip the VOD scrubbing and go straight to the best-of.",
      tags: ["Python", "REST API"],
      image: {
        src: "/projects/twitch-clipper/logo.png",
        alt: "Twitch Clipper logo: the letters TC in purple",
      },
      details: "twitch-clipper",
    },
  ],
};
