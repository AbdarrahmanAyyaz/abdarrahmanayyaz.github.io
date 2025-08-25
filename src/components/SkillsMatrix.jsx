import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SkillPill from './SkillPill';
import { Badge, Button } from './ui';
import useSkillsFilterStore from '../store/useSkillsFilter';

// Enhanced skills data
const skillsData = [
  // AI Category
  { id: 'openai', name: 'OpenAI', category: 'AI', level: 5, lastUsed: '2024-12-01', years: 2, links: [{ label: 'Live', href: 'https://triagedai.com' }] },
  { id: 'langchain', name: 'LangChain', category: 'AI', level: 4, lastUsed: '2024-11-15', years: 1.5, links: [{ label: 'Code', href: 'https://github.com' }] },
  { id: 'python', name: 'Python', category: 'AI', level: 5, lastUsed: '2024-12-01', years: 4, links: [{ label: 'Code', href: 'https://github.com/AbdarrahmanAyyaz' }] },
  { id: 'tensorflow', name: 'TensorFlow', category: 'AI', level: 4, lastUsed: '2024-10-01', years: 2 },
  { id: 'pytorch', name: 'PyTorch', category: 'AI', level: 4, lastUsed: '2024-09-01', years: 2 },
  
  // Cloud Category
  { id: 'oci', name: 'OCI', category: 'Cloud', level: 4, lastUsed: '2024-12-01', years: 2, links: [{ label: 'Cert', href: '#' }] },
  { id: 'aws', name: 'AWS', category: 'Cloud', level: 3, lastUsed: '2024-10-01', years: 3 },
  { id: 'docker', name: 'Docker', category: 'Cloud', level: 4, lastUsed: '2024-11-01', years: 3 },
  { id: 'kubernetes', name: 'Kubernetes', category: 'Cloud', level: 3, lastUsed: '2024-09-01', years: 1.5 },
  
  // Frontend Category
  { id: 'react', name: 'React', category: 'Frontend', level: 5, lastUsed: '2024-12-01', years: 4, links: [{ label: 'Live', href: 'https://abdarrahman.dev' }] },
  { id: 'tailwind', name: 'Tailwind', category: 'Frontend', level: 5, lastUsed: '2024-12-01', years: 3, links: [{ label: 'Live', href: 'https://abdarrahman.dev' }] },
  { id: 'vite', name: 'Vite/CRA', category: 'Frontend', level: 4, lastUsed: '2024-12-01', years: 2 },
  { id: 'framer', name: 'Framer Motion', category: 'Frontend', level: 4, lastUsed: '2024-12-01', years: 1 },
  
  // Backend Category
  { id: 'node', name: 'Node.js', category: 'Backend', level: 4, lastUsed: '2024-11-01', years: 3, links: [{ label: 'Code', href: 'https://github.com/AbdarrahmanAyyaz' }] },
  { id: 'express', name: 'Express', category: 'Backend', level: 4, lastUsed: '2024-11-01', years: 3 },
  { id: 'postgresql', name: 'PostgreSQL', category: 'Backend', level: 3, lastUsed: '2024-10-01', years: 2 },
  { id: 'mongodb', name: 'MongoDB', category: 'Backend', level: 4, lastUsed: '2024-11-01', years: 3 },
  
  // DevOps Category
  { id: 'github-actions', name: 'GitHub Actions', category: 'DevOps', level: 4, lastUsed: '2024-12-01', years: 2 },
  { id: 'terraform', name: 'Terraform', category: 'DevOps', level: 3, lastUsed: '2024-08-01', years: 1 },
];

const categories = ['all', 'AI', 'Cloud', 'Frontend', 'Backend', 'DevOps'];

const SkillsMatrix = () => {
  const {
    activeCategory,
    query,
    recentOnly,
    minLevel,
    selectedSkills,
    setActiveCategory,
    setQuery,
    setRecentOnly,
    setMinLevel,
    resetFilters,
    getFilteredSkills
  } = useSkillsFilterStore();

  const filteredSkills = useMemo(() => 
    getFilteredSkills(skillsData), 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getFilteredSkills, activeCategory, query, recentOnly, minLevel]
  );

  const skillCounts = useMemo(() => {
    const counts = { all: skillsData.length };
    categories.forEach(cat => {
      if (cat !== 'all') {
        counts[cat] = skillsData.filter(skill => skill.category === cat).length;
      }
    });
    return counts;
  }, []);

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setActiveCategory(category)}
            className="relative"
          >
            {category === 'all' ? 'All' : category}
            <Badge
              variant="secondary"
              size="sm"
              className="ml-2 text-xs"
            >
              {skillCounts[category]}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-surface border border-border rounded-lg">
        {/* Search */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search skills..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-bg text-text placeholder-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={recentOnly}
              onChange={(e) => setRecentOnly(e.target.checked)}
              className="w-4 h-4 text-accent border-border rounded focus-visible:ring-2 focus-visible:ring-ring"
            />
            <span className="text-muted">Recent (12mo)</span>
          </label>

          <div className="flex items-center gap-2 text-sm">
            <label className="text-muted">Min Level:</label>
            <select
              value={minLevel}
              onChange={(e) => setMinLevel(parseInt(e.target.value))}
              className="px-2 py-1 text-sm border border-border rounded bg-bg text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {[1, 2, 3, 4, 5].map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          {(query || recentOnly || minLevel > 1 || selectedSkills.length > 0) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="text-xs"
            >
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Selected Skills Filter Display */}
      <AnimatePresence>
        {selectedSkills.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap gap-2 p-3 bg-accent/5 border border-accent/20 rounded-lg"
          >
            <span className="text-sm text-muted">Filtering projects by:</span>
            {selectedSkills.map((skillId) => {
              const skill = skillsData.find(s => s.id === skillId);
              return skill ? (
                <Badge
                  key={skillId}
                  variant="primary"
                  size="sm"
                  className="cursor-pointer"
                  onClick={() => useSkillsFilterStore.getState().toggleSkill(skillId)}
                >
                  {skill.name} ×
                </Badge>
              ) : null;
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skills Grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill) => (
            <motion.div
              key={skill.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <SkillPill
                skill={skill}
                isSelected={selectedSkills.includes(skill.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredSkills.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted">No skills match your current filters.</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="mt-2"
          >
            Reset filters
          </Button>
        </div>
      )}

      {/* Stats */}
      <div className="flex justify-center text-sm text-muted">
        Showing {filteredSkills.length} of {skillsData.length} skills
      </div>
    </div>
  );
};

export default SkillsMatrix;