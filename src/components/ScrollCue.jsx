import React from "react";
import { motion } from "framer-motion";
import { HiChevronDown } from "react-icons/hi";

const ScrollCue = ({ targetId = "work", label = "View Work" }) => {
  const handleClick = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
      });
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.4 }}
    >
      <button
        onClick={handleClick}
        className="group flex flex-col items-center gap-1 text-muted hover:text-text active:text-accent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg p-3 touch-manipulation min-h-[44px] min-w-[44px]"
        aria-label={`Scroll to ${label} section`}
      >
        <span className="text-sm font-medium">
          {label}
        </span>
        <motion.div
          animate={{ 
            y: [0, 4, 0] 
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-accent group-hover:text-accent2 group-active:text-accent2 transition-colors duration-200"
        >
          <HiChevronDown size={16} />
        </motion.div>
      </button>
      
      {/* Optional visual indicator line */}
      <motion.div
        className="w-px h-6 sm:h-8 bg-gradient-to-b from-border to-transparent"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      />
    </motion.div>
  );
};

export default ScrollCue;