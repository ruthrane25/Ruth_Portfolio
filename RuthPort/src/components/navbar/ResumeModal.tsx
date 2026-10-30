import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Printer, MapPin, Mail, Github, Linkedin, Download, Copy, Check, ExternalLink, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO, WORK_EXPERIENCES, INDUSTRIAL_SYSTEMS, EDUCATION_DATA, CERTIFICATIONS_DATA, SKILL_CATEGORIES } from '../../data/portfolioData';
import confetti from 'canvas-confetti';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [resumeTheme, setResumeTheme] = useState<'dark' | 'light'>('dark');

  const handlePrint = () => {
    window.print();
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#06b6d4', '#10b981', '#6366f1'],
    });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Curriculum Vitae"
      subtitle="Ruthvij Rane — Software Design Engineer & Industrial Automation Specialist"
      badge="OFFICIAL RESUME"
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6 text-slate-200">
        
        {/* Action Toolbar */}
        <div className="no-print flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30">
          <div className="text-xs sm:text-sm text-cyan-300 font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Verified & Updated • Ready for Hiring & Consulting
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Theme Preview Switcher */}
            <div className="flex items-center rounded-lg bg-slate-950 p-1 border border-white/10 text-xs font-mono">
              <button
                onClick={() => setResumeTheme('dark')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  resumeTheme === 'dark'
                    ? 'bg-cyan-500/20 text-cyan-300 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Cyber Dark
              </button>
              <button
                onClick={() => setResumeTheme('light')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  resumeTheme === 'light'
                    ? 'bg-white text-slate-900 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Executive Light
              </button>
            </div>

            {/* Print / Save to PDF */}
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 transition-colors shadow-sm"
              title="Print or Save as PDF"
            >
              <Printer className="w-4 h-4 text-cyan-400" />
              <span>Print / Save PDF</span>
            </button>

            {/* Copy Email Button */}
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              title="Copy Email"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Email</span>
                </>
              )}
            </button>

            {/* Direct Email Action */}
            <a
              href={`mailto:${PERSONAL_INFO.email}?subject=Software Design Engineer Opportunity / Ruthvij Rane`}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 font-bold hover:opacity-90 transition-opacity shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            >
              <Mail className="w-4 h-4" />
              <span>Contact</span>
            </a>
          </div>
        </div>

        {/* Resume Sheet */}
        <div
          id="printable-resume"
          className={`p-6 sm:p-10 rounded-2xl border transition-all duration-300 font-sans space-y-7 ${
            resumeTheme === 'dark'
              ? 'bg-[#050811] text-slate-100 border-white/10 shadow-2xl'
              : 'bg-white text-slate-900 border-slate-200 shadow-xl'
          }`}
        >
          {/* Header */}
          <div className="border-b border-current/15 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                  Ruthvij Rane
                </h1>
              </div>

              <p className={`text-base sm:text-lg font-bold mt-1 ${
                resumeTheme === 'dark' ? 'text-cyan-400' : 'text-cyan-700'
              }`}>
                Software Design Engineer • Industrial Automation & Desktop GUI Specialist
              </p>

              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 mt-3 text-xs sm:text-sm font-mono opacity-85">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                  {PERSONAL_INFO.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-cyan-500" />
                  {PERSONAL_INFO.email}
                </span>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:underline"
                >
                  <Github className="w-3.5 h-3.5 text-indigo-500" />
                  github.com/ruthrane25
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:underline"
                >
                  <Linkedin className="w-3.5 h-3.5 text-indigo-500" />
                  linkedin.com/in/ruthvij-rane
                </a>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end justify-center">
              <span className="text-[11px] font-mono uppercase tracking-widest opacity-60">Domain Specialization</span>
              <span className={`text-sm font-bold ${
                resumeTheme === 'dark' ? 'text-emerald-400' : 'text-emerald-700'
              }`}>
                PyQt/PySide • Industrial Machines • Full-Stack
              </span>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className={`text-xs font-mono uppercase tracking-wider font-extrabold mb-2 ${
              resumeTheme === 'dark' ? 'text-cyan-400' : 'text-cyan-700'
            }`}>
              // Professional Summary
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed opacity-90">
              Software Design Engineer specializing in high-precision desktop control software (PyQt/PySide), mission-critical hardware-software integration (RS-232, USB, Multi-Axis Motion Controllers), vector data parsing (G-code, DXF), and modern web platforms (SvelteKit, React, Node.js, MongoDB). Proven engineering track record architecting, packaging, and deploying production control suites for 6+ flagship industrial machines, including Photovoltaic Laser Scribers, Semiconductor Wafer Processors, and 3D/4D Bio-Printers.
            </p>
          </div>

          {/* Core Technical Competencies */}
          <div>
            <h2 className={`text-xs font-mono uppercase tracking-wider font-extrabold mb-3 ${
              resumeTheme === 'dark' ? 'text-cyan-400' : 'text-cyan-700'
            }`}>
              // Technical Competencies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
              <div className={`p-3 rounded-xl border ${
                resumeTheme === 'dark' ? 'bg-slate-900/50 border-white/10' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className="font-bold">Languages & Systems:</span>
                <p className="mt-1 opacity-80">
                  Python, TypeScript, JavaScript (ES6+), Java, SQL, HTML5, CSS3, Windows & Linux APIs
                </p>
              </div>

              <div className={`p-3 rounded-xl border ${
                resumeTheme === 'dark' ? 'bg-slate-900/50 border-white/10' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className="font-bold">Desktop & GUI Architecture:</span>
                <p className="mt-1 opacity-80">
                  PySide6, PyQt, Qt Designer, QThreads / Multithreading, PyInstaller, Inno Setup Factory Deployment
                </p>
              </div>

              <div className={`p-3 rounded-xl border ${
                resumeTheme === 'dark' ? 'bg-slate-900/50 border-white/10' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className="font-bold">Hardware Comms & Motion:</span>
                <p className="mt-1 opacity-80">
                  Serial (RS-232/UART), USB Pipelines, Multi-Axis Motion Controllers, Galvo Scanners, Telemetry Feedback
                </p>
              </div>

              <div className={`p-3 rounded-xl border ${
                resumeTheme === 'dark' ? 'bg-slate-900/50 border-white/10' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className="font-bold">Vector Engines & Web:</span>
                <p className="mt-1 opacity-80">
                  DXF & G-Code Parsing, NumPy, Pandas, SvelteKit, React.js, Node.js, Express, MongoDB, Tailwind CSS
                </p>
              </div>
            </div>
          </div>

          {/* Work Experience */}
          <div>
            <h2 className={`text-xs font-mono uppercase tracking-wider font-extrabold mb-4 ${
              resumeTheme === 'dark' ? 'text-cyan-400' : 'text-cyan-700'
            }`}>
              // Professional Experience
            </h2>
            <div className="space-y-5">
              {WORK_EXPERIENCES.map((exp) => (
                <div key={exp.id} className="border-l-2 border-cyan-500/50 pl-4 space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-sm sm:text-base font-bold">
                      {exp.role}{' '}
                      <span className={resumeTheme === 'dark' ? 'text-cyan-400 font-normal' : 'text-cyan-700 font-normal'}>
                        @ {exp.company}
                      </span>
                    </h3>
                    <span className="text-xs font-mono opacity-70">{exp.period} | {exp.location}</span>
                  </div>

                  <ul className="list-disc list-outside pl-4 space-y-1 text-xs opacity-90 leading-relaxed">
                    {exp.description.map((item, idx) => (
                      <li key={idx}>
                        {item.includes(':') ? (
                          <>
                            <strong>{item.split(':')[0]}:</strong>
                            {item.split(':')[1]}
                          </>
                        ) : (
                          item
                        )}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-1.5">
                    {exp.technologies.map((t, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                          resumeTheme === 'dark'
                            ? 'bg-slate-900 text-slate-300 border-slate-700'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Flagship Machines Showcase */}
          <div>
            <h2 className={`text-xs font-mono uppercase tracking-wider font-extrabold mb-3 ${
              resumeTheme === 'dark' ? 'text-emerald-400' : 'text-emerald-700'
            }`}>
              // Flagship Industrial Machines & Software Engineered
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {INDUSTRIAL_SYSTEMS.map((sys) => (
                <div
                  key={sys.id}
                  className={`p-3 rounded-xl border ${
                    resumeTheme === 'dark'
                      ? 'bg-slate-900/60 border-slate-800'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className={`font-bold ${resumeTheme === 'dark' ? 'text-emerald-300' : 'text-emerald-700'}`}>
                      {sys.model}
                    </span>
                    <span className="opacity-60">{sys.category}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold mt-1">{sys.name}</h4>
                  <p className="text-[11px] opacity-80 mt-1 leading-snug line-clamp-2">{sys.summary}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
            <div>
              <h2 className={`text-xs font-mono uppercase tracking-wider font-extrabold mb-3 ${
                resumeTheme === 'dark' ? 'text-indigo-400' : 'text-indigo-700'
              }`}>
                // Education
              </h2>
              {EDUCATION_DATA.map((edu, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border space-y-1 ${
                    resumeTheme === 'dark'
                      ? 'bg-slate-900/60 border-slate-800'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs sm:text-sm font-bold">{edu.degree}</h3>
                    <span className={`text-xs font-mono font-bold ${
                      resumeTheme === 'dark' ? 'text-cyan-400' : 'text-cyan-700'
                    }`}>
                      {edu.score}
                    </span>
                  </div>
                  <p className="text-xs font-medium opacity-90">{edu.field}</p>
                  <p className="text-xs opacity-75">{edu.institution}</p>
                  <span className="text-[11px] font-mono opacity-60 block mt-1">
                    {edu.period} • {edu.location}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <h2 className={`text-xs font-mono uppercase tracking-wider font-extrabold mb-3 ${
                resumeTheme === 'dark' ? 'text-indigo-400' : 'text-indigo-700'
              }`}>
                // Simulations & Leadership
              </h2>
              <div className="space-y-2">
                {CERTIFICATIONS_DATA.map((cert, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-xl border ${
                      resumeTheme === 'dark'
                        ? 'bg-slate-900/60 border-slate-800'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold">{cert.name}</h4>
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                        resumeTheme === 'dark'
                          ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                          : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                      }`}>
                        {cert.badgeText}
                      </span>
                    </div>
                    <p className="text-[11px] opacity-70 mt-0.5">{cert.issuer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </Modal>
  );
};
