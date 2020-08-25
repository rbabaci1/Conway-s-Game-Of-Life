import React, { useState } from "react";

import Grid from "./components/Grid/index";
import "./App.scss";

function App() {
  const [generation, setGeneration] = useState(0);
  const [fullGrid, setFullGrid] = useState(
    Array(rows)
      .fill()
      .map(() => Array(columns).fill(false))
  );

  let speed = 100;
  let rows = 30;
  let columns = 50;

  const selectCell = (row, col) => {
    let clonedGrid = [...fullGrid];
    clonedGrid[row][col] = !clonedGrid[row][col];

    setFullGrid(clonedGrid);
  };

  return (
    <div className="App">
      <h1>Game Of Life!</h1>
      <h2>Generations: {generation}</h2>

      <Grid
        fullGrid={fullGrid}
        rows={rows}
        columns={columns}
        selectCell={selectCell}
      />
    </div>
  );
}

export default App;
