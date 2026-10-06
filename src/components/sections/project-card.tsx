import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Project } from "@/content/types";
import { Badge, Tag } from "@/components/ui/chip";
import { ImageFrame } from "@/components/ui/image-frame";

export function ProjectCard({ project, linkToDetails }: { project: Project; linkToDetails: boolean }) {
  const detailsHref = linkToDetails && project.details ? `/projects/${project.details}` : undefined;
  const cardHref = detailsHref ?? project.link;
  const cardLinkClassName = "card-link outline-none after:absolute after:inset-0 after:content-['']";

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface transition-all duration-300 ${
        cardHref
          ? "hover:border-accent hover:shadow-[0_0_20px_rgba(230,57,70,0.2)] has-[.card-link:focus-visible]:border-accent has-[.card-link:focus-visible]:ring-2 has-[.card-link:focus-visible]:ring-accent"
          : ""
      }`}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-canvas">
        <ImageFrame
          image={project.image}
          hint={`add a 16:9 cover in /public/projects/${project.details ?? "<name>"}/`}
          sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
          imgClassName="transition-transform duration-500 group-hover:scale-105"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-surface via-transparent to-transparent opacity-70"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-start justify-between gap-2">
          <Badge>{project.category}</Badge>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title} in a new tab`}
              className="relative z-10 -m-1.5 grid size-8 shrink-0 place-items-center rounded-card text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
            >
              <ArrowUpRight aria-hidden className="size-[18px]" />
            </a>
          )}
        </div>

        <h3 className="mb-2 font-display text-3xl leading-none">
          {detailsHref ? (
            <Link href={detailsHref} className={cardLinkClassName}>
              {project.title}
            </Link>
          ) : project.link ? (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className={cardLinkClassName}>
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-muted">{project.summary}</p>

        {project.tags.length > 0 && (
          <ul className="mt-auto flex flex-wrap gap-1.5 border-t border-line pt-3">
            {project.tags.map((tag) => (
              <li key={tag}>
                <Tag>{tag}</Tag>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
