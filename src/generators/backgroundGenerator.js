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
    const pattern = trianglify({
      width: window.innerWidth,
      height: window.innerHeight,
      cellSize: 60,
      variance: 0.8,
      strokeWidth: 1,
      seed: Math.random().toString(),
      xColors: palette,
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
    const imageUrl = await fetchThemedImage(theme, "abstract");
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
