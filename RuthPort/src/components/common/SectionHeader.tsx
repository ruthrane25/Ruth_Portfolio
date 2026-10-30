import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface SectionHeaderProps {
  badge: string;
  title: string;
  highlightedText?: string;
  description?: string;
  align?: 'left' | 'center';
  badgeColor?: 'cyan' | 'emerald' | 'indigo';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  highlightedText,
  description,
  align = 'left',
  badgeColor = 'cyan',
  className = '',
}) => {
  const badgeClasses = {
    cyan: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.15)]',
    emerald: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.15)]',
    indigo: 'border-indigo-500/30 text-indigo-400 bg-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.15)]',
  }[badgeColor];

  const dotClasses = {
    cyan: 'bg-cyan-400 shadow-[0_0_8px_#06b6d4]',
    emerald: 'bg-emerald-400 shadow-[0_0_8px_#10b981]',
    indigo: 'bg-indigo-400 shadow-[0_0_8px_#6366f1]',
  }[badgeColor];

  return (
    <div
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' ? 'text-center mx-auto max-w-3xl' : 'text-left max-w-3xl',
        className
      )}
    >
      {/* Eyebrow Cyber Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 mb-4"
      >
        <span
          className={cn(
            'px-3.5 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase border backdrop-blur-md flex items-center gap-2',
            badgeClasses
          )}
        >
          <span className={cn('w-1.5 h-1.5 rounded-full animate-ping', dotClasses)} />
          {badge}
        </span>
      </motion.div>

      {/* Main Section Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white"
      >
        {title}{' '}
        {highlightedText && (
          <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-indigo-400 bg-clip-text text-transparent">
            {highlightedText}
          </span>
        )}
      </motion.h2>

      {/* Subtitle / Description */}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-slate-400 font-normal leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};

