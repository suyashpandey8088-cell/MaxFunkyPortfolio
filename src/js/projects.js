/**
 * projects.js — kinetic title, asymmetric card reveals, cursor tilt,
 * and a shared-element style modal that expands from the clicked card.
 */

import gsap from 'gsap';
import { env } from './env.js';
import { data } from '../data.js';

export function initProjects() {
  const grid = document.querySelector('.project-grid');
  if (!grid) return;
  const cards = Array.from(grid.querySelectorAll('.pcard'));

  initKineticTitle();
  initCardReveals(cards);

  if (env.fine && !env.reduced) {
    cards.forEach((card) => initTilt(card));
  }

  initModal(cards);
}

/* ── kinetic section title: words drift in from the sides ───── */

function initKineticTitle() {
  if (env.reduced) return;
  const words = gsap.utils.toArray('.pt-word');
  if (!words.length) return;

  gsap.from(words, {
    x: (i) => (i % 2 ? 240 : -240),
    rotate: (i) => (i % 2 ? 5 : -5),
    opacity: 0,
    stagger: 0.14,
    duration: 1.2,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.projects-head', start: 'top 82%', toggleActions: 'play none none reverse' },
  });

  // subtle continued drift while scrolling through the head
  gsap.to(words[words.length - 1], {
    xPercent: 3,
    ease: 'none',
    scrollTrigger: { trigger: '.projects-head', start: 'top bottom', end: 'bottom top', scrub: 1 },
  });
}

/* ── cards fly in from alternating directions ───────────────── */

function initCardReveals(cards) {
  if (env.reduced) return;
  const from = [
    { x: -160, y: 60, r: -5 },
    { x: 160, y: -40, r: 4 },
    { x: -120, y: -60, r: -4 },
    { x: 180, y: 70, r: 6 },
    { x: -100, y: 80, r: -7 },
  ];
  cards.forEach((card, i) => {
    const f = from[i % from.length];
    gsap.from(card, {
      x: f.x,
      y: f.y,
      rotate: f.r,
      opacity: 0,
      duration: 1.25,
      ease: 'power3.out',
      scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none reverse' },
    });
  });
}

/* ── 3D tilt toward the cursor ──────────────────────────────── */

function initTilt(card) {
  const visual = card.querySelector('.pcard-visual');
  const strength = 7;

  card.addEventListener('pointermove', (e) => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(card, {
      rotationY: px * strength,
      rotationX: -py * strength,
      transformPerspective: 900,
      duration: 0.5,
      ease: 'power2.out',
    });
    if (visual) {
      gsap.to(visual, { x: px * 10, y: py * 8, duration: 0.5, ease: 'power2.out' });
    }
  });

  card.addEventListener('pointerleave', () => {
    gsap.to(card, { rotationX: 0, rotationY: 0, duration: 1, ease: 'elastic.out(1, 0.45)' });
    if (visual) gsap.to(visual, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.45)' });
  });
}

/* ── modal: expands from the card itself ────────────────────── */

function initModal(cards) {
  const modal = document.getElementById('project-modal');
  if (!modal) return;
  const panel = modal.querySelector('.modal-panel');
  const closeBtns = modal.querySelectorAll('[data-close]');

  let lastFocus = null;
  let open = false;

  const openProject = (id, card) => {
    const p = data.projects[id];
    if (!p || open) return;
    open = true;
    lastFocus = document.activeElement;

    fillModal(p);

    modal.hidden = false;
    document.documentElement.classList.add('scroll-locked');
    env.lenis?.stop();

    if (env.reduced) {
      gsap.set(panel, { clipPath: 'inset(0 0 0 0)' });
    } else {
      const r = card.getBoundingClientRect();
      const inset = `${r.top}px ${window.innerWidth - r.right}px ${window.innerHeight - r.bottom}px ${r.left}px`;
      const tl = gsap.timeline();
      tl.fromTo(
        panel,
        { clipPath: `inset(${inset} round 20px)` },
        { clipPath: 'inset(0px 0px 0px 0px round 24px)', duration: 0.85, ease: 'expo.inOut' }
      )
        .fromTo('.modal-head, .modal-hero, .modal-body', { y: 60, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.09, duration: 0.7, ease: 'power3.out' }, '-=0.35');
    }

    modal.querySelector('.modal-close')?.focus();
  };

  const closeProject = () => {
    if (!open) return;
    open = false;

    const done = () => {
      modal.hidden = true;
      document.documentElement.classList.remove('modal-open');
      env.lenis?.start();
      document.documentElement.style.overflow = '';
      lastFocus?.focus?.();
    };

    if (env.reduced) {
      done();
    } else {
      gsap.to(panel, {
        clipPath: 'inset(46% 46% 46% 46% round 24px)',
        opacity: 0,
        duration: 0.45,
        ease: 'power3.in',
        onComplete: () => {
          gsap.set(panel, { clearProps: 'all' });
          done();
        },
      });
    }
  };

  function fillModal(p) {
    document.getElementById('modal-type').textContent = p.type;
    document.getElementById('modal-title').textContent = p.title;
    document.getElementById('modal-year').textContent = `© ${p.year}`;
    const hero = document.getElementById('modal-hero');
    hero.className = `modal-hero ${p.heroClass}`;
    hero.innerHTML = `<span class="mh-title">${p.title}</span>`;

    document.getElementById('modal-body').innerHTML = `
      <div class="modal-main">
        <p class="modal-overview">${p.overview}</p>
        <p class="modal-role"><b>ROLE</b>${p.role}</p>
        <div class="modal-stats">
          ${p.stats.map((s) => `<div class="modal-stat"><b>${s.b}</b><span>${s.s}</span></div>`).join('')}
        </div>
        <div class="modal-links">
          ${p.links.map((l) => `<a class="btn" href="${l.href}" target="_blank" rel="noopener noreferrer">${l.label}</a>`).join('')}
        </div>
      </div>
      <aside class="modal-aside">
        <div class="ma-block">
          <h4>STACK</h4>
          <div class="modal-stack">${p.stack.map((s) => `<span>${s}</span>`).join('')}</div>
        </div>
        <div class="ma-block">
          <h4>HIGHLIGHTS</h4>
          <ul class="modal-highlights">${p.highlights.map((h) => `<li>${h}</li>`).join('')}</ul>
        </div>
      </aside>
    `;
  }

  cards.forEach((card) => {
    card.addEventListener('click', () => openProject(card.dataset.project, card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openProject(card.dataset.project, card);
      }
    });
  });

  closeBtns.forEach((b) => b.addEventListener('click', closeProject));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && open) closeProject();
  });
}
