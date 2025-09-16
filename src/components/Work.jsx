import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "./Section";
import ProjectCard from "./ProjectCard";
import SectionHeader from "./ui/SectionHeader";
import { Badge, Button } from "./ui";
import projects from "../data/data";
import useSkillsFilterStore from "../store/useSkillsFilter";

export default function Work() {
  const { selectedSkills, clearSelectedSkills } = useSkillsFilterStore();
  
  // Defensive: support either default array or {project}/{data}
  const allProjects = useMemo(() => Array.isArray(projects)
    ? projects
    : projects?.project || projects?.data || [], []);

  // Filter projects based on selected skills
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
      const aHasLive = Boolean(a.live);
      const bHasLive = Boolean(b.live);
      if (aHasLive && !bHasLive) return -1;
      if (!aHasLive && bHasLive) return 1;
      
      return 0;
    });
  }, [filteredProjects]);

  return (
    <Section id="work">
      <SectionHeader
        eyebrow="Selected Work"
        title="Projects & Applications"
        description="A showcase of AI-powered applications, full-stack projects, and technical implementations I've built."
        center
      />

      {/* Skills Filter Display */}
      <AnimatePresence>
        {selectedSkills.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-8 flex flex-wrap items-center gap-3 p-4 bg-accent/5 border border-accent/20 rounded-lg"
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
              onClick={clearSelectedSkills}
              className="ml-auto"
            >
              Clear filters
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Projects Grid */}
      <motion.div 
        className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        layout
      >
        <AnimatePresence mode="popLayout">
          {sortedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ProjectCard
                title={project.name}
                img={project.image}
                summary={project.summary || ""}
                tags={project.tags || []}
                live={project.live}
                code={project.github}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

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
            onClick={clearSelectedSkills}
          >
            Show all projects
          </Button>
        </motion.div>
      )}

      {/* Stats */}
      <div className="mt-8 flex justify-center">
        <p className="text-sm text-muted">
          {selectedSkills.length > 0 
            ? `Showing ${sortedProjects.length} of ${allProjects.length} projects`
            : `${allProjects.length} projects total`
          }
        </p>
      </div>
    </Section>
  );
}
