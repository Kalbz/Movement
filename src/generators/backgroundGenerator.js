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
import trianglify from "trianglify";
import themeColors from "../components/themeColors.js";
import { fetchThemedImage, getColorFromTheme } from "./colorImageGenerator.js"; // adjust path if needed

const themes = [
  "abstract", "minimal", "pattern", "texture", "illustration", "gradient", "geometric",
  "nature", "mountains", "forest", "ocean", "sunset", "sky", "water",
   "architecture", "buildings", "street", "interior", "bridge",
  "people", "fashion", "fitness", "work", "technology",
  "startup", "coding", "office", "computer", "ai", "robot",
  "blue", "pink", "black", "white", "pastel", "neon",
  "vintage", "aesthetic", "surreal", "macro", "bokeh", "flat lay", "3d render"
];

export async function randomBackground(selector = "body") {
  const theme = document.documentElement.getAttribute("data-theme") || "light";
  const palette = themeColors[theme] || [
    "#ffffff",
    "#e8e8e8",
    "#d1d1d1",
    "#3b82f6",
    "#9333ea",
  ];

  const target = document.querySelector(selector);
  if (!target) return;

  // Clean up any existing canvas or background
  document.querySelectorAll("canvas.trianglify-bg").forEach(el => el.remove());
  target.style.backgroundImage = "";
  target.style.background = "";

  const mode = ["trianglify", "gradient", "plain", "image"][Math.floor(Math.random() * 4)];

if (mode === "trianglify") {
  const seedArray = new Uint32Array(1);
  crypto.getRandomValues(seedArray); // Better random seed
  const seed = seedArray[0].toString();

  const pattern = trianglify({
    width: window.innerWidth,
    height: window.innerHeight,
    cellSize: Math.floor(Math.random() * 50) + 40,      // 40–90
    variance: Math.random() * 1.2,                      // 0.0–1.2
    strokeWidth: Math.floor(Math.random() * 2.5) + 0.5, // 0.5–2.5
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
    const count = Math.floor(Math.random() * 4) + 2; // 2–5 colors
    const colors = shuffleArray(palette).slice(0, count);
    const angle = Math.floor(Math.random() * 360);
    target.style.backgroundImage = `linear-gradient(${angle}deg, ${colors.join(", ")})`;

  } else if (mode === "plain") {
    const color = palette[Math.random() < 0.5 ? 3 : 4];
    target.style.background = color;

  } else if (mode === "image") {


const randomTheme = themes[Math.floor(Math.random() * themes.length)];
const imageUrl = await fetchThemedImage(theme, randomTheme);
console.log(randomTheme, "this is the theme chosen");
    if (imageUrl) {
target.style.backgroundImage = `url("${imageUrl}")`;
target.style.backgroundRepeat = "no-repeat";
target.style.backgroundSize = "cover";
target.style.backgroundPosition = "center";
target.style.imageRendering = "auto"; // ← Let the browser optimize

    } else {
      // fallback to plain color
      const fallback = getColorFromTheme(theme);
      target.style.background = fallback;
    }
  }
}

// Utility to shuffle colors
function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function rotateAndJitterPalette(palette) {
  const offset = Math.floor(Math.random() * palette.length);
  const rotated = [...palette.slice(offset), ...palette.slice(0, offset)];

  return rotated.map(hex => jitterColor(hex, 10)); // 10 = max 10% lightness shift
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
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0));
    else if (max === g) h = ((b - r) / d + 2);
    else if (max === b) h = ((r - g) / d + 4);
    h /= 6;
  } else {
    s = 0;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToHex({ h, s, l }) {
  s /= 100; l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c/2;
  let r = 0, g = 0, b = 0;

  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  return "#" + [r, g, b].map(n =>
    Math.round((n + m) * 255).toString(16).padStart(2, "0")
  ).join("");
}
