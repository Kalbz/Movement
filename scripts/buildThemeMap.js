// scripts/buildThemeMap.js

import fs from 'fs';
import path from 'path';

// 1. Import DaisyUI's theme definitions


// 2. (Optional) If you want to normalize any CSS color strings,
//    you can use 'culori' here. Otherwise, most DaisyUI values are hex.
import { parse, formatHex } from 'culori';

// 3. Decide which vars you want in each palette:
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
  // 4. Extract and normalize
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

// 5. Write to disk
const outPath = path.resolve(__dirname, '../src/themeColors.json');
fs.writeFileSync(outPath, JSON.stringify(map, null, 2));

console.log(`✅ Wrote theme map for ${Object.keys(map).length} themes to ${outPath}`);
