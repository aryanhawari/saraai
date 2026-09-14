import React, { useEffect } from 'react';
import { Hero } from '../components/Hero';
import { CapabilityMarquee } from '../components/CapabilityMarquee';
import { AboutSaraSection } from '../components/AboutSaraSection';
import { FeatureCard } from '../components/FeatureCard';
import { ModeInteractiveShowcase } from '../components/ModeInteractiveShowcase';
import { DownloadSection } from '../components/DownloadSection';
import { DeveloperSection } from '../components/DeveloperSection';
import { FinalCTA } from '../components/FinalCTA';
import { SectionHeader } from '../components/SectionHeader';
import { saraFeatures } from '../data/features';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative z-10">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Capability Ticker */}
      <CapabilityMarquee />

      <div className="space-y-2 sm:space-y-4 pt-4">
        {/* 3. About SARA AI */}
        <AboutSaraSection />

        {/* 4. SARA AI Modes Interactive Showcase */}
        <ModeInteractiveShowcase />

        {/* 5. SARA AI Features Section */}
        <section id="home-features" className="relative py-20 lg:py-28">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
              <SectionHeader
                align="left"
                noBottomMargin
                eyebrow="Features"
                eyebrowIcon={<Sparkles className="w-3.5 h-3.5" />}
                title={
                  <>
                    Built for <span className="text-gradient">clarity</span>
                  </>
                }
                description="Everything you need — nothing extra."
              />

              <Link
                to="/sara-ai"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full btn-ghost text-sm font-semibold text-neutral-800 self-start md:self-auto mb-1"
              >
                <span>All features</span>
                <ArrowRight className="w-4 h-4 text-red-600 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {saraFeatures.slice(0, 8).map((feature, idx) => (
                <FeatureCard key={feature.id} feature={feature} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* 6. App Download Section */}
        <DownloadSection />

        {/* 7. Developer Section */}
        <DeveloperSection />

        {/* 8. Final Call to Action */}
        <FinalCTA />
      </div>
    </div>
  );
};
