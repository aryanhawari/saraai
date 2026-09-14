import React from 'react';
import { motion } from 'motion/react';
import {
  Brain,
  Activity,
  Globe,
  BadgeCheck,
  Clock3,
  Users,
  HeartHandshake,
  AudioLines,
  Lock,
  Github,
  MapPin,
  ArrowUpRight
} from 'lucide-react';
import { socialLinks } from '../config';

const brainFeatures = [
  {
    icon: Brain,
    title: 'Own AI Brain',
    description: 'Designed, trained and tuned by Aryan Hawari — his own engine, not anyone else\'s.'
  },
  {
    icon: Activity,
    title: 'Real-Time Thinking',
    description: 'A truthful status begins instantly when you send. Verified notes replace fake step narration.'
  },
  {
    icon: Globe,
    title: 'Ultra Parallel Internet Intelligence',
    description: 'DuckDuckGo, Mojeek, Wikipedia, Google News, official websites and GitHub search together. Deep Research adds Serper, SerpAPI, Tavily, Brave and Firecrawl when configured.'
  },
  {
    icon: BadgeCheck,
    title: 'Source Verification',
    description: 'Results are deduplicated, ranked by relevance, recency and authority — official sources win conflicts.'
  },
  {
    icon: Clock3,
    title: 'Freshness Guard',
    description: 'Today, latest, current and breaking questions bypass stale cache — and SARA discloses if live verification fails.'
  },
  {
    icon: Users,
    title: 'Public Social Lookup',
    description: 'Profile URLs and public follower counts can be cross-checked from public sources. Private or logged-in account data is never claimed.'
  },
  {
    icon: HeartHandshake,
    title: 'Proactive & Emotional',
    description: 'Sara senses your mood and picks the right tone.'
  },
  {
    icon: AudioLines,
    title: 'Live Voice & Speech',
    description: 'Talk to Sara naturally, in real time.'
  },
  {
    icon: Lock,
    title: 'Private Memory',
    description: 'Chats and memories stay on your phone — never on a server.'
  }
];

const handleSpotlight = (e: React.MouseEvent<HTMLElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
};

export const SaraBrainSection: React.FC = () => {
  return (
    <section id="sara-brain" className="relative py-20 lg:py-28 z-10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 lg:mb-16 space-y-4"
        >
          <div className="eyebrow justify-center">
            <span>Inside SARA AI</span>
          </div>

          <h2 className="font-heading font-bold text-3xl sm:text-[2.6rem] leading-[1.08] tracking-[-0.03em] text-neutral-900">
            SARA runs on Aryan&apos;s <span className="text-gradient">own AI brain</span>
          </h2>

          <p className="text-neutral-600 text-[15px] sm:text-base leading-relaxed max-w-2xl mx-auto">
            SARA AI runs on Aryan Hawari&apos;s own AI brain — a custom engine designed,
            built and trained by him. No outside AI company powers SARA; every thought
            comes from his own model.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {brainFeatures.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: (idx % 3) * 0.07, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                onMouseMove={handleSpotlight}
                className="group relative rounded-3xl ultra-glass-card spotlight-card p-6 sm:p-7"
              >
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-200/60 flex items-center justify-center text-red-600 group-hover:from-red-600 group-hover:to-red-700 group-hover:text-white group-hover:border-red-600 transition-all duration-300 flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-neutral-900 leading-snug">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Creator card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-8 rounded-[28px] ultra-glass p-8 sm:p-10 overflow-hidden"
        >
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[260px] rounded-full bg-gradient-to-b from-red-500/10 to-transparent blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="eyebrow">
                <span>Creator &amp; Developer of SARA AI</span>
              </div>

              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-neutral-900 tracking-tight">
                Aryan Hawari
              </h3>

              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <MapPin className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>Kalaiya, Bara, Nepal</span>
              </div>

              <p className="text-neutral-600 text-[15px] leading-relaxed max-w-2xl">
                Aryan is a young developer with one simple dream: to build his own AI.
                SARA AI is that dream, made real — a fast, friendly and private assistant
                created by him, for everyone. He designs everything himself: the brain,
                the thinking, the look. Every update makes SARA smarter, faster and more helpful.
              </p>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                id="brain-github-btn"
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-heading font-semibold text-sm text-white btn-primary"
              >
                <Github className="w-4 h-4" />
                <span>github.com/aryanhawari</span>
                <ArrowUpRight className="w-4 h-4 text-white/75 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
