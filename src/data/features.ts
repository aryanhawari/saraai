import { FeatureItem } from '../types';

export const saraFeatures: FeatureItem[] = [
  {
    id: 'ai-chat',
    title: 'AI Chat',
    description: 'Natural conversation in English and Nepali.',
    iconName: 'MessageSquare',
    tag: 'Core',
    gradient: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'deep-thinking',
    title: 'Deep Thinking',
    description: 'Step-by-step reasoning for hard questions.',
    iconName: 'BrainCircuit',
    tag: 'Reasoning',
    gradient: 'from-purple-500 to-indigo-600'
  },
  {
    id: 'web-search',
    title: 'Web Search',
    description: 'Live answers with real-time web sources.',
    iconName: 'Globe',
    tag: 'Live',
    gradient: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'memory',
    title: 'Memory',
    description: 'Remembers preferences safely across chats.',
    iconName: 'Cpu',
    tag: 'Context',
    gradient: 'from-pink-500 to-rose-600'
  },
  {
    id: 'voice-interaction',
    title: 'Voice',
    description: 'Speak and listen hands-free.',
    iconName: 'Mic',
    tag: 'Audio',
    gradient: 'from-amber-500 to-orange-600'
  },
  {
    id: 'smart-assistance',
    title: 'Assistant',
    description: 'Tasks, writing, coding and planning.',
    iconName: 'Sparkles',
    tag: 'Daily',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'multi-model-ai',
    title: 'Multi-Model',
    description: 'Best model picked for each task.',
    iconName: 'Layers',
    tag: 'Engine',
    gradient: 'from-violet-500 to-fuchsia-600'
  },
  {
    id: 'intelligent-routing',
    title: 'Smart Routing',
    description: 'Auto-routes by speed and complexity.',
    iconName: 'GitMerge',
    tag: 'Auto',
    gradient: 'from-teal-500 to-blue-500'
  }
];

export const heroFloatingCards = [
  { text: 'Thinking...', icon: 'Brain', delay: 0 },
  { text: 'Searching...', icon: 'Globe', delay: 1.5 },
  { text: 'Writing...', icon: 'Sparkles', delay: 3 },
  { text: 'Saved', icon: 'Database', delay: 4.5 }
];
