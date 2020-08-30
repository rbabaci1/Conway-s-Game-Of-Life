import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import Grid from "./components/Grid/index";
import GameRemote from "./components/GameRemote";
import setInitialState from "./initialState";
import helpers from "./helpers";
import InfoModal from "./components/InfoModal";
import PatternsMenu from "./components/PatternsMenu";
import "./index.scss";
import SeaAnimation from "./components/SeaAnimation";

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
    this.buttonRef = React.createRef();

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
    this.setState({ running: true });
  };

  pauseGame = () => {
    clearInterval(this.intervalId);
    this.setState({ running: false });
  };

  clearGame = () => {
    clearInterval(this.intervalId);
    this.setState(setInitialState(this.rows, this.columns));

    for (let cell of document.getElementsByClassName("cell")) {
      cell.style.color = "transparent";
      cell.textContent = "1";
    }
  };

  updateSpeed = (value, gameIsRunning) => {
    this.speed = value;
    if (gameIsRunning) {
      this.startGame();
    }
  };

  setGridSize = (cols, rows) => {
    this.rows = rows;
    this.columns = cols;
    this.clearGame();
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

  generatePattern = patternName => {
    this.setState(setInitialState(this.rows, this.columns), () => {
      let pattern = helpers.patternsGenerator(
        helpers.cloneGrid(this.state.grid),
        patternName,
        this.rows,
        this.columns
      );

      this.setState({ grid: pattern, running: true });
      setTimeout(() => {
        this.startGame();
      }, 500);
    });
  };

  play = () => {
    /*
      1- For i to be a valid index, must be bigger than 0 smaller than rows - 1
      2- For j to be a valid index, must be bigger than 0 smaller than columns - 1
    */
    let grid = this.state.grid;
    let gridCopy = helpers.cloneGrid(this.state.grid);
    let flag = false;

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
          flag = true;
        }
        // if a cell is dead and has 3 live neighbors, it will be born
        if (!grid[row][col] && neighbors === 3) {
          gridCopy[row][col] = 1;
          helpers.updateCellTextContent(row, col, this.state.generation);
          flag = true;
        }

        if (this.state.generationDisplayed) {
          this.showGenerations();
        }
      }
    }

    if (!flag) {
      this.pauseGame();
    } else {
      this.setState({
        generation: this.state.generation + 1,
        grid: gridCopy,
      });
    }
  };

  handleResize = () => {
    this.setState({ windowWidth: window.innerWidth });
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    this.updateGridSize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  updateGridSize = () => {
    if (this.state.windowWidth < 900 && this.state.windowWidth >= 525) {
      this.columns = 30;
    } else if (this.columns === 70 && this.state.windowWidth < 1210) {
      this.columns = 50;
    } else if (this.state.windowWidth < 525) {
      this.columns = 20;
    }

    this.buttonRef.current.click();
  };

  renderOcean = () => {
    if (this.state.windowWidth > 900 && this.columns >= 50) {
      return <SeaAnimation />;
    }
  };

  render() {
    return (
      <>
        <div className="App">
          <h1>Conway's Game Of Life</h1>
          <div className="bg-img" />

          <InfoModal />
          {this.rows >= 30 && this.columns >= 50 ? (
            <PatternsMenu generatePattern={this.generatePattern} />
          ) : undefined}

          <div className="generation-count">
            GENERATIONS
            <h2>{this.state.generation}</h2>
          </div>

          <div className="main">
            <Grid
              grid={this.state.grid}
              columns={this.columns}
              selectCell={this.selectCell}
              running={this.state.running}
              generationDisplayed={this.state.generationDisplayed}
            />

            <GameRemote
              running={this.state.running}
              updateSpeed={this.updateSpeed}
              setGridSize={this.setGridSize}
              generateCells={this.generateCells}
              startGame={this.startGame}
              pauseGame={this.pauseGame}
              clearGame={this.clearGame}
              showGenerations={this.showGenerations}
              windowWidth={this.state.windowWidth}
              buttonRef={this.buttonRef}
            />
          </div>
        </div>

        {this.renderOcean()}
      </>
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
