const setInitialState = (rows, cols) => {
  return {
    grid: Array(rows)
      .fill()
      .map(() => Array(cols).fill(0)),
    generation: 0,
  };
};

export default setInitialState;
