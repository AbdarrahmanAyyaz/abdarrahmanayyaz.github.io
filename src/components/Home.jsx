import React from "react";
import { motion } from "framer-motion";
import { HiArrowNarrowRight } from "react-icons/hi";
import Section from "./Section";
import { Button, Badge } from "./ui";
import ProjectPeek from "./ProjectPeek";
import ScrollCue from "./ScrollCue";
import SimpleAIChat from "./SimpleAIChat";
import projects from "../data/data";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: 0.08 * i, duration: 0.35 } }),
};

export default function Home() {
  return (
    <Section
      id="home"
      className="relative w-full min-h-[95vh] text-text overflow-hidden"
    >
      {/* Subtle grid pattern - theme aware with reduced opacity in light mode */}
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
      
      {/* Subtle radial spotlight behind name for light mode */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px]"
        style={{ 
          background: `radial-gradient(ellipse at center, hsl(var(--accent) / 0.04) 0%, transparent 60%)` 
        }} 
      />

      <div className="relative max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">

        {/* 1. H1 (name) */}
        <motion.h1
          className="text-display font-extrabold tracking-tight text-text text-center sm:text-left"
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          Abdarrahman Ayyaz
        </motion.h1>

        {/* 2. Subhead (one concise line) */}
        <motion.p 
          className="mt-3 text-lg sm:text-xl font-semibold text-text text-center sm:text-left"
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          I build AI apps and cut mean-time-to-resolution on OCI.
        </motion.p>

        {/* 3. Highlights (three numeric chips) */}
        <motion.div
          className="mt-6 flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3"
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <Badge variant="success" size="md" className="font-semibold text-xs sm:text-sm">
            3 AI demos
          </Badge>
          <Badge variant="info" size="md" className="font-semibold text-xs sm:text-sm">
            100s of users helped
          </Badge>
          <Badge variant="warning" size="md" className="font-semibold text-xs sm:text-sm">
            5+ tools shipped
          </Badge>
        </motion.div>

        {/* Optional "Want the story?" link */}
        <motion.div
          className="mt-4 text-center sm:text-left"
          custom={2.5}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <a 
            href="#about"
            className="inline-block text-sm text-muted hover:text-accent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded px-1 py-1 touch-manipulation"
          >
            Want the story? <span className="underline underline-offset-4">About →</span>
          </a>
        </motion.div>

        {/* 4. Primary/Secondary CTAs */}
        <motion.div
          className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center sm:justify-start gap-3 sm:gap-4"
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <Button
            asChild
            variant="primary"
            size="lg"
            className="group w-full sm:w-auto"
          >
            <a href="#work" className="touch-manipulation">
              View Projects
              <HiArrowNarrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </Button>

          <Button
            asChild
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
          >
            <a 
              href="/AbdarrahmanAyyazResume.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="touch-manipulation"
            >
              Download Resume
            </a>
          </Button>
        </motion.div>

        {/* 5. AI Chat Interface */}
        <motion.div
          className="mt-12 sm:mt-16"
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-text mb-4">
              Chat with AI Abdarrahman 🤖
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Instead of reading about my work, why not have a conversation? 
              Ask me anything about my projects, experience, or expertise!
            </p>
          </div>
          <SimpleAIChat />
        </motion.div>

        {/* 6. Project Peek (3 compact cards) */}
        <motion.div
          className="mt-12 sm:mt-16"
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <ProjectPeek projects={projects} />
        </motion.div>

        {/* 7. Scroll Cue */}
        <motion.div
          className="mt-8 sm:mt-12 flex justify-center pb-4 sm:pb-0"
          custom={6}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <ScrollCue />
        </motion.div>

      </div>
    </Section>
  );
}