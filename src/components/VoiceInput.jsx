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
          relative p-3 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 border-2 touch-manipulation
          min-w-[44px] h-[44px] flex items-center justify-center
          ${isListening
            ? 'text-red-400 shadow-lg'
            : disabled
              ? 'text-muted cursor-not-allowed'
              : 'shadow-lg'
          }
        `}
        style={{
          backgroundColor: isListening 
            ? 'rgba(239, 68, 68, 0.2)' 
            : disabled
              ? 'rgba(0, 0, 0, 0.1)'
              : `rgba(${theme?.colors?.accentRgb || '99, 102, 241'}, 0.2)`,
          borderColor: isListening
            ? 'rgba(239, 68, 68, 0.5)'
            : disabled
              ? 'rgba(0, 0, 0, 0.2)'
              : `rgba(${theme?.colors?.accentRgb || '99, 102, 241'}, 0.5)`,
          color: isListening
            ? '#f87171'
            : disabled
              ? '#9ca3af'
              : theme?.colors?.button || '#6366f1',
          boxShadow: isListening
            ? '0 10px 15px -3px rgba(239, 68, 68, 0.2)'
            : `0 10px 15px -3px rgba(${theme?.colors?.accentRgb || '99, 102, 241'}, 0.2)`
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
            className="absolute bottom-full left-0 right-0 mb-2 p-2 sm:p-3 backdrop-blur-xl border rounded-lg sm:rounded-xl shadow-lg max-w-xs sm:max-w-none"
            style={{
              backgroundColor: `rgba(${theme?.colors?.accentRgb || '99, 102, 241'}, 0.1)`,
              borderColor: `rgba(${theme?.colors?.accentRgb || '99, 102, 241'}, 0.3)`,
              backdropFilter: 'blur(20px)'
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                <motion.div
                  className="w-2 h-2 bg-red-500 rounded-full"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span className="text-xs text-muted font-medium">Listening...</span>
              </div>
            </div>
            
            {(transcript || interimTranscript) && (
              <div className="text-sm text-text">
                <span className="font-medium">{transcript}</span>
                <span className="text-muted italic">{interimTranscript}</span>
              </div>
            )}
            
            {!transcript && !interimTranscript && (
              <div className="text-xs text-muted italic">
                Start speaking...
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
            className="absolute bottom-full left-0 right-0 mb-2 p-2 bg-red-500/10 border border-red-500/30 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <VolumeX size={14} className="text-red-400" />
              <span className="text-xs text-red-400">{error}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VoiceInput;