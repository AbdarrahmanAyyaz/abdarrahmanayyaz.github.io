import React from 'react';

// Field Notebook — Entry 01 · Hello
//
// Replacement for the legacy Hero.jsx. Consumes the "notebook" Tailwind
// design tokens (ink / shell / nb-amber, font-mono, tracking-*,
// animate-fade-up) set up by the parallel design-system pass.
//
// IMPORTANT: uses `nb-amber` (not the default `amber` palette), because
// `src/components/SignlFeature.jsx` still relies on bare `text-amber-300`.

function StatusReadout({ label, value, accent = false }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-[9px] uppercase tracking-mono-label text-ink-faint">
        {label}
      </span>
      <span
        className={`font-mono text-xs ${accent ? 'text-nb-amber' : 'text-ink'}`}
      >
        {value}
      </span>
    </div>
  );
}

export default function NotebookHero() {
  return (
    <section
      className="notebook-shell mx-auto flex w-full max-w-[820px] flex-col px-6 pt-8 pb-12 md:min-h-[80vh] md:justify-center md:px-16 md:pt-0 md:pb-16"
    >
      {/* Eyebrow */}
      <p
        className="animate-fade-up font-mono text-[10px] uppercase tracking-mono-eyebrow text-nb-amber-soft"
        style={{ animationDelay: '0s' }}
      >
        {'→ Entry 01 · Hello'}
      </p>

      {/* Headline */}
      <h1
        className="animate-fade-up mt-6 max-w-[20ch] text-[32px] font-medium leading-[1.12] tracking-tight-display text-ink md:text-[44px]"
        style={{ animationDelay: '0.1s' }}
      >
        Building the AI I wish I could use.
      </h1>

      {/* Subhead para 1 */}
      <p
        className="animate-fade-up mt-8 max-w-[56ch] text-[17px] leading-[1.6] text-ink-muted"
        style={{ animationDelay: '0.2s' }}
      >
        By day I build AI tools at Oracle. By night I&apos;m building
        agentic systems like{' '}
        <span className="text-nb-amber">OpenSignl</span> &mdash; a research
        assistant for creators, figuring it out as I go.
      </p>

      {/* Subhead para 2 */}
      <p
        className="animate-fade-up mt-5 max-w-[56ch] text-[17px] leading-[1.6] text-ink-muted"
        style={{ animationDelay: '0.3s' }}
      >
        If any of this resonates &mdash; a role, a project, a
        &ldquo;could this work&rdquo; &mdash; I&apos;d love to hear.{' '}
        <a href="#contact" className="nb-link text-ink">
          Drop me a line <span className="nb-arrow">&#8599;</span>
        </a>
      </p>

      {/* Status readouts */}
      <div
        className="animate-fade-up mt-12 grid grid-cols-1 gap-8 border-t border-ink-ghost pt-8 sm:grid-cols-1 md:grid-cols-3"
        style={{ animationDelay: '0.4s' }}
      >
        <StatusReadout label="Location" value="sf bay area" />
        <StatusReadout label="At work" value="oracle oci" />
        <StatusReadout label="Status" value="open to talk" accent />
      </div>
    </section>
  );
}
