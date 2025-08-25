import { create } from 'zustand';

const useSkillsFilterStore = create((set, get) => ({
  // Filter state
  activeCategory: 'all',
  query: '',
  recentOnly: false,
  minLevel: 1,
  selectedSkills: [],

  // Actions
  setActiveCategory: (category) => set({ activeCategory: category }),
  setQuery: (query) => set({ query }),
  setRecentOnly: (recentOnly) => set({ recentOnly }),
  setMinLevel: (minLevel) => set({ minLevel }),
  
  toggleSkill: (skillId) => set((state) => ({
    selectedSkills: state.selectedSkills.includes(skillId)
      ? state.selectedSkills.filter(id => id !== skillId)
      : [...state.selectedSkills, skillId]
  })),
  
  clearSelectedSkills: () => set({ selectedSkills: [] }),
  
  // Reset all filters
  resetFilters: () => set({
    activeCategory: 'all',
    query: '',
    recentOnly: false,
    minLevel: 1,
    selectedSkills: [],
  }),

  // Computed getters
  getFilteredSkills: (skills) => {
    const state = get();
    return skills.filter(skill => {
      // Category filter
      if (state.activeCategory !== 'all' && skill.category !== state.activeCategory) {
        return false;
      }
      
      // Search query filter
      if (state.query && !skill.name.toLowerCase().includes(state.query.toLowerCase())) {
        return false;
      }
      
      // Recent only filter (last 12 months)
      if (state.recentOnly && skill.lastUsed) {
        const lastUsedDate = new Date(skill.lastUsed);
        const twelveMonthsAgo = new Date();
        twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
        if (lastUsedDate < twelveMonthsAgo) {
          return false;
        }
      }
      
      // Minimum level filter
      if (skill.level < state.minLevel) {
        return false;
      }
      
      return true;
    });
  },
}));

export default useSkillsFilterStore;