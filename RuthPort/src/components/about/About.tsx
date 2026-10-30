import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { TiltCard } from '../common/TiltCard';
import { MapPin, Terminal, Layers, Code, Radio, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  const engineeringPillars = [
    {
      icon: Terminal,
      title: 'PyQt / PySide6 Desktop GUI Systems',
      description: 'Specializing in robust, multi-threaded desktop control suites (QThreads, GraphicsScene) that operate without crashing in harsh industrial factory environments.',
      accent: 'cyan' as const,
    },
    {
      icon: Radio,
      title: 'Physical Layer Hardware Integration',
      description: 'Architecting rock-solid serial (RS-232, UART) and USB communication protocols for multi-axis servo/stepper stages, laser triggers, and sensor telemetry loops.',
      accent: 'emerald' as const,
    },
    {
      icon: Layers,
      title: 'DXF & G-Code Geometric Parsers',
      description: 'Developing high-performance vector interpolation engines that convert complex CAD geometries into sub-micron precision motion trajectories with jerk-limited acceleration.',
      accent: 'indigo' as const,
    },
    {
      icon: Code,
      title: 'Full-Stack Web & Automation Architecture',
      description: 'Engineering responsive, lightning-fast web operations platforms using SvelteKit, React, Node.js, and MongoDB that eradicate manual spreadsheet bottlenecks.',
      accent: 'cyan' as const,
    },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          badge="01 // ABOUT ME"
          title="Bridging Hardware Control with"
          highlightedText="Modern Software Engineering"
          description="Based in Mumbai, India, I specialize in the intersection of real-time industrial machine control, spatial vector algorithms, and high-performance full-stack architectures."
          badgeColor="cyan"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Personal Narrative & Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <TiltCard glowColor="cyan" className="p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-4 text-xs font-mono text-cyan-400">
                <Terminal className="w-4 h-4" />
                <span>ruthvij_bio.md • Core Philosophy</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                Engineering software that commands the physical world with sub-micron precision.
              </h3>

              <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                <p>
                  I am a <strong className="text-white font-semibold">Software Design Engineer</strong> at <span className="text-cyan-400 font-semibold">Specialize Products Pvt. Ltd.</span>, where I architect full-fledged desktop control applications and graphical user interfaces for high-tech industrial machines — including Photovoltaic Laser Scribers, Semiconductor Wafer Processors, and 3D/4D Bio-Printers.
                </p>
                <p>
                  My engineering background combines an Electronics Engineering foundation with extensive software expertise in <strong className="text-white font-semibold">Python (PySide6, PyQt)</strong>, real-time <strong className="text-white font-semibold">serial/USB communication</strong> pipelines, and custom <strong className="text-white font-semibold">G-code & DXF vector parsers</strong>. Whether parsing spatial coordinate matrices with Pandas/NumPy or writing synchronized motion dispatchers, I focus on deterministic reliability and sub-micron fidelity.
                </p>
                <p>
                  Beyond desktop machine control, I am an accomplished full-stack developer experienced in building reactive web platforms with <strong className="text-white font-semibold">SvelteKit, React, TypeScript, Node.js, and MongoDB</strong>. At VC Technosolutions, I directed an engineering team that transitioned manual enterprise tracking into an automated platform, boosting operational throughput by 25%.
                </p>
              </div>

              {/* Core Attributes checklist */}
              <div className="mt-8 pt-6 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                {[
                  'Sub-micron toolpath precision',
                  'Multithreaded QThread architecture',
                  'DXF/G-code vector acceleration',
                  'Real-time radiometric IR processing',
                  'Modular Windows/Linux installers',
                  'High-throughput web architectures',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </TiltCard>
          </div>

          {/* Right Column: Location & Core Capabilities Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Location Card */}
            <TiltCard glowColor="emerald" className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-mono uppercase text-emerald-400 font-semibold">Location & Coordinates</span>
                  <h4 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-emerald-400" />
                    Parel, Mumbai, India
                  </h4>
                  <p className="text-xs font-mono text-slate-400 mt-1">
                    18.9950° N, 72.8397° E • IST (UTC+5:30)
                  </p>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[11px] font-mono text-emerald-300 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Available
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/[0.08] text-xs text-slate-400 leading-relaxed">
                Operating from Mumbai's commercial and tech heartland. Available for high-impact software design roles, industrial automation projects, and consulting engagements worldwide.
              </div>
            </TiltCard>

            {/* Quick Stat Pill Cards */}
            <div className="grid grid-cols-1 gap-4">
              {engineeringPillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-900/60 border border-white/[0.06] hover:border-cyan-500/30 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-white">
                          {pillar.title}
                        </h5>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
