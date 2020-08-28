const setInitialState = (rows, cols) => {
  return {
    grid: Array(rows)
      .fill()
      .map(() => Array(cols).fill(0)),
    generation: 1,
    running: false,
    generationDisplayed: false,
    windowWidth: window.innerWidth,
  };
};

export default setInitialState;
