import React from 'react';
import { Badge, Button } from './ui';

function shortDesc(p) {
  const metric = p.highlights?.[0] ? `${p.highlights[0]} • ` : "";
  const base = p.description ?? p.raw ?? "";
  const oneLine = base.replace(/\s+/g, " ").trim();
  const out = `${metric}${oneLine}`;
  return out.length > 140 ? out.slice(0, 137) + "…" : out;
}

const ProjectCard = ({ project, className = "" }) => {
  return (
    <div className={`bg-card border border-border rounded-2xl shadow-lg overflow-hidden group hover:shadow-hover transition-shadow duration-300 ${className}`}>
      {/* Cover Image */}
      {project.image && (
        <div className="h-40 sm:h-48 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-4 sm:p-6">
        {/* Title & Subtitle */}
        <div className="mb-3">
          <h3 className="text-xl font-semibold text-card-foreground mb-1 line-clamp-1">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="text-sm text-muted-foreground line-clamp-1">
              {project.subtitle}
            </p>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-card-foreground/80 mb-4 line-clamp-3">
          {shortDesc(project)}
        </p>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                size="sm"
                className="text-xs"
              >
                {tag}
              </Badge>
            ))}
            {project.tags.length > 3 && (
              <Badge variant="secondary" size="sm" className="text-xs">
                +{project.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3">
          {project.liveUrl && (
            <Button asChild className="w-full sm:w-auto">
              <a href={project.liveUrl} target="_blank" rel="noreferrer noopener">Live Demo</a>
            </Button>
          )}
          {project.sourceUrl && (
            <Button asChild variant="secondary" className="w-full sm:w-auto">
              <a href={project.sourceUrl} target="_blank" rel="noreferrer noopener">Code</a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;