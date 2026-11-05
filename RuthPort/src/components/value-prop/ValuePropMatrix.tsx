import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../common/SectionHeader';
import { TiltCard } from '../common/TiltCard';
import { Cpu, BarChart3, Navigation2, Rocket, ArrowUpRight, CheckCircle2, Zap } from 'lucide-react';

interface SuperpowerItem {
  id: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  metric: string;
  icon: React.ReactNode;
  accent: 'cyan' | 'emerald' | 'violet' | 'amber';
}

export const ValuePropMatrix: React.FC = () => {
  const superpowers: SuperpowerItem[] = [
    {
      id: 'hybrid-edge',
      badge: 'ARCHITECTURAL ADVANTAGE',
      title: 'The Hybrid Edge (Hardware + Modern Web)',
      tagline: 'Bridging physical machine control with cloud-speed interfaces',
      description:
        'A rare dual capability combining high-level full-stack web platforms (React, SvelteKit, Node.js) with heavy industrial software engineering (Python, PyQt/PySide6, multi-threading, serial RS-232 telemetry, and G-code/DXF vector parsing).',
      highlights: [
        'Deterministic physical layer communication (UART/USB)',
        'Sub-micron motion trajectory synchronization (< 1 µm)',
        'Zero-latency desktop GUIs operating in factory environments',
        'Modern reactive web interfaces with instant page hydration',
      ],
      metric: '6+ Production Machine Suites',
      icon: <Cpu className="w-6 h-6" />,
      accent: 'cyan',
    },
    {
      id: 'data-analytics',
      badge: 'PROVEN BUSINESS IMPACT',
      title: 'Data Processing & Analytics Engineering',
      tagline: 'Transforming raw unstructured data into actionable operational throughput',
      description:
        'Expertise in parsing complex vector CAD geometries (DXF/G-code), CSV/JSON streams, building NumPy/Pandas processing pipelines, and transforming legacy data silos into real-time analytics executive dashboards.',
      highlights: [
        'Engineered custom DXF/G-code vector mathematical parsers',
        'Automated enterprise tracking replacing manual Excel bottlenecks',
        'Directly unlocked +25% operational efficiency gain at VC Tech',
        'Real-time radiometric infrared thermal matrix calculation',
      ],
      metric: '+25% Proven Efficiency Uplift',
      icon: <BarChart3 className="w-6 h-6" />,
      accent: 'emerald',
    },
    {
      id: 'autonomous-realtime',
      badge: 'MISSION-CRITICAL RELIABILITY',
      title: 'Autonomous & Real-Time Logic',
      tagline: 'Deterministic event loops, spatial algorithms & sensor integration',
      description:
        'Proven track record building asynchronous event loops, multithreaded Python QThread architectures, and autonomous obstacle-avoidance algorithms for robotics prototypes and industrial laser heads.',
      highlights: [
        'Potential-field autonomous flight rerouting algorithms',
        'Non-blocking multithreaded serial event loops in PyQt',
        'Closed-loop sensor integration and emergency interlocks',
        'Spatial toolpath optimization cutting non-productive travel by 35%',
      ],
      metric: '< 2 ms Real-Time Response',
      icon: <Navigation2 className="w-6 h-6" />,
      accent: 'violet',
    },
    {
      id: 'production-ownership',
      badge: 'END-TO-END EXECUTION',
      title: 'Production-Ready Ownership & Leadership',
      tagline: 'From blank codebase to factory floor and cloud deployment',
      description:
        'Demonstrated leadership directing engineering teams, structuring clean modular repositories, packaging complex C-extended Python applications (PyInstaller, Inno Setup), and deploying live platforms that power real-world machinery.',
      highlights: [
        'Directed a 3-engineer cross-functional development team',
        'Built full factory-ready Windows installers (.exe) for machines',
        'Full deployment lifecycle: local, factory floor, and cloud Vercel',
        'Strong agile sprint planning, code review, and version control',
      ],
      metric: '100% Production Deployed',
      icon: <Rocket className="w-6 h-6" />,
      accent: 'amber',
    },
  ];

  return (
    <section id="why-hire-me" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          badge="02 // VALUE PROPOSITION MATRIX"
          title="Why Hire Me?"
          highlightedText="Engineering Superpowers"
          description="A strategic combination of high-concurrency software architecture, low-level machine communication, data parsing rigor, and demonstrated commercial impact."
          badgeColor="cyan"
        />

        {/* 2x2 Interactive Superpower Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {superpowers.map((item, idx) => {
            const glowColor =
              item.accent === 'violet'
                ? 'indigo'
                : item.accent === 'amber'
                ? 'amber'
                : item.accent;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="h-full"
              >
                <TiltCard
                  glowColor={glowColor}
                  className="p-6 sm:p-8 h-full flex flex-col justify-between group"
                >
                  <div>
                    {/* Eyebrow Badge & Icon Row */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-3 rounded-2xl border ${
                            item.accent === 'cyan'
                              ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                              : item.accent === 'emerald'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                              : item.accent === 'violet'
                              ? 'bg-violet-500/10 text-violet-400 border-violet-500/30 shadow-[0_0_15px_rgba(139,92,246,0.25)]'
                              : 'bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                          }`}
                        >
                          {item.icon}
                        </div>

                        <div>
                          <span
                            className={`text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded-full border ${
                              item.accent === 'cyan'
                                ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20'
                                : item.accent === 'emerald'
                                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                                : item.accent === 'violet'
                                ? 'bg-violet-500/10 text-violet-300 border-violet-500/20'
                                : 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                            }`}
                          >
                            {item.badge}
                          </span>
                        </div>
                      </div>

                      {/* Verified Metric Badge */}
                      <span className="text-xs font-mono font-bold text-white bg-slate-950/80 px-2.5 py-1 rounded-lg border border-white/[0.08]">
                        {item.metric}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs font-mono text-cyan-400/90 mt-1 font-medium">
                      {item.tagline}
                    </p>

                    {/* Description */}
                    <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                      {item.description}
                    </p>

                    {/* Key Highlights Checklist */}
                    <div className="mt-6 space-y-2">
                      {item.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                          <CheckCircle2
                            className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${
                              item.accent === 'cyan'
                                ? 'text-cyan-400'
                                : item.accent === 'emerald'
                                ? 'text-emerald-400'
                                : item.accent === 'violet'
                                ? 'text-violet-400'
                                : 'text-amber-400'
                            }`}
                          />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom Accent Line */}
                  <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-cyan-400" />
                      Ready for High-Impact Roles
                    </span>
                    <a
                      href="#contact"
                      className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 group-hover:underline"
                    >
                      Discuss Fit
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

