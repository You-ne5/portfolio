import "server-only";
import * as allIcons from "simple-icons";
import type { SimpleIcon } from "simple-icons";

const table = allIcons as unknown as Record<string, SimpleIcon | undefined>;

// Mirrors simple-icons/sdk slugToVariableName: "gnubash" → "siGnubash"
export function getSimpleIcon(slug: string): SimpleIcon | undefined {
  return table[`si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`];
}
