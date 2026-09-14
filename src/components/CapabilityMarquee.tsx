import React from 'react';
import { Brain, Globe, Mic, Database, MessageSquare, Code2, Sparkles, Languages, Zap, ShieldCheck } from 'lucide-react';

const capabilities = [
  { label: 'Deep Reasoning', icon: Brain },
  { label: 'Live Web Search', icon: Globe },
  { label: 'Voice Interaction', icon: Mic },
  { label: 'Persistent Memory', icon: Database },
  { label: 'Natural Chat', icon: MessageSquare },
  { label: 'Code Generation', icon: Code2 },
  { label: 'Smart Assistance', icon: Sparkles },
  { label: 'English + Nepali', icon: Languages },
  { label: 'Instant Responses', icon: Zap },
  { label: 'Private by Design', icon: ShieldCheck },
];

export const CapabilityMarquee: React.FC = () => {
  const row = [...capabilities, ...capabilities];

  return (
    <div className="relative py-6 border-y border-neutral-200/70 bg-white/40 backdrop-blur-sm marquee-mask overflow-hidden">
      <div className="flex w-max animate-marquee gap-10 pr-10">
        {row.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={`${item.label}-${idx}`}
              className="flex items-center gap-2.5 text-sm font-medium text-neutral-500 whitespace-nowrap"
              aria-hidden={idx >= capabilities.length}
            >
              <Icon className="w-4 h-4 text-red-500/80" />
              <span>{item.label}</span>
              <span className="ml-6 w-1 h-1 rounded-full bg-neutral-300" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
