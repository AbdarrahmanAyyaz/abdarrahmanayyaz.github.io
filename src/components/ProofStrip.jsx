import React from "react";
import { motion } from "framer-motion";

// Sourced metric strip — replaces the unsourced "3+ AI Products / 10K+ Users / 60% Efficiency Gains"
// block from the original HomeNew.jsx work-preview. Each number maps to a real artifact in the KB.
//
// Per the visual designer's spec: tabular numerals, big numbers, muted caption + source below,
// thin hairlines top/bottom, no cards, surgical entry motion. 3-up grid (was 4 — dropped the
// "production RAG pipelines" metric per Abdarrahman's request).
const METRICS = [
  {
    value: "80%",
    label: "failure rate surfaced",
    source: "Oracle safety eval framework",
  },
  {
    value: "90%",
    label: "groundedness lift",
    source: "post-eval chatbot redesign",
  },
  {
    value: "1,000+",
    label: "users served",
    source: "Triage AI",
  },
];

const ProofStrip = () => {
  return (
    <section
      aria-label="Proof points"
      className="w-full border-t border-b border-border/60 bg-surface/30"
    >
      <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-8 gap-x-6 sm:gap-x-10">
          {METRICS.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.4,
                delay: i * 0.06,
                ease: "easeOut",
              }}
              className="flex flex-col items-start"
            >
              <span
                className="text-[clamp(32px,5vw,56px)] font-bold tracking-tight text-text leading-none"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {metric.value}
              </span>
              <span className="mt-3 text-sm text-text/85 font-medium leading-snug">
                {metric.label}
              </span>
              <span className="mt-1 text-[11px] uppercase tracking-wider text-muted">
                {metric.source}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(ProofStrip);
