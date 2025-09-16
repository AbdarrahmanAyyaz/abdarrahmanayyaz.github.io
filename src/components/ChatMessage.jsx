import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Copy, ThumbsUp } from 'lucide-react';
import PersonalizedAvatar from './PersonalizedAvatar';

const ChatMessage = ({ message, type, timestamp, onCopy, onLike }) => {
  const isAI = type === 'ai';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 mb-4 ${isAI ? 'justify-start' : 'justify-end'}`}
    >
      {isAI && <PersonalizedAvatar state="idle" size={32} />}
      
      <div className={`max-w-[70%] ${isAI ? 'order-2' : 'order-1'}`}>
        <div
          className={`
            message-bubble p-4 rounded-2xl backdrop-blur-sm border
            ${isAI 
              ? 'bg-surface/80 border-border text-text' 
              : 'bg-accent/20 border-accent/30 text-text'
            }
          `}
        >
          <ReactMarkdown 
            className="prose prose-invert prose-sm max-w-none"
            components={{
              p: ({ children }) => <p className="mb-2 last:mb-0 text-text">{children}</p>,
              strong: ({ children }) => <strong className="text-accent font-semibold">{children}</strong>,
              code: ({ children }) => (
                <code className="bg-surface px-2 py-1 rounded text-sm font-mono text-accent">
                  {children}
                </code>
              ),
              ul: ({ children }) => <ul className="list-disc list-inside mb-2 text-text">{children}</ul>,
              li: ({ children }) => <li className="mb-1 text-text">{children}</li>
            }}
          >
            {message}
          </ReactMarkdown>
        </div>
        
        {isAI && (
          <div className="flex items-center gap-2 mt-2">
            <button 
              onClick={() => onCopy(message)}
              className="p-1 rounded hover:bg-surface transition-colors group"
              title="Copy message"
            >
              <Copy size={14} className="text-muted hover:text-text transition-colors" />
            </button>
            <button 
              onClick={() => onLike(message)}
              className="p-1 rounded hover:bg-surface transition-colors group"
              title="Like message"
            >
              <ThumbsUp size={14} className="text-muted hover:text-text transition-colors" />
            </button>
          </div>
        )}
      </div>
      
      {!isAI && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-accent to-purple-500 flex items-center justify-center text-sm font-semibold text-white">
          U
        </div>
      )}
    </motion.div>
  );
};

export default ChatMessage;