import { seededRandom } from "@/lib/seeded-random";

export const ASCII_COLS = 60;
export const ASCII_ROWS = 36;

// Dark → bright, in the style of the original hand-typed drawing.
const RAMP = " .,:;-~uo[8NM";

const PLANET_RADIUS = 0.36;
const RING_INNER = 0.56;
const RING_OUTER = 0.93;
const RING_GAP_RADIUS = 0.74;
const RING_GAP_WIDTH = 0.028;
// How far the ring plane is tipped toward the viewer (smaller = closer to edge-on).
const RING_PITCH = 0.3;
const RING_ROLL = 0.5;

type Vec = [number, number, number];

const dot = (a: Vec, b: Vec) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

function normalize([x, y, z]: Vec): Vec {
  const length = Math.hypot(x, y, z);
  return [x / length, y / length, z / length];
}

function rotateX([x, y, z]: Vec, angle: number): Vec {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [x, y * c - z * s, y * s + z * c];
}

function rotateZ([x, y, z]: Vec, angle: number): Vec {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [x * c - y * s, x * s + y * c, z];
}

const LIGHT = normalize([-0.55, 0.6, 0.6]);

const STARS = (() => {
  const random = seededRandom(7);
  return Array.from({ length: 28 }, () => ({
    col: Math.floor(random() * ASCII_COLS),
    row: Math.floor(random() * ASCII_ROWS),
    rate: 0.5 + random() * 1.5,
    phase: random() * Math.PI * 2,
  }));
})();

export interface PlanetFrameOptions {
  stars: boolean;
  /** Pointer offset from the center, -1..1 */
  tiltX?: number;
  tiltY?: number;
}

export function renderPlanetFrame(time: number, { stars, tiltX = 0, tiltY = 0 }: PlanetFrameOptions): string {
  const pitch = RING_PITCH + 0.04 * Math.sin(time * 0.45) - tiltY * 0.12;
  const roll = RING_ROLL + 0.04 * Math.sin(time * 0.31) + tiltX * 0.18;
  const bob = 0.03 * Math.sin(time * 0.8);
  const spin = time * 0.6;

  const toWorld = (v: Vec) => rotateZ(rotateX(v, pitch), roll);
  const toBody = (v: Vec) => rotateX(rotateZ(v, -roll), -pitch);
  const ringNormal = toWorld([0, 1, 0]);
  const ringU = toWorld([1, 0, 0]);
  const ringV = toWorld([0, 0, 1]);

  const grid = Array.from({ length: ASCII_ROWS }, () => new Array<string>(ASCII_COLS).fill(" "));

  if (stars) {
    for (const star of STARS) {
      const glow = 0.5 + 0.5 * Math.sin(time * star.rate + star.phase);
      if (glow > 0.35) grid[star.row][star.col] = glow > 0.9 ? "*" : glow > 0.65 ? "+" : ".";
    }
  }

  const last = RAMP.length - 1;
  for (let row = 0; row < ASCII_ROWS; row++) {
    const y = 1 - ((row + 0.5) / ASCII_ROWS) * 2 - bob;
    for (let col = 0; col < ASCII_COLS; col++) {
      const x = ((col + 0.5) / ASCII_COLS) * 2 - 1;
      let depth = -Infinity;
      let brightness = 0;

      const r2 = x * x + y * y;
      if (r2 < PLANET_RADIUS * PLANET_RADIUS) {
        const z = Math.sqrt(PLANET_RADIUS * PLANET_RADIUS - r2);
        const normal: Vec = [x / PLANET_RADIUS, y / PLANET_RADIUS, z / PLANET_RADIUS];
        const diffuse = Math.max(0, dot(normal, LIGHT));
        const [bx, by, bz] = toBody(normal);
        const latitude = Math.asin(Math.max(-1, Math.min(1, by)));
        const longitude = Math.atan2(bx, bz) + spin;
        const bands = 0.75 + 0.25 * Math.sin(latitude * 8 + 0.8 * Math.sin(longitude * 2));
        const stormLon = Math.atan2(Math.sin(longitude), Math.cos(longitude));
        const storm = Math.exp(-(((latitude + 0.35) / 0.14) ** 2) - (stormLon / 0.4) ** 2);
        brightness = 0.05 + 1.15 * diffuse ** 0.8 * (bands - 0.4 * storm);
        depth = z;
      }

      if (Math.abs(ringNormal[2]) > 1e-3) {
        const z = -(ringNormal[0] * x + ringNormal[1] * y) / ringNormal[2];
        const radius = Math.hypot(x, y, z);
        const inGap = Math.abs(radius - RING_GAP_RADIUS) < RING_GAP_WIDTH;
        if (z > depth && radius > RING_INNER && radius < RING_OUTER && !inGap) {
          const point: Vec = [x, y, z];
          const angle = Math.atan2(dot(point, ringV), dot(point, ringU));
          const sweep = 0.65 + 0.35 * Math.sin(angle * 3 - spin * 1.2);
          const nearSide = z > 0 ? 1 : 0.75;
          brightness = (radius < RING_GAP_RADIUS ? 0.42 : 0.32) * sweep * nearSide;
          depth = z;
        }
      }

      if (depth > -Infinity) {
        grid[row][col] = RAMP[Math.max(0, Math.min(last, Math.round(brightness * last)))];
      }
    }
  }

  return grid.map((line) => line.join("")).join("\n");
}
