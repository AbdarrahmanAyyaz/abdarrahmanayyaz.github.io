import { useEffect } from "react";

export function useHideFabWhenChatVisible() {
  useEffect(() => {
    const el = document.querySelector("#chat");
    const fab = document.querySelector(".fab-chat");

    if (!el || !fab) return;

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fab.classList.add("opacity-0", "pointer-events-none");
      } else {
        fab.classList.remove("opacity-0", "pointer-events-none");
      }
    }, { threshold: 0.15 });

    io.observe(el);

    return () => io.disconnect();
  }, []);
}