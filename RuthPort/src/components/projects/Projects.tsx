import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../common/SectionHeader';
import { TiltCard } from '../common/TiltCard';
import { FEATURED_PROJECTS } from '../../data/portfolioData';
import { Github, TrendingUp, CheckCircle, ArrowUpRight } from 'lucide-react';

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          badge="05 // FEATURED PROJECTS"
          title="Innovative Software &"
          highlightedText="Engineering Systems"
          description="Production web applications, autonomous robotics prototypes, and algorithmic geometric parsers built for enterprise and industrial scale."
          badgeColor="indigo"
        />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {FEATURED_PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="h-full"
            >
              <TiltCard
                glowColor={project.accent}
                className="p-6 sm:p-8 h-full flex flex-col justify-between group"
              >
                <div>
                  {/* Category & Period */}
                  <div className="flex items-center justify-between text-xs font-mono mb-4">
                    <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                      {project.category}
                    </span>
                    <span className="text-slate-500">{project.period}</span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="mt-1 text-xs font-mono text-cyan-400 font-medium">
                    {project.subtitle}
                  </p>

                  {/* Description */}
                  <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Highlights Bullet Points */}
                  <div className="mt-5 space-y-2">
                    {project.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Impact Metric Banner */}
                  <div className="mt-5 p-3 rounded-xl bg-slate-950/80 border border-cyan-500/30 flex items-center gap-2.5">
                    <TrendingUp className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span className="text-xs font-mono text-cyan-300 font-semibold">
                      {project.metrics}
                    </span>
                  </div>
                </div>

                {/* Footer: Tech Stack & Links */}
                <div className="mt-6 pt-5 border-t border-white/[0.08]">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-900/90 text-slate-300 border border-white/[0.08]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        <span>Source Code</span>
                      </a>
                    )}

                    <a
                      href={project.githubUrl || 'https://github.com/ruthrane25'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 font-semibold group-hover:underline"
                    >
                      <span>Explore Repository</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
