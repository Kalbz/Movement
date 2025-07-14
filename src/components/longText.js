export function createLongText({ 
  text, 
  size, 
  weight, 
  color, 
  align 
} = {}) {
  const paragraph = document.createElement("p");

  const sizeClass = size || randomFrom(["text-base", "text-lg", "text-xl"]);
  const weightClass = weight || randomFrom(["font-normal", "font-medium"]);
  const colorClass = color || randomFrom(["text-neutral", "text-base-content"]);
  const alignClass = align || randomFrom(["text-left", "text-justify"]);

  paragraph.className = `${sizeClass} ${weightClass} ${colorClass} ${alignClass} px-6 py-4 leading-relaxed max-w-4xl`;

  paragraph.textContent = text || `I am a passionate and detail-oriented developer with a strong foundation in front-end design and creative coding. My work focuses on blending aesthetics with functionality, building user experiences that are both intuitive and visually compelling. Over the years, I’ve collaborated on a range of projects — from interactive portfolio sites to modular UI frameworks — with an emphasis on procedural generation and dynamic layouts. Outside of development, I find inspiration in generative art, design systems, and the occasional deep dive into CSS quirks.`;

  return paragraph;
}

function randomFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}
