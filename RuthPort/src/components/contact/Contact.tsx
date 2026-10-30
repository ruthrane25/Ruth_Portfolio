import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { TiltCard } from '../common/TiltCard';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Mail, Copy, Check, Send, Github, Linkedin, MapPin, Terminal } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    
    // Trigger celebratory particle confetti
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#06b6d4', '#10b981', '#6366f1'],
    });

    setTimeout(() => setCopied(false), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending message with mailto fallback
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#06b6d4', '#10b981', '#6366f1'],
      });
      // Also open user's mail client
      window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(formState.subject || 'Engineering Opportunity / Inquiries')}&body=${encodeURIComponent(`Hi Ruthvij,\n\nName: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`)}`;
    }, 800);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          badge="07 // INITIATE TRANSMISSION"
          title="Let's Build Something"
          highlightedText="Extraordinary Together"
          description="Whether you have an industrial automation challenge, a high-precision software architecture project, or a full-stack role, my inbox is always open."
          badgeColor="cyan"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact & Fast Copy Card */}
          <div className="lg:col-span-5 space-y-6">
            <TiltCard glowColor="cyan" className="p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-4 text-xs font-mono text-cyan-400">
                <Terminal className="w-4 h-4" />
                <span>direct_link // encrypted_channel</span>
              </div>

              <h3 className="text-2xl font-black text-white tracking-tight">
                Get in Touch
              </h3>
              
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                Currently open to software design engineering roles, desktop GUI consulting, and high-impact full-stack development projects.
              </p>

              {/* Email Copy Card */}
              <div className="mt-6 p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[10px] font-mono uppercase text-slate-400">Primary Email</div>
                    <div className="text-xs sm:text-sm font-mono font-bold text-white truncate">
                      {PERSONAL_INFO.email}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-2 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold flex items-center gap-1.5 transition-all flex-shrink-0 active:scale-95 shadow-[0_0_12px_rgba(6,182,212,0.2)]"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Social Channels */}
              <div className="mt-6 pt-6 border-t border-white/[0.08] space-y-3">
                <div className="text-xs font-mono uppercase text-slate-400 mb-2">Connect Channels</div>
                
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-white/[0.06] hover:border-cyan-500/30 transition-all text-xs sm:text-sm text-slate-300 hover:text-white group"
                >
                  <div className="flex items-center gap-3">
                    <Github className="w-4 h-4 text-cyan-400" />
                    <span className="font-mono">github.com/ruthrane25</span>
                  </div>
                  <span className="text-xs font-mono text-cyan-400 group-hover:translate-x-1 transition-transform">→</span>
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-white/[0.06] hover:border-indigo-500/30 transition-all text-xs sm:text-sm text-slate-300 hover:text-white group"
                >
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-4 h-4 text-indigo-400" />
                    <span className="font-mono">linkedin.com/in/ruthvij-rane</span>
                  </div>
                  <span className="text-xs font-mono text-indigo-400 group-hover:translate-x-1 transition-transform">→</span>
                </a>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-white/[0.06] text-xs sm:text-sm text-slate-300">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    <span className="font-mono">{PERSONAL_INFO.location}</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400">Available</span>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Right Column: Interactive Quick Message Dispatcher */}
          <div className="lg:col-span-7">
            <TiltCard glowColor="emerald" className="p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Send Direct Message
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Transmits directly to ruthvijrane2001@gmail.com
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Live Channel
                </span>
              </div>

              {submitted ? (
                <div className="p-8 text-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Transmission Initiated!</h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                    Your email client has been prepared. You can also reach me directly at{' '}
                    <strong className="text-cyan-300 font-mono">{PERSONAL_INFO.email}</strong>.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-4 py-2 rounded-xl text-xs font-mono bg-slate-900 border border-emerald-500/40 text-emerald-300 hover:bg-slate-800 transition-colors"
                  >
                    Send Another Transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="Ada Lovelace"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/[0.08] focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-xs sm:text-sm text-white placeholder-slate-600 transition-all font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="ada@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/[0.08] focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-xs sm:text-sm text-white placeholder-slate-600 transition-all font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">
                      Subject / Topic
                    </label>
                    <input
                      type="text"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      placeholder="Software Design Engineer Opportunity / Industrial Automation"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/[0.08] focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-xs sm:text-sm text-white placeholder-slate-600 transition-all font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">
                      Project Details / Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Hi Ruthvij, we would love to discuss a software engineering opportunity with our team..."
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/[0.08] focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-xs sm:text-sm text-white placeholder-slate-600 transition-all font-mono resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-300 text-slate-950 font-bold text-sm shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:opacity-95 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Transmitting Packet...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        <span>Send Transmission</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </TiltCard>
          </div>

        </div>

      </div>
    </section>
  );
};
