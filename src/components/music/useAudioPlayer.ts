import { useState, useEffect, useRef, useCallback } from 'react';
import { invitationConfig } from '../../config/invitation';

export function useAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const synthIntervalRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const { music } = invitationConfig;

  // YouTube postMessage controller
  const sendYouTubeCommand = useCallback((command: 'playVideo' | 'pauseVideo') => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({
            event: 'command',
            func: command,
            args: [],
          }),
          '*'
        );
      } catch {
        // Cross-origin message safety
      }
    }
  }, []);

  // Gentle fallback synth audio if offline or restricted
  const playAmbientNotes = useCallback(() => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const scale = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25];
      let noteIndex = 0;

      const playChord = () => {
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        const freq = scale[noteIndex % scale.length];
        noteIndex = (noteIndex + 1 + Math.floor(Math.random() * 2)) % scale.length;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.07, now + 0.5);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 3.6);
      };

      playChord();
      synthIntervalRef.current = window.setInterval(playChord, 2200);
    } catch {
      // Audio context restricted
    }
  }, []);

  const stopAmbient = useCallback(() => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
  }, []);

  const playMusic = useCallback(() => {
    setIsPlaying(true);

    if (music.youtubeId) {
      sendYouTubeCommand('playVideo');
      return;
    }

    if (music.src && audioRef.current) {
      audioRef.current.play().catch(() => {});
      return;
    }

    playAmbientNotes();
  }, [music.src, music.youtubeId, playAmbientNotes, sendYouTubeCommand]);

  const pauseMusic = useCallback(() => {
    setIsPlaying(false);

    if (music.youtubeId) {
      sendYouTubeCommand('pauseVideo');
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    stopAmbient();
  }, [music.youtubeId, sendYouTubeCommand, stopAmbient]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  }, [isPlaying, pauseMusic, playMusic]);

  // Listen for global custom event to trigger audio when opening the envelope gate
  useEffect(() => {
    const handleTriggerAudio = () => {
      playMusic();
    };

    window.addEventListener('wedding:play-audio', handleTriggerAudio);
    return () => {
      window.removeEventListener('wedding:play-audio', handleTriggerAudio);
    };
  }, [playMusic]);

  useEffect(() => {
    return () => {
      stopAmbient();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [stopAmbient]);

  return {
    isPlaying,
    togglePlay,
    playMusic,
    pauseMusic,
    audioRef,
    iframeRef,
    trackTitle: music.title,
    trackArtist: music.artist,
    youtubeId: music.youtubeId,
  };
}
