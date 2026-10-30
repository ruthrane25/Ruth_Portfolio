import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { LaserTimeline } from './LaserTimeline';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <SectionHeader
          badge="02 // CAREER TRAJECTORY"
          title="Professional Experience &"
          highlightedText="Engineering Milestones"
          description="A track record of engineering mission-critical machine control systems at Specialize Products, leading operations platform automation at VC Technosolutions, and managing supply-chain logistics at Flipkart."
          badgeColor="emerald"
        />

        {/* Glowing Laser-Line Timeline */}
        <LaserTimeline />

      </div>
    </section>
  );
};
