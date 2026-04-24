import React, { useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "./Section";
import SectionHeader from "./ui/SectionHeader";
import { Badge, Button } from "./ui";
import DossierCard from "./DossierCard";
import { projects } from "../data/projects";
import useSkillsFilterStore from "../store/useSkillsFilter";

function Work() {
  const { selectedSkills, clearSelectedSkills } = useSkillsFilterStore();

  // Memoize the clear function to prevent unnecessary re-renders
  const handleClearFilters = useCallback(() => {
    clearSelectedSkills();
  }, [clearSelectedSkills]);

  // Use the projects array directly
  const allProjects = useMemo(() => projects, []);

  // Filter projects based on selected skills from global filter
  const filteredProjects = useMemo(() => {
    if (selectedSkills.length === 0) return allProjects;

    return allProjects.filter(project => {
      const projectTags = (project.tags || []).map(tag => tag.toLowerCase());
      return selectedSkills.some(skillId => {
        // Map skill IDs to project tags
        const skillTagMap = {
          'react': 'react',
          'tailwind': 'tailwind',
          'node': 'node',
          'python': 'python',
          'openai': 'ai',
          'mongodb': 'mongodb',
          'langchain': 'langchain',
          'oci': 'oci',
          'framer': 'framer motion',
          'tensorflow': 'tensorflow',
          'pytorch': 'pytorch'
        };

        const mappedTag = skillTagMap[skillId] || skillId;
        return projectTags.some(tag => tag.includes(mappedTag.toLowerCase()));
      });
    });
  }, [allProjects, selectedSkills]);

  // Sort projects to show AI/featured work first
  const sortedProjects = useMemo(() => {
    return [...filteredProjects].sort((a, b) => {
      // Prioritize AI projects
      const aHasAI = (a.tags || []).some(tag => tag.toLowerCase().includes('ai'));
      const bHasAI = (b.tags || []).some(tag => tag.toLowerCase().includes('ai'));
      if (aHasAI && !bHasAI) return -1;
      if (!aHasAI && bHasAI) return 1;

      // Then prioritize projects with live links
      const aHasLive = Boolean(a.liveUrl);
      const bHasLive = Boolean(b.liveUrl);
      if (aHasLive && !bHasLive) return -1;
      if (!aHasLive && bHasLive) return 1;

      return 0;
    });
  }, [filteredProjects]);

  return (
    <Section id="work" className="border-t border-border/60">
      <div className="px-4 md:px-8 mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-10 md:mb-12">
          <SectionHeader
            entryId="work"
            eyebrow="Selected Work"
            title="Projects & Applications"
            description="Selected work across AI, full-stack, and dashboards."
            center
          />
        </header>

        {/* Global Skills Filter Display */}
        <AnimatePresence>
          {selectedSkills.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-wrap items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-accent/5 border border-accent/20 rounded-lg mb-6 sm:mb-8"
            >
              <span className="text-sm text-muted font-medium">
                Filtered by skills:
              </span>
              {selectedSkills.map((skillId) => (
                <Badge
                  key={skillId}
                  variant="primary"
                  size="sm"
                  className="cursor-pointer hover:bg-accent/80"
                  onClick={() => useSkillsFilterStore.getState().toggleSkill(skillId)}
                >
                  {skillId} ×
                </Badge>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="ml-auto"
              >
                Clear filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dossier grid — all projects rendered as unified DossierCards */}
        {sortedProjects.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sortedProjects.map((project) => (
              <DossierCard key={project.id} project={project} />
            ))}
          </div>
        )}

        {/* No results message */}
        {selectedSkills.length > 0 && sortedProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 flex flex-col items-center text-center py-12"
          >
            <p className="text-muted mb-4">No projects match the selected skills.</p>
            <Button
              variant="ghost"
              onClick={handleClearFilters}
            >
              Show all projects
            </Button>
          </motion.div>
        )}

        {/* Accessibility project count */}
        <p className="sr-only">{allProjects.length} projects listed</p>

        {/* Ask AI Abdarrahman CTA */}
        <div className="mt-16 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted max-w-xl mx-auto">
            Confused by the stack?{' '}
            <a href="#chat" className="nb-link text-text">
              Ask AI Abdarrahman <span className="nb-arrow">↗</span>
            </a>
            {' '}to explain how I built these.
          </p>
        </div>
      </div>
    </Section>
  );
}

export default React.memo(Work);