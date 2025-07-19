import { fetchThemedImage } from '../generators/colorImageGenerator.js';

export async function createBoxes(theme = "light") {
  const wrapper = document.createElement('div');
  const layoutType = Math.random() < 0.5 ? 'grid' : 'flex';

  wrapper.className = layoutType === 'grid'
    ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 p-6  rounded-box'
    : 'flex flex-wrap justify-center gap-6 p-6 rounded-box';

  const numItems = Math.floor(Math.random() * 5) + 4;

  // Fetch all images in parallel
  const imagePromises = Array.from({ length: numItems }, () => fetchThemedImage(theme));
  const imageUrls = await Promise.all(imagePromises);

  for (let i = 0; i < numItems; i++) {
    const imageUrl = imageUrls[i] || 'https://source.unsplash.com/random/400x400';

    const box = document.createElement('div');
    box.className = `
      w-48 h-48 overflow-hidden
      rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 border
      bg-white flex items-center justify-center
    `.trim();

    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = `Themed image ${i + 1}`;
    img.className = 'w-full h-full object-cover';

    box.appendChild(img);
    wrapper.appendChild(box);
  }

  return wrapper;
}
