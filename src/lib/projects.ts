import "server-only";
import fs from "node:fs";
import path from "node:path";
import { content } from "@/content";
import type { Project } from "@/content/types";

export type DetailProject = Project & { details: string };

export const PROJECTS_MD_DIR = path.join(process.cwd(), "src/content/projects");

export function getDetailProjects(): DetailProject[] {
  if (!content.site.sections.projects) return [];
  return content.projects.items.filter((p): p is DetailProject => Boolean(p.details));
}

export function getProjectBySlug(slug: string): DetailProject | undefined {
  return getDetailProjects().find((p) => p.details === slug);
}

export function projectMarkdownPath(slug: string): string {
  return path.join(PROJECTS_MD_DIR, `${slug}.md`);
}

export function readProjectMarkdown(slug: string): string {
  return fs.readFileSync(projectMarkdownPath(slug), "utf8");
}

/** "home.png" → "/projects/<slug>/home.png"; absolute paths and URLs are left untouched. */
export function resolveMdAsset(slug: string, src: string): string {
  if (/^([a-z]+:|\/)/i.test(src)) return src;
  return `/projects/${slug}/${src.replace(/^\.\//, "")}`;
}

export function extractMdImages(markdown: string): string[] {
  const withoutComments = markdown.replace(/<!--[\s\S]*?-->/g, "");
  return [...withoutComments.matchAll(/!\[[^\]]*\]\(\s*<?([^)\s>]+)/g)].map((m) => m[1]);
}
