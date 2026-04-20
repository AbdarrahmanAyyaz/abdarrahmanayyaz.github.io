import React from "react";
import { motion } from "framer-motion";
import Section from "./Section";
import SectionHeader from "./ui/SectionHeader";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/Card";
import { Button } from "./ui";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

export default function About() {
  const focusAreas = [
    "Production LLM systems: RAG, eval harnesses, multi-model pipelines",
    "Safety and groundedness evaluation at scale",
    "AI deployment on OCI, OpenAI, and Anthropic stacks"
  ];

  return (
    <Section id="about" className="border-t border-border/60">
      <SectionHeader
        eyebrow="Get to know me"
        title="About"
        description="My background, values, and what drives me in AI and cloud engineering."
        center
      />

      <div className="mt-12 grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Main About Card */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={0}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-text text-2xl">
                  Welcome! Please take a look around.
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-text leading-relaxed">
                  I build and deploy production AI systems. At Oracle, I ship RAG agents and evaluation frameworks — the work that catches the things you don't want to find out about in production. On the side, I'm the founder of OpenSignl, a content intelligence SaaS I built solo because I wanted to own the whole stack.
                </p>

                <p className="text-muted leading-relaxed">
                  I care about evals before deployment, systems that degrade gracefully, and shipping things real people actually use. I'm still figuring a lot of it out — that's kind of the point.
                </p>

                <p className="text-muted">
                  Outside of work: martial arts, hiking, travel. Based in Santa Clara, CA.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Focus Areas Card */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={1}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                  <span className="text-sm uppercase tracking-wide text-muted font-medium">
                    Focus Areas
                  </span>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-4">
                  {focusAreas.map((area, index) => (
                    <motion.li
                      key={area}
                      className="flex items-start gap-3 text-text"
                      variants={fadeUpVariants}
                      custom={index + 2}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0"></div>
                      <span className="leading-relaxed">{area}</span>
                    </motion.li>
                  ))}
                </ul>

              </CardContent>
            </Card>
          </motion.div>
        </div>

      {/* Call to Action */}
      <motion.div
        className="mt-12 flex flex-col items-center text-center"
        variants={fadeUpVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={3}
      >
        <p className="text-muted mb-6 max-w-2xl">
          Interested in collaborating or learning more about my work?
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Button
            asChild
            variant="primary"
            size="lg"
            className="w-full sm:w-auto"
          >
            <a href="#contact">
              Get In Touch
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <a
              href="/AbdarrahmansResume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Resume
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <path d="M14 2v6h6"/>
                <path d="M16 13H8"/>
                <path d="M16 17H8"/>
                <path d="M10 9H8"/>
              </svg>
            </a>
          </Button>
        </div>
      </motion.div>
    </Section>
  );
}