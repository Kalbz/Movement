// Sections extracted/adapted from your old React component
// Portable DOM factories (no React) with Tailwind/daisyUI classes
// -----------------------------------------------------------------
// Exports:
//  - createHeroSection({ variant, name, role, headline, withBlobs })
//  - createAboutSection({ style })
//  - createContactSection()
// Optional: pass rng to get deterministic variants (seeded).

import themeBaseColors from "../components/themeColors";

import { getCurrentTheme } from "./colorImageGenerator";

const themeName = getCurrentTheme();
const colors = themeBaseColors[themeName] || [];
const [ , , , primary, secondary ] = colors;

// --- tiny util rng (optional) ---
function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export function rngFromSeed(seed) {
  const h = Array.from(String(seed)).reduce((a, c) => ((a ^ c.charCodeAt(0)) * 16777619) >>> 0, 2166136261);
  return mulberry32(h);
}

// --- Blob ornament (copied from portfolio and DOM-ified) ---
function blobPath(rng, points = 9, radius = 120) {
  const pts = [];
  const jitter = radius * 0.3;
  for (let i = 0; i < points; i++) {
    const a = (i / points) * Math.PI * 2;
    const r = radius + (rng() - 0.5) * jitter;
    pts.push([Math.cos(a) * r, Math.sin(a) * r]);
  }
  const cr2b = (p0, p1, p2, p3) => [
    p1,
    [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6],
    [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6],
    p2,
  ];
  const d = [];
  for (let i = 0; i < pts.length; i++) {
    const p0 = pts[(i - 1 + pts.length) % pts.length];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % pts.length];
    const p3 = pts[(i + 2) % pts.length];
    const [m, c1, c2, n] = cr2b(p0, p1, p2, p3);
    d.push(i === 0 ? `M ${m[0]},${m[1]}` : "");
    d.push(`C ${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${n[0]},${n[1]}`);
  }
  d.push("Z");
  return d.join(" ");
}

function makeBlobSVG({ rng, size = 280, className = "", opacity = 0.12 }) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", `${-size / 2} ${-size / 2} ${size} ${size}`);
  if (className) svg.setAttribute("class", className);
  const path = document.createElementNS(svg.namespaceURI, "path");
  path.setAttribute("d", blobPath(rng, 9 + Math.floor(rng() * 6), size / 2));
  path.setAttribute("fill", "currentColor");
  path.setAttribute("opacity", String(opacity));
  svg.appendChild(path);
  return svg;
}

// --- HERO (variants: center | split | left) ---
export function createHeroSection({
  variant = "center",
  name = "Your Name",
  role = "Creative Engineer",
  headline,
  withBlobs = true,
  seed,
} = {}) {
  const rng = seed != null ? rngFromSeed(seed) : Math.random;

  const section = document.createElement("section");
  section.className = "relative overflow-hidden rounded-3xl p-6 sm:p-10 bg-base-200 shadow-xl text-left";

  if (withBlobs) {
    const b1 = makeBlobSVG({ rng, size: 288, className: "absolute -left-20 -top-20 w-72 text-primary" });
    const b2 = makeBlobSVG({ rng, size: 320, className: "absolute -right-16 bottom-0 w-80 text-secondary" });
    b2.querySelector("path").setAttribute("opacity", "0.09");
    section.appendChild(b1);
    section.appendChild(b2);
  }

  // Headline generator (if none provided)
  function rand(arr) { return arr[Math.floor((seed != null ? rng() : Math.random()) * arr.length)]; }
  const finalHeadline = headline || [rand(["I build", "I craft", "I design", "I prototype"]), rand(["dynamic", "living", "playful", "expressive", "procedural"]), rand(["experiences", "interfaces", "tools", "web art"])].join(" ");

  if (variant === "center") {
    const wrap = document.createElement("div");
    wrap.className = "text-center space-y-4";
    wrap.innerHTML = `
      <div class="badge badge-outline">${role}</div>
      <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight">${finalHeadline}</h1>
      <p class="opacity-80 max-w-2xl mx-auto">Hi, I'm ${name}. This portfolio reimagines itself on each load, blending code and design into a cohesive, generative identity.</p>
      <div class="join">
        <a href="#projects" class="btn btn-primary join-item">See Work</a>
        <a href="#contact" class="btn btn-ghost join-item">Contact</a>
      </div>`;
    section.appendChild(wrap);
    return section;
  }

  if (variant === "split") {
    const grid = document.createElement("div");
    grid.className = "grid grid-cols-1 md:grid-cols-2 gap-8 items-center";
    const left = document.createElement("div");
    left.className = "space-y-4";
    left.innerHTML = `
      <h1 class="text-4xl sm:text-5xl font-extrabold leading-tight">${finalHeadline}</h1>
      <p class="opacity-80">Generative themes, gradients, FX, and motion—each visit presents a new composition.</p>
      <a href="#projects" class="btn btn-primary">Explore Projects</a>`;

    const right = document.createElement("div");
    right.className = "relative h-56 sm:h-72";
    const pane = document.createElement("div");
    pane.className = "absolute inset-0 rounded-2xl bg-base-100/40 backdrop-blur shadow-2xl";
    right.appendChild(pane);
    const gridMini = document.createElement("div");
    gridMini.className = "absolute inset-0 grid grid-cols-3 gap-3 p-3";
for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.className = "rounded-xl shadow";

  // gradient step (0 → primary, 1 → secondary)
  const t = i / 8; // 0.0 to 1.0 across 9 cells
  const color = lerpColor(primary, secondary, t);

  cell.style.background = color;
  gridMini.appendChild(cell);
}
    right.appendChild(gridMini);

    grid.append(left, right);
    section.appendChild(grid);
    return section;
  }

  // variant: left
  const wrap = document.createElement("div");
  wrap.className = "max-w-3xl";
  wrap.innerHTML = `
    <h1 class="text-5xl sm:text-6xl font-black leading-[1.05]">${finalHeadline}</h1>
    <p class="mt-4 opacity-80">A procedural portfolio that balances randomness with design constraints.</p>
    <div class="mt-6 flex gap-3">
      <a class="btn btn-primary" href="#projects">Projects</a>
      <a class="btn" href="#about">About</a>
    </div>`;
  section.appendChild(wrap);
  return section;
}

// --- ABOUT (styles: simple | columns | cards) ---
export function createAboutSection({ style = "columns", seed, withBlob = true } = {}) {
  const rng = seed != null ? rngFromSeed(seed) : Math.random;
  const section = document.createElement("section");
  section.id = "about";
  section.className = "relative rounded-3xl p-6 sm:p-10 bg-base-200 overflow-hidden text-left";

  if (withBlob) {
    const blob = makeBlobSVG({ rng, size: 384, className: "absolute right-0 -bottom-12 w-96 text-primary" });
    blob.querySelector("path").setAttribute("opacity", "0.08");
    section.appendChild(blob);
  }

  const head = document.createElement("div");
  head.className = "flex items-baseline justify-between";
  head.innerHTML = `<h2 class="text-2xl sm:text-3xl font-extrabold">About</h2><span class="opacity-60 text-sm">style: ${style}</span>`;
  section.appendChild(head);

  if (style === "simple") {
    const p = document.createElement("p");
    p.className = "mt-4 max-w-3xl opacity-80";
    p.textContent = "I explore the space between design and code, building tools and interfaces that balance randomness with structure. My work leans into generative systems, visual computing, and playful UX.";
    section.appendChild(p);
    return section;
  }

  if (style === "columns") {
    const grid = document.createElement("div");
    grid.className = "mt-4 grid sm:grid-cols-2 gap-6";
    const p1 = document.createElement("p");
    p1.className = "opacity-80";
    p1.textContent = "I am a 24-year-old Software Engineering student. I love being able to combine creative elements in both my work and hobbies. In my free time I spend loads of time learning and building projects around various technology, digital art, 3D modeling and web development.";
    const p2 = document.createElement("p");
    p2.className = "opacity-80";
    p2.textContent = "Recently I’ve explored SVG geometry, canvas shaders, and procedural layouts that feel deliberate, not chaotic.";
    grid.append(p1, p2);
    section.appendChild(grid);
    return section;
  }

  // cards
  const cardsWrap = document.createElement("div");
  cardsWrap.className = "mt-6 grid sm:grid-cols-3 gap-4";
  const data = [
    { h: "Generative Design", p: "Pattern systems, palettes, blobs" },
    { h: "Visual Computing", p: "Canvas, shaders, motion" },
    { h: "UI/UX", p: "Playful, intentional interfaces" },
  ];
  data.forEach((c) => {
    const card = document.createElement("div");
    card.className = "rounded-2xl p-4 bg-base-100 border border-base-content/10";
    card.innerHTML = `<h3 class="font-bold">${c.h}</h3><p class="text-sm opacity-80">${c.p}</p>`;
    cardsWrap.appendChild(card);
  });
  section.appendChild(cardsWrap);
  return section;
}

// --- CONTACT ---
export function createContactSection() {
  const section = document.createElement("section");
  section.id = "contact";
  section.className = "text-center w-full";
  const box = document.createElement("div");
  box.className = "rounded-3xl p-8 bg-base-200 max-w-6xl mx-auto";
  box.innerHTML = `
    <h2 class="text-2xl sm:text-3xl font-extrabold">Contact</h2>
    <p class="opacity-80 mt-2">Open to collaborations, experiments, and good ideas.</p>
    <div class="mt-4 join">
      <a class="btn join-item" href="https://www.youtube.com/@KalleEngblom" target="_blank" rel="noopener noreferrer">Youtube</a>
      <a class="btn join-item" href="https://github.com/Kalbz" target="_blank" rel="noopener noreferrer">GitHub</a>
      <a class="btn join-item" href="https://www.linkedin.com/in/kalle-engblom-764555240/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
    </div>`;
  section.appendChild(box);
  return section;
}

// --- Integration helpers ---
export function registerSectionsInFactory(createComponentFromName) {
  // Call this once to add handlers for these three types
  // Example usage in your switch: add cases "HeroSection", "AboutSection", "ContactSection"
}


// --- DEFAULT PROJECTS (shared) ---
export const DEFAULT_PROJECTS = [
  { 
    title: "SVGEN", 
    tags: ["SVG", "Procedural", "Art"], 
    desc: "Interactive SVG shape generator for blobs, waves, scatter patterns, and more. Includes random themes, layered styles, and live preview with downloads.", 
    link: "https://github.com/Kalbz/svgen" 
  },
  { 
    title: "IBeeas",         
    tags: ["App", "Creative", "Ideas"],        
    desc: "A bee-themed Flutter app for storing personal ideas and sharing them with others. Built with Firebase for real-time sync and authentication.",        
    link: "https://github.com/Kalbz/ibeeas" 
  },
  { 
    title: "Soundely",  
    tags: ["Audio", "Visualizer", "Creative"],           
    desc: "An experimental p5.js audio visualizer that transforms sound into colorful, abstract shapes. Supports mic input and multiple drawing modes.", 
    link: "https://github.com/Kalbz/soundely" 
  },
  { 
    title: "Chess-Project",                
    tags: ["Machine Learning", "Chess", "AI"],               
    desc: "A machine learning chess engine trained on millions of positions using Random Forest models. Supports training, evaluation, and gameplay.",     
    link: "https://github.com/Loadeumn/Chess-Project" 
  },
  { 
    title: "Cognitive Behavioral Therapy Game",                
    tags: ["Game", "Wellness", "Unity"],               
    desc: "An interactive Unity game promoting mindfulness and positive thinking. Includes mini-games focused on concentration, breathing, and optimism.",     
    link: "https://github.com/Kalbz/CBT" 
  },
  { 
    title: "Random Portfolio",                
    tags: ["Web", "Creative", "Procedural"],               
    desc: "A dynamic portfolio website that procedurally generates layouts, making every visit unique and playful.",     
    link: "https://github.com/Kalbz/Movement" 
  },
];


// small helper
function pick(rng, arr) { return arr[Math.floor(rng() * arr.length)]; }

function createProjectCard(project, rng) {
  const flare = pick(rng, ["ring", "shadow", "border"]);
  const cls   = flare === "ring" ? "ring-1 ring-base-content/10"
             : flare === "shadow" ? "shadow-xl"
             : "border border-base-content/10";

  const a = document.createElement("a");
  a.href = project.link || "#";
  a.target ="_blank";
  a.rel = "noopener noreferrer";
  a.className = `group block rounded-2xl p-5 bg-base-100 ${cls} hover:-translate-y-0.5 transition-transform`;

  const tagsRow = document.createElement("div");
  tagsRow.className = "flex items-center gap-2 text-sm opacity-70";
  (project.tags || []).forEach((t) => {
    const badge = document.createElement("span");
    badge.className = "badge badge-ghost";
    badge.textContent = t;
    tagsRow.appendChild(badge);
  });

  const h3 = document.createElement("h3");
  h3.className = "mt-2 text-xl font-bold group-hover:underline underline-offset-4";
  h3.textContent = project.title || "Untitled Project";

  const p = document.createElement("p");
  p.className = "opacity-80 text-sm mt-1";
  p.textContent = project.desc || "";

  a.append(tagsRow, h3, p);
  return a;
}

/**
 * Projects section (layouts: grid | masonry | spotlight)
 * Accepts:
 *   - layout: "grid" | "masonry" | "spotlight" (optional; random if omitted)
 *   - projects: array (optional; defaults to DEFAULT_PROJECTS)
 *   - withHeader: boolean (default true)
 *   - seed: number|string (optional; for deterministic layout/flair)
 */
export function createProjectsSection({
  layout,
  projects = DEFAULT_PROJECTS,
  withHeader = true,
  seed,
} = {}) {
  const rng = seed != null ? rngFromSeed(seed) : Math.random;

  const section = document.createElement("section");
  section.id = "projects";
  section.className = "space-y-6 text-left"; // keep page-wide text-center from app scoped; force local left

  if (!layout) layout = pick(rng, ["grid", "masonry", "spotlight"]);

  if (withHeader) {
    const head = document.createElement("div");
    head.className = "flex items-baseline justify-between";
    head.innerHTML = `
      <h2 class="text-2xl sm:text-3xl font-extrabold">Selected Projects</h2>`;
    section.appendChild(head);
  }

  if (layout === "grid") {
    const grid = document.createElement("div");
    grid.className = "grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    projects.forEach((p) => grid.appendChild(createProjectCard(p, rng)));
    section.appendChild(grid);
    return section;
  }

  if (layout === "masonry") {
    const colWrap = document.createElement("div");
    colWrap.className = "columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]";
    const inner = document.createElement("div");
    inner.className = "contents";
    projects.forEach((p) => {
      const wrapper = document.createElement("div");
      wrapper.className = "mb-5 break-inside-avoid";
      wrapper.appendChild(createProjectCard(p, rng));
      inner.appendChild(wrapper);
    });
    colWrap.appendChild(inner);
    section.appendChild(colWrap);
    return section;
  }
  //update this later 
  // spotlight
  const [first, ...rest] = projects;
  const grid = document.createElement("div");
  grid.className = "grid grid-cols-1 lg:grid-cols-3 gap-6";

  const big = document.createElement("div");
  big.className = "lg:col-span-2";
  big.appendChild(createProjectCard(first || {}, rng));
  grid.appendChild(big);

  const small = document.createElement("div");
  small.className = "grid grid-cols-1 gap-6";
  rest.forEach((p) => small.appendChild(createProjectCard(p, rng)));
  grid.appendChild(small);

  section.appendChild(grid);
  return section;
}



function lerpColor(a, b, t) {
  const ah = parseInt(a.replace("#", ""), 16),
        ar = ah >> 16, ag = (ah >> 8) & 0xff, ab = ah & 0xff;
  const bh = parseInt(b.replace("#", ""), 16),
        br = bh >> 16, bg = (bh >> 8) & 0xff, bb = bh & 0xff;
  const rr = Math.round(ar + t * (br - ar));
  const rg = Math.round(ag + t * (bg - ag));
  const rb = Math.round(ab + t * (bb - ab));
  return `rgb(${rr},${rg},${rb})`;
}