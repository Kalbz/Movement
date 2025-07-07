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

  console.log(
  '▶️ points:', pattern.points.length,
  '│ polys:',  pattern.polys.length);

  console.log(
  '▶️ sample colors:',
  pattern.polys.slice(0,5).map(p => p.color.hex())
);

const canvas = pattern.toCanvas();
canvas.style.position = 'absolute';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.zIndex = -1;
document.body.appendChild(canvas);

console.log('canvas CSS:', {
  position: canvas.style.position,
  zIndex:   canvas.style.zIndex,
  opacity:  window.getComputedStyle(canvas).opacity,
});
console.log('body stacking context:', window.getComputedStyle(document.body).getPropertyValue('opacity'));
console.log('points:', pattern.points.length, 'polys:', pattern.polys.length);

  const svg = new XMLSerializer().serializeToString(pattern.toSVG());
  const uri = `data:image/svg+xml;base64,${btoa(svg)}`;
  document.querySelector(selector)
    ?.style.setProperty('background-image', `url("${uri}")`);
}
