// main.js
import { randomTheme } from './generators/themeGenerator';
import { randomBackground } from './generators/backgroundGenerator';
import { buildThemeColorMap } from './parsers/oklchToHex';
import { randomFont } from './generators/fontGenerator';
import { renderRandomLayout } from './layouts/renderRandomLayout';
import './style.css';

(async function init() {
  // 1) Build the color map once
  const themeColors = await buildThemeColorMap();  
  // 2) Set a random theme, font and layout
  randomFont();
  randomTheme();                   
  renderRandomLayout();                   
  // 3) Wait for the browser to apply CSS var changes
  await new Promise(r => requestAnimationFrame(r));   
  // 4) render the background
  // randomBackground();                      
})();
