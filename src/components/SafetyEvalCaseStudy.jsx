import React from "react";
import { motion } from "framer-motion";

// Inline editorial case study for the AI Chatbot Safety Evaluation Framework.
// Reading-typography layout, single column, left-gutter section labels.
//
// CRITICAL: Per project memory, this framework was used to surface insights and
// drive a redesign — it did NOT "become the org-wide standard." Do not add any
// adoption-claim language to this component.

const BUILT_BULLETS = [
  "Reverse-engineered the chatbot's API by inspecting HAR captures",
  "Recreated authenticated session flows programmatically in Postman",
  "Wrote a custom prompt-injection framework",
  "Scored every output with LLM-as-judge across safety, groundedness, and relevance",
];

const RESULTS = [
  {
    value: "80%",
    label: "failure rate surfaced",
    sub: "on safety-critical scenarios across 3 test categories",
  },
  {
    value: "90%",
    label: "groundedness lift",
    sub: "on the post-eval redesigned chatbot",
  },
  {
    value: "VP",
    label: "findings presented to",
    sub: "senior leadership at Oracle",
  },
];

const Section = ({ label, children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.45, delay, ease: "easeOut" }}
    className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-3 md:gap-8 mb-12 last:mb-0"
  >
    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted md:pt-1.5">
      {label}
    </p>
    <div className="text-text/90">{children}</div>
  </motion.div>
);

export default function SafetyEvalCaseStudy() {
  return (
    <section
      id="safety-eval"
      aria-labelledby="safety-eval-title"
      className="w-full py-20 md:py-28 scroll-mt-24 border-y border-border/60"
    >
      <div className="mx-auto w-full max-w-[820px] px-4 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="font-mono text-[10px] uppercase tracking-mono-eyebrow text-accent"
        >
          → Entry 03 · Case file
        </motion.p>

        {/* Headline */}
        <motion.h2
          id="safety-eval-title"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
          className="mt-4 text-[clamp(32px,5vw,52px)] font-bold tracking-tight leading-[1.1] text-text"
        >
          Surfacing an 80% failure rate in a production chatbot.
        </motion.h2>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
          className="mt-4 text-base sm:text-lg text-muted"
        >
          A from-scratch evaluation harness for a customer-facing AI agent at
          Oracle.
        </motion.p>

        {/* Editorial body */}
        <div className="mt-14">
          <Section label="The Problem" delay={0.05}>
            <p className="text-base sm:text-lg leading-relaxed">
              My team at Oracle was testing a production chatbot and needed
              a way to evaluate it systematically — safety, groundedness,
              and relevance scored programmatically across adversarial and
              edge-case scenarios, not just spot-checks.
            </p>
          </Section>

          <Section label="What I Built" delay={0.05}>
            <p className="text-base sm:text-lg leading-relaxed mb-4">
              An end-to-end eval harness, built from scratch:
            </p>
            <ul className="space-y-3">
              {BUILT_BULLETS.map((bullet) => (
                <li
                  key={bullet}
                  className="flex gap-3 text-base sm:text-lg leading-relaxed"
                >
                  <span
                    className="text-accent mt-1.5 flex-shrink-0"
                    aria-hidden="true"
                  >
                    →
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section label="The Results" delay={0.05}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
              {RESULTS.map((result) => (
                <div
                  key={result.label}
                  className="border-l-2 border-accent/40 pl-4"
                >
                  <p
                    className="text-[clamp(36px,5vw,52px)] font-bold tracking-tight leading-none text-text"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {result.value}
                  </p>
                  <p className="mt-2 text-sm font-medium text-text/80 leading-snug">
                    {result.label}
                  </p>
                  <p className="mt-1 text-xs text-muted leading-snug">
                    {result.sub}
                  </p>
                </div>
              ))}
            </div>
          </Section>

          <Section label="The Impact" delay={0.05}>
            <p className="text-base sm:text-lg leading-relaxed">
              Presented findings and insights to VP and senior leadership at
              Oracle. The insights drove a multi-turn chatbot redesign that
              improved groundedness by <strong className="text-text">90%</strong>{" "}
              on the held-out evaluation set.
            </p>
          </Section>

          <Section label="Stack" delay={0.05}>
            <p className="text-sm text-text/70">
              Postman · custom prompt-injection framework · LLM-as-judge ·
              HAR analysis
            </p>
          </Section>
        </div>
      </div>
    </section>
  );
}
