/**
 * utils.js — text splitting, marquee builder, misc helpers
 */

/**
 * Split element text into .word / .char spans while preserving
 * nested markup (e.g. <em>). Returns { words, chars }.
 */
export function splitText(el, mode = 'chars') {
  const words = [];
  const chars = [];

  const walk = (node) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        const parts = child.textContent.split(/(\s+)/);
        parts.forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.append(document.createTextNode(' '));
            return;
          }
          const w = document.createElement('span');
          w.className = 'word';
          if (mode === 'chars') {
            for (const ch of part) {
              const c = document.createElement('span');
              c.className = 'char';
              c.textContent = ch;
              w.append(c);
              chars.push(c);
            }
          } else {
            w.textContent = part;
          }
          words.push(w);
          frag.append(w);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        walk(child);
      }
    });
  };

  walk(el);
  return { words, chars };
}

/**
 * Turn a flex track into a seamless infinite marquee.
 * The original children become one "half"; the half is repeated until
 * wide enough (≥ 1.15 viewports), then duplicated so translateX(-50%)
 * loops perfectly. Pauses via IntersectionObserver when off-screen.
 */
export function buildMarquee(track) {
  if (!track || track.dataset.marquee === 'built') return;
  track.dataset.marquee = 'built';

  const base = Array.from(track.children);
  if (!base.length) return;

  const half = document.createElement('div');
  half.className = 'marquee-half';
  base.forEach((n) => half.append(n));
  track.append(half); // attach before measuring so scrollWidth is real

  const need = () => Math.max(window.innerWidth * 1.15, 800);
  let guard = 0;
  while (half.scrollWidth < need() && guard++ < 8) {
    base.forEach((n) => half.append(n.cloneNode(true)));
  }
  track.append(half.cloneNode(true));

  // pause when off-screen
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        track.classList.toggle('is-offscreen', !e.isIntersecting);
      });
    },
    { rootMargin: '80px' }
  );
  io.observe(track);
}

export const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const pad = (n, len = 2) => String(n).padStart(len, '0');
export const rand = (min, max) => min + Math.random() * (max - min);
export const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
