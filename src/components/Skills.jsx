import React from "react";
import Section from "./Section";
import SectionHeader from "./ui/SectionHeader";
import SkillsMatrix from "./SkillsMatrix";

export default function Skills() {
  return (
    <Section id="skills" className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Toolbox"
          title="Skills & Expertise"
          description="Interactive showcase of technologies and tools I work with, with proficiency levels and recent project links."
          center
        />
        
        <div className="mt-12">
          <SkillsMatrix />
        </div>
      </div>
    </Section>
  );
}
