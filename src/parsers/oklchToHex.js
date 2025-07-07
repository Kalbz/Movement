import { parse, formatHex } from 'culori';

function getCSSVar(name) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

function toHex(cssColor) {
  const parsed = parse(cssColor);
  return parsed && formatHex(parsed);
}

const themes = [
  "light","dark","cupcake","bumblebee","emerald","corporate","synthwave",
  "retro","cyberpunk","valentine","halloween","garden","forest","aqua",
  "lofi","pastel","fantasy","wireframe","black","luxury","dracula","cmyk",
  "autumn","business","acid","lemonade","night","coffee","winter","dim",
  "nord","sunset"
];

export async function buildThemeColorMap() {
  const map = {};

  for (const theme of themes) {
    // 1) Switch to the theme
    document.documentElement.setAttribute('data-theme', theme);
    //    wait a tick so CSS variables update
    await Promise.resolve();

    // 2) Grab whichever vars you care about
    const vars = [
      '--color-base-100',
      '--color-base-200',
      '--color-base-300',
      '--color-primary',
      '--color-secondary'
    ];

    // 3) Read + normalize to hex
    const colors = vars
      .map(name => getCSSVar(name))
      .map(toHex)
      .filter(Boolean);       // drop any that failed to parse

    // 4) Store
    map[theme] = colors;
  }

  return map;
}
