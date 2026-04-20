import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const SOCIALS = [
  {
    href: "https://www.linkedin.com/in/abdarrahman-ayyaz/",
    label: "LinkedIn",
    Icon: Linkedin,
    external: true,
  },
  {
    href: "https://github.com/AbdarrahmanAyyaz",
    label: "GitHub",
    Icon: Github,
    external: true,
  },
  {
    href: "mailto:abdarrahmanayyaz00@gmail.com",
    label: "Email",
    Icon: Mail,
    external: false,
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-bg">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted text-center sm:text-left">
            © {year} Abdarrahman Ayyaz · AI deployment engineer, founder of OpenSignl.
          </p>

          <div className="flex items-center gap-1">
            {SOCIALS.map(({ href, label, Icon, external }) =>
              external ? (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="inline-flex items-center justify-center h-10 w-10 rounded-full text-muted hover:text-text hover:bg-surface/60 transition-colors"
                >
                  <Icon size={18} />
                </a>
              ) : (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  title={label}
                  className="inline-flex items-center justify-center h-10 w-10 rounded-full text-muted hover:text-text hover:bg-surface/60 transition-colors"
                >
                  <Icon size={18} />
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
