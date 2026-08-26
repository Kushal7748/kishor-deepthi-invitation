import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music, Sparkles, Pause, Play } from 'lucide-react';
import { useAudioPlayer } from './useAudioPlayer';
import { useAutoScroll } from '../../hooks/useAutoScroll';
import { invitationConfig } from '../../config/invitation';

export const MusicPlayer: React.FC = () => {
  const { isPlaying, togglePlay, audioRef, iframeRef, trackTitle, trackArtist, youtubeId } =
    useAudioPlayer();
  const { isAutoScrolling, toggleAutoScroll, isUserInteracting } = useAutoScroll({
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

      {/* Floating Audio & Auto-Scroll Controller */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2 select-none pointer-events-auto max-w-[85vw] pb-[env(safe-area-inset-bottom)] pr-[env(safe-area-inset-right)]">
        {/* Active Track Banner & Auto-Scroll Badge */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              className="flex flex-col items-end gap-1.5"
            >
              {/* Song Title Pill */}
              <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#FAF6EE]/95 backdrop-blur-md border border-gold/40 shadow-lg text-charcoal max-w-full">
                <Music className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold animate-bounce shrink-0" />
                <span className="font-sans text-[10px] sm:text-[11px] font-medium tracking-wide truncate">
                  {trackTitle} <span className="text-taupe font-normal">• {trackArtist}</span>
                </span>
              </div>

              {/* Auto-Scroll Controller Pill */}
              <button
                type="button"
                onClick={toggleAutoScroll}
                className={`flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-sans font-medium tracking-wider uppercase backdrop-blur-md border transition-all duration-300 shadow-sm cursor-pointer ${
                  isAutoScrolling && !isUserInteracting
                    ? 'bg-gold/20 text-brass border-gold/50 hover:bg-gold/30'
                    : 'bg-[#FAF6EE]/90 text-taupe border-gold/30 hover:bg-gold/10'
                }`}
                title="Click to toggle automatic cinematic story scroll"
              >
                <Sparkles className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${isAutoScrolling && !isUserInteracting ? 'text-gold animate-spin' : 'text-taupe'}`} style={{ animationDuration: '4s' }} />
                <span>
                  {isUserInteracting
                    ? 'Scroll Paused'
                    : isAutoScrolling
                    ? 'Auto-Scroll ON'
                    : 'Auto-Scroll OFF'}
                </span>
                {isAutoScrolling && !isUserInteracting ? (
                  <Pause className="w-2.5 h-2.5 ml-0.5 text-brass" />
                ) : (
                  <Play className="w-2.5 h-2.5 ml-0.5 text-taupe" />
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Master Sound Button */}
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
