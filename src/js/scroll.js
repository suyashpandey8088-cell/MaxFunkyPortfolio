/**
 * scroll.js — the single source of scroll truth.
 *
 * Lenis handles smooth wheel/trackpad interpolation; GSAP's ticker drives
 * Lenis' rAF and Lenis' scroll event drives ScrollTrigger.update — one loop,
 * no fighting libraries. Native scrolling stays intact (accessibility,
 * touch, keyboard). With prefers-reduced-motion we drop Lenis entirely and
 * let ScrollTrigger read native scroll.
 */

import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { env } from './env.js';
import { pad } from './utils.js';

gsap.registerPlugin(ScrollTrigger);
env.gsap = gsap;
env.st = ScrollTrigger;

/** section id → backdrop theme */
const BACKDROPS = {
  home: 'hero',
  statements: 'hero',
  about: 'ink',
  experience: 'ink',
  projects: 'deep',
  skills: 'deep',
  more: 'ink',
  contact: 'contact',
};

export function initScroll() {
  if (!env.reduced) {
    const lenis = new Lenis({
      lerp: 0.095,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      // syncTouch stays false → native, responsive touch scrolling
    });
    env.lenis = lenis;
    document.documentElement.classList.add('lenis-active');

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  } else {
    document.documentElement.classList.add('no-pin');
  }

  initProgress();
  initBackdropSwitching();
  initAnchors();

  // keep measurements honest once fonts/layout settle
  window.addEventListener('load', () => ScrollTrigger.refresh());
  if (document.fonts?.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
}

/* ── scroll progress: glowing dot + 001—100 counter ─────────── */

function initProgress() {
  const dot = document.getElementById('progress-dot');
  const num = document.getElementById('progress-num');
  const track = dot?.parentElement;
  if (!dot || !num || !track) return;

  let raf = false;
  const update = () => {
    raf = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? clamp01(window.scrollY / max) : 0;
    dot.style.translate = `-50% ${p * (track.clientHeight - 8)}px`;
    num.textContent = pad(Math.round(p * 99) + 1, 3);
  };

  if (env.lenis) {
    env.lenis.on('scroll', () => {
      if (!raf) {
        raf = true;
        requestAnimationFrame(update);
      }
    });
  }
  window.addEventListener('scroll', () => {
    if (!raf) {
      raf = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });
  update();
}

const clamp01 = (v) => Math.min(1, Math.max(0, v));

/* ── cinematic backdrop colour switching between sections ───── */

function initBackdropSwitching() {
  const layer = document.querySelector('.bd-base');
  if (!layer) return;
  Object.keys(BACKDROPS).forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    ScrollTrigger.create({
      trigger: el,
      start: 'top 55%',
      end: 'bottom 55%',
      onToggle: (self) => {
        if (self.isActive) layer.dataset.bd = BACKDROPS[id];
      },
    });
  });
}

/* ── anchor navigation ──────────────────────────────────────── */

export function scrollToTarget(target) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;
  if (env.lenis) {
    env.lenis.scrollTo(el, { duration: 1.5, easing: (t) => 1 - Math.pow(1 - t, 4) });
  } else {
    el.scrollIntoView({ behavior: env.reduced ? 'auto' : 'smooth' });
  }
}

function initAnchors() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-scroll]');
    if (!link) return;
    const hash = link.getAttribute('href');
    if (!hash || !hash.startsWith('#')) return;
    e.preventDefault();
    scrollToTarget(hash);
    window.dispatchEvent(new CustomEvent('menu:close'));
  });
}
