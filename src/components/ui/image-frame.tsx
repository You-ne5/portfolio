import { Image as ImageGlyph } from "lucide-react";
import Image from "next/image";
import type { ImageRef } from "@/content/types";

/** Fills its (relative, sized) parent with the image, or with a placeholder telling you where to add one. */
export function ImageFrame({
  image,
  hint,
  sizes,
  eager = false,
  imgClassName = "",
}: {
  image?: ImageRef;
  hint: string;
  sizes: string;
  eager?: boolean;
  imgClassName?: string;
}) {
  if (image) {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        unoptimized={image.src.startsWith("http")}
        className={`object-cover ${imgClassName}`}
      />
    );
  }

  return (
    <div className="absolute inset-0 grid place-items-center bg-surface bg-[linear-gradient(to_right,var(--line)_1px,transparent_1px),linear-gradient(to_bottom,var(--line)_1px,transparent_1px)] bg-size-[24px_24px]">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--accent)_22%,transparent),transparent_65%)]"
      />
      <div className="relative flex flex-col items-center gap-2 px-4 text-center">
        <ImageGlyph aria-hidden className="size-7 text-accent" />
        <span className="font-mono text-[10px] text-muted sm:text-xs">{hint}</span>
      </div>
    </div>
  );
}
