import React from 'react';
import { motion } from 'framer-motion';
import { ENTRIES } from '../../data/entries';

const SectionHeader = ({
  title,
  eyebrow,
  entryId,
  description,
  className = '',
  animate = true,
  center = false,
  ...props
}) => {
  const containerClasses = `
    ${center ? 'text-center' : ''}
    ${className}
  `.trim();

  const Component = animate ? motion.div : 'div';
  const motionProps = animate ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut' }
  } : {};

  const entry = entryId ? ENTRIES.find((e) => e.sectionId === entryId) : null;

  return (
    <Component
      className={containerClasses}
      {...motionProps}
      {...props}
    >
      {entry ? (
        <p className="font-mono text-[10px] uppercase tracking-mono-eyebrow text-nb-amber-soft mb-4">
          {entry.eyebrow}
        </p>
      ) : eyebrow && (
        <div className="mb-2">
          <span className="inline-block px-3 py-1 text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
            {eyebrow}
          </span>
        </div>
      )}

      {title && (
        <h2 className="text-h2 font-medium tracking-tight-display text-text mb-4">
          {title}
        </h2>
      )}

      {description && (
        <p className={`text-lg text-muted max-w-2xl ${center ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </Component>
  );
};

export default SectionHeader;
