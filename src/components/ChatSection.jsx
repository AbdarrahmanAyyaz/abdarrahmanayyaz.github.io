import { useState, useEffect } from "react";
import { ChevronDown, Maximize2, X } from "lucide-react";
import EnhancedAIChatWorking from "./EnhancedAIChatWorking";
import profileImage from "../assets/NewPic.png";

export default function ChatSection({ onQuestionSelect, onInputFocus, onInputChange }) {
  const [open, setOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  // Handle escape key to close fullscreen
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && fullscreen) {
        setFullscreen(false);
      }
    };

    if (fullscreen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [fullscreen]);

  return (
    <section className="mt-6" id="chat">
      {/* Mobile-first compact preview */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-left shadow-sm hover:shadow transition-all duration-200 sm:hidden"
      >
        <div className="flex items-center gap-3">
          <img src={profileImage} alt="" className="h-8 w-8 rounded-full object-cover" />
          <div className="flex-1">
            <p className="text-sm font-medium text-text">Let's talk about me</p>
            <p className="line-clamp-1 text-xs text-muted">
              Ask about my projects, experience, or skills…
            </p>
          </div>
          <ChevronDown
            className={`transition-transform duration-200 text-muted ${open ? "rotate-180" : ""}`}
            size={20}
          />
        </div>
      </button>

      {/* Mobile expanded view */}
      {open && (
        <div className="mt-3 rounded-xl border border-border bg-surface p-2 shadow-sm sm:hidden">
          <div className="rounded-xl border border-border p-2">
            <div className="h-[50vh]">
              <EnhancedAIChatWorking
                minimalOnMobile={true}
                onQuestionSelect={onQuestionSelect}
                onInputFocus={onInputFocus}
                onInputChange={onInputChange}
              />
            </div>
          </div>
          <button
            onClick={() => setFullscreen(true)}
            className="mt-2 w-full text-sm text-accent hover:text-accent-2 transition-colors"
          >
            Open full screen
          </button>
        </div>
      )}

      {/* Desktop view - always visible */}
      <div className="hidden sm:block">
        <div className="text-center mb-3 sm:mb-4">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-text flex items-center justify-center gap-2">
            Let's talk about me
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" title="Online"></span>
          </h3>
          <p className="text-muted text-xs sm:text-sm mt-1 sm:mt-2 px-2 max-w-sm mx-auto">
            Ask about my projects, experience, or skills
          </p>
        </div>

        <div className="relative rounded-xl border border-border bg-surface shadow-lg overflow-hidden max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto">
          {/* Desktop fullscreen button */}
          <button
            onClick={() => setFullscreen(true)}
            className="absolute top-3 right-3 z-10 p-2 rounded-lg bg-surface/80 hover:bg-surface border border-border/50 shadow-sm transition-all duration-200"
            aria-label="Open fullscreen"
          >
            <Maximize2 size={16} className="text-muted hover:text-text" />
          </button>

          <div className="h-[500px] sm:h-[550px] md:h-[600px]">
            <EnhancedAIChatWorking
              onQuestionSelect={onQuestionSelect}
              onInputFocus={onInputFocus}
              onInputChange={onInputChange}
            />
          </div>
        </div>
      </div>

      {/* Fullscreen modal */}
      {fullscreen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-3"
          onClick={() => setFullscreen(false)}
        >
          <div
            className="relative h-[85vh] w-full max-w-4xl rounded-2xl bg-surface p-2 sm:p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setFullscreen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-surface/90 hover:bg-border/20 border border-border/50 shadow-sm transition-all duration-200"
              aria-label="Close fullscreen"
            >
              <X size={18} className="text-muted hover:text-text" />
            </button>

            <div className="h-full pt-2">
              <EnhancedAIChatWorking
                onQuestionSelect={onQuestionSelect}
                onInputFocus={onInputFocus}
                onInputChange={onInputChange}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}