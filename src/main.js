import { randomTheme } from './generators/themeGenerator';
import { randomFont } from './generators/fontGenerator';
import { randomGradient } from './generators/gradientGenerator';
import { randomGradientCircle } from './generators/gradientCircleGenerator';
import { randomLayout } from './generators/layoutGenerator';
import { renderRandomLayout } from './layouts/renderRandomLayout.js';
import './style.css'

// randomLayout();
randomFont();
randomTheme();
renderRandomLayout();
// randomGradient();
// randomGradientCircle();

