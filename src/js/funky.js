/**
 * funky.js — the playground: googly eyes, draggable stickers,
 * vibe generator, boop button, system messages, easter eggs.
 */

import gsap from 'gsap';
import { env } from './env.js';
import { data } from '../data.js';
import { rand, pick, clamp } from './utils.js';

const CONFETTI_COLORS = ['#8b2eff', '#b6ff2e', '#ff2e88', '#ff7a1a', '#21d4e8', '#ffe14d'];

export function initFunky() {
  initEyes();
  initDraggables();
  initPhraseMachine();
  initBoop();
  initSysMsg();
  initEasterEggs();
}

/* ── googly eyes that track the cursor ──────────────────────── */

function initEyes() {
  const playground = document.getElementById('playground');
  const pupils = Array.from(document.querySelectorAll('.pupil'));
  if (!playground || !pupils.length) return;

  let mx = null;
  let my = null;
  let visible = false;
  let raf = null;

  if (env.fine && !env.reduced) {
    window.addEventListener('pointermove', (e) => {
      mx = e.clientX;
      my = e.clientY;
    }, { passive: true });
  }

  const tick = (t) => {
    pupils.forEach((p) => {
      const eye = p.parentElement;
      const r = eye.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      let dx;
      let dy;
      if (mx === null || my === null) {
        // idle wander for touch / no-pointer users
        dx = Math.sin(t / 900 + r.left) * 6;
        dy = Math.cos(t / 1100 + r.top) * 4;
      } else {
        const ddx = mx - cx;
        const ddy = my - cy;
        const dist = Math.hypot(ddx, ddy) || 1;
        const max = r.width * 0.16;
        const pull = Math.min(1, dist / 220);
        dx = (ddx / dist) * max * pull;
        dy = (ddy / dist) * max * pull;
      }
      p.style.translate = `${dx}px ${dy}px`;
    });
    raf = requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !visible) {
          visible = true;
          raf = requestAnimationFrame(tick);
        } else if (!e.isIntersecting && visible) {
          visible = false;
          cancelAnimationFrame(raf);
        }
      });
    },
    { threshold: 0.15 }
  );
  io.observe(playground);
}

/* ── draggable stickers (pointer events → works on touch too) ── */

function initDraggables() {
  const playground = document.getElementById('playground');
  if (!playground) return;
  const sticks = Array.from(playground.querySelectorAll('[data-drag]'));

  sticks.forEach((stick) => {
    let startX = 0;
    let startY = 0;
    let baseX = 0;
    let baseY = 0;
    let dragging = false;

    const down = (e) => {
      dragging = true;
      stick.setPointerCapture?.(e.pointerId);
      startX = e.clientX;
      startY = e.clientY;
      baseX = gsap.getProperty(stick, 'x');
      baseY = gsap.getProperty(stick, 'y');
      playground.appendChild(stick); // bring to front
      gsap.to(stick, { scale: 1.1, duration: 0.25, ease: 'power2.out' });
      e.preventDefault();
    };

    const move = (e) => {
      if (!dragging) return;
      const pr = playground.getBoundingClientRect();
      const nx = baseX + (e.clientX - startX);
      const ny = baseY + (e.clientY - startY);
      const maxX = pr.width - stick.offsetWidth - 4;
      const maxY = pr.height - stick.offsetHeight - 4;
      gsap.set(stick, {
        x: clamp(nx, -stick.offsetLeft, maxX - stick.offsetLeft),
        y: clamp(ny, -stick.offsetTop, maxY - stick.offsetTop),
      });
    };

    const up = () => {
      if (!dragging) return;
      dragging = false;
      gsap.to(stick, { scale: 1, duration: 0.45, ease: 'elastic.out(1, 0.5)' });
    };

    stick.addEventListener('pointerdown', down);
    stick.addEventListener('pointermove', move);
    stick.addEventListener('pointerup', up);
    stick.addEventListener('pointercancel', up);

    // keyboard nudge for the button stickers
    if (stick.tagName === 'BUTTON') {
      stick.addEventListener('keydown', (e) => {
        const step = e.shiftKey ? 24 : 8;
        const map = {
          ArrowUp: [0, -step],
          ArrowDown: [0, step],
          ArrowLeft: [-step, 0],
          ArrowRight: [step, 0],
        };
        if (!map[e.key]) return;
        e.preventDefault();
        gsap.to(stick, {
          x: `+=${map[e.key][0]}`,
          y: `+=${map[e.key][1]}`,
          duration: 0.2,
          ease: 'power2.out',
        });
      });
    }
  });
}

/* ── random vibe generator ──────────────────────────────────── */

function initPhraseMachine() {
  const out = document.getElementById('phrase-out');
  const btn = document.getElementById('phrase-btn');
  if (!out || !btn) return;
  let current = 0;
  let busy = false;

  const swap = () => {
    if (busy) return;
    busy = true;
    let next;
    do {
      next = Math.floor(Math.random() * data.phrases.length);
    } while (next === current && data.phrases.length > 1);
    current = next;

    if (env.reduced) {
      out.textContent = `“${data.phrases[current]}”`;
      busy = false;
      return;
    }
    gsap
      .timeline({ onComplete: () => (busy = false) })
      .to(out, { y: -14, opacity: 0, rotate: -2, duration: 0.28, ease: 'power2.in' })
      .add(() => (out.textContent = `“${data.phrases[current]}”`))
      .fromTo(out, { y: 18, opacity: 0, rotate: 2 }, { y: 0, opacity: 1, rotate: 0, duration: 0.5, ease: 'back.out(2)' });
  };

  btn.addEventListener('click', swap);
}

/* ── boop button ────────────────────────────────────────────── */

function initBoop() {
  const btn = document.getElementById('boop-btn');
  if (!btn) return;
  let boops = 0;
  btn.addEventListener('click', () => {
    boops++;
    if (!env.reduced) {
      gsap.fromTo(
        btn,
        { scale: 0.85, rotate: rand(-8, 8) },
        { scale: 1, rotate: 0, duration: 0.55, ease: 'elastic.out(1.4, 0.4)' }
      );
    }
    if (boops === 3) btn.textContent = 'STOP BOOPING';
    if (boops === 7) btn.textContent = 'SERIOUSLY';
    if (boops === 12) btn.textContent = '…okay. BOOP';
    if (boops === 20) {
      btn.textContent = 'BOOP';
      boops = 0;
      confettiBurst(30);
    }
  });
}

/* ── fake system messages ───────────────────────────────────── */

function initSysMsg() {
  const el = document.getElementById('sys-msg');
  if (!el) return;
  const lines = data.sysMsgs;
  let li = 0;

  const typeLine = (text) => {
    if (env.reduced) {
      el.textContent = text;
      return;
    }
    let ci = 0;
    el.textContent = '';
    const iv = setInterval(() => {
      el.textContent = text.slice(0, ++ci);
      if (ci >= text.length) clearInterval(iv);
    }, 34);
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          typeLine(lines[li % lines.length]);
          li++;
        }
      });
    },
    { threshold: 0.4 }
  );
  io.observe(el);
}

/* ── easter eggs: hidden star ×5 + typing “funky” ───────────── */

function initEasterEggs() {
  const star = document.getElementById('hidden-star');
  let clicks = 0;
  let clickTimer = null;

  star?.addEventListener('click', () => {
    clicks++;
    if (clickTimer) clearTimeout(clickTimer);
    clickTimer = setTimeout(() => (clicks = 0), 2200);
    if (!env.reduced) {
      gsap.fromTo(star, { scale: 1.6, rotate: 40 }, { scale: 1, rotate: 0, duration: 0.5, ease: 'back.out(3)' });
    }
    if (clicks >= 5) {
      clicks = 0;
      celebrate();
    }
  });

  // type “funky” anywhere
  let buf = '';
  document.addEventListener('keydown', (e) => {
    if (e.key.length !== 1) return;
    buf = (buf + e.key.toLowerCase()).slice(-5);
    if (buf === 'funky') {
      buf = '';
      celebrate();
    }
  });
}

function celebrate() {
  confettiBurst(70);
  const playground = document.getElementById('playground');
  if (playground && !env.reduced) {
    gsap.fromTo(
      playground,
      { rotate: -1.2 },
      { rotate: 0, duration: 0.9, ease: 'elastic.out(1, 0.35)' }
    );
  }
}

function confettiBurst(count) {
  const playground = document.getElementById('playground');
  if (!playground || env.reduced) return;
  const pr = playground.getBoundingClientRect();

  for (let i = 0; i < count; i++) {
    const c = document.createElement('i');
    c.className = 'confetti';
    c.style.left = `${rand(2, 96)}%`;
    c.style.background = pick(CONFETTI_COLORS);
    c.style.rotate = `${rand(0, 360)}deg`;
    playground.appendChild(c);

    gsap.to(c, {
      y: pr.height + 40,
      x: rand(-90, 90),
      rotate: rand(-540, 540),
      opacity: 0,
      duration: rand(1.4, 2.6),
      delay: rand(0, 0.35),
      ease: 'power2.in',
      onComplete: () => c.remove(),
    });
  }
}
