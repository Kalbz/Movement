export function createText({ 
  text = "", 
  size, 
  weight, 
  color, 
  align 
} = {}) {
  const paragraph = document.createElement("p");

  // Random fallback options if none provided
  const sizeClass = size || randomFrom(["text-sm", "text-base", "text-lg", "text-xl"]);
  const weightClass = weight || randomFrom(["font-light", "font-normal", "font-medium", "font-bold"]);
  const colorClass = color || randomFrom(["text-neutral", "text-primary", "text-secondary", "text-accent", "text-info"]);
  
  // Handle align prop - convert short values to full Tailwind classes
  let alignClass = align;
  if (align && !align.startsWith('text-')) {
    alignClass = `text-${align}`;
  }
  alignClass = alignClass || randomFrom(["text-left", "text-center", "text-right"]);

  paragraph.className = `${sizeClass} ${weightClass} ${colorClass} ${alignClass} px-4 py-2`;

  paragraph.textContent = text;
  return paragraph;
}

// Utility for picking random style
function randomFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}
