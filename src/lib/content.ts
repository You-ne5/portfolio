import "server-only";
import { content } from "@/content";
import type { Content } from "@/content/types";
import { validateContent } from "@/lib/validate-content";

let validated = false;

export function getContent(): Content {
  if (!validated) {
    validateContent(content);
    validated = true;
  }
  return content;
}
