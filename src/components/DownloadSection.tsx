import React from 'react';
import { Download, Github, Smartphone, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { APK_URL, APK_SIZE_MB, GITHUB_REPO_URL } from '../config';
import { SaraPhoneMockup } from './SaraPhoneMockup';

export const DownloadSection: React.FC = () => {
  const specs = [
    { label: 'Size', value: `~${APK_SIZE_MB} MB` },
    { label: 'Platform', value: 'Android 8.0+' },
    { label: 'Version', value: 'v1.0.0' },
    { label: 'Price', value: 'Free' },
  ];

  return (
    <section id="download-section" className="relative py-20 lg:py-28 z-10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        <div className="relative rounded-[28px] bg-white border border-neutral-200/90 shadow-[0_24px_64px_-28px_rgba(48,34,22,0.16)] p-8 sm:p-12 overflow-hidden">

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

              <div className="lg:col-span-6 space-y-5">

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-paper-deep border border-neutral-200/70 text-neutral-600 text-[11px] font-semibold uppercase tracking-[0.13em]">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Android App</span>
                </div>

                <div className="space-y-2">
                  <h2 className="font-heading font-bold text-4xl sm:text-5xl text-neutral-900 tracking-tight">
                    Get <span className="text-gradient">SARA</span>
                  </h2>
                  <p className="font-heading text-lg text-neutral-600">
                    Your AI, on your phone.
                  </p>
                </div>

                <p className="text-neutral-600 text-[15px] leading-relaxed max-w-md">
                  Chat, reason and search — fast, light and private.
                </p>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
                  {specs.map((s, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-paper border border-neutral-200/70 text-center"
                    >
                      <span className="text-[10px] uppercase text-neutral-400 block font-semibold tracking-[0.12em]">
                        {s.label}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-neutral-900 mt-0.5 block">
                        {s.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Download Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href={APK_URL}
                    id="download-apk-primary-btn"
                    download
                    className="group inline-flex items-center justify-center gap-2 pl-6 pr-7 py-3.5 rounded-full font-heading font-semibold text-[15px] text-white btn-primary"
                  >
                    <Download className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                    <span>Download APK</span>
                  </a>

                  <a
                    href={GITHUB_REPO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="view-github-secondary-btn"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-heading font-semibold text-[15px] text-neutral-800 btn-ghost"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                </div>

                <div className="pt-1 flex items-center gap-4 text-xs text-neutral-500">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    No tracking
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Official release
                  </span>
                </div>

              </div>

              <div className="lg:col-span-6 flex justify-center items-center">
                <SaraPhoneMockup compact />
              </div>

            </div>

        </div>

      </div>
    </section>
  );
};
