import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, VT323 } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { getContent } from "@/lib/content";
import { buildRootMetadata, rootViewport } from "@/lib/metadata";
import { getVisibleSections } from "@/lib/sections";
import { initialThemeAttribute, themeScript } from "@/lib/theme";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin", "latin-ext"], variable: "--font-jetbrains-mono" });
const vt323 = VT323({ weight: "400", subsets: ["latin", "latin-ext"], variable: "--font-vt323" });

const content = getContent();
const { site } = content;

export const metadata: Metadata = buildRootMetadata(site);
export const viewport: Viewport = rootViewport;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={site.lang ?? "en"}
      data-theme={initialThemeAttribute(site.theme.default)}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${jetbrainsMono.variable} ${vt323.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript(site.theme.default) }} />
      </head>
      <body className="min-h-screen overflow-x-clip">
        <Navbar
          nav={content.nav}
          visibleSections={getVisibleSections(content)}
          themePreference={site.theme.default}
        />
        {children}
      </body>
    </html>
  );
}
