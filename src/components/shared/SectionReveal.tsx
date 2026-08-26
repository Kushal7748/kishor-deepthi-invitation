import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds, for staggering multiple reveals in the same view */
  delay?: number;
  /** How far to travel on reveal, in px. Kept small — this is restraint, not a bounce. */
  distance?: number;
  as?: "div" | "section";
}

/**
 * Scroll-triggered fade-up reveal used throughout the site.
 * Collapses to a plain opacity fade when the user prefers reduced motion.
 */
export function SectionReveal({
  children,
  className,
  delay = 0,
  distance = 24,
  as = "div",
}: SectionRevealProps) {
  const reducedMotion = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: reducedMotion ? 0 : distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{
        duration: reducedMotion ? 0.3 : 0.8,
        delay: reducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </Component>
  );
}
