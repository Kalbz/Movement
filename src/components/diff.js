import { fetchThemedImage } from '../generators/colorImageGenerator.js';

export async function createDiff(theme = "light") {
  const diff = document.createElement('figure');

  // Pick a random width from predefined options
  const widthOptions = [40, 50, 60, 70, 80, 90, 100];
  const widthPercent = widthOptions[Math.floor(Math.random() * widthOptions.length)];
  diff.style.width = `${widthPercent}vw`;

  // Base classes
  let classList = ['diff', 'aspect-16/9', 'mx-auto', 'mb-6'];

  // 50% chance of adding rounded corners
  if (Math.random() < 0.5) {
    classList.push('rounded-xl', 'overflow-hidden'); // smooth clipping
  }

  diff.className = classList.join(' ');

  const useImages = Math.random() < 0.5;

  if (useImages) {
    const [image1, image2] = await Promise.all([
      fetchThemedImage(theme, "abstract"),
      fetchThemedImage(theme, "abstract")
    ]);

    const fallback1 = "https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a.webp";
    const fallback2 = "https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a-blur.webp";

    diff.innerHTML = `
      <div class="diff-item-1 p-4" role="img" tabindex="0">
        <img alt="themed image 1" src="${image1 || fallback1}" />
      </div>
      <div class="diff-item-2" role="img">
        <img alt="themed image 2" src="${image2 || fallback2}" />
      </div>
      <div class="diff-resizer"></div>
    `;
  } else {
    diff.innerHTML = `
      <div class="diff-item-1 p-4" role="img" tabindex="0">
        <div class="bg-primary text-primary-content grid place-content-center text-9xl font-black">
          KALLE
        </div>
      </div>
      <div class="diff-item-2" role="img">
        <div class="bg-base-200 grid place-content-center text-9xl font-black">KALLE</div>
      </div>
      <div class="diff-resizer"></div>
    `;
  }

  return diff;
}
