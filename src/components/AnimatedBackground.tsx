import React from 'react';

export const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden grain" aria-hidden="true">
      {/* Fine engineering grid, fading toward the bottom */}
      <div className="absolute inset-0 cyber-grid opacity-70" />

      {/* Aurora light field — warm brand tones that drift slowly */}
      <div className="absolute -top-[18%] left-1/2 -translate-x-1/2 w-[80vw] h-[52vw] max-w-[1000px] max-h-[640px] rounded-full bg-gradient-to-b from-red-500/[0.08] via-rose-400/[0.05] to-transparent blur-[110px] animate-aurora" />
      <div className="absolute top-[38%] -right-[12%] w-[46vw] h-[46vw] max-w-[680px] max-h-[680px] rounded-full bg-orange-300/[0.1] blur-[130px] animate-aurora" style={{ animationDelay: '-6s' }} />
      <div className="absolute bottom-[6%] -left-[12%] w-[46vw] h-[46vw] max-w-[680px] max-h-[680px] rounded-full bg-rose-300/[0.08] blur-[130px] animate-aurora" style={{ animationDelay: '-12s' }} />

      {/* Horizon hairline glow that anchors the hero */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] max-w-[820px] h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
    </div>
  );
};
