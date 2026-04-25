import React from "react";
import { ChevronDown } from "lucide-react";
import { ENTRIES } from "../../data/entries";

/**
 * SectionTransition — between-section wayfinding cue.
 *
 * Renders a centered "next · entry XX · name" mono label + a clickable
 * chevron that smooth-scrolls to the next entry's section. Signals
 * "scroll down" and previews what's coming so users always know where
 * they're going next.
 *
 * Place between sections in App.jsx, e.g.:
 *   <Home />
 *   <SectionTransition toEntryId="signl" />
 *   <SignlFeature />
 */
export default function SectionTransition({ toEntryId }) {
  const entry = ENTRIES.find((e) => e.sectionId === toEntryId);
  if (!entry) return null;

  const label = `Go to Entry ${entry.num}: ${entry.name}`;

  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-6 py-10 sm:py-12">
      <a
        href={`#${toEntryId}`}
        aria-label={label}
        className="group inline-flex flex-col items-center gap-2 rounded-md px-3 py-2 text-muted transition-colors duration-200 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] group-hover:text-accent">
          → go to entry {entry.num} · {entry.name.toLowerCase()}
        </span>
        <ChevronDown
          className="h-5 w-5 animate-bounce"
          aria-hidden="true"
        />
      </a>
    </div>
  );
}
