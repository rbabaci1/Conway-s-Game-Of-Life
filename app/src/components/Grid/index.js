import React from "react";

import "./grid.scss";

export default function Grid({ fullGrid, rows, columns, selectCell }) {
  const width = columns * 14;
  let rowsList = [];
  let cellClass = "";

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      let cellId = i + "-" + j;

      cellClass = fullGrid[i][j] ? "cell alive" : "cell dead";
      rowsList.push(
        <Cell
          cellClass={cellClass}
          cellId={cellId}
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
