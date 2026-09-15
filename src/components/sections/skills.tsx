import type { SkillsContent } from "@/content/types";
import { BrandIcon } from "@/components/ui/brand-icon";
import { Container } from "@/components/ui/container";
import { Section, type Tone } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

export function SkillsSection({ skills, tone }: { skills: SkillsContent; tone: Tone }) {
  return (
    <Section id="skills" tone={tone} background={skills.background}>
      <Container className="py-20 sm:py-28">
        <SectionHeading heading={skills.heading} className="mb-12 sm:mb-16" />

        <div className="flex flex-col">
          {skills.categories.map((category) => (
            <div
              key={category.name}
              className="grid grid-cols-1 items-start gap-4 border-b border-line py-8 first:pt-0 last:border-b-0 last:pb-0 lg:grid-cols-12 lg:gap-6"
            >
              <div className="lg:col-span-3">
                <h3 className="text-sm font-bold uppercase tracking-widest">{category.name}</h3>
                {category.description && <p className="mt-1 text-xs text-muted">{category.description}</p>}
              </div>

              <ul className="flex flex-wrap gap-2.5 sm:gap-3.5 lg:col-span-9">
                {category.items.map((skill) => (
                  <li
                    key={skill.name}
                    className="group flex cursor-default items-center gap-3 rounded-card border border-line bg-surface p-3 transition-all duration-300 hover:border-accent hover:shadow-[0_0_15px_rgba(230,57,70,0.25)] sm:p-3.5"
                  >
                    <BrandIcon
                      icon={skill.icon}
                      name={skill.name}
                      color={skill.color}
                      className="size-5 transition-transform group-hover:scale-110"
                    />
                    <span className="text-sm font-medium">{skill.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
