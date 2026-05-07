import { useCallback } from "react";
import { useReducedMotion } from "framer-motion";

export default function useMagneticEffect({ xFactor = 0.06, yFactor = 0.08 } = {}) {
  const reduceMotion = useReducedMotion();

  const onMouseMove = useCallback((event) => {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left - bounds.width / 2;
    const y = event.clientY - bounds.top - bounds.height / 2;
    event.currentTarget.style.setProperty("--mx", `${x * xFactor}px`);
    event.currentTarget.style.setProperty("--my", `${y * yFactor}px`);
  }, [reduceMotion, xFactor, yFactor]);

  const onMouseLeave = useCallback((event) => {
    event.currentTarget.style.setProperty("--mx", "0px");
    event.currentTarget.style.setProperty("--my", "0px");
  }, []);

  return { onMouseMove, onMouseLeave };
}
