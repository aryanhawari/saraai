import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import { ThemeProvider } from './theme';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { InitialLoader } from './components/InitialLoader';
import { Home } from './pages/Home';
import { SaraAI } from './pages/SaraAI';
import { Services } from './pages/Services';
import { Contact } from './pages/Contact';

export default function App() {
  const [loaderDismissed, setLoaderDismissed] = useState(false);

  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <HashRouter>
          {/* Branded splash shown once per visit */}
          {!loaderDismissed && (
            <InitialLoader onComplete={() => setLoaderDismissed(true)} />
          )}

          <div className="min-h-screen bg-paper text-neutral-900 relative flex flex-col justify-between overflow-x-clip">
            {/* Ambient aurora + grid + grain backdrop */}
            <AnimatedBackground />

            {/* Fixed Top Glassmorphic Navbar */}
            <Navbar />

            {/* Main Content Pages */}
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sara-ai" element={<SaraAI />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            {/* Footer */}
            <Footer />
          </div>
        </HashRouter>
      </MotionConfig>
    </ThemeProvider>
  );
}
