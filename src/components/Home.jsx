import React, { useState } from "react";
import { motion } from "framer-motion";
import { Maximize2, Minimize2 } from "lucide-react";
import Section from "./Section";
import ScrollCue from "./ScrollCue";
import EnhancedAIChatWorking from "./EnhancedAIChatWorking";
import TypewriterText from "./TypewriterText";
import profileImage from "../assets/NewPic.png";

const fadeUp = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.2 * i,
      duration: 0.6,
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }),
};

const chatBubbleSpring = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: 0.8,
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  }
};

export default function Home() {
  const [chatSize, setChatSize] = useState('compact'); // 'compact', 'expanded', 'fullscreen'
  const [isFocusMode, setIsFocusMode] = useState(false);

  const handleQuestionSelect = (question) => {
    // This will be passed to the chat component to auto-fill the input
    const event = new CustomEvent('autoFillQuestion', { detail: question });
    window.dispatchEvent(event);
  };

  const toggleChatSize = () => {
    const sizes = ['compact', 'expanded', 'fullscreen'];
    const currentIndex = sizes.indexOf(chatSize);
    const nextIndex = (currentIndex + 1) % sizes.length;
    setChatSize(sizes[nextIndex]);
  };

  const toggleFocusMode = () => {
    setIsFocusMode(!isFocusMode);
  };

  const getChatHeight = () => {
    switch (chatSize) {
      case 'compact':
        return window.innerWidth < 768 ? '400px' : '500px'; // Shorter on mobile
      case 'expanded':
        return window.innerWidth < 768 ? '60vh' : '70vh';
      case 'fullscreen':
        return 'calc(100vh - 120px)';
      default:
        return window.innerWidth < 768 ? '400px' : '500px';
    }
  };

  const getChatIcon = () => {
    return chatSize === 'fullscreen' ? Minimize2 : Maximize2;
  };

  return (
    <Section
      id="home"
      className="relative w-full min-h-[95vh] text-text overflow-hidden animated-mesh"
    >
      {/* Subtle grid pattern - theme aware with reduced opacity in light mode */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--text) / 0.06) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
          WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 85%)",
          maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 85%)",
        }}
      />
      
      {/* Subtle radial spotlight behind name for light mode */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px]"
        style={{ 
          background: `radial-gradient(ellipse at center, hsl(var(--accent) / 0.04) 0%, transparent 60%)` 
        }} 
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8 md:pt-24 md:pb-12 lg:pt-32 lg:pb-16 flex flex-col items-center justify-center min-h-[95vh]">

        {/* Hero Section - Centered - Hide in focus mode */}
        {!isFocusMode && (
          <div className="text-center space-y-6 mb-8">

          {/* Professional Photo */}
          <motion.div
            className="flex justify-center"
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <div className="relative">
              {/* Animated gradient border */}
              <div className="absolute -inset-1 gradient-border rounded-full opacity-75"></div>

              {/* Profile image with hover effect */}
              <motion.img
                src={profileImage}
                alt="Abdarrahman Ayyaz"
                className="relative w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full object-cover shadow-2xl"
                style={{ objectPosition: '70% 20%', transform: 'scale(1.6)' }}
                whileHover={{ scale: 1.65 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />

              {/* Soft glow effect */}
              <div className="absolute inset-0 rounded-full shadow-[0_0_40px_rgba(139,92,246,0.4)] pointer-events-none"></div>
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-text"
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            Abdarrahman Ayyaz
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg sm:text-xl md:text-2xl font-semibold text-muted"
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <TypewriterText
              texts={["AI & Cloud Engineer", "Problem Solver", "Full Stack Developer"]}
              className="text-muted"
            />
          </motion.p>

        </div>
        )}

        {/* Chat Interface - Full Width */}
        <motion.div
          className={`w-full mx-auto px-4 md:px-2 lg:px-0 transition-all duration-500 ${
            isFocusMode ? 'fixed inset-0 z-50 bg-black/80 flex items-center justify-center' : 'max-w-2xl md:max-w-3xl lg:max-w-4xl relative'
          }`}
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          {/* Chat Section Header - Only show if not in focus mode */}
          {!isFocusMode && (
            <div className="text-center mb-4">
              <h3 className="text-xl font-semibold text-text">
                Ask me something
              </h3>
              <p className="text-muted text-sm mt-2">
                Chat about my projects, experience, or technical expertise
              </p>
            </div>
          )}

          {/* Chat Component */}
          <motion.div
            className="glassmorphism border border-border rounded-lg sm:rounded-2xl overflow-hidden shadow-2xl chat-glow-pulse"
            variants={chatBubbleSpring}
            initial="hidden"
            animate="show"
            style={{
              backdropFilter: 'blur(15px)',
              background: 'rgba(255, 255, 255, 0.05)',
              borderColor: 'rgba(139, 92, 246, 0.3)',
              height: isFocusMode ? '90vh' : getChatHeight(),
              transition: "height 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              maxWidth: isFocusMode ? '800px' : '100%',
              width: '100%'
            }}
          >
            <div className={`flex flex-col h-full transition-all duration-300`}>
              <EnhancedAIChatWorking
                onQuestionSelect={handleQuestionSelect}
                chatSize={chatSize}
                isFocusMode={isFocusMode}
                onToggleSize={toggleChatSize}
                onToggleFocus={toggleFocusMode}
                getChatIcon={getChatIcon}
              />
            </div>
          </motion.div>

          {/* Focus Mode ESC hint */}
          {isFocusMode && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute top-4 right-4 text-white/70 text-sm"
            >
              Press ESC to exit focus mode
            </motion.div>
          )}
        </motion.div>

        {/* Scroll Cue */}
        <motion.div
          className="mt-16 sm:mt-20 flex justify-center pb-4 sm:pb-0"
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <ScrollCue />
        </motion.div>

      </div>
    </Section>
  );
}