import React from 'react';
import { CustomCursor } from './components/common/CustomCursor';
import { ParticleBackground } from './components/common/ParticleBackground';
import { Navbar } from './components/navbar/Navbar';
import { Hero } from './components/hero/Hero';
import { About } from './components/about/About';
import { Skills } from './components/skills/Skills';
import { Experience } from './components/experience/Experience';
import { IndustrialSystems } from './components/industrial/IndustrialSystems';
import { Projects } from './components/projects/Projects';
import { Education } from './components/education/Education';
import { Contact } from './components/contact/Contact';
import { Footer } from './components/footer/Footer';

export const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Custom Glowing Cursor */}
      <CustomCursor />

      {/* Cyberpunk Interactive Particle & Constellation Background */}
      <ParticleBackground />

      {/* Sticky Navigation Header */}
      <Navbar />

      {/* Main Content Area */}
      <main className="relative z-10 flex flex-col">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <IndustrialSystems />
        <Projects />
        <Education />
        <Contact />
      </main>

      {/* Cyberpunk Footer */}
      <Footer />
    </div>
  );
};

export default App;

