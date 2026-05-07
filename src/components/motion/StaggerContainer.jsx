/**
 * StaggerContainer — Framer Motion stagger wrapper.
 *
 * Wraps children in a motion container that staggers each direct child's
 * fade-up reveal, powered by Framer Motion's variants system for GPU-
 * accelerated transform + opacity animations only.
 *
 * Usage:
 *   <StaggerContainer>
 *     <div>Item 1</div>
 *     <div>Item 2</div>
 *   </StaggerContainer>
 */
import { motion, useReducedMotion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.994 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const reducedItemVariants = {
  hidden: {},
  visible: {},
};

/**
 * StaggerContainer — wraps children in a stagger reveal container.
 * @param {React.ReactNode} children
 * @param {string}  [className]
 * @param {number}  [staggerDelay=0.08]  — seconds between each child reveal
 * @param {number}  [delayChildren=0.05] — initial delay before first child
 * @param {number}  [amount=0.2]         — viewport intersection threshold
 * @param {boolean} [once=true]          — only animate once
 */
export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.08,
  delayChildren = 0.05,
  amount = 0.2,
  once = true,
}) {
  const reduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : staggerDelay,
        delayChildren: reduceMotion ? 0 : delayChildren,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerItem — direct child of StaggerContainer.
 * Animates with a fade-up reveal triggered by the parent's stagger.
 */
export function StaggerItem({ children, className }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={reduceMotion ? reducedItemVariants : itemVariants}
    >
      {children}
    </motion.div>
  );
}

export default StaggerContainer;
