import React from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Rocket } from "lucide-react";
import { ENTRIES as NOTEBOOK_ENTRIES } from "../data/entries";

const ENTRIES = [
  {
    type: "role",
    icon: Briefcase,
    role: "AI Deployment Engineer",
    company: "Oracle Cloud Infrastructure",
    location: "Santa Clara, CA",
    dates: "Jun 2024 — Present",
    note: "Internal title: Cloud Support Engineer",
    bullets: [
      "Built a chatbot safety evaluation framework from scratch — surfaced 80% failure rate on safety-critical scenarios; insights drove a multi-turn redesign with 90% groundedness lift.",
      "Tech-led the pod that built an AI-powered engineering workspace on OpenAI Codex + SDK, integrating Oracle's support KB to auto-generate issue drafts and runbooks.",
      "Designed and deployed a production RAG agent on OCI Generative AI for OIC Gen 2 → Gen 3 migration, cutting manual resolution time for internal engineering teams.",
      "Evaluated production AI agents post-sale — 35% response accuracy lift; surfaced critical failure patterns before customer exposure.",
    ],
    stack: ["OCI Generative AI", "OpenAI SDK", "LLM-as-judge", "RAG", "Postman"],
  },
  {
    type: "founder",
    icon: Rocket,
    role: "Founder",
    company: "OpenSignl · opensignl.com",
    location: "Solo",
    dates: "2026 — Present",
    bullets: [
      "Founded and built a live content intelligence SaaS. Daily agentic pipeline scans Reddit, X, LinkedIn, and news; ranks signals by source strength with verbatim evidence.",
      "LLM-as-judge audit layer validates every output against platform-specific publishing rules. Multi-model inference with graceful degradation and automatic failover.",
      "Free + $19/mo Pro tier, voice profiling matches the user's actual writing patterns.",
    ],
    stack: ["Next.js", "TypeScript", "OpenAI API", "Multi-model pipeline"],
  },
  {
    type: "founder",
    icon: Rocket,
    role: "Founder & Lead Developer",
    company: "Triage AI · triagedai.com",
    location: "Solo",
    dates: "Feb 2025 — Present",
    bullets: [
      "Full-stack AI triage app serving 1,000+ users with 40% response-relevance lift over baseline.",
      "Replaced AWS Comprehend with a client-side sentiment model — 95% accuracy on labeled set, $50/mo infra cost eliminated, 200ms P95 latency cut.",
      "Cut React re-renders by 60% via TanStack Query and targeted memoization.",
    ],
    stack: ["React", "TypeScript", "PostgreSQL", "Perplexity API"],
  },
  {
    type: "role",
    icon: Briefcase,
    role: "Software Engineering Intern",
    company: "Kay Systems",
    location: "Remote",
    dates: "Jun 2023 — Sep 2023",
    bullets: [
      "Built and shipped full-stack web applications on the MERN stack within a 6-person international Agile team.",
      "Delivered responsive UI components and RESTful APIs across iterative sprint cycles with Git-based code review.",
    ],
    stack: ["MongoDB", "Express", "React", "Node.js"],
  },
  {
    type: "education",
    icon: GraduationCap,
    role: "B.S. Computer Science",
    company: "San Francisco State University",
    location: "San Francisco, CA",
    dates: "Graduated 2024",
    bullets: [
      "3.7 GPA · Dean's List · Genentech-PINC Scholarship Recipient · Data Science & Machine Learning Certificate.",
      "Coursework: Data Structures and Algorithms, Software Engineering, Operating Systems, Web Development, Machine Learning.",
    ],
  },
];

const typeLabel = {
  role: "Role",
  founder: "Founder",
  education: "Education",
};

export default function Experience() {
  const notebookEntry = NOTEBOOK_ENTRIES.find((e) => e.sectionId === "experience");

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="w-full border-y border-border/60 bg-bg py-20 md:py-28 scroll-mt-24"
    >
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        {notebookEntry && (
          <p className="font-mono text-[10px] uppercase tracking-mono-eyebrow text-nb-amber-soft mb-4">
            {notebookEntry.eyebrow}
          </p>
        )}

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent"
        >
          Career Timeline
        </motion.p>

        <motion.h2
          id="experience-title"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
          className="mt-4 text-[clamp(32px,5.2vw,56px)] font-bold tracking-tight leading-[1.05] text-text"
        >
          Experience
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
          className="mt-3 max-w-[620px] text-base sm:text-lg text-muted leading-relaxed"
        >
          Production AI work at Oracle, founder builds in parallel, and the training that got me here.
        </motion.p>

        <ol className="mt-12 relative">
          {/* Vertical line */}
          <div
            aria-hidden
            className="absolute left-[15px] sm:left-[19px] top-2 bottom-2 w-px bg-border"
          />

          {ENTRIES.map((entry, index) => {
            const Icon = entry.icon;
            return (
              <motion.li
                key={`${entry.company}-${entry.dates}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.05 * index, ease: "easeOut" }}
                className="relative pl-12 sm:pl-16 pb-10 last:pb-0"
              >
                {/* Timeline node */}
                <span
                  aria-hidden
                  className="absolute left-0 top-1 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-surface border-2 border-accent text-accent shadow-sm"
                >
                  <Icon size={16} className="sm:hidden" />
                  <Icon size={18} className="hidden sm:block" />
                </span>

                {/* Type + dates row */}
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                  <span className="text-accent">{typeLabel[entry.type]}</span>
                  <span aria-hidden>·</span>
                  <span>{entry.dates}</span>
                  {entry.location && (
                    <>
                      <span aria-hidden>·</span>
                      <span className="normal-case tracking-normal font-normal">{entry.location}</span>
                    </>
                  )}
                </div>

                {/* Role + company */}
                <h3 className="mt-2 text-xl sm:text-2xl font-semibold text-text leading-tight">
                  {entry.role}
                </h3>
                <p className="mt-1 text-sm sm:text-base text-text/85 font-medium">
                  {entry.company}
                </p>
                {entry.note && (
                  <p className="mt-1 text-xs text-muted italic">{entry.note}</p>
                )}

                {/* Bullets */}
                <ul className="mt-4 space-y-2">
                  {entry.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 text-sm sm:text-base text-muted leading-relaxed">
                      <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Stack chips */}
                {entry.stack && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {entry.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-border bg-surface/60 px-2.5 py-0.5 text-[11px] text-muted"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
