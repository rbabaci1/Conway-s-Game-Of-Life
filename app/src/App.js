import Grid from "./components/Grid/index";
import "./App.scss";

import React, { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.speed = 500;
    this.rows = 30;
    this.columns = 50;

    this.state = {
      generation: 0,
      fullGrid: Array(this.rows)
        .fill()
        .map(() => Array(this.columns).fill(false)),
    };
  }

  selectCell = (row, col) => {
    let gridCopy = [...this.state.fullGrid];
    gridCopy[row][col] = !gridCopy[row][col];

    this.setState({ fullGrid: gridCopy });
  };

  generateCells = () => {
    let gridCopy = [...this.state.fullGrid];
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
    let grid = this.state.fullGrid;
    let gridCopy = [...this.state.fullGrid];
    /*
      1- For i to be a valid index, must be bigger than 0 smaller than rows - 1
      2- For j to be a valid index, must be bigger than 0 smaller than columns - 1
    */

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

  componentDidMount() {
    this.generateCells();
    // this.playGame();
  }

  render() {
    return (
      <div className="App">
        <h1>Game Of Life!</h1>
        <h2>Generations: {this.state.generation}</h2>

        <Grid
          fullGrid={this.state.fullGrid}
          rows={this.rows}
          columns={this.columns}
          selectCell={this.selectCell}
        />

        {/* <Commands 
          fast={this.fast}
          slow={this.slow}
          generateCells={this.generateCells}
          playGame={this.playGame}
          pauseGame={this.pauseGame}
          clearGame={this.clear}
        /> */}
      </div>
    );
  }
}

export default App;
