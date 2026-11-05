import React, { useState } from 'react';
import { CustomCursor } from './components/common/CustomCursor';
import { ParticleBackground } from './components/common/ParticleBackground';
import { Navbar } from './components/navbar/Navbar';
import { Hero } from './components/hero/Hero';
import { About } from './components/about/About';
import { ValuePropMatrix } from './components/value-prop/ValuePropMatrix';
import { Experience } from './components/experience/Experience';
import { BentoShowroom } from './components/bento/BentoShowroom';
import { IndustrialSystems } from './components/industrial/IndustrialSystems';
import { Skills } from './components/skills/Skills';
import { Education } from './components/education/Education';
import { Contact } from './components/contact/Contact';
import { Footer } from './components/footer/Footer';
import { useMousePosition } from './hooks/useMousePosition';

export const App: React.FC = () => {
  const [resumeOpen, setResumeOpen] = useState(false);
  const mouse = useMousePosition();

  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      {/* Custom Glowing Cursor Ring & Pinpoint */}
      <CustomCursor />

      {/* Cyberpunk Interactive Particle & Constellation Background */}
      <ParticleBackground />

      {/* Subtle Mouse-Following Ambient Spotlight (Awwwards Grade) */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(650px circle at ${mouse.x}px ${mouse.y}px, rgba(6, 182, 212, 0.08), rgba(139, 92, 246, 0.03) 40%, transparent 80%)`,
        }}
      />

      {/* Sticky Navigation Header */}
      <Navbar resumeOpen={resumeOpen} setResumeOpen={setResumeOpen} />

      {/* Main Content Area */}
      <main className="relative z-10 flex flex-col">
        {/* 1. Cinematic Hero Section with Three.js Cosmos & 3D Flip Role Ticker */}
        <Hero onOpenResume={() => setResumeOpen(true)} />

        {/* 2. The Hybrid Edge (About Me) with Live Interactive Terminal */}
        <About />

        {/* 3. "Why Hire Me?" (The Impact & Value Proposition Matrix) */}
        <ValuePropMatrix />

        {/* 4. Glowing Laser-Line Work Experience Timeline */}
        <Experience />

        {/* 5. Bento Grid with Live Interactive Simulators (Laser, Bio-Printer, Ops Radar, Autonomous Drone) */}
        <BentoShowroom />

        {/* 6. Flagship Industrial Systems & In-Depth Machine Inspection */}
        <IndustrialSystems />

        {/* 7. 3D Perspective Technical Skill Matrix */}
        <Skills />

        {/* 8. Education, Certifications & Leadership */}
        <Education />

        {/* 9. Futuristic Contact Section with Validation Glows */}
        <Contact />
      </main>

      {/* Cyberpunk Footer */}
      <Footer />
    </div>
  );
};

export default App;
