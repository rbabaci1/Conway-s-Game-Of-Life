const cloneGrid = grid => {
  return grid.map(r => r.slice());
};

export default { cloneGrid };
