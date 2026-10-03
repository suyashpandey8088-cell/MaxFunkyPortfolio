/**
 * cursor.js — custom cursor: instant dot + lerped trailing ring.
 * Desktop (fine pointer) only; disabled for touch + reduced motion.
 * Elements tagged [data-cursor] morph the ring into a label bubble.
 */

import { env } from './env.js';
import { lerp } from './utils.js';

export function initCursor() {
  if (!env.fine || env.reduced) return;

  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  const label = document.getElementById('cursor-label');
  if (!dot || !ring) return;

  document.documentElement.classList.add('has-cursor');

  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  let rx = mx;
  let ry = my;
  let visible = false;
  let rafId = null;

  const tick = () => {
    rx = lerp(rx, mx, 0.16);
    ry = lerp(ry, my, 0.16);
    dot.style.translate = `calc(${mx}px - 50%) calc(${my}px - 50%)`;
    ring.style.translate = `calc(${rx}px - 50%) calc(${ry}px - 50%)`;
    rafId = requestAnimationFrame(tick);
  };

  const start = () => {
    if (rafId === null) rafId = requestAnimationFrame(tick);
  };

  window.addEventListener(
    'pointermove',
    (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }
    },
    { passive: true }
  );

  document.addEventListener('mouseleave', () => {
    visible = false;
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });

  /* hover states via delegation */
  const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, [data-cursor]';

  document.addEventListener('mouseover', (e) => {
    const labelled = e.target.closest('[data-cursor]');
    if (labelled) {
      ring.classList.add('is-label');
      ring.classList.remove('is-hover');
      dot.classList.add('is-hidden');
      if (label) label.textContent = labelled.dataset.cursor || '→';
      return;
    }
    if (e.target.closest(INTERACTIVE)) {
      ring.classList.add('is-hover');
      ring.classList.remove('is-label');
      dot.classList.remove('is-hidden');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest('[data-cursor]')) {
      ring.classList.remove('is-label');
      dot.classList.remove('is-hidden');
    }
    if (e.target.closest(INTERACTIVE)) {
      ring.classList.remove('is-hover');
    }
  });

  window.addEventListener('pointerdown', () => ring.classList.add('is-hover'));
  window.addEventListener('pointerup', () => ring.classList.remove('is-hover'));

  start();
}
