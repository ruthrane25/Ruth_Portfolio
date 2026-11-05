import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '../common/SectionHeader';
import { TiltCard } from '../common/TiltCard';
import { PERSONAL_INFO } from '../../data/portfolioData';
import {
  Mail,
  Copy,
  Check,
  Send,
  Github,
  Linkedin,
  MapPin,
  Terminal,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ToastState {
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}

export const FuturisticContact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lastDispatchedUrls, setLastDispatchedUrls] = useState<{
    gmail: string;
    mailto: string;
  } | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);

  // Auto-dismiss toast after 6 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#06b6d4', '#10b981', '#8b5cf6'],
    });
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setToast({
        type: 'error',
        title: 'Validation Incomplete',
        message: 'Please provide your name, valid email address, and message.',
      });
      return;
    }

    const to = PERSONAL_INFO.email; // ruthvijrane2001@gmail.com
    const su = formState.subject.trim()
      ? `[Portfolio Inquiry] ${formState.subject.trim()}`
      : `Portfolio Inquiry from ${formState.name.trim()}`;

    const bodyContent = `${formState.message.trim()}\n\n---\nSender Name: ${formState.name.trim()}\nSender Email: ${formState.email.trim()}\nRecipient: ${to}`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      to
    )}&su=${encodeURIComponent(su)}&body=${encodeURIComponent(bodyContent)}`;

    const mailtoUrl = `mailto:${to}?subject=${encodeURIComponent(su)}&body=${encodeURIComponent(
      bodyContent
    )}`;

    setLastDispatchedUrls({ gmail: gmailUrl, mailto: mailtoUrl });

    // Confetti celebration
    confetti({
      particleCount: 90,
      spread: 85,
      origin: { y: 0.65 },
      colors: ['#06b6d4', '#10b981', '#8b5cf6'],
    });

    // Attempt to open Gmail compose in a new tab immediately
    try {
      const win = window.open(gmailUrl, '_blank', 'noopener,noreferrer');
      if (!win) {
        window.location.href = gmailUrl;
      }
    } catch {
      window.location.href = gmailUrl;
    }

    setSubmitted(true);
    setToast({
      type: 'success',
      title: 'Gmail Compose Launched',
      message: `Opened Gmail with ${to} attached. You can review and click Send!`,
    });
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full">
        
        {/* Section Header */}
        <SectionHeader
          badge="08 // INITIATE TRANSMISSION"
          title="Let's Build Something"
          highlightedText="Impactful Together"
          description="Whether you have an industrial automation challenge, a high-precision software architecture project, or a software engineering opportunity, my channels are open."
          badgeColor="cyan"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact & Channel Status */}
          <div className="lg:col-span-5 space-y-6">
            <TiltCard glowColor="cyan" className="p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-4 text-xs font-mono text-cyan-400">
                <Terminal className="w-4 h-4" />
                <span>direct_link // encrypted_channel</span>
              </div>

              <h3 className="text-2xl font-black text-white tracking-tight">
                Direct Communication Channel
              </h3>

              <p className="mt-2 text-sm text-slate-300 leading-relaxed font-normal">
                Open to software design engineering roles, industrial automation systems, and high-impact full-stack development initiatives.
              </p>

              {/* Email Direct Action Card */}
              <div className="mt-6 p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[10px] font-mono uppercase text-slate-400">Direct Inode</div>
                    <div className="text-xs sm:text-sm font-mono font-bold text-white truncate">
                      {PERSONAL_INFO.email}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                      PERSONAL_INFO.email
                    )}&su=${encodeURIComponent('Software Design Engineer Opportunity / Ruthvij Rane')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 hover:from-cyan-500/30 hover:to-emerald-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(6,182,212,0.2)]"
                    title="Open Gmail compose with ruthvijrane2001@gmail.com attached"
                  >
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Gmail</span>
                    <ExternalLink className="w-3 h-3 text-cyan-400" />
                  </a>

                  <button
                    onClick={handleCopyEmail}
                    className="px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-300 text-xs font-mono font-semibold flex items-center gap-1.5 transition-all active:scale-95"
                    title="Copy email to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Direct Links */}
              <div className="mt-6 pt-6 border-t border-white/[0.08] space-y-3">
                <div className="text-xs font-mono uppercase text-slate-400 mb-2">Verified Profiles</div>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-white/[0.06] hover:border-cyan-500/30 transition-all text-xs sm:text-sm text-slate-300 hover:text-white group"
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
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-white/[0.06] hover:border-violet-500/30 transition-all text-xs sm:text-sm text-slate-300 hover:text-white group"
                >
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-4 h-4 text-violet-400" />
                    <span className="font-mono">linkedin.com/in/ruthvij-rane</span>
                  </div>
                  <span className="text-xs font-mono text-violet-400 group-hover:translate-x-1 transition-transform">→</span>
                </a>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 border border-white/[0.06] text-xs sm:text-sm text-slate-300">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    <span className="font-mono">{PERSONAL_INFO.location}</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400">Available</span>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Right Column: Futuristic Form with Input Validation Glows */}
          <div className="lg:col-span-7">
            <TiltCard glowColor="emerald" className="p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Send Direct Message
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Encrypted submission routed directly to ruthvijrane2001@gmail.com
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Live Channel
                </span>
              </div>

              {submitted ? (
                <div className="p-8 text-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-bold text-white tracking-tight">Gmail Compose Launched!</h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    A Gmail compose window was opened with <strong className="text-cyan-300 font-mono">ruthvijrane2001@gmail.com</strong> already attached as recipient.
                  </p>
                  <p className="text-xs text-slate-400">
                    If your browser blocked the new tab, click below to open your Gmail compose directly:
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <a
                      href={lastDispatchedUrls?.gmail || `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PERSONAL_INFO.email)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-300 text-slate-950 hover:opacity-95 shadow-[0_0_20px_rgba(6,182,212,0.35)] transition-all"
                    >
                      <Mail className="w-4 h-4 text-slate-950" />
                      <span>Open in Gmail</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href={lastDispatchedUrls?.mailto || `mailto:${PERSONAL_INFO.email}`}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-slate-900 border border-white/10 hover:border-cyan-500/40 text-slate-200 transition-colors"
                    >
                      <span>Default Mail App</span>
                    </a>
                  </div>

                  <div className="pt-3 border-t border-white/[0.08]">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormState({ name: '', email: '', subject: '', message: '' });
                      }}
                      className="text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors underline"
                    >
                      ← Draft another transmission
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">
                        Your Name *
                      </label>
                      <div
                        className={`relative rounded-xl border transition-all ${
                          focusedField === 'name'
                            ? 'border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] bg-slate-900/90'
                            : 'border-white/[0.08] bg-slate-950/80'
                        }`}
                      >
                        <input
                          type="text"
                          required
                          value={formState.name}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          placeholder="Ada Lovelace"
                          className="w-full px-4 py-2.5 bg-transparent focus:outline-none text-xs sm:text-sm text-white placeholder-slate-600 font-mono"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">
                        Your Email *
                      </label>
                      <div
                        className={`relative rounded-xl border transition-all ${
                          focusedField === 'email'
                            ? 'border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)] bg-slate-900/90'
                            : 'border-white/[0.08] bg-slate-950/80'
                        }`}
                      >
                        <input
                          type="email"
                          required
                          value={formState.email}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          placeholder="ada@example.com"
                          className="w-full px-4 py-2.5 bg-transparent focus:outline-none text-xs sm:text-sm text-white placeholder-slate-600 font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">
                      Subject / Topic
                    </label>
                    <div
                      className={`relative rounded-xl border transition-all ${
                        focusedField === 'subject'
                          ? 'border-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.3)] bg-slate-900/90'
                          : 'border-white/[0.08] bg-slate-950/80'
                      }`}
                    >
                      <input
                        type="text"
                        value={formState.subject}
                        onFocus={() => setFocusedField('subject')}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        placeholder="Software Design Engineer Opportunity / Industrial Automation"
                        className="w-full px-4 py-2.5 bg-transparent focus:outline-none text-xs sm:text-sm text-white placeholder-slate-600 font-mono"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">
                      Project Details / Message *
                    </label>
                    <div
                      className={`relative rounded-xl border transition-all ${
                        focusedField === 'message'
                          ? 'border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] bg-slate-900/90'
                          : 'border-white/[0.08] bg-slate-950/80'
                      }`}
                    >
                      <textarea
                        required
                        rows={4}
                        value={formState.message}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder="Hi Ruthvij, we would love to connect regarding an industrial automation / full-stack engineering role..."
                        className="w-full px-4 py-2.5 bg-transparent focus:outline-none text-xs sm:text-sm text-white placeholder-slate-600 font-mono resize-none"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full mt-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-400 via-emerald-400 to-violet-400 text-slate-950 font-bold text-sm shadow-[0_0_25px_rgba(6,182,212,0.35)] hover:opacity-95 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <Mail className="w-4 h-4 transition-transform group-hover:scale-110" />
                    <span>Send via Gmail</span>
                    <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              )}
            </TiltCard>
          </div>

        </div>

      </div>

      {/* Real-time Floating Toast Notification - Positioned at Top Right for High Visibility */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-24 right-4 sm:right-8 z-[9999] max-w-md w-[calc(100vw-2rem)] p-4 rounded-2xl backdrop-blur-2xl border shadow-2xl flex items-start gap-3 ${
              toast.type === 'success'
                ? 'bg-slate-900/95 border-emerald-500/50 text-emerald-100 shadow-[0_0_35px_rgba(16,185,129,0.35)]'
                : toast.type === 'error'
                ? 'bg-slate-900/95 border-rose-500/50 text-rose-100 shadow-[0_0_35px_rgba(244,63,94,0.35)]'
                : 'bg-slate-900/95 border-cyan-500/50 text-cyan-100 shadow-[0_0_35px_rgba(6,182,212,0.35)]'
            }`}
          >
            <div className="mt-0.5 flex-shrink-0">
              {toast.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : toast.type === 'error' ? (
                <AlertCircle className="w-5 h-5 text-rose-400" />
              ) : (
                <Mail className="w-5 h-5 text-cyan-400" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                {toast.title}
              </h5>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {toast.message}
              </p>
            </div>

            <button
              onClick={() => setToast(null)}
              className="text-slate-400 hover:text-white transition-colors p-1"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

