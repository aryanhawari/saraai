import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface SocialCardProps {
  platform: string;
  label: string;
  handle: string;
  href: string;
  iconSvg: React.ReactNode;
  gradient: string;
  index: number;
}

const handleSpotlight = (e: React.MouseEvent<HTMLElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
};

export const SocialCard: React.FC<SocialCardProps> = ({
  platform,
  label,
  handle,
  href,
  iconSvg,
  index
}) => {
  const isEmail = href.startsWith('mailto:');

  return (
    <motion.a
      href={href}
      target={isEmail ? '_self' : '_blank'}
      rel={isEmail ? undefined : 'noopener noreferrer'}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      onMouseMove={handleSpotlight}
      id={`social-card-${platform.toLowerCase()}`}
      className="group relative rounded-3xl ultra-glass-card spotlight-card p-6 flex items-center justify-between"
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className="w-12 h-12 rounded-2xl bg-white/80 border border-neutral-200/80 group-hover:bg-red-50 group-hover:border-red-200 text-neutral-800 group-hover:text-red-600 flex items-center justify-center flex-shrink-0 transition-colors duration-200 shadow-sm">
          {iconSvg}
        </div>

        {/* Text */}
        <div className="space-y-0.5">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-heading font-bold text-base text-neutral-900 group-hover:text-red-600 transition-colors">
              {platform}
            </h4>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-100/90 border border-neutral-200/70 text-neutral-500">
              {label}
            </span>
          </div>
          <p className="text-xs text-neutral-500 font-mono truncate max-w-[180px] sm:max-w-[220px]">
            {handle}
          </p>
        </div>
      </div>

      <div className="w-8 h-8 rounded-full bg-white/80 border border-neutral-200/80 group-hover:bg-red-50 flex items-center justify-center text-neutral-400 group-hover:text-red-600 transition-colors shadow-sm">
        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </div>
    </motion.a>
  );
};
