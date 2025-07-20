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

export function randomBackground(selector = "body") {
  const theme = document.documentElement.getAttribute("data-theme") || "light";
  const palette = themeColors[theme] || [
    "#ffffff",
    "#e8e8e8",
    "#d1d1d1",
    "#3b82f6",
    "#9333ea",
  ];

  const mode = ["trianglify", "gradient", "plain"][Math.floor(Math.random() * 3)];
  const target = document.querySelector(selector);
  if (!target) return;

  // Clean up old background
  document.querySelectorAll("canvas.trianglify-bg").forEach(el => el.remove());
  target.style.backgroundImage = "";
  target.style.background = "";

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
    const count = Math.floor(Math.random() * 4) + 2; // 2 to 5 colors
    const colors = shuffleArray(palette).slice(0, count);
    const angle = Math.floor(Math.random() * 360);
    target.style.backgroundImage = `linear-gradient(${angle}deg, ${colors.join(", ")})`;

  } else if (mode === "plain") {
    const color = palette[Math.random() < 0.5 ? 3 : 4]; // index 3 or 4
    target.style.background = color;
  }
}

// Utility to shuffle colors
function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}
