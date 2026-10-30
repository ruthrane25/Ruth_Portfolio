export interface SkillCategory {
  title: string;
  id: string;
  iconName: string;
  description: string;
  skills: {
    name: string;
    level: string; // e.g. "Expert", "Advanced", "Proficient"
    highlight?: boolean;
    tag?: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  badge: string;
  description: string[];
  technologies: string[];
  metrics?: string;
}

export interface IndustrialSystem {
  id: string;
  model: string;
  name: string;
  category: 'Photovoltaic' | 'Photo-Thermal' | 'Semiconductor' | 'Laser Marking' | 'Bio-Printing' | 'Additive Manufacturing';
  accentColor: 'cyan' | 'emerald' | 'indigo' | 'amber';
  summary: string;
  fullDescription: string;
  softwareEngineered: string[];
  hardwareIntegration: string[];
  keySpecs: { label: string; value: string }[];
  technologies: string[];
}

export interface FeaturedProject {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  period: string;
  description: string;
  highlights: string[];
  technologies: string[];
  metrics: string;
  githubUrl?: string;
  demoUrl?: string;
  accent: 'cyan' | 'emerald' | 'indigo';
}

export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  location: string;
  period: string;
  score: string;
  scoreLabel: string;
  highlights: string[];
}

export interface CertificationItem {
  name: string;
  issuer: string;
  domain: string;
  description: string;
  badgeText: string;
}

export interface VolunteeringItem {
  role: string;
  organization: string;
  period: string;
  description: string;
}

