import { motion } from "framer-motion";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import TypewriterText from "./TypewriterText";
import profileImage from "../assets/NewPic.png";

const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 * i,
      duration: 0.35,
      ease: "easeOut"
    }
  }),
};

export default function Hero() {
  const actionButtons = [
    { href: "/AbdarrahmanAyyazResume.pdf", label: "Resume", icon: FileText },
    { href: "https://www.linkedin.com/in/abdarrahman-ayyaz/", label: "LinkedIn", icon: Linkedin },
    { href: "https://github.com/AbdarrahmanAyyaz", label: "GitHub", icon: Github },
    { href: "mailto:abdarrahmanayyaz00@gmail.com", label: "Email", icon: Mail },
  ];

  return (
    <div className="mx-auto max-w-[680px] px-4 pt-6 sm:pt-10">
      <div className="flex flex-col items-center text-center">
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
        <motion.h1
          className="mt-3 text-[clamp(20px,4.8vw,32px)] font-bold tracking-tight text-text"
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          Abdarrahman Ayyaz
        </motion.h1>
        <motion.p
          className="mt-1 text-[clamp(13px,3.7vw,16px)] text-muted"
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <TypewriterText
            texts={["AI & Cloud Engineer", "Full Stack Developer", "Problem Solver", "ML Enthusiast"]}
            className="text-muted"
            typingSpeed={80}
            deletingSpeed={40}
            pauseTime={2500}
          />
        </motion.p>

        <motion.div
          className="mt-3 flex items-center gap-3"
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          {actionButtons.map((button) => (
            <a
              key={button.label}
              href={button.href}
              target={button.href.startsWith('http') ? '_blank' : '_self'}
              rel={button.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={button.label}
              className="h-11 w-11 grid place-items-center rounded-full bg-surface/80 dark:bg-surface/90 shadow hover:shadow-md transition-all duration-200 border border-border/50"
            >
              <button.icon size={18} className="text-text" />
            </a>
          ))}
        </motion.div>
      </div>
    </div>
  );
}