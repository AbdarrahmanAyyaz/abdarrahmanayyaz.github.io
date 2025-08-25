import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui";

export default function MenuButton({ open, onToggle, className = "" }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={`md:hidden h-11 w-11 ${className}`}
      aria-label={open ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={open}
      onClick={onToggle}
    >
      <motion.div
        animate={{ rotate: open ? 180 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="relative w-6 h-6 flex flex-col items-center justify-center"
      >
        <motion.span
          className="absolute block h-0.5 w-5 bg-current rounded-full"
          animate={
            open
              ? { rotate: 45, y: 0 }
              : { rotate: 0, y: -4 }
          }
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        />
        <motion.span
          className="absolute block h-0.5 w-5 bg-current rounded-full"
          animate={
            open
              ? { opacity: 0 }
              : { opacity: 1, y: 0 }
          }
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        />
        <motion.span
          className="absolute block h-0.5 w-5 bg-current rounded-full"
          animate={
            open
              ? { rotate: -45, y: 0 }
              : { rotate: 0, y: 4 }
          }
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        />
      </motion.div>
    </Button>
  );
}