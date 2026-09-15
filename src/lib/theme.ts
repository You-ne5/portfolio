import type { ThemeName, ThemePreference } from "@/content/types";

export const THEME_STORAGE_KEY = "theme";

// Must match --surface in src/app/globals.css; used to decide whether brand icon colors are readable.
export const CHIP_SURFACE: Record<ThemeName, string> = {
  light: "#FFFFFF",
  dark: "#16161A",
};

export const THEME_COLOR: Record<ThemeName, string> = {
  light: "#FAFAFA",
  dark: "#0B0B0D",
};

export function initialThemeAttribute(preference: ThemePreference): ThemeName {
  return preference === "light" ? "light" : "dark";
}

export function themeScript(preference: ThemePreference): string {
  return `(function(){try{var d=document.documentElement,t=localStorage.getItem(${JSON.stringify(
    THEME_STORAGE_KEY,
  )});if(t!=="light"&&t!=="dark"){var p=${JSON.stringify(
    preference,
  )};t=p==="system"?(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"):p}d.dataset.theme=t;d.style.colorScheme=t}catch(e){}})()`;
}
