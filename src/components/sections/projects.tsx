import type { ProjectsContent } from "@/content/types";
import { Container } from "@/components/ui/container";
import { Section, type Tone } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "./project-card";

export function ProjectsSection({ projects, tone }: { projects: ProjectsContent; tone: Tone }) {
  return (
    <Section id="projects" tone={tone}>
      <Container className="py-20 sm:py-28">
        <SectionHeading heading={projects.heading} className="mb-12 sm:mb-16" />
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {projects.items.map((project) => (
            <li key={project.title}>
              <ProjectCard project={project} linkToDetails />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
