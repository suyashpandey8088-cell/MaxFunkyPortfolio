/**
 * main.js — MAXFUNKY portfolio bootstrap.
 *
 * Everything hangs off ONE scroll state: Lenis feeds GSAP's ticker,
 * GSAP's ticker feeds Lenis, ScrollTrigger reads both. No competing
 * scroll libraries, no scroll hijacking, native scroll always intact.
 */

import './styles/main.css';
import { env } from './js/env.js';
import { initScroll } from './js/scroll.js';
import { initPreloader } from './js/preloader.js';
import { initNav } from './js/nav.js';
import { initCursor } from './js/cursor.js';
import { initHero } from './js/hero.js';
import { initSections } from './js/sections.js';
import { initProjects } from './js/projects.js';
import { initFunky } from './js/funky.js';
import { data } from './data.js';

/* ── wire editable contact data into the DOM ────────────────── */

function applyContactData() {
  const email = document.getElementById('contact-email');
  if (email) email.href = `mailto:${data.contact.email}`;

  document.querySelectorAll('[data-contact]').forEach((el) => {
    const url = data.contact[el.dataset.contact];
    if (url) el.href = url;
  });
}

/* ── hackathon card: fake 48h countdown ─────────────────────── */

function initHackCountdown() {
  const el = document.getElementById('hack-count');
  if (!el) return;
  let remaining = (47 * 60 + 59) * 60 + 58; // 47:59:58
  let timer = null;

  const render = () => {
    const h = Math.floor(remaining / 3600);
    const m = Math.floor((remaining % 3600) / 60);
    const s = remaining % 60;
    el.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    if (remaining <= 0) remaining = 48 * 60 * 60;
    remaining--;
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && timer === null) {
          render();
          timer = setInterval(render, 1000);
        } else if (!e.isIntersecting && timer !== null) {
          clearInterval(timer);
          timer = null;
        }
      });
    },
    { threshold: 0.2 }
  );
  io.observe(el);
}

/* ── boot ────────────────────────────────────────────────────── */

initScroll(); // lenis + gsap + progress + backdrop + anchors
applyContactData();
initNav();
initCursor();
const hero = initHero();
initSections();
initProjects();
initFunky();
initHackCountdown();

initPreloader(() => {
  // preloader is gone → run the hero intro, then re-measure triggers
  hero.intro?.();
  requestAnimationFrame(() => env.st?.refresh());
});
