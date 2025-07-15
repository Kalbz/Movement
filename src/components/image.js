// components/image.js
import { randomImage } from '../generators/randomImageGenerator.js';

export function createImage({ useStock = true, alt = "Random image", className = "" } = {}) {
  const { stockUrl, triUrl } = randomImage();

  const image = document.createElement("img");
  image.src = useStock ? stockUrl : triUrl;
  image.alt = alt;
  image.className = className || "w-full max-w-2xl rounded-lg shadow-xl";

  // Add a fallback: if stock fails, switch to trianglify
  image.onerror = () => {
    image.src = triUrl;
  };

  return image;
}
