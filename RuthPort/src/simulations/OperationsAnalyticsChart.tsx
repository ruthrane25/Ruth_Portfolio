import React, { useState, useEffect } from 'react';
import { TrendingUp, CheckCircle, Database, Server, RefreshCw, BarChart3 } from 'lucide-react';

export const OperationsAnalyticsChart: React.FC = () => {
  const [dataPoints, setDataPoints] = useState<number[]>([45, 52, 68, 74, 82, 88, 96, 94, 98, 100]);
  const [activeTab, setActiveTab] = useState<'Live' | 'Daily' | 'Sprint'>('Live');
  const [efficiencyGain, setEfficiencyGain] = useState<number>(25.4);
  const [tasksHandled, setTasksHandled] = useState<number>(14820);

  // Live simulation of metrics increment
  useEffect(() => {
    const interval = setInterval(() => {
      setDataPoints((prev) => {
        const next = [...prev.slice(1)];
        const last = prev[prev.length - 1];
        const jitter = Math.floor(Math.random() * 8) - 3;
        next.push(Math.min(100, Math.max(70, last + jitter)));
        return next;
      });
      setTasksHandled((t) => t + Math.floor(Math.random() * 3) + 1);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const logs = [
    { id: '1', time: '14:24:02', event: 'Excel batch import auto-parsed', status: 'OK', color: 'text-emerald-400' },
    { id: '2', time: '14:24:08', event: 'MongoDB aggregation pipeline synced', status: '200 OK', color: 'text-cyan-400' },
    { id: '3', time: '14:24:14', event: 'SvelteKit SSR page hydration [8ms]', status: 'CACHED', color: 'text-violet-400' },
  ];

  return (
    <div className="relative w-full rounded-2xl bg-[#030712]/90 border border-violet-500/30 overflow-hidden shadow-2xl backdrop-blur-xl">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3.5 border-b border-white/[0.08] bg-slate-900/60">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-violet-400 animate-ping" />
          <span className="text-xs font-mono font-bold text-white tracking-wide">
            VC TECH OPS HUB // REAL-TIME EFFICIENCY RADAR
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {(['Live', 'Daily', 'Sprint'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-bold transition-all ${
                activeTab === tab
                  ? 'bg-violet-500 text-white shadow-[0_0_12px_#8b5cf6]'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Metric Banners */}
      <div className="grid grid-cols-3 gap-2.5 p-3.5 bg-slate-950/70 border-b border-white/[0.06]">
        <div className="p-3 rounded-xl bg-slate-900/80 border border-emerald-500/30">
          <span className="text-[10px] font-mono text-slate-400 block uppercase">Efficiency Gain</span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-xl sm:text-2xl font-mono font-black text-emerald-400">+{efficiencyGain}%</span>
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <span className="text-[10px] font-mono text-emerald-500/80">Replaced manual Excel</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/80 border border-cyan-500/30">
          <span className="text-[10px] font-mono text-slate-400 block uppercase">Automated Records</span>
          <div className="text-xl sm:text-2xl font-mono font-black text-cyan-300 mt-0.5">
            {tasksHandled.toLocaleString()}
          </div>
          <span className="text-[10px] font-mono text-cyan-400/80">Zero tracking variance</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-900/80 border border-violet-500/30">
          <span className="text-[10px] font-mono text-slate-400 block uppercase">Response Latency</span>
          <div className="text-xl sm:text-2xl font-mono font-black text-violet-400 mt-0.5">
            &lt; 45 ms
          </div>
          <span className="text-[10px] font-mono text-violet-400/80">SvelteKit + MongoDB</span>
        </div>
      </div>

      {/* Interactive SVG Chart */}
      <div className="p-4 bg-slate-950/50">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
          <span>Enterprise Throughput Index</span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" /> High Productivity
          </span>
        </div>

        <div className="relative h-28 w-full">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 320 80" preserveAspectRatio="none">
            <defs>
              <linearGradient id="violetGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Area Fill */}
            <path
              d={`M 0 80 ${dataPoints
                .map((val, idx) => `L ${(idx / (dataPoints.length - 1)) * 320} ${80 - (val / 100) * 65}`)
                .join(' ')} L 320 80 Z`}
              fill="url(#violetGradient)"
            />

            {/* Glowing Line */}
            <path
              d={`M 0 ${80 - (dataPoints[0] / 100) * 65} ${dataPoints
                .map((val, idx) => `L ${(idx / (dataPoints.length - 1)) * 320} ${80 - (val / 100) * 65}`)
                .join(' ')}`}
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="2.5"
            />

            {/* Interactive Data Nodes */}
            {dataPoints.map((val, idx) => (
              <circle
                key={idx}
                cx={(idx / (dataPoints.length - 1)) * 320}
                cy={80 - (val / 100) * 65}
                r="3.5"
                fill="#ffffff"
                stroke="#8b5cf6"
                strokeWidth="2"
                className="hover:r-5 transition-all"
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Live Activity Pipeline Log */}
      <div className="p-3 border-t border-white/[0.08] bg-slate-900/60 font-mono text-[11px] space-y-1.5">
        {logs.map((log) => (
          <div key={log.id} className="flex items-center justify-between text-slate-300">
            <span className="text-slate-500">[{log.time}]</span>
            <span className="truncate mx-2 text-slate-200">{log.event}</span>
            <span className={`font-bold ${log.color}`}>{log.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

