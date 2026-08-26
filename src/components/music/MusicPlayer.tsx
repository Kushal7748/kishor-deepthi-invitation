import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useAudioPlayer } from './useAudioPlayer';
import { useAutoScroll } from '../../hooks/useAutoScroll';
import { invitationConfig } from '../../config/invitation';

export const MusicPlayer: React.FC = () => {
  const { isPlaying, togglePlay, audioRef, iframeRef, youtubeId } = useAudioPlayer();

  // Automatic cinematic scroll runs silently in background when music is playing
  useAutoScroll({
    isPlaying,
    durationSeconds: 240, // 4-minute full song glide
  });

  const { music } = invitationConfig;

  return (
    <>
      {/* Hidden YouTube IFrame Player */}
      {youtubeId && (
        <div className="fixed -top-[9999px] -left-[9999px] w-1 h-1 opacity-0 pointer-events-none" aria-hidden="true">
          <iframe
            ref={iframeRef}
            id="youtube-audio-player"
            title="Wedding Celebration Music"
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?enablejsapi=1&autoplay=0&loop=1&playlist=${youtubeId}&controls=0&disablekb=1&fs=0&modestbranding=1&playsinline=1`}
            allow="autoplay; encrypted-media"
            className="w-1 h-1"
          />
        </div>
      )}

      {/* Hidden Native Audio Element (if local src is provided) */}
      {music.src && <audio ref={audioRef} src={music.src} loop preload="auto" />}

      {/* Minimalist Floating Audio Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 select-none pointer-events-auto pb-[env(safe-area-inset-bottom)] pr-[env(safe-area-inset-right)]">
        <motion.button
          type="button"
          onClick={togglePlay}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className={`relative w-11 h-11 sm:w-14 sm:h-14 rounded-full border-2 border-gold/50 shadow-xl flex items-center justify-center cursor-pointer transition-all duration-300 ${
            isPlaying
              ? 'bg-gradient-to-br from-[#B8905A] to-[#8C6A3F] text-ivory ring-4 ring-gold/20'
              : 'bg-[#FAF6EE]/90 backdrop-blur-md text-gold hover:bg-gold/10'
          }`}
          aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
        >
          {/* Sound waves pulsing ring when active */}
          {isPlaying && (
            <span className="absolute -inset-1 rounded-full border border-gold/60 animate-ping opacity-30 pointer-events-none" />
          )}

          {isPlaying ? (
            <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 drop-shadow-xs" />
          ) : (
            <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-taupe/80" />
          )}
        </motion.button>
      </div>
    </>
  );
};
