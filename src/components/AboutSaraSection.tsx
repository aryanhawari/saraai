import React from 'react';
import { motion } from 'motion/react';
import { Brain, Zap, Sparkles, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionHeader } from './SectionHeader';

const highlightCards = [
  {
    title: 'Intelligent',
    subtitle: 'Understands context',
    description: 'Natural chat that follows instructions and code.',
    icon: Brain,
    features: ['English + Nepali', 'Remembers context', 'Follows instructions']
  },
  {
    title: 'Fast',
    subtitle: 'Instant replies',
    description: 'Lightweight and optimized for speed.',
    icon: Zap,
    features: ['Fast first reply', 'Small APK size', 'Smart cache']
  },
  {
    title: 'Powerful',
    subtitle: 'All in one',
    description: 'Chat, search, memory and tools together.',
    icon: Sparkles,
    features: ['Live web search', 'Smart model routing', 'Coding help']
  }
];

const handleSpotlight = (e: React.MouseEvent<HTMLElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
};

export const AboutSaraSection: React.FC = () => {
  return (
    <section id="about-sara" className="relative py-20 lg:py-28 z-10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        <SectionHeader
          eyebrow="Why SARA"
          title={
            <>
              What is <span className="text-gradient">SARA?</span>
            </>
          }
          description="Chat, reasoning, live search and memory — in one clean app."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {highlightCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onMouseMove={handleSpotlight}
                className="group relative rounded-3xl ultra-glass-card spotlight-card p-7 flex flex-col justify-between"
              >
                <div>
                  {/* Header with Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-200/60 flex items-center justify-center text-red-600 group-hover:scale-105 group-hover:from-red-600 group-hover:to-red-700 group-hover:text-white group-hover:border-red-600 transition-all duration-300 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs font-semibold tracking-wider text-neutral-300 group-hover:text-red-500 transition-colors">
                      0{idx + 1}
                    </span>
                  </div>

                  <div className="space-y-2 mb-6">
                    <span className="text-[11px] font-semibold text-red-600 font-mono uppercase tracking-[0.14em] block">
                      {card.subtitle}
                    </span>
                    <h3 className="font-heading font-bold text-2xl text-neutral-900">
                      {card.title}
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed pt-1">
                      {card.description}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 pt-5 border-t border-neutral-200/70">
                    {card.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2.5 text-xs text-neutral-700">
                        <Check className="w-4 h-4 text-red-600 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-neutral-200/70">
                  <Link
                    to="/sara-ai"
                    className="text-xs font-semibold text-neutral-600 group-hover:text-red-600 flex items-center gap-1.5 transition-colors"
                  >
                    <span>Explore SARA AI</span>
                    <ArrowRight className="w-3.5 h-3.5 text-red-600 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
