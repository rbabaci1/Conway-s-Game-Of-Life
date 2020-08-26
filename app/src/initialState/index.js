const setInitialState = (rows, cols) => {
  return {
    grid: Array(rows)
      .fill()
      .map(() => Array(cols).fill(false)),
    generation: 0,
  };
};

export default setInitialState;
