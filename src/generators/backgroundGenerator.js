import trianglify from "trianglify";

export function randomBackground(targetSelector = "body") {
  const palettes = [
    "random",
    ["#ffafcc", "#ffc8dd", "#bde0fe"],
    ["#caffbf", "#9bf6ff", "#a0c4ff"],
    ["#fcd5ce", "#f8edeb", "#e8a598"]
  ];

  const xColors = palettes[Math.floor(Math.random() * palettes.length)];
  const yColors = xColors === "random" ? "random" : xColors;

  const pattern = trianglify({
    width: window.innerWidth,
    height: window.innerHeight,
    cellSize: Math.random() * 60 + 20,
    variance: Math.random(),
    seed: Math.random().toString(),
    xColors,
    yColors,
    colorSpace: "lab"
  });

  const svg = pattern.toSVG();
  const xml = new XMLSerializer().serializeToString(svg);
  const uri = `data:image/svg+xml;base64,${btoa(xml)}`;

  const elem = document.querySelector(targetSelector);
  if (elem) {
    Object.assign(elem.style, {
      backgroundImage: `url("${uri}")`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center"
    });
  }
}
