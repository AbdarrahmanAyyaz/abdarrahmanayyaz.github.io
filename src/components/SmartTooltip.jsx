import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function SmartTooltip({ label, children, position = "top" }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const timeoutRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    // Detect if device supports touch or is mobile
    const updateTouchDetection = () => {
      const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
      const isMobile = window.innerWidth < 768;
      setIsTouch(isTouchDevice || isMobile);
    };

    updateTouchDetection();

    // Update on resize
    window.addEventListener('resize', updateTouchDetection);
    return () => window.removeEventListener('resize', updateTouchDetection);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const handleClickOutside = (event) => {
      if (triggerRef.current && !triggerRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isVisible]);

  const handleMouseEnter = () => {
    if (!isTouch) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouch) {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 100);
    }
  };

  const handleClick = (event) => {
    if (isTouch) {
      event.preventDefault();
      // Don't show tooltips on mobile/touch devices at all
      setIsVisible(false);
    }
  };

  const handleFocus = () => {
    if (!isTouch) {
      setIsVisible(true);
    }
  };

  const handleBlur = () => {
    if (!isTouch) {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 100);
    }
  };

  const positionClasses = {
    top: "-top-2 left-1/2 -translate-x-1/2 -translate-y-full",
    bottom: "-bottom-2 left-1/2 -translate-x-1/2 translate-y-full",
    left: "top-1/2 -left-2 -translate-x-full -translate-y-1/2",
    right: "top-1/2 -right-2 translate-x-full -translate-y-1/2",
  };

  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-surface",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-b-4 border-transparent border-b-surface",
    left: "left-full top-1/2 -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-transparent border-l-surface",
    right: "right-full top-1/2 -translate-y-1/2 border-t-4 border-b-4 border-r-4 border-transparent border-r-surface",
  };

  return (
    <div 
      ref={triggerRef}
      className="relative inline-flex"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {React.cloneElement(children, {
        onClick: (e) => {
          children.props.onClick?.(e);
          handleClick(e);
        },
        "aria-describedby": isVisible ? `tooltip-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined,
      })}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            id={`tooltip-${label.replace(/\s+/g, '-').toLowerCase()}`}
            role="tooltip"
            className={`absolute z-tooltip ${positionClasses[position]} pointer-events-none`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            <div className="px-3 py-2 text-sm font-medium text-text bg-surface border border-border/60 rounded-lg shadow-soft backdrop-blur-sm">
              {label}
            </div>
            <div className={`absolute ${arrowClasses[position]} w-0 h-0`} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}