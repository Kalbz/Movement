
export function generateMasonryLayoutTemplate({
  numBlocks = 20,
  columns = 4,
  minHeight = 10,
  maxHeight = 30
} = {}) {
  const colWidth = 100 / columns; // percentage
  const colHeights = Array(columns).fill(0); // in percentage units
  const blocks = [];

  for (let i = 0; i < numBlocks; i++) {
    const height = Math.random() * (maxHeight - minHeight) + minHeight;

    // Find the shortest column
    let shortestCol = 0;
    for (let j = 1; j < columns; j++) {
      if (colHeights[j] < colHeights[shortestCol]) {
        shortestCol = j;
      }
    }

    const top = colHeights[shortestCol];
    const left = shortestCol * colWidth;

    blocks.push({
      top: `${top}%`,
      left: `${left}%`,
      width: `${colWidth}%`,
      height: `${height}%`,
      col: shortestCol,
      index: i
    });

    colHeights[shortestCol] += height;
  }

return {
  name: `Masonry ${columns} cols`,
  blocks,
  maxHeight: Math.max(...colHeights)
};

}
