import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const categoryData = {
  projects: {
    label: 'Projects',
    color: 'purple',
    icon: '💼',
    questions: [
      "Tell me about TriagedAI and how it helps with production issues",
      "What's innovative about Advancely's dual AI approach?",
      "Show me your brain tumor segmentation research findings",
      "How did you achieve 98.3% accuracy in medical AI?"
    ]
  },
  technical: {
    label: 'Technical',
    color: 'blue',
    icon: '⚡',
    questions: [
      "What's your approach to full-stack AI architecture?",
      "How do you integrate multiple AI services in production?",
      "What are you exploring in vector databases and RAG?",
      "Explain your experience with OCI and cloud infrastructure"
    ]
  },
  experience: {
    label: 'Experience',
    color: 'green',
    icon: '🚀',
    questions: [
      "What's your professional background in AI development?",
      "Tell me about your CON-FO-DI development philosophy",
      "How many years have you been working with React/TypeScript?",
      "What's your experience with cloud platforms like OCI?"
    ]
  },
  about: {
    label: 'About Me',
    color: 'orange',
    icon: '👋',
    questions: [
      "What do you do outside of work?",
      "What are your hobbies and interests?",
      "Do you do coffee chats?",
      "What causes do you care about?"
    ]
  }
};

const colorClasses = {
  purple: {
    bg: 'bg-purple-500/10 hover:bg-purple-500/20',
    border: 'border-purple-500/30 hover:border-purple-500/50',
    text: 'text-purple-400',
    subBg: 'bg-purple-500/5 hover:bg-purple-500/15',
    subBorder: 'border-purple-500/20 hover:border-purple-500/40'
  },
  blue: {
    bg: 'bg-blue-500/10 hover:bg-blue-500/20',
    border: 'border-blue-500/30 hover:border-blue-500/50',
    text: 'text-blue-400',
    subBg: 'bg-blue-500/5 hover:bg-blue-500/15',
    subBorder: 'border-blue-500/20 hover:border-blue-500/40'
  },
  green: {
    bg: 'bg-green-500/10 hover:bg-green-500/20',
    border: 'border-green-500/30 hover:border-green-500/50',
    text: 'text-green-400',
    subBg: 'bg-green-500/5 hover:bg-green-500/15',
    subBorder: 'border-green-500/20 hover:border-green-500/40'
  },
  orange: {
    bg: 'bg-orange-500/10 hover:bg-orange-500/20',
    border: 'border-orange-500/30 hover:border-orange-500/50',
    text: 'text-orange-400',
    subBg: 'bg-orange-500/5 hover:bg-orange-500/15',
    subBorder: 'border-orange-500/20 hover:border-orange-500/40'
  }
};

// Update category colors for better visual distinction
const categoryColors = {
  projects: 'purple',
  technical: 'blue',
  experience: 'green',
  about: 'orange'
};

const ExpandableQuickActions = ({ onQuestionSelect }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const handleCategoryClick = (categoryKey) => {
    setExpandedCategory(expandedCategory === categoryKey ? null : categoryKey);
  };

  const handleQuestionClick = (question) => {
    onQuestionSelect(question);
    setExpandedCategory(null);

    // Focus chat input without scrolling the page
    setTimeout(() => {
      const chatInput = document.querySelector('textarea');
      if (chatInput) {
        chatInput.focus();
      }
    }, 200);
  };

  // Close expanded category when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      setExpandedCategory(null);
    };

    if (expandedCategory) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [expandedCategory]);

  return (
    <div className="space-y-4">
      {/* Category Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Object.entries(categoryData).map(([key, category]) => {
          const isExpanded = expandedCategory === key;
          const colors = colorClasses[category.color];

          return (
            <motion.button
              key={key}
              onClick={(e) => {
                e.stopPropagation();
                handleCategoryClick(key);
              }}
              className={`
                relative px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border transition-all duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                touch-manipulation min-h-[44px] pulse-button magnetic-hover
                ${colors.bg} ${colors.border} ${colors.text}
              `}
              whileHover={{
                scale: 1.05,
                rotate: 1,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center justify-center gap-2">
                <span>{category.icon}</span>
                <span className="font-medium text-sm sm:text-base">{category.label}</span>
                {/* Removed dropdown arrow for cleaner look */}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Expanded Questions */}
      <AnimatePresence>
        {expandedCategory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              {categoryData[expandedCategory].questions.map((question, index) => {
                const colors = colorClasses[categoryData[expandedCategory].color];

                return (
                  <motion.button
                    key={index}
                    onClick={() => handleQuestionClick(question)}
                    className={`
                      px-3 py-2.5 rounded-lg border text-sm text-left transition-all duration-200
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                      touch-manipulation min-h-[44px]
                      ${colors.subBg} ${colors.subBorder} text-muted hover:text-text
                    `}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {question}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpandableQuickActions;