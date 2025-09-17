import { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import VoiceInput from './VoiceInput';

const ChatInput = ({ onSend, disabled = false, placeholder = "Ask me about my projects, skills, or experience...", theme }) => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [currentPlaceholder, setCurrentPlaceholder] = useState('');

  const placeholders = [
    "Ask about my projects...",
    "Try: 'Show me TriagedAI'",
    "What would you like to know?",
    "Tell me about Oracle",
    "How do you build AI?"
  ];

  // Rotating placeholder effect
  useEffect(() => {
    let currentIndex = 0;
    setCurrentPlaceholder(placeholders[0]);

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % placeholders.length;
      setCurrentPlaceholder(placeholders[currentIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Listen for auto-fill events from both quick actions and expandable pills
  useEffect(() => {
    const handleAutoFill = (event) => {
      setMessage(event.detail);
      // Auto-focus the input after setting the message
      setTimeout(() => {
        const textarea = document.querySelector('textarea');
        if (textarea) {
          textarea.focus();
          textarea.setSelectionRange(textarea.value.length, textarea.value.length);
          // Add a subtle animation to show the text was filled
          textarea.style.transition = 'all 0.3s ease';
          textarea.style.transform = 'scale(1.02)';
          setTimeout(() => {
            textarea.style.transform = 'scale(1)';
          }, 300);
        }
      }, 100);
    };

    window.addEventListener('autoFillQuestion', handleAutoFill);
    return () => window.removeEventListener('autoFillQuestion', handleAutoFill);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
      // Keep focus on input after sending
      setTimeout(() => {
        const textarea = document.querySelector('textarea');
        if (textarea) {
          textarea.focus();
        }
      }, 100);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleVoiceTranscript = (transcript) => {
    if (transcript.trim()) {
      setMessage(prev => prev + transcript + ' ');
    }
  };

  return (
    <div className="space-y-3">
      <form onSubmit={handleSubmit} className="p-3 sm:p-6 border-t" style={{ borderTopColor: `rgba(${theme?.colors?.accentRgb || '99, 102, 241'}, 0.2)` }}>
        <div className="flex gap-2 sm:gap-3 items-end">
          <div className="flex-1">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={currentPlaceholder}
              disabled={disabled}
              rows={1}
              className="
                w-full py-3 px-3 sm:px-4 border rounded-xl
                focus:outline-none focus:ring-2
                resize-none disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-300 ease-out touch-manipulation
              "
              style={{
                fontSize: '16px', // Prevents zoom on iOS
                minHeight: '48px',
                maxHeight: '120px',
                backgroundColor: `rgba(255, 255, 255, 0.95)`,
                borderColor: `rgba(${theme?.colors?.accentRgb || '99, 102, 241'}, 0.4)`,
                color: '#1f2937',
                '--tw-ring-color': `rgba(${theme?.colors?.accentRgb || '99, 102, 241'}, 0.6)`,
                transform: isFocused ? 'scale(1.02)' : 'scale(1)',
                boxShadow: isFocused ? '0 8px 25px rgba(139, 92, 246, 0.2)' : 'none'
              }}
            />
          </div>
        
        {/* Voice Input */}
        <div className="relative">
          <VoiceInput 
            onTranscript={handleVoiceTranscript}
            disabled={disabled}
            theme={theme}
          />
        </div>
        
          {/* Send Button */}
          <button
            type="submit"
            disabled={!message.trim() || disabled}
            className="
              py-3 px-3 sm:px-4 rounded-xl
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-300 ease-out touch-manipulation
              flex items-center justify-center
              min-w-[48px] h-[48px]
              shadow-soft hover:shadow-hover active:scale-95
            "
            style={{
              backgroundColor: theme?.colors?.button || '#6366f1',
              ':hover': {
                backgroundColor: theme?.colors?.buttonHover || '#5b5bd6'
              }
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = theme?.colors?.buttonHover || '#5b5bd6';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = theme?.colors?.button || '#6366f1';
            }}
          >
            <Send size={18} className="text-white" />
          </button>
        </div>

        {/* Enhanced Hint Text */}
        <div className="text-center mt-2 sm:mt-3">
          <p className="text-xs text-muted opacity-75">
            <span className="hidden sm:inline">Press Enter to send • Shift + Enter for new line</span>
            <span className="sm:hidden">Tap send button or press Enter</span>
          </p>
          {isFocused && (
            <p className="text-xs text-accent mt-1 animate-pulse">
              Ask me anything about my work
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default ChatInput;