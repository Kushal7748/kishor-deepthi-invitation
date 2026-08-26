import React, { useState } from 'react';
import { SectionReveal } from '../shared/SectionReveal';
import { GoldDivider } from '../shared/GoldDivider';
import { Send, CheckCircle2 } from 'lucide-react';

export const RsvpSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [attending, setAttending] = useState(true);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Direct WhatsApp share format
    const rsvpText = `*RSVP for Kishor & Deepthi's Ring Ceremony*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Contact:* ${encodeURIComponent(phone || 'N/A')}%0A*Attending:* ${attending ? 'Yes, Joyfully Attending! 🎉' : 'Regretfully Unable to Attend'}%0A*Wishes:* ${encodeURIComponent(message || 'Hearty Congratulations!')}`;
    
    setSubmitted(true);

    // Optional: Open WhatsApp if requested
    setTimeout(() => {
      window.open(`https://api.whatsapp.com/send?text=${rsvpText}`, '_blank');
    }, 1200);
  };

  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 bg-[#C8D3C3]/30 relative overflow-hidden select-none">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        {/* Family Greeting Header */}
        <SectionReveal className="text-center mb-10">
          <p className="eyebrow mb-1">WITH LOVE</p>
          <h2 className="font-display italic text-4xl sm:text-5xl text-[#2F4229] font-normal">
            The Families
          </h2>
          <GoldDivider variant="ornate" width="sm" className="my-5" />
          
          <div className="p-6 bg-[#FAF6EE]/80 rounded-2xl border border-gold/30 max-w-lg mx-auto shadow-xs">
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-taupe font-medium mb-1">
              Groom & Bride Families
            </p>
            <p className="font-display text-xl sm:text-2xl text-charcoal">
              Kishor V & Family • Deepthi V & Family
            </p>
          </div>
        </SectionReveal>

        {/* RSVP Card */}
        <SectionReveal delay={0.2} className="w-full max-w-xl">
          <div className="relative rounded-3xl bg-[#FAF6EE] p-8 sm:p-10 shadow-xl border-2 border-gold/30">
            {/* Header */}
            <div className="text-center mb-8">
              <h3 className="font-display italic text-3xl sm:text-4xl text-charcoal font-normal">
                Awaiting Your Noble Presence
              </h3>
              <p className="font-sans text-xs sm:text-sm text-taupe italic mt-2">
                Because celebrating together makes every moment twice as joyful!
              </p>
              <div className="eyebrow text-gold mt-4">KINDLY RESPOND — RSVP</div>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mb-3 animate-bounce" />
                <h4 className="font-display text-2xl text-charcoal">Thank You, {name}!</h4>
                <p className="font-sans text-xs text-taupe mt-1 max-w-xs">
                  Your RSVP response has been noted. We look forward to celebrating with you!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block font-sans text-xs uppercase tracking-wider text-taupe font-medium mb-1.5">
                    YOUR NAME <span className="text-gold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-xl bg-[#F4EDE0]/50 border border-gold/30 text-charcoal placeholder:text-taupe/50 text-sm focus:outline-none focus:border-gold transition-colors"
                  />
                </div>

                {/* Contact Number */}
                <div>
                  <label className="block font-sans text-xs uppercase tracking-wider text-taupe font-medium mb-1.5">
                    CONTACT NUMBER
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl bg-[#F4EDE0]/50 border border-gold/30 text-charcoal placeholder:text-taupe/50 text-sm focus:outline-none focus:border-gold transition-colors"
                  />
                </div>

                {/* Attendance Toggle */}
                <div
                  onClick={() => setAttending(!attending)}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-[#F4EDE0]/40 border border-gold/30 cursor-pointer select-none transition-colors hover:bg-[#F4EDE0]/70"
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                      attending
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-gold/60 bg-white'
                    }`}
                  >
                    {attending && <span className="text-xs font-bold">✓</span>}
                  </div>
                  <span className="font-sans text-xs sm:text-sm text-charcoal font-medium">
                    Yes, I will joyfully attend the celebration
                  </span>
                </div>

                {/* Message / Blessings */}
                <div>
                  <label className="block font-sans text-xs uppercase tracking-wider text-taupe font-medium mb-1.5">
                    WARM WISHES & BLESSINGS
                  </label>
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Leave a message for the couple..."
                    className="w-full px-4 py-3 rounded-xl bg-[#F4EDE0]/50 border border-gold/30 text-charcoal placeholder:text-taupe/50 text-sm focus:outline-none focus:border-gold transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#C4985D] via-[#A8793B] to-[#8C6A3F] text-ivory font-sans text-xs uppercase tracking-[0.25em] font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send RSVP</span>
                </button>
              </form>
            )}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
};
