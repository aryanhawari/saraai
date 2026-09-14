import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Menu, X, ArrowDownToLine } from 'lucide-react';
import { APK_URL } from '../config';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'SARA AI', path: '/sara-ai' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="fixed top-3 sm:top-4 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-3xl relative">
        <nav
          id="main-navbar"
          className={`transition-all duration-500 rounded-[22px] px-4 sm:px-5 py-2.5 grid grid-cols-[1fr_auto_1fr] items-center relative ${
            scrolled ? 'nav-glass-strong' : 'nav-glass'
          }`}
        >
          {/* Top light streak */}
          <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />

          {/* Scroll progress hairline */}
          <motion.div
            className="absolute bottom-0 left-5 right-5 h-[2px] origin-left rounded-full bg-gradient-to-r from-brand via-orange-400 to-amber-400"
            style={{ scaleX: progress, opacity: scrolled ? 1 : 0 }}
            aria-hidden="true"
          />

          {/* Brand — clean text wordmark */}
          <Link
            to="/"
            id="nav-logo"
            className="col-start-1 justify-self-start flex items-baseline gap-1 group focus:outline-none rounded-lg"
          >
            <span className="font-heading font-bold text-lg sm:text-xl tracking-tight text-neutral-900">
              SARA
            </span>
            <span className="font-heading font-bold text-lg sm:text-xl tracking-tight text-gradient">
              AI
            </span>
          </Link>

          {/* Center Navigation Links */}
          <div className="col-start-2 hidden md:flex items-center gap-1 p-1 rounded-full bg-white/60 border border-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(48,34,22,0.05)]">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`relative px-4 py-1.5 rounded-full text-[13px] tracking-tight transition-colors ${
                    isActive
                      ? 'text-brand font-semibold'
                      : 'text-neutral-600 font-medium hover:text-neutral-900'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full bg-white shadow-[0_2px_8px_-2px_rgba(212,49,34,0.25),0_1px_2px_rgba(48,34,22,0.08)] ring-1 ring-[#d43122]/15 -z-10"
                      transition={{ type: 'spring', bounce: 0.18, duration: 0.45 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right — desktop download CTA (PC/Windows only), mobile gets the menu toggle */}
          <div className="col-start-3 justify-self-end flex items-center gap-2">
            <a
              href={APK_URL}
              id="nav-download-cta"
              download
              className="group hidden md:inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-semibold text-white btn-primary"
            >
              <ArrowDownToLine className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
              <span>Get SARA</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-nav-toggle"
              className="md:hidden w-9 h-9 rounded-full bg-white/80 border border-white/90 shadow-sm text-neutral-700 flex items-center justify-center transition-colors hover:bg-white"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-[68px] left-0 right-0 rounded-[22px] nav-glass-strong p-2.5 z-50 md:hidden"
            >
              <div className="flex flex-col space-y-1">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-4 py-3 rounded-2xl text-sm font-semibold transition-colors ${
                        isActive
                          ? 'bg-white text-brand shadow-[0_2px_8px_-2px_rgba(212,49,34,0.2)]'
                          : 'text-neutral-700 hover:bg-white/70'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
