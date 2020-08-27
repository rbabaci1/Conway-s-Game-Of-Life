const setInitialState = (rows, cols) => {
  return {
    grid: Array(rows)
      .fill()
      .map(() => Array(cols).fill(0)),
    generation: 0,
    generationDisplayed: false,
  };
};

export default setInitialState;
