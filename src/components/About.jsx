import React from "react";
import { motion } from "framer-motion";
import Section from "./Section";
import SectionHeader from "./ui/SectionHeader";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/Card";
import { Badge } from "./ui";

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
    "AI app UX with React/Tailwind",
    "LLM ops: prompts, retrieval, evaluation", 
    "Cloud troubleshooting (OCI/VBCS/VBS)"
  ];

  const personalValues = [
    { key: "CON", full: "CONsistency", description: "builds habits" },
    { key: "FO", full: "FOcus", description: "provides drive" },
    { key: "DI", full: "DIscipline", description: "builds foundation" }
  ];

  return (
    <Section id="about" className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Get to know me"
          title="About"
          description="My background, values, and what drives me in AI and cloud engineering."
          center
        />

        <div className="mt-12 grid lg:grid-cols-2 gap-8 items-start">
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
                {/* CON-FO-DI Philosophy */}
                <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-text">
                      {personalValues.map((value, index) => (
                        <span key={value.key}>
                          <span className="text-accent">{value.key}</span>
                          {index < personalValues.length - 1 && <span className="text-muted">-</span>}
                        </span>
                      ))}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {personalValues.map((value) => (
                      <div key={value.key} className="text-sm text-muted">
                        <span className="font-medium text-text">{value.full}</span> {value.description}
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-text leading-relaxed">
                  I build and deploy machine-learning solutions, troubleshoot cloud workloads, and support clients on Oracle Cloud Infrastructure.
                  I love shipping clean React/Tailwind interfaces and exploring the latest LLM tooling.
                </p>

                <p className="text-muted">
                  Outside of work, I enjoy time with family and nature.
                </p>

                {/* Quick Stats */}
                <div className="pt-4 border-t border-border">
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="info" size="md">
                      <strong>4+</strong>&nbsp;years React
                    </Badge>
                    <Badge variant="success" size="md">
                      <strong>2+</strong>&nbsp;years AI/ML
                    </Badge>
                    <Badge variant="warning" size="md">
                      <strong>3+</strong>&nbsp;years Cloud
                    </Badge>
                  </div>
                </div>
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

                {/* Additional Info */}
                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="text-sm font-medium text-text mb-3">Currently Learning</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" size="sm">Vector DBs</Badge>
                    <Badge variant="outline" size="sm">RAG Optimization</Badge>
                    <Badge variant="outline" size="sm">Next.js 14</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="mt-12 text-center"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={3}
        >
          <p className="text-muted mb-4">
            Interested in collaborating or learning more about my work?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-medium"
            >
              Get In Touch
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17"/>
              </svg>
            </a>
            <a
              href="/Abdarrahman_Ayyaz_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-text hover:bg-surface/80 rounded-lg transition-colors font-medium"
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
          </div>
        </motion.div>
      </div>
    </Section>
  );
}