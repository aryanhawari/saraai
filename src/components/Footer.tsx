import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Heart } from 'lucide-react';
import { socialLinks, siteConfig, APK_URL } from '../config';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="main-footer" className="relative z-10 border-t border-neutral-200/80 bg-white/60 backdrop-blur-xl mt-8">
      <div className="max-w-6xl mx-auto px-6 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-6 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[#e2452d] via-[#d43122] to-[#a81f12] text-white flex items-center justify-center font-heading font-bold text-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_6px_14px_-4px_rgba(212,49,34,0.5)] group-hover:scale-105 group-hover:-rotate-3 transition-transform duration-300">
                S
                <span className="absolute inset-0 rounded-xl ring-1 ring-white/20 pointer-events-none" />
              </div>
              <span className="font-heading font-bold text-xl tracking-tight text-neutral-900">
                SARA <span className="text-gradient">AI</span>
              </span>
            </Link>

            <p className="text-neutral-600 text-sm max-w-sm leading-relaxed">
              {siteConfig.description}
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-[11px] text-emerald-700 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Online • v1.0.0
              </span>
              <span className="text-xs text-neutral-500">Made in Nepal 🇳🇵</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3.5">
            <h3 className="text-[11px] font-bold tracking-[0.16em] text-neutral-900 uppercase">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-neutral-600 hover:text-red-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/sara-ai" className="text-neutral-600 hover:text-red-600 transition-colors">
                  SARA AI
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-neutral-600 hover:text-red-600 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-600 hover:text-red-600 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href={APK_URL}
                  download
                  className="text-red-600 hover:text-red-700 font-semibold inline-flex items-center gap-1 transition-colors"
                >
                  Download APK <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Socials & Connect */}
          <div className="md:col-span-3 space-y-3.5">
            <h3 className="text-[11px] font-bold tracking-[0.16em] text-neutral-900 uppercase">
              Connect
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'GitHub', href: socialLinks.github, external: true },
                { label: 'Instagram', href: socialLinks.instagram, external: true },
                { label: 'Facebook', href: socialLinks.facebook, external: true },
                { label: 'TikTok', href: socialLinks.tiktok, external: true },
                { label: 'Email Aryan', href: socialLinks.email, external: false },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="text-neutral-600 hover:text-red-600 transition-colors inline-flex items-center gap-1.5 group"
                  >
                    {item.label}
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-10 border-t border-neutral-200/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {currentYear} SARA AI. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5">
            <span>Designed & built with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" aria-hidden="true" />
            <span>by</span>
            <Link to="/contact" className="text-neutral-900 font-semibold hover:text-red-600 underline decoration-red-300 underline-offset-2 transition-colors">
              Aryan Hawari
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
