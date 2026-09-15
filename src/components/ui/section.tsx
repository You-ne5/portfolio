import type { ReactNode } from "react";
import type { SectionBackground } from "@/content/types";
import { SectionPattern } from "./section-pattern";

export type Tone = "base" | "alt";

export const TONE_BG: Record<Tone, string> = {
  base: "bg-canvas",
  alt: "bg-canvas-alt",
};

export function Section({
  id,
  tone,
  background,
  className = "",
  children,
}: {
  id: string;
  tone: Tone;
  background?: SectionBackground;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`relative isolate scroll-mt-17 overflow-hidden border-t border-line first:border-t-0 ${TONE_BG[tone]} ${className}`}
    >
      <SectionPattern background={background} />
      {children}
    </section>
  );
}
