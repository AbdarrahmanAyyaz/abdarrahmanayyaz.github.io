import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileText, ExternalLink, ArrowRight } from "lucide-react";
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
    <div className="mx-auto max-w-[760px] px-4">
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
          className="mt-4 text-[13px] uppercase tracking-[0.25em] text-accent/90 font-bold"
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          Abdarrahman Ayyaz
        </motion.p>

        {/* H1: Headline */}
        <motion.h1
          className="mt-3 text-[clamp(36px,6.5vw,72px)] font-black tracking-tight text-text leading-[1.05] max-w-[760px] text-balance"
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
          Founder of OpenSignl. AI deployment engineer at Oracle. Safety eval frameworks and live SaaS.
        </motion.p>

        {/* Metric line */}
        <motion.p
          className="mt-2 text-[clamp(12px,2vw,14px)] text-muted max-w-[580px]"
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          1,000+ users served · 80% failure rate surfaced
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
              aria-label="Visit OpenSignl"
            >
              See OpenSignl
              <ExternalLink className="h-4 w-4 ml-1.5" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="#work" aria-label="Jump to the full project list">
              See All Work
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </a>
          </Button>
        </motion.div>

        {/* Social row */}
        <motion.div
          className="mt-6 flex items-center gap-2"
          custom={6}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <a
            href="https://www.linkedin.com/in/abdarrahman-ayyaz/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            title="LinkedIn"
            className="inline-flex items-center justify-center h-11 w-11 rounded-full text-muted hover:text-text hover:bg-surface/60 border border-transparent hover:border-border transition-all"
          >
            <Linkedin size={22} />
          </a>
          <a
            href="https://github.com/AbdarrahmanAyyaz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            title="GitHub"
            className="inline-flex items-center justify-center h-11 w-11 rounded-full text-muted hover:text-text hover:bg-surface/60 border border-transparent hover:border-border transition-all"
          >
            <Github size={22} />
          </a>
          <a
            href="mailto:abdarrahmanayyaz00@gmail.com"
            aria-label="Email Abdarrahman"
            title="Email"
            className="inline-flex items-center justify-center h-11 w-11 rounded-full text-muted hover:text-text hover:bg-surface/60 border border-transparent hover:border-border transition-all"
          >
            <Mail size={22} />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
