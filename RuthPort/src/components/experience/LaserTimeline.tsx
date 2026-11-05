import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WORK_EXPERIENCES } from '../../data/portfolioData';
import { Briefcase, Calendar, MapPin, ChevronRight, TrendingUp, Layers, Sparkles, LayoutList, Layers3, CheckCircle2 } from 'lucide-react';

export const LaserTimeline: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(WORK_EXPERIENCES[0].id);
  const [viewMode, setViewMode] = useState<'tabs' | 'all'>('tabs');

  const activeExp = WORK_EXPERIENCES.find((e) => e.id === activeId) || WORK_EXPERIENCES[0];

  const getAccent = (id: string) => {
    switch (id) {
      case 'specialize-products':
        return {
          glow: 'cyan',
          border: 'border-cyan-500/40',
          bg: 'bg-cyan-500/10',
          text: 'text-cyan-300',
          pill: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
          bullet: 'bg-cyan-400',
        };
      case 'vc-technosolutions':
        return {
          glow: 'emerald',
          border: 'border-emerald-500/40',
          bg: 'bg-emerald-500/10',
          text: 'text-emerald-300',
          pill: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
          bullet: 'bg-emerald-400',
        };
      default:
        return {
          glow: 'violet',
          border: 'border-violet-500/40',
          bg: 'bg-violet-500/10',
          text: 'text-violet-300',
          pill: 'bg-violet-500/20 text-violet-300 border-violet-500/40',
          bullet: 'bg-violet-400',
        };
    }
  };

  const renderCardContent = (exp: typeof WORK_EXPERIENCES[0], isCompact = false) => {
    const isFirst = exp.id === 'specialize-products';
    const accent = getAccent(exp.id);

    return (
      <div className="space-y-4">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-white/[0.08] pb-3.5">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium border ${accent.pill}`}>
                {exp.badge}
              </span>
              {isFirst && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  CURRENT ACTIVE ROLE
                </span>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {exp.role}{' '}
              <span className={`font-semibold ${accent.text}`}>
                @ {exp.company}
              </span>
            </h3>
          </div>

          <div className="flex flex-wrap sm:flex-col sm:items-end text-xs font-mono text-slate-400 gap-y-1 gap-x-3">
            <span className="flex items-center gap-1.5 text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
              {exp.period}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              {exp.location}
            </span>
          </div>
        </div>

        {/* Bullet Points */}
        <div className="space-y-2.5">
          {exp.description.map((item, dIdx) => {
            const hasColon = item.includes(':');
            const prefix = hasColon ? item.split(':')[0] : null;
            const rest = hasColon ? item.substring(item.indexOf(':') + 1) : item;

            return (
              <div key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <span className={`w-1.5 h-1.5 rounded-full ${accent.bullet} mt-2 flex-shrink-0 shadow-[0_0_6px_currentColor]`} />
                <p>
                  {prefix ? (
                    <>
                      <strong className="text-white font-semibold">
                        {prefix}:
                      </strong>
                      <span className="text-slate-300">{rest}</span>
                    </>
                  ) : (
                    item
                  )}
                </p>
              </div>
            );
          })}
        </div>

        {/* Metrics Banner */}
        {exp.metrics && (
          <div className="p-2.5 sm:p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-2.5">
            <div className="p-1 rounded bg-emerald-500/20 text-emerald-300 flex-shrink-0">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
            <div className="text-xs font-mono text-emerald-300 font-medium">
              <span className="text-slate-400 uppercase text-[10px] tracking-wider block">Key Milestones & Impact:</span>
              {exp.metrics}
            </div>
          </div>
        )}

        {/* Technologies Footer */}
        <div className="pt-3 border-t border-white/[0.08] flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-mono text-slate-400 mr-1 flex items-center gap-1">
            <Layers className="w-3 h-3 text-cyan-400" />
            Stack:
          </span>
          {exp.technologies.map((tech, tIdx) => (
            <span
              key={tIdx}
              className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-900/90 text-slate-300 border border-white/[0.08] hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="relative mt-8 max-w-4xl mx-auto w-full">
      {/* Control Switcher Bar */}
      <div className="flex items-center justify-between gap-3 mb-5 px-1">
        <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Curated Roles & Engineering Impact</span>
        </div>

        {/* View Toggle */}
        <div className="flex items-center bg-slate-900/90 border border-white/10 rounded-lg p-0.5 text-xs font-mono">
          <button
            onClick={() => setViewMode('tabs')}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
              viewMode === 'tabs'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Interactive</span> Tabs
          </button>
          <button
            onClick={() => setViewMode('all')}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md transition-all ${
              viewMode === 'all'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutList className="w-3.5 h-3.5" />
            <span>View All</span>
          </button>
        </div>
      </div>

      {viewMode === 'tabs' ? (
        <div className="space-y-4">
          {/* Tab Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-slate-900/70 backdrop-blur-xl border border-white/10 rounded-xl">
            {WORK_EXPERIENCES.map((exp) => {
              const isActive = exp.id === activeId;
              const accent = getAccent(exp.id);

              return (
                <button
                  key={exp.id}
                  onClick={() => setActiveId(exp.id)}
                  className={`relative p-3 rounded-lg text-left transition-all duration-200 flex flex-col justify-between ${
                    isActive
                      ? 'bg-slate-800/90 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                      : 'hover:bg-slate-800/50 border border-transparent opacity-75 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 w-full">
                    <span className={`text-[10px] font-mono uppercase tracking-wider font-semibold truncate ${
                      isActive ? accent.text : 'text-slate-400'
                    }`}>
                      {exp.company}
                    </span>
                    {exp.id === 'specialize-products' && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                    )}
                  </div>

                  <div className="text-xs font-bold text-white truncate mt-1">
                    {exp.role}
                  </div>

                  <div className="text-[11px] font-mono text-slate-400 mt-1">
                    {exp.period.split('–')[0].trim()} – {exp.period.includes('Present') ? 'Present' : exp.period.split('–')[1]?.trim() || ''}
                  </div>

                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-cyan-400 via-emerald-400 to-indigo-400 rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Tab Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeExp.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="p-4 sm:p-5 rounded-2xl bg-[#090d16]/90 border border-cyan-500/30 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.5)]"
            >
              {renderCardContent(activeExp)}
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        /* Vertical Compact Cards (View All) */
        <div className="space-y-4">
          {WORK_EXPERIENCES.map((exp, idx) => {
            const accent = getAccent(exp.id);

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`p-4 sm:p-5 rounded-2xl bg-[#090d16]/90 border ${accent.border} backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.4)]`}
              >
                {renderCardContent(exp, true)}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

