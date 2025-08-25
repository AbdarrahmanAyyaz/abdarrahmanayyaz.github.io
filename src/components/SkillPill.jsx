import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Badge from './ui/Badge';
import useSkillsFilterStore from '../store/useSkillsFilter';

const SkillLevel = ({ level, size = 'sm' }) => {
  const dots = Array.from({ length: 5 }, (_, i) => i + 1);
  const dotSize = size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2';
  
  return (
    <div className="flex items-center gap-0.5" aria-label={`Skill level: ${level} out of 5`}>
      {dots.map((dot) => (
        <div
          key={dot}
          className={`
            ${dotSize} rounded-full transition-colors duration-200
            ${dot <= level 
              ? level >= 5 
                ? 'bg-gradient-to-r from-accent to-accent2' 
                : level >= 4 
                  ? 'bg-accent' 
                  : level >= 3 
                    ? 'bg-success' 
                    : 'bg-info'
              : 'bg-border'
            }
          `}
        />
      ))}
    </div>
  );
};

const SkillPill = ({ skill, onClick, isSelected = false }) => {
  const [showDetails, setShowDetails] = useState(false);
  const toggleSkill = useSkillsFilterStore(state => state.toggleSkill);
  
  const handleClick = () => {
    if (onClick) {
      onClick(skill);
    }
    toggleSkill(skill.id);
  };

  const getLevelLabel = (level) => {
    if (level >= 5) return 'Expert';
    if (level >= 4) return 'Advanced';
    if (level >= 3) return 'Proficient';
    if (level >= 2) return 'Learning';
    return 'Beginner';
  };

  const formatLastUsed = (lastUsed) => {
    if (!lastUsed) return null;
    const date = new Date(lastUsed);
    const now = new Date();
    const diffInMonths = (now.getFullYear() - date.getFullYear()) * 12 + now.getMonth() - date.getMonth();
    
    if (diffInMonths === 0) return 'This month';
    if (diffInMonths === 1) return 'Last month';
    if (diffInMonths < 12) return `${diffInMonths} months ago`;
    
    const years = Math.floor(diffInMonths / 12);
    return years === 1 ? '1 year ago' : `${years} years ago`;
  };

  return (
    <motion.div
      className="relative"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      <button
        className={`
          w-full p-3 rounded-lg border transition-all duration-200
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
          ${isSelected 
            ? 'bg-accent/10 border-accent text-accent ring-2 ring-accent/20' 
            : 'bg-surface border-border text-text hover:bg-surface/80 hover:border-accent/30'
          }
        `}
        onClick={handleClick}
        onMouseEnter={() => setShowDetails(true)}
        onMouseLeave={() => setShowDetails(false)}
        onFocus={() => setShowDetails(true)}
        onBlur={() => setShowDetails(false)}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium text-sm">{skill.name}</span>
          <SkillLevel level={skill.level} />
        </div>
        
        <div className="text-xs text-muted text-left">
          <div className="mb-1">{getLevelLabel(skill.level)}</div>
          {skill.lastUsed && (
            <div>{formatLastUsed(skill.lastUsed)}</div>
          )}
          {skill.years && (
            <div>{skill.years}+ years</div>
          )}
        </div>

        <AnimatePresence>
          {showDetails && skill.links && skill.links.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-3 pt-3 border-t border-border"
            >
              <div className="flex flex-wrap gap-1">
                {skill.links.map((link, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs cursor-pointer hover:bg-accent/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(link.href, '_blank', 'noopener');
                    }}
                  >
                    {link.label}
                  </Badge>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
};

export default SkillPill;