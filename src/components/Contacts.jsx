import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "./Section";
import SectionHeader from "./ui/SectionHeader";
import { Card, CardContent } from "./ui/Card";
import { Button } from "./ui";

export default function Contacts() {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [msg, setMsg] = useState("");

  const GETFORM_ENDPOINT = "https://getform.io/f/REPLACE_WITH_YOUR_ENDPOINT"; // <- put your real endpoint

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;

    // Honeypot: if filled, assume bot and show success without sending
    if (form.website.value) {
      form.reset();
      setStatus("success");
      setMsg("Thanks! I'll get back to you soon.");
      return;
    }

    setStatus("loading");
    setMsg("");

    try {
      const fd = new FormData(form);
      const res = await fetch(GETFORM_ENDPOINT, { method: "POST", body: fd });
      if (res.ok) {
        form.reset();
        setStatus("success");
        setMsg("Thanks! I'll get back to you soon.");
      } else {
        setStatus("error");
        setMsg("Hmm, something went wrong. You can also email me at abdarrahmanayyaz00@gmail.com.");
      }
    } catch {
      setStatus("error");
      setMsg("Network error. Please try again, or email me at abdarrahmanayyaz00@gmail.com.");
    }
  }

  const inputClasses = `
    mt-2 w-full rounded-lg bg-surface/50 border border-border px-4 py-3 text-text placeholder-muted
    transition-all duration-200 
    focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-accent
    hover:border-accent/50
  `.trim();

  const labelClasses = "block text-sm font-medium text-text mb-1";

  return (
    <Section id="contact" className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Get in Touch"
          title="Contact"
          description="Ready to collaborate on AI projects or need cloud support? I'd love to hear from you."
          center
        />

        <div className="mt-12 max-w-2xl mx-auto">
          {/* Contact Methods */}
          <div className="mb-8 grid sm:grid-cols-2 gap-4">
            <motion.a
              href="mailto:abdarrahmanayyaz00@gmail.com"
              className="group p-4 rounded-lg border border-border bg-surface/50 hover:bg-surface transition-colors"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <path d="m22 6-10 7L2 6"/>
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-text">Email</div>
                  <div className="text-sm text-muted">abdarrahmanayyaz00@gmail.com</div>
                </div>
              </div>
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/abdarrahman-ayyaz/"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-lg border border-border bg-surface/50 hover:bg-surface transition-colors"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center group-hover:bg-info/20 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-info">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect width="4" height="12" x="2" y="9"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-text">LinkedIn</div>
                  <div className="text-sm text-muted">Connect professionally</div>
                </div>
              </div>
            </motion.a>
          </div>

          {/* Contact Form */}
          <Card className="overflow-hidden">
            <CardContent className="p-8">
              <AnimatePresence mode="wait">
                {/* Status Messages */}
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 rounded-lg border border-success/30 bg-success/10 text-success"
                  >
                    <div className="flex items-center gap-3">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 12l2 2 4-4"/>
                        <circle cx="12" cy="12" r="9"/>
                      </svg>
                      {msg}
                    </div>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 rounded-lg border border-danger/30 bg-danger/10 text-danger"
                  >
                    <div className="flex items-start gap-3">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0">
                        <circle cx="12" cy="12" r="9"/>
                        <path d="M9 9l6 6"/>
                        <path d="M15 9l-6 6"/>
                      </svg>
                      <div className="text-sm leading-relaxed">{msg}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Honeypot (hidden from users) */}
                <input
                  type="text"
                  name="website"
                  tabIndex="-1"
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className={labelClasses}>
                      Name <span className="text-danger">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      placeholder="Your full name"
                      required
                      autoComplete="name"
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className={labelClasses}>
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      autoComplete="email"
                      inputMode="email"
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className={labelClasses}>
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    placeholder="What's this about?"
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label htmlFor="message" className={labelClasses}>
                    Message <span className="text-danger">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project or how I can help..."
                    rows={6}
                    required
                    className={`${inputClasses} resize-none`}
                  />
                </div>

                {/* Optional hidden fields for form processing */}
                <input type="hidden" name="_subject" value="New message from abdarrahman.dev" />
                <input type="hidden" name="_redirect" value="https://abdarrahman.dev/#contact" />

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <p className="text-xs text-muted">
                    Your information is secure and will only be used to respond to your inquiry.
                  </p>
                  
                  <Button
                    type="submit"
                    disabled={status === "loading"}
                    size="lg"
                    className="min-w-[200px] sm:min-w-[160px]"
                    loading={status === "loading"}
                  >
                    {status === "loading" ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Additional Contact Info */}
          <div className="mt-8 text-center">
            <p className="text-muted mb-4">
              Prefer a different method? You can also find me on:
            </p>
            <div className="flex justify-center items-center gap-6">
              <a
                href="https://github.com/AbdarrahmanAyyaz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-text transition-colors"
                title="GitHub"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/abdarrahman-ayyaz/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-text transition-colors"
                title="LinkedIn"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
