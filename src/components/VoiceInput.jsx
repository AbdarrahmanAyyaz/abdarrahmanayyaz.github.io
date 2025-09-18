import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, VolumeX } from 'lucide-react';

const VoiceInput = ({ onTranscript, disabled = false, className = "", theme }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);

  // Check for browser support
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setIsSupported(true);
      
      // Initialize speech recognition
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
      };

      recognition.onend = () => {
        setIsListening(false);
        setInterimTranscript('');
      };

      recognition.onerror = (event) => {
        setError(event.error);
        setIsListening(false);
        setInterimTranscript('');
        
        // User-friendly error messages
        let errorMessage = 'Voice recognition error';
        switch (event.error) {
          case 'no-speech':
            errorMessage = 'No speech detected';
            break;
          case 'audio-capture':
            errorMessage = 'No microphone found';
            break;
          case 'not-allowed':
            errorMessage = 'Microphone permission denied';
            break;
          case 'network':
            errorMessage = 'Network error occurred';
            break;
          default:
            errorMessage = `Error: ${event.error}`;
        }
        console.error('Speech recognition error:', errorMessage);
      };

      recognition.onresult = (event) => {
        let finalTranscript = '';
        let interimText = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript;
          } else {
            interimText += result[0].transcript;
          }
        }

        if (finalTranscript) {
          setTranscript(prev => prev + finalTranscript);
          if (onTranscript) {
            onTranscript(finalTranscript.trim());
          }
        }
        
        setInterimTranscript(interimText);
      };

      recognitionRef.current = recognition;
    }
  }, [onTranscript]);

  const startListening = () => {
    if (!recognitionRef.current || disabled) return;
    
    try {
      setTranscript('');
      setError(null);
      recognitionRef.current.start();
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      setError('Failed to start voice recognition');
    }
  };

  const stopListening = () => {
    if (!recognitionRef.current) return;
    
    try {
      recognitionRef.current.stop();
    } catch (error) {
      console.error('Error stopping speech recognition:', error);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  if (!isSupported) {
    return (
      <div className={`voice-input-unsupported ${className}`}>
        <div className="flex items-center gap-2 px-3 py-2 bg-surface/30 border border-border/30 rounded-lg">
          <VolumeX size={16} className="text-muted" />
          <span className="text-xs text-muted">Voice input not supported</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`voice-input ${className}`}>
      {/* Voice Input Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleListening}
        disabled={disabled}
        className={`
          relative p-3 sm:p-3 rounded-xl sm:rounded-2xl transition-all duration-300 border-2 touch-manipulation
          min-w-[48px] min-h-[48px] flex items-center justify-center backdrop-blur-sm
          ${isListening
            ? 'text-red-400 shadow-xl border-red-400/50 bg-red-500/10'
            : disabled
              ? 'text-gray-400 cursor-not-allowed border-gray-400/30 bg-gray-500/10'
              : 'shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95'
          }
        `}
        style={{
          backgroundColor: isListening
            ? 'rgba(239, 68, 68, 0.15)'
            : disabled
              ? 'rgba(107, 114, 128, 0.1)'
              : `rgba(${theme?.colors?.accentRgb || '31, 41, 55'}, 0.15)`,
          borderColor: isListening
            ? 'rgba(239, 68, 68, 0.4)'
            : disabled
              ? 'rgba(107, 114, 128, 0.3)'
              : `rgba(${theme?.colors?.accentRgb || '31, 41, 55'}, 0.4)`,
          color: isListening
            ? '#ef4444'
            : disabled
              ? '#9ca3af'
              : theme?.colors?.button || '#1f2937',
          boxShadow: isListening
            ? '0 20px 25px -5px rgba(239, 68, 68, 0.25), 0 10px 10px -5px rgba(239, 68, 68, 0.1)'
            : disabled
              ? 'none'
              : `0 10px 15px -3px rgba(${theme?.colors?.accentRgb || '31, 41, 55'}, 0.2), 0 4px 6px -2px rgba(${theme?.colors?.accentRgb || '31, 41, 55'}, 0.1)`
        }}
        title={isListening ? 'Stop listening' : 'Start voice input'}
      >
        <AnimatePresence mode="wait">
          {isListening ? (
            <motion.div
              key="listening"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative"
            >
              <MicOff size={16} className="sm:w-5 sm:h-5" />
              
              {/* Pulsing ring animation */}
              <motion.div
                className="absolute inset-0 border-2 border-red-400 rounded-lg sm:rounded-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.8, 0, 0.8]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <Mic size={16} className="sm:w-5 sm:h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Live Transcript Display */}
      <AnimatePresence>
        {(isListening || interimTranscript) && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-full left-0 right-0 mb-3 p-3 sm:p-4 backdrop-blur-xl border rounded-xl sm:rounded-2xl shadow-2xl max-w-xs sm:max-w-md md:max-w-lg mx-auto z-50"
            style={{
              backgroundColor: `rgba(${theme?.colors?.accentRgb || '31, 41, 55'}, 0.08)`,
              borderColor: `rgba(${theme?.colors?.accentRgb || '31, 41, 55'}, 0.2)`,
              backdropFilter: 'blur(24px)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-2">
                <motion.div
                  className="w-3 h-3 bg-red-500 rounded-full flex-shrink-0"
                  animate={{
                    opacity: [1, 0.3, 1],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
                <span className="text-sm sm:text-base font-medium text-gray-200">Listening...</span>
              </div>
              <motion.div
                className="flex gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-4 bg-red-500/60 rounded-full"
                    animate={{
                      scaleY: [1, 2, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.1
                    }}
                  />
                ))}
              </motion.div>
            </div>
            
            {(transcript || interimTranscript) && (
              <div className="text-sm sm:text-base text-gray-100 bg-gray-800/30 rounded-lg p-3 border border-gray-600/30">
                <span className="font-medium text-white">{transcript}</span>
                <span className="text-gray-300 italic">{interimTranscript}</span>
              </div>
            )}
            
            {!transcript && !interimTranscript && (
              <div className="text-sm sm:text-base text-gray-400 italic text-center py-2">
                <span className="hidden sm:inline">Start speaking your message...</span>
                <span className="sm:hidden">Start speaking...</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Display */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full left-0 right-0 mb-3 p-3 sm:p-4 bg-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-lg shadow-lg max-w-xs sm:max-w-md mx-auto z-50"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <VolumeX size={16} className="text-red-400" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-red-400 mb-1">Voice Input Error</div>
                <div className="text-xs sm:text-sm text-red-300 leading-relaxed">{error}</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoiceInput;