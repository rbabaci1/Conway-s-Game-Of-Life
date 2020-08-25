import React, { useState, useEffect } from "react";

import Grid from "./components/Grid/index";
import "./App.scss";

function App() {
  let speed = 1000;
  let rows = 30;
  let columns = 50;

  const [generation, setGeneration] = useState(0);
  const [fullGrid, setFullGrid] = useState(
    Array(rows)
      .fill()
      .map(() => Array(columns).fill(false))
  );

  const selectCell = (row, col) => {
    let gridCopy = [...fullGrid];
    gridCopy[row][col] = !gridCopy[row][col];

    setFullGrid(gridCopy);
  };

  const generateCells = () => {
    let gridCopy = [...fullGrid];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        if (Math.floor(Math.random() * 5) === 1) {
          gridCopy[i][j] = true;
        }
      }
    }
    setFullGrid(gridCopy);
  };

  const play = () => {
    let gridCopy = [...fullGrid];
    /*
      1- For i to be a valid index, must be bigger than 0 smaller than rows - 1
      2- For j to be a valid index, must be bigger than 0 smaller than columns - 1
    */

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        let counter = 0;
        // if top neighbor is alive and i is valid
        if (i > 0) if (fullGrid[i - 1][j]) counter++;
        // if top left neighbor is alive and i & j are valid
        if (i > 0 && j > 0) if (fullGrid[i - 1][j - 1]) counter++;
        // if top right neighbor is alive and i & j are valid
        if (i > 0 && j < columns - 1) if (fullGrid[i - 1][j + 1]) counter++;
        // if right neighbor is alive and and i & j are valid
        if (j < columns - 1) if (fullGrid[i][j + 1]) counter++;
        // if left neighbor is alive and and  j is valid
        if (j > 0) if (fullGrid[i][j - 1]) counter++;
        // if bottom neighbor is alive and i is valid
        if (i < rows - 1) if (fullGrid[i + 1][j]) counter++;
        // if bottom left neighbor is alive and i & j are valid
        if (i < rows - 1 && j > 0) if (fullGrid[i + 1][j - 1]) counter++;
        // if bottom right neighbor is alive and i & j are valid
        if (i < rows - 1 && columns - 1) if (fullGrid[i + 1][j + 1]) counter++;

        // if a cell is alive and has less than 2 or more than 3 live neighbors, it will die
        if (fullGrid[i][j] && (counter < 2 || counter > 3))
          gridCopy[i][j] = false;
        // if a cell is dead and has 3 live neighbors, it will be born
        if (!fullGrid[i][j] && counter === 3) gridCopy[i][j] = true;
      }
    }

    setFullGrid(gridCopy);
  };

  const playGame = () => {
    let intervalId = setInterval(play, speed);
    clearInterval(intervalId);
  };

  useEffect(() => {
    generateCells();
    // playGame();
  }, []);

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
