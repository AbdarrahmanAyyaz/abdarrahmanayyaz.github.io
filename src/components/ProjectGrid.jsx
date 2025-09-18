import React, { useState, useMemo } from 'react';
import ProjectCard from './ProjectCard';

const FILTER_TAGS = ['All', 'AI', 'Full-Stack', 'ML Research'];

const ProjectGrid = ({
  projects,
  title = "",
  compact = false,
  showFilters = true,
  className = ""
}) => {
  const [activeFilter, setActiveFilter] = useState('All');

  // Filter projects based on active filter
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;

    const filterKey = activeFilter.toLowerCase();
    return projects.filter(project => {
      const projectTags = (project.tags || []).map(tag => tag.toLowerCase());

      // Handle special cases
      if (activeFilter === 'Full-Stack') {
        return projectTags.some(tag =>
          tag.includes('react') ||
          tag.includes('node') ||
          tag.includes('mern') ||
          tag.includes('full')
        );
      }

      if (activeFilter === 'ML Research') {
        return projectTags.some(tag =>
          tag.includes('ml') ||
          tag.includes('pytorch') ||
          tag.includes('tensorflow') ||
          tag.includes('cnn') ||
          tag.includes('u-net') ||
          tag.includes('segmentation') ||
          tag.includes('bioinformatics') ||
          tag.includes('medical ai')
        );
      }

      return projectTags.some(tag => tag.includes(filterKey));
    });
  }, [projects, activeFilter]);

  return (
    <div className={className}>
      {/* Title */}
      {title && (
        <h2 className="text-2xl font-bold text-card-foreground mb-6">
          {title}
        </h2>
      )}

      {/* Filters */}
      {showFilters && (
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-wrap gap-2">
            {FILTER_TAGS.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-3 sm:px-4 py-2 rounded-full border text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[44px] touch-manipulation ${
                  activeFilter === tag
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                    : 'bg-background border-border hover:bg-muted hover:border-muted-foreground/50 text-muted-foreground hover:text-foreground'
                }`}
                aria-pressed={activeFilter === tag}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <p className="text-sm text-muted-foreground mt-3">
            {activeFilter === 'All'
              ? `${projects.length} projects total`
              : `${filteredProjects.length} of ${projects.length} projects`
            }
          </p>
        </div>
      )}

      {/* Grid */}
      {filteredProjects.length > 0 ? (
        <div className={`grid gap-6 ${
          compact
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }`}>
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              className="h-full"
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            No projects match the selected filter.
          </p>
          <button
            onClick={() => setActiveFilter('All')}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Show All Projects
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectGrid;