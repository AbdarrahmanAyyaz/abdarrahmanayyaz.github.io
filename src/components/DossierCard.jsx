import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

/**
 * DossierCard
 *
 * Unified "Technical Dossier" card used in the Work section.
 * Theme-aware (light + dark) via semantic tokens.
 *
 * Expected project fields: title, subtitle, image?, tags?, liveUrl?,
 * impactPills?, challenge?, build?, coverCode?, coverCategory?.
 *
 * When `image` is absent, a designed cover fallback renders using
 * coverCode + coverCategory. Cover is dark-locked for consistent
 * visual rhythm against product screenshots (which carry their own
 * color treatment independent of site theme).
 */
const DesignedCover = ({ code, category }) => (
  <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-shell-raised via-shell to-shell-raised">
    {/* Scan-line texture */}
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent 0, transparent 3px, rgba(233,169,66,0.015) 3px, rgba(233,169,66,0.015) 4px)",
      }}
    />
    {/* Amber center glow */}
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(233,169,66,0.07) 0%, transparent 70%)",
      }}
    />
    {/* Corner accent */}
    <div className="absolute left-4 top-4 h-px w-10 bg-nb-amber" />
    {/* Category tag top-right */}
    {category && (
      <span className="absolute right-4 top-4 font-mono text-[9px] uppercase tracking-mono-label text-ink-muted">
        {category}
      </span>
    )}
    {/* Large mono code, centered */}
    <div className="absolute inset-0 flex items-center justify-center">
      <span
        className="font-mono text-5xl sm:text-6xl font-semibold tracking-[0.06em] text-ink"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {code}
      </span>
    </div>
    {/* Watermark bottom-left */}
    <div className="absolute bottom-4 left-4 flex items-center gap-2">
      <span className="h-1.5 w-1.5 rounded-full bg-nb-amber" />
      <span className="font-mono text-[9px] uppercase tracking-mono-label text-ink-muted">
        cover · dossier
      </span>
    </div>
  </div>
);

const DossierCard = ({ project }) => {
  if (!project) return null;

  const hasImage = Boolean(project.image);
  const hasDesignedCover = !hasImage && Boolean(project.coverCode);

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -2 }}
      // Spring applies specifically to the whileHover transform; the static
      // initial/whileInView transition above handles the scroll-in fade-up.
      // Framer Motion merges `transition` on the motion component, so we use a
      // per-property approach: the tween above covers opacity/y for scroll,
      // and this spring governs the hover lift.
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-soft transition-all duration-200 ease-damped hover:border-accent/40 hover:shadow-xl"
      style={{}}
    >
      {/* Cover — real image or designed fallback */}
      {hasImage && (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-bg">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 ease-damped group-hover:scale-[1.02]"
            loading="lazy"
          />
        </div>
      )}
      {hasDesignedCover && (
        <DesignedCover
          code={project.coverCode}
          category={project.coverCategory}
        />
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col gap-5 p-6">
        {/* Title row */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold tracking-tight text-text truncate">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-muted">{project.subtitle}</p>
          </div>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.title} live`}
              className="shrink-0 p-2 rounded-lg text-muted hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>

        {/* Impact pills */}
        {project.impactPills?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.impactPills.map((pill) => (
              <span
                key={pill}
                className="inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
              >
                {pill}
              </span>
            ))}
          </div>
        )}

        {/* Challenge */}
        {project.challenge && (
          <div>
            <p className="font-mono text-[10px] uppercase tracking-mono-label text-accent">
              [ CHALLENGE ]
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-text/85">
              {project.challenge}
            </p>
          </div>
        )}

        {/* Build */}
        {project.build && (
          <div>
            <p className="font-mono text-[10px] uppercase tracking-mono-label text-accent">
              [ BUILD ]
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-text/85">
              {project.build}
            </p>
          </div>
        )}
      </div>

      {/* Tech strip */}
      {project.tags?.length > 0 && (
        <div className="mt-auto border-t border-border/60 bg-bg/40">
          <div className="flex gap-4 overflow-x-auto px-6 py-3 scrollbar-hide">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] uppercase tracking-mono-label text-muted whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.article>
  );
};

export default DossierCard;
