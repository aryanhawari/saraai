import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Download, ArrowRight } from 'lucide-react';
import { APK_URL, APK_SIZE_MB } from '../config';

export const FinalCTA: React.FC = () => {
  return (
    <section id="final-cta-section" className="relative py-20 lg:py-28 z-10">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[28px] overflow-hidden ultra-glass p-px"
        >
          {/* soft brand glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[560px] h-[280px] rounded-full bg-gradient-to-b from-red-500/10 to-transparent blur-3xl pointer-events-none" />

          <div className="relative z-10 px-6 sm:px-14 py-14 sm:py-16 text-center space-y-5">
            <div className="eyebrow text-brand!">
              <span>Get started</span>
            </div>

            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-neutral-900 tracking-tight">
              Ready to meet <span className="text-gradient">SARA?</span>
            </h2>

            <p className="text-[15px] sm:text-base text-neutral-600 max-w-md mx-auto leading-relaxed">
              Free Android app — fast, private, and about {APK_SIZE_MB} MB.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <a
                href={APK_URL}
                id="final-download-cta-btn"
                download
                className="group inline-flex items-center justify-center gap-2 pl-6 pr-7 py-3.5 rounded-full font-heading font-semibold text-[15px] text-white btn-primary"
              >
                <Download className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                <span>Download SARA</span>
              </a>

              <Link
                to="/contact"
                id="final-connect-aryan-btn"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-heading font-semibold text-[15px] text-neutral-800 btn-ghost"
              >
                <span>Talk to Aryan</span>
                <ArrowRight className="w-4 h-4 text-neutral-400 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
