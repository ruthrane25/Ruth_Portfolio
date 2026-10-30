import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '../common/SectionHeader';
import { TiltCard } from '../common/TiltCard';
import { INDUSTRIAL_SYSTEMS } from '../../data/portfolioData';
import { IndustrialSystem } from '../../data/types';
import { MachineModal } from './MachineModal';
import { Cpu, ArrowUpRight } from 'lucide-react';

export const IndustrialSystems: React.FC = () => {
  const [selectedSystem, setSelectedSystem] = useState<IndustrialSystem | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = [
    'All',
    'Photovoltaic',
    'Photo-Thermal',
    'Semiconductor',
    'Laser Marking',
    'Bio-Printing',
    'Additive Manufacturing',
  ];

  const filteredSystems = INDUSTRIAL_SYSTEMS.filter((sys) => {
    if (filterCategory === 'All') return true;
    return sys.category === filterCategory;
  });

  return (
    <section id="industrial" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          badge="04 // INDUSTRIAL FLAGSHIPS"
          title="Industrial Systems & Machine"
          highlightedText="Control Software Portfolio"
          description="Engineered the full application architecture, graphical user interfaces, hardware drivers, and real-time motion logic at Specialize Products Pvt. Ltd."
          badgeColor="cyan"
        />

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 p-2 rounded-2xl bg-slate-900/60 border border-white/[0.06] backdrop-blur-xl">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                filterCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Industrial Machines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredSystems.map((system, idx) => (
              <motion.div
                key={system.id}
                layout
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="h-full"
              >
                <TiltCard
                  glowColor={system.accentColor}
                  className="p-6 sm:p-7 h-full flex flex-col justify-between group"
                  onClick={() => setSelectedSystem(system)}
                >
                  <div>
                    {/* Top Machine Model & Category Bar */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 flex items-center gap-1.5 shadow-[0_0_10px_rgba(6,182,212,0.15)]">
                        <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                        {system.model}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {system.category}
                      </span>
                    </div>

                    {/* Machine Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                      {system.name}
                    </h3>

                    {/* Summary */}
                    <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {system.summary}
                    </p>

                    {/* Key Specs Matrix */}
                    <div className="mt-5 grid grid-cols-2 gap-2 bg-slate-950/60 p-3 rounded-xl border border-white/[0.06]">
                      {system.keySpecs.slice(0, 2).map((spec, sIdx) => (
                        <div key={sIdx}>
                          <div className="text-[10px] font-mono text-slate-400">{spec.label}</div>
                          <div className="text-xs font-mono font-bold text-emerald-400 mt-0.5">
                            {spec.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Badges */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {system.technologies.slice(0, 4).map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-900 text-slate-300 border border-white/[0.08]"
                        >
                          {tech}
                        </span>
                      ))}
                      {system.technologies.length > 4 && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-900 text-cyan-400 border border-white/[0.08]">
                          +{system.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Footer: Inspect Button */}
                  <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                    <span className="text-xs font-mono text-cyan-400 flex items-center gap-1 group-hover:underline">
                      Inspect Architecture & Logic
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Modal for detailed inspection */}
        <MachineModal
          system={selectedSystem}
          isOpen={Boolean(selectedSystem)}
          onClose={() => setSelectedSystem(null)}
        />

      </div>
    </section>
  );
};
