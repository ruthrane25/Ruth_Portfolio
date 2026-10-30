import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { TiltCard } from '../common/TiltCard';
import { EDUCATION_DATA, CERTIFICATIONS_DATA, VOLUNTEERING_DATA } from '../../data/portfolioData';
import { GraduationCap, Award, Users, CheckCircle2, Calendar, MapPin, Sparkles } from 'lucide-react';

export const Education: React.FC = () => {
  return (
    <section id="education" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          badge="06 // ACADEMICS & RECOGNITION"
          title="Education, Certifications &"
          highlightedText="Leadership"
          description="A strong academic foundation in Electronics Engineering complemented by industry simulations and community leadership."
          badgeColor="cyan"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Formal Education */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-sm font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Degree & Alma Mater
            </h3>

            {EDUCATION_DATA.map((edu, idx) => (
              <TiltCard key={idx} glowColor="cyan" className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-4">
                  <div>
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                      Undergraduate Degree
                    </span>
                    <h4 className="text-xl sm:text-2xl font-black text-white mt-2">
                      {edu.degree}
                    </h4>
                    <p className="text-base text-cyan-300 font-medium">
                      {edu.field}
                    </p>
                  </div>

                  <div className="sm:text-right mt-2 sm:mt-0">
                    <div className="text-2xl sm:text-3xl font-mono font-black bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                      {edu.score}
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                      {edu.scoreLabel}
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-1 text-sm text-slate-300">
                  <div className="font-semibold text-white">{edu.institution}</div>
                  <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{edu.location}</span>
                    <span>•</span>
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{edu.period}</span>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-white/[0.08]">
                  <div className="text-xs font-mono uppercase text-slate-400 mb-3">Key Focus Areas & Capstone:</div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                    {edu.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            ))}

            {/* Volunteering Card */}
            <div className="pt-2">
              <h3 className="text-sm font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-2 mb-4">
                <Users className="w-4 h-4" />
                Engineering Community Leadership
              </h3>

              {VOLUNTEERING_DATA.map((vol, idx) => (
                <TiltCard key={idx} glowColor="emerald" className="p-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-white">{vol.role}</h4>
                    <span className="text-xs font-mono text-emerald-300 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      {vol.period}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-cyan-400 mt-1">
                    {vol.organization}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                    {vol.description}
                  </p>
                </TiltCard>
              ))}
            </div>
          </div>

          {/* Right Column: Industry Simulations & Certifications */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-sm font-mono uppercase tracking-wider text-indigo-400 font-bold flex items-center gap-2">
              <Award className="w-4 h-4" />
              Verified Industry Simulations & Practical Programs
            </h3>

            <div className="space-y-4">
              {CERTIFICATIONS_DATA.map((cert, idx) => (
                <TiltCard key={idx} glowColor="indigo" className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-mono text-indigo-400 font-semibold uppercase">
                        {cert.domain}
                      </span>
                      <h4 className="text-lg font-bold text-white mt-0.5">
                        {cert.name}
                      </h4>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">
                        {cert.issuer}
                      </p>
                    </div>

                    <span className="self-start sm:self-center px-3 py-1 rounded-full text-xs font-mono font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5 shadow-[0_0_12px_rgba(99,102,241,0.2)]">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                      {cert.badgeText}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 mt-4 leading-relaxed">
                    {cert.description}
                  </p>
                </TiltCard>
              ))}
            </div>

            {/* Quick Badge summary of engineering ethos */}
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/[0.08] text-xs font-mono text-slate-400 flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-cyan-400 animate-ping flex-shrink-0" />
              <span>Continuous technical learning in high-concurrency systems, control theory, and cloud deployment pipelines.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
