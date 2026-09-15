import type { CSSProperties } from "react";
import type { IconSource } from "@/content/types";
import { pickIconColors } from "@/lib/color";
import { getSimpleIcon } from "@/lib/simple-icons";

export function BrandIcon({
  icon,
  name,
  color,
  mono = false,
  className = "size-5",
}: {
  icon?: IconSource;
  name: string;
  color?: string;
  /** Always use the surrounding text color instead of the brand color */
  mono?: boolean;
  className?: string;
}) {
  if (icon !== undefined && typeof icon !== "string") {
    const Icon = icon;
    return <Icon aria-hidden className={`shrink-0 ${className}`} style={color ? { color } : undefined} />;
  }

  if (icon?.startsWith("/")) {
    const mask = `url("${icon}") center / contain no-repeat`;
    return (
      <span
        aria-hidden
        className={`inline-block shrink-0 ${color ? "" : "bg-current"} ${className}`}
        style={{ mask, WebkitMask: mask, backgroundColor: color }}
      />
    );
  }

  const simpleIcon = icon ? getSimpleIcon(icon) : undefined;
  if (simpleIcon) {
    const colors = mono
      ? { light: "currentColor", dark: "currentColor" }
      : color
        ? { light: color, dark: color }
        : pickIconColors(`#${simpleIcon.hex}`);
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className={`shrink-0 text-(color:--icon-light) dark:text-(color:--icon-dark) ${className}`}
        style={{ "--icon-light": colors.light, "--icon-dark": colors.dark } as CSSProperties}
      >
        <path fill="currentColor" d={simpleIcon.path} />
      </svg>
    );
  }

  return (
    <span
      aria-hidden
      className={`grid shrink-0 place-items-center rounded-[3px] bg-accent/15 font-mono text-[10px] font-bold text-accent ${className}`}
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}
