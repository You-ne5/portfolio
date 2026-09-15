import type { Metadata, Viewport } from "next";
import type { SiteConfig } from "@/content/types";
import { THEME_COLOR } from "@/lib/theme";

export function buildRootMetadata(site: SiteConfig): Metadata {
  const { meta } = site;
  const images = meta.ogImage ? [meta.ogImage] : undefined;
  return {
    metadataBase: new URL(site.url),
    title: { default: meta.title, template: meta.titleTemplate ?? `%s | ${site.name}` },
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: site.name, url: site.url }],
    icons: { icon: meta.favicon ?? "/favicon.ico" },
    openGraph: {
      type: "website",
      url: "/",
      siteName: site.name,
      title: meta.title,
      description: meta.description,
      images,
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title: meta.title,
      description: meta.description,
      images,
    },
  };
}

export const rootViewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: THEME_COLOR.dark },
    { media: "(prefers-color-scheme: light)", color: THEME_COLOR.light },
  ],
};
