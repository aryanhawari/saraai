import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface InitialLoaderProps {
  onComplete?: () => void;
}

/**
 * Branded splash screen. Deliberately brief (~0.9s total) so it never
 * blocks the experience — just enough to land the wordmark.
 */
export const InitialLoader: React.FC<InitialLoaderProps> = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 650;
    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // ease-out curve for a confident, non-linear fill
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setVisible(false);
          onComplete?.();
        }, 180);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="initial-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-paper text-neutral-900"
        >
          <div className="relative flex items-center justify-center mb-5">
            {/* Pulsing brand ring */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="absolute -inset-3 rounded-full bg-red-600/15 blur-xl animate-pulse" />
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 text-white font-heading font-bold text-2xl flex items-center justify-center shadow-lg shadow-red-600/30">
                S
              </div>
            </motion.div>
          </div>

          <div className="text-center space-y-1">
            <h1 className="font-heading font-bold text-xl tracking-wide text-neutral-900">
              SARA <span className="text-gradient">AI</span>
            </h1>
            <p className="text-[10px] font-semibold tracking-[0.24em] text-neutral-400 uppercase font-mono">
              Personal AI Assistant
            </p>
          </div>

          <div className="w-44 h-[3px] bg-neutral-200/70 rounded-full overflow-hidden mt-6">
            <div
              className="h-full bg-gradient-to-r from-red-600 to-rose-500 rounded-full transition-[width] duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
