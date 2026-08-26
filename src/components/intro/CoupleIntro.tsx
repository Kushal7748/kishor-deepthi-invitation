import React from 'react';
import { invitationConfig } from '../../config/invitation';
import { SectionReveal } from '../shared/SectionReveal';
import { GoldDivider } from '../shared/GoldDivider';
import { Sparkles, Heart } from 'lucide-react';

export const CoupleIntro: React.FC = () => {
  const { copy, images, couple } = invitationConfig;

  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 bg-[#F4EDE0]/40 relative overflow-hidden select-none">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <SectionReveal>
          <p className="eyebrow mb-2">A Sacred Union</p>
          <h2 className="font-display italic text-3xl sm:text-4xl md:text-5xl text-charcoal font-normal max-w-xl mx-auto leading-tight">
            {copy.introHeadline}
          </h2>
          <GoldDivider variant="ornate" width="sm" className="my-5" />
        </SectionReveal>

        {/* Editorial Frame + Story Narrative */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center mt-6">
          {/* Portrait Photo Frame */}
          <SectionReveal delay={0.2} className="md:col-span-5 flex justify-center">
            <div className="w-full max-w-sm relative group">
              {/* Decorative Gold Outer Framing */}
              <div className="absolute -inset-3 rounded-3xl border-2 border-gold/40 pointer-events-none transform -rotate-1 transition-transform duration-500 group-hover:rotate-0" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-gold/60 aspect-[3/4] bg-gradient-to-br from-[#FFFDF9] to-[#F1E6D3]">
                {images.intro ? (
                  <img
                    src={images.intro.src}
                    alt={images.intro.alt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ objectPosition: images.intro.focalPoint || '50% 20%' }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full p-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#B8905A] to-[#8C6A3F] border-2 border-gold/50 shadow-md flex items-center justify-center text-ivory mb-4">
                      <span className="font-display text-2xl font-bold tracking-wider">
                        {couple.monogram}
                      </span>
                    </div>
                    <h4 className="font-display text-xl text-charcoal font-medium">
                      {couple.partnerA} & {couple.partnerB}
                    </h4>
                  </div>
                )}

                {/* Subtle bottom gradient overlay with names */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent flex items-end justify-center text-center">
                  <span className="font-display italic text-ivory text-lg tracking-wide drop-shadow-xs">
                    {couple.partnerA} & {couple.partnerB}
                  </span>
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* Narrative Story Copy */}
          <SectionReveal delay={0.35} className="md:col-span-7 text-center md:text-left flex flex-col justify-center">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 text-gold text-xs font-sans uppercase tracking-[0.2em] justify-center md:justify-start">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Story of Forever</span>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl text-charcoal font-normal">
                {couple.partnerA} <span className="text-gold font-serif italic font-light">&</span> {couple.partnerB}
              </h3>

              <p className="font-sans text-sm sm:text-base text-taupe leading-relaxed font-light">
                {copy.introParagraph}
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
                <span className="px-5 py-2 rounded-full bg-champagne/70 border border-gold/40 text-brass text-xs font-sans tracking-[0.2em] uppercase font-medium flex items-center gap-1.5">
                  <Heart className="w-3 h-3 text-gold fill-gold/30" />
                  Two Souls • One Destiny
                </span>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
};
