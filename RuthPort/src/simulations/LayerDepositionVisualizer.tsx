import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, ShieldCheck, Sun, Wind, Layers } from 'lucide-react';

interface PrintLine {
  x: number;
  y: number;
  z: number;
  width: number;
  isCured: boolean;
}

export const LayerDepositionVisualizer: React.FC = () => {
  const [currentLayer, setCurrentLayer] = useState<number>(3);
  const [isPrinting, setIsPrinting] = useState<boolean>(true);
  const [uvCuring, setUvCuring] = useState<boolean>(false);
  const [pressure, setPressure] = useState<number>(2.4); // bar
  const [nozzlePos, setNozzlePos] = useState({ x: 120, y: 70 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const stateRef = useRef({
    nozzleX: 40,
    nozzleY: 60,
    vx: 2.2,
    layer: 3,
    lines: [] as PrintLine[],
  });

  // Prepopulate scaffold lines
  useEffect(() => {
    const defaultLines: PrintLine[] = [];
    for (let l = 1; l <= 3; l++) {
      for (let r = 0; r < 4; r++) {
        defaultLines.push({
          x: 40 + r * 55,
          y: 60 + l * 20,
          z: l,
          width: 50,
          isCured: l < 3,
        });
      }
    }
    stateRef.current.lines = defaultLines;
  }, []);

  // Canvas loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = 230);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 400;
      height = canvas.height = 230;
    };
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.fillStyle = '#050914';
      ctx.fillRect(0, 0, width, height);

      // Draw heated bed grid with perspective
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.12)';
      ctx.lineWidth = 1;
      const bedY = 170;

      // Bed surface plane
      ctx.beginPath();
      ctx.moveTo(20, bedY);
      ctx.lineTo(width - 20, bedY);
      ctx.lineTo(width - 50, bedY + 45);
      ctx.lineTo(50, bedY + 45);
      ctx.closePath();
      ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
      ctx.fill();
      ctx.stroke();

      // Render deposited scaffold layers
      const lines = stateRef.current.lines;
      lines.forEach((line) => {
        const lineY = bedY - line.z * 14;
        ctx.beginPath();
        ctx.roundRect(line.x, lineY, line.width, 10, 5);

        if (line.isCured) {
          ctx.fillStyle = 'rgba(16, 185, 129, 0.7)'; // Cured Quantum Emerald
          ctx.shadowColor = '#10b981';
          ctx.shadowBlur = 6;
        } else {
          ctx.fillStyle = 'rgba(139, 92, 246, 0.85)'; // Fresh Hydrogel Electric Violet
          ctx.shadowColor = '#8b5cf6';
          ctx.shadowBlur = 10;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Update Nozzle Position
      if (isPrinting) {
        stateRef.current.nozzleX += stateRef.current.vx;
        if (stateRef.current.nozzleX > width - 70) {
          stateRef.current.vx = -Math.abs(stateRef.current.vx);
          // Trigger UV pulse on layer stroke turn
          setUvCuring(true);
          setTimeout(() => setUvCuring(false), 600);
        } else if (stateRef.current.nozzleX < 50) {
          stateRef.current.vx = Math.abs(stateRef.current.vx);
        }

        // Add extrusion segment
        if (Math.random() > 0.6) {
          stateRef.current.lines.push({
            x: stateRef.current.nozzleX - 10,
            y: bedY - stateRef.current.layer * 14,
            z: stateRef.current.layer,
            width: 20,
            isCured: false,
          });
          if (stateRef.current.lines.length > 28) {
            stateRef.current.lines.shift();
          }
        }

        setNozzlePos({
          x: Math.round(stateRef.current.nozzleX),
          y: Math.round(bedY - stateRef.current.layer * 14 - 30),
        });
      }

      // Draw Extrusion Syringe Nozzle
      const nX = stateRef.current.nozzleX;
      const nY = bedY - stateRef.current.layer * 14 - 35;

      // Metallic Nozzle Barrel
      ctx.fillStyle = '#64748b';
      ctx.beginPath();
      ctx.moveTo(nX - 12, nY - 45);
      ctx.lineTo(nX + 12, nY - 45);
      ctx.lineTo(nX + 4, nY);
      ctx.lineTo(nX - 4, nY);
      ctx.closePath();
      ctx.fill();

      // Extruder needle tip
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(nX - 1.5, nY, 3, 10);

      // Dispensed hydrogel droplet
      ctx.beginPath();
      ctx.arc(nX, nY + 11, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#a78bfa';
      ctx.fill();

      // UV Curing Flash Ring
      if (uvCuring) {
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(nX, nY + 12, 45, 18, 0, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(167, 139, 250, 0.9)';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#8b5cf6';
        ctx.shadowBlur = 20;
        ctx.stroke();

        ctx.fillStyle = 'rgba(139, 92, 246, 0.15)';
        ctx.fill();
        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPrinting, uvCuring]);

  const handleNextLayer = () => {
    setCurrentLayer((l) => (l >= 8 ? 1 : l + 1));
    stateRef.current.layer = stateRef.current.layer >= 8 ? 1 : stateRef.current.layer + 1;
    // Mark prior lines as cured
    stateRef.current.lines.forEach((ln) => (ln.isCured = true));
    setUvCuring(true);
    setTimeout(() => setUvCuring(false), 900);
  };

  const handleReset = () => {
    stateRef.current.layer = 1;
    setCurrentLayer(1);
    stateRef.current.lines = [];
  };

  return (
    <div className="relative w-full rounded-2xl bg-[#030712]/90 border border-emerald-500/30 overflow-hidden shadow-2xl backdrop-blur-xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3.5 border-b border-white/[0.08] bg-slate-900/60">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-mono font-bold text-white tracking-wide">
            SP2L-4D-BIO // LAYER DEPOSITION & UV ENGINE
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            HEPA Class 100
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 flex items-center gap-1.5">
            <Sun className="w-3.5 h-3.5 text-violet-400" />
            UV 395nm
          </span>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative">
        <canvas ref={canvasRef} className="w-full h-[220px] block" />
        <div className="absolute top-2 right-3 text-[10px] font-mono text-emerald-300 bg-black/60 px-2 py-0.5 rounded border border-emerald-500/20">
          Layer {currentLayer} of 8 • Syringe Z-Offset: +{(currentLayer * 0.15).toFixed(2)} mm
        </div>
      </div>

      {/* Diagnostics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-slate-950/80 border-t border-white/[0.08] text-xs font-mono">
        <div className="p-2 rounded-lg bg-slate-900/80 border border-emerald-500/20">
          <span className="text-[10px] text-slate-400 block">Extrusion Pressure</span>
          <span className="font-bold text-emerald-300 text-sm">{pressure.toFixed(1)} Bar</span>
        </div>
        <div className="p-2 rounded-lg bg-slate-900/80 border border-violet-500/20">
          <span className="text-[10px] text-slate-400 block">UV Photocuring</span>
          <span className={`font-bold text-sm ${uvCuring ? 'text-violet-300 animate-pulse' : 'text-slate-400'}`}>
            {uvCuring ? 'ACTIVE 395nm' : 'STANDBY'}
          </span>
        </div>
        <div className="p-2 rounded-lg bg-slate-900/80 border border-cyan-500/20">
          <span className="text-[10px] text-slate-400 block">Cell Scaffold Temp</span>
          <span className="font-bold text-cyan-300 text-sm">37.0 °C (PID)</span>
        </div>
        <div className="p-2 rounded-lg bg-slate-900/80 border border-white/10">
          <span className="text-[10px] text-slate-400 block">Laminar Airflow</span>
          <span className="font-bold text-slate-100 text-sm">0.45 m/s ISO 5</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between p-3 border-t border-white/[0.08] bg-slate-900/50">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPrinting(!isPrinting)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 transition-all"
          >
            <Play className={`w-3.5 h-3.5 ${isPrinting ? 'text-emerald-400' : 'text-slate-400'}`} />
            {isPrinting ? 'Pause Motion' : 'Start Motion'}
          </button>

          <button
            onClick={handleNextLayer}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-violet-500/20 text-violet-300 border border-violet-500/40 hover:bg-violet-500/30 transition-all"
          >
            <Layers className="w-3.5 h-3.5" />
            + Extrude Layer
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 bg-slate-800 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
          <span>Pneumatics:</span>
          <input
            type="range"
            min="1"
            max="4.5"
            step="0.1"
            value={pressure}
            onChange={(e) => setPressure(parseFloat(e.target.value))}
            className="w-20 accent-emerald-400 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

