import { useState } from 'react';
import { InvitationGate } from './components/gate/InvitationGate';
import { Hero } from './components/hero/Hero';
import { Countdown } from './components/countdown/Countdown';
import { EventDetails } from './components/details/EventDetails';
import { CoupleIntro } from './components/intro/CoupleIntro';
import { RsvpSection } from './components/rsvp/RsvpSection';
import { LocationSection } from './components/location/LocationSection';
import { FinalInvitation } from './components/final/FinalInvitation';
import { Footer } from './components/layout/Footer';
import { ScrollProgress } from './components/shared/ScrollProgress';
import { FloatingPetals } from './components/shared/FloatingPetals';
import { MusicPlayer } from './components/music/MusicPlayer';

export function App() {
  const [gateOpen, setGateOpen] = useState(true);

  return (
    <div className="relative min-h-screen bg-[#FAF6EE] text-charcoal selection:bg-gold/20 selection:text-charcoal overflow-x-hidden font-body antialiased">
      {/* Scroll Progress Bar at the Top */}
      <ScrollProgress />

      {/* Ambient Floating Flower Petals & Stardust */}
      <FloatingPetals />

      {/* Opening 3D Interactive Royal Gate */}
      <InvitationGate isOpen={gateOpen} onOpen={() => setGateOpen(false)} />

      {/* Main Wedding Invitation Flow */}
      <main className="w-full">
        {/* 1. Auspicious Blessing & Grand Couple Hero */}
        <Hero />

        {/* 2. Interactive Scratch-to-Reveal Save-the-Date & Live Countdown */}
        <Countdown />

        {/* 3. Ring Ceremony Itinerary & Luxury Schedule Card */}
        <EventDetails />

        {/* 4. Couple Narrative & Framed Photo Story */}
        <CoupleIntro />

        {/* 5. Families & Interactive RSVP with WhatsApp Integration */}
        <RsvpSection />

        {/* 6. Destination Venue & Google Maps Deep-Link */}
        <LocationSection />

        {/* 7. Warm Final Invitation */}
        <FinalInvitation />

        {/* 8. Luxury Deep Bronze Footer */}
        <Footer />
      </main>

      {/* Persistent Floating Music Player with Auto-Scroll Control */}
      <MusicPlayer />
    </div>
  );
}

export default App;
