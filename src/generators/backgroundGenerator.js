// import trianglify from "trianglify";
// import themeColors from "../components/themeColors.js";

// export function randomBackground(selector = "body") {
//   const theme = document.documentElement.getAttribute("data-theme") || "light";
//   const palette = themeColors[theme] || [
//     "#ffffff",
//     "#e8e8e8",
//     "#d1d1d1",
//     "#3b82f6",
//     "#9333ea",
//   ];

//   const pattern = trianglify({
//     width: window.innerWidth,
//     height: window.innerHeight,
//     cellSize: 60,
//     variance: 0.8,
//     strokeWidth: 1,
//     seed: Math.random().toString(),
//     xColors: palette,
//     yColors: "match",
//   });

//   const canvas = pattern.toCanvas();
//   canvas.style.position = "absolute";
//   canvas.style.top = "0";
//   canvas.style.left = "0";
//   canvas.style.zIndex = -1;
//   document.body.appendChild(canvas);

//   const svg = new XMLSerializer().serializeToString(pattern.toSVG());
//   const uri = `data:image/svg+xml;base64,${btoa(svg)}`;
//   document
//     .querySelector(selector)
//     ?.style.setProperty("background-image", `url("${uri}")`);
//   document
//     .querySelector(selector)
//     ?.style.setProperty("background-repeat", "repeat-x");
// }

// Old^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// randomBackgroundPro.js
import trianglify from "trianglify";
import themeColors from "../components/themeColors.js";
import { fetchThemedImage, getColorFromTheme } from "./colorImageGenerator.js";

// Utility: shuffle & helpers
function shuffleArray(arr) { return [...arr].sort(() => Math.random() - 0.5); }

function rotateAndJitterPalette(palette) {
  const offset = Math.floor(Math.random() * palette.length);
  const rotated = [...palette.slice(offset), ...palette.slice(0, offset)];
  return rotated.map(hex => jitterColor(hex, 10));
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
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h /= 6;
  }
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
  return "#" + [r, g, b].map(n => Math.round((n + m) * 255).toString(16).padStart(2, "0")).join("");
}

// // New: SVG dots background (portfolio-style)
// function applyDotsBackground(target, { opacity = 0.12 } = {}) {
//   const size = 40 + Math.floor(Math.random() * 60);
//   const r = 1 + Math.floor(Math.random() * 2);
//   const translate = 10 + Math.random() * 30;
//   const speed = 5000 + Math.floor(Math.random() * 6000);

//   const svg = `
// <svg xmlns="http://www.w3.org/2000/svg" class="trianglify-bg" style="position:absolute;inset:0;z-index:-1;animation:bgdrift ${speed}ms linear infinite">
//   <defs>
//     <pattern id="dots" x="0" y="0" width="${size}" height="${size}" patternUnits="userSpaceOnUse">
//       <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="currentColor" opacity="${opacity}"/>
//     </pattern>
//   </defs>
//   <rect width="100%" height="100%" fill="url(#dots)" class="text-black" transform="translate(${translate}, ${translate})" />
//   <style>
//     @keyframes bgdrift { 0% { transform: translate(0,0); } 50% { transform: translate(-2%, -2%);} 100% { transform: translate(0,0);} }
//   </style>
// </svg>`;
//   const div = document.createElement("div");
//   div.innerHTML = svg.trim();
//   target.appendChild(div.firstChild);
// }

export async function randomBackground(selector = "body", opts = {}) {
  const target = document.querySelector(selector);
  if (!target) return;

  // Theme & palette
  const theme = document.documentElement.getAttribute("data-theme") || "light";
  const palette = themeColors[theme] || ["#ffffff", "#e8e8e8", "#d1d1d1", "#3b82f6", "#9333ea"];

  // Cleanup old BG
  document.querySelectorAll("canvas.trianglify-bg, svg.trianglify-bg").forEach(el => el.remove());
  target.style.backgroundImage = "";
  target.style.background = "";

  const mode = opts.mode || ["trianglify", "gradient", "plain", "image"][Math.floor(Math.random() * 4)];

  if (mode === "trianglify") {
    const seedArray = new Uint32Array(1);
    crypto.getRandomValues(seedArray);
    const seed = seedArray[0].toString();

    const pattern = trianglify({
      width: window.innerWidth,
      height: window.innerHeight,
      cellSize: Math.floor(Math.random() * 50) + 40,
      variance: Math.random() * 1.2,
      strokeWidth: Math.floor(Math.random() * 2.5) + 0.5,
      seed,
      xColors: rotateAndJitterPalette(palette),
      yColors: "match",
    });

    const canvas = pattern.toCanvas();
    canvas.classList.add("trianglify-bg");
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.zIndex = -1;
    document.body.appendChild(canvas);

    const svg = new XMLSerializer().serializeToString(pattern.toSVG());
    const uri = `data:image/svg+xml;base64,${btoa(svg)}`;
    target.style.backgroundImage = `url("${uri}")`;
    target.style.backgroundRepeat = "repeat-x";

  } else if (mode === "gradient") {
    const count = Math.floor(Math.random() * 4) + 2;
    const colors = shuffleArray(palette).slice(0, count);
    const angle = Math.floor(Math.random() * 360);
    target.style.backgroundImage = `linear-gradient(${angle}deg, ${colors.join(", ")})`;

  } else if (mode === "plain") {
    const color = palette[Math.random() < 0.5 ? 3 : 4];
    target.style.background = color;

  // } else if (mode === "dots") {
  //   applyDotsBackground(document.body, { opacity: 0.9 });

  } else if (mode === "image") {
    const themes = [
      "abstract","minimal","pattern","texture","illustration","gradient","geometric",
      "nature","mountains","forest","ocean","sunset","sky","water",
      "architecture","buildings","street","interior","bridge",
      "people","fashion","fitness","work","technology",
      "startup","coding","office","computer","ai","robot",
      "blue","pink","black","white","pastel","neon",
      "vintage","aesthetic","surreal","macro","bokeh","flat lay","3d render"
    ];
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    const imageUrl = await fetchThemedImage(theme, randomTheme);
    if (imageUrl) {
      target.style.backgroundImage = `url("${imageUrl}")`;
      target.style.backgroundRepeat = "no-repeat";
      target.style.backgroundSize = "cover";
      target.style.backgroundPosition = "center";
      target.style.imageRendering = "auto";
    } else {
      target.style.background = getColorFromTheme(theme);
    }
  }
}
