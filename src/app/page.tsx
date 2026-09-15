import type { ReactNode } from "react";
import { AboutSection } from "@/components/sections/about";
import { ContactSection } from "@/components/sections/contact";
import { ExperienceSection } from "@/components/sections/experience";
import { HeroSection } from "@/components/sections/hero";
import { LanguagesSection } from "@/components/sections/languages";
import { ProjectsSection } from "@/components/sections/projects";
import { QuoteSection } from "@/components/sections/quote";
import { SkillsSection } from "@/components/sections/skills";
import { Footer } from "@/components/ui/footer";
import type { Tone } from "@/components/ui/section";
import type { SectionKey } from "@/content/types";
import { getContent } from "@/lib/content";
import { getVisibleSections, isLinkVisible } from "@/lib/sections";

// These sections share the background of the section above instead of starting a new alternating band.
const SHARES_PREVIOUS_TONE: SectionKey[] = ["quote"];

export default function Home() {
  const content = getContent();
  const { site, hero } = content;
  const visible = getVisibleSections(content);

  let band = -1;
  const sections = visible.map((key) => {
    if (band < 0 || !SHARES_PREVIOUS_TONE.includes(key)) band++;
    const tone: Tone = band % 2 === 0 ? "base" : "alt";
    return { key, tone };
  });

  const showPrimaryCta = !hero.primaryCta || isLinkVisible(hero.primaryCta.href, visible);

  const renderSection = (key: SectionKey, tone: Tone): ReactNode => {
    switch (key) {
      case "hero":
        return <HeroSection key={key} hero={hero} tone={tone} showPrimaryCta={showPrimaryCta} />;
      case "quote":
        return <QuoteSection key={key} quote={content.quote} tone={tone} />;
      case "about":
        return <AboutSection key={key} about={content.about} tone={tone} />;
      case "skills":
        return <SkillsSection key={key} skills={content.skills} tone={tone} />;
      case "experience":
        return <ExperienceSection key={key} experience={content.experience} tone={tone} />;
      case "projects":
        return <ProjectsSection key={key} projects={content.projects} tone={tone} />;
      case "languages":
        return <LanguagesSection key={key} languages={content.languages} tone={tone} />;
      case "contact":
        return <ContactSection key={key} contact={content.contact} tone={tone} />;
    }
  };

  return (
    <>
      <main>{sections.map(({ key, tone }) => renderSection(key, tone))}</main>
      <Footer site={site} tone={sections.at(-1)?.tone ?? "base"} />
    </>
  );
}
