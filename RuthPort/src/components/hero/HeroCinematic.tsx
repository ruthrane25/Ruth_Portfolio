import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, FileText, Sparkles, ChevronDown, Cpu, Terminal, Compass } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { HeroThreeCanvas } from '../../simulations/HeroThreeCanvas';
import { IndustrialTelemetryVisual } from './IndustrialTelemetryVisual';
import { CyberBadge } from '../common/CyberBadge';
import confetti from 'canvas-confetti';

interface HeroCinematicProps {
  onOpenResume: () => void;
}

export const HeroCinematic: React.FC<HeroCinematicProps> = ({ onOpenResume }) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  const roles = [
    'Software Engineer',
    'Industrial Automation & Python Dev',
    'Full-Stack System Architect',
    'Data Processing & Parsing Specialist',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [roles.length]);

  const handleResumeClick = () => {
    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.75 },
      colors: ['#06b6d4', '#10b981', '#8b5cf6'],
    });
    onOpenResume();
  };

  const techPills = [
    'PySide6 / PyQt',
    'Python',
    'DXF & G-Code Parsers',
    'Serial RS-232 / USB',
    'SvelteKit & React',
    'Multi-Axis Motion',
    'MongoDB',
    'Sub-Micron Control',
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Three.js Interactive Particle Cosmos Canvas */}
      <HeroThreeCanvas />

      {/* Hero Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Role Ticker, CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Pulsing Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-flex items-center gap-2"
            >
              <div className="px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md flex items-center gap-2.5 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-xs font-mono font-medium text-emerald-300">
                  Available for Software & AI/Data Roles
                </span>
                <span className="text-slate-600 hidden sm:inline">|</span>
                <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                  Parel, Mumbai, India
                </span>
              </div>
            </motion.div>

            {/* Typewriter Greeting */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg sm:text-xl font-mono text-cyan-400 font-semibold tracking-wide flex items-center gap-2"
            >
              <span>Hi, I'm Ruthvij Rane</span>
              <span className="inline-block animate-wave origin-bottom-right">👋</span>
            </motion.h2>

            {/* Main Headline with 3D Flip-Blur Role Ticker */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-2 min-h-[90px] sm:min-h-[110px] md:min-h-[130px] flex flex-col justify-center"
            >
              <div className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                Architecting{' '}
                <span className="relative inline-block">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentRoleIndex}
                      initial={{ opacity: 0, y: 25, filter: 'blur(10px)', rotateX: 60 }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)', rotateX: 0 }}
                      exit={{ opacity: 0, y: -25, filter: 'blur(10px)', rotateX: -60 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-violet-400 bg-clip-text text-transparent inline-block"
                    >
                      {roles[currentRoleIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </div>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal"
            >
              Bridging advanced hardware-software integration with scalable web architectures and precision control software. Architecting production GUI applications, real-time serial pipelines, and sub-micron vector interpolation engines.
            </motion.p>

            {/* Magnetic CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              {/* Primary Glow CTA */}
              <a
                href="#showroom"
                className="relative group px-6 py-3.5 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-300 hover:opacity-95 shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all duration-300 flex items-center gap-2 overflow-hidden focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <Cpu className="w-4 h-4 text-slate-950 transition-transform group-hover:rotate-12" />
                <span>Explore Engineering Lab</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              {/* Sparkle Burst Resume Download Button */}
              <button
                onClick={handleResumeClick}
                className="px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800/90 border border-white/10 hover:border-violet-500/40 backdrop-blur-xl transition-all duration-300 flex items-center gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.3)] focus:outline-none focus:ring-2 focus:ring-violet-400 group"
              >
                <Sparkles className="w-4 h-4 text-violet-400 transition-transform group-hover:scale-125" />
                <span>Download Resume</span>
              </button>
            </motion.div>

            {/* Core Tech Stack Pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-8 pt-6 border-t border-white/[0.08] w-full"
            >
              <div className="text-xs font-mono uppercase text-slate-500 mb-3 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Core Engineering Stack</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {techPills.map((pill, idx) => (
                  <CyberBadge
                    key={idx}
                    variant={idx % 3 === 0 ? 'cyan' : idx % 3 === 1 ? 'emerald' : 'indigo'}
                    size="sm"
                  >
                    {pill}
                  </CyberBadge>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Live Interactive Telemetry Terminal Visualizer */}
          <div className="lg:col-span-5 flex justify-center items-center w-full">
            <IndustrialTelemetryVisual />
          </div>
        </div>

        {/* Highlight Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 sm:p-6 rounded-2xl bg-slate-950/70 border border-white/[0.08] backdrop-blur-xl"
        >
          {PERSONAL_INFO.stats.map((stat, idx) => (
            <div
              key={idx}
              className={`p-3 sm:p-4 rounded-xl flex flex-col justify-center ${
                idx !== PERSONAL_INFO.stats.length - 1 ? 'lg:border-r lg:border-white/[0.06]' : ''
              }`}
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-mono font-black bg-gradient-to-r from-cyan-400 via-emerald-400 to-violet-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Down Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="mt-10 sm:mt-12 flex flex-col items-center gap-1 text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer z-10"
        onClick={() => {
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-[11px] font-mono uppercase tracking-widest">Scroll Down</span>
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </section>
  );
};

