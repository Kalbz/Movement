

export function generateRandomLayoutTemplate() {
  const cols = Math.floor(Math.random() * 10) + 3; // 3 to 12
  const rows = Math.floor(Math.random() * 10) + 3;

  const cellWidth = 100 / cols;
  const cellHeight = 100 / rows;

  // Track used cells
  const grid = Array.from({ length: rows }, () =>
    Array(cols).fill(false)
  );

  const blocks = [];

  const maxAttempts = cols * rows * 2;
  let attempts = 0;

  while (attempts < maxAttempts) {
    const col = Math.floor(Math.random() * cols);
    const row = Math.floor(Math.random() * rows);

    if (grid[row][col]) {
      attempts++;
      continue;
    }

    // Randomly pick how many cells wide/tall (1–cols/rows left)
    const maxColSpan = cols - col;
    const maxRowSpan = rows - row;
    const colSpan = Math.ceil(Math.random() * Math.min(3, maxColSpan));
    const rowSpan = Math.ceil(Math.random() * Math.min(3, maxRowSpan));

    // Check if space is free
    let overlap = false;
    for (let r = row; r < row + rowSpan; r++) {
      for (let c = col; c < col + colSpan; c++) {
        if (grid[r]?.[c]) {
          overlap = true;
          break;
        }
      }
      if (overlap) break;
    }

    if (overlap) {
      attempts++;
      continue;
    }

    // Mark cells as used
    for (let r = row; r < row + rowSpan; r++) {
      for (let c = col; c < col + colSpan; c++) {
        if (grid[r]) grid[r][c] = true;
      }
    }

blocks.push({
  top: `${row * cellHeight}%`,
  left: `${col * cellWidth}%`,
  width: `${colSpan * cellWidth}%`,
  height: `${rowSpan * cellHeight}%`,
  row,  // ← add this
  col   // ← and this
});


    attempts++;
  }

return {
  name: `Generated ${cols}x${rows}`,
  cols,
  rows,
  blocks
};

}

// Example usage:
export const layoutTemplates2 = Array.from({ length: 9 }, () => generateRandomLayoutTemplate());