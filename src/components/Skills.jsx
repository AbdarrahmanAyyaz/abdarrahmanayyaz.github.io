import React from "react";
import Section from "./Section";
import SectionHeader from "./ui/SectionHeader";
import SkillsMatrix from "./SkillsMatrix";

export default function Skills() {
  return (
    <Section id="skills" className="bg-[hsl(210,30%,92%)] dark:bg-[hsl(222,47%,15%)] border-y border-border/60">
      <SectionHeader
        eyebrow="Toolbox"
        title="Skills & Expertise"
        description="Interactive showcase of technologies and tools I work with, with proficiency levels and recent project links."
        center
      />
      
      <div className="mt-12">
        <SkillsMatrix />
      </div>
    </Section>
  );
}
