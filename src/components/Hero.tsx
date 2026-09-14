import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDownToLine, ShieldCheck, MapPin } from 'lucide-react';
import { APK_URL, APK_SIZE_MB } from '../config';
import { SaraPhoneMockup } from './SaraPhoneMockup';

const easeOut = [0.16, 1, 0.3, 1] as const;

export const Hero: React.FC = () => {
  return (
    <section
      id="hero-section"
      className="relative min-h-[92svh] flex flex-col justify-center pt-28 sm:pt-32 pb-14 lg:pt-36 lg:pb-16 overflow-visible"
    >
      {/* Premium hero backdrop — layered warm glows over the global grid */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Center spotlight behind the headline + phone */}
        <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[920px] h-[600px] rounded-full bg-[radial-gradient(closest-side,rgba(212,49,34,0.13),rgba(240,120,70,0.06)_55%,transparent)] blur-3xl animate-aurora" />
        {/* Left warm rose wash */}
        <div className="absolute top-[8%] -left-44 w-[560px] h-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(244,114,82,0.11),transparent)] blur-3xl animate-aurora" style={{ animationDelay: '-6s' }} />
        {/* Right amber wash behind the phone */}
        <div className="absolute top-[22%] -right-52 w-[640px] h-[640px] rounded-full bg-[radial-gradient(closest-side,rgba(251,146,60,0.13),transparent)] blur-3xl animate-aurora" style={{ animationDelay: '-12s' }} />
        {/* Low ember glow that grounds the fold */}
        <div className="absolute bottom-[-14%] left-1/2 -translate-x-1/2 w-[760px] h-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(212,49,34,0.07),transparent)] blur-3xl" />
        {/* Horizon hairline that anchors the first fold */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70vw] max-w-[920px] h-px bg-gradient-to-r from-transparent via-red-500/35 to-transparent" />
        {/* Soft veil so the copy stays crisp over the glows */}
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-paper" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left — message */}
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6">

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOut }}
              className="inline-flex items-center gap-2.5"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-50" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand" />
              </span>
              <span className="text-[11px] font-semibold tracking-[0.16em] uppercase text-neutral-500">
                Nepal&apos;s AI Assistant
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: easeOut }}
              className="space-y-3"
            >
              <h1 className="font-heading font-bold text-[2.9rem] sm:text-6xl lg:text-[4.6rem] leading-[1.0] tracking-[-0.035em] text-neutral-900">
                Meet <span className="text-gradient">SARA&nbsp;AI</span>
              </h1>
              <p className="font-heading text-lg sm:text-[1.35rem] text-neutral-500 tracking-tight font-medium">
                Thinks, searches and remembers.
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16, ease: easeOut }}
              className="text-[15px] sm:text-base text-neutral-600 max-w-md leading-relaxed"
            >
              Deep reasoning, live web search and persistent memory — in one simple
              Android app that stays out of your way.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24, ease: easeOut }}
              className="flex flex-wrap items-center gap-3 pt-1"
            >
              <a
                href={APK_URL}
                id="hero-get-sara-btn"
                download
                className="group inline-flex items-center justify-center gap-2 pl-6 pr-7 py-3.5 rounded-full font-heading font-semibold text-[15px] text-white btn-primary"
              >
                <ArrowDownToLine className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                <span>Get SARA — it&apos;s free</span>
                <ArrowRight className="w-4 h-4 text-white/75 transition-transform group-hover:translate-x-0.5" />
              </a>

              <Link
                to="/sara-ai"
                id="hero-explore-sara-btn"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-heading font-semibold text-[15px] text-neutral-800 btn-ghost"
              >
                <span>See how it works</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.34 }}
              className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-neutral-500 pt-1"
            >
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Free • {APK_SIZE_MB} MB • Android 8.0+
              </span>
              <span className="hidden sm:block w-px h-3.5 bg-neutral-300" aria-hidden="true" />
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-600" />
                Made in Nepal
              </span>
            </motion.div>

          </div>

          {/* Right — live phone */}
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
            className="lg:col-span-6 relative flex justify-center items-center mt-2 lg:mt-0"
          >
            <div className="w-full flex justify-center animate-float-soft">
              <SaraPhoneMockup />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
