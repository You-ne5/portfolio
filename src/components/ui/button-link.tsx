import type { ReactNode } from "react";

const VARIANTS = {
  primary:
    "bg-accent text-on-accent hover:bg-accent-hover shadow-[0_0_24px_rgba(230,57,70,0.35)] hover:shadow-[0_0_32px_rgba(230,57,70,0.55)]",
  outline: "border border-accent text-fg hover:bg-accent/10",
};

export function ButtonLink({
  href,
  variant,
  download,
  children,
}: {
  href: string;
  variant: keyof typeof VARIANTS;
  download?: boolean;
  children: ReactNode;
}) {
  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      download={download || undefined}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`inline-flex items-center justify-center gap-2 rounded-card px-6 py-3 text-sm font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${VARIANTS[variant]}`}
    >
      {children}
    </a>
  );
}
