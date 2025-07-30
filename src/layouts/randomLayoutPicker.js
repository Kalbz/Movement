import { premadeTemplates } from './premadeTemplate.js';
import { generateMasonryLayoutTemplate } from './masonryTemplate.js';
import { generateTreemapLayoutTemplate } from './treeTemplate.js';
import { generateRandomLayoutTemplate as generateGridLayout } from './treebugTemplate.js';

export function getRandomLayout() {
  const rand = Math.random();

  if (rand < 0.5) {
    // 50% chance → Treemap
    const numBlocks = Math.floor(Math.random() * 8) + 8; // 8–15
    return generateTreemapLayoutTemplate(numBlocks);
  } else if (rand < 0.8) {
    // 30% → Premade
    const template = premadeTemplates[Math.floor(Math.random() * premadeTemplates.length)];
    return {
      name: template.name,
      blocks: template.blocks
    };
  } else if (rand < 0.95) {
    // 15% → Masonry
    const columns = Math.floor(Math.random() * 3) + 3; // 3–5
    return generateMasonryLayoutTemplate({ numBlocks: 15, columns });
  } else {
    // 5% → Grid-style
    return generateGridLayout();
  }
}
