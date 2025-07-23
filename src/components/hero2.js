
import { layoutTemplates } from '../layouts/layoutTemplate.js';

export function createAbsoluteHero({ children = [], template = 0 }) {
  const templateData = layoutTemplates[template % layoutTemplates.length];

  const wrapper = document.createElement('div');
  wrapper.className = 'w-full min-h-screen bg-base-200 overflow-hidden flex justify-center items-center';

  const layoutBox = document.createElement('div');
  layoutBox.className = 'relative w-[90vw] h-[90vh] rounded-box';
  layoutBox.style.maxWidth = '1200px';

  templateData.blocks.forEach((block, index) => {
    const blockEl = document.createElement('div');
    blockEl.className = 'absolute p-4 bg-base-100 shadow-xl border rounded-lg overflow-auto';
    blockEl.style = `
      top: ${block.top};
      left: ${block.left};
      width: ${block.width};
      height: ${block.height};
      z-index: ${index + 1};
      box-sizing: border-box;
    `;

    if (children[index]) {
      blockEl.appendChild(children[index]);
    } else {
      blockEl.innerHTML = `
        <div class="flex justify-center items-center h-full text-center text-xl text-base-content opacity-50">
          Block ${index + 1}
        </div>`;
    }

    layoutBox.appendChild(blockEl);
  });

  wrapper.appendChild(layoutBox);
  return wrapper;
}
