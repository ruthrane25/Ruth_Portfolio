import React, { useRef, useState, useEffect } from 'react';
import { Play, RotateCcw, Zap, Target, Cpu, Activity } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

interface ScribeLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  mode: 'P1' | 'P2' | 'P3';
}

export const LaserToolpathCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeMode, setActiveMode] = useState<'P1' | 'P2' | 'P3'>('P1');
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [pulseCount, setPulseCount] = useState<number>(1420);
  const [laserPos, setLaserPos] = useState({ x: 50, y: 50 });
  const [isFiring, setIsFiring] = useState<boolean>(true);

  const linesRef = useRef<ScribeLine[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const laserRef = useRef({ x: 50, y: 50, targetX: 120, targetY: 50, speed: 2.8, lineIndex: 0 });

  // Pre-seed some default scribing paths
  useEffect(() => {
    linesRef.current = [
      { x1: 30, y1: 40, x2: 370, y2: 40, mode: 'P1' },
      { x1: 30, y1: 75, x2: 370, y2: 75, mode: 'P2' },
      { x1: 30, y1: 110, x2: 370, y2: 110, mode: 'P3' },
      { x1: 30, y1: 145, x2: 370, y2: 145, mode: 'P1' },
      { x1: 30, y1: 180, x2: 370, y2: 180, mode: 'P2' },
    ];
  }, []);

  // Main canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = 240);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 400;
      height = canvas.height = 240;
    };
    window.addEventListener('resize', handleResize);

    const loop = () => {
      ctx.fillStyle = '#060a14';
      ctx.fillRect(0, 0, width, height);

      // Draw Silicon Substrate Grid
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.08)';
      ctx.lineWidth = 1;
      const gridSize = 25;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Completed Scribe Kerf Lines
      linesRef.current.forEach((line) => {
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);

        if (line.mode === 'P1') {
          ctx.strokeStyle = '#06b6d4'; // Laser Cyan
          ctx.shadowColor = '#06b6d4';
        } else if (line.mode === 'P2') {
          ctx.strokeStyle = '#10b981'; // Quantum Emerald
          ctx.shadowColor = '#10b981';
        } else {
          ctx.strokeStyle = '#8b5cf6'; // Electric Violet
          ctx.shadowColor = '#8b5cf6';
        }

        ctx.lineWidth = 1.8;
        ctx.shadowBlur = 6;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // Update Laser Motion
      if (isRunning) {
        const l = laserRef.current;
        const dx = l.targetX - l.x;
        const dy = l.targetY - l.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 3) {
          l.x += (dx / dist) * l.speed;
          l.y += (dy / dist) * l.speed;
          setIsFiring(true);

          // Spawn laser plasma sparks
          if (Math.random() > 0.3) {
            for (let i = 0; i < 3; i++) {
              particlesRef.current.push({
                x: l.x,
                y: l.y,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4 - 0.5,
                life: 0,
                maxLife: Math.random() * 15 + 10,
                color: activeMode === 'P1' ? '#22d3ee' : activeMode === 'P2' ? '#34d399' : '#a78bfa',
              });
            }
          }
          setPulseCount((c) => c + 1);
        } else {
          // Reached waypoint: pick next waypoint on grid
          const nextY = ((l.lineIndex % 5) + 1) * 35 + 20;
          l.lineIndex++;
          l.x = 25;
          l.y = nextY;
          l.targetX = width - 35;
          l.targetY = nextY;
        }

        setLaserPos({ x: Math.round(l.x), y: Math.round(l.y) });
      }

      // Draw Laser Spot & Crosshair
      const curX = laserRef.current.x;
      const curY = laserRef.current.y;

      // Galvo targeting reticle
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.arc(curX, curY, 14, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Laser Beam Focal Core
      ctx.beginPath();
      ctx.arc(curX, curY, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = activeMode === 'P1' ? '#06b6d4' : activeMode === 'P2' ? '#10b981' : '#8b5cf6';
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Update and Draw Plasma Spark Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const alpha = 1 - p.life / p.maxLife;
        if (alpha <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.6, 2 * alpha), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isRunning, activeMode]);

  // Click on canvas to command laser to that point
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    linesRef.current.push({
      x1: laserRef.current.x,
      y1: laserRef.current.y,
      x2: clickX,
      y2: clickY,
      mode: activeMode,
    });

    laserRef.current.targetX = clickX;
    laserRef.current.targetY = clickY;
    setIsRunning(true);
  };

  const handleReset = () => {
    linesRef.current = [
      { x1: 30, y1: 40, x2: 370, y2: 40, mode: 'P1' },
      { x1: 30, y1: 75, x2: 370, y2: 75, mode: 'P2' },
      { x1: 30, y1: 110, x2: 370, y2: 110, mode: 'P3' },
    ];
    laserRef.current = { x: 30, y: 40, targetX: 370, targetY: 40, speed: 2.8, lineIndex: 0 };
    particlesRef.current = [];
  };

  return (
    <div className="relative w-full rounded-2xl bg-[#030712]/90 border border-cyan-500/30 overflow-hidden shadow-2xl backdrop-blur-xl">
      {/* Top Header & Mode Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3.5 border-b border-white/[0.08] bg-slate-900/60">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-xs font-mono font-bold text-white tracking-wide">
            SP2L-LSM LASER SCRIBING SIMULATOR
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {(['P1', 'P2', 'P3'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setActiveMode(mode)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-bold transition-all ${
                activeMode === mode
                  ? mode === 'P1'
                    ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_#06b6d4]'
                    : mode === 'P2'
                    ? 'bg-emerald-500 text-slate-950 shadow-[0_0_12px_#10b981]'
                    : 'bg-violet-500 text-white shadow-[0_0_12px_#8b5cf6]'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {mode} Scribe
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Laser Canvas */}
      <div className="relative cursor-crosshair">
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="w-full h-[220px] block"
        />
        <div className="absolute top-2 left-3 text-[10px] font-mono text-cyan-300/80 bg-black/60 px-2 py-0.5 rounded border border-cyan-500/20 pointer-events-none">
          Click canvas to command galvo laser toolpath
        </div>
      </div>

      {/* Live Machine Telemetry HUD */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-slate-950/80 border-t border-white/[0.08] text-xs font-mono">
        <div className="p-2 rounded-lg bg-slate-900/80 border border-cyan-500/20">
          <span className="text-[10px] text-slate-400 block">X-Coordinate</span>
          <span className="font-bold text-cyan-300 text-sm">{(laserPos.x * 1.85).toFixed(2)} mm</span>
        </div>
        <div className="p-2 rounded-lg bg-slate-900/80 border border-emerald-500/20">
          <span className="text-[10px] text-slate-400 block">Y-Coordinate</span>
          <span className="font-bold text-emerald-300 text-sm">{(laserPos.y * 1.85).toFixed(2)} mm</span>
        </div>
        <div className="p-2 rounded-lg bg-slate-900/80 border border-violet-500/20">
          <span className="text-[10px] text-slate-400 block">Pulse Frequency</span>
          <span className="font-bold text-violet-300 text-sm">20.0 kHz</span>
        </div>
        <div className="p-2 rounded-lg bg-slate-900/80 border border-white/10">
          <span className="text-[10px] text-slate-400 block">Galvo Scan Speed</span>
          <span className="font-bold text-slate-100 text-sm">1,850 mm/s</span>
        </div>
      </div>

      {/* Control Actions */}
      <div className="flex items-center justify-between p-3 border-t border-white/[0.08] bg-slate-900/50">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-all"
          >
            <Play className={`w-3.5 h-3.5 ${isRunning ? 'text-emerald-400' : 'text-slate-400'}`} />
            {isRunning ? 'Pause Beam' : 'Resume Laser'}
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 bg-slate-800 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Substrate
          </button>
        </div>

        <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          <span>Sub-micron Repeatability &lt; 1.0 µm</span>
        </div>
      </div>
    </div>
  );
};

