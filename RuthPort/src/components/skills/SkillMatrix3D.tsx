import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '../common/SectionHeader';
import { TiltCard } from '../common/TiltCard';
import { Search, Code2, LayoutGrid, FileCode2, Cpu, Globe, Terminal, Sparkles, Check } from 'lucide-react';

interface SkillItem {
  name: string;
  level: number; // percentage (e.g. 95, 90, 85)
  badge?: string;
  highlight?: boolean;
}

interface SkillCategoryData {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  accent: 'cyan' | 'emerald' | 'violet';
  skills: SkillItem[];
}

export const SkillMatrix3D: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: SkillCategoryData[] = [
    {
      id: 'desktop',
      title: 'Software & Desktop GUI',
      subtitle: 'Production desktop applications, multithreaded control engines & factory installers',
      icon: <LayoutGrid className="w-5 h-5" />,
      accent: 'cyan',
      skills: [
        { name: 'PySide6', level: 98, badge: 'Core', highlight: true },
        { name: 'PyQt', level: 98, badge: 'Core', highlight: true },
        { name: 'Qt Designer', level: 92 },
        { name: 'Desktop GUI Architecture', level: 95, highlight: true },
        { name: 'QThreads / Multithreading', level: 92 },
        { name: 'PyInstaller', level: 90, badge: 'Packaging' },
        { name: 'Inno Setup', level: 90, badge: 'Installer' },
      ],
    },
    {
      id: 'languages',
      title: 'Core Languages',
      subtitle: 'Strong typed & scripting languages powering desktop, spatial and cloud tiers',
      icon: <Code2 className="w-5 h-5" />,
      accent: 'emerald',
      skills: [
        { name: 'Python', level: 98, badge: 'Primary', highlight: true },
        { name: 'TypeScript', level: 90, highlight: true },
        { name: 'JavaScript (ES6+)', level: 92 },
        { name: 'Java', level: 82 },
        { name: 'SQL', level: 88 },
        { name: 'HTML5 & CSS3', level: 95 },
      ],
    },
    {
      id: 'data',
      title: 'Data & Geometric Processing',
      subtitle: 'CAD vector translation, sub-micron spatial toolpaths & scientific computation',
      icon: <FileCode2 className="w-5 h-5" />,
      accent: 'violet',
      skills: [
        { name: 'DXF Parsing & Geometry', level: 96, badge: '< 1 µm', highlight: true },
        { name: 'G-Code Parsing & Toolpaths', level: 96, badge: 'Vector', highlight: true },
        { name: 'Pandas', level: 90, highlight: true },
        { name: 'NumPy', level: 92 },
        { name: 'Data Processing & CSV/JSON', level: 95 },
        { name: 'Data Visualization', level: 88 },
      ],
    },
    {
      id: 'hardware',
      title: 'Hardware-Software & Systems',
      subtitle: 'Physical serial protocols, motion control firmware & sensor telemetry loops',
      icon: <Cpu className="w-5 h-5" />,
      accent: 'cyan',
      skills: [
        { name: 'Serial (RS-232 / UART) Comms', level: 96, badge: 'Protocol', highlight: true },
        { name: 'USB Communication Pipelines', level: 94, highlight: true },
        { name: 'Hardware-Software Integration', level: 95, highlight: true },
        { name: 'Multi-Axis Motion Controllers', level: 92 },
        { name: 'Automation Workflows', level: 94 },
        { name: 'Closed-Loop Telemetry & Debugging', level: 90 },
      ],
    },
    {
      id: 'web',
      title: 'Web & Backend Development',
      subtitle: 'Modern reactive frontend architectures, fast APIs & microservices',
      icon: <Globe className="w-5 h-5" />,
      accent: 'emerald',
      skills: [
        { name: 'React.js', level: 92, highlight: true },
        { name: 'SvelteKit', level: 92, badge: 'Production', highlight: true },
        { name: 'Node.js', level: 88 },
        { name: 'Express.js', level: 88 },
        { name: 'Tailwind CSS', level: 96, highlight: true },
        { name: 'RESTful APIs & Integration', level: 94 },
      ],
    },
    {
      id: 'tools',
      title: 'Databases & Tooling',
      subtitle: 'High-availability datastores, distributed VCS & agile deployment pipelines',
      icon: <Terminal className="w-5 h-5" />,
      accent: 'violet',
      skills: [
        { name: 'MongoDB', level: 90, highlight: true },
        { name: 'MySQL', level: 86 },
        { name: 'Git & GitHub', level: 95, highlight: true },
        { name: 'SVN (Subversion)', level: 82 },
        { name: 'Agile Methodologies', level: 90 },
        { name: 'Software Deployment & Packaging', level: 92 },
      ],
    },
  ];

  const filteredCategories = useMemo(() => {
    return categories
      .map((cat) => {
        const matchesTab = activeTab === 'all' || cat.id === activeTab;
        if (!matchesTab) return null;

        const matchingSkills = cat.skills.filter(
          (s) =>
            s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (s.badge && s.badge.toLowerCase().includes(searchQuery.toLowerCase()))
        );

        if (searchQuery.trim() !== '' && matchingSkills.length === 0) return null;

        return {
          ...cat,
          skills: searchQuery.trim() !== '' ? matchingSkills : cat.skills,
        };
      })
      .filter(Boolean) as SkillCategoryData[];
  }, [activeTab, searchQuery]);

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          badge="04 // TECHNICAL SKILL MATRIX"
          title="Interactive 3D Perspective"
          highlightedText="Engineering Arsenal"
          description="A complete, transparent inventory of programming languages, hardware communication protocols, vector parsing engines, and full-stack web frameworks."
          badgeColor="cyan"
        />

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900/80 border border-white/[0.08] backdrop-blur-xl w-full md:w-auto">
            {[
              { id: 'all', label: 'All Technologies' },
              { id: 'desktop', label: 'Desktop & GUI' },
              { id: 'languages', label: 'Languages' },
              { id: 'data', label: 'Data & Parsers' },
              { id: 'hardware', label: 'Hardware Comms' },
              { id: 'web', label: 'Web & Backend' },
              { id: 'tools', label: 'Databases & Tools' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Filter skills (e.g. PySide, G-code)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900/80 border border-white/[0.08] focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-xs sm:text-sm text-slate-200 placeholder-slate-500 transition-all font-mono"
            />
          </div>
        </div>

        {/* 3D Perspective Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredCategories.map((cat, catIdx) => (
              <motion.div
                key={cat.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: catIdx * 0.05 }}
                className="h-full"
              >
                <TiltCard
                  glowColor={cat.accent === 'violet' ? 'indigo' : cat.accent}
                  className="p-6 h-full flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-slate-800/90 border border-white/10 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.2)]">
                          {cat.icon}
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-white tracking-tight">
                            {cat.title}
                          </h3>
                          <span className="text-[11px] font-mono text-cyan-400/80">
                            {cat.skills.length} Competencies
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                      {cat.subtitle}
                    </p>

                    {/* Skill Bars with Animated Meters */}
                    <div className="space-y-3">
                      {cat.skills.map((skill, sIdx) => (
                        <div key={sIdx} className="space-y-1">
                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className="flex items-center gap-1.5 text-slate-200 font-medium">
                              {skill.name}
                              {skill.badge && (
                                <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-400/20 text-cyan-300 font-bold">
                                  {skill.badge}
                                </span>
                              )}
                            </span>
                            <span className="text-slate-400 text-[11px]">{skill.level}%</span>
                          </div>

                          {/* Progress Meter Bar */}
                          <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-white/[0.04]">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: sIdx * 0.05 }}
                              className={`h-full rounded-full ${
                                cat.accent === 'cyan'
                                  ? 'bg-gradient-to-r from-cyan-500 to-cyan-300 shadow-[0_0_8px_#06b6d4]'
                                  : cat.accent === 'emerald'
                                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-300 shadow-[0_0_8px_#10b981]'
                                  : 'bg-gradient-to-r from-violet-500 to-violet-300 shadow-[0_0_8px_#8b5cf6]'
                              }`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-6 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      Production Tested
                    </span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3" /> Verified
                    </span>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

