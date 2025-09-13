import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const SimpleAIChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm AI Abdarrahman 👋 I can tell you about my work in AI development, cloud engineering, and the projects I've built - including TriagedAI which has helped hundreds of users solve production issues. What would you like to know?",
      type: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickSuggestions = [
    "Tell me about TriagedAI",
    "What projects have you built?", 
    "What technologies do you use?",
    "How can we work together?"
  ];

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: messageText,
      type: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response with basic responses
    setTimeout(() => {
      let response = "Thanks for your question! I'm currently setting up my full AI capabilities. In the meantime, you can explore my projects in the Work section above, or contact me directly to discuss opportunities!";
      
      // Simple keyword-based responses
      const lowerMessage = messageText.toLowerCase();
      if (lowerMessage.includes('triaged')) {
        response = "TriagedAI is one of my key projects - it's an AI-powered technical support companion that has helped hundreds of users solve complex production issues! It uses OpenAI, React, and LangChain on Oracle Cloud Infrastructure. You can see it live at triagedai.com.";
      } else if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
        response = "I've built several exciting projects! TriagedAI (helped hundreds of users with production issues), Advancely (AI-powered success dashboard), and a Sales Professional Portfolio. You can see all of them in my Work section above, with live demos and code when available.";
      } else if (lowerMessage.includes('technology') || lowerMessage.includes('tech') || lowerMessage.includes('skill')) {
        response = "I work with AI technologies like OpenAI and LangChain, frontend with React & Tailwind (4+ years), cloud platforms especially Oracle Cloud Infrastructure, and I'm currently learning Vector DBs and RAG optimization. Check out my Skills section for the full breakdown!";
      } else if (lowerMessage.includes('collaborate') || lowerMessage.includes('work together') || lowerMessage.includes('hire')) {
        response = "I'd love to collaborate! I'm available for AI development projects, cloud infrastructure work, and frontend development. Feel free to reach out through my Contact form above or email me directly. Let's build something amazing together! 🚀";
      }

      const aiMessage = {
        id: Date.now() + 1,
        text: response,
        type: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-surface/40 backdrop-blur-xl border border-border rounded-3xl overflow-hidden shadow-2xl">
      {/* Chat Header */}
      <div className="chat-header p-6 bg-gradient-to-r from-surface/50 to-surface/30 backdrop-blur-sm border-b border-border">
        <div className="flex items-center gap-4">
          <div 
            className="w-16 h-16 rounded-full bg-gradient-to-r from-accent to-purple-500 flex items-center justify-center text-2xl"
          >
            🤖
          </div>
          <div>
            <h2 className="text-2xl font-bold text-text">AI Abdarrahman</h2>
            <p className="text-muted">Ask me about my AI projects, development experience, or anything else!</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="chat-messages h-96 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 mb-4 ${message.type === 'ai' ? 'justify-start' : 'justify-end'}`}
          >
            {message.type === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent to-purple-500 flex items-center justify-center text-sm">
                🤖
              </div>
            )}
            
            <div className={`max-w-[70%] ${message.type === 'ai' ? 'order-2' : 'order-1'}`}>
              <div
                className={`
                  p-4 rounded-2xl backdrop-blur-sm border
                  ${message.type === 'ai' 
                    ? 'bg-surface/80 border-border text-text' 
                    : 'bg-accent/20 border-accent/30 text-text'
                  }
                `}
              >
                <p className="text-text leading-relaxed">{message.text}</p>
              </div>
            </div>
            
            {message.type !== 'ai' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent to-purple-500 flex items-center justify-center text-sm font-semibold text-white">
                U
              </div>
            )}
          </motion.div>
        ))}
        
        {isTyping && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-3 p-4"
          >
            <div className="flex space-x-1">
              <motion.div 
                className="w-2 h-2 rounded-full bg-accent"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
              <motion.div 
                className="w-2 h-2 rounded-full bg-accent"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, delay: 0.2 }}
              />
              <motion.div 
                className="w-2 h-2 rounded-full bg-accent"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, delay: 0.4 }}
              />
            </div>
            <span className="text-muted text-sm">AI Abdarrahman is typing...</span>
          </motion.div>
        )}
      </div>

      {/* Quick Suggestions */}
      {messages.length <= 1 && (
        <div className="p-4 border-t border-border bg-surface/30">
          <p className="text-sm text-muted mb-3 font-medium">💭 Try asking about:</p>
          <div className="flex flex-wrap gap-2">
            {quickSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="
                  px-3 py-2 bg-surface/50 hover:bg-surface/80
                  border border-border hover:border-accent/50
                  rounded-lg text-sm text-muted hover:text-text
                  transition-all duration-200
                "
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Input */}
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputText);
        }} 
        className="p-4 border-t border-border"
      >
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(inputText);
                }
              }}
              placeholder="Ask me about my projects, skills, or experience..."
              disabled={isTyping}
              rows={1}
              className="
                w-full p-3 bg-surface/50 border border-border rounded-xl
                focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent
                resize-none text-text placeholder-muted
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200
              "
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
          </div>
          <button
            type="submit"
            disabled={!inputText.trim() || isTyping}
            className="
              p-3 rounded-xl bg-accent hover:bg-accent/90
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200
              flex items-center justify-center
              min-w-[44px] h-[44px]
              shadow-soft hover:shadow-hover
            "
          >
            <Send size={20} className="text-white" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SimpleAIChat;