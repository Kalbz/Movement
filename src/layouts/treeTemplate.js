

export function generateTreemapLayoutTemplate(numBlocks = 8) {
  // 1. Generate random weights
  const weights = Array.from({ length: numBlocks }, () => Math.random() + 0.5); // avoid tiny weights
  const totalWeight = weights.reduce((a, b) => a + b, 0);

  // 2. Normalize weights to sum = 1
  const normalized = weights.map(w => w / totalWeight);

  const blocks = [];

  // 3. Recursively split the container
function splitArea(x, y, width, height, items) {
  if (items.length === 1) {
    blocks.push({
      top: `${y * 100}%`,
      left: `${x * 100}%`,
      width: `${width * 100}%`,
      height: `${height * 100}%`
    });
    return;
  }

  const total = items.reduce((a, b) => a + b, 0);
  let acc = 0;
  let cutIndex = 0;

  for (let i = 0; i < items.length; i++) {
    acc += items[i];
    if (acc >= total / 2) {
      cutIndex = i + 1;
      break;
    }
  }

  // 🧠 Fallback if split fails
  if (cutIndex <= 0 || cutIndex >= items.length) {
    // Bail out and treat as one block
    blocks.push({
      top: `${y * 100}%`,
      left: `${x * 100}%`,
      width: `${width * 100}%`,
      height: `${height * 100}%`
    });
    return;
  }

  const group1 = items.slice(0, cutIndex);
  const group2 = items.slice(cutIndex);

  const total1 = group1.reduce((a, b) => a + b, 0);
  const total2 = group2.reduce((a, b) => a + b, 0);
  const ratio = total1 / (total1 + total2);

  const horizontalSplit = width > height;

  if (horizontalSplit) {
    const splitW = width * ratio;
    splitArea(x, y, splitW, height, group1);
    splitArea(x + splitW, y, width - splitW, height, group2);
  } else {
    const splitH = height * ratio;
    splitArea(x, y, width, splitH, group1);
    splitArea(x, y + splitH, width, height - splitH, group2);
  }
}


  splitArea(0, 0, 1, 1, normalized);

  return {
    name: `Treemap ${numBlocks}`,
    blocks
  };
}