import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../common/SectionHeader';
import { TiltCard } from '../common/TiltCard';
import { WORK_EXPERIENCES } from '../../data/portfolioData';
import { Briefcase, Calendar, MapPin, ChevronRight, TrendingUp, Layers } from 'lucide-react';

export const Experience: React.FC = () => {

  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          badge="03 // CAREER TRAJECTORY"
          title="Work Experience &"
          highlightedText="Engineering Milestones"
          description="A track record of engineering mission-critical machine control systems, leading full-stack automation initiatives, and optimizing high-throughput operations."
          badgeColor="emerald"
        />

        {/* Timeline Container */}
        <div className="relative mt-12">
          {/* Vertical Glowing Cyber Line (desktop) */}
          <div className="hidden lg:block absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-cyan-400 via-emerald-400 to-indigo-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />

          <div className="space-y-12">
            {WORK_EXPERIENCES.map((exp, idx) => {
              const isFirst = idx === 0;
              const accentColor = isFirst ? 'cyan' : idx === 1 ? 'emerald' : 'indigo';
              
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
                >
                  {/* Timeline Node Icon (desktop) */}
                  <div className="hidden lg:flex lg:col-span-1 justify-center">
                    <div className="relative w-16 h-16 rounded-2xl bg-slate-900 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)] z-10">
                      <Briefcase className="w-6 h-6 text-cyan-300" />
                      <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                    </div>
                  </div>

                  {/* Experience Card */}
                  <div className="lg:col-span-11">
                    <TiltCard
                      glowColor={accentColor}
                      className="p-6 sm:p-8"
                    >
                      {/* Top Header Row */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
                        <div>
                          <div className="inline-flex items-center gap-2 mb-2">
                            <span className="px-3 py-0.5 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                              {exp.badge}
                            </span>
                            {isFirst && (
                              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse">
                                CURRENT ROLE
                              </span>
                            )}
                          </div>
                          
                          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                            {exp.role}{' '}
                            <span className="text-cyan-400 font-semibold">
                              @ {exp.company}
                            </span>
                          </h3>
                        </div>

                        {/* Meta info: Period & Location */}
                        <div className="flex flex-col sm:items-end text-xs font-mono text-slate-400 gap-1.5">
                          <span className="flex items-center gap-1.5 text-slate-300">
                            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                            {exp.period}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                            {exp.location}
                          </span>
                        </div>
                      </div>

                      {/* Accomplishments Bullet Points */}
                      <div className="mt-6 space-y-3.5">
                        {exp.description.map((item, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-3 text-sm sm:text-base text-slate-300">
                            <ChevronRight className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-1" />
                            <p className="leading-relaxed">
                              {item.includes(':') ? (
                                <>
                                  <strong className="text-white font-semibold">
                                    {item.split(':')[0]}:
                                  </strong>
                                  {item.split(':')[1]}
                                </>
                              ) : (
                                item
                              )}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Metrics Banner (if present) */}
                      {exp.metrics && (
                        <div className="mt-6 p-3.5 rounded-xl bg-slate-950/80 border border-emerald-500/30 flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <TrendingUp className="w-4 h-4" />
                          </div>
                          <div className="text-xs sm:text-sm font-mono text-emerald-300 font-semibold">
                            Impact: {exp.metrics}
                          </div>
                        </div>
                      )}

                      {/* Tech Stack Pills */}
                      <div className="mt-6 pt-5 border-t border-white/[0.08] flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono text-slate-500 mr-2 flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-cyan-400" />
                          Technologies:
                        </span>
                        {exp.technologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-900/80 text-slate-300 border border-white/[0.08] hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </TiltCard>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
