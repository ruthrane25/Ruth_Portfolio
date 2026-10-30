import React from 'react';
import { Modal } from '../common/Modal';
import { IndustrialSystem } from '../../data/types';
import { Cpu, Terminal, Radio, CheckCircle, Activity, Layers } from 'lucide-react';
import { CyberBadge } from '../common/CyberBadge';

interface MachineModalProps {
  system: IndustrialSystem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const MachineModal: React.FC<MachineModalProps> = ({ system, isOpen, onClose }) => {
  if (!system) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={system.name}
      subtitle={`Model: ${system.model} • Specialize Products Pvt. Ltd. Flagship`}
      badge={`${system.category} System`}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6 text-slate-200">
        
        {/* Full System Overview & Engineering Role */}
        <div className="p-5 rounded-xl bg-slate-900/60 border border-cyan-500/20">
          <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-2 flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            System Overview & Engineering Role
          </h4>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {system.fullDescription}
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs font-mono text-emerald-400">
            <CheckCircle className="w-4 h-4" />
            <span>Complete desktop application, GUI, hardware driver layer, and motion logic engineered in-house.</span>
          </div>
        </div>

        {/* Key Engineering Specifications Grid */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-3 flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Key Specifications & Benchmarks
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {system.keySpecs.map((spec, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-950/80 border border-white/[0.08]">
                <div className="text-[11px] font-mono text-slate-400">{spec.label}</div>
                <div className="text-sm sm:text-base font-mono font-bold text-white mt-1">
                  {spec.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Two-Column Deep Dive: Software Engineered vs Hardware Integration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Software Architecture Column */}
          <div className="p-5 rounded-xl bg-slate-900/40 border border-white/[0.08]">
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-3 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              Software Logic & GUI Architecture
            </h4>
            <ul className="space-y-2.5">
              {system.softwareEngineered.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Hardware & Protocols Column */}
          <div className="p-5 rounded-xl bg-slate-900/40 border border-white/[0.08]">
            <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold mb-3 flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-400" />
              Hardware Integration & Protocols
            </h4>
            <ul className="space-y-2.5">
              {system.hardwareIntegration.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Technologies Used */}
        <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-slate-400 mr-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              Stack:
            </span>
            {system.technologies.map((t, idx) => (
              <CyberBadge key={idx} variant="cyan" size="sm">
                {t}
              </CyberBadge>
            ))}
          </div>

          <div className="text-xs font-mono text-slate-400">
            Deployed at Specialize Products Client Facilities
          </div>
        </div>

      </div>
    </Modal>
  );
};
