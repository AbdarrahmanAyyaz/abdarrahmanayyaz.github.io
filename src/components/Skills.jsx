import React from "react";
import Section from "./Section";
import SectionHeader from "./ui/SectionHeader";
import SkillsMatrix from "./SkillsMatrix";

export default function Skills() {
  return (
    <Section id="skills" className="border-y border-border/60">
      <SectionHeader
        entryId="skills"
        eyebrow="Toolbox"
        title="Skills & Expertise"
        description="Tools I work with — ranked by recency and fluency."
        center
      />
      
      <div className="mt-12">
        <SkillsMatrix />
      </div>
    </Section>
  );
}
