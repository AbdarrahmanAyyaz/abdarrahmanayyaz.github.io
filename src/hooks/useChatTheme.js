import { useState, useEffect, createContext, useContext } from 'react';
import { useTheme } from './useTheme';

// Theme definitions
export const CHAT_THEMES = {
  default: {
    name: 'Professional',
    colors: {
      primary: '#1f2937, #374151',
      surface: 'rgba(255,255,255,0.98), rgba(248,250,252,0.95), rgba(255,255,255,0.98)',
      header: 'rgba(255,255,255,0.85), rgba(31,41,59,0.05), rgba(255,255,255,0.85)',
      accent: '1f2937',
      accentRgb: '31, 41, 55',
      avatar: 'linear-gradient(135deg, #1f2937 0%, #374151 50%, #4b5563 100%)',
      button: '#1f2937',
      buttonHover: '#374151'
    }
  },
  ocean: {
    name: 'Ocean',
    colors: {
      primary: '#3b82f6, #06b6d4',
      surface: 'rgba(23,37,84,0.95), rgba(30,58,138,0.9), rgba(23,37,84,0.95)',
      header: 'rgba(23,37,84,0.6), rgba(59,130,246,0.1), rgba(23,37,84,0.6)',
      accent: '3b82f6',
      accentRgb: '59, 130, 246',
      avatar: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #0891b2 100%)',
      button: '#3b82f6',
      buttonHover: '#2563eb'
    }
  },
  forest: {
    name: 'Forest',
    colors: {
      primary: '#10b981, #16a34a',
      surface: 'rgba(6,78,59,0.95), rgba(20,83,45,0.9), rgba(6,78,59,0.95)',
      header: 'rgba(6,78,59,0.6), rgba(16,185,129,0.1), rgba(6,78,59,0.6)',
      accent: '10b981',
      accentRgb: '16, 185, 129',
      avatar: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)',
      button: '#10b981',
      buttonHover: '#059669'
    }
  },
  sunset: {
    name: 'Sunset',
    colors: {
      primary: '#f97316, #ec4899',
      surface: 'rgba(154,52,18,0.95), rgba(131,24,67,0.9), rgba(154,52,18,0.95)',
      header: 'rgba(154,52,18,0.6), rgba(249,115,22,0.1), rgba(131,24,67,0.6)',
      accent: 'f97316',
      accentRgb: '249, 115, 22',
      avatar: 'linear-gradient(135deg, #f97316 0%, #ec4899 50%, #be185d 100%)',
      button: '#f97316',
      buttonHover: '#ea580c'
    }
  },
  cosmic: {
    name: 'Cosmic',
    colors: {
      primary: '#a855f7, #4f46e5',
      surface: 'rgba(88,28,135,0.95), rgba(55,48,163,0.9), rgba(88,28,135,0.95)',
      header: 'rgba(88,28,135,0.6), rgba(168,85,247,0.1), rgba(55,48,163,0.6)',
      accent: 'a855f7',
      accentRgb: '168, 85, 247',
      avatar: 'linear-gradient(135deg, #a855f7 0%, #6366f1 50%, #4f46e5 100%)',
      button: '#a855f7',
      buttonHover: '#9333ea'
    }
  },
  minimal: {
    name: 'Minimal',
    colors: {
      primary: '#4b5563, #374151',
      surface: 'rgba(17,24,39,0.95), rgba(30,41,59,0.9), rgba(17,24,39,0.95)',
      header: 'rgba(17,24,39,0.6), rgba(75,85,99,0.1), rgba(15,23,42,0.6)',
      accent: '4b5563',
      accentRgb: '75, 85, 99',
      avatar: 'linear-gradient(135deg, #4b5563 0%, #374151 50%, #1f2937 100%)',
      button: '#4b5563',
      buttonHover: '#374151'
    }
  }
};

// Theme Context
const ChatThemeContext = createContext();

export const ChatThemeProvider = ({ children }) => {
  const { theme: systemTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState('default');

  // Single effect to handle both initialization and system theme changes
  useEffect(() => {
    const savedTheme = localStorage.getItem('chat-theme');
    const isManual = localStorage.getItem('chat-theme-manual') === 'true';

    if (isManual && savedTheme && CHAT_THEMES[savedTheme]) {
      setCurrentTheme(savedTheme);
    } else {
      // Auto-select based on system theme
      const autoTheme = systemTheme === 'dark' ? 'minimal' : 'default';
      setCurrentTheme(autoTheme);
      console.log('ChatThemeProvider: Setting theme to:', autoTheme, 'for system theme:', systemTheme);
    }
  }, [systemTheme]);

  // Save theme to localStorage when it changes
  const changeTheme = (themeId) => {
    if (CHAT_THEMES[themeId]) {
      setCurrentTheme(themeId);
      localStorage.setItem('chat-theme', themeId);
      localStorage.setItem('chat-theme-manual', 'true');
    }
  };

  const theme = CHAT_THEMES[currentTheme];

  const value = {
    currentTheme,
    theme,
    changeTheme,
    availableThemes: Object.keys(CHAT_THEMES)
  };

  return (
    <ChatThemeContext.Provider value={value}>
      {children}
    </ChatThemeContext.Provider>
  );
};

// Custom hook to use chat theme
export const useChatTheme = () => {
  const context = useContext(ChatThemeContext);
  
  if (!context) {
    throw new Error('useChatTheme must be used within a ChatThemeProvider');
  }
  
  return context;
};

// Hook for individual components (fallback if no provider)
export const useChatThemeStandalone = () => {
  const { theme: systemTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState('default');

  // Single effect to handle both initialization and system theme changes
  useEffect(() => {
    const savedTheme = localStorage.getItem('chat-theme');
    const isManual = localStorage.getItem('chat-theme-manual') === 'true';

    if (isManual && savedTheme && CHAT_THEMES[savedTheme]) {
      setCurrentTheme(savedTheme);
    } else {
      // Auto-select based on system theme
      const autoTheme = systemTheme === 'dark' ? 'minimal' : 'default';
      setCurrentTheme(autoTheme);
      console.log('useChatThemeStandalone: Setting theme to:', autoTheme, 'for system theme:', systemTheme);
    }
  }, [systemTheme]);

  const changeTheme = (themeId) => {
    if (CHAT_THEMES[themeId]) {
      setCurrentTheme(themeId);
      localStorage.setItem('chat-theme', themeId);
      localStorage.setItem('chat-theme-manual', 'true');
    }
  };

  return {
    currentTheme,
    theme: CHAT_THEMES[currentTheme],
    changeTheme,
    availableThemes: Object.keys(CHAT_THEMES)
  };
};