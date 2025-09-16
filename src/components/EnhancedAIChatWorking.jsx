import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Focus } from 'lucide-react';
import { initializeGeminiChat, sendMessageToGemini, warmRagFromPublic } from '../lib/gemini';
import { useChatThemeStandalone } from '../hooks/useChatTheme';
import ChatMessageSimple from './ChatMessageSimple';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import ChatThemeSelector from './ChatThemeSelector';
import profileImage from '../assets/NewPic.png';

const categoryData = {
  projects: {
    label: 'Projects',
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
    icon: '👋',
    questions: [
      "What do you do outside of work?",
      "What are your hobbies and interests?",
      "Do you do coffee chats?",
      "What causes do you care about?"
    ]
  }
};

const EnhancedAIChatWorking = ({
  onQuestionSelect,
  chatSize = 'compact',
  isFocusMode = false,
  onToggleSize,
  onToggleFocus,
  getChatIcon
}) => {
  const { currentTheme, theme, changeTheme } = useChatThemeStandalone();
  const [chatSessions, setChatSessions] = useState({});
  const [currentChatId] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const messagesEndRef = useRef(null);

  const EXPAND_REGEX = /\b(expand|details|more|deep dive)\b/i;

  // Initialize first chat with Gemini AI
  useEffect(() => {
    const initializeFirstChat = async () => {
      const hasApiKey = !!process.env.REACT_APP_GOOGLE_GEMINI_API_KEY;
      
      if (hasApiKey) {
        try {
          console.log('EnhancedAIChatWorking: API key detected, initializing chat...');
          // Warm external context (fetch + embed + cache all sources)
          await warmRagFromPublic();
          console.log('EnhancedAIChatWorking: RAG warming complete, creating chat instance...');
          const chatInstance = initializeGeminiChat();
          console.log('EnhancedAIChatWorking: Chat instance created successfully');
          const initialMessage = {
            id: 1,
            text: "**Quick answer:** Hey! I'm Abdarrahman—AI & Cloud engineer. I can walk you through my work fast.\n**Highlights:**\n• Advancely.ai: dual-AI, goals/habits, analytics\n• TriagedAI: context-aware troubleshooting\n• Brain Tumor Segmentation: BraTS, U-Net\n**Next step:** Ask about any project or say \"skills\".",
            type: 'ai',
            timestamp: new Date()
          };

          setChatSessions({
            1: {
              id: 1,
              instance: chatInstance,
              messages: [initialMessage],
              title: 'Main Chat'
            }
          });

          // Chat initialized successfully
          console.log('EnhancedAIChatWorking: Chat initialization successful');
          return;
        } catch (error) {
          console.error('EnhancedAIChatWorking: Failed to initialize chat:', error);
          console.error('EnhancedAIChatWorking: Error details:', error.message);
        }
      } else {
        console.log('EnhancedAIChatWorking: No API key detected, using demo mode');
      }
      
      // Fallback message when API key is not available
      const fallbackMessage = {
        id: 1,
        text: "Hello! I'm AI Abdarrahman 👋 I'm currently in demo mode. You can explore my portfolio sections above to learn about my projects including TriagedAI, Advancely, and my brain tumor segmentation research. Feel free to contact me directly for any questions!",
        type: 'ai',
        timestamp: new Date()
      };

      setChatSessions({
        1: {
          id: 1,
          instance: null,
          messages: [fallbackMessage],
          title: 'Main Chat'
        }
      });

      // Fallback message set
    };

    initializeFirstChat();
  }, []);

  // Auto-scroll to bottom within chat container only
  useEffect(() => {
    if (messagesEndRef.current) {
      const chatContainer = messagesEndRef.current.closest('.chat-messages');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }
  }, [chatSessions, currentChatId, isTyping]);

  const addMessage = (chatId, text, type) => {
    const newMessage = {
      id: Date.now() + Math.random(),
      text,
      type,
      timestamp: new Date()
    };

    setChatSessions(prev => ({
      ...prev,
      [chatId]: {
        ...prev[chatId],
        messages: [...(prev[chatId]?.messages || []), newMessage]
      }
    }));
  };

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    const currentChat = chatSessions[currentChatId];
    if (!currentChat) return;

    // Add user message
    addMessage(currentChatId, messageText, 'user');
    
    // Start typing indicator
    setIsTyping(true);
    
    const hasApiKey = !!process.env.REACT_APP_GOOGLE_GEMINI_API_KEY;
    const expand = EXPAND_REGEX.test(messageText);

    if (hasApiKey && currentChat.instance) {
      try {
        const response = await sendMessageToGemini(currentChat.instance, messageText, { expand });
        
        // Realistic typing simulation
        const typingDelay = Math.min(1400 + (response.length * 4), 2800);
        await new Promise(resolve => setTimeout(resolve, typingDelay));
        
        addMessage(currentChatId, response, 'ai');
      } catch (error) {
        console.error('Error getting AI response:', error);
        addMessage(currentChatId, 
          "I'm having trouble connecting right now, but I'm still here! You can explore my portfolio sections above to learn about my projects, or try asking me again in a moment.", 
          'ai'
        );
        // Error handled
      } finally {
        setIsTyping(false);
      }
    } else {
      // Demo mode - provide simple responses when no API key
      setTimeout(() => {
        let response = "Thanks for your interest! I'm currently in demo mode. You can explore my full portfolio above to learn about TriagedAI, Advancely, and my research projects. Feel free to contact me directly to discuss opportunities!";
        
        // Simple keyword-based responses for demo mode
        const lowerMessage = messageText.toLowerCase();
        if (lowerMessage.includes('triaged')) {
          response = "TriagedAI is one of my flagship projects - an AI-powered technical support system that has helped hundreds of users solve production issues! It uses Perplexity AI, React, and PostgreSQL. You can see it in my Work section above.";
        } else if (lowerMessage.includes('advancely')) {
          response = "Advancely is my AI-powered personal development platform that helps people achieve their 5-year goals through intelligent habit tracking and personalized recommendations. Check out the Work section for more details!";
        } else if (lowerMessage.includes('research') || lowerMessage.includes('brain') || lowerMessage.includes('tumor')) {
          response = "My brain tumor segmentation research achieved 98.3% accuracy using deep learning on MRI data. It's fascinating work combining AI with medical imaging - you can see the full details in my Work section!";
        } else if (lowerMessage.includes('skills') || lowerMessage.includes('technology') || lowerMessage.includes('tech')) {
          response = "I work with AI technologies like OpenAI and LangChain, frontend with React & Tailwind (4+ years), cloud platforms especially Oracle Cloud Infrastructure, and I'm currently exploring Vector DBs and RAG optimization. Check out my Skills section for the full breakdown!";
        } else if (lowerMessage.includes('collaborate') || lowerMessage.includes('work together') || lowerMessage.includes('hire')) {
          response = "I'd love to collaborate! I'm available for AI development projects, cloud infrastructure work, and frontend development. Feel free to reach out through my Contact form above or email me directly. Let's build something amazing together! 🚀";
        }
        
        addMessage(currentChatId, response, 'ai');
        setIsTyping(false);
      }, 1500);
    }
  };

  const handleCopyMessage = async (message) => {
    try {
      await navigator.clipboard.writeText(message);
      // Could add toast notification here
    } catch (error) {
      console.error('Failed to copy message:', error);
    }
  };

  const handleLikeMessage = (message) => {
    // Analytics tracking could go here
    console.log('Message appreciated:', message.substring(0, 50) + '...');
  };

  const handleCategoryClick = (categoryKey) => {
    setExpandedCategory(expandedCategory === categoryKey ? null : categoryKey);
  };

  const handleQuestionClick = (question) => {
    setExpandedCategory(null);

    // Auto-send the message directly without filling input
    setTimeout(() => {
      handleSendMessage(question);
    }, 100);
  };

  // Close expanded category when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setExpandedCategory(null);
    };

    if (expandedCategory) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [expandedCategory]);

  // Handle ESC key for focus mode
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isFocusMode) {
        onToggleFocus?.();
      }
    };

    if (isFocusMode) {
      document.addEventListener('keydown', handleEscKey);
      return () => document.removeEventListener('keydown', handleEscKey);
    }
  }, [isFocusMode, onToggleFocus]);

  const currentChat = chatSessions[currentChatId];
  const currentMessages = currentChat?.messages || [];

  return (
    <div className="enhanced-ai-chat w-full max-w-none mx-auto px-2 sm:px-4 h-full">
      <div
        className="backdrop-blur-xl border rounded-xl sm:rounded-3xl overflow-hidden shadow-2xl h-full flex flex-col
                   bg-white/80 border-gray-200
                   dark:bg-slate-800/80 dark:border-slate-700"
      >
        
        {/* Chat Header with Controls */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="chat-header p-3 sm:p-6 backdrop-blur-sm border-b relative z-20
                     bg-gray-50/80 border-gray-200
                     dark:bg-slate-800/80 dark:border-slate-700"
        >
          {/* Header Controls - Top Right */}
          <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex items-center gap-2">
            {/* Expansion Controls */}
            {(onToggleSize || onToggleFocus) && (
              <div className="flex items-center gap-1">
                {onToggleSize && (
                  <button
                    onClick={onToggleSize}
                    className="p-2 rounded-lg border transition-all duration-200
                              bg-gray-100 text-purple-600 border-purple-600/20 hover:bg-gray-200 hover:border-purple-600/40
                              dark:bg-slate-700/50 dark:text-purple-400 dark:border-purple-400/20 dark:hover:bg-slate-600/50 dark:hover:border-purple-400/40"
                    title={chatSize === 'fullscreen' ? 'Minimize chat' : 'Expand chat'}
                  >
                    {getChatIcon && React.createElement(getChatIcon(), { size: 16 })}
                  </button>
                )}
                {onToggleFocus && (
                  <button
                    onClick={onToggleFocus}
                    className="p-2 rounded-lg border transition-all duration-200
                              bg-gray-100 text-purple-600 border-purple-600/20 hover:bg-gray-200 hover:border-purple-600/40
                              dark:bg-slate-700/50 dark:text-purple-400 dark:border-purple-400/20 dark:hover:bg-slate-600/50 dark:hover:border-purple-400/40"
                    title="Focus mode"
                  >
                    <Focus size={16} />
                  </button>
                )}
              </div>
            )}

            {/* Theme Selector */}
            <ChatThemeSelector
              currentTheme={currentTheme}
              onThemeChange={changeTheme}
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div
              className="w-12 h-12 sm:w-18 sm:h-18 rounded-full border-2 border-white/20 flex-shrink-0 overflow-hidden"
              style={{
                boxShadow: `0 0 30px rgba(${theme.colors.accentRgb}, 0.4)`
              }}
            >
              <img
                src={profileImage}
                alt="Abdarrahman Ayyaz"
                className="w-full h-full object-cover"
                style={{ objectPosition: '70% 70%', transform: 'scale(1.3)' }}
              />
            </div>
            <div className="flex-1 min-w-0 pr-16 sm:pr-20">
              <h2 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-text to-text/80 bg-clip-text text-transparent truncate">
                AI Abdarrahman
              </h2>
              <p className="text-muted mt-1 text-xs sm:text-sm">
                AI & Cloud Engineer
              </p>
            </div>
          </div>
        </motion.div>

        {/* Chat Messages Area */}
        <div
          className="chat-messages flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4 relative z-10
                     bg-gradient-to-b from-gray-50/30 to-transparent
                     dark:from-slate-800/30 dark:to-transparent"
        >
          <AnimatePresence mode="popLayout">
            {currentMessages.map((message) => (
              <ChatMessageSimple
                key={message.id}
                message={message.text}
                type={message.type}
                timestamp={message.timestamp}
                onCopy={handleCopyMessage}
                onLike={handleLikeMessage}
              />
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <TypingIndicator />
          )}
          <div ref={messagesEndRef} />
        </div>


        {/* Quick Action Pills */}
        <div className="flex-shrink-0 p-3 sm:p-4 border-t border-gray-200 dark:border-slate-700">
          <div className="space-y-4">
            {/* Category Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {Object.entries(categoryData).map(([key, category]) => {

                return (
                  <motion.button
                    key={key}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCategoryClick(key);
                    }}
                    className="
                      relative px-4 py-3 rounded-lg border transition-all duration-200
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                      touch-manipulation min-h-[44px]
                      bg-gray-100 text-purple-600 border-purple-600/20
                      hover:bg-gray-200 hover:border-purple-600/40
                      dark:bg-slate-700/50 dark:text-purple-400 dark:border-purple-400/20
                      dark:hover:bg-slate-600/50 dark:hover:border-purple-400/40
                    "
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2, ease: "easeOut" }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm">{category.icon}</span>
                      <span className="font-medium text-xs sm:text-sm">{category.label}</span>
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
                    {categoryData[expandedCategory].questions.map((question, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleQuestionClick(question)}
                        className="
                          px-3 py-2.5 rounded-lg border text-sm text-left transition-all duration-200
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                          touch-manipulation min-h-[44px]
                          bg-gray-50 text-gray-700 border-purple-600/15
                          hover:bg-gray-100 hover:border-purple-600/30 hover:text-gray-900
                          dark:bg-slate-700/30 dark:text-gray-300 dark:border-purple-400/15
                          dark:hover:bg-slate-600/40 dark:hover:border-purple-400/30 dark:hover:text-white
                        "
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        {question}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Chat Input */}
        <div className="flex-shrink-0">
          <ChatInput
            onSend={handleSendMessage}
            disabled={isTyping}
            placeholder="Ask about my projects, skills, or experience..."
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
};

export default EnhancedAIChatWorking;