import { AnimatePresence, motion as Motion, useReducedMotion } from "framer-motion";

export default function PageTransition({ children, routeKey, className }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Motion.div
        key={routeKey}
        className={className}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </Motion.div>
    </AnimatePresence>
  );
}
