import { motion, useScroll, useSpring } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export function ScrollProgress() {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (reducedMotion) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold/40 via-gold to-brass origin-left z-40 pointer-events-none"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
