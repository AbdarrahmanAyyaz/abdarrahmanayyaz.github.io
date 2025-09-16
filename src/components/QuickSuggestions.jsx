import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Code, User, Sparkles, ArrowRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const QuickSuggestions = ({ suggestions = [], onSuggestionClick, visible = true }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!visible) return null;

  // Categorize suggestions
  const categorizedSuggestions = [
    {
      title: "Projects",
      icon: <Briefcase size={16} />,
      color: "from-purple-500 to-indigo-500",
      suggestions: [
        "Tell me about TriagedAI and how it helps with production issues",
        "What's innovative about Advancely's dual AI approach?",
        "Show me your brain tumor segmentation research findings"
      ]
    },
    {
      title: "Technical",
      icon: <Code size={16} />,
      color: "from-blue-500 to-cyan-500",
      suggestions: [
        "What's your approach to full-stack AI architecture?",
        "How do you integrate multiple AI services in production?",
        "What are you exploring in vector databases and RAG?"
      ]
    },
    {
      title: "Experience",
      icon: <User size={16} />,
      color: "from-emerald-500 to-teal-500",
      suggestions: [
        "How did you achieve 98.3% accuracy in medical AI?",
        "Can you explain your CON-FO-DI development philosophy?",
        "What's your experience with cloud platforms?"
      ]
    }
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
        className="p-3 sm:p-4 lg:p-6 border-t border-white/10 bg-gradient-to-br from-gray-800/40 to-gray-700/30 backdrop-blur-xl relative overflow-hidden"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 1px)`,
              backgroundSize: "20px 20px"
            }}
          />
        </div>

        {/* Header with toggle button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3 mb-4 relative z-10"
        >
          <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30">
            <Sparkles size={20} className="text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-white">Quick Start</h3>
            <p className="text-sm text-gray-400">Choose a topic to explore</p>
          </div>
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 sm:p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200 group touch-manipulation min-w-[40px] h-[40px] flex items-center justify-center"
          >
            <motion.div
              initial={false}
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={16} className="text-gray-400 group-hover:text-white transition-colors" />
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Categories - Collapsible */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="space-y-6 relative z-10 mt-2">
                {categorizedSuggestions.map((category, categoryIndex) => (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + categoryIndex * 0.1 }}
                    className="group"
                  >
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color}/20 border border-white/10`}>
                        <div className={`text-transparent bg-clip-text bg-gradient-to-r ${category.color}`}>
                          {category.icon}
                        </div>
                      </div>
                      <h4 className="text-sm font-medium text-gray-300">{category.title}</h4>
                      <div className="flex-1 h-px bg-gradient-to-r from-gray-600/50 to-transparent"></div>
                    </div>

                    {/* Suggestions Grid */}
                    <div className="grid gap-2 sm:gap-3">
                      {category.suggestions.map((suggestion, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.2 + categoryIndex * 0.1 + index * 0.05,
                            type: "spring",
                            stiffness: 300
                          }}
                          whileHover={{
                            scale: 1.02,
                            x: 4
                          }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => onSuggestionClick?.(suggestion)}
                          className={`
                            group relative p-3 sm:p-4 bg-gradient-to-r ${category.color}/5 hover:${category.color}/10
                            border border-white/10 hover:border-white/20
                            rounded-xl text-left transition-all duration-300
                            backdrop-blur-sm overflow-hidden touch-manipulation
                            min-h-[44px] flex items-center
                          `}
                        >
                          {/* Hover effect */}
                          <div className={`
                            absolute inset-0 bg-gradient-to-r ${category.color}/10
                            translate-x-[-100%] group-hover:translate-x-0
                            transition-transform duration-500 ease-out
                          `} />

                          <div className="relative z-10 flex items-center justify-between">
                            <span className="text-sm text-gray-200 group-hover:text-white transition-colors pr-2 leading-relaxed">
                              {suggestion}
                            </span>
                            <ArrowRight
                              size={16}
                              className={`
                                text-transparent bg-clip-text bg-gradient-to-r ${category.color}
                                opacity-0 group-hover:opacity-100
                                transform translate-x-[-8px] group-hover:translate-x-0
                                transition-all duration-300 flex-shrink-0
                              `}
                            />
                          </div>

                          {/* Subtle glow effect */}
                          <div className={`
                            absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30
                            bg-gradient-to-r ${category.color} blur-xl scale-110
                            transition-opacity duration-500 pointer-events-none -z-10
                          `} />
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                ))}

                {/* Footer hint */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-6 pt-4 border-t border-white/5 relative z-10"
                >
                  <p className="text-xs text-gray-500 text-center">
                    💡 You can also type your own questions or say "expand" for more detailed responses
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Compact state hint */}
        {!isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-2 relative z-10"
          >
            <p className="text-xs text-gray-500">
              Click to explore suggested questions or type your own above
            </p>
          </motion.div>
        )}

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * 100 + '%',
                y: Math.random() * 100 + '%',
                opacity: 0
              }}
              animate={{
                y: [Math.random() * 100 + '%', (Math.random() * 50) + '%'],
                opacity: [0, 0.3, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute w-1 h-1 bg-purple-400/50 rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuickSuggestions;