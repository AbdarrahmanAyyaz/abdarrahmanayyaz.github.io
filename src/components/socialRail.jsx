import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { LuFileDown } from "react-icons/lu";
import { Button } from "./ui";
import SmartTooltip from "./SmartTooltip";

const LINKS = [
  { href: "https://www.linkedin.com/in/abdarrahman-ayyaz/", label: "LinkedIn", Icon: FaLinkedinIn, color: "hsl(210, 100%, 44%)", newTab: true },
  { href: "https://github.com/AbdarrahmanAyyaz", label: "GitHub", Icon: FaGithub, color: "hsl(var(--accent))", newTab: true },
  { href: "mailto:abdarrahmanayyaz00@gmail.com", label: "Email", Icon: HiOutlineMail, color: "hsl(var(--success))", newTab: false },
  { href: "/Abdarrahman_Ayyaz_Resume.pdf", label: "Resume", Icon: LuFileDown, color: "hsl(var(--warning))", newTab: false },
];

// Desktop Social Rail (left side)
function DesktopSocialRail() {
  return (
    <div className="hidden lg:flex fixed left-6 top-1/2 -translate-y-1/2 z-nav flex-col gap-3">
      {LINKS.map(({ href, label, Icon, color, newTab }) => (
        <SmartTooltip key={label} label={label} position="right">
          <motion.a
            href={href}
            target={newTab ? "_blank" : "_self"}
            rel={newTab ? "noopener noreferrer" : undefined}
            className="group relative inline-flex h-11 w-11 items-center justify-center rounded-xl
                       border border-border bg-surface/80 backdrop-blur-sm
                       hover:bg-surface shadow-soft hover:shadow-hover
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                       transition-all duration-200"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span 
              className="absolute -left-1.5 -top-1.5 h-3 w-3 rounded-full opacity-80" 
              style={{ background: color }} 
            />
            <Icon className="text-muted group-hover:text-text transition-colors" size={18} aria-hidden />
            <span className="sr-only">{label}</span>
          </motion.a>
        </SmartTooltip>
      ))}
    </div>
  );
}

// Mobile Social Dock (bottom)
function MobileSocialDock() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-nav">
      <motion.div
        className="flex items-center gap-3 px-4 py-3 bg-surface/95 backdrop-blur-md border border-border rounded-2xl shadow-hover"
        initial={false}
        animate={{ width: isExpanded ? 'auto' : '64px' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <SmartTooltip 
          label={isExpanded ? "Close social links" : "Open social links"} 
          position="top"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="shrink-0 h-10 w-10"
            aria-label={isExpanded ? "Close social links" : "Open social links"}
            aria-expanded={isExpanded}
          >
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12h14"/>
            </svg>
          </motion.div>
          </Button>
        </SmartTooltip>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {LINKS.map(({ href, label, Icon, color, newTab }, index) => (
                <SmartTooltip key={label} label={label} position="top">
                  <motion.a
                    href={href}
                    target={newTab ? "_blank" : "_self"}
                    rel={newTab ? "noopener noreferrer" : undefined}
                    className="group relative inline-flex h-8 w-8 items-center justify-center rounded-lg
                               border border-border bg-surface/50
                               hover:bg-accent hover:text-white hover:border-accent
                               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                               transition-all duration-200"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon size={14} aria-hidden />
                    <span className="sr-only">{label}</span>
                  </motion.a>
                </SmartTooltip>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default function SocialRail() {
  return (
    <>
      <DesktopSocialRail />
      <MobileSocialDock />
    </>
  );
}