import { ServiceItem } from '../types';

export const saraServices: ServiceItem[] = [
  {
    id: 'ai-assistant',
    title: 'AI Assistant',
    description: 'Custom chatbots and assistants for your product.',
    iconName: 'Bot',
    highlights: ['Chat UI', 'Intent detection', 'Custom persona']
  },
  {
    id: 'ai-integration',
    title: 'AI Integration',
    description: 'Add LLMs and AI APIs to your stack.',
    iconName: 'PlugZap',
    highlights: ['API setup', 'Cost control', 'Fallbacks']
  },
  {
    id: 'ai-automation',
    title: 'Automation',
    description: 'Automate repetitive work and reports.',
    iconName: 'Workflow',
    highlights: ['Pipelines', 'Webhooks', 'Zero-touch flows']
  },
  {
    id: 'smart-search',
    title: 'Smart Search',
    description: 'Semantic search and RAG pipelines.',
    iconName: 'Search',
    highlights: ['Embeddings', 'Hybrid search', 'Citations']
  },
  {
    id: 'ai-memory',
    title: 'Memory Systems',
    description: 'Memory that keeps context across sessions.',
    iconName: 'HardDrive',
    highlights: ['Long memory', 'Fast cache', 'Privacy-first']
  },
  {
    id: 'ai-app-dev',
    title: 'App Development',
    description: 'Android and web apps with AI built in.',
    iconName: 'Smartphone',
    highlights: ['Android + React', 'Offline-first', 'Smooth UI']
  },
  {
    id: 'ai-backend',
    title: 'Backend',
    description: 'Fast streaming APIs for AI responses.',
    iconName: 'Server',
    highlights: ['FastAPI', 'Streaming', 'Rate limits']
  },
  {
    id: 'custom-ai',
    title: 'Custom AI',
    description: 'AI built for your business or research.',
    iconName: 'Boxes',
    highlights: ['Prompt design', 'Testing', 'Deployment']
  }
];
