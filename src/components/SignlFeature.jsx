import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Play } from "lucide-react";
import { Button } from "./ui";

// Featured founder project: Signl. Full-bleed-feeling section with a different
// background tint to "lift off" from surrounding sections (per visual designer).
// Self-contained, hardcoded content — not a reusable component.
//
// Hero visual is a notebook-styled poster card that links out to the OpenSignl
// launch demo on LinkedIn (ugcPost 7448466521531621376).

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

const LinkedInDemoCard = () => (
  <a
    href="https://www.linkedin.com/posts/abdarrahman-ayyaz_introducing-opensignl-a-research-agent-ugcPost-7448466521531621376-ALvW"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Watch the OpenSignl launch demo on LinkedIn"
    className="group relative block w-full overflow-hidden rounded-2xl border border-ink-ghost bg-shell shadow-2xl transition-all duration-300 hover:border-nb-amber/50"
  >
    {/* 16:9 aspect frame */}
    <div className="relative aspect-video w-full bg-gradient-to-br from-shell-raised to-shell overflow-hidden">
      {/* Subtle scan-line texture */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0, transparent 3px, rgba(233,169,66,0.02) 3px, rgba(233,169,66,0.02) 4px)",
        }}
      />

      {/* Amber center glow */}
      <div
        aria-hidden
        className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-100 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(233,169,66,0.10) 0%, transparent 70%)",
        }}
      />

      {/* Play button + CTA stack */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-nb-amber/15 border-2 border-nb-amber/50 transition-all duration-300 group-hover:bg-nb-amber/25 group-hover:border-nb-amber group-hover:scale-110">
          <Play
            className="h-8 w-8 fill-nb-amber text-nb-amber ml-1"
            strokeWidth={0}
          />
        </div>
        <div className="text-center">
          <p className="font-mono text-[10px] uppercase tracking-mono-eyebrow text-nb-amber-soft">
            Launch demo
          </p>
          <p className="mt-2 text-base font-medium text-ink">
            Watch on LinkedIn{" "}
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </p>
        </div>
      </div>
    </div>

    {/* Metadata footer */}
    <div className="flex items-center justify-between border-t border-ink-ghost bg-shell-raised/40 px-5 py-3">
      <span className="font-mono text-[10px] uppercase tracking-mono-label text-ink-muted">
        introducing opensignl
      </span>
      <span className="font-mono text-[10px] uppercase tracking-mono-label text-ink-muted">
        linkedin
      </span>
    </div>
  </a>
);

export default function SignlFeature() {
  return (
    <section
      id="signl"
      aria-labelledby="signl-title"
      className="w-full border-y border-ink-ghost bg-shell-raised/40 py-20 md:py-28 scroll-mt-24"
    >
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="font-mono text-[10px] uppercase tracking-mono-eyebrow text-nb-amber-soft"
        >
          → Entry 02 · Building now
        </motion.p>

        {/* Title */}
        <motion.h2
          id="signl-title"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
          className="mt-4 text-[clamp(44px,7vw,80px)] font-bold tracking-tight leading-[1.02] text-ink"
        >
          OpenSignl
        </motion.h2>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
          className="mt-3 text-[clamp(18px,2.6vw,24px)] text-ink/85 font-medium"
        >
          Research-backed content intelligence.
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
          className="mt-5 max-w-[640px] text-base sm:text-lg text-ink-muted leading-relaxed"
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
              aria-label="Visit OpenSignl"
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
              aria-label="Watch OpenSignl demo on LinkedIn"
            >
              <Play className="mr-1.5 h-4 w-4" />
              Watch demo
            </a>
          </Button>
        </motion.div>

        {/* Hero visual: OpenSignl launch demo poster card (links to LinkedIn) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
          className="mt-12"
        >
          <LinkedInDemoCard />
        </motion.div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
          className="mt-16"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-muted">
            How it works
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((step) => (
              <div key={step.n} className="flex flex-col">
                <span
                  className="font-mono text-sm text-nb-amber"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {step.n}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">
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
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-muted">
            Stack
          </span>
          <span className="text-sm text-ink/70">
            Next.js · TypeScript · OpenAI API · Multi-model pipeline
          </span>
        </motion.div>
      </div>
    </section>
  );
}
