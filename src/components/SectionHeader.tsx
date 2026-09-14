import React from 'react';
import { motion } from 'motion/react';

interface SectionHeaderProps {
  eyebrow: string;
  eyebrowIcon?: React.ReactNode;
  title: React.ReactNode;
  description?: string;
  align?: 'center' | 'left';
  noBottomMargin?: boolean;
  className?: string;
}

/**
 * Unified section header: eyebrow label with brand dot, display title with
 * gradient accent slot, and a muted description. Keeps typographic rhythm
 * identical across pages.
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  eyebrowIcon,
  title,
  description,
  align = 'center',
  noBottomMargin = false,
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`${isCenter ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'} ${noBottomMargin ? '' : 'mb-12 lg:mb-16'} space-y-4 ${className}`}
    >
      <div className={`eyebrow ${isCenter ? 'justify-center' : ''}`}>
        {eyebrowIcon}
        <span>{eyebrow}</span>
      </div>

      <h2 className="font-heading font-bold text-3xl sm:text-[2.6rem] leading-[1.08] tracking-[-0.03em] text-neutral-900">
        {title}
      </h2>

      {description && (
        <p className={`text-neutral-600 text-[15px] sm:text-base leading-relaxed ${isCenter ? 'max-w-xl mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
};
