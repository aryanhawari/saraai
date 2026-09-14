import React from 'react';
import { motion } from 'motion/react';
import { Cpu } from 'lucide-react';
import { saraTechStack } from '../data/techStack';
import { SectionHeader } from './SectionHeader';

const handleSpotlight = (e: React.MouseEvent<HTMLElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
};

export const TechStackSection: React.FC = () => {
  return (
    <section id="technology-section" className="relative py-20 lg:py-28 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeader
          eyebrow="Architecture & Frameworks"
          eyebrowIcon={<Cpu className="w-3.5 h-3.5" />}
          title={
            <>
              The stack behind <span className="text-gradient">SARA AI</span>
            </>
          }
          description="A modern full-stack ecosystem chosen for speed — streaming responses, reliable memory and low latency under load."
        />

        {/* Tech Stack Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
          {saraTechStack.map((tech, idx) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: (idx % 5) * 0.05, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              onMouseMove={handleSpotlight}
              className="rounded-3xl ultra-glass-card spotlight-card p-6 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.12em] px-2.5 py-1 rounded-full bg-red-50/90 text-red-600 font-semibold border border-red-200/60 inline-block">
                  {tech.category}
                </span>

                <h3 className="font-heading font-bold text-lg text-neutral-900">
                  {tech.name}
                </h3>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  {tech.description}
                </p>
              </div>

              <div className="pt-3 mt-4 border-t border-neutral-200/70 flex items-center justify-between text-[10px] text-neutral-400 font-mono">
                <span>In production</span>
                <span className="font-semibold text-neutral-500">0{idx + 1}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
