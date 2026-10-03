/**
 * data.js — ALL portfolio content lives here.
 * Edit this file to customise the site; no markup knowledge required.
 */

export const data = {
  /* ── contact ─────────────────────────────────────────────────
     TODO: replace with your real email / LinkedIn / Instagram.   */
  contact: {
    email: 'hello@example.com',
    linkedin: 'https://www.linkedin.com/in/your-handle',
    instagram: 'https://www.instagram.com/your-handle',
    github: 'https://github.com/suyashpandey8088-cell',
  },

  /* ── preloader ─────────────────────────────────────────────── */
  preloaderMsgs: [
    'WAKING UP THE PIXELS…',
    'CALIBRATING COLORS…',
    'BENDING THE GRID…',
    'TEACHING SCROLLBAR SOME MANNERS…',
    'ALMOST THERE…',
  ],

  /* ── about: cycling keywords ───────────────────────────────── */
  exploring: [
    'AI',
    'MACHINE LEARNING',
    'WEB DEVELOPMENT',
    'DATA',
    'AUTOMATION',
    'AI AGENTS',
    'CREATIVE TECHNOLOGY',
  ],

  /* ── experience timeline (cards render left → right) ────────── */
  experiences: [
    {
      num: '01',
      ghost: 'AI',
      role: 'AI INTERN',
      org: 'Applied AI Program',
      duration: '2025 · 3 MO',
      description:
        'Built and fine-tuned machine-learning models, ran experiments with LLMs and prompt pipelines, and turned messy datasets into working prototypes instead of pretty notebooks that never run again.',
      tech: ['PYTHON', 'MACHINE LEARNING', 'LLMS', 'PROMPTING'],
      key: 'Shipped an LLM-powered prototype end-to-end — from raw data to a demo people actually used.',
    },
    {
      num: '02',
      ghost: 'DT',
      role: 'DATA ENTRY INTERN',
      org: 'Data Operations Team',
      duration: '2024 · 3 MO',
      description:
        'Owned the invisible-but-critical layer: cleaning, structuring and organizing thousands of records with obsessive accuracy. Learned that 80% of data work is earning the right to analyze it.',
      tech: ['EXCEL', 'DATA CLEANING', 'STRUCTURING', 'SQL'],
      key: 'Cut processing errors and built reusable structures the team kept using after I left.',
    },
    {
      num: '03',
      ghost: 'AI',
      role: 'AI INTERN — ROUND II',
      org: 'AI Product Track',
      duration: '2025 · 4 MO',
      description:
        'Second round of AI chaos: agents that plan, RAG pipelines that retrieve, and evaluation workflows that keep hallucinations on a short leash. More building, fewer slides.',
      tech: ['PYTHON', 'RAG', 'AI AGENTS', 'APIS'],
      key: 'Built retrieval-augmented demos that answered questions with sources, not vibes.',
    },
    {
      num: '04',
      ghost: 'WEB',
      role: 'WEB DEVELOPER INTERN',
      org: 'Web Studio Collective',
      duration: '2025 · 2 MO',
      description:
        'Turned design files into responsive, animated interfaces. Fell in love with the space between design and engineering — where the cursor effects live.',
      tech: ['HTML', 'CSS', 'JAVASCRIPT', 'REACT'],
      key: 'Shipped responsive UI with motion baked in, not bolted on.',
    },
    {
      num: '05',
      ghost: 'SOL',
      role: 'SOLUTION DEVELOPER INTERN',
      org: 'Innovation Lab',
      duration: '2026 · 3 MO',
      description:
        'End-to-end solution building: understand the problem, sketch the flow, build the thing, deploy it, then explain it to humans. The full loop, no handoffs.',
      tech: ['PYTHON', 'APIS', 'AUTOMATION', 'SQL'],
      key: 'Delivered a complete solution from problem statement to working prototype.',
    },
  ],

  /* ── skills marquee ────────────────────────────────────────── */
  skills: [
    {
      cat: 'AI/ML',
      accent: 'sr-1',
      items: [
        { name: 'PYTHON', desc: 'PYTHON — the swiss-army knife: scripts, models and glue for everything' },
        { name: 'MACHINE LEARNING', desc: 'MACHINE LEARNING — teaching machines to be slightly less dumb' },
        { name: 'LLMS', desc: 'LLMS — large language brains, small prompt problems' },
        { name: 'AI AGENTS', desc: 'AI AGENTS — autonomous-ish helpers that do my bidding' },
        { name: 'RAG', desc: 'RAG — retrieval + generation = answers that cite their sources' },
      ],
    },
    {
      cat: 'DEVELOPMENT',
      accent: 'sr-2',
      items: [
        { name: 'HTML', desc: 'HTML — the skeleton of every experiment' },
        { name: 'CSS', desc: 'CSS — making browsers obey (mostly)' },
        { name: 'JAVASCRIPT', desc: 'JAVASCRIPT — the chaos engine of the web' },
        { name: 'REACT', desc: 'REACT — components in, apps out' },
        { name: 'APIS', desc: 'APIS — plugging things into other things' },
      ],
    },
    {
      cat: 'DATA',
      accent: 'sr-3',
      items: [
        { name: 'DATA ANALYSIS', desc: 'DATA ANALYSIS — finding stories hiding inside spreadsheets' },
        { name: 'DATA PROCESSING', desc: 'DATA PROCESSING — cleaning, shaping, wrangling, repeating' },
        { name: 'VISUALIZATION', desc: 'VISUALIZATION — charts that actually mean something' },
        { name: 'SQL', desc: 'SQL — asking databases polite questions' },
      ],
    },
    {
      cat: 'TOOLS',
      accent: 'sr-4',
      items: [
        { name: 'GIT', desc: 'GIT — save points for code' },
        { name: 'GITHUB', desc: 'GITHUB — where the commits live' },
        { name: 'VS CODE', desc: 'VS CODE — home, with 47 extensions' },
        { name: 'FIGMA', desc: 'FIGMA — designing before building' },
        { name: 'AI TOOLS', desc: 'AI TOOLS — an unreasonable amount of AI tools' },
      ],
    },
  ],

  /* ── project modal content (cards live in index.html) ──────── */
  projects: {
    'neural-chatter': {
      type: '◉ AI PROJECT',
      title: 'NEURAL CHATTER',
      year: '2025',
      heroClass: 'mh-ai',
      overview:
        'An LLM-powered chat interface that refuses to be boring. Personality presets change tone, streaming makes replies feel alive, and the prompt playground lets you interrogate the model without writing a single API call by hand.',
      role: 'Design, prompting, front-end — the whole experiment.',
      stack: ['PYTHON', 'LLM APIS', 'JAVASCRIPT', 'STREAMING UX'],
      highlights: [
        'Streaming responses with a typing indicator that lies convincingly',
        'Three personality presets: Professor, Chaos Gremlin, Tired Intern',
        'Prompt history you can fork, edit and re-run',
        'Graceful failure states for when the model has opinions',
      ],
      stats: [
        { b: '∞', s: 'CONVERSATIONS' },
        { b: '3', s: 'PERSONALITIES' },
        { b: '0', s: 'BORING REPLIES' },
      ],
      links: [
        { label: 'VIEW CODE ↗', href: '#' },
        { label: 'LIVE DEMO ↗', href: '#' },
      ],
    },
    'pulseboard': {
      type: '▚ DATA PROJECT',
      title: 'PULSEBOARD',
      year: '2024',
      heroClass: 'mh-data',
      overview:
        'A dashboard that treats messy CSVs like raw material, not obstacles. Drop in data, get living visual stories: auto-suggested charts, filters that actually filter, and numbers that update without a page reload.',
      role: 'Data modeling, processing pipeline, dashboard UI.',
      stack: ['PYTHON', 'PANDAS', 'VISUALIZATION', 'CSV WRANGLING'],
      highlights: [
        'Auto-chart suggestions based on column types',
        '84k+ rows processed without the browser filing a complaint',
        'Dark mode first — analysts are nocturnal',
        'Export any view as a clean PNG for slides',
      ],
      stats: [
        { b: '84K+', s: 'ROWS HANDLED' },
        { b: '7', s: 'CHART TYPES' },
        { b: '1', s: 'DROP ZONE' },
      ],
      links: [
        { label: 'VIEW CODE ↗', href: '#' },
        { label: 'LIVE DEMO ↗', href: '#' },
      ],
    },
    'funky-framework': {
      type: '▶ WEB PROJECT',
      title: 'FUNKY.FRAMEWORK',
      year: '2025',
      heroClass: 'mh-web',
      overview:
        'An experimental motion library born from this very portfolio: scroll effects, cursor toys, magnetic buttons and typographic chaos — packaged so other sites can be weird too. Minimal JS, maximum personality.',
      role: 'Everything. It’s a framework, not a committee.',
      stack: ['JAVASCRIPT', 'CSS', 'GSAP', 'SCROLL APIs'],
      highlights: [
        'Kinetic typography primitives (split, drift, scramble)',
        'Magnetic + tilt interactions with zero config',
        'Scroll-driven section choreography',
        'Respects prefers-reduced-motion out of the box',
      ],
      stats: [
        { b: '14', s: 'EFFECTS' },
        { b: '0', s: 'DEPENDENCIES' },
        { b: '60', s: 'FPS TARGET' },
      ],
      links: [
        { label: 'VIEW CODE ↗', href: '#' },
        { label: 'DOCS ↗', href: '#' },
      ],
    },
    'chaosbot': {
      type: '⚡ HACKATHON — 48H',
      title: 'CHAOSBOT-48H',
      year: '2025',
      heroClass: 'mh-hack',
      overview:
        'A 48-hour hackathon build: an AI agent that plans your day, writes your emails and occasionally roasts your calendar. It didn’t win “most polished” — it won “most alive”. Two nights, four energy drinks, one working demo.',
      role: 'Agent logic, integrations, sleep deprivation.',
      stack: ['PYTHON', 'AI AGENTS', 'APIS', 'CAFFEINE'],
      highlights: [
        'Plans tasks, then re-plans them when you ignore the plan',
        'Email drafts with adjustable sincerity levels',
        'Built and demoed inside the 48-hour window',
        'Zero unit tests, infinite confidence',
      ],
      stats: [
        { b: '48H', s: 'BUILD TIME' },
        { b: '4', s: 'ENERGY DRINKS' },
        { b: '1', s: 'WORKING DEMO' },
      ],
      links: [
        { label: 'VIEW CODE ↗', href: '#' },
        { label: 'DEVPOST ↗', href: '#' },
      ],
    },
    'pixelplay': {
      type: '✦ CREATIVE PROJECT',
      title: 'PIXELPLAY',
      year: '2026',
      heroClass: 'mh-creative',
      overview:
        'A toy box of generative art: blob makers with draggable control points, gradient mixers that spit out palettes, and a stochastic sticker printer that exports SVGs. Built because uniformity is boring.',
      role: 'Concept, algorithms, obsessive color tuning.',
      stack: ['CANVAS', 'JAVASCRIPT', 'MATH.RANDOM()', 'SVG EXPORT'],
      highlights: [
        'Blob editor with organic morphing math',
        'Palette mixer that always keeps contrast readable',
        'One-click SVG export for design tools',
        'Seeded randomness — share your chaos via URL',
      ],
      stats: [
        { b: '∞', s: 'BLOBS' },
        { b: '12', s: 'TOYS' },
        { b: '1', s: 'CLICK EXPORT' },
      ],
      links: [
        { label: 'VIEW CODE ↗', href: '#' },
        { label: 'PLAY ↗', href: '#' },
      ],
    },
  },

  /* ── playground ────────────────────────────────────────────── */
  phrases: [
    'pixels are just tiny vibes',
    'bugs are features with trust issues',
    'the scroll never lies',
    'CSS is a lifestyle, not a language',
    'somewhere, a div is still not centered',
    'my code works and I have no idea why',
    'make weird things on purpose',
    'AI asked me to slow down. I refused.',
    'every gradient deserves a second chance',
    'ship it. ship it now. okay, tomorrow.',
  ],

  sysMsgs: [
    '> user detected: having fun ✓',
    '> playground.exe is running…',
    '> tip: the stickers are draggable',
    '> tip: type “funky” anywhere',
    '> status: sufficiently weird',
  ],
};
