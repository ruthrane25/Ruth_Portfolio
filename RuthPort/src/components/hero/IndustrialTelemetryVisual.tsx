import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Play, Radio, Zap, Shield, Terminal } from 'lucide-react';

export const IndustrialTelemetryVisual: React.FC = () => {
  const [coords, setCoords] = useState({ x: 142.842, y: 78.194, z: 1.25 });
  const [activeMode, setActiveMode] = useState<'P1' | 'P2' | 'P3'>('P2');
  const [simRunning, setSimRunning] = useState(true);

  // Micro-motion coordinate simulation
  useEffect(() => {
    if (!simRunning) return;
    const interval = setInterval(() => {
      setCoords((prev) => ({
        x: +(prev.x + (Math.random() - 0.48) * 0.15).toFixed(3),
        y: +(prev.y + (Math.random() - 0.48) * 0.12).toFixed(3),
        z: +(1.25 + (Math.random() - 0.5) * 0.005).toFixed(3),
      }));
    }, 180);
    return () => clearInterval(interval);
  }, [simRunning]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative w-full max-w-lg lg:max-w-xl mx-auto"
    >
      {/* Outer ambient glow */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500/30 via-emerald-500/20 to-indigo-500/30 blur-xl opacity-70 group-hover:opacity-100 transition duration-1000 animate-pulse-glow" />

      {/* Main Container Card */}
      <div className="relative rounded-2xl border border-cyan-500/30 bg-[#090e1a]/90 backdrop-blur-2xl p-5 sm:p-6 shadow-[0_0_50px_rgba(6,182,212,0.15)] scanline-overlay">
        
        {/* Terminal Window Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-400/40" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-400/40" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-400/40" />
            <span className="ml-2 font-mono text-xs text-slate-400 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              specialize_scripter_core.py • v4.2.0
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              SERIAL LIVE
            </span>
          </div>
        </div>

        {/* Machine Mode Selector */}
        <div className="mt-4 flex items-center justify-between bg-slate-950/60 p-2.5 rounded-xl border border-white/[0.06]">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono font-bold text-white">SP2L-LSM SYSTEM</span>
          </div>
          <div className="flex items-center gap-1.5">
            {(['P1', 'P2', 'P3'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setActiveMode(mode)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold transition-all ${
                  activeMode === mode
                    ? 'bg-cyan-500 text-slate-950 shadow-[0_0_10px_#06b6d4]'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white'
                }`}
              >
                {mode} CUT
              </button>
            ))}
          </div>
        </div>

        {/* Real-time Multi-Axis Coordinates Display */}
        <div className="mt-4 grid grid-cols-3 gap-2.5">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-cyan-500/20">
            <div className="text-[10px] font-mono uppercase text-slate-400">X-Axis (Linear)</div>
            <div className="text-base sm:text-lg font-mono font-black text-cyan-300 mt-0.5">
              {coords.x.toFixed(3)}
              <span className="text-[10px] font-normal text-slate-500 ml-1">mm</span>
            </div>
            <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-cyan-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${(coords.x % 100)}%` }}
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-emerald-500/20">
            <div className="text-[10px] font-mono uppercase text-slate-400">Y-Axis (Galvo)</div>
            <div className="text-base sm:text-lg font-mono font-black text-emerald-300 mt-0.5">
              {coords.y.toFixed(3)}
              <span className="text-[10px] font-normal text-slate-500 ml-1">mm</span>
            </div>
            <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${(coords.y % 100)}%` }}
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/80 border border-indigo-500/20">
            <div className="text-[10px] font-mono uppercase text-slate-400">Z-Focus Offset</div>
            <div className="text-base sm:text-lg font-mono font-black text-indigo-300 mt-0.5">
              {coords.z.toFixed(3)}
              <span className="text-[10px] font-normal text-slate-500 ml-1">mm</span>
            </div>
            <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-indigo-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${(coords.z * 50)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Live Vector Toolpath Visualizer Canvas Graphic */}
        <div className="mt-4 relative h-32 rounded-xl bg-slate-950/90 border border-white/[0.08] overflow-hidden flex items-center justify-center p-3">
          {/* Subtle Grid Lines */}
          <div className="absolute inset-0 bg-grid-pattern opacity-30" />

          {/* Scribing Path Simulation graphic */}
          <svg className="w-full h-full" viewBox="0 0 300 90">
            <defs>
              <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
                <stop offset="60%" stopColor="#10b981" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="1" />
              </linearGradient>
            </defs>

            {/* Vector Toolpaths */}
            <path
              d="M 15 25 L 80 25 L 120 65 L 190 65 L 230 25 L 285 25"
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <path
              d="M 15 25 L 80 25 L 120 65 L 190 65 L 230 25 L 285 25"
              fill="none"
              stroke="url(#laserGrad)"
              strokeWidth="2.5"
            />

            {/* Micro-spot moving cursor */}
            <circle cx="190" cy="65" r="4" fill="#06b6d4" className="animate-ping" />
            <circle cx="190" cy="65" r="3" fill="#ffffff" />

            {/* Annotation markers */}
            <text x="20" y="20" fill="#06b6d4" fontSize="8" fontFamily="monospace">
              P1_START (0.000)
            </text>
            <text x="175" y="80" fill="#10b981" fontSize="8" fontFamily="monospace">
              GALVO_TRIGGER: 20kHz
            </text>
            <text x="235" y="20" fill="#818cf8" fontSize="8" fontFamily="monospace">
              ISO_GAP: 15µm
            </text>
          </svg>

          {/* Overlay Status */}
          <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-cyan-500/30 text-[10px] font-mono text-cyan-300">
            <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
            Galvo: 1,500 mm/s
          </div>
        </div>

        {/* Live Diagnostics Bar */}
        <div className="mt-4 pt-3 border-t border-white/[0.08] flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 gap-2">
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Laser Pulse: <strong className="text-white font-bold">1064 nm / 30W</strong></span>
          </div>

          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Thermal: <strong className="text-emerald-300 font-bold">23.8 °C Normal</strong></span>
          </div>

          <button
            onClick={() => setSimRunning(!simRunning)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/[0.05] hover:bg-white/[0.1] text-cyan-300 border border-cyan-500/30 transition-colors"
          >
            <Play className={`w-3 h-3 ${simRunning ? 'text-emerald-400' : 'text-slate-400'}`} />
            {simRunning ? 'Live Stream' : 'Paused'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
