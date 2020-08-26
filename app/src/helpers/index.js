const cloneGrid = grid => {
  return grid.map(r => r.slice());
};

const pauseGame = intervalId => {
  clearInterval(intervalId);
};

export default { cloneGrid, pauseGame };
