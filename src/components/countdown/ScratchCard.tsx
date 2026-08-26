import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Hand } from 'lucide-react';

interface ScratchCardProps {
  dateText: string;
  subText?: string;
  onRevealed?: () => void;
}

const CONFETTI_PARTICLES = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  left: `${(i * 17) % 100}%`,
  top: `${10 + ((i * 23) % 80)}%`,
  bg: ['#D4AF37', '#E6C975', '#EFDCD3', '#8C6A3F', '#F1E6D3', '#E91E63'][i % 6],
  rotate: `${(i * 41) % 360}deg`,
  duration: `${1 + ((i * 7) % 20) / 10}s`,
}));

export const ScratchCard: React.FC<ScratchCardProps> = ({
  dateText,
  subText = 'SAVE THE DATE',
  onRevealed,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);

  const triggerConfetti = useCallback(() => {
    setConfettiActive(true);
    setTimeout(() => setConfettiActive(false), 3500);
  }, []);

  const handleComplete = useCallback(() => {
    if (isRevealed) return;
    setIsRevealed(true);
    triggerConfetti();
    if (onRevealed) onRevealed();
  }, [isRevealed, onRevealed, triggerConfetti]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    // Gilded metallic gold foil gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#D4AF37');
    gradient.addColorStop(0.25, '#F5E298');
    gradient.addColorStop(0.5, '#B8905A');
    gradient.addColorStop(0.75, '#E2C26E');
    gradient.addColorStop(1, '#8C6A3F');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Subtle diamond luxury pattern on foil
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    for (let i = 0; i < width; i += 18) {
      for (let j = 0; j < height; j += 18) {
        ctx.beginPath();
        ctx.arc(i + 9, j + 9, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Centered foil prompt text
    ctx.font = 'bold 12px "Jost", sans-serif';
    ctx.fillStyle = '#2B2622';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.letterSpacing = '3px';
    ctx.fillText('✦ SCRATCH TO UNVEIL THE DATE ✦', width / 2, height / 2);
  }, [isRevealed]);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2, false);
    ctx.fill();

    // Check percentage scratched
    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imgData.data;
      let transparentCount = 0;
      const totalPixels = pixels.length / 4;

      for (let i = 3; i < pixels.length; i += 16) {
        if (pixels[i] === 0) {
          transparentCount += 4;
        }
      }

      const percent = (transparentCount / totalPixels) * 100;
      if (percent > 30) {
        handleComplete();
      }
    } catch {
      // Fallback
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsScratching(true);
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isScratching) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => setIsScratching(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      setIsScratching(true);
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isScratching || e.touches.length === 0) return;
    scratch(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleTouchEnd = () => setIsScratching(false);

  return (
    <div className="relative flex flex-col items-center justify-center my-6">
      {/* Confetti Celebration Burst */}
      {confettiActive && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
          {CONFETTI_PARTICLES.map((p) => (
            <span
              key={p.id}
              className="absolute inline-block w-2.5 h-3 rounded-xs animate-ping"
              style={{
                left: p.left,
                top: p.top,
                backgroundColor: p.bg,
                transform: `rotate(${p.rotate})`,
                animationDuration: p.duration,
              }}
            />
          ))}
        </div>
      )}

      {/* Main Scratch Box Container */}
      <div
        ref={containerRef}
        className="relative w-[320px] sm:w-[390px] h-[120px] sm:h-[135px] rounded-3xl bg-gradient-to-br from-[#FFFDF9] via-[#FAF6EE] to-[#F1E6D3] border-2 border-gold/50 shadow-xl flex flex-col items-center justify-center p-5 text-center select-none overflow-hidden group"
      >
        {/* Hidden Date Revealed Below */}
        <div className="flex flex-col items-center justify-center">
          <span className="eyebrow text-[11px] sm:text-xs text-brass tracking-[0.25em] mb-1">
            {subText}
          </span>
          <h3 className="font-display italic text-2xl sm:text-3xl font-semibold text-charcoal tracking-wide flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gold fill-gold/30" />
            {dateText}
            <Sparkles className="w-4 h-4 text-gold fill-gold/30" />
          </h3>
          <span className="text-[11px] font-sans text-taupe tracking-wider mt-1 uppercase font-medium">
            Sunday • 7:00 PM Onwards
          </span>
        </div>

        {/* Scratch Canvas Foil */}
        <AnimatePresence>
          {!isRevealed && (
            <motion.div
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-20 cursor-grab active:cursor-grabbing touch-none"
            >
              <canvas
                ref={canvasRef}
                className="w-full h-full rounded-3xl block"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onClick={handleComplete}
              />
              {/* Hand Hint Icon */}
              <div className="absolute top-2 right-3 pointer-events-none text-charcoal/80 animate-bounce">
                <Hand className="w-4 h-4 drop-shadow-xs rotate-12" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Helper Prompt */}
      {!isRevealed && (
        <p className="font-sans text-xs text-taupe/80 mt-2.5 tracking-wider font-light flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
          Tap or scratch with finger/mouse to unveil date
        </p>
      )}
    </div>
  );
};
