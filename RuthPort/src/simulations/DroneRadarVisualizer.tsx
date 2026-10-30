import React, { useRef, useState, useEffect } from 'react';
import { Navigation, ShieldAlert, Target, Compass, Play, RotateCcw } from 'lucide-react';

interface Obstacle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export const DroneRadarVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const [altitude, setAltitude] = useState<number>(45.2);
  const [avoidanceCount, setAvoidanceCount] = useState<number>(18);
  const [isAutoFlying, setIsAutoFlying] = useState<boolean>(true);
  const [closestDistance, setClosestDistance] = useState<number>(8.4);

  const stateRef = useRef({
    droneX: 80,
    droneY: 100,
    targetX: 280,
    targetY: 120,
    radarAngle: 0,
    obstacles: [
      { x: 180, y: 70, vx: 0.8, vy: 0.4, radius: 14 },
      { x: 220, y: 150, vx: -0.6, vy: 0.3, radius: 18 },
      { x: 120, y: 140, vx: 0.5, vy: -0.5, radius: 12 },
    ] as Obstacle[],
  });

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
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const maxRadius = Math.min(centerX, centerY) - 15;

      // Draw Radar Concentric Range Rings
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.15)';
      ctx.lineWidth = 1;
      [0.33, 0.66, 1.0].forEach((ratio) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, maxRadius * ratio, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Crosshair Axes
      ctx.beginPath();
      ctx.moveTo(centerX - maxRadius, centerY);
      ctx.lineTo(centerX + maxRadius, centerY);
      ctx.moveTo(centerX, centerY - maxRadius);
      ctx.lineTo(centerX, centerY + maxRadius);
      ctx.stroke();

      // Radar Sweep Beam
      stateRef.current.radarAngle += 0.035;
      const sweepEnd = {
        x: centerX + Math.cos(stateRef.current.radarAngle) * maxRadius,
        y: centerY + Math.sin(stateRef.current.radarAngle) * maxRadius,
      };

      const sweepGrad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, maxRadius);
      sweepGrad.addColorStop(0, 'rgba(6, 182, 212, 0.4)');
      sweepGrad.addColorStop(1, 'rgba(6, 182, 212, 0.0)');

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, maxRadius, stateRef.current.radarAngle - 0.45, stateRef.current.radarAngle);
      ctx.closePath();
      ctx.fillStyle = sweepGrad;
      ctx.fill();

      // Update and Draw Obstacles
      const s = stateRef.current;
      let minDis = 999;

      s.obstacles.forEach((obs) => {
        obs.x += obs.vx;
        obs.y += obs.vy;

        if (obs.x < 30 || obs.x > width - 30) obs.vx *= -1;
        if (obs.y < 30 || obs.y > height - 30) obs.vy *= -1;

        // Draw Obstacle Warning Sphere
        ctx.beginPath();
        ctx.arc(obs.x, obs.y, obs.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(239, 68, 68, 0.25)';
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1.5;
        ctx.fill();
        ctx.stroke();

        // Calculate distance to drone
        const dX = obs.x - s.droneX;
        const dY = obs.y - s.droneY;
        const dist = Math.sqrt(dX * dX + dY * dY);
        if (dist < minDis) minDis = dist;

        // Proximity detection line
        if (dist < 60) {
          ctx.beginPath();
          ctx.moveTo(s.droneX, s.droneY);
          ctx.lineTo(obs.x, obs.y);
          ctx.strokeStyle = 'rgba(245, 158, 11, 0.8)';
          ctx.setLineDash([2, 4]);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      });

      setClosestDistance(Math.max(1.2, +(minDis * 0.15).toFixed(1)));

      // Update Drone Navigation
      if (isAutoFlying) {
        let desiredX = s.targetX - s.droneX;
        let desiredY = s.targetY - s.droneY;
        const distToTarget = Math.sqrt(desiredX * desiredX + desiredY * desiredY);

        if (distToTarget > 8) {
          let moveX = (desiredX / distToTarget) * 1.6;
          let moveY = (desiredY / distToTarget) * 1.6;

          // Potential field obstacle avoidance vector
          s.obstacles.forEach((obs) => {
            const dX = s.droneX - obs.x;
            const dY = s.droneY - obs.y;
            const dist = Math.sqrt(dX * dX + dY * dY);
            if (dist < 48) {
              const repelForce = (48 - dist) * 0.12;
              moveX += (dX / dist) * repelForce;
              moveY += (dY / dist) * repelForce;
              setAvoidanceCount((c) => c + 1);
            }
          });

          s.droneX += moveX;
          s.droneY += moveY;
        } else {
          // Reached target waypoint, pick new delivery drop point
          s.targetX = Math.random() * (width - 100) + 50;
          s.targetY = Math.random() * (height - 80) + 40;
        }
      }

      // Draw Planned Toolpath Vector to Target
      ctx.beginPath();
      ctx.moveTo(s.droneX, s.droneY);
      ctx.lineTo(s.targetX, s.targetY);
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Target Waypoint
      ctx.beginPath();
      ctx.arc(s.targetX, s.targetY, 7, 0, Math.PI * 2);
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(s.targetX, s.targetY, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();

      // Draw Autonomous Drone Quadcopter
      const dX = s.droneX;
      const dY = s.droneY;

      // Drone Central Fuselage
      ctx.beginPath();
      ctx.arc(dX, dY, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Rotor Arms
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(dX - 8, dY - 8);
      ctx.lineTo(dX + 8, dY + 8);
      ctx.moveTo(dX - 8, dY + 8);
      ctx.lineTo(dX + 8, dY - 8);
      ctx.stroke();

      // LiDAR Sensor field ring
      ctx.beginPath();
      ctx.arc(dX, dY, 28, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.35)';
      ctx.setLineDash([2, 3]);
      ctx.stroke();
      ctx.setLineDash([]);

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isAutoFlying]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    stateRef.current.targetX = clickX;
    stateRef.current.targetY = clickY;
  };

  const handleReset = () => {
    stateRef.current.droneX = 60;
    stateRef.current.droneY = 60;
    stateRef.current.targetX = 300;
    stateRef.current.targetY = 180;
  };

  return (
    <div className="relative w-full rounded-2xl bg-[#030712]/90 border border-cyan-500/30 overflow-hidden shadow-2xl backdrop-blur-xl">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3.5 border-b border-white/[0.08] bg-slate-900/60">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-xs font-mono font-bold text-white tracking-wide">
            AUTONOMOUS FLIGHT RADAR // 360° LiDAR SWEEP
          </span>
        </div>

        <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
          Collision Avoidance: Active
        </span>
      </div>

      {/* Radar Canvas */}
      <div className="relative cursor-crosshair">
        <canvas ref={canvasRef} onClick={handleCanvasClick} className="w-full h-[220px] block" />
        <div className="absolute top-2 left-3 text-[10px] font-mono text-cyan-300/80 bg-black/60 px-2 py-0.5 rounded border border-cyan-500/20 pointer-events-none">
          Click radar to redirect delivery drop waypoint
        </div>
      </div>

      {/* Diagnostics HUD */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-slate-950/80 border-t border-white/[0.08] text-xs font-mono">
        <div className="p-2 rounded-lg bg-slate-900/80 border border-cyan-500/20">
          <span className="text-[10px] text-slate-400 block">Flight Altitude</span>
          <span className="font-bold text-cyan-300 text-sm">45.2 m AGL</span>
        </div>
        <div className="p-2 rounded-lg bg-slate-900/80 border border-emerald-500/20">
          <span className="text-[10px] text-slate-400 block">LiDAR Closest Obstacle</span>
          <span className="font-bold text-emerald-300 text-sm">{closestDistance} m Safe</span>
        </div>
        <div className="p-2 rounded-lg bg-slate-900/80 border border-violet-500/20">
          <span className="text-[10px] text-slate-400 block">Avoidance Vectors</span>
          <span className="font-bold text-violet-300 text-sm">{avoidanceCount} Recalculated</span>
        </div>
        <div className="p-2 rounded-lg bg-slate-900/80 border border-white/10">
          <span className="text-[10px] text-slate-400 block">Ground Station</span>
          <span className="font-bold text-slate-100 text-sm">Serial RF 433MHz</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between p-3 border-t border-white/[0.08] bg-slate-900/50">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAutoFlying(!isAutoFlying)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-all"
          >
            <Play className={`w-3.5 h-3.5 ${isAutoFlying ? 'text-emerald-400' : 'text-slate-400'}`} />
            {isAutoFlying ? 'Hold Hover' : 'Resume Flight'}
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 bg-slate-800 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Course
          </button>
        </div>

        <div className="text-[11px] font-mono text-cyan-400 flex items-center gap-1.5">
          <Target className="w-3.5 h-3.5" />
          <span>Radius Precision: ± 1.5 m</span>
        </div>
      </div>
    </div>
  );
};

