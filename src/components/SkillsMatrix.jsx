import React, { useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SiOpenai,
  SiPython,
  SiTensorflow,
  SiPytorch,
  SiOracle,
  SiAmazonaws,
  SiGooglecloud,
  SiDocker,
  SiKubernetes,
  SiReact,
  SiTailwindcss,
  SiVite,
  SiFramer,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiFirebase,
  SiVercel,
  SiGithubactions,
  SiTerraform,
  SiPostman,
} from 'react-icons/si';
import {
  Database,
  ShieldCheck,
  MessageSquare,
  Link2,
  Sparkles,
  Network,
  Zap,
} from 'lucide-react';
import SkillCard from './SkillCard';
import { Badge, Button } from './ui';
import useSkillsFilterStore from '../store/useSkillsFilter';

// Skill data — ordered to lead with target-role signals (Python, OpenAI, RAG, Evals)
const skillsData = [
  // AI Category — target-role leaders first
  { id: 'python', name: 'Python', category: 'AI', level: 5, lastUsed: '2026-04-01', years: 4, icon: SiPython, iconColor: '#3776AB', links: [{ label: 'GitHub', href: 'https://github.com/AbdarrahmanAyyaz' }] },
  { id: 'openai', name: 'OpenAI', category: 'AI', level: 5, lastUsed: '2026-04-01', years: 2, icon: SiOpenai, links: [{ label: 'Triage AI', href: 'https://triagedai.com' }] },
  { id: 'rag', name: 'RAG', category: 'AI', level: 5, lastUsed: '2026-03-01', years: 2, icon: Database, iconColor: '#8b5cf6', links: [{ label: 'OpenSignl', href: 'https://www.opensignl.com/' }] },
  { id: 'llm-eval', name: 'Evals / LLM-as-Judge', category: 'AI', level: 5, lastUsed: '2026-04-01', years: 2, icon: ShieldCheck, iconColor: '#10b981' },
  { id: 'prompt-eng', name: 'Prompt Engineering', category: 'AI', level: 5, lastUsed: '2026-04-01', years: 2, icon: Sparkles, iconColor: '#f59e0b' },
  { id: 'anthropic', name: 'Anthropic API', category: 'AI', level: 4, lastUsed: '2026-04-01', years: 1, icon: MessageSquare, iconColor: '#d97706' },
  { id: 'vector-db', name: 'Vector DBs', category: 'AI', level: 4, lastUsed: '2026-03-01', years: 2, icon: Database, iconColor: '#06b6d4' },
  { id: 'langchain', name: 'LangChain', category: 'AI', level: 4, lastUsed: '2026-01-15', years: 1.5, icon: Link2, iconColor: '#1c3c3c' },
  { id: 'tensorflow', name: 'TensorFlow', category: 'AI', level: 4, lastUsed: '2024-10-01', years: 2, icon: SiTensorflow, iconColor: '#FF6F00' },
  { id: 'pytorch', name: 'PyTorch', category: 'AI', level: 4, lastUsed: '2024-09-01', years: 2, icon: SiPytorch, iconColor: '#EE4C2C' },

  // Cloud Category
  { id: 'oci', name: 'OCI', category: 'Cloud', level: 4, lastUsed: '2026-04-01', years: 2, icon: SiOracle, iconColor: '#F80000' },
  { id: 'vercel', name: 'Vercel', category: 'Cloud', level: 4, lastUsed: '2026-03-01', years: 2, icon: SiVercel },
  { id: 'aws', name: 'AWS', category: 'Cloud', level: 3, lastUsed: '2025-06-01', years: 3, icon: SiAmazonaws, iconColor: '#FF9900' },
  { id: 'gcp', name: 'Google Cloud', category: 'Cloud', level: 3, lastUsed: '2025-01-01', years: 1.5, icon: SiGooglecloud, iconColor: '#4285F4' },
  { id: 'firebase', name: 'Firebase', category: 'Cloud', level: 4, lastUsed: '2025-09-01', years: 2, icon: SiFirebase, iconColor: '#FFCA28' },
  { id: 'docker', name: 'Docker', category: 'Cloud', level: 4, lastUsed: '2026-01-01', years: 3, icon: SiDocker, iconColor: '#2496ED' },
  { id: 'kubernetes', name: 'Kubernetes', category: 'Cloud', level: 3, lastUsed: '2024-09-01', years: 1.5, icon: SiKubernetes, iconColor: '#326CE5' },

  // Frontend Category
  { id: 'react', name: 'React', category: 'Frontend', level: 5, lastUsed: '2026-04-01', years: 4, icon: SiReact, iconColor: '#61DAFB', links: [{ label: 'abdarrahman.dev', href: 'https://abdarrahman.dev' }] },
  { id: 'nextjs', name: 'Next.js', category: 'Frontend', level: 4, lastUsed: '2026-04-01', years: 2, icon: SiNextdotjs, links: [{ label: 'OpenSignl', href: 'https://www.opensignl.com/' }] },
  { id: 'tailwind', name: 'Tailwind', category: 'Frontend', level: 5, lastUsed: '2026-04-01', years: 3, icon: SiTailwindcss, iconColor: '#38BDF8', links: [{ label: 'Live', href: 'https://abdarrahman.dev' }] },
  { id: 'vite', name: 'Vite/CRA', category: 'Frontend', level: 4, lastUsed: '2026-02-01', years: 2, icon: SiVite, iconColor: '#646CFF' },
  { id: 'framer', name: 'Framer Motion', category: 'Frontend', level: 4, lastUsed: '2026-04-01', years: 1.5, icon: SiFramer },

  // Backend Category
  { id: 'node', name: 'Node.js', category: 'Backend', level: 4, lastUsed: '2026-03-01', years: 3, icon: SiNodedotjs, iconColor: '#339933', links: [{ label: 'GitHub', href: 'https://github.com/AbdarrahmanAyyaz' }] },
  { id: 'express', name: 'Express', category: 'Backend', level: 4, lastUsed: '2025-11-01', years: 3, icon: SiExpress },
  { id: 'rest-apis', name: 'REST APIs', category: 'Backend', level: 5, lastUsed: '2026-04-01', years: 4, icon: Network, iconColor: '#0ea5e9' },
  { id: 'webhooks', name: 'Webhooks', category: 'Backend', level: 4, lastUsed: '2026-02-01', years: 2, icon: Zap, iconColor: '#eab308' },
  { id: 'postgresql', name: 'PostgreSQL', category: 'Backend', level: 4, lastUsed: '2026-01-01', years: 2, icon: SiPostgresql, iconColor: '#4169E1' },
  { id: 'mongodb', name: 'MongoDB', category: 'Backend', level: 4, lastUsed: '2025-10-01', years: 3, icon: SiMongodb, iconColor: '#47A248' },

  // DevOps Category
  { id: 'github-actions', name: 'GitHub Actions', category: 'DevOps', level: 4, lastUsed: '2026-02-01', years: 2, icon: SiGithubactions, iconColor: '#2088FF' },
  { id: 'postman', name: 'Postman', category: 'DevOps', level: 5, lastUsed: '2026-01-01', years: 3, icon: SiPostman, iconColor: '#FF6C37' },
  { id: 'terraform', name: 'Terraform', category: 'DevOps', level: 3, lastUsed: '2024-08-01', years: 1, icon: SiTerraform, iconColor: '#7B42BC' },
];

const categories = ['all', 'AI', 'Cloud', 'Frontend', 'Backend', 'DevOps'];

const SkillsMatrix = React.memo(() => {
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
    getFilteredSkills,
  } = useSkillsFilterStore();

  const handleCategoryChange = useCallback(
    (category) => {
      setActiveCategory(category);
    },
    [setActiveCategory]
  );

  const handleQueryChange = useCallback(
    (e) => {
      setQuery(e.target.value);
    },
    [setQuery]
  );

  const handleRecentOnlyChange = useCallback(
    (e) => {
      setRecentOnly(e.target.checked);
    },
    [setRecentOnly]
  );

  const handleMinLevelChange = useCallback(
    (e) => {
      setMinLevel(parseInt(e.target.value));
    },
    [setMinLevel]
  );

  const filteredSkills = useMemo(
    () => getFilteredSkills(skillsData),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getFilteredSkills, activeCategory, query, recentOnly, minLevel]
  );

  const skillCounts = useMemo(() => {
    const counts = { all: skillsData.length };
    categories.forEach((cat) => {
      if (cat !== 'all') {
        counts[cat] = skillsData.filter((skill) => skill.category === cat).length;
      }
    });
    return counts;
  }, []);

  return (
    <div className="space-y-6">
      {/* Category Tabs — horizontally scrollable on mobile to avoid overflow */}
      <div className="-mx-4 sm:mx-0 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 px-4 sm:px-0 pb-1 flex-nowrap sm:flex-wrap w-max sm:w-auto">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <Button
                key={category}
                variant={isActive ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => handleCategoryChange(category)}
                className={`relative shrink-0 ${isActive ? 'shadow-soft' : ''}`}
              >
                {category === 'all' ? 'All' : category}
                <Badge variant="secondary" size="sm" className="ml-2 text-xs">
                  {skillCounts[category]}
                </Badge>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 sm:p-4 bg-surface border border-border rounded-lg">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search skills..."
            value={query}
            onChange={handleQueryChange}
            className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-bg text-text placeholder-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={recentOnly}
              onChange={handleRecentOnlyChange}
              className="w-4 h-4 text-accent border-border rounded focus-visible:ring-2 focus-visible:ring-ring"
            />
            <span className="text-muted">Recent (12mo)</span>
          </label>

          <div className="flex items-center gap-2 text-sm">
            <label className="text-muted">Min Level:</label>
            <select
              value={minLevel}
              onChange={handleMinLevelChange}
              className="px-2 py-1 text-sm border border-border rounded bg-bg text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {[1, 2, 3, 4, 5].map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          {(query || recentOnly || minLevel > 1 || selectedSkills.length > 0) && (
            <Button variant="ghost" size="sm" onClick={resetFilters} className="text-xs">
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Selected chips for cross-section filter */}
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
              const skill = skillsData.find((s) => s.id === skillId);
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

      {/* Card grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill) => (
            <motion.div
              key={skill.id}
              layout
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.2 }}
            >
              <SkillCard
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
          <Button variant="ghost" size="sm" onClick={resetFilters} className="mt-2">
            Reset filters
          </Button>
        </div>
      )}
    </div>
  );
});

export default SkillsMatrix;
