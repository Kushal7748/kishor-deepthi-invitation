import React from 'react';
import { invitationConfig } from '../../config/invitation';

export const Footer: React.FC = () => {
  const { couple, event } = invitationConfig;

  return (
    <footer className="w-full bg-[#18130E] text-[#FAF6EE] py-16 px-4 sm:px-6 text-center relative overflow-hidden select-none">
      {/* Decorative Gold Top Border Line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="max-w-2xl mx-auto flex flex-col items-center">
        <p className="eyebrow !text-gold/70 text-[10px] tracking-[0.3em] uppercase mb-2">
          WITH LOVE & GRATITUDE
        </p>

        <h3 className="font-display italic text-4xl sm:text-5xl md:text-6xl text-[#FAF6EE] font-normal tracking-tight my-2">
          {couple.partnerA} <span className="text-gold font-serif italic">&</span> {couple.partnerB}
        </h3>

        {/* Small Floral Ornament */}
        <div className="text-gold/80 text-sm my-3">🌸</div>

        <p className="font-sans text-xs sm:text-sm tracking-[0.2em] uppercase text-ivory/75">
          {event.day}th {event.month} {event.year} • Bengaluru
        </p>

        {/* Wedding Hashtag */}
        <div className="mt-5 px-6 py-2.5 rounded-full bg-white/5 border border-gold/30 inline-block shadow-xs">
          <span className="font-sans text-xs tracking-widest text-gold font-medium">
            #KishorDeepthiRingCeremony
          </span>
        </div>

        <p className="font-sans text-[10px] text-ivory/40 tracking-wider mt-8 uppercase">
          Ring Ceremony Digital Invitation • Bengaluru
        </p>
      </div>
    </footer>
  );
};
