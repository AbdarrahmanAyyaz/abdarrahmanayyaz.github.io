import React from "react";
import { motion } from "framer-motion";
import useSkillsFilterStore from "../store/useSkillsFilter";

const LEVEL_LABEL = {
  5: "Expert",
  4: "Advanced",
  3: "Proficient",
  2: "Learning",
  1: "Beginner",
};

const LEVEL_DOT = {
  5: "bg-emerald-500",
  4: "bg-accent",
  3: "bg-sky-500",
  2: "bg-muted",
  1: "bg-muted",
};

function formatLastUsed(lastUsed) {
  if (!lastUsed) return null;
  const date = new Date(lastUsed);
  const now = new Date();
  const months =
    (now.getFullYear() - date.getFullYear()) * 12 +
    (now.getMonth() - date.getMonth());
  if (months <= 0) return "Using now";
  if (months < 3) return "Recent";
  if (months < 12) return `${months}mo ago`;
  const years = Math.floor(months / 12);
  return years === 1 ? "1yr ago" : `${years}yrs ago`;
}

export default function SkillCard({ skill, isSelected }) {
  const toggleSkill = useSkillsFilterStore((state) => state.toggleSkill);
  const Icon = skill.icon;
  const iconColor = skill.iconColor;

  const handleClick = () => {
    toggleSkill(skill.id);
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      layout
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`group relative flex h-full w-full flex-col items-start gap-3 rounded-xl border p-4 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
        isSelected
          ? "border-accent bg-accent/10 shadow-soft"
          : "border-border bg-surface hover:border-accent/40 hover:shadow-soft"
      }`}
      aria-pressed={isSelected}
      aria-label={`${skill.name} — ${LEVEL_LABEL[skill.level]}`}
    >
      <div className="flex w-full items-center justify-between">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-bg/60 border border-border"
          aria-hidden
        >
          {Icon ? (
            <Icon size={22} style={iconColor ? { color: iconColor } : undefined} />
          ) : (
            <span className="text-sm font-semibold text-muted">
              {skill.name.slice(0, 2).toUpperCase()}
            </span>
          )}
        </div>

        <div
          className="flex items-center gap-1.5"
          aria-label={`Level ${skill.level} of 5`}
        >
          <span
            className={`h-2 w-2 rounded-full ${LEVEL_DOT[skill.level] || "bg-muted"}`}
            aria-hidden
          />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted">
            {LEVEL_LABEL[skill.level]}
          </span>
        </div>
      </div>

      <div className="min-w-0 w-full">
        <p className="truncate text-sm font-semibold text-text">{skill.name}</p>
        <p className="mt-0.5 text-xs text-muted">
          {skill.years ? `${skill.years}+ yrs` : ""}
          {skill.years && skill.lastUsed ? " · " : ""}
          {formatLastUsed(skill.lastUsed)}
        </p>
      </div>
    </motion.button>
  );
}
