import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'emerald' | 'indigo' | 'amber';
  onClick?: () => void;
  maxTilt?: number;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  glowColor = 'cyan',
  onClick,
  maxTilt = 8,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setRotation({ x: rotateX, y: rotateY });
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.15,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  const glowBorderClass = {
    cyan: 'hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.2)]',
    emerald: 'hover:border-emerald-500/50 hover:shadow-[0_0_25px_rgba(16,185,129,0.2)]',
    indigo: 'hover:border-indigo-500/50 hover:shadow-[0_0_25px_rgba(99,102,241,0.2)]',
    amber: 'hover:border-amber-500/50 hover:shadow-[0_0_25px_rgba(245,158,11,0.2)]',
  }[glowColor];

  const glareGradient = {
    cyan: 'radial-gradient(circle at %x% %y%, rgba(6, 182, 212, 0.25), transparent 60%)',
    emerald: 'radial-gradient(circle at %x% %y%, rgba(16, 185, 129, 0.25), transparent 60%)',
    indigo: 'radial-gradient(circle at %x% %y%, rgba(99, 102, 241, 0.25), transparent 60%)',
    amber: 'radial-gradient(circle at %x% %y%, rgba(245, 158, 11, 0.25), transparent 60%)',
  }[glowColor]
    .replace('%x%', `${glarePosition.x}%`)
    .replace('%y%', `${glarePosition.y}%`);

  return (
    <div
      style={{ perspective: 1200 }}
      className="h-full w-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
          scale: isHovered ? 1.015 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 260,
          mass: 0.6,
        }}
        style={{ transformStyle: 'preserve-3d' }}
        className={cn(
          'relative rounded-2xl border border-white/[0.08] bg-slate-900/60 backdrop-blur-xl transition-colors duration-300 overflow-hidden cursor-default',
          glowBorderClass,
          onClick && 'cursor-pointer',
          className
        )}
      >
        {/* Dynamic Sheen / Glare overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          style={{
            background: glareGradient,
            opacity: glarePosition.opacity,
          }}
        />

        {/* Content */}
        <div className="relative z-20 h-full">{children}</div>
      </motion.div>
    </div>
  );
};

