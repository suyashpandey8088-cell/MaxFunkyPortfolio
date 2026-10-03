/**
 * env.js — shared environment state
 */

export const env = {
  /** user prefers reduced motion */
  reduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  /** precise pointer available (mouse / trackpad) */
  fine: window.matchMedia('(pointer: fine)').matches,
  /** lenis instance once initialised */
  lenis: null,
  /** gsap instance once initialised */
  gsap: null,
  /** ScrollTrigger once initialised */
  st: null,
};

export const isDesktop = () => window.matchMedia('(min-width: 721px)').matches;
