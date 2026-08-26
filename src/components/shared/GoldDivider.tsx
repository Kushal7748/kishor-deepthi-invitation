import React from 'react';
import { cn } from '../../lib/cn';

interface GoldDividerProps {
  className?: string;
  variant?: 'subtle' | 'ornate' | 'simple';
  width?: 'sm' | 'md' | 'lg' | 'full';
}

export const GoldDivider: React.FC<GoldDividerProps> = ({
  className,
  variant = 'ornate',
  width = 'md',
}) => {
  const widthClasses = {
    sm: 'max-w-28',
    md: 'max-w-48',
    lg: 'max-w-72',
    full: 'max-w-full',
  };

  return (
    <div
      className={cn('flex items-center justify-center gap-3 mx-auto my-4 w-full', widthClasses[width], className)}
      aria-hidden="true"
    >
      <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold/40 to-gold/70" />
      {variant === 'ornate' && (
        <div className="flex items-center gap-1.5 text-gold/80">
          <span className="w-1 h-1 rounded-full bg-gold/50" />
          <span className="w-1.5 h-1.5 rotate-45 border border-gold/70 bg-ivory" />
          <span className="w-1 h-1 rounded-full bg-gold/50" />
        </div>
      )}
      {variant === 'simple' && (
        <span className="w-1.5 h-1.5 rounded-full bg-gold/60" />
      )}
      {variant === 'subtle' && (
        <span className="w-1 h-1 rounded-full bg-gold/40" />
      )}
      <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gold/40 to-gold/70" />
    </div>
  );
};
