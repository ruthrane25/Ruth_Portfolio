import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '../common/SectionHeader';
import { TiltCard } from '../common/TiltCard';
import { SKILL_CATEGORIES } from '../../data/portfolioData';
import { Search, Code2, LayoutGrid, FileCode2, Cpu, Globe, Terminal, Sparkles } from 'lucide-react';

export const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const iconMap: Record<string, React.ReactNode> = {
    LayoutGrid: <LayoutGrid className="w-5 h-5" />,
    Code2: <Code2 className="w-5 h-5" />,
    FileCode2: <FileCode2 className="w-5 h-5" />,
    Cpu: <Cpu className="w-5 h-5" />,
    Globe: <Globe className="w-5 h-5" />,
    Terminal: <Terminal className="w-5 h-5" />,
  };

  const tabs = [
    { id: 'all', label: 'All Technologies' },
    { id: 'desktop', label: 'Desktop & GUI' },
    { id: 'languages', label: 'Languages' },
    { id: 'data', label: 'Data & Parsers' },
    { id: 'hardware', label: 'Hardware & Systems' },
    { id: 'web', label: 'Web & Backend' },
    { id: 'tools', label: 'Databases & Tools' },
  ];

  // Filter categories and skills based on search query and active tab
  const filteredCategories = useMemo(() => {
    return SKILL_CATEGORIES.map((category) => {
      // Check tab match
      const tabMatch = activeTab === 'all' || category.id === activeTab;
      if (!tabMatch) return null;

      // Filter skills by search query
      const matchingSkills = category.skills.filter((skill) =>
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.level.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (skill.tag && skill.tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );

      if (searchQuery.trim() !== '' && matchingSkills.length === 0) {
        return null;
      }

      return {
        ...category,
        skills: searchQuery.trim() !== '' ? matchingSkills : category.skills,
      };
    }).filter(Boolean) as typeof SKILL_CATEGORIES;
  }, [activeTab, searchQuery]);

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          badge="02 // TECHNICAL ARSENAL"
          title="Engineered Skills &"
          highlightedText="Core Competencies"
          description="A comprehensive inventory of industrial software frameworks, vector math parsing engines, hardware communication protocols, and full-stack web technologies."
          badgeColor="cyan"
        />

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900/80 border border-white/[0.08] backdrop-blur-xl w-full md:w-auto">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Interactive Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search skills (e.g. PySide, G-code)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/80 border border-white/[0.08] focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-xs sm:text-sm text-slate-200 placeholder-slate-500 transition-all font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredCategories.map((category, catIdx) => (
              <motion.div
                key={category.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: catIdx * 0.05 }}
                className="h-full"
              >
                <TiltCard
                  glowColor={
                    catIdx % 3 === 0 ? 'cyan' : catIdx % 3 === 1 ? 'emerald' : 'indigo'
                  }
                  className="p-6 h-full flex flex-col justify-between"
                >
                  <div>
                    {/* Category Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-slate-800/80 border border-white/10 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.2)]">
                          {iconMap[category.iconName] || <Code2 className="w-5 h-5" />}
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-white tracking-tight">
                            {category.title}
                          </h3>
                          <span className="text-[11px] font-mono text-cyan-400/80">
                            {category.skills.length} competencies
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                      {category.description}
                    </p>

                    {/* Skill Pills */}
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, sIdx) => {
                        const isExpert = skill.level === 'Expert';
                        return (
                          <div
                            key={sIdx}
                            className={`group relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all duration-200 ${
                              skill.highlight
                                ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-200 shadow-[0_0_10px_rgba(6,182,212,0.15)] hover:border-cyan-400 hover:bg-cyan-500/20'
                                : 'bg-slate-900/60 border-white/[0.08] text-slate-300 hover:border-white/20 hover:text-white'
                            }`}
                          >
                            <span className="font-medium">{skill.name}</span>
                            {skill.tag && (
                              <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.2 rounded bg-cyan-400/20 text-cyan-300 font-semibold">
                                {skill.tag}
                              </span>
                            )}
                            <span
                              className={`text-[10px] font-medium ml-1 ${
                                isExpert ? 'text-emerald-400' : 'text-slate-500'
                              }`}
                            >
                              • {skill.level}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Card Bottom Indicator */}
                  <div className="mt-6 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      Production Tested
                    </span>
                    <span className="text-cyan-400/60 font-semibold">Verified</span>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-16 p-8 rounded-2xl bg-slate-900/50 border border-white/[0.08]">
            <p className="text-slate-400 font-mono text-sm">
              No matching technologies found for "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveTab('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-mono text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/10 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
