import { ModeItem } from '../types';

export const saraModes: ModeItem[] = [
  {
    id: 'fast',
    name: 'FAST',
    tagline: 'Instant answers.',
    description: 'Quick replies for everyday questions.',
    suitableFor: [
      'Quick questions',
      'Daily tasks',
      'Translations',
      'Ideas'
    ],
    badgeColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
    actionText: 'Try Fast',
    demoQuery: 'Summarize Mount Everest in 2 sentences.',
    demoResponse: 'Mount Everest (Sagarmatha) is Nepal\'s pride and a global symbol of mountaineering. It drives eco-tourism and Sherpa culture.'
  },
  {
    id: 'thinker',
    name: 'DEEP THINKER',
    tagline: 'Reasons step by step.',
    description: 'Breaks down complex problems clearly.',
    suitableFor: [
      'Coding help',
      'System design',
      'Math',
      'Study analysis'
    ],
    badgeColor: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
    actionText: 'Explore',
    demoQuery: 'Dijkstra vs A* — which is faster?',
    thinkingSteps: [
      'Comparing graph models...',
      'Checking complexity O((V + E) log V)...',
      'Evaluating heuristic pruning...',
      'Writing clean comparison...'
    ],
    demoResponse: 'Dijkstra explores evenly with O((V + E) log V). A* adds a heuristic to focus search, cutting explored nodes by up to 80% on grids.'
  },
  {
    id: 'search',
    name: 'SEARCH',
    tagline: 'Live web answers.',
    description: 'Grounded in current web sources.',
    suitableFor: [
      'AI news',
      'Current events',
      'Market rates',
      'Cited facts'
    ],
    badgeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    actionText: 'Search',
    demoQuery: 'Latest AI news in Nepal?',
    citations: [
      { title: 'Nepal AI Ecosystem 2026', url: 'https://tech-nepal.org', time: '12m ago' },
      { title: 'KU AI Research Lab', url: 'https://ku.edu.np', time: '1h ago' }
    ],
    demoResponse: 'Nepal is adopting local AI fast — universities expanding Nepali NLP, and apps like SARA AI bringing mobile-first assistance.'
  }
];
