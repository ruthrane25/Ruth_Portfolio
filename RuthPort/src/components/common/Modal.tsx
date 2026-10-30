import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  badge?: string;
  children: React.ReactNode;
  maxWidth?: 'max-w-2xl' | 'max-w-3xl' | 'max-w-4xl' | 'max-w-5xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  badge,
  children,
  maxWidth = 'max-w-4xl',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`relative w-full ${maxWidth} max-h-[90vh] my-auto flex flex-col rounded-2xl border border-cyan-500/30 bg-[#090d16]/95 backdrop-blur-2xl shadow-[0_0_50px_rgba(6,182,212,0.25)] overflow-hidden z-10`}
            role="dialog"
            aria-modal="true"
          >
            {/* Top glowing accent line */}
            <div className="h-1 w-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-indigo-500" />

            {/* Modal Header */}
            <div className="flex items-start justify-between p-6 border-b border-white/[0.08] bg-slate-900/40">
              <div className="pr-6">
                {badge && (
                  <span className="inline-block px-2.5 py-0.5 mb-2 rounded-full text-xs font-mono font-medium text-cyan-400 bg-cyan-500/10 border border-cyan-500/20">
                    {badge}
                  </span>
                )}
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {title}
                </h3>
                {subtitle && (
                  <p className="mt-1 text-sm text-slate-400">
                    {subtitle}
                  </p>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)] space-y-6">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

