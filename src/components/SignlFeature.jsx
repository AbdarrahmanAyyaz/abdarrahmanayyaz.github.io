import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Play } from "lucide-react";
import { Button } from "./ui";

// Featured founder project: Signl. Full-bleed-feeling section with a different
// background tint to "lift off" from surrounding sections (per visual designer).
// Self-contained, hardcoded content — not a reusable component.
//
// The hero visual is a terminal-style mock placeholder until a real Signl
// screenshot is added. To swap: replace the <TerminalMock /> below with an
// <img> pointing at the real screenshot in src/assets/.

const STEPS = [
  {
    n: "01",
    title: "Research",
    body: "Agents scan Reddit, X, LinkedIn, and news daily. Surface 5 ranked signals every morning, scored by source strength with verbatim evidence.",
  },
  {
    n: "02",
    title: "Generate",
    body: "Pick a signal and a tone — contrarian, hot take, personal story, question, observation. The system writes platform-native posts in your voice.",
  },
  {
    n: "03",
    title: "Publish",
    body: "An LLM-as-judge audit layer validates every output against platform-specific publishing rules before you hit post. Multi-model failover under the hood.",
  },
];

const TerminalMock = () => (
  <div className="w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">
    {/* Terminal title bar */}
    <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4 py-2.5">
      <div className="flex items-center gap-1.5">
        <span className="h-3 w-3 rounded-full bg-red-500/90"></span>
        <span className="h-3 w-3 rounded-full bg-yellow-500/90"></span>
        <span className="h-3 w-3 rounded-full bg-green-500/90"></span>
      </div>
      <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
        opensignl.com
      </span>
      <span className="w-12"></span>
    </div>

    {/* Terminal body */}
    <div className="px-5 py-6 sm:px-7 sm:py-8 font-mono text-[13px] sm:text-[14px] leading-relaxed text-zinc-100">
      <div className="space-y-3">
        <div>
          <span className="text-emerald-400">$</span>{" "}
          <span className="text-zinc-100">
            signl research --niche=
            <span className="text-amber-300">"ai builders"</span>
          </span>
        </div>
        <div className="space-y-1 text-zinc-400">
          <div>
            <span className="text-blue-400">→</span> Scanning Reddit, X, LinkedIn, news...
          </div>
          <div>
            <span className="text-blue-400">→</span> 5 ranked signals surfaced
          </div>
          <div>
            <span className="text-blue-400">→</span> LLM-as-judge audit layer:{" "}
            <span className="text-emerald-400">PASS</span>
          </div>
          <div>
            <span className="text-blue-400">→</span> Generated 5 platform-native posts in{" "}
            <span className="text-zinc-100">47s</span>
          </div>
        </div>
        <div className="pt-2">
          <span className="text-emerald-400">✓</span>{" "}
          <span className="text-emerald-400">Ready to publish</span>
        </div>
      </div>
    </div>
  </div>
);

export default function SignlFeature() {
  return (
    <section
      id="signl"
      aria-labelledby="signl-title"
      className="w-full border-y border-border/60 bg-card/40 py-20 md:py-28 scroll-mt-24"
    >
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent"
        >
          Featured · Founder Project
        </motion.p>

        {/* Title */}
        <motion.h2
          id="signl-title"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
          className="mt-4 text-[clamp(44px,7vw,80px)] font-bold tracking-tight leading-[1.02] text-text"
        >
          Signl
        </motion.h2>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
          className="mt-3 text-[clamp(18px,2.6vw,24px)] text-text/85 font-medium"
        >
          Research-backed content intelligence.
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
          className="mt-5 max-w-[640px] text-base sm:text-lg text-muted leading-relaxed"
        >
          A daily agentic pipeline scans Reddit, X, LinkedIn, and news for
          ranked audience signals. Generates platform-native posts validated
          by an LLM-as-judge audit layer before publication. Multi-model
          inference with graceful degradation and automatic failover.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
          className="mt-7 flex flex-wrap items-center gap-3"
        >
          <Button asChild size="lg">
            <a
              href="https://www.opensignl.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Signl"
            >
              Visit opensignl.com
              <ExternalLink className="ml-1.5 h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <a
              href="https://www.linkedin.com/feed/update/urn:li:activity:7448471121202429953/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Watch Signl demo on LinkedIn"
            >
              <Play className="mr-1.5 h-4 w-4" />
              Watch demo
            </a>
          </Button>
        </motion.div>

        {/* Hero visual: terminal mock placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
          className="mt-12"
        >
          <TerminalMock />
        </motion.div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
          className="mt-16"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
            How it works
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((step) => (
              <div key={step.n} className="flex flex-col">
                <span
                  className="font-mono text-sm text-accent"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {step.n}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-text">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stack line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="mt-14 flex items-baseline gap-4"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
            Stack
          </span>
          <span className="text-sm text-text/70">
            Next.js · TypeScript · OpenAI API · Multi-model pipeline
          </span>
        </motion.div>
      </div>
    </section>
  );
}
