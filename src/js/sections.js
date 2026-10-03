/**
 * sections.js — scroll choreography for:
 *   statements (hero→about bridge, pinned)
 *   about (parallax cards, exploring cycler)
 *   experience (vertical scroll → horizontal card rail on desktop)
 *   skills (marquee field + hover lore)
 *   contact (kinetic title, glow)
 */

import gsap from 'gsap';
import { env } from './env.js';
import { splitText, buildMarquee, pad } from './utils.js';
import { data } from '../data.js';

export function initSections() {
  initReveals();
  initStatements();
  initAbout();
  initExperience();
  initSkills();
  initContact();
}

/* ── generic reveal-ups ─────────────────────────────────────── */

function initReveals() {
  if (env.reduced) return;
  gsap.utils.toArray('[data-reveal-up]').forEach((el) => {
    gsap.from(el, {
      y: 52,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' },
    });
  });
}

/* ── statements bridge (pinned + scrubbed) ──────────────────── */

function initStatements() {
  const section = document.querySelector('.statements');
  if (!section) return;
  const big = section.querySelector('.statement-big');
  const sub = section.querySelector('.statement-sub');
  if (!big || !sub) return;

  const bigChars = splitText(big, 'chars').chars;
  const subWords = splitText(sub, 'words').words;

  if (env.reduced) {
    gsap.set([big, sub], { clearProps: 'all' });
    return;
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: '+=170%',
      pin: true,
      scrub: 0.65,
      anticipatePin: 1,
    },
  });

  tl.from(bigChars, { yPercent: 120, rotate: 6, stagger: 0.03, duration: 1.1, ease: 'power3.out' }, 0)
    .from('.st-1 .statement-underline', { scaleX: 0, transformOrigin: 'left center', duration: 0.5 }, 0.7)
    .from('.st-1 .statement-tag', { opacity: 0, y: 18, duration: 0.4 }, 0)
    .to('.st-1', { yPercent: -50, opacity: 0, scale: 0.92, duration: 0.55, ease: 'power2.in' }, 1.55)
    .from(
      subWords,
      {
        y: (i) => (i % 2 ? 90 : -90),
        x: (i) => (i % 2 ? 60 : -60),
        opacity: 0,
        rotate: (i) => (i % 2 ? 6 : -6),
        stagger: 0.055,
        duration: 0.9,
        ease: 'power3.out',
      },
      1.75
    )
    .from('.st-2 .statement-tag', { opacity: 0, duration: 0.3 }, 1.75)
    .to({}, { duration: 0.45 }); // breathing room before release
}

/* ── about: parallax + exploring cycler ─────────────────────── */

function initAbout() {
  const about = document.getElementById('about');
  if (!about) return;

  const giant = about.querySelector('.about-giant');
  const cards = Array.from(about.querySelectorAll('.info-card'));

  if (!env.reduced) {
    if (giant) {
      gsap.fromTo(
        giant,
        { yPercent: 18 },
        {
          yPercent: -14,
          ease: 'none',
          scrollTrigger: { trigger: about, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
        }
      );
    }

    // cards pop in, then drift at individual speeds
    if (window.matchMedia('(min-width: 1025px)').matches) {
      gsap.from(cards, {
        scale: 0.6,
        opacity: 0,
        rotate: (i) => (i % 2 ? 14 : -14),
        duration: 0.9,
        ease: 'back.out(2)',
        stagger: 0.12,
        scrollTrigger: { trigger: about, start: 'top 70%', toggleActions: 'play none none reverse' },
      });
      cards.forEach((card) => {
        gsap.to(card, {
          y: () => parseFloat(card.dataset.speed || 8) * -5.5,
          ease: 'none',
          scrollTrigger: { trigger: about, start: 'top bottom', end: 'bottom top', scrub: 1 },
        });
      });
    }
  }

  initExploringCycler();
}

function initExploringCycler() {
  const el = document.getElementById('exploring-word');
  if (!el) return;
  const words = data.exploring;
  let idx = 0;

  const setText = (w) => (el.textContent = w);

  if (env.reduced) {
    setInterval(() => {
      idx = (idx + 1) % words.length;
      setText(words[idx]);
    }, 2400);
    return;
  }

  let running = false;
  const next = () => {
    if (running) return;
    running = true;
    idx = (idx + 1) % words.length;
    gsap
      .timeline({ onComplete: () => (running = false) })
      .to(el, { yPercent: -110, duration: 0.4, ease: 'power3.in' })
      .add(() => setText(words[idx]))
      .fromTo(el, { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: 'back.out(1.8)' });
  };

  // only cycle while visible
  let timer = null;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !timer) timer = setInterval(next, 2100);
        else if (!e.isIntersecting && timer) {
          clearInterval(timer);
          timer = null;
        }
      });
    },
    { threshold: 0.3 }
  );
  io.observe(el);
}

/* ── experience: vertical scroll drives a horizontal rail ───── */

function renderExperience() {
  const track = document.getElementById('xp-track');
  if (!track) return [];
  track.innerHTML = '';
  return data.experiences.map((xp, i) => {
    const card = document.createElement('article');
    card.className = `xp-card xp-card-${i + 1}`;
    card.innerHTML = `
      <span class="xp-ghost" aria-hidden="true">${xp.ghost}</span>
      <span class="xp-num">${xp.num}</span>
      <h3 class="xp-role">${xp.role}</h3>
      <div class="xp-org-row">
        <span class="xp-org">${xp.org}</span>
      </div>
      <span class="xp-dur mono">${xp.duration}</span>
      <p class="xp-desc">${xp.description}</p>
      <div class="xp-tech">${xp.tech.map((t) => `<span>${t}</span>`).join('')}</div>
      <div class="xp-key"><b>KEY CONTRIBUTION</b>${xp.key}</div>
    `;
    track.append(card);
    return card;
  });
}

function initExperience() {
  const wrap = document.getElementById('xp-wrap');
  if (!wrap) return;
  const cards = renderExperience();
  const counter = document.getElementById('xp-current');

  const mm = gsap.matchMedia();

  /* desktop + motion: pin the rail, wheel stays vertical */
  mm.add('(min-width: 721px) and (prefers-reduced-motion: no-preference)', () => {
    const track = document.getElementById('xp-track');
    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 40);

    const drive = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: wrap,
        start: 'top top',
        end: () => `+=${distance() + window.innerHeight * 0.35}`,
        pin: true,
        scrub: 0.7,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (counter) {
            const idx = Math.min(cards.length, Math.max(1, Math.round(self.progress * (cards.length - 1)) + 1));
            counter.textContent = pad(idx);
          }
        },
      },
    });

    // each card settles into place as the rail carries it in
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { rotation: i % 2 ? 3.5 : -3.5, scale: 0.94 },
        {
          rotation: 0,
          scale: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            containerAnimation: drive,
            start: 'left 95%',
            end: 'left 45%',
            scrub: true,
          },
        }
      );
      gsap.from(card.querySelectorAll('.xp-role, .xp-desc, .xp-tech, .xp-key, .xp-dur'), {
        y: 42,
        opacity: 0,
        stagger: 0.06,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          containerAnimation: drive,
          start: 'left 85%',
          toggleActions: 'play none none reverse',
        },
      });
      gsap.to(card.querySelector('.xp-ghost'), {
        xPercent: 24,
        ease: 'none',
        scrollTrigger: { trigger: card, containerAnimation: drive, start: 'left right', end: 'right left', scrub: true },
      });
    });

    return () => gsap.set(track, { clearProps: 'x' });
  });

  /* mobile: vertical stack, snappy entrances */
  mm.add('(max-width: 720px), (prefers-reduced-motion: reduce)', () => {
    if (env.reduced) return;
    cards.forEach((card, i) => {
      gsap.from(card, {
        y: 70,
        opacity: 0,
        rotate: i % 2 ? 2.5 : -2.5,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none reverse' },
      });
    });
  });
}

/* ── skills: marquee field + hover lore ─────────────────────── */

function initSkills() {
  const rowsWrap = document.getElementById('skills-rows');
  if (!rowsWrap) return;
  const descBox = document.getElementById('skill-desc');
  const descText = document.getElementById('skill-desc-text');

  data.skills.forEach((cat, ci) => {
    const row = document.createElement('div');
    row.className = `skill-row ${cat.accent}`;
    row.dataset.dir = ci % 2 ? 'rtl' : 'ltr';

    const track = document.createElement('div');
    track.className = 'skill-track';

    const addItem = (node) => track.append(node);
    const sep = () => {
      const s = document.createElement('span');
      s.className = 'skill-sep';
      s.textContent = '✦';
      s.setAttribute('aria-hidden', 'true');
      return s;
    };

    const catChip = document.createElement('span');
    catChip.className = 'skill-cat';
    catChip.textContent = cat.cat;
    addItem(catChip);
    addItem(sep());

    cat.items.forEach((skill) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'skill';
      btn.textContent = skill.name;
      btn.dataset.desc = skill.desc;
      addItem(btn);
      addItem(sep());
    });

    row.append(track);
    rowsWrap.append(row);
    buildMarquee(track);
  });

  /* hover / focus: enlarge, push siblings apart, show lore */
  const skills = Array.from(rowsWrap.querySelectorAll('.skill'));

  const showDesc = (text) => {
    if (!descBox || !descText) return;
    descText.textContent = text;
    descBox.classList.add('is-visible');
  };
  const hideDesc = () => descBox?.classList.remove('is-visible');

  skills.forEach((skill) => {
    const row = skill.closest('.skill-row');
    const siblings = Array.from(row.querySelectorAll('.skill')).filter((s) => s !== skill);

    const enter = () => {
      showDesc(skill.dataset.desc);
      if (env.reduced) return;
      const myIdx = siblings.length; // position not needed for dim
      siblings.forEach((s) => {
        s.classList.add('is-dimmed');
        const rect = s.getBoundingClientRect();
        const myRect = skill.getBoundingClientRect();
        const dir = rect.left < myRect.left ? -1 : 1;
        s.style.translate = `${dir * 16}px 0`;
      });
      void myIdx;
    };
    const leave = () => {
      siblings.forEach((s) => {
        s.classList.remove('is-dimmed');
        s.style.translate = '';
      });
    };

    skill.addEventListener('mouseenter', enter);
    skill.addEventListener('mouseleave', () => {
      leave();
      hideDesc();
    });
    skill.addEventListener('focus', enter);
    skill.addEventListener('blur', () => {
      leave();
      hideDesc();
    });
  });

  /* row entrance skew */
  if (!env.reduced) {
    gsap.from('.skill-row', {
      y: 90,
      opacity: 0,
      rotate: (i) => (i % 2 ? 1.5 : -1.5),
      duration: 1,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: { trigger: rowsWrap, start: 'top 85%', toggleActions: 'play none none reverse' },
    });
  }
}

/* ── contact: kinetic title + final glow ────────────────────── */

function initContact() {
  const contact = document.getElementById('contact');
  if (!contact) return;

  env.st.create({
    trigger: contact,
    start: 'top 70%',
    onEnter: () => contact.classList.add('is-here'),
    onLeaveBack: () => contact.classList.remove('is-here'),
  });

  if (env.reduced) return;

  const lines = Array.from(contact.querySelectorAll('.ct-line'));
  lines.forEach((line) => splitText(line, 'chars'));

  gsap.from(lines.flatMap((l) => Array.from(l.querySelectorAll('.char'))), {
    yPercent: 120,
    stagger: 0.02,
    duration: 0.9,
    ease: 'power4.out',
    scrollTrigger: { trigger: contact, start: 'top 72%', toggleActions: 'play none none reverse' },
  });

  gsap.from('.contact-sub, .contact-actions, .contact-meta', {
    y: 40,
    opacity: 0,
    stagger: 0.12,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: { trigger: contact, start: 'top 55%', toggleActions: 'play none none reverse' },
  });

  // ambient glow rises with scroll into the final section
  gsap.fromTo(
    '.contact-glow',
    { yPercent: 34 },
    {
      yPercent: 0,
      ease: 'none',
      scrollTrigger: { trigger: contact, start: 'top bottom', end: 'bottom bottom', scrub: 0.8 },
    }
  );
}
