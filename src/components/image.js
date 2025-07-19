import { fetchThemedImage } from '../generators/colorImageGenerator.js';

export async function createImage({
  theme = "light",
  alt = "Themed image",
  className = "w-full max-w-2xl rounded-lg shadow-xl"
} = {}) {
  const stockUrl = await fetchThemedImage(theme);
  const fallbackUrl = "https://source.unsplash.com/random/600x400";

  const image = document.createElement("img");
  image.src = stockUrl || fallbackUrl;
  image.alt = alt;
  image.className = className;

  // Fallback if the themed image fails to load
  image.onerror = () => {
    image.src = fallbackUrl;
  };

  return image;
}
