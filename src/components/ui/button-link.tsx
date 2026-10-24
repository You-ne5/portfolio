import type { ReactNode } from "react";

const VARIANTS = {
  primary:
    "bg-accent text-on-accent hover:bg-accent-hover shadow-[0_0_24px_rgba(230,57,70,0.35)] hover:shadow-[0_0_32px_rgba(230,57,70,0.55)]",
  outline: "border border-accent text-fg hover:bg-accent/10",
};

const SIZES = {
  md: "px-6 py-3 text-sm",
  sm: "px-3.5 py-2 text-xs",
};

export function ButtonLink({
  href,
  variant,
  size = "md",
  download,
  newTab,
  ariaLabel,
  children,
}: {
  href: string;
  variant: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
  download?: boolean;
  /** Open in a new tab even for local files; external links always do. */
  newTab?: boolean;
  ariaLabel?: string;
  children: ReactNode;
}) {
  const external = newTab || /^https?:/.test(href);
  return (
    <a
      href={href}
      download={download || undefined}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center gap-2 rounded-card font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${SIZES[size]} ${VARIANTS[variant]}`}
    >
      {children}
    </a>
  );
}
