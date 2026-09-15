import type { ReactNode } from "react";

export type Tone = "base" | "alt";

export const TONE_BG: Record<Tone, string> = {
  base: "bg-canvas",
  alt: "bg-canvas-alt",
};

export function Section({ id, tone, children }: { id: string; tone: Tone; children: ReactNode }) {
  return (
    <section
      id={id}
      className={`relative isolate scroll-mt-17 overflow-hidden border-t border-line first:border-t-0 ${TONE_BG[tone]}`}
    >
      {children}
    </section>
  );
}
