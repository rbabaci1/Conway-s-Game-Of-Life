import React from "react";
import SkyLight from "react-skylight";

import InfoIcon from "../InfoIcon";
class InfoModal extends React.Component {
  render() {
    var styles = {
      backgroundColor: "#fff",
      color: "black",
      height: "100%",
      top: "20%",
    };

    return (
      <div className="modal">
        <button onClick={() => this.simpleDialog.show()}>
          <InfoIcon />
        </button>
        <SkyLight
          hideOnOverlayClicked
          ref={ref => (this.simpleDialog = ref)}
          title="Information"
          transitionDuration={400}
          dialogStyles={styles}
        >
          <p>
            The Game of Life, also known simply as Life, is a cellular automaton
            devised by the British mathematician John Horton Conway in 1970. The
            game is a zero-player game, meaning that its evolution is determined
            by its initial state, requiring no further input. One interacts with
            the Game of Life by creating an initial configuration and observing
            how it evolves, or, for advanced players, by creating patterns with
            particular properties.
          </p>
          <h2>Game Rules</h2>
          <p>
            The universe of the Game of Life is an infinite, two-dimensional
            orthogonal grid of square cells, each of which is in one of two
            possible states, alive or dead, (or populated and unpopulated,
            respectively). Every cell interacts with its eight neighbours, which
            are the cells that are horizontally, vertically, or diagonally
            adjacent. At each step in time, the following transitions occur:
          </p>
          <ul>
            <li>
              Any live cell with fewer than two live neighbours dies, as if by
              underpopulation.
            </li>
            <li>
              Any live cell with two or three live neighbours lives on to the
              next generation.
            </li>
            <li>
              Any live cell with more than three live neighbours dies, as if by
              overpopulation.
            </li>
            <li>
              Any dead cell with exactly three live neighbours becomes a live
              cell, as if by reproduction.
            </li>
          </ul>
          <p>
            The initial pattern constitutes the seed of the system. The first
            generation is created by applying the above rules simultaneously to
            every cell in the seed; births and deaths occur simultaneously, and
            the discrete moment at which this happens is sometimes called a
            tick. Each generation is a pure function of the preceding one. The
            rules continue to be applied repeatedly to create further
            generations.
          </p>

          <div id="died">
            <span>3</span> Represents the generation the cell died at.
          </div>
          <div id="alive">
            <span>3</span> Represents the generation the cell was born.
          </div>

          <p>
            Learn more about <strong>Conway's Game of Life</strong> at{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
            >
              Wikipedia.
            </a>
          </p>
        </SkyLight>
      </div>
    );
  }
}

export default InfoModal;
