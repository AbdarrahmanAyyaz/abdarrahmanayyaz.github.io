import { useState, useEffect } from 'react';

const RotatingPlaceholder = ({
  placeholders = [
    "Ask about my AI projects...",
    "Try: 'Show me TriagedAI'",
    "What would you like to know?",
    "Tell me about your Oracle experience",
    "How do you build AI systems?"
  ],
  interval = 3000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % placeholders.length);
    }, interval);

    return () => clearInterval(timer);
  }, [placeholders.length, interval]);

  return placeholders[currentIndex];
};

export default RotatingPlaceholder;