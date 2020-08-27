import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import Grid from "./components/Grid/index";
import Commands from "./components/Commands";
import setInitialState from "./initialState";
import helpers from "./helpers";
import InfoModal from "./components/InfoModal";
import "./index.scss";

class App extends Component {
  constructor() {
    super();
    this.speed = 200;
    this.rows = 30;
    this.columns = 50;
    this.operations = [
      [0, 1],
      [0, -1],
      [1, -1],
      [-1, 1],
      [1, 1],
      [-1, -1],
      [1, 0],
      [-1, 0],
    ];

    this.state = setInitialState(this.rows, this.columns);
  }

  selectCell = (row, col) => {
    let gridCopy = helpers.cloneGrid(this.state.grid);
    gridCopy[row][col] = !gridCopy[row][col];
    this.setState({ grid: gridCopy });
  };

  generateCells = () => {
    let rows = [];
    for (let i = 0; i < this.rows; i++) {
      rows.push(
        Array.from(Array(this.columns), () => (Math.random() > 0.7 ? 1 : 0))
      );
    }

    this.setState({ grid: rows });
    this.startGame();
  };

  startGame = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.play, this.speed);
  };

  pauseGame = () => {
    clearInterval(this.intervalId);
  };

  updateSpeed = (value, gameIsRunning) => {
    this.speed = value;
    if (gameIsRunning) {
      this.startGame();
    }
  };

  clearGame = () => {
    clearInterval(this.intervalId);
    this.setState(setInitialState(this.rows, this.columns));

    for (let cell of document.getElementsByClassName("cell")) {
      cell.style.color = "transparent";
      cell.textContent = "1";
    }
  };

  showGenerations = () => {
    document.querySelectorAll(".cell").forEach(cell => {
      if (cell.style.color === "transparent" || cell.style.color === "") {
        if (cell.classList.contains("alive")) {
          cell.style.color = "green";
        } else {
          cell.style.color = "red";
        }
      } else {
        cell.style.color = "transparent";
      }
    });
    this.setState({ generationDisplayed: !this.state.generationDisplayed });
  };

  setGridSize = (cols, rows) => {
    this.rows = rows;
    this.columns = cols;
    this.clearGame();
  };

  play = () => {
    /*
      1- For i to be a valid index, must be bigger than 0 smaller than rows - 1
      2- For j to be a valid index, must be bigger than 0 smaller than columns - 1
    */
    let grid = this.state.grid;
    let gridCopy = helpers.cloneGrid(this.state.grid);

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.columns; col++) {
        let neighbors = 0;

        this.operations.forEach(([x, y]) => {
          // for each operation, first check if the neighbor cell exists and
          // add its value to neighbors, if it's alive 1 will be added otherwise 0.
          if (helpers.cellExists(this.rows, this.columns, row + x, col + y)) {
            neighbors += grid[row + x][col + y];
          }
        });

        if (grid[row][col] && (neighbors < 2 || neighbors > 3)) {
          gridCopy[row][col] = 0;
          helpers.updateCellTextContent(row, col, this.state.generation);
        }
        // if a cell is dead and has 3 live neighbors, it will be born
        if (!grid[row][col] && neighbors === 3) {
          gridCopy[row][col] = 1;
          helpers.updateCellTextContent(row, col, this.state.generation);
        }

        if (this.state.generationDisplayed) {
          this.showGenerations();
        }
      }
    }

    this.setState({
      generation: this.state.generation + 1,
      grid: gridCopy,
    });
  };

  render() {
    return (
      <div className="App">
        <div className="bg-img" />

        <h1>Conway's Game Of Life</h1>
        <InfoModal />

        <div className="generation-count">
          GENERATIONS
          <h2>{this.state.generation}</h2>
        </div>

        <div className="main">
          <Grid
            grid={this.state.grid}
            columns={this.columns}
            selectCell={this.selectCell}
          />

          <Commands
            updateSpeed={this.updateSpeed}
            setGridSize={this.setGridSize}
            generateCells={this.generateCells}
            startGame={this.startGame}
            pauseGame={this.pauseGame}
            clearGame={this.clearGame}
            showGenerations={this.showGenerations}
          />
        </div>
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
