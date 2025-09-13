import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const PersonalizedAvatar = ({ state = 'idle', size = 48 }) => {
  const [currentExpression, setCurrentExpression] = useState('😊');
  const [isAnimating, setIsAnimating] = useState(false);

  const getAvatarAnimation = () => {
    switch(state) {
      case 'thinking':
        return {
          scale: [1, 1.05, 1],
          rotate: [0, 2, -2, 0],
          transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        };
      case 'responding':
        return {
          scale: [1, 1.08, 1],
          y: [0, -1, 0],
          transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
        };
      case 'excited':
        return {
          scale: [1, 1.15, 1],
          y: [0, -3, 0],
          transition: { duration: 0.6, repeat: 2, ease: "easeOut" }
        };
      default:
        return {
          scale: [1, 1.02, 1],
          transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        };
    }
  };

  const getGradientForState = () => {
    switch(state) {
      case 'thinking':
        return 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)';
      case 'responding':
        return 'linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #6366f1 100%)';
      case 'excited':
        return 'linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #ec4899 100%)';
      default:
        return 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)';
    }
  };

  // Dynamic expressions based on state
  useEffect(() => {
    setIsAnimating(true);
    switch(state) {
      case 'thinking':
        setCurrentExpression('🤔');
        break;
      case 'responding':
        setCurrentExpression('💭');
        break;
      case 'excited':
        setCurrentExpression('🚀');
        break;
      case 'greeting':
        setCurrentExpression('👋');
        break;
      default:
        setCurrentExpression('😊');
    }
    
    const timeout = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timeout);
  }, [state]);

  return (
    <motion.div
      className="personalized-avatar relative"
      animate={getAvatarAnimation()}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: getGradientForState(),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.45,
        boxShadow: `0 0 ${size * 0.5}px rgba(99, 102, 241, 0.4), inset 0 0 ${size * 0.3}px rgba(255, 255, 255, 0.1)`,
        border: `2px solid rgba(255, 255, 255, 0.2)`,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          background: [
            getGradientForState(),
            'linear-gradient(225deg, #8b5cf6 0%, #ec4899 50%, #6366f1 100%)',
            'linear-gradient(315deg, #ec4899 0%, #6366f1 50%, #8b5cf6 100%)',
            getGradientForState()
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Professional representation */}
      <motion.div
        key={currentExpression}
        initial={{ scale: isAnimating ? 0.8 : 1, opacity: isAnimating ? 0 : 1 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative z-10 filter drop-shadow-sm"
        style={{
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}
      >
        {currentExpression}
      </motion.div>
      
      {/* Thinking particles animation */}
      {state === 'thinking' && (
        <>
          <motion.div
            className="absolute -top-2 -right-1 text-xs opacity-70"
            animate={{
              y: [0, -8, 0],
              x: [0, 2, 0],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            💭
          </motion.div>
          <motion.div
            className="absolute -top-1 -right-3 text-xs opacity-50"
            animate={{
              y: [0, -6, 0],
              x: [0, -1, 0],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3
            }}
          >
            💫
          </motion.div>
        </>
      )}

      {/* Pulsing ring for responding state */}
      {state === 'responding' && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white/30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 0, 0.6]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.div>
  );
};

export default PersonalizedAvatar;