import React from 'react';
import { motion } from 'framer-motion';

const SectionHeader = ({
  title,
  eyebrow,
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

  return (
    <Component
      className={containerClasses}
      {...motionProps}
      {...props}
    >
      {eyebrow && (
        <div className="mb-2">
          <span className="inline-block px-3 py-1 text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
            {eyebrow}
          </span>
        </div>
      )}
      
      {title && (
        <h2 className="text-h2 font-bold text-text mb-4">
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