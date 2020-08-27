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
  let x = Math.ceil(rows / 2);
  let y = Math.ceil(cols / 2);
  switch (patternName) {
    case "BLINKER":
      grid[x][y] = 1;
      grid[x][y - 1] = 1;
      grid[x][y + 1] = 1;
      break;
    case "TOAD":
      grid[x][y] = 1;
      grid[x][y + 1] = 1;
      grid[x][y + 2] = 1;
      grid[x - 1][y + 1] = 1;
      grid[x - 1][y + 2] = 1;
      grid[x - 1][y + 3] = 1;
      break;
    case "BEACON":
      grid[x][y] = 1;
      grid[x][y + 1] = 1;
      grid[x + 1][y] = 1;

      grid[x + 2][y + 3] = 1;
      grid[x + 3][y + 2] = 1;
      grid[x + 3][y + 3] = 1;
  }
  return grid;
};

export default {
  cloneGrid,
  cellExists,
  updateCellTextContent,
  patternsGenerator,
};
