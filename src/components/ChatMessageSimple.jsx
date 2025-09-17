import { motion } from 'framer-motion';
import { Copy, ThumbsUp, Check, Heart } from 'lucide-react';
import { useState } from 'react';
import MessageFormatter from './MessageFormatter';
import profileImage from '../assets/NewPic.png';

const ChatMessageSimple = ({ message, type, timestamp, onCopy, onLike }) => {
  const isAI = type === 'ai';
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);

  const formatTimestamp = (date) => {
    if (!date) return '';
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;

    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleCopy = async () => {
    try {
      await onCopy?.(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy message:', error);
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    onLike?.(message);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8
      }}
      className={`flex gap-2 sm:gap-3 mb-4 sm:mb-6 ${isAI ? 'justify-start' : 'justify-end'}`}
    >
      {isAI && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 500, damping: 25 }}
          className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full border-2 border-white/20 shadow-lg flex-shrink-0 overflow-hidden"
        >
          <img
            src={profileImage}
            alt="Abdarrahman Ayyaz"
            className="w-full h-full object-cover"
            style={{ objectPosition: '70% 70%', transform: 'scale(1.3)' }}
          />
        </motion.div>
      )}

      <div className={`max-w-[90%] sm:max-w-[85%] md:max-w-[75%] ${isAI ? 'order-2' : 'order-1'}`}>
        {/* Message Header for AI */}
        {isAI && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 px-1"
          >
            <span className="text-xs sm:text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              AI Abdarrahman
            </span>
            <div className="w-1 h-1 bg-gray-500 rounded-full hidden sm:block"></div>
            <span className="text-xs text-gray-400 hidden sm:inline">
              {formatTimestamp(timestamp)}
            </span>
            <div className="flex items-center gap-1 ml-1 sm:ml-2">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-400 font-medium">Online</span>
            </div>
          </motion.div>
        )}

        {/* Message Bubble */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{
            scale: 1.02,
            y: -2,
            transition: { duration: 0.2, ease: "easeOut" }
          }}
          transition={{
            delay: 0.3,
            type: "spring",
            stiffness: 200,
            damping: 20
          }}
          className={`
            message-bubble p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl md:rounded-3xl backdrop-blur-sm border shadow-xl relative overflow-hidden
            message-hover cursor-pointer group
            ${isAI
              ? 'bg-gradient-to-br from-gray-800/60 to-gray-700/40 border-white/10 text-gray-100 hover:from-gray-700/70 hover:to-gray-600/50'
              : 'bg-gradient-to-br from-purple-600/90 to-blue-600/90 border-purple-400/30 text-white ml-auto hover:from-purple-500/95 hover:to-blue-500/95'
            }
          `}
        >
          {/* Subtle animated background effect for AI messages */}
          {isAI && (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 animate-pulse"></div>
          )}

          <div className="relative z-10">
            <MessageFormatter
              text={message}
              className={`text-sm sm:text-base md:text-lg leading-6 sm:leading-7 ${isAI ? 'text-gray-100' : 'text-white'}`}
            />
          </div>

          {/* Message glow effect */}
          <div className={`
            absolute inset-0 rounded-xl sm:rounded-2xl md:rounded-3xl opacity-0 transition-opacity duration-300 pointer-events-none
            ${isAI
              ? 'bg-gradient-to-br from-purple-500/20 to-blue-500/20 group-hover:opacity-100'
              : 'bg-gradient-to-br from-white/10 to-white/5'
            }
          `}></div>
        </motion.div>

        {/* User timestamp */}
        {!isAI && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-end gap-1.5 sm:gap-2 mt-1.5 sm:mt-2 px-1"
          >
            <span className="text-xs text-gray-400">You</span>
            <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
            <span className="text-xs text-gray-400">
              {formatTimestamp(timestamp)}
            </span>
          </motion.div>
        )}

        {/* Enhanced Action Buttons for AI messages */}
        {isAI && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 sm:gap-3 mt-3 sm:mt-4 px-1"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-200 group touch-manipulation min-h-[40px]"
              title="Copy message"
            >
              {copied ? (
                <>
                  <Check size={12} className="text-green-400" />
                  <span className="text-xs text-green-400 font-medium hidden sm:inline">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={12} className="text-gray-400 group-hover:text-gray-300 transition-colors" />
                  <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors hidden sm:inline">Copy</span>
                </>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLike}
              className={`
                flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg border transition-all duration-200 group touch-manipulation min-h-[40px]
                ${liked
                  ? 'bg-pink-500/20 border-pink-400/30 text-pink-400'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20 text-gray-400 hover:text-gray-300'
                }
              `}
              title="Like message"
            >
              {liked ? (
                <>
                  <Heart size={12} className="text-pink-400 fill-current" />
                  <span className="text-xs text-pink-400 font-medium hidden sm:inline">Liked</span>
                </>
              ) : (
                <>
                  <ThumbsUp size={12} className="group-hover:text-gray-300 transition-colors" />
                  <span className="text-xs group-hover:text-gray-300 transition-colors hidden sm:inline">Like</span>
                </>
              )}
            </motion.button>

          </motion.div>
        )}
      </div>

      {!isAI && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 500, damping: 25 }}
          className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0 shadow-lg border-2 border-white/20"
        >
          You
        </motion.div>
      )}
    </motion.div>
  );
};

export default ChatMessageSimple;