import React from 'react';
import { invitationConfig } from '../../config/invitation';
import { SectionReveal } from '../shared/SectionReveal';
import { GoldDivider } from '../shared/GoldDivider';
import { Sparkles, MapPin } from 'lucide-react';

export const EventDetails: React.FC = () => {
  const { event, location } = invitationConfig;

  const itinerary = [
    {
      time: '10:30 AM',
      title: 'Welcome & Greetings',
      description: 'Arrival of esteemed family & friends, warm greetings, and welcome drinks.',
      icon: '🪔',
    },
    {
      time: '11:30 AM',
      title: 'Ring Exchange',
      description: 'The auspicious moment as Kishor & Deepthi exchange their rings and promises.',
      icon: '💍',
    },
    {
      time: '12:30 PM',
      title: 'Lunch',
      description: 'A delicious grand celebratory lunch, photographs, and joyful blessings with the couple.',
      icon: '🍲',
    },
  ];

  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 bg-[#FAF6EE] relative overflow-hidden select-none">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Section Title */}
        <SectionReveal className="text-center mb-12">
          <p className="eyebrow mb-2">Celebration Itinerary</p>
          <h2 className="font-display italic text-4xl sm:text-5xl text-charcoal font-normal">
            Events Schedule
          </h2>
          <GoldDivider variant="ornate" width="sm" className="my-5" />
          <p className="font-sans text-xs sm:text-sm text-taupe max-w-md mx-auto">
            Join us for an auspicious day of love, laughter, and sacred traditions.
          </p>
        </SectionReveal>

        {/* Timeline Itinerary Cards */}
        <div className="w-full max-w-3xl space-y-5">
          {itinerary.map((item, index) => (
            <SectionReveal key={index} delay={index * 0.15}>
              <div className="relative rounded-2xl bg-gradient-to-r from-[#FFFDF9] via-[#FAF6EE] to-[#F1E6D3] border border-gold/40 p-6 sm:p-8 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8">
                {/* Time Badge */}
                <div className="flex sm:flex-col items-center justify-center min-w-24 sm:min-w-28 py-2 px-4 rounded-xl bg-champagne/80 border border-gold/40 text-center">
                  <span className="text-xl sm:text-2xl mb-1">{item.icon}</span>
                  <span className="font-display text-lg sm:text-xl font-semibold text-brass">
                    {item.time}
                  </span>
                </div>

                {/* Event Info */}
                <div className="flex-1">
                  <h3 className="font-display text-2xl sm:text-3xl text-charcoal font-normal">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-taupe mt-1.5 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* Venue Highlight Summary Card */}
        <SectionReveal delay={0.4} className="w-full max-w-3xl mt-8">
          <div className="rounded-2xl bg-[#2B2118] text-[#FAF6EE] p-6 sm:p-8 border border-gold/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <span className="eyebrow !text-gold text-[10px] tracking-[0.25em] flex items-center justify-center sm:justify-start gap-1.5 mb-1">
                <MapPin className="w-3.5 h-3.5" />
                DESTINATION VENUE
              </span>
              <h4 className="font-display text-xl sm:text-2xl text-ivory">
                {location.venueName}
              </h4>
              <p className="font-sans text-xs text-ivory/70 mt-0.5">
                {location.address}
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs font-sans uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{event.day}th {event.month} {event.year} • 10:30 AM</span>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
};
