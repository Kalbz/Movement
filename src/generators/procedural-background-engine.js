// Procedural Background Engine (drop-in for your current project)
// -----------------------------------------------------------------------------
// Purpose: Bring the DynamicPortfolio background features (seeded palettes,
// gradient/dots/plain, noise overlay, rain FX, blobs, URL seed locking) to your
// existing non-React background generator that already supports trianglify and
// themed images.
//
// Compatible with your current imports:
//   import trianglify from "trianglify";
//   import themeColors from "../components/themeColors.js";
//   import { fetchThemedImage, getColorFromTheme } from "./colorImageGenerator.js";
//
// Usage example:
//   import { randomBackground } from "./procedural-background-engine.js";
//   // basic
//   randomBackground("body");
//   // with options
//   randomBackground("body", { mode: "auto", lockToURLParam: "bgSeed", enableNoise: true, enableRain: true, ornaments: { blobs: true } });
//
// Notes:
// - Reproducibility: pass a `seed`, or set `lockToURLParam: "bgSeed"` to read/write ?bgSeed=...
// - Modes: "trianglify" | "gradient" | "plain" | "image" | "dots" | "auto"
// - Cleans up old canvases/overlays each call.

import trianglify from "trianglify";
import themeColors from "../components/themeColors.js";
import { fetchThemedImage, getColorFromTheme } from "./colorImageGenerator.js"; // adjust path if needed

// ------------------------------ Utilities ------------------------------ //
function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashStringToSeed(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return h >>> 0;
}

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const pick = (rng, arr) => arr[Math.floor(rng() * arr.length) % arr.length];
const shuffle = (rng, arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

function hsl(h, s, l, a = 1) {
  return `hsla(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%, ${a})`;
}

function paletteFromSeed(rng) {
  // Generate a tasteful triad/analogous/mono palette in HSL
  const baseH = Math.floor(rng() * 360);
  const mode = pick(rng, ["triad", "analogous", "mono"]);
  const s = clamp(55 + rng() * 30, 40, 95);
  const l = clamp(45 + rng() * 20, 30, 80);
  const shift = (deg) => (baseH + deg + 360) % 360;
  let hues;
  if (mode === "triad") hues = [0, 120, 240].map((d) => shift(d + rng() * 10));
  else if (mode === "analogous") hues = [-25, 0, 25].map((d) => shift(d + rng() * 6));
  else hues = [0, 5, 10].map((d) => shift(d + rng() * 3));

  const colors = hues.map((hue) => hsl(hue, s, l));
  const accents = hues.map((hue) => hsl((hue + 180) % 360, s * 0.9, clamp(l * 0.9, 30, 70)));
  const neutrals = [hsl(baseH, 12, 94), hsl(baseH, 10, 16)];
  return { baseH, mode, colors, accents, neutrals };
}

function ensureStyleTag() {
  if (document.getElementById("pbx-styles")) return;
  const style = document.createElement("style");
  style.id = "pbx-styles";
  style.textContent = `
  @keyframes pbx-bgdrift { 0% { transform: translate(0,0); } 50% { transform: translate(-2%, -2%);} 100% { transform: translate(0,0);} }
  .pbx-noise { pointer-events:none; position:fixed; inset:0; opacity:.20; mix-blend-mode:overlay; z-index:-1; }
  .pbx-rain { pointer-events:none; position:fixed; inset:0; z-index:-1; transition:opacity 600ms ease; }
  .pbx-ornament { position:absolute; z-index:0; pointer-events:none; }
  `;
  document.head.appendChild(style);
}

function removeExistingArtifacts(target) {
  document.querySelectorAll("canvas.trianglify-bg, .pbx-noise, .pbx-rain, .pbx-dots, .pbx-blob").forEach((el) => el.remove());
  // Reset background on target
  target.style.background = "";
  target.style.backgroundImage = "";
  target.style.backgroundRepeat = "";
  target.style.backgroundSize = "";
  target.style.backgroundPosition = "";
  target.style.imageRendering = "";
}

function getThemePalette(theme) {
  return themeColors[theme] || ["#ffffff", "#e8e8e8", "#d1d1d1", "#3b82f6", "#9333ea"];
}

// ------------------------------ Background Makers ------------------------------ //
function makeGradientBackground(target, palette, rng) {
  const stops = 2 + Math.floor(rng() * 3); // 2–4
  const colors = shuffle(rng, palette).slice(0, stops);
  const angle = Math.floor(rng() * 360);
  target.style.backgroundImage = `linear-gradient(${angle}deg, ${colors.join(", ")})`;
}

function makeDotsBackground(target, rng) {
  const size = 40 + Math.floor(rng() * 60);
  const r = 1 + Math.floor(rng() * 2);
  const opacity = 0.09 + rng() * 0.06;
  const translate = 10 + rng() * 30;
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "pbx-dots");
  svg.style.position = "fixed";
  svg.style.inset = "0";
  svg.style.zIndex = "-1";
  svg.style.animation = "pbx-bgdrift 8s linear infinite";
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  const defs = document.createElementNS(svg.namespaceURI, "defs");
  const pattern = document.createElementNS(svg.namespaceURI, "pattern");
  pattern.setAttribute("id", "pbx-dots-pattern");
  pattern.setAttribute("x", "0");
  pattern.setAttribute("y", "0");
  pattern.setAttribute("width", String(size));
  pattern.setAttribute("height", String(size));
  pattern.setAttribute("patternUnits", "userSpaceOnUse");
  const circle = document.createElementNS(svg.namespaceURI, "circle");
  circle.setAttribute("cx", String(size / 2));
  circle.setAttribute("cy", String(size / 2));
  circle.setAttribute("r", String(r));
  circle.setAttribute("fill", "currentColor");
  circle.setAttribute("opacity", String(opacity));
  pattern.appendChild(circle);
  defs.appendChild(pattern);
  svg.appendChild(defs);
  const rect = document.createElementNS(svg.namespaceURI, "rect");
  rect.setAttribute("width", "100%");
  rect.setAttribute("height", "100%");
  rect.setAttribute("fill", "url(#pbx-dots-pattern)");
  rect.setAttribute("transform", `translate(${translate}, ${translate})`);
  rect.setAttribute("class", "text-base-content");
  svg.appendChild(rect);
  document.body.appendChild(svg);
}

function addNoiseOverlay() {
  const div = document.createElement("div");
  div.className = "pbx-noise";
  div.style.backgroundImage = "url('data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 100 100\\'><filter id=\\'n\\'><feTurbulence baseFrequency=\\'0.65\\' numOctaves=\\'3\\' stitchTiles=\\'stitch\\'/></filter><rect width=\\'100%\\' height=\\'100%\\' filter=\\'url(%23n)\\'/></svg>')";
  document.body.appendChild(div);
}

function addRainCanvas(enabled) {
  if (!enabled) return;
  const canvas = document.createElement("canvas");
  canvas.className = "pbx-rain";
  canvas.style.opacity = "0.25";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  let w, h, raf;
  const drops = [];

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    w = canvas.width = window.innerWidth * dpr;
    h = canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
  }
  const rand = (min, max) => min + Math.random() * (max - min);
  function spawn() {
    for (let i = 0; i < 8; i++) {
      drops.push({ x: rand(0, w), y: -rand(0, h), z: rand(0.3, 1), len: rand(8, 18), vy: rand(3, 10) });
    }
  }
  function tick() {
    ctx.clearRect(0, 0, w, h);
    ctx.globalAlpha = 0.35;
    const root = getComputedStyle(document.documentElement);
    ctx.strokeStyle = root.getPropertyValue('--fallback-bc') || '#888';
    ctx.lineWidth = 1 * (window.devicePixelRatio || 1);
    for (const d of drops) {
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x, d.y + d.len * d.z * 2);
      ctx.stroke();
      d.y += d.vy * d.z * 2.2;
      d.x += 0.4 * d.z;
      if (d.y > h + 20) { d.y = -20; d.x = rand(0, w); }
    }
    if (drops.length < 220) spawn();
    raf = requestAnimationFrame(tick);
  }

  resize();
  window.addEventListener("resize", resize, { passive: true });
  tick();

  // Return disposer
  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
    canvas.remove();
  };
}

// Smooth organic blob path (SVG path string)
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

function addBlobOrnaments(rng) {
  const count = 1 + Math.floor(rng() * 3); // 1–3 blobs
  for (let i = 0; i < count; i++) {
    const size = 200 + Math.floor(rng() * 220);
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.classList.add("pbx-blob", "pbx-ornament");
    svg.setAttribute("viewBox", `${-size / 2} ${-size / 2} ${size} ${size}`);
    svg.style.left = `${Math.floor(rng() * 80) + 5}%`;
    svg.style.top = `${Math.floor(rng() * 70) + 5}%`;
    svg.style.width = `${size}px`;
    svg.style.height = `${size}px`;
    svg.style.opacity = String(0.08 + rng() * 0.1);
    const path = document.createElementNS(svg.namespaceURI, "path");
    path.setAttribute("d", blobPath(rng, 9 + Math.floor(rng() * 6), size / 2));
    path.setAttribute("fill", "currentColor");
    svg.appendChild(path);
    document.body.appendChild(svg);
  }
}

// ------------------------------ Public API ------------------------------ //
export async function randomBackground(selector = "body", options = {}) {
  ensureStyleTag();
  const target = document.querySelector(selector);
  if (!target) return;

  // URL seed locking
  const paramName = options.lockToURLParam;
  let seed = options.seed;
  const url = new URL(window.location.href);
  if (paramName) {
    const urlSeed = url.searchParams.get(paramName);
    if (seed == null && urlSeed) seed = urlSeed;
    if (seed != null && !urlSeed) {
      url.searchParams.set(paramName, String(seed));
      window.history.replaceState({}, "", url);
    }
  }

  if (seed == null) {
    // crypto-random seed for better entropy
    const seedArray = new Uint32Array(1);
    window.crypto.getRandomValues(seedArray);
    seed = String(seedArray[0]);
    if (paramName) {
      url.searchParams.set(paramName, String(seed));
      window.history.replaceState({}, "", url);
    }
  }

  const rng = mulberry32(hashStringToSeed(String(seed)));
  const theme = document.documentElement.getAttribute("data-theme") || "light";
  const themePalette = getThemePalette(theme);
  const procPalette = paletteFromSeed(rng);
  const mergedPalette = [
    // tasteful combo: seeded colors + theme colors
    ...procPalette.colors,
    ...procPalette.accents,
    ...themePalette,
  ];

  // Cleanup any prior background state
  removeExistingArtifacts(target);

  // Decide mode
  const modes = ["trianglify", "gradient", "plain", "image", "dots"];
  const mode = options.mode && options.mode !== "auto" ? options.mode : pick(rng, modes);

  if (mode === "trianglify") {
    const pattern = trianglify({
      width: window.innerWidth,
      height: window.innerHeight,
      cellSize: Math.floor(rng() * 50) + 40, // 40–90
      variance: rng() * 1.2,                 // 0.0–1.2
      strokeWidth: Math.floor(rng() * 2.5) + 0.5, // 0.5–2.5
      seed: String(seed),
      xColors: rotateAndJitterPalette(themePalette),
      yColors: "match",
    });

    const canvas = pattern.toCanvas();
    canvas.classList.add("trianglify-bg");
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.zIndex = "-1";
    document.body.appendChild(canvas);

    const svg = new XMLSerializer().serializeToString(pattern.toSVG());
    const uri = `data:image/svg+xml;base64,${btoa(svg)}`;
    target.style.backgroundImage = `url("${uri}")`;
    target.style.backgroundRepeat = "repeat-x";
  }
  else if (mode === "gradient") {
    makeGradientBackground(target, mergedPalette, rng);
  }
  else if (mode === "plain") {
    const fallbackIdx = rng() < 0.5 ? 3 : 4;
    const color = themePalette[Math.min(fallbackIdx, themePalette.length - 1)] || themePalette[0];
    target.style.background = color;
  }
  else if (mode === "image") {
    const themes = [
      "abstract","minimal","pattern","texture","illustration","gradient","geometric",
      "nature","mountains","forest","ocean","sunset","sky","water",
      "architecture","buildings","street","interior","bridge",
      "people","fashion","fitness","work","technology",
      "startup","coding","office","computer","ai","robot",
      "blue","pink","black","white","pastel","neon",
      "vintage","aesthetic","surreal","macro","bokeh","flat lay","3d render"
    ];
    const chosen = pick(rng, themes);
    const imageUrl = await fetchThemedImage(theme, chosen);
    if (imageUrl) {
      target.style.backgroundImage = `url("${imageUrl}")`;
      target.style.backgroundRepeat = "no-repeat";
      target.style.backgroundSize = "cover";
      target.style.backgroundPosition = "center";
      target.style.imageRendering = "auto";
    } else {
      const fallback = getColorFromTheme(theme);
      target.style.background = fallback;
    }
  }
  else if (mode === "dots") {
    makeDotsBackground(target, rng);
    // optionally tint with a subtle gradient underneath
    makeGradientBackground(target, mergedPalette, rng);
  }

  // Overlays & ornaments
  if (options.enableNoise ?? true) addNoiseOverlay();
  let disposeRain;
  if (options.enableRain ?? (rng() > 0.6)) disposeRain = addRainCanvas(true);
  if (options.ornaments?.blobs ?? true) addBlobOrnaments(rng);

  // Provide a disposer to the caller (optional)
  return () => {
    if (disposeRain) try { disposeRain(); } catch {}
    removeExistingArtifacts(target);
  };
}

// Helpers copied from your code and tweaked to be local
function rotateAndJitterPalette(palette) {
  const offset = Math.floor(Math.random() * palette.length);
  const rotated = [...palette.slice(offset), ...palette.slice(0, offset)];
  return rotated.map((hex) => jitterColor(hex, 10)); // 10% lightness shift
}

function jitterColor(hex, maxPercent) {
  const hsl = hexToHSL(hex);
  const jitter = (Math.random() * 2 - 1) * maxPercent;
  hsl.l = Math.min(100, Math.max(0, hsl.l + jitter));
  return hslToHex(hsl);
}

function hexToHSL(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else if (max === b) h = (r - g) / d + 4;
    h /= 6;
  } else { s = 0; }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToHex({ h, s, l }) {
  s /= 100; l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return "#" + [r, g, b].map((n) => Math.round((n + m) * 255).toString(16).padStart(2, "0")).join("");
}

export default randomBackground;
