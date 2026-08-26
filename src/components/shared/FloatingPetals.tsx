import React from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface Particle {
  id: number;
  left: number; // percentage
  size: number; // px
  duration: number; // seconds
  delay: number; // seconds
  type: 'gold-dust' | 'blossom' | 'starlight' | 'petal';
  rotate: number;
}

const PARTICLES: Particle[] = Array.from({ length: 24 }, (_, i) => {
  const types: Particle['type'][] = ['gold-dust', 'blossom', 'starlight', 'petal', 'gold-dust', 'petal'];
  const pseudoSeed = (i * 37 + 19) % 100;
  return {
    id: i,
    left: 2 + ((pseudoSeed * 9.5) % 95),
    size: 10 + ((i * 5) % 10),
    duration: 14 + ((i * 4) % 12),
    delay: (i * 1.2) % 8,
    type: types[i % types.length],
    rotate: (i * 43) % 360,
  };
});

export const FloatingPetals: React.FC = () => {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-30" aria-hidden="true">
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="absolute will-change-transform select-none"
          style={{
            left: `${p.left}%`,
            top: '-30px',
            fontSize: `${p.size}px`,
            animation: `royalDrift ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
            transform: `rotate(${p.rotate}deg)`,
          }}
        >
          {p.type === 'gold-dust' && (
            <span className="inline-block w-2 h-2 rounded-full bg-gold/70 shadow-[0_0_8px_rgba(212,175,55,0.8)] animate-pulse" />
          )}
          {p.type === 'starlight' && (
            <span className="inline-block text-gold/80 drop-shadow-[0_0_6px_rgba(212,175,55,0.6)] text-xs">
              ✦
            </span>
          )}
          {p.type === 'blossom' && (
            <span className="inline-block opacity-75 drop-shadow-xs">🌸</span>
          )}
          {p.type === 'petal' && (
            <span className="inline-block opacity-70 drop-shadow-xs">✨</span>
          )}
        </div>
      ))}
      <style>{`
        @keyframes royalDrift {
          0% {
            transform: translateY(-20px) translateX(0) rotate(0deg);
            opacity: 0;
          }
          15% {
            opacity: 0.85;
          }
          50% {
            transform: translateY(50vh) translateX(20px) rotate(180deg);
            opacity: 0.9;
          }
          85% {
            opacity: 0.85;
          }
          100% {
            transform: translateY(105vh) translateX(-15px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
