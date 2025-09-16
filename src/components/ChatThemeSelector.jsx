import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check } from 'lucide-react';

const ChatThemeSelector = ({ currentTheme, onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    {
      id: 'default',
      name: 'Professional',
      description: 'Clean and professional',
      preview: {
        primary: 'from-accent to-purple-600',
        surface: 'from-surface/95 via-surface/90 to-surface/95',
        accent: 'bg-accent'
      }
    },
    {
      id: 'ocean',
      name: 'Ocean',
      description: 'Calm blue tones',
      preview: {
        primary: 'from-blue-500 to-cyan-600',
        surface: 'from-blue-950/95 via-blue-900/90 to-blue-950/95',
        accent: 'bg-blue-500'
      }
    },
    {
      id: 'forest',
      name: 'Forest',
      description: 'Natural green vibes',
      preview: {
        primary: 'from-emerald-500 to-green-600',
        surface: 'from-emerald-950/95 via-emerald-900/90 to-emerald-950/95',
        accent: 'bg-emerald-500'
      }
    },
    {
      id: 'sunset',
      name: 'Sunset',
      description: 'Warm orange & pink',
      preview: {
        primary: 'from-orange-500 to-pink-600',
        surface: 'from-orange-950/95 via-pink-900/90 to-orange-950/95',
        accent: 'bg-orange-500'
      }
    },
    {
      id: 'cosmic',
      name: 'Cosmic',
      description: 'Deep space purple',
      preview: {
        primary: 'from-purple-500 to-indigo-600',
        surface: 'from-purple-950/95 via-indigo-900/90 to-purple-950/95',
        accent: 'bg-purple-500'
      }
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Clean monochrome',
      preview: {
        primary: 'from-gray-600 to-slate-700',
        surface: 'from-gray-900/95 via-slate-800/90 to-gray-900/95',
        accent: 'bg-gray-600'
      }
    }
  ];

  const handleThemeSelect = (themeId) => {
    onThemeChange(themeId);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Theme Selector Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg sm:rounded-xl bg-surface/50 border border-border/30 text-muted hover:text-text hover:bg-surface/80 transition-all duration-200"
        title="Change chat theme"
      >
        <Palette size={14} className="sm:w-4 sm:h-4" />
        <span className="text-xs sm:text-sm font-medium hidden sm:inline">Theme</span>
      </motion.button>

      {/* Theme Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[90]"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Theme Panel */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute top-full right-0 mt-2 w-72 sm:w-80 bg-surface border border-border rounded-lg sm:rounded-xl shadow-2xl z-[100] overflow-hidden"
            >
              <div className="p-3 sm:p-4">
                <h3 className="text-base sm:text-lg font-semibold text-text mb-2 sm:mb-3">Choose Chat Theme</h3>
                
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {themes.map((theme) => (
                    <motion.button
                      key={theme.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleThemeSelect(theme.id)}
                      className={`
                        p-2 sm:p-3 rounded-md sm:rounded-lg border transition-all duration-200 text-left
                        ${currentTheme === theme.id
                          ? 'border-accent bg-accent/10 ring-2 ring-accent/20'
                          : 'border-border/30 hover:border-border/50 hover:bg-surface/50'
                        }
                      `}
                    >
                      {/* Theme Preview */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${theme.preview.primary}`} />
                          <span className="font-medium text-text text-sm">{theme.name}</span>
                        </div>
                        {currentTheme === theme.id && (
                          <Check size={16} className="text-accent" />
                        )}
                      </div>
                      
                      <p className="text-xs text-muted mb-2">{theme.description}</p>
                      
                      {/* Mini Preview */}
                      <div className="space-y-1">
                        <div className={`h-1.5 rounded bg-gradient-to-r ${theme.preview.surface}`} />
                        <div className="flex gap-1">
                          <div className={`h-1 w-8 rounded ${theme.preview.accent}`} />
                          <div className="h-1 w-12 rounded bg-border/30" />
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
                
                <div className="mt-4 pt-3 border-t border-border/30">
                  <p className="text-xs text-muted">
                    Theme preferences are saved locally and will persist across sessions.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatThemeSelector;