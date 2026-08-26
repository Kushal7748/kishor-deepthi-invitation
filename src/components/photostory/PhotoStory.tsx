import React from 'react';
import { invitationConfig } from '../../config/invitation';
import { SectionReveal } from '../shared/SectionReveal';
import { GoldDivider } from '../shared/GoldDivider';
import { Sparkles } from 'lucide-react';

export const PhotoStory: React.FC = () => {
  const photos = invitationConfig.images.photoStory;

  if (!photos || photos.length === 0) {
    return null;
  }

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 bg-[#FAF6EE] relative overflow-hidden select-none">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <SectionReveal>
          <p className="eyebrow mb-2">Moments of Love</p>
          <h2 className="font-display italic text-3xl sm:text-4xl md:text-5xl text-charcoal font-normal">
            A Glimpse of Our Journey
          </h2>
          <GoldDivider variant="ornate" width="sm" className="my-5" />
        </SectionReveal>

        {/* Featured Editorial Photo */}
        <div className="w-full max-w-2xl mt-6">
          {photos.map((photo, index) => (
            <SectionReveal key={index} delay={0.2}>
              <div className="relative group">
                {/* Decorative Gold Frame */}
                <div className="absolute -inset-3 rounded-3xl border-2 border-gold/40 pointer-events-none transform rotate-1 transition-transform duration-500 group-hover:rotate-0" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-gold/60 aspect-[3/4] bg-champagne">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ objectPosition: photo.focalPoint || '50% 20%' }}
                  />

                  {/* Subtle Gradient & Caption */}
                  {photo.caption && (
                    <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent flex flex-col items-center justify-end text-center">
                      <div className="flex items-center gap-1.5 text-gold text-xs font-sans uppercase tracking-[0.2em] mb-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Kishor & Deepthi</span>
                        <Sparkles className="w-3 h-3" />
                      </div>
                      <p className="font-display italic text-ivory text-xl sm:text-2xl drop-shadow-xs font-light">
                        &ldquo;{photo.caption}&rdquo;
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
