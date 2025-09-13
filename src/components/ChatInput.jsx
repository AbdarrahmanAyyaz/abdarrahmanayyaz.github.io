import { useState } from 'react';
import { Send } from 'lucide-react';

const ChatInput = ({ onSend, disabled = false, placeholder = "Ask me about my projects, skills, or experience..." }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-border">
      <div className="flex gap-3 items-end">
        <div className="flex-1">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
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
          disabled={!message.trim() || disabled}
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
  );
};

export default ChatInput;