const cloneGrid = grid => {
  return grid.map(r => r.slice());
};

const cellExists = (rows, cols, rowIndex, colIndex) => {
  if (rowIndex >= 0 && colIndex >= 0 && rowIndex < rows && colIndex < cols) {
    return true;
  }
  return false;
};

const updateCellTextContent = (row, col, generation) => {
  document.getElementById(`${row}_${col}`).textContent = String(generation + 1);
};

const patternsGenerator = (grid, patternName, rows, cols) => {
  switch (patternName) {
    case "BLINKER":
      let x = Math.ceil(rows / 2);
      let y = Math.ceil(cols / 2);

      grid[x][y] = 1;
      grid[x][y - 1] = 1;
      grid[x][y + 1] = 1;
      break;
  }
  return grid;
};

export default {
  cloneGrid,
  cellExists,
  updateCellTextContent,
  patternsGenerator,
};
