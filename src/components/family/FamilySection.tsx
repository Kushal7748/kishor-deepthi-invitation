import React from 'react';
import { invitationConfig } from '../../config/invitation';
import { SectionReveal } from '../shared/SectionReveal';
import { GoldDivider } from '../shared/GoldDivider';
import { Heart } from 'lucide-react';

export const FamilySection: React.FC = () => {
  const { families } = invitationConfig;

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 bg-[#C8D3C3]/25 relative overflow-hidden select-none">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <SectionReveal className="text-center w-full">
          <p className="eyebrow mb-1">WITH LOVE & BLESSINGS</p>
          <h2 className="font-display italic text-4xl sm:text-5xl text-[#2F4229] font-normal">
            The Families
          </h2>
          <GoldDivider variant="ornate" width="sm" className="my-5" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mt-4">
            {families.map((fam, idx) => (
              <div
                key={idx}
                className="p-6 bg-[#FAF6EE]/90 rounded-2xl border border-gold/35 shadow-xs flex flex-col items-center text-center hover:border-gold/60 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold mb-3">
                  <Heart className="w-4 h-4 fill-gold/20" />
                </div>
                <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-taupe font-medium mb-1.5">
                  {fam.role}
                </p>
                <p className="font-display text-xl sm:text-2xl text-charcoal font-medium">
                  {fam.parents}
                </p>
                <p className="font-sans text-xs tracking-wider uppercase text-taupe/80 mt-1">
                  {fam.familyText}
                </p>
              </div>
            ))}
          </div>

          <p className="font-sans text-xs sm:text-sm text-taupe italic mt-8 max-w-lg mx-auto leading-relaxed">
            Cordially invite you and your family to grace the auspicious occasion and shower your blessings upon the couple.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
};
