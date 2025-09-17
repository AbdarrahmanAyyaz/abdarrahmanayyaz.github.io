import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { LuFileDown } from "react-icons/lu";
import { HiPlus } from "react-icons/hi2";
import { Button } from "./ui";
import SmartTooltip from "./SmartTooltip";

const SOCIAL_LINKS = [
  { 
    href: "https://www.linkedin.com/in/abdarrahman-ayyaz/", 
    label: "LinkedIn", 
    Icon: FaLinkedinIn, 
    color: "hsl(210, 100%, 44%)", 
    newTab: true 
  },
  { 
    href: "https://github.com/AbdarrahmanAyyaz", 
    label: "GitHub", 
    Icon: FaGithub, 
    color: "hsl(var(--accent))", 
    newTab: true 
  },
  { 
    href: "mailto:abdarrahmanayyaz00@gmail.com", 
    label: "Email", 
    Icon: HiOutlineMail, 
    color: "hsl(var(--success))", 
    newTab: false 
  },
];

const BottomDock = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="hidden fixed bottom-0 left-0 right-0 z-nav pointer-events-none"
      style={{ 
        paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' 
      }}
    >
      <div className="flex justify-center px-4">
        <motion.div
          className="pointer-events-auto bg-surface/95 backdrop-blur-md border border-border rounded-2xl shadow-hover overflow-hidden"
          initial={false}
          animate={{ 
            width: isExpanded ? 'auto' : '56px',
            height: isExpanded ? 'auto' : '56px'
          }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          <div className="flex items-center p-1">
            {/* Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              className="shrink-0 h-12 w-12 rounded-xl touch-manipulation"
              aria-label={isExpanded ? "Close dock" : "Open dock"}
              aria-expanded={isExpanded}
            >
              <motion.div
                animate={{ rotate: isExpanded ? 45 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <HiPlus size={16} />
              </motion.div>
            </Button>

            {/* Expanded Content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  className="flex items-center pl-1"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                >
                  {/* Social Links */}
                  <div className="flex items-center gap-1 mr-1">
                    {SOCIAL_LINKS.map(({ href, label, Icon, newTab }, index) => (
                      <SmartTooltip key={label} label={label} position="top">
                        <motion.a
                          href={href}
                          target={newTab ? "_blank" : "_self"}
                          rel={newTab ? "noopener noreferrer" : undefined}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg
                                   border border-border bg-surface/50 text-muted
                                   hover:bg-accent hover:text-white hover:border-accent
                                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                                   transition-all duration-200 touch-manipulation"
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 90 }}
                          transition={{ 
                            duration: 0.2, 
                            delay: index * 0.03,
                            type: 'spring',
                            stiffness: 400,
                            damping: 25
                          }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Icon size={14} aria-hidden />
                          <span className="sr-only">{label}</span>
                        </motion.a>
                      </SmartTooltip>
                    ))}
                  </div>

                  {/* Resume Button */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.15, delay: 0.1 }}
                  >
                    <Button
                      asChild
                      variant="primary"
                      size="sm"
                      className="h-9 text-xs font-medium whitespace-nowrap px-3 touch-manipulation"
                    >
                      <a 
                        href="/AbdarrahmanAyyazResume.pdf" 
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <LuFileDown size={12} />
                        Resume
                      </a>
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BottomDock;