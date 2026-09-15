import type { ReactNode } from "react";

export function Badge({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-block rounded-[5px] border px-2.5 py-0.5 font-mono text-xs ${className || "border-accent/20 bg-accent/10 text-accent"}`}
    >
      {children}
    </span>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-[4px] border border-line bg-canvas px-2 py-0.5 font-mono text-[11px] text-fg">
      {children}
    </span>
  );
}
