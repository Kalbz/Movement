import trianglify from 'trianglify';
import themeColors from '../components/themeColors.js';

export function randomBackground(selector = 'body') {
  const theme = document.documentElement.getAttribute('data-theme') || 'light';
  const palette = themeColors[theme] 
    || ['#ffffff','#e8e8e8','#d1d1d1','#3b82f6','#9333ea'];

  const pattern = trianglify({
    width:     window.innerWidth,
    height:    window.innerHeight,
    cellSize:  60,
    variance:  0.8,
    strokeWidth: 1,
    seed:      Math.random().toString(),
    xColors:   palette,
    yColors:   'match'
  });



const canvas = pattern.toCanvas();
canvas.style.position = 'absolute';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.zIndex = -1;
document.body.appendChild(canvas);


  const svg = new XMLSerializer().serializeToString(pattern.toSVG());
  const uri = `data:image/svg+xml;base64,${btoa(svg)}`;
  document.querySelector(selector)
    ?.style.setProperty('background-image', `url("${uri}")`);
    //hepl me to no repeat
  document.querySelector(selector)
    ?.style.setProperty('background-repeat', 'repeat-x');
    
}
