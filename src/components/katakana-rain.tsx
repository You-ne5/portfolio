"use client";

import { useEffect, useRef } from "react";

const FONT_SIZE = 16;
const FRAME_MS = 1000 / 20;
const HEAD_ALPHA = 0.6;
const TRAIL_ALPHA = 0.35;
/** Empty space kept between the rain and an element marked with data-rain-avoid */
const AVOID_GAP = 24;
const FONT = `${FONT_SIZE}px "Noto Sans JP", "Noto Sans CJK JP", "Hiragino Sans", "Yu Gothic", "Meiryo", monospace`;

// Full-width katakana ァ..ヺ plus digits, like the Matrix rain.
const GLYPHS = [
  ...Array.from({ length: 0x30fa - 0x30a1 + 1 }, (_, i) => String.fromCharCode(0x30a1 + i)),
  ..."0123456789",
];

const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

/** end: the row where this column stops falling and its trail fades out */
type Drop = { y: number; speed: number; trail: number; end: number };

/** Falling katakana behind its parent. Columns overlapping a sibling with data-rain-avoid are left empty. */
export function KatakanaRain({ speed = 1 }: { speed?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const avoid = canvas.parentElement?.querySelector<HTMLElement>("[data-rain-avoid]") ?? null;
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let rows = 0;
    let drops: Drop[] = [];
    let blocked: boolean[] = [];
    let cells: string[][] = [];
    let colors = { head: "#f5f5f5", trail: "#e63946" };
    let frame = 0;
    let lastTick = 0;
    let onScreen = true;

    const readColors = () => {
      const style = getComputedStyle(document.documentElement);
      colors = {
        head: style.getPropertyValue("--fg").trim() || colors.head,
        trail: style.getPropertyValue("--accent").trim() || colors.trail,
      };
    };

    const newDrop = (scattered: boolean): Drop => {
      const end = Math.floor((rows - 1) * (0.35 + Math.random() * 0.65));
      const trail = 4 + Math.floor(Math.random() * 8);
      return {
        y: scattered ? Math.random() * (end + trail) : -Math.random() * rows * 0.8,
        speed: 0.25 + Math.random() * 0.55,
        trail,
        end,
      };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = FONT;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";

      const columns = Math.ceil(width / FONT_SIZE);
      rows = Math.ceil(height / FONT_SIZE) + 1;
      drops = Array.from({ length: columns }, () => newDrop(true));
      cells = Array.from({ length: columns }, () => Array.from({ length: rows }, randomGlyph));

      const avoidRect = avoid?.getBoundingClientRect();
      const left = avoidRect ? avoidRect.left - rect.left - AVOID_GAP : Infinity;
      const right = avoidRect ? avoidRect.right - rect.left + AVOID_GAP : -Infinity;
      blocked = drops.map((_, col) => col * FONT_SIZE + FONT_SIZE > left && col * FONT_SIZE < right);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (let col = 0; col < drops.length; col++) {
        if (blocked[col]) continue;
        const drop = drops[col];
        const head = Math.floor(drop.y);
        const x = col * FONT_SIZE + FONT_SIZE / 2;
        const glyphs = cells[col];

        ctx.fillStyle = colors.trail;
        for (let k = 1; k <= drop.trail; k++) {
          const row = head - k;
          if (row < 0 || row > drop.end) continue;
          ctx.globalAlpha = TRAIL_ALPHA * (1 - k / (drop.trail + 1));
          ctx.fillText(glyphs[row], x, row * FONT_SIZE);
        }
        if (head >= 0 && head <= drop.end) {
          ctx.fillStyle = colors.head;
          ctx.globalAlpha = HEAD_ALPHA;
          ctx.fillText(glyphs[head], x, head * FONT_SIZE);
        }
      }
      ctx.globalAlpha = 1;
    };

    const step = () => {
      for (let col = 0; col < drops.length; col++) {
        if (blocked[col]) continue;
        const drop = drops[col];
        drop.y += drop.speed * speed;
        if (Math.random() < 0.05) cells[col][Math.floor(Math.random() * rows)] = randomGlyph();
        if (drop.y - drop.trail > drop.end) drops[col] = newDrop(false);
      }
    };

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      if (lastTick && now - lastTick < FRAME_MS) return;
      lastTick = now;
      step();
      draw();
    };

    const start = () => {
      if (frame || !onScreen || document.hidden || reducedMotion.matches) return;
      lastTick = 0;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    readColors();
    resize();
    draw();

    // The quote's width also changes when its web font finishes loading, so watch it too.
    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw();
    });
    resizeObserver.observe(canvas);
    if (avoid) resizeObserver.observe(avoid);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    intersectionObserver.observe(canvas);

    const themeObserver = new MutationObserver(() => {
      readColors();
      if (!frame) draw();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const onVisibilityChange = () => (document.hidden ? stop() : start());
    const onMotionPreferenceChange = () => (reducedMotion.matches ? stop() : start());
    document.addEventListener("visibilitychange", onVisibilityChange);
    reducedMotion.addEventListener("change", onMotionPreferenceChange);
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reducedMotion.removeEventListener("change", onMotionPreferenceChange);
    };
  }, [speed]);

  const fadeTop = "linear-gradient(to bottom, transparent, black 25%)";
  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 size-full"
      style={{ maskImage: fadeTop, WebkitMaskImage: fadeTop }}
    />
  );
}
