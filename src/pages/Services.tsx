import React, { useEffect } from 'react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { saraServices } from '../data/services';
import { ServiceCard } from '../components/ServiceCard';
import { FinalCTA } from '../components/FinalCTA';

export const Services: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const workflowSteps = [
    {
      step: '01',
      title: 'Discover',
      description: 'Understand goals, scope and privacy needs.'
    },
    {
      step: '02',
      title: 'Design',
      description: 'Prompts, models and data flow.'
    },
    {
      step: '03',
      title: 'Build',
      description: 'Web, Android and backend implementation.'
    },
    {
      step: '04',
      title: 'Launch',
      description: 'Test, deploy and scale.'
    }
  ];

  return (
    <div className="relative z-10 space-y-6 pt-32 sm:pt-36">

      {/* Header Section */}
      <section id="services-header" className="relative py-10 text-center max-w-2xl mx-auto px-5">
        <div className="eyebrow justify-center">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Services</span>
        </div>

        <h1 className="mt-4 font-heading font-bold text-[2.6rem] sm:text-5xl lg:text-6xl text-neutral-900 tracking-[-0.035em] leading-[1.02]">
          AI <span className="text-gradient">Services</span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-neutral-600">
          Custom AI, apps and integrations — built end-to-end.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/contact"
            id="services-get-in-touch-btn"
            className="px-7 py-3.5 rounded-full font-heading font-semibold text-sm text-white btn-primary"
          >
            Get in touch
          </Link>
          <a
            href="#all-services-grid"
            className="px-6 py-3.5 rounded-full font-heading font-semibold text-sm text-neutral-800 btn-ghost"
          >
            View services
          </a>
        </div>
      </section>

      {/* Services Grid */}
      <section id="all-services-grid" className="relative py-12">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {saraServices.map((service, idx) => (
              <ServiceCard key={service.id} service={service} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative py-12 max-w-6xl mx-auto px-5 sm:px-8">
        <div className="rounded-[28px] bg-white border border-neutral-200/90 shadow-[0_24px_64px_-28px_rgba(48,34,22,0.14)] p-8 sm:p-10">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <div className="eyebrow justify-center">
              <span>Process</span>
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-neutral-900 tracking-[-0.025em]">
              Simple, fast delivery
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {workflowSteps.map((step, sIdx) => (
              <div
                key={sIdx}
                className="group p-5 rounded-2xl bg-paper border border-neutral-200/70 hover:border-red-200 hover:bg-white transition-colors space-y-2"
              >
                <span className="font-heading text-xl font-bold text-gradient">
                  {step.step}
                </span>
                <h3 className="font-heading font-bold text-base text-neutral-900">
                  {step.title}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-neutral-200/70 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>For startups, teams and students.</span>
            </div>
            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-full btn-primary text-white font-semibold text-xs transition-all flex items-center gap-1.5"
            >
              <span>Contact Aryan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <FinalCTA />

    </div>
  );
};
