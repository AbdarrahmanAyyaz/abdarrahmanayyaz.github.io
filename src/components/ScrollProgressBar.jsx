import React, { useEffect, useState } from "react";

/**
 * Thin amber scroll-progress bar fixed to the top of the viewport.
 *
 * Sits at z-60 so it renders above the navbar (z-50) but below
 * fullscreen modals/panels. Respects prefers-reduced-motion by
 * dropping the width transition so the fill updates without any
 * springy easing.
 */
export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyReduced = () => setReducedMotion(mql.matches);
    applyReduced();
    mql.addEventListener?.("change", applyReduced);
    return () => mql.removeEventListener?.("change", applyReduced);
  }, []);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const max =
        (document.documentElement.scrollHeight || 0) -
        (window.innerHeight || 0);
      const pct = max > 0 ? (scrollTop / max) * 100 : 0;
      setProgress(Math.max(0, Math.min(100, pct)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const transitionClass = reducedMotion
    ? "transition-none"
    : "transition-[width] duration-75 ease-linear";

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none"
      aria-hidden="true"
    >
      <div
        className={`h-full bg-accent ${transitionClass}`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
