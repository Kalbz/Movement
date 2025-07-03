// src/generators/layoutGenerator.js
import { createHero } from '../components/hero';
import { createCarousel } from '../components/carousel';
import { createAvatar } from '../components/avatar';

export function randomLayout() {
  const container = document.getElementById('app');
  container.innerHTML = '';

  // Define all layout templates in an array
  const layouts = [gridLayout, flexLayout, sidebarLayout, heroBannerLayout];
  const pick = layouts[Math.floor(Math.random() * layouts.length)];
  pick(container);      // call the chosen layout function
}

// --- layout templates ---
function gridLayout(container) {
  container.className =
    'grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-base-200 border-4 border-dashed border-secondary rounded-box';

  container.append(createHero(), createCarousel(), createAvatar());
  addBoxes(container);
}

function flexLayout(container) {
  container.className =
    'flex flex-wrap justify-center gap-6 p-6 bg-base-300 border-4 border-dotted border-accent rounded-box';

  container.append(createHero(), createAvatar(), createCarousel());
  addBoxes(container);
}

function sidebarLayout(container) {
  container.className =
    'grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 p-6 bg-base-200 rounded-box';

  const sidebar = document.createElement('aside');
  sidebar.className = 'flex flex-col gap-4';
  sidebar.append(createAvatar(), createCarousel());

  const main = document.createElement('main');
  main.append(createHero());
  addBoxes(main);

  container.append(sidebar, main);
}

function heroBannerLayout(container) {
  container.className =
    'flex flex-col gap-4 p-6 bg-base-100 rounded-box';

  const banner = document.createElement('div');
  banner.className = 'relative';
  banner.append(createHero());
  banner.append(createAvatar());

  container.append(banner, createCarousel());
  addBoxes(container);
}

// helper to create the random boxes (same logic as before)
function addBoxes(parent) {
  const numItems = Math.floor(Math.random() * 5) + 4;
  for (let i = 0; i < numItems; i++) {
    const box = document.createElement('div');
    const width = Math.random() < 0.5 ? 'w-32' : 'w-48';
    const height = Math.random() < 0.5 ? 'h-32' : 'h-48';
    const bg = i % 2 === 0 ? 'bg-primary' : 'bg-secondary';

    box.className = `
      ${width} ${height}
      ${bg} text-primary-content
      flex items-center justify-center text-lg font-bold
      border border-white border-dashed rounded-lg
      shadow-lg hover:scale-105 transition-transform duration-300
    `.trim();
    box.textContent = `Box ${i + 1}`;
    parent.appendChild(box);
  }
}
