const cloneGrid = grid => {
  return grid.map(r => r.slice());
};

const selectCell = (row, col, setState) => {
  let gridCopy = cloneGrid(this.state.fullGrid);
  gridCopy[row][col] = !gridCopy[row][col];

  setState({ fullGrid: gridCopy });
};

export default { cloneGrid, selectCell };
