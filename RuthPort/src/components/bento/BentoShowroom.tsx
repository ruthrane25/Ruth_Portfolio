import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../common/SectionHeader';
import { LaserToolpathCanvas } from '../../simulations/LaserToolpathCanvas';
import { LayerDepositionVisualizer } from '../../simulations/LayerDepositionVisualizer';
import { OperationsAnalyticsChart } from '../../simulations/OperationsAnalyticsChart';
import { DroneRadarVisualizer } from '../../simulations/DroneRadarVisualizer';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Cpu, Layers, BarChart3, Navigation, Github, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const BentoShowroom: React.FC = () => {
  return (
    <section id="showroom" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          badge="03 // INTERACTIVE SHOWROOM"
          title="Featured Projects &"
          highlightedText="Live Machine Simulators"
          description="Interact directly with the physical simulations and architectural modules I engineered — from sub-micron laser galvo motion and sterile 4D bioprinting to autonomous drone radar."
          badgeColor="cyan"
        />

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Bento Card 1: Industrial Laser Scribing & Material Processing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-between rounded-3xl bg-slate-900/60 border border-cyan-500/30 p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden group hover:border-cyan-400 transition-all"
          >
            <div>
              {/* Badge & Title */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  Industrial Flagship Machine
                </span>
                <span className="text-xs font-mono text-slate-400">Specialize Products Pvt. Ltd.</span>
              </div>

              <h3 className="text-2xl font-black text-white tracking-tight">
                Industrial Laser Scribing & Material Processing Software
              </h3>

              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Cross-platform desktop control suite operating high-precision thin-film photovoltaic (solar) laser scribers (P1/P2/P3 cuts), semiconductor wafer patterners, and fiber laser markers with telemetry and spatial toolpath generation.
              </p>

              {/* Embedded Interactive Canvas Simulator */}
              <div className="mt-6 mb-6">
                <LaserToolpathCanvas />
              </div>

              {/* Key Features */}
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>Sub-micron coordinate interpolation engine (<strong className="text-white">&lt; 1 µm</strong> fidelity).</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>Custom DXF and G-code parser translating CAD splines into jerk-free galvo pulses.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>Real-time multithreaded serial (RS-232 / UART) command dispatchers.</span>
                </div>
              </div>
            </div>

            {/* Bottom Tech Pills */}
            <div className="mt-6 pt-5 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {['Python', 'PySide6 / PyQt', 'G-Code / DXF', 'RS-232 Serial', 'NumPy', 'Galvo SDK'].map((tech) => (
                  <span key={tech} className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-950 text-slate-300 border border-white/[0.08]">
                    {tech}
                  </span>
                ))}
              </div>

              <a
                href="#industrial"
                className="text-xs font-mono font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group-hover:underline"
              >
                <span>Full Machine Specs</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Bento Card 2: 4D/3D Bio-Printer & Additive Systems */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col justify-between rounded-3xl bg-slate-900/60 border border-emerald-500/30 p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden group hover:border-emerald-400 transition-all"
          >
            <div>
              {/* Badge & Title */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-emerald-400" />
                  Biomedical Additive Platform
                </span>
                <span className="text-xs font-mono text-slate-400">Specialize Products Pvt. Ltd.</span>
              </div>

              <h3 className="text-2xl font-black text-white tracking-tight">
                4D/3D Bio-Printer & Advanced Additive Systems
              </h3>

              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Sterile Class 100 HEPA environment bioprinting control software engineered for living cell hydrogels, pneumatic multi-syringe micro-stepping, and synchronized UV photocuring cycles (365nm / 395nm).
              </p>

              {/* Embedded Interactive Canvas Simulator */}
              <div className="mt-6 mb-6">
                <LayerDepositionVisualizer />
              </div>

              {/* Key Features */}
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Pneumatic pressure regulation loops controlling hydrogel flow within <strong className="text-white">± 1 mbar</strong>.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Peltier PID bio-ink temperature jackets preserving cell viability during deposition.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Integrated UV shutter interlocks and laminar airflow telemetry sensors.</span>
                </div>
              </div>
            </div>

            {/* Bottom Tech Pills */}
            <div className="mt-6 pt-5 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {['Python', 'PyQt', 'Pneumatics PID', 'UV Crosslinking', 'HEPA Logic', 'G-Code'].map((tech) => (
                  <span key={tech} className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-950 text-slate-300 border border-white/[0.08]">
                    {tech}
                  </span>
                ))}
              </div>

              <a
                href="#industrial"
                className="text-xs font-mono font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 group-hover:underline"
              >
                <span>Inspect Bio-Slicer</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Bento Card 3: VC Tech Centralized Operations Platform */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-between rounded-3xl bg-slate-900/60 border border-violet-500/30 p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden group hover:border-violet-400 transition-all"
          >
            <div>
              {/* Badge & Title */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-violet-500/10 text-violet-300 border border-violet-500/30 flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5 text-violet-400" />
                  Enterprise Full-Stack Web Platform
                </span>
                <span className="text-xs font-mono text-slate-400">VC Technosolutions Pvt. Ltd.</span>
              </div>

              <h3 className="text-2xl font-black text-white tracking-tight">
                VC Tech Centralized Operations Platform
              </h3>

              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Centralized internal enterprise platform directed across a 3-engineer team, eradicating manual Excel-based tracking with real-time analytics dashboards and delivering an authenticated <strong className="text-emerald-400 font-bold">+25% efficiency gain</strong>.
              </p>

              {/* Embedded Interactive Analytics Widget */}
              <div className="mt-6 mb-6">
                <OperationsAnalyticsChart />
              </div>

              {/* Key Features */}
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 flex-shrink-0 mt-0.5" />
                  <span>Sub-100ms reactive client page transitions built with <strong className="text-white">SvelteKit & Tailwind CSS</strong>.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 flex-shrink-0 mt-0.5" />
                  <span>High-throughput MongoDB aggregation pipelines generating real-time executive summaries.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 flex-shrink-0 mt-0.5" />
                  <span>Eliminated human data-entry discrepancies with automated Excel ingestion parsing.</span>
                </div>
              </div>
            </div>

            {/* Bottom Tech Pills */}
            <div className="mt-6 pt-5 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {['SvelteKit', 'TypeScript', 'Node.js', 'MongoDB', 'Tailwind CSS', 'REST APIs'].map((tech) => (
                  <span key={tech} className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-950 text-slate-300 border border-white/[0.08]">
                    {tech}
                  </span>
                ))}
              </div>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1 group-hover:underline"
              >
                <Github className="w-3.5 h-3.5" />
                <span>View Repository</span>
              </a>
            </div>
          </motion.div>

          {/* Bento Card 4: Autonomous Drone Delivery System */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col justify-between rounded-3xl bg-slate-900/60 border border-cyan-500/30 p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden group hover:border-cyan-400 transition-all"
          >
            <div>
              {/* Badge & Title */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-cyan-400" />
                  Robotics & Capstone Engineering
                </span>
                <span className="text-xs font-mono text-slate-400">Pillai College / Mumbai Univ</span>
              </div>

              <h3 className="text-2xl font-black text-white tracking-tight">
                Autonomous Drone Delivery Prototype
              </h3>

              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Autonomous quadcopter aerial delivery prototype engineering real-time waypoint navigation, 360-degree LiDAR obstacle sensing, and automated collision avoidance algorithms.
              </p>

              {/* Embedded Interactive Flight Radar */}
              <div className="mt-6 mb-6">
                <DroneRadarVisualizer />
              </div>

              {/* Key Features */}
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>Real-time dynamic obstacle rerouting algorithms using potential field mathematics.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>Ground station telemetry software written in Python communicating over RF radio.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>Target package drop within precision radius of <strong className="text-white">± 1.5 meters</strong>.</span>
                </div>
              </div>
            </div>

            {/* Bottom Tech Pills */}
            <div className="mt-6 pt-5 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {['Python', 'Autonomous Navigation', 'System Integration', 'Obstacle Avoidance', 'Sensors'].map((tech) => (
                  <span key={tech} className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-950 text-slate-300 border border-white/[0.08]">
                    {tech}
                  </span>
                ))}
              </div>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group-hover:underline"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Source Code</span>
              </a>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
