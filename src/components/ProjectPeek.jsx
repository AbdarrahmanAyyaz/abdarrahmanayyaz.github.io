import React from "react";
import { motion } from "framer-motion";
import { HiExternalLink, HiCode } from "react-icons/hi";
import { Badge } from "./ui";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * i, duration: 0.4, ease: 'easeOut' }
  }),
};

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      className="group relative bg-surface border border-border rounded-xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-normal ease-out hover:-translate-y-0.5 h-full"
      variants={fadeInUp}
      custom={index}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="aspect-card relative overflow-hidden bg-muted/10">
        <img
          src={project.image}
          alt={`${project.name} thumbnail`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-text text-sm sm:text-base leading-tight line-clamp-2 flex-1">
            {project.name}
          </h3>
          <div className="flex items-center gap-1.5 shrink-0">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-accent/10 text-accent hover:bg-accent hover:text-white transition-colors duration-200 touch-manipulation"
                aria-label={`View ${project.name} live demo`}
              >
                <HiExternalLink size={14} className="sm:w-4 sm:h-4" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-muted/10 text-muted hover:bg-text hover:text-bg transition-colors duration-200 touch-manipulation"
                aria-label={`View ${project.name} source code`}
              >
                <HiCode size={14} className="sm:w-4 sm:h-4" />
              </a>
            )}
          </div>
        </div>
        
        <p className="text-xs sm:text-sm text-muted mb-3 line-clamp-2 leading-relaxed">
          {project.summary}
        </p>
        
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1 flex-1">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" size="sm" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          {project.metric && (
            <span className="text-xs sm:text-sm font-medium text-accent whitespace-nowrap">
              {project.metric}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectPeek = ({ projects = [] }) => {
  // Specifically get the requested 3 projects: Advancely, TriagedAI, Multi-Class Tumor Segmentation
  const featuredProjects = [
    projects.find(p => p.name === 'Advancely'),
    projects.find(p => p.name === 'TriagedAI'), 
    projects.find(p => p.name === 'Multi-Class Tumor Segmentation')
  ]
    .filter(Boolean) // Remove any undefined projects
    .map((project, index) => ({
      ...project,
      // Add specific metrics for each project
      metric: project.name === 'Advancely' ? "Live AI app" :
              project.name === 'TriagedAI' ? "↓25% MTTR" :
              project.name === 'Multi-Class Tumor Segmentation' ? "ML research" : null
    }));

  return (
    <section className="w-full" aria-label="Featured projects preview">
      {/* Desktop Grid */}
      <motion.div
        className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {featuredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </motion.div>

      {/* Mobile Horizontal Snap Carousel */}
      <motion.div
        className="sm:hidden -mx-4 px-4 overflow-x-auto scrollbar-hide carousel-snap"
        initial="hidden"
        animate="show"
        variants={fadeInUp}
      >
        <div 
          className="flex gap-4 pb-4" 
          style={{ 
            width: 'max-content',
            paddingRight: '1rem'
          }}
        >
          {featuredProjects.map((project, index) => (
            <div 
              key={project.id} 
              className="w-[85vw] max-w-sm shrink-0"
            >
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectPeek;