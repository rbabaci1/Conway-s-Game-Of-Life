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
    case "BLINKER (P2)":
      grid[x][y] = 1;
      grid[x][y - 1] = 1;
      grid[x][y + 1] = 1;
      break;
    case "TOAD (P2)":
      grid[x][y] = 1;
      grid[x][y + 1] = 1;
      grid[x][y + 2] = 1;
      grid[x - 1][y + 1] = 1;
      grid[x - 1][y + 2] = 1;
      grid[x - 1][y + 3] = 1;
      break;
    case "BEACON (P2)":
      grid[x][y] = 1;
      grid[x][y + 1] = 1;
      grid[x + 1][y] = 1;

      grid[x + 2][y + 3] = 1;
      grid[x + 3][y + 2] = 1;
      grid[x + 3][y + 3] = 1;
      break;
    case "PULSAR (P3)":
      grid[x][y] = 1;
      grid[x][y - 1] = 1;
      grid[x][y - 2] = 1;

      grid[x - 1][y - 4] = 1;
      grid[x - 2][y - 4] = 1;
      grid[x - 3][y - 4] = 1;

      grid[x - 5][y - 2] = 1;
      grid[x - 5][y - 1] = 1;
      grid[x - 5][y] = 1;

      grid[x - 3][y + 1] = 1;
      grid[x - 2][y + 1] = 1;
      grid[x - 1][y + 1] = 1;
      ////////////////////////

      grid[x - 1][y + 3] = 1;
      grid[x - 2][y + 3] = 1;
      grid[x - 3][y + 3] = 1;

      grid[x - 5][y + 4] = 1;
      grid[x - 5][y + 5] = 1;
      grid[x - 5][y + 6] = 1;

      grid[x - 3][y + 8] = 1;
      grid[x - 2][y + 8] = 1;
      grid[x - 1][y + 8] = 1;

      grid[x][y + 6] = 1;
      grid[x][y + 5] = 1;
      grid[x][y + 4] = 1;
      ////////////////////////

      grid[x + 2][y + 6] = 1;
      grid[x + 2][y + 5] = 1;
      grid[x + 2][y + 4] = 1;

      grid[x + 3][y + 3] = 1;
      grid[x + 4][y + 3] = 1;
      grid[x + 5][y + 3] = 1;

      grid[x + 7][y + 4] = 1;
      grid[x + 7][y + 5] = 1;
      grid[x + 7][y + 6] = 1;

      grid[x + 5][y + 8] = 1;
      grid[x + 4][y + 8] = 1;
      grid[x + 3][y + 8] = 1;
      ////////////////////////

      grid[x + 3][y + 1] = 1;
      grid[x + 4][y + 1] = 1;
      grid[x + 5][y + 1] = 1;

      grid[x + 7][y] = 1;
      grid[x + 7][y - 1] = 1;
      grid[x + 7][y - 2] = 1;

      grid[x + 5][y - 4] = 1;
      grid[x + 4][y - 4] = 1;
      grid[x + 3][y - 4] = 1;

      grid[x + 2][y - 2] = 1;
      grid[x + 2][y - 1] = 1;
      grid[x + 2][y] = 1;
      break;
    case "THE VIRUS (P15)":
      grid[x][y] = 1;
      grid[x - 1][y] = 1;
      grid[x - 2][y + 1] = 1;
      grid[x - 2][y - 1] = 1;

      grid[x - 3][y] = 1;
      grid[x - 4][y] = 1;
      grid[x - 5][y] = 1;
      grid[x - 6][y] = 1;

      grid[x - 7][y + 1] = 1;
      grid[x - 7][y - 1] = 1;
      grid[x - 8][y] = 1;
      grid[x - 9][y] = 1;
      break;
    case "GLIDER":
      grid[1][1] = 1;
      grid[2][2] = 1;
      grid[2][3] = 1;
      grid[1][3] = 1;
      grid[0][3] = 1;
  }
  return grid;
};

export default {
  cloneGrid,
  cellExists,
  updateCellTextContent,
  patternsGenerator,
};
