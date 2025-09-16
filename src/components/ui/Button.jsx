import React from 'react';
import { motion } from 'framer-motion';

const buttonVariants = {
  primary: 'bg-accent text-white hover:bg-accent/90 active:bg-accent/80 shadow-soft hover:shadow-hover',
  secondary: 'bg-surface border border-border text-text hover:bg-surface/80 active:bg-surface/60 shadow-soft hover:shadow-hover',
  ghost: 'text-text hover:bg-surface/50 active:bg-surface/70 hover:text-text/90',
  outline: 'border border-border text-text hover:bg-accent hover:text-white hover:border-accent active:bg-accent/90',
  link: 'text-accent hover:text-accent/80 active:text-accent/70 underline-offset-4 hover:underline',
  danger: 'bg-danger text-white hover:bg-danger/90 active:bg-danger/80 shadow-soft hover:shadow-hover',
  success: 'bg-success text-white hover:bg-success/90 active:bg-success/80 shadow-soft hover:shadow-hover',
};

const buttonSizes = {
  xs: 'px-2 py-1 text-xs min-h-[32px]',
  sm: 'px-3 py-2 text-sm min-h-[36px]',
  md: 'px-4 py-2.5 text-sm min-h-[40px]',
  lg: 'px-6 py-3 text-base min-h-[44px]',
  xl: 'px-8 py-4 text-lg min-h-[48px]',
  icon: 'p-2 min-h-[40px] min-w-[40px]',
  'icon-sm': 'p-1.5 min-h-[32px] min-w-[32px]',
  'icon-lg': 'p-3 min-h-[48px] min-w-[48px]',
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
    rounded-lg font-medium select-none touch-manipulation
    transition-all duration-normal ease-out
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
    disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed
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