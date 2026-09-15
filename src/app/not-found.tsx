import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center px-5">
      <div className="flex flex-col items-center text-center">
        <span className="font-display text-8xl leading-none text-accent">404</span>
        <h1 className="mt-2 font-display text-4xl leading-none sm:text-5xl">Page not found</h1>
        <p className="mt-3 text-muted">This page doesn&apos;t exist or was moved.</p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-card border border-accent px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent/10"
        >
          <ArrowLeft aria-hidden className="size-4" />
          Back home
        </Link>
      </div>
    </main>
  );
}
