import React from 'react';
import { motion } from 'motion/react';
import {
  MessageSquare,
  BrainCircuit,
  Globe,
  Cpu,
  Mic,
  Sparkles,
  Layers,
  GitMerge,
  ArrowUpRight
} from 'lucide-react';
import { FeatureItem } from '../types';

interface FeatureCardProps {
  feature: FeatureItem;
  index: number;
  className?: string;
}

const iconMap: Record<string, React.ElementType> = {
  MessageSquare,
  BrainCircuit,
  Globe,
  Cpu,
  Mic,
  Sparkles,
  Layers,
  GitMerge,
};

const handleSpotlight = (e: React.MouseEvent<HTMLElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
};

export const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index, className = '' }) => {
  const Icon = iconMap[feature.iconName] || Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      onMouseMove={handleSpotlight}
      className={`group relative rounded-3xl ultra-glass-card spotlight-card p-6 sm:p-7 flex flex-col justify-between ${className}`}
    >
      <div>
        {/* Top bar with Icon and Tag */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-200/60 flex items-center justify-center text-red-600 group-hover:from-red-600 group-hover:to-red-700 group-hover:text-white group-hover:border-red-600 group-hover:shadow-lg group-hover:shadow-red-600/25 transition-all duration-300">
            <Icon className="w-5 h-5" />
          </div>

          {feature.tag && (
            <span className="text-[10px] font-mono uppercase tracking-[0.12em] px-2.5 py-1 rounded-full bg-neutral-100/80 border border-neutral-200/70 text-neutral-500 font-semibold">
              {feature.tag}
            </span>
          )}
        </div>

        {/* Title and Description */}
        <h3 className="font-heading font-bold text-lg sm:text-xl text-neutral-900 group-hover:text-red-600 transition-colors mb-2">
          {feature.title}
        </h3>

        <p className="text-sm text-neutral-600 leading-relaxed">
          {feature.description}
        </p>
      </div>

      <div className="pt-4 mt-5 border-t border-neutral-200/70 flex items-center justify-end text-red-600">
        <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
      </div>
    </motion.div>
  );
};
