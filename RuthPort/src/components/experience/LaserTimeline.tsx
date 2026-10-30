import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { WORK_EXPERIENCES } from '../../data/portfolioData';
import { TiltCard } from '../common/TiltCard';
import { Briefcase, Calendar, MapPin, ChevronRight, TrendingUp, Layers, Zap } from 'lucide-react';

export const LaserTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 30%'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={containerRef} className="relative mt-12">
      {/* Background Laser Guide Track */}
      <div className="hidden lg:block absolute left-8 top-6 bottom-6 w-0.5 bg-slate-800" />

      {/* Dynamic Animated Laser Beam that fills as user scrolls */}
      <motion.div
        style={{ scaleY, transformOrigin: 'top' }}
        className="hidden lg:block absolute left-8 top-6 bottom-6 w-1 bg-gradient-to-b from-cyan-400 via-emerald-400 to-violet-500 shadow-[0_0_15px_#06b6d4] z-10"
      />

      <div className="space-y-12">
        {WORK_EXPERIENCES.map((exp, idx) => {
          const isFirst = idx === 0;
          const accent = isFirst ? 'cyan' : idx === 1 ? 'emerald' : 'violet';

          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Laser Node Anchor Target */}
              <div className="hidden lg:flex lg:col-span-1 justify-center">
                <div className="relative w-16 h-16 rounded-2xl bg-slate-900 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)] z-20">
                  <Briefcase className="w-6 h-6 text-cyan-300" />
                  {isFirst && (
                    <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-emerald-400 animate-ping" />
                  )}
                  {/* Glowing Laser Spot */}
                  <span className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_8px_#22d3ee]" />
                </div>
              </div>

              {/* Experience Card */}
              <div className="lg:col-span-11">
                <TiltCard glowColor={accent === 'violet' ? 'indigo' : accent} className="p-6 sm:p-8">
                  {/* Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-5">
                    <div>
                      <div className="inline-flex items-center gap-2 mb-2">
                        <span className="px-3 py-0.5 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                          {exp.badge}
                        </span>
                        {isFirst && (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse">
                            ACTIVE ROLE
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

                  {/* Bullet Points */}
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

                  {/* Metrics Banner */}
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

                  {/* Technologies */}
                  <div className="mt-6 pt-5 border-t border-white/[0.08] flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono text-slate-500 mr-2 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-cyan-400" />
                      Engineered with:
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
  );
};

