import React, { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Maximize2, Minimize2, Github, Linkedin, Mail, FileText } from "lucide-react";
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

function Home() {
  const [chatSize, setChatSize] = useState(() => {
    // Initialize from localStorage, default to 'compact'
    return localStorage.getItem('chatSize') || 'compact';
  }); // 'compact', 'expanded', 'fullscreen'
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [hasUserTyped, setHasUserTyped] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 430);

  const handleQuestionSelect = useCallback((question) => {
    // This will be passed to the chat component to auto-fill the input
    const event = new CustomEvent('autoFillQuestion', { detail: question });
    window.dispatchEvent(event);
  }, []);

  const toggleChatSize = useCallback(() => {
    const sizes = ['compact', 'expanded', 'fullscreen'];
    const currentIndex = sizes.indexOf(chatSize);
    const nextIndex = (currentIndex + 1) % sizes.length;
    const newSize = sizes[nextIndex];
    setChatSize(newSize);
    localStorage.setItem('chatSize', newSize);
  }, [chatSize]);

  const toggleFocusMode = useCallback(() => {
    setIsFocusMode(!isFocusMode);
  }, [isFocusMode]);

  const getChatHeight = () => {
    const isLandscape = window.innerHeight < window.innerWidth && window.innerHeight < 600;

    switch (chatSize) {
      case 'compact':
        if (isLandscape) return '75vh'; // More height in landscape
        return window.innerWidth < 640 ? '50vh' : window.innerWidth < 768 ? '55vh' : '500px';
      case 'expanded':
        if (isLandscape) return '85vh'; // More height in landscape
        return window.innerWidth < 640 ? '65vh' : window.innerWidth < 768 ? '70vh' : '75vh';
      case 'fullscreen':
        return 'calc(100vh - 60px - env(safe-area-inset-top) - env(safe-area-inset-bottom))';
      default:
        if (isLandscape) return '75vh';
        return window.innerWidth < 640 ? '50vh' : window.innerWidth < 768 ? '55vh' : '500px';
    }
  };

  const getChatIcon = () => {
    return chatSize === 'fullscreen' ? Minimize2 : Maximize2;
  };

  // Auto-expand handlers
  const handleChatInputFocus = () => {
    const isMobileDevice = window.innerWidth < 768;

    if (chatSize === 'compact') {
      // On mobile, go to fullscreen for better typing experience
      const targetSize = isMobileDevice ? 'fullscreen' : 'expanded';
      setChatSize(targetSize);
      localStorage.setItem('chatSize', targetSize);
    }
  };

  const handleChatInputChange = (value) => {
    if (value.length > 0 && !hasUserTyped) {
      setHasUserTyped(true);
      const isMobileDevice = window.innerWidth < 768;

      if (chatSize === 'compact') {
        // On mobile, jump to fullscreen when user starts typing
        const targetSize = isMobileDevice ? 'fullscreen' : 'expanded';
        setChatSize(targetSize);
        localStorage.setItem('chatSize', targetSize);
      }
    }
  };

  // Handle window resize for mobile detection
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 430);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Section
      id="home"
      className="relative w-full min-h-[95vh] text-text overflow-hidden animated-mesh floating-orbs"
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

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-6 sm:pt-20 sm:pb-8 md:pt-24 md:pb-12 lg:pt-32 lg:pb-16 flex flex-col items-center justify-center min-h-[95vh]">

        {/* Hero Section - Responsive Layout - Hide in focus mode */}
        {!isFocusMode && (
          <div className="text-center md:text-center space-y-4 sm:space-y-6 md:space-y-8 mb-6 sm:mb-8 md:mb-10">

          {/* Profile Section - Responsive Layout */}
          <motion.div
            className="flex flex-col md:flex-col items-center justify-center"
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            {/* Professional Photo Container */}
            <div className="profile-image-container flex justify-center md:justify-center">
              <div className="relative">
                {/* Animated gradient border */}
                <div className="absolute -inset-1 gradient-border rounded-full opacity-75"></div>

                {/* Profile image with hover effect - Enhanced responsiveness */}
                <motion.img
                  src={profileImage}
                  alt="Abdarrahman Ayyaz"
                  className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 xl:w-44 xl:h-44 rounded-full profile-image-responsive shadow-2xl"
                  style={{
                    objectPosition: '70% 20%',
                    transform: isMobile ? 'scale(1.3)' : 'scale(1.6)'
                  }}
                  whileHover={{
                    scale: isMobile ? 1.35 : 1.65
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />

                {/* Enhanced glow effect */}
                <div className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(99,102,241,0.5)] pointer-events-none"></div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="profile-info space-y-3 sm:space-y-4 md:space-y-6 mt-4 sm:mt-6 md:mt-8">
              {/* Name */}
              <motion.h1
                className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-text px-2"
                custom={1}
                variants={fadeUp}
                initial="hidden"
                animate="show"
              >
                Abdarrahman Ayyaz
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="text-sm sm:text-base md:text-xl lg:text-2xl font-semibold text-muted mt-2 sm:mt-3 md:mt-4 px-2"
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

              {/* Quick Action Buttons */}
              <motion.div
                className="flex justify-center md:justify-center gap-2 sm:gap-3 mt-4 sm:mt-6 md:mt-8 px-2"
                custom={3}
                variants={fadeUp}
                initial="hidden"
                animate="show"
              >
                {[
                  { icon: FileText, label: "Resume", action: () => window.open('/AbdarrahmanAyyazResume.pdf', '_blank') },
                  { icon: Linkedin, label: "LinkedIn", action: () => window.open('https://www.linkedin.com/in/abdarrahman-ayyaz/', '_blank') },
                  { icon: Github, label: "GitHub", action: () => window.open('https://github.com/AbdarrahmanAyyaz', '_blank') },
                  { icon: Mail, label: "Email", action: () => window.location.href = 'mailto:abdarrahmanayyaz00@gmail.com' }
                ].map((item, index) => (
                  <motion.button
                    key={item.label}
                    onClick={item.action}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 quick-action-btn group relative"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.5 + index * 0.1, duration: 0.5, ease: "backOut" }}
                    whileHover={{
                      scale: 1.1,
                      y: -5,
                      boxShadow: "0 20px 25px -5px rgba(139, 92, 246, 0.4), 0 10px 10px -5px rgba(139, 92, 246, 0.04)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    title={item.label}
                    aria-label={item.label}
                  >
                    <item.icon size={18} />
                    {/* Responsive Tooltip */}
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      {item.label}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            </div>
          </motion.div>

        </div>
        )}

        {/* Chat Interface - Full Width */}
        <motion.div
          className={`w-full mx-auto px-2 sm:px-4 md:px-2 lg:px-0 transition-all duration-500 ${
            isFocusMode ? 'fixed inset-0 z-50 bg-black/80 dark:bg-black/90 flex items-center justify-center p-4' : 'max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl relative'
          }`}
          style={{
            paddingBottom: isFocusMode || chatSize === 'fullscreen'
              ? 'max(1rem, env(safe-area-inset-bottom))'
              : undefined
          }}
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          {/* Chat Section Header - Only show if not in focus mode */}
          {!isFocusMode && (
            <div className="text-center mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-text flex items-center justify-center gap-2">
                Let's talk about me
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse online-indicator" title="Online"></span>
              </h3>
              <p className="text-muted text-xs sm:text-sm mt-1 sm:mt-2 px-2 max-w-sm mx-auto">
                Ask about my projects, experience, or skills
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
              height: isFocusMode ? 'calc(100vh - 2rem)' : getChatHeight(),
              transition: "height 220ms ease-out, box-shadow 220ms ease-out",
              maxWidth: isFocusMode ? '100%' : '100%',
              width: '100%',
              boxShadow: chatSize === 'expanded' || chatSize === 'fullscreen'
                ? '0 25px 50px -12px rgba(139, 92, 246, 0.25)'
                : '0 10px 25px -5px rgba(139, 92, 246, 0.1)'
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
                onInputFocus={handleChatInputFocus}
                onInputChange={handleChatInputChange}
              />
            </div>
          </motion.div>

          {/* Focus Mode ESC hint */}
          {isFocusMode && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute top-4 right-4 text-white/70 dark:text-white/80 text-sm"
            >
              Press ESC to exit focus mode
            </motion.div>
          )}
        </motion.div>

        {/* Work Preview Section */}
        {!isFocusMode && (
          <motion.div
            className="work-preview mt-8 sm:mt-12 w-full max-w-4xl"
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <h2>See My Impact</h2>
            <p>From solving enterprise production issues to serving thousands with AI solutions</p>

            <button className="explore-work-btn" onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore My Work →
            </button>

            <div className="impact-stats">
              <div className="stat">
                <span className="number">3+</span>
                <span className="label">AI Products</span>
              </div>
              <div className="stat">
                <span className="number">1K+</span>
                <span className="label">Users Impacted</span>
              </div>
              <div className="stat">
                <span className="number">60%</span>
                <span className="label">Efficiency Gains</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Scroll Cue */}
        {!isFocusMode && (
          <motion.div
            className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 flex justify-center pb-4 sm:pb-0"
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <ScrollCue />
          </motion.div>
        )}


        {/* Mobile Contact FAB */}
        <button
          className="fab-resume group"
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          aria-label="Contact"
        >
          💬
          {/* Responsive Tooltip */}
          <div className="absolute bottom-full mb-2 right-0 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
            Contact
            <div className="absolute top-full right-2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
          </div>
        </button>

      </div>
    </Section>
  );
}

export default React.memo(Home);