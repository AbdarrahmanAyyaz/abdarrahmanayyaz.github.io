import { motion } from 'framer-motion';

const TypingIndicator = ({ text = "AI Abdarrahman is thinking..." }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.9 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
        mass: 0.8
      }}
      className="flex items-center gap-3 mb-6"
    >
      {/* Avatar */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          delay: 0.1,
          duration: 0.3,
          ease: "easeOut"
        }}
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 border-purple-400/40 bg-gradient-to-br from-purple-600/80 to-blue-600/80 shadow-md flex-shrink-0 relative"
      >
        {/* Subtle border pulse */}
        <motion.div
          animate={{
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 rounded-full border-2 border-purple-300/60"
        />
      </motion.div>

      {/* Typing Bubble */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: -20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{
          delay: 0.2,
          type: "spring",
          stiffness: 200,
          damping: 20
        }}
        className="max-w-[300px] p-4 sm:p-5 rounded-2xl sm:rounded-3xl backdrop-blur-sm border border-white/10 bg-gradient-to-br from-gray-800/60 to-gray-700/40 shadow-xl relative overflow-hidden"
      >
        {/* Subtle background */}
        <motion.div
          animate={{
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-to-br from-purple-500/8 to-blue-500/8"
        />

        <div className="relative z-10 flex items-center gap-4">
          {/* Enhanced bouncing dots */}
          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                animate={{
                  y: [0, -12, 0],
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: index * 0.15,
                  ease: "easeInOut",
                  type: "tween"
                }}
                className="w-2.5 h-2.5 bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 rounded-full shadow-lg"
                style={{
                  boxShadow: '0 2px 8px rgba(139, 92, 246, 0.4)'
                }}
              />
            ))}
          </div>

          {/* Typing text */}
          <motion.span
            animate={{
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-sm text-gray-300 font-medium"
          >
            {text}
          </motion.span>
        </div>

        {/* Subtle border pulse */}
        <motion.div
          animate={{
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-purple-400/30 pointer-events-none"
        />

        {/* Floating particles - Hidden on mobile for performance */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-3xl pointer-events-none particle-effect">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * 100 + '%',
                y: '100%',
                opacity: 0
              }}
              animate={{
                y: '-20%',
                opacity: [0, 0.6, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: i * 0.7,
                repeat: Infinity,
                ease: "easeOut"
              }}
              className="absolute w-1 h-1 bg-purple-400 rounded-full"
            />
          ))}
        </div>
      </motion.div>

      {/* Minimal glow effect */}
      <motion.div
        animate={{
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute left-8 sm:left-10 w-16 h-16 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-lg pointer-events-none -z-10"
      />
    </motion.div>
  );
};

export default TypingIndicator;