import { fetchThemedImage } from '../generators/colorImageGenerator.js';

export async function createDiff(theme = "light") {
  const diff = document.createElement('figure');
  diff.className = 'diff aspect-16/9 w-full mb-6';

  const useImages = Math.random() < 0.5;

  if (useImages) {
    // Fetch two themed images (different ones)
    const [image1, image2] = await Promise.all([
      fetchThemedImage(theme, "abstract"),
      fetchThemedImage(theme, "abstract")
    ]);

    const fallback1 = "https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a.webp";
    const fallback2 = "https://img.daisyui.com/images/stock/photo-1560717789-0ac7c58ac90a-blur.webp";

    diff.innerHTML = `
      <div class="diff-item-1" role="img" tabindex="0">
        <img alt="themed image 1" src="${image1 || fallback1}" />
      </div>
      <div class="diff-item-2" role="img">
        <img alt="themed image 2" src="${image2 || fallback2}" />
      </div>
      <div class="diff-resizer"></div>
    `;
  } else {
    // Use the text version
    diff.innerHTML = `
      <div class="diff-item-1" role="img" tabindex="0">
        <div class="bg-primary text-primary-content grid place-content-center text-9xl font-black">
          DAISY
        </div>
      </div>
      <div class="diff-item-2" role="img">
        <div class="bg-base-200 grid place-content-center text-9xl font-black">DAISY</div>
      </div>
      <div class="diff-resizer"></div>
    `;
  }

  return diff;
}
