# MAXFUNKY — Suyash Pandey's Portfolio ✦

> **A digital playground that happens to be a portfolio.**

A maximalist, funky, scroll-driven portfolio for **Suyash Pandey** — AI & Data Science
engineering student, technology enthusiast, professional breaker-of-things-until-they-work.

![style](https://img.shields.io/badge/vibe-maximalist-ff2e88) ![scroll](https://img.shields.io/badge/scroll-cinematic-b6ff2e) ![motion](https://img.shields.io/badge/motion-60fps-8b2eff)

---

## ✦ What this is

A single-page, scroll-first experience built around one idea: **the scroll is the
interface**. Lenis drives buttery smooth scrolling, GSAP ScrollTrigger choreographs
every section, and the whole page reads as one continuous animated journey —

```
ARRIVAL → DISCOVERY → EXPERIENCE → EXPERIMENTATION → CAPABILITIES → PLAY → CONNECTION → EXIT
(hero)     (about)     (timeline)    (projects)       (skills)      (playground) (contact)  (thanks for scrolling)
```

### Highlights

- **Smooth scroll engine** — Lenis + GSAP synced through a single `requestAnimationFrame` loop. Native scrolling, keyboard and touch stay fully functional; nothing traps the user.
- **Cinematic hero → about bridge** — the name parallaxes away, floating stickers scatter at individual speeds, and a pinned manifesto (`CURIOUS BY DEFAULT.`) morphs into the About sheet.
- **Sideways experience timeline** — vertical wheel input drives a horizontal rail of internship cards (pinned + scrubbed). Falls back to a vertical stack on mobile.
- **Asymmetric project grid** — five projects, five completely different visual identities (AI / data / web / hackathon / creative). Cards tilt toward the cursor and open a detail view that **expands from the card itself** (shared-element style `clip-path` transition).
- **Skills as a typography field** — giant alternating marquee rows; hovering a skill enlarges it, pushes its neighbours away and reveals its lore.
- **A playable intermission** — googly eyes that track your cursor, draggable stickers, a vibe generator, a boop button and hidden easter eggs (type `funky` anywhere, or find the shy star).
- **Custom cursor** — dot + trailing ring that morphs into labels (`VIEW →`, `DRAG`, `BOOP`…) over interactive elements. Desktop only.
- **Scroll progress** — a glowing dot on a vertical track with a `001 — 100` counter.
- **Micro-interactions everywhere** — magnetic buttons, springy nav indicator, animated underlines, sticker shadows.

### Built with

| Tool      | Why                                                        |
| --------- | ---------------------------------------------------------- |
| [Vite](https://vite.dev) | Zero-config, fast builds                     |
| [Lenis](https://lenis.darkroom.engineering) | Smooth scrolling, one rAF loop |
| [GSAP](https://gsap.com) + ScrollTrigger | Scroll choreography, pins, scrubbing |
| Vanilla CSS | Every visual is code — **zero image assets**, so it loads fast |

Typography: **Bricolage Grotesque** (display) · **Space Grotesk** (body) · **Space Mono** (metadata).

---

## ✦ Getting started

```bash
npm install     # install dependencies
npm run dev     # local dev server → http://localhost:5173
npm run build   # production build → dist/
npm run preview # preview the production build
```

---

## ✦ Customising (important!)

**All content lives in [`src/data.js`](src/data.js)** — experiences, skills, project
modal details, playground phrases and contact links. Edit that one file and the site
updates everywhere.

> ⚠️ Replace the placeholder contact links in `data.js`:
>
> ```js
> contact: {
>   email: 'hello@example.com',                       // ← your email
>   linkedin: 'https://www.linkedin.com/in/your-handle', // ← your LinkedIn
>   instagram: 'https://www.instagram.com/your-handle', // ← your Instagram (or delete the button in index.html)
> }
> ```

Other places you might touch:

| What                    | Where                                            |
| ----------------------- | ------------------------------------------------ |
| Project cards (visuals) | `index.html` → `.project-grid`                   |
| Hero / section copy     | `index.html`                                     |
| Colors & fonts          | `src/styles/base.css` → `:root` tokens           |
| Scroll choreography     | `src/js/hero.js`, `src/js/sections.js`           |
| Project modal content   | `src/data.js` → `projects`                       |

---

## ✦ Project structure

```
├── index.html                  # the whole single-page experience
├── public/favicon.svg
├── src/
│   ├── main.js                 # bootstrap — wires everything in order
│   ├── data.js                 # ✏️ ALL editable content lives here
│   ├── js/
│   │   ├── env.js              # shared state (reduced motion, pointer type)
│   │   ├── utils.js            # text splitter, marquee builder, helpers
│   │   ├── scroll.js           # Lenis × GSAP single loop, progress, backdrop
│   │   ├── preloader.js        # boot sequence
│   │   ├── nav.js              # pill nav + mobile overlay menu
│   │   ├── cursor.js           # custom cursor (desktop only)
│   │   ├── hero.js             # hero intro + scroll-out choreography
│   │   ├── sections.js         # statements, about, experience, skills, contact
│   │   ├── projects.js         # card reveals, tilt, shared-element modal
│   │   └── funky.js            # playground: eyes, draggables, easter eggs
│   └── styles/                 # base → sections → responsive
└── .github/workflows/deploy.yml  # GitHub Pages deployment
```

---

## ✦ Performance & accessibility

The maximalism is deliberate; the cost isn't:

- **Transform/opacity only** for scroll-driven animation (GPU-composited, no layout thrash).
- **One animation loop** — Lenis and ScrollTrigger share GSAP's ticker; no competing libraries.
- **Zero raster assets** — every visual (blobs, charts, confetti, stickers) is CSS/SVG.
- **Off-screen work stops** — marquees, eyes and timers pause via `IntersectionObserver`.
- **`prefers-reduced-motion` respected** — Lenis disabled, pins removed, parallax dropped;
  content stays fully readable and navigation remains instant.
- **Native scrolling preserved** — no scroll hijacking, no trapped states; the horizontal
  experience section is a normal pinned scrub that always releases.
- Semantic landmarks, skip link, `aria-label`s on kinetic headings, focus trapping +
  `Esc` in the modal and menu, keyboard-operable project cards and draggable stickers.
- Mobile is **recomposed**, not shrunk: burger menu, vertical timeline, single-column
  staggered project grid, custom cursor and heavy 3D disabled.

---

## ✦ Deployment (GitHub Pages)

This repo ships with a ready workflow (`.github/workflows/deploy.yml`):

1. Push to `main`.
2. Repo **Settings → Pages → Source: GitHub Actions**.
3. Done — the site builds and deploys on every push to `main`.

`vite.config.js` uses `base: './'` so the build works at any subpath (including
`https://<user>.github.io/MaxFunkyPortfolio/`).

---

## ✦ License & credits

© 2026 Suyash Pandey. Built with GSAP + Lenis + excessive enthusiasm.
Inspired by the weird corners of the web — the ones that made you scroll back up just to check how they did that.

**Thanks for scrolling. ★**
