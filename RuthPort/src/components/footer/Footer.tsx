import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.08] bg-[#02050c] pt-16 pb-12 overflow-hidden z-20">
      {/* Top subtle glow line */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/[0.06]">
          
          {/* Brand & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-cyan-500/40 flex items-center justify-center font-mono font-black text-cyan-400">
                RR.
              </div>
              <span className="text-lg font-black text-white tracking-tight">
                Ruthvij Rane
              </span>
            </div>
            <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-sm">
              Software Design Engineer • Industrial Machine Control (PyQt/PySide) • High-Performance Web Architectures
            </p>
          </div>

          {/* Quick Anchor Navigation */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-xs font-mono text-slate-400">
            <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
            <a href="#experience" className="hover:text-cyan-400 transition-colors">Experience</a>
            <a href="#industrial" className="hover:text-cyan-400 transition-colors">Industrial Systems</a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
            <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
            <a href="#education" className="hover:text-cyan-400 transition-colors">Education</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-900/80 border border-white/[0.08] text-slate-400 hover:text-white hover:border-cyan-500/40 hover:shadow-[0_0_12px_rgba(6,182,212,0.2)] transition-all"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-900/80 border border-white/[0.08] text-slate-400 hover:text-white hover:border-indigo-500/40 hover:shadow-[0_0_12px_rgba(99,102,241,0.2)] transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="p-2.5 rounded-xl bg-slate-900/80 border border-white/[0.08] text-slate-400 hover:text-white hover:border-emerald-500/40 hover:shadow-[0_0_12px_rgba(16,185,129,0.2)] transition-all"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            {/* Back to top smooth button */}
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all group"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Bottom Copyright & Tech Stack Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-3">
          <div>
            © {currentYear} Ruthvij Rane. All rights reserved.
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Precision engineered with React & Tailwind</span>
            <span>•</span>
            <span className="text-cyan-400">Vercel Ready</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
