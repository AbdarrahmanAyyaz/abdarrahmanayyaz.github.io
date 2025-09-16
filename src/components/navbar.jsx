import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./themeToggle";
import { Button } from "./ui";
import MenuButton from "./MenuButton";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";
import { useFocusTrap } from "../hooks/useFocusTrap";

const ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  
  const mobileMenuRef = useFocusTrap(open);
  useBodyScrollLock(open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ITEMS.map(({ id }) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { root: null, rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    
    if (open) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [open]);

  const headerClass = useMemo(
    () =>
      `sticky top-0 backdrop-blur-md transition-all duration-200 ${
        scrolled 
          ? "bg-surface/90 border-b border-border shadow-soft" 
          : "bg-surface/40"
      }`,
    [scrolled]
  );

  const desktopLinkBase = `
    relative px-3 py-2 rounded-lg text-muted hover:text-text transition-all duration-200
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
  `.trim();

  const activeClass = "text-text bg-accent/10 border border-accent/20";

  return (
    <>
      <motion.header 
        className={`${headerClass} z-nav`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.a 
            href="#home" 
            aria-label="Go to home" 
            className="text-2xl font-extrabold tracking-tight text-text hover:text-accent transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            A<span className="text-accent">A</span>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {ITEMS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active === id ? "page" : undefined}
                className={`${desktopLinkBase} ${active === id ? activeClass : ""}`}
              >
                {label}
                {active === id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full"
                    layoutId="activeTab"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </a>
            ))}
            
            <div className="ml-4 flex items-center gap-2">
              <ThemeToggle showLabel={false} />
              
              <Button
                asChild
                variant="primary"
                size="sm"
                className="font-medium"
              >
                <a 
                  href="/AbdarrahmanAyyazResume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume
                </a>
              </Button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <MenuButton 
            open={open} 
            onToggle={() => setOpen(!open)}
            aria-controls="mobile-navigation"
          />
        </div>
      </div>
      </motion.header>

      {/* Mobile Menu - Now outside header for true full-screen */}
      <AnimatePresence>
        {open && (
          <>            
            {/* Menu Panel */}
            <motion.div 
              ref={mobileMenuRef}
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              className="md:hidden fixed inset-0 z-panel bg-surface backdrop-blur-xl overflow-y-auto"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {/* Safe area padding for mobile devices */}
              <div className="p-6 pt-20 pb-safe-bottom min-h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                  <h2 className="text-2xl font-bold text-text">Navigation</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setOpen(false)}
                    className="h-12 w-12 rounded-full"
                    aria-label="Close navigation menu"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                  </Button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1">
                  <div className="flex flex-col gap-3">
                    {ITEMS.map(({ id, label }, index) => (
                      <motion.a
                        key={id}
                        href={`#${id}`}
                        onClick={() => setOpen(false)}
                        className={`group relative flex items-center justify-between px-6 py-4 text-xl font-semibold rounded-2xl transition-all duration-200
                                   ${active === id 
                                     ? 'bg-accent text-white shadow-lg' 
                                     : 'text-text hover:bg-surface border border-border hover:border-accent/30 hover:shadow-soft'
                                   }
                                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4, ease: 'easeOut' }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>{label}</span>
                        {active === id ? (
                          <motion.div
                            className="w-2 h-2 rounded-full bg-white"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                          />
                        ) : (
                          <svg 
                            className="w-5 h-5 text-muted group-hover:text-accent transition-colors" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        )}
                      </motion.a>
                    ))}
                  </div>
                </nav>

                {/* Bottom Section */}
                <div className="pt-8 mt-auto space-y-6">
                  <div className="flex items-center justify-center gap-4 p-4 bg-surface/50 rounded-2xl border border-border">
                    <span className="text-base font-medium text-text">Theme</span>
                    <ThemeToggle />
                  </div>
                  
                  <Button
                    asChild
                    variant="primary"
                    size="lg"
                    className="w-full h-14 text-lg font-semibold rounded-2xl"
                  >
                    <a 
                      href="/AbdarrahmanAyyazResume.pdf"
                      onClick={() => setOpen(false)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download Resume
                    </a>
                  </Button>
                  
                  <div className="text-center text-sm text-muted">
                    Abdarrahman Ayyaz • AI Engineer
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
