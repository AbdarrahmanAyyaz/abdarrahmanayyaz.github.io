import React from "react";
import { motion } from "framer-motion";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { LuFileDown } from "react-icons/lu";
import SmartTooltip from "./SmartTooltip";

const LINKS = [
  { href: "https://www.linkedin.com/in/abdarrahman-ayyaz/", label: "LinkedIn", Icon: FaLinkedinIn, color: "hsl(210, 100%, 44%)", newTab: true },
  { href: "https://github.com/AbdarrahmanAyyaz", label: "GitHub", Icon: FaGithub, color: "hsl(var(--accent))", newTab: true },
  { href: "mailto:abdarrahmanayyaz00@gmail.com", label: "Email", Icon: HiOutlineMail, color: "hsl(var(--success))", newTab: false },
  { href: "/AbdarrahmansResume.pdf", label: "Resume", Icon: LuFileDown, color: "hsl(var(--warning))", newTab: true },
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


export default function SocialRail() {
  return <DesktopSocialRail />;
}