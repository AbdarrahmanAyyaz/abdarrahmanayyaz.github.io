import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Section from "./Section";
import ScrollCue from "./ScrollCue";
import NotebookHero from "./NotebookHero";
import ChatSection from "./ChatSection";
import ProofStrip from "./ProofStrip";
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
      className="relative w-full text-text overflow-hidden"
    >
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">

        {/* Hero Section */}
        <NotebookHero />

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

        {/* Proof strip — sourced metrics, replaces the unsourced work-preview block.
            Each number maps to a real artifact in the KB. */}
        <div className="w-full mt-8 sm:mt-12">
          <ProofStrip />
        </div>

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