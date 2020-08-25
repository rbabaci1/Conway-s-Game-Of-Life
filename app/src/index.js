import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import Grid from "./components/Grid/index";
import Commands from "./components/Commands";
import setInitialState from "./initialState";
import "./index.scss";

class App extends Component {
  constructor() {
    super();
    this.speed = 100;
    this.rows = 30;
    this.columns = 50;

    this.state = setInitialState(this.rows, this.columns);
  }

  selectCell = (row, col) => {
    let gridCopy = [...this.state.fullGrid];
    gridCopy[row][col] = !gridCopy[row][col];

    this.setState({ fullGrid: gridCopy });
  };

  generateCells = () => {
    let gridCopy = this.state.fullGrid.map(r => r.slice());
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        if (Math.floor(Math.random() * 10) === 1) {
          gridCopy[i][j] = true;
        }
      }
    }
    this.setState({ fullGrid: gridCopy });
  };

  play = () => {
    /*
      1- For i to be a valid index, must be bigger than 0 smaller than rows - 1
      2- For j to be a valid index, must be bigger than 0 smaller than columns - 1
    */

    let grid = this.state.fullGrid;
    let gridCopy = this.state.fullGrid.map(r => r.slice());

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        let liveNeighbors = 0;
        // if top neighbor is alive and i is valid
        if (i > 0) if (grid[i - 1][j]) liveNeighbors++;
        // if top left neighbor is alive and i & j are valid
        if (i > 0 && j > 0) if (grid[i - 1][j - 1]) liveNeighbors++;
        // if top right neighbor is alive and i & j are valid
        if (i > 0 && j < this.columns - 1) {
          if (grid[i - 1][j + 1]) liveNeighbors++;
        }
        // if right neighbor is alive and and i & j are valid
        if (j < this.columns - 1) if (grid[i][j + 1]) liveNeighbors++;
        // if left neighbor is alive and and  j is valid
        if (j > 0) if (grid[i][j - 1]) liveNeighbors++;
        // if bottom neighbor is alive and i is valid
        if (i < this.rows - 1) if (grid[i + 1][j]) liveNeighbors++;
        // if bottom left neighbor is alive and i & j are valid
        if (i < this.rows - 1 && j > 0) if (grid[i + 1][j - 1]) liveNeighbors++;
        // if bottom right neighbor is alive and i & j are valid
        if (i < this.rows - 1 && this.columns - 1) {
          if (grid[i + 1][j + 1]) liveNeighbors++;
        }

        // if a cell is alive and has less than 2 or more than 3 live neighbors, it will die
        if (grid[i][j] && (liveNeighbors < 2 || liveNeighbors > 3)) {
          gridCopy[i][j] = false;
        }
        // if a cell is dead and has 3 live neighbors, it will be born
        if (!grid[i][j] && liveNeighbors === 3) gridCopy[i][j] = true;
      }
    }

    this.setState({
      generation: this.state.generation + 1,
      fullGrid: gridCopy,
    });
  };

  playGame = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.play, this.speed);
  };

  pauseGame = () => {
    clearInterval(this.intervalId);
  };

  slow = () => {
    this.speed = 1500;
    this.playGame();
  };

  fast = () => {
    this.speed = 100;
    this.playGame();
  };

  clearGame = () => {
    this.setState(setInitialState(this.rows, this.columns));
  };

  setGridSize = (cols, rows) => {
    this.rows = rows;
    this.columns = cols;
    this.clearGame();
  };

  render() {
    return (
      <div className="App">
        <h1>Game Of Life!</h1>
        <h2>Generations: {this.state.generation}</h2>

        <Grid
          fullGrid={this.state.fullGrid}
          columns={this.columns}
          selectCell={this.selectCell}
        />

        <Commands
          fast={this.fast}
          slow={this.slow}
          setGridSize={this.setGridSize}
          generateCells={this.generateCells}
          playGame={this.playGame}
          pauseGame={this.pauseGame}
          clearGame={this.clearGame}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
