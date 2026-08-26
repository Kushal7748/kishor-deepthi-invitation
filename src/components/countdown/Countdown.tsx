import React from 'react';
import { invitationConfig } from '../../config/invitation';
import { useCountdown } from './useCountdown';
import { ScratchCard } from './ScratchCard';
import { SectionReveal } from '../shared/SectionReveal';
import { GoldDivider } from '../shared/GoldDivider';

export const Countdown: React.FC = () => {
  const { event } = invitationConfig;
  const countdown = useCountdown();

  const formattedDateString = `${event.day}th ${event.month} ${event.year}`;

  return (
    <section className="py-16 sm:py-28 px-3 sm:px-6 bg-[#FAF6EE] relative overflow-hidden text-center select-none">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Section Heading */}
        <SectionReveal>
          <p className="eyebrow mb-1.5 text-gold text-[10px] sm:text-xs">The Auspicious Occasion</p>
          <h2 className="font-display italic text-3xl sm:text-4xl md:text-5xl text-charcoal font-normal">
            Save The Date
          </h2>
          <GoldDivider variant="ornate" width="sm" className="my-4 sm:my-5" />
        </SectionReveal>

        {/* Interactive Scratch-to-reveal Card */}
        <SectionReveal delay={0.15}>
          <ScratchCard dateText={formattedDateString} />
        </SectionReveal>

        {/* Live Ticking Countdown 4-Column Grid */}
        <SectionReveal delay={0.3} className="w-full mt-4 sm:mt-6 max-w-xs sm:max-w-md md:max-w-lg mx-auto">
          <div className="flex flex-col items-center">
            <span className="eyebrow text-taupe text-[9px] sm:text-[10px] tracking-[0.25em] uppercase mb-3 sm:mb-4">
              Time Remaining Until The Celebration
            </span>

            <div className="grid grid-cols-4 gap-2 sm:gap-4 w-full">
              <CountdownPill value={countdown.status === 'upcoming' ? countdown.days : 0} label="DAYS" />
              <CountdownPill value={countdown.status === 'upcoming' ? countdown.hours : 0} label="HOURS" />
              <CountdownPill value={countdown.status === 'upcoming' ? countdown.minutes : 0} label="MINUTES" />
              <CountdownPill value={countdown.status === 'upcoming' ? countdown.seconds : 0} label="SECONDS" />
            </div>

            <p className="font-sans text-[11px] sm:text-xs text-taupe/80 tracking-wider mt-4 sm:mt-5">
              Akshara Banquet & Lawns • Bengaluru
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
};

interface CountdownPillProps {
  value: number;
  label: string;
}

const CountdownPill: React.FC<CountdownPillProps> = ({ value, label }) => {
  const formattedNumber = String(value).padStart(2, '0');

  return (
    <div className="w-full py-3 sm:py-4 px-1 rounded-2xl bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-[#F1E6D3] border border-[#B8905A]/40 shadow-xs flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105">
      <span className="font-display text-xl sm:text-3xl font-bold text-[#8C6A3F] leading-none drop-shadow-2xs">
        {formattedNumber}
      </span>
      <span className="font-sans text-[8px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] font-semibold text-taupe uppercase mt-1 sm:mt-1.5">
        {label}
      </span>
    </div>
  );
};
