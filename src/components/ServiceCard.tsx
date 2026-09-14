import React from 'react';
import { motion } from 'motion/react';
import {
  Bot,
  PlugZap,
  Workflow,
  Search,
  HardDrive,
  Smartphone,
  Server,
  Boxes,
  ArrowUpRight,
  Check
} from 'lucide-react';
import { ServiceItem } from '../types';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
  onSelect?: (service: ServiceItem) => void;
}

const serviceIconMap: Record<string, React.ElementType> = {
  Bot,
  PlugZap,
  Workflow,
  Search,
  HardDrive,
  Smartphone,
  Server,
  Boxes
};

const handleSpotlight = (e: React.MouseEvent<HTMLElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const Icon = serviceIconMap[service.iconName] || Bot;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5 }}
      onMouseMove={handleSpotlight}
      className="group relative rounded-3xl ultra-glass-card spotlight-card p-7 sm:p-8 flex flex-col justify-between"
    >
      <div>
        {/* Icon & Arrow Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-200/60 flex items-center justify-center text-red-600 group-hover:from-red-600 group-hover:to-red-700 group-hover:text-white group-hover:border-red-600 group-hover:shadow-lg group-hover:shadow-red-600/25 transition-all duration-300">
            <Icon className="w-6 h-6" />
          </div>

          <Link
            to="/contact"
            id={`service-inquire-${service.id}`}
            aria-label={`Inquire about ${service.title}`}
            className="w-9 h-9 rounded-full bg-white/80 border border-neutral-200/80 hover:bg-red-50 hover:border-red-200 hover:text-red-600 flex items-center justify-center text-neutral-400 transition-all group-hover:rotate-45 shadow-sm"
            title="Inquire about service"
          >
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Title */}
        <h3 className="font-heading font-bold text-xl sm:text-2xl text-neutral-900 group-hover:text-red-600 transition-colors mb-3">
          {service.title}
        </h3>

        {/* Short Description */}
        <p className="text-sm text-neutral-600 leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Highlights */}
        <div className="space-y-2 pt-3 border-t border-neutral-200/70">
          {service.highlights.map((h, hIdx) => (
            <div key={hIdx} className="flex items-center gap-2 text-xs text-neutral-700">
              <Check className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
              <span>{h}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card Footer CTA */}
      <div className="pt-6 mt-6 border-t border-neutral-200/70 flex items-center justify-end">
        <Link
          to="/contact"
          className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 transition-colors"
        >
          <span>Discuss project</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.div>
  );
};
