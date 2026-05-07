import { motion as Motion, useReducedMotion } from "framer-motion";

const INITIAL_REVEAL_SCALE = 0.992;

export default function MotionReveal({
  children,
  className,
  delay = 0,
  distance = 18,
  duration = 0.55,
  amount = 0.28,
  once = true,
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Motion.div
      className={className}
      initial={{ opacity: 0, y: distance, scale: INITIAL_REVEAL_SCALE }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Motion.div>
  );
}
