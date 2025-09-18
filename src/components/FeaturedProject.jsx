import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { Badge, Button } from './ui';

function shortDesc(p) {
  const metric = p.highlights?.[0] ? `${p.highlights[0]} • ` : "";
  const base = p.description ?? p.raw ?? "";
  const oneLine = base.replace(/\s+/g, " ").trim();
  const out = `${metric}${oneLine}`;
  return out.length > 140 ? out.slice(0, 137) + "…" : out;
}

const FeaturedProject = ({ project, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Background Glow */}
      <div
        className="absolute inset-0 opacity-20 rounded-3xl"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(var(--accent) / 0.2) 0%, hsl(var(--primary) / 0.1) 40%, transparent 70%)',
          filter: 'blur(60px)',
          transform: 'scale(1.1)'
        }}
      />

      {/* Hero Card */}
      <div className="relative bg-card border border-border rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 p-6 md:p-12">
          {/* Left: Content */}
          <div className="flex flex-col justify-center space-y-4 md:space-y-6">
            {/* Title & Subtitle */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-2">
                {project.title}
              </h2>
              {project.subtitle && (
                <p className="text-lg text-muted-foreground">
                  {project.subtitle}
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-card-foreground/90 text-base md:text-lg leading-relaxed line-clamp-3">
              {shortDesc(project)}
            </p>

            {/* Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.highlights.slice(0, 3).map((highlight) => (
                  <Badge
                    key={highlight}
                    variant="primary"
                    size="sm"
                    className="text-xs font-medium"
                  >
                    {highlight}
                  </Badge>
                ))}
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-3">
              {project.liveUrl && (
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <a href={project.liveUrl} target="_blank" rel="noreferrer noopener" aria-label={`${project.title} live demo`}>
                    <span className="mr-1">Live Demo</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {project.sourceUrl && (
                <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto">
                  <a href={project.sourceUrl} target="_blank" rel="noreferrer noopener">
                    <span className="mr-1">Code</span>
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Right: Image */}
          <div className="flex items-center justify-center order-first md:order-last">
            {project.image && (
              <div className="relative w-full max-w-sm md:max-w-md">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="eager"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProject;