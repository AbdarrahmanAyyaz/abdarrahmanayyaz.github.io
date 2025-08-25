import React from "react";
import { motion } from "framer-motion";
import { HiArrowNarrowRight } from "react-icons/hi";
import Section from "./Section";
import { Button, Badge } from "./ui";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: 0.08 * i, duration: 0.35 } }),
};

export default function Home() {
  return (
    <Section
      id="home"
      className="relative w-full min-h-[88vh] text-text overflow-hidden"
    >
      {/* Subtle grid pattern - theme aware */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--text) / 0.1) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
          WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 85%)",
          maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 85%)",
        }}
      />
      
      {/* Soft radial gradient behind name */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: `radial-gradient(ellipse at center top, hsl(var(--accent) / 0.03) 0%, transparent 50%)` 
        }} 
      />

      <div className="relative max-w-[1100px] mx-auto px-6 sm:px-8 lg:px-10 py-24 sm:py-28 lg:py-32">

        <motion.p 
          className="text-accent text-sm sm:text-base font-medium" 
          variants={fadeUp} 
          initial="hidden" 
          animate="show"
        >
          Hi, my name is
        </motion.p>

        <motion.h1
          className="mt-3 text-display font-extrabold tracking-tight text-text"
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          Abdarrahman Ayyaz
        </motion.h1>

        <motion.h2
          className="mt-2 text-h1 font-extrabold tracking-tight text-muted"
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent2">
            AI Engineer
          </span>{" "}
          <span className="text-muted">•</span>{" "}
          Cloud Support Engineer
        </motion.h2>

        {/* Recruiter scan line */}
        <motion.p 
          className="mt-4 text-lg font-medium text-text bg-gradient-to-r from-accent/20 to-accent2/20 rounded-lg px-4 py-2 border border-accent/20"
          custom={2.5}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          I ship AI apps and reduce <strong>mean-time-to-resolution</strong> on OCI.
        </motion.p>

        <motion.p 
          className="mt-5 max-w-2xl text-lg text-muted leading-relaxed"
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          I build and ship modern AI applications, troubleshoot cloud solutions on Oracle Cloud
          Infrastructure, and create clean, accessible user interfaces. I enjoy exploring new LLM tooling 
          and optimizing support workflows.
        </motion.p>

        {/* Highlights ribbon */}
        <motion.div
          className="mt-6 flex flex-wrap items-center gap-4 text-sm"
          custom={3.5}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <Badge variant="success" size="md">
            <strong>3</strong>&nbsp; production AI demos
          </Badge>
          <Badge variant="info" size="md">
            <strong>↓25%</strong>&nbsp; MTTR in support workflows
          </Badge>
          <Badge variant="warning" size="md">
            <strong>5+</strong>&nbsp; cloud tools shipped
          </Badge>
        </motion.div>

        <motion.div
          className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <Button
            asChild
            variant="primary"
            size="lg"
            className="group"
          >
            <a href="#work">
              View Projects
              <HiArrowNarrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </Button>

          <Button
            asChild
            variant="secondary"
            size="lg"
          >
            <a 
              href="/Abdarrahman_Ayyaz_Resume.pdf" 
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Resume
            </a>
          </Button>
        </motion.div>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-3 text-sm"
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <span className="text-muted font-medium">Recent stack:</span>
          {['React', 'Tailwind', 'OpenAI', 'LangChain', 'OCI'].map((tech) => (
            <Badge key={tech} variant="outline" size="sm">
              {tech}
            </Badge>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}