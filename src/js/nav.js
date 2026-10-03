/**
 * nav.js — floating pill nav, active indicator, mobile overlay menu.
 */

import gsap from 'gsap';
import { env } from './env.js';
import { pad } from './utils.js';
import { scrollToTarget } from './scroll.js';

export function initNav() {
  const pill = document.querySelector('.nav-pill');
  const indicator = document.getElementById('nav-indicator');
  const links = Array.from(document.querySelectorAll('.nav-link'));
  const burger = document.getElementById('nav-burger');
  const overlay = document.getElementById('menu-overlay');
  const menuLinks = Array.from(document.querySelectorAll('.menu-link'));

  /* ── active section tracking + sliding indicator ──────────── */

  const setActive = (id) => {
    const link = links.find((l) => l.dataset.section === id);
    if (!link || link.classList.contains('is-active')) return;
    links.forEach((l) => l.classList.remove('is-active'));
    link.classList.add('is-active');
    moveIndicator(link);
  };

  const moveIndicator = (link) => {
    if (!indicator || !pill) return;
    indicator.style.left = `${link.offsetLeft}px`;
    indicator.style.width = `${link.offsetWidth}px`;
  };

  links
    .filter((l) => l.dataset.section)
    .forEach((l) => {
      const section = document.getElementById(l.dataset.section);
      if (!section) return;
      env.st.create({
        trigger: section,
        start: 'top 50%',
        end: 'bottom 50%',
        onToggle: (self) => self.isActive && setActive(l.dataset.section),
      });
    });

  // initial state (after fonts settle)
  requestAnimationFrame(() => setActive('home'));
  window.addEventListener('resize', () => {
    const active = links.find((l) => l.classList.contains('is-active')) || links[0];
    moveIndicator(active);
  });
  document.fonts?.ready?.then(() => {
    const active = links.find((l) => l.classList.contains('is-active')) || links[0];
    moveIndicator(active);
  });

  /* ── mobile overlay menu ──────────────────────────────────── */

  let open = false;
  let lastFocus = null;

  const tl = gsap.timeline({ paused: true });
  tl.to(overlay, { clipPath: 'circle(150% at calc(100% - 3.4rem) 3rem)', duration: 0.75, ease: 'power4.inOut' })
    .from(menuLinks, { y: 54, opacity: 0, stagger: 0.07, duration: 0.55, ease: 'power3.out' }, '-=0.32')
    .from('.menu-foot', { opacity: 0, duration: 0.4 }, '-=0.25');

  const openMenu = () => {
    if (open) return;
    open = true;
    lastFocus = document.activeElement;
    burger.setAttribute('aria-expanded', 'true');
    burger.innerHTML = '<span class="burger-dot"></span>CLOSE';
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    tl.timeScale(1).play();
    env.lenis?.stop();
    document.documentElement.style.overflow = 'hidden';
    menuLinks[0]?.focus();
  };

  const closeMenu = ({ refocus = true } = {}) => {
    if (!open) return;
    open = false;
    burger.setAttribute('aria-expanded', 'false');
    burger.innerHTML = '<span class="burger-dot"></span>MENU';
    overlay.setAttribute('aria-hidden', 'true');
    tl.timeScale(1.6).reverse();
    env.lenis?.start();
    document.documentElement.classList.remove('scroll-locked');
    setTimeout(() => {
      if (!open) overlay.classList.remove('is-open');
    }, 650);
    if (refocus) lastFocus?.focus?.();
  };

  burger?.addEventListener('click', () => (open ? closeMenu() : openMenu()));
  window.addEventListener('menu:close', () => closeMenu({ refocus: false }));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && open) closeMenu();
    if (e.key === 'Tab' && open) {
      // simple focus trap
      const focusables = [burger, ...menuLinks];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // menu links: close, then glide to section
  menuLinks.forEach((l) =>
    l.addEventListener('click', (e) => {
      e.preventDefault();
      closeMenu({ refocus: false });
      setTimeout(() => scrollToTarget(l.getAttribute('href')), 350);
    })
  );

  // expose pad for potential reuse
  void pad;
}
