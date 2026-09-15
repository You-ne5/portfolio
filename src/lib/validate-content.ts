import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { Content } from "@/content/types";
import { PROJECTS_MD_DIR, extractMdImages, projectMarkdownPath, resolveMdAsset } from "@/lib/projects";
import { getSimpleIcon } from "@/lib/simple-icons";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const LOCAL_FILE = /^\/(?!\/)[^?#]*\.[a-z0-9]+(?:[?#].*)?$/i;
const HEX = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function publicFileExists(publicPath: string): boolean {
  return fs.existsSync(path.join(PUBLIC_DIR, decodeURI(publicPath.split(/[?#]/)[0])));
}

function describe(item: unknown, index: number): string {
  if (item && typeof item === "object") {
    const v = item as Record<string, unknown>;
    const label = v.name ?? v.title ?? v.label ?? v.company;
    if (typeof label === "string") return `[${index}] "${label}"`;
  }
  return `[${index}]`;
}

type Visitor = (key: string, value: unknown, at: string) => void;

function walk(value: unknown, at: string, visit: Visitor): void {
  if (Array.isArray(value)) {
    value.forEach((item, i) => walk(item, `${at}${describe(item, i)}`, visit));
    return;
  }
  // Skip React components (lucide icons) — they are objects with $$typeof.
  if (value && typeof value === "object" && !("$$typeof" in value)) {
    for (const [key, child] of Object.entries(value)) {
      visit(key, child, `${at}.${key}`);
      walk(child, `${at}.${key}`, visit);
    }
  }
}

export function validateContent(content: Content): void {
  const errors: string[] = [];
  const warnings: string[] = [];

  try {
    new URL(content.site.url);
  } catch {
    errors.push(`site.url: "${content.site.url}" is not a valid URL`);
  }
  if (!content.site.meta.title.trim()) errors.push("site.meta.title is empty");
  if (!content.site.meta.description.trim()) errors.push("site.meta.description is empty");

  for (const section of Object.keys(content) as (keyof Content)[]) {
    walk(content[section], section, (key, value, at) => {
      if (typeof value !== "string") return;
      if (key === "icon" && !value.startsWith("/") && !getSimpleIcon(value)) {
        errors.push(
          `${at}: unknown Simple Icons slug "${value}". Find the slug on https://simpleicons.org, use a custom SVG ("/icons/${value}.svg"), a lucide icon, or remove "icon" to show a letter tile.`,
        );
      }
      if (key === "color" && !HEX.test(value)) {
        errors.push(`${at}: "${value}" is not a hex color like "#E63946"`);
      }
      if (LOCAL_FILE.test(value) && !publicFileExists(value)) {
        errors.push(`${at}: file "${value}" not found (expected public${value.split(/[?#]/)[0]})`);
      }
    });
  }

  const seen = new Set<string>();
  content.projects.items.forEach((project, i) => {
    if (project.details === undefined) return;
    const at = `projects.items[${i}] "${project.title}".details`;
    const slug = project.details;
    if (!SLUG.test(slug)) {
      errors.push(`${at}: "${slug}" must be lowercase kebab-case, e.g. "my-project"`);
      return;
    }
    if (seen.has(slug)) errors.push(`${at}: "${slug}" is used by more than one project`);
    seen.add(slug);

    const mdPath = projectMarkdownPath(slug);
    if (!fs.existsSync(mdPath)) {
      errors.push(`${at}: markdown file src/content/projects/${slug}.md does not exist`);
      return;
    }
    for (const src of extractMdImages(fs.readFileSync(mdPath, "utf8"))) {
      const url = resolveMdAsset(slug, src);
      if (url.startsWith("/") && !url.startsWith("//") && !publicFileExists(url)) {
        errors.push(`src/content/projects/${slug}.md: image "${src}" not found (expected public${url})`);
      }
    }
  });

  if (fs.existsSync(PROJECTS_MD_DIR)) {
    for (const file of fs.readdirSync(PROJECTS_MD_DIR)) {
      if (file.endsWith(".md") && !seen.has(file.slice(0, -3))) {
        warnings.push(`src/content/projects/${file} is not used by any project's "details"`);
      }
    }
  }
  const speed = content.hero.illustration?.speed;
  if (speed !== undefined && !(speed > 0 && speed <= 10)) {
    errors.push(`hero.illustration.speed: ${speed} must be between 0 (exclusive) and 10`);
  }

  const rainSpeed = content.quote.rainSpeed;
  if (rainSpeed !== undefined && !(rainSpeed > 0 && rainSpeed <= 10)) {
    errors.push(`quote.rainSpeed: ${rainSpeed} must be between 0 (exclusive) and 10`);
  }

  for (const section of ["about", "skills", "experience", "projects", "languages", "contact"] as const) {
    const patternSpeed = content[section].background?.speed;
    if (patternSpeed !== undefined && !(patternSpeed > 0 && patternSpeed <= 10)) {
      errors.push(`${section}.background.speed: ${patternSpeed} must be between 0 (exclusive) and 10`);
    }
  }

  if (content.hero.stats.length > 4) {
    warnings.push("hero.stats has more than 4 items; they may not fit on small screens");
  }

  for (const warning of warnings) console.warn(`[content] ${warning}`);
  if (errors.length > 0) {
    throw new Error(`Content validation failed:\n${errors.map((e) => `  - ${e}`).join("\n")}`);
  }
}
