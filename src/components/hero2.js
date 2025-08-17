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

  console.log("🧩 Layout:", templateData.name);
  console.log("📦 Blocks:", blocks.length);

  const wrapper = document.createElement('div');
  wrapper.className = 'w-full min-h-screen overflow-hidden flex justify-center items-center';

  const layoutBox = document.createElement('div');
  layoutBox.className = 'relative w-[100vw] rounded-box';
  layoutBox.style.maxWidth = '1200px';

  // Optional layout height
  if (templateData.maxHeight) {
    const pxHeight = (templateData.maxHeight / 100) * window.innerHeight;
    layoutBox.style.height = `${pxHeight}px`;
  } else {
    layoutBox.style.height = '90vh';
  }

  // Optional dev grid (comment out if not needed)
  // layoutBox.style.backgroundImage = `
  //   linear-gradient(to right, rgba(0,0,255,0.05) 1px, transparent 1px)
  // `;
  layoutBox.style.backgroundSize = `${100 / 4}% 100%`; // 4 columns by default

  // Render blocks
  blocks.forEach((block, index) => {
    const blockEl = document.createElement('div');
    blockEl.className = 'absolute p-4 bg-primary shadow-xl border rounded-lg overflow-auto';
    blockEl.style = `
      top: ${block.top};
      left: ${block.left};
      width: ${block.width};
      height: ${block.height};
      z-index: ${index + 1};
      box-sizing: border-box;
    `;

    blockEl.title = `Block ${index + 1}`;

    if (children[index]) {
      blockEl.appendChild(children[index]);
    } else {
blockEl.innerHTML = `
  <div
    contenteditable="true"
    class="flex justify-center items-center w-full h-full text-center text-xl text-base-content focus:outline-none"
    style="opacity: 0.8;"
  >
    Block ${index + 1}
  </div>`;


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
