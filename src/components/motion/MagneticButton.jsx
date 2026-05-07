/**
 * MagneticButton — premium magnetic hover interaction component.
 *
 * Wraps any button/anchor-style element with a subtle magnetic effect that
 * translates the element toward the cursor using GPU-accelerated CSS custom
 * properties (transform only — no layout reflow).
 *
 * Usage:
 *   <MagneticButton onClick={…} className="btn-primary">
 *     Get started
 *   </MagneticButton>
 *
 * The magnetic effect respects prefers-reduced-motion.
 */
import { useRef, useCallback } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * @param {React.ReactNode}   children
 * @param {string}            [className]
 * @param {React.CSSProperties} [style]
 * @param {Function}          [onClick]
 * @param {string}            [as="button"]   — rendered element tag
 * @param {string}            [href]          — for anchor elements
 * @param {number}            [xFactor=0.35]  — horizontal strength (0–1)
 * @param {number}            [yFactor=0.45]  — vertical strength (0–1)
 * @param {string}            [type]          — button type attribute
 * @param {boolean}           [disabled]
 * @param {Object}            [rest]          — other props passed to element
 */
export default function MagneticButton({
  children,
  className = "btn-primary",
  style,
  onClick,
  as: Tag = "button",
  href,
  xFactor = 0.35,
  yFactor = 0.45,
  type,
  disabled,
  ...rest
}) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();

  const onMouseMove = useCallback(
    (e) => {
      if (reduceMotion || !ref.current) return;
      const bounds = ref.current.getBoundingClientRect();
      const x = e.clientX - bounds.left - bounds.width / 2;
      const y = e.clientY - bounds.top - bounds.height / 2;
      ref.current.style.transform = `translate3d(${x * xFactor}px, ${y * yFactor}px, 0)`;
    },
    [reduceMotion, xFactor, yFactor]
  );

  const onMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = "translate3d(0,0,0)";
    ref.current.style.transition = "transform 0.38s cubic-bezier(0.22,1,0.36,1)";
    const el = ref.current;
    const cleanup = () => {
      if (el) el.style.transition = "";
    };
    const id = window.setTimeout(cleanup, 380);
    return () => window.clearTimeout(id);
  }, []);

  const onMouseEnter = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transition = "transform 0.15s cubic-bezier(0.22,1,0.36,1)";
  }, []);

  const props = {
    ref,
    className,
    style: { willChange: "transform", ...style },
    onClick,
    onMouseMove,
    onMouseLeave,
    onMouseEnter,
    disabled,
    ...rest,
  };

  if (Tag === "a") {
    props.href = href;
  } else if (Tag === "button") {
    props.type = type || "button";
  }

  return <Tag {...props}>{children}</Tag>;
}
