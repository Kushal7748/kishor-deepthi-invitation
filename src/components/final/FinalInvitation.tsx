import React from 'react';
import { invitationConfig } from '../../config/invitation';
import { SectionReveal } from '../shared/SectionReveal';
import { GoldDivider } from '../shared/GoldDivider';
import { Heart } from 'lucide-react';

export const FinalInvitation: React.FC = () => {
  const { copy, couple } = invitationConfig;

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 bg-[#FAF6EE] text-center relative overflow-hidden select-none">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        <SectionReveal>
          <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold mb-4 mx-auto">
            <Heart className="w-4 h-4 fill-gold/20" />
          </div>
          <p className="eyebrow mb-2">{copy.finalHeadline}</p>
          <h2 className="font-display italic text-3xl sm:text-4xl text-charcoal font-normal max-w-lg mx-auto leading-snug">
            {copy.finalSubline}
          </h2>
          <GoldDivider variant="ornate" width="sm" className="my-6" />
          <p className="font-display text-2xl sm:text-3xl text-brass">
            {couple.partnerA} & {couple.partnerB}
          </p>
        </SectionReveal>
      </div>
    </section>
  );
};
