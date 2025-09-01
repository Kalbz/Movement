import { randomTheme } from './generators/themeGenerator';
import { randomBackground } from './generators/backgroundGenerator';
import { buildThemeColorMap } from './parsers/oklchToHex';
import { randomFont } from './generators/fontGenerator';
import { renderRandomLayout } from './layouts/renderRandomLayout';
import './style.css';

// ----- REROLL CORE -----
async function reroll() {
  // prevent double-click storms
  const btn = document.getElementById('reroll-portfolio-btn');
  if (btn) { btn.disabled = true; btn.classList.add('loading'); }

  // 1) new font + theme + layout
  randomFont();
  randomTheme();
  renderRandomLayout(); // make sure this clears/replaces the layout container

  // 2) wait a frame so CSS variables apply
  await new Promise(r => requestAnimationFrame(r));

  // 3) new background
  randomBackground();

  if (btn) { btn.disabled = false; btn.classList.remove('loading'); }
}

// ----- FLOATING BUTTON -----
function mountRerollButton() {
  if (document.getElementById('reroll-portfolio-btn')) return;

  const btn = document.createElement('button');
  btn.id = 'reroll-portfolio-btn';
  btn.type = 'button';
  // Tailwind/daisyUI; tweak classes to taste
  btn.className = `
    btn btn-primary fixed bottom-4 right-4 z-[9999]
    shadow-2xl rounded-full px-5 md:px-6
    backdrop-blur bg-primary
  `.replace(/\s+/g, ' ');
  btn.textContent = 'Reroll Portfolio';
  btn.addEventListener('click', reroll);

  // Optional: keyboard shortcut (R)
  window.addEventListener('keydown', (e) => {
    if ((e.key === 'r' || e.key === 'R') && !e.metaKey && !e.ctrlKey && !e.altKey) {
      e.preventDefault();
      reroll();
    }
  });

  document.body.appendChild(btn);
}

// ----- INIT -----
(async function init() {
  // build colors once (if your generators read from this)
  await buildThemeColorMap();

  // first render
  await reroll();

  // button last so it’s always on top
  mountRerollButton();
})();
