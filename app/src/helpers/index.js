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

export default { cloneGrid, cellExists, updateCellTextContent };
