import React from 'react';

// Simple cn utility
const cn = (...classes) => classes.filter(Boolean).join(' ');

const Button = React.forwardRef(({
  children,
  className,
  variant = "primary",
  size = "md",
  asChild = false,
  ...props
}, ref) => {
  const base = "inline-flex items-center justify-center rounded-xl transition active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 min-h-[44px] touch-manipulation";

  const sizes = {
    sm: "h-8 px-3 text-sm min-h-[40px]",
    md: "h-9 px-3 text-sm min-h-[44px]",
    lg: "h-11 px-4 text-base min-h-[48px]"
  };

  const variants = {
    primary: "bg-primary text-primary-foreground shadow-sm hover:opacity-90",
    secondary: "border border-border bg-card text-card-foreground hover:bg-muted/40",
    ghost: "text-muted-foreground hover:bg-muted/30"
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: cn(base, sizes[size], variants[variant], className, children.props.className),
      ref,
      ...props
    });
  }

  return (
    <button
      ref={ref}
      className={cn(base, sizes[size], variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;