import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { initializeGeminiChat, sendMessageToGemini } from '../lib/gemini';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import QuickSuggestions from './QuickSuggestions';
import QuickReplyChips from './QuickReplyChips';
import AIAvatar from './AIAvatar';

const AIPortfolioChat = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatInstance, setChatInstance] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showQuickChips, setShowQuickChips] = useState(false);
  const messagesEndRef = useRef(null);

  const initialSuggestions = [
    "Tell me about TriagedAI and the 25% MTTR improvement",
    "What AI technologies do you work with?",
    "Show me your recent projects",
    "What's your experience with cloud platforms?",
    "How can we collaborate on a project?",
    "What are you currently learning?"
  ];

  useEffect(() => {
    const initChat = async () => {
      try {
        const chat = initializeGeminiChat();
        setChatInstance(chat);
        
        // Add initial greeting
        setMessages([{
          id: 1,
          text: "Hi! I'm AI Abdarrahman 👋 I can tell you about my work in AI development, cloud engineering, and the projects I've built. What would you like to know?",
          type: 'ai',
          timestamp: new Date()
        }]);
      } catch (error) {
        console.error('Failed to initialize chat:', error);
        setMessages([{
          id: 1,
          text: "Hi! I'm having trouble connecting to my AI system right now, but you can still explore my portfolio using the navigation menu. Feel free to check out my projects and contact me directly!",
          type: 'ai',
          timestamp: new Date()
        }]);
      }
    };

    initChat();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const addMessage = (text, type) => {
    const newMessage = {
      id: Date.now(),
      text,
      type,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    // Hide suggestions after first message, show quick chips after first interaction
    setShowSuggestions(false);
    if (messages.length > 0) {
      setShowQuickChips(true);
    }

    // Add user message
    addMessage(messageText, 'user');

    // Start typing indicator
    setIsTyping(true);

    try {
      // Get AI response
      const response = await sendMessageToGemini(chatInstance, messageText);

      // Simulate realistic typing delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

      // Add AI response
      addMessage(response, 'ai');
    } catch (error) {
      console.error('Error getting AI response:', error);
      addMessage("I apologize, I'm having trouble connecting right now. You can explore my portfolio sections above or try again in a moment.", 'ai');
    } finally {
      setIsTyping(false);
    }
  };

  const handleCopyMessage = (message) => {
    navigator.clipboard.writeText(message);
    // Could add a toast notification here
  };

  const handleLikeMessage = (message) => {
    // Could track liked messages for analytics
    console.log('Message liked:', message);
  };

  return (
    <div className="ai-portfolio-chat w-full max-w-4xl mx-auto bg-surface/40 backdrop-blur-xl border border-border rounded-3xl overflow-hidden shadow-2xl">
      {/* Chat Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="chat-header p-6 bg-gradient-to-r from-surface/50 to-surface/30 backdrop-blur-sm border-b border-border"
      >
        <div className="flex items-center gap-4">
          <AIAvatar state={isTyping ? 'thinking' : 'idle'} size={64} />
          <div>
            <h2 className="text-2xl font-bold text-text">AI Abdarrahman</h2>
            <p className="text-muted">Ask me about my AI projects, development experience, or anything else!</p>
          </div>
        </div>
      </motion.div>

      {/* Chat Messages */}
      <div className="chat-messages h-96 overflow-y-auto p-6 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
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
        
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions */}
      <QuickSuggestions
        suggestions={initialSuggestions}
        onSuggestionClick={handleSendMessage}
        visible={showSuggestions && messages.length <= 1}
      />

      {/* Quick Reply Chips */}
      <QuickReplyChips
        onChipClick={handleSendMessage}
        visible={showQuickChips && messages.length > 1}
      />

      {/* Chat Input */}
      <ChatInput
        onSend={handleSendMessage}
        disabled={isTyping}
        placeholder="Ask about my projects, technical focus, or availability…"
      />
    </div>
  );
};

export default AIPortfolioChat;