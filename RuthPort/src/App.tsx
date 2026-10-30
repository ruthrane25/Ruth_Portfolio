import React, { useState } from 'react';
import { CustomCursor } from './components/common/CustomCursor';
import { ParticleBackground } from './components/common/ParticleBackground';
import { Navbar } from './components/navbar/Navbar';
import { Hero } from './components/hero/Hero';
import { About } from './components/about/About';
import { Experience } from './components/experience/Experience';
import { BentoShowroom } from './components/bento/BentoShowroom';
import { IndustrialSystems } from './components/industrial/IndustrialSystems';
import { Skills } from './components/skills/Skills';
import { Education } from './components/education/Education';
import { Contact } from './components/contact/Contact';
import { Footer } from './components/footer/Footer';

export const App: React.FC = () => {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Custom Glowing Cursor Ring & Pinpoint */}
      <CustomCursor />

      {/* Cyberpunk Interactive Particle & Constellation Background */}
      <ParticleBackground />

      {/* Sticky Navigation Header */}
      <Navbar resumeOpen={resumeOpen} setResumeOpen={setResumeOpen} />

      {/* Main Content Area */}
      <main className="relative z-10 flex flex-col">
        {/* Cinematic Hero Section with Three.js Cosmos & 3D Flip Role Ticker */}
        <Hero onOpenResume={() => setResumeOpen(true)} />

        {/* The Hybrid Edge (About Me) with Live Interactive Terminal */}
        <About />

        {/* Glowing Laser-Line Work Experience Timeline */}
        <Experience />

        {/* Bento Grid with Live Interactive Simulators (Laser, Bio-Printer, Ops Radar, Autonomous Drone) */}
        <BentoShowroom />

        {/* Flagship Industrial Systems & In-Depth Machine Inspection */}
        <IndustrialSystems />

        {/* 3D Perspective Technical Skill Matrix */}
        <Skills />

        {/* Education, Certifications & Leadership */}
        <Education />

        {/* Futuristic Contact Section with Validation Glows */}
        <Contact />
      </main>

      {/* Cyberpunk Footer */}
      <Footer />
    </div>
  );
};

export default App;
