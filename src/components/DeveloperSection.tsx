import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Code2,
  MapPin,
  ArrowRight,
  Mail,
  Github,
  ExternalLink,
  Cpu
} from 'lucide-react';
import { siteConfig, socialLinks } from '../config';
import { SectionHeader } from './SectionHeader';

interface DeveloperSectionProps {
  showTitle?: boolean;
}

export const DeveloperSection: React.FC<DeveloperSectionProps> = ({ showTitle = true }) => {
  const [imgSrc, setImgSrc] = useState('/assets/developer.jpg');
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section id="developer-section" className="relative py-20 lg:py-28 z-10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {showTitle && (
          <SectionHeader
            eyebrow="Developer"
            eyebrowIcon={<Code2 className="w-3.5 h-3.5" />}
            title={
              <>
                Built by <span className="text-gradient">Aryan</span>
              </>
            }
            description="Solo-built with care in Nepal."
          />
        )}

        {/* Developer Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[24px] bg-white border border-neutral-200 p-7 sm:p-10 shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left: Developer Portrait */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-[340px] aspect-square rounded-3xl overflow-hidden bg-neutral-100 ring-1 ring-neutral-200/80 shadow-lg group">
                <img
                  src={imgSrc}
                  alt={siteConfig.developer.name}
                  referrerPolicy="no-referrer"
                  onError={() => {
                    if (!imgFailed) {
                      setImgFailed(true);
                      setImgSrc('/assets/1000050617.jpg');
                    }
                  }}
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                />
                {/* Soft bottom scrim for depth */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>

              {/* Status Bar Below the Photo */}
              <div className="w-full max-w-[340px] mt-4 flex items-center justify-between px-4 py-2.5 rounded-2xl bg-white/70 backdrop-blur-md border border-neutral-200/70 text-xs shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="font-heading font-semibold text-neutral-900">Aryan Hawari</span>
                  <span className="text-[11px] text-neutral-500 font-mono">• Founder</span>
                </div>
                <div className="text-[11px] font-mono text-red-600 font-semibold">
                  Nepal
                </div>
              </div>
            </div>

            {/* Right: Developer Bio & Expertise */}
            <div className="lg:col-span-7 space-y-6">

              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.16em] text-red-600 font-semibold">
                  <span>Founder & Lead Engineer</span>
                </div>

                <h3 className="font-heading font-bold text-3xl sm:text-4xl text-neutral-900 tracking-tight">
                  {siteConfig.developer.name}
                </h3>

                <p className="font-heading text-lg sm:text-xl text-neutral-600 font-medium">
                  {siteConfig.developer.title}
                </p>
              </div>

              <p className="text-neutral-600 text-base leading-relaxed">
                {siteConfig.developer.bio}
              </p>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-neutral-600">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-red-600" />
                  <span>Based in Nepal, works worldwide</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-red-600" />
                  <span>AI, apps &amp; websites</span>
                </div>
              </div>

              {/* Technical Domain Badges */}
              <div className="space-y-2.5 pt-1">
                <span className="text-[11px] font-mono uppercase text-neutral-400 tracking-[0.14em] block font-medium">
                  Core Technologies
                </span>
                <div className="flex flex-wrap gap-2">
                  {siteConfig.developer.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3.5 py-1.5 rounded-full bg-white/70 border border-neutral-200/70 hover:bg-red-50 hover:border-red-200 hover:text-red-700 text-xs font-medium text-neutral-700 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                <Link
                  to="/contact"
                  id="developer-connect-btn"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-heading font-bold text-sm text-white btn-primary"
                >
                  <span>Connect With Me</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-heading font-medium text-sm text-neutral-700 bg-white/70 hover:bg-white border border-neutral-200/90 backdrop-blur-md transition-all shadow-sm"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                </a>

                <a
                  href={socialLinks.email}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-full font-heading font-medium text-sm text-neutral-600 hover:text-red-600 transition-colors"
                >
                  <Mail className="w-4 h-4 text-red-600" />
                  <span>{socialLinks.emailAddress}</span>
                </a>
              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
