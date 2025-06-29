import './index.css';
import { getTheme } from './generators/themeGenerator.js';

const theme = getTheme();
document.documentElement.setAttribute("data-theme", theme);
document.getElementById("theme-name").textContent = theme;
