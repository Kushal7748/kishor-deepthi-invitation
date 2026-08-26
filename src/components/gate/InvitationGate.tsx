import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { invitationConfig } from '../../config/invitation';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Sparkles } from 'lucide-react';

interface InvitationGateProps {
  isOpen: boolean;
  onOpen: () => void;
}

export const InvitationGate: React.FC<InvitationGateProps> = ({ isOpen, onOpen }) => {
  const reducedMotion = useReducedMotion();
  const [isUnsealing, setIsUnsealing] = useState(false);
  const { couple, event, copy } = invitationConfig;

  const handleUnseal = () => {
    if (isUnsealing) return;
    setIsUnsealing(true);

    // Trigger audio playback upon opening invitation
    window.dispatchEvent(new CustomEvent('wedding:play-audio'));

    setTimeout(() => {
      onOpen();
    }, reducedMotion ? 300 : 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="luxury-royal-gate"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF6EE] px-3 sm:px-6 select-none overflow-hidden touch-none"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: reducedMotion ? 1 : 1.04,
            filter: 'blur(4px)',
            transition: { duration: reducedMotion ? 0.3 : 0.85, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          {/* Subtle Warm Gradient & Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(241,230,211,0.6)_0%,rgba(250,246,238,0.98)_80%)] pointer-events-none" />

          {/* Gilded Outer Border Frame */}
          <div className="absolute inset-3 sm:inset-8 border border-gold/30 rounded-2xl pointer-events-none p-3 sm:p-4 flex flex-col justify-between">
            <div className="flex justify-between text-gold/60 text-xs sm:text-sm">
              <span>✦</span>
              <span>✦</span>
            </div>
            <div className="flex justify-between text-gold/60 text-xs sm:text-sm">
              <span>✦</span>
              <span>✦</span>
            </div>
          </div>

          {/* Center Luxury Unboxing Card */}
          <motion.div
            animate={isUnsealing ? { scale: 0.95, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-w-sm sm:max-w-lg w-full bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-[#F3EAD9] rounded-3xl p-6 sm:p-12 border-2 border-gold/40 shadow-2xl text-center flex flex-col items-center mx-auto"
          >
            {/* Top Sacred Om / Blessing Accent */}
            <div className="flex items-center gap-1.5 sm:gap-2 text-gold/70 text-[10px] sm:text-xs font-serif tracking-[0.25em] sm:tracking-[0.3em] uppercase mb-2 sm:mb-4">
              <span>॥</span>
              <span>श्री गणेशाय नमः</span>
              <span>॥</span>
            </div>

            {/* Subtitle Eyebrow */}
            <p className="eyebrow text-gold text-[9px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase mb-1.5 sm:mb-2">
              {copy.gateEyebrow}
            </p>

            {/* Couple Names */}
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl text-charcoal font-normal tracking-tight my-1 sm:my-2 leading-tight">
              <span>{couple.partnerA}</span>
              <span className="block text-gold font-serif italic text-xl sm:text-3xl my-0.5 sm:my-1 font-light">
                &
              </span>
              <span>{couple.partnerB}</span>
            </h1>

            {/* Interlocking Rings Emblem */}
            <div className="my-3 sm:my-5 relative flex items-center justify-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-gold/80 -mr-1.5 sm:-mr-2 shadow-xs" />
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#8C6A3F]/80 -ml-1.5 sm:-ml-2 shadow-xs" />
              <span className="absolute text-[10px] sm:text-xs">✨</span>
            </div>

            <p className="font-sans text-[11px] sm:text-sm text-taupe tracking-wider uppercase mb-5 sm:mb-8">
              {copy.gateInviteLine} <span className="text-charcoal font-medium">{event.title}</span>
            </p>

            {/* Interactive Royal Wax Seal Button */}
            <motion.button
              type="button"
              onClick={handleUnseal}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="relative group cursor-pointer inline-flex items-center gap-2 sm:gap-3 px-7 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#B8905A] via-[#D4AF37] to-[#8C6A3F] text-ivory font-sans text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-medium shadow-xl hover:shadow-2xl transition-all duration-300 ring-4 ring-gold/20 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-ivory animate-spin" style={{ animationDuration: '6s' }} />
              <span>{copy.gateCta}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-ivory animate-ping" />
            </motion.button>

            <span className="text-[9px] sm:text-[10px] font-sans text-taupe/60 tracking-wider mt-3 sm:mt-4">
              Tap to enter celebration
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
