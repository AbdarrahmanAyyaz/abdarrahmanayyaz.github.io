import React from 'react';

const badgeVariants = {
  default: 'bg-surface border border-border text-text',
  primary: 'bg-accent text-white',
  secondary: 'bg-muted/20 text-muted border-none',
  success: 'bg-success/10 text-success border-success/20',
  info: 'bg-info/10 text-info border-info/20',
  warning: 'bg-warning/10 text-warning border-warning/20',
  danger: 'bg-danger/10 text-danger border-danger/20',
  outline: 'border border-border text-text bg-transparent',
  ghost: 'text-muted hover:text-text hover:bg-surface/50',
};

const badgeSizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
};

const Badge = React.forwardRef(({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
  ...props
}, ref) => {
  const baseClasses = `
    inline-flex items-center justify-center gap-1
    rounded-full font-medium
    transition-all duration-fast ease-out
    ${badgeVariants[variant]}
    ${badgeSizes[size]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <span
      ref={ref}
      className={baseClasses}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';

export default Badge;