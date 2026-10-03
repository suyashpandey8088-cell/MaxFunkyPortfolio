/**
 * hero.js — intro cascade + scroll-out choreography + ticker strip.
 */

import gsap from 'gsap';
import { env } from './env.js';
import { splitText, buildMarquee } from './utils.js';

export function initHero() {
  const line1 = document.querySelector('.hero-line-1');
  const line2 = document.querySelector('.hero-line-2');
  const chars1 = line1 ? splitText(line1, 'chars').chars : [];
  const chars2 = line2 ? splitText(line2, 'chars').chars : [];
  const floaties = Array.from(document.querySelectorAll('.floaty'));

  buildMarquee(document.getElementById('ticker-1'));
  buildMarquee(document.getElementById('ticker-2'));

  if (env.reduced) return { intro: () => {} };

  /* ── intro (fired after preloader) ─────────────────────────── */

  const intro = () => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.from(chars1, { yPercent: 130, rotate: 7, duration: 1.05, stagger: 0.045 })
      .from(chars2, { yPercent: 130, rotate: -7, duration: 1.05, stagger: 0.04 }, '-=0.9')
      .from('.hero-eyebrow', { y: 26, opacity: 0, duration: 0.7 }, '-=0.75')
      .from('.hero-meta', { y: 34, opacity: 0, duration: 0.8 }, '-=0.55')
      .from(
        floaties,
        { scale: 0, opacity: 0, duration: 0.8, stagger: 0.05, ease: 'back.out(2.2)' },
        '-=0.8'
      )
      .from('.scroll-hint', { opacity: 0, y: -12, duration: 0.6 }, '-=0.4');
    return tl;
  };

  /* ── scroll-out: hero dissolves as the journey begins ─────── */

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 0.6,
    },
  });

  tl.to('.hero-inner', { yPercent: -16, scale: 0.92, ease: 'none' }, 0)
    .to(line1, { xPercent: -7, ease: 'none' }, 0)
    .to(line2, { xPercent: 7, ease: 'none' }, 0)
    .to('.hero-eyebrow, .hero-meta', { opacity: 0, yPercent: -40, ease: 'none' }, 0)
    .to('.scroll-hint', { opacity: 0, ease: 'none', duration: 0.3 }, 0)
    .to(
      floaties,
      {
        y: (i, el) => -parseFloat(el.dataset.speed || 10) * 3.4,
        x: (i, el) => (i % 2 ? 1 : -1) * Math.abs(parseFloat(el.dataset.speed || 10)) * 1.2,
        rotate: (i) => (i % 2 ? 90 : -120),
        ease: 'none',
      },
      0
    );

  return { intro };
}
