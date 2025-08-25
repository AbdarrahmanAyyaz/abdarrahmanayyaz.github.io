import React from 'react';
import { motion } from 'framer-motion';

const buttonVariants = {
  primary: 'bg-accent text-white hover:bg-accent/90 shadow-soft hover:shadow-hover',
  secondary: 'bg-surface border border-border text-text hover:bg-surface/80 shadow-soft hover:shadow-hover',
  ghost: 'text-text hover:bg-surface/50 hover:text-text/90',
  link: 'text-accent hover:text-accent/80 underline-offset-4 hover:underline',
  danger: 'bg-danger text-white hover:bg-danger/90 shadow-soft hover:shadow-hover',
  success: 'bg-success text-white hover:bg-success/90 shadow-soft hover:shadow-hover',
};

const buttonSizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl',
  icon: 'p-2',
};

const Button = React.forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  animate = true,
  asChild = false,
  ...props
}, ref) => {
  const baseClasses = `
    inline-flex items-center justify-center gap-2 
    rounded-lg font-medium 
    transition-all duration-normal ease-out
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
    disabled:pointer-events-none disabled:opacity-50
    ${buttonVariants[variant]}
    ${buttonSizes[size]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const MotionButton = animate ? motion.button : 'button';
  const motionProps = animate ? {
    whileHover: { y: -1 },
    whileTap: { y: 0, scale: 0.98 },
    transition: { type: 'spring', stiffness: 400, damping: 25 }
  } : {};

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: `${baseClasses} ${children.props.className || ''}`,
      ref,
      ...props
    });
  }

  return (
    <MotionButton
      ref={ref}
      className={baseClasses}
      disabled={disabled || loading}
      {...motionProps}
      {...props}
    >
      {loading && (
        <svg 
          className="animate-spin h-4 w-4" 
          fill="none" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </MotionButton>
  );
});

Button.displayName = 'Button';

export default Button;