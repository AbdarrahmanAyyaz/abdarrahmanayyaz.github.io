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
        entryId="about"
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
                  I work on AI at Oracle during the week, and I&apos;m building{' '}
                  <span className="text-accent">OpenSignl</span> on my own time &mdash; a research tool for creators, solo project. I like both.
                </p>

                <p className="text-muted leading-relaxed">
                  I care about tools that work when real people use them, not just in the demo. Still learning a lot as I go.
                </p>

                <p className="text-muted">
                  When I&apos;m not at a keyboard: martial arts, hiking, and whatever trip I&apos;m planning next. Based in the SF Bay Area.
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
          Want to talk? Book a quick call or reach out — whatever works for you.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full md:w-auto">
          <Button
            asChild
            variant="primary"
            size="lg"
            className="w-full md:w-auto"
          >
            <a
              href="https://calendly.com/abdarrahmanayyaz00/30min"
              target="_blank"
              rel="noopener noreferrer"
            >
              Schedule a 30-min Call
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full md:w-auto"
          >
            <a href="#contact">
              Get In Touch
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-2">
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full md:w-auto"
          >
            <a
              href="/AbdarrahmansResume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Resume
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-2">
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