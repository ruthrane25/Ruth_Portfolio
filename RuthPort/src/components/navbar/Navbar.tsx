import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText, Github, Linkedin } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { ResumeModal } from './ResumeModal';

interface NavbarProps {
  resumeOpen?: boolean;
  setResumeOpen?: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  resumeOpen: externalResumeOpen,
  setResumeOpen: externalSetResumeOpen,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [internalResumeOpen, setInternalResumeOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const resumeOpen = externalResumeOpen !== undefined ? externalResumeOpen : internalResumeOpen;
  const setResumeOpen = externalSetResumeOpen !== undefined ? externalSetResumeOpen : setInternalResumeOpen;

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Engineering Lab', href: '#showroom' },
    { name: 'Industrial Systems', href: '#industrial' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['contact', 'skills', 'industrial', 'showroom', 'experience', 'about', 'hero'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-[#020617]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.6)]'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#hero"
              className="group flex items-center gap-2.5 focus:outline-none"
              aria-label="Ruthvij Rane Home"
            >
              <div className="relative w-10 h-10 rounded-xl bg-slate-900 border border-cyan-500/40 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="font-mono text-lg font-black tracking-tighter text-white group-hover:text-cyan-400 transition-colors">
                  RR<span className="text-cyan-400 group-hover:text-emerald-400">.</span>
                </span>
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-sm font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                  Ruthvij Rane
                </span>
                <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Software Design Engineer
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 px-4 py-1.5 rounded-full bg-slate-900/60 border border-white/[0.06] backdrop-blur-md">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-cyan-300 bg-cyan-500/15 shadow-[0_0_12px_rgba(6,182,212,0.25)] border border-cyan-500/30'
                        : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center gap-2.5">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-900/80 border border-white/[0.08] text-slate-300 hover:text-white hover:border-cyan-500/40 hover:shadow-[0_0_15px_rgba(6,182,212,0.25)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                aria-label="Ruthvij Rane GitHub"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-900/80 border border-white/[0.08] text-slate-300 hover:text-white hover:border-violet-500/40 hover:shadow-[0_0_15px_rgba(139,92,246,0.25)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-400"
                aria-label="Ruthvij Rane LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <button
                onClick={() => setResumeOpen(true)}
                className="relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-300 hover:opacity-95 shadow-[0_0_20px_rgba(6,182,212,0.35)] transition-all duration-200 group overflow-hidden focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <FileText className="w-3.5 h-3.5 text-slate-950 transition-transform group-hover:scale-110" />
                <span>Resume</span>
              </button>
            </div>

            {/* Mobile Hamburger */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={() => setResumeOpen(true)}
                className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium"
              >
                CV
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-slate-900 border border-white/[0.08] text-slate-300 hover:text-white focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="sm:hidden border-b border-white/[0.08] bg-[#070c18]/95 backdrop-blur-2xl px-4 py-5 overflow-hidden"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-300 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="pt-4 mt-2 border-t border-white/[0.08] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <a
                      href={PERSONAL_INFO.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={PERSONAL_INFO.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setResumeOpen(true);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400"
                  >
                    <FileText className="w-4 h-4" />
                    View Resume
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Resume Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
};
