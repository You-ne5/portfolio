import type { CSSProperties } from "react";
import type { PatternIntensity, SectionBackground } from "@/content/types";
import { seededRandom } from "@/lib/seeded-random";

const INTENSITY: Record<PatternIntensity, number> = {
  subtle: 0.35,
  medium: 0.65,
  strong: 1,
};

const GRID_CELL_SIZE = 40;

// Fixed positions so the markup is identical on every render.
const GRID_CELLS = (() => {
  const random = seededRandom(11);
  return Array.from({ length: 28 }, () => ({
    x: random() * 100,
    y: random() * 100,
    duration: 6 + random() * 8,
    delay: random() * 14,
  }));
})();

/** CSS-only animated texture behind a section's content. Styles live in src/app/globals.css (.pattern-*). */
export function SectionPattern({ background }: { background?: SectionBackground }) {
  if (!background || background.pattern === "none") return null;

  const style = {
    "--pattern-intensity": INTENSITY[background.intensity ?? "medium"],
    "--pattern-speed": background.speed ?? 1,
  } as CSSProperties;

  return (
    <div aria-hidden className={`pattern pattern-${background.pattern}`} style={style}>
      {background.pattern === "grid" &&
        GRID_CELLS.map((cell, i) => (
          <span
            key={i}
            className="pattern-cell"
            style={{
              left: `round(down, ${cell.x.toFixed(2)}%, ${GRID_CELL_SIZE}px)`,
              top: `round(down, ${cell.y.toFixed(2)}%, ${GRID_CELL_SIZE}px)`,
              animationDuration: `calc(${cell.duration.toFixed(2)}s / var(--pattern-speed))`,
              animationDelay: `-${cell.delay.toFixed(2)}s`,
            }}
          />
        ))}
    </div>
  );
}
