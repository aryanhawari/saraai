export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  tag?: string;
  gradient?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  highlights: string[];
}

export interface ModeItem {
  id: 'fast' | 'thinker' | 'search';
  name: string;
  tagline: string;
  description: string;
  suitableFor: string[];
  badgeColor: string;
  actionText: string;
  demoQuery: string;
  demoResponse: string;
  thinkingSteps?: string[];
  citations?: { title: string; url: string; time: string }[];
}

export interface TechItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'AI & Search' | 'Infrastructure';
  description: string;
}
