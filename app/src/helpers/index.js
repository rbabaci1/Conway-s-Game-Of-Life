const cloneGrid = grid => {
  return grid.map(r => r.slice());
};

const generateCells = (grid, setState, rows, columns) => {
  let gridCopy = cloneGrid(grid);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (Math.floor(Math.random() * 7) === 1) {
        gridCopy[i][j] = true;
      }
    }
  }
  setState({ fullGrid: gridCopy });
};

export default { cloneGrid, generateCells };
