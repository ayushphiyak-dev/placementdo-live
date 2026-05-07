/**
 * Motion component barrel export.
 *
 * All premium animation primitives are exported from this single entry
 * point so that pages only need one import path.
 *
 * Usage:
 *   import { FadeUpReveal, StaggerContainer, StaggerItem, MagneticButton } from "@/components/motion";
 */

export { default as FadeUpReveal } from "./FadeUpReveal.jsx";
export { StaggerContainer, StaggerItem } from "./StaggerContainer.jsx";
export { default as MagneticButton } from "./MagneticButton.jsx";
// Re-export the underlying hook for components that need raw magnetic control
export { default as useMagneticEffect } from "../SEO/shared/useMagneticEffect.js";
