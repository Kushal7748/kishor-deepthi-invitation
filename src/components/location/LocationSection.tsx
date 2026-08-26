import React from 'react';
import { invitationConfig } from '../../config/invitation';
import { SectionReveal } from '../shared/SectionReveal';
import { GoldDivider } from '../shared/GoldDivider';
import { Navigation, MapPin, ExternalLink } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const { location } = invitationConfig;

  return (
    <section className="py-16 sm:py-32 px-3 sm:px-6 bg-[#FAF6EE] relative overflow-hidden select-none">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Section Heading */}
        <SectionReveal className="text-center mb-8 sm:mb-10 px-2">
          <p className="eyebrow mb-1.5 text-gold text-[10px] sm:text-xs">VENUE</p>
          <h2 className="font-display italic text-3xl sm:text-5xl text-charcoal font-normal">
            Where We Celebrate
          </h2>
          <GoldDivider variant="ornate" width="sm" className="my-4 sm:my-5" />
          <h3 className="font-display text-xl sm:text-3xl text-charcoal font-medium">
            {location.venueName}
          </h3>
          <p className="font-sans text-xs sm:text-sm text-taupe max-w-md mx-auto mt-1 leading-relaxed">
            {location.address}
          </p>
        </SectionReveal>

        {/* Map Card */}
        <SectionReveal delay={0.2} className="w-full max-w-3xl">
          <div className="relative rounded-3xl overflow-hidden bg-[#F1E6D3] border border-gold/40 shadow-xl p-2 sm:p-3">
            {/* Embedded Google Map */}
            <div className="relative w-full h-[240px] sm:h-[360px] md:h-[420px] rounded-2xl overflow-hidden bg-champagne">
              <iframe
                title="Venue Location Map"
                src="https://maps.google.com/maps?q=Akshara+Banquet+%26+Lawns%2C+Kempapura+Rd%2C+Chikkabanavara%2C+Bengaluru&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter contrast-[1.05] brightness-[0.98]"
                loading="lazy"
                allowFullScreen
              />

              {/* Map Venue Card Overlay */}
              <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-[#FAF6EE]/95 backdrop-blur-md rounded-xl p-2.5 sm:p-4 shadow-lg border border-gold/30 max-w-[200px] sm:max-w-xs pointer-events-none">
                <div className="flex items-center gap-1.5 text-gold mb-0.5 sm:mb-1">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span className="font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-charcoal truncate">
                    {location.venueName}
                  </span>
                </div>
                <p className="font-sans text-[9px] sm:text-[10px] text-taupe leading-tight line-clamp-2">
                  {location.address}
                </p>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4 p-3 sm:p-4 w-full">
              <a
                href={location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#C4985D] via-[#A8793B] to-[#8C6A3F] text-ivory font-sans text-xs uppercase tracking-[0.2em] font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Navigation className="w-4 h-4 fill-current" />
                <span>Get Directions</span>
              </a>

              <a
                href={location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-gold/50 text-brass hover:bg-gold/10 font-sans text-xs uppercase tracking-[0.2em] transition-all duration-300 active:scale-[0.98]"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in Maps</span>
              </a>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
};
