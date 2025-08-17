// image child renderer: non-blocking, uses your createImage helper

import { createImage } from '../components/image.js';
import { getCurrentTheme } from '../generators/colorImageGenerator.js'; // or wherever it's exported from

export function createImageChild(props = {}) {
  const {
    alt = "Themed image",
    className = "w-full h-64 rounded-2xl object-cover shadow-xl",
    theme = getCurrentTheme?.() || "light",
  } = props;

  // placeholder skeleton (so layout doesn’t jump)
  const ph = document.createElement("div");
  ph.className = props.wrapperClass || "w-full h-64 rounded-2xl bg-base-300 animate-pulse";

  (async () => {
    const img = await createImage({ theme, alt, className });
    ph.replaceWith(img);
  })();

  return ph;
}
