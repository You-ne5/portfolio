import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectMarkdown } from "@/components/markdown/markdown";
import { ButtonLink } from "@/components/ui/button-link";
import { Badge, Tag } from "@/components/ui/chip";
import { Footer } from "@/components/ui/footer";
import { ImageFrame } from "@/components/ui/image-frame";
import { getContent } from "@/lib/content";
import { getDetailProjects, getProjectBySlug, readProjectMarkdown } from "@/lib/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return getDetailProjects().map((project) => ({ slug: project.details }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      type: "article",
      title: project.title,
      description: project.summary,
      images: project.image ? [project.image.src] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  const { site } = getContent();

  return (
    <>
      <main className="mx-auto w-full max-w-3xl px-5 pb-20 pt-20 sm:px-6 sm:pt-24">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft aria-hidden className="size-4" />
          Back to projects
        </Link>

        <header className="mt-8">
          <Badge>{project.category}</Badge>
          <h1 className="mt-4 font-display text-5xl leading-none text-balance sm:text-6xl lg:text-7xl">
            {project.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{project.summary}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            {project.tags.length > 0 && (
              <ul className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <li key={tag}>
                    <Tag>{tag}</Tag>
                  </li>
                ))}
              </ul>
            )}
            {project.link && (
              <ButtonLink href={project.link} variant="outline">
                Visit project
                <ArrowUpRight aria-hidden className="size-4" />
              </ButtonLink>
            )}
          </div>
        </header>

        <div className="relative mt-10 aspect-video overflow-hidden rounded-card border border-line bg-surface">
          <ImageFrame
            image={project.image}
            hint={`add a 16:9 cover in /public/projects/${slug}/`}
            sizes="(min-width: 768px) 768px, 100vw"
            eager
          />
        </div>

        <article className="mt-10">
          <ProjectMarkdown source={readProjectMarkdown(slug)} slug={slug} />
        </article>
      </main>
      <Footer site={site} tone="base" />
    </>
  );
}
