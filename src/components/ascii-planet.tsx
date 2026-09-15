"use client";

import { useEffect, useRef } from "react";
import { ASCII_COLS, renderPlanetFrame } from "@/lib/ascii-planet";

const FRAME_MS = 1000 / 30;
const TILT_EASING = 0.08;

// Monospace glyphs are 0.6em wide, so this font size makes ASCII_COLS columns fill the container width exactly.
const FONT_SIZE = `calc(100cqw / ${ASCII_COLS * 0.6})`;

const clamp = (value: number) => Math.max(-1, Math.min(1, value));

export function AsciiPlanet({ speed, stars, mouseTilt }: { speed: number; stars: boolean; mouseTilt: boolean }) {
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const pre = preRef.current;
    const text = pre?.firstChild;
    if (!pre || !(text instanceof Text)) return;

    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let onScreen = true;
    let lastTick = 0;
    let time = 0;
    let tiltX = 0;
    let tiltY = 0;
    let targetX = 0;
    let targetY = 0;

    const draw = () => {
      const next = renderPlanetFrame(time, { stars, tiltX, tiltY });
      if (text.data !== next) text.data = next;
    };

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      if (lastTick && now - lastTick < FRAME_MS) return;
      const elapsed = lastTick ? Math.min(now - lastTick, 100) / 1000 : 0;
      lastTick = now;
      time += elapsed * speed;
      tiltX += (targetX - tiltX) * TILT_EASING;
      tiltY += (targetY - tiltY) * TILT_EASING;
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

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    observer.observe(pre);

    const onVisibilityChange = () => (document.hidden ? stop() : start());
    const onMotionPreferenceChange = () => {
      if (reducedMotion.matches) {
        stop();
        time = tiltX = tiltY = 0;
        draw();
      } else {
        start();
      }
    };
    const onPointerMove = (event: PointerEvent) => {
      const rect = pre.getBoundingClientRect();
      targetX = clamp((event.clientX - (rect.left + rect.width / 2)) / (innerWidth / 2));
      targetY = clamp((event.clientY - (rect.top + rect.height / 2)) / (innerHeight / 2));
    };

    const trackPointer = mouseTilt && matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (trackPointer) addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    reducedMotion.addEventListener("change", onMotionPreferenceChange);
    start();

    return () => {
      stop();
      observer.disconnect();
      if (trackPointer) removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reducedMotion.removeEventListener("change", onMotionPreferenceChange);
    };
  }, [speed, stars, mouseTilt]);

  return (
    <div className="@container absolute inset-0 grid place-items-center">
      <pre
        ref={preRef}
        aria-hidden
        suppressHydrationWarning
        className="m-0 select-none font-mono leading-none text-fg [font-variant-ligatures:none]"
        style={{ fontSize: FONT_SIZE }}
      >
        {renderPlanetFrame(0, { stars })}
      </pre>
    </div>
  );
}
