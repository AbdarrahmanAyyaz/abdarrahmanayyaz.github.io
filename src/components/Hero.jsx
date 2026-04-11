import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileText, ExternalLink } from "lucide-react";
import { Button } from "./ui";
import profileImage from "../assets/NewPic.png";

const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.12 * i,
      duration: 0.35,
      ease: "easeOut"
    }
  }),
};

export default function Hero() {
  return (
    <div className="mx-auto max-w-[760px] px-4 pt-6 sm:pt-10">
      <div className="flex flex-col items-center text-center">
        {/* Avatar */}
        <motion.img
          src={profileImage}
          alt="Abdarrahman Ayyaz"
          className="h-[104px] w-[104px] rounded-full object-cover ring-2 ring-border shadow-md sm:h-32 sm:w-32"
          style={{
            objectPosition: '70% 20%',
          }}
          sizes="(max-width: 640px) 104px, 128px"
          fetchpriority="high"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        />

        {/* Eyebrow: Name */}
        <motion.p
          className="mt-4 text-[11px] uppercase tracking-[0.2em] text-muted font-semibold"
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          Abdarrahman Ayyaz
        </motion.p>

        {/* H1: Headline */}
        <motion.h1
          className="mt-2 text-[clamp(28px,5.6vw,52px)] font-bold tracking-tight text-text leading-[1.1] max-w-[680px] text-balance"
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          Builds and ships production AI systems.
        </motion.h1>

        {/* Subline: Role line */}
        <motion.p
          className="mt-4 text-[clamp(14px,2.4vw,18px)] text-text/80 max-w-[620px] leading-relaxed"
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          Oracle AI deployment engineer. Founder of Signl. Safety eval frameworks, RAG pipelines, live SaaS.
        </motion.p>

        {/* Metric line */}
        <motion.p
          className="mt-2 text-[clamp(12px,2vw,14px)] text-muted max-w-[580px]"
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          1,000+ users served · 80% failure rate surfaced · 35% accuracy lift in production
        </motion.p>

        {/* Primary CTAs */}
        <motion.div
          className="mt-6 flex flex-wrap items-center justify-center gap-3"
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <Button asChild size="lg">
            <a
              href="/AbdarrahmansResume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download resume"
            >
              <FileText className="h-4 w-4 mr-1.5" />
              Resume
            </a>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <a
              href="https://www.opensignl.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Signl"
            >
              See Signl
              <ExternalLink className="h-4 w-4 ml-1.5" />
            </a>
          </Button>
        </motion.div>

        {/* Social row (demoted) */}
        <motion.div
          className="mt-5 flex items-center gap-4"
          custom={6}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <a
            href="https://www.linkedin.com/in/abdarrahman-ayyaz/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted hover:text-text transition-colors"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="https://github.com/AbdarrahmanAyyaz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted hover:text-text transition-colors"
          >
            <Github size={18} />
          </a>
          <a
            href="mailto:abdarrahmanayyaz00@gmail.com"
            aria-label="Email"
            className="text-muted hover:text-text transition-colors"
          >
            <Mail size={18} />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
