"use client";

import { Moon, Sun } from "lucide-react";
import { useLayoutEffect } from "react";
import type { ThemeName, ThemePreference } from "@/content/types";
import { THEME_STORAGE_KEY } from "@/lib/theme";

function applyTheme(theme: ThemeName) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
}

function resolveTheme(preference: ThemePreference): ThemeName {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {}
  if (preference === "system") {
    return matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }
  return preference;
}

export function ThemeToggle({ preference }: { preference: ThemePreference }) {
  // React can reset <html data-theme> during hydration/Strict Mode remounts; re-apply the resolved theme.
  useLayoutEffect(() => {
    applyTheme(resolveTheme(preference));
  }, [preference]);

  function toggle() {
    const next: ThemeName = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      title="Toggle theme"
      className="grid size-9 shrink-0 place-items-center rounded-full border border-line bg-surface/80 text-fg transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <Sun aria-hidden className="size-4 dark:hidden" />
      <Moon aria-hidden className="hidden size-4 dark:block" />
    </button>
  );
}
