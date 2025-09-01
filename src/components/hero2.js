// --- Layout Imports ---
import { premadeTemplates } from '../layouts/premadeTemplate.js';
import { generateMasonryLayoutTemplate } from '../layouts/masonryTemplate.js';
import { generateTreemapLayoutTemplate } from '../layouts/treeTemplate.js';
import { generateRandomLayoutTemplate as generateGridLayout } from '../layouts/treebugTemplate.js';

// --- Layout Selector ---
const FORCE_TEMPLATE = null; // 'treemap', 'premade', 'masonry', 'grid' or null

function getRandomLayout() {
  if (FORCE_TEMPLATE === 'treemap') {
    const numBlocks = Math.floor(Math.random() * 8) + 8;
    return generateTreemapLayoutTemplate(numBlocks);
  } else if (FORCE_TEMPLATE === 'premade') {
    const template = premadeTemplates[Math.floor(Math.random() * premadeTemplates.length)];
    return {
      name: template.name,
      blocks: template.blocks
    };
  } else if (FORCE_TEMPLATE === 'masonry') {
    const columns = Math.floor(Math.random() * 3) + 3;
    return generateMasonryLayoutTemplate({ numBlocks: 15, columns });
  } else if (FORCE_TEMPLATE === 'grid') {
    return generateGridLayout();
  }

  // Default behavior
  const rand = Math.random();

  if (rand < 0.5) {
    const numBlocks = Math.floor(Math.random() * 8) + 8;
    return generateTreemapLayoutTemplate(numBlocks);
  } else if (rand < 0.8) {
    const template = premadeTemplates[Math.floor(Math.random() * premadeTemplates.length)];
    return {
      name: template.name,
      blocks: template.blocks
    };
  } else if (rand < 0.95) {
    const columns = Math.floor(Math.random() * 3) + 3;
    return generateMasonryLayoutTemplate({ numBlocks: 15, columns });
  } else {
    return generateGridLayout();
  }
}


export function createAbsoluteHero({ children = [], template = 0 } = {}) {
  const templateData = getRandomLayout();
  let blocks = templateData.blocks;

  // Optional: add spacing between blocks
  blocks = maybeApplyGapsToBlocks(blocks);

  // ✅ Keep only as many blocks as we have images
  if (children.length) {
    blocks = blocks.slice(0, children.length);
  } else {
    // No children: show nothing instead of "Block N" placeholders
    blocks = [];
  }

  console.log("🧩 Layout:", templateData.name);
  console.log("📦 Blocks:", blocks.length);

  const wrapper = document.createElement('div');
  wrapper.className = 'w-full min-h-screen overflow-hidden flex justify-center items-center';

  const layoutBox = document.createElement('div');
  layoutBox.className = 'relative w-[100vw] rounded-box';
  layoutBox.style.maxWidth = '1200px';

  if (templateData.maxHeight) {
    const pxHeight = (templateData.maxHeight / 100) * window.innerHeight;
    layoutBox.style.height = `${pxHeight}px`;
  } else {
    layoutBox.style.height = '90vh';
  }

  // Render blocks
  blocks.forEach((block, index) => {
    const blockEl = document.createElement('div');
    // ✅ remove padding/background; hide scrollbars
    blockEl.className = 'absolute rounded-lg overflow-hidden';
    blockEl.style = `
      top: ${block.top};
      left: ${block.left};
      width: ${block.width};
      height: ${block.height};
      z-index: ${index + 1};
      box-sizing: border-box;
    `;

    const child = children[index];
    if (child) {
      // ✅ Make images fill the block
      if (child.tagName === 'IMG') {
        child.style.width = '100%';
        child.style.height = '100%';
        child.style.objectFit = 'cover';
        child.style.display = 'block';
      } else {
        // If it isn’t an <img>, still make it fill
        child.style.width = '100%';
        child.style.height = '100%';
      }
      blockEl.appendChild(child);
    }

    layoutBox.appendChild(blockEl);
  });

  wrapper.appendChild(layoutBox);
  return wrapper;
}



// Optional helper to add gaps between blocks
function maybeApplyGapsToBlocks(blocks, gapPercent = 1.5) {
  if (Math.random() >= 0.6) return blocks; // 40% chance to apply gaps

  return blocks.map(block => {
    const gapW = gapPercent;
    const gapH = gapPercent;

    const top = parseFloat(block.top);
    const left = parseFloat(block.left);
    const width = parseFloat(block.width);
    const height = parseFloat(block.height);

    return {
      ...block,
      top: `${top + gapH}%`,
      left: `${left + gapW}%`,
      width: `${width - 2 * gapW}%`,
      height: `${height - 2 * gapH}%`
    };
  });
}
