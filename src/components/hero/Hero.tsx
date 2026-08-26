import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { invitationConfig } from '../../config/invitation';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { GoldDivider } from '../shared/GoldDivider';
import { Sparkles, ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const { couple, event, location } = invitationConfig;
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [0, 50]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] sm:min-h-screen w-full flex flex-col justify-between items-center px-4 sm:px-8 py-12 sm:py-16 bg-[#FAF6EE] text-charcoal overflow-hidden select-none"
    >
      {/* Background Royal Golden Glow & Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(212,175,55,0.12)_0%,rgba(250,246,238,0.95)_75%)] pointer-events-none" />

      {/* Side Decorative Borders */}
      <div className="absolute top-0 left-0 w-24 sm:w-36 h-full pointer-events-none opacity-30 bg-gradient-to-r from-gold/15 to-transparent" />
      <div className="absolute top-0 right-0 w-24 sm:w-36 h-full pointer-events-none opacity-30 bg-gradient-to-l from-gold/15 to-transparent" />

      {/* Top Auspicious Ganesha Invocations */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center text-center mt-2"
      >
        {/* Golden Ganesha Emblem */}
        <div className="w-12 h-12 mb-1.5 flex items-center justify-center text-gold">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-current drop-shadow-xs">
            <path d="M50 10 C45 10 40 14 38 18 C35 15 30 15 25 18 C20 22 18 28 20 35 C22 42 26 48 32 52 C30 56 28 62 30 68 C32 75 38 80 45 82 C48 83 52 83 55 82 C62 80 68 75 70 68 C72 62 70 56 68 52 C74 48 78 42 80 35 C82 28 80 22 75 18 C70 15 65 15 62 18 C60 14 55 10 50 10 Z M50 20 C54 20 57 23 57 27 C57 31 54 34 50 34 C46 34 43 31 43 27 C43 23 46 20 50 20 Z M48 42 C48 40 52 40 52 42 C52 50 56 55 58 60 C59 63 57 66 54 66 C51 66 49 63 49 60 C49 54 48 48 48 42 Z" />
            <circle cx="50" cy="27" r="3" fill="#B8905A" />
          </svg>
        </div>

        <p className="font-serif tracking-[0.2em] text-sm sm:text-base font-semibold text-brass">
          ॥ ಶ್ರೀ ಗಣೇಶಾಯ ನಮಃ ॥
        </p>
      </motion.div>

      {/* Center Main Invitation Copy (NO DATE REVEALED) */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex flex-col items-center text-center max-w-3xl my-auto py-6 sm:py-10"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="font-sans text-xs sm:text-sm text-taupe tracking-wider max-w-lg mb-4 sm:mb-6 font-light px-4"
        >
          We warmly invite you to share in our joy as we celebrate the sacred
        </motion.p>

        {/* Event Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-champagne/60 border border-gold/40 text-brass text-xs font-sans uppercase tracking-[0.25em] mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>{event.title}</span>
          <Sparkles className="w-3.5 h-3.5 text-gold" />
        </motion.div>

        {/* Couple Names - Grand Editorial Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-charcoal font-normal tracking-tight leading-none"
        >
          {couple.partnerA}
        </motion.h1>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="font-display italic text-gold font-light text-2xl sm:text-3xl md:text-4xl my-2"
        >
          and
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-charcoal font-normal tracking-tight leading-none"
        >
          {couple.partnerB}
        </motion.h1>

        <GoldDivider variant="ornate" width="md" className="my-6" />

        {/* Venue Teaser - No date */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05 }}
          className="font-sans text-xs sm:text-sm tracking-[0.2em] uppercase text-taupe/90"
        >
          {location.venueName} • {location.city}
        </motion.p>
      </motion.div>

      {/* Downward Indicator prompting to unveil date */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="relative z-10 flex flex-col items-center gap-1.5 cursor-pointer pb-2"
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight * 0.9,
            behavior: 'smooth',
          });
        }}
      >
        <span className="font-sans text-[11px] tracking-[0.25em] uppercase text-brass font-medium flex items-center gap-1">
          ✦ Scratch below to unveil the date ✦
        </span>
        <ChevronDown className="w-4 h-4 text-gold animate-bounce" />
      </motion.div>
    </section>
  );
};
