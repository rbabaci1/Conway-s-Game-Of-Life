import React from "react";

import Cell from "../Cell";
import "./grid.scss";

export default function Grid({ fullGrid, rows, columns, selectCell }) {
  const width = columns * 16;
  let rowsList = [];
  let cellClass = "";

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      cellClass = fullGrid[i][j] ? "cell alive" : "cell dead";
      rowsList.push(
        <Cell
          cellClass={cellClass}
          cellId={`${i}_${j}`}
          key={`${i}_${j}`}
          row={i}
          col={j}
          selectCell={selectCell}
        />
      );
    }
  }

  return (
    <div className="grid-container" style={{ width: width }}>
      {rowsList}
    </div>
  );
}
