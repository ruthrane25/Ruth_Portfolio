import React from 'react';
import { HeroCinematic } from './HeroCinematic';

interface HeroProps {
  onOpenResume?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume = () => {} }) => {
  return <HeroCinematic onOpenResume={onOpenResume} />;
};
