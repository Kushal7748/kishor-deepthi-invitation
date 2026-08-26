import { useState, useEffect, useRef, useCallback } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface UseAutoScrollOptions {
  isPlaying: boolean;
  durationSeconds?: number; // Total target duration for full page scroll in seconds
}

export function useAutoScroll({ isPlaying, durationSeconds = 240 }: UseAutoScrollOptions) {
  const reducedMotion = useReducedMotion();
  const [userDisabled, setUserDisabled] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const userInteractionTimeoutRef = useRef<number | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  const isAutoScrolling = isPlaying && !userDisabled && !reducedMotion;

  // Toggle autoscroll manually
  const toggleAutoScroll = useCallback(() => {
    setUserDisabled((prev) => !prev);
  }, []);

  // Detect user touch / wheel to temporarily pause autoscroll
  useEffect(() => {
    const handleUserInteraction = () => {
      setIsUserInteracting(true);
      if (userInteractionTimeoutRef.current) {
        clearTimeout(userInteractionTimeoutRef.current);
      }
      userInteractionTimeoutRef.current = window.setTimeout(() => {
        setIsUserInteracting(false);
      }, 3500); // Resume 3.5s after user stops manual scrolling
    };

    window.addEventListener('wheel', handleUserInteraction, { passive: true });
    window.addEventListener('touchstart', handleUserInteraction, { passive: true });
    window.addEventListener('keydown', handleUserInteraction, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
      if (userInteractionTimeoutRef.current) {
        clearTimeout(userInteractionTimeoutRef.current);
      }
    };
  }, []);

  // Smooth cinematic gliding scroll loop
  useEffect(() => {
    if (!isAutoScrolling || isUserInteracting || reducedMotion) {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      lastTimeRef.current = null;
      return;
    }

    const scrollStep = (timestamp: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }
      const delta = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      if (currentScroll < maxScroll - 5) {
        // Calculate smooth speed (pixels per second) based on remaining height and song length
        const scrollSpeed = Math.max(18, maxScroll / durationSeconds);
        window.scrollBy({
          top: scrollSpeed * delta,
          left: 0,
          behavior: 'instant' as ScrollBehavior,
        });

        animFrameRef.current = requestAnimationFrame(scrollStep);
      } else {
        // Reached the bottom
        if (animFrameRef.current) {
          cancelAnimationFrame(animFrameRef.current);
          animFrameRef.current = null;
        }
      }
    };

    animFrameRef.current = requestAnimationFrame(scrollStep);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      lastTimeRef.current = null;
    };
  }, [isAutoScrolling, isUserInteracting, durationSeconds, reducedMotion]);

  return {
    isAutoScrolling,
    toggleAutoScroll,
    isUserInteracting,
  };
}
