import React, { useEffect } from 'react';
import { Download, Sparkles, ArrowRight, Layers, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { saraFeatures } from '../data/features';
import { FeatureCard } from '../components/FeatureCard';
import { SaraBrainSection } from '../components/SaraBrainSection';
import { ModeInteractiveShowcase } from '../components/ModeInteractiveShowcase';
import { TechStackSection } from '../components/TechStackSection';
import { DownloadSection } from '../components/DownloadSection';
import { FinalCTA } from '../components/FinalCTA';
import { SaraPhoneMockup } from '../components/SaraPhoneMockup';
import { APK_URL, APK_SIZE_MB } from '../config';

export const SaraAI: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToFeatures = () => {
    const el = document.getElementById('sara-features-grid');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative z-10 space-y-6 pt-32 sm:pt-36">

      {/* 1. Product Hero Section */}
      <section id="sara-product-hero" className="relative py-8 overflow-visible">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            {/* Left Column: Heading, Subheading & CTAs */}
            <div className="lg:col-span-6 space-y-5 text-left">

              <div className="eyebrow">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Personal AI</span>
              </div>

              <div className="space-y-2">
                <h1 className="font-heading font-bold text-[2.6rem] sm:text-5xl lg:text-[3.6rem] text-neutral-900 tracking-[-0.035em] leading-[1.02]">
                  SARA, your <br />
                  <span className="text-gradient">
                    personal AI
                  </span>
                </h1>
              </div>

              <p className="text-neutral-600 text-[15px] sm:text-base max-w-md leading-relaxed">
                Understands context, reasons clearly and searches the live web — right from your pocket.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href={APK_URL}
                  id="product-hero-download-btn"
                  download
                  className="group inline-flex items-center justify-center gap-2 pl-6 pr-7 py-3.5 rounded-full font-heading font-semibold text-[15px] text-white btn-primary"
                >
                  <Download className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                  <span>Download APK</span>
                </a>

                <button
                  onClick={scrollToFeatures}
                  id="product-hero-explore-features-btn"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-heading font-semibold text-[15px] text-neutral-800 btn-ghost cursor-pointer"
                >
                  <span>Features</span>
                  <ArrowRight className="w-4 h-4 text-neutral-400 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>

              <div className="flex items-center gap-4 text-xs text-neutral-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Free APK • {APK_SIZE_MB} MB
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Private
                </span>
              </div>

            </div>

            <div className="lg:col-span-6 flex justify-center items-center">
              <SaraPhoneMockup />
            </div>

          </div>
        </div>
      </section>

      {/* 2. SARA AI Features Section */}
      <section id="sara-features-grid" className="relative py-20 lg:py-28">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">

          <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
            <div className="eyebrow justify-center">
              <Layers className="w-3.5 h-3.5" />
              <span>Features</span>
            </div>

            <h2 className="font-heading font-bold text-3xl sm:text-[2.6rem] text-neutral-900 tracking-[-0.03em] leading-[1.08]">
              SARA <span className="text-gradient">features</span>
            </h2>

            <p className="text-neutral-600 text-[15px] leading-relaxed">
              Simple tools that just work.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {saraFeatures.map((feature, idx) => (
              <FeatureCard key={feature.id} feature={feature} index={idx} />
            ))}
          </div>

        </div>
      </section>

      {/* 3. SARA AI Modes Section */}
      <ModeInteractiveShowcase />

      {/* 3.5 Inside SARA AI's Brain — own engine, creator story */}
      <SaraBrainSection />

      {/* 4. Technology Section: POWERING SARA AI */}
      <TechStackSection />

      {/* 5. App Download Section */}
      <DownloadSection />

      {/* 6. Final Call to Action */}
      <FinalCTA />

    </div>
  );
};
