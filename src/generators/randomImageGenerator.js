import trianglify from 'trianglify';
import themeColors from '../components/themeColors.js';

const STOCK_IDS = [
  'photo-1606107557195-0e29a4b5b4aa',
  'photo-1559703248-dcaaec9fab78',
  'photo-1565098772267-60af42b81ef2',
];

export function randomImage() {
  const id = STOCK_IDS[Math.floor(Math.random()*STOCK_IDS.length)];
  const stockUrl = `https://img.daisyui.com/images/stock/${id}.webp`;

  const theme = document.documentElement.getAttribute('data-theme') || 'light';
  const palette = themeColors[theme] || ['#fff','#eee','#ddd','#3b82f6','#9333ea'];

  const pattern = trianglify({
    width:  300,
    height: 200,
    cellSize: 50,
    variance: 0.75,
    seed: Math.random().toString(),
    xColors: palette,
    yColors: 'match',
  });

  const svgString = new XMLSerializer().serializeToString(pattern.toSVG());
  const triUrl = `data:image/svg+xml;base64,${btoa(svgString)}`;

  return { stockUrl, triUrl };
}
