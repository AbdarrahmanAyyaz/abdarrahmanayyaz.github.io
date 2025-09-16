import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, MessageCircle, Users } from 'lucide-react';

const ChatSessionManagerFixed = ({ onChatChange, currentChatId, maxChats = 3 }) => {
  const [chatSessions, setChatSessions] = useState([
    { 
      id: currentChatId || 1, 
      title: 'Main Chat', 
      messageCount: 0, 
      isActive: true,
      lastActivity: Date.now()
    }
  ]);
  const [showSessionLimit, setShowSessionLimit] = useState(false);

  const createNewChat = () => {
    if (chatSessions.length >= maxChats) {
      setShowSessionLimit(true);
      setTimeout(() => setShowSessionLimit(false), 3000);
      return;
    }

    const newChatId = Date.now();
    const newChat = {
      id: newChatId,
      title: `Chat ${chatSessions.length + 1}`,
      messageCount: 0,
      isActive: false,
      lastActivity: Date.now()
    };

    setChatSessions(prev => [
      ...prev.map(chat => ({ ...chat, isActive: false })),
      { ...newChat, isActive: true }
    ]);

    if (onChatChange) {
      onChatChange(newChatId, true);
    }
  };

  const switchChat = (chatId) => {
    setChatSessions(prev => 
      prev.map(chat => ({
        ...chat,
        isActive: chat.id === chatId,
        lastActivity: chat.id === chatId ? Date.now() : chat.lastActivity
      }))
    );
    
    if (onChatChange) {
      onChatChange(chatId, false);
    }
  };

  const closeChat = (chatId, event) => {
    if (event) {
      event.stopPropagation();
    }
    
    if (chatSessions.length <= 1) return;

    const closingActiveChat = chatSessions.find(chat => chat.id === chatId)?.isActive;
    
    setChatSessions(prev => {
      const remaining = prev.filter(chat => chat.id !== chatId);
      
      if (closingActiveChat && remaining.length > 0) {
        remaining[0].isActive = true;
        if (onChatChange) {
          onChatChange(remaining[0].id, false);
        }
      }
      
      return remaining;
    });
  };

  return (
    <div className="chat-session-manager border-b border-border bg-gradient-to-r from-surface/60 to-surface/40 backdrop-blur-sm">
      {/* Session Tabs */}
      <div className="flex items-center gap-2 p-3 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 min-w-0 flex-1">
          <AnimatePresence>
            {chatSessions.map((chat) => (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, scale: 0.95, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: -20 }}
                whileHover={{ y: -1 }}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-xl cursor-pointer
                  transition-all duration-300 min-w-0 whitespace-nowrap relative
                  ${chat.isActive 
                    ? 'bg-gradient-to-r from-accent/40 to-purple-600/40 border-2 border-accent/50 text-text shadow-lg shadow-accent/20' 
                    : 'bg-surface/40 border border-border/30 text-muted hover:bg-surface/80 hover:border-border/50 hover:text-text'
                  }
                `}
                onClick={() => switchChat(chat.id)}
              >
                <MessageCircle size={16} className={chat.isActive ? 'text-accent' : 'text-muted'} />
                
                <span className="text-sm font-medium truncate max-w-24">
                  {chat.title}
                </span>
                
                {chat.messageCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-accent text-white text-xs px-2 py-0.5 rounded-full min-w-[20px] text-center font-medium"
                  >
                    {chat.messageCount}
                  </motion.span>
                )}
                
                {chatSessions.length > 1 && (
                  <button
                    onClick={(e) => closeChat(chat.id, e)}
                    className="ml-1 p-1 rounded-lg hover:bg-red-500/20 transition-colors group"
                  >
                    <X size={12} className="text-muted group-hover:text-red-400" />
                  </button>
                )}

                {chat.isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 bg-gradient-to-r from-accent/20 to-purple-600/20 rounded-xl -z-10"
                  />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* New Chat Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={createNewChat}
          disabled={chatSessions.length >= maxChats}
          className={`
            flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm
            transition-all duration-300 whitespace-nowrap border
            ${chatSessions.length >= maxChats
              ? 'bg-surface/30 text-muted cursor-not-allowed border-border/30'
              : 'bg-gradient-to-r from-accent to-purple-600 hover:from-accent/90 hover:to-purple-600/90 text-white border-accent/50 shadow-lg shadow-accent/25'
            }
          `}
        >
          <Plus size={16} />
          New Chat
        </motion.button>
      </div>

      {/* Status Bar */}
      <div className="px-4 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-muted">
          <div className="flex items-center gap-1">
            <Users size={12} />
            <span>{chatSessions.length}/{maxChats} active chats</span>
          </div>
          
          {chatSessions.length >= maxChats && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: showSessionLimit ? 1 : 0.6 }}
              className={`${showSessionLimit ? 'text-warning' : 'text-muted'}`}
            >
              Chat limit reached
            </motion.span>
          )}
        </div>

        <div className="text-xs text-muted">
          Demo Mode Active
        </div>
      </div>
    </div>
  );
};

export default ChatSessionManagerFixed;