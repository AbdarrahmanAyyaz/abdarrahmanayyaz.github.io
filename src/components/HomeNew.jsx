import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Section from "./Section";
import ScrollCue from "./ScrollCue";
import Hero from "./Hero";
import ChatSection from "./ChatSection";
import { useHideFabWhenChatVisible } from "../hooks/useHideFabWhenChatVisible";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 * i,
      duration: 0.6,
      ease: "easeOut"
    }
  }),
};

function HomeNew() {
  const [hasUserTyped, setHasUserTyped] = useState(false);

  // Use intersection observer to hide FAB when chat is visible
  useHideFabWhenChatVisible();

  const handleQuestionSelect = (question) => {
    const event = new CustomEvent('autoFillQuestion', { detail: question });
    window.dispatchEvent(event);
  };

  const handleChatInputFocus = useCallback(() => {
    // Handle focus logic if needed
  }, []);

  const handleChatInputChange = useCallback((value) => {
    if (value.length > 0 && !hasUserTyped) {
      setHasUserTyped(true);
    }
  }, [hasUserTyped]);

  return (
    <Section
      id="home"
      className="relative w-full min-h-[95vh] text-text overflow-hidden animated-mesh floating-orbs"
    >
      {/* Subtle grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--text) / 0.06) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
          WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 85%)",
          maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 85%)",
        }}
      />

      {/* Subtle radial spotlight */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px]"
        style={{
          background: `radial-gradient(ellipse at center, hsl(var(--accent) / 0.04) 0%, transparent 60%)`
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-6 sm:pt-20 sm:pb-8 md:pt-24 md:pb-12 lg:pt-32 lg:pb-16 flex flex-col items-center justify-center min-h-[95vh]">

        {/* Hero Section */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <Hero />
        </motion.div>

        {/* Chat Section */}
        <motion.div
          className="w-full mx-auto px-2 sm:px-4 md:px-2 lg:px-0 max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl relative mt-8"
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <ChatSection
            onQuestionSelect={handleQuestionSelect}
            onInputFocus={handleChatInputFocus}
            onInputChange={handleChatInputChange}
          />
        </motion.div>

        {/* Work Preview Section */}
        <motion.div
          className="work-preview mt-8 sm:mt-12 w-full max-w-4xl below-fold"
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <h2>See My Impact</h2>
          <p>From solving enterprise production issues to serving thousands with AI solutions</p>

          <button
            className="explore-work-btn"
            onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore My Work →
          </button>

          <div className="impact-stats">
            <div className="stat">
              <span className="number">3+</span>
              <span className="label">AI Products</span>
            </div>
            <div className="stat">
              <span className="number">10K+</span>
              <span className="label">Users Impacted</span>
            </div>
            <div className="stat">
              <span className="number">60%</span>
              <span className="label">Efficiency Gains</span>
            </div>
          </div>
        </motion.div>

        {/* Scroll Cue */}
        <motion.div
          className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 flex justify-center pb-4 sm:pb-0"
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <ScrollCue />
        </motion.div>

        {/* Desktop Chat FAB - Hidden on mobile, auto-hides when chat is visible */}
        <button
          className="fab-chat h-14 w-14 rounded-full bg-accent text-surface shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
          onClick={() => document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' })}
          aria-label="Open Chat"
        >
          💬
        </button>

        {/* Mobile Contact FAB */}
        <button
          className="fab-resume group"
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          aria-label="Contact"
        >
          💬
          <div className="absolute bottom-full mb-2 right-0 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
            Contact
            <div className="absolute top-full right-2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
          </div>
        </button>
      </div>
    </Section>
  );
}

export default React.memo(HomeNew);