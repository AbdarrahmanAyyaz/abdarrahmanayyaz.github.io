import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { initializeGeminiChat, sendMessageToGemini, createNewChatSession } from '../lib/gemini';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import QuickSuggestions from './QuickSuggestions';
import PersonalizedAvatar from './PersonalizedAvatar';
import ChatSessionManager from './ChatSessionManager';

const EnhancedAIChat = () => {
  const [chatSessions, setChatSessions] = useState({});
  const [currentChatId, setCurrentChatId] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState({});
  const [avatarState, setAvatarState] = useState('idle');
  const messagesEndRef = useRef(null);

  const professionalSuggestions = [
    "Tell me about TriagedAI and how it helps with production issues",
    "What's innovative about Advancely's dual AI approach?", 
    "Show me your brain tumor segmentation research findings",
    "How did you achieve 98.3% accuracy in medical AI?",
    "What's your approach to full-stack AI architecture?",
    "Can you explain your CON-FO-DI development philosophy?",
    "What are you exploring in vector databases and RAG?",
    "How do you integrate multiple AI services in production?"
  ];

  // Initialize first chat with enhanced greeting
  useEffect(() => {
    const initializeFirstChat = async () => {
      try {
        const chatInstance = initializeGeminiChat();
        const initialMessage = {
          id: 1,
          text: "Hello! I'm AI Abdarrahman 👋 I'm excited to share my work in AI development and cloud engineering. I've built some fascinating projects including TriagedAI (intelligent troubleshooting with Perplexity AI), Advancely (comprehensive personal development platform), and conducted research in medical AI achieving 98.3% accuracy in brain tumor segmentation. Each project showcases different aspects of modern AI application development and research. What would you like to explore first?",
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

        setShowSuggestions({ 1: true });
        setAvatarState('greeting');
        setTimeout(() => setAvatarState('idle'), 2000);
      } catch (error) {
        console.error('Failed to initialize chat:', error);
        const errorMessage = {
          id: 1,
          text: "Hello! I'm having trouble connecting to my AI system right now, but I'm still here to help! You can explore my portfolio sections above to learn about my projects including TriagedAI, Advancely, and my brain tumor segmentation research. Feel free to contact me directly or try the chat again in a moment.",
          type: 'ai',
          timestamp: new Date()
        };

        setChatSessions({
          1: {
            id: 1,
            instance: null,
            messages: [errorMessage],
            title: 'Main Chat'
          }
        });
      }
    };

    initializeFirstChat();
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatSessions, currentChatId, isTyping]);

  const handleChatChange = async (chatId, isNewChat) => {
    setCurrentChatId(chatId);

    if (isNewChat && !chatSessions[chatId]) {
      try {
        const chatInstance = createNewChatSession();
        const initialMessage = {
          id: Date.now(),
          text: "Ready for a fresh conversation! I can discuss any of my projects in detail - from the technical architecture of TriagedAI to the research methodology behind my brain tumor segmentation work. What interests you most?",
          type: 'ai',
          timestamp: new Date()
        };

        setChatSessions(prev => ({
          ...prev,
          [chatId]: {
            id: chatId,
            instance: chatInstance,
            messages: [initialMessage],
            title: `Chat ${Object.keys(prev).length + 1}`
          }
        }));

        setShowSuggestions(prev => ({ ...prev, [chatId]: true }));
        setAvatarState('excited');
        setTimeout(() => setAvatarState('idle'), 1500);
      } catch (error) {
        console.error('Failed to create new chat:', error);
      }
    }
  };

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

    // Hide suggestions after user interaction
    setShowSuggestions(prev => ({ ...prev, [currentChatId]: false }));
    
    // Add user message
    addMessage(currentChatId, messageText, 'user');
    
    // Set avatar to thinking and start typing
    setAvatarState('thinking');
    setIsTyping(true);
    
    try {
      const response = await sendMessageToGemini(currentChat.instance, messageText);
      
      // Realistic typing simulation
      const typingDelay = Math.min(2000 + (response.length * 8), 4000);
      await new Promise(resolve => setTimeout(resolve, typingDelay));
      
      setAvatarState('responding');
      addMessage(currentChatId, response, 'ai');
      
      // Return to idle state
      setTimeout(() => setAvatarState('idle'), 1000);
    } catch (error) {
      console.error('Error getting AI response:', error);
      addMessage(currentChatId, 
        "I'm having trouble connecting right now, but I'm still here! You can explore my portfolio sections above to learn about my projects, or try asking me again in a moment.", 
        'ai'
      );
      setAvatarState('idle');
    } finally {
      setIsTyping(false);
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

  const currentChat = chatSessions[currentChatId];
  const currentMessages = currentChat?.messages || [];

  return (
    <div className="enhanced-ai-chat w-full max-w-5xl mx-auto">
      <div className="bg-gradient-to-br from-surface/95 via-surface/90 to-surface/95 backdrop-blur-xl border border-border/50 rounded-3xl overflow-hidden shadow-2xl shadow-accent/10">
        
        {/* Multi-Chat Session Manager */}
        <ChatSessionManager 
          onChatChange={handleChatChange}
          currentChatId={currentChatId}
          maxChats={3}
        />

        {/* Enhanced Chat Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="chat-header p-6 bg-gradient-to-r from-surface/60 via-accent/10 to-surface/60 backdrop-blur-sm border-b border-border/30"
        >
          <div className="flex items-center gap-4">
            <PersonalizedAvatar 
              state={isTyping ? 'thinking' : avatarState} 
              size={72} 
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-text to-text/80 bg-clip-text text-transparent">
                AI Abdarrahman
              </h2>
              <p className="text-muted mt-1">
                AI Developer & Cloud Engineer • Ask me about my projects, research, or technical expertise
              </p>
              <div className="flex items-center gap-4 mt-2 text-xs text-muted">
                <span className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  Online & Ready
                </span>
                <span>Powered by Google Gemini Pro</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Chat Messages Area */}
        <div className="chat-messages h-[500px] overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-surface/20 to-surface/10">
          <AnimatePresence mode="popLayout">
            {currentMessages.map((message) => (
              <ChatMessage
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
            <div className="flex gap-3 mb-4">
              <PersonalizedAvatar state="thinking" size={32} />
              <TypingIndicator />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Enhanced Quick Suggestions */}
        <QuickSuggestions 
          suggestions={professionalSuggestions}
          onSuggestionClick={handleSendMessage}
          visible={showSuggestions[currentChatId] && currentMessages.length <= 1}
        />

        {/* Chat Input */}
        <ChatInput 
          onSend={handleSendMessage}
          disabled={isTyping}
          placeholder="Ask about my projects, technical expertise, or research..."
        />
      </div>
    </div>
  );
};

export default EnhancedAIChat;