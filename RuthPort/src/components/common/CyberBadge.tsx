import React from 'react';
import { cn } from '../../utils/cn';

interface CyberBadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'emerald' | 'indigo' | 'amber' | 'slate';
  size?: 'sm' | 'md';
  className?: string;
  dot?: boolean;
}

export const CyberBadge: React.FC<CyberBadgeProps> = ({
  children,
  variant = 'cyan',
  size = 'md',
  className = '',
  dot = false,
}) => {
  const variantStyles = {
    cyan: 'border-cyan-500/20 bg-cyan-500/10 text-cyan-300 hover:border-cyan-500/40 hover:bg-cyan-500/15',
    emerald: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300 hover:border-emerald-500/40 hover:bg-emerald-500/15',
    indigo: 'border-indigo-500/20 bg-indigo-500/10 text-indigo-300 hover:border-indigo-500/40 hover:bg-indigo-500/15',
    amber: 'border-amber-500/20 bg-amber-500/10 text-amber-300 hover:border-amber-500/40 hover:bg-amber-500/15',
    slate: 'border-slate-700 bg-slate-800/60 text-slate-300 hover:border-slate-600',
  }[variant];

  const dotColors = {
    cyan: 'bg-cyan-400 shadow-[0_0_6px_#06b6d4]',
    emerald: 'bg-emerald-400 shadow-[0_0_6px_#10b981]',
    indigo: 'bg-indigo-400 shadow-[0_0_6px_#6366f1]',
    amber: 'bg-amber-400 shadow-[0_0_6px_#f59e0b]',
    slate: 'bg-slate-400',
  }[variant];

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-0.5',
    md: 'text-xs md:text-sm px-3 py-1',
  }[size];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-mono font-medium backdrop-blur-md transition-all duration-200',
        variantStyles,
        sizeStyles,
        className
      )}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full', dotColors)} />}
      {children}
    </span>
  );
};

