import { Mail } from "lucide-react";
import type { ContactContent } from "./types";

export const contact: ContactContent = {
  heading: {
    eyebrow: "Get in touch",
    title: "Let's build something together",
    description: "Available for mobile and fullstack web development.",
  },

  links: [
    { label: "younesmpro21@gmail.com", href: "mailto:younesmpro21@gmail.com", icon: Mail },
    { label: "github.com/You-ne5", href: "https://github.com/You-ne5", icon: "github" },
    { label: "in/younes-mohammedi", href: "https://linkedin.com/in/younes-mohammedi", icon: "/icons/linkedin.svg" },
    // TODO: replace with your Discord profile link (https://discord.com/users/<your user id>)
    { label: "Discord Profile", href: "https://discord.com/users/646780320548388898", icon: "discord" },
  ],
};
