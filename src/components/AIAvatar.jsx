import { motion } from 'framer-motion';

const AIAvatar = ({ state = 'idle', size = 48 }) => {
  const getAvatarAnimation = () => {
    switch(state) {
      case 'thinking':
        return {
          scale: [1, 1.05, 1],
          rotate: [0, 5, -5, 0],
          transition: { duration: 2, repeat: Infinity }
        };
      case 'responding':
        return {
          scale: [1, 1.1, 1],
          transition: { duration: 1, repeat: Infinity }
        };
      default:
        return {
          scale: [1, 1.02, 1],
          transition: { duration: 3, repeat: Infinity }
        };
    }
  };

  const getEmoji = () => {
    switch(state) {
      case 'thinking': return '🤔';
      case 'responding': return '💭';
      case 'excited': return '🚀';
      default: return '🤖';
    }
  };

  return (
    <motion.div
      className="ai-avatar"
      animate={getAvatarAnimation()}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.5,
        boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)',
        border: '2px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      {getEmoji()}
    </motion.div>
  );
};

export default AIAvatar;