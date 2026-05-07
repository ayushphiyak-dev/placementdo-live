import { motion, useReducedMotion } from "framer-motion";

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
  const MotionDiv = motion.div;

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <MotionDiv
      className={className}
      initial={{ opacity: 0, y: distance, scale: 0.992 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionDiv>
  );
}
