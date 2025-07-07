// WIP, not working atm, doing it manually for now

import fs from 'fs';
import path from 'path';

import { parse, formatHex } from 'culori';

const slots = [
  'base-100',
  'base-200',
  'base-300',
  'primary',
  'secondary'
];

const themes = [
  "light","dark","cupcake","bumblebee","emerald","corporate","synthwave",
  "retro","cyberpunk","valentine","halloween","garden","forest","aqua",
  "lofi","pastel","fantasy","wireframe","black","luxury","dracula","cmyk",
  "autumn","business","acid","lemonade","night","coffee","winter","dim",
  "nord","sunset"
];

const map = {};

for (const [themeName, colors] of Object.entries(themes)) {
  const palette = slots
    .map(slot => {
      const raw = colors[`--${themeName}-${slot}`] || colors[slot] || null;
      if (!raw) return null;
      const parsed = parse(raw);
      return parsed ? formatHex(parsed) : raw;
    })
    .filter(Boolean);

  map[themeName] = palette;
}

const outPath = path.resolve(__dirname, '../src/themeColors.json');
fs.writeFileSync(outPath, JSON.stringify(map, null, 2));

