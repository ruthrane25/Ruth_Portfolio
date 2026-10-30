import React, { useState } from 'react';
import { Terminal, Play, CheckCircle2, Cpu, RefreshCw, Layers } from 'lucide-react';

export const HybridTerminal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'stack' | 'serial' | 'parser'>('stack');
  const [logs, setLogs] = useState<string[]>([
    '$ python -m specialize_engine --init',
    '⚡ Initializing Python 3.12 Runtime & PySide6 Desktop Engine...',
    '✔ Loaded modules: PyQt6, NumPy, Pandas, DXFParser, SerialDispatcher',
    '✔ Synchronizing QThreads: MotionController (Thread #1), Telemetry (Thread #2)',
    '✔ SvelteKit / React Web Architecture: Ready on port :3000',
    '✔ Connected: COM3 Serial Link @ 115,200 baud (Latency < 2ms)',
    '🚀 HYBRID ARCHITECTURE STATUS: 100% OPERATIONAL',
  ]);
  const [isExecuting, setIsExecuting] = useState(false);

  const runCommand = (cmd: string, output: string[]) => {
    setIsExecuting(true);
    setLogs((prev) => [...prev, `$ ${cmd}`, 'Running diagnostic sequence...']);
    setTimeout(() => {
      setLogs((prev) => [...prev.slice(0, prev.length - 1), ...output]);
      setIsExecuting(false);
    }, 600);
  };

  const handleTestSerial = () => {
    runCommand('ping_serial_device --port COM3', [
      'Sending 0xFA SYNC packet...',
      'Received 0xFB ACK from Multi-Axis Motion Board in 1.4ms',
      '✔ Hardware handshake confirmed. Zero packet drops.',
    ]);
  };

  const handleTestParser = () => {
    runCommand('dxf_parser_engine --input solar_cell_p1.dxf', [
      'Reading DXF entities: 42 polylines, 128 arcs, 1,240 spatial nodes',
      'Interpolating toolpath: Sub-micron bezier smoothing applied (< 0.8 µm)',
      'Generated 2,410 G-Code lines. Rapid travel minimized by 35%.',
    ]);
  };

  const handleClear = () => {
    setLogs(['$ terminal_reset --clean', '✔ Terminal re-initialized. Ready for command.']);
  };

  return (
    <div className="relative w-full rounded-2xl bg-[#030712]/95 border border-cyan-500/30 overflow-hidden shadow-2xl backdrop-blur-xl scanline-overlay font-mono">
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900/80 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-xs text-slate-400 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            ruthvij@specialize-workstation:~
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            PySide6 + SvelteKit
          </span>
        </div>
      </div>

      {/* Terminal Output Body */}
      <div className="p-4 sm:p-5 h-[280px] overflow-y-auto space-y-1.5 text-xs text-slate-300">
        {logs.map((log, idx) => {
          const isCommand = log.startsWith('$');
          const isSuccess = log.includes('✔') || log.includes('OPERATIONAL') || log.includes('ACK');
          const isWarning = log.includes('⚡');

          return (
            <div
              key={idx}
              className={`leading-relaxed ${
                isCommand
                  ? 'text-cyan-400 font-bold'
                  : isSuccess
                  ? 'text-emerald-400'
                  : isWarning
                  ? 'text-amber-400'
                  : 'text-slate-300'
              }`}
            >
              {log}
            </div>
          );
        })}
        {isExecuting && (
          <div className="text-cyan-300 animate-pulse flex items-center gap-2">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>Compiling spatial trajectory...</span>
          </div>
        )}
      </div>

      {/* Quick Interactive Command Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-950/90 border-t border-white/[0.08]">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleTestSerial}
            disabled={isExecuting}
            className="px-2.5 py-1.5 rounded-lg text-xs bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 transition-colors flex items-center gap-1.5"
          >
            <Cpu className="w-3.5 h-3.5" />
            Ping COM3 Serial
          </button>

          <button
            onClick={handleTestParser}
            disabled={isExecuting}
            className="px-2.5 py-1.5 rounded-lg text-xs bg-slate-900 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10 transition-colors flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5" />
            Parse DXF Vector
          </button>

          <button
            onClick={handleClear}
            className="px-2 py-1.5 rounded-lg text-xs bg-slate-900 text-slate-400 hover:text-white transition-colors"
          >
            Clear
          </button>
        </div>

        <span className="text-[10px] text-slate-500">Live Shell Simulation</span>
      </div>
    </div>
  );
};

