/**
 * preloader.js — boot sequence, then hand off to the hero intro.
 */

import gsap from 'gsap';
import { env } from './env.js';
import { data } from '../data.js';

export function initPreloader(onDone) {
  const pre = document.getElementById('preloader');
  if (!pre) {
    onDone?.();
    return;
  }

  // reduced motion / no-js-chaos mode: get out of the way instantly
  if (env.reduced) {
    pre.remove();
    onDone?.();
    return;
  }

  const count = document.getElementById('pre-count');
  const msg = document.getElementById('pre-msg');
  const fill = document.getElementById('pre-bar-fill');
  const state = { v: 0 };

  // cycle boot messages
  let mi = 0;
  const msgTimer = setInterval(() => {
    mi = (mi + 1) % data.preloaderMsgs.length;
    if (msg) msg.textContent = data.preloaderMsgs[mi];
  }, 420);

  gsap.to(state, {
    v: 100,
    duration: 1.7,
    ease: 'power2.inOut',
    onUpdate: () => {
      const v = Math.round(state.v);
      if (count) count.textContent = String(v).padStart(3, '0');
      if (fill) fill.style.width = `${v}%`;
    },
    onComplete: () => {
      clearInterval(msgTimer);
      if (msg) msg.textContent = 'LET’S GO ✓';

      const tl = gsap.timeline({
        onComplete: () => {
          pre.remove();
          onDone?.();
        },
      });
      tl.to('.pre-inner', { y: -46, opacity: 0, duration: 0.45, ease: 'power3.in' })
        .to(pre, { clipPath: 'inset(0 0 100% 0)', duration: 0.85, ease: 'power4.inOut' }, '-=0.1');
    },
  });
}
