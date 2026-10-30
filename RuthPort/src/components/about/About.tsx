import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { TiltCard } from '../common/TiltCard';
import { HybridTerminal } from './HybridTerminal';
import { MapPin, Terminal, Layers, Code, Radio, CheckCircle2, Cpu, Globe } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const About: React.FC = () => {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          badge="01 // THE HYBRID EDGE"
          title="Bridging Full-Stack Web with"
          highlightedText="Industrial Control Software"
          description="Most engineers build either pure web platforms or isolated firmware. I build at the exact convergence point: real-time desktop control suites, micron-precision vector math, and modern reactive cloud applications."
          badgeColor="cyan"
        />

        {/* Split Layout: Narrative & Interactive Live Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Professional Summary & Philosophy */}
          <div className="lg:col-span-6 space-y-6">
            <TiltCard glowColor="cyan" className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <Terminal className="w-4 h-4" />
                  <span>ruthvij_bio.ts // Architectural Focus</span>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-300">
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  {PERSONAL_INFO.location}
                </div>
              </div>

              <h3 className="text-2xl font-black text-white tracking-tight leading-snug">
                Turning complex physical machine kinematics into elegant, rock-solid software.
              </h3>

              <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal mt-4">
                <p>
                  As a <strong className="text-white font-semibold">Software Design Engineer</strong> at <span className="text-cyan-400 font-semibold">Specialize Products Pvt. Ltd.</span>, I architect and build complete desktop control applications, hardware communication layers, and rich graphical user interfaces for high-precision industrial systems — including Photovoltaic Laser Scribers, Semiconductor Wafer Processors, and 3D/4D Bio-Printers.
                </p>
                <p>
                  My engineering foundation is built on <strong className="text-white font-semibold">Python (PySide6 / PyQt)</strong>, multithreaded control architectures, deterministic <strong className="text-white font-semibold">serial (RS-232 / UART) & USB pipelines</strong>, and algorithmic <strong className="text-white font-semibold">G-code & DXF vector parsing</strong>.
                </p>
                <p>
                  On the modern web front, I bring proven experience leading full-stack platforms with <strong className="text-white font-semibold">SvelteKit, React, TypeScript, Node.js, and MongoDB</strong>. At VC Technosolutions, I directed an engineering team that automated legacy manual tracking, delivering an authenticated, reactive operational platform that boosted daily throughput by <strong className="text-emerald-400 font-semibold">25%</strong>.
                </p>
              </div>

              {/* Core Pillars Grid */}
              <div className="mt-8 pt-6 border-t border-white/[0.08] grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-cyan-500/20">
                  <span className="text-cyan-400 font-bold block">Desktop GUI</span>
                  <span className="text-slate-400 text-[11px]">PySide6, PyQt, QThreads</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-emerald-500/20">
                  <span className="text-emerald-400 font-bold block">Physical Hardware</span>
                  <span className="text-slate-400 text-[11px]">RS-232, USB, Galvo, Motion</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-violet-500/20">
                  <span className="text-violet-400 font-bold block">Vector Math</span>
                  <span className="text-slate-400 text-[11px]">DXF, G-Code, NumPy, &lt; 1µm</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/10">
                  <span className="text-slate-200 font-bold block">Modern Web</span>
                  <span className="text-slate-400 text-[11px]">SvelteKit, React, MongoDB</span>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Right Column: Interactive Live Terminal Simulator */}
          <div className="lg:col-span-6">
            <HybridTerminal />
          </div>

        </div>

      </div>
    </section>
  );
};
